layout: post
title: "PhotoShop 滤镜"
category: PhotoShop
tags: [ps]
---

See [《赵鹏 - 大师之路 Photoshop 基础教程》](http://www.99ut.com/text/photoshop/basic/index.html)

## 滤镜

所谓滤镜就是允许其他人利用Photoshop的图像处理内核来快速制作指定的效果。滤镜属于一种外部插件，所谓插件(Plug-ins)就是针对软件的某项功能扩展。

滤镜都集中在【滤镜】菜单中，分门别类地存放。现在我们对下左图使用【滤镜_模糊_高斯模糊】。

<!-- more -->

![](http://www.99ut.com/library/turlib/serieslib/14/14a01.jpg) ![](http://www.99ut.com/library/turlib/serieslib/14/14a02.jpg)

- 设置框中提供了效果预览窗口，可以在红色箭头处按下并拖动鼠标，查看窗口以外的图像区域。
- 可以在绿色箭头处缩小预览图的显示比例。在数值区域可直接填入数值或拉动下方的滑杆。比
- 用鼠标滚轮上下滚动来改变数值(并非适用于所有情况)，按住SHIFT键可加速滚动。使用滚轮时光标要处在数值区中才有效。

通过【滤镜_滤镜库】启动滤镜库。

![](http://www.99ut.com/library/turlib/serieslib/14/14a03.jpg)

左方是预览区，中间是滤镜列表，右方是相应滤镜项的设置区。我们先选择“艺术效果_木刻”，然后点击红色箭头处的![](http://www.99ut.com/library/turlib/serieslib/14/P_New_Wi_N.jpg)按钮新建滤镜项，选择“艺术效果_胶片颗粒”。这样就可以看到两个滤镜共同作用的效果了。选择相应的滤镜项后可以更改其设定。

并非所有的滤镜都包含在滤镜库中。比如模糊类的滤镜就没有在其中，需要从滤镜菜单中调用。

将图层先〖CTRL_J〗复制，再对其使用【滤镜_素描_绘图笔】(可以通过〖CTRL_F〗重做上一次的滤镜)，然后为这个图层建立一个渐变蒙版，这样就得到了一半原图一半滤镜的效果。

![](http://www.99ut.com/library/turlib/serieslib/14/14a05.jpg)-![](http://www.99ut.com/library/turlib/serieslib/14/14a06.jpg)

类似的手法可以变换多样，如下图是使用了【滤镜_模糊_径向模糊】(设定如下中图)，然后对蒙版使用径向渐变的效果。

![](http://www.99ut.com/library/turlib/serieslib/14/14a07.jpg) ![](http://www.99ut.com/library/turlib/serieslib/14/14a09.jpg) 

下图是使用了【滤镜_素描_半调图案】，然后在蒙版中使用画笔涂抹的效果。

![](http://www.99ut.com/library/turlib/serieslib/14/14a08.jpg)

## 抽出滤镜

在合成图像的制作中，经常需要将物体与背景分离，如果物体与背景的边界分明则分离的操作较为容易。但如果物体的边缘复杂，尤其是动物毛发这样的情况时，传统的方法就很难使用。我们学习过使用复制并修改通道，然后将其转为选区后建立蒙版这个方法。它虽然可以分离出非常复杂的物体，但也有限制，因为其中有一步是要用画笔涂抹Alpha通道以完善选区。

Photoshop提供了一个专门用于此类用途的工具，虽然位于滤镜菜单，却更像是一个功能扩展模块。【滤镜_抽出】启动后的界面如下左图，使用红色箭头处的画笔绘制小狗的边缘，笔迹应覆盖小狗和背景的边界，并且必须头尾相接形成封闭区域。同时画笔应尽可能小。可〖空格_CTRL_单击〗放大图像后用小画笔仔细涂抹。

![](http://www.99ut.com/library/turlib/serieslib/14/14b04.jpg)

在完成封闭区域后，使用下图绿色箭头处的油漆桶工具点击区域内部，会看到小狗部分都被填充。

![](http://www.99ut.com/library/turlib/serieslib/14/14b05.jpg)

现在按下确定按钮，小狗就会被从背景中分离出来，原先的背景将被删除成为透明区域。我们可以在下方在建立一个黑色填充层，看一看抽出的效果如何，下左图是抽出前后的对比，可以看出效果还是令人满意的，尽管并不完美，但比起通过其他手段作出的效果要好很多了。

在抽出滤镜中，完成边界绘制后，我们使用油漆桶对需要小狗进行了填充。如果我们填充的是背景，则将是保留背景除去小狗。因此记住油漆桶的作用是确定保留区域。如果画笔绘制时没有封闭区域，则填充的颜色就会充满整个图像。

![](http://www.99ut.com/library/turlib/serieslib/14/14b06.jpg)

注意之前的边界绘制其实是不完善的，因为小狗腿间的空隙没有顾及到，应该如下右图那样将这部分也绘制成一个封闭区域才可以，之后依然用油漆桶点击小狗的身体部分即可。

![](http://www.99ut.com/library/turlib/serieslib/14/14b07.jpg)

在完成绘制并填充后，点击“预览”按钮就可以直接看到抽出后的效果。如下图绿色箭头处的预览选项中可以选择预览背景的颜色。

![](http://www.99ut.com/library/turlib/serieslib/14/14b08.jpg)

如果要修改设定，可在红的箭头处选择“原稿”，并开启“显示高光”选项，图像会还原并显示出绘制的边界，此时使用画笔修改即可。开启“智能高光显示”选项后，画笔大小会根据边界的情况自动调整。

![](http://www.99ut.com/library/turlib/serieslib/14/14b09.jpg)

相当于以前我们所学过的动态画笔设定中的动态直径一样，而此时画笔大小的设定就相当于搜索范围，系统在这个范围内查找边界并判断宽度。所以画笔大小也不能设置的太大，否则容易引起误判。一般以目视边界宽度3~4倍为佳。遇到夹角很小的连续边界(如Z字形边界)时应视情缩小。

如果在预览效果中边界有较明显的毛刺感，可尝试增加平滑度，如下右图是两种平滑度的对比。

![](http://www.99ut.com/library/turlib/serieslib/14/14b10.jpg)

可以看出增加平滑度后边缘的判定有所改变，一些原先看不到的部分出现了。但注意耳朵的上边缘，平滑度0的效果要比平滑度100好。实际上修改平滑度能改变的范围很有限，且也可能同时造成部分边界的质量下降。因此应将其保持为0或使用较低的平滑度。遇到不满意的边界时应使橡皮工具擦除后重新绘制。

我们提到过画笔大小应能覆盖物体边缘，如果有毛发也应该覆盖毛发，但这只能针对类似小狗的“短毛”有效，如下左图中小猫的胡子超出其身体很多，如果也要完全覆盖则要使用很大的画笔，那不切合实际。遇到这种“长毛”的情况时，遵循以下原则：先绘制主体部分并填充，之后单独按照“长毛”的走向使用画笔绘制，画笔大小控制在毛发宽度的2~3倍左右。

![](http://www.99ut.com/library/turlib/serieslib/14/14b11.jpg) ![](http://www.99ut.com/library/turlib/serieslib/14/14b12.jpg) ![](http://www.99ut.com/library/turlib/serieslib/14/14b13.jpg)

See more [<#14_使用抽出滤镜>文字教程](http://www.99ut.com/text/photoshop/basic/14/pss14_02.html)。

## 液化滤镜

液化其实与抽出同属于一种功能扩展，估计是没有其他地方可以存放，因此放置在了滤镜菜单中。液化的作用是扭曲图像，它的雏形就是我们学习过的涂抹工具![](http://www.99ut.com/library/turlib/serieslib/14/P_Smudge_Lg_N.jpg)，依据鼠标的移动轨迹来改变图像内容。属于一种“涂鸦”工具，经常被用来恶作剧，比如将某个人物的面部进行各种搞怪处理等。下图中演示了5种液化工具的效果。

- 向前变形![](http://www.99ut.com/library/turlib/serieslib/14/P_Warp_Lg_N.jpg)工具〖W〗就和普通的涂抹工具类似，将图像沿着鼠标行进的方向拉伸。作用范围以画笔大小为准。  

- 顺指针旋转扭曲工具![](http://www.99ut.com/library/turlib/serieslib/14/P_TwirlCW_Lg_N.jpg)〖C〗是将图像呈S形扭曲，按住ALT键切换为逆时针方向。作用范围以画笔大小为准。在一点上持续按住鼠标将加倍效果。  

- 褶皱工具![](http://www.99ut.com/library/turlib/serieslib/14/P_Pucker_Lg_N.jpg)〖S〗将图像从边缘向中心挤压，通俗地说就是缩小。作用范围以画笔大小为准。  

- 膨胀工具![](http://www.99ut.com/library/turlib/serieslib/14/P_Bloat_Lg_N.jpg)〖B〗与褶皱相反，将图像从中心向四周扩展，通俗地说就是放大。作用范围以画笔大小为准。  

- 左推工具![](http://www.99ut.com/library/turlib/serieslib/14/P_ShiftPixels_Lg_N.jpg)〖O〗是将一侧的图像向另一侧移动，也就是将画笔范围内的一侧推向另一侧。鼠标移动的方向决定推移的方向。鼠标从上往下移动时图像从左往右推，鼠标从左往右移动时图像从下往上推。

![](http://www.99ut.com/library/turlib/serieslib/14/14c01.jpg)

镜像工具![](http://www.99ut.com/library/turlib/serieslib/14/P_Reflect_Lg_N.jpg)〖M〗在使用上比较有意思，它是将镜像平面一侧的图像复制到另一侧并互为颠倒。如下图中的红色直线就是镜像平面，而镜像面的形成是画笔在移动过程中边缘的切点形成的。如下图中红色箭头处的红点就是切点之一，在画笔从左向右移动的过程中，该点的轨迹就形成了镜像面。如果是其他的移动方向则分别以另外三个切点的轨迹为镜像平面。  

![](http://www.99ut.com/library/turlib/serieslib/14/14c02.jpg)

湍流工具![](http://www.99ut.com/library/turlib/serieslib/14/P_Turbulence_Lg_N.jpg)〖T〗令图像产生波浪形，在一点上持续按住鼠标将加倍效果。其实按照中文语法习惯，它才应该被称作是褶皱工具。

![](http://www.99ut.com/library/turlib/serieslib/14/14c03.jpg)

如果希望有些区域不受液化工具作用的影响，可使用冻结蒙版工具![](http://www.99ut.com/library/turlib/serieslib/14/P_Freeze_Lg_N.jpg)〖F〗将其保护起来。解冻蒙版工具![](http://www.99ut.com/library/turlib/serieslib/14/P_Thaw_Lg_N.jpg)〖D〗的作用则是解除前者的保护。这两个工具其实和我们以前所学习的图层蒙版没有任何联系。因为英文名称都是MASK，所以在这里也被翻译成了蒙版。

此外还可以通过下中图所示的选项载入存储的Alpha通道并与当前的蒙版运算，如加上、减去、交叉等。还可以通过下方的3个按钮控制蒙版。其作用就同其字面含义一样。

![](http://www.99ut.com/library/turlib/serieslib/14/14c05.jpg)

重建工具![](http://www.99ut.com/library/turlib/serieslib/14/P_Reconstruct_Lg_N.jpg)〖R〗是撤销各个液化工具的效果。持续按下可加倍效果。可以从下左图的模式中选择不同的重建模式。

![](http://www.99ut.com/library/turlib/serieslib/14/14c07.jpg)

如果按下“恢复全部”则会撤销所有操作，这相当于按住ALT键后点击右上角的“取消”按钮。按下“重建”可逐渐撤销。

![](http://www.99ut.com/library/turlib/serieslib/14/14c08.jpg)

液化工具并没有多少技术难点，主要要注意下图中的工具选项：

![](http://www.99ut.com/library/turlib/serieslib/14/14c06.jpg)

- 画笔密度相当于软硬度，较大的密度会形成较锐利的画笔边缘，较小的密度则可以形成模糊的画笔边缘。对每个工具都有效。一般使用50左右的密度。锐利的画笔在效果上不是很好。
- 画笔速率是指当鼠标在某一点上持续按下时效果的加倍速度，对有持续性特点的工具有效；
- 湍流抖动只对湍流工具有效，控制其波浪化的程度；重建模式只对重建工具有效。
- 比较特别的是画笔压力，相当于不透明度，默认为100，如果下降压力则会降低液化工具的使用效果。如果设为1的话则几乎看不到效果。如果不希望液化工具造成太剧烈的效果可更改此设置。但要注意一点，它也是对每个工具都有效的，这其中也包括冻结工具，这就意味着使用冻结工具保护起来的区域，也许还是会被液化工具所改变。因此在使用冻结工具的时候应该将其设置为100。另外由于画笔密度的设定会造成边缘部分的模糊，而这个模糊实际上就等同于压力的降低，所以就算是压力100的冻结区域，其边缘部分也还是有可能被更改的。

See more [<#14_用液化滤镜制作作品>文字教程](http://www.99ut.com/text/photoshop/basic/14/pss14_04.html)

## 消失点滤镜

在现实世界里存在着近大远小的透视现象，即使两棵树完全一样大，但距离我们较近的树看起来会比较大，远处的则看上去相对要小。我们曾经学习使用橡皮图章工具![](http://www.99ut.com/library/turlib/serieslib/14/P_Clone_Lg_N.jpg)对图像进行修补，其原理就是将一处的像素原样复制到另外一处。这在处理具有透视效果的图像时就会遇到麻烦，如下图建筑物墙面上的几个窗户就有着近大远小的透视感，现在想要将其中一个窗户去除，可以想到的办法就是用墙面上的花纹去覆盖窗户区域，但仔细看墙面并非单一色，上面的花纹也是带着透视效果的。在这种情况下，直接使用橡皮图像工具就很容易留下修改的痕迹。

这种情况下可使用消失点滤镜来完成，下图即是消失点滤镜色设置框，在进入设置框后，默认将使用创建平面工具![](http://www.99ut.com/library/turlib/serieslib/14/P_CreateSurface_Lg_N.jpg)〖C〗，该工具用来决定透视的方式，用该工具在下图4个红色箭头处依次点击，就创建出了透视平面。创建透视平面是必须的操作，否则其他功能都无法使用。

![](http://www.99ut.com/library/turlib/serieslib/14/14d01.jpg)

之后就可以使用图章工具![](http://www.99ut.com/library/turlib/serieslib/14/P_Clone_Lg_N.jpg)〖S〗。

![](http://www.99ut.com/library/turlib/serieslib/14/14d02.jpg)

在某处按下ALT键单击确定采样点，然后在目标区域按下鼠标并拖动，完成像素的复制。完成后的效果如下右图，有两个窗户被我们用墙面的花纹覆盖了。使用过程中要注意将“对齐”选项关闭，这样每次在新位置按下鼠标时，都是以采样点的原始位置为准。如果该选项开启，那么在不同位置复制时采样点的位置也会相应移动。如果要复制一系列的图像时，比如要将所有一排窗户复制到其他地方，可以开启该选项。

![](http://www.99ut.com/library/turlib/serieslib/14/14d03.jpg)

还可以使用选框工具![](http://www.99ut.com/library/turlib/serieslib/14/P_RectSelect_Lg_N.jpg)〖M〗来复制一片区域。

![](http://www.99ut.com/library/turlib/serieslib/14/14d04.jpg)

将需要更改的地方创建选区，然后按住CTRL(或将移动模式改为“源”)在图像中拖动，鼠标所到位置的图像将会被复制到选区中，到满意位置时松手既可。之后还可以使用变换工具![](http://www.99ut.com/library/turlib/serieslib/14/P_Transform_Lg_N.jpg)〖T〗对选区内复制过来的图像进行变换。

![](http://www.99ut.com/library/turlib/serieslib/14/14d05.jpg)

消失点滤镜的主导思想是通过透视平面来模拟近大远小的效果，因此最初的创建平面就很重要，要分析图像结构以决定如何创建平面，我们这里采用的是与建筑物外墙吻合的方法，算是比较简单的了，有的图像并没有直接可供我们参考的区域，但可通过分析找到，如下图，可以认为路旁的树高度一致，于是以此创建透视平面。

如果使用图章工具进行复制，则要注意直径、硬度、不透明度和修复的设定，太大的直径容易将不需要的部分也复制出来。此外还可以使用画笔工具![](http://www.99ut.com/library/turlib/serieslib/14/P_Brush_Lg_N.jpg)〖B〗涂抹单一颜色。在使用过程中放大图像之类的快捷键就不必再说了，可用〖CTRL_ALT_Z〗逐步撤销或〖CTRL_SHIFT_Z〗逐步还原，这只单独针对消失点滤镜内部有效。在Photoshop的历史记录中仍将整个消失点滤镜效果算作一步操作。

![](http://www.99ut.com/library/turlib/serieslib/14/14d06.jpg)

## 用渐变映射调整色彩

See [<#14_用渐变映射调整色彩>文字教程](http://www.99ut.com/text/photoshop/basic/14/pss14_06.html)。

