layout: post
title: "Spring SpEl"
tagline: "Spring Expression Language"
category: Spring
tags: [spring,spel]
---
SpEl是Spring Expression Language的缩写，可以为bean的属性装配运行时的值。但是有没有IDE的只能提示，尽量不要使用太复杂的功能。

###基本类型
使用方法如，支持Java中所有的类型。

	<property name="count" value="#{5}"/>

###引用Bean
####引用bean

	<property name="instrument" value="#{saxophone}"/>

####引用bean中的属性

	<property name="song” value="#{kenny.song}"/>

<!--more-->	

####引用bean的方法

	不能引用bean中带参数的方法？

	<propertyname="song"value="#{songSelector.selectSong().toUpperCase()}"/>
	<propertyname="song"value="#{songSelector.selectSong()?.toUpperCase()}"/>

使用三元表达式的变体?，表示如实如果selectSong()不返回null，则调用
toUpperCase方法，否则返回null。

####引用类

	<property name="multiplier" value="#{T(java.lang.Math).PI}"/>，使用T() 返回指定Class对象。

###运算符
支持Java中几乎所有运算符，位运算除外，但是包含<>的运算符需要用表达式代替，如gt等。

###条件运算

	<property name="instrument"
	value="#{songSelector.selectSong()=='JingleBells'?piano:saxophone}"/>

对null的判断的简写形式：

	<property name="song” value="#{kenny.song?:'Greensleeves'}"/>

###正则表达式

	<property name="validEmail"value=
	"#{admin.emailmatches'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.com'}"/>

###集合

####访问元素
**访问集合元素**

	<property name="chosenCity"value="#{cities[2]}"/>

**访问map元素**

	<property name="chosenCity"value="#{cities[2]}"/>

**访问properties**

	<propertyname="accessToken"value="#{settings['twitter.accessToken']}"/>

**访问系统环境变量**

	<property name="homePath"value="#{systemEnvironment['HOME']}"/>

**访问Java参数**

	<propertyname="homePath"value="#{systemProperties['application.home']}"/>

**选择元素**

访问元素的集合，使用.?[]，返回一个新的集合

	<property name="bigCities" value="#{cities.?[population gt 100000]}"/>

返回其实元素.^[]

	<property name="aBigCity" value="#{cities.^[population gt 100000]}"/>

返回结尾元素.$[]

	<property name="aBigCity" value="#{cities.$[population gt 100000]}"/>

####投影
使用![]
返回name的集合

	<property name="cityNames" value="#{cities.![name]}"/>

放回name + ', ' + state的结合

	<property name="cityNames" value="#{cities.![name + ', ' + state]}"/>
