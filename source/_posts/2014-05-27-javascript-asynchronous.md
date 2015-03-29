layout: post
title: "JavaScript 异步编程"
category: JavaScript
tags: [javascript]
--- 

Javascript语言的执行环境是"单线程"（single thread）。所谓"单线程"，就是指一次只能完成一件任务。如果有多个任务，就必须排队，前面一个任务完成，再执行后面一个任务，以此类推。

这种模式的好处是实现起来比较简单，执行环境相对单纯；坏处是只要有一个任务耗时很长，后面的任务都必须排队等着，会拖延整个程序的执行。常见的浏览器无响应（假死），往往就是因为某一段Javascript代码长时间运行（比如死循环），导致整个页面卡在这个地方，其他任务无法执行。

为了解决这个问题，Javascript语言将任务的执行模式分成两种：同步（Synchronous）和异步（Asynchronous）。

"同步模式"就是上一段的模式，后一个任务等待前一个任务结束，然后再执行，程序的执行顺序与任务的排列顺序是一致的、同步的；"异步模式"则完全不同，每一个任务有一个或多个回调函数（callback），前一个任务结束后，不是执行后一个任务，而是执行回调函数，后一个任务则是不等前一个任务结束就执行，所以程序的执行顺序与任务的排列顺序是不一致的、异步的。

"异步模式"非常重要。在浏览器端，耗时很长的操作都应该异步执行，避免浏览器失去响应，最好的例子就是Ajax操作。在服务器端，"异步模式"甚至是唯一的模式，因为执行环境是单线程的，如果允许同步执行所有http请求，服务器性能会急剧下降，很快就会失去响应。

以下总结了"异步模式"编程的4种方法，理解它们可以让你写出结构更合理、性能更出色、维护更方便的JavaScript程序。

<!--more-->

## 回调函数

这是异步编程最基本的方法。

假定有两个函数f1和f2，后者等待前者的执行结果。

    f1();
    f2();

如果f1是一个很耗时的任务（我们暂且使用setTimeout去代替耗时操作，以下同理），可以考虑改写f1，把f2写成f1的回调函数。

    function f1(callback){
        setTimeout(function () {
            // f1的任务代码
            callback();
        }, 1000);
    }

执行代码就变成下面这样：

    f1(f2);

采用这种方式，我们把同步操作变成了异步操作，f1不会堵塞程序运行，相当于先执行程序的主要逻辑，将耗时的操作推迟执行。

__优点：__

- 是一个很常见的模式，所以非常容易理解。
- 很容易实现。

__缺点：__

- 不利于代码的阅读和维护，如果使用内嵌的方式可能使代码非常难看，流程会很混乱，请参考[Callback Hell](http://callbackhell.com/)。不过可以将内联函数作为外部函数来避免这个问题。
- 每个任务只能指定一个回调函数，这在很多情况下都是不能够满足需求的。

## 事件监听

另一种思路是采用事件驱动模式。任务的执行不取决于代码的顺序，而取决于某个事件是否发生。

还是以f1和f2为例。首先，为f1绑定一个事件（这里采用的jQuery的[写法](http://api.jquery.com/on/)）。

    f1.on('done', f2);

‘on’ is one of many common name for this function, other common names you will come across are ‘bind’, ‘listen’, ‘addEventListener’, ‘observe’.

当f1发生done事件，就执行f2。然后，对f1进行改写：

    function f1(){
        setTimeout(function () {
            // f1的任务代码
            f1.trigger('done');
        }, 1000);
    }

f1.trigger('done')表示，执行完成后，立即触发done事件，从而开始执行f2。

Note that they are calling a method trigger when the work is done, I will add this method to these objects using a mix-in. Again ‘trigger’ is one of the names you will come across, others common names are ‘fire’ and ‘publish’.

We need a mix-in object that has the listener behaviour, in this case I will just lean on jQuery for this:

    var eventable = {
        on: function(event, cb) {
            $(this).on(event, cb);
        },
        trigger: function (event, args) {
            $(this).trigger(event, args);
        }
    }

Then apply the behaviour to our finder and processor objects:

    $.extend(f1, eventable);
    $.extend(f2, eventable);

__优点：__

- 比较容易理解
- 可以绑定多个事件，每个事件可以指定多个回调函数，而且可以"去耦合"（Decoupling），有利于实现[模块化](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)。
 
__缺点：__

- 整个程序都要变成事件驱动型，运行流程会变得相对不清晰。
- A bit more difficult to setup than callbacks in your own code, you will probably want to use a library e.g. jQuery, [bean.js](https://github.com/fat/bean).


## 发布/订阅

上一节的"事件"，完全可以理解成"信号"。

我们假定，存在一个"信号中心"，某个任务执行完成，就向信号中心"发布"（publish）一个信号，其他任务可以向信号中心"订阅"（subscribe）这个信号，从而知道什么时候自己可以开始执行。这就叫做["发布/订阅模式"](http://en.wikipedia.org/wiki/Publish-subscribe_pattern)（publish-subscribe pattern），又称["观察者模式"](http://en.wikipedia.org/wiki/Observer_pattern)（observer pattern）。

这个模式有多种[实现](http://msdn.microsoft.com/en-us/magazine/hh201955.aspx)，下面采用的是Ben Alman的[Tiny Pub/Sub](https://gist.github.com/661855)，这是jQuery的一个插件。

首先，f2向"信号中心"jQuery订阅"done"信号。

    jQuery.subscribe("done", f2);

然后，f1进行如下改写：

    function f1(){
        setTimeout(function () {
            // f1的任务代码
           jQuery.publish("done");
        }, 1000);
    }

jQuery.publish("done")的意思是，f1执行完成后，向"信号中心"jQuery发布"done"信号，从而引发f2的执行。

此外，f2完成执行后，也可以取消订阅（unsubscribe）。

    jQuery.unsubscribe("done", f2);

这种方法的性质与"事件监听"类似，但是明显优于后者。因为我们可以通过查看"消息中心"，了解存在多少信号、每个信号有多少订阅者，从而监控程序的运行。

## Async.js

Flow control libraries are also a very nice way to deal with asynchronous code. [Async.js](https://github.com/caolan/async) is one of the most popular .

为了使用Async.js，我们需要修改一下f1的回调函数的调用方式：

    function f1(callback){
        setTimeout(function () {
            // f1的任务代码
            callback(null, otherArguments);
        }, 1000);
    }

The first argument in the callback is null if no error occurs; or the error if one occurs. This is a common pattern in Node.js libraries and Async.js uses this pattern. By using this style the flow between Async.js and the callbacks becomes super simple.

我们使用Async后，代码将变成：

    async.waterfall([
        function(argument...){
            f1(..., callback);
        },
        f2
    ]);

 Note how we can just pass the ‘f2’ function, this is because we are using the Node continuation style.

 Now, when doing front-end development it is unlikely that you will have a library that follows the callback(null, results) signature. So a more realistic example will look like this:

     async.waterfall([
        function(argument...){
            f1(..., callback);
        },
        function(argument...){
            f2(argument...) {
                //...
            });
        },
    ]);

__优点：__

- Usually code using a control flow library is easier to understand because it follows a natural order (from top to bottom). This is not true with callbacks and listeners.

__缺点：__

- If the signatures of the functions don’t match as in the second example then you can argue that the flow control library offers little in terms of readability.

## Promises对象

__Promises对象是CommonJS工作组提出的一种规范__，目的是为异步编程提供[统一接口](http://wiki.commonjs.org/wiki/Promises/A)。

简单说，它的思想是，每一个异步任务返回一个Promise对象，该对象有一个then方法，允许指定回调函数。比如，f1的回调函数f2,可以写成：

    f1().then(f2);

Note how in the first callback we can simply pass the ‘f2’ function. This is because this function returns a promise itself so everything will just flow nicely.

f1要进行如下改写（这里使用的是jQuery的[实现](http://www.ruanyifeng.com/blog/2011/08/a_detailed_explanation_of_jquery_deferred_object.html)）：

    function f1(){
        var dfd = $.Deferred();
        setTimeout(function () {
            // f1的任务代码
            dfd.resolve();
        }, 500);
        return dfd.promise;
    }

Each function creates a deferred object and returns a promise. Then it resolves the deferred when the results arrive.

除了Jquery，还有其他库也实现了Promises，如：

- [when.js](https://github.com/cujojs/when)   

使用when.js实现和使用Jquery实现类似：

    function f1(){
        var deferred = when.defer();
        setTimeout(function () {
            // f1的任务代码
            deferred.resolve();
        }, 500);
        return deferred.promise;
    }

    // f2可以传入f1中deferred.resolve()中传入的参数。
    function f2(){
        var deferred = when.defer();
        setTimeout(function () {
            // f2的任务代码
            dfd.resolve();
        }, 500);
        return deferred.promise;
    }

__优点：__

- 这样写的优点在于，回调函数变成了链式写法，程序的流程可以看得很清楚，而且有一整套的[配套方法](http://api.jquery.com/category/deferred-object/)，可以实现许多强大的功能。

比如，指定多个回调函数：

    f1().then(f2).then(f3);

再比如，指定发生错误时的回调函数：

    f1().then(f2).fail(f3);

- 而且，它还有一个前面三种方法都没有的好处：如果一个任务已经完成，再添加回调函数，该回调函数会立即执行。所以，你不用担心是否错过了某个事件或信号。

如：

    var promise = finder([1,2]);
    
    // wait 
    setTimeout(function () {
        // when this is called the finder promise has already been resolved
        promise.then(function (records) {
            log('records received');        
        });
    }, 1500);

This is a huge feature for dealing with user interaction in the browser. In complex applications you may not know the order of actions that the user will take, so you can use promises to track use interaction.
 
__缺点：__

- The least understood of all these tools.
- They can get difficult to track when you have lots of aggregated promises with added listeners along the way.

## 错误处理

前面已经提到了 setTimeout 函数的一些问题，JS 中的 try..catch 机制并不能拿到 setTimeout 函数中出现的错误，一个 throw error 的影响范围有多大呢？我做了一个测试：

    <script type="text/javascript">
        throw new Error("error");
        console.log("show me"); // 并没有打印出来
    </script>
    <script type="text/javascript">
        console.log("show me"); // 打印出来了
    </script>

从上面的测试我们可以看出，throw new Error 的作用范围就是阻断一个 script 标签内的程序运行，但是不会影响下面的 script。这个测试没什么作用，只是想告诉大家不要担心一个 Error 会影响全局的函数执行。所以把代码分为两段，一段可能出错的，一段确保不会出错的，这样不至于让全局代码都死掉，当然这样的处理方式是不可取的。

庆幸的是 window 全局对象上有一个便利的函数，window.error，我们可以利用他捕捉到所有的错误，并作出相应的处理，比如：

    window.onerror = function(msg, url, line){
        console.log(msg, url, line);
        // 必须返回 true，否则 Error 还是会触发阻塞程序
        return true;
    }

    setTimeout(function(){
        throw new Error("error");
        // console：
        //Uncaught Error: error path/to/ie6bug.html 99  
    }, 50);

很显然，报错已经不可怕了，利用 window 提供的 onerror 函数可以很方便地处理错误并作出及时的反应，如果出现了不可知的错误，可以把信息 post 到后台，这也算是一个十分不错的监控方式。

不过这样的处理存在一个问题，所有的错误我们都给屏蔽了，但有些错误本应该阻断所有程序的运行的。比如我们通过 ajax 获取数据中出了错误，程序误以为已经拿到了数据，本应该停下工作报出这个致命的错误，但是这个错误被 window.onerror 给截获了，从而进行了错误的处理。

参考：[JavaScript异步编程原理 - Barret Lee - 博客园](http://www.cnblogs.com/hustskyking/p/javascript-asynchronous-programming.html)

## 其他

- [短小强悍的JavaScript异步调用库 - WEB开发者](http://www.admin10000.com/document/3917.html)
    + 原文 [7 lines JavaScript library for calling asynchronous functions](http://krasimirtsonev.com/blog/article/7-lines-JavaScript-library-for-calling-asynchronous-functions)
- [continuation.js](https://github.com/BYVoid/continuation)
- [JeffreyZhao/wind](https://github.com/JeffreyZhao/wind)

## 参考

- [Javascript异步编程的4种方法 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2012/12/asynchronous%EF%BC%BFjavascript.html)
- [JavaScript异步编程的模式 -- JavaScript 标准参考教程（alpha）](http://javascript.ruanyifeng.com/advanced/asynchronous.html)
- [Asynchronous JS: Callbacks, Listeners, Control Flow Libs and Promises](http://sporto.github.com/blog/2012/12/09/callbacks-listeners-promises/)
- [Embracing Async with Deferreds and Promises - Sebastian's Blog](http://sporto.github.io/blog/2012/09/22/embracing-async-with-deferreds/)
- [JavaScript异步编程](http://software.intel.com/zh-cn/articles/asynchronized-javascript-programming)