layout: post
title: "WebKit Security"
category : WebKit
tags : [WebKit]
---

## 基于内容安全策略 CSP

### 背景

万维网的安全策略植根于[同源策略](http://en.wikipedia.org/wiki/Same_origin_policy)。每个来源都与网络的其它部分分隔开，为开发人员构建了一个安全的沙箱。理论上这是完美的，但是现在攻击者已经找到了聪明的方式来破坏这个系统，这种方法称为 [XSS跨站脚本攻击](http://en.wikipedia.org/wiki/Cross-site_scripting) ，通过虚假内容和诱骗点击来绕过同源策略。这是一个很大的问题，如果攻击者成功注入代码，有相当多的用户数据会被泄漏。

2007 年，Mozilla 项目组的 Gervase Markham 和 WEB 安全界大牛 Robert Hansen 两人共同提出 _内容安全策略_（ContentSecurity Policy，CSP），这是一个全新的、有效的安全防御策略来减轻这种风险。

<!-- more -->

### 内容安全策略

内容安全策略（Content Security Policy，简称CSP）是一种以可信白名单作机制，来限制网站中是否可以包含某来源内容。目前，各大主流浏览器均已支持 CSP。

- 只能加载指定白名单的资源，如脚本、样式、图片、视频、音频、Flash以及其插件的来源，以及连接的类型（例如XHR、WebSockets和EventSource）、网络字体、frame 的来源。
- 禁止执行内联代码（`<script>`块内容，内联事件，内联样式）。
- 禁止执行 `eval()`, `newFunction()` , `setTimeout([string], ...)` 和 `setInterval([string], ...)` 。

See [浏览器安全策略说之内容安全策略 CSP-网络安全-安全频道-至顶网](http://security.zdnet.com.cn/security_zone/2014/0418/3017798.shtml)

### 如何应用

CSP可以由两种方式指定：HTTP Header 和HTML。HTTP是在HTTP由增加 Header 来指定，而HTML级别则由Meta标签指定。CSP有两类：Content-Security-Policy 和 Content-Security-Policy-Report-Only。（大小写无关）

## 其他

- 代码签名
- 只允许 https，预装证书（避免钓鱼、中间人攻击）
- 只能访问有限本地 API
- Javascript 不允许直接内存操作，避免缓冲区溢出攻击