---
layout: post
title: "JavaScript 常见问题"
description: ""
category: JavaScript
tags: [javascript]
--- 
## toString

In JavaScript, when an object is passed to a function expecting a string (like [window.alert](https://developer.mozilla.org/en-US/docs/Web/API/window.alert) or [document.write](https://developer.mozilla.org/en-US/docs/Web/API/document.write)), the object's toString() method is called and the returned value is passed to the function. This can make the object appear to be a string when used with other functions when it is really an object with properties and methods.

    var selObj = window.getSelection(); 

In the above example, selObj.toString() is automatically called when it is passed to window.alert. However, attempting to use a JavaScript String property or method such as length or substr directly on a Selection object will result in an error if it does not have that property or method and may return unexpected results if it does. To use a Selection object as a string, call its toString method directly:

    var selectedText = selObj.toString();


Refrerence: [Window.getSelection](https://developer.mozilla.org/en-US/docs/Web/API/Window.getSelection)

## DOM加载完成事件

    //Add Event Listeners to Button Click
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("copy").onclick = copy;
    });


## url encode

[javascript对url进行encode的两种方式 - baibaluo - 博客园](http://www.cnblogs.com/baibaluo/archive/2011/03/03/2071250.html)

## Add script tags to DOM dynamically

Reference: [♠ qλ | kadaj's musing ♠](http://www.qlambda.com/2012/01/add-script-tags-to-dom-dynamically.html)

Here is a little snippet for adding `<script>` tags dynamically to your html file using javascript and DOM api.  

    // Add scripts to DOM by creating a script tag dynamically.
    // @param {String=} url Url of a js file
    // @param {String=} src Script source code to add the source directly.
    // NB: At least one of the parameters must be specified.
    var hookScripts = function(url, src) {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = url || null;
        s.innerHTML = src || null;
        document.getElementsByTagName("head")[0].appendChild(s);
    };
    // usage eg:
    hookScripts('url/path/to/myscript.js');  //url
    hookScripts(null, 'alert("hello");');  //giving the source code directly

We use the native DOM API instead of jQuery for this particular case because of the way [jQuery treats <script> tags](http://api.jquery.com/append/#comment-67912032). jQuery inserts script to DOM, then evaluates the script separately and then it removes the tag from the DOM. So you won't see the script tag, but the script will get executed.

## How can I check whether a variable is defined in JavaScript

    if (typeof variable === 'undefined') {
        // variable is undefined
    }

## arguments

- [JavaScript里function函数实现可变参数(多态）](http://www.oschina.net/question/54100_15938)

## String.replaceAll

    function replaceAll(find, replace, str) {
      return str.replace(new RegExp(find, 'g'), replace);
    }

Reference: [Replacing all occurrences of a string in javascript? - Stack Overflow](http://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript)

## String.endsWith


    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };