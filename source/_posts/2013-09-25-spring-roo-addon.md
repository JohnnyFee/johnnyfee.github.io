layout: post
title: "Spring Roo 插件"
description: ""
category: Spring
tags: [spring,roo,addon]
---
###插件实现原理

Roo add-ons are “tool-time” features—they’re wired into the shell as **OSGi** bundles,
which are special JAR files that can be loaded and unloaded at will from an OSGicompliant
application. 

OSGi is a dynamic module system for Java. It allows Java applications to load, start,
stop, update, and unload artifacts such as JARs and WARs on the fly, without stopping
and restarting. Think of it as a dynamic, class-loading system that’s smart enough to
resolve complex dependencies. You use OSGi in many applications today, including
Eclipse, which the SpringSource Tool Suite is based on, and which runs with a small
application core under the Equinox OSGi container.

###插件列表

	addon list

- --compatibleOnly—Show only compatible add-ons.
- --trustedOnly—Show only add-ons by trusted developers.
- --communityOnly—Show only add-ons contributed to the system by the outside
community. Some of the add-ons available include upgrades of key Roo components
and optional JARs, so this option weeds out internal JARs from the list.
- --linesPerResult—By default, Roo shows only two comment lines. If an addon
has more documentation, you can expand the number of rows to read the
result.
- --refresh—The list of add-ons are loaded on startup. Use this option to force
a reload of the list.

<!--more-->

###搜索插件

搜索git相关的插件

	addon search --requiresDescription git

###查看插件信息

查看id为37的插件信息

	 addon info id --searchResultId  37

###安装插件

提供四种方式安装插件

- `addon install` install it from the central Roo add-on repository
- `osgi start` install add-ons from a URL or a file
- `osgi obr` mount an OSGi repository and install
the add-on from that repository. Useful in a corporate environment where your
team needs to share company-wide add-ons.
- Copy the add-on JAR file to the Roo installation’s bundles directory.

安装git插件

查找git插件的id

	addon search --requiresCommand git

根据插件ID安装

	addon install id --searchResultId 01

也可以根据插件信息的BSN安装

	addon install bundle --bundleSymbolicName org.springframework.roo.addon.git

通过BSN的方式可以不依赖于ID，因为ID并不是插件的唯一标识，通过addon search和addon list得到的同一个插件ID可能不同。通过BSN的方式也可以多条脚本语句同时执行。

安装完成后，通过

	roo> [TAB]

便可看到git命令了。

###升级插件

查看所有可以升级的插件

	addon upgrade available

查看所有RELEASE级别的可升级插件

	addon upgrade available --addonStabilityLevel RELEASE

其他级别可通过

	addon upgrade available --addonStabilityLevel [TAB]

If you accidentally upgrade your Roo artifacts and the shell won’t start properly, you can go back to the original installed version by deleting the contents of the cache directory in your Roo installation directory.	
			 
升级所有插件

	addon upgrade all

###删除插件

删除git插件

	addon remove --bundleSymbolicName org.springframework.roo.addons.git

查看所有可删除的插件

	addon remove --bundleSymbolicName [TAB]

###创建插件

以创建中文i18n插件为例

	mkdir chinese-i18n
	cd chinese-i18n

拷贝中文图标cn.png到chinese-i18n中。
所有语言的图标可以从<http://www.famfamfam.com/lab/icons/flags/>下载。

创建中文消息文件messages_zh.properties

执行roo进入roo的上下文
执行以下代码，创建工程模板。

	addon create i18n --topLevelPackage org.rooinaction.addons.i18n.chinese --locale cn --messageBundle messages_zh.properties --language chinese --projectName rooinaction-chinese-language-addon --flaggraphic cn.png

该插件在google code上已提供，	[spring-roo-addon-i18n-chinese](https://code.google.com/p/spring-roo-addon-i18n-chinese/)。

	