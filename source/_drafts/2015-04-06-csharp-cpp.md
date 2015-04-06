layout: post
title: "C#、C++/CLI、非托管C++三层架构"
category : C#
tags : [c#, csharp, c++, cpp]
---

## 几个概念：

1. CLR：通用语言运行平台（Common Language Runtime，简称CLR）定义了一个代码运行的环境，核心功能包括：内存管理、程序集加载、安全性、异常处理和线程同步等。
2. 非托管C++：不能享受一些运行库所提供的服务，必须自己提供垃圾回收、类型检查、安全支持等操作。
（从C++到C++/CLI）
3. [托管C++](http://zh.wikipedia.org/wiki/C%2B%2B%E6%89%98%E7%AE%A1%E6%89%A9%E5%B1%95)：是微软对C++的一个语法扩展，允许C++程序员在.NET框架和CLR的基础上进行托管编程，可以无缝地集成托管和非托管代码，所以经常被用于其他语言和非托管代码之间的桥梁。
4. [C++/CLI](http://zh.wikipedia.org/zh-cn/C%2B%2B/CLI)：是用来代替托管C++的语言规范，在兼容原有的C++标准的同时，重新简化了托管C++的语法，提供了更好的代码可读性。C++/CLI现在可以被Visual C++ 2005和更高版本的编译器支持。
    
## C#、C++/CLI、非托管C++三层架构：

1. 创建非托管C++的static library工程：
    
    ![](http://johnnyimages.qiniudn.com/cli-new-project.png)

    ![](http://johnnyimages.qiniudn.com/cli-library.png)

2. 添加非托管的c++文件：.h和.cpp文件：
    
    ![](http://johnnyimages.qiniudn.com/cli-add-class.png)

3. 编译非托管C++工程，然后可在与.sln文件同级的Debug文件夹下找到非托管C++工程编译后的.lib文件。
4. 创建托管C++的工程：

    ![](http://johnnyimages.qiniudn.com/cpp-project.png)

    红框处设置了该工程是支持CLR的托管C++工程：

    ![](http://johnnyimages.qiniudn.com/cli-cpp-project.png)

5. 为托管C++工程添加非托管C++工程引用（如果添加了非托管C++工程引用，则不用将非托管C++的.lib文件添加到托管C++工程中，但.h文件还是要添加到托管C++工程中）

    ![](http://johnnyimages.qiniudn.com/cli-class.png)

6. 在托管C++工程中添加要引用的非托管C++的.h文件（注：引用的非托管C++的.h文件要复制到托管工程文件夹下，然后再包含到托管C++工程中，不能通过Add Existing Item方式来添加，因为通过Add Existing Item方式添加的只是.h文件的引用，并没有真正把.h文件拷贝到托管C++工程中，这样编译托管C++工程的时候会提示找不到文件）：

    ![](http://johnnyimages.qiniudn.com/cli-cpp-h.png)

7. 添加非托管C++工程的.lib文件：

    ![](http://johnnyimages.qiniudn.com/cli-lib2.png)

    也可在托管C++工程中添加一个筛选文件夹Lib，用来存放所有引用的.lib文件。

    ![](http://johnnyimages.qiniudn.com/cli-lib3.png)    

8. 在Clr.h中定义了类myClass，该类拥有一个非托管C++类的实例对象，实现对非托管C++类的实例对象的调用。
9. 创建C#工程：

    ![](http://johnnyimages.qiniudn.com/cli-charp.png)

10. 在C#工程中添加对托管C++工程的引用：
11. 在C#工程可直接使用托管C++工程中定义的类及其属性和方法，如下：
                
    var myC = new myClass { FirstName = "FirstName", LastName = 
    "LastName" };
    myC.myHandler += DoMyHandler;
    string str = myC.JoinName();

## 托管和非托管C++数据类型对应

<http://hi.baidu.com/buildingit/blog/item/4785fd1126031f78ca80c4eb.html>

类别|  类名|  说明|  C# 数据类型| C++ 托管扩展数据类型
----|-------|-------|--------------|------------
整数|  Byte |   8 位的无符号整数。  |byte   | char
    | SByte |  8 位的有符号整数。不符合 CLS。 | sbyte   |signed char
    |Int16  | 16 位的有符号整数。 |short  | short
    |Int32  | 32 位的有符号整数。 |int |int 或 long
    |Int64  | 64 位的有符号整数。 |long  |  __int64
    |UInt16  |16 位的无符号整数。不符合 CLS。|  ushort|  unsigned short
    |UInt32 | 32 位的无符号整数。 不符合 CLS。|  uint |   unsigned int 或 unsigned long
    |UInt64  |64 位的无符号整数。 不符合 CLS。|ulong |unsigned __int64
浮点|  Single|  单精度（32 位）浮点数字。|  float|   float
    |Double  |双精度（64 位）浮点数字。  |double | double
逻辑 | Boolean 布尔值（真或假）。  | bool  |  bool
其他 | Char  |  Unicode（16 位）字符。   | char  |  wchar_t
     |Decimal| 96 位十进制值。   |decimal |Decimal
     |IntPtr  |大小取决于基础平台（32 位平台上为 32 位值，64 位平台上为 64 位值）的有符号整数。 |IntPtr 无内置类型。| IntPtr 无内置类型。
     |UIntPtr| 大小取决于基础平台的无符号整数（32 位平台上为 32 位值，64 位平台上为 64 位值）。 不符合 CLS。|    UIntPtr |    UIntPtr 
类对象 Object | 对象层次结构的根。  | object | Object*
    |String  |Unicode 字符的不变的定长串。  |string  |String*

Wtypes.h 中的非托管类型  |  非托管 C 语言类型  |托管类名 |   说明
-------------------------|---------------------|---------|-------
HANDLE  |void*  | System.IntPtr  | 32 位
BYTE  |  unsigned char  | System.Byte| 8 位
SHORT  | short  | System.Int16  |  16 位
WORD  |  unsigned short  |System.UInt16  | 16 位
INT |int| System.Int32  |  32 位
UINT  |  unsigned int  |  System.UInt32  | 32 位
LONG  |  long  |  System.Int32  |  32 位
BOOL  |  long  |  System.Int32  |  32 位
DWORD  | unsigned long |  System.UInt32  | 32 位
ULONG  | unsigned long  | System.UInt32  | 32 位
CHAR  |  char |   System.Char| 用 ANSI 修饰。
LPSTR |  char* |  System.String 或 System.StringBuilder |用 ANSI 修饰。
LPCSTR | Const char* | System.String 或 System.StringBuilder |用 ANSI 修饰。
LPWSTR | wchar_t*  | System.String 或 System.StringBuilder | 用 Unicode 修饰。
LPCWSTR | Const wchar_t*  | System.String 或 System.StringBuilder   | 用 Unicode 修饰。
FLOAT|   Float |  System.Single |  32 位
DOUBLE  |Double | System.Double |  64 位

See also <http://www.cppblog.com/mzty/archive/2006/08/17/11358.html>


## 相关资料链接

1. [将程序从托管扩展C++迁移到C++/CLI](http://msdn.microsoft.com/zh-cn/library/ms379603(VS.80).aspx)
2. [C++/CLI迁移入门](http://msdn.microsoft.com/zh-cn/library/ms235289.aspx)
3. [C++/CLI基本数据类型探索](http://www.bccn.net/Article/kfyy/cjj/jszl/200608/4229.html)
4. [对应于 C++ 本机类型的 .NET Framework 类型](http://msdn.microsoft.com/zh-cn/library/0wf2yk2k.aspx)
5. [如何：在各种字符串类型之间进行转换](http://msdn.microsoft.com/zh-cn/library/ms235631(v=VS.100).aspx)
6. [托管代码中的指针](http://msdn.microsoft.com/zh-cn/library/ms235631(v=VS.100).aspx)
    - interior_ptr：当垃圾回收器移动对象时，Interior pointer能随之移动，并始终指向该对象。可以进行指针运算，可以解引用。
    - pin_ptr：在外部调用托管堆中指针时，垃圾回收过程中该指针会发生改变，引起外部调用的错误。必须使用pin_ptr指针将该指针固定。
7. 从 System::String* 转换为 Char* 有以下两种方式：
    - PtrToStringChars 指定了一个指向实际 String 对象的内部指针。如果将此指针传递给非托管函数调用，则必须先锁定该指针，以确保在进行异步垃圾回收过程中对象不会移动。
    
            pin_ptr<const WCHAR> wch = PtrToStringChars(str);
    
    - StringToHGlobalAnsi 将托管 String 对象的内容复制到本机堆，然后动态地将它转换为美国国家标准学会 (ANSI) 格式。此方法将分配所需的本机堆内存。
    
            //using namespace System::Runtime::InteropServices;
            System::String * str = S"Hello world\n";
            char* str2 = (char*)(void*)Marshal::StringToHGlobalAnsi(str);
            printf(str2);
            Marshal::FreeHGlobal(str2);

    第一种方式是托管指针，由CLR管理内存的释放，第二种方式由于在本机堆内分配了内存，要手动释放在本机堆内分配的内存。Marshal设计的目的是给不能访问非托管的代码以访问托管代码的能力，比如C＃。C++本身能够访问非托管代码，所以没有迫切需要，不要使用。