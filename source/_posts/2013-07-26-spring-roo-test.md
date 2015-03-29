layout: post
title: "Spring Roo Test"
description: ""
category: Spring
tags: [spring,roo,test]
---
## 测试

Spring Roo的测试分为：

test stub and test mock：脱离Spring容器的测试
test integration：Spring容器内的测试
selenium test：针对controller的测试

###数据库测试

	@Test
	@Transactional
	public void addAndFetchCourse() {}
	
	@Transactional表示当但愿测试成功后，对数据库的所有更改都将被回滚。

<!--more-->	

###生成测试用例

生成某个entity的测试用例，一种方法是参考创建entity，另外一种方法是使用命令：dod --entity ~.model.Course。

生成的DataOnDemand中关键方法：
getNewTransientEntity：获取一个transient状态的对象，即为持久化，传入的index用户初始化对象的值。

getSpecificEntity：用于获取一个持久化的对象，如果list是空的，会自动调用init方法，初始化10个对象。如果未找到，则选最index最小的或者最大的对象返回。
getRandomEntity：返回一个随机的持久化对象。

测试stub测试用例：test stub --class ~.service.DefaultTaxService
