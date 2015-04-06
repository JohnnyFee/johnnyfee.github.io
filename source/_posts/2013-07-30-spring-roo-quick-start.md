layout: post
title: "Spring Roo Quick Start"
description: ""
category: Spring
tags: [spring,roo]
---
###	安装

下载Spring Roo：http:// springsource.org/spring-roo
将其中的bin文件设置到环境变量中
如果启动时，出现异常，请清除cache文件夹下的内容。

###	QuickStart
1)	CREATING THE PROJECT

	roo> project --topLevelPackage com.springsource.pizzashop

2)	DATABASE SETUP

	roo> jpa setup --provider ECLIPSELINK --database H2_IN_MEMORY

3)	CREATING JPA ENTITIES

	roo> entity jpa --class ~.domain.Topping --activeRecord false --testAutomatically
	roo> field string --fieldName name --sizeMin 2

4)	SETTING UP REPOSITORIES

	repository jpa --interface ~.repository.ToppingRepository --entity ~.domain.Topping

5)	CONFIGURING SERVICES

	service type --interface ~.service.ToppingService --entity ~.domain.Topping

6)	CONFIGURING JSON

	json all --deepSerialize
	web mvc json setup
	web mvc json all

7)	SPRING MVC

	web mvc setup
	web mvc all --package ~.web

8)	Run

	mvn package jetty:run 或者 mvn package tomcat:run

<!-- more -->	

### 常用命令
**hint**

可以提示当前项目状态下可以执行的命令，或者在roo命令环境下按tab。敲击命令时，可以使用tab键来获取提示。可以使用help xxx来查询命令的帮助。

**日志**

设置根日志级别

	logging setup --level WARN

指定项目的日志级别

	logging setup --level TRACE --package PROJECT

**备份**

backup
可以现下载git插件，结合git来使用。详见《Spring.Roo.In.Action》P32。

**在roo下执行mvn命令**

需要maven配置assemply插件

	perform test/perform package/perform assembly
	perform command/perform clean

### 创建工程

对于新创建的项目，在Eclipse需要右键/Spring Tools/Enable Spring Asplect Tooling，来启用Spring Aspect编译器。

**创建普通项目**

默认创建jar项目，并且使用指定的package结构，并且之后可以使用~应用这个package，其他组件将在这个package之下被创建。

	project --topLevelPackage com.springsource.pizzashop

**创建聚合项目**

	project --topLevelPackage org.rooinaction.taskmanager --packaging POM --projectName taskmanager

**创建子项目**

	roo> module create --moduleName infrastructure
	--topLevelPackage ~ --packaging JAR
	
	module create --moduleName taskmanager-web
	--topLevelPackage ~.web --packaging WAR

创建项目后，焦点会转移到新创建的项目，可以使用module focus将焦点转移到别的项目，如：

	module focus --moduleName taskmanager-data
	module focus --moduleName ~

### IDE

通过market下载STS插件

**隐藏Roo ITDs**

使用Package ExplorerFilters(展开三角形)/Hide generated Spring Roo ITDs

**Push-in重构**

可以把Spring Roo生成的代码的方法拉入类中，以实现自定义。右键需要拉入的方法/Refactor/Push in

**Pulling重构**

可以把自定义的代码拉到一个新的ITD中，需要创建一个新的Aspect和新的注解对应，以实现使用自定义注解来自动生成方法。

###Sample
*在Spring Roo安装目录下的sample文件夹下*

#### 运行sample

将.roo文件拷贝到一个空的文件夹
cmd定位到该目录
运行

	roo script pizzashop.roo
	
运行

	mvn package jetty:run

默认使用8080端口，访问网站http://localhost:8080/pizzashop

也可以在roo环境下运行roo脚本

	script --file ../roo-scripts/setup-roo-domains.roo

####Sample说明

- **bikeshop.roo** This is a sample website for a bicycle shop that uses the JSF
web framework.
- **clinic.roo** The Pet Clinic is a simple Spring sample application that shows
off a somewhat complex set of relationships.
- **embedding.roo** This shows examples of embedding various media objects
from Twitter, YouTube, UStream, Google Video, and others.
- **expenses.roo** This is an expense tracking system, using Google Web Toolkit
and Google App Engine.
- **multimodule.roo** This shows off Roo’s support for multimodule Maven 
projects.
- **vote.roo** This is a simple voting system, using Spring MVC and Spring 
Security.
- **wedding.roo** This sets up a wedding planner

###参考资料

- [Spring Roo - Reference Documentation](http://static.springsource.org/spring-roo/reference/html/)
- [Spring Framework](http://static.springsource.org/spring/docs/3.0.x/spring-framework-reference/html/index.html)
- [Spring MVC Showcase sample](https://github.com/SpringSource/spring-mvc-showcase/tree/master/src/main/java/org/springframework/samples/mvc)

####JPA

- [Spring Data JPA - Reference Documentation](http://static.springsource.org/spring-data/data-jpa/docs/current/reference/html/)
- [SPRING DATA - JPA](http://www.springsource.org/spring-data/jpa)
 
####工具库
- Joda库
