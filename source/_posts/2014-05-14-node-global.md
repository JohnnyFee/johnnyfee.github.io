layout: post
title: "Node Global Objects"
category: Node
tags: [node, syntax]
--- 

## global

javascript的语言特性决定了，一定会有一个顶层对象（top object），但是根据执行环境的不同，这个顶层对象是不一样的。由执行环境决定，比如在浏览器执行环境中，顶层对象是window。而在node里，顶层对象是global

global里定义了一些全局的对象或函数，在node的任何一个模块里，都可以直接使用，比如console，setTimeout()，require()等，完整的global object document见：[node.js global objects](http://nodejs.org/api/globals.html)

如果想在不同的模块（文件）之间共享变量，有一个可行但是很糟糕的做法，就是借助这个global object，在global上定义的属性和函数，在任何模块里都可以访问到

	global.name = "Tony";
  
然后在a.js里 

    require("./b");// 执行b.js里的代码
    console.log(name);// Tony

<!--more-->
  
另外一种更简单（也更容易引起错误）的做法，是不用var关键字声明变量，也会成为global的属性 

    name = "Tony";

  
但是，如果加上了var关键字，声明的变量就只局限在module（当前文件）的作用域中，所以强烈推荐显式地用var来声明变量，以免不小心挂到了global上 

    var name = "Tony";

为什么依赖global是不好的实践呢？因为所有的模块都可以不受限制地使用global，而且缺少命名空间的约束，非常容易引起冲突，从而引发潜在的BUG。而且这种BUG一旦发生，要定位是极其困难的，不知道是在哪里改变了全局变量而引发的问题 所以javascript的最佳实践，是强烈建议 不要修改global object，只使用global上预定义的属性和函数

## module

在模块里用var声明的变量，全部都是在module作用域里的，优先于global作用域的属性

    global.name = "Tony";

    require("./b");// 执行b.js里的代码
    var name = "kyfxbl";
    console.log(name);// kyfxbl

  
以上代码会输出"kyfxbl"，而不是"Tony"，因为module的name比global的name更优先

## relative path

- `module.filename`：该行代码所在的文件。
- `__filename`：始终等于 module.filename
- `__dirname`：该行代码所在的目录。
- `process.cwd()`：运行node的工作目录，可以使用  cd /d 修改工作目录。
- `require.main.filename`：用node命令启动的module的filename, 如 node xxx，这里的filename就是这个xxx。
- `require()` 方法的相对路径是：module.filename；fs.readFile()的相对路径是：process.cwd()。

## Reference

- [Global Objects Node.js v0.10.29 Manual & Documentation](http://nodejs.org/docs/latest/api/globals.html#globals_dirname)
- [node.js的global variable，和module.exports](http://blog.csdn.net/kyfxbl/article/details/12587385)
- [NodeJs：module.filename、__filename、__dirname、process.cwd()和require.main.filename 解惑](http://www.cnblogs.com/happyframework/archive/2013/05/16/3080910.html)