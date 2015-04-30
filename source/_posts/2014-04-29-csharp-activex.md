layout: post
title: "C# ActiveX Tutorial"
description: ""
category: C#
tags: [c#, ActiveX]
---

## ActiveX

1. [C#开发ActiveX控件及制作CAB包](http://blog.bossma.cn/dotnet/csharp-activex-cab/)

## ActiveX的发布

1. [制作ActiveX CAB安装包](http://blog.bossma.cn/dotnet/csharp-activex-cab/)
2. [IObjectSave接口的两个版本](http://topic.csdn.net/u/20100803/17/889b9a9b-c3b2-4a2c-aa28-905d58570206.html)
3. [Makecert.exe（证书创建工具）](http://msdn.microsoft.com/zh-cn/library/bfsktky3%28v=VS.100%29.aspx)
4. [ActiveX 控件（三） 部署篇](http://hi.baidu.com/1987raymond/blog/item/e52f1d3f7a25d5ff54e7230a.html)
5. [CAB的发布和部署](http://shy-feng.blog007.com/archives/58084.aspx)

<!-- more -->

## ActiveX 版本升级

[控件的升级](http://www.6ideas.cn/artf/213109761010.html)

方法：

1. 修改ActiveX的Guid
2. 更改版本号
3. 修改html中插件引用的Guid

## 参考教程

1. [ITEye](http://marlboro027.iteye.com/category/132438?show_full=true)
2. [创建可在网页下载安装的ActiveX控件](http://hillstone.blog.hexun.com/45257163_d.html)

## 生成证书

1. [证书创建工具](http://msdn.microsoft.com/zh-cn/library/bfsktky3%28v=VS.100%29.aspx)

## 数字签名

1. [数字签名](http://blog.csdn.net/panzi667/article/details/336188)
2. [SignTool](http://msdn.microsoft.com/zh-cn/library/8s9b9yaz%28v=vs.80%29.aspx)
3. [ActiveX签名方法与工具技巧](http://www.360doc.com/content/10/0901/15/203871_50402416.shtml)
4. [Using SignTool to Sign a File](http://msdn.microsoft.com/en-us/library/aa388170(v=vs.85).aspx)

### 方法1

1. makecert -sk KeyOfRaymond -n "CN=Raymond's Company" DotNetAxTextBox.cer
2. cert2spc DotNetAxTextBox.cer DotNetAxTextBox.spc
3. signcode -spc DotNetAxTextBox.spc -k KeyOfRaymond DotNetAxTextBox.cab 
4. signcode -spc DotNetAxTextBox.spc -k KeyOfRaymond STAR-56读写卡器控件.exe
5. chktrust STAR-56读写卡器控件.exe
6. signtool verify  KeyOfRaymond STAR-56读写卡器控件.exe


### 方法2

1. makecert /sv "Start.pvk" -n "CN=实达电脑设备有限公司" "通联网上支付控件.cer"      #Pi=3.14159
2. cert2spc "通联网上支付控件.cer" "通联网上支付控件.spc"
3. signcode
4. chktrust -v "通联网上支付控件.exe"

## 证书

1. [Packaging ActiveX Controls](http://msdn.microsoft.com/en-us/library/aa751974%28v=VS.85%29.aspx)
2. [How to: Create Temporary Certificates for Use During Development](http://msdn.microsoft.com/en-us/library/ms733813.aspx)
3. [View Certificates with the MMC Snap-in](http://msdn.microsoft.com/en-us/library/ms788967.aspx)

## 控件注册

```
regasm /codebase Star56.Library.dll
regasm /u Star56.Library.dll
Calculate timespan in JavaScript
```


## FAQ

javascript中断定控件是否加载成功：

     epay.object == null
