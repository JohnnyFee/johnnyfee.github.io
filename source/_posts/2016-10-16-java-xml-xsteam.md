layout: post
title: "Java XML XStream"
description: ""
category: Java
tags: [java, xml]
---

[XStream](http://x-stream.github.io/)

## Writer

XStream 默认使用 `PrettyPrintWriter` 来序列化对象，如果想使用 Compact 模式：

```java
String strXML = "";
XStream xs = new XStream();
StringWriter sw = new StringWriter();
xs.marshal(this,  new CompactWriter(sw));
strXML = sw.toString();
```

也可以使用 `OutputStreamWriter`:

```java
XStream xs = new XStream();
xStream.marshal(o, new CompactWriter(new OutputStreamWriter(stream, encoding)));
```

See [java - How to disable pretty-printing(white space/newline) in XStream? - Stack Overflow](http://stackoverflow.com/questions/894625/how-to-disable-pretty-printingwhite-space-newline-in-xstream)

## 排除根元素

```java
private final XStream xstream = new XStream(new JsonHierarchicalStreamDriver() {
    public HierarchicalStreamWriter createWriter(Writer writer) {
        return new JsonWriter(writer, JsonWriter.DROP_ROOT_MODE);
    }
});
```

## 下划线问题

[java - XStream and underscores - Stack Overflow](http://stackoverflow.com/questions/9333035/xstream-and-underscores)

XStream 序列化的时候如果属性名或者属性别名带有 `_`，序列化会转化为 `__`。

可以下列方法来解决：

```java
XStream xs = new XStream(new DomDriver("UTF-8", new XmlFriendlyNameCoder("_-", "_")));
```

但如果为引入 `DomDriver`，能否也做到。
