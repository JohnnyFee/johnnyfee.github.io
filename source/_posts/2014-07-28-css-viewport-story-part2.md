layout: post
title: "两个 viewport 的故事（第二部分）"
category: CSS
tags: [web, css]
--- 

原文：<http://www.quirksmode.org/mobile/viewports2.html>
翻译：<http://weizhifeng.net/viewports2.html>

**在这个迷你系列的文章里边我将会解释viewport，以及许多重要元素的宽度是如何工作的，比如`<html>`元素，也包括窗口和屏幕。**

这篇文章我们来聊聊关于移动浏览器的内容。如果你对移动开发完全是一个新手的话，我建议你先读一下[第一篇](http://weizhifeng.net/viewports.html)关于桌面浏览器的文章，先在熟悉的环境中进行下热身。

# 移动浏览器的问题 #

当我们比较移动浏览器和桌面浏览器的时候，它们最显而易见的不同就是屏幕尺寸。为桌面浏览器所设计的网站在移动浏览器中显示的内容明显要少于在桌面浏览器中显示的；不管是对其进行缩放直到文字小得无法阅读，还是在屏幕中以合适的尺寸只显示站点中的一小部分内容。

<!--more-->

移动设备的屏幕比桌面屏幕要小得多；想想其最大有400px宽，有时候会小很多。（一些手机声称拥有更大的宽度，但是它在撒谎－或者也可以说它给我们提供了没用的信息。）

平板设备中的像素中间层会在桌面环境和移动环境的缺口之间架起一段桥梁，比如像iPad或者传说中HP基于webOS所研发的设备，但是这并没有改变根本问题。站点必须也能在移动设备上工作，所以我们不得不让它们能在小尺寸的屏幕上正常显示。

最重要的问题在CSS上，特别是viewport的尺寸。如果我们照搬桌面环境的模式，那么我们的CSS就要立马熄火了（译者：即显示混乱）。

让我们看下之前sidebar为`width: 10%`的例子。如果移动浏览器想要实现跟桌面浏览器一样的行为，它们最多为元素设置40px的宽度，但是这太窄了。你的流式布局会看起来被挤乱了。

解决这个问题的一个方法是为移动浏览器建立一个特定的站点。先抛开你是否有必要这么做这个基本问题，而实际的情况是只有很少的网站拥有者真正知道要对移动设备做特殊的处理。

移动浏览器厂商想给它们的客户尽可能的提供最好的体验，这现在指的就是「尽可能的跟桌面一样」。因此耍一些花招是必要的。

# 两个viewport #

viewport太窄了，以至于不能正常展示你的CSS布局。明显的解决方案是使viewport变宽一些。无论如何，需要把它分成两部分：visual viewport和layout viewport。

George Cummins在[Stack Overflow](http://stackoverflow.com/questions/6333927/difference-between-visual-viewport-and-layout-viewport)上对基本概念给出了最佳解释：

_把layout viewport想像成为一张不会变更大小或者形状的大图。现在想像你有一个小一些的框架，你通过它来看这张大图。（译者：可以理解为「管中窥豹」）这个小框架的周围被不透明的材料所环绕，这掩盖了你所有的视线，只留这张大图的一部分给你。你通过这个框架所能看到的大图的部分就是visual viewport。当你保持框架（缩小）来看整个图片的时候，你可以不用管大图，或者你可以靠近一些（放大）只看局部。你也可以改变框架的方向，但是大图（layout viewport）的大小和形状永远不会变。_

也看一下Chris给出的[解释](http://stackoverflow.com/questions/7344886/visual-viewport-vs-layout-viewport-on-mobile-devices)。

**visual viewport**是页面当前显示在屏幕上的部分。用户可以通过滚动来改变他所看到的页面的部分，或者通过缩放来改变visual viewport的大小。

![mobile_visualviewport](http://johnnyimages.qiniudn.com/mobile_visualviewport.jpg)

无论怎样，CSS布局，尤其是百分比宽度，是以layout viewport做为参照系来计算的，它被认为要比visual viewport宽。

所以`<html>`元素在初始情况下用的是layout viewport的宽度，并且你的CSS是在屏幕（译者注：宽度等于layout viewport的虚拟屏幕）好像明显比电话屏幕宽（物理屏幕）要宽的假设基础上进行解释的。这使得你站点布局的行为与其在桌面浏览器上的一样。

layout viewport有多宽？每个浏览器都不一样。Safari iPhone为980px，Opera为850px，Android WebKit为800px，最后IE为974px。

一些浏览器有特殊的行为：

* Symbian WebKit会保持layout viewport与visual viewport相等，是的，这意味着拥有百分比宽度元素的行为可能会比较奇怪。但是，如果页面由于设置了绝对宽度而不能放入visual viewport中，那么浏览器会把layout viewport拉伸到最大850px宽。
* Samsung WebKit (on bada)使layout viewport和最宽的元素一样宽。
* 在BlackBerry上，layout viewport在100%缩放比例的情况下等于visual viewport。这不会变。

# 缩放 #

很显然两个viewport都是以CSS像素度量的。但是当进行缩放（如果你放大，屏幕上的CSS像素会变少）的时候，visual viewport的尺寸会发生变化，layout viewport的尺寸仍然跟之前的一样。（如果不这样，你的页面将会像百分比宽度被重新计算一样而经常被重新布局。）

# 理解layout viewport #

为了理解layout viewport的尺寸，我们不得不看一下当页面被完全缩小后会发生什么。许多移动浏览器会在初始情况下以完全缩小的模式来展示任何页面。

重点是：浏览器已经为自己的layout viewport选择了尺寸，这样的话它在完全缩小模式的情况下完整的覆盖了屏幕（并且等于visual viewport）。

![mobile_viewportzoomedout](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport2/mobile_viewportzoomedout.jpg)

所以layout viewport的宽度和高度等于在最大限度缩小的模式下屏幕上所能显示的任何内容的尺寸。当用户放大的时候这些尺寸保持不变。

![mobile_layoutviewport](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport2/mobile_layoutviewport.jpg)

layout viewport宽度一直是一样的。如果你旋转你的手机，visual viewport会发生变化，但是浏览器通过轻微的放大来适配这个新的朝向，所以layout viewport又和visual viewport一样宽了。

![mobile_viewportzoomedout_la](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport2/mobile_viewportzoomedout_la.jpg)

这对layout viewport的高度会有影响，现在的高度比肖像模式（竖屏）要小。但是web开发者不在乎高度，只在乎宽度。

![mobile_layoutviewport_la](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport2/mobile_layoutviewport_la.jpg)

# 度量layout viewport #

我们现在有两个需要度量的viewport。很幸运的是浏览器战争给我们提供了两个属性对。

`document.documentElement.clientWidth`和`-Height`包含了layout viewport的尺寸。

_document.documentElement.clientWidth/Height_

* _意义：Layout viewport的尺寸_
* _度量单位：CSS像素_
* 完全支持Opera, iPhone, Android, Symbian, Bolt, MicroB, Skyfire, Obigo。
* 在Iris中Visual viewport有问题

    * Samsung WebKit在页面应用了`<meta viewport>`标签的时候会返回正确的值；否则使用`<html>`元素的尺寸。
    * Firefox返回以设备像素为单位的屏幕尺寸。
    * IE返回1024x768。然而，它把信息存储在`document.body.clientWidth/Height`中。这和桌面的IE6是一致的。
    * NetFront的值只在100%缩放比例的情况下是正确的。
    * Symbian WebKit 1 (老的S60v3设备)不支持这些属性。

* BlackBerry不支持。

![mobile_client](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport2/mobile_client.jpg)

朝向会对高度产生影响，但对宽度不会产生影响。

![mobile_client_la](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport2/mobile_client_la.jpg)

# 度量visual viewport #

对于visual viewport，它是通过`window.innerWidth/Height`来进行度量的。很明显当用户缩小或者放大的时候，度量的尺寸会发生变化，因为屏幕上的CSS像素会增加或者减少。

_window.innerWidth/Height_

* 意义：Visual viewport的尺寸。
* 度量单位：CSS像素。
* 完全支持iPhone，Symbian，BlackBerry。
* 问题

    * Opera和Firefox返回以设备像素为单位的屏幕宽度。
    * Android，Bolt，MicroB和NetFront返回以CSS像素为单位的layout viewport尺寸。

* 不支持IE，但是它在`document.documentElement.offsetWidth/Height`中提供visual viewport的尺寸。

    * Samsung WebKit返回的是layout viewport或者`<html>`的尺寸，这取决于页面是否应用了`<meta viewport>`标签。

* Iris，Skyfire，Obigo根本就是扯淡。

![mobile_inner](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport2/mobile_inner.jpg)

不幸的是这是浏览器不兼容问题中的一部分；许多浏览器仍然不得不增加对visual viewport度量尺寸的支持。但是没有浏览器把这个度量尺寸存放任何其他的属性对中，所以我猜`window.innerWidth/Height`是标准，尽管它被支持的很糟。

# 屏幕 #

像桌面环境一样，`screen.width/height`提供了以设备像素为单位的屏幕尺寸。像在桌面环境上一样，做为一个开发者你永远不需要这个信息。你对屏幕的物理尺寸不感兴趣，而是对屏幕上当前有多少CSS像素感兴趣。

_screen.width and screen.height_

* 意义：屏幕尺寸
* 度量单位：设备像素
* 完全支持Opera Mini，Android，Symbian，Iris，Firefox，MicroB，IE，BlackBerry。
* 问题：Windows Mobile上的Opera Mobile只提供了风景模式（横屏）的尺寸。S60上的Opera Mobile返回的值是正确的。

    * Samsung WebKit返回layout viewport或者`<html>`的尺寸，这取决于是否在页面上应用了`<meta viewport>`标签。
    * iPhone和Obigo只提供了肖像模式（竖屏）的尺寸。
    * NetFront只提供风景模式（横屏）的尺寸。

* Bolt，Skyfire依旧在扯淡。

![mobile_screen](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport2/mobile_screen.jpg)

# 缩放比例 zoom level #

直接读出缩放比例是不可能的，但是你可以通过以`screen.width`除以`window.innerWidth`来获取它的值。当然这只有在两个属性都被完美支持的情况下才有用。

幸运的是缩放比例并不太重要。你需要知道的是当前屏幕上有多少个CSS像素。你可以通过`window.innerWidth`来获取这个信息，如果它被正确支持的话。

# 滚动距离Scrolling offset #

你还需知道的是visual viewport当前相对于layout viewport的位置。这是滚动距离，并且就像在桌面一样，它被存储在`window.pageX/YOffset`之中。

_window.pageX/YOffset_

* 意义：滚动距离；与visual viewport相对于layout viewport的距离一样。
* 度量单位：CSS像素
* 完全支持iPhone，Android，Symbian，Iris，MicroB，Skyfire，Obigo。
* 问题：Opera，Bolt，Firefox和NetFront一直返回0。

    * Samsung WebKit只有当`<meta viewport>`被应用到页面上时候才返回正确的值。

* 不支持IE，BlackBerry。IE把值存在`document.documentElement.scrollLeft/Top`之中。

![mobile_page](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport2/mobile_page.jpg)

# \<html> 元素 #

就像在桌面上一样，`document.documentElement.offsetWidth/Height`提供了以CSS像素为单位的`<html>`元素的整个尺寸。

_document.documentElement.offsetWidth/Height_

* 意义：`<html>`元素的整体尺寸。
* 度量单位：CSS像素。
* 完全支持Opera，iPhone，Android，Symbian，Samsung，Iris，Bolt，Firefox，MicroB，Skyfire，BlackBerry，Obigo。
* 问题：NetFront的值只在100%缩放比例的情况下才正确。

    * IE使用这个属性对来存储visual viewport的尺寸。在IE中，去`document.body.clientWidth/Height`中获取正确的值。

![mobile_offset](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport2/mobile_offset.jpg)

# 媒体查询Media queries #

媒体查询和其在桌面环境上的工作方式一样。`width/height`使用layout　viewport做为参照物，并且以CSS像素进行度量，`device-width/height`使用设备屏幕，并且以设备像素进行度量。

换句话说，`width/height`是`document.documentElement.clientWidth/Height`值的镜像，同时`device-width/height`是`screen.width/height`值的镜像。（它们在所有浏览器中实际上就是这么做的，即使这个镜像的值不正确。）

_媒体查询_

* 意义：度量`<html>`元素的宽度（CSS像素）或者设备宽度（设备像素）。
* 完全支持Opera，iPhone，Android，Symbian，Samsung，Iris，Bolt，Firefox，MicroB。
* 不支持Skyfire，IE，BlackBerry，NetFront，Obigo。
* 注意我在这里测试的是浏览器是否能从正确的「属性对」获取它们的数据。这些属性对是否提供正确的信息不是这个测试的一部分。

![mobile_mediaqueries](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport2/mobile_mediaqueries.jpg)

现在哪个度量的尺寸对web开发者更有用？我的观点是，不知道。

我开始认为`device-width`是最重要的那一个，因为它给我们提供了关于我们可能会使用的设备的一些信息。比如，你可以根据设备的宽度来更改你的布局的宽度。不过，你也可以使用`<meta viewport>`来做这件事情；使用`device-width`媒体查询并不是绝对必要的。

那么`width`究竟是不是更重要的媒体查询呢？可能是；它提供了某些线索，这些线索是关于浏览器厂商认为在这个设备上网站应该有的正确宽度。但是这有些模糊不清，并且`width`媒体查询实际上不提供任何其他信息。

所以我不做选择。目前我认为媒体查询在分辨你是否在使用桌面电脑，平板，或者移动设备方面很重要，但是对于区分各种平板或者移动设备并没有什么用。

或者还有其他用处。

# 事件坐标 #

这里的事件坐标与其在桌面环境上的工作方式差不多。不幸的是，在十二个测试过的浏览器中只有Symbian WebKit和Iris这两个浏览器能获取到三个完全正确的值。其他所有浏览器都或多或少有些严重的问题。

`pageX/Y`仍然是相对于页面，以CSS像素为单位，并且它是目前为止三个属性对中最有用的，就像它在桌面环境上的那样。

_Event coordinates_

* 意义：见正文
* 度量单位：见正文
* 完全支持Symbian，Iris
* 问题：Opera Mobile在三个属性对中提供的都是pageX/Y的值，但是当你滚动一段距离后就出问题了。

    * 在iPhone，Firefox和BlackBerry上clientX/Y等于pageX/Y。
    * 在Android和MicroB上screenX/Y等于clientX/Y（换句话说，也就是以CSS像素为单位）。
    * 在Firefox上screenX/Y是错的。
    * IE，BlackBerry和Obigo不支持pageX/Y。
    * 在NetFront上三个属性对的值都等于screenX/Y。
    * 在Obigo上clientX/Y等于screenX/Y。
    * Samsung WebKit一直返回pageX/Y。

* 没有在Opera Mini，Bolt，Skyfire上测试过。

![mobile_pageXY](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport2/mobile_pageXY.jpg)

`clientX/Y`是相对于visual viewport来计算，以CSS像素为单位的。这有道理的，即使我还不能完全指出这么做的好处。

`screenX/Y`是相对于屏幕来计算，以设备像素为单位。当然，这和`clientX/Y`用的参照系是一样的，并且设备像素在这没有用处。所以我们不需要担心`screenX/Y`；跟在桌面环境上一样没有用处。

![mobile_clientXY](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport2/mobile_clientXY.jpg)

# viewport meta标签 #

_Meta viewport_

* 意义：设置layout viewport的宽度。
* 度量单位：CSS像素。
* 完全支持Opera Mobile，iPhone，Android，Iris，IE，BlackBerry，Obigo。
* 不支持Opera Mini，Symbian，Bolt，Firefox，MicroB，NetFront。
* 问题：Skyfire不能处理我的测试页面。

    * 如果在Samsung WebKit中对页面应用`<meta viewport>`，一些其他属性的意义会发生变化。
    * Opera Mobile，iPhone，Samsung和BlackBerry不允许用户进行缩小。

最后，让我们讨论一下`<meta name="viewport" content="width=320">`；起初它是苹果做的一个扩展，但是与此同时被更多的浏览器所借鉴。它的意思是调整layout viewport的大小。为了理解为什么这么做是必要的，让我们后退一步。

假设你创建了一个简单的页面，并且没有给你的元素设置「宽度」。那么现在它们会被拉伸来填满layout viewport宽度的100%。大部分浏览器会进行缩放从而在屏幕上展示整个layout viewport，产生下面这样的效果：

![mq_none](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport2/mq_none.jpg)

所有用户将会立刻进行放大操作，这个是工作的，但是大部分浏览器完好无缺的保持元素的宽度，这使得文字很难阅读。

![mq_none_zoomed](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport2/mq_none_zoomed.jpg)

（值得注意的例外是Android WebKit，它实际上会减小包含文字的元素的大小，所以文字就能适配屏幕。这简直太有才了，我觉得所有其他浏览器应该借鉴这个行为。我过阵子将会完整的写一下这个议题。）

现在你应该尝试设置`html {width: 320px}`。现在`<html>`元素收缩了，并且其他元素现在使用的是320px的100%。这在用户进行放大操作的时候有用，但是在初始状态是没用的，当用户面对一个缩小了的页面这几乎不包含任何内容。

![mq_html300](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport2/mq_html300.jpg)

为了绕开这个问题苹果发明了viewport　meta标签。当你设置`<meta name="viewport" content="width=320">`的时候，你就设置了layout viewport的宽度为320px。现在页面的初始状态也是正确的。

![mq_yes](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport2/mq_yes.jpg)

你可以把layout viewport的宽度设置为任何你想要的尺寸，包括`device-width`。`device-width`会把`screen.width`（以设备像素为单位）做为其值，并相应的重置layout viewport的尺寸。

但这里有一个隐情。有时候正规的`screen.width`不那么明了，因为像素的数量太大了。比如，Nexus One的正规宽度是480px，但是Google的工程师们觉得当使用`device-width`的时候，layout viewport的宽度为480px，这有些太大了。他们把宽度缩小为三分之二，所以`device-width`会返回给你一个320px的宽度，就像在iPhone上一样。

如果，像传闻那样，新的iPhone将会炫耀一个更大的像素数量（并不意味着一个更大的屏幕），如果苹果借鉴了这个行为我将不会感到惊讶。也许最终`device-width`就意味着320px。

# 相关研究 #

一些相关的主题不得不需要进行更深一步的研究：

* `position: fixed`。一个固定的元素，就像我们知道的那样，是相对于viewport来进行定位的。但是相对于哪个viewport？我正在同时做这个研究。
* 其他媒体查询：dpi，orientation，aspect-ratio。尤其是dpi，那是一个灾难地区，不仅仅是因为所有浏览器都返回96dpi，通常都是错的，也是因为我完全不确定对于web开发者来说哪个值是他们最感兴趣的。

* 当一个元素比layout viewport/HTML元素宽的时候会发生什么？比如我把一个拥有`width: 1500px`属性的元素插入到我的测试页面中的一个？这个元素将会从HTML元素中伸出来（`overflow: visible`），但这意味着实际的viewport可以变得比layout viewport要宽。除了这个以外，旧Android（Nexus One）还会当这个发生的时候放大HTML元素。这是个好主意吗？

## Tutorial

- [视窗meta标签的理解](http://www.w3cplus.com/css/understanding-the-viewport-meta-tag.html)
- [此像素非彼像素](http://www.w3cplus.com/css/A-pixel-is-not-a-pixel-is-not-a-pixel.html)
- [Responsive Meta Tag](http://css-tricks.com/snippets/html/responsive-meta-tag/)