layout: post
title: "ExtJS 设计规范"
category : ExtJS
tagline: "设计规范和优化"
tags : [extjs, bestpractice]
--- 
## 设计
### 模版方法

- [Components](http://docs.sencha.com/extjs/4.2.1/#!/guide/components)

用于被子类覆盖的方法，通常需要先调用父方法，如onRender。一般，如果父类提供了模版方法，就不要使用事件响应去实现逻辑，因为事件可能被挂起或者停止。

	Ext.define('My.custom.Component', {
	    extend: 'Ext.Component',
	    onRender: function() {
	        this.callParent(arguments); // call the superclass onRender method

	        // perform additional rendering tasks here.
	    }
	});

<!--more-->	

常用的模版方法：

- initComponent This method is invoked by the constructor. It is used to initialize data, set up configurations, and attach event handlers.
- beforeShow This method is invoked before the Component is shown.
- onShow Allows addition of behavior to the show operation. After calling the superclass’s onShow, the Component will be visible.
- afterShow This method is invoked after the Component is shown.
- onShowComplete This method is invoked after the afterShow method is complete
- onHide Allows addition of behavior to the hide operation. After calling the superclass’s onHide, the Component will be hidden.
- afterHide This method is invoked after the Component has been hidden
- onRender Allows addition of behavior to the rendering phase.
- afterRender Allows addition of behavior after rendering is complete. At this stage the Component’s Element will have been styled according to the configuration, will have had any configured CSS class names added, and will be in the configured visibility and the configured enable state.
- onEnable Allows addition of behavior to the enable operation. After calling the superclass’s onEnable, the Component will be enabled.
- onDisable Allows addition of behavior to the disable operation. After calling the superclass’s onDisable, the Component will be disabled.
- onAdded Allows addition of behavior when a Component is added to a Container. At this stage, the Component is in the parent Container's collection of child items. After calling the superclass's onAdded, the ownerCt reference will be present, and if configured with a ref, the refOwner will be set.
- onRemoved Allows addition of behavior when a Component is removed from its parent Container. At this stage, the Component has been removed from its parent Container's collection of child items, but has not been destroyed (It will be destroyed if the parent Container's autoDestroy is true, or if the remove call was passed a truthy second parameter). After calling the superclass's onRemoved, the ownerCt and the refOwner will not be present.
- onResize Allows addition of behavior to the resize operation.
- onPosition Allows addition of behavior to the position operation.
- onDestroy Allows addition of behavior to the destroy operation. After calling the superclass’s onDestroy, the Component will be destroyed.
- beforeDestroy This method is invoked before the Component is destroyed.
- afterSetPosition This method is invoked after the Components position has been set.
- afterComponentLayout This method is invoked after the Component is laid out.
- beforeComponentLayout This method is invoked before the Component is laid out.
	

## 命名规范和工程的文件结构

- 	命名控件的第一段和类名都采用pascal写法，其他都用小写字母，如MyCompany.data.CoolProxy
-	缩写字母也采用pascal形式，如Ext.data.JsonProxy instead of Ext.data.JSONProxy
-	Store使用复数命名，Model使用单数命名。
-	每个类放在一个和类名同名的文件中，并且文件结构和命名空间相同。
-	方法也用驼峰形式，对于缩写词同样如此。
-	静态常量用全大写形式，其他同方法命名规则。

## 本地化

### 本地化类

	Ext.define("Ext.locale.es.form.field.Number", {
	    override: "Ext.form.field.Number",
	    decimalSeparator: ",",
	    decimalPrecision: 2,
	    minText: "El valor mínimo para este campo es de {0}",
	    maxText: "El valor máximo para este campo es de {0}",
	    nanText: "{0} no es un número válido"
	});

### 使用本地化

	<script type="text/javascript" src="extjs/locale/ext-lang-es.js"></script>

### 在页面加载本地化js

	<script type="text/javascript" src="extjs/locale/ext-lang-es.js"></script>

## 错误处理

- [Class System](http://docs.sencha.com/extjs/4.2.1/#!/guide/class_system)

### 获得方法名

	// 可以获取所在方法
	Ext.getDisplayName(arguments.callee)

	//抛出异常的方法：
	throw new Error('['+ Ext.getDisplayName(arguments.callee) +'] Some message here');

### 错误堆栈

当在`Ext.define()`使用上述方式中抛出异常后，可以在Chorme或Firefox的调试器中查看到错误堆栈。

## 性能优化

- [Optimizing Ext JS 4.1-based Applications](http://docs.sencha.com/extjs/4.2.1/#!/guide/performance)

### 监听器
对于只需要加载一次的store，则可以使用single属性，避免每次出发事件又重新加载

	listeners: {
	    load: onFirstLoadData,
	    single: true
	}

避免在afterrender事件中修改DOM（以及DOM的style）。要达到此目的，可以使用beforerender事件，此时控件大小未确认，如果需要在控件大小确认之后触发，可以使用boxready事件。

### doLayout and doComponentLayout

除了DOM被直接在代码中修改需要调用这两个函数外，其他情况禁止调用该函数。

### 尽量减少控件的嵌套

### 尽量使用更基层的控件

因为控件越复杂，代价越高。

### 减少border layout嵌套

可以为一个border layout添加两个west region，并且使用weight属性来决定显示哪一个。

### 减少DOM读写

尽量不要在控件呈现之后去调用setStyle, addCls, removeCls,添加控件等方法去修改DOM元素。为了减少重新布局，可以使用以下代码进行DOM的批量修改。

	{
	    Ext.suspendLayouts();
	    // batch of updates
	    Ext.resumeLayouts(true);
	}

如添加控件

	var containerPanel = Ext.create('Ext.panel.Panel', {
	    renderTo: Ext.getBody(),
	    width: 400,
	    height: 200,
	    title: 'Container Panel',
	    layout: 'column',
	    suspendLayout: true // Suspend automatic layouts while we do several different things that could trigger a layout on their own
	});	

使用suspendLayout=true，关闭自动布局。

	containerPanel.add({
	    xtype: 'panel',
	    title: 'Child Panel 1',
	    height: 100,
	    columnWidth: 0.5
	});

	...

手动批量布局

	// Turn the suspendLayout flag off.
	containerPanel.suspendLayout = false;
	// Trigger a layout.
	containerPanel.doLayout();

### 性能分型工具

可以使用./examples/page-analyzer/page-analyzer.html来分析页面的性能。

### Additional Resources

The following resources are also useful for application performance tuning:

View a 50-minute [webinar video](https://vimeo.com/37636229) version with the material in this guide
Suggestions from other Ext JS users in the Sencha Ext: Open Discussion forum [Performance Best Practices](http://www.sencha.com/forum/showthread.php?153565) thread
Tips for optimizing [Internet Explorer 8 and higher](http://msdn.microsoft.com/en-us/library/gg699341.aspx)
Information about dynaTrace performance management technology for Internet Explorer and FireFox
Chrome Speed Tracer website and [tutorial](http://www.youtube.com/watch?v=Sn_3rJaexKc)
Firebug profiler [tutorial](http://michaelsync.net/2007/09/10/firebugtutorial-logging-profiling-and-commandline-part-ii)

## 其他
### 浏览器和操作系统

Ext.env.Browser用来检测浏览器的属性，Ext.env.FeatureDetector用来检测HTML5和CSS3的特性，Ext.env.OS用来检测操作系统的一些属性。

## 基础类

Ext.Function 完成Functions的包装，如改变作用于，延时执行，循环执行等。

## Drawing

- [Drawing](http://docs.sencha.com/extjs/4.2.1/#!/guide/drawing)

## 主题

- [Theming Ext JS](http://docs.sencha.com/extjs/4.2.1/#!/guide/theming)

## 拖拽

- [Drag and Drop](http://docs.sencha.com/extjs/4.2.1/#!/guide/drag_and_drop)

除了dd包，可以使用工具类ComponentDragger来实现（特别是悬浮控件)拖拽。使用Splitter来实现相邻控件的Resize。
[参考](http://docs.sencha.com/ext-js/4-1/#!/guide/keyboard_nav)

## 键盘导航

- [Keyboard Navigation](http://docs.sencha.com/extjs/4.2.1/#!/guide/keyboard_nav)
- [Creating Accessible Ext JS Applications](http://docs.sencha.com/extjs/4.2.1/#!/guide/accessibility)

## 单元测试

- [Unit Testing with Jasmine](http://docs.sencha.com/extjs/4.2.1/#!/guide/testing)
- [Unit testing MVC Controllers](http://docs.sencha.com/extjs/4.2.1/#!/guide/testing_controllers)