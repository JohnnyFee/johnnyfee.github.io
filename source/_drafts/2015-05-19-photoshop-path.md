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

取消路径选择的方法，可以在路径调板中路径名称之外点击即可(如下右图红色区域)。如果当前使用的是路径类工具的时候，按下回车键也可取消当前路径选择。

![](http://www.99ut.com/library/turlib/serieslib/12/12d20.jpg)-![](http://www.99ut.com/library/turlib/serieslib/12/12d22.jpg)

如果要将其长久保留在路径调板中，就要将其变为永久路径。将现有的路径拖动到底部的新建按钮![](http://www.99ut.com/library/turlib/serieslib/12/P_New_Wi_N.jpg)上，就如同复制图层一样。

![](http://www.99ut.com/library/turlib/serieslib/12/12d23.jpg)

单纯的路径绘制完之后是临时性的。所谓单纯的路径就是指在公共栏以![](http://www.99ut.com/library/turlib/serieslib/12/P_WorkPathShape_Md_N.jpg)方式绘制的路径，必须转为永久路径后才能长期保留。不过如果是以![](http://www.99ut.com/library/turlib/serieslib/12/P_BitmapShapeFilled_Md_N.jpg)方式绘制的则不必担心会消失(尽管不属于永久路径)。

路径并不是图层，因此不要用图层的思路来思考路径，比如路径的复制，刚才我们在路径调板中的复制，其实算不上真正的复制，因为这两个路径并不能同时出现。基于像素的点阵图像，如果要避免混淆，需要用单独的图层去存放，否则像素就会融合到一起。而路径本身可独立成体，如下图。虽然在路径调板中显示只有一条路径，但是在画面中却存在着两条独立的路径。

![](http://www.99ut.com/library/turlib/serieslib/12/12d24.jpg)

路径调板中的每一个路径名称，其实都是一个路径组，在这个组中可以存放很多路径。可以通过路径选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_Select_Lg_N.jpg)〖A/SHIFT_A〗去移动路径。

![](http://www.99ut.com/library/turlib/serieslib/12/12d26.jpg)

按住SHIFT键后依次点击各路径，可选择(再次点击则取消选择)多条路径，另外也可以如下右图般拖拉出选取框来选择多条路径。拖拉框只需要触及路径即可，不用完全包围。

![](http://www.99ut.com/library/turlib/serieslib/12/12d27.jpg)

虽然直接选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorSelect_Lg_N.jpg)也可以移动路径，但很容易造成路径上锚点或片断的移动，因此如果是为了移动整条路径，而不是为了修改，还是使用路径选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_Select_Lg_N.jpg)较为妥当。另外需要注意的是，单纯的路径是无法通过我们惯用的移动工具![](http://www.99ut.com/library/turlib/serieslib/12/P_Move_Lg_N.jpg)去移动的。

在移动过程中，按住SHIFT键可锁定移动的方向，另外也可以使用键盘上的方向键移动。

在对于已经完成绘制的路径，如果需要继续对其绘制，可使用钢笔工具![](http://www.99ut.com/library/turlib/serieslib/12/P_VectorDraw_Lg_N.jpg)移动到路径的末端端点，注意光标变为![](http://www.99ut.com/library/turlib/serieslib/12/pen_link.jpg)，并且锚点处于被选择状态，此时就可以在其它地方继续绘制这条路径的新锚点了。

![](http://www.99ut.com/library/turlib/serieslib/12/12d19.jpg)

当路径组中有两条以上的路径时，我们可以将它们连接起来变为一条，方法是使用钢笔工具![](http://www.99ut.com/library/turlib/serieslib/12/P_VectorDraw_Lg_N.jpg)分别在两条路径的端点上单击即可，过程如下图。注意当移动到两个端点上时，光标先后都会变为![](http://www.99ut.com/library/turlib/serieslib/12/pen_link.jpg)。

![](http://www.99ut.com/library/turlib/serieslib/12/12d25.jpg)

在选择(一个或多个)图层后用移动工具![](http://www.99ut.com/library/turlib/serieslib/12/P_Move_Lg_N.jpg)按住ALT键后拖动，可达到复制(一个或多个)图层的效果。对于路径也是一样，只是必须通过路径选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_Select_Lg_N.jpg)去完成。这种方法才算得上是真正的复制路径，复制后两条路径可以同时显示，以后也可以同时加以应用。可以选择多条路径后一起复制。

![](http://www.99ut.com/library/turlib/serieslib/12/12d28.jpg)

我们新建一幅图像，开启路径调板，看到其中是空白的，此时点击下左图红色箭头处的新建按钮，建立一个空白的路径组。这样做的好处是，接下来所绘制的路径就会直接以“永久路径”的形式存放在其中。

![](http://www.99ut.com/library/turlib/serieslib/12/12d29.jpg)

如果路径调板中存在着多个路径组，那么所绘制的路径将存放在当前所选择的路径组中，因此在绘制之前要确定是否正确选择了路径组，分别在两个路径组中绘制了不同的路径。

![](http://www.99ut.com/library/turlib/serieslib/12/12d30.jpg)

在Photoshop中无法同时显示两个路径组中的内容，无法显示也就无法加以应用。如果有时候需要将不同路径组中的路径同时显示，则可以通过拷贝粘贴来完成。过程如下图所示，先在路径调板中选择“路径1”，用路径选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_Select_Lg_N.jpg)选中路径(选中的路径会显示出锚点)，按下〖CTRL_C〗拷贝。然后在路径调板中选择“路径2”，按下〖CTRL_V〗将所拷贝的路径粘贴，两条曲线就位于同一个路径组中了。

![](http://www.99ut.com/library/turlib/serieslib/12/12d31.jpg)

这样就可以对它们进行其他的操作或应用，如将两条曲线连接为一条，以及后面要学习的路径运算等。

对于已经完成绘制路径，有些时候可能需要删除。大家也许也能想到，如同图层调板一样，在路径调板中将路径名称拖动到下方的垃圾桶图标![](http://www.99ut.com/library/turlib/serieslib/12/P_Delete_Sm_N.jpg)上。这个方法是没错，但需要注意的是，由于路径调板是组方式，删除路径组将引起组中所有路径都被删除。因此事先要看清楚以免误操作。

通常都是使用路径选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_Select_Lg_N.jpg)选择一条或多条路径后，按下键盘上的DELETE键或BackSpace键予以删除。如果有多个路径组存在，就要先确定是否正确选择。

和选区一样，路径也存在加上、减去、交叉这样的运算。

对于已经绘制好的曲线锚点，可以将它改变为直线锚点，方法是使用转换点工具![](http://www.99ut.com/library/turlib/serieslib/12/P_ConvertAnchor_Lg_N.jpg)在锚点上点击。

![](http://www.99ut.com/library/turlib/serieslib/12/12d32.jpg)

如果按住ALT键点击，则可以单独删除“去向”方向线，此时的锚点既有曲线性质也有直线性质，称为半曲线锚点。

![](http://www.99ut.com/library/turlib/serieslib/12/12d33.jpg)

如果要将直线锚点转为曲线锚点，则可以使用转换点工具在锚点上按下并拖动出方向线。如果原先已经是曲线锚点，这个操作就可以重新建立方向线。

![](http://www.99ut.com/library/turlib/serieslib/12/12d34.jpg)

除了使用工具栏中的路径类工具以外，也可以使用自由变换功能来修改路径。既可以对路径整体(即所有锚点)作出修改，也可以只针对一个或多个锚点进行修改。在选择锚点后〖CTRL_T〗即可开启自由变换，此外也可以在使用路径类工具的时候点击右键选择。尽管这种方式较少使用，但却能营造非常好的效果。大家可以尝试选择不同的锚点，进行不同的变换操作。

![](http://www.99ut.com/library/turlib/serieslib/12/12d35.jpg) ![](http://www.99ut.com/library/turlib/serieslib/12/12d36.jpg) ![](http://www.99ut.com/library/turlib/serieslib/12/12d37.jpg)

如果要对路径整体进行修改，应使用路径选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_Select_Lg_N.jpg)选择路径，避免使用直接选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorSelect_Lg_N.jpg)以免误操作。

### 应用路径

See [<#12_应用路径>Photoshop](http://www.99ut.com/text/photoshop/basic/12/pss12_08.html)

### 实战路径运算

See [<#12_实战路径运算>Photoshop](http://www.99ut.com/text/photoshop/basic/12/pss12_09.html)

### 利用路径运算进行制作

See [<#13_利用路径运算进行制作>文字教程](http://www.99ut.com/text/photoshop/basic/13/pss13_01.html)

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

路径调板通常和图层调板组合在一起，也可以通过【窗口_路径】开启。

在路径上删除现有锚点的方法是使用钢笔工具![](http://www.99ut.com/library/turlib/serieslib/12/P_VectorDraw_Lg_N.jpg)〖P/SHIFT_P〗，将其移动到已有的锚点之上，注意鼠标光标变为![](http://www.99ut.com/library/turlib/serieslib/12/pen_sub.jpg)，此时单击即可删除该锚点。

如果要添加锚点，就是将鼠标移动到现有的路径片断上，光标将变为![](http://www.99ut.com/library/turlib/serieslib/12/pen_add.jpg)，此时单击即可添加一个新锚点。如果我们使用直接选择工具移动这个新增锚点，会发现这是一条曲线。

另外Photoshop提供了专门的添加锚点工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorAdd_Lg_N.jpg)和删除锚点工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorDel_Lg_N.jpg)，添加锚点工具可直接在没有显示锚点的路径上添加新锚点，它可在路径的任意位置上使用。删除锚点工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorDel_Lg_N.jpg)在没有显示锚点的路径上将显示为直接选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorSelect_Lg_N.jpg)的光标，在点击路径后会显示其锚点，此时在已有的锚点上单击即可删除该锚点。该工具只能在已有的锚点上有效，在其他位置上还是显示为直接选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorSelect_Lg_N.jpg)的光标。

### 锚点方向线

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

### 规划锚点

See [<#12_规划锚点>Photoshop](http://www.99ut.com/text/photoshop/basic/12/pss12_07.html)

### 利用锚点移动进行制作

[<#13_利用锚点移动进行制作>文字教程](http://www.99ut.com/text/photoshop/basic/13/pss13_02.html)

### 制作简单网页物体

See [<#13_制作简单网页物体>文字教程](http://www.99ut.com/text/photoshop/basic/13/pss13_03.html)

### 实战网页设计稿

See [<#13_ 实战网页设计稿>文字教程](http://www.99ut.com/text/photoshop/basic/13/pss13_04.html)

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

在实际操作中，锚点的位置通常是比较容易确定的，难点主要在于锚点方向线的控制上。方向线有两个控制因素，一是角度，二是长度。角度相对来说简单些，就是锚点处的曲线切线，并且要朝向下一锚点的方向就可以了。而长度则影响着曲线与方向线的相离程度，如果曲线的跨度很大(圆弧距离长)，则方向线应长些，反之则短些。

![](http://www.99ut.com/library/turlib/serieslib/12/12d09.jpg) ![](http://www.99ut.com/library/turlib/serieslib/12/12d10.jpg)

### M 形状

现在为止我们都只是绘制简单的两点曲线，即起点和终点。但在实际应用中所需要绘制的路径，并不可能都这样单一，大多数都是“蜿蜒曲折”的。我们现在就来学习能够应用于实际应用的绘制方法。

再新建一个图像，准备绘制一个如下左图m形状的路径。它应该是由两个C形曲线构成，锚点和方向线应该如下中图所示，注意中间那个锚点的方向线夹角很特殊，并不是像以往我们所看到的那样成180度。但大家仔细想一下就能理解，中间这个锚点的方向线必须要是这样的夹角，才能形成m形。

![](http://www.99ut.com/library/turlib/serieslib/12/12d11.jpg) ![](http://www.99ut.com/library/turlib/serieslib/12/12d12.jpg) ![](http://www.99ut.com/library/turlib/serieslib/12/12d13.jpg)

修改锚点方向线的方法并不复杂，但首先必须选择锚点，我们在介绍直线型路径的时候就已经学习过了，用直接选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorSelect_Lg_N.jpg)〖A/SHIFT_A〗在锚点上单击即可选择。不过由于曲线形路径有时候很难判断锚点的所在，可以先在片断上单击一下，就会看到路径中所有锚点的位置，这样就可以比较准确地选择了。被选择的锚点以实心小方块显示，未选择的锚点以空心小方块显示。

当在锚点上单击之后，该锚点的两条方向线就会同时显示出来。此时选择转换点工具![](http://www.99ut.com/library/turlib/serieslib/12/P_ConvertAnchor_Lg_N.jpg)，在需要修改的方向线末端圆点(这个圆点也称作手柄)处拖动，即可修改方向线的角度和长度。

![](http://www.99ut.com/library/turlib/serieslib/12/12d14.jpg)

也可以使用直接选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorSelect_Lg_N.jpg)，在手柄处按住ALT键不放，拖动方向线。

![](http://www.99ut.com/library/turlib/serieslib/12/12d16.jpg)

如果没有按住或中途松开了ALT键，就会造成如下图的错误。

![](http://www.99ut.com/library/turlib/serieslib/12/12d15.jpg)

另外，在拖动手柄的过程中如果按住SHIFT键，可以锁定方向线为45度角的整数倍，即0、45、90等角度。

以上操作中需要注意的是，如果是通过拖拉方式选择的多个锚点，那么这些锚点的方向线可能都不显示，这时必须在一个锚点上单击以显示出该锚点的方向线。也可以逐个单击所选的锚点，这样它们的方向线都会显示出来。  

另外，如果用直接选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorSelect_Lg_N.jpg)在初始的180度夹角的方向线手柄上拖动，无论拖动哪个手柄，都会同时改变两条方向线，就如同上右图所展示的那样。切记一定要按住ALT不放才可以移动单个手柄。但对于已经不是180度初始夹角的水平线而言，就不必按住ALT键了，直接选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorSelect_Lg_N.jpg)可以直接单独拖动其中一个手柄。

从理论上来说，选择锚点和修改锚点方向线，应该分别使用不同的工具。但我们可以在使用直接选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorSelect_Lg_N.jpg)完成锚点的选择(显示出方向线)后，按住ALT键(方向线为初始的水平夹角时)或直接(方向线非初始水平夹角时)去拖动手柄，完成方向线的修改。这样就免去了切换到转换点工具![](http://www.99ut.com/library/turlib/serieslib/12/P_ConvertAnchor_Lg_N.jpg)的麻烦。

### 接修改方向线

现在我们来学习在绘制锚点后直接修改方向线，过程如下图所示。前面两步并没有什么不同，关键是第三步，在绘制完第二个锚点的方向线之后不要松开鼠标，按住ALT键，此时光标会变为![](http://www.99ut.com/library/turlib/serieslib/12/P_ConvertAnchor_Lg_N.jpg)，现在可以在手柄上按下鼠标拖动(可同时按住SHIFT键锁定角度)，完成修改后松开鼠标再松开相应的快捷键，在下一个锚点的位置继续绘制。

![](http://www.99ut.com/library/turlib/serieslib/12/12d17.jpg)

在使用钢笔工具![](http://www.99ut.com/library/turlib/serieslib/12/P_VectorDraw_Lg_N.jpg)绘制的过程中，按住ALT键可临时切换到转换点工具![](http://www.99ut.com/library/turlib/serieslib/12/P_ConvertAnchor_Lg_N.jpg)。然后利用转换点工具去修改方向线。这样就免去了通过工具栏切换的麻烦。另外，按住CTRL键可临时切换到直接选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorSelect_Lg_N.jpg)，可用来选择锚点，也可以用来修改方向线。

除了之前归纳过的有关修改锚点的技巧之外，现在又多了一个绘制锚点并实时修改的技巧。  

前者偏重于后期修改，称为后期技巧。以直接选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorSelect_Lg_N.jpg)为对象。正常情况下是选择(一个或多个)锚点、移动(一个或多个)锚点、以及改变锚点方向线。当锚点的两条方向线成初始的水平夹角，而只想修改其中一条的时候，可按住ALT键拖动手柄。  

后者偏重于实时修改，称为实时技巧。以钢笔![](http://www.99ut.com/library/turlib/serieslib/12/P_VectorDraw_Lg_N.jpg)为对象，正常情况下是绘制锚点及其方向线。绘制过程中按住ALT将切换到转换点工具![](http://www.99ut.com/library/turlib/serieslib/12/P_ConvertAnchor_Lg_N.jpg)，可更改目前锚点的单独方向线。按住CTRL键将切换到直接选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorSelect_Lg_N.jpg)，可选择及移动(一个或多个)锚点。

在修改锚点方向线的时候，之前无论使用直接选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorSelect_Lg_N.jpg)还是转换点工具![](http://www.99ut.com/library/turlib/serieslib/12/P_ConvertAnchor_Lg_N.jpg)，都是针对锚点的方向线进行修改，这样每次只能修改一条方向线。除此之外，我们还可以直接对片断做出修改。方法是使用直接选择工具![](http://www.99ut.com/library/turlib/serieslib/12/P_AnchorSelect_Lg_N.jpg)，然后在片断上拖动。

拖动片断的时候，与之有关的前后两个锚点的方向线也随之发生改变，但无论往什么方向拖动，仅局限于长度的改变，角度是不会改变的。

![](http://www.99ut.com/library/turlib/serieslib/12/12d18.jpg)

### 封闭路径

现在我们来学习如何绘制一个封闭路径，它在绘制过程中并无特别之处，只是将终点锚点与起点锚点重合在一起，形成头尾相接的封闭形。需要搞清楚的一个概念是，这里所说的“终点锚点与起点锚点重合”，是指一个锚点，而不是两个锚点。如下左图所示，我们一次绘制出锚点1、2、3，然后将鼠标移动到起点锚点上，注意光标变为了![](http://www.99ut.com/library/turlib/serieslib/12/pen_end.jpg)，然后按下鼠标，终点与起点即重合为一个锚点，同时绘制结束。这样锚点1就即是起点又是终点。

![](http://www.99ut.com/library/turlib/serieslib/12/12e07.jpg)

也可以绘制曲线形的封闭路径，方法也相同。

![](http://www.99ut.com/library/turlib/serieslib/12/12e08.jpg)

按下鼠标闭合路径的同时，可以拖动改变两条方向线的角度，如果先按住ALT键再按下鼠标，则可以只对一条方向线作出修改。但对于起点时候的方向线，只能改变角度不能改变长度。

### 绘制心形

![](http://www.99ut.com/library/turlib/serieslib/12/12e11.jpg)-![](http://www.99ut.com/library/turlib/serieslib/12/12e12.jpg)

其中最关键的一步，就是封闭路径时要先按住ALT再点击起点锚点。

### 实战矢量制作

See [<#12_实战矢量制作>Photoshop](http://www.99ut.com/text/photoshop/basic/12/pss12_10.html)