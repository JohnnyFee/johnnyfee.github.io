layout: post
title: "QT Webkit——JavaScript Buffer"
category: Qt
tags: [javascript, qt, buffer]
---

## Buffer

在浏览器端，在使用类似 [toots/buffer-browserify](https://github.com/toots/buffer-browserify) 的类库或者使用 [ArrayBuffer - Web API 接口](https://developer.mozilla.org/zh-CN/docs/Web/API/ArrayBuffer)时，我们要考虑如何数据传递给 QT 和 QT 用什么类型来接收。

我们以[toots/buffer-browserify](https://github.com/toots/buffer-browserify) 为例，讨论以下几种方法将二进制数据传递给 QT HexString、JSON、Base64、Array 的实现和性能。

QT 返回 QByteArray 时，JavaScript 端接收到的类型为 `Uint8ClampedArray`，我们可以很轻松地将这个对象转化为 `Buffer`。

<!-- more -->

## 实现

在以下代码中 `bufferTestNative` 为 QT 注册给 Webkit 的一个本地对象。

```javascript
// 数组定义
var array = new Uint8Array(1024);
for (var i = 0; i < array.length; i++) {
    array[i] = i;
}

// buffer定义
var buffer = new Buffer(array);
```

### Array

在浏览器上通过 `Uint8ClampedArray` 或者 `Uint8Array` 类型将数据传递给 QT，在 QT 端使用 `QByteArray` 来接收数据，这是非常纯粹的方式。

注意：如果你的浏览器使用的不是 `Uint8ClampedArray`、`Uint8Array` 着两种类型，而是普通的 Array，则在 QT 端通过 `QByteArray` 类型接收到的数据是错误的。所以，当在浏览器端传递的是普通的 Array 对象时，在QT端需要使用 `QVariantList` 来接收 `double` 类型的列表。

JavaScript:

```javascript
bufferTestNative.fromArray(array);
```

QT:

```c++
QByteArray BufferTest::fromArray(QByteArray data){
    return data;
}
```

### Json

浏览器端，通过 `Buffer.toJSON` 方法转化为一个可 JSON 化的对象，该对象有两个字段，分别为 `type` 和 `data`，其中 `data` 为普通的 Array 对象。所以，在 QT 端应用 `QVariantMap` 类型来接收该对象。然后取其中的 `data` 字段，`data` 为 `double` 类型的数组，我们需要额外的循环将其转化为 `QByteArray` 对象。

理论上说，我们可以修改 JavaScript 的 Buffer 模块的 `toJson()` 方法， 把 `data` 修改为 `Uint8ClampedArray` 或者 `Uint8Array` 类型，暂未实践。

JavaScript:

```javascript
bufferTestNative.fromArray(buffer.toJSON());
```

QT:

```c++
QByteArray BufferTest::fromJson(QVariantMap json){
    QVariant data = json.value("data");

    auto buffer = data.toList();

    // conver to ByteArray
    QByteArray ba;
    int length = buffer.length();
    ba.resize(length);

    for(int i=0;i<length;i++){
        ba[i] = (char)buffer.at(i).toInt();
    }

    qDebug() << ba.length() <<endl;
    return ba;
}
```

### Base64

JavaScript:

```javascript
bufferTestNative.fromBase64(buffer.toString('base64'));
```

QT:

```
QByteArray BufferTest::fromBase64(QString base64){
    QByteArray ba = QByteArray::fromBase64(base64.toLocal8Bit());
    return ba;
}
```

### HexString

JavaScript:

```
bufferTestNative.fromHexString(buffer.toString('hex'));
```

QT:

```
QByteArray BufferTest::fromHexString(QString hexString){
    QByteArray ba = QByteArray::fromHex(hexString.toLocal8Bit());
    return ba;
}
```

## 性能测试

### 测试方法

我们用以下方法来分别测试每种方式的性能，分别运行 N 次，每次将 1k 的数据传给 QT，记录 N 次运行的时间消耗。

```javascript
var batch = function (tagName) {
    var from = moment();

    for (var i = TESTTIMES; i >= 0; i--) {
        if (tagName === 'fromArray') {
            bufferTestNative.fromArray(array);
        } else if (tagName === 'fromBase64') {
            bufferTestNative.fromBase64(buffer.toString('base64'));
        } else if (tagName === 'fromHexString') {
            bufferTestNative.fromHexString(buffer.toString('hex'));
        } else if (tagName === 'fromJson') {
            bufferTestNative.fromJson(buffer.toJSON());
        }
    }

    var to = moment();
    var duration = to.diff(from);
    console.log(tagName + ' took ' + duration + 'ms');
};
```

其中，时间差计算使用的是 [moment/moment](https://github.com/moment/moment)。

### 测试结果

N 次运行的时间消耗，单位为 ms。

运行次数/测试项 | Array | JSON | Base64 | HexString
--------|-------|-------|---------|-------
1000    |68     |3286   |510      |1058
2000    |114    |5930   |1246     |2767
5000    |217    |11367  |3133     |5857


加上将接收到的数据转化为 Buffer，单位为 ms。

    new Buffer(bufferTestNative.fromArray(array));

运行次数/测试项 | Array | JSON | Base64  | HexString
-------|-------|------|---------|------------
1000   | 140   |3416  |841      |1635
2000   | 206   |5502  |1391     |2454
4000   | 443   |12996 |2907     |6108

### 结论

- 和 QT 交互时，尽可能使用 `Uint8ClampedArray` 或者 `Uint8Array` 数组传递。
- JavaScript 的 Buffer 构造函数返回的是 Uint8Array 对象，因此可以直接使用 new Buffer() 创建的对象传递给 QT。
- 将 `Uint8ClampedArray` 或者 `Uint8Array` 封装成 Buffer 有一定的时间消耗。