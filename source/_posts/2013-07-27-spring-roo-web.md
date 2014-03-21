---
layout: post
title: "Spring Roo Web"
description: ""
category: Spring
tags: [spring,roo,web]
---
### 
一个Spring MVC项目至少分三个层，用户界面、服务层、持久化层。
###Srping MVC

Setup Spring MVC，并且将数据修改为war

	web mvc setup

创建好工程后，运行setup spring mvc可以将工程自动转化为spring mvc工程。
生成的目录结构参考《Srping.Roo.In.Action》 P120 Table5.1

**创建Controller**

	web mvc controller --class ~.web.TestDriveController

命令除了创建Controller之外，也会创建相应的view和menu，以及国际化文件。

<!--more-->	

**为某个entity生成Controller**

	roo> web mvc scaffold --class ~.web.CourseController --backingType ~.model.Course

CourseController_Roo_Controller.aj 包括creating, reading, updating? and deleting Course的业务逻辑。
生成的代码如：

	@RooWebScaffold(path = "courses",formBackingObject = Course.class)
	@RequestMapping("/courses")
	@Controller
	public class CourseController {
	
	}


<!-- more -->

其中，RooWebScaffold用来为Roo提供生成和管理JSPX提供依据。

**生成Controller和对应的view层**

	web mvc setup 
	web mvc all --package ~.web

**为别的模块的Service生成Controller**

	roo> module focus --moduleName ~.web
	roo> web mvc scaffold --class ~.controller.CourseController 
	--entity business|~.service.CourseService

**redirect:**

	return "redirect:/courses/" +
	encodeUrlPathSegment(course.getId().toString(), request);

###配置JSON

web层返回mvc：

	json all --deepSerialize 
	web mvc json setup 
	web mvc json all

###创建Repository

有时候事务控制的边界模糊不清或者查询设计到多个实体时，在entity做这些操作时不合适的，这是可以JTA的Repositoty。

	repository jpa --interface ~.repository.ToppingRepository --entity ~.domain.Topping

对应的Java代码为：

	@RooJpaRepository(domainType = Topping.class)
	public interface CourseRepository {
	}

声称_Roo_Repository.aj文件，使ToppingRepository继承JpaRepository和JpaSpecificationExecutor。其中ToppingRepository提供CRUD方法，如

	java.util.List<T> findAll();
	java.util.List<T> findAll(org.springframework.data.domain.Sort sort);
	java.util.List<T> save(java.lang.Iterable<? extends T> iterable);
	void flush();
	T saveAndFlush(T t);
	void deleteInBatch(java.lang.Iterable<T> tIterable);

JpaSpecificationExecutor提供基于criteria的查找、分页等功能，如

	T findOne(Specification<T> tSpecification);
	List<T> findAll(Specification<T> tSpecification
	Page<T> findAll(Specification<T> tSpecification, Pageable pageable);
	List<T> findAll(Specification<T> tSpecification, Sort sort);
	long count(Specification<T> tSpecification);


其中Specification用于提供查询条件的接口，如：

	public class CourseSpecifications {
		public static Specification<Course> hasRunDate() {
			return new Specification<Course>() {
			@Override
			public Predicate toPredicate(
				Root<Course> root,
				CriteriaQuery<?> query,
				CriteriaBuilder cb) {
					return cb.isNotNull(
					root.get("runDate"));
				}
			};
		}
	}

其中，root参数用于访问JPA entity中的类型，CriteriaQuery有Spring运行时构建的，CriteriaBuilder用于添加查询断言。使用方法如下：

	List<Course> courses = courseRepository.findAll(
	CourseSpecifications.hasRunDate());

###Entity基于注解的查询@Query

**查询**

	@Query("select distinct r from Registration as r " +
	"where r.student.id = :studentId " +
	"and r.offering.offerDate between :start and :end")
	
	@Transactional(readOnly = true)
	List<Registration> findStudentRegistrationForOfferingsInDateRange(
		@Param("studentId") long studentId,
		@Param("start") Date start,
		@Param("end") Date end);

**更新**

	@Query("update Registration r set attended = :attended " +
	"where r.student.id = :studentId")
	@Modifying
	@Transactional
	void updateAttendance(
		@Param("studentId") long studentId,
		@Param("attended") boolean attended);

其中@Modifying表示表示有数据被修改，将使用读写事务。

###直接使用JPA

在Respository中，可以直接使用entityManager()来访问Context，当然可以直接使用JPA。如：

	@Repository
	public class CourseQueryRepositoryJPA {
	@PersistenceContext
	private EntityManager em;
	}

在Service中注入Repository

	private CourseQueryRepository repository;
	@Autowired
	public void setCourseQueryRepository(CourseQueryRepository repository) {
	this.repository = repository;
	}

在Roo生成Service的时候，不会使用普通的Spring Repository。Just configure
your Spring application with the appropriate JDBC driver and data source，使用JdbcTemplate。

###创建Service

Service层的上层可以是Active Record Model，也可以是Repository层。

	service --entity ~.model.Course --interface ~.service.CourseService

生成的代码如：

	@RooService(domainTypes = { 
	org.rooinaction.coursemanager.model.Course.class })
	public interface CourseService {
	}

CourseServiceImpl被@Service标注，使它成为Spring Bean，也被@Transactional标注，使所有的方法纳入事物管理，如果加入一个方法，不需要使用事物，则需要改变事物属性，如@Transactional(readOnly = true)。

###View

View定义在WEB-INF/views/views.xml中
如定义名为testdrive/index的视图

	<definition extends="default" name="testdrive/index">
	<put-attribute name="body" value="/WEB-INF/views/testdrive/index.jspx"/>
	</definition>

视图解析器：WEB-INF/webmvc-config.xml

	<bean
	class="org.springframework.web.servlet.view.tiles2.TilesConfigurer"
	id="tilesConfigurer">
	<property name="definitions">
	<list>
	<value>/WEB-INF/layouts/layouts.xml</value>
	<!-- Scan views directory for Tiles configurations -->
	<value>/WEB-INF/views/**/views.xml</value>
	</list>
	</property>
	</bean>

其中layouts.xml定义两个主要的layout，及public和default，定义在WEB-INF/layouts.xml文件中。default包含header，foot和menu，而public不包含menu。

**元素的生成规则**

Id的生成规则：

	id_[java-packages].[entity-name][.[field-name]]

显示entity集合的lable：

	label_com_rooinaction_coursemanager_course=Course_plural=Courses

指定域的lable：
	
	label_com_rooinaction_coursemanager_course_name=Name

Html中所有元素的id=_fieldname_id

**Z**

Z的值有两种，一种是最随机生成的字符串，另一种= user-managed。

####视图解析原理

When the method returns testdrive/index, Spring MVC delegates to the Tiles view
resolving mechanism, passing it a template named testdrive/index. Look in the
WEB-INF/views directory for the testdrive subdirectory, and review views.xml:

	<definition extends="default" name="testdrive/index">
	<put-attribute name="body" value="/WEB-INF/views/testdrive/index.jspx"/>
	</definition>

Roo configures a definition for a tile named testdrive/index. It uses the default
layout, and the body tile resolves to testdrive/index.jspx.

###运行

mvn package tomcat/jetty:run 编译和运行工程，启动Tomcat/Jetty 8080端口。 修改Tomcat的默认端口（http://mng.bz/IgJ5）： 

	<plugin>
	<groupId>org.codehaus.mojo</groupId>
	<artifactId>tomcat-maven-plugin</artifactId>
	...
	<configuration>
	<port>9090</port>
	</configuration>
	</plugin>

配置Jetty如（参考http://mng.bz/1MM6）：

	<groupId>org.mortbay.jetty</groupId>
	<artifactId>jetty-maven-plugin</artifactId>
	<version>7.4.2.v20110526</version>
	<configuration>
	<scanIntervalSeconds>5</scanIntervalSeconds>
	</configuration>
	</plugin>

运行多模块的工程

	$ cd [top-level directory of entire project]
	$ mvn install
	$ cd web
	$ mvn package jetty:run