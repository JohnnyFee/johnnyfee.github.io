---
layout: post
title: "JavaScript Best Practice"
category: JavaScript
tags: [javascript, best practice]
--- 

> **本文由 [伯乐在线](http://blog.jobbole.com/) - 翻译自 [net.tutsplus](http://net.tutsplus.com/tutorials/JavaScript-ajax/24-JavaScript-best-practices-for-beginners/)。欢迎加入[技术翻译小组](http://www.jobbole.com/groups/6/)。转载请参见文章末尾处的要求。**作为“[30 HTML和CSS最佳实践”](http://net.tutsplus.com/tutorials/html-css-techniques/30-html-best-practices-for-beginners/)的后续，这篇文章将回顾JavaScript的知识 ！如果你看完了下面的内容，请务必让我们知道你掌握的小技巧！

## 1.使用 === 代替 ==

JavaScript 使用2种不同的等值运算符：===|!== 和 ==|!=，在比较操作中使用前者是最佳实践。

“如果两边的操作数具有相同的类型和值，===返回true，!==返回false。”——《JavaScript：语言精粹》

然而，当使用==和！=时，你可能会遇到类型不同的情况，这种情况下，操作数的类型会被强制转换成一样的再做比较，这可能不是你想要的结果。

## 2.Eval=邪恶

起初不太熟悉时，“eval”让我们能够访问JavaScript的编译器（译注：这看起来很强大）。从本质上讲，我们可以将字符串传递给eval作为参数，而执行它。

这不仅大幅降低脚本的性能（译注：JIT编译器无法预知字符串内容，而无法预编译和优化），而且这也会带来巨大的安全风险，因为这样付给要执行的文本太高的权限，避而远之。

<!--more-->

## 3.省略未必省事

从技术上讲，你可以省略大多数花括号和分号。大多数浏览器都能正确理解下面的代码:

    if(someVariableExists)  
       x = false
    

然后，如果像下面这样：

    if(someVariableExists)  
       x = false  
       anotherFunctionCall();
    

有人可能会认为上面的代码等价于下面这样:

    if(someVariableExists) {  
       x = false;  
       anotherFunctionCall();  
    }
    

不幸的是，这种理解是错误的。实际上的意思如下:

    if(someVariableExists) {  
       x = false;  
    }  
    anotherFunctionCall();
    

你可能注意到了，上面的缩进容易给人花括号的假象。无可非议，这是一种可怕的实践，应不惜一切代价避免。仅有一种情况下，即只有一行的时候，花括号是可以省略的，但这点是饱受争议的。

    if(2 + 2 === 4) return 'nicely done';
    

**未雨绸缪**

很可能，有一天你需要在if语句块中添加更多的语句。这样的话，你必须重写这段代码。底线——省略是雷区。

## 4.使用JSLint

[JSLint](http://www.jslint.com/)是由大名鼎鼎的[道格拉斯](http://www.crockford.com/)（Douglas Crockford）编写的调试器。简单的将你的代码粘贴进JSLint中，它会迅速找出代码中明显的问题和错误。

“JSLint扫面输入的源代码。如果发现一个问题，它返回一条描述问题和一个代码中的所在位置的消息。问题并不一定是语法错误，尽管通常是这样。JSLint还会查看一些编码风格和程序结构问题。这并不能保证你的程序是正确的。它只是提供了另一双帮助发现问题的眼睛。”——JSLing 文档

部署脚本之前，运行JSLint，只是为了确保你没有做出任何愚蠢的错误。

## 5.将脚本放在页面的底部

在本系列前面的文章里已经提到过这个技巧，我粘贴信息在这里。

记住——首要目标是让页面尽可能快的呈献给用户，脚本的加载是阻塞的，脚本加载并执行完之前，浏览器不能继续渲染下面的内容。因此，用户将被迫等待更长时间。

如果你的js只是用来增强效果——例如，按钮的单击事件——马上将脚本放在body结束之前。这绝对是最佳实践。

    <p>And now you know my favorite kinds of corn. </p>  
    <script type="text/javascript" src="path/to/file.js"></script>  
    <script type="text/javascript" src="path/to/anotherFile.js"></script>  
    </body>  
    </html>
    

## 6.避免在For语句内声明变量

当执行冗长的for语句时，要保持语句块的尽量简洁，例如：

    for(var i = 0; i < someArray.length; i++) {  
       var container = document.getElementById('container');  
       container.innerHtml += 'my number: ' + i;  
       console.log(i);  
    }
    

注意每次循环都要计算数组的长度，并且每次都要遍历dom查询“container”元素——效率严重地下！

    var container = document.getElementById('container');  
    for(var i = 0, len = someArray.length; i < len;  i++) {  
       container.innerHtml += 'my number: ' + i;  
       console.log(i);  
    }
    

感兴趣可以思考如何继续优化上面的代码，欢迎留下评论大家分享。

## 7.构建字符串的最优方法

当你需要遍历数组或对象的时候，不要总想着“for”语句，要有创造性，总能找到更好的办法，例如，像下面这样。

    var arr = ['item 1', 'item 2', 'item 3', ...];  
    var list = '<ul><li>' + arr.join('</li><li>') + '</li></ul>';
    

我不是你心中的神，但请你相信我（不信你自己测试）——这是迄今为止最快的方法！ 使用原生代码（如 join()），不管系统内部做了什么，通常比非原生快很多。 ——James Padolsey, james.padolsey.com

## 8.减少全局变量

只要把多个全局变量都整理在一个名称空间下，拟将显著降低与其他应用程序、组件或类库之间产生糟糕的相互影响的可能性。——Douglas Crockford

    var name = 'Jeffrey';  
    var lastName = 'Way';  
    
    function doSomething() {...}  
    
    console.log(name); // Jeffrey -- 或 window.name
    

**更好的做法**

    var DudeNameSpace = {  
       name : 'Jeffrey',  
       lastName : 'Way',  
       doSomething : function() {...}  
    }  
    console.log(DudeNameSpace.name); // Jeffrey
    

注：这里只是简单命名为 “DudeNameSpace”，实际当中要取更合理的名字。

## 9.给代码添加注释

似乎没有必要，当请相信我，尽量给你的代码添加更合理的注释。当几个月后，重看你的项目，你可能记不清当初你的思路。或者，假如你的一位同事需要修改你的代码呢？总而言之，给代码添加注释是重要的部分。

    // 循环数组，输出每项名字（译者注：这样的注释似乎有点多余吧）.   
    for(var i = 0, len = array.length; i < len; i++) {  
       console.log(array[i]);  
    }
    

## 10.拥抱渐进增强

确保javascript被禁用的情况下能平稳退化。我们总是被这样的想法吸引，“大多数我的访客已经启用JavaScript,所以我不必担心。”然而，这是个很大的误区。

你可曾花费片刻查看下你漂亮的页面在javascript被关闭时是什么样的吗？（下载 [Web Developer](https://addons.mozilla.org/en-US/firefox/addon/60) 工具就能很容易做到（译者注：chrome用户在应用商店里自行下载，ie用户在Internet选项中设置）），这有可能让你的网站支离破碎。作为一个经验法则，设计你的网站时假设JavaScript是被禁用的，然后，在此基础上，逐步增强你的网站。

## 11.不要给”setInterval”或”setTimeout”传递字符串参数

考虑下面的代码:

    setInterval(  
    "document.getElementById('container').innerHTML += 'My new number: ' + i", 3000  
    );
    

不仅效率低下，而且这种做法和”eval”如出一辙。从不给setInterval和setTimeout传递字符串作为参数，而是像下面这样传递函数名。

    setInterval(someFunction, 3000);
    

## 12.不要使用”with”语句

乍一看，”with”语句看起来像一个聪明的主意。基本理念是,它可以为访问深度嵌套对象提供缩写，例如……

    with (being.person.man.bodyparts) {  
       arms = true;  
       legs = true;  
    }
    

而不是像下面这样：

    being.person.man.bodyparts.arms = true;  
    being.person.man.bodyparts.legs= true;
    

不幸的是，经过测试后，发现这时“设置新成员时表现得非常糟糕。作为代替，您应该使用变量，像下面这样。

    var o = being.person.man.bodyparts;  
    o.arms = true;  
    o.legs = true;
    

## 13.使用{}代替 new Object()

在JavaScript中创建对象的方法有多种。可能是传统的方法是使用”new”加构造函数，像下面这样:

    var o = new Object();  
    o.name = 'Jeffrey';  
    o.lastName = 'Way';  
    o.someFunction = function() {  
       console.log(this.name);  
    }
    

然而，这种方法的受到的诟病不及实际上多。作为代替,我建议你使用更健壮的对象字面量方法。

**更好的做法**

    var o = {  
       name: 'Jeffrey',  
       lastName = 'Way',  
       someFunction : function() {  
          console.log(this.name);  
       }  
    };
    

注意，果你只是想创建一个空对象，{}更好。

    var o = {};
    

“对象字面量使我们能够编写更具特色的代码，而且相对简单的多。不需要直接调用构造函数或维持传递给函数的参数的正确顺序，等”——[dyn-web.com](http://www.dyn-web.com/tutorials/obj_lit.php)

## 14.使用[]代替 new Array()

这同样适用于创建一个新的数组。

例如：

    var a = new Array();  
    a[0] = "Joe";  
    a[1] = 'Plumber';
    

更好的做法：

    var a = ['Joe','Plumber'];
    

“javascript程序中常见的错误是在需要对象的时候使用数组，而需要数组的时候却使用对象。规则很简单：当属性名是连续的整数时，你应该使用数组。否则，请使用对象”——Douglas Crockford

## 15.定义多个变量时，省略var关键字，用逗号代替

    var someItem = 'some string';  
    var anotherItem = 'another string';  
    var oneMoreItem = 'one more string';
    

更好的做法

    var someItem = 'some string',  
        anotherItem = 'another string',  
        oneMoreItem = 'one more string';
    

…应而不言自明。我怀疑这里真的有所提速，但它能是你的代码更清晰。

## （不好意思，第16 条被作者吃掉了）

## 17.谨记，不要省略分号

从技术上讲，大多数浏览器允许你省略分号。

    var someItem = 'some string'  
    function doSomething() {  
      return 'something'  
    }
    

已经说过，这是一个非常糟糕的做法可能会导致更大的，难以发现的问题。

**更好的做法**

    var someItem = 'some string';  
    function doSomething() {  
      return 'something';  
    }
    

## 18.”For in”语句

当遍历对象的属性时，你可能会发现还会检索方法函数。为了解决这个问题，总在你的代码里包裹在一个if语句来过滤信息。

    for(key in object) {  
       if(object.hasOwnProperty(key) {  
          ...then do something...  
       }  
    }
    

参考 JavaScript：语言精粹，道格拉斯（_Douglas Crockford_）。

## 19.使用Firebug的”timer”功能优化你的代码

    function TimeTracker(){  
     console.time("MyTimer");  
     for(x=5000; x > 0; x--){}  
     console.timeEnd("MyTimer");  
    }
    

## 20.阅读，阅读，反复阅读

虽然我是一个巨大的web开发博客的粉丝(像这样!)，午餐之余或上床睡觉之前，实在没有什么比一本书更合适了，坚持放一本web开发方面书在你的床头柜。下面是一些我最喜爱的JavaScript书籍。

* 《[Object-Oriented JavaScript](http://www.packtpub.com/object-oriented-javascript-applications-libraries/book) | JavaScript面向对象编程指南》
* 《[JavaScript：The Good Parts](http://oreilly.com/catalog/9780596517748/) | [JavaScript语言精粹](http://click.union.360buy.com/JdClick/?unionId=16231&to=http://book.360buy.com/10067180.html "JavaScript语言精粹") 修订版》
* 《[Learning jQuery 1.3](http://net.tutsplus.com/tutorials/JavaScript-ajax/24-JavaScript-best-practices-for-beginners/www.packtpub.com/learning-jquery-1.3/boo) ｜jQuery基础教程 第4版》
* 《[Learning JavaScript](http://oreilly.com/catalog/9780596527464/) ｜JavaScript学习指南》

读了他们……多次。我仍将继续!

## 21.自执行函数

和调用一个函数类似，它很简单的使一个函数在页面加载或父函数被调用时自动运行。简单的将你的函数用圆括号包裹起来，然后添加一个额外的设置，这本质上就是调用函数。

    (function doSomething() {  
       return {  
          name: 'jeff',  
          lastName: 'way'  
       };  
    })();
    

## 22.原生代码永远比库快

JavaScript库，例如jQuery和Mootools等可以节省大量的编码时间，特别是AJAX操作。已经说过，总是记住，库永远不可能比原生JavaScript代码更快(假设你的代码正确)。

jQuery的“each”方法是伟大的循环，但使用原生”for”语句总是更快。

## 23.道格拉斯的 JSON.Parse

尽管JavaScript 2（ES5)已经内置了JSON 解析器。但在撰写本文时,我们仍然需要自己实现（兼容性）。道格拉斯（Douglas Crockford），JSON之父，已经创建了一个你可以直接使用的解析器。这里可以下载（[http://www.json.org/](http://www.json.org/)）。

只需简单导入脚本，您将获得一个新的全局JSON对象，然后可以用来解析您的json文件。

    var response = JSON.parse(xhr.responseText);  
    
    var container = document.getElementById('container');  
    for(var i = 0, len = response.length; i < len; i++) {  
      container.innerHTML += '<li>' + response[i].name + ' : ' + response[i].email + '</li>';  
    }
    

## 24.移除”language”属性

曾经脚本标签中的“language”属性非常常见。

    <script type="text/javascript" language="javascript">  
    ...  
    </script>
    

然而，这个属性早已被弃用，所以请移除（译者注：html5 中已废弃，但如果你喜欢，你仍然可以添加）。

## 25. JavaScript规范

注：本点是[JohnnyFee](http://johnnyfee/githuo.io)补充。

另外，在GitHub上也流行着比较流行的 JavaScript 编码指南：

- 原文：[aairbnb / javascript](https://github.com/airbnb/javascript)。
- 中文：[adamlu/javascript-style-guide](https://github.com/adamlu/javascript-style-guide#in-the-wild)

本文有以下几点与指南相同：

- 3.省略未必省事
- 7.构建字符串的最优方法
- 8.减少全局变量
- 13.使用{}代替 new Object()
- 14.使用[]代替 new Array()
- 15.定义多个变量时，省略var关键字，用逗号代替
- 17.谨记，不要省略分号
