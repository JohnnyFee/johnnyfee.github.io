layout: post
title: "Spring Roo Entity"
description: ""
category: Spring
tags: [spring,roo,entity]
--- 
###创建Entity

注意：创建Entity前需要使用jpa setup命令创建数据库，具体请参考数据库一章。
entity jpa --class ~.domain.Topping --activeRecord false --testAutomatically
其中testAutomatically指定自动创建测试类，生成含有标注为@RooIntegrationTest的测试类。	

entity创建后会自动使用创建的entity作为上下文，之后执行的命令都是在这个上下文中执行。如果要到其他enetity中，使用focus命令的—class参数。
如

	focus --class ~.model.Course

创建实体域：

	field number --fieldName listPrice --type java.math.BigDecimal
	field number --fieldName maximumCapacity --type java.lang.Integer
	field date --fieldName runDate --type java.util.Date --persistenceType JPA_DATE --dateFormat SHORT

<!--more-->	

**枚举类型**

创建枚举类型

	enum type --class ~.model.CourseTypeEnum
	enum constant --name SEMINAR
	enum constant --name CREDIT

添加枚举类型的域

	field enum --fieldName courseType --type ~.model.CourseTypeEnum
	--enumType STRING

对应的代码为：

	@Enumerated(EnumType.STRING)
	private CourseTypeEnum courseType;

	
<!-- more -->

**日期类型**

	@Temporal(TemporalType.DATE)
	@DateTimeFormat(style = "S-")
	private Date runDate;

	@DateTimeFormat将会转化日期格式后返回，@Temporal为持久化指定日期类型。

生成的代码为：

	@Temporal(TemporalType.TIMESTAMP)@DateTimeFormat(style = "S-")
	private Date offeringDate;

	@DateTimeFormat支持S、M、L，形式如下：
	S 2010-06-15 12:15 PM
	M Jun 15, 2010 12:15:05 PM
	L June 15, 2010 12:15:05 PM EDT

也可以使用patter来指定日期格式：

	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "MM/dd/yyyy")

Controller ITD会添加下列代码

	uiModel.addAttribute(
	"offering_offerdate_date_format",
	DateTimeFormat.patternForStyle(
	"S-", LocaleContextHolder.getLocale()));
	}

View中使用uiMidel中提供的date format。
也可以在View中使用自定义的dateformat， 如在application
.properties定义short.date.format=MM/dd/yyyy，在View中使用

	<table:column date="true" dateTimePattern="${short.date.format}"
	id="c_org_rooinaction_coursemanager_model_Offering_runDate"
	property="runDate" z="user-managed"/>

**引用数据（reference data）**

使用addAttribute方法，如

	uiModel.addAttribute("coursetypeenums",
	Arrays.asList(CourseTypeEnum.values()));

使用@ModelAttribute，将数据存储在Model中返回：
在Controller的方法加上ModelAttribute标注，

	@ModelAttribute("offerings")
	public Collection<Offering> OfferingController.populateOfferings() {
	return Offering.findAllOfferings();
	}

View层：

	<field:select
	field="offering"
	items="${offerings}"
	itemlabel="offerDate" itemValue="id"
	.../>

###注解

**常用注解**

	@RooJavaBean生成_Roo_JavaBean.aj文件，提供Get和Set方法。
	@RooToString生成_Roo_ToString.aj文件。
	@RooJpaEntity 生成_Roo_Jpa_Entity文件。
	@RooJpaActiveRecord生成_Roo_Configurabl.aj和_Roo_Jpa_ActiveRecord，提供基本的CRUD模版方法，提供该注解之后，可以省略@RooJpaEntity注解通过_Roo_Configurabl.aj通过@Configuration启用Spring的依赖注入，当通过构造函数new一个对象时，会触发依赖注入。

**CRUD**

查找

	List<Course> courses = Course.findAllCourses();

更新

	Course course = Course.findCourse(1L);
	course.setMaximumCapacity(500);
	course.merge();

创建

	Course course = new Course();
	course.setName("Stand-up Comedy");
	course.setMaximumCapacity(8);
	course.setDescription("It'll make you laugh...");
	c.setCourseType(CourseTypeEnum.CONTINUING_EDUCATION);
	c.persist();

删除

	c.remove();

###验证

**注解**

	@NotNull, @Null, @Min, @Max, @Past, @Future, @Pattern, @Size, @DecimalMin, 
	@DecimalMax, @Digits,

当不满足约束条件的情况下，固化对象时，会抛出ConstraintViolationException，可通过该对象的getConstraintViolations()的方法来获取验证错误信息。
如：

	@NotNull
	@DecimalMin("0.0")
	@DecimalMax("99999.99")
	@Digits(integer = 5, fraction = 2)
	private BigDecimal listPrice;

	@NotNull
	@Column(name = "max_capacity")
	@Min(1L)
	@Max(9999L)
	private Integer maximumCapacity;

	@Temporal(TemporalType.TIMESTAMP)
	@DateTimeFormat(pattern = "MM/dd/yyyy")
	private Date runDate;

	@NotNull
	@Enumerated(EnumType.STRING)
	private CourseTypeEnum courseType;

**自定义验证**

如：
	@AssertTrue(message =
	"Price is invalid. No fractional values allowed.")
	public boolean isPriceValid() {
	if (listPrice == null) return true;
	BigDecimal remainder = listPrice.remainder(new BigDecimal("1.0"));
	return remainder.compareTo(new BigDecimal("0")) == 0;
	.compareTo(new BigDecimal("0.0")) == 0;
	}

使用@AssertTrue注解方法，当固化方法所属的对象时，该方法将会被调用。验证方法的可见级别不受显示，及可以是private方法，方法必须是返回boolean值的get或is开头的方法。

###Roo finder

Roo Finder是基于JPA-QL的模版方法，JPA-QL实现查找的方法如下：

	Query q = entityManager.createQuery(
	"SELECT course FROM Course AS course " +
	"WHERE course.maximumCapacity BETWEEN :min AND :max",
	Course.class);
	q.setParameter("min", 2);
	q.setParameter("max", 3);
	List<Course> results = q.getResultList();

**列出指定字段的查询器**

	~.model.Course roo> finder list --filter name

其中name为当前focus的model类的属性
列出结果：

	findCoursesByNameEquals(String name)
	findCoursesByNameIsNotNull()
	findCoursesByNameIsNull()
	findCoursesByNameLike(String name)
	findCoursesByNameNotEquals(String name)

**添加查找方法，如like方法**

	~.model.Course roo> finder add --finderName findCoursesByNameLike

对应的注解为@RooJpaActiveRecord(finders = { "findCoursesByNameLike" })，并且会产生_Roo_Finder.aj文件。

**暴露Entity的finder到Controller**

	roo> web mvc finder add --formBackingType ~.model.Course --class ~.web.CourseController

或者在Controller上加标注@RooWebFinder，同时会增加搜索页面和搜索结果页面。

**多域查询**

	finder list --depth 2 --filter courseType,runDate

其中—depth是指域的组合深度，=2表示允许两者组合，=1表示只允许单个组合。
利用命令生成finder，只能限制在entity的域中，如果有更复杂的查询，可以重定义生成的方法。