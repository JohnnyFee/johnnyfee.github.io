---
layout: post
title: "Node Browserify"
category: Node
tags: [node, browserify]
--- 

简而言之，Broserfiy 是使 Node 风格的模块能够在浏览器中运行的工具。

## Setup

    npm install -g browserify
    npm install deamdify（可选）
    npm install deglobalify（可选）

## Quick Start

main.js:

    // 使用相对路径加载模块。
    var foo = require('./foo.js');

    // 使用 npm 机制加载 node_modules/ 下的模块。
    var gamma = require('gamma');
    
    var elem = document.getElementById('result');
    var x = foo(100) + bar('baz');
    elem.textContent = gamma(x);


foo.js:

    // 导出模块，供 main.js 使用
    module.exports = function (n) { return n * 111 }

browserify 化：

    $ browserify main.js > bundle.js

index.html:

    <script src="bundle.js"></script>

<!--more-->

## modules

很多没有整 IO npm 模块都可以经过 Browserify 处理后被浏览器使用，有不少 npm 模块同时提供了 Node 版本和 Browser 版本，如 [async.js](https://github.com/caolan/async/raw/master/lib/async.js)(使用暴露全局变量的方式)。

## require

要想在页面中只通过引用 bundle.js 来使用 require() 方法，则该 bundle.js 必须是通过 browserify 的 -r 参数编译过的，且要在页面中 require 的模块必须是已经编译到 bundle.js 里面的。

若使用 -r 参数时指定了模块名，如 `-r ./bar.js:bar-global -r ./foo.js:foo-global -o bundle.js`。

- 在内部，可使用相对路径和模块名两种方式来 require 模块。
    
    例如，在 foo.js 中可以使用 `require('bar-global')` 也可以使用 `require('./bar.js')` 来获取 bar 模块。

- 在外部，只能使用模块名来 require 模块。
    
    例如，在 index.html 中，只能使用 `require('bar-global')` ，而不能使用 `require('./bar.js')` 来获取 bar 模块。

## auto-recompile

Running a command to recompile your bundle every time can be slow and tedious. Luckily there are many tools to solve this problem.

### with webstorm file watcher

我们可以通过 WebStorm 的 File Watcher 来实时调用 browserify 编译成 JavaScript 文件，配置步骤如下：

导航到 File -> Settings -> File Watcher，进行如下配置：

- Name browserify
- Immediate file synchronization

    - 选中，可实时监测文件变化，一旦监测到文件变化，就会启动以下设置的 browserify 编译。
    - 不选中，当保存文件或者焦点不在 WebStorm 时，启动以下设置的 browserify 编译。
    - File type JavaScript files
- Scope

    点击旁边的“…”，打开设置窗口：

    ![broserify-webstorm.png](http://johnnyimages.qiniudn.com/broserify-webstorm.png)

    为新的 Scope 起个名字。

    选择要监视的文件或者文件夹。

###　[watchify](https://npmjs.org/package/watchify)

Here is a handy configuration for using watchify and browserify with the package.json "scripts" field:

    {
      "build": "browserify browser.js -o static/bundle.js",
      "watch": "watchify browser.js -o static/bundle.js --debug --verbose",
    }

`--verbose` is used to print a message.

To build the bundle for production do npm run build and to watch files for during development do npm run watch.

### beefy

If you would rather spin up a web server that automatically recompiles your code when you modify it, check out [beefy](http://didact.us/beefy/).

Just give beefy an entry file:

    beefy main.js

and it will set up shop on an http port.

-  [chrisdickinson/beefy](https://github.com/chrisdickinson/beefy)
-  [B E E F Y](http://didact.us/beefy/)

### browserify-middleware, enchilada

If you are using express, check out [browserify-middleware](https://www.npmjs.org/package/browserify-middleware) or [enchilada](https://www.npmjs.org/package/enchilada).

They both provide middleware you can drop into an express application for serving browserify bundles.

### grunt

If you use grunt, you'll probably want to use the [grunt-browserify](https://www.npmjs.org/package/grunt-browserify) plugin.

## transforms

[list of transforms · substack/node-browserify Wiki](https://github.com/substack/node-browserify/wiki/list-of-transforms)

### coffeeify

To use [coffeescript](http://coffeescript.org/) for example, you can use the [coffeeify](https://www.npmjs.org/package/coffeeify) transform. Make sure you've installed coffeeify first with npm install coffeeify then do:

    $ browserify -t coffeeify main.coffee > bundle.js

or with the API you can do:

    var b = browserify('main.coffee');
    b.transform('coffeeify');

### brfs

[substack/brfs](https://github.com/substack/brfs)

使用 fs 模块接口的 `readFileSync` 方法和 `readFile` 方法来读取文件，应用到 browserify 时的转换器。

### jadeify

[domenic/jadeify](https://github.com/domenic/jadeify)

A simple browserify transform for turning .jade files into template functions. 

### reactify

[andreypopp/reactify](https://github.com/andreypopp/reactify)

Browserify transform for JSX (superset of JavaScript used in React library by Facebook).

### writing your own

Transforms implement a simple streaming interface. Here is a transform that replaces $CWD with the process.cwd():

    var through = require('through2');
    
    module.exports = function (file) {
        return through(function (buf, enc, next) {
            this.push(buf.toString('utf8').replace(/\$CWD/g, process.cwd());
            next();
        });
    };

The transform function fires for every file in the current package and returns a transform stream that performs the conversion. The stream is written to and by browserify with the original file contents and browserify reads from the stream to obtain the new contents.

Simply save your transform to a file or make a package and then add it with -t ./your_transform.js.

For more information about how streams work, check out the [stream handbook](https://github.com/substack/stream-handbook).

### other

- hbsify

### reusable components

Putting these ideas about code organization together, we can build a reusable UI component that we can reuse across our application or in other applications.

Usage:

    var Widget = require('./widget.js');
    var w = Widget();
    w.appendTo('#container');

Implements:

    var fs = require('fs');
    var domify = require('domify');

    // It's often useful to emit events. Here's how we can emit events using the built-in events module and the inherits module:
     var  inherits  =  require ( 'inherits' );  
     var  EventEmitter  =  require ( 'events' ). EventEmitter ; 

    var html = fs.readFileSync(__dirname + '/widget.html', 'utf8');

    module.exports = Widget;

    function Widget (opts) {
        if (!(this instanceof Widget)) return new Widget(opts);
        this.element = domify(html);
    }

    Widget.prototype.appendTo = function (target) {
        if (typeof target === 'string') target = document.querySelector(target);
        target.appendChild(this.element);
    };

Handy javascript constructor tip: you can include a this instanceof Widget check like above to let people consume your module with new Widget or Widget(). 

Creating HTML elements procedurally is fine for very simple content but gets very verbose and unclear for anything bigger. Luckily there are many transforms available to ease importing HTML into your javascript modules.

Let's extend our widget example using [brfs](https://npmjs.org/package/brfs). We can also use [domify](https://npmjs.org/package/domify) to turn the string that fs.readFileSync() returns into an html dom element。

Our widget will load a widget.html, so let's make one:

    <div class="widget">
      <h1 class="name"></h1>
      <div class="msg"></div>
    </div>

If setting element attributes and content gets too verbose, check out [hyperglue](https://npmjs.org/package/hyperglue).

Now finally, we can toss our widget.js and widget.html into node_modules/app-widget. Since our widget uses the [brfs](https://npmjs.org/package/brfs) transform, we can create a package.json with:

    {
      "name": "app-widget",
      "version": "1.0.0",
      "private": true,
      "main": "widget.js",
      "browserify": {
        "transform": [ "brfs" ]
      },
      "dependencies": {
        "brfs": "^1.1.1",
        "inherits": "^2.0.1"
      }
    }

And now whenever we require('app-widget') from anywhere in our application, brfs will be applied to our widget.js automatically! Our widget can even maintain its own dependencies. This way we can update dependencies in one widgets without worrying about breaking changes cascading over into other widgets.

## UMD

[Browserify and the Universal Module Definition](http://dontkry.com/posts/code/browserify-and-the-universal-module-definition.html)

Browserify 不仅能够转化 Node 风格的模块，也可以消费 AMD、 Global Variables、ES6。

### CommonJS

Browserify works natively with the CommonJS module definition:

    browserify main.js -o bundle.js

which will produce a bundle.js file.

It can be included on your page with:

    <script src="bundle.js"></script>

### AMD

Browserify can consume AMD modules with [deamdify](https://npmjs.org/package/deamdify):

    npm install deamdify
    browserify -t deamdify main.js -o bundle.js

### Global Variables

Browserify can consume globals as well with [deglobalify](https://npmjs.org/package/deglobalify):

    npm install deglobalify
    browserify -t deglobalify main.js -o bundle.js

### ES6

What about harmony? Yep! Use [es6ify](https://npmjs.org/package/es6ify):

    npm install es6ify
    browserify -t es6ify main.js -o bundle.js

### Browserify Universally

You can use multiple transforms in one swoop and have universal module access:

    npm install deamdify es6ify deglobalify
    browserify -t deamdify -t es6ify -t deglobalify main.js -o bundle.js

### standalone

[Forbes Lindesay — Standalone Browserify Builds](http://www.forbeslindesay.co.uk/post/46324645400/standalone-browserify-builds)

You can generate UMD bundles with --standalone that will work in node, the browser with globals, and AMD environments.

Just add --standalone NAME to your bundle command:

    $ browserify foo.js --standalone xyz > bundle.js

This command will export the contents of foo.js under the external module name xyz. If a module system is detected in the host environment, it will be used. Otherwise a window global named xyz will be exported.

You can use dot-syntax to specify a namespace hierarchy:

    $ browserify foo.js --standalone foo.bar.baz > bundle.js

If there is already a foo or a foo.bar in the host environment in window global mode, browserify will attach its exports onto those objects. The AMD and module.exports modules will behave the same.

Note however that standalone only works with a single entry or directly-required file.

## package.json

在写一个 npm 模块时，可以在 package.json 中按照以下格式编写同时兼容 browser 和 node 环境的模块。

<https://github.com/substack/browserify-handbook#packagejson>

## other tools

参考 [Max Ogden Blogotronz](http://maxogden.com/node-packaged-modules.html)。

### Browserify CDN

在线 Browserify

[![](http://maxogden.com/media/browserify-cdn.png)](http://wzrd.in/)

### RequireBin

类似于 [JSFiddle](http://jsfiddle.net/) and [JSBin](http://jsbin.com/)，只不过 RequireBin is built on top of browserify-cdn and therefore provides access to the wealth of modules on npm. 

[![](http://maxogden.com/media/requirebin.png)](http://requirebin.com/)

### npmsearch

类似于 <https://www.npmjs.org/> 的 Node 模块搜索网站。

[![](http://maxogden.com/media/npmsearch.png)](http://npmsearch.com/)

## source map

[browserify v2 adds source maps](http://thlorenz.com/blog/browserify-sourcemaps)

Browserify supports a --debug/-d flag and opts.debug parameter to enable source maps. Source maps tell the browser to convert line and column offsets for exceptions thrown in the bundle file back into the offsets and filenames of the original sources.

If you prefer the source maps be saved to a separate .js.map source map file, you may use [exorcist](https://github.com/thlorenz/exorcist) in order to achieve that. It's as simple as:

    $ browserify main.js --debug | exorcist bundle.js.map > bundle.js 
    

Learn about additional options [here](https://github.com/thlorenz/exorcist#usage).

### 关于 sourcemap 断点

在源文件中下断点，断点触发时，源文件和 bundle 都会定位到下断点处，只是只能在源文件中进一步调试，而 bundle 只会一直停在断点处。


### sourcemap 中文乱码

该问题由 [lmm0591 (李明敏)](https://github.com/lmm0591) 找到解决方案，目前已向该项目提交 Commit。

目前有两种解决办法：
    
- 直接给 bundle.js 中的 sourceMappingURL 添加 charset=utf-8，如下：
    
    sourceMappingURL=data:application/json;charset=utf-8;base64, …

- 修改 browserify 源码：
    
    - 如果使用的是全局 browserify 编译生成 bundle.js，则修改：`C:\Users\用户名\AppData\Roaming\npm\node_modules\browserify\node_modules\browser-pack\node_modules\combine-source-map\node_modules\inline-source-map\index.js`。
    
    - 如果使用的是某个指定目录下的 browserify 编译生成 bundle.js，则修改：browserify 安装路径 `\node_modules\browser-pack\node_modules\combine-source-map\node_modules\inline-source-map\index.js`。

    将 `Generator.prototype.inlineMappingUrl` 方法的实现

        Generator.prototype.inlineMappingUrl = function () {
          return '//# sourceMappingURL=data:application/json;base64,' + this.base64Encode();
        };

    修改为：

        return '//# sourceMappingURL=data:application/json;charset=utf-8;base64,' + this.base64Encode();

    修改后重新生成的 bundle.js 中的 sourceMappingURL  会自动包含“charset=utf-8”。

## other options

- --outfile   -o  输出 bundle 文件。
- --require   -r  需要在外部 require() 模块时用此参数。
- --entry -e  指定入口文件，此参数可省略，直接写入口文件即可。
    
    如：

        browserify --entry main.js --outfile bundle.js
    
    相当于：
    
        browserify main.js --outfile bundle.js

- --ignore    -i  在 bundle 中用空的模块定义替换指定的文件，require() - 这个模块得到的是空对象。
- --exclude   -u  在 bundle 中省略掉指定的文件，require() - 这个模块会提示找不到该模块的错误。
- --external  -x  引用其他 bundle 文件。
- --transform -t  使用一个转换模块。比如 -t deamdify，deamdify - 是一个转换模块，作用是将 AMD 转换成 CommonJS。
- --command   -c  使用一个转换命令，与 -t 的功能一样。
    
    比如： 

        browserify -c 'coffee -sc' main.coffee > bundle.js
    
    相当于：
    
    browserify -t coffeeify main.coffee > bundle.js

- --standalone    -s  生成 UMD 形式的 bundle。
- --debug -d  生成 sourcemap。

### ignoring and excluding

In browserify parlance, "ignore" means: replace the definition of a module with an empty object. "exclude" means: remove a module completely from a dependency graph.

Another way to achieve many of the same goals as ignore and exclude is the "browser" field in package.json, which is covered elsewhere in this document.

[ignoring and excluding](https://github.com/substack/browserify-handbook#ignoring-and-excluding)

## 原理

- [How Browserify Works](http://benclinkinbeard.com/posts/how-browserify-works/)

## bower

[eugeneware/debowerify](https://github.com/eugeneware/debowerify) A browserify transform to enable the easy use of bower components in browserify client javascript projects. This can be used in conjunction with deamdify to require AMD components from bower as well.

- [node.js - Browserify and bower. Canonical approach - Stack Overflow](http://stackoverflow.com/questions/23691795/browserify-and-bower-canonical-approach)
- [bower init - difference between amd, es6, globals and node - Stack Overflow](http://stackoverflow.com/questions/22674018/bower-init-difference-between-amd-es6-globals-and-node)

## tutorial

- [Browserify](http://browserify.org/)
- [Browserify Articles](http://browserify.org/articles.html)
- [substack/browserify-handbook](https://github.com/substack/browserify-handbook#node-packaged-manuscript)  This document written by @substack covers how to use browserify to build modular applications. Recommended as a starting point.
- [Sharing code between Node.js and the browser](https://blog.codecentric.de/en/2014/02/cross-platform-javascript/) A detailed introduction to Browserify and Grunt.js and how to leverage Browserify to write code that runs on Node.js and in the browser.
- [Using npm on the client side](dontkry.com/posts/code/using-npm-on-the-client-side.html) A very thorough introduction to using npm, Browserify, and Grunt.js.

### cooperate with other frameworks

- [AngularJS, Browserify and Grunt](http://dontkry.com/posts/code/angular-browserify-grunt.html)
- [Backbone & jQuery meet Browserify: easy](learnjs.io/blog/2013/11/23/backbone-jquery-browserify)
- [Journey from RequireJS to Browserify](esa-matti.suuronen.org/blog/2013/03/22/journey-from-requirejs-to-browserify) A thorough explanation of switching from RequireJS to Browserify.

### comparison

- [Getting Started with Browserify](http://www.sitepoint.com/getting-started-browserify)
- [My strategy for client-side package managers (choosing between npm, bower, and component)](http://superbigtree.tumblr.com/post/58075340096/my-strategy-for-client-side-package-managers-choosing)
- [Browserify vs. Component](www.forbeslindesay.co.uk/post/44144487088/browserify-vs-component)

## FAQ

### 内置模块

如需要覆盖 browserify 的 buffer 模块，可以通过以下方法：

1. 使用相对路径加载模块，如：

        var Buffer = require('./lib/buffer').Buffer;
        var buffer = new Buffer();
        buffer.write();

    注意，及时你在 `node_module/` 下放置了 `buffer` 模块，用 `require('buffer').Buffer` 加载的也是 browerify 默认的模块。

2. 使用 `--no-builtins` 命令行参数：

        browserify --no-builtins main.js > bundle.js

    这将关闭所有的内置模块。

3. 使用 API

        var browserify = require('browserify');
        var b = browserify({builtins: ['path']});
        b.add('./main.js');
        var fs = require('fs');

        b.bundle({ debug:true }).pipe(fs.createWriteStream('./bundle.js'));

    使用这种方法可以使用 `builtins` 指定需要使用那些内置模块，源码中对  builtins 的处理方法为：

        if (typeof opts.builtins === 'boolean') {
            self._builtins = opts.builtins ? builtins : {};
        }
        else if (Array.isArray(opts.builtins)) {
            self._builtins = {};
            opts.builtins.forEach(function (name) {
                if (builtins.hasOwnProperty(name)) {
                    self._builtins[name] = builtins[name];
                }      
            });
        }
        else if (typeof opts.builtins === 'object') {
            self._builtins = opts.builtins;
        }
        else {
            self._builtins = builtins;
        }

    - boolean 值表示是否使用内置模块，相当于命令行的 `--no-builtins` 参数。
    - 如果是数组，填入的值为需要启用内置模块的名字，如 ['buffer', 'path']
    - 如果是对象，填入的值为模块的路径。如果想覆盖的内置模块，可以按如下方法：

            var browserify = require('browserify');
                var b = browserify({builtins: {
                buffer: require.resolve('buffer')
            }});

        这样，在使用到 `Buffer` 时，不是加载默认的 Buffer，而是我们指定的 Buffer。