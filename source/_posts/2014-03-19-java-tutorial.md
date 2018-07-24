layout: post
title: "Google Guava"
category: Java
tags: [java]
---

## 语法

- [java访问权限修饰符](http://malipei.iteye.com/blog/151135)
- [Java 引用](http://fuliang.iteye.com/blog/69313)
- [JAVA值传参和引用传参](http://shansun123.iteye.com/blog/365933)
- [枚举在switch/case 中的应用](http://hi.baidu.com/shenmike/blog/item/614fe0caba70ed47f31fe71e.html/cmtid/b9961f34f44ff9365ab5f5fb)
- [java中byte转换int时为何与0xff进行与运算](http://www.blogjava.net/orangelizq/archive/2008/07/20/216228.html)
- [java-foreach语句使用总结](http://zjkilly.iteye.com/blog/509049)
- [[实战]java回调函数](http://kidult.iteye.com/blog/148982)
- [守护线程（Daemon）](http://walsh.iteye.com/blog/336474)
- [Java中super的几种用法并与this的区别](http://blog.csdn.net/anmei2010/article/details/4093118)
- [Java获取文件类型Mime Type的各种方法](http://hotsunshine.iteye.com/blog/857485)
- [CollectionUtils对并交叉的实现](http://www.cnblogs.com/happy200318/archive/2011/7/1.html)
- 获取回车：System.getProperty("line.separator")
- [Hashtable和HashMap的区别](http://blog.csdn.net/iloveyou879244071/article/details/4560965)
- [An introduction to java.time](https://yawk.at/java.time)

### 泛型

Java泛型是擦除的，在泛型类中获取不到泛型类型。
对于类：

```java
public class GenericDao<T>(){
     public GenericDao(){
          this.persistentClass = (Class<T>) ((ParameterizedType) getClass()
                                .getGenericSuperclass()).getActualTypeArguments()[0];
     }
}
```

`new Generic<Person>()`，在构造函数中获取不到泛型类型。

对于子类：

```java
public class PersonDao<Person> extends GenericDao<Person>(){
     
}
```

在父类的构造函数中，可以获取泛型类型。对于子类：

```java
public class PersonDao<T extends Person> extends GenericDao<T>(){
     
}
```

在父类中仍然可以获取泛型类型

可以通过工具来获取泛型类型，<https://github.com/jhalterman/typetools>。

See:


- [java泛型T.class的获取](http://blog.csdn.net/ykdsg/article/details/5472591)
- [在泛型中得到T.class](http://blog.csdn.net/gengv/article/details/5178055)

### 反射


- newInstance

        Class   c＝Class.forName( "Test "); 
        Constructor   con=c.getConstructor(new   Class[]   { "aaa ".getClass(), "aaa ".getClass()}); 
        Test   t=(Test)con.newInstance(new   Object[]   { "arg1 ", "arg2 "}); 

- 类.class和类对象.getClass()、Class.forName("类名")的区别
- Field getField(String name)与Field getDeclaredField(String name)的区别 ： Field getField(String name)返回已加载类声明的所有public成员变量的Field对象，包括从父类继承过来的成员变量，参数name指定成员变量的名称，而Field getDeclaredField(String name)不能获取从父类那继承过来的成员变量
- 获取属性，方法或标注
- 获取任意java类实例的方法和属性，包括父类的方法和属性
- java获取方法调用者信息的例子
- 泛型T.class的获取
- java泛型type体系整理
- JAVA语言中的反射机制

### 集合

- Arrays.fill(); 初始化数组。
- [Java分布式应用学习笔记05多线程下的并发同步器](http://wenku.baidu.com/view/16e2af600b1c59eef8c7b4d7.html)
- [集合的同步问题](http://topic.csdn.net/u/20110319/17/bf35903b-bb6b-466e-a00b-bc62c9894ac6.html)
- [Comparable Comparator具体区别](http://www.iteye.com/problems/3025)
- [Java集合间的相互转换](http://jerval.iteye.com/blog/1001643)
- [Vector和ArrayList区别](http://kiddwyl.iteye.com/blog/56581)

### 编码

1. [编码](http://www.regexlab.com/zh/encoding.htm)

### 格式化

1. [格式化字符串](http://www.rgagnon.com/javadetails/java-0463.html)
2. [JAVA String.format 方法使用介绍](http://zhangwenzhuo.iteye.com/blog/193754)
3. [JAVA数据格式化](http://www.cnblogs.com/ahuo/archive/2007/01/03/610313.html)
4. [ java.text.Format体系总结](http://jianzong2000.iteye.com/blog/406304)
5. [Java日期格式化及其使用例子收集](http://android.blog.51cto.com/268543/50000)

### 异常

1. [JAVA异常设计原则](http://www.iteye.com/topic/857443)
2. [java异常链处理](http://xace.iteye.com/blog/435392)
3. [Java获取异常的堆栈信息](http://blog.csdn.net/snowclash/article/details/5721633)
4. [Eclipse中异常断点问题](http://www.blogjava.net/DLevin/archive/2011/07/20/354741.html)

### 数据类型

1. [java中String的比较](http://www.wenhq.com/article/view_302.html)
2. [Java字符串](http://blog.csdn.net/flyjimi/article/details/2645063)

### 日期时间

1. [java处理日期时间 相加减](http://alexfc.iteye.com/blog/363185)
2. [JAVA中的时间操作](http://www.blogjava.net/hadeslee/archive/2007/09/11/144386.html)
3. [Java日期时间使用总结](http://lavasoft.blog.51cto.com/62575/52975)

### NIO

1. [java.nio.ByteBuffer 类 缓冲区](http://www.cnblogs.com/freeliver54/archive/2011/08/10/2133382.html)
2. [NIO ByteBuffer 使用方法](http://janla.iteye.com/blog/322638)
3. [Convert ByteBuffer to an IntBuffer](http://www.java2s.com/Tutorial/Java/0180__File/ConvertByteBuffertoanIntBuffer.htm)
4. [Java学习笔记之Buffer](http://www.360doc.com/content/11/0330/21/2771415_105984429.shtml)
5. [Direct vs non-direct ByteBuffer](http://littcai.iteye.com/blog/300581)

### 对象池

1. [Pool resources using Apache's Commons Pool Framework](http://www.javaworld.com/javaworld/jw-01-2005/jw-0124-pool.html?page=4)
2. [官网](http://commons.apache.org/pool/examples.html)
3. [Jakarta Commons Pool 对象池 使用](http://keyboardsun.iteye.com/blog/436229)

##  Concurrent

- [Java SE 8 在并发工具方面的加强 - WEB开发者](http://www.admin10000.com/document/4271.html)

## Guava

- [[Google Guava] 6-字符串处理：分割，连接，填充 | 并发编程网 - ifeve.com](http://ifeve.com/google-guava-strings/)
- [[Google Guava] 4-函数式编程 | 并发编程网 - ifeve.com](http://ifeve.com/google-guava-functional/)

## Concurrence

- [比AtomicLong还高效的LongAdder 源码解析](http://ifeve.com/atomiclong-and-longadder/)
- [从LongAdder看更高效的无锁实现](http://coolshell.cn/articles/11454.html)

## Java8

- [Java 8 Pocket Guide](http://www.salttiger.com/java-8-pocket-guide/)
- [Java 8学习资料汇总 - WEB开发者](http://www.admin10000.com/document/4616.html)

## JavaScript

- [Java 8 Nashorn Tutorial - Benjamin Winterberg](http://winterbe.com/posts/2014/04/05/java8-nashorn-tutorial)
- [Client-Server Web Apps with JavaScript and Java](http://www.salttiger.com/client-server-web-apps-with-javascript-and-java/)

## Lamda

- [Functional Programming in Java](http://www.salttiger.com/functional-programming-in-java/)
- [Java 8 Lambdas](http://www.salttiger.com/java-8-lambdas/)
- [Java 8: Lambdas, Part 1](http://ifeve.com/java-8-lambdas-part-1/)

## Native

[bridj - BridJ: Let Java & Scala call C, C++, Objective-C, C#... - Google Project Hosting](https://code.google.com/p/bridj/)

## Performance

- [九大工具助你玩转Java性能优化 - WEB开发者](http://www.admin10000.com/document/4693.html)

## Library

### google-guice

google开发的，基于java的轻量级依赖注入框架。<https://code.google.com/p/google-guice/>

文档：<https://code.google.com/p/google-guice/downloads/detail?name=Guice-Google-IO-2009.pdf&can=2&q=>

中文学习专题：<http://tech.it168.com/zt/guice/>

Guice指南-自举（Bootstrapping）你的应用： <http://space.itpub.net/13270562/viewspace-214955>

## Tutorial

- [akullpp/awesome-java](https://github.com/akullpp/awesome-java)
- [Java知识图谱收集整理 - 简书](http://www.jianshu.com/p/746c01a8535a)

## Book

- [Java: The Good Parts](http://www.salttiger.com/java-the-good-parts/)
- [Java SE 8 for the Really Impatient](http://www.salttiger.com/java-se-8-for-the-really-impatient/)
- [Java Cookbook, 3rd Edition](http://www.salttiger.com/java-cookbook-3rd-edition/)