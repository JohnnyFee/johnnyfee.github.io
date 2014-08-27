---
layout: post
title: "前端笔试题"
category: Web
tags: [web, career]
---
## 选择题

1.  以下哪个不是 HTML5 的新标签：c

    a.  `<article>`
    b.  `<section>`
    c.  `<address>`
    d.  `<time>`

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

7. `var a = [1,23]; alert(typeof a);` 的输出结果是：(B)

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

    A. 123
    
    B. undefined
    
    C. 456
    
    D. 报错

## 判断题

1. margin、padding、border 都会影响盒模式的大小。[×]
2. 即使 iframe 中的内容和外部网页所在的域名不同，iframe 内外也可以互相访问对方的元素。[×]
3. JavaScript 是一门面向对象的语言。[√]
3. 设置 `margin-top` and `margin-bottom` 对内敛元素会产生影响。
4. 伪类 `:checked` 会选择类型为 `<radio>`、`<checkbox>` 的 input 元素, 但不会选择类型为 `<option>` 的元素.

## 填空题

2. JavaScript有哪几种数据类型。_______________

    简单：Number，Boolean，String，Null，Undefined

    复合：Object，Array，Function

4. 如何将 `arguments` 转化为数组：`Array.prototype.slice.call(arguments);`

5. 写出 3 个css3新增的属性。答案：[CSS3 Properties](http://www.quackit.com/css/css3/properties/)  `border-radius` `box-shadow`  `text-shadow` `text-outline` `text-stroke` `background-size` `text-overflow` `flex` `resize`

## 程序阅读题

以下程序的输出结果是：

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

## 问答题

1. 请简化下面的CSS代码

        margin:0px; 
        padding:10px 0 10px 0;  
        border-width:1px;border-style:solid;border-color:#ff5500;

    参考答案：

        margin:0;
        padding:10px 0;
        border:1px solid #f50;

2. 注释的代码是否可以实现？如不能实现，请修改

        function test(){
                 this.name = 'taobao';
                 this.waitMes = function (){
                 //隔5秒钟执行this.name
                 }
        }

    参考答案：

    考点：javascript闭包

        function test(){
                  this.name = 'taobao';
                  var waitMes = function (){
                  //每隔5秒钟执行this.name
                  setTimeout(function (){alert(self.name)},5000);
                   }
                 return waitMes;
        }

        var _test = test();
        _test();

3. documen.write和 innerHTML的区别

        document.write 只能重绘整个页面
        innerHTML 可以重绘页面的一部分

4. 使用CSS实现div的水平和垂直居中

    参考答案：[Vertical Centering With CSS](http://inching.org/2014/08/08/css-vertical-center/)

5. 简述浮动的原理并请列举至少两种清除浮动的方法。

    __浮动的原理：__浮动的框可以左右移动，直至它的外边缘遇到包含框或者另一个浮动框的边缘。浮动框不属于(或脱离了)文档中的普通流，当一个元素浮动之后，不会影响到块级框的布局而只会影响行内元素(如span、a、em)的排列，即行内元素浮动后就会表现得像块级元素一样。当浮动框高度超出包含框的时候，也就会出现包含框不会自动伸高来闭合浮动元素（或者可以称为“高度塌陷”现象）。在实际布局中，往往这并不是我们所希望的，所以需要闭合浮动元素，使其包含框表现出正常的高度。

    清除浮动的方法：

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

6. `display:none`  和 `visibility:hidden` 的区别是什么
    
    `display:none` 在隐藏元素的时候，将其占位空间也去掉；而 `visibility:hidden` 只是隐藏了内容而已，其占位空间仍然保留。
7. call 和 apply 的区别是什么
    
    传递的参数形式不同，call方法的参数必须一个个列举出来，而apply方法的参数是以一个数组的形式进行传递，也支持arguments参数。
8. 请写出以下程序的输出结果

    function hello() {
        var num = 666,
            world = function() { 
                alert(num); 
            }
        
        num++;
        return world;
    }
        
    var hello1 = hello();
    hello1();

    答案：667

9. 下面的程序有何问题？如何改进？

        function initButtons() {
            var body = document.body,
                button, i;
            
            for (i = 0; i < 5; i++) {
                button = document.createElement("button");
                button.innerHTML = "Button " + i;
                button.addEventListener("click", function (e) {
                    alert(i);
                }, false);
                body.appendChild(button);
            }
        }

    答案：

        function initButtons() {
            var body = document.body,
                button, i;
           
            for (i = 0; i < 5; i++) {
                button = document.createElement("button");
                button.innerHTML = "Button " + i;
                button.addEventListener("click", function (j) {
                    return function (e) {
                        alert(j);
                    };
                }(i), false);
                body.appendChild(button);
            }
        }

10. 请写出以下程序的输出结果

        var foo = 'hello';
             
        (function() {
          var foo = foo || 'world';
          console.log(foo);
        })();

    结果：world

        var foo = 'hello';
            
        (function() {
          console.log(foo); // undefined!
          var foo = foo || 'world';
        })();

    结果：undefined

        var foo = 'hello';
           
        (function(f) {
          var foo = f || 'world';
          console.log(foo);
        })(foo);

    结果：hello

11. 请解释'Funciton.prototype.bind'的作用？
12. 您使用过哪些 JavaScript 框架，请分别说一下各自的优缺点。

## Reference

- [darcyclarke/Front-end-Developer-Interview-Questions](https://github.com/darcyclarke/Front-end-Developer-Interview-Questions)
- [Interview Questions and Exercises About CSS](http://css-tricks.com/interview-questions-css/)
- [面试题 - 随笔分类 - 叶小钗 - 博客园](http://www.cnblogs.com/yexiaochai/category/491625.html)