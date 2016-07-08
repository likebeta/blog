---
layout: post
title: 设计模式 - 单例模式
tags: [singleton,pattern]
---

#### 问题

个人认为 Singleton 模式是设计模式中最为简单、最为常见、最容易实现，也是最应该熟悉和掌握的模式。且不说公司企业在招聘的时候为了考察员工对设计的了解和把握，考的最多的就是 Singleton 模式。

Singleton 模式解决问题十分常见，我们怎样去创建一个唯一的变量（对象？在基于对象的设计中我们可以通过创建一个全局变量（对象）来实现，在面向对象和面向过程结合的设计范式（如 C++中）中，我们也还是可以通过一个全局变量实现这一点。

<!--more-->

但是当我们遇到了纯粹的面向对象范式中，这一点可能就只能是通过 Singleton 模式来实现了，可能这也正是很多公司在招聘 Java 开发人员时候经常考 Singleton 模式的缘故吧。 Singleton 模式在开发中非常有用，我们开发过程中一些变量必须是唯一的，比如说打印机的实例等等。

#### 模式选择

我们通过维护一个 static 的成员变量来记录这个唯一的对象实例。通过提供一个 staitc 的接口instance 来获得这个唯一的实例。Singleton模式经常和Factory（Abstract Factory）模式在一起使用，因为系统中工厂对象一般来说只要一个。

#### 实现

```cpp
//Singleton.h
#ifndef __SINGLETON_H__
#define __SINGLETON_H__

class CSingleton
{ 
public: 
    static CSingleton* Instance();
protected: 
    CSingleton();
private: 
    static CSingleton* _instance;
}; 

#endif
```

```cpp
//Singleton.cpp
#include "Singleton.h" 
#include <iostream> 

CSingleton* CSingleton::_instance = NULL; 
CSingleton::CSingleton() 
{ 
    std::cout << "Singleton....\n";
} 
CSingleton* CSingleton::Instance()
{ 
    if (_instance == NULL)
    {
        _instance = new CSingleton();
    }
    return _instance;
}
```

```cpp
//main.cpp
#include "Singleton.h"

int main()
{
    CSingleton* pSingleton = CSingleton::Instance();
    return 0;
}
```

#### 总结

Singleton模式看起来简单，其实上面的单例也是有问题的，比如非线程安全，这里有一篇文章讨论了Singleton模式的几种写法，有兴趣可以看看。

[单例模式（Singleton）的6种实现][1]  
[.NET设计模式（2）：单件模式（Singleton Pattern）][2]

  [1]: http://www.cnblogs.com/rush/archive/2011/10/30/2229565.html
  [2]: http://terrylee.cnblogs.com/archive/2005/12/09/293509.html
