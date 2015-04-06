layout: post
title: "Spring Roo 国际化"
description: ""
category: Spring
tags: [spring,roo,i18n]
---
###国际化消息
WEB-INF/i18n目录下的`messages.properties`存放的是Roo Web框架级别的元素标签，如保存按钮的标签。application.properties存放项目级别的标签以及导航标签，如application_name，the label to use for each field。

使用国际化消息：

	<util:panel id="title" title="${title}">

定义消息变量：

	<spring:message code="application_name" var="app_name"/>

其中code为i18n文件中的键，var为变量名。	

使用变量，显示国际化消息

	<spring:message arguments="${app_name}" code="welcome_titlepane"/>

messages.properties中定义的titlepanel=welcome_titlepane=Welcome to {0}

<!-- more -->

###添加新的国际化语言：

	roo>web mvc language --code es	

执行过程如下：

Roo responds by adding a new locale file, messages_es.properties, and configuring it with all standard Roo messages relating to the default layout and features. It will be your responsibility to **copy your application.properties file to application_es.properties** and translate the field labels and messages to the proper locale. Because all files are mounted in this directory, you don’t need any additional configuration.

Roo also copies an icon for the language flag into the webapp/images directory, and updates the footer to allow you to click on that image to switch locales. You can also manually switch locales for your browser session using the lang query string parameter. For example, to translate the site to Spanish, you can issue

	http://localhost:8080/coursemanager?lang=es

By default this setting is kept in an in-memory browser cookie. If you’d like to make it more permanent, you can switch from the default `CookieLocaleResolver` to the `SessionLocaleResolver`. You can store and reload the session for each user from a data store if you wish. You can also use the `AcceptHeaderLocaleResolver` to automatically detect the locale based on the browser’s reported language.

目前这种方式支持的语言仅包括`de   en   es   it   nl   sv`。

###中文包

创建语言插件的方法可参考[Spring Roo 插件](http://localhost:4000/spring/2013/09/25/2013-09-23-spring-roo-addon/#id453)/创建插件。

Google Code上提供的语言包 [spring-roo-addon-i18n-chinese](https://code.google.com/p/spring-roo-addon-i18n-chinese)。

我们check out到D:/temp/spring-roo-addon-i18n-chinese-read-only目录下。

使用osgi安装中文插件

	osgi start --url file:///D:/temp/spring-roo-addon-i18n-chinese-read-only/repo/com/ccb/roo/addon/i18/com.ccb.roo.addon.i18/0.1.0.BUILD/com.ccb.roo.addon.i18-0.1.0.BUILD.jar

添加中文

	web mvc language --code zh 

运行你的工程，便可看到中文选项了。

![中文效果](http://johnnyimages.qiniudn.com/roo/zh_CN.png)

###参考

- [spring-roo-addon-mvc-i18n-zh-tw](https://code.google.com/p/spring-roo-addon-mvc-i18n-zh-tw/source/checkout)
- [Roo install i18n](http://stackoverflow.com/questions/6002780/roo-install-i18n)
