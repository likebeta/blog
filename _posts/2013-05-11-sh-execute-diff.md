---
layout: post
title: shell脚本不同运行方式的区别
tags: [shell, script]
---

shell脚本的运行大体分为下面几种方式：

> 1. `sh filename`  
> 2. `./filename` 或 `/$(parent_path)/filename`  
> 3. `source filename` 或者 `. filename` 

不同的 script 运行方式会造成不一样的结果，比如对 bash 的环境的影响。

<!--more-->

#### 直接的方式运行 script

上面的第1,2中都是属于直接的方式来运行，不管定位shell脚本的时候是使用相对路径，绝对路径还是包含在$PATH，脚本运行的是否都会使用一个新的bash环境。这就是说，使用这种方式时，其实脚本是在子进程中运行的，这样带来的结果就是：

> 当srcipt完成后，在子进程内的各项变量或动作将会结束而不会传回到父进程中

#### 利用 source 来运行 script

利用source(或者.)来运行脚本的时候，脚本是在当前bash进程中运行，这就是说：

> 当srcipt完成后，它的各项变量或动作会影响当前的bash进程

比如我们修改了~/.bashrc这，不注销系统而要让其生效的时候，需要使用 source ~/.bashrc 而不能使用 sh ~/.bashrc
