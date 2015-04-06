layout: post
title: "Node Webkit Tutorial"
category: Node
tags: [node, webkit]
---

基于 node.js 和 chromium 的应用程序实时运行环境，可运行通过HTML5、CSS3、Javascript来编写的本地应用程序。node.js和webkit的结合体，webkit提供DOM操作，node.js提供本地化操作；且将二者的context完全整合，可在HTML代码中直接使用node.js的API。

在开发本地应用的时候，WebKit（现在是Blink）负责HTML5 UI 相关的部分，而Node.js负责本地的API接口，比如文件系统，网络，设备等。

See [nwjs](https://github.com/nwjs)

## Quick Start

脚手架生成器 [Dica-Developer/generator-node-webkit](https://github.com/Dica-Developer/generator-node-webkit)。

__File Structure:__

```
App 
|-- package.json
|-- index.html
|-- js/ 
| `-- … 
|-- css/ 
| `-- … 
|-- resources/ 
| `-- … 
`-- node_modules/ 
 `-- … 
```

<!-- more -->

__package.json:__

```json
{ 
 "dname": "nw-demo", 
 "window" : { 
 "width": 800, 
 "height": 600, 
 "toolbar" : false 
 }, 
 "main" : "index.html"
}
```

- "name" specifies app’s configuration directory’s name. On Linux app data will be stored in `~/.config/nw-demo`, on Mac OS X it is `~/Library/ Application Support`.
- "main" specifies initial page showed to user

Reference to [Manifest format](https://github.com/rogerwang/node-webkit/wiki/Manifest-format) — the format of package.json.

Write the app, __index.html__:

```
<html><head><title>Show Root Files</title></head> 
<body>
<script> 
    var generate = require('jade').compile([ 
     '- each file in files', 
     ' .file #{file}', 
    ].join('\n')); 
    
    require('fs').readdir('/', function(err, files) { 
     if (err) 
        document.write(err); 
     else 
        document.write(generate({ 
         'files': files 
         }); 
    });
    </script>
</body>
</html> 
```

__Package and run it:__

```shell
# Compress app to a zip archive 
$ zip -r app.zip /path/to/your/app/* 
# Then you can run it with nw
$ nw ./app.zip
```

Make a standalone package if you don’t want an extra install of node-webkit on user’s computer.

```shell
# On Linux 
$ cat /path/to/nw ./app.zip > app
# On Windows 
$ copy /b nw.exe+app.nw app.exe
```

## Integrates Node.js

See:

- [Using Node modules · rogerwang/node-webkit Wiki](https://github.com/rogerwang/node-webkit/wiki/Using-Node-modules)
- [Changes related to node · rogerwang/node-webkit Wiki](https://github.com/rogerwang/node-webkit/wiki/Changes-related-to-node)
- [Shell · rogerwang/node-webkit Wiki](https://github.com/rogerwang/node-webkit/wiki/Shell)

Node-Webkit的最大特点是集成了Node.js，可以直接调用该平台上的各种库。因为二者之间的函数调用和对象的互相访问都是直接的，所以性能较好。

It integrates node.js functions into WebKit.

```html
<html> 
<head> 
    <title>App</title> 
</head> 
<body> 
    <script> 
        var fs = require(‘fs’); 
            fs.readdir(…, function(…) { 
                for (var i in files) { 
                    document.write(files[i]); 
                } 
        }); 

        var os = require('os');
        document.write('Our computer is: ', os.platform());
    </script>
</body> 
</html> 
```

### node-main

See also [Node main · rogerwang/node-webkit Wiki](https://github.com/rogerwang/node-webkit/wiki/node-main)

The script will be running in Node's context which won't be destructed across page navigation in Webkit. So it can be used to write some 'background' or 'daemon' like code.


## JavaScript contexts

See:

- [Differences of JavaScript contexts · rogerwang/node-webkit Wiki](https://github.com/rogerwang/node-webkit/wiki/Differences-of-JavaScript-contexts)
- [Transfer objects between window and node · rogerwang/node-webkit Wiki](https://github.com/rogerwang/node-webkit/wiki/Transfer-objects-between-window-and-node)

Different windows of a node-webkit-based application have different JavaScript contexts, i.e. each window has its own global object and its own set of global constructors (such as Array or Object).

Node modules in node-webkit run in their own shared Node context. (Shared by default; however, you may explicitly add `'new-instance': true` to the options of [Window.open](https://github.com/rogerwang/node-webkit/wiki/Window#openurl-options) if you need your new window to have a separate Node.js context.)

## Thread

node-webkit is based on Chromium and node.js. 

__Merge node.js and Chromium’s message loop:__

_Chromium_ uses MessagePump* family to support its internal message loop. _node.js_ uses libuv for message loop. _node-webkit_ implements MessagePumpForUv to use
libuv for Chromium’s message loop.

__Insert node.js symbols into WebKit:__

WebKit initializes javascript context only on demand. node is initialized before entering message loop. Node’s symbols is transferred into WebKit’s context immediately after DOM is installed.

Node-Webkit 项目的核心思想就是在DOM中跑的代码能够直接调用Node.js中运行的代码，所以核心的部分是把二者跑在同一个线程中。需要把Chromium进程的事件循环和Node.js的事件循环合并在一起，并且把二者的V8 JS引擎环境（Context）合并起来。

Currently `child_process.fork` [is broken](https://github.com/rogerwang/node-webkit/issues/213) in node-webkit.

node.js functions live in the renderer thread:

![node-webkit-thread.png](http://johnnyimages.qiniudn.com/node-webkit-thread.png)

## Native UI

See [Native UI API Manual · rogerwang/node-webkit Wiki](https://github.com/rogerwang/node-webkit/wiki/Native-UI-API-Manual)

### Window

See:

- [Window · rogerwang/node-webkit Wiki](https://github.com/rogerwang/node-webkit/wiki/Window)
- [Play with window · rogerwang/node-webkit Wiki](https://github.com/rogerwang/node-webkit/wiki/Play-with-window)

```javascript
// Load native UI library
var gui = require('nw.gui'); //or global.window.nwDispatcher.requireNwGui() (see https://github.com/rogerwang/node-webkit/issues/707)

// Get the current window
var win = gui.Window.get();

// Listen to the minimize event
win.on('minimize', function() {
  console.log('Window is minimized');
});

// Minimize the window
win.minimize();

// Unlisten the minimize event
win.removeAllListeners('minimize');

// Create a new window and get it
var new_win = gui.Window.get(
  window.open('https://github.com')
);

// And listen to new window's focus event
new_win.on('focus', function() {
  console.log('New window is focused');
});
```

### Menu

See:

- [Menu · rogerwang/node-webkit Wiki](https://github.com/rogerwang/node-webkit/wiki/Menu)
- [Getting Started with node webkit · rogerwang/node-webkit Wiki](https://github.com/rogerwang/node-webkit/wiki/Getting-Started-with-node-webkit)

```html
<html>
<head>
  <title> Menu </title>
</head>
<body>
<script>
// Load native UI library
var gui = require('nw.gui');

// Create an empty menu
var menu = new gui.Menu();

// Add some items with label
menu.append(new gui.MenuItem({ label: 'Item A' }));
menu.append(new gui.MenuItem({ label: 'Item B' }));
menu.append(new gui.MenuItem({ type: 'separator' }));
menu.append(new gui.MenuItem({ label: 'Item C' }));

// Remove one item
menu.removeAt(1);

// Iterate menu's items
for (var i = 0; i < menu.items.length; ++i) {
  console.log(menu.items[i]);
}

// Add a item and bind a callback to item
menu.append(new gui.MenuItem({
label: 'Click Me',
click: function() {
  // Create element in html body
  var element = document.createElement('div');
  element.appendChild(document.createTextNode('Clicked OK'));
  document.body.appendChild(element);
}
}));

// Popup as context menu
document.body.addEventListener('contextmenu', function(ev) { 
  ev.preventDefault();
  // Popup at place you click
  menu.popup(ev.x, ev.y);
  return false;
}, false);

// Get the current window
var win = gui.Window.get();

// Create a menubar for window menu
var menubar = new gui.Menu({ type: 'menubar' });

// Create a menuitem
var sub1 = new gui.Menu();


sub1.append(new gui.MenuItem({
label: 'Test1',
click: function() {
  var element = document.createElement('div');
  element.appendChild(document.createTextNode('Test 1'));
  document.body.appendChild(element);
}
}));

// You can have submenu!
menubar.append(new gui.MenuItem({ label: 'Sub1', submenu: sub1}));

//assign the menubar to window menu
win.menu = menubar;

// add a click event to an existing menuItem
menu.items[0].click = function() { 
    console.log("CLICK"); 
};

</script>  
</body>
</html>
```

## Security

See [Security · rogerwang/node-webkit Wiki](https://github.com/rogerwang/node-webkit/wiki/Security)

node-webkit adds Node.js support and enhancement in DOM for trusted code and content. For untrusted code and content, it should remain in a normal frame or iframe, which is the same as the one in browser. So there are 2 kinds of frames in node-webkit: Node frame and normal frame.

## Notification

See [pbojinov/nodeifications](https://github.com/pbojinov/nodeifications) Simple cross platform desktop notifications for node-webkit.

## Debug

See:

- [Debugging with devtools · rogerwang/node-webkit Wiki](https://github.com/rogerwang/node-webkit/wiki/Debugging-with-devtools)
- [Debugging with Sublime Text 2 and 3](https://github.com/rogerwang/node-webkit/wiki/Debugging-with-Sublime-Text-2-and-3)
- [The nw protocol](https://github.com/rogerwang/node-webkit/wiki/The-nw-protocol)
- [Crash dump](https://github.com/rogerwang/node-webkit/wiki/Crash-dump)

## Tutorial

See:

- [Home · rogerwang/node-webkit Wiki](https://github.com/rogerwang/node-webkit/wiki)
- [Introduction to node-webkit (slides)](https://speakerdeck.com/u/zcbenz/p/node-webkit-app-runtime-based-on-chromium-and-node-dot-js)
- [【开源专访】Node-Webkit作者王文睿：桌面应用的全新开发方式-CSDN.NET](http://www.csdn.net/article/2014-01-08/2818066-Node-Webkit)
- [开始 node-webkit 前，你应该知道的](http://yedingding.com/2014/07/28/node-webkit-intro.html)

### example

- [zcbenz/nw-sample-apps](https://github.com/zcbenz/nw-sample-apps)
- [List of apps and companies using node webkit · rogerwang/node-webkit Wiki](https://github.com/rogerwang/node-webkit/wiki/List-of-apps-and-companies-using-node-webkit)
