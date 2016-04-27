---
layout: post
title: ubuntu配置静态ip和dns
tags: [ubuntu,dns,ip]
---

前段时间同事离职，他的机子配置比较好，我和老大申请，无耻的换用他的主机，收编了他的显示器。这下内存和硬盘都上去了，总得折腾点事情做啊，安装虚拟机，折腾个 ubuntu 用用，刚好同事的 ip 我也霸占了(我们局域网的 ip 是静态绑定的)。我想把原来在 windows 下搭建的 php 环境放在 linux 上，这样的话就需要配置个 ip ， vmware 的网络设置需要是 bridge 模式，不能是原来的 nat 模式。 debian 下配置静态 ip 和 dns 挺简单的， ubuntu 下有点不同，在此记录下。

<!--more-->

#### 修改网络配置文件

网络配置文件存储在 /etc/network/interfaces 中

```sh
sudo vi /etc/network/interfaces
```

填写信息如下：

```sh
auto eth0 #指明网卡eth0在系统启动时自动加载
#指明eth0采用ipv4地址，inet表示ipv4地址，inet6表示ipv6地址； static表示静态，dhcp表示动态
iface eth0 inet static

address 192.168.1.155 #静态ip
netmask 255.255.255.0 #子网掩码
gateway 192.168.1.1 #网关地址
```

ip 地址设置完毕了

#### 设置 dns 服务器

这个你可以设置自己的 dns 服务器，我还是比较习惯用谷歌的。 dns 信息存储在 /etc/resolv.conf 中

```sh
sudo vi /etc/resolv.conf
```

添加以下内容

```sh
nameserver 8.8.8.8 #首选dns服务器
#nameserver x.x.x.x #备选dns服务器
```

dns 服务器也设置完毕。

#### 重启网络

需要重启下网络才能生效，命令如下

```sh
sudo /etc/init.d/networking restart
```

#### 问题

debian 或者 centos 按照上面设置后就彻底没有问题了，但是 ubuntu 在重启电脑后， dns 的设置都丢失了。原因是 /etc/resolv.conf 是动态创建的，重启后会被覆盖。晚上找到解决方法两个：

**/etc/network/interfaces 最后添加 dns 服务器**

```sh
dns-nameservers 8.8.8.8
```

重启网络就行了，此时 /etc/resolv.conf 中也会添加上面的 dns 

**/etc/resolvconf/resolv.conf.d/base 中添加 dns 服务器**

```sh
nameserver 8.8.8.8 #首选dns服务器
#nameserver x.x.x.x #备选dns服务器
```

保存后，执行 resolvconf -u 就行了，此时 /etc/resolv.conf 中也会添加上面的 dns 

至此，全部配置完毕。
