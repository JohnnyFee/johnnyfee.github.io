---
layout: post
title: "JavaScript 常见问题"
description: ""
category: JavaScript
tags: [javascript]
---
### 
##toString

In JavaScript, when an object is passed to a function expecting a string (like [window.alert](https://developer.mozilla.org/en-US/docs/Web/API/window.alert) or [document.write](https://developer.mozilla.org/en-US/docs/Web/API/document.write)), the object's toString() method is called and the returned value is passed to the function. This can make the object appear to be a string when used with other functions when it is really an object with properties and methods.

    var selObj = window.getSelection(); 

In the above example, selObj.toString() is automatically called when it is passed to window.alert. However, attempting to use a JavaScript String property or method such as length or substr directly on a Selection object will result in an error if it does not have that property or method and may return unexpected results if it does. To use a Selection object as a string, call its toString method directly:

    var selectedText = selObj.toString();


Refrerence: [Window.getSelection](https://developer.mozilla.org/en-US/docs/Web/API/Window.getSelection)

##DOM加载完成事件

    //Add Event Listeners to Button Click
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("copy").onclick = copy;
    });


##url encode

[javascript对url进行encode的两种方式 - baibaluo - 博客园](http://www.cnblogs.com/baibaluo/archive/2011/03/03/2071250.html)


