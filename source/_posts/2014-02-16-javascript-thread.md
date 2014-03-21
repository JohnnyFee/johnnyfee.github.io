---
layout: post
title: "JavaScript 线程机制"
category: JavaScript
tags: [javascript]
--- 

浏览器内核实现允许多个线程异步执行，这些线程在内核制控下相互配合以保持同步。假设某一浏览器内核的实现至少有四个常驻线程：__javascript引擎线程__、__界面渲染线程__、__浏览器事件触发线程__、Event Loop线程。除些以外，也有一些执行完就终止的线程：如Http请求线程等，这些异步线程都会产生不同的异步事件。

<!--more-->

##JavaScript引擎

__JavaScript引擎是单线程运行的,浏览器无论在什么时候都只且只有一个线程在运行JavaScript程序。__

下面通过一个图来阐明单线程的JavaScript引擎与另外那些线程是怎样互动通信的。虽然每个浏览器内核 （流行浏览器内核有：Trident[IE内核]、Gecko[Firefox内核]、Presto[Opera内核]、Webkit[Chrome、Safari] 等） 实现细节不同，但这其中的调用原理都是大同小异。

![JavaScript定时机制、以及浏览器渲染机制 浅谈 javascript-thread](http://julying.com/blog/uploadfile/2012/05/javascript-thread.png)

上图Time1-Time2..Timen表示不同的时间点,Timen下面对应的小方块代表该时间点的任务,假设现在是Time1时刻,引擎运行在Time1对应的任务方块代码内,在这个时间点内,我们来描述一下浏览器内核其它线程的状态。

__浏览器中的JavaScript引擎是基于事件驱动的。__这里的事件可看作是浏览器派给它的各种任务，如调用setTimeout 添加一个任务，也可来自浏览器内核的其它线程，如界面元素鼠标点击事件、定时触发器时间到达通知、异步请求状态变更通知等。

从代码角度看来任务实体就是各种回调函数，JavaScript引擎一直等待着任务队列中任务的到来。由于单线程关系,这些任务得进行排队，一个接着一个被引擎处理。

##图形界面渲染线程

该线程负责渲染浏览器界面HTML元素，当界面需要重绘(Repaint)或由于某种操作引发回流(Reflow)时，该线程就会执行。
__渲染线程与JavaScript引擎线程是互斥的！__因为JavaScript脚本是可操纵DOM元素，在修改这些元素属性同时渲染界面，那么渲染线程前后获得的元素数据就可能不一致了。在JavaScript引擎运行脚本期间，浏览器渲染线程都是处于挂起状态的。所以,在脚本中执行对界面进行更新操作,如添加结点，删除结点或改变结点的外观等更新并不会立即体现出来,这些操作将保存在一个队列中，待JavaScript引擎空闲时才有机会渲染出来。

##GUI事件触发线程

JavaScript脚本的执行不影响html元素事件的触发，在Time1时间段内，用户点击鼠标键，点击事件被浏览器事件触发线程捕捉后，形成一个鼠标点击事件，对于JavaScript引擎线程来说，这事件是由其它线程异步传到任务队列尾的，由于引擎正在处理 Time1 时的任务，这个鼠标点击事件就会排队。

##定时触发线程

注意这里的浏览器模型定时计数器并不是由JavaScript引擎计数的，因为JavaScript引擎是单线程的，如果处于阻塞线程状态就不能计时，它必须依赖外部来计时并触发定时，所以队列中的定时事件也是异步事件。

##Event Loop线程

参考：[什么是 Event Loop？ - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2013/10/event_loop.html?from=ourjs.com)

Event Loop 是一个很重要的概念，指的是计算机系统的一种运行机制。[Wikipedia](http://en.wikipedia.org/wiki/Event_loop)这样定义：

> Event Loop是一个程序结构，用于等待和发送消息和事件。 （a programming construct that waits for and dispatches events or messages in a program.）

简单说，就是在程序中设置两个线程：一个负责程序本身的运行，称为"主线程"；另一个负责主线程与其他进程（主要是各种I/O操作）的通信，被称为"Event Loop线程"（可以译为"消息线程"）。

![asynchronous mode](http://image.beekka.com/blog/201310/2013102004.png)

上图主线程的绿色部分，还是表示运行时间，而橙色部分表示空闲时间。每当遇到I/O的时候，主线程就让Event Loop线程去通知相应的I/O程序，然后接着往后运行，所以不存在红色的等待时间。等到I/O程序完成操作，Event Loop线程再把结果返回主线程。主线程就调用事先设定的回调函数，完成整个任务。
可以看到，由于多出了橙色的空闲时间，所以主线程得以运行更多的任务，这就提高了效率。这种运行方式称为"异步模式"（asynchronous I/O）或"非堵塞模式"（non-blocking mode）。

##工作线程

- [7 Things You Need To Know About Web Workers - Developer.com](http://www.developer.com/lang/jscript/7-things-you-need-to-know-about-web-workers.html)

既然JavaScript是单线程运行，那XMLHttpRequest 的异步链接是怎么回事？
其实异步请求是由浏览器新开一个线程请求！当请求的状态变更时，如果先前已设置回调，这异步线程就产生状态变更事件放到JavaScript引擎的处理队列中等待处理！
所以当任务被处理时，JavaScript引擎始终是单线程运行回调函数！

##参考

- [JavaScript定时机制、以及浏览器渲染机制 浅谈 | 前端攻城师王子墨](http://julying.com/blog/javascript-settimeout-thread/)
- [javascript线程解释（setTimeout,setInterval你不知道的事）](http://www.iamued.com/qianduan/1645.html)


