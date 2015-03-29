layout: post
title: "JavaScript 获取选取范围"
description: ""
category: JavaScript
tags: [javascript]
--- 
##概述

获取选中的功能有如下应用场景：

- 网页划词翻译 
- 选中内容发送到微博 
- 转载功能 
- 网易的选中纠错 

参考 [用getSelection来获取网页的选中内容](http://classjs.com/2011/11/17/%E7%94%A8getselection%E6%9D%A5%E8%8E%B7%E5%8F%96%E7%BD%91%E9%A1%B5%E7%9A%84%E9%80%89%E4%B8%AD%E5%86%85%E5%AE%B9/)

<!--more-->

##Window.getSelection

该接口等同于docuement.getSelection。

The document.getSelection method works differently in Google Chrome, Safari and Internet Explorer than in Firefox and Opera. It returns a **string** in Firefox and Opera, and returns a **selectionRange** object in Google Chrome, Safari and Internet Explorer (the document.getSelection method is identical to the window.getSelection method in Google Chrome, Safari and Internet Explorer). Because of that, this method should not be used. 

- In Firefox, Opera, Google Chrome, Safari and Internet Explorer from version 9, use the **window.getSelection** method and the toString method of the selectionRange object returned by the window.getSelection method to get the text content of the selection.
- In older Internet Explorer versions, use the createRange method of the **selection** object and the text property of the TextRange object returned by the createRange method to get the text content of the selection.

可以使用以下代码作为兼容，参考<http://help.dottoro.com/ljqxhfte.php>：

    if (document.getSelection) {    // all browsers, except IE before version 9
        var sel = document.getSelection ();
            // sel is a string in Firefox and Opera, 
            // and a selectionRange object in Google Chrome, Safari and IE from version 9
            // the alert method displays the result of the toString method of the passed object
        alert (sel);
    } 
    else {
        if (document.selection) {   // Internet Explorer before version 9
            var textRange = document.selection.createRange ();
            alert (textRange.text);
        }
    }


对于`window.getSelection()`返回SelectionRange的返回值请参考[Selection](https://developer.mozilla.org/en-US/docs/DOM/Selection)，对于常用数据请参考[document.selection和window.getSelection属性和方法详解](http://www.lowxp.com/g/article/detail/269)。可以调用Selection对象的getRangeAt(index)方法获取选择的区域，该接口返回[Range](https://developer.mozilla.org/en-US/docs/DOM/range)对象。调用Selection
对象的[Selection/toString()](https://developer.mozilla.org/en-US/docs/Web/API/Selection/toString)返回选中区域的文本。

使用方法如：

    function foo() {
        var selObj = window.getSelection(); 
        alert(selObj);
        var selRange = selObj.getRangeAt(0);
        // do stuff with the range
    }

##最终代码

最终选择当前选中区域的HTML的代码请参考[Chrome doesn't get the selected html string wrapping tags (contenteditable)](http://stackoverflow.com/questions/14691196/chrome-doesnt-get-the-selected-html-string-wrapping-tags-contenteditable)

    function adjustRange(range) {
        range = range.cloneRange();
        // Expand range to encompass complete element if element's text
        // is completely selected by the range
        var container = range.commonAncestorContainer;
        var parentElement = container.nodeType == 3 ?
                container.parentNode : container;
        if (parentElement.textContent == range.toString()) {
            range.selectNode(parentElement);
        }
        return range;
    }

    function getSelectionHtml() {
        var html = "", sel, range;
        if (typeof window.getSelection != "undefined") {
            sel = window.getSelection();
            if (sel.rangeCount) {
                var container = document.createElement("div");
                for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                    range = adjustRange( sel.getRangeAt(i) );
                    container.appendChild(range.cloneContents());
                }
                html = container.innerHTML;
            }
        } else if (typeof document.selection != "undefined") {
            if (document.selection.type == "Text") {
                html = document.selection.createRange().htmlText;
            }
        }
        return html;
    }

运行效果请参考 <http://fqblog.qiniudn.com/assets/example/html-selection.html>。Demo中值演示单区域选择。

##参考
- [dhruvvemula / copylinkaddress](https://github.com/dhruvvemula/copylinkaddress) Just point to your link and hit your standard keyboard shortcut (Ctrl-C, or Cmd-C for Mac) and you're done! 可参考该开源项目查看Selection和Range的用途。
