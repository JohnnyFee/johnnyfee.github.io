---
layout: post
title: "C++ Tutorial"
category: Tool
tags: [tool]
--- 
## FAQ

### friend

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

