---
layout: post
title: "Sencha Cmd"
category : ExtJS
tagline: "安装和常用命令"
tags : [extjs, cmd]
--- 
## 安装步骤

- [System Setup](http://docs.sencha.com/extjs/4.2.1/#!/guide/command)

#### 下载并安装ruby

[下载地址](http://rubyinstaller.org/)

请安装1.9的最新版，安装2.0在运行sencha build时会出错。

#### 配置compass

	gem update –system/检查更新
	gem install compass/安装compass

如果报错可以在命令尾部加--debug –V，看调试信息，一般是由于网络原因，可以通过修改DNS为google的DNS可以解决问题。

<!--more-->	

#### 下载Sencha CMD并安装
运行build失败可能跟cygwin有关，卸载cygwin可能解决问题。

## Sencha CMD
Sencha CMD最新版提供了很多新特性，请参考[Introduction to Sencha Cmd](http://docs.sencha.com/extjs/4.2.1/#!/guide/command)。

### 更新版本

Check for new updates to Sencha Cmd:

	sencha upgrade --check

Downloads and installs the latest version if you don't already have it:	

	sencha upgrade

If you want to check for pre-release (a.k.a. "beta") releases, use:

	sencha upgrade --check --beta
	
To install the latest beta version:

	sencha upgrade --beta

### 命令基础

Sencha Cmd features are arranged in categories (or modules) and commands:

	sencha [category] [command] [options...] [arguments...]

Help is available using the help command.

	sencha help [module] [action]		

如:

	sencha help generate
	

### 常用命令
**注意：未经说明所有命令均在工程根目录下执行。**

- [Sencha Cmd Reference](http://docs.sencha.com/extjs/4.2.1/#!/guide/command_reference)
- [Advanced Sencha Cmd](http://docs.sencha.com/extjs/4.2.1/#!/guide/command_advanced)

#### 启动Sencha Cmd Web Server

The Sencha Cmd web server lets you serve files from your applications directory. Use this command to start the web server:

	sencha fs web [-port 8000] start -map <dir_name>

To access the Sencha Cmd web server, use:

	http://localhost:8000/	

#### 生成命令

##### 生成工程

	sencha -sdk /path/to/SDK generate app MyApp /path/to/MyApp

如果当前目录在sdk目录下，则-sdk /path/to/SDK可以省略。

生成的目录结构为：

	.sencha/                    # Sencha-specific files (e.g. configuration)
	    app/                    # Application-specific content
	        sencha.cfg          # Application configuration file for Sencha Cmd
	        build-impl.xml      # Standard application build script
	        plugin.xml          # Application-level plugin for Sencha Cmd
	    workspace/              # Workspace-specific content (see below)
	        sencha.cfg          # Workspace configuration file for Sencha Cmd
	        plugin.xml          # Workspace-level plugin for Sencha Cmd

	ext/                        # A copy of the Ext JS SDK
	    cmd/                    # Framework-specific content for Sencha Cmd
	        sencha.cfg          # Framework configuration file for Sencha Cmd
	    packages/               # Framework supplied packages
	        ext-theme-classic/  # Ext JS Theme Package for Classic
	        ext-theme-neptune/  # Ext JS Theme Package for Neptune
	        ...                 # Other theme and locale packages
	    src/                    # The Ext JS source
	    ext-*.js                # Pre-compiled and bootstrap files
	    ...

	index.html                  # The entry point to your application
	app.json                    # Application configuration
	app.js                      # Your application's initialization logic
	app/                        # Your application's source code in MVC structure
	    model/                  # Folder for application model classes.
	    store/                  # Folder for application stores
	    view/                   # Folder for application view classes.
	        Main.js             # The initial default View
	    controller/             # Folder for application controllers.
	        Main.js             # The initial default Controller

	packages/                   # Sencha Cmd packages

	build/                      # The folder where build output is placed.	

##### 添加Model

	cd /path/to/MyApp
	sencha generate model User id:int,name,email

##### 添加Controller

	cd /path/to/MyApp
	sencha generate controller Central

There are no other parameters in this case beyond the controller name.

##### 添加View

	sencha generate view SomeView

#### 编译

	sencha app build

There are various configuration options available in the ".sencha/app/sencha.cfg" file. In the case of a single-page application, it is best to ignore the ".sencha/workspace" folder, which also has a config file.	

- The classpath
The sencha app build command knows where to find the source of your application due to the app.classpath configuration value stored in ".sencha/app/sencha.cfg". By default, this value is:

	app.classpath=${app.dir}/app,${app.dir}/app.js

Adding directories to this comma-separated list informs the compiler where to find the source code required to build the application.

配置的几个级别:
- app. -- Check the ".sencha/app/sencha.cfg" file
- build. -- Check the ".sencha/app/build.properties" file
- workspace. -- Check the ".sencha/workspace/sencha.cfg" file
- framework. -- Check the "cmd/sencha.cfg" file in the Ext JS SDK.
- cmd. -- Check the Sencha Cmd install folder's "sencha.cfg" file.

	
##### 单页工程

首页代码如下：

	<html>
	    <head>
	        <!-- <x-compile> -->
	          <!-- <x-bootstrap> -->
	            <script src="ext/ext-dev.js" type="text/javascript"></script>
	            <script src="build/bootstrap.js" type="text/javascript"></script>
	          <!-- </x-bootstrap> -->

	            <script src="js/app.js" type="text/javascript"></script>
	        <!-- </x-compile> -->
	    </head>
	    <body></body>
	</html>


**编译指令**

	sencha compile -classpath=ext/src,js page -yui -in index.php -out build/index.php

其中`-classpath`指定要编译的源码路径，`-in`和`-out`表示编译的输入和输出。首页中`x-compile`中包括要进行编译的script标签，`x-bootstrap`为ext框架的引导程序，用于动态加载，提供框架中类和别名的元数据（用于处理requires中包含的通配符如`requires:[‘Ext.grid.*’]`）。

##### 多页工程

多页面工程在编译时为了公用代码通常采用两种方法，一种是将共同的业务代码提取到某个common.js目录下有利于浏览器的缓存，另一种方法是将框架的公用代码提取到common.js下进行缓存。第二种方法可能加载一个某个页面不需要的框架代码，但是浏览器的缓存可以可以弥补这一增长。具体指令参见Multi-Page Ext JS Apps。第一方法的指令如下：

	sencha compile -classpath=ext/src,common/src,page1/src,page2/src \
    page -name=page1 -in page1/index.php -out build/page1/index.php \
         -scripts ../common.js and \
    page -name=page2 -in page2/index.php -out build/page2/index.php \
         -scripts ../common.js and \
    intersect -set page1,page2 and \
    save common and \
    concat -yui build/common.js and \
    restore page1 and \
    exclude -set common and \
    concat -yui build/page1/all-classes.js and \
    restore page2 and \
    exclude -set common and \
    concat -yui build/page2/all-classes.js

具体的指令解释参考Multi-Page Ext JS Apps。
对于两个以上的页面（如5个）的交集可能比较小，达不到缓存的的目的。可用使用“模糊交集”来实现这一目的。如制定-min=3，则表示只要三个工程使用到某个类，即可把这个类放到common.js中，具体指令参考以上链接。

#### 更新工程
当Ext SDK有更新时，可以运行以下指令来更新工程。

##### Upgrading Just The Sencha Cmd Scaffold
To bring up a new version of Sencha Cmd with your application produced by a previous version, you can run this command from inside your application:

	sencha app upgrade --noframework

##### Upgrading Frameworks

	sencha app upgrade ../downloads/ext-4.2.0	

	sencha app upgrade ../downloads/ext-4.1.2
	
#### 发布
generate a manifest of all JavaScript dependencies in the form of a JSB3 (JSBuilder file format) file, and create a custom build containing only the code that your application needs.

	// 对于本地静态页面
	sencha create jsb -a index.html -p app.jsb3
	//对于在线页面
	sencha create jsb -a http://localhost/helloext/index.html -p app.jsb3
	
Generating the JSB3 first gives us a chance to modify the generated app.jsb3 before building - this can be helpful if you have custom resources to copy, but in most cases we can immediately proceed to build the application with the second command:

	sencha build -p app.jsb3 -d

This creates 2 files based on the JSB3 file:

**all-classes.js** - This file contains all of your application's classes. It is not minified so is very useful for debugging problems with your built application. In our example this file is empty because our "Hello Ext" application does not contain any classes.

**app-all.js** - This file is a minimized build of your application plus all of the Ext JS classes required to run it. It is the minified and production-ready version of all-classes.js + app.js.

## 工作空间

- [Workspaces in Sencha Cmd](http://docs.sencha.com/extjs/4.2.1/#!/guide/command_workspace)

- [Single-Page Ext JS Apps](http://docs.sencha.com/extjs/4.2.1/#!/guide/command_app_single)

- [Multi-page and Mixed Apps](http://docs.sencha.com/extjs/4.2.1/#!/guide/command_app_multi)

### 工作空间

A workspace is simply a folder that contains one or more pages, frameworks, packages and other shared code or files. The location of the workspace root folder should be chosen to facilitate these needs as well as your source control requirements.

#### 创建工作空间

	sencha generate workspace /path/to/workspace

文件结构如下：

	.sencha/                # Sencha-specific files (e.g. configuration)
	    workspace/          # Workspace-specific content (see below)
	        sencha.cfg      # Configuration file for Sencha Cmd
	        plugin.xml      # Plugin for Sencha Cmd	

By default, a workspace that has both Sencha Ex JS and Sencha Touch SDK's will have these property settings in ".sencha/workspace/sencha.cfg":

	ext.dir=${workspace.dir}/ext
	touch.dir=${workspace.dir}/touch

一般而言，需要拷贝sencha sdk和touch sdk到工程中。以上两个变量分别制定sencha sdk和touch sdk的路径。在生成页面时，也需要制定sdk的路径，该路径要和sencha.cfg中ext.dir或touch.dir指定的路径相同，否则会生成工程失败。 sdk的拷贝不一定要纳入版本控制，每个开发人员的机器上可以指定不同的sdk路径。       

The value of the workspace.dir property is determined by Sencha Cmd and is expanded as needed. In other words, by default, a workspace contains a copy of the SDK's used by the applications it holds.

Applications reference their framework indirectly using the app.framework property in their ".sencha/app/sencha.cfg" file:

	app.framework=ext	

Once you have a workspace, generating pages ("apps") is the same as before:

	sencha -sdk /path/to/ext generate app ExtApp /path/to/workspace/extApp

#### Generating Pages(apps)

Once you have a workspace, generating pages ("apps") is the same as before:

	sencha -sdk /path/to/ext generate app ExtApp /path/to/workspace/extApp

You can also generate Sencha Touch applications in the same workspace:

	sencha -sdk /path/to/touch generate app TouchApp /path/to/workspace/touchApp

Because the target of these generated pages is in a workspace, the following structure will be created (which is slightly different than for a single-page app):

	.sencha/                    # Sencha-specific files (e.g. configuration)
	    workspace/              # Workspace-specific content (see below)
	        sencha.cfg          # Workspace's configuration file for Sencha Cmd
	        plugin.xml          # Workspace plugin for Sencha Cmd

	ext/                        # A copy of the Ext JS SDK
	    ...

	touch/                      # A copy of the Sencha Touch SDK
	    ...

	extApp/
	    .sencha/                # Sencha-specific files (e.g. configuration)
	        app/                # Application-specific content
	            sencha.cfg      # Application's configuration file for Sencha Cmd

	touchApp/
	    .sencha/                # Sencha-specific files (e.g. configuration)
	        app/                # Application-specific content
	            sencha.cfg      # Configuration file for Sencha Cmd

	build/                      # The folder where build output is placed.
	    extApp/                 # Build output for ExtApp (by environment)
	        production/
	        testing/
	    touchApp/               # Build output for TouchApp (by environment)
	        production/
	        testing/
	        native/
	        package/

#### Building Pages

The process for building each page of a multipage application is to run this command from each of the appropriate folders:

	sencha app build

#### Configuration
The file ".sencha/app/sencha.cfg" holds configuration for one page ("app"). The most important of the properties found there is perhaps app.classpath.

The ".sencha/workspace/sencha.cfg" file is now useful for setting configuration properties for all pages in the workspace. The most important of these properties after framework locations is probably workspace.classpath.

The order these files are loaded when present is as follows:

- ${app.dir}/.sencha/app/sencha.cfg
- ${workspace.dir}/.sencha/workspace/sencha.cfg
- ${ext.dir}/cmd/sencha.cfg or ${touch.dir}/cmd/sencha.cfg
- ${cmd.dir}/sencha.cfg

#### Sharing Code Between Pages

Let's add a common folder to the workspace, like so:

	.sencha/
	    workspace/
	    ...
	common/             # Folder for common things between pages.
	    src/            # Folder for common JavaScript code for all pages.

To include common/src when building all pages in the application, add the follow to ".sencha/workspace/sencha.cfg":

	workspace.classpath=${workspace.dir}/common/src

This adds the following component to the default classpath:

	${framework.classpath},${workspace.classpath},${app.classpath}	    

### 应用间共享代码
修改.sencha/workspace/sencha.cfg
	workspace.classpath=${workspace.dir}/common/src
	common/src为workspace下共享代码的目录。

## Packages

TODO	