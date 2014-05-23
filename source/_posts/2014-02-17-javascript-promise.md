---
layout: post
title: "JavaScript Promise"
category : JavaScript
tagline: ""
tags : [javascript, async]
--- 
## 简介

Promises对象是CommonJS工作组提出的一种规范，目的是为异步编程提供[统一接口](http://wiki.commonjs.org/wiki/Promises/A)。

Promise/A+的规范内容请参考 [Promises/A+](http://promises-aplus.github.io/promises-spec/)。

<!--more-->

那么，什么是Promises？首先，它是一个对象，也就是说与其他JavaScript对象的用法，没有什么两样；其次，它起到代理作用（proxy），使得异步操作具备同步操作（synchronous code）的接口，即充当异步操作与回调函数之间的中介，使得程序具备正常的同步运行的流程，回调函数不必再一层层包裹起来。

JavaScript Promise 最初以“Futures”为名归为 DOM 规范，后来改名为“Promises”，最终纳入 JavaScript 规范。将其加入 JavaScript 而非 DOM 的好处是方便在非浏览器环境中使用，如Node.js（他们会不会在核心API中使用就是另一回事了）。

尽管它被归位 JavaScript 特性，DOM 也很乐意拿过来用。事实上，所有包含异步成功/失败方法的新 DOM API 都会使用 Promise 机制，已经实现的包括 [Quota Management](https://dvcs.w3.org/hg/quota/raw-file/tip/Overview.html#idl-def-StorageQuota), [Font Load Events](http://dev.w3.org/csswg/css-font-loading/#font-face-set-ready),[ServiceWorker](https://github.com/slightlyoff/ServiceWorker/blob/cf459d473ae09f6994e8539113d277cbd2bce939/service_worker.ts#L17), [Web MIDI](http://webaudio.github.io/web-midi-api/#widl-Navigator-requestMIDIAccess-Promise-MIDIOptions-options), [Streams](https://github.com/whatwg/streams#basereadablestream) 等等。

一个 Promise 只能成功或失败一次，并且状态无法改变（不能从成功变为失败，反之亦然）
如果一个 Promise 成功或者失败之后，你为其添加针对成功/失败的回调，则相应的回调函数会立即执行


Promises原本只是社区提出的一个构想，一些第三方函数库率先实现了这个功能，目前ECMAScript 6正在考虑将其写入语言标准，Chrome(32+)和Firefox(25+)浏览器的最新版本都初步部署了这个功能。不过这两个浏览器的实现都还不够完整彻底，你可以 [在 bugzilla 上跟踪 Firefox 的最新进展](https://bugzilla.mozilla.org/show_bug.cgi?id=918806)或者[到 Chromium Dashboard 查看 Chrome 的实现情况](http://www.chromestatus.com/features/5681726336532480)。

要在这两个浏览器上达到兼容标准 Promise，或者在其他浏览器以及 Node.js 中使用 Promise，可以看看这个 [polyfill](https://github.com/jakearchibald/ES6-Promises/blob/master/README.md)（gzip 之后 2K）。

## 为什么选择Promise

参考：[What's The Point Of Promises?](http://blogs.telerik.com/kendoui/posts/13-03-28/what-is-the-point-of-promises)
中文翻译：[什么是Promises的重点 - 技术翻译 - 开源中国社区](http://www.oschina.net/translate/what-is-the-point-of-promises)

那么Promise能给我们带来什么呢？

### 避免厄运的金字塔

网上你可以找到很多文章引用“厄运的金字塔”的说法作为使用promises的主要原因。这是指需要连续的执行多个异步操作。在普通回调下，我们将会在相互的调用之间结束嵌套的调用；随着这种调用代码变得更缩进，生成了一个金字塔（指向右方的）因此有了“厄运的金字塔”的名字。如果你只需连续执行一两个异步操作，那么这还不是太坏，但一旦你需要做3个或更多，它将会变得难以阅读，特别是当每一步都有相当多的处理需要做的时候。使用promises可以帮助代码变平，而且使它再一次变得更容易阅读。我们来看看。

比如说一下为一个厄运的金字塔的例子：

    // Normal callback usage => PYRAMID OF DOOOOOOOOM
    asyncOperation(function(data){
      // Do some processing with `data`
      anotherAsync(function(data2){
          // Some more processing with `data2`
          yetAnotherAsync(function(){
              // Yay we're finished!
          });
      });
    });

使用Promise之后代码可能变为：

    asyncOperation()
    .then(function(data){
        // Do some processing with `data`
        return anotherAsync();
    })
    .then(function(data2){
        // Some more processing with `data2`
        return yetAnotherAsync();
    })
    .then(function(){
        // Yay we're finished!
    });

### 完美解耦

也许你会说，使用命名的回调（Named Callbacks）也可以解决厄运的金字塔问题，比如：

    // Normal callback usage => PYRAMID OF DOOOOOOOOM
    asyncOperation(handler1);

    function handler1(data) {
        // Do some processing with `data`
        anotherAsync(handler2);
    }

    function handler2(data2) {
        // Some more processing with `data2`
        yetAnotherAsync(handler3);
    }

    function handler3() {
        // Yay we're finished!
    }

在以上的例子中，handler1依赖handler2，handler2依赖handler3.这就意味着handler1无论出于任何目的都不可在被用除非handler2也呈现出来。假如你不打算重用他们，那么给你的函数命名又有什么意义呢？

使用Promise的链式回调可以完美解决上述问题：

    asyncOperation().then(handler1).then(handler2).then(handler3);

    function handler1(data) {
        // Do some processing with `data`
        return anotherAsync();
    }

    function handler2(data2) {
        // Some more processing with `data2`
        return yetAnotherAsync();
    }

    function handler3() {
        // Yay we're finished!
    }

handler1、handler2、handler3互不依赖，而只是使用Promise的then方法将他们串联起来。

## Promises接口

参考[Promise - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#Methods)。

Promise主要提供以下接口：

### Constructor

    new Promise(function(resolve, reject) {});

- resolve
    - 类型为thenable. Your promise will be fulfilled/rejected with the outcome of thenable
    - 类型为object Your promise is fulfilled with obj
- reject(obj) Your promise is rejected with obj. For consistency and debugging (eg stack traces), obj should be an instanceof Error. Any errors thrown in the constructor callback will be implicitly passed to reject().

### Methods

- Promise.prototype.then(onFulfilled, onRejected)
    promise对象的then方法用来添加回调函数。它可以接受两个回调函数，第一个是操作成功（fulfilled）时的回调函数，第二个是操作失败（rejected）时的回调函数（可以不提供）。一旦状态改变，就调用相应的回调函数。

    Appends fullfillment and rejection handlers to the promise, and returns a new promise resolving to the return value of the called handler.

    Sometimes, the then method takes up to three arguments: a success callback, a failure callback, and a progress callback (the spec does not require implementations to include the progress feature, but many do). 

    For the implementations that include the progress feature, a promise can be updated on its progress at any time before it leaves the unfulfilled state. When the progress is updated, all of the progress callbacks will be immediately invoked and passed the progress value. Progress callbacks are handled differently than the success and failure callbacks; If you register a progress callback after a progress update has already happened, the new progress callback will only be called for progress updates that occur after it was registered.
    
    Just like an example below:

        asyncOperation()
        .then(function(data){
            // Do some processing with `data`
            return anotherAsync();
        })
        .then(function(data2){
            // Some more processing with `data2`
            return yetAnotherAsync();
        })
        .then(function(){
            // Yay we're finished!
        });

    asyncOperation returns a promise object. So we call then on that promise object and pass it a callback function; `then` will also return a promise. When the asyncOperation finishes, it'll fulfill the promise with data. The callback is then invoked and data is passed in as an argument to it. 

    * If the callback doesn't have a return value, the promise that was returned by `then` is immediately fulfilled with no value.
    * If the callback returns something other than a promise, then the promise that was returned by `then` will be immediately fulfilled with that value.
    * If the callback returns a promise (like in the example), then the promise that was returned by `then` will wait until the promise that was returned by our callback is fulfilled.
    * Once our callback's promise is fulfilled, the value that it was fulfilled with (in this case, data2) will be given to `then`'s promise. Then the promise from `then` is fulfilled with data2. And so on.

    It sounds a bit complicated, but it's actually pretty simple. If what I've told you doesn't sink in, I'm sorry. I guess I'm just not the best person to talk about it.

- Promise.prototype.catch(onRejected)

    Appends a rejection handler callback to the promise, and returns a new promise resolving to the return value of the callback if it is called, or to its original fulfillment value if the promise is instead fulfilled.

### Static Methods

- Promise.resolve(value)

    Returns a Promise object that is resolved with the given value. If the value is a thenable (i.e. has a then method), the returned promise will "follow" that thenable, adopting its eventual state; otherwise the returned promise will be fulfilled with the value.

    - If you pass it something promise-like (has a 'then' method), it creates a new promise that fulfills/rejects in the same way, effectively a clone. 
    - If you pass in any other value, eg Promise.resolve('Hello'), it creates a promise that fulfills with that value. 
    - If you call it with no value, as above, it fulfills with "undefined".

    `reject`接口同理。

- Promise.reject(reason)

    Returns a Promise object that is rejected with the given reason.

- Promise.cast(value)

    Casts a value to a promise. Useful for quick returns from methods that should return promises. 

        Promise.cast(3).then(function(result) {
          // result == 3;
        });

- Promise.all(iterable)

    Returns a promise that resolves when all of the promises in iterable have resolved. The result is passed an array of values from all the promises. If something passed in the iterable array is not a promise, it's converted to one by Promise.cast. If any of the passed in promises rejects, the all Promise should also reject (and receives the value of the promise that rejected. 

        var p = new Promise(function(resolve, reject) { resolve(3); });
        Promise.all([true, p]).then(function(values) {
          // values == [ true, 3 ]
        });

- Promise.race(iterable)

    Returns a promise that resolves when the first promise in the iterable resolves. 

        var p1 = new Promise(function(resolve, reject) { setTimeout(resolve, 500, "one"); });
        var p2 = new Promise(function(resolve, reject) { setTimeout(resolve, 100, "two"); });
        Promise.race([p1, p2]).then(function(value) {
          // value == "two"
        });

## 实例

在下面的章节中，我们都将围绕如下实例来展开讨论：

1. 显示一个加载指示图标
2. 加载一篇小说的 JSON，包含小说名和每一章内容的 URL。
3. 在页面中填上小说名
4. 加载所有章节正文
5. 在页面中添加章节正文
6. 停止加载指示

这个过程中如果发生什么错误了要通知用户，并且把加载指示停掉，不然它就会不停转下去，令人眼晕，或者搞坏界面什么的。

__将 Promise 用于 XMLHttpRequest__

只要能保持向后兼容，现有 API 都会更新以支持 Promise，XMLHttpRequest 是重点考虑对象之一。不过现在我们先来写个 GET 请求：

    function get(url) {
      // 返回一个新的 Promise
      return new Promise(function(resolve, reject) {
        // 经典 XHR 操作
        var req = new XMLHttpRequest();
        req.open('GET', url);
    
        req.onload = function() {
          // 当发生 404 等状况的时候调用此函数
          // 所以先检查状态码
          if (req.status == 200) {
            // 以响应文本为结果，完成此 Promise
            resolve(req.response);
          }
          else {
            // 否则就以状态码为结果否定掉此 Promise
            // （提供一个有意义的 Error 对象）
            reject(Error(req.statusText));
          }
        };
    
        // 网络异常的处理方法
        req.onerror = function() {
          reject(Error("Network Error"));
        };
    
        // 发出请求
        req.send();
      });
    }

现在可以调用它了：

    get('story.json').then(function(response) {
      console.log("Success!", response);
    }, function(error) {
      console.error("Failed!", error);
    });

## Usage

当异步任务返回一个promise对象（小写表示这是Promise的实例）时，该对象只有三种状态：未完成（pending）、已完成（fulfilled）、失败（rejected）。

这三种的状态的变化途径只有两个，且只能发生一次：从“未完成”到“已完成”，或者从“未完成”到“失败”。一旦当前状态变为“已完成”或“失败”，就意味着不会再发生状态变化了。

    (new Promise(step1))
    .then(step2)
    .then(step3)
    .then(step4)
    .then(console.log, console.error);

再来看上面的代码就很清楚，step1是一个耗时很长的异步任务，然后使用then方法，依次绑定了三个step1操作成功后的回调函数step2、step3、step4，最后再用then方法绑定两个回调函数：操作成功时的回调函数console.log，操作失败时的回调函数console.error。

console.log和console.error这两个最后的回调函数，用法上有一点重要的区别。console.log只显示回调函数step4的返回值，而**console.error可以显示step2、step3、step4之中任何一个发生的错误**。也就是说，假定step2操作失败，抛出一个错误，这时step3和step4都不会再运行了，promises对象开始寻找接下来的第一个错误回调函数，在上面代码中是console.error。所以，结论就是Promises对象的错误有传递性。

### Transforming values

你可以对结果做些修改然后返回一个新值：

    var promise = new Promise(function(resolve, reject) {
      resolve(1);
    });
    
    promise.then(function(val) {
      console.log(val); // 1
      return val + 2;
    }).then(function(val) {
      console.log(val); // 3
    });

回到前面的代码：

    get('story.json').then(function(response) {
      console.log("Success!", response);
    });

收到的响应是一个纯文本的 JSON，我们可以修改 get 函数，设置 [responseType](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#responseType) 为 JSON 来指定服务器响应格式，也可以在 Promise 的世界里搞定这个问题：

    get('story.json').then(function(response) {
      return JSON.parse(response);
    }).then(function(response) {
      console.log("Yey JSON!", response);
    });

既然 JSON.parse 只接收一个参数，并返回转换后的结果，我们还可以再精简一下：

    get('story.json').then(JSON.parse).then(function(response) {
      console.log("Yey JSON!", response);
    });

[点击这里查看代码运行页面](story.json)，打开控制台查看输出结果。 事实上，我们可以把 getJSON 函数写得超级简单：

    function getJSON(url) {
      return get(url).then(JSON.parse);
    }

getJSON 会返回一个获取 JSON 并加以解析的 Promise。

### Queuing asynchronous actions

你也可以把“then”串联起来依次执行异步操作。

当你从“then”的回调函数返回的时候，这里有点小魔法。如果你返回一个值，它就会被传给下一个“then”的回调；而如果你返回一个“类 Promise”的对象，则下一个“then”就会等待这个 Promise 明确结束（成功/失败）才会执行。例如：

    getJSON('story.json').then(function(story) {
      return getJSON(story.chapterUrls[0]);
    }).then(function(chapter1) {
      console.log("Got chapter 1!", chapter1);
    });

这里我们发起一个对“story.json”的异步请求，返回给我们更多 URL，然后我们会请求其中的第一个。Promise 开始首次显现出相较事件回调的优越性了。你甚至可以写一个抓取章节内容的独立函数：

    var storyPromise;
    
    function getChapter(i) {
      storyPromise = storyPromise || getJSON('story.json');
      
      return storyPromise.then(function(story) {
        return getJSON(story.chapterUrls[i]);
      })
    }
    
    // 用起来非常简单：
    getChapter(0).then(function(chapter) {
      console.log(chapter);
      return getChapter(1);
    }).then(function(chapter) {
      console.log(chapter);
    });

我们一开始并不加载 story.json，直到第一次 getChapter，而以后每次 getChapter 的时候都可以重用已经加载完成的 story Promise，所以 story.json 只需要请求一次。Promise 好棒！

###Error handling

then接受两个参数，一个处理成功，一个处理失败（或者说确认和否定，按 Promise 术语）：

    get('story.json').then(function(response) {
      console.log("Success!", response);
    }, function(error) {
      console.log("Failed!", error);
    });

你还可以使用`catch`：

    get('story.json').then(function(response) {
      console.log("Success!", response);
    }).catch(function(error) {
      console.log("Failed!", error);
    });

这段代码等价于：

    get('story.json').then(function(response) {
      console.log("Success!", response);
    }).then(undefined, function(error) {
      console.log("Failed!", error);
    });

这里的 catch 并无任何特殊之处，只是`then(undefined, func)`的语法糖衣，更直观一点而已。使用`then(func1, func2)`和使用`then(func1).catch(func2)`处理错误并不相同。With then(func1, func2), func1 or func2 will be called, never both. But with then(func1).catch(func2), both will be called if func1 rejects, as they're separate steps in the chain. 

Promise 的否定回调可以由 Promise.reject() 触发，也可以由构造器回调中抛出的错误触发：

    var jsonPromise = new Promise(function(resolve, reject) {
      // JSON.parse throws an error if you feed it some
      // 抛出异常后，也会被后续的catch捕获到。
      resolve(JSON.parse("This ain't JSON"));
    });

有个比较复杂的例子：

    asyncThing1().then(function() {
      return asyncThing2();
    }).then(function() {
      return asyncThing3();
    }).catch (function(err) {
      return asyncRecovery1();
    }).then(function() {
      return asyncThing4();
    }, function(err) {
      return asyncRecovery2();
    }).catch (function(err) {
      console.log("Don't worry about it");
    }).then(function() {
      console.log("All done!");
    });

这段流程非常像 JavaScript 的 try/catch 组合，try 代码块中发生的错误会径直跳转到 catch 代码块，流程图如下：

![Promise Flow](http://www.html5rocks.com/en/tutorials/es6/promises/promise-flow.svg)

####JavaScript exceptions and promises

Promise 的否定回调可以由 Promise.reject() 触发，也可以由构造器回调中抛出的错误触发：

    var jsonPromise = new Promise(function(resolve, reject) {
      // 如果数据格式不对的话 JSON.parse 会抛出错误
      // 可以作为隐性的否定结果：
      resolve(JSON.parse("This ain't JSON"));
    });
    
    jsonPromise.then(function(data) {
      // 永远不会发生：
      console.log("It worked!", data);
    }).catch(function(err) {
      // 这才是真相：
      console.log("It failed!", err);
    });

这意味着你可以把所有 Promise 相关操作都放在它的构造函数回调中进行，这样发生任何错误都能捕捉到并且触发 Promise 否定。

“then”回调中抛出的错误也一样：

    get('/').then(JSON.parse).then(function() {
      // This never happens, '/' is an HTML page, not JSON
      // so JSON.parse throws
      console.log("It worked!", data);
    }).catch(function(err) {
      // Instead, this happens:
      console.log("It failed!", err);
    });

#### Error handling in practice

回到我们的故事和章节，我们用 catch 来捕捉错误并显示给用户：

    getJSON('story.json').then(function(story) {
      return getJSON(story.chapterUrls[0]);
    }).then(function(chapter1) {
      addHtmlToPage(chapter1.html);
    }).catch(function() {
      addTextToPage("Failed to show chapter");
    }).then(function() {
      document.querySelector('.spinner').style.display = 'none';
    });

如果请求 story.chapterUrls[0] 失败（http 500 或者用户掉线什么的）了，它会跳过之后所有针对成功的回调，包括 getJSON 中将响应解析为 JSON 的回调，和这里把第一张内容添加到页面里的回调。JavaScript 的执行会进入 catch 回调。结果就是前面任何章节请求出错，页面上都会显示“Failed to show chapter”。

和 JavaScript 的 try/catch 一样，捕捉到错误之后，接下来的代码会继续执行，按计划把加载指示器给停掉。上面的代码就是下面这段的非阻塞异步版：

    try {
      var story = getJSONSync('story.json');
      var chapter1 = getJSONSync(story.chapterUrls[0]);
      addHtmlToPage(chapter1.html);
    }
    catch (e) {
      addTextToPage("Failed to show chapter");
    }
    
    document.querySelector('.spinner').style.display = 'none';

如果只是要捕捉异常做记录输出而不打算在用户界面上对错误进行反馈的话，只要抛出 Error 就行了，这一步可以放在 getJSON 中：

    function getJSON(url) {
      return get(url).then(JSON.parse).catch(function(err) {
        console.log("getJSON failed for", url, err);
        throw err;
      });
    }

现在我们已经搞定第一章了，接下来搞定全部章节。

###Parallelism and sequencing

如果我们使用同步的方式来实现，代码可能是这样的：

    try {
      var story = getJSONSync('story.json');
      addHtmlToPage(story.heading);
    
      story.chapterUrls.forEach(function(chapterUrl) {
        var chapter = getJSONSync(chapterUrl);
        addHtmlToPage(chapter.html);
      });
    
      addTextToPage("All done");
    }
    catch (err) {
      addTextToPage("Argh, broken: " + err.message);
    }
    
    document.querySelector('.spinner').style.display = 'none';

但是用异步的方式来实现并非易事儿，代码的结构是这样的：

    getJSON('story.json').then(function(story) {
      addHtmlToPage(story.heading);

      // TODO: for each url in story.chapterUrls, fetch & display
    }).then(function() {
      // And we're all done!
      addTextToPage("All done");
    }).catch(function(err) {
      // Catch any error that happened along the way
      addTextToPage("Argh, broken: " + err.message);
    }).then(function() {
      // Always hide the spinner
      document.querySelector('.spinner').style.display = 'none';
    });

我们需要用then的确保chapter一个一个地顺序请求，你可能会想到使用如下代码来遍历实现：

    story.chapterUrls.forEach(function(chapterUrl) {
      // Fetch chapter
      getJSON(chapterUrl).then(function(chapter) {
        // and add it to the page
        addHtmlToPage(chapter.html);
      });
    });

但这是不正确的，因为forEach保证不了chapter下载的顺序，它是async-aware的。

####顺序下载

为了保证下载的顺序性，我们需要使用`resove`接口，详细用法请参考接口一节。

We can tidy up the above code using [array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)：

    // Loop through our chapter urls
    story.chapterUrls.reduce(function(sequence, chapterUrl) {
      // Add these actions to the end of the sequence
      return sequence.then(function() {
        return getJSON(chapterUrl);
      }).then(function(chapter) {
        addHtmlToPage(chapter.html);
      });
    }, Promise.resolve());

Our reduce callback is called for each item in the array. "sequence" is `Promise.resolve()` the first time around, but for the rest of the calls "sequence" is whatever we returned from the previous call. `array.reduce` is really useful for boiling an array down to a single value, which in this case is a promise.

最终的代码为：

    getJSON('story.json').then(function(story) {
      addHtmlToPage(story.heading);
    
      return story.chapterUrls.reduce(function(sequence, chapterUrl) {
        // Once the last chapter's promise is done…
        return sequence.then(function() {
          // …fetch the next chapter
          return getJSON(chapterUrl);
        }).then(function(chapter) {
          // and add it to the page
          addHtmlToPage(chapter.html);
        });
      }, Promise.resolve());
    }).then(function() {
      // And we're all done!
      addTextToPage("All done");
    }).catch(function(err) {
      // Catch any error that happened along the way
      addTextToPage("Argh, broken: " + err.message);
    }).then(function() {
      // Always hide the spinner
      document.querySelector('.spinner').style.display = 'none';
    });

And there we have it ([see example](http://www.html5rocks.com/en/tutorials/es6/promises/async-example.html)), a fully async version of the sync version. But we can do better.

####异步下载

为了达到更好的效率，我们可以同时下载所有的chapter，然后把这些chapter连成一个story，最后显示在网页上。

为了达到这个目的，我们需要使用一个新的Promise API：

    Promise.all(arrayOfPromises).then(function(arrayOfResults) {
      //...
    });

`Promise.all`的用法请参考接口一节。完整代码为：

    getJSON('story.json').then(function(story) {
      addHtmlToPage(story.heading);
    
      // Take an array of promises and wait on them all
      return Promise.all(
        // Map our array of chapter urls to
        // an array of chapter json promises
        story.chapterUrls.map(getJSON)
      );
    }).then(function(chapters) {
      // Now we have the chapters jsons in order! Loop through…
      chapters.forEach(function(chapter) {
        // …and add to the page
        addHtmlToPage(chapter.html);
      });
      addTextToPage("All done");
    }).catch(function(err) {
      // catch any error that happened so far
      addTextToPage("Argh, broken: " + err.message);
    }).then(function() {
      document.querySelector('.spinner').style.display = 'none';
    });

查看[演示效果](http://www.html5rocks.com/en/tutorials/es6/promises/async-all-example.html)

#### 异步显示

我们还有提神用户体验的空间，比如在异步下载过程中，chapter1下载完整之后，我们就显示在页面中，当chapter3到达时，我们不显示，等到chapter2到达时一起显示...

To do this, we fetch JSON for all our chapters at the same time, then create a sequence to add them to the document:

    getJSON('story.json').then(function(story) {
      addHtmlToPage(story.heading);
    
      // Map our array of chapter urls to
      // an array of chapter json promises.
      // This makes sure they all download parallel.
      return story.chapterUrls.map(getJSON)
        .reduce(function(sequence, chapterPromise) {
          // Use reduce to chain the promises together,
          // adding content to the page for each chapter
          return sequence.then(function() {
            // Wait for everything in the sequence so far,
            // then wait for this chapter to arrive.
            return chapterPromise;
          }).then(function(chapter) {
            addHtmlToPage(chapter.html);
          });
        }, Promise.resolve());
    }).then(function() {
      addTextToPage("All done");
    }).catch(function(err) {
      // catch any error that happened along the way
      addTextToPage("Argh, broken: " + err.message);
    }).then(function() {
      document.querySelector('.spinner').style.display = 'none';
    });

这里的重点是先使用`Array.map`，使所有的章节异步加载；在使用reduce使异步加载的章节顺序显示。

查看[演示效果](http://www.html5rocks.com/en/tutorials/es6/promises/async-best-example.html)。

####使用ES6 的Generator实现

请参考 [JavaScript Promises: There and back again - HTML5 Rocks](http://www.html5rocks.com/en/tutorials/es6/promises/#toc-parallelism-sequencing)

## Promises对象的实现

Promises只是一个规范，JavaScript语言原生还未提供支持。一般来说，总是选用现成的函数库。为了真正理解Promises对象，下面我们自己动手写一个Promises的实现。

首先，将Promise定义成构造函数。

    var Promise = function () {
      this.state = 'pending';
      this.thenables = [];
    };

上面代码表示，Promise的实例对象的state属性默认为“未完成”状态（pending），还有一个thenables属性指向一个数组，用来存放then方法生成的内部对象。

接下来，部署实例对象的resolve方法，该方法用来将实例对象的状态从“未完成”变为“已完成”。

    Promise.prototype.resolve = function (value) {
      if (this.state != 'pending') return;
    
      this.state = 'fulfilled';
      this.value = value;
      this._handleThen();
      return this;
    }

上面代码除了改变实例的状态，还将异步任务的返回值存入实例对象的value属性，然后调用内部方法_handleThen，最后返回实例对象本身。

类似地，部署实例对象的reject方法。

    Promise.prototype.reject = function (reason) {
      if (this.state != 'pending') return;
    
      this.state = 'rejected';
      this.reason = reason;
      this._handleThen();
      return this;
    };

然后，部署实例对象的then方法。它接受两个参数，分别是异步任务成功时的回调函数（onFulfilled）和出错时的回调函数（onRejected）。为了可以部署链式操作，它必须返回一个新的Promise对象。

    Promise.prototype.then = function (onFulfilled, onRejected) {
      var thenable = {};
    
      if (typeof onFulfilled == 'function') {
        thenable.fulfill = onFulfilled;
      };
    
      if (typeof onRejected == 'function') {
        thenable.reject = onRejected;
      };
    
      if (this.state != 'pending') {
        setImmediate(function () {
          this._handleThen();
        }.bind(this));
      }
    
      thenable.promise = new Promise();
      this.thenables.push(thenable);
    
      return thenable.promise;
    }

上面代码首先定义了一个内部变量thenable对象，将then方法的两个参数都加入这个对象的属性。然后，检查当前状态，如果不等于“未完成”，则在当前操作结束后，立即调用_handleThen方法。接着，在thenable对象的promise属性上生成一个新的Promise对象，并在稍后返回这个对象。最后，将thenable对象加入实例对象的thenables数组。

下一步就要部署内部方法_handleThen，它用来处理通过then方法绑定的回调函数。

    Promise.prototype._handleThen = function () {
      if (this.state === 'pending') return;
    
      if (this.thenables.length) {
        for (var i = 0; i < this.thenables.length; i++) {
          var thenPromise = this.thenables[i].promise;
          var returnedVal;
          try {
            // 运行回调函数
          } catch (e) {
            thenPromise.reject(e);
          }
        }
        this.thenables = [];
      }
    }

上面代码的逻辑是这样的：如果实例对象的状态是“未完成”，就返回，否则检查thenables属性是否有值。如果有值，表明里面储存了需要执行的回调函数，则依次运行回调函数。

之所以把回调函数的执行放在try...catch结构中，是因为一旦出错，就会自动执行catch代码块，从而可以运行下一个Promise实例对象的reject方法，这使得调用reject方法变得很简单。下面是try代码块中的代码。

    try {
          switch (this.state) {
            case 'fulfilled':
              if (this.thenables[i].fulfill) {
                returnedVal = this.thenables[i].fulfill(this.value);
              } else {
                thenPromise.resolve(this.value);
              }
              break;
            case 'rejected':
              if (this.thenables[i].reject) {
                returnedVal = this.thenables[i].reject(this.reason);
              } else {
                thenPromise.reject(this.reason);
              }
              break;
          }
  
            if (returnedVal === null) { 
              this.thenables[i].promise.resolve(returnedVal);
            }
            else if (returnedVal instanceof Promise || typeof returnedVal.then === 'function') {
              returnedVal.then(thenPromise.resolve.bind(thenPromise), thenPromise.reject.bind(thenPromise));
            }
            else {
              this.thenables[i].promise.resolve(returnedVal);
            }
    }

上面代码首先根据实例对象的状态，分别调用fulfill或reject回调函数，并传入相应的参数，并将返回值存入returnVal变量。然后再去改变this.thenables[i].promise对象的状态，触发下一个Promise对象的resolve或者reject方法。

最后，由于我们写的是供调用的函数库，需要将构造函数输出。

    module.exports = Promise;

## 小结

Promises的优点在于，让回调函数变成了变成了规范的链式写法，程序流程可以看得很清楚。它的一整套接口，可以实现许多强大的功能，比如为多个异步操作部署一个回调函数、为多个回调函数中抛出的错误统一指定处理方法等等。

而且，它还有一个前面三种方法都没有的好处：如果一个任务已经完成，再添加回调函数，该回调函数会立即执行。所以，你不用担心是否错过了某个事件或信号。这种方法的缺点就是，编写和理解都相对比较难。

实际可以使用的Promises实现，参见jQuery的deferred对象一节。

## 实现

[ComplexityMaze » Blog Archive » JavaScript Promises – a comparison of libraries](http://complexitymaze.com/2014/03/03/javascript-promises-a-comparison-of-libraries/)

* [Q](https://github.com/kriskowal/q)  Star 4565 Fork 360
* [when](https://github.com/cujojs/when)  Star 1415 Fork 160
* [RSVP.js](https://github.com/tildeio/rsvp.js)  Star 1570 Fork 104
* [then/promise](https://github.com/then/promise) Star 148 Fork 21. Bare bones Promises/A+ implementation.
* [dfilatov/vow](https://github.com/dfilatov/vow) Star 200 Fork 28
* [jQuery 1.5](http://api.jquery.com/category/deferred-object/) jQuery 有个类似的方法叫 [Deferred](http://api.jquery.com/category/deferred-object/)，但不兼容 Promises/A+ 规范，于是会[有点小问题](https://thewayofcode.wordpress.com/tag/jquery-deferred-broken/)，使用需谨慎。jQuery 还有一个 [Promise 类型](http://api.jquery.com/Types/#Promise)，它其实是 Deferred 的缩减版，所以也有同样问题。
  - [jQuery.Deferred对象 -- JavaScript 标准参考教程（alpha）](http://javascript.ruanyifeng.com/jquery/deferred.html)
  - [jQuery的deferred对象详解 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2011/08/a_detailed_explanation_of_jquery_deferred_object.html)

参考：[Promises](http://www.promisejs.org/implementations/)

###与标准接口的兼容性

avaScript Promise 的 API 会把任何包含有 then 方法的对象当作“类 Promise”（或者用术语来说就是 _thenable_）的对象，这些对象经过 Promise.cast 处理之后就和原生的 JavaScript Promise 实例没有任何区别了。所以如果你使用的库返回一个 Q Promise，那没问题，无缝融入新的 JavaScript Promise。

尽管，如前所述，jQuery 的 Deferred 对象有点……没什么用，不过幸好还可以转换成标准 Promise，你最好一拿到对象就马上加以转换：

    var jsPromise = Promise.cast($.ajax('/whatever.json'));

这里 jQuery 的 $.ajax 返回一个 Deferred 对象，含有“then”方法，因此 Promise.cast 可以将其转换为 JavaScript Promise。不过有时候 Deferred 对象会给它的回调函数传递多个参数，例如：

    var jqDeferred = $.ajax('/whatever.json');
    
    jqDeferred.then(function(response, statusText, xhrObj) {
      // ...
    }, function(xhrObj, textStatus, err) {
      // ...
    });

除了第一个参数，其他都会被 JavaScript Promise 忽略掉：

    jsPromise.then(function(response) {
      // ...
    }, function(xhrObj) {
      // ...
    });

……还好这通常就是你想要的了，至少你能够用这个办法实现想要的。另外还要注意，jQuery 也没有遵循给否定回调函数传递 Error 对象的惯例。

## ES6 Promise

- [domenic/promises-unwrapping](https://github.com/domenic/promises-unwrapping) The ES6 promises spec, as per September 2013 TC39 meeting
- [jakearchibald/es6-promise](https://github.com/jakearchibald/es6-promise#readme) A polyfill for ES6-style Promises


如何使用请参考 [JavaScript Promises: There and back again - HTML5 Rocks](http://www.html5rocks.com/en/tutorials/es6/promises/#toc-parallelism-sequencing)。

## 参考链接

* [JavaScript Promises: There and back again - HTML5 Rocks](http://www.html5rocks.com/en/tutorials/es6/promises/#toc-async)
  - [JavaScript Promises: There and back again - HTML5 Rocks](http://www.html5rocks.com/zh/tutorials/es6/promises/) 翻译。
* [JavaScript异步编程的模式 -- JavaScript 标准参考教程（alpha）](http://javascript.ruanyifeng.com/advanced/asynchronous.html#toc4)
* [Write Better JavaScript with Promises](http://davidwalsh.name/write-javascript-promises)
* Sebastian Porto, [Asynchronous JS: Callbacks, Listeners, Control Flow Libs and Promises](http://sporto.github.com/blog/2012/12/09/callbacks-listeners-promises/)
* Rhys Brett-Bowen, [Promises/A+ - understanding the spec through implementation](http://modernjavascript.blogspot.com/2013/08/promisesa-understanding-by-doing.html)
* Matt Podwysocki, Amanda Silver, [Asynchronous Programming in JavaScript with “Promises”](http://blogs.msdn.com/b/ie/archive/2011/09/11/asynchronous-programming-in-javascript-with-promises.aspx)
* Marc Harter, [Promise A+ Implementation](https://gist.github.com//wavded/5692344)
* Bryan Klimt, [What’s so great about JavaScript Promises?](http://blog.parse.com/2013/01/29/whats-so-great-about-javascript-promises/)
* Jake Archibald, [JavaScript Promises There and back again](http://www.html5rocks.com/en/tutorials/es6/promises/)

## Tutorial

- [getify/native-promise-only](https://github.com/getify/native-promise-only)