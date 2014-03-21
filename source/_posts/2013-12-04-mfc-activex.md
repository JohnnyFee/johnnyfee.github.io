---
layout: post
title: "MFC ActiveX"
description: ""
category: ActiveX
tags: [activex, c++]
--- 

##Tutorial

- [**基于MFC的ActiveX控件开发**](http://iysm.net/?p=122)
- [VC++编写ActiveX控件](http://www.cnblogs.com/beer/archive/2010/08/21/1805462.html)
- [A Complete ActiveX Web Control Tutorial](http://www.codeproject.com/Articles/14533/A-Complete-ActiveX-Web-Control-Tutorial)
- [ActiveX简介](http://maxwoods.cnblogs.com/archive/2005/11/07/270455.aspx)
- [Open Source Visual C++ Class for USB Generic HID Communication](http://www.waitingforfriday.com/index.php/Open_Source_Visual_C%2B%2B_Class_for_USB_Generic_HID_Communication#Example_code)
- [Open Source Framework for USB Generic HID devices based on the PIC18F and Windows](http://www.waitingforfriday.com/index.php/Open_Source_Framework_for_USB_Generic_HID_devices_based_on_the_PIC18F_and_Windows#readSingleReportFromDevice.28.29)
- [创建基于MFC的ActiveX控件时各选项的说明](http://blog.csdn.net/mole/article/details/4147608)
- [CreateFile,ReadFile等API详解](http://www.cnblogs.com/transcom/articles/1384946.html)

<!--more-->

**修改控件的GUID：**

搜索GUID的第一个数据段可搜索到三个出现此GUID的地方。
修改YunNanCcbActiveX.idl文件中coclass YunNanCcbActiveX之上的GUID。
修改YunNanCcb.ActiveXidl.h之上的GUID。
修改YunNanCcb.ActiveXCtrl.cpp中IMPLEMENT_OLECREATE_EX(CYunNanCcbActiveXCtrl, "GANSUABCACTIVEX.YunNanCcbActiveXCtrl.1",
     0x4694079c, 0x1df5, 0x4567, 0x9b, 0xd, 0xd4, 0xa7, 0xa6, 0x7f, 0x59, 0x53)的GUID。

##调试：

- [**Testing an ActiveX Control** （系列）](http://www.informit.com/library/content.aspx?b=Visual_C_PlusPlus&amp;seqNum=254)
- [MFC在VS2010中开发ActiveX控件，设置测试容器方案](http://hi.baidu.com/zkgg133/blog/item/c20b508d8965a30cb31bba5d.html)
- [ActiveX创建详解(孙鑫VC18集)](http://blog.sina.com.cn/s/blog_72ad33b10100o79j.html)
- [ActiveX 控件测试容器](http://msdn.microsoft.com/zh-cn/library/f9adb5t5(v=vs.90).aspx)
- [Microsoft ActiveX Control Pad](http://wenwen.soso.com/z/q251551282.htm)

**设置ActiveX调试容器：**

右键project->comfiguration properties->debugging->command的编辑框中填入这个ActiveX控件的测试容器的路径如:`G:\VS2010\Samples\1033\C++\MFC\ole\TstCon\Debug\TstCon.exe` ->应用->确定即可,先在控件程序中设置断点,然后单击调试运行出ActiveX控件的测试容器程序,然后插入ActiveX控件,这样就进入了ActiveX控件程序中的断点,进行调试了!


##Log：

- [win32 下 安装 log4cpp](http://blog.csdn.net/standing4s/article/details/1678521)
- [基于LGPL开源项目 Log4cpp安装与使用](http://www.cppblog.com/colorful/archive/2012/03/10/167546.html)
- [便利的开发工具-log4cpp快速使用指南](http://www.ibm.com/developerworks/cn/linux/l-log4cpp/index.html)
- [log4cpp应用速成手册](http://blog.csdn.net/jq0123/article/details/1042617)

##注册：

regsvr32 注册ocx

##安全：

- [使用MFC开发的ActiveX控件标记安全属性方法](http://www.lilu.name/Html/diannaojishu/2010-05/685254791858.html)
- [MFC Activex安全问题](http://archive.cnblogs.com/a/1528521/)









