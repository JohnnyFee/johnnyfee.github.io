---
layout: post
title: "ExtJS Component"
category : ExtJS
tagline: "表单、表格等常用控件"
tags : [extjs, view]
--- 
##	Component

### EXTJS控件层次

![EXTJS控件层次](http://johnnyimages.qiniudn.com/component_hierarchy.pngundefined)

### 悬浮控件

Window控件默认是悬浮控件，任何控件都可以通过制定float属性来设置是否为悬浮控件。非悬浮控件需要指定`renderTo`属性，或者作为子控件加载到其他控件中，而悬浮控件不需要这样做，而只需要调用show方法。

	var panel = Ext.create('Ext.panel.Panel', {
	    width: 200,
	    height: 100,
	    floating: true, // make this panel an absolutely-positioned floating component
	    title: 'Test',
	    html: 'Test Panel'
	});
	
<!--more-->	

Floating Components are automatically rendered to the document body the first time their show method is called
 
	panel.show(); // render and show the floating panel

Here are a few other configurations and methods to make note of related to floating components:

- draggable - enables dragging of a floating Component around the screen.
- shadow - customizes the look of a floating Component's shadow.
- alignTo() - aligns a floating Component to a specific element.
- center() - centers a floating Component in its Container.

For a working demo of floating Component features see the [Floating Panel Example](http://docs.sencha.com/extjs/4.2.1/guides/components/examples/floating_panel).	

### 显示和隐藏

All Components have built in show and hide methods. The default CSS method used to hide the Component is "display: none", but this can be changed using the hideMode configuration:

	var panel = Ext.create('Ext.panel.Panel', {
	    renderTo: Ext.getBody(),
	    title: 'Test',
	    html: 'Test Panel',
	    hideMode: 'visibility' // use the CSS visibility property to show and hide this component
	});

	panel.hide(); // hide the component
	panel.show(); // show the component

### 实现自定义控件

- [Components](http://docs.sencha.com/extjs/4.2.1/#!/guide/components)

尽量选择靠近根部的组件来继承，如如果继承Component可以满足需求，则不要继承Panel，因为Panel的开销更大。

如实现Image自定义控件：

	Ext.define('Ext.ux.Image', {
	    extend: 'Ext.Component', // subclass Ext.Component
	    alias: 'widget.managedimage', // this component will have an xtype of 'managedimage'
	    autoEl: {
	        tag: 'img',
	        src: Ext.BLANK_IMAGE_URL,
	        cls: 'my-managed-image'
	    },

	    // Add custom processing to the onRender phase.
	    // Add a ‘load’ listener to the element.
	    onRender: function() {
	        this.autoEl = Ext.apply({}, this.initialConfig, this.autoEl);
	        this.callParent(arguments);
	        this.el.on('load', this.onLoad, this);
	    },

	    onLoad: function() {
	        this.fireEvent('load', this);
	    },

	    setSrc: function(src) {
	        if (this.rendered) {
	            this.el.dom.src = src;
	        } else {
	            this.src = src;
	        }
	    },

	    getSrc: function(src) {
	        return this.el.dom.src || this.src;
	    }
	});

Usage:

	var image = Ext.create('Ext.ux.Image');

	Ext.create('Ext.panel.Panel', {
	    title: 'Image Panel',
	    height: 200,
	    renderTo: Ext.getBody(),
	    items: [ image ]
	});

	image.on('load', function() {
	    console.log('image loaded: ', image.getSrc());
	});

	image.setSrc('http://www.sencha.com/img/sencha-large.png');

### 实现自定义Container

If the required UI Component is to contain other Components, but does not need any of the previously mentioned additional capabilities of a Panel, then Ext.container.Container is the appropriate class to extend. At the Container level, it is important to remember which Layout is to be used to render and manage child Components.

Containers have the following additional template methods:

- onBeforeAdd This method is invoked before adding a new child Component. It is passed the new Component, and may be used to modify the Component, or prepare the Container in some way. Returning false aborts the add operation.
- onAdd This method is invoked after a new Component has been added. It is passed the Component which has been added. This method may be used to update any internal structure which may depend upon the state of the child items.
- onRemove This method is invoked after a new Component has been removed. It is passed the Component which has been removed. This method may be used to update any internal structure which may depend upon the state of the child items.
- beforeLayout This method is invoked before the Container has laid out (and rendered if necessary) its child Components.
- afterLayout This method is invoked after the Container has laid out (and rendered if necessary) its child Components.

## Panel

Panels have the following additional template methods:

- afterCollapse This method is invoked after the Panel is Collapsed.
- afterExpand This method is invoked after the Panel is expanded
- onDockedAdd This method is invoked after a docked item is added to the Panel
- onDockedRemove This method is invoked after a docked item is removed from the Panel	

## Form
### 验证
#### 内置的验证

It's easy to change the location of a Field's error message using the `msgTarget` configuration, and the `invalidText` configuration changes the error message. Each Field provides its own implementation of invalidText, and many support token replacement in the error message.For example, in a Date Field's invalidText, any occurrences of **"{0}" will be replaced with the Field's value**, and any occurrences of **"{1}" will be replaced with the required date format**. The following code demonstrates placing the error message directly under the Field, and customizing the error message text:

{
    xtype: 'datefield',
    fieldLabel: 'Date of Birth',
    name: 'birthDate',
    msgTarget: 'under', // location of the error message
    invalidText: '"{0}" bad. "{1}" good.' // custom error message text
}

![msgTarget](http://docs.sencha.com/extjs/4.2.1/guides/forms/custom_error_message.png)

### 自定义验证

The simplest way to implement a custom validation is to use the Text Field's `regex` configuration to apply validation rules, and the `maskRe` configuration to limit which characters can be typed into the field. Here's an example of a Text Field that validates a time.

	 {
	    fieldLabel: 'Last Login Time',
	    name: 'loginTime',
	    regex: /^([1-9]|1[0-9]):([0-5][0-9])(\s[a|p]m)$/i,
	    maskRe: /[\d\s:amp]/i,
	    invalidText: 'Not a valid time.  Must be in the format "12:34 PM".'
	}

<http://docs.sencha.com/extjs/4.2.1/#!/api/Ext.form.field.VTypes>
通过[Ext.form.field.VTypes](http://docs.sencha.com/extjs/4.2.1#!/api/Ext.form.field.VTypes)共享验证规则。

	// custom Vtype for vtype:'time'
	var timeTest = /^([1-9]|1[0-9]):([0-5][0-9])(\s[a|p]m)$/i;
	Ext.apply(Ext.form.field.VTypes, {
	    //  vtype validation function
	    time: function(val, field) {
	        return timeTest.test(val);
	    },
	    // vtype Text property: The error text to display when the validation function returns false
	    timeText: 'Not a valid time.  Must be in the format "12:34 PM".',
	    // vtype Mask property: The keystroke filter mask
	    timeMask: /[\d\s:amp]/i
	});

Once a custom validator has been created it can be used on Text Fields throughout an application using the vtype configuration:

	{
	    fieldLabel: 'Last Login Time',
	    name: 'loginTime',
	    vtype: 'time'
	}

例子：

- [Validation Example](http://docs.sencha.com/extjs/4.2.1/guides/forms/examples/validation)	

### 远程验证

远程验证可参考UniqueFieldValidation。

### 重要属性
#### fieldDefaults

Formpanel使用fieldDefaults属性指定FormPanel中各个Field的默认属性。

	new Ext.form.Panel({
	    fieldDefaults: {
	        labelAlign: 'left',
	        labelWidth: 100
	    }
	｝

#### formBind

对于在Form中的控制，配置formBind:true之后，如果Form的验证没通过，则该控件为不可用。

###数据交互

- [Loading, Submitting, and Validating Forms using Ext JS 4](http://www.packtpub.com/article/loading-submitting-and-validating-forms-using-ext-js-4)

### 提交数据

	Ext.create('Ext.form.Panel', {
	    ...
	    url: 'add_user',
	    items: [
	        ...
	    ],
	    buttons: [
	        {
	            text: 'Submit',
	            handler: function() {
	                var form = this.up('form').getForm(); // get the basic form
	                if (form.isValid()) { // make sure the form contains valid data before submitting
	                    form.submit({
	                        success: function(form, action) {
	                           Ext.Msg.alert('Success', action.result.msg);
	                        },
	                        failure: function(form, action) {
	                            Ext.Msg.alert('Failed', action.result.msg);
	                        }
	                    });
	                } else { // display error alert if the data is invalid
	                    Ext.Msg.alert('Invalid Data', 'Please correct form errors.')
	                }
	            }
	        }
	    ]
	});

例子：

- [Form Submission Example	](http://docs.sencha.com/extjs/4.2.1/guides/forms/examples/submit/index.html)

### 绑定Model

**加载数据**

	Ext.ModelMgr.getModel('User').load(1, { // load user with ID of "1"
	    success: function(user) {
	        userForm.loadRecord(user); // when user is loaded successfully, load the data into the form
	    }
	});

其中User的定义请参见[ExtJS MVC中的定义](http://johnnyfee.github.io/extjs/2013/08/18/extjs-mvc/#model)

**保存数据**
	
	var form = this.up('form').getForm(), // get the basic form
	// TODO 这条代码有问题，并未得到相应的Model。应该使用var record = Ext.create('Request');
	record = form.getRecord(); // get the underlying model instance
	if (form.isValid()) {
		// 或者 values = form.getValues(); record.set(values);
		form.updateRecord(record); // update the record with the form data
		record.save({ // save the record to the server
		    success: function(user) {
		        Ext.Msg.alert('Success', 'User saved successfully.')
		    },
		    failure: function(user) {
		        Ext.Msg.alert('Failure', 'Failed to save user.')
		    }
		});
	} else { // display error alert if the data is invalid
	Ext.Msg.alert('Invalid Data', 'Please correct form errors.')
	}

例子

- [Model Binding Example](http://docs.sencha.com/extjs/4.2.1/guides/forms/examples/model_binding/index.html)

## Grid

- [Grids](http://docs.sencha.com/extjs/4.2.1/#!/guide/grid)

### Renderers

	columns: [
	    {
	        text: 'Birth Date',
	        dataIndex: 'birthDate',
	        // format the date using a renderer from the Ext.util.Format class
	        renderer: Ext.util.Format.dateRenderer('m/d/Y')
	    },
	    {
	        text: 'Email Address',
	        dataIndex: 'email',
	        // format the email address using a custom renderer
	        renderer: function(value) {
	            return Ext.String.format('<a href="mailto:{0}">{1}</a>', value, value);
	        }
	    }
	]

- 更多Format可以参考[Ext.util.Format](http://docs.sencha.com/extjs/4.2.1/#!/api/Ext.util.Format)类。
- dataIndex与Model中Field的name属性对应。

### 分组

实现表格分组需要在store中配置groupField，请参考[这里](http://johnnyfee.github.io/extjs/2013/08/18/extjs-mvc/#store)，并且需要为grid组件添加grouping特性。

	Ext.create('Ext.grid.Panel', {
	    ...
	    features: [{ ftype: 'grouping' }]
	});

### SelectionModel

表格的选择器分为行选择器和单元格选择器，分别用于选择整行或者单元格。

	Ext.create('Ext.grid.Panel', {
	    ...
	    selType: 'rowmodel',
	});

对于行选择器可以通过配置`mode`属性配置选择方法，其值包含:

- "SINGLE" - Only allows selecting one item at a time. Use allowDeselect to allow deselecting that item. Also see toggleOnClick. This is the default.

- "SIMPLE" - Allows simple selection of multiple items one-by-one. Each click in grid will either select or deselect an item.

- "MULTI" - Allows complex selection of multiple items using Ctrl and Shift keys.

对于列选择器只有SINGLE值有效，默认只也为Single，所以对于列选择器，该属性的意义不大。

### 行编辑
通过为column配置editor属性来控制单元格的编辑器，RowEditing Plugin来实现。

	Ext.create('Ext.grid.Panel', {
	    title: 'Simpsons',
	    store: Ext.data.StoreManager.lookup('simpsonsStore'),
	    columns: [
	        {header: 'Name',  dataIndex: 'name', editor: 'textfield'},
	        {header: 'Email', dataIndex: 'email', flex:1,
	            editor: {
	                xtype: 'textfield',
	                allowBlank: false
	            }
	        },
	        {header: 'Phone', dataIndex: 'phone'}
	    ],
	    selType: 'rowmodel',
	    plugins: [
	        Ext.create('Ext.grid.plugin.RowEditing', {
	            clicksToEdit: 1
	        })
	    ],
	    height: 200,
	    width: 400,
	    renderTo: Ext.getBody()
	});

### 单元格编辑

#### 配置单元格编辑器
没有editor属性的field将不允许编辑。

	Ext.create('Ext.grid.Panel', {
	    ...
	    columns: [
	        {
	            text: 'Email Address',
	            dataIndex: 'email',
	            editor: 'textfield'
	       }
	    ]
	});

也可以通过配置对象来设置editor:

	columns: [
	    text: 'Name',
	    dataIndex: 'name',
	    editor: {
	        xtype: 'textfield',
	        allowBlank: false
	    }
	]	

通过为column配置editor属性来控制单元格的编辑器，CellEditing Plugin来实现。

	Ext.create('Ext.grid.Panel', {
	    ...
	    selType: 'cellmodel',
	    plugins: [
	        Ext.create('Ext.grid.plugin.CellEditing', {
	            clicksToEdit: 1
	        })
	    ]
	});

#### 为Grid配置行编辑器插件

	Ext.create('Ext.grid.Panel', {
	    ...
	    selType: 'cellmodel',
	    plugins: [
	        Ext.create('Ext.grid.plugin.CellEditing', {
	            clicksToEdit: 1
	        })
	    ]
	});

#### 例子

- [Row Editing - Live Example](http://docs.sencha.com/extjs/4.2.1/#!/example/grid/cell-editing.html)	

### 分页

为Store添加pageSize属性，并且为其对应的reader设置totalProerty属性；

	Ext.create('Ext.data.Store', {
	    model: 'User',
	    autoLoad: true,
	    pageSize: 4,
	    proxy: {
	        type: 'ajax',
	        url : 'data/users.json',
	        reader: {
	            type: 'json',
	            root: 'users',
	            totalProperty: 'total'
	        }
	    }
	});

为Grid添加Paging Toolbar

	Ext.create('Ext.grid.Panel', {
	    store: userStore,
	    columns: ...,
	    dockedItems: [{
	        xtype: 'pagingtoolbar',
	        store: userStore,   // same store GridPanel is using
	        dock: 'bottom',
	        displayInfo: true
	    }]
	});

### BufferedRenderer
Grids support buffered rendering of extremely large datasets as an alternative to using a paging toolbar. Your users can scroll through thousands of records without the performance penalties of renderering all the records on screen at once.

为Store配置pageSize属性

	var myStore = Ext.create('Ext.data.Store', {
	    // ...
	    pageSize: 100,
	    // ...
	});

添加bufferedrenderer插件

	var grid = Ext.create('Ext.grid.Panel', {
	    // ...
	    autoLoad: true,
	    plugins: {
	        ptype: 'bufferedrenderer',
	        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
	        leadingBufferZone: 50,   // Keep 50 rows rendered in the table ahead of scroll
	        numFromEdge: 20
	    },
	    // ...
	});

例子:
- [Buffered rendering of a loaded store Example](http://docs.sencha.com/extjs/4.2.1/#!/guide/grid)
- [Buffered store Example](http://docs.sencha.com/extjs/4.2.1/#!/example/grid/infinite-scroll.html)	

### Scrolling数据

可以使用`Store.buffered: true`来启用缓存。

`numFromEdge`属性用来控制加载数据的剩余行数。

可以使用Store.purgePageCount调整infinite Grid缓存页数的大小，默认值为5，purgePageCount: 0表示无限缓存大小。对于性能比较好的浏览器，该值可以调大一些，以避免重复加载后台数据。
通过调整每次请求的页数和表格一次显示的条数来优化页面性能（不至于使后台请求过多，页面缓存不要太多）。	
通过配置以下属性来完成Grid的缓存滚动。

	buffered: true,
	autoLoad: true,


## Tree

- [Trees](http://docs.sencha.com/extjs/4.2.1/#!/guide/tree)

例子:

	var store = Ext.create('Ext.data.TreeStore', {
	    root: {
	        text: 'Root',
	        expanded: true,
	        children: [
	            {
	                text: 'Child 1',
	                leaf: true
	            },
	            {
	                text: 'Child 2',
	                leaf: true
	            },
	            ...
	        ]
	    }
	});

	Ext.create('Ext.tree.Panel', {
	    title: 'Simple Tree',
	    store: store,
	    ...
	});

Tree Panel requires at least one column with an xtype of 'treecolumn'. This type of column has tree-specific visual effects like **depth, lines and expand and collapse icons**. A typical Tree Panel would have only one 'treecolumn'.	

### 指定多列

	var tree = Ext.create('Ext.tree.Panel', {
	    renderTo: Ext.getBody(),
	    title: 'TreeGrid',
	    width: 300,
	    height: 150,
	    fields: ['name', 'description'],
	    columns: [{
	        xtype: 'treecolumn',
	        text: 'Name',
	        dataIndex: 'name',
	        width: 150,
	        sortable: true
	    }, {
	        text: 'Description',
	        dataIndex: 'description',
	        flex: 1,
	        sortable: true
	    }],
	    root: {
	        name: 'Root',
	        description: 'Root description',
	        expanded: true,
	        children: [{
	            name: 'Child 1',
	            description: 'Description 1',
	            leaf: true
	        }, {
	            name: 'Child 2',
	            description: 'Description 2',
	            leaf: true
	        }]
	    }
	});

### 节点操作

运行时指定RootNode

	var tree = Ext.create('Ext.tree.Panel');
	tree.setRootNode({
	    text: 'Root',
	    expanded: true,
	    children: [{
	        text: 'Child 1',
	        leaf: true
	    }, {
	        text: 'Child 2',
	        leaf: true
	    }]
	});

添加节点

	var root = tree.getRootNode();

	var parent = root.appendChild({
	    text: 'Parent 1',
	    expanded: true,
	    children: [{
	        text: 'Child 3',
	        leaf: true
	    }]
	});

	parent.appendChild({
	    text: 'Child 3',
	    leaf: true
	});

	parent.expand();	

插入到指定位置

	var child = parent.insertChild(0, {
	    text: 'Child 2.5',
	    leaf: true
	});

	parent.insertBefore({
	    text: 'Child 2.75',
	    leaf: true
	}, child.nextSibling);	

查找节点

- nextSibling
- previousSibling
- parentNode
- lastChild
- firstChild
- childNodes	

### NodeInterface

Most of NodeInterface's fields default to persist: false. This means they are non-persistent fields by default.When overriding a NodeInterface field it is important to only change the persist property. **name, type, and defaultValue** should never be changed.

Persistent by default:

- parentId - used to store the id of a node's parent node. This field should always be persistent, and should not be overridden.
- leaf - used to indicate that the node is a leaf node, and therefore cannot have children appended to it. This field should not normally need to be overridden.

其他都为Non-persistent Fields。

### 加载

For all non-leaf nodes that do not have children (for example, Person with name Sue above), the server response MUST set the loaded property to true. Otherwise the proxy will attempt to load children for these nodes when they are expanded.

In general loaded and expanded are the only cases where it is recommended for the server to set a non-persistent field in the JSON response.

如果所有有children的非叶子节点的expanded=true或者无children的非叶子节点的loaded=true则可实现初始化后**加载整棵树**。

如果非叶子节点的loaded=false，当展开该节点时，将会以`/readPersons?node=4`路径有后台交互。

后台返回的数据如：

	{
	    "success": true,
	    "children": [
	        { "id": 5, "name": "Evan", "leaf": true }
	    ]
	}

### 持久化数据

添加节点

	// Create a new node and append it to the tree:
	var newPerson = Ext.create('Person', { name: 'Nige', leaf: true });
	store.getNodeById(2).appendChild(newPerson);

	// 保存
	newPerson.save();

更新节点

	store.getNodeById(1).set('name', 'Philip');

删除节点

	store.getRootNode().lastChild.remove();

保存修改

	store.sync(); // 可实现批量保存

## Windows

	Ext.define('AM.view.user.Edit', {
	    extend: 'Ext.window.Window',
	    alias: 'widget.useredit',

	    title: 'Edit User',
	    layout: 'fit',

	    // 当调用var view = Ext.widget('useredit');时自动显示。
	    autoShow: true,

	    initComponent: function() {
			...
			// 定义按钮
	        this.buttons = [
	            {
	                text: 'Save',
	                action: 'save'
	            },
	            {
	                text: 'Cancel',
	                scope: this,
	                handler: this.close
	            }
	        ];

	        this.callParent(arguments);
	    }
	});