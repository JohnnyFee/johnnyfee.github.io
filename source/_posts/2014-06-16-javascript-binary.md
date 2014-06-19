---
layout: post
title: "JavaScript Binary"
category: JavaScript
tags: [javascript, data]
--- 

原文：<http://noyesno.net/page/javascript/binary>

一直一来，JavaScritp都缺少处理二进制数据的能力。唯一算是跟二进制数据有点关系的是String的charCodeAt()和fromCharCode()方法。 

HTML5以来，JavaScript增加了新的数据类型，从而对二进制数据有了一定程度上的支持。 
## ArrayBuffer和ArrayBufferView

其中最主要的数据类型是ArrayBuffer，用来表示一串bytes。 

对二进制数据的处理则交由不同的ArrayBufferView来处理，比如： 

* Int8Array / Uint8Array
* Int16Array / Uint16Array
* Int32Array / Uint32Array
* Float32Array / Float64Array

字节序使用本机的字节序。 

    var buffer = new ArrayBuffer(2);
    var bytes = Uint8Array(buffer);
    var value = bytes[1];

<!--more-->

另一个更底层的接口是DataView，提供了一组方法用于读取或修改ArrayBuffer 

* getInt8() / getUint8() / setInt8() / setUint8()
* getInt16() / getUint16() / setInt16() / setUint16()
* getInt32() / getUint32() / setInt32() / setUint32()
* getFloat32() / getFloat64() / setFloat32() /setFloat64()

    var buffer = new ArrayBuffer(2);
    var view = new DataView(buffer);
    var little_endian = true;
    view.setInt16(0, 256, little_endian); // use little endian
    view.getInt16(0, little_endian );
    

### 本机字节序的判断

二进制世界不可避免地涉及到Big Endian和Little Endian的问题。 

下面的代码可以用于判断本机的字节序。 

    // 引自：https://developer.mozilla.org/en-US/docs/Web/API/DataView
    
    var littleEndian = (function() {
      var buffer = new ArrayBuffer(2);
      new DataView(buffer).setInt16(0, 256, true);
      return new Int16Array(buffer)[0] === 256;
    })();
    

## 二进制数据的传递

怎样把二进制数据传送给JavaScript呢？ 

一种方法是利用base64编码，通过window.atob函数转换为“字符串”，再逐字节赋值给ArrayBuffer： 

    function base64tobin(base64) {
      var text = window.atob(base64);
      var buffer = new ArrayBuffer(text.length);
      var view = new DataView(buffer);
      for(var i=0, n=text.length; i<n; i++) view.setUint8(i,text.charCodeAt(i));
      return buffer;
    }
    

window.btoa()可以把数据编码为base64。 

## 和字符串之间的转换

二进制数据转为字符串，显然是和字符串的编码问题相关的。 

    function bin2txt(buffer,encoding) {
      if(encoding=='ascii'){
        return String.fromCharCode.apply(null, new Uint8Array(buffer));
      }else if(encoding=='unicode' || encoding=='utf16'){
        return String.fromCharCode.apply(null, new Uint16Array(buffer)); // 使用本机字节序
      }else{
        alert('Not supported yet');
      }
    }

## FAQ

### Uint8ClampedArray and Uint8Array

- [Uint8ClampedArray JavaScript API](http://www.javascripture.com/Uint8ClampedArray)
- [Uint8Array JavaScript API](http://www.javascripture.com/Uint8Array)

If you are trying to set one element to a clamped array to any value outside of the range 0-255, it will simply default to 0 or 255 (depending on whether the value is smaller or larger). A normal Uint8Array array just takes the first 8 bit of the value.

__Examples:__

```javascript
var x = new Uint8ClampedArray([17, -45.3]);
console.log(x[0]); // 17
console.log(x[1]); // 0
console.log(x.length); // 2

var x = new Uint8Array([17, -45.3]);
console.log(x[0]); // 17
console.log(x[1]); // 211
console.log(x.length); // 2
```

### Convert binary NodeJS Buffer and Javascript ArrayBuffer

参考：[node.js - Convert a binary NodeJS Buffer to Javascript ArrayBuffer - Stack Overflow](http://stackoverflow.com/questions/8609289/convert-a-binary-nodejs-buffer-to-javascript-arraybuffer)

1. node.js has both ArrayBuffer as part of v8, but the Buffer class provides a more flexible API. In order to read or write to an ArrayBuffer, you only need to create a view and copy across.

    From Buffer to ArrayBuffer:

        function toArrayBuffer(buffer) {
            var ab = new ArrayBuffer(buffer.length);
            var view = new Uint8Array(ab);
            for (var i = 0; i < buffer.length; ++i) {
                view[i] = buffer[i];
            }
            return ab;
        }

    From ArrayBuffer to Buffer:

        function toBuffer(ab) {
            var buffer = new Buffer(ab.byteLength);
            var view = new Uint8Array(ab);
            for (var i = 0; i < buffer.length; ++i) {
                buffer[i] = view[i];
            }
            return buffer;
        }

2. "From ArrayBuffer to Buffer" could be done this way: 

      var buffer = new Buffer( new Uint8Array(ab) );

3. A quicker way to write it

        var arrayBuffer = new Uint8Array(nodeBuffer).buffer;

    However, this appears to run roughly 4 times slower than the suggested toArrayBuffer function on a buffer with 1024 elements.

4. Node 0.12+ has a built-in toArrayBuffer method.

        buffer.toArrayBuffer()

## Tutorial

- [JavaScript typed arrays - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays)
- [StringView - Mozilla](https://developer.mozilla.org/en-US/Add-ons/Code_snippets/StringView)
- [Base64 encoding and decoding - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding)
- [遇见Javascript类型数组(Typed Array)](http://blog.csdn.net/hfahe/article/details/7421203)