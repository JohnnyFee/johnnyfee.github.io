---
layout: post
title: "JavaScript 技巧"
category: JavaScript
tags: [javascript,performance]
--- 

> Original: [7 JavaScript Basics Many Developers Aren't Using (Properly)](http://tech.pro/tutorial/1453/7-javascript-basics-many-developers-aren-t-using-properly)
> 
> [[译] JavaScript 开发者经常忽略或误用的七个基础知识点 · Issue #21 · cssmagic/blog · GitHub](https://github.com/cssmagic/blog/issues/21) 
> 
> Translated by: [> cssmagic](https://github.com/cssmagic) 


JavaScript 本身可以算是一门简单的语言，但我们也不断用智慧和灵活的模式来改进它。昨天我们将这些模式应用到了 JavaScript 框架中，今天这些框架又驱动了我们的 Web 应用程序。很多新手开发者被各种强大的 JavaScript 框架吸引进来，但他们却忽略了框架身后浩如星海的 JavaScript 实用技巧。本文将为你呈献其中七个基础知识点：

## String

### 在 String.prototype.replace 方法中使用 /g 和 /i 标志位

令很多 JavaScript 初学者意外的是，字符串的 replace 方法并不会 [替换所有匹配的子串](http://davidwalsh.name/javascript-replace)——而仅仅替换第一次匹配。当然 JavaScript 老手们都知道这里可以使用正则表达式，并且需要加上一个全局标志位（/g）：

    // Mistake
    // 踩到坑了
    var str = "David is an Arsenal fan, which means David is great";
    str.replace("David", "Darren"); // "Darren is an Arsenal fan, which means David is great"
    
    // Desired
    // 符合预期
    str.replace(/David/g, "Darren"); // "Darren is an Arsenal fan, which means Darren is great"

另一个基本的逻辑错误就是在大小写不敏感的校验场合（字母可大写可小写）没有忽略大小写，此时 /i 标志位就很实用：

    str.replace(/david/gi, "Darren"); // "Darren will always be an Arsenal fan, which means Darren will always be great"

（译注：上面这段例程我没有看懂用意，可能是注释有误吧……）

每个 JavaScript 开发者都曾踩过这两个标志位的坑——因此别忘了在适当的时候用上它们！

## Array

- [Working with ES5 JavaScript array functions in modern and legacy browsers - Tech.Pro](http://tech.pro/tutorial/1834/working-with-es5-javascript-array-functions-in-modern-and-legacy-br)

### 类数组对象和 Array.prototype.slice 方法

数组的 slice 方法通常用来从一个数组中抽取片断。但很多开发者不了解的是，这个方法还可以用来将“类数组”元素（比如 arguments 参数列表、节点列表和属性列表）转换成真正的数组：（译注：DOM 元素的属性列表通过 attributes 属性获取，比如 document.body.attributes。）

    var nodesArr = Array.prototype.slice.call(document.querySelectorAll("div"));
    // "true" array of DIVs
    // 得到一个由 div 元素组成的“真正的”数组
    
    var argsArr = Array.prototype.slice.call(arguments);
    // changes arguments to "true" array
    // 把 arguments 转换成一个“真正的”数组

你还可以使用一次简单的 slice 调用来克隆一个数组：

    var clone = myArray.slice(0); // naive clone
                                  // 浅克隆

（译注：这里的参数 0 也可以省略，我估计 undefined 被 slice 方法自动转换为 0 了吧。）

Array.prototype.slice 绝对是 JavaScript 世界中的一玫珍宝，但 JavaScript 初学者们显然还没有意识到它的全部潜力。

### Array.prototype.sort 方法

[数组的 sort 方法](http://davidwalsh.name/array-sort) 远远没有被充分利用，而且可能比开发者们想像的更加强大。很多开发者可能觉得 sort 方法可以用来做这种事情：

    [1, 3, 9, 2].sort();
        // Returns: [1, 2, 3, 9]
        // 返回 [1, 2, 3, 9]

……这没错，但它还有更强大的用法，比如这样：

    [
        { name: "Robin Van PurseStrings", age: 30 },
        { name: "Theo Walcott", age: 24 },
        { name: "Bacary Sagna", age: 28  }
    ].sort(function(obj1, obj2) {
        // Ascending: first age less than the previous
        // 实现增序排列：前者的 age 小于后者
        return obj1.age - obj2.age;
    });
        // Returns:  
        // [
        //    { name: "Theo Walcott", age: 24 },
        //    { name: "Bacary Sagna", age: 28  },
        //    { name: "Robin Van PurseStrings", age: 30 }
        // ]

你不仅可以对简单类型的数组项进行排序，可以通过属性来排序对象。如果哪天服务器端发来一段 JSON 数据，而且其中的对象需要排序，你可别忘了这一招！

### 用 length 属性来截断数组

几乎所有开发者都踩过 JavaScript 的这个坑——“传对象只是传引用”。开发者们经常会试图 [把一个数组清空](http://davidwalsh.name/empty-array)，但实际上却错误地创建了一个新数组。

    var myArray = yourArray = [1, 2, 3];
    
    // :(
    // 囧
    myArray = []; // `yourArray` is still [1, 2, 3]
                  // `yourArray` 仍然是 [1, 2, 3]
    
    // The right way, keeping reference
    // 正确的方法是保持引用
    myArray.length = 0; // `yourArray` and `myArray` both []
                        // `yourArray` 和 `myArray`（以及其它所有对这个数组的引用）都变成 [] 了

坑里的人们终于明白，原来传对象只是在传引用。因此当我把 myArray 重新赋值为 [] 时，确实会创建出一个新的空数组，但其它对老数组的引用仍然没变！大坑啊！还是换用截断的方法吧，少年。

### 使用 push 来合并数组

在上面的第 2 节里，我展示了数组的 slice 和 apply 方法所能组合出的几个小妙招，所以对于数组方法的其它技巧，你应该已经做好心理准备了吧。这次我们使用 push 方法来合并数组：

    var mergeTo = [4,5,6];
    var mergeFrom = [7,8,9];
    
    Array.prototype.push.apply(mergeTo, mergeFrom);
    
    mergeTo; // is: [4, 5, 6, 7, 8, 9]

这是一项不为人知的小技巧，简单的原生方法就可以实现数组合并这样的常见任务。

See also [Combining JS Arrays](http://davidwalsh.name/combining-js-arrays)

## Property
### 高效探测功能特性和对象属性

很多时候开发者们会像下面这样来探测浏览器的某个特性：

    if(navigator.geolocation) {
        // Do some stuff
        // 在这里干点事情
    }

当然这可以正常工作，但它并不一定有很好的效率。因为这个对象探测方法会在浏览器中初始化资源。在过去，上面的代码片断可能会在某些浏览器下导致内存泄露。更好、更快的方法是检查对象是否包含某个键名：

    if("geolocation" in navigator) {
        // Do some stuff
        // 在这里干点事情
    }

键名检查十分简单，而且可以避免内存泄露。另外请注意，如果这个属性的值是假值，那么前一种探测方式将会得到“否”的结果，并不能真正探测出这个键名是否存在。

See also [Retrieving Property Names with `Object.getOwnPropertyNames` and `Object.keys` · Design Pepper](http://designpepper.com/blog/drips/retrieving-property-names-with-object-getownpropertynames-and-object-keys.html)

## Event

### 事件对象的 preventDefault 和 stopPropagation 方法

很多时候，当一个动作元素（比如链接）被点击时，会触发某个功能。显然我们并不希望点击链接时浏览器顺着这个链接跳转，于是我们会习惯性地使用 JavaScript 类库的 Event.stop 方法：

    $("a.trigger").on("click", function(e) {
        e.stop();
    
        // Do more stuff
        // 在这里干点事情
    });

（译注：不知道哪个类库有这个方法，估计其作用相当于 return false; 吧。语法看起来像 jQuery，但 jQuery 并没有这个方法，而且 jQuery 是支持 e.preventDefault 和 e.stopPropagation 方法的。）

这个懒方法有一个问题，它不仅阻止了浏览器的默认动作，同时也阻止了事件继续冒泡。这意味着元素上绑定的其它事件监听器将不会被触发，因为它们根本就不知道有事件发生。此时不妨使用 preventDefault 吧！

JavaScript 老鸟们看到这篇文章可能会说“我早知道了”，但说不定什么时候，他们就会在某一点上栽跟头。提醒大家留意 JavaScript 中的各种小细节，失之毫厘谬以千里啊！

