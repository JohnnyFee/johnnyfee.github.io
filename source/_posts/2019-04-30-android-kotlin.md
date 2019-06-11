---
layout: post
title: "Java Patterns"
description: ""
category: Java
tags: [java, pattern, patterns]
---

- [Design patterns implemented in Java](http://java-design-patterns.com/)
- [前言 · Design Pattern](https://alleniverson.gitbooks.io/design-pattern/content/)
- [Design patterns implemented in Java](https://java-design-patterns.com/)

## 概述

谢GoF（Gang of Four，四人组），他们1995年出版的《设计模式》 中的 23 中设计模式可以分成以下三种类型

- 创建型模式

  单例模式、工厂方法模式、抽象工厂模式、模版方法模式、建造者模式　

- 结构型模式

  适配器模式、装饰器模式、代理模式、外观模式、桥接模式、组合模式、享元模式

- 行为型模式

  策略模式、模板方法模式、观察者模式、迭代子模式、责任链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模式、解释器模式

## 设计原则

在运用面向对象的思想进行软件设计时，需要遵循的原则一共有6个，他们是：

- 单一职责原则（Single Responsibility Principle）
- 里氏替换原则（Liskov Substitution Principle）
- 依赖倒置原则（Dependence Inversion Principle）
- 接口隔离原则（Interface Segregation Principle）
- 迪米特法则（Law Of Demeter）
- 开闭原则（Open Close Principle）

### 单一职责原则

定义：不要存在多于一个导致类变更的原因。通俗的说，即一个类只负责一项职责。

### 里氏替换原则

定义1：如果对每一个类型为 T1的对象 o1，都有类型为 T2 的对象o2，使得以 T1定义的所有程序 P 在所有的对象 o1 都代换成 o2 时，程序 P 的行为没有发生变化，那么类型 T2 是类型 T1 的子类型。

定义2：所有引用基类的地方必须能透明地使用其子类的对象。

问题由来：有一功能P1，由类A完成。现需要将功能P1进行扩展，扩展后的功能为P，其中P由原有功能P1与新功能P2组成。新功能P由类A的子类B来完成，则子类B在完成新功能P2的同时，有可能会导致原有功能P1发生故障。

解决方案：当使用继承时，遵循里氏替换原则。类B继承类A时，除添加新的方法完成新增功能P2外，尽量不要重写父类A的方法，也尽量不要重载父类A的方法。

举例说明继承的风险，我们需要完成一个两数相减的功能，由类A来负责。

```java
class A{  
    public int func1(int a, int b){  
        return a-b;  
    }  
}  

public class Client{  
    public static void main(String[] args){  
        A a = new A();  
        System.out.println("100-50="+a.func1(100, 50));  
        System.out.println("100-80="+a.func1(100, 80));  
    }  
}
```

运行结果：

```
100-50=50
100-80=20
```

后来，我们需要增加一个新的功能：完成两数相加，然后再与100求和，由类B来负责。即类B需要完成两个功能：

- 两数相减
- 两数相加，然后再加100

由于类A已经实现了第一个功能，所以类B继承类A后，只需要再完成第二个功能就可以了，代码如下：

```java
class B extends A{  
    public int func1(int a, int b){  
        return a+b;  
    }  

    public int func2(int a, int b){  
        return func1(a,b)+100;  
    }  
}  

public class Client{  
    public static void main(String[] args){  
        B b = new B();  
        System.out.println("100-50="+b.func1(100, 50));  
        System.out.println("100-80="+b.func1(100, 80));  
        System.out.println("100+20+100="+b.func2(100, 20));  
    }  
}
```

类B完成后，运行结果：

```
100-50=150
100-80=180
100+20+100=220
```

我们发现原本运行正常的相减功能发生了错误。原因就是类B在给方法起名时无意中重写了父类的方法，造成所有运行相减功能的代码全部调用了类B重写后的方法，造成原本运行正常的功能出现了错误。在本例中，引用基类A完成的功能，换成子类B之后，发生了异常。在实际编程中，我们常常会通过重写父类的方法来完成新的功能，这样写起来虽然简单，但是整个继承体系的可复用性会比较差，特别是运用多态比较频繁时，程序运行出错的几率非常大。如果非要重写父类的方法，比较通用的做法是：原来的父类和子类都继承一个更通俗的基类，原有的继承关系去掉，采用依赖、聚合，组合等关系代替。

里氏替换原则通俗的来讲就是：子类可以扩展父类的功能，但不能改变父类原有的功能。它包含以下4层含义：

- 子类可以实现父类的抽象方法，但不能覆盖父类的非抽象方法。
- 子类中可以增加自己特有的方法。
- 当子类的方法重载父类的方法时，方法的前置条件（即方法的形参）要比父类方法的输入参数更宽松。
- 当子类的方法实现父类的抽象方法时，方法的后置条件（即方法的返回值）要比父类更严格。

### 依赖倒置原则

See <https://alleniverson.gitbooks.io/design-pattern/content/design-pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E5%85%AD%E5%A4%A7%E5%8E%9F%E5%88%993-%E4%BE%9D%E8%B5%96%E5%80%92%E7%BD%AE%E5%8E%9F%E5%88%99.html>

### 接口隔离原则

### 迪米特法则

### 开闭原则