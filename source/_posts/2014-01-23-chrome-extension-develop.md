---
layout: post
title: "Chrome 扩展开发"
description: ""
category: Chrome
tags: [chrome]
--- 
## 概述

为了着手创建你的扩展程序，你只需要为你的扩展创建一个文件夹。程序所必须的文件只有manifest.json.，不过也推荐准备一些图片用作图标，和至少一个JavaScript以提供功能。一般来说还会包含HTML文档、样式表、图片等等其他的资源。

### Chrome扩展文件

Chrome扩展文件以.crx为后缀名，在Google Chrome扩展官方网站下载扩展时，Chrome会将.crx文件下载到`%LOCALAPPDATA%/Google/Chrome/User Data/Temp`目录下，安装完成或者取消安装，该文件就会被删除。

.crx实际上是一个压缩文件。

### Manifest文件

每个扩展都必须在其根目录下包含一个manifest.json文件。

这个文件里面声明了扩展的名称、版本、权限、设置选项和其他的一些和扩展相关的元数据。Manifest v1早在Chrome 18便已被弃用，而且会根据这个时间表逐渐淘汰使用Manifest v1的扩展。如果你在参考一些旧扩展的Manifest文件的话，请确认添加"manifest_version": 2。

Google发布的[Manifest v2](http://developer.chrome.com/extensions/manifest.html)中支持的域。

<!--more-->

## 核心概念

Chrome扩展程序分为Browser Actions和Page Actions。

### [Browser Actions](http://developer.chrome.com/extensions/browserAction.html)

Browser Actions在界面上的表现如:

![Browser Actions](http://johnnyimages.qiniudn.com/chrome-browser-action.jpg)

Browser Actions允许你在右上角放置一个合适大小的图标，如果扩展应用的界面是全局的，而不是针对某个页面，那就应该使用浏览器操作。如果要使用浏览器按钮，你必须在manifest.json中的browser_action域中做如下声明：

	{
	  "name": "My extension",
	  ...
	  "browser_action": {
	    "default_icon": {                    // optional
	      "19": "images/icon19.png",           // optional
	      "38": "images/icon38.png"            // optional
	    },
	    "default_title": "Google Mail",      // optional; shown in tooltip
	    "default_popup": "popup.html"        // optional
	  },
	  ...
	}


**Note**: Chrome automatically creates a grayscale version of your 16x16-pixel icon. You should provide a full-color version so that it can also be used in other situations that require color. For example, the context menus API also uses a 16x16-pixel icon, but it is displayed in color.

At the moment, the icon set can contain images with pixel sizes 19 and 38.

如果只提供19px或者38px大小的图标，可以简写为：

	{
	  "name": "My extension",
	  ...
	  "browser_action": {
	    ...
	    "default_icon": "images/icon19.png"  // optional
	    // equivalent to "default_icon": { "19": "images/icon19.png" }
	  },
	  ...
	}
	
一个浏览器按钮可以有一个图标、提示、文字标记(badge)和一个弹出内容，文字标记可以将极少的文字（4字符）动态的覆盖在浏览器操作的图标上，你也可以通过chrome.browserAction的API来对浏览器按钮相关的事件做出反应。To set the icon, use the `default_icon` field of browser_action in the manifest, or call the setIcon method. To set the tooltip, use the *default_title* field of browser_action in the manifest, or call the setTitle method. Set the text and color of the badge using [setBadgeText](http://developer.chrome.com/extensions/browserAction.html#method-setBadgeText) and [setBadgeBackgroundColor](http://developer.chrome.com/extensions/browserAction.html#method-setBadgeBackgroundColor), respectively.Specify the HTML file in the `default_popup` field of browser_action in the manifest, or call the setPopup method.

Demo请参考[examples/api/browserAction](http://src.chromium.org/viewvc/chrome/trunk/src/chrome/common/extensions/docs/examples/api/browserAction/)。

**弹出页**

popup属于Browser Actions，当点击图标时出现这个窗口，可以在里面放置任何html元素，它的宽度是自适应的。

弹出页如：

![Browser Actions](http://johnnyimages.qiniudn.com/chrome-popup.png)

在popup中还可以注入代码到web page中，但只限于对dom的访问和修改：

	chrome.tabs.executeScript(null, {code:"document.body.style.backgroundColor=blue"});

在popup.html中可以直接通过background对象可以直接调用background中定义的方法或对象：

	var bg = chrome.extension.getBackgroundPage(); 
	bg.testBG();

###[Page Actions](http://developer.chrome.com/extensions/pageAction.html)

Page Actions 允许你在多功能栏（地址栏）右边添加一个按钮，其实他和浏览器按钮很相似，区别之处在于页面按钮是专门用来处理某些指定的页面的。页面按钮必须在manfiest.json中声明， page_action域的使用和浏览器按钮一样。页面按钮可以通过chrome.pageAction API控制，可以在不同的标签页中灵活的显示或者隐藏。页面按钮也可以设置图标、提示和弹出内容，和浏览器按钮不同的是其没有文字标记功能。

	![Browser Actions](http://johnnyimages.qiniudn.com/chrome-page-action.jpg)

以上程序均属于Page Actions。

申明Page Action和Browse Action类似：

	"page_action": {
	    "default_icon": {                    // optional
	      "19": "images/icon19.png",           // optional
	      "38": "images/icon38.png"            // optional
	    },
	    "default_title": "Google Mail",      // optional; shown in tooltip
	    "default_popup": "popup.html"        // optional
	  }

Page Actions与Browser Actions的区别就是Page Actions不是必须在特定的页面中才会显示。You make a page action appear and disappear using the `show` and `hide` methods, respectively.

我们可以把对page aciton的设置和处理放在background page中，从而直接在background中通过chrome.pageAction来设置page action，比如如下代码实现了当所访问URL中有mail字符串时就显示page action的icon这样的功能：

	chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {      
		if (tab.url.indexOf("mail") > -1) {           
			chrome.pageAction.show(tabId);
		}
	});

### [后台页](http://developer.chrome.com/extensions/background_pages.html)

后台页是一个在扩展的进程中生成并运行的页面，存在时间会和扩展的生命周期等长。后台页可用来作为扩展的其他界面的控制器，用来维护某个状态或者保持某些活动。如果你需要用后台页来声明一些标记来用，可以把一个HTML文件名指定给page选项。

后台页只会在插件加载的时候运行一次，你可以在这个过程中让它绑定一些运行中的事件。比如background中可以直接访问chrome.browserAction对象来设置和定义browserAction，如：

	chrome.browserAction.setIcon({path:"icon.png"});

也可以绑定browserAction的点击事件定义事件响应处理：

	chrome.browserAction.onClicked.addListener(function(){
	     ......
	});	

This event will not fire if the browser action has a popup.

还可以在background中调用chrome.tabs.create()来创建新的tab。

在Manifest文件中指定后台脚本的代码如：

	{
	  "name": "My extension",
	  ...
	  "background": {
	    "scripts": ["background.js"]
	  },
	  ...
	}

一般情况下，后台页面不需要HTML标签。如果你需要，请使用如下代码指定：

	{
	  "name": "My extension",
	  ...
	  "background": {
	    "page": "background.html"
	  },
	  ...
	}

如下代码片段演示了扩展如何在后台页中与其他页面交互。同时也展示如何使用后台页来处理事件，如用户点击。
例子中的扩展有一个后台页，多个由image.html创建的view页面。（通过chrome.tabs.create()）。

Backgroud.js:

	// React when a browser action's icon is clicked.
	chrome.browserAction.onClicked.addListener(function(tab) {
	  var viewTabUrl = chrome.extension.getURL('image.html');
	  var imageUrl = /* an image's URL */;

	  // Look through all the pages in this extension to find one we can use.
	  var views = chrome.extension.getViews();
	  for (var i = 0; i < views.length; i++) {
	    var view = views[i];

	    // If this view has the right URL and hasn't been used yet...
	    if (view.location.href == viewTabUrl && !view.imageAlreadySet) {

	      // ...call one of its functions and set a property.
	      view.setImageUrl(imageUrl);
	      view.imageAlreadySet = true;
	      break; // we're done
	    }
	  }
	});

image.html:

	<html>
	  <script>
	    function setImageUrl(url) {
	      document.getElementById('target').src = url;
	    }
	  </script>
	  <body>
	    <p>
	    Image here:
	    </p>
	    <img id="target" src="white.png" width="640" height="480">
	  </body>
	</html>

###[事件页](http://developer.chrome.com/extensions/event_pages.html)

后台页会从扩展被加载的时候被装载，而且会一直留在内存里。这是因为如果有些状态需要被长时间维护，或者需要被扩展的其他部分访问。但是如果你没有这个需求，那么应该尽可能的使用事件页。

事件页其实只是相当于一个包含了`persistent: false`条目的后台页，这一行语句告诉Chrome可以不需要把后台页保留在内存里。相对来说，事件页也会在最开始被装载，但是一旦指定的脚本运行完毕，事件页便会从内存卸载，而且会在需要的时候被再次加载（比如用来回应某些操作）。

定义事件页的方法如：

	{
	  "name": "My extension",
	  ...
	  "background": {
	    "scripts": ["eventPage.js"],
	    "persistent": false
	  },
	  ...
	}

Note that opening a view does not cause the event page to load, but only prevents it from closing once loaded.

使用事件页的例子请参考 [Gmail Checker](http://src.chromium.org/viewvc/chrome/trunk/src/chrome/common/extensions/docs/examples/extensions/gmail/)

###[右键菜单](http://developer.chrome.com/extensions/contextMenus.html)

	var root = chrome.contextMenus.create({
	   title: 'MyExtension',
	   contexts: ['page']
	}, function () {
	   var subMenu = chrome.contextMenus.create({
	       title: 'Duplicate Tab'
	       contexts: ['page'],
	       parentId: root,
	       onclick: function (evt) {
	           chrome.tabs.create({ url: evt.pageUrl })
	       }
	   });
	});

右键菜单是另一个提供用户界面，方便用户和扩展交互的方式。Chrome的右键菜单通过右键激活，但根据激活内容的变化，菜单内容也会做相应改变。

chrome.contextMenusAPI允许你向为不同内容激活的右键菜单添加项目，若要使用此API，则在manifest.json文件中声明相应的contextMenus权限。

目前可用的激活内容有：

- all 所有内容
- page 页面
- frame 框架
- selection 选择
- link 链接
- editable 可编辑
- image 图像
- video 视频
- audio 音频

示例参考 [Context Menus Sample](http://developer.chrome.com/extensions/examples/api/contextMenus/basic.zip) 

###[多功能框](http://developer.chrome.com/extensions/omnibox.html)

![多功能框](http://johnnyimages.qiniudn.com/chrome-omnibox.png)

Chrome把地址栏/搜索栏称为多功能框，通过chrome.omnibox API，他可以让扩展有另一个界面。通过API 可以设置一个特定的激活字符串，当这个字符串被键入多功能框时扩展便可以对其做出反应。在manifest.json中做如下声明：

	{
	  "omnibox": {
	    "keyword": "ext-"
	  }
	}

这部分代码会把ext-作为激活字符串，当用户键入`ext-`并按下SPACE键或者TAB键时扩展会被激活。激活字符串必须通过manifest.json文件声明，故也不能通过JavaScript来更改。

用户可以通过右键单击多功能框—–修改搜索引擎来更改。激活字符串是大小写敏感的，同时想为一个扩展声明多个激活字符串也是不可以的。

chrome.omnibox API可以让你添加激活字符串被键入之后的修改或者输入的事件处理器。

###[选项页面](http://developer.chrome.com/extensions/options.html)

选项页面是一个的常见的用户界面，在`chrome://extensions`里可以通过单击扩展右边的选项按钮来打开。通常这个页面会和存储API结合使用，以用来在计算机上为用户保存设置。而使用脚本通过`chrome.tabs` API来打开选项页面也是可以的。

声明选项页面：

	{
	  "name": "My extension",
	  ...
	  "options_page": "options.html",
	  ...
	}

###[覆写特定页](http://developer.chrome.com/extensions/override.html)

覆写特定页允许你完全替代一个以下指定页面（一个扩展程序只能重载一个页面）

- 书签管理器：通过访问`chrome://bookmarks`或者Chrome菜单打开的页面
- 历史：通过访问`chrome://history`或者Chrome菜单打开的页面
- 新选项卡：通过访问`chrome://newtab`或者新建选项卡出现的页面

这些被替换的页面必须在manifest.json文件中如下声明chrome_url_overrides域：

	{
	  "chrome_url_overrides": {
	    "bookmarks": "newBookmarkManager.html"
	  }
	}

**Note:** A single extension can override only one page. For example, an extension can't override both the Bookmark Manager and History pages.

###[桌面通知](http://open.chrome.360.cn/extension_dev/notifications.html)

请参考该文档 360开发文档 [桌面通知](http://open.chrome.360.cn/extension_dev/notifications.html)。

###[内容脚本](http://developer.chrome.com/extensions/content_scripts.html)

内容脚本是在网页中运行的脚本。这个脚本可以让你访问页面里相应的DOM元素，你可以像这样在manifest.json里通过指定content_scripts定义一个内容脚本：

	{
	  "content_scripts": [
	    {
	      "matches": ["http://www.google.com/*"],
	      "css": ["custom-google-styles.css"],
	      "js": ["custom-google-script-1.js", "custom-google-script-2.js"]
	    },
	    {
	      "matches": ["http://*"],
	      "css": ["global-styles.css"],
	      "js": ["global-script.js"]
	    }
	  ]
	}

你也可以用通过chrome.tabs API以动态的把JavaScript或者CSS注入网页。

content script跟页面page共用同一份页面的dom，也就是说content script可以直接去访问或修改当前页面的dom，但是注意了，它们只是共享了dom的访问，js处理本身却是在两个不同的沙盒中运行的，所以并不能互调各自的js代码。

如下处理是在当前页面中插入一个div节点：

	var element = document.body.firstChild;
	var div = document.createElement("div");
	document.body.insertBefore(div, element);

在content script中可以通过消息机制跟background交互，如在content script监听消息：

	chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {});

在background发送消息：

	chrome.tabs.sendRequest(tab.id, data, function(data) {});

同样，在background.js可以用同样的方法来监听消息。在content script中通过如下方法发送消息：

	chrome.extension.sendRequest(data, function(data) {});

content script除了跟background可以交互，跟web page本身也可以有信息交互。一方面content script可以直接访问page的dom，同时还可以通过dom的Event来跟页面进行交互。 

content script中绑定事件：

	document.addEventListener("EventName",function() {});

web page中如何发送事件给content script呢？如下：

	var ev = document.createEvent('HTMLEvents'); 
	ev.initEvent('EventName', false, false);
	document.dispatchEvent(ev);

反之，web page中绑定事件，content script中触发事件的话同上面处理一样，也成立。

**内容脚本有以下限制：**

- 不能使用chrome.* API （[chrome.extension](http://developer.chrome.com/extensions/extension.html)的部分除外）
- 不能使用由扩展脚本定义的变量或函数
- 不能使用由网页所定义的变量或函数
- 不能使用由其他内容脚本定义的变量或函数
- 内容脚本可以通过消息传递间接的使用chrome.* API，或者是和扩展脚本交互。

###`chrome.*.APIs`

常用的API如下：

- [chrome.tabs](http://developer.chrome.com/extensions/tabs.html) 标签页：新建、刷新、关闭、访问和操控标签页
- [chrome.history](http://developer.chrome.com/extensions/history.html) 历史：访问用户浏览历史
- [chrome.bookmarks](http://developer.chrome.com/extensions/bookmarks.html) 书签：添加、编辑、移除和搜索用户书签
- [chrome.events](http://developer.chrome.com/extensions/events.html) 事件：监听或者管理浏览器发生的事件
- [chrome.commands](http://developer.chrome.com/extensions/commands.html) 命令：添加或者改变键盘命令
- [chrome.contextMenus](http://developer.chrome.com/extensions/contextMenus.html) 右键：添加条目到右键下文菜单
- [chrome.omnibox](http://developer.chrome.com/extensions/omnibox.html) 多功能框（地址栏）：添加多功能框关键字，使用户可以向扩展发送指令或者激活扩展

请参考Chrome API文档：

- [Chrome Platform APIs](http://developer.chrome.com/extensions/api_index.html)- [Web APIs](http://developer.chrome.com/extensions/api_other.html)

###[权限](http://developer.chrome.com/extensions/permission_warnings.html)

有些Chrome API的功能必须要在manifest.json文件中声明相关权限才能被调用，通过在permissions 域中把值设成相应权限名称，或者是通识符组成的数组。

**Note:** You don't see permission warnings when you load an unpacked extension. You get permission warnings only when you install an extension from a .crx file.

如果在扩展中需要以下权限：

	"permissions": [
	  "http://api.flickr.com/"
	]

在安装扩展时，通常会弹出如下警告：

![弹出如下警](http://johnnyimages.qiniudn.com/chorme-permission-alert.png)

申明权限的代码如下：

	{
	  "permissions": [
	    "contextMenus",
	    "tabs",
	    "https://google.com/*",
	    "https://developer.mozilla.org/*"
	  ]
	}

在这一段声明代码中，数组中的头两个字符串是分别用来为chrome.contextMenus和chrome.tabs  的API授权的，最后的两个字符串则是用来匹配以 https://google.com/ 和 https://developer.mozilla.org/ 开头的地址。

###[消息交互](https://developer.chrome.com/extensions/messaging.html)

Reference: <http://my.oschina.net/hierick/blog/136313>

popup.htm,background.htm,content_scripts 之间大体上分为两种交互方式：直接调用和消息通信。

#### 直接调用
popup.htm与background.htm 里面的数据可以直接调用，例如：

	var  backgroundWindow = chrome.extension.getBackgroundPage();

此时，popup.htm页面就拥有了background.htm的整个对象，只需要获取一次。如果background.htm里面有计划任务，数据一直在变，可以通过backgroundWindow变量，直接使用。但是如果background.htm里面的文档也在变化，popup.htm想要直接使用background.htm文档页面，就不行，必须要实时刷新文档页面，可以采用定时器实时的把background.htm的页面，刷新到popup.htm页面来。

	setInterval(function(){
		document.body.innerHTML = backgroundWindow.document.body.innerHTML;
		popup.BindEvents();
	},1000);

#### 消息通信

Communication between extensions and their content scripts works by using message passing. Either side can listen for messages sent from the other end, and respond on the same channel. 

**扩展的消息通信机制：**

![扩展的工作原理](http://johnnyimages.qiniudn.com/chrome-extension-principle.png)

发送消息使用接口[chrome.runtime.sendMessage](http://developer.chrome.com/extensions/runtime.html#method-sendMessage) 。该接口向扩展内的其它监听者发送一条消息，此消息发送后会触发扩展内每个页面的[chrome.extension.onMessage](http://developer.chrome.com/extensions/runtime.html#event-onMessage)事件。不能使用[chrome.runtime.sendMessage](http://developer.chrome.com/extensions/runtime.html#method-sendMessage)方法发送消息到内容页，而需要使用[chrome.tabs.sendMessage](http://developer.chrome.com/extensions/tabs.html#method-sendMessage)，调用该接口会触发指定tabId的[chrome.runtime.onMessage](http://developer.chrome.com/extensions/runtime.html#event-onMessage)事件。[chrome.extension](http://developer.chrome.com/extensions/extension.html)中关于消息通信的接口基本都已废除，取而代之的是[chrome.runtime](http://developer.chrome.com/extensions/runtime.html)中的接口。

**简单的一次性请求：**

Sending a request from a content script looks like this:

	chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
	  console.log(response.farewell);
	});

Sending a request from the extension to a content script looks very similar, except that you need to specify which tab to send it to. This example demonstrates sending a message to the content script in the selected tab.

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
	    console.log(response.farewell);
	  });
	});

On the receiving end, you need to set up an [runtime.onMessage](http://developer.chrome.com/extensions/runtime.html#event-onMessage) event listener to handle the message. This looks the same from a content script or extension page.

	chrome.runtime.onMessage.addListener(
	  function(request, sender, sendResponse) {
	    console.log(sender.tab ?
	                "from a content script:" + sender.tab.url :
	                "from the extension");
	    if (request.greeting == "hello")
	      sendResponse({farewell: "goodbye"});
	  });

**Note:** If multiple pages are listening for onMessage events, only the first to call sendResponse() for a particular event will succeed in sending the response. All other responses to that event will be ignored.

**长连接**

Sometimes it's useful to have a conversation that lasts longer than a single request and response. In this case, you can open a long-lived channel from your content script to an extension page, or vice versa, using [runtime.connect](http://developer.chrome.com/extensions/runtime.html#method-connect) or [tabs.connect](http://developer.chrome.com/extensions/tabs.html#method-connect) respectively. The channel can optionally have a name, allowing you to distinguish between different types of connections.

When establishing a connection, each end is given a [runtime.Port](http://developer.chrome.com/extensions/runtime.html#type-Port) object which is used for sending and receiving messages through that connection.

在内容脚本中打开一个信道，并从扩展页收发数据：

	var port = chrome.runtime.connect({name: "knockknock"});
	port.postMessage({joke: "Knock knock"});
	port.onMessage.addListener(function(msg) {
	  if (msg.question == "Who's there?")
	    port.postMessage({answer: "Madame"});
	  else if (msg.question == "Madame who?")
	    port.postMessage({answer: "Madame... Bovary"});
	});

扩展页向内容页发送数据需要调用[tabs.connect](http://developer.chrome.com/extensions/tabs.html#method-connect)接口，并指定tabId。

在扩展页中监听连接事件，并收发消息可参考：

	chrome.runtime.onConnect.addListener(function(port) {
	  console.assert(port.name == "knockknock");
	  port.onMessage.addListener(function(msg) {
	    if (msg.joke == "Knock knock")
	      port.postMessage({question: "Who's there?"});
	    else if (msg.answer == "Madame")
	      port.postMessage({question: "Madame who?"});
	    else if (msg.answer == "Madame... Bovary")
	      port.postMessage({question: "I don't get it."});
	  });
	});

同样，监听断开事件请使用[runtime.Port.onDisconnect](http://developer.chrome.com/extensions/runtime.html#property-Port-onDisconnect)事件。 This event is fired either when the other side of the channel manually calls [runtime.Port.disconnect](http://developer.chrome.com/extensions/runtime.html#property-Port-disconnect), or when the page containing the port is unloaded (for example if the tab is navigated). onDisconnect is guaranteed to be fired only once for any given port.

**跨扩展通信**

和内部通信一样，只是需要额外指定扩展的Id，请参考相关文档。监听消息和连接使用[runtime.onMessageExternal](http://developer.chrome.com/extensions/runtime.html#event-onMessageExternal) or [runtime.onConnectExternal](http://developer.chrome.com/extensions/runtime.html#event-onConnectExternal)接口。

发送消息如：

	// The ID of the extension we want to talk to.
	var laserExtensionId = "abcdefghijklmnoabcdefhijklmnoabc";

	// Make a simple request:
	chrome.runtime.sendMessage(laserExtensionId, {getTargetData: true},
	  function(response) {
	    if (targetInRange(response.targetData))
	      chrome.runtime.sendMessage(laserExtensionId, {activateLasers: true});
	  });

**和Web页面通信**

与扩展间通信类似，只是需要在扩展的manifest.json指定允许通信的URL：

	"externally_connectable": {
	  "matches": ["*://*.example.com/*"]
	}

**和本地应用通信**

请参考相关文档。

### 内容安全策略CSP

出于安全考略，Chrome扩展系统遵循[Content Security Policy(CSP)](http://dvcs.w3.org/hg/content-security-policy/raw-file/tip/csp-specification.dev.html) 。

默认策略限制：

#### Eval和相关函数被禁用

如以下代码都不起作用：

	alert(eval("foo.bar.baz"));
	window.setTimeout("alert('hi')", 10);
	window.setInterval("alert('hi')", 10);
	new Function("return foo.bar.baz");

需要改为以下代码：

	alert(foo && foo.bar && foo.bar.baz);
	window.setTimeout(function() { alert('hi'); }, 10);
	window.setInterval(function() { alert('hi'); }, 10);
	function() { return foo && foo.bar && foo.bar.baz };

#### 不执行Inline JavaScript

This restriction bans both inline `<script>` blocks and inline event handlers (e.g. `<button onclick="...">`).

#### 只加载本地脚本和资源

只有扩展包内的脚本和资源才会被加载！通过Web即时下载的将不会被加载！ 这确保您的扩展只执行已经打包在扩展之中的可信代码，从而避免了线上的网络攻击者通过恶意重定向您所请求的Web资源所带来的安全隐患。

###[NPAPI Plugin](http://developer.chrome.com/extensions/npapi.html)

在IE中，使用ActiveX技术来访问本地组件，如ocx，dll等，在Chrome中对应的技术为NPAPI Plugin。开发过程请参考[NPAPI插件开发详细记录：用VS2010开发NPAPI插件步骤](http://blog.csdn.net/z6482/article/details/7660748)。

使用插件时，首先需要在manifest.json中定义如下关于插件的属性：

	"plugins": [
	    { "path": "plugin1.dll", "public": true },
	    { "path": "plugin2.dll" }
	]

当chrome插件加载后，就可以在html页面中使用所定义的NPAPI插件了，假设插件的mime-type是x-plugin1时我们可以这样去调用NPAPI插件：

	<embed type="application/x-plugin1" id="pluginId">
	<script>
	  var plugin = document.getElementById("pluginId");
	  var result = plugin.PluginMethod(); //调用plugin中定义的方法 
	</script>

## 开发过程

**注意：** 出于安全考虑，javascript必须与html分开存放。

### 确定扩展类型

- 如果扩展时针对所有页面的，请选择BrowserAction；否则选择PageAction。在manifest中声明`browser_action`或者`page_action`。
- 确定需要使用哪些chrome API，并在`permissions`中声明相应的权限。
- 确定后台页(`background`)、内容脚本(`content_scripts`)及其他属性。如：

[chrome-app-samples / browser](https://github.com/GoogleChrome/chrome-app-samples/tree/master/browser) 的`manifest.json`文件如下：

	{
	  "manifest_version": 2,
	  "name": "Browser Sample",
	  "minimum_chrome_version": "24.0.1307.0",
	  "version": "1.1",
	  "icons": {
	    "16": "icon_16.png",
	    "128": "icon_128.png"
	  },
	  "app": {
	    "background": {
	      "scripts": ["main.js"]
	    }
	  },
	  "permissions": [
	    "webview"
	  ]
	}

### [调试](http://developer.chrome.com/extensions/tut_debugging.html)

**加载程序：**

- 打开 chrome://extensions。确保 chrome://extensions 中“开发者模式”选项已勾选。
- 选择Chrome浏览器中扩展程序里的开发者模式，点击“加载正在开发的扩展程序”选中你的扩展所在的文件夹。

**调试：**

调试背景页如下图：

	![调试背景页](http://johnnyimages.qiniudn.com/chorome-debug.png)

弹出Dev Tools之后，调试步骤和调试普通的网页一样。

调试内容页和调试普通网页类似，只不过内容页在Content Script标签页内，而非Sources标签页，如下图：

	![调试内容页](http://johnnyimages.qiniudn.com/chrome-debug-content-script.png)

调试弹出页，右击Browser Action或者Page Action，选择“审核弹出页”。

可以使用以下方法访问扩展页面：

1. 在扩展管理页面上(chrome://extensions)，找到应用（扩展）ID;
2. 查看应用（扩展）中的文件，使用类似这样的格式访问 chrome-extension://extensionId/filename
3. 使用开发者工具设置脚本断点，单步调试，查看变量
4. 使用控制台命令 location.reload(true)来重新加载当前的调试页面

###[打包和发布](http://developer.chrome.com/extensions/packaging.html)

- 打开 chrome://extensions。确保开发模式已被勾选。
- 点击“打包扩展程序...”。选择扩展根目录，如果是首次打包忽略第二项“私有秘钥文件”，打包后会自动生成密钥文件，「密钥文件名」.pem。

	![打包扩展程序](http://johnnyimages.qiniudn.com/chrome-package.png)

- 点击 “打包扩展程序”。除了 .pem 文件之外，会生成扩展文件 「扩展文件名」.crx。请妥善保存密钥文件，当需要再次打包（更新扩展）时，则在“私有密钥文件”中选择该密钥文件。

之后你变可以将打包好的扩展程序发布到 [Chrome WebStore](https://chrome.google.com/webstore/developer/dashboard)中。

现在注册开发者账户需要5$的注册费用，价格本事不是问题，对于大陆用户来说，支付成了大问题。为了使用大陆信用卡支付，请参考以下方法：

- [mournelichten: 【教程】如何注册GOOGLE WALLET(需要一定英语水平)](http://mournelichten.blogspot.com/2012/04/google-wallet.html)
- [现在Google Wallet不允许添加大陆信用卡了吗？ - V2EX](http://www.v2ex.com/t/81031)
- [开通 Google Wallet 最简单的方法，无需信用卡 | 伊卡木](http://ikamu.me/6773)

**Packaging at the command line：**

	chrome.exe --pack-extension=C:\myext --pack-extension-key=C:\myext.pem

其中，--pack-extension指定扩展所在的文件夹，--pack-extension-key指定私钥所在的文件位置，如果你不想看到对话框，请使用 --no-message-box。更多参数设置请参考 [CRX Package Format](https://developer.chrome.com/extensions/crx.html)。

发布请参考 [Publishing Your App - Chrome Web Store](https://developers.google.com/chrome/web-store/docs/publish?hl=zh-CN).

## FAQ

### 权限问题

> Refused to execute JavaScript URL because it violates the following Content Security Policy directive: “script-src ‘self’ chrome-extension-resource

一般类似这样的报错有这样两种可能：

第一、在你的manifest.json里面要加入 `"permissions": ["tabs","https://*/*"]`这样的配置

第二、在你的html代码里面（如popup.htm,background.htm），a标签之类的在`onclick=""` ，`href="javascript:...;"`,加了Inline(内敛)js脚本。在实际使用中，A标签的`href="javasript:;"`很常见，即使错误控制台有这样的报警也不用理会。

## 参考

### 文档

- [chrome extensions](http://developer.chrome.com/extensions/index.html)
- [建立 Chrome 扩展程序](https://crxdoc-zh.appspot.com/extensions/getstarted.html)
- [360翻译的Chrome扩展开发文档](http://open.chrome.360.cn/extension_dev/overview.html)

### 教程

- [如何开发Chrome扩展程序](http://blog.jobbole.com/46608/)
- [手把手教你开发chrome扩展一：开发Chrome Extenstion其实很简单](http://www.cnblogs.com/walkingp/archive/2011/03/31/2001628.html)
- [Chrome插件开发进阶](http://blog.csdn.net/my_business/article/details/7711525)


### Sample

- [Sample Extensions](http://developer.chrome.com/extensions/samples.html)
- [kurrik / chrome-extensions](https://github.com/kurrik/chrome-extensions) Simple Chrome extensions that I haven't gotten around to putting into [chromium.org](http://chromium.org).
- [GoogleChrome / chrome-app-samples](https://github.com/GoogleChrome/chrome-app-samples) 官方Demo。
- [Getting Started: Building a Chrome Extension](https://developer.chrome.com/extensions/getstarted.html)
- [CoryG89 / MDNJump](https://github.com/CoryG89/MDNJump) The quickest way to look up something on the Mozilla Developer Network. Chrome extension.
- [sneezry / Dualx](https://github.com/sneezry/Dualx) QQ Client for Chrome.
- [xiongchuan86 / XPlayer](https://gitcafe.com/xiongchuan86/XPlayer/) 豆瓣音乐播放器。
- [krasimir/yez](https://github.com/krasimir/yez) Chrome extension that acts as terminal and task runner. 结合 NodeJS 完成该功能，使用 socket.io 通信。
    - [Chrome Killed the Terminal Star](http://flippinawesome.org/2014/06/09/chrome-killed-the-terminal-star/?-killed-the-terminal-star)

### Tools

#### 生成脚手架

源码地址：[yeoman / generator-chrome-extension](https://github.com/yeoman/generator-chrome-extension) Yeoman generator for Chrome Extensions 
 <http://yeoman.io>.

 #### Chrome Dev Editor

 - [Hands On with the New Chrome Dev Editor App](http://www.omgchrome.com/chrome-dev-editor-preview-app-released/)
 - [dart-lang/chromedeveditor](https://github.com/dart-lang/chromedeveditor)

**使用步骤：**

 - 安装node插件 `npm install -g generator-chrome-extension`
 - 在扩展所在目录下运行 `yo chrome-extension`

 可以使用 `--skip-install` 跳过bower和npm的自动安装，使用`--test-framework=[framework]`修改测试框架，默认为`mocha`，可以修改为`jasmine`。如果测试框架使用`generator-jasmine`，则需要先运行 `npm install -g generator-jasmine`。

**常用命令：**

	yo chrome-extension --skip-install --test-framework=jasmine
