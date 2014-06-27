---
layout: post
title: "编写更好的jQuery代码的建议"
category: JavaScript
tags: [javascript]
--- 
>**本文由 [yanhaijing](http://blog.jobbole.com/author/yanhaijing/) 翻译自 [Mathew Carella](http://flippinawesome.org/2013/11/25/writing-better-jquery-code/)**

##参考

- [airbnb/javascript · GitHub](https://github.com/airbnb/javascript) A mostly reasonable approach to JavaScript.

讨论jQuery和javascript性能的文章并不罕见。然而，本文我计划总结一些速度方面的技巧和我本人的一些建议，来提升你的jQuery和javascript代码。好的代码会带来速度的提升。快速渲染和响应意味着更好的用户体验。

首先，在脑子里牢牢记住jQuery就是javascript。这意味着我们应该采取相同的编码惯例,风格指南和最佳实践。

首先，如果你是一个javascript新手，我建议您阅读 《[JavaScript初学者的最佳实践](http://net.tutsplus.com/tutorials/JavaScript-ajax/24-JavaScript-best-practices-for-beginners/)》 ，这是一篇高质量的javascript教程，接触jQuery之前最好先阅读。

当你准备使用jQuery，我强烈建议你遵循下面这些指南：

## 规范
### 避免全局变量

jQuery与javascript一样，一般来说,最好确保你的变量在函数作用域内。

    // 糟糕
    
    $element = $('#element');
    h = $element.height();
    $element.css('height',h-20);
    
    // 建议
    
    var $element = $('#element');
    var h = $element.height();
    $element.css('height',h-20);

### 使用匈牙利命名法

在变量前加$前缀，便于识别出jQuery对象。

    // 糟糕
    
    var first = $('#first');
    var second = $('#second');
    var value = $first.val();
    
    // 建议 - 在jQuery对象前加$前缀
    
    var $first = $('#first');
    var $second = $('#second'),
    var value = $first.val();

### 请使用 `on`

在新版jQuery中，更短的 on(“click”) 用来取代类似 click() 这样的函数。在之前的版本中 on() 就是 bind()。自从jQuery 1.7版本后，on()?附加事件处理程序的首选方法。然而，出于一致性考虑，你可以简单的全部使用 on()方法。

    // 糟糕
    
    $first.click(function(){
        $first.css('border','1px solid red');
        $first.css('color','blue');
    });
    
    $first.hover(function(){
        $first.css('border','1px solid red');
    })
    
    // 建议
    $first.on('click',function(){
        $first.css('border','1px solid red');
        $first.css('color','blue');
    })
    
    $first.on('hover',function(){
        $first.css('border','1px solid red');
    })

### 精简 javascript

一般来说,最好尽可能合并函数。

    // 糟糕
    
    $first.click(function(){
        $first.css('border','1px solid red');
        $first.css('color','blue');
    });
    
    // 建议
    
    $first.on('click',function(){
        $first.css({
            'border':'1px solid red',
            'color':'blue'
        });
    });

## 熟记技巧

### data

你可能对使用jQuery中的方法缺少经验，一定要查看的文档，可能会有一个更好或更快的方法来使用它。

    // 糟糕
    $('#id').data(key,value);
    
    // 建议 (高效)
    $.data('#id',key,value);

## 选择器

### 使用子查询缓存的父元素

正如前面所提到的，DOM遍历是一项昂贵的操作。典型做法是缓存父元素并在选择子元素时重用这些缓存元素。

    // 糟糕
    
    var 
        $container = $('#container'),
        $containerLi = $('#container li'),
        $containerLiSpan = $('#container li span');
    
    // 建议 (高效)
    
    var 
        $container = $('#container '),
        $containerLi = $container.find('li'),
        $containerLiSpan= $containerLi.find('span');

### 避免通用选择符

将通用选择符放到后代选择符中，性能非常糟糕。

    // 糟糕
    
    $('.container > *'); 
    
    // 建议
    
    $('.container').children();

### 避免隐式通用选择符

通用选择符有时是隐式的，不容易发现。

    // 糟糕
    
    $('.someclass :radio'); 
    
    // 建议
    
    $('.someclass input:radio');

### 缓存变量

DOM遍历是昂贵的，所以尽量将会重用的元素缓存。

    // 糟糕
    
    h = $('#element').height();
    $('#element').css('height',h-20);
    
    // 建议
    
    $element = $('#element');
    h = $element.height();
    $element.css('height',h-20);

### 繁重的操作中分离元素

如果你打算对DOM元素做大量操作（连续设置多个属性或css样式），建议首先分离元素然后在添加。

    // 糟糕
    
    var 
        $container = $("#container"),
        $containerLi = $("#container li"),
        $element = null;
    
    $element = $containerLi.first(); 
    //... 许多复杂的操作
    
    // better
    
    var 
        $container = $("#container"),
        $containerLi = $container.find("li"),
        $element = null;
    
    $element = $containerLi.first().detach(); 
    //... 许多复杂的操作
    
    $container.append($element);

## 必要时组合jQuery和javascript原生代码

如上所述，jQuery就是javascript，这意味着用jQuery能做的事情，同样可以用原生代码来做。原生代码（或?[vanilla](http://vanilla-js.com/)）的可读性和可维护性可能不如jQuery，而且代码更长。但也意味着更高效（通常更接近底层代码可读性越差，性能越高，例如：汇编，当然需要更强大的人才可以）。牢记没有任何框架能比原生代码更小，更轻，更高效（注：测试链接已失效，可上网搜索测试代码）。

鉴于vanilla 和 jQuery之间的性能差异，我强烈建议吸收两人的精华，使用（可能的话）和[jQuery等价的原生代码](http://www.leebrimelow.com/native-methods-jQuery/)。

## 最后忠告

最后，我记录这篇文章的目的是提高jQuery的性能和其他一些好的建议。如果你想深入的研究对这个话题你会发现很多乐趣。记住，jQuery并非不可或缺，仅是一种选择。思考为什么要使用它。DOM操作？ajax？模版？css动画？还是选择符引擎？或许javascript微型框架或 jQuery的定制版是更好的选择。


