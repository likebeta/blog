---
layout: post
title: 设计模式 - 简单工厂模式
tags: [factory,pattern]
---

#### 工厂模式

1. 简单工厂（Simple Factory）模式：又称静态工厂方法（Static Factory Method）模式
2. 工厂方法（Factory Method）模式：又称多态性工厂（Polymorphic Factory）模式
3. 抽象工厂（Abstract Factory）模式：又称工具箱（Kit 或 Toolkit）模式
 
从设计模式的类型上来说，简单工厂模式是属于创建型模式，但不属于23种GOF设计模式之一。简单工厂模式是由一个工厂对象决定创建出哪一种产品类的实例。简单工厂模式是工厂模式家族中最简单实用的模式，可以理解为是不同工厂模式的一个特殊实现。

<!--more-->

其包括三个角色：

1. 工厂（Creator）角色 ：简单工厂模式的核心，它负责实现创建所有实例的内部逻辑。工厂类可以被外界直接调用，创建所需的产品对象。
2. 抽象产品（Product）角色：简单工厂模式所创建的所有对象的父类，它负责描述所有实例所共有的公共接口。
3. 具体产品（Concrete Product）角色：是简单工厂模式的创建目标，所有创建的对象都是充当这个角色的某个具体类的实例。

#### 优点

  工厂类是整个模式的关键.包含了必要的逻辑判断,根据外界给定的信息,决定究竟应该创建哪个具体类的对象.通过使用工厂类,外界可以从直接创建具体产品对象的尴尬局面摆脱出来,仅仅需要负责“消费”对象就可以了。而不必管这些对象究竟如何创建及如何组织的．明确了各自的职责和权利，有利于整个软件体系结构的优化。
 
#### 缺点

　　由于工厂类集中了所有实例的创建逻辑，违反了高内聚责任分配原则，将全部创建逻辑集中到了一个工厂类中；它所能创建的类只能是事先考虑到的，如果需要添加新的类，则就需要改变工厂类了。
　　当系统中的具体产品类不断增多时候，可能会出现要求工厂类根据不同条件创建不同实例的需求．这种对条件的判断和对具体产品类型的判断交错在一起，很难避免模块功能的蔓延，对系统的维护和扩展非常不利；  
　　这些缺点在工厂方法模式中得到了一定的克服。

#### 使用场景

- 工厂类负责创建的对象比较少；
- 客户只知道传入工厂类的参数，对于如何创建对象（逻辑）不关心；
- 由于简单工厂很容易违反高内聚责任分配原则，因此一般只在很简单的情况下应用。
 
说明：以上文字概念部分，均来自百度百科。自己没有那么好的归纳能力。
 
c++实现：

```cpp
// IPhone.h
#ifndef __IPHONE_H__
#define __IPHONE_H__

class IPhone
{
public:
    IPhone(){};
    virtual ~IPhone(){};
    virtual void showName() = 0;
};

#endif
```

```cpp
// Phone.h
#ifndef __PHONE_H__
#define __PHONE_H__
#include "IPhone.h"

class CMX1Phone:public IPhone
{
public:
    CMX1Phone();
    virtual ~CMX1Phone();
    virtual void showName();
};

class CMX2Phone:public IPhone
{
public:
    CMX2Phone();
    virtual ~CMX2Phone();
    virtual void showName();
};

class CMI1Phone:public IPhone
{
public:
    CMI1Phone();
    virtual ~CMI1Phone();
    virtual void showName();
};

#endif
```

```cpp
// Phone.cpp
#include "Phone.h"
#include <iostream>

CMX1Phone::CMX1Phone()
{
}

CMX1Phone::~CMX1Phone()
{
}

void CMX1Phone::showName()
{
    std::cout << "I am mx1 of meizu!\n";
}

CMX2Phone::CMX2Phone()
{
}

CMX2Phone::~CMX2Phone()
{
}

void CMX2Phone::showName()
{
    std::cout << "I am mx2 of meizu!\n";
}

CMI1Phone::CMI1Phone()
{
}

CMI1Phone::~CMI1Phone()
{
}

void CMI1Phone::showName()
{
    std::cout << "I am mi1 of xiaomi!\n";
}
```

```cpp
// PhoneFactory.h
#ifndef __PHONE_FACTORY_H__
#define __PHONE_FACTORY_H__
#include "IPhone.h"
#include "Phone.h"
#include <string>

class CPhoneFactory
{
public:
    static IPhone* createPhone(std::string strName);
};

IPhone* CPhoneFactory::createPhone(std::string strName)
{
    IPhone* pPhone = NULL;
    if (strName == "mx1")
    {
        pPhone = new CMX1Phone();
    }
    else if (strName == "mx2")
    {
        pPhone = new CMX2Phone();
    }
    else if (strName == "mi1")
    {
        pPhone = new CMI1Phone();
    }

    if (pPhone != NULL)
    {
        pPhone->showName();
    }

    return pPhone;
}

#endif
```

```cpp
// main.cpp
#include <iostream>
#include <string>
using namespace std;
#include "PhoneFactory.h"

int main()
{
    std::string strName[5] = {"mx1","mx2","mx3","mi1","mi2"};
    for (int i = 0; i < 5; ++i)
    {
        IPhone* pPhone = CPhoneFactory::createPhone(strName[i]);
        if (pPhone == NULL)
        {
            std::cout << "not exist " << strName[i] << "!\n";
        }
        delete pPhone;
    }
    return 0;
}
```

#### 总结

PhoneFactory的createPhone只是一个根据某种标识索引并创建出目标对象，我们可以用id，字符串都可以，我们目前服务器的代码是根据消息id来索引具体的消息体，它这里面作为类的静态方法开启来听别扭的， 我更倾向于直接是一个全局静态方法或者放在某个namespace中。
