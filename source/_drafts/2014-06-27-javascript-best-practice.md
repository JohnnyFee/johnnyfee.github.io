---
layout: post
title: "JavaScript Best Practice"
category: JavaScript
tags: [javascript, best practice]
--- 

> **本文由 [伯乐在线](http://blog.jobbole.com/) - 翻译自 [net.tutsplus](http://net.tutsplus.com/tutorials/JavaScript-ajax/24-JavaScript-best-practices-for-beginners/)。

作为“[30 HTML和CSS最佳实践”](http://net.tutsplus.com/tutorials/html-css-techniques/30-html-best-practices-for-beginners/)的后续，这篇文章将回顾JavaScript的知识 ！如果你看完了下面的内容，请务必让我们知道你掌握的小技巧！

## Code Style

### 使用 === 代替 ==

JavaScript 使用2种不同的等值运算符：===|!== 和 ==|!=，在比较操作中使用前者是最佳实践。

“如果两边的操作数具有相同的类型和值，===返回true，!==返回false。”——《JavaScript：语言精粹》

然而，当使用==和！=时，你可能会遇到类型不同的情况，这种情况下，操作数的类型会被强制转换成一样的再做比较，这可能不是你想要的结果。

### Eval=邪恶

起初不太熟悉时，“eval”让我们能够访问JavaScript的编译器（译注：这看起来很强大）。从本质上讲，我们可以将字符串传递给eval作为参数，而执行它。

这不仅大幅降低脚本的性能（译注：JIT编译器无法预知字符串内容，而无法预编译和优化），而且这也会带来巨大的安全风险，因为这样付给要执行的文本太高的权限，避而远之。

<!--more-->

### 使用JSLint

[JSLint](http://www.jslint.com/)是由大名鼎鼎的[道格拉斯](http://www.crockford.com/)（Douglas Crockford）编写的调试器。简单的将你的代码粘贴进JSLint中，它会迅速找出代码中明显的问题和错误。

“JSLint扫面输入的源代码。如果发现一个问题，它返回一条描述问题和一个代码中的所在位置的消息。问题并不一定是语法错误，尽管通常是这样。JSLint还会查看一些编码风格和程序结构问题。这并不能保证你的程序是正确的。它只是提供了另一双帮助发现问题的眼睛。”——JSLing 文档

部署脚本之前，运行JSLint，只是为了确保你没有做出任何愚蠢的错误。

### 减少全局变量

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

### 移除”language”属性

曾经脚本标签中的“language”属性非常常见。

    <script type="text/javascript" language="javascript">  
    ...  
    </script>
    

然而，这个属性早已被弃用，所以请移除（译者注：html5 中已废弃，但如果你喜欢，你仍然可以添加）。

### 自执行函数

和调用一个函数类似，它很简单的使一个函数在页面加载或父函数被调用时自动运行。简单的将你的函数用圆括号包裹起来，然后添加一个额外的设置，这本质上就是调用函数。

    (function doSomething() {  
       return {  
          name: 'jeff',  
          lastName: 'way'  
       };  
    })();



## 数据类型

### 使用{}代替 new Object()

在JavaScript中创建对象的方法有多种。可能是传统的方法是使用”new”加构造函数，像下面这样:

    var o = new Object();  
    o.name = 'Jeffrey';  
    o.lastName = 'Way';  
    o.someFunction = function() {  
       console.log(this.name);  
    }
    

然而，这种方法的受到的诟病不及实际上多。作为代替, 我建议你使用更健壮的对象字面量方法。

另外，向 Object 构造函数传递不同类型的参数时，其结果是获得了以不同构造函数所创建的对象。如：

    var o = new Object(); // o.constrctor === Object
    var o = new Object(1); // o.constrctor === Number
    ...

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

### 使用[]代替 new Array()

这同样适用于创建一个新的数组。

例如：

    var a = new Array();  
    a[0] = "Joe";  
    a[1] = 'Plumber';

更好的做法：

    var a = ['Joe','Plumber'];

“javascript程序中常见的错误是在需要对象的时候使用数组，而需要数组的时候却使用对象。规则很简单：__当属性名是连续的整数时，你应该使用数组__。否则，请使用对象” —— Douglas Crockford

另外，Array 的构造函数有一个特性，如：

    var  a = new Array(3); 

传入的参数并不是数组第一个元素，而是数组的长度。

### 检测数据类型

如检测是否为数组类型可以使用以下方法：

    if(tyoeof Array.isArray === "undefined"){
        Array.isArray = function(){
            return Object.prototype.toString.call(arg) === [object Array]";
        }
    }

由于 `typeof arrayInstance === "object"`，所以使用 `typeof` 并不能实现该功能。

检测其他类型同理。

### 函数

常见的函数有以下 3 中形式：

    // 命名函数表达式
    var add = function add(a, b){
        return a + b;
    }

    // 函数表达式，又称为匿名函数
    var add = function(a, b){
        return a+b;
    }

    // 函数声明
    function foo(){
        
    }

- 在调用堆栈中看不到匿名函数函数名称，但这种方式最简洁，最常用。
- 函数声明只能出现在 “程序代码中”，它们的定义不能分配给变量或属性，也不能以参数形式出现在函数调用中。
- 在函数体内声明函数表达式和声明普通变量一样，声明都会被提升到函数的顶部。但使用函数声明时，不仅函数定义被提升，而且函数体也被提升了。

    function foo(){
        console.log('global foo');
    }

    function bar(){
        console.log('global bar');
    }

    function hoistMe(){
        console.log(typeof foo);// 'function'
        console.log(typeof bar); // 'undefined'

        foo();// "foo"
        bar(); // TypeErrer: bar is not a function

        // 函数声明， 变量和函数体都被提升
        function foo(){
            alert('local foo');
        }

        // 函数表达式，近 'bar'  被提升，函数体未被提升。
        var bar = function(){
            alert('global bar');
        }
    }

### 道格拉斯的 JSON.Parse

尽管 JavaScript 2（ES5)已经内置了JSON 解析器。但在撰写本文时,我们仍然需要自己实现（兼容性）。道格拉斯（Douglas Crockford），JSON之父，已经创建了一个你可以直接使用的解析器。这里可以下载（[http://www.json.org/](http://www.json.org/)）。

只需简单导入脚本，您将获得一个新的全局JSON对象，然后可以用来解析您的json文件。

    var response = JSON.parse(xhr.responseText);  
    
    var container = document.getElementById('container');  
    for(var i = 0, len = response.length; i < len; i++) {  
      container.innerHTML += '<li>' + response[i].name + ' : ' + response[i].email + '</li>';  
    }

## 性能

### 将脚本放在页面的底部

在本系列前面的文章里已经提到过这个技巧，我粘贴信息在这里。

记住——首要目标是让页面尽可能快的呈献给用户，脚本的加载是阻塞的，脚本加载并执行完之前，浏览器不能继续渲染下面的内容。因此，用户将被迫等待更长时间。

如果你的js只是用来增强效果——例如，按钮的单击事件——马上将脚本放在body结束之前。这绝对是最佳实践。

    <p>And now you know my favorite kinds of corn. </p>  
    <script type="text/javascript" src="path/to/file.js"></script>  
    <script type="text/javascript" src="path/to/anotherFile.js"></script>  
    </body>  
    </html>
    

### 构建字符串的最优方法

当你需要遍历数组或对象的时候，不要总想着“for”语句，要有创造性，总能找到更好的办法，例如，像下面这样。

    var arr = ['item 1', 'item 2', 'item 3', ...];  
    var list = '<ul><li>' + arr.join('</li><li>') + '</li></ul>';
    

我不是你心中的神，但请你相信我（不信你自己测试）——这是迄今为止最快的方法！ 使用原生代码（如 join()），不管系统内部做了什么，通常比非原生快很多。 ——James Padolsey, james.padolsey.com

### 不要使用”with”语句

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
    

### ”For in”语句

当遍历对象的属性时，你可能会发现还会检索方法函数。为了解决这个问题，总在你的代码里包裹在一个if语句来过滤信息。

    for(key in object) {  
       if(object.hasOwnProperty(key) {  
          ...then do something...  
       }  
    }
    

参考 JavaScript：语言精粹，道格拉斯（_Douglas Crockford_）。

### 自调用构造函数

为了避免在使用构造函数时忘记使用 `new`，可以使用以下方法实现构造函数的自调用：

    function Waffle(){
        if(!(this instanceof Waffle)){
            return new Waffle()
        }
        this.tastes = "yummy";
    }
    Waffle.prototype.wantAnother = true;

## Tutorial

另外，在GitHub上也流行着比较流行的 JavaScript 编码指南：

- 原文：[aairbnb / javascript](https://github.com/airbnb/javascript)。
- 中文：[adamlu/javascript-style-guide](https://github.com/adamlu/javascript-style-guide#in-the-wild)
