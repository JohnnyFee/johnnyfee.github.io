layout: post
title: "PhotoShop 蒙板"
category: PhotoShop
tags: [ps]
---


蒙版的应用分为抠图目的和布局目的，前者一般与图层一起进行各种变换，基本不会解除链接。后者常与图层解除链接，各自变换，以便于布局的改动。对于前者来说，应用蒙版与否造成的影响不大，并且如果要对图层执行类似滤镜这样的操作，最好事先应用蒙版以避免出现误差。对于后者来说，则应尽可能保留蒙版以便于编辑和修改。

## 蒙版

蒙版是用来屏蔽(即隐藏)图层内容的，当需要删除图层中某个区域的图像时，就可以使用蒙版来完成。蒙版不会破坏图像，并且提供更多的后期修改空间，它可以是任何形状的。

蒙版是作用于单个图层的，不同的图层可以使用不同的蒙版。一个图层只能有一个蒙版。背景层是无法使用蒙版。

我们对以下图像的天空建立选区：

![](http://www.99ut.com/library/turlib/serieslib/08/08_a01.jpg)

通过【图层_图层蒙版_隐藏选区】，此时我们就已经得到了一个天空部分透明的图像：

![](http://www.99ut.com/library/turlib/serieslib/08/08_a02.jpg)

现在图层调板中的内容和以前有了很大区别。在原有的图层缩览图右方多了一个蒙版缩览图。并且这个缩览图是类似通道的黑白色：

![](http://www.99ut.com/library/turlib/serieslib/08/08_a03.jpg)

蒙版中的白色，表示有效，表示图层有效，就是看得见图层的内容。蒙版中的黑色表示图层无效，也就是将图层中的该区域屏蔽起来了，看不见内容了。

在实际操作中，99.9%的蒙版都是通过选区建立的。蒙版作用于图层，与图层综合形成效果，对外来说两者是一个整体。


## 自由变换

自由变换将各种操作融合在一起，旋转、拉伸、透视等操作可以一次全部完成，并且对像素来说只进行了一次重组计算。

新建图像，新建图层，使用形状工具中的自定义形状〖U/SHIFT_U〗，从公共栏的形状列表中选一个形状画在新建层上。绘制时候按住SHIFT键可保持图案原比例。切记要画在新建层上，因为在背景层上是无法使用变换功能的。

![](http://www.99ut.com/library/turlib/serieslib/08/08_e01.jpg)-![](http://www.99ut.com/library/turlib/serieslib/08/08_e02.jpg)

启动自由变换功能【编辑_自由变换】〖CTRL_T〗，在图形的四周会出现矩形调整框(也称定界框)。

![](http://www.99ut.com/library/turlib/serieslib/08/08_e03.jpg)

在自由变换中的操作都是通过拖动矩形框的各个控制点实现的。

四周为1至8号控制点，中心还有一个0点。0点是旋转、缩放、翻转的中心。用鼠标拖动0点即可改变中心点位置。有时调整框过于细小时，拖动0点可能会造成拖动了其它的控制点，此时可在0点位置上按住ALT键拖动。

![](http://www.99ut.com/library/turlib/serieslib/08/08_e05.jpg)

在变换的操作过程中按下ESC键等同于放弃，按下回车将等同于确定。需要注意的是放弃将会撤销本次所做的所有变换。

![](http://www.99ut.com/library/turlib/serieslib/08/08_e04.jpg)

公共栏左端的![](http://www.99ut.com/library/turlib/serieslib/08/P_RefPointLocator_Lg_N.gif)标志是定位中心位于调整框的9个极端坐标，默认为中心坐标。点击可以快速设置定位中心0点的位置。

### 旋转

不需要快捷键，将鼠标至于8个控制点之外，光标将变为![](http://www.99ut.com/library/turlib/serieslib/08/rotate.gif)或类似的样子。

此时拖动鼠标即可旋转图形。旋转同时按住〖SHIFT〗键可锁定每次旋转为15度，这在做一些特殊角度(如45度，90度)的旋转时很方便。

注意公共栏中的旋转角度数值，如果顺时针旋转角度为正数，逆时针时为负数。改变0点的位置将改变旋转中心，旋转中心可以在调整框之外。

![](http://www.99ut.com/library/turlib/serieslib/08/08_e06.jpg)

### 缩放

也可称为拉伸，有水平竖直两个方向的区别。不需要快捷键，将鼠标置于4、5上为水平方向缩放，置于2、7上为竖直方向缩放，置于1、3、6、8上为水平竖直同时缩放。按住ALT键将同时缩放对边(4、5和2、7)或四边(1、3、6、8)。

在水平竖直方向同时缩放的时候，按住SHIFT键或按下公共栏中的锁定比例按钮，可锁定宽高比不变进行等比缩放。改变0点的位置将改变缩放中心，缩放中心可以在调整框之外。

![](http://www.99ut.com/library/turlib/serieslib/08/08_e07.jpg)-![](http://www.99ut.com/library/turlib/serieslib/08/08_e08.jpg)-![](http://www.99ut.com/library/turlib/serieslib/08/08_e09.jpg)

### 斜切

斜切的效果分为两种，按住CTRL和SHIF〗在2、4、5、7上拖动就像把矩形变为平行四边形。

![](http://www.99ut.com/library/turlib/serieslib/08/08_e10.jpg) ![](http://www.99ut.com/library/turlib/serieslib/08/08_e11.jpg)

在1、3、6、8上拖动则只会改变一个角，相当于变矩形为梯形

![](http://www.99ut.com/library/turlib/serieslib/08/08_e12.jpg)-![](http://www.99ut.com/library/turlib/serieslib/08/08_e19.jpg)

按住ALT可同时改变对边或对角。

### 扭曲

任意地移动边或角的位置。可以说扭曲就是更加自由的斜切，斜切中每次移动边和角都有方向的限制，而扭曲则没有。

![](http://www.99ut.com/library/turlib/serieslib/08/08_e16.jpg)-![](http://www.99ut.com/library/turlib/serieslib/08/08_e17.jpg)

### 透视

透视效果简单地说就是近大远小，比如一堵墙离你近的部分看起来就较大，远的部分看起来就较小。

〖CTRL_SHIFT_ALT〗在1、3、6、8上拖动：

![](http://www.99ut.com/library/turlib/serieslib/08/08_e13.jpg)-![](http://www.99ut.com/library/turlib/serieslib/08/08_e14.jpg)

注意同在一条边上的两个点会互相影响，比如将1往右移动的同时3将等距离往左移动。正常方式下，每次拖动只能在X轴或Y轴方向上，如果按住CTRL可同时进行。

![](http://www.99ut.com/library/turlib/serieslib/08/08_e15.jpg)

在2、4、5、7上效果等同于斜切。

### 变形

可以在启动了自由变换〖CTRL_T〗命令后点击公共栏中的![](http://www.99ut.com/library/turlib/serieslib/08/P_WarpTrans_Md_N.jpg)按钮，图像即会产生一个弯曲网格，网格将图像分为了9个部分：

![](http://www.99ut.com/library/turlib/serieslib/08/08_e31.jpg)

此时拖动图像任意部位即可产生弯曲的效果，拖动位于互为对顶角的4个角点可以移动，并且还可以更改角点的方向线角度和长度，令角点处呈现锐角或钝角(原先是呈90度角的)。

![](http://www.99ut.com/library/turlib/serieslib/08/08_e32.jpg)

弯曲功能启动后，在公共栏中可以选择几种常用的弯曲设定(如扇形等)。![](http://www.99ut.com/library/turlib/serieslib/08/P_WarpOrientationToggle_Md_N.jpg)按钮可以更改弯曲的方向(如将扇形旋转90度)。完成弯曲设定后，再次点击![](http://www.99ut.com/library/turlib/serieslib/08/P_WarpTrans_Md_N.jpg)按钮将回到自由变换中，此时还可以进行其他的变换。

形状工具〖U/SHIFT_U〗本身是矢量的，我们都使用它的点阵绘图方式，现在我们使用矢量方式来做做看。

新建图像，选择形状工具〖U/SHIFT_U〗，在公共栏将绘图方式改为第一种“形状图层：

![](http://www.99ut.com/library/turlib/serieslib/08/08_e26.jpg)

不需要新建层，直接绘制即可，Photoshop将会自动产生一个图层。这自动产生的图层属于特殊图层，称为填充层，双击该层缩览图会出现颜色选取框，此时可改变所绘图形的颜色。

对这个矢量图形进行上面的一次变换和分次变换没有任何区别，多次变化不会是图像失真。

【编辑_变换_再次】〖CTRL_SHIFT_T〗可以将上一次做过的变换操作重复执行一次，并且重复的时候可针对其他图层进行。这是一个很便利的功能，我们可以用这个功能制作一组连续的图案。方法是做完变换后复制该层，然后再对复制出来的层使用再次变换命令〖CTRL_SHIFT_T〗。

将一个皱边的矩形(可在默认形状中找到)进行了等比缩小和旋转，旋转中心位于图形之外，然后复制图层重做变换。得到了面积越来越小，旋转角度越来越大的一组矩形。

![](http://www.99ut.com/library/turlib/serieslib/08/08_e29.jpg)

将灯泡按照30度旋转，旋转中心位于灯泡底部，于是看到了一组环绕中心点排开的类似花朵的图案。

![](http://www.99ut.com/library/turlib/serieslib/08/08_e30.jpg)

## 新建蒙板

在拥有了选区后，可以通过菜单【图层_图层蒙版】来建立蒙版。其中有4个建立选项，较常用的是“显示选区”和“隐藏选区”。

如果选择“显示选区”，则在所创建的蒙版中，原先选区的部分应该为白色，其余为黑色，得到的效果是保留齿轮屏蔽背景。

![](http://www.99ut.com/library/turlib/serieslib/08/08_a32.jpg)

如果选择“隐藏选区”，那么原先选区的部分应该为黑色，其余为白色，得到的效果是屏蔽齿轮保留背景。

![](http://www.99ut.com/library/turlib/serieslib/08/08_a33.jpg)

图层调板中现在有了两个缩览图：一是图层，二是蒙版。因此现在我们对于这个图层也存在两种选择：选择图层或选择蒙版。选择图层或图层蒙版的方法就是在图层调板中的缩略图上单击，被选择的缩览图周围会出现细线框：

![](http://www.99ut.com/library/turlib/serieslib/08/08_a04.jpg)-![](http://www.99ut.com/library/turlib/serieslib/08/08_a05.jpg)

利用已经创建好的蒙版，可以还原出原先的选区，〖CTRL_单击蒙版缩览图〗。此时的选区与蒙版并无关联，对选区的所有操作都不会影响蒙版。

可以将蒙版停用，方法是〖SHIFT_单击蒙版缩览图〗，再次〖SHIFT_单击蒙版缩览图〗可重新启用蒙版。直接单击蒙版缩览图也可以启用，并且可同时选择图层蒙版。

在建立蒙版之后，通道调板中也会同时新增一个通道。这个通道与相应的图层蒙版是存在着关联的，修改(如填充颜色、涂抹、清除等)其中任何一个都会对另一个产生相同的影响。

〖ALT_单击蒙版缩览图〗，将会切换到通道中对应蒙版的单独显示状态，就如同在通道调板中单独选择该通道一样。

![](http://www.99ut.com/library/turlib/serieslib/08/08_a37.jpg)-![](http://www.99ut.com/library/turlib/serieslib/08/08_a38.jpg)

如果要删除蒙版，可以在图层调板中的蒙版缩览图上点击右键，选择删除选项。

## 修改蒙版

在蒙版中只存在着灰度。即使选取了带有色相的颜色，在蒙版中也会转为相应的灰度，就如同在Alpha通道中遇到的情形一样。

如果要使用画笔工具对蒙版涂抹，以改变屏蔽的范围，那么就要先弄清楚是要隐藏原先看的见的部分，还是将已经隐藏起来的部分显示出来。如果是前者，就需要用黑色对蒙版进行涂抹。当然要在原有的白色区域中涂抹黑色才有效。如果要将已经被隐藏的部分还原显示，就用白色在蒙版中涂抹。涂抹前要确定所选择的是蒙版而不是图层。

选择一个直径为9，硬度100%的画笔，前景色选择黑色，确定所选择是蒙版而不是图层，然后在图像中涂抹。

![](http://www.99ut.com/library/turlib/serieslib/08/08_b09.jpg)

图层中涂抹过的部分被屏蔽了：

![](http://www.99ut.com/library/turlib/serieslib/08/08_b10.jpg)

如果要看的更清楚些，可〖ALT_单击蒙版缩览图〗单独显示蒙版通道：

![](http://www.99ut.com/library/turlib/serieslib/08/08_b11.jpg)

将画笔直径适当加大(〖]〗)一些，前景色选择白色，确定所选择是蒙版而不是图层，在图像中涂抹。就会看到涂抹过的地方原有的内容还原显示出来了。

![](http://www.99ut.com/library/turlib/serieslib/08/08_b12.jpg)

对应的蒙板为：

![](http://www.99ut.com/library/turlib/serieslib/08/08_b13.jpg)

也可以用除了画笔以外的其他绘图工具来进行涂抹，以下分贝用涂抹工具将齿轮的边缘做了些许扭曲；使用仿制图章复制了锯齿边；还有创建选区后填充颜色。

![](http://www.99ut.com/library/turlib/serieslib/08/08_b14.jpg)

对于最后填充颜色的效果，也可直接使用形状工具中的矩形来完成。当然大家也可以使用其他的形状。需要注意的是，使用形状时要确保在顶部公共栏中是第3种绘图方式。如下右图红色箭头处。

![](http://www.99ut.com/library/turlib/serieslib/08/08_b15.jpg)

现在如果我们使用移动工具〖V〗移动图层(注意背景层是无法移动的)，会发现蒙版也随之移动，如下左图。这是因为蒙版与图层默认是存在着链接关系的。针对任何一者的变换(如旋转、拉伸等，移动也算)操作都将同时影响另外一个。

蒙版所能进行的色彩调整功能非常有限，只限于很少的几种。其中最常用的应该是反相〖CTRL_I〗，效果是将蒙版黑白颠倒，将屏蔽区域与显示区域对换。

如果一个蒙版已经与图层解除了链接，则可在图层调板中将其拖动到另外一个图层上，这样就可“老瓶装新酒，老版蒙新层”，将原有蒙版应用到该图层中。按住ALT健拖动则是复制，按住SHIFT键拖动则相当于移动后反相蒙版。

蒙板可用于布局，这类蒙版在建立后一般都会解除与图层的链接，以便于独立移动。我们需要在一个婚纱的背景图像中需要一个心形区域，并在这个心形区域中加入玫瑰花：

![](http://www.99ut.com/library/turlib/serieslib/08/08_d09.jpg)

在玫瑰花图层上建立了一个心形的蒙版，解除蒙版与图层的链接：

![](http://www.99ut.com/library/turlib/serieslib/08/08_d10.jpg)

此时可单独移动玫瑰花图层，以寻求满意的画面。当然也可以移动玫瑰花图层蒙版，以改变心形区域在画面上的布局位置。

![](http://www.99ut.com/library/turlib/serieslib/08/08_d11.jpg)

出于布局目的所使用的蒙版是不适合执行应用蒙版操作的。

## 矢量蒙版

矢量蒙版可以任意变换，不会损失质量。

择形状工具〖U/SHIFT_U〗，在形状列表中选择心形。然后在画面中适当的地方绘制(可按住SHIFT保持比例)心形路径。

![](http://www.99ut.com/library/turlib/serieslib/08/08_d12.jpg)

![](http://www.99ut.com/library/turlib/serieslib/08/08_d13.jpg)

图层_矢量蒙版_当前路径】即可为玫瑰花图层(确认图层选择是否正确)建立一个矢量蒙版：

![](http://www.99ut.com/library/turlib/serieslib/08/08_d14.jpg)

与点阵蒙版相同，矢量蒙版也存在于图层的链接关系，但不能对矢量蒙版进行色彩调整或对其使用滤镜。

## 渐变及半透明蒙版

蒙版中除了用黑色表示屏蔽，白色表示显示之外，还可以使用灰色，它的效果就如同Alpha通道转为选区一样，能令图层出现半透明效果。

选择画笔工具并将硬度设为100%，直径40或50。在蒙版中下左图红色箭头处附近的区域，〖F6〗开启颜色调板，选择35%灰度(选择蒙版时颜色调板将自动切换到灰度)涂抹，

![](http://www.99ut.com/library/turlib/serieslib/08/08_c14.jpg)

就会看到涂抹的区域产生了半透明的效果：

![](http://www.99ut.com/library/turlib/serieslib/08/08_c15.jpg)

此时蒙版为：

![](http://www.99ut.com/library/turlib/serieslib/08/08_c16.jpg)

我们用不同的灰度涂抹，就会得到不同程度的透明效果。所用的颜色越接近黑色，透明效果就越明显。黑色的作用就是令图层的部分区域完全透明，而白色就是完全不透明。

如果将一系列过渡的灰色顺序涂抹出来，就可以得到渐变透明的效果，常见的方法是利用渐变工具。因为渐变工具可以产生平滑的灰度过渡效果。现在选择渐变工具〖G〗，在渐变样式列表中选择黑白渐变，在蒙版中拖动，两个图层的图片产生了过渡融合的效果。

![](http://www.99ut.com/library/turlib/serieslib/08/08_c17.jpg)

图层调板如下图，可以看到原先的齿轮形状已经被渐变所覆盖：

![](http://www.99ut.com/library/turlib/serieslib/08/08_c18.jpg)

See more [<#08_渐变及半透明蒙版>文字教程](http://www.99ut.com/text/photoshop/basic/08/pss08_05.html)

## 图片合成 - 时空门

打开田野图片，将已经用蒙版抠出的齿轮移动进来：

![](http://www.99ut.com/library/turlib/serieslib/08/08_d16.jpg)

移动齿轮到合适的地方并修改其蒙版，用画笔(硬度为30%左右)将齿轮的下面部分屏蔽：

![](http://www.99ut.com/library/turlib/serieslib/08/08_d17.jpg)

此时图层调板如下：

![](http://www.99ut.com/library/turlib/serieslib/08/08_d18.jpg)

齿轮蒙版很明显属于抠图蒙版，因此保持着与图层的链接，方便移动或其它变换。

加入另外一张云彩的图片，将其除了齿轮内部的其他区域屏蔽，形成齿轮内云彩的效果：

![](http://www.99ut.com/library/turlib/serieslib/08/08_d19.jpg)

通过修改齿轮蒙版得到云彩蒙版，方法是先将其反相(选择蒙版后〖CTRL_I〗)，然后将其余部分用黑色覆盖即可。最后再用较软的笔刷对白色区域的底部进行处理形成渐变蒙版。

![](http://www.99ut.com/library/turlib/serieslib/08/08_d42.jpg)

可以尝试通过变换将云彩图层压扁一些，这样就可以得到更多的云彩。

![](http://www.99ut.com/library/turlib/serieslib/08/08_d20.jpg)

See more [<#08_实战蒙版>文字教程](http://www.99ut.com/text/photoshop/basic/08/pss08_06.html)