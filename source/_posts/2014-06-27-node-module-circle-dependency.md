layout: post
title: "node.js的循环依赖"
category: Node
tags: [node, module]
---

原文： <http://cnodejs.org/topic/4f16442ccae1f4aa27001045>

循环依赖，简单点来说就是a文件中require b文件，然后b文件中又反过来require a文件。这个问题我们平时可能并不大注意到，但如果处理不好可能会引起一些让人摸不清的问题。在node中，是如何处理循环依赖的问题的呢？  

  
写个简单的例子来试验一下看吧。  
  
定义两个文件：  
  
a.js

    var b = require('./b');  
    console.log('a.js get b:' + b.b);  
    module.exports.a = 1;

b.js  


    var a = require('./a');  
    console.log('b.js get a:' + a.a);  
    module.exports.b = 2;
 
<!--more-->  
  
执行  
  
    node a.js  
  
输出的结果是

    b.js get a:undefined  
    a.js get b:2  
  
从打印的轨迹上来看，代码执行的流程大致如下：  

```javascript
a.js:                               b.js:  
var b = require('./b');  

                                    var a = require('./a'); // a = {}  
                                    console.log('b.js get a:' + a.a);  
                                    module.exports.b = 2;  

// b = {b: 2}  
console.log('a.js get b:' + b.b);  
module.exports.a = 1;
```
  
node的加载过程，可以在lib/module.js文件中找到。与这个过程相关的代码主要集中在Module._load方法里。可以看到，node会为每个新加载的文件创建一个Module对象（假设为a），这个就是我们在a.js代码中看到的module了。在创建a之后，node会先将a放到cache中，然后再对它进行加载操作。也就是说，如果在加载a的过程中，有其他的代码（假设为b）require a.js的话，那么b可以从cache中直接取到a的module，从而不会引起重复加载的死循环。但带来的代价就是在load过程中，b看到的是不完整的a，也就是为什么前面打印undefined的原因。  
  
Module的构造函数  

    function Module(id, parent) {  
      this.id = id;  
      this.exports = {};  
      this.parent = parent;  
      this.filename = null;  
      this.loaded = false;  
      this.exited = false;  
      this.children = [];  
    }

  
Module._load方法  

```javascript
Module._load = function(request, parent, isMain) {  
    //...  
    var module = new Module(id, parent);  
    //...  
    Module._cache[filename] = module;  
    try {  
        module.load(filename);  
    } catch (err) {  
        delete Module._cache[filename];  
        throw err;  
    }

    return module.exports;  
};
```
  
这个看似简单粗暴的处理手法，但实际上是node作者权衡各方面因素的结果。我们敬爱的npm作者issacs强调说了，这不是bug，而且近期内不会做什么改变。当然，issacs也给出了一些规避这个陷阱的建议（<https://github.com/joyent/node/issues/1418>）。我总结了一下，主要有两点：一个是在造成循环依赖的require之前把需要的东西exports出去;另一个是不要在load过程中操作未完成的模块。  
  
所以上面的例子的一种处理方法就是把各自的exports语句放到require语句前面，然后再运行，可以看到打印了正确的值。  
  
从前面的分析来看，循环依赖的陷阱出现的条件比较苛刻：一个是循环依赖，另一个是在load期间调用未加载完成的对象。所以大家平常不怎么会遇到。但我之前就曾华丽丽的邂逅了这个陷阱，在这里拿出来当一下反面教材。。。  
  
场景简化后大致如下：我有一堆service，每一个service负责消费某一类消息，并且可能会产生新的消息给其他service消费。从消息传递上来看，并没有产生循环依赖。但我为了解耦，定义了一个消息中心center的角色出来进行消息分发。center主要是维护一个type -> service的map来路由消息，这样center就得把所有的service加载进来，于是产生了center->service的依赖。另一面，每个service又需要通过center来分发它们新产生的消息，于是又出现了service->center的依赖，循环依赖就这么出来了。刚好在service加载的过程中，又调用了center的一个方法，就发生了undefined的错误。  
  
这个问题查清楚原因以后，解决起来并不困难。  
  
一种方法就是按前面的方法，在代码层面上规避循环依赖的陷阱;  
  
另外也可以在设计的层面上彻底避免循环依赖的出现。我的场景之所以出现循环依赖，是因为center和service都需要知道对方的存在，即 center <- -> service。如果采用依赖注入的方式，则可以切断这种直接依赖，类似于center <- container -> service。即加入一个container角色，把center和service都先加载进来，然后再用IOC的方法把依赖关系建立好。这样center和service都无须知道对方具体的文件所在了，也就不会循环的require对方了。  
  
- <https://github.com/joyent/node/issues/1490>