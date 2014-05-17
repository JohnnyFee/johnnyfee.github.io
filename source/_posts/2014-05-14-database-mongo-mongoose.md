---
layout: post
title: "MongoDb"
category: Node
tags: [mongodb, database]
--- 

## Tutorial

- [Mongoose学习参考文档——基础篇 - CNode](http://cnodejs.org/topic/504b4924e2b84515770103dd)

## Query

- [Queries - Mongoose Guide](http://cnodejs.org/topic/5206581b44e76d216aae072e)

## Connection Pool

- [How to share the connection pool across multiple databases · Issue #1124 · LearnBoost/mongoose](https://github.com/learnboost/mongoose/issues/1124)
- [node.js - Does mongoose allow for multiple database requests concurrently? - Stack Overflow](http://stackoverflow.com/questions/10039163/does-mongoose-allow-for-multiple-database-requests-concurrently)

	var conn = mongoose.createConnection('mongodb://localhost/test', {server:{poolSize:2}});
	var model = conn.model('Model', Schema);
	model.find({long query}, function() {
	   console.log("this will print out last");
	});
	model.find({short query}, function() {
	   console.log("this will print out first");
	});

- [构建 Node.js 应用之持久化 - 技术翻译 - 开源中国社区](http://www.oschina.net/translate/building-with-nodejs-persistence?print)
	- [Building with Node.js: Persistence](http://journal.michaelahlers.org/2012/12/building-with-nodejs-persistence.html)

## BAE

- [BAE3.0 使用mongoose连接mongodb](http://www.drmfly.net/2014/01/11/bae3-use-mongoose-connect-mongodb.html)
- [百度云 nodejs express + mongodb 折腾记 - 破瓷罐的个人页面 - 开源中国社区](http://my.oschina.net/brokenjar/blog/227158)

## Books

- [Developing Backbone.js Applications -](http://addyosmani.github.io/backbone-fundamentals/)

