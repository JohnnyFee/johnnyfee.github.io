layout: post
title: "Spring 装配"
tagline: ""
category: Spring
tags: [spring,wire]
---
###装配属性
####装配简单类型

	<bean id="kenny"
		class="com.springinaction.springidol.Instrumentalist">
		<property name="song” value="JingleBells"/>
		<property name="age” value="37"/>
	</bean>
	
####装配引用类型

	<bean id="kenny2"
		class="com.springinaction.springidol.Instrumentalist">
		<property name="song” value="JingleBells"/>
		<property name="instrument" ref="saxophone"/>
	</bean>

<!--more-->	
	
####使用p命名空间

	<beans xmlns="http://www.springframework.org/schema/beans"
		xmlns:p="http://www.springframework.org/schema/p"
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		xsi:schemaLocation="http://www.springframework.org/schema/beans
		http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

####装配属性

	<bean id="kenny” class="com.springinaction.springidol.Instrumentalist"
	p:song="JingleBells"
	p:instrument-ref="saxophone"/>

####装配集合
装配数组和集合（Collection及其子类），可以使用list和set，装配Map使用map，装配Properties使用props。如：

	<bean id="hank"
	class="com.springinaction.springidol.OneManBand">
		<property name="instruments">
		<set>
		<ref bean="guitar"/>
		<ref bean="cymbal"/>
		<ref bean="harmonica"/>
		<ref bean="harmonica"/>
		</set>
		</property>
	</bean>

可以在list中包含`<value>`、`<bean>`、`<null />`、`<list>`。

####装配map

	<bean id="hank" class="com.springinaction.springidol.OneManBand">
		<property name="instruments">
		<map>
		<entry key="GUITAR” value-ref="guitar"/>
		<entry key="CYMBAL” value-ref="cymbal"/>
		<entry key="HARMONICA" value-ref="harmonica"/>
		</map>
		</property>
	</bean>

####装配property

	<bean id="hank” class="com.springinaction.springidol.OneManBand">
		<property name="instruments">
		<props>
		<prop key="GUITAR">STRUMSTRUMSTRUM</prop>
		<prop key="CYMBAL">CRASHCRASHCRASH</prop>
		<prop key="HARMONICA">HUMHUMHUM</prop>
		</props>
		</property>
	</bean>
	
####注入null

	<property name="someNonNullProperty"><null/></property>

####申明集合

	<util:list id="cities">
		<bean class="com.habuma.spel.cities.City"
		p:name="Chicago" p:state="IL" p:population="2853114"/>
		<bean class="com.habuma.spel.cities.City"
		p:name="Dallas"p:state="TX"p:population="1279910"/>
	</util:list>

####加载Properties文件

	<util:properties id="settings"
		location="classpath:settings.properties"/>

###加载Spring上下文

	ApplicationContext ctx=newClassPathXmlApplicationContext(
	"com/springinaction/springidol/spring-idol.xml");
	Performer performer=(Performer)ctx.getBean("kenny");

###自动装配（xml）
自动装配分为按名字、按类型、按构造函数、自动发现四种。声明自动装配：

	<bean id="kenny" class="com.springinaction.springidol.Instrumentalist" autowire="byName">

**按名字**（autowire="byName"）：根据bean的id或者name查找相应的bean，装配到相关属性。如果没有找到则不做任何事情，如果找到多个会如何？

**按类型**（byType）：根据类名来查找bean，装配到相关属性。如果找到多个，会抛出异常。

按构造函数（autowire="constructor"）：会按类型查找bean，装配到构造函数。如果有多个构造函数可以满足，则会抛出异常。

**自动发现**（autowire="autodetect"）：自动装配的循序为：contructor/byType。
可以在beans中声明自动装配方法来应用到所有bean，可以在bean中混用自动装配和显示装配来装配bean。

###自动装配（注解）

Spring支持三种注解方式，Spring自带的@Autowired，JSR-330的@Inject，JSR250的@Resource。

####启动注解驱动的装配

	<context:annotation-config/>

####@Autowired
可以用于普通方法、set方法、构造函数、域（包括私有的），当没有bean或者找到多个bean时，会抛出异常。@Autowired是按类型查找的。可以使用@Autowired(required=false)，当没有找到bean时，不会抛出异常，该属性会返回null。当@Autowired用于构造函数上时，只有一个构造函数上设置required=true；当多个构造函数有@Autowired注解时，会选择可以装配的拥有最多的参数的那个构造函数。当有多个bean满足要求时，可以使用@Qualifier根据名字进一步选择。

	@Autowired
	@Qualifier("guitar")
	private Instrument instrument;

可以通过以下几个方法制定qualifier：

	@Qualifier("stringed")
	public class Guitar implements Instrument{
	...
	}

	<bean class="com.springinaction.springidol.Guitar">
	<qualifiervalue="stringed"/>
	</bean>

####@Inject

	@Inject
	private Instrumentinstrument;

`@Inject`没有required属性，和`@Qualifier`类似，可以用`@Name`来选择制定名字的bean。可以使用`@Value`来给基本类型的属性来注册值，该值可以是常量，也可以是SpEl 表达式。如：

	@Value("#{systemProperties.myFavoriteSong}")
	private Stringsong;

####自动发觉bean

使用`<context:annotation-config/>`只能装载bean的属性，并不能把bean加入到spring容器中，为了同时实现这两个功能，可以使用：

	<context:component-scan
	base-package="com.springinaction.springidol">
	</context:component-scan>

Spring会装载base-package的命名空间及其子命名空间下的组建。组建的注解包括：
`@Component`、`@Controller`、`@Repository`、`@Service`，以及使用`@Component`注解的自定义的类。
可以使用include和exclude来包含或者排除组建，如下例中将自动发现所有可以赋值给Instrument类型的类，其中type和expression共同组成包含或者排除策略，详见《Spring 实战 3rd》 P79 Table3.1。

	<context:component-scan
		base-package="com.springinaction.springidol">
	<context:include-filter type="assignable"
		expression="com.springinaction.springidol.Instrument"/>
	</context:component-scan>

自动发现的bean的默认名字为bean（第一个字母变小写），包括第三方库中的bean。

###Java-based的注入
#### 在配置文件中加入 ####

	<context:component-scan
	base-package="com.springinaction.springidol"/>

Spring扫描com.springinaction.springidol，拥有@Configuration注解的bean将会被注册。
#### 编写配置文件 ####

	@Configuration
	public classSpringIdolConfig{
	// Beandeclarationmethodsgohere
	}

编写Bean

	@Bean
	public Performerduke(){
	return newJuggler();
	}

###泛型注入

- [基于泛型实现的Spring注入问题](http://langkins.iteye.com/blog/156089)	