layout: post
title: "Support Library"
description: ""
category: Android
tags: [android]
---

## Tutorial

- [支持多种屏幕](https://developer.android.com/guide/practices/screens_support.html?hl=zh-cn#DeclaringTabletLayouts)

## DPI

系统会根据dip的大小选择对应目录下的资源文件。

- drawable-hdpi 对应DPI为240
- drawable-ldpi 对应DPI为120
- drawable-mdpi 对应DPI为160
- drawable-xhdpi 对应DPI为320


获取屏幕DPI（屏幕密度）方法：

```java
DisplayMetrics dm = new DisplayMetrics();    
dm = getResources().getDisplayMetrics();  
float density = dm.density;//屏幕密度（像素比例：0.75, 1.0, 1.5, 2.0）  
int densityDPI = dm.densityDpi;//屏幕密度（每寸像素：120, 160, 240, 320）  
```

px 与 dip 的换算：

- density = 0.75， px : dip = 1 : 1.5
- density = 1， px : dip = 1 : 1
- density = 1.5， px : dip = 1.5 : 1