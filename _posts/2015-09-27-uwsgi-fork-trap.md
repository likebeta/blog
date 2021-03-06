---
layout: post
title: uwsgi中fork的陷阱
tags: [uwsgi, fork, web.py, python, pypy, nginx]
---

游戏的sdk使用的是 `nginx+uwsgi+web.py`， 虽然用了一段时间了， 但是很多细节并没有仔细去推敲。最近要测试游戏端(tcp)的逻辑，用了5000个并发来测试。由于 sdk的日子都打印在一个log文件中， 并发打印的时候无法分辨一个请求处理过程中打印的完整请求，所以想加个标识， 结果引出来一系列的疑问。

<!--more-->

#### 请求为何会并发

由于开发的时候请求很少， 基本上没有看到多个请求的日志交错出现，而并发测试的时候出现了。这个问题很容易， 日志交错要么是异步执行， 要么是并发执行导致的。web.py没有提供异步支持， 那就是并发了。 看配置看到uwsgi配置的是4个worker，这样就好解释了。 但是这里犯了个严重的错误， 想当然的把worker看成worker线程了， ps明明显示的是进程。

#### 变量的疑惑

既然是多线程(捂脸), web.ctx及session是类似单例模式，并发的时候这个ctx和session值是多少呢？貌似有问题，但是测试并没问题。经过查看源码发现ctx及session都是使用了ThreadedDict，也就类似TLS，这里不能理解为全局变量。^—^，想明白了，开心， sb的我此时还没有发现是多进程。

#### 无尽的惨败

加个标识呗， 小case！ 首先想到的是每个日志前加个`id(web.ctx)`表示每个线程的请求。不用我说结果就是并发时候这个值是一样的，当然和初始化打出的log中的不一样， 但是理解的是主线程。

没想明白， 换一种方法吧， 因为web.py中可以添加hook或者processors， 用于在request执行前和执行后进行一些处理工作。可以在初始化的时候在web中添加变量， 然后在每次request执行前后累加这个变量并放入各自的web.ctx中保存(加锁)， 每次打印log的时候从web.ctx中取出打印这个变量,。乍一看起来也是对的， 信心满满的测试，结果4个worker分别在累加， 完全分辨不出来。把这个变量换成新对象比如(time.time())， 随机数等都会出现重，此时已经有点迷茫了。

想了会， 没明白 ， 时间不多， 再换方法。现在想到的是直接打印线程id，改吧改吧再试。 我勒个操了， 4个worker线程id全部一样，并且和主线程id也一样， 尼玛已经接近崩溃。

后面各种修改各种换，都是各种惨败， 已经绝望。

#### 一丝曙光

此时已经中午， 吃完午饭再想吧，然后蹲坑。突然想到了fork这个函数，会不会和他有关系， 但我没有调用fork呀， 对， 应该是多进程， 麻痹了。不拉了有点希望了，先去验证验证。

首先加上进程id的打印， 测试发现果然进程id不同， 其实到这里基本上加标识的问题可以解决了， 但是还有疑问，为毛初始化只有一次呢， 哦， fork， 应该和这个有关系， 去查uwsgi的文档，找到[如下描述](https://uwsgi.atupal.org/zh_CN/latest/RackQuickstart.html#fork)：

> uWSGI is “Perlish” in a way, there is nothing we can do to hide that.
> Most of its choices (starting from “There’s more than one way to do
> it”) came from the Perl world (and more generally from classical UNIX
> sysadmin approaches).
>
> 有时候其他语言/平台上使用这些方法会导致不在意料中的行为发生。
>
> 当你开始学习 uWSGI 的时候一个你可能会面对的”问题”之一就是它的 fork() 使用。
>
> 默认情况下 uWSGI 在第一个 spawned 的进程里加载你的应用，然后在这个进程里面调用 fork() 多次。
>
> 这意味这你的应用被单独加载一次然后被复制。
>
> 虽然这个方法加速了服务器的启动，但有些应用可能会因为这个技术造成一些问题(特别是这些在启动的
> 时候初始化数据库连接的，因为连接的文件描述符会在字进程中继承)。
>
> 如果你确定应不应该使用 uWSGI 野蛮的预-fork方式，那就使用 --lazy-apps 选项禁用掉它。 它将会强制你的应用在每个
> worker 里都会完整加载一次。

好吧， 修改下试试， 果然初始化了4次， 当然这不是我想要的。

#### 总结

到目前我们可以对一些现象进行解释：

1. web.py的web.ctx及一些变量实际上是线程相关的，一般情况下上层不用再考虑并发的读取问题。
2. uwsgi可以配置多进程， 默认加载一次， 然后根据配置fork出N份， 初始化代码只会执行一次，fork后相当于有N个子进程和一个父进程， 他们的各种变量环境都一样。
3.  POSIX规定一个进程中线程id是唯一的， 进程id在系统中唯一。 这样看来如果是fork产生的进程， 线程id理论上是可以相同的， 不过貌似大部分系统实现的是系统唯一线程id。
4. python中的取得的线程id好像不是真实的， 按照网上说的[调用c模块来获取线程id](http://blog.devork.be/2010/09/finding-linux-thread-id-from-within.html)的方法， 我测试得到的线程id和进程id相同。

#### 疑问

但目前为止， 只能说猜测， 有几个问题还没得到证实，时间比较紧， 想记下来：

1. fork出来的进程是否虚拟地址空间都一样， 变量的地址都一样。
2. fork出来的进程是否线程id可以相同。
3. 如果这些进程再创建线程， 线程id会怎样。
4. 测试的时候虽然线程id相同， 但是线程名称不同，但是后来再测试却都想通了， 一时复现不了。

后面有时间验证了再来补充， 说不定猜测根本不对， 实际上是别的原因？
