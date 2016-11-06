---
layout: "post"
title: "Java Interview Basic Knowlege"
date: "2016-11-05 22:51"
categories: Java
---

## 基础

### switch支持的类型：byte, short, int, char, enum,

注意：不支持long,double，JDK7之后，开始支持String。

```cs
//简单示例
  public class MyDemo {
      public static void main(String... args) {
          Demo demo = Demo.A;
          switch (demo) {
              case A:
                  break;
              case B:
                  break;
          }
      }
      enum Demo {
          A,
          B,
          C
      }
  }
```

### if和switch的区别

- if ：1.对具体的值进行判断  2.对区间判断  3.对运算结果是boolean类型的表达式进行判断
- switch :1.对具体的值进行判断；2.值的个数通常是固定的。

对于几个固定值的判断，建议使用switch语句，因为switch语句会将具体的答案加载进内存，相对高效一点。

### 重载和重写的区别

* 重载：允许存在一个以上的同名函数，只要它们的参数类型不同即可。
* 重写：当子类继承父类，沿袭了父类的功能到子类中，子类虽具备该功能，但功能内容不一致，这是使用覆盖特性，保留父类的功能定义，并重写功能内容。

### 单例模式

饿汉式

```java
private static Single s = new Single ( );
  private Single ( ) { }
  public static Single getInstance ()
  {
    return s ;
  }
}
```

懒汉式

```java
class Single {
      public static Single getInstance (){
          if ( s== null ){
              synchronized (Single.class){//锁不读可以提高效率
              if ( s== null ){
                  s = new Single () ;
               }
           }
          return s ;
      }
  }
```

### 特殊关键字：final

1.    可以修饰类、函数、变量；
2.    被final修饰的类不可以被继承。为了避免被继承，被子类复写。final class Demo { }
3.    被final修饰的方法不可以被复写。final void show () { }
4.    被final 修饰的变量是一个常量，只能赋值一次。
5.    内部类定义在类中的局部位置上时，只能访问该局部被final修饰的局部变量。

### 异常

（关于问题1，谢谢[ylt](http://www.jianshu.com/users/5843d441d2ff/timeline)提醒）

```java
try{

}catch(){

}finally{}
```

1. 在catch中return(),finally{}会不会执行？

  答：会，会在return之后执行。

2. finally()在什么情况下不会执行

  答：只有一种情况不会执行，当执行到System.exit(0)时，finally不会执行。

```java
public class Test {
  public static void main(String[] args) {
      System.out.println("haha:" + haha(true));
  }
  private static boolean haha(boolean isTrue) {
      try {
          int i = 1 / 0;
          return  isTrue ? System.out.printf("return try !null ", "test") != null : System.out.printf("return try null ", "test") == null;
      } catch (Exception e) {
          System.out.println("catch");
          return  isTrue ? System.out.printf("return catch !null ", "test") != null : System.out.printf("return catch null ", "test") == null;
      } finally {
          System.out.println("");
          System.out.println("finally");
      }
  }
}
```

```java
//打印结果：
catch
return catch !null
finally
haha:true
```

### 常见Runtime异常

```
ArithmeticException, ClassCastException, IllegalArgumentException,
IndexOutOfBoundsException, NullPointerException,
```

### 访问权限

![](http://upload-images.jianshu.io/upload_images/1975505-36b3596263710c99.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## Java静态代码块、构造函数、构造代码块

先看下面一段代码，运行Test，会打印什么？

```cs
package test;
  public class Test {
      public static void main(String... args) {
          TestA a;
          a = new TestA();
          a = new TestA();
          TestA aa = new TestA();
      }
  }
  class TestA {
      {
          System.out.println("TestA code create");
      }

      private TestB b = new TestB();
      private static TestC c = new TestC();

      public TestA() {
          System.out.println("TestA create");
      }

      static {
          System.out.println("TestA static create");
      }
  }
  class TestB {
      public TestB() {
          System.out.println("TestB create");
      }
  }
  class TestC {
      public TestC() {
          System.out.println("TestC create");
      }
  }
```

打印结果：

```sql
TestC create
TestA static create
TestA code create
TestB create
TestA create
TestA code create
TestB create
TestA create
TestA code create
TestB create
TestA create
```

### static特点

1.    随着类的加载而加载（随着类的消失而消失，生命周期最长）
2.    优先于对象存在
3.    被所有对象所共享
4.    可以直接被类所调用
5.    static是一个修饰符，用于修饰成员

### 构造代码块

作用：给对象进行初始化，对象一建立就运行，而且优先于构造函数执行。

和构造函数的区别：

- 构造代码块是给所有对象进行统一初始化；而构造函数是给对应的对象初始化
- 构造代码块中定义的是不同对象共性的初始化内容

### 静态代码块

```cs
static{
      静态代码块中的执行语句；
}

特点：随着类的加载而执行，只执行一次（再new一个对象也不会执行，类只加载一次），

如果定义在有主函数的类中，则优先于主函数执行。用于给类进行初始化。
有些类不用创建对象，无法用构造函数初始化，就通过静态代码块初始化。

执行顺序：静态代码块先执行，如果有对象，构造代码块先执行，然后是构造函数。
如果没有对象，则构造代码块和构造函数都不会执行。
```

## Java-封装、继承、多态

### 抽象类的特点

1.    抽象方法一定在抽象类中。
2.    抽象方法和抽象类都必须被abstract关键字修饰。
3.    抽象类不可以用new创建对象，因为调用抽象方法没有意义。
4.    抽象类中的抽象方法要被使用，必须由子类复写所有的抽象方法后，建立子类对象调用。如果子类只覆盖了部分抽象方法，那么该子类还是一个抽象类。强迫子类复写，强迫子类做一些事。
5.    抽象类中可以不定义抽象方法，如果不定义抽象方法，那么抽象类的功能就是为了不让该类建立对象。

### 抽象关键字不可以和哪些关键字共存？

1. private不能：抽象方法就是给子类覆盖的，私有了就不能覆盖了。
2. static不能：static可以直接用类名调用，而调用抽象方法没有意义。
3. final 不能：final修饰的方法不可以被复写，修饰的类不可以被继承。与abstract冲突。

### 接口的特点

- 接口是对外暴露的规则。
- 接口是程序的功能扩展。
- 接口可以多实现。
- 类与接口直接是实现关系，而且类可以继承一个类的同时实现多个接口。
- 接口与接口之间可以有继承关系，可以多继承。

因为接口没有方法体，不会存在两个父类出现同一个方法但是方法体不同的情况，不会引起冲突，如下：

```java
  public class Test implements d{
      public static void main(String... args) {
      }

      @Override
      public void as() {
      }
  }

  interface d extends e,f {
  }
  interface f{
      void as();
  }
  interface e{
      void as();
  }
```

### 接口和抽象类的异同点

相同点：都是不断向上抽取而来的。不可以被实例化

不同点：

- 抽象类需要被继承，而且只能单继承；接口需要被实现，而且可以多实现
- 抽象类中可以定义抽象方法和非抽象方法，子类继承后，可以直接使用非抽象方法；接口只能定义抽象方法，必须有子类实现。
- 抽象类的继承，是is a关系，在定义该体系的基本共性内容；接口的实现是like a 关系，在定义体系额外功能。

### 继承

子类的实例化过程：

结论：子类的所有的构造函数，默认都会访问父类中空参数构造函数，因为子类中每一个构造函数内的第一行都有一句隐式的super() ;

当父类中没有空参数的构造函数时，子类必须手动通过super或者this语句形式来指定要访问的构造函数。

当然：子类的构造函数第一行也可以手动指定this语句来访问本类中的构造函数，

子类中至少会有一个构造函数会访问到父类中的构造函数。

### 对象的初始化过程

见下图：

![](http://upload-images.jianshu.io/upload_images/1975505-4c0280c26dc8f362.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

打印结果：

![](http://upload-images.jianshu.io/upload_images/1975505-e79c1f6d1d05fffd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 线程

关于线程这块，后期有时间会写一个完整的深入的文章，这里写的都是比较简单基础的线程的一些知识。

创建线程的两种方式：

1. 继承Thread类。

  - 定义类继承Thread；
  - 复写父类中的方法；目的：将自定义代码存储在run方法中，让线程运行。
  - 调用线程的start方法，该方法有两个作用：启动线程，调用run方法

2. 实现Runnable接口

  - 定义类实现Runnable接口。
  - 覆盖Runnable接口中的run方法。
  - 通过Thread类建立线程对象。
  - 将Runnable接口的子类对象作为实际参数传递给Thread类的构造函数。
  - 调用Thread类的start方法开启线程并调用Runnable接口子类的run方法。

### 实现方式和继承方式有什么区别？

1. 实现方式相比继承方式的好处：

  避免了单继承的局限性（单继承只能继承一个父类）。在定义线程时，建议使用实现方式。

2. 存放代码的位置不一样：

  继承Thread：线程代码存放Thread子类的run方法中

  实现Runnable，线程代码存在接口的子类的run方法。

### 实现Runnable接口的好处：

1. 将线程的任务从线程的子类中分离出来，进行了单独的封装。按照面向对象的思想将任务的封装成对象。

2. 避免了java单继承的局限性。

### 同步的两种表现形式

同步代码块

```
synchronized(对象){
  需要被同步的代码；
}
```

同步函数。

将synchronized关键字作为修饰符放在函数上。

```
public synchronized void add()
```

* 同步函数用的是哪一个锁：函数需要被对象调用，那么该函数都有一个所属对象引用，就是this，所以同步函数使用的锁是this（对象）

* JDK1.5中提供了多线程升级解决方案，将同步synchronized替换成实现Lock操作，将Object中的wait，notify，notifyAll，替换成了Condition对象的await(),signal(),signalAll()，该对象可以通过Lock锁进行获取。
```

* 停止线程

原理：run方法结束

1. 使用intrrupt()方法。该方法是结束线程的冻结状态，使线程回到运行状态中来。

  当线程处于冻结状态，就不会结束读取到标记，那么线程就不会结束。

  当没有指定的方式让冻结的线程恢复到运行状态时，这时需要对冻结进行清除。

  强制让线程恢复到运行状态中来，这样就可以操作标记让线程结束。

2. 定义循环结束标记。线程运行代码一般都是循环，只要控制了循环即可。

* 线程常见方法

    ```cs
    1 setDeamon() 守护线程：setDaemon(ture) ;
        也称后台线程，当前台线程执行时后台线程也在执行，但是当前台线程全部执行完关闭时，
        后台线程也会跟着自动关闭，jvm退出。
        ！！该方法必须在启动线程前调用。
       2 join()等待该线程终止：一般用于临时加入线程。
        当A线程执行到了B线程的.join()方法时，A就会等待，等B线程都执行完，A才会执行
      3 yield()方法：释放执行权，让其他线程运行。
        暂停当前正在执行的线程对象，并执行其他线程。
    ```

* 一个死锁的 demo

    ```java
    class Test implements Runnable {
          private boolean flag;
          Test(boolean flag) {
              this.flag = flag;
          }
          public void run() {

              if (flag) {
                  while (true)
                      synchronized (MyLock.locka) {
                          System.out.println(Thread.currentThread().getName()
                                  + "..if   locka....");
                          synchronized (MyLock.lockb) {
                              System.out.println(Thread.currentThread().getName()
                                      + "..if   lockb....");
                          }
                      }
              } else {
                  while (true)
                      synchronized (MyLock.lockb) {
                          System.out.println(Thread.currentThread().getName()
                                  + "..else  lockb....");
                          synchronized (MyLock.locka) {
                              System.out.println(Thread.currentThread().getName()
                                      + "..else   locka....");
                          }
                      }
              }
          }
      }

      class MyLock {
          public static final Object locka = new Object();
          public static final Object lockb = new Object();
      }
      class DeadLockTest {
          public static void main(String[] args) {
              Test a = new Test(true);
              Test b = new Test(false);
              Thread t1 = new Thread(a);
              Thread t2 = new Thread(b);
              t1.start();
              t2.start();
          }
      }
    ```

* wait和sleep的区别

    ```perl
    1. wait 可以指定时间也可以不指定。sleep必须指定时间。
      2. 在同步中，对CPU的执行权和锁的处理不同：
          wait：释放执行权，释放锁
          sleep：释放执行权，不释放锁
    ```

* StringBuffer和StringBuilder的区别

    StringBuffer是线程同步（安全）。如果是单线程，效率就比较低

    StringBuilder是线程不同步。

## 集合

![](http://upload-images.jianshu.io/upload_images/1975505-5e4feced20d43d03.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### Collection：单列集合

* List 和 set

    ```mathematica
    List：元素是有序的，元素可以重复，因为该集合体系有索引
      Set：元素是无序的，元素不可以重复（存入和取出的顺序不一定一致）。
      List特有方法：凡是可以操作角标的方法都是该体系特有的方法
    ```

* List中常见的三个子类

    1. ArrayList ：底层的数据使用的是数组结构。
      特点：查询速度很快，但是增删稍慢。线程不同步，效率高 。
      可变长度数组，默认容量为10的空列表，如果超过了，则50%的增加
    2. LinkedList ：底层的数据使用的是链表数据结构。
    特点：增删数度很快，但是查询稍慢。
    3. Vector：底层使用的是数组结构。枚举是Vector特有的取出方式
    是同步的，效率较低，被ArrayList替代。最早出现的。
    默认容量为10的空列表，如果超过了，则100%的增加.

* LinkedList

    ```cs
    JDK1.6版本出现的:pollFirst()，pollLast()，peekFirst() ，peekLast()，offerFirst()，offerLast()
      (如果链表为空，返回null )。
      分别替代了remove 和 get 和add (如果链表为空，则抛出异常)。
    ```

* set常见子类

    ```bash
    1. HashSet：底层数据结构是哈希表。
      HashSet是如何保证元素的唯一性的：
      是通过元素的两个方法，hashCode和equals来完成，如果元素的hashCode值相同，
      才会判断equals是否为true，如果元素的hashCode值不同，不会调用equals 。
      开发时描述事物，需要往集合里面存时，一般都要复写hashCode和equals。
    ```

* TreeSet底层的数据结构：二叉树

    保证数据元素唯一性的依据compareTo方法return 0，为0则表示是相同元素 ;

      排序的两种方式：
      TreeSet排序的第一种方式：
      让元素自身具备比较性。元素需要实现Comparable接口，覆盖compareTo方法。这种方式也称为元素的自然顺序，或者叫做默认顺序。

      TreeSet的第二种排序方式：
      当元素自身不具备比较性时，或具备的比较性不是所需要的，这是就需要让集合自身具备比较性。
      定义一个比较器，将比较器对象作为参数传递给TreeSet集合的构造函数。
      定义一个类，实现Comparator接口，覆盖compare方法

      当两种排序都存在时，以比较器为主。

### 泛型

泛型技术是给编译器使用的技术,用于编译时期。确保了类型的安全。

运行时，会将泛型去掉，生成的class文件中是不带泛型的,这个称为泛型的擦除。
为什么擦除呢？因为为了兼容运行的类加载器。
泛型的补偿：在类加载器原有基础上，编写一个补偿程序。在运行时，通过反射，
获取元素的类型进行转换动作。不用使用者在强制转换了。

### Map：双列集合

* 常见子类

    ```javascript
    Hashtable：底层是哈希表数据结构，不可以存入null键null值，该集合是线程同步的。jdk1.0 ,效率低 。
      HashMap：底层是哈希表数据结构，并允许使用null键null值，该集合不是同步的，jdk1.2 ,效率高。
      TreeMap ：底层是二叉树数据结构，线程不同步，可以给map集合中的键进行排序 。
      Map 和 Set很像 ：其实，Set底层使用了Map集合 。
    ```

* map集合的两种取出方式：

    ```mathematica
    1.Set<K> KeySet：
      将Map中所有的Key存到了Set集合中，因为Set集合具备迭代器。
      所有可以迭代方式取出所有的键，再根据get方法，获取每一个键对应的值
      Map集合的取出原理：将Map集合转成Set集合，再通过迭代器取出

      2.Set<Map.Entry<K,V>>
      entrySet：将Map集合中的映射关系存入到了Set集合中，而这个关系的数据类型就是：Map.Entry。
      Map.Entry ：其实Entry也是一个接口，它是Map接口中的一个内部接口。
      先有Map，才有映射关系，所有Entry类定义在Map内部
    ```

* Math类：

    ```cpp
    double d = Math.ceil(12.56);// 13.0 。ceil返回大于指定整数的最小整数
      double d1 =Math.floor(12.34);//12.0 。floor返回小于指定数据的最大整数
      long l = Math.round(12.64);//四舍五入
      double d2 = Math.pow(2,3);//幂运算 ：2^3 = 8
    ```

## io

* 字节流：InputStream（读）  OutputStream（写）

* RandomAccessFile(断点下载会用到的类)：

    随机访问文件，自身具备读写的方法。
    通过skipBytes(int x),seek(int x)来达到随机访问。

    seek(int x)：调整对象中指针，指针跳转，可以实现对数据指定位置的读取和写入。

* IO流体系：

    ```
    字符流：
      Reader
          |--BufferedReader:
              |--LineNumberReader
          |--CharArrayReader
          |--StringReader
          |--InputStreamReaer
              |--FileReader

      Writer
          |--BufferedWriter
          |--CharArrayWriter
          |--StringWriter
          |--OutputStreamWriter
              |--FileWriter
          |--PrintWriter

      字节流：
      InputStream
          |--FileInputStream:
          |--FilterInputStream
              |--BufferedInputStream
              |--DataInputStream
          |--ByteArrayInputStream
          |--ObjectInputStream
          |--SequenceInputStream
          |--PipedInputStream

      OutputStream
          |--FileOutputStream
          |--FilterOutputStream
              |--BufferedOutputStream
              |--DataOutputStream
          |--ByteArrayOutputStream
          |--ObjectOutputStream
          |--PipedOutputStream
          |--PrintStream
    ```

* 示例：读出C盘下txt文件

    ```java
    public static void listDemo_2() {
              File dir = new File("c:\\");
              String[] names = dir.list(new SuffixFilter(".txt"));
              for(String name : names){
                  System.out.println(name);
              }
          }

      public class SuffixFilter implements FilenameFilter {
          private String suffix ;
          public SuffixFilter(String suffix) {
              super();
              this.suffix = suffix;
          }
          @Override
          public boolean accept(File dir, String name) {
              return name.endsWith(suffix);
          }
      }
    ```

* 示例：深度递归，读出制定目录下的所有文件和文件夹，包括子目录。

    ```java
    public class FileTest {
          public static void main(String[] args) {
              File dir = new File("D:\\me\\mime\\RuntimePermissions");
              listAll(dir,0);
          }
          /**
           *
           * @param dir
           * @param spaceLevel 这个是为了打印结果好看，与空格有关的参数
           */
          public static void listAll(File dir,int spaceLevel) {
              System.out.println(getSpace(spaceLevel)+dir.getName());
              //获取指定目录下当前的所有文件夹或者文件对象
              spaceLevel++;
              File[] files = dir.listFiles();

              for(int x=0; x<files.length; x++){

                  if(files[x].isDirectory()){
                      listAll(files[x],spaceLevel);
                  }
                  else
                      System.out.println(getSpace(spaceLevel)+files[x].getName());
              }
          }
          private static String getSpace(int spaceLevel) {
              StringBuilder builder = new StringBuilder();
              builder.append("|--");
              for(int x=0; x<spaceLevel; x++){
                  builder.insert(0,"|  ");
              }
              return builder.toString();
          }
      }
    ```
