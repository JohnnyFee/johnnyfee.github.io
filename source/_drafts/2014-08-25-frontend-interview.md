---
layout: post
title: "前端笔试题"
category: Web
tags: [web, career]
---
## 选择题（每题 2 分，共 20 分）

1.  以下哪个不是 HTML5 的新标签：(C)

    A.  `<article>`
    B.  `<section>`
    C.  `<address>`
    D.  `<time>`

2. 请问以下代码中，`<h1>` 和 `p` 之间的空隙(margin) 为多少 px？(B)

        h1 {
          margin: 0 0 25px 0;
          background: #cfc;
        }
        p {
          margin: 20px 0 0 0;
          background: #cf9;
        }

    A. 20px

    B. 25px

    C. 45px

    D. 15px

2. 在以下代码段中，哪些变量是全局变量？(B)

        <script type="text/javascript">
            var a = 1;
            function foo(){
                var b = c = 2;
            }

            foo();
        </script>

    A. 只有a
    
    B. a和c
    
    C. b和c
    
    D. a、b、c都是

3. 以下 `delete` 操作正确执行的是：(A)

    A. `var o = { x: 1 }; delete o.x;`
    
    B. `var x = 1; delete x;`

    C. `function x(){} delete x;`

    D. `(function(){ delete arguments; })();`

4. 以下代码在严格模式（strict）下，不会报错的是：(D)

    A. `v = 123;`

    B. `function f(){ this.a = 1;} f(); `
    
    C. `var o = { p: 1, p: 2};`
    
    D. `for(var i = 0; i < 2; i++) {}`

5. 以下程序的输出结果是：(B)

        <script>
            myname = "hello";
            function func() {
                alert(myName);
                var myName = "world";
                alert(myName);
            }
            func();
        </script>

    A. hello 和 world
    
    B. undefined 和 world
    
    C. hello 和 undefined
    
    D. world 和 world

6. 以下程序的输出结果是：(A)

        var a = new Array(3);
        console.log(a[0])

    A. undefined
    
    B. 3
    
    C. 0
    
    D. 以上答案都不对

7. `var a = [1,23]; console.log(typeof a);` 的输出结果是：(B)

    A. "array"
    
    B. "object"
    
    C. "function"
    
    D. "undefined"

8. 以下程序的返回结果是:(C)

        var b = 456;
        var a = {
            b: 123,
            callback: function(){
                console.log(this.b);
            }
        }

        var c = function(callback){
            if(typeof callback === "function"){
                callback();
            }
        }

        c(a.callback);

    A. 123
    
    B. undefined
    
    C. 456
    
    D. 报错

10. 以下不会影响盒模型大小的是：(A)

    A. margin

    B. padding
    
    C. border
    
    D. width

## 判断题（每题 1 分，共 10 分）

8. 从 HTML5 语义化的角度考虑，`<section>` 中可以包含 `<article>`，`<article>` 中也可以包含 `<section>`。[√]
1. CSS 中 `margin`、`padding`、`border` 都会影响盒模式的大小。[×]
2. CSS 中，`position` 值为 `absolute` 和 `fixed` 的元素会从文档流中删除，`static` 和 `relative` 的元素仍保留在文档流中。[×]
3. 用 CSS 隐藏元素时，用 `display:none` 时，占位空间仍然保留在文档流中，用`visibility:hidden` 时，占位空间也从文档流中删除。[×]
9. 通过 `document.write()` 修改 DOM 会导致整个页面重绘，而通过 `innerHTML` 则只重绘页面的一部分。[√]
3. JavaScript 是一门面向对象的语言。[√]
4. JavaScript 中，`call()` 和 `apply()` 的区别是 `call()` 是以数组的方式传参，而 `apply` 是逐个参数的方式传参。[√]
5. Javascript语言的执行环境是多线程的。[×]
6. Javacript 中，变量（标识符）处理是通过动态堆栈来管理的。[×]
7. 在 ECMAScript 中，所有的函数都是闭包。[√]
    
## 填空题（每空 2 分，共 10 分）

1. HTML5 中，给 `<script>` 添加（`aync`）可以该脚本使用异步方式加载。
2. HTML5 中，用来指导编码的语句是：`<meta charset="UTF-8">`
3. HTML5 中，读取文件的接口是（FileReader）。
3. 请写出选择一个页面中 `form` 表单中所有被禁用的元素。（`form:disabled`）
4. JavaScript 中，用来实现继承和共享属性的有限对象链是（原型链）。

## 程序阅读题（每题 5 分，共 10 分）

1. 以下程序的输出结果是：

        function foo(){
            console.log('global foo');
        }

        function bar(){
            console.log('global bar');
        }

        function hoistMe(){
            foo();// "local foo"
            bar(); // TypeErrer: bar is not a function

            function foo(){
                alert('local foo');
            }

            var bar = function(){
                alert('global bar');
            }
        }

    答案：

    "local foo"

    错误，错误信息为 TypeError: undefined is not a function.

2. 以下程序的输出结果是：

        var x = 10;
         
        function foo() {
          alert(x);
        }
         
        (function () {
          var x = 20;
          foo();
        })();

    答案：10 

    闭包和作用域链的考查。变量“x”是在“foo”函数的[[Scope]]中找到的。对于变量查询而言，词法链是在函数创建的时候就定义的，而不是在使用的调用的动态链（这个时候，变量“x”才会是20）。

## 问答题（每题 5 分，共 10 分）

1. 请简化下面的CSS代码

        margin:0px; 
        padding:10px 0 10px 0;  
        border-width:1px;border-style:solid;border-color:#ff5500;

    参考答案：

        margin:0;
        padding:10px 0;
        border:1px solid #f50;

2. 请列出几个您常用的前端框架（包括 JavaScript 和 CSS），并简要说明各自的特点或优缺点。

## 编程题（每题 10 分，共 40 分）

1. 使用 CSS 实现 div2 在 div1 中水平和垂直居中。

        <div id="div1">
            <div id="div2"></div>
        </div>

    参考答案：[Vertical Centering With CSS](http://inching.org/2014/08/08/css-vertical-center/)

2. 请列举至少两种清除浮动的方法。

    1. 在最后一个浮动元素后，添加额外(空)标签 `<div style=”clear:both”></div>`。
    2. 父元素设置 `overflow：hidden` 或者 `overflow：auto`。如果要支持 IE6，则需要添加 `zoom：1`。
    3. 给父元素添加 `group` 或者 `clearfix` 类：

            .group:after {
                visibility: hidden;
                display: block;
                content: "";
                clear: both;
                height: 0;
                }
            * html .group             { zoom: 1; } /* IE6 */
            *:first-child+html .group { zoom: 1; } /* IE7 */

3. 实现定义命名空间的函数 `void namespace(String)`， 输入参数为以点分割的字符串，如 `ns1.ns2.ns3`，调用 `namespace` 函数后，如果 `ns1`, `ns1.ns2`, `ns1.ns2.ns3` 不存在，则分别创建。

    思路：
        
        - String.prototype.split 将输入参数以 . 分离。
        - 用循环分别创建命名空间，注意如果命名空间已经存在，则不能覆盖。

4. 请使用 HTML 和 CSS 完成以下布局，并尽可能适应不同的设备尺寸。

    ![](http://johnnyimages.qiniudn.com/layout-demo.png)

    

## Reference

- [darcyclarke/Front-end-Developer-Interview-Questions](https://github.com/darcyclarke/Front-end-Developer-Interview-Questions)
- [Interview Questions and Exercises About CSS](http://css-tricks.com/interview-questions-css/)
- [12 Great HTML5 Interview Questions and Answers](http://www.toptal.com/html5/interview-questions)
- [16 Great JavaScript Interview Questions and Answers](http://www.toptal.com/javascript/interview-questions)
- [10 Common JavaScript Coding Errors](http://www.toptal.com/javascript/10-most-common-javascript-mistakes)