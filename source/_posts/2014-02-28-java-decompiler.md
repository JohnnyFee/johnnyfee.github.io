layout: post
title: "Java 反编译"
category: Java
tags: [java, decompile]
---
Java 反编译工具当前比较好用的有JadClipse和JD-Eclipse，其中JadClipse需要配合外部命令jad.exe。网上据说JD反编译出来的源码更精确，也有说JadClipse好的。各有千秋。

注意，Android官方class反编译出来的源代码看不到方法体，只能看到一堆"stub"

## JadClipse

Jad是一个Java的一个反编译工具，是用命令行执行，和通常JDK自带的java，javac命令是一样的。不过因为是控制台运行，所以用起来不太方便。不过幸好有一个eclipse的插件JadClipse，二者结合可以方便的在eclipse中查看class文件的源代码。

<!--more-->

下面介绍一下配置：   

- 安装Jadclipse。
    可以选择以下两种方法的一种安装。
    - [下载JadClipse](http://jadclipse.sourceforge.net/wiki/index.php/Main_Page#Download)。将下载下来的Jadclipse，如net.sf.jadclipse_3.3.0.jar 拷贝到Eclipse下的plugins目录即可。当然也可以用 links 安装。 
    
    - Eclipse/Help/Install New Software 在Work with: 输入：<http://jadclipse.sf.net/update>

- 下载Jad， [http://www.varaneckas.com/jad](http://www.varaneckas.com/jad "http://www.varaneckas.com/jad")

- 将Jad.exe拷贝到JDK安装目录下的bin文件下 （方便，与java，javac等常用命令放在一起， 可以直接在控制台使用jad命令 ），我的机器上的目录是`D:\Program Files\Java\jdk1.6.0_02\bin\jad.exe`   

- 然后，重新启动Eclipse，找到 Eclipse->Window->Preferences->Java ，此时你会发现会比原来多了一个 JadClipse 的选项，单击，会出现，如下： 

    ![](http://www.blogjava.net/images/blogjava_net/landon/jad.jpg)

    在 Path to decompiler 中输入你刚才放置jad.exe的位置，如上图。当然在JadClipse下还有一些子选项，如Debug，Directives等，按照默认配置即可。   

- 基本配置完毕后，我们可以查看一下 class文件的默认打开方式 ， Eclipse->Window->Preferences->General->Editors->File Associations ，我们可以看到下图：   

    ![](http://www.blogjava.net/images/blogjava_net/landon/jadclipse.jpg)

    我们可以看到class文件的打开方式有两个， JadClipse 和Eclipse自带的 Class  File Viewer ，把JadClipse设置为默认，双击`.class`后便可即时反编译为相应的源码。   

## JD-Eclipse

- Plug-in  http://java.decompiler.free.fr/jd-eclipse/update
- http://java.decompiler.free.fr/?q=jdgui

## 配置Eclipse

如果两种反编译器都安装了，建议按如下方法设置File Associations。

Eclipse Preference / General Editors / File Associations：

    *.class
        1. Class File Viewer (eclipse自带，看不了源码)
        2. Class File Editor (JadClipse反编译)
        3. Decompiled Class File Viewer (JD反编译)
    *.class without source
        1. Class File Editor (JadClipse反编译)
        2. Decompiled Class File Viewer (JD反编译)
        3. Class File Viewer (eclipse自带，看不了源码)

其中Class File Editor (JadClipse)和Decompiled Class File Viewer (JD)的优先级可酌情替换。

## 参考

- [Eclipse反编译工具Jad及插件JadClipse配置 - I want to fly higher - BlogJava](http://www.blogjava.net/landon/archive/2010/07/16/326294.html)

