layout: post
title: "Javascript 异步加载"
category: JavaScript
tags: [javascript, loader]
---

原文： <http://www.cnblogs.com/tiwlin/archive/2011/12/26/2302554.html>

## 同步加载与异步加载的形式

### 同步加载

我们平时最常使用的就是这种同步加载形式：

    <script src="http://yourdomain.com/script.js"></script> 

同步模式，又称阻塞模式，会阻止浏览器的后续处理，停止了后续的解析，因此停止了后续的文件加载（如图像）、渲染、代码执行。

js 之所以要同步执行，是因为 js 中可能有输出 document 内容、修改dom、重定向等行为，所以默认同步执行才是安全的。

以前的一般建议是把`<script>`放在页面末尾`</body>`之前，这样尽可能减少这种阻塞行为，而先让页面展示出来。

简单说：加载的网络 timeline 是瀑布模型，而异步加载的 timeline 是并发模型。

<!-- more -->

### 常见异步加载（Script DOM Element）

	(function() {  
	     var s = document.createElement('script');  
	     s.type = 'text/javascript';  
	     s.async = true;  
	     s.src = 'http://yourdomain.com/script.js';  
	     var x = document.getElementsByTagName('script')[0];  
	     x.parentNode.insertBefore(s, x);  
	 })();

  
异步加载又叫非阻塞，浏览器在下载执行 js 同时，还会继续进行后续页面的处理。

这种方法是在页面中`<script>`标签内，用 js 创建一个 script 元素并插入到 document 中。这样就做到了非阻塞的下载 js 代码。

async属性是HTML5中新增的异步支持，见后文解释，加上好（不加也不影响）。

此方法被称为 Script DOM Element 法，不要求 js 同源。

例如 Google Analytics 和 Google+ Badge 都使用了这种异步加载代码：

```js
(function() {  
     var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;  
     ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';  
     var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);  
 })();

 ( function ( )

        {var po = document.createElement("script");  
    po.type = "text/javascript"; po.async = true;po.src = "https://apis.google.com/js/plusone.js";  
    var s = document.getElementsByTagName("script")[0];  
    s.parentNode.insertBefore(po, s);  
 })();
```

可以进一步封装如下：

```js
// Add scripts to DOM by creating a script tag dynamically.
// @param {String=} url Url of a js file
// @param {String=} src Script source code to add the source directly.
// NB: At least one of the parameters must be specified.
var hookScripts = function(url, src) {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = url || null;
    s.innerHTML = src || null;
    document.getElementsByTagName("head")[0].appendChild(s);
};
// usage eg:
hookScripts('url/path/to/myscript.js');  //url
hookScripts(null, 'alert("hello");');  //giving the source code directly
```

We use the native DOM API instead of jQuery for this particular case because of the way [jQuery treats <script> tags](http://api.jquery.com/append/#comment-67912032). jQuery inserts script to DOM, then evaluates the script separately and then it removes the tag from the DOM. So you won't see the script tag, but the script will get executed.

See [♠ qλ | kadaj's musing ♠](http://www.qlambda.com/2012/01/add-script-tags-to-dom-dynamically.html)

但是，**这种加载方式在加载执行完之前会阻止 onload 事件的触发**，而现在很多页面的代码都在 onload 时还要执行额外的渲染工作等，所以还是会阻塞部分页面的初始化处理。

### onload 时的异步加载

	(function() {  
		function async_load(){  
		 var s = document.createElement('script');  
		 s.type = 'text/javascript';  
		 s.async = true;  
		 s.src = 'http://yourdomain.com/script.js';  
		 var x = document.getElementsByTagName('script')[0];  
		 x.parentNode.insertBefore(s, x);  
		}  
		if (window.attachEvent)  
		 window.attachEvent('onload', async_load);  
		else  
		 window.addEventListener('load', async_load, false);  
	})();  


这和前面的方式差不多，但关键是它不是立即开始异步加载 js ，而是在 onload 时才开始异步加载。这样就解决了阻塞 onload 事件触发的问题。

补充：**DOMContentLoaded 与 OnLoad 事件**

DOMContentLoaded : 页面(document)已经解析完成，页面中的dom元素已经可用。但是页面中引用的图片、subframe可能还没有加载完。

OnLoad：页面的所有资源都加载完毕（包括图片）。浏览器的载入进度在这时才停止。

这两个时间点将页面加载的timeline分成了三个阶段。

### 异步加载的其它方法

由于Javascript的**动态特性**，还有很多异步加载方法：

* XHR Eval
* XHR Injection
* Script in Iframe
* Script Defer
* document.write Script Tag
* 还有一种方法是用 setTimeout 延迟0秒 与 其它方法组合。

**XHR Eval**：通过 ajax 获取js的内容，然后 eval 执行。

	var xhrObj = getXHRObject();   
	xhrObj.onreadystatechange =    
	function() {    
	 if ( xhrObj.readyState != 4 ) return;   
	 eval(xhrObj.responseText);   
	};   
	xhrObj.open('GET', 'A.js', true);   
	xhrObj.send('');

**Script in Ifram**e：创建并插入一个iframe元素，让其异步执行 js 。

	var iframe = document.createElement('iframe');   
	document.body.appendChild(iframe);   
	var doc = iframe.contentWindow.document;   
	doc.open().write('<body onload="insertJS()">');   
	doc.close();

**GMail Mobile**：页内 js 的内容被注释，所以不会执行，然后在需要的时候，获取script元素中 text 内容，去掉注释后 eval 执行。

	<script type="text/javascript">   
	/*   
	var ...    
	*/   
	</script>

详见参考资料中2010年的Velocity 大会 Steve Souders 和淘宝的那两个讲义。

## async 和 defer 属性

### defer 属性

defer 属性告诉浏览器要等页面载入完成之后才能执行脚本。这样，在 `<head>` 中通过下面的代码引入 file.js

    <script src="file.js" defer></script>

可以使 file.js 和文档的下载和解析同时进行，也可以保证 file.js 在文档下载和解析完成之后执行。

### async 属性

    <script src="file.js" async></script>

file.js 的下载和HTML 文档的下载和解析同时进行，一旦下载完成，立即执行，不管 HTML 文档有没有解析完成。

### Difference

Both async and defer scripts begin to __download immediately__ without pausing the parser and both support an optional onload handler to address the common need to perform initialization which depends on the script. The difference between async and defer centers around when the script is executed. Each async script executes at the first opportunity after it is finished downloading and before the window’s load event. This means it’s possible (and likely) that async scripts are not executed in the order in which they occur in the page. The defer scripts, on the other hand, are guaranteed to be executed in the order they occur in the page. That execution starts after parsing is completely finished, but before the document’s DOMContentLoaded event.

See also [Surfin' Safari - Blog Archive » Running scripts in WebKit](https://www.webkit.org/blog/1395/running-scripts-in-webkit/)

使用这两个属性的脚本中不能调用document.write方法。

See also：[script async](http://www.whatwg.org/specs/web-apps/current-work/multipage/scripting-1.html#attr-script-async)

## 延迟加载（lazy loading）

前面解决了异步加载（async loading）问题，再谈谈什么是延迟加载。

延迟加载：有些 js 代码并不是页面初始化的时候就立刻需要的，而稍后的某些情况才需要的。延迟加载就是一开始并不加载这些暂时不用的js，而是在需要的时候或稍后再通过js 的控制来异步加载。

也就是将 js 切分成许多模块，页面初始化时只加载需要立即执行的 js ，然后其它 js 的加载延迟到第一次需要用到的时候再加载。

特别是页面有大量不同的模块组成，很多可能暂时不用或根本就没用到。

就像图片的延迟加载，在图片出现在可视区域内时（在滚动条下拉）才加载显示图片。

## script 的两阶段加载 与 延迟执行（lazy execution）

JS的加载其实是由两阶段组成：下载内容（download bytes）和执行（parse and execute）。

**浏览器在下载完 js 的内容后就会立即对其解析和执行，不管是同步加载还是异步加载。**

前面说的异步加载，解决的只是下载阶段的问题，但代码在下载后会立即执行。

而浏览器在解析执行 JS 阶段是阻塞任何操作的，这时的浏览器处于无响应状态。

我 们都知道通过网络下载 script 需要明显的时间，但容易忽略了第二阶段，解析和执行也是需要时间的。script的解析和执行所花的时间比我们想象的要多，尤其是script 很多很大的时候。有些是需要立刻执行，而有些则不需要（比如只是在展示某个界面或执行某个操作时才需要）。

这些script 可以延迟执行，先异步下载缓存起来，但不立即执行，而是在第一次需要的时候执行一次。

利用特殊的技巧可以做到 下载 与 执行的分离 (再次感谢 javascript 的动态特性)。比如将 JS 的内容作为 Image或 object 对象加载缓存起来，所以就不会立即执行了，然后在第一次需要的时候再执行。

此部分的更多解释 请查看末尾参考资料中 ControlJS 的相关链接。 

### 小技巧：

1. 模拟较长的下载时间

	写个后端脚本，让其 sleep 一定时间。如在 jsp 中 Thread.sleep(5000); ，这样5秒后才能收到内容。

2. 模拟较长的 js 代码执行时间（因为这步一般比较快不容易观察到）

		var t_start = Number(new Date());
		while ( t_start + 5000 > Number(new Date()) ) {}

	这个代码将使 js 执行5秒才能完成！

## script 标签使用的历史

1. script 放在 HEAD 中**

		<head>  
		<script src="…"></script>  
		</head>  
 
	* 阻止了后续的下载；
	* 在IE 6-7 中 script 是顺序下载的，而不是现在的 “并行下载、顺序执行” 的方式；
	* 在下载**和**解析执行阶段阻止渲染（rendering）；

2. script 放在页面底部（2007）

		...   
		<script src="…"></script>   
		</body>  


	* 不阻止其它下载；
	* 在IE 6-7 中 script 是顺序下载的；
	* 在下载和解析执行阶段阻止渲染（rendering）

3. 异步加载script（2009）

		var se = document.createElement('script');   
		se.src = 'http://anydomain.com/A.js';   
		document.getElementsByTagName('head')[0].appendChild(se);

	这就是本文主要说的方式。

	* 不阻止其它下载；
	* 在所有浏览器中，script都是并行下载；
	* 只在解析执行阶段阻止渲染（rendering）；

4. 异步下载 + 按需执行 (2010)

		var se = new Image();   
		se.onload = registerScript();   
		se.src = 'http://anydomain.com/A.js';  

	把下载 js 与 解析执行 js 分离出来

	* 不阻止其它下载；
	* 在所有浏览器中，script都是并行下载；
	* 不阻止渲染（rendering）直到真正需要时；

## 异步加载的问题

在异步加载的时候，无法使用 document.write 输出文档内容。

在同步模式下，document.write 是在**当前 script 所在的位置**输 出文档的。而在异步模式下，浏览器继续处理后续页面内容，根本无法确定 document.write 应该输出到什么位置，所以异步模式下 document.write 不可行。而到了页面已经 onload 之后，再执行 document.write 将导致当前页面的内容被清空，因为它会自动触发 document.open 方法。

实际上document.write的名声并不好，最好少用。

替代方法：

1. 虽然异步加载不能用 document.write，但还是可以onload之后执行操作dom（创建dom或修改dom）的，这样可以实现一些自己的动态输出。比如要在页面异步创建一个浮动元素，这和它在页面中的位置就没关系了，只要创建出该dom元素添加到 document 中即可。

2. 如果需要在**固定位置**异步生成元素的内容，那么可以在该固定位置设置一个dom元素作为目标，这样就知道位置了，异步加载之后就可以对这个元素进行修改。

## JS 模块化管理

异步加载，需要将所有 js 内容按模块化的方式来切分组织，其中就存在依赖关系，而异步加载不保证执行顺序。

另外，namespace 如何管理 等相关问题。这部分已超出本文内容，可参考：

[RequireJS](http://requirejs.org/) 、 [CommonJS](http://www.commonjs.org/) 以及 王保平(淘宝)的 [SeaJS](http://seajs.com/) 及其[博客](http://lifesinger.wordpress.com/) 。

## JS最佳实践

1. 最小化 js 文件，利用压缩工具将其最小化，同时开启http gzip压缩。工具：
2. 尽量不要放在 <head> 中，尽量放在页面底部，最好是</body>之前的位置
3. 避免使用 document.write 方法
4. 异步加载 js ，使用非阻塞方式，就是此文内容。
5. 尽量不直接在页面元素上使用 Inline Javascript，如onClick 。有利于统一维护和缓存处理。

## 参考资料

- [Lazy Loading Asyncronous Javascript](http://friendlybit.com/js/lazy-loading-asyncronous-javascript/)
- [Load Non-blocking JavaScript with HTML5 Async and Defer](http://www.sitepoint.com/non-blocking-async-defer/)
- 2010年 Velocity China 上的两个讲义：
	- Steve Souders(Google)的 [Even Faster Web Sites](http://velocity.oreilly.com.cn/2010/ppts/velocity-efws-20101208SteveSoudersEvenFaster.pdf) (pdf)
	- 李穆(淘宝)的 [第三方广告代码稳定性和性能优化实战](http://velocity.oreilly.com.cn/2010/ppts/limufromTaobao.pdf) (pdf)
- [JavaScript 的性能优化：加载和执行](http://www.ibm.com/developerworks/cn/web/1308_caiys_jsload/index.html?ca=drs-)
- [Javascript 装载和执行](http://coolshell.cn/articles/9749.html)
- [async vs defer attributes - Growing with the Web](http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html)

## 性能测试

- [Script-injected "async scripts" considered harmful - igvita.com](https://www.igvita.com/2014/05/20/script-injected-async-scripts-considered-harmful)

## See

- [Javascript代码在页面加载时的执行顺序介绍_基础知识_脚本之家](http://www.jb51.net/article/36330.htm)
- [Everything I Know About The Script Tag - Eager Blog](https://eager.io/blog/everything-I-know-about-the-script-tag/)
- [javascript - load scripts asynchronously - Stack Overflow](http://stackoverflow.com/questions/7718935/load-scripts-asynchronously)