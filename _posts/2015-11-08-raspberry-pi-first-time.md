---
layout: post
title: 树莓派之初体验
tags: [raspberrypi, raspbian]
---

前段时间入手了一个树莓派2，ARM的板子虽然比不上x86的性能， 极低的功耗和4核1G的配置还是很不错的，比较适合24小时运行， 拿来跑个脚本，架个NAS或者下载机都可以。

<!--more-->

#### 安装系统

去[树莓派官网](https://www.raspberrypi.org/)先这个镜像，推荐[raspbian](https://www.raspberrypi.org/downloads/raspbian/)，除了平台的区别基本上就可以当做debian来玩。

Mac或者Linux下直接用`dd`向sd卡写入镜像， Windows下可以借助`Win32DiskImager`， 网上教程很多， 不细说。目前镜像都比较友好， 第一次启动的时候会进入配置界面， 按照提示一步一步来，很简单； 当然如果后面还想用这样的界面配置， 可以直接调用`raspi-config`。

#### 配置网络

如果特殊修改网络的情况下， 第一次启动后应该已经连上网了， 此时是DHCP获取到的动态ip， 下面来给它配置个静态ip。

`vim /etc/network/interfaces`， 按照自己的网络修改， 大致如下：

```
auto lo
iface lo inet loopback

# dns
dns-nameservers 119.29.29.29
dns-nameservers 223.5.5.5

auto eth0
allow-hotplug eth0
iface eth0 inet static
address 192.168.2.125
gateway 192.168.2.1
netmask 255.255.255.0
network 192.168.2.0
broadcast 192.168.2.255
```

`/etc/init.d/networking restart`重启网络， 现在树莓派已经是固定IP了， 最好在路由器上绑定下避免ip冲突。

#### 无线网络

可以通过安装个usb无线网卡来让树莓派支持无线网，不用局限于网线的束缚，这样更加便携， 通过配置可以让树莓派在多个无线wifi中切换。假设有两个无线wifi，一个是公司一个是家里。

`/etc/network/interfaces`中添加如下配置：

```
auto wlan0
allow-hotplug wlan0
iface wlan0 inet manual
wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf

# work
iface work inet static
address 192.168.1.108
gateway 192.168.1.1
netmask 255.255.255.0

# home
iface home inet static
address 192.168.0.108
gateway 192.168.0.1
netmask 255.255.255.0
```

修改`/etc/wpa_supplicant/wpa_supplicant.conf`如下所示：

```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    ssid="9527"
    psk="passwd"
    priority=5
    id_str="work"
}

network={
    ssid="TP-7-1-402"
    psk="passwd"
    priority=4
    id_str="home"
}
```

重启网络后，树莓派应该可以使用无线网了，但目前还是有个问题，虽然wpa_supplicant声称可以自动重连， 我的实验结果是拔掉再插可以，但是有时候如果无线wifi出现问题， 树莓派并不会自动重连上。

#### 守护脚本

上面的问题， 网上也有这个说法， 解决办法是定时用脚本来判断网络，自动重启网络， 如果长时间无法连接， 重启树莓派。脚本在这里可以找到[net_restart.sh](https://gist.github.com/likebeta/eb5551cd4f4578e91dae#file-net_restart-sh)

#### 总结

如果连接网络有问题， ssh无法使用的时候， 就需要给树莓派连上键盘和显示器，显示器的连接需要修改`config.txt`。 折腾这到这里基本上可以告一段落了， 虽然废了很多精力遇到不少问题， 总体来说树莓派的资源还是挺多的， 问题通过Google基本都能解决， 上面提到的配置都放在[gist](https://gist.github.com/likebeta/eb5551cd4f4578e91dae)上了， 下一节继续折腾。。。
