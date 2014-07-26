---
layout: post
title: "C++ Tutorial"
category: C++
tags: [c++]
--- 
## 编码规范

- [darcyliu/google-styleguide](https://github.com/darcyliu/google-styleguide)
- [GNU Coding Standards](http://www.gnu.org/prep/standards/standards.html)
- [C++ 风格指南 — Google 开源项目风格指南](http://zh-google-styleguide.readthedocs.org/en/latest/google-cpp-styleguide/contents/)
- [C++STYLE](http://sunsite.ualberta.ca/Documentation/Gnu/libstdc++-2.90.8/html/17_intro/C++STYLE)

## Data Type

- [C语言的整型溢出问题](http://coolshell.cn/articles/11466.html)

## Program

- [让C程序更高效的10种方法 - 博客 - 伯乐在线](http://blog.jobbole.com/1198/)

<!--more-->

## friend

参考：[C++友元friend-jackychu的专栏](http://blog.csdn.net/jackychu/article/details/3020866)

c++利用friend修饰符，可以让一些你设定的函数能够对这些保护数据进行操作，避免把类成员全部设置成public，最大限度的保护数据成员的安全。 缺点是在一定程度上破坏了类的封装特性。

### 友元函数

声明：

    class Internet{    
        // 友元函数的声明
        friend void ShowN(Internet &obj);  
        public:    
            char name[20];  
            char address[20];  
        };  
    }

定义：

    // 函数定义,不能写成：void Internet::ShowN(Internet &obj)
    void ShowN(Internet &obj){  
        cout<<obj.name<<endl;  
    }  

使用：

    void main()    
    {  
        Internet a("中国软件开发实验室","www.cndev-lab.com");  
        ShowN(a);  
        cin.get();  
    }

上面的代码通过友元函数的定义，我们成功的访问到了a对象的保护成员name,友元函数并不能看做是类的成员函数，它只是个被声明为类友元的普通函数，所以在类外部函数的定义部分不能够写成void Internet::ShowN(Internet &obj)，这一点要注意。

__一个普通函数可以是多个类的友元函数__，如：

申明：

    class Internet{    
        friend void ShowN(Internet &obj,Country &cn);
    }

    class Country{
        friend void ShowN(Internet &obj,Country &cn);
    }

定义：

    void ShowN(Internet &obj,Country &cn){  
        cout<<cn.cname<<"|"<<obj.name<<endl;  
    }

注意，只需定义一次。

__一个类的成员函数函数也可以是另一个类的友元__,，可以使得一个类的成员函数可以操作另一个类的数据成员，我们在下面的代码中增加一类Country。

    class Country{
        void Editurl(Internet &temp);//成员函数的声明  
    }

    class Internet{
          friend void Country::Editurl(Internet &temp);//友元函数的声明  
    }

在Country::Editurl实现中，可以访问`Internet &temp`的保护属性。

__整个类也可以是另一个类的友元__，该友元也可以称做为友类。友类的每个成员函数都可以访问另一个类的所有成员。 

    class Country{
         friend class Internet;//友类的声明  
    }

    class Internet{
        void Internet::Editcname(Country &temp){  
            strcpy(temp.cname,"中华人民共和国");   
        }  
    }

## 类型别名和枚举

typedef为保留字，使用它可以为一个类型定义创建一个别名。比如，如果你不喜欢使用int *来创建整数指针，可以像下面这样定义一个类型别名：

    typedef int * intPointer; 

在此之后，你就可以像下面这样来定义整数指针了：

    intPointer myVar1; 

在C语言里，typedef保留字通常与结构搭配使用（在C语言里创建一个结构类型的变量往往需要打很多字），但typedef保留字其实可以用来为任何一种类型定义一个别名。它的基本语法是：

    typedef typeName newTypeName; 

第二个概念是enum类型；enum是enumeration（枚举）简写。enum保留字用来创建一个可取值列表：

    enum enumName {possible values};  
    enum weekdays {Monday, Tuesday, Wednesday, Thursday, Friday}; 

在定义了一个枚举类型之后，可以像下面这样创建该类型的变量：

    weekdays today; 

也可以像下面这样对它进行赋值：

    today = Tuesday; 

注意，这里不需要使用引号，因为枚举值不是字符串。（编译器会按照各个枚举值在定义时出现的先后顺序把它们与0～n－1的整数（n是枚举值的总个数）分别关联起来。使用枚举类型好处主要有两个：其一，它们对变量的可取值加以限制；其二，它们可以用做switch条件语句的case标号--字符串是不能这样用的。

## 模板方法

- [Step By Step(C++模板目录) - Stephen_Liu - 博客园](http://www.cnblogs.com/stephen-liu74/archive/2012/09/12/2639736.html)

## Tutorial

- [fffaraz/awesome-cpp](https://github.com/fffaraz/awesome-cpp)
- [写给大家看的C++书_读书频道_51CTO.COM_领先的中文IT技术网站](http://book.51cto.com/art/200906/126956.htm#book_content)

## Books

- [Ivor Horton’s Beginning Visual C++ 2013](http://www.salttiger.com/ivor-hortons-beginning-visual-cpp-2013/)
