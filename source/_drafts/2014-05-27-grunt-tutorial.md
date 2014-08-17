---
layout: post
title: "Grunt"
category : Node
tags : [node, grunt]
--- 

## Install

安装CLI:

    npm install -g grunt-cli

安装 [grunt-init](http://gruntjs.com/project-scaffolding):

    npm install -g grunt-init

准备一个新的Grunt项目:

    grunt-init gruntfile    

安装Grunt和grunt插件:

    npm install

## Gruntfile

一个Gruntfile由下面几部分组成：

* "wrapper"函数(包装函数)
* 项目和任务配置
* 加载的Grunt插件和任务
* 自定义任务

### "wrapper"函数

每个Gruntfile(和Grunt插件)都使用这个基本格式，并且所有你的Grunt代码都必须指定在这个函数里面：

```
module.exports = function(grunt) {
    // 在这里处理Grunt相关的事情
}
```

### 项目和任务配置

大多数Grunt任务所依赖的配置数据都被定义在传递给[grunt.initConfig](http://gruntjs.com/grunt#grunt.initconfig)方法的一个对象中。

在这个例子中，`grunt.file.readJSON('package.json')`会把存储在`package.json`中的JSON元数据导入到Grunt配置中。由于`<% %>`模板字符串可以引用任意的配置属性，因此可以通过这种方式来指定诸如文件路径和文件列表类型的配置数据，从而减少一些重复的工作。

你可以在这个配置对象中(传递给initConfig()方法的对象)存储任意的数据，只要它不与你任务配置所需的属性冲突，否则会被忽略。此外，由于这本身就是JavaScript，你不仅限于使用JSON；你可以在这里使用任意的有效的JS代码。如果有必要，你甚至可以以编程的方式生成配置。

与大多数任务一样，[grunt-contrib-uglify](http://github.com/gruntjs/grunt-contrib-uglify)插件的`uglify`任务要求它的配置被指定在一个同名属性中。在这里有一个例子, 我们指定了一个`banner`选项(用于在文件顶部生成一个注释)，紧接着是一个单一的名为`build`的uglify目标，用于将一个js文件压缩为一个目标文件(比如将src目录`jquery-1.9.0.js`压缩为`jquery-1.9.0.min.js`然后存储到dest目录)。

```js
// 项目配置
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
        options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build: {
            src: 'src/<%=pkg.name %>.js',
            dest: 'build/<%= pkg.name %>.min.js'
        }
    }
});
```

### 加载grunt插件和任务

许多常用的任务像[concatenation](https://github.com/gruntjs/grunt-contrib-concat)，[minification](http://github.com/gruntjs/grunt-contrib-uglify)和[linting](https://github.com/gruntjs/grunt-contrib-jshint)都被作为[grunt插件](https://github.com/gruntjs)来使用。只要一个插件被作为一个依赖指定在项目的`package.json`文件中，并且已经通过`npm install`安装好，都可以在你的`Gruntfile`文件中使用下面这个简单的命令启用它(所依赖的任务)。

```
// 加载提供"uglify"任务的插件
grunt.loadNpmTasks('grunt-contrib-uglify');
```

**注意**: `grunt --help`命令可以列出所有可用的任务。

### 自定义任务

你可以通过定义一个`default`任务来配置Grunt，让它默认运行一个或者多个任务。在下面的例子中，在命令行中运行`grunt`而不指定特定的任务将自动运行`uglify`任务。这个功能与显示的运行`grunt uglify`或者等价的`grunt default`一样。你可以在任务参数数组中指定任意数量的任务(这些任务可以带参数，也可以不带参数)。

```js
// 默认任务
grunt.registerTask('default', ['uglify']);
```

如果你的项目所需的任务没有对应的Grunt插件提供相应的功能，你可以在`Gruntfile`内定义自定义的任务。例如，下面的Gruntfile就定义了一个完整的自定义的`default`任务，它甚至没有利用任务配置(没有使用grunt.initConfig()方法)：

```js
module.exports = function(grunt) {
    // 一个非常基础的default任务
    grunt.registerTask('default', 'Log some stuff.', function() {
        grunt.log.write('Logging some stuff...').ok();
    });
};
```

自定义的项目特定的任务可以不定义在Gruntfile中；它们可以定义在一个外部`.js`文件中，然后通过[grunt.loadTasks](http://gruntjs.com/grunt#grunt.loadtasks)方法来加载。

## Tutorial

- 入门：
    - 中文官网：<http://www.gruntjs.org/>、<http://www.gruntjs.net/> 先将“新手上路”看过一遍，基本了解 grunt 是什么，怎么用的。
    - 阮一峰博客：<http://javascript.ruanyifeng.com/tool/grunt.html>，对 grunt 入门介绍得简单易懂，对几个常用的 grunt 插件进行了简单的介绍。
    - 英文官网：<http://gruntjs.com/>，在对 grunt 基本了解以后，在中文官网上看不明白的地方，可以直接看英文官网的说明。
- 插件：
    - 虽然中文官网也有插件页面，但是并不能进行搜索。所以要搜索 grunt 插件，要在英文官网的插件页面搜索。
- grunt 相关：
    - 编写可维护的 Gruntfile.js：http://blog.segmentfault.com/heroic/1190000000343005?page=1#c-1190000000343005-1050000000344590
    - 配置WebStorm Grunt环境：http://www.cnblogs.com/eboke/p/3793922.html
    - grunt 有提供对文件操作的 API： http://www.gruntjs.org/api/grunt.file.html
    - 使用 grunt-contrib-copy 自动复制文件：http://keenwon.com/1082.html
    - [Automate Recurring Tasks with Grunt](http://www.sitepoint.com/automate-recurring-tasks-grunt)
    - [Automate with Grunt](http://www.salttiger.com/automate-with-grunt/)
    - [Five Grunt Tasks You Won't Want to Miss!](http://www.sitepoint.com/five-grunt-tasks-wont-want-miss/)

## Reference

- [新手上路 - Grunt 中文社区](http://www.gruntjs.org/docs/getting-started.html#cli)

## Task

- [azer/bud](https://github.com/azer/bud?) Minimalistic Task Manager.
