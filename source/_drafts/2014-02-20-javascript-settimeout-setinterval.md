---
layout: post
title: "JavaScript SetTimeout和SetInterval"
category: JavaScript
tags: [javascript]
---
### 
##setTimeout与setInterval的区别

    setTimeout(function(){
       /* 代码块... */
       setTimeout(arguments.callee, 10);
    }, 10);

    setInterval(function(){
       /*代码块... */
     }, 10);

这两段代码看一起效果一样,其实非也,第一段中回调函数内的setTimeout是JavaScript引擎执行后再设置新的setTimeout 定时, 假定上一个回调处理完到下一个回调开始处理为一个时间间隔,理论两个setTimeout回调执行时间间隔>=10ms .第二段自setInterval设置定时后,定时触发线程就会源源不断的每隔十毫秒产生异步定时事件并放到任务队列尾,理论上两个setInterval 回调执行时间间隔<=10.

setTimeout或者setInterval的设置的时间参数的具体意思是：**在参数指定的时间后将待执行方法放到执行队列中**， 如果队列中没有其他方法等待，则回立即执行setTimeout指定的方法，因此有时给人好像是立即执行的假象

下面看几个案例：

    setTimeout(function () { while (true) { } }, 1000);  
    setTimeout(function () { alert('end 2'); }, 2000);  
    setTimeout(function () { alert('end 1'); }, 100);  
    alert('end'); 

 执行的结果是弹出‘end’‘end 1’，然后浏览器假死，就是不弹出‘end 2’。也就是说第一个settimeout里执行的时候是一个死循环，这个直接导致了理论上比它晚一秒执行的第二个settimeout里的函数被阻塞。参考：[一道面试题引发的面壁:认识JavaScript的settimeout和异步 - 51CTO.COM](http://developer.51cto.com/art/201106/268637.htm)

##setTimeout和setInterval的缺点

###存在一定时间间隔
setTimeout 是存在一定时间间隔的，并不是设定 n 毫秒执行，他就是 n 毫秒执行，可能会有一点时间的延迟。

[Barret Lee](http://www.cnblogs.com/hustskyking/)使用以下例子做了一个实验：

    var d = new Date, count = 0, f, timer;
    timer = setInterval(f = function (){
        if(new Date - d > 1000) 
            clearInterval(timer), console.log(count);
        count++;
    }, 0);

实验结果为count = 351813。也就是说，setInterval 和 setTimeout 函数运转的最短周期是 5ms 左右。这个数值在 [HTML规范](http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout) 中也是有提到的:

>Let timeout be the second method argument, or zero if the argument was omitted.（如果 timeout 参数没有写，默认为 0。）

>If nesting level is greater than 5, and timeout is less than 4, then increase timeout to 4.（如果嵌套的层次大于 5 ，并且 timeout 设置的数值小于 4 则直接取 4.）。

为了让函数可以更快速的相应，部分浏览器提供了更加高级的接口（当 timeout 为 0 的时候，可以使用下面的方式替代，速度更快）：

* requestAnimationFrame 它允许 JavaScript 以 60+帧/s 的速度处理动画， 他的运行时间间隔比 setTimeout 是要短很多的。  @司徒正美 ，他适合动画，使用他可以在 tab 失去焦点或者最小化的时候减缓运动，从而节省 CPU 资源，他的运行间隔确实比 setTimeout 要长。
* process.nextTick 这个是 NodeJS 中的一个函数，利用他可以几乎达到上面看到的 while 循环的效率
* ajax 或者 插入节点 的 readyState 变化
* MutationObserver 大约 2-3ms
* setImmediate
* postMessage 这个相当快

在[RubyLouvre/avalon](https://github.com/RubyLouvre/avalon)的[avalon/localization/english/avalon.js](https://github.com/RubyLouvre/avalon/blob/e336fd809624172a11e28e9afe09a0811350f043/localization/english/avalon.js)文件中有提供根据不同浏览器来选择不同API的源码，请看BrowserMutationObserver的定义。

###try..catch捕捉不到错误

    try{
        setTimeout(function(){
            throw new Error("我不希望这个错误出现！")
        }, 1000);
    } catch(e){
        console.log(e.message);
    }

##参考

- [JavaScript异步编程原理 - Barret Lee](http://www.cnblogs.com/hustskyking/p/javascript-asynchronous-programming.html)
- [setTimeout(0) 即将退役 - PuterJam's Blog](http://www.pjhome.net/article/Javascript/setImmediate_requestAnimationFrame.html)
- [Understanding timers: setTimeout and setInterval | JavaScript Tutorial](http://javascript.info/tutorial/settimeout-setinterval)








