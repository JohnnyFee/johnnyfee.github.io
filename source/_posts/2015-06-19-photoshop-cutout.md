layout: post
title: "PhotoShop 抠图"
category: PhotoShop
tags: [ps]
---

## 蒙版抠图

### 选择通道

通道和选区可以互为转换，可以利用通道来创建用常规方法很难完成的选区，然后利用这个选区来创建抠图蒙版，以完成抠图。

我们要从下图中选择顺势直下的水流：

![](http://www.99ut.com/library/turlib/serieslib/08/08_c01.jpg)

<!-- more -->

图像是由3个通道组成的，分别为 RGB 通道。

![](http://www.99ut.com/library/turlib/serieslib/08/08_c02.jpg) ![](http://www.99ut.com/library/turlib/serieslib/08/08_c03.jpg) ![](http://www.99ut.com/library/turlib/serieslib/08/08_c04.jpg)

寻找一个流水与周围区域反差最大的通道，蓝色更符合我们的要求。我们将蓝色通道复制为一个Alpha通道(默认名称为蓝副本)，然后调高这个Alpha通道中的对比度。

![](http://www.99ut.com/library/turlib/serieslib/08/08_c05.jpg) 

### 调整对比度

我们可以使用曲线〖CTRL M〗将高光设在174,215处(可〖F8〗开启信息调板查看坐标)，将暗调设在121,144处。

![](http://www.99ut.com/library/turlib/serieslib/08/08_c06.jpg)

调整后的蓝副本通道如图：

![](http://www.99ut.com/library/turlib/serieslib/08/08_c07.jpg)

当通道转换为选区的时候，其中白色部分代表已选，黑色部分代表未选。通道中的灰色在转换为选区以后会成为不同程度的半透明选择。这种半透明选择当然也会转为半透明的蒙版。通道中黑白对比程度越强(当然还要注意保持轮廓)，转换后得到的选区就越精准，半透明这类“拖泥带水”的部分就较少。

### 选取

除了水流是白色以外，还有一些不属于水流的部分也是白色，比如一些树干，还有天空。使用画笔工具涂抹，将不需要的地方涂黑即可。注意控制笔刷的大小和软硬度，并且不要破坏轮廓细节。如果没有把握的地方就宁可不去涂抹。

![](http://www.99ut.com/library/turlib/serieslib/08/08_c08.jpg)

此外还可以使用选取工具，如快速选择工具来修改通道。

涂抹完成后将这个通道转为选区〖CTRL 点击通道缩览图〗。有些流水并没有出现流动的虚线，其原因就是由于那50%的界限。

![](http://www.99ut.com/library/turlib/serieslib/08/08_c09.jpg)

### 建立蒙板

回到RGB方式，利用这个选区为原先的图层建立蒙版，就会看到除了流水以外的部分都被隐藏了。

![](http://www.99ut.com/library/turlib/serieslib/08/08_c10.jpg)

在选取人物的时候，最经常遇到的困难就是头发的末梢，由于其非常细小很难选取，即使是在蒙版涂抹修改也很难达到理想效果。

### Refine Mask

## 去除背景