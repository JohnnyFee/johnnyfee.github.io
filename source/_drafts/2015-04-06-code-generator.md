layout: post
title: "Code Generator 学习大纲"
category : C#
tags : [c#, csharp]
---

## 三种代码生成方案:

### CodeDom
- [通过CodeDOM定义生成代码的结构](http://www.cnblogs.com/artech/archive/2010/11/17/CodeGeneration.html)
   + 通过CodeDom实现动态代码生成
   + 通过CodeDomProvider转化给予某种语言的代码
- [通过Visual Studio的Custom Tool定义代码生成器](http://www.cnblogs.com/artech/archive/2010/09/18/1829880.html)
   + 注册成COM组件
   + 设置注册表
   + 文件扩展名绑定
   + 工具：Visual Studio 2010 SDK
- T4
- [T4语法及原理](http://www.cnblogs.com/artech/archive/2010/10/23/1859529.html)
   + T4模板的基本结构
   + T4的文本转化的实现
- [T4单文件应用](http://www.cnblogs.com/artech/archive/2010/11/17/CodeGeneration.html)
   + T4工具箱（ToolBox）和编辑器
   + 创建模板
- 自动Provider

    [通过自定义BuildProvider为ASP.NET提供代码生成](http://www.cnblogs.com/artech/archive/2010/11/06/builderprovider.html)

## EF相关
 
[实体框架实用工具 .ttinclude 文件](http://msdn.microsoft.com/zh-cn/library/ff477603.aspx)
    - EF.Utility.CS.ttinclude位置：Microsoft Visual Studio 10.0\Common7\IDE\Extensions\Microsoft\Entity Framework Tools\Templates\Includes
- ADO.NET EntityObject 生成器模板
- 自定义对象层代码生成（实体数据模型设计器）

## 应用

- [资源](http://www.cnblogs.com/artech/archive/2010/10/17/1853702.html)
- [解决T4模板的程序集引用的五种方案](http://www.cnblogs.com/artech/archive/2010/11/09/T4_Assembly_Reference.html)
- ["Assembly Locking"&"Debug"](http://www.cnblogs.com/artech/archive/2010/11/16/T4_Assembly_Locking_Debug.html)

## 工具

- [T4 Toolbox](http://t4toolbox.codeplex.com/)
- [T4 Editor](http://t4-editor.tangible-engineering.com/T4-Editor-Visual-T4-Editing.html)