---
layout: post
title: "JavaScript Sea.js"
description: ""
category: JavaScript
tags: [javascript, seajs]
--- 

## sea.js

提供简单、极致的模块化开发体验。

- [seajs/seajs](https://github.com/seajs/seajs)
- [Sea.js - A Module Loader for the Web](http://seajs.org/docs/#intro)
- [seajs/examples](https://github.com/seajs/examples)

### Quick Start

参考：[5 分钟上手 Sea.js](http://seajs.org/docs/#quick-start)

### define module

TODO

### require module

TODO

## spm

spm 是 CMD 的包管理工具，需要和 [Sea.js](http://seajs.org/) 配合使用。npm 为后端的包管理器，spm为前端的包管理器。

- [spmjs](https://spmjs.org/)
- [spm document](http://docs.spmjs.org/doc/)
- [spmjs/spm](https://github.com/spmjs/spm)


### install and config

安装 spm，在此之前请先[配置 Node 环境](http://docs.spmjs.org/doc/environment.html)

    $ npm install spm -g
    

spm 核心只有包管理功能，除此之外还提供了很多[插件](http://docs.spmjs.org/cli/help.html)。

配置[源服务](https://spmjs.org/)，在源服务上可以找到所有人分享的模块。

    $ spm config source:default https://spmjs.org

### install module

使用 spm 可以安装源上的任意模块到你的项目中，默认将安装到当前目录下的 sea-modules 目录中。

    $ spm install seajs
    $ spm install jquery
    $ spm install arale/position@1.0.0
    

具体操作可参考 spm help install。

当然你可以像 npm 一样，将你的依赖写到 [package.json](http://docs.spmjs.org/doc/package) 中去，然后使用 spm install 一键安装。

### init module

[spm-init](http://docs.spmjs.org/cli/init.html) 初始化模块。

使用 [spm-init](http://docs.spmjs.org/cli/init) 命令可以初始化一个标准的 CMD 模块。

    $ npm install spm-init -g
    $ spm init

### build

[spm-build](http://docs.spmjs.org/cli/build.html) 构建工具。

spm 并没有限制模块的目录结构和组织方式，但是会有推荐的方式，可以先看下[标准模块](https://github.com/spmjs/spm-build/tree/master/examples/simple)和[自定义模块](https://github.com/spmjs/spm-build/tree/master/examples/simple-grunt)的示例。

虽然模块的组织方式不同，但上线前都需要做 [transport](http://docs.spmjs.org/doc/transport.html) 处理，所以 spm 还提供了构建工具，也分为[标准构建](http://docs.spmjs.org/doc/spm-build.html)和[自定义构建](http://docs.spmjs.org/doc/grunt-build.html)两种。

### Other

[命令集 - spm document](http://docs.spmjs.org/cli/config)

## Arale

- [Arale - 随心构建互联网应用](http://aralejs.org/)

Arale 立足于支付宝的前端需求和国内前端社区，基于 [Sea.js](http://seajs.org/) 和 [CMD](https://github.com/seajs/seajs/issues/242) 规范，致力发展小而美的前端模块架构，建立了一套从编码测试到部署的开发体系， 是一个开放、简单、易用的前端解决方案。


## Alice

- [Alice - 写样式的更好方式](http://aliceui.org/)
- [Alice - 构建模块和样式库](http://aliceui.org/docs/build.html)

Alice 是漫游仙境的童话女神，是支付宝的样式解决方案，是一套精选的基于 CMD 生态圈的样式模块集合，是 Arale 的子集，也是一套模块化的样式命名和组织规范，是写 CSS 的更好方式。

她包括了一套通用样式模块库，一个模块化样式构建规范，一组帮助书写和组织样式的工具，以及产出更多 Alice 模块和样式库的完善方案。

### Quick Start



## Reference

