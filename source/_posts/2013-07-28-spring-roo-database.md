---
layout: post
title: "Spring Roo Database"
description: ""
category: Spring
tags: [spring,roo,database]
---
### 
当前实现JPA持久化接口的框架主要有Hibernate、EclipseLink,、Open-JPA。HSQLDB为独立运行的数据库，占用空间很小，支持JDBC接口，可以用来做小型项目。

### 建立jpa

创建Hibernate提供的HSQLDB
jpa setup --database HYPERSONIC_PERSISTENT --provider HIBERNATE
其中database不是数据库的类型，provider表示JPA的实现者。

再如：

	jpa setup --provider ECLIPSELINK --database H2_IN_MEMORY

查看数据库配置

	properties list --name database.properties --path SPRING_CONFIG_ROOT

还可以通过命令编辑配置，具体见Spring.Roo.In.Action P61

	META-INF/persistence. xml

创建数据库后自动生成该文件，该文件会更具使用不同的provider而使用不同的配置。如果Hibernate，则

	<property name="hibernate.hbm2ddl.auto" value="create"/>

<!--more-->	

用来配置启动时，数据库的处理。

create/删除数据库然后创建
create-drop/启动时开始，关闭时删除
update/添加或修改新增的域，但是不会删除entity中删除的域。
validate/如果数据库中的表列和entity中的配置不同时，抛出异常。
none/啥都不做
而使用EclipseLink的配置与这个不同，Spring会根据创建数据库中配置来自动更新配置文件。


<!-- more -->

###常用方法

flush()将强制JPA执行SQL语句，clear将重置context，之后的所有数据请求都将从数据库中获取，而不是JPA的session缓存。

###常用配置

配置显示sql语句，log4j.logger.org.hibernate.tool.hbm2ddl=debug
在SST console中和在target/surefire-reports输出文件中都可以看到sql语句，

###关系

**One2Many**

创建TrainingProgram和Course的一对多关系。

	~.model.TrainingProgram roo> field set --fieldName courses 
	--type ~.model.Course 
	--cardinality ONE_TO_MANY --mappedBy trainingProgram

其中mappedBy的值为定义在Course中trainingProgram的属性，表示JAP在多的一段，即Course一端维护关系。对于生成One2Many的双向关系，必须使用mappedBy，否则会另外生成一个中间表，形成多对多的关系。

生成的代码为：

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "trainingProgram")
	private Set<Course> courses = new HashSet<Course>();

生成另一端

	~.model.TrainingProgram roo> focus --class ~.model.Course
	~.model.Course> field reference --fieldName trainingProgram 
	--type ~.model.TrainingProgram 
	--cardinality MANY_TO_ONE

生成的代码为：

	@ManyToOne
	private TrainingProgram trainingProgram;

默认的一对多关系为级联关系，如删除training program，相应的course将被删除。加载一个training program，它相应的courses将加载，即调用getCourses()方法。

**Many2Many**

建立Many2Many与两种方法，一种是建立一个中间Entity，和两个Entity分别建立One2Many的关系，另外一种方法是使用Many2Many注解，两种生成的表结构相同。
建立Tag到Course多对多的关系

	field set --fieldName courses --type ~.model.Course
	--cardinality MANY_TO_MANY

生成的Java代码为

	@ManyToMany(cascade = CascadeType.ALL)
	private Set<Course> courses = new HashSet<Course>();

建立反向关系

	focus --class ~.model.Course
	field set --fieldName tags --type ~.model.Tag
	--cardinality MANY_TO_MANY
	--mappedBy courses

生成的代码为：

	@ManyToMany(cascade = CascadeType.ALL, mappedBy = "courses")
	private Set<Tag> tags = new HashSet<Tag>();

在Many2Many的双向关系中，必须以一端为主方向，一端为反方向，被mappedBy声明的一端为反方向。
必须清楚主方向和反方向，因为更新反方向并不会触发JAP的固化，即不会生成SQL语句，而更新主方向则可以。如：

	course.getTags().add(t1);
	course.getTags().add(t2);
	t1.getCourses().add(course);
	t2.getCourses().add(course);

前两句只是为JAVA的关系而写，并不会生成SQL语句，而后两句则会对JAVA和JAP都产生印象，触发JAP持久化。

对于One2Many同样具有正反关系，建议主关系为Many端，因为它包含外键。而Many2Many则视具体情况而定。

尽管Roo的持久化引擎支持所有的JAP关系，但是web scaffolding和自动测试系统并不支持所有的构造函数。如内置组建时不支持的。

**One2One**

通常用于解决1对1的关系。有三种方式实现1对1的关系：所有对象放在1张表SINGLE_TABLE；每个子类各放1张表，需要N张表，N表示子类的个数TABLE_PER_CLASS； 每个类使用1张表，需要N+1张表JOINED。

对于SINGLE_TABLE，为了定位行，需要结合使用@DiscriminatorColumn, @Discriminator-
Formula, and @DiscriminatorValue 注解。每个子类的域必须为可空的。

	entity jpa --class ~.model.Person --abstract
	--inheritanceType TABLE_PER_CLASS

产生的代码如：

	@RooJavaBean
	@RooToString
	@RooJpaActiveRecord(inheritanceType = "TABLE_PER_CLASS")
	public abstract class Person {
	@Size(min = 1, max = 30)
	private String firstName;
	}

定义Student

	entity jpa --class ~.model.Student --extends ~.model.Person
	--testAutomatically

默认情况下，主键ID的策略为GenerationType.AUTO：

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private Long Course.id;

但想MySQL等数据库引擎使用IDENTITY数据类型作主键，所以需要手动修改。使用Hibernate持久化引擎时，既不能用AUTO也不能用IDENTITY。参考P109，http://mng.bz/PpLH。
其他的主键策略除了AUTO，IDENTITY还有SEQUENCE和SEQUENCE。SEQUENCE策略使用一张表来记录最大的主键值。SEQUENCE使用高性能的自动增长内部数字序列。

###数据库反向引擎

	database reverse engineer --schema coursemgrch04 
	--includeTables "invoice payment" 
	--package ~.model --testAutomatically
