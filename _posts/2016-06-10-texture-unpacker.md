---
layout: post
title: 分割还原TexturePacker打包的小图
tags: [TexturePacker, TextureUnPacker, Cocos2d]
---

最近练手cocos2d-js, 苦于没有美术素材, 东拼西凑想弄个基本的界面, 网上扒了一些图片, 大部分都是只要其中的一个小图, 所以想着有没有简单的将TexturePacker打包的大图片切割还原成小图片, 然后自己打包需要的一部分小图.

<!--more-->

因为网上找的图片都是有plist, 应该是有办法的. 网上搜了下, 有几个实现了我想要的功能, 下载使用都有各种问题. 仔细看了下, 我这边的plist中的format是3, 找到的现成的都是对老格式做的处理.

有一个貌似挺厉害的, 支持没有plist的情况下分割出小图, 不过已经收费了, 还是自己动手吧.

TexturePacker打包的plist其实挺简单的, 就几个属性, 顾名思义大部分都能猜到含义, 主要就是spriteOffset没整明白, 开始搞错以为是左上角的偏移点, 最后搜了一篇介绍老格式文章-[cocos2dx plist中各个属性含义][1], 弄明白了原来是中心的偏移量.

Python借助PIL的Image实现起来很简单, 稍作处理就可以, 处理textureRotated的时候遇到点问题, 很好解决. 基本上实现了我要的功能, 没有对老格式和plist以外的格式支持, 后面有需求再加上.

源码和示例在这里: [TextureUnPacker][2]


[1]: http://blog.csdn.net/ranky2009/article/details/19566479
[2]: https://github.com/likebeta/TextureUnPacker
