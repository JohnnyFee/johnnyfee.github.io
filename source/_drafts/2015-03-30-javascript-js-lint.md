layout: post
title: "JS Lint"
category : JavaScript
tags : [javascript]
---

1. JSLint 官方网站： <http://www.jslint.com/> ，可以生成 JSLint 开关。

2. JSLint Error Explanations 的公司镜像： <http://financeserver.landi.landicorp.com:4000/>

3. 对 JSLint 提示的各种错误进行解释的网址：<http://jslinterrors.com/>
    
    1. Stopping. ({a}% scanned)：很有可能是此句代码之前的分隔符（如“,”，“;”等）漏掉。
    
    2. '{a}' was used before it was defined：
    对于浏览器项目我们应该把这个开关打开：/*jslint browser: true */
    对于node项目我们应把这个开关打开：/*jslint node: true */
    这样内置的 document、window、require 等就不会提示了
    不需要一个一个加 /*global someFunction */ 
    
    3. Missing 'use strict' statement

            /*jshint strict: true */
