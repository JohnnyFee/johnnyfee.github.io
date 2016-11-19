---
layout: "post"
title: "Node Encoding Converter"
date: "2016-11-12 16:36"
categories: Data
---

Node.js 自带的 `toString()` 方法不支持 gbk，因此中文转换的时候需要加载第三方库，推荐以下两个编码转换库，iconv-lite 和 encoding。

- iconv：是在类 Unix 系统中一种标准字符集转换接口，用于在不同字符集编码之间进行转换，最早出现在 HP-UX 系统中。
- iconv-lite：是 iconv 的纯 js 实现，支持的编码包括 node.js 原生编码：utf8, ucs2, ascii, binary, base64；同时支持广泛使用的单字节编码：Windows 125x family, ISO-8859 family, IBM/DOS codepages, Macintosh family, KOI8 family, latin1, us-ascii；多字节编码：gbk, gb2313, Big5, cp950。官方宣称比 node-iconv 更快。
- encoding：是对 node-iconv 和 iconv-lite 的再次封装，encoding 首先调用 node-iconv，如果 node-iconv 无法解析，则调用 iconv-lite 作为替代方案。

## iconv-lite 安装使用

安装

```sh
$ npm install iconv-lite
```

使用

```js
var iconv = require('iconv-lite');// Convert from an encoded buffer to js string.
str = iconv.decode(buf, 'win1251');// Convert from js string to an encoded buffer.
buf = iconv.encode("Sample input string", 'win1251');// Check if encoding is supported
iconv.encodingExists("us-ascii")
```

iconv-lite和node-iconv的性能对比

```
operation             iconv@1.2.4   iconv-lite@0.2.4
----------------------------------------------------------encode('win1251')     ~115 Mb/s     ~230 Mb/s
decode('win1251')     ~95 Mb/s      ~130 Mb/s
```

## encoding 安装使用

安装

```
$ npm install encoding
```

使用

encoding 模块就一个方法 convert()，使用方法为：encoding.convert(text, toCharset, fromCharset)。

* text: 需要转换的对象，可以为 Buffer 或者 String 对象。
* toCharset: 转换后的编码。
* fromCharset: 转换前的编码，缺省为 uft8。

转换后的输入结果为 Buffer 对象。

```js
var encoding = require('encoding');var result = encoding.convert("ÕÄÖÜ", "Latin_1");
console.log(result); //<Buffer d5 c4 d6 dc>
```

## jschardet

什么是 jschardet？

jschardet 是由 António Afonso 从 Python 的 chardet 移植到 Javascript 的 jschardet。

安装

```
$ npm install jschardet
```

使用

```js
var jschardet = require("jschardet")// "àíàçã" in UTF-8
jschardet.detect("\xc3\xa0\xc3\xad\xc3\xa0\xc3\xa7\xc3\xa3")// { encoding: "utf-8", confidence: 0.9690625 }

// "次常用國字標準字體表" in Big5
jschardet.detect("\xa6\xb8\xb1\x60\xa5\xce\xb0\xea\xa6\x72\xbc\xd0\xb7\xc7\xa6\x72\xc5\xe9\xaa\xed")// { encoding: "Big5", confidence: 0.99 }
```
