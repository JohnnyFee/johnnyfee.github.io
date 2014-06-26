---
layout: post
title: "JavaScript 文档生成工具"
category : JavaScript
tags : [js, doc]
--- 
##概述

当前比较流行的JS文档生成器有以下几种：

- [senchalabs/jsduck](https://github.com/senchalabs/jsduck/wiki 生成类似Extjs) Docs的文档，支持Markdown。
- [jsdoc3/jsdoc](https://github.com/jsdoc3/jsdoc) An API documentation generator for JavaScript，支持CommonJS规范。
- [YUIDoc](http://yui.github.io/yuidoc/) Javascript Documentation Tool 
- [visionmedia/dox](https://github.com/visionmedia/dox) JavaScript documentation generator for node using markdown and jsdoc.
- [JacksonTian/doxmate](https://github.com/JacksonTian/doxmate) 过去通常要自己维护API文档，这会是一件比较蛋疼的事情。所幸我们有dox，dox可以帮我们解析注解。但是dox不能帮我们任意生成文档。于是就有了doxmate，doxmate基于dox的注解对象，加入模板。在遵循Github和CommonJS的约定后，doxmate可以帮你的模块包快速生成文档。
	+ [文档伴侣](http://html5ify.com/doxmate)


粗略地对比了一下，jsdoc默认支持CommonJS模块编程，RequireJS Module，而jsduck默认情况下不支持。而从文档的角度看，jsdoc远不如jsduck。
开源项目[Tidesdk](http://www.tidesdk.org/) 的文档使用jsduck编写，可以参考其写法。

phonegap使用[davebalmer/joDoc](https://github.com/davebalmer/jodoc)来生成文档，即直接将Markdown编译成对应的HTML，没有在源码级别提取文档。

综合考虑，个人偏向于sencha的jsduck。

可以参考[ExtJS Docs](http://docs.sencha.com/extjs/4.2.2/)，看看jsduck生成的文档。

为Markdown生成文档的另一个插件为[DocumentUp](http://documentup.com/)。

<!--more-->

## JsDoc

- [使用jsdoc生成组件API文档—jsdoc实战](http://www.36ria.com/5101)

## JsDuck

jsduck最初是为sencha docs服务的，所有sencha化的写法肯定会被自动识别。下面针对jsduck不能自动识别的内容逐一讨论。

### Class文档化

在非ExtJs世界，我们定义类的方法通常有以下几种：


	/**
	 * A simple class.
	 * 
	 */
	Namespace.Component = function() {
	};

	/**
	 * A simple class.
	 */
	function Component() {
	}

	/**
	 * A simple class. 类名必须首字母必须要大些，小写不会被识别为类。
	 */
	Namespace.Supports = {};

符合这几种写法，jsduc都会自动识别为类，并正确生成文档。对于其他类型的，需要使用`@class`标签，显示标识为类。

### 兼容模块化编程

我们以requirejs为例。

utils.js:

	// one module
	define('html/utils',
	    /** 
	     * Utility functions to ease working with DOM elements.
	     */
	    function() {
	        var exports = {
	            /** Get the value of a property on an element. */
	            getStyleProperty: function(element, propertyName) { }
	        };
	        
	        /** Determine if an element is in the document head. */
	        exports.isInHead = function(element) { }
	        
	        return exports;
	    }
	);

什么都不做肯定无法生成正常的文档，我们使用jsduck提供的标签来生成正确的文档：

	/** 
	 * @class Html.Util
	 * Utility functions to ease working with DOM elements.
	 */
	define('html/utils',
	    /** 
	     * Utility functions to ease working with DOM elements.
	     * @exports html/utils
	     */
	    function() {
	        var exports = {
				/** 
				* Get the value of a property on an element..
				* @member Html.Util
				*/
				getStyleProperty: function(element, propertyName) { }
	        };
	        
			/** 
			* Determine if an element is in the document head.
			* @member Html.Util
			*/
			exports.isInHead = function(element) { }
	        
	        return exports;
	    }
	);

即在方法前使用`@member`和在模块声明前使用`@class`标签。

### 多个参数的构造函数

对于ExtJS来说，构造函数为constructor方法。

	Ext.define("Ext.Component", {
	    /**
	     * Creates a new Panel instance.
	     * @param {Object} [config] Configuration.
	     */
	    constructor: function(config) {
	    }
	});

而对于普通的构造函数的写法通常为：

	/**
	 * Creates a new Compnent.
	 */
	Ext.Component = function(v1, v2){
	};

默认情况下不会为构造函数的参数生成文档。我们可以使用`@constructor`来解决这个问题。

	/**
	 * Creates a new Compnent.
	 *
	 *  @constructor
	 *  Creates a new Panel instance.
	 *  @param {int} v1 Configuration.
	 *  @param {int} v2 Configuration.
	 */
	Ext.Component = function(v1, v2){

	};

### Prototype

默认情况下，prototype方法会被识别为类方法。

	/**
	 * Represents a book.
	 * @constructor
	 * @param {string} title - The title of the book.
	 * @param {string} author - The author of the book.
	 */
	function Book(title, author) {
		/**
		 * @property
		 * Current height of the Panel.
		 */
		this.abc = 1;

		
	};

	/** Open and close your Jacket. */
	Book.prototype.zip = function() {
	};

但是prototype属性不会被识别为类属性，需要借助`@property`才行。如：

	/**
	 * @property bbbb
	 * Documentation for the property.
	 */
	Book.prototype.bbbb = {};

## DocumentUp

<https://github.com/jeromegn/DocumentUp>

Pretty documentation generator for Github projects with proper Readme.

## 工具

- [HTML Compiler v1.6 破解版 | 将网页编译制作成EXE可执行程序](http://www.ttrar.com/html/HTML-Compiler.html)