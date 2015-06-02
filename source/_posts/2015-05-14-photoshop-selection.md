layout: post
title: "PhotoShop 选区"
category: PhotoShop
tags: [ps]
---

## 选区

1. 选区是封闭的区域，可以是任何形状，但一定是封闭的。不存在开放的选区。
2. 选区一旦建立，大部分的操作就只针对选区范围内有效。如果要针对全图操作，必须先取消选区。

Photoshop中的选区大部分是靠使用选取工具来实现的。选取工具共8个，集中在工具栏上部。分别是矩形选框工具![](http://www.99ut.com/library/turlib/serieslib/04/P_RectSelect_Lg_N.gif)、椭圆选框工具![](http://www.99ut.com/library/turlib/serieslib/04/P_EllipseSelect_Lg_N.gif)、单行选框工具![](http://www.99ut.com/library/turlib/serieslib/04/P_RowSelect_Lg_N.gif)、单列选框工具![](http://www.99ut.com/library/turlib/serieslib/04/P_ColumnSelect_Lg_N.gif)、套索工具![](http://www.99ut.com/library/turlib/serieslib/04/P_RegionSelect_Lg_N.gif)、多边形套索工具![](http://www.99ut.com/library/turlib/serieslib/04/P_PolygonSelect_Lg_N.gif)、磁性套索工具![](http://www.99ut.com/library/turlib/serieslib/04/P_MagneticSelect_Lg_N.gif)、魔棒工具![](http://www.99ut.com/library/turlib/serieslib/04/P_SimilarSelect_Lg_N.gif)。其中前4个属于规则选取工具。

在Photoshop中打开一幅图像，在工具栏选择矩形选框工具〖M〗或〖SHIFT M〗。

Photoshop中的选取工具从性质上来说分为两类，一类是轨迹选取方式，还有一类就是现在要接触的颜色选取方式。注意虽然磁性套索是利用色彩判断边界，但最大影响还是鼠标的轨迹，因此我们把磁性套索也归入轨迹类选取工具中。

可以【选择 取消选择】或者按 〖Ctrol + D〗取消选区。

## 规则选区

流动的虚线就是Photoshop对选区的表示。虚线之内的区域就是选区。在选取过程中如果按下ESC键将取消本次选取。此时再使用色彩调整工具进行调整，就只会对选区内的图像有效了。

绘制过程中可打开信息调板〖F8〗观看选区的大小。

![](http://www.99ut.com/library/turlib/serieslib/04/004_010.jpg)

W是宽度，H是高度，右上角的XY代表起点坐标。左下角的XY代表目前鼠标在图像中的坐标，单位是像素。如果单位不是像素，可以点击红色箭头处的十字标记，在弹出的菜单中选择像素。

选区工具的几种运算方式，分别为 添加、减去、交集等操作。它们以按钮形式分布在公共栏上。分别是：新选区![](http://www.99ut.com/library/turlib/serieslib/04/select_new.jpg)、添加到选区![](http://www.99ut.com/library/turlib/serieslib/04/select_add.jpg)、从选区减去![](http://www.99ut.com/library/turlib/serieslib/04/select_sub.jpg)、与选区交叉![](http://www.99ut.com/library/turlib/serieslib/04/select_int.jpg)。

除了在公共栏切换运算方式以外，也可以通过快捷键来切换。添加到选区的快捷键是〖SHIFT〗。从选区减去的快捷键是〖ALT〗。与选区交叉的快捷键是〖SHIFT ALT〗。这些快捷键只需要在鼠标之前按下即可，在鼠标按下以后，快捷键可以松开。

普通方式下从红点拉出的矩形选区，鼠标落点与起点是成对顶角的。按住ALT键从红点拖拉，就是以起点为中心点，向四周扩散选取。此时是先按鼠标，再按 ALT 键，否则会选择不同的选取操作方式。

另外，全程按住SHIFT键可锁定为正方形(注意是全程)。可以和ALT键配合使用，效果就是：从中心点出发向四周扩散选取的正方形选区。

![](http://www.99ut.com/library/turlib/serieslib/04/004_019.jpg) ![](http://www.99ut.com/library/turlib/serieslib/04/004_020.jpg)

与矩形选框工具组合在一起的是椭圆选框工具，因为椭圆可以看作是一个矩形的内切圆，因此它的使用方法与矩形选框工具是一样的。快捷键也一致，ALT是从中点出发，SHIFT是保持正圆。

### 锯齿

使用椭圆选框工具，分别关闭和打开消除锯齿(也称抗锯齿)，创建两个差不多大的正圆形选区，然后填充黑色：

![](http://www.99ut.com/library/turlib/serieslib/04/004_057.jpg)

到第一个圆的边缘较为生硬，有明显的阶梯状，也叫锯齿，第二个圆相对要显得光滑一些。第二个圆其实也有锯齿，但是锯齿的边缘变得柔和了。有一种从黑色到背景白色的过渡效果。因此看起来比第一个圆显得光滑一些。这就是消除锯齿的效果了。所谓消除锯齿并不是真正消除，而只是采用了“障眼法”令图像看起来光滑一些。只要图像是点阵的，锯齿就永远存在。

![](http://www.99ut.com/library/turlib/serieslib/04/004_058.jpg)

羽化选项的作用就是虚化选区的边缘，这样在制作合成效果的时候会得到较柔和的过渡。

使用椭圆选框工具，将羽化设为0和5，依次创建出两个正圆选区，然后填充上黑色(〖D〗，〖ALT DELETE〗)，不要取消选区。

![](http://www.99ut.com/library/turlib/serieslib/04/004_059.jpg)

放大后可以看到，这个淡化的效果以选区的虚线为中心，同时向选区内部和外部延伸：

![](http://www.99ut.com/library/turlib/serieslib/04/004_060.jpg)

这个时候如果使用10像素大小的画笔工具，选一个红色在选区内绘制，将会出现如下右图的效果。

![](http://www.99ut.com/library/turlib/serieslib/04/004_061.jpg)

此时，选区的虚线框有时并不能完全地表示所选中的范围。

### 羽化

虽然选取工具在公共栏中提供了直接的羽化选项，但不建议直接使用它。

建议选取的时候都将羽化设置为0，在完成后使用菜单【选择 羽化】〖CTRL ALT D〗，或点击右键(使用选取工具或裁切工具前提下)在出现的菜单中选择“羽化”。

![](http://www.99ut.com/library/turlib/serieslib/04/004_067.jpg)

设置羽化后，选区虚线框可能会缩小并且拐角会变得平滑，如下中图是羽化10像素后的效果。

![](http://www.99ut.com/library/turlib/serieslib/04/004_068.jpg)

羽化使选中的图像边缘呈现半透明过渡的效果，这有利于在不同图像中合成效果。

因为羽化的效果是沿着选区边缘平均分配的。而大部分时候我们需要在不同的地方设置不同的透明或羽化程度。直接使用羽化 来合成图像的机会并不多。

## 任意选区

建立任意选区的工具是套索工具![](http://www.99ut.com/library/turlib/serieslib/04/P_RegionSelect_Lg_N.gif)、多边形套索工具![](http://www.99ut.com/library/turlib/serieslib/04/P_PolygonSelect_Lg_N.gif)、磁性套索工具![](http://www.99ut.com/library/turlib/serieslib/04/P_MagneticSelect_Lg_N.gif)、魔棒工具![](http://www.99ut.com/library/turlib/serieslib/04/P_SimilarSelect_Lg_N.gif)。

对于可以设定宽度的选取工具，如磁性套索工具，可以按下 〖CapsLock〗切换到精确光标方式，此时光标会变为一个中间带十字的圆圈。缩放宽度的快捷键与笔刷一样：〖[〗和〖]〗。

### 套索工具

套索工具的使用方法与画笔有点类似，在屏幕上按下鼠标任意拖动，松手(或按回车键)后即可建立一个与拖动轨迹相符的选区。需要注意的是，如果起点与终点不在一起就会自动在两者间连接一线。

![](http://www.99ut.com/library/turlib/serieslib/04/004_026.jpg)

套索工具有一种特殊的使用方法就是按住ALT键，这时就不再以移动轨迹作为选区，而是在单击的点间连直线形成选区，并且在选取过程中可以任意切换。

![](http://www.99ut.com/library/turlib/serieslib/04/004_028.jpg)

事实上套索工具在实际使用过程中很少被用来直接创立选区，因为它的轨迹太难掌握。最经常的作用是用来小范围修补选区。

### 多边形套索工具

多边形套索工具的使用方法大体和上面的“连点成线”相同，在选取过程中持续按住SHIFT键可以保持水平、垂直或45度角的轨迹方向。并且如果终点与起点重合会出现一个小圆圈样子的提示。

![](http://www.99ut.com/library/turlib/serieslib/04/004_029.jpg)

另外，在“连点成线”过程中可以按DELETE键或BackSpace撤销前一个点，可一直撤销到最初。这个功能在套索工具中按下ALT键后也有效，但是撤销的时候ALT键不能松开，也就是说要保持按住ALT键再按DELETE或BackSpace键。

切换到精确光标方式的方法是按下大小写转换键CapsLock，按下后，中间的点就是热点。

### 磁性套索工具

磁性套索工具的原理是分析色彩边界，它在经过的道路上找到色彩的分界并把它们连起来形成选区。公共栏中除了和其他工具相同的一些选项之外，宽度、边对比度、频率是与众不同的。

现在开始选取，注意选取过程中十字应该尽可能贴近色彩边缘。如果没有完全贴紧色彩边缘，只要误差在一定的范围内，磁性套索工具还是能够找到边缘。这个误差范围就是十字周围圆圈的大小，就是公共栏中的宽度。宽度越大容错(允许的误差)范围越大。如果超出了容错范围，磁性套索工具可能就无法准确地沿着正确的色彩边缘前进了。

![](http://www.99ut.com/library/turlib/serieslib/04/004_033.jpg) ![](http://www.99ut.com/library/turlib/serieslib/04/004_035.jpg)

- 宽度：一般把宽度设置在5~10左右是比较好的。注意这个宽度会随着图像显示比例的不同而有所改变，建议将图像放在100%的显示比例上。

    设定较大的宽度尽管看起来似乎更好用，因为可允许的误差范围也大，但过大的宽度反而可能导致误选取。因为太大的宽度中可能会包含两条或更多的色彩边缘。

- 采样点：线路上的小方块是采样点，它们的数量可以通过公共栏中的频率来调整，频率越大采样点越多。DELETE或BackSpace可以逐个撤销采样点。选取过程中按下ESC键将取消本次选取。 
- 对比度：对比度的作用要根据图像而定，如果色彩边界较为明显，就可以使用较高的边对比度，这样磁性套索对色彩的误差就非常敏感。如果色彩边界较模糊，就适当降低边对比度。但在实际使用过程中这个选项的作用不大，频率的作用也不是很大，比较重要的是宽度的设定。

现在我们将磁性套索宽度设为7像素，边对比度10%，频率50，画出选区。在图像以外的部分移动的时候可以单击增加控制点。

![](http://www.99ut.com/library/turlib/serieslib/04/004_036.jpg)

现在还有一些该选的区域没有选中，比如左上角和右上方的天空部分。有些不该选的却选了，比如房子的一角。这个时候我们可以使用套索工具来做些小修补。

### 魔棒工具

魔棒工具利用颜色的差别来创建选区。以热点的那个像素颜色值为准，寻找容差范围内的其他颜色像素，然后把它们变为选区。

利用魔棒选取出来的天空部分，理论上比起磁性套索工具更精确，因为魔棒工具对色彩的分析能力要强于磁性套索。

- 容差：

    有关容差不同造成的选取范围不同，可以从下面的例子看出，注意图中有一个两个相邻的红色与粉红色方块，现在我们用默认的32容差与80容差去选取红色：

    ![](http://www.99ut.com/library/turlib/serieslib/04/004_044.jpg) ![](http://www.99ut.com/library/turlib/serieslib/04/004_045.jpg)

    现在要求把其中绿色的部分选中：

    ![](http://www.99ut.com/library/turlib/serieslib/04/004_042.jpg)

- 连续：

    勾选连续：

    ![](http://www.99ut.com/library/turlib/serieslib/04/004_043.jpg)

    使用它在一个绿色的方块上点击一下，就会看到只有一个绿色方块就被选中了。

    ![](http://www.99ut.com/library/turlib/serieslib/04/004_a10.jpg)

    取消勾选“连续”选项，然后用魔棒工具点选任意一个绿色，会看到图像中全部的绿色方块都被选中了。

    ![](http://www.99ut.com/library/turlib/serieslib/04/004_046.jpg)

    创建如下选区，除了中间一个绿色块以外，将其余的绿色方块都选中：

    ![](http://www.99ut.com/library/turlib/serieslib/04/004_051.jpg)


    如果想取消选中其中一个绿色块，可以先关闭“连续的”选项，然后点击中间的那个绿色方块，此时全部绿色方块被选中。然后打开“连续的”选项，切换到减去方式再点击这个绿色方块即可达到目的。

## 选区的存储及载入

创建选区后，直接点击右键(限于选取工具)出现的菜单中就“存储选区”项目。也可以使用菜单【选择 存储选区】。

![](http://www.99ut.com/library/turlib/serieslib/04/004_070.jpg)

当需要载入存储的选区时，可以使用菜单【选择 载入选区】。也可以在图像中点击右键选择该项，前提是目前没有选区存在，且选用的是选取类工具〖M〗〖L〗〖W〗或裁切工具〖C〗。

![](http://www.99ut.com/library/turlib/serieslib/04/004_071.jpg)

如果存储了多个选区，就在通道下拉菜单中选择一个。下方有一个“反相”的选择，作用相当于载入选区后执行反选命令。如果图像中已经有一个选区存在，载入选区的时候，就可以选择载入的操作方式。所谓操作就是前面接触过的选区运算，即添加、减去、交叉。如果没有选区存在，则只有“新选区”方式有效。

载入时选区的选择项是通道，因为选区存储就是存储在通道中的。RGB或CMYK图像通道就是一幅图像中的“领导通道”。而通过存储选区形成的通道，属于“编外人员”，并不是必须的，删除之 只会丢失所存储的选区，而并不会造成图像的破坏。只有RGB或CMYK通道才控制着图像的“显示权”，用来存储选区的通道不会影响图像的最终输出效果。

See more [<#04_选区的存储及载入>Photoshop](http://www.99ut.com/text/photoshop/basic/04/pss04_04.html)。

See also [<#04_论选区的不透明度>Photoshop](http://www.99ut.com/text/photoshop/basic/04/pss04_05.html)。