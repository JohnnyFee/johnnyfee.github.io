---
layout: post
title: "MongoDb"
category: Node
tags: [mongodb, database]
--- 

SELECT*FROM posts
INNER JOIN posts_tags ON posts.id= posts_tags.post_id
INNER JOIN tags ON posts_tags.tag_id== tags.id
WHERE tags.text= 'politics' AND posts.vote_count > 10;

The equivalent query in MongoDB is specified using a document as a matcher. The
special $gtkey indicates the greater-than condition.
db.posts.find({'tags': 'politics','vote_count': {'$gt': 10}});

## Tutorial

- [构建 Node.js 应用之持久化 - 技术翻译 - 开源中国社区](http://www.oschina.net/translate/building-with-nodejs-persistence?print)
	- [Building with Node.js: Persistence](http://journal.michaelahlers.org/2012/12/building-with-nodejs-persistence.html)