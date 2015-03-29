layout: post
title: "ExtJS Class System"
category : ExtJS
tagline: "类系统"
tags : [extjs, class]
---
## 命名规则

[Class System](http://docs.sencha.com/extjs/4.0.7/#!/guide/class_system)

- Class names may only contain alphanumeric characters. 
- Class names should be grouped into packages where appropriate and properly namespaced using object property dot-notation.

	`MyCompany.data.CoolProxy`
	
	`MyCompany.Application`

- The top-level namespaces and the actual class names should be in CamelCased, everything else should be all lower-cased	

	`MyCompany.form.action.AutoLoad`

- Classes that are not distributed by Sencha should never use Ext as the top-level namespace.
- Acronyms should also follow CamelCased convention listed above

	`Ext.data.JsonProxy` instead of `Ext.data.JSONProxy`

- As a result, there must only be one class per file. 
- Static class properties that are constants should be all upper-cased.

	`Ext.MessageBox.YES = "Yes"`
	
	`Ext.MessageBox.NO = "No"`
	
	`MyCompany.alien.Math.PI = "4.13"`	

<!--more-->		

## 定义类
### 使用旧的方式

方式一：

	// we didn't have a fluent API for other aspects of class creation, such as configuration, statics and mixins. 
	// We will be reviewing these items in details shortly.
	var MyWindow = Ext.extend(Object, { ... });

方式二：

	// 不能更好得使用动态加载带来的性能提升
	Ext.ns('My.cool');
	My.cool.Window = Ext.extend(Ext.Window, { ... });

### 使用新的方式

	Ext.define(className, members, onClassCreated);

- className: The class name
- members is an object represents a collection of class members in key-value pairs
- onClassCreated is an optional function callback to be invoked when all dependencies of this class are ready, and the class itself is fully created. Due to the new asynchronous nature of class creation, this callback can be useful in many situations. 

This is an example:

	Ext.define('My.sample.Person', {
	
	    name: 'Unknown',
	    constructor: function(name) {
	        if (name) {
	            this.name = name;
	        }

	        return this;
	    },

	    eat: function(foodType) {
	        alert(this.name + " is eating: " + foodType);

	        return this;
	    }
	});
	
	// 使用构造方法创建类
	var aaron = Ext.create('My.sample.Person', 'Aaron');
	aaron.eat("Salad"); // alert("Aaron is eating: Salad");

为了更好得使用动态加载带来的性能提升，建议使用Ext.create创建类，而不是new，如：

	new My.sample.Person()	    

使用字符串作为类名的有助于自动创建命名控件，动态加载所需要的类，而不产生编译错误。

### 创建对象

`Ext.create('widget.useredit');` 等价于 `Ext.widget('useredit');`
 

### Configuration

- Configurations are completely encapsulated from other class members
- Getter and setter, methods for every config property are automatically generated into the class' prototype during class creation if the class does not have these methods already defined.
- An apply method is also generated for every config property. The auto-generated setter method calls the apply method internally before setting the value. Override the apply method for a config property if you need to run custom logic before setting the value. If apply does not return a value then the setter will not set the value. For an example see applyTitle below.

框架为自动为在类的config属性中的定义的配置生成get、set、apply、reset方法，通常需要覆盖apply方法来完成具体的动作（如修改界面显示）否则set方法将失效。当然可以覆盖update方法，只针对值的改变来应用属性。apply方法需要有返回值，否则set方法不会更新值。

Here's an example:

	Ext.define('My.own.Window', {
	   /** @readonly */
	    isWindow: true,

	    config: {
	        title: 'Title Here',

	        bottomBar: {
	            enabled: true,
	            height: 50,
	            resizable: false
	        }
	    },

	    constructor: function(config) {
	        this.initConfig(config);

	        return this;
	    },

	    applyTitle: function(title) {
	        if (!Ext.isString(title) || title.length === 0) {
	            alert('Error: Title must be a valid non-empty string');
	        }
	        else {
	            return title;
	        }
	    },

	    applyBottomBar: function(bottomBar) {
	        if (bottomBar && bottomBar.enabled) {
	            if (!this.bottomBar) {
	                return Ext.create('My.own.WindowBottomBar', bottomBar);
	            }
	            else {
	                this.bottomBar.setConfig(bottomBar);
	            }
	        }
	    }
	});

And here's an example of how it can be used:

	var myWindow = Ext.create('My.own.Window', {
	    title: 'Hello World',
	    bottomBar: {
	        height: 60
	    }
	});

	alert(myWindow.getTitle()); // alerts "Hello World"

	myWindow.setTitle('Something New');

	alert(myWindow.getTitle()); // alerts "Something New"

	myWindow.setTitle(null); // alerts "Error: Title must be a valid non-empty string"

	myWindow.setBottomBar({ height: 100 }); // Bottom bar's height is changed to 100


### 动态加载(设计期)

当js在方法执行的时候，Ext碰到没有定义的类时，会同步地加载相关的文件。为了避免这种动作导致的延时积累，可以使用requires属性或者在调用Ext.application中调用Ext.require方法来保证加载该文件之前，把其依赖的文件都加载上来。

在开发时，尽量使用requires包含其依赖的类，以利于在发布时的打包。
在首页只需加载ext.js(或者ext-debug.js)，不需要加载ext-all.js(或者ext-all-debug.js)，确保在发布时，最大限度地减少js文件的尺寸。

框架会根据requires、mixins、uses、extends关键字来动态加载所需要的文件。

### Mixins

	Ext.define('Sample.Musician', {
	    extend: 'Sample.Person',
	           mixins: {
	        guitar: 'Sample.ability.CanPlayGuitar',
	        compose: 'Sample.ability.CanComposeSongs',
	        sing: 'Sample.ability.CanSing'
	    }
	});

如果mixins中的方法和定义类的方法相同，则mixins中的方法被覆盖，但是可以通过mixins中的对象，如this.mixins.canSing.sing.call(this); 参考[这里](http://www.sencha.com/forum/showthread.php?131646-Ask-about-Mixins)。

### `Statics`和`Self`
参考Ext.Base中两个属性的文档。两者都是作用于独立的，this.self得到的值为子类的Class中的静态变量，而static跟this无关，返回它定义类的Class。

	Ext.define('Computer', {
	    statics: {
	        instanceCount: 0,
	        factory: function(brand) {
	            // 'this' in static methods refer to the class itself
	            return new this({brand: brand});
	        }
	    },

	    constructor: function(config) {
	        this.initConfig(config);

	        // the **self** property of an instance refers to its class
	        this.self.instanceCount ++;
    	}
	}

	var dellComputer = Computer.factory('Dell');
	alert(Computer.instanceCount); // Alerts "2" 

### Singleton
在类中声明singleton:true表示单例，并且框架会自动初始化一个和类名相同的实例。 

	listeners: {
	    load: onFirstLoadData,
	    single: true
	}

如果希望事件只触发一次，则添加single属性。

### Override
- [Compiler-Friendly Code Guidelines](http://localhost:8080/extjs/docs/index.html#!/guide/command_code)

		Ext.define('MyApp.patches.grid.Panel', {
		    override: 'Ext.grid.Panel',

		    ...
		});

#### Using callParent and callSuper

To support all of these new uses cases, callParent was enhanced in Ext JS 4.0 and Sencha Touch 2.0 to "call the next method". The "next method" may be an overridden method or an inherited method. As long as there is a next method, callParent will call it.

Another way to view this is that callParent works the same for all forms of Ext.define, be they classes or overrides.

While this helped in some areas, it unfortunately made bypassing the original method (as a patch or bug fix) more difficult. So in Ext JS 4.1.1a, Ext JS 4.1.2a and Sencha Touch 2.1, **there is now a method named callSuper that can be used to bypass an overridden method**.

In future releases, the compiler will use this semantic difference to perform dead-code elimination of overridden methods.

#### Override有以下应用场景

- 打补丁

	作为补丁时，命名规则如`(Ext -> MyApp.patches).grid.Panel`，表示重写`Ext.grid.Panel`，框架升级时，需要注意是否可以去除这些override。

- 作为局部类

	When dealing with code generation (as in Sencha Architect), it is common for a class to consist of two parts: one machine generated and one human edited. In some languages, there is formal support for the notion of a "partial class" or a class-in-two-parts.

	Using an override, you can manage this cleanly:

	In `./foo/bar/Thing.js`:

		Ext.define('Foo.bar.Thing', {
		    // NOTE: This class is generated - DO NOT EDIT...

		    requires: [
		        'Foo.bar.custom.Thing'
		    ],

		    method: function () {
		        // some generated method
		    },

		    ...
		});

	In `./foo/bar/custom/Thing.js`:

		Ext.define('Foo.bar.custom.Thing', {
		    override: 'Foo.bar.Thing',

		    method: function () {
		        this.callParent(); // calls generated method
		        ...
		    },

		    ...
		});

	Naming Recommendations:

	- Organize generated vs. hand-edited code by namespace.
	- If not by namespace, consider a common base name with a suffix on one or the other (e.g., "Foo.bar.ThingOverride" or "Foo.bar.ThingGenerated") so that the parts of a class collate together in listings.

	- Overrides as Aspects

		A common problem for base classes in object-oriented designs is the "fat base class". This happens because some behaviors apply across all classes. When these behaviors (or features) are not needed, however, they cannot be readily removed if they are implemented as part of some large base class.

	Using overrides, these features can be collected in their own hierarchy and then requires can be used to select these features when needed.

	In ./foo/feature/Component.js:

		Ext.define('Foo.feature.Component', {
		    override: 'Ext.Component',

		    ...
		});
		
	In ./foo/feature/grid/Panel.js:

		Ext.define('Foo.feature.grid.Panel', {
		    override: 'Ext.grid.Panel',

		    requires: [
		        'Foo.feature.Component' // since overrides do not "extend" each other
		    ],

		    ...
		});

	This feature can be used now by requiring it:

		...
		requires: [
		    'Foo.feature.grid.Panel'
		]

	Or with a proper "bootstrap" file (see [Workspaces in Sencha Cmd](http://docs.sencha.com/extjs/4.2.1/#!/guide/command_workspace) or [Single-Page Ext JS Apps](http://docs.sencha.com/extjs/4.2.1/#!/guide/command_app_single))

		...
		requires: [
		    'Foo.feature.*'
		]
		
	Naming Recommendation:

	- Organize generated vs. hand-edited code by namespace. This enables use of wildcards to bring in all aspects of the feature.