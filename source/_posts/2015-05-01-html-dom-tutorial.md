layout: post
title: "HTML DOM"
description: ""
category: HTML5
tags: [html, dom]
---

## Tutorial

- [写一个更好的Javascript DOM库](http://www.admin10000.com/document/3883.html)
- [如何做到 jQuery-free？](http://www.ruanyifeng.com/blog/2013/05/jquery-free.html)

## FAQ

### 显示隐藏DOM

    document.getElementById(id).style.display = 'block';
    // hide the lorem ipsum text
    document.getElementById(text).style.display = 'none';

### 更改HTML中元素的顺序

    document.getElementById('there').appendChild(document.getElementById('MacGuffin'));
​
将MacGuffin插入到there的最后一个元素

[How can I implement prepend and append with regular Javascript](http://stackoverflow.com/questions/3391576/how-can-i-implement-prepend-and-append-with-regular-javascript)

    var hdBtns = document.getElementById('hdBtns');
    var target = document.getElementsByClassName('wrap')[0];
    target.insertBefore(hdBtns, target.firstChild);

将hdBtns移动到target，并且作为target第一个元素

使用jquery

    $("#source").appendTo("#destination");

### 遍历对象属性

    for (var param in this.baseParams) {
    }
