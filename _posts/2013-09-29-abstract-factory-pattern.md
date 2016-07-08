---
layout: post
title: 设计模式 - 抽象工厂模式
tags: [factory,pattern]
---

#### 问题

假设我们要开发一款游戏，当然为了吸引更多的人玩，游戏难度不能太大（让大家都没有信心了，估计游戏也就没有前途了），但是也不能太简单（没有挑战性也不符合玩家的心理）。于是我们就可以采用这样一种处理策略：为游戏设立等级，初级、中级、高级甚至有BT 级。假设也是过关的游戏，每个关卡都有一些怪物（monster）守着，玩家要把这些怪物干掉才可以过关。

<!--more-->

作为开发者，我们就不得不创建怪物的类，然后初级怪物、中级怪物等都继承自怪物类（当然不同种类的则需要另创建类，但是模式相同）。在每个关卡，我们都要创建怪物的实例，例如初级就创建初级怪物（有很多种类）、中级创建中级怪物等。可以想象在这个系统中，将会有成千上万的怪物实例要创建，问题是还要保证创建的时候不会出错：初级不能创建 BT 级的怪物（玩家就郁闷了，玩家一郁闷，游戏也就挂挂了），反之也不可以。

#### 模式选择

AbstractFactory模式就是用来解决这类问题的：要创建一组相关或者相互依赖的对象。
Abstract Factory 模式关键就是将这一组对象的创建封装到一个用于创建对象的类（ConcreteFactory）中，维护这样一个创建类总比维护 n 多相关对象的创建过程要简单的多。

#### 实现

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

class CMX3Phone:public IPhone
{
public:
    CMX3Phone();
    virtual ~CMX3Phone();
    virtual void showName();
};

class CMI1Phone:public IPhone
{
public:
    CMI1Phone();
    virtual ~CMI1Phone();
    virtual void showName();
};

class CMI2Phone:public IPhone
{
public:
    CMI2Phone();
    virtual ~CMI2Phone();
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

CMX3Phone::CMX3Phone()
{
}

CMX3Phone::~CMX3Phone()
{
}

void CMX3Phone::showName()
{
    std::cout << "I am mx3 of meizu!\n";
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

CMI2Phone::CMI2Phone()
{
}

CMI2Phone::~CMI2Phone()
{
}

void CMI2Phone::showName()
{
    std::cout << "I am mi2 of xiaomi!\n";
}
```

```cpp
// IBattery.h
#ifndef __IBATTERY_H__
#define __IBATTERY_H__

class IBattery
{
public:
    IBattery(){};
    virtual ~IBattery(){};
    virtual void showName() = 0;
};

#endif
```

```cpp
// Battery.h
#ifndef __BATTERY_H__
#define __BATTERY_H__
#include "IBattery.h"

class CMX1Battery:public IBattery
{
public:
    CMX1Battery();
    virtual ~CMX1Battery();
    virtual void showName();
};

class CMX2Battery:public IBattery
{
public:
    CMX2Battery();
    virtual ~CMX2Battery();
    virtual void showName();
};

class CMX3Battery:public IBattery
{
public:
    CMX3Battery();
    virtual ~CMX3Battery();
    virtual void showName();
};

class CMI1Battery:public IBattery
{
public:
    CMI1Battery();
    virtual ~CMI1Battery();
    virtual void showName();
};

class CMI2Battery:public IBattery
{
public:
    CMI2Battery();
    virtual ~CMI2Battery();
    virtual void showName();
};

#endif
```

```cpp
// Battery.cpp
#include "Battery.h"
#include <iostream>

CMX1Battery::CMX1Battery()
{
}

CMX1Battery::~CMX1Battery()
{
}

void CMX1Battery::showName()
{
    std::cout << "I am mx1's battery of meizu!\n";
}

CMX2Battery::CMX2Battery()
{
}

CMX2Battery::~CMX2Battery()
{
}

void CMX2Battery::showName()
{
    std::cout << "I am mx2's battery of meizu!\n";
}

CMX3Battery::CMX3Battery()
{
}

CMX3Battery::~CMX3Battery()
{
}

void CMX3Battery::showName()
{
    std::cout << "I am mx3's battery of meizu!\n";
}

CMI1Battery::CMI1Battery()
{
}

CMI1Battery::~CMI1Battery()
{
}

void CMI1Battery::showName()
{
    std::cout << "I am mi1's battery of xiaomi!\n";
}

CMI2Battery::CMI2Battery()
{
}

CMI2Battery::~CMI2Battery()
{
}

void CMI2Battery::showName()
{
    std::cout << "I am mi2's battery of xiaomi!\n";
}
```

```cpp
// IFactory.h
#ifndef __IFACTORY_H__
#define __IFACTORY_H__
#include "IPhone.h"
#include "IBattery.h"
#include <string>

class IFactory
{
public:
    IFactory(){};
    virtual ~IFactory(){};
    virtual IPhone* createPhone(std::string strName) = 0;
    virtual IBattery* createBattery(std::string strName) = 0;
};

#endif
```

```cpp
// BatteryFactory.h
#ifndef __BATTERY_FACTORY_H__
#define __BATTERY_FACTORY_H__
#include "IFactory.h"
#include "IPhone.h"
#include "IBattery.h"

class CMXFactory:public IFactory
{
public:
    CMXFactory();
    virtual ~CMXFactory();
    virtual IPhone* createPhone(std::string strName);
    virtual IBattery* createBattery(std::string strName);
};

class CMIFactory:public IFactory
{
public:
    CMIFactory();
    virtual ~CMIFactory();
    virtual IPhone* createPhone(std::string strName);
    virtual IBattery* createBattery(std::string strName);
};

#endif
```

```cpp
// BatteryFactory.cpp
#include "Factory.h"
#include "Phone.h"
#include "Battery.h"

CMXFactory::CMXFactory()
{
}

CMXFactory::~CMXFactory()
{
}

IPhone* CMXFactory::createPhone(std::string strName)
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
    else if (strName == "mx3")
    {
        pPhone = new CMX3Phone();
    }

    if (pPhone != NULL)
    {
        pPhone->showName();
    }

    return pPhone;
}

IBattery* CMXFactory::createBattery(std::string strName)
{
    IBattery* pBattery = NULL;
    if (strName == "mx1")
    {
        pBattery = new CMX1Battery();
    }
    else if (strName == "mx2")
    {
        pBattery = new CMX2Battery();
    }
    else if (strName == "mx3")
    {
        pBattery = new CMX3Battery();
    }

    if (pBattery != NULL)
    {
        pBattery->showName();
    }

    return pBattery;
}

CMIFactory::CMIFactory()
{
}

CMIFactory::~CMIFactory()
{
}

IPhone* CMIFactory::createPhone(std::string strName)
{
    IPhone* pPhone = NULL;
    if (strName == "mi1")
    {
        pPhone = new CMI1Phone();
    }
    else if (strName == "mi2")
    {
        pPhone = new CMI2Phone();
    }

    if (pPhone != NULL)
    {
        pPhone->showName();
    }

    return pPhone;
}

IBattery* CMIFactory::createBattery(std::string strName)
{
    IBattery* pBattery = NULL;
    if (strName == "mi1")
    {
        pBattery = new CMI1Battery();
    }
    else if (strName == "mi2")
    {
        pBattery = new CMI2Battery();
    }

    if (pBattery != NULL)
    {
        pBattery->showName();
    }

    return pBattery;
}
```

```cpp
// main.cpp
#include <iostream>
#include <string>
using namespace std;
#include "Factory.h"

int main()
{
    std::string strName[2][4] = {"mx1","mx2","mx3","mx4","mi1","mi2","mi3","mi4"};
    IFactory* pFactory[2] = {new CMXFactory(),new CMIFactory()};
    for (int n = 0; n < 2; ++n)
    {
        for (int i = 0; i < 4; ++i)
        {
            IPhone* pPhone = pFactory[n]->createPhone(strName[n][i]);
            if (pPhone == NULL)
            {
                std::cout << "not exist phone of " << strName[n][i] << "!\n";
            }
            delete pPhone;

            IBattery* pBattery = pFactory[n]->createBattery(strName[n][i]);
            if (pBattery == NULL)
            {
                std::cout << "not exist battery of " << strName[n][i] << "!\n";
            }
            delete pBattery;
        }
        delete pFactory[n];
        pFactory[n] = NULL;
    }
    return 0;
}
```
