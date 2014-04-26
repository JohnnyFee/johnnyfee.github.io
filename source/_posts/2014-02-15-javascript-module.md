---
layout: post
title: "JavaScript 模块规范"
category: JavaScript
tags: [javascript]
---

## CommonJS

CommonJS规范为JavaScript制定了一个美好的愿景——希望JavaScript能够在任何地方运行。CommonJS是服务器端模块的规范，Node.js采用了这个规范。

Web在发展，浏览器中出现了更多的标准API，这些过程发生在前端，后端JavaScript的规范却远远落后。对于JavaScript自身而言，它的规范依然是薄弱的，还有以下缺陷。

规范内容参考： [JavaScript模块化开发（二）——CommonJS规范](http://www.feeldesignstudio.com/2013/09/javascript-module-pattern-commonjs)

<!--more-->

- 没有模块系统。
- 标准库较少。ECMAScript仅定义了部分核心库，对于文件系统，I/O流等常见需求却没有标准的API。就HTML5的发展状况而言，W3C标准化在一定意义上是在推进这个过程，但是它仅限于浏览器端。
- 没有标准接口。在JavaScript中，几乎没有定义过如Web服务器或者数据库之类的标准统一接口。
- 缺乏包管理系统。这导致JavaScript应用中基本没有自动加载和安装依赖的能力。

CommonJS规范的提出，主要是为了弥补当前JavaScript没有标准的缺陷，以达到像Python、Ruby和Java具备开发大型应用的基础能力，而不是停留在小脚本程序的阶段。他们期望那些用CommonJS API写出的应用可以具备跨宿主环境执行的能力，这样不仅可以利用JavaScript开发富客户端应用，而且还可以编写以下应用。

- 服务器端JavaScript应用程序。
- 命令行工具。
- 桌面图形界面应用程序。
- 混合应用（Titanium和Adobe AIR等形式的应用）。

CommonJS 规范包括了模块（modules）、包（packages）、系统（system）、二进制（binary）、控制台（console）、编码（encodings）、文件系统（filesystems）、套接字（sockets）、单元测试（unit testing）等部分。目前大部分标准都在拟定和讨论之中，已经发布的标准有 Modules/1.0、Modules/1.1、Modules/1.1.1、Packages/1.0、System/1.0。

__参考：__

- [《深入浅出Node.js》试读：2.1　CommonJS规范](http://book.douban.com/reading/29343570/)。
- [图灵社区 : 图书 : 1.6　CommonJS](http://www.ituring.com.cn/article/5793)

### 文档

- [CommonJS: JavaScript Standard Library](http://www.commonjs.org/)
- [CommonJS: CommonJS API](http://www.commonjs.org/specs/)
- [CommonJS Spec Wiki](http://wiki.commonjs.org/wiki/CommonJS)
- [Implementations - CommonJS Spec Wiki](http://wiki.commonjs.org/wiki/Implementations)

## [CommonJS Modules](http://wiki.commonjs.org/wiki/Modules)

提供CommonJS的模块加载规范。目前有三个版本，其中1.1.1还在制定中。

+ [1.0](http://wiki.commonjs.org/wiki/Modules/1.0 "Modules/1.0")
+ [1.1](/wiki/Modules/1.1 "Modules/1.1") ([1.0](/wiki/Modules/1.0 "Modules/1.0") + [Module Meta-object Amendment](/wiki/Modules/Meta "Modules/Meta")).
+ [1.1.1](/wiki/Modules/1.1.1 "Modules/1.1.1") relaxes details for "main" and enumerability requirements.

Modules/1.1较1.0仅增加了标示符module，require函数增加了main和paths属性。而仔细比对1.1与1.1.1后发现除了格式调整了下几乎没有变化。

Nodejs实现了其中的1.0版本，参考[Implementations/node.js - CommonJS Spec Wiki](http://wiki.commonjs.org/wiki/Implementations/node.js)。

### 规范内容

CommonJS module基本要求如下

1.require仅有一个参数为字符串，该字符串须遵守[Module Identifiers](http://wiki.commonjs.org/wiki/Modules/1.0#Module_Identifiers)的6点规定
2. require方法返回指定的模块API
3. 如果存在依赖的其它模块，那么依次加载
4. require不能返回，则抛异常
5. 仅能使用标示符exports导出API

### 定义模块
__根据CommonJS规范，一个单独的文件就是一个模块。__加载模块使用require方法，该方法读取一个文件并执行，最后返回文件内部的exports对象。下面就是一个简单的模块文件example.js。

    console.log("evaluating example.js");

    var invisible = function () {
      console.log("invisible");
    }

    exports.message = "hi";

    exports.say = function () {
      console.log(message);
    }


再看一个复杂一点的例子。

    // foobar.js
    function foobar(){
            this.foo = function(){
                    console.log('Hello foo');
            }

            this.bar = function(){
                    console.log('Hello bar');
            }
    }
 
    exports.foobar = foobar;

### 加载模块
不论是核心模块还是文件模块，require()方法对相同模块的二次加载都一律采用缓存优先的方式，这是第一优先级的。不同之处在于核心模块的缓存检查先于文件模块的缓存检查。

调用该模块的方法如下：

    var foobar = require('./foobar').foobar,
        test   = new foobar();
     
    test.bar(); // 'Hello bar'

js文件名前面需要加上路径，可以是相对路径（相对于使用require方法的文件），也可以是绝对路径。如果省略路径，node.js会认为，你要加载一个核心模块，或者已经安装在本地 node_modules 目录中的模块。如果加载的是一个目录，node.js会首先寻找该目录中的 package.json 文件，加载该文件 main 属性提到的模块，否则就寻找该目录下的 index.js 文件。

有时，不需要exports返回一个对象，只需要它返回一个函数。这时，就要写成module.exports。

    module.exports = function () {
      console.log("hello world")
    }

### 参考

- [深入浅出Node.js（三）：深入Node.js的模块机制](http://www.infoq.com/cn/articles/nodejs-module-mechanism)
- [JavaScript中模块“写法” - snandy - 博客园](http://www.cnblogs.com/snandy/archive/2012/03/08/2378441.html)

## [Modules/Transport](http://wiki.commonjs.org/wiki/Modules/Transport)

提供模块从服务器到浏览器的多种传中方式。参考[Modules/Transport - CommonJS Spec Wiki]()  A variety of ways to transport a module from a server to a browser。

Modules/1.1.1 规范里，只定义了模块的基本特性，并没有定义模块的存在形态。为了让模块能在不同的环境下都适用，CommonJS 需要定义 Module/Transport 规范，同时支持同步和异步。

### 参考

- [CommonJS 的 Modules/Transport 和 Modules/Wrappings 规范有什么区别？](http://www.zhihu.com/question/20789867)

## [Modules/Wrappings](http://wiki.commonjs.org/wiki/Modules/Wrappings)

Modules/Wrappings是CommonJS提出的另外一个基于浏览器模块加载器。CMD其实就是基于这个规范发展而来的，因为SeaJS实现了Modules/Wrappings，参考[Implementations/SeaJS - CommonJS Spec Wiki](http://wiki.commonjs.org/wiki/Implementations/SeaJS)。

简单说，Modules/Wrappings是出于对Node.js模块格式的偏好而包装下使其在浏览器中得以实现，并通过某些工具（如[r.js](https://github.com/jrburke/r.js)）也能运行在Node.js中。

如果想要实现前后端统一的模块加载方式，面临以下问题：

1. 服务器端JS模块文件就在本地，浏览器端则需要通过网络请求。
2. 服务器端可以很容易的实现同步或异步请求模块，浏览器端则问题多多。

如下：

    var event = require("event");
    event.bind(el, 'click', function() {
        // todo
    });

这段代码中require如果是异步执行的，则event.bind的执行有可能会出错。

虽然可以使用 XHR 实现同步载入模块JS文件。但XHR的缺点也是明显的，它不能跨域，这点让人很难接受，因为有些场景需要模块部署在不同的服务器。

[Modules/Wrappings](http://wiki.commonjs.org/wiki/Modules/Wrappings)的诞生就是为了解决这个问题。

[Modules/Wrappings](http://wiki.commonjs.org/wiki/Modules/Wrappings)的出现使得浏览器中实现它变得可能，包裹的函数作为回调。即使用script tag作为模块加载器，script完全下载后去回调，回调中进行模块定义。

### 规范内容

该规范约定如下：

1. 定义模块用module变量，它有一个方法declare
2. declare接受一个函数类型的参数，如称为factory
3. factory有三个参数分别为require、exports、module
4. factory使用返回值和exports导出API
5. factory如果是对象类型，则将该对象作为模块输出

### 定义模块

    // 一个基本的模块定义
    module.declare(function(require, exports, module)
    {
        exports.foo = "bar"; 
    });

    // 直接使用对象作为模块
    module.declare(
    {
        foo: "bar"
    });

### 和AMD的区别

- 使用module.declare来申明模块。
- Wrappings 和 AMD 最大的不同，在于 Wrappings 方案里，factory 的参数更简单，和 dependencies 无对应关系。
 
也就是说，可以如下写代码：

    module.declare(['a'], function(require, exports) {
      var add = require('a').add;
      exports.increment = function(n) {
        return add(n, 1);
      };
    });

这个看似非常小的差异，可以让下面的代码合理存在并达到预期目的：

    module.declare(function(require, exports) {
      ...
      var a;
      if(someCondition) {
        a = require('a1');
      } else {
        a = require('a2');
      }
      ...
    });

### 参考
- [Node.js模块风格在浏览器中的尝试 - snandy - 博客园](http://www.cnblogs.com/snandy/archive/2012/03/09/2386092.html)

## [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)

AMD是专门为浏览器中JavaScript环境设计的规范。它吸取了CommonJS的一些优点，但又不照搬它的格式。开始AMD作为CommonJS的 [Modules/Transport/C](http://wiki.commonjs.org/wiki/Modules/Transport/C) 存在，因无法与CommonJS开发者达成一致而独立出来。它有自己的[wiki](http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition) 和[讨论组](https://groups.google.com/group/amd-implement) 。

CommonJS规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。AMD规范则是非同步加载模块，允许指定回调函数。由于Node.js主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，所以__CommonJS规范比较适用于Node.js__。但是，如果是浏览器环境，要从服务器端加载模块，这时就必须采用非同步模式，因此__浏览器端一般采用AMD规范__。

### 规范内容

参考：
[JavaScript模块化开发（三）——AMD规范 | Feeldesign Studio](http://www.feeldesignstudio.com/2013/09/javascript-module-pattern-amd)

MD设计出一个简洁的写模块API：

    define(id?, dependencies?, factory);

其中：

* id: 模块标识，可以省略。
* dependencies: 所依赖的模块，可以省略。
* factory: 模块的实现，或者一个JavaScript对象。

id遵循CommonJS [Module Identifiers](http://wiki.commonjs.org/wiki/Modules/1.1.1#Module_Identifiers) 。dependencies元素的顺序和factory参数一一对应。

### 定义模块

    // 1. 定义无依赖的模块
    define(function() {
        return {
            mix: function(source, target) {
            }
        };
    });

    // 2. 定义有依赖的模块
    define(['base'], function(base) {
        return {
            show: function() {
                // todo with module base
            }
        }
    });

    // 3. 定义数据对象模块
    define({
        users: [],
        members: []
    });

    // 4. 具名模块
    define('index', ['data','base'], function(data, base) {
     // todo
    });

    // 5. 前面提到dependencies元素的顺序和factory一一对应，其实不太严谨。AMD开始为摆脱CommonJS的束缚，开创性的提出了自己的模块风格。但后来又做了妥协，兼容了 CommonJS [Modules/Wrappings](http://wiki.commonjs.org/wiki/Modules/Wrappings) 。即又可以这样写
    // 不考虑多了一层函数外，格式和Node.js是一样的。使用require获取依赖模块，使用exports导出API。
    define(function(require, exports, module) {
        var base = require('base');
        exports.show = function() {
            // todo with module base
        } 
    });

除了define外，AMD还保留一个关键字require。require 作为规范保留的全局标识符，可以实现为 module loader。也可以不实现。

### 加载模块

    require(['foo', 'bar'], function ( foo, bar ) {
            // 这里写其余的代码
            foo.doSomething();
    });

    // 动态加载的依赖项
    define(function ( require ) {
        var isReady = false, foobar;
     
        // 请注意在模块定义内部内联的 require 语句
        require(['foo', 'bar'], function (foo, bar) {
            isReady = true;
            foobar = foo() + bar();
        });
     
        // 我们仍可以返回一个模块
        return {
            isReady: isReady,
            foobar: foobar
        };
    });

### 文档

- [Modules/AsynchronousDefinition - CommonJS Spec Wiki](http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition)

### 工具

- [afc163/cmdize](https://github.com/afc163/cmdize) Convert normal js to CMD module.

### 实现

#### [chenmnkken / seed](http://stylechen.com/)

#### [RequireJS](http://requirejs.org/)

RequireJS是一个工具库，主要用于客户端的模块管理。它可以让客户端的代码分成一个个模块，实现异步或动态加载，从而提高代码的性能和可维护性。它的模块管理遵守[AMD规范](https://github.com/amdjs/amdjs-api/wiki/AMD)（Asynchronous Module Definition）。

RequireJS的基本思想是，通过define方法，将代码定义为模块；通过require方法，实现代码的模块加载。

使用方法参考 [RequireJS和AMD规范 -- JavaScript 标准参考教程（alpha）](http://javascript.ruanyifeng.com/tool/requirejs.html)。

__缺点：__

- 文件太大，用 google closure compiler 压缩后，12.2k. 这是在页头必须引入的脚本，还是希望越小越好。
- 功能太多。这本是优点，比如能够在各种环境下跑。但对于真实的 web 应用来说，还是希望用情专一，尽量无无用代码。
- 给 require 方法赋予了双重含义。一重含义是 CommonJS/Modules/1.1.1 规范里定义的 require, 另一重是 RequireJS 里用来加载模块和调用回调。这导致 require 的 dependencies 参数的格式，和 define 中的 dependencies 参数的格式不一致。我刚用的时候，没意识到这一点，经常很迷惑。
- 目前不支持 availability 模式。

参考 ：[CommonJS 的模块系统，AMD 和 Wrappings, 以及 RequireJS](http://blogread.cn/it/article/2957)

### 其他实现

- [cujojs/curl](https://github.com/cujojs/curl)

### 参考

- [jrburke/r.js](https://github.com/jrburke/r.js)
- [Split off AMD? (was Re: [CommonJS] New amd-implement list)](https://groups.google.com/forum/#!topic/commonjs/lqCWO8tMp48)
- [使用 AMD、CommonJS 及 ES Harmony 编写模块化的 JavaScript](http://justineo.github.io/singles/writing-modular-js/)
- [AMD：浏览器中的模块规范 - snandy - 博客园](http://www.cnblogs.com/snandy/archive/2012/03/12/2390782.html)

## [CMD](https://github.com/cmdjs/specification/blob/master/draft/module.md)

CMD规范由国内的[玉伯](http://lifesinger.github.com/)提出。

AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。类似的还有 CommonJS Modules/2.0 规范，是 BravoJS 在推广过程中对模块定义的规范化产出。这些规范的目的都是为了 JavaScript 的模块化开发，特别是在浏览器端的。目前这些规范的实现都能达成浏览器端模块化开发的目的。

### 定义模块

- [CMD 模块定义规范 · Issue #242 · seajs/seajs](https://github.com/seajs/seajs/issues/242)

### 与AMD的区别

1. 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible.

2. CMD 推崇依赖就近，AMD 推崇依赖前置。看下面的代码说明。虽然 AMD 也支持 CMD 的写法，同时还支持将 require 作为依赖项传递，但 RequireJS 的作者默认是最喜欢上面的写法，也是官方文档里默认的模块定义写法。CMD 推崇依赖就近需要遍历所有的require关键字，找出后面的依赖。具体做法是将function toString后，用正则匹配出require关键字后面的依赖。显然，这是一种牺牲性能来换取更多开发便利的方法。

3. AMD 的 API 默认是一个当多个用，CMD 的 API 严格区分，推崇职责单一。比如 AMD 里，require 分全局 require 和局部 require，都叫 require。CMD 里，没有全局 require，而是根据模块系统的完备性，提供 seajs.use 来实现模块系统的加载启动。CMD 里，每个 API 都简单纯粹。

代码说明：

    // CMD
    define(function(require, exports, module) {
        var a = require('./a')
        a.doSomething()
        // 此处略去 100 行
        var b = require('./b') // 依赖可以就近书写
        b.doSomething()
        // ... 
    })

    // AMD 默认推荐的是
    define(['./a', './b'], function(a, b) { // 依赖必须一开始就写好
        a.doSomething()
        // 此处略去 100 行
        b.doSomething()
        ...
    }) 

参考：

- [AMD 和 CMD 的区别有哪些？](http://www.zhihu.com/question/20351507)
- [与 RequireJS 的异同 · Issue #277 · seajs/seajs](https://github.com/seajs/seajs/issues/277)
- [Sea.js 与 RequireJS 最大的区别](http://www.douban.com/note/283566440/)
- [commonJS\AMD\CMD和我的看法](http://blog.youyo.name/archives/commonjs-amd-cmd-my-opinion.html)
- [SeaJS 和 RequireJS 的异同 | 岁月如歌](http://lifesinger.wordpress.com/2011/05/17/the-difference-between-seajs-and-requirejs/)

### [seajs](https://github.com/seajs)

SeaJS 同时实现了[Modules/1.1.1](http://wiki.commonjs.org/wiki/Modules/1.1.1 "Modules/1.1.1")和
[Modules/Wrappings](/wiki/Modules/Wrappings "Modules/Wrappings")
。参考[Implementations/SeaJS - CommonJS Spec Wiki](http://wiki.commonjs.org/wiki/Implementations/SeaJS)。

但没有完全最从这两种规范：

1，SeaJS未实现全部的 Modules 1.1.1。如require函数的main，paths属性在SeaJS中没有。但SeaJS给require添加了async、resolve、load、constructor。

2，SeaJS没有使用 Modules/Wrappings 中的module.declare定义模块，而是使用define函数（看起来象[AMD](http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition)中的define，实则不然）。

可能是因为这个原因，才为Sea.js重新指定了一个规范CMD。参考[Node.js模块风格在浏览器中的尝试 - snandy - 博客园](http://www.cnblogs.com/snandy/archive/2012/03/09/2386092.html)。

### 与 RequireJS 的异同

__相同之处：__

RequireJS 和 Sea.js 都是模块加载器，倡导模块化开发理念，核心价值是让 JavaScript 的模块化开发变得简单自然。

__不同之处：__

两者的主要区别如下：

1. **定位有差异**。RequireJS 想成为浏览器端的模块加载器，同时也想成为 Rhino / Node 等环境的模块加载器。Sea.js 则专注于 Web 浏览器端，同时通过 Node 扩展的方式可以很方便跑在 Node 环境中。
2. **遵循的规范不同**。RequireJS 遵循 AMD（异步模块定义）规范，Sea.js 遵循 CMD （通用模块定义）规范。规范的不同，导致了两者 API 不同。Sea.js 更贴近 CommonJS Modules/1.1 和 Node Modules 规范。
3. **推广理念有差异**。RequireJS 在尝试让第三方类库修改自身来支持 RequireJS，目前只有少数社区采纳。Sea.js 不强推，采用自主封装的方式来“海纳百川”，目前已有较成熟的封装策略。
4. **对开发调试的支持有差异**。Sea.js 非常关注代码的开发调试，有 nocache、debug 等用于调试的插件。RequireJS 无这方面的明显支持。
4. **插件机制不同**。RequireJS 采取的是在源码中预留接口的形式，插件类型比较单一。Sea.js 采取的是通用事件机制，插件类型更丰富。


还有不少差异，涉及具体使用方式和源码实现，欢迎有兴趣者研究并发表看法。

总之，如果说 RequireJS 是 Prototype 类库的话，则 Sea.js 致力于成为 jQuery 类库。

__教程：__

- 教程 <https://github.com/seajs/seajs/issues/916>
- github <https://github.com/seajs/seajs>
- 官网 <http://seajs.org>
- 社区 <https://spmjs.org/>
- github document <https://github.com/seajs/seajs/issues?labels=documentation&page=1&state=closed>
- 教程 <https://github.com/island205/HelloSea.js/blob/master/01-contents.md>

## [UMD](https://github.com/umdjs/umd)

AMD以浏览器为第一（browser-first）的原则发展，选择异步加载模块。它的模块支持对象（objects）、函数（functions）、构造器（constructors）、字符串（strings）、JSON等各种类型的模块。因此在浏览器中它非常灵活。

CommonJS module以服务器端为第一（server-first）的原则发展，选择同步加载模块。它的模块是无需包装的（unwrapped modules）且贴近于ES.next/Harmony的模块格式。但它仅支持对象类型（objects）模块。

这迫使一些人又想出另一个更通用格式 [UMD](https://github.com/umdjs/umd)(Universal Module Definition)。希望提供一个前后端跨平台的解决方案。

UMD 定义那些既能在客户端又能在服务器端工作的模块，这样的模块同时也能和目前可用的主流脚本加载器一同工作。

### 实现
UMD的实现很简单，先判断是否支持Node.js模块格式（exports是否存在），存在则使用Node.js模块格式。

再判断是否支持AMD（define是否存在），存在则使用AMD方式加载模块。前两个都不存在，则将模块公开到全局（window或global）。

    // eventUtil.js
    (function (root, factory) {
        if (typeof exports === 'object') {
            module.exports = factory();
             
        } else if (typeof define === 'function' && define.amd) {
            define(factory);
             
        } else {
            root.eventUtil = factory();
        }
    })(this, function() {
        // module
        return {
            addEvent: function(el, type, handle) {
                //...
            },
            removeEvent: function(el, type, handle) {
                 
            },
        };
    });

 虽然UMD八字还没有一撇，有些开源库却开始支持UMD了，如大名鼎鼎的《JavaScript设计模式》作者[Dustin Diaz](http://dustindiaz.com/)开发的 [qwery](https://github.com/ded/qwery) 。 代码如下

![](http://pic002.cnblogs.com/images/2012/114013/2012031920341233.png)

### 参考
- [UMD和ECMAScript模块 - snandy - 博客园](http://www.cnblogs.com/snandy/archive/2012/03/19/2406596.html)
- [使用 AMD、CommonJS 及 ES Harmony 编写模块化的 JavaScript](http://justineo.github.io/singles/writing-modular-js/)

## [ES Harmony/Modules](http://wiki.ecmascript.org/doku.php?id=harmony:modules)

ECMAScript的下一个版本Harmony已经考虑到了模块化的需求，目前还在努力指定中。

在 ES.next 中，用import和export导入和导出模块：

* **import**声明把某个模块的导出绑定为本地变量，并可以重命名来避免命名冲突。
* **export**声明声明了某个模块的本地绑定是外部可见的，这样其它模块就能够读取它们但却无法进行修改。有趣的是，模块可以导出子模块，却无法导出已经在别处定义过的模块。你同样可以给导出重命名来让它们不同于本地的名字。

### 定义模块

使用module关键字来定义一个模块。

    module math {
        export function sum(x, y) {
            return x + y;
        }
        export var pi = 3.141593;
    }   

### 加载模块   
使用import关键字来加载外部模块

    // we can import in script code, not just inside a module
    import {sum, pi} from math;
    alert("2π = " + sum(pi, pi));

    // 引入所有API
    import * from math;
    alert("2π = " + sum(pi, pi));

    // 使用另一个引用作为别名
    // a static module reference
    module M = math;
      
    // reify M as an immutable "module instance object"
    alert("2π = " + M.sum(M.pi, M.pi));

    //局部重命名
    import { draw: drawShape } from shape;
    import { draw: drawGun } from cowboy;

    // 嵌套模块
    module widgets {
        export module button { ... }
        export module alert { ... }
        export module textarea { ... }
        ...
    }
      
    import { messageBox, confirmDialog } from widgets.alert;
    ...

    // 从服务器上请求的模块
    <script type="harmony">
    // loading from a URL
    module JSON at 'http://json.org/modules/json2.js';
    alert(JSON.stringify({'hi': 'world'}));

    // 动态载入一个模块
    Loader.load('http://json.org/modules/json2.js', function(JSON) {
        alert(JSON.stringify([0, {a: true}]));
    });


除此之外，还可以远程载入的模块、异步加载模块等，请参考[使用 AMD、CommonJS 及 ES Harmony 编写模块化的 JavaScript](http://justineo.github.io/singles/writing-modular-js/)。

### 参考
- [UMD和ECMAScript模块 - snandy - 博客园](http://www.cnblogs.com/snandy/archive/2012/03/19/2406596.html)
- [harmony:modules](http://wiki.ecmascript.org/doku.php?id=harmony:modules)
- [harmony:module_loaders](http://wiki.ecmascript.org/doku.php?id=harmony:module_loaders)



## 参考链接

- [使用 AMD、CommonJS 及 ES Harmony 编写模块化的 JavaScript](http://justineo.github.io/singles/writing-modular-js/)
- [学习 Javascript 模块化编程](http://nuysoft.com/2014/01/26/learning-modules/)
- [CommonJS规范 -- JavaScript 标准参考教程（alpha）](http://javascript.ruanyifeng.com/nodejs/commonjs.html)
- [[译] [PJA] 《JavaScript 应用程序设计》总目录 · Issue #16 · cssmagic/blog · GitHub](https://github.com/cssmagic/blog/issues/16) 中的第五章。
- Addy Osmani, [Writing Modular JavaScript With AMD, CommonJS & ES Harmony](http://addyosmani.com/writing-modular-js/)
- [IT牛人博客聚合 - CommonJS 的模块系统，AMD 和 Wrappings, 以及 RequireJS](http://www.udpwork.com/item/3978.html)
- [从 CommonJS 到 Sea.js · Issue #269 · seajs/seajs](https://github.com/seajs/seajs/issues/269)
- [前端模块化开发那点历史 · Issue #588 · seajs/seajs](https://github.com/seajs/seajs/issues/588)