---
layout: post
title: 设计模式 - 工厂模式
tags: [factory,pattern]
---

Simple Factory模式经常在系统开发中用到，但是这并不是 Factory  模式的最大威力所在（因为这可以通过其他方式解决这个问题）。Factory模式不单是提供了创建对象的接口，其最重要的是延迟了子类的实例化。

Factory模式的应用并不是只是为了封装对象的创建，而是要把对象的创建放到子类中实现：Factory 中只是提供了对象创建的接口，其实现将放在 Factory 的子类ConcreteFactory中进行。

<!--more-->

#### 优点

Factory 模式在实际开发中应用非常广泛，面向对象的系统经常面临着对象创建问题：  
要创建的类实在是太多了。而 Factory 提供的创建对象的接口封装（第一个功能），以及其将类的实例化推迟到子类（第二个功能）都部分地解决了实际问题。

#### 缺点

Factory模式也带来至少以下两个问题：

1. 如果为每一个具体的 ConcreteProduct 类的实例化提供一个函数体，那么我们可能不得不在系统中添加了一个方法来处理这个新建的 ConcreteProduct，这样 Factory 的接口永远就不可能封闭（Close）。当然我们可以通过创建一个 Factory的子类来通过多态实现这一点，但是这也是以新建一个类作为代价的。
2. 在实现中我们可以通过参数化工厂方法，即给 FactoryMethod（）传递一个参数用以决定是创建具体哪一个具体的 Product。当然也可以通过模板化避免子类创建子类，其方法就是将具体 Product 类作为模板参数，实现起来也很简单。

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
// IFactory.h
#ifndef __IFACTORY_H__
#define __IFACTORY_H__
#include "Phone.h"
#include <string>

class IFactory
{
public:
    IFactory(){};
    virtual ~IFactory(){};
    virtual IPhone* createPhone(std::string strName) = 0;
};

#endif
```

```cpp
// PhoneFactory.h
#ifndef __PHONE_FACTORY_H__
#define __PHONE_FACTORY_H__
#include "IFactory.h"
#include "IPhone.h"
#include "Phone.h"

class CMXFactory:public IFactory
{
public:
    CMXFactory();
    virtual ~CMXFactory();
    virtual IPhone* createPhone(std::string strName);
};

class CMIFactory:public IFactory
{
public:
    CMIFactory();
    virtual ~CMIFactory();
    virtual IPhone* createPhone(std::string strName);
};

#endif
```

```cpp
// PhoneFactory.cpp
#include "PhoneFactory.h"
#include "Phone.h"

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
```

```cpp
// main.cpp
#include <iostream>
#include <string>
using namespace std;
#include "PhoneFactory.h"

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
                std::cout << "not exist " << strName[n][i] << "!\n";
            }
            delete pPhone;
        }
        delete pFactory[n];
        pFactory[n] = NULL;
    }
    return 0;
}
```

#### 讨论

可以看出，Factory 模式对于对象的创建给予开发人员提供了很好的实现策略，但是Factory 模式仅仅局限于一类类（就是说 Product 是一类，有一个共同的基类），如果我们要为不同类的类提供一个对象创建的接口，那就要用 Abstract Factory了。

#### ps

工厂模式我还未能真正理解他的好处，例子也太小，不能体现工厂模式的威力，我水平不够，这个需要慢慢积累理解
