---
layout: post
title: CentOS开机卡在进度条的解决方法
tags: [centos, linux]
---

好久没更新了，换工作有一只都很忙。今天在虚拟机中同时开了windows 7 和 centos 后，centos 莫名其妙的开始在进度条， google之。

#### 还原/boot/grub/menu.lst

网上说可能是/boot/grub/menu.lst中的信息丢失，还原就好。进入grub后操作如下：

<!--more-->

> grub>root (sda1)  按[Enter]    // 这是linux所在的分区符号(一般情况下是在sda1分区上)  
> grub>kernel /vmlinuz-2.6.32-358.el5  按[Enter]    // 加载内核(一定要输入原内核版本号，可按[Tab]键补全)  
> grub>initrd /initrd-2.6.32-358.el5.img  按[Enter]    // 初始化linux镜像  
> grub>boot

不是这个问题，继续查找。

#### 开机启动软件异常

找到几个和我的情况差不多综合后解决了问题， 操作如下：

> 1. 进入grub
> 2. 选择centos输入`e`进行编辑，选择`kernel`行输入`e`进行编辑，去掉命令后面的quiet，`enter`确认
> 3. 输入`b`启动
> 4. 卡住后，按`F5`切换到文字界面， 查看卡在哪里(卡在uwsgi开机启动)
> 5. 重启，再次到`kernel`行编辑， quiet后面加上single, 进入单人模式
> 6. `chkconfig`关闭uwsgi开机启动
> 7. `init 0` 重启

问题解决了，但是为啥会卡在uwsgi呢?
