layout: post
title: "PhotoShop 路径"
category: PhotoShop
tags: [ps]
---

## 路径

路径是矢量的。如果说图像中什么东西是矢量的，那么它就是由路径所组成的。

路径可以是与选区类似的封闭区域，也可以只是一条首尾并不相连的线段，分别称作封闭路径和开放路径。而线段可以是直线也可以是曲线，或两者兼而有之。

路径在Photoshop中是指示性的，本身并不能直接构成图像的一部分，只有在将其作为图层蒙版或填色及画笔描边后，才可以对图像像素产生影响。在这点上与选区类似，单纯的创建或修改选区也不能直接令图像发生改变。

在Photoshop中只有特定的几个工具能够针对路径进行操作，它们分别是钢笔工具![](http://www.99ut.com/library/turlib/serieslib/12/P_VectorDraw_Lg_N.jpg)，自由钢笔工具![](http://www.99ut.com/library/turlib/serieslib/12/P_FreeformVectorDraw_Lg_N.jpg)，添加锚点工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorAdd_Lg_N.jpg)，删除锚点工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorDel_Lg_N.jpg)，转换点工具![](http://www.99ut.com/library/turlib/serieslib/12/P_ConvertAnchor_Lg_N.jpg)。这5种工具用来绘制及修改路径。此外还有路径选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_Select_Lg_N.jpg)和直接选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorSelect_Lg_N.jpg)，这两者都是用来选取路径的，但在功能上有所区别。

可以从路径形态上将锚点分为直线型和曲线型两种：

- 直线型锚点没有独立的方向线，或者说直线型锚点的方向线与路径走向是一致的。所以一般我们说起方向线，就是指曲线锚点。
- 曲线型锚点由两个方向线，它们控制着曲线的弯曲程度，改变方向线的角度和长度会影响曲线的弯曲度。这两条方向线一个控制着“来向”曲线形态，另一个控制“去向”曲线形态。

直线型路径并没有太大的意义，路径的一个很大优势在于其可以很方便地创建曲线。创建直线型锚点的方法就是在不同的地方单击点，而创建曲线路径是在需要的地方按下鼠标并拖动才能完成，这拖动的操作实际上就是在建立锚点的曲线方向线。也就是说，拖动的程度将会直接影响曲线的弯曲度。

## 锚点

选择钢笔工具![](http://www.99ut.com/library/turlib/serieslib/12/P_VectorDraw_Lg_N.jpg)〖P/SHIFT_P〗。在公共栏将绘图方式改为“路径”![](http://www.99ut.com/library/turlib/serieslib/12/P_WorkPathShape_Md_N.jpg)

![](http://www.99ut.com/library/turlib/serieslib/12/12b01.jpg)

新建一个400×300(可自行设定其它大小)的图像，此时将鼠标移到图像内，光标应显示为![](http://www.99ut.com/library/turlib/serieslib/12/pen_newpath.jpg)，然后依次在图像中4个不同地方单击，就会看到这4点间形成了一条路径。

![](http://www.99ut.com/library/turlib/serieslib/12/12b03.jpg)

我们单击的4处地方，每个单击的点都有一个方块，这些方块有的空心(如1、2、3处)有的实心(如4处)。这些点称为锚点，每两个锚点间的线段称为片断。锚点1与锚点2之间的片断我们将其命名为片断12，以此类推命名片断23和片断34。锚点的英文名为anchor，片断的英文名为segment。

需要使用直接选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorSelect_Lg_N.jpg)〖A/SHIFT_A〗才可以移动锚点，现在我们先切换到直接选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorSelect_Lg_N.jpg)，在路径上任意位置点击一下，会看到路径上的各锚点都以空心方块显示。

![](http://www.99ut.com/library/turlib/serieslib/12/12b06.jpg)

我们在其中的锚点3上单击，会看到其变为了实心方块。

![](http://www.99ut.com/library/turlib/serieslib/12/12b07.jpg)

实心方块就表示该锚点(也可以是多个锚点)处于被选择状态。

可以使用直接选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorSelect_Lg_N.jpg)移动锚点3，移动过程中可按住SHIFT键保持水平、垂直或45度角方向。在移动过程中鼠标光标为![](http://www.99ut.com/library/turlib/serieslib/12/ps_cur_moving.jpg)。

![](http://www.99ut.com/library/turlib/serieslib/12/12b08.jpg)

也可以移动多个锚点，前提当然是要先选择多个锚点。在先选择了一个锚点后，然后按住SHIFT键单击其他的锚点即可加上。

路径调板与图层调板是不同的，图层调板会将所有图层中的内容都依次显示在其中，也就是说，我们通过图层调板就可以得知图像中所有图层的情况。而路径调板并不是这样，即使在图像中使用了多个矢量路径，也并不会在路径调板中依次列出。如果只通过路径调板观看，我们并不能得知图像中所有路径的情况。

在路径上删除现有锚点的方法是使用钢笔工具![](http://www.99ut.com/library/turlib/serieslib/12/P_VectorDraw_Lg_N.jpg)〖P/SHIFT_P〗，将其移动到已有的锚点之上，注意鼠标光标变为![](http://www.99ut.com/library/turlib/serieslib/12/pen_sub.jpg)，此时单击即可删除该锚点。

如果要添加锚点，就是将鼠标移动到现有的路径片断上，光标将变为![](http://www.99ut.com/library/turlib/serieslib/12/pen_add.jpg)，此时单击即可添加一个新锚点。如果我们使用直接选择工具移动这个新增锚点，会发现这是一条曲线。

另外Photoshop提供了专门的添加锚点工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorAdd_Lg_N.jpg)和删除锚点工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorDel_Lg_N.jpg)，添加锚点工具可直接在没有显示锚点的路径上添加新锚点，它可在路径的任意位置上使用。删除锚点工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorDel_Lg_N.jpg)在没有显示锚点的路径上将显示为直接选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorSelect_Lg_N.jpg)的光标，在点击路径后会显示其锚点，此时在已有的锚点上单击即可删除该锚点。该工具只能在已有的锚点上有效，在其他位置上还是显示为直接选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorSelect_Lg_N.jpg)的光标。

## 锚点方向线

新建一个图像(400×300或任意尺寸)，切换到钢笔工具![](http://www.99ut.com/library/turlib/serieslib/12/P_VectorDraw_Lg_N.jpg)〖P/SHIFT_P〗来绘制新路径。

在起点按下鼠标并向右上方拖动些许，会看到一个锚点的产生以及两条以锚点为中心的射线随着鼠标拖动，在合适的地方松手，完成起点锚点的绘制。现在移动到第二个地方，同样按下鼠标拖放些许，方向大致为右下方，拖动时除了看到两条与之前相同的射线外，还能看见一条曲线在逐渐形成。松手后完成这个锚点的绘制。最后在终点的位置再按下鼠标拖动些许，方向为右上方，松手后完成。这样我们就得到一个由3个锚点产生的曲线路径，过程可参考下图。我们在步骤之间使用了蓝色分隔线。并用红色数字表示将要绘制的锚点，用绿色数字表示已完成绘制的锚点。

![](http://www.99ut.com/library/turlib/serieslib/12/12c01.jpg)

现在使用路径选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_Select_Lg_N.jpg)或直接选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorSelect_Lg_N.jpg)在路径之外的位置点击一下，就会看到路径上的所有锚点都被隐藏了。

使用直接选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorSelect_Lg_N.jpg)〖A/SHIFT_A〗在锚点12之间的片断点击一下，就会看到两条射线。

![](http://www.99ut.com/library/turlib/serieslib/12/12c02.jpg) ![](http://www.99ut.com/library/turlib/serieslib/12/12c03.jpg)

对于一个锚点而言，都有“来向”与“去向”两条方向线。“去向”方向线影响的是该锚点与下一个锚点间片断的弯曲度。而“来向”方向线则影响着该锚点与前一个锚点间片断的弯曲度。
既然锚点决定片断，那么片断也可以反证锚点。如果将曲线片断作为圆弧对象来看，按照几何理论，方向线就应当是位于圆弧某一点位置上的切线。这个“某一点”正是锚点。

现在我们尝试更改锚点2的“去向”方向线，来看看会有怎样的变化。先使用直接选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorSelect_Lg_N.jpg)选择片断23，再切换到转换点工具![](http://www.99ut.com/library/turlib/serieslib/12/P_ConvertAnchor_Lg_N.jpg)〖P/SHIFT_P〗，在方向线末端的圆点上按住并往左拖动些许位置，看到片断23的弯曲度发生了变化，这实质上是修改了方向线的角度，造成了片断弯曲度的变化。

![](http://www.99ut.com/library/turlib/serieslib/12/12c10.jpg)

也可以不改变角度，在现有角度的方向上拖动，将方向线伸长或者缩短，也会造成片断弯曲度变化。

![](http://www.99ut.com/library/turlib/serieslib/12/12c11.jpg)

对于修改方向线长度所造成的影响，我们可以这样来理解：锚点间的片断是一根有弹性的橡皮筋，方向线长一些就好比往某个方向上拉动的力量大一些，这样橡皮筋就会在这个方向上多弯曲一些。反过来如果方向线较短则表示拉动的力量较小，而橡皮筋则较少向这个方向弯曲。

如果将方向线看待为X轴，曲线的相离程度为Y轴，则两者对比应如下图所示。不难看出，在同样大的两个矩形区域右端(代表X轴方向上经过同样的距离)，曲线在Y轴上的高度有明显的不同。方向线较长，则曲线贴近方向线的距离也就越远。

![](http://www.99ut.com/library/turlib/serieslib/12/12c12.jpg)

如果要结束路径的绘制，可切换到其他的路径工具，如路径选择工具〖A〗、形状工具〖U〗。最常用最方便的应该是按住CTRL在路径之外点一下(这实际上是临时切换到了直接选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorSelect_Lg_N.jpg))。在以后要学习的Illustrator中也可以使用此方法结束绘制。另外，如果将鼠标移动到起点锚点上，光标指示将变为![](http://www.99ut.com/library/turlib/serieslib/12/pen_end.jpg)(前提是已有至少两个锚点存在，否则无效)，这时若点击则会建立一个封闭区域，绘制也将随之结束。

## 曲线形态

### C形曲线

如果我们为每个曲线标上XY横竖坐标，那么以下曲线的两条方向线指向都处在X轴同一侧，或Y轴同一侧。这就是C形曲线的共同点。C形曲线的两条方向线，要么是一起向上指向，要么是一起向下、向左或向右指向。而它们之间的夹角不会超过90度。

![](http://www.99ut.com/library/turlib/serieslib/12/12d01.jpg)

### S形曲线

下图的几种，它们的两条方向线夹角都大于90度，分别位于X轴或Y轴的两侧，也就是说，要么一上一下，要么一左一右。这样的曲线我们可以称之为S形曲线。

![](http://www.99ut.com/library/turlib/serieslib/12/12d02.jpg)

## 绘制曲线

绘制路径其实根本就在于锚点，锚点的位置和方向线决定了片断(即锚点之间的线段)的形态，许多个片断相连就组成了我们所看到的曲线。所以判断锚点的位置就显得很重要，而判断锚点位置的方法，其实也就是分析出C形和S形片断曲线的所在。

![](http://www.99ut.com/library/turlib/serieslib/12/12d03.jpg)

不难看出，1号是C形，2号和3号是S形。它们都是由两个锚点所组成的，锚点的位置就是每条曲线的起点和终点。因此它们的绘制效果：

![](http://www.99ut.com/library/turlib/serieslib/12/12d08.jpg)