layout: post
title: "JavaScript 剪切板"
description: ""
category: JavaScript
tags: [javascript]
---
##概述

为了阻止恶意脚本攻击访问者的电脑，Web应用程序均运行在沙箱环境中。该沙箱环境限制了对本地资源的访问，如文件系统、系统剪切板。[这篇文章](http://news.cnet.com/8301-1009_3-10021715-83.html)说明了限制访问剪切板的原因。幸运的是，有些方法可以间接访问系统剪切板，不幸的是，但每个方法都有瑕疵，而且至今没有非常完美的方法。

<!--more-->

##IE剪切板

在IE中可以通过`window.clipboardData`来读写剪切板。如：

    // 写入数据到剪切板
    var didSucceed = window.clipboardData.setData('Text', 'text to copy');
    // 从剪切板读取数据
    var clipText = window.clipboardData.getData('Text');

首次访问clipboardData对象时，IE 7+ 会弹出“是否允许访问剪切板”提示框（在IE6-中和在本地运行脚本不会弹出该提示框）。一旦用户允许，整个session生命周期内，均不再弹出提示框。为了防止用户点击禁止访问剪切板而造成剪切板内容被清空，可以使用以下代码：

    var clipText = window.clipboardData.getData('Text');
    if (clipText == “”) { // Could be empty, or failed
        // Verify failure
        if (!window.clipboardData.setData('Text', clipText))
            clipText = null;
    }

##一个变通的方法：使用Flash来拷贝

Flash 9之前（包括IE9），通过操作DOM操作，在document中切入一个flash对象，要拷贝的文本作为参数传递给该嵌入对象，该对象便通过Flash API将要拷贝的文本拷贝到系统剪切板。这是Flash 9之前的一个安全漏洞，Flash 10已修复，[对剪切板未经允许的访问将被拒绝](http://code.google.com/p/zeroclipboard/)，而只能通过鼠标点击才能获取访问剪切板的许可。

[ZeroClipboard](https://github.com/zeroclipboard/zeroclipboard)使用鼠标点击的特性来访问剪切板，并同时支持Flash 9和Flash 10。实现原理为：在button元素上放置一个不可见的Flash，但用户点击时，ZeroClipboard便可将待拷贝的对象成功写入剪切板。这其实也是一个安全漏洞，谁知道什么时候又会被打补丁修复呢。

网络上使用ZeroClipboard为jquery提供了一个一个插件[zClip](http://steamdev.com/zclip/)。

使用ZeroClipboard来访问剪切板存在诸多缺点：

- 只能通过点击就来操作剪切板，而不允许通过其他方式，如Ctrl + C，或者调用API等。
- 要求预装Flash。尽管可以通过Flash Detection Kit来检测Flash的安装情况。

##使用Java Applets

使用Java Applets的实现思路跟使用Flash的思路一样，只不过是借助Java Applet来访问本地资源，而非Flash。Java与JavaScript的交互可以通过[LiveConnect](https://developer.mozilla.org/zh-CN/docs/LiveConnect)类库。除了IE（通过ActiveX），其他大部分的主流浏览器都支持该方法。最大的缺点是需要依赖于JVM。

##使用[execCommand](https://developer.mozilla.org/en-US/docs/Rich-Text_Editing_in_Mozilla)

可以使用JavaScript的execCommand方法来执行如“Copy”，“Paste”的命令。使用方法一般为将待拷贝的内容放在textarea中，获取焦点、全选、调用`execCommand("copy")`方法，这个textarea始终是隐藏的。但这种方法也难易保证各浏览器都可用。如Mozilla会抛出一个安全方面的异常，Opera将不起作用。

##剪切板事件

IE, Webkit and FF 3+支持6中不同的剪切板事件，如onbeforecut、oncut、onbeforecopy、oncopy、onbeforepaste、onpaste，可以从事件的参数中获剪切板的内容：

    document.body.onpaste = function(e) {
        alert(e.clipboardData.getData("Text"));
        e.preventDefault();
    }

但因为各浏览器对这些事件的支持各不一样，而且使用上也不大自由，使用这种方法也不大容易。

##仿造DOM事件

是否可以使用代码触发Ctrl+C和Ctrl+V事件，是否可以使用execCommand来仿造类似的事件来实现拷贝？这是不可实现的，因为Web的沙箱环境不允许JavaScript的仿造用户操作。

##Chrome剪切板

Chrome的沙箱环境不允许直接访问剪切板，建议考虑以下几种变通的方法。

**使用弹出框：**

    function copyToClipboard(text) {
      window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
    }

这样可以避免浏览器的兼容问题，缺点是会有一个额外的弹出框，需要用户主动复制，请参考 [How to copy to the clipboard in JavaScript?](http://stackoverflow.com/questions/400212/how-to-copy-to-the-clipboard-in-javascript)。

**使用executeCommand**

在普通的网页中无法成功调用executeCommand,但在chrome扩展开发中可以调用该接口，前提是需要在manifest.json中添加clipboardWrite或者clipboardRead权限，并且只能在extension page(backgroud page and pop page)中调用才能生效。Demo请参考[Write text to Clipboard](http://stackoverflow.com/questions/13899299/write-text-to-clipboard)，这可能是适合于Chrome最好的解决方案。可参考剪切板历史的Chrome扩展[Deliaz / clipboard-history](https://github.com/Deliaz/clipboard-history/tree/master/js)和[rick-li / clipboardExt](https://github.com/rick-li/clipboardExt)。

##结论

目前为止，还没法构建完美的访问剪切板的API：

    Clipboard = {
        copy : function(data) {
            //... implemention …
        },
         getData : function() {
            // … implementation …
         }
    };

##参考
- [Accessing the System Clipboard with JavaScript – A Holy Grail?](http://brooknovak.wordpress.com/2009/07/28/accessing-the-system-clipboard-with-javascript/)
- [How to copy to the clipboard in JavaScript?](http://stackoverflow.com/questions/400212/how-to-copy-to-the-clipboard-in-javascript)
- [How does Trello access the user's clipboard?](http://stackoverflow.com/questions/17527870/how-does-trello-access-the-users-clipboard)
- [How to copy to the clipboard in JavaScript?](http://stackoverflow.com/questions/400212/how-to-copy-to-the-clipboard-in-javascript?lq=1)
