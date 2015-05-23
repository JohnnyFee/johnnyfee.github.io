layout: post
title: "PhotoShop 字体工具"
category: PhotoShop
tags: [ps]
---
## 文本工具

文本工具共有4个，分别是横排文字![](http://www.99ut.com/library/turlib/serieslib/10/P_TypeHoriz_Lg_N.jpg)、直排文字![](http://www.99ut.com/library/turlib/serieslib/10/P_TypeVert_Lg_N.jpg)、横排文字蒙版![](http://www.99ut.com/library/turlib/serieslib/10/P_TypeHorizMask_Lg_N.jpg)、直排文字蒙版![](http://www.99ut.com/library/turlib/serieslib/10/P_TypeVertMask_Lg_N.jpg)。

择横排文字工具〖T/SHIFT_T〗，回车键可换行。若要结束输入可按〖CTRL_回车〗或点击公共栏的提交按钮![](http://www.99ut.com/library/turlib/serieslib/10/P_Accept_Md_N.jpg)。

Photoshop将文字以独立图层的形式存放，输入文字后将会自动建立一个文字图层。

![](http://www.99ut.com/library/turlib/serieslib/10/10_a01.jpg)

文字工具的公共栏如下图所示：

![](http://www.99ut.com/library/turlib/serieslib/10/10_a04.jpg)

Photoshop使用操作系统带有的字体，因此对操作系统字库的增减会影响Photoshop能够使用到的字体。需要注意的是如果选择英文字体，可能无法正确显示中文。因此输入中文时应使用中文字体。

Photoshop首选项的“文字”项目〖CTRL_K，CTRL_9〗：

![](http://www.99ut.com/library/turlib/serieslib/10/10_aa1.jpg)

抗锯齿选项![](http://www.99ut.com/library/turlib/serieslib/10/P_TextAntiAlias_Md_N.jpg)控制字体边缘是否带有羽化效果。一般如果字号较大的话应开启该选项以得到光滑的边缘，这样文字看起来较为柔和。但对于较小的字号来说开启抗锯齿可能造成阅读困难的情况。

![](http://www.99ut.com/library/turlib/serieslib/10/10_a08.jpg)

这是因为较小的字本身的笔画就较细，在较细的部位羽化就容易丢失细节，此时关闭抗锯齿选项反而有利于清晰地显示文字。

在更改文字颜色时，如果通过点击颜色缩览图通过拾色器来选取颜色，则效率很低，特别是要更改大量的独立字符时非常麻烦。在选择文字后通过颜色调板〖F6〗来选取颜色则速度较快。如果某种颜色需要反复使用，可以将其添加到色板调板中(拾取前景色后，点击色板调板下方的新建按钮)。

变形功能可以令文字产生变形效果，可以选择变形的样式及设置相应的参数。如果要制作多种文字变形混合的效果，可以通过将文字分次输入到不同文字层，然后分别设定变形的方法来实现。

![](http://www.99ut.com/library/turlib/serieslib/10/10_a12.jpg) ![](http://www.99ut.com/library/turlib/serieslib/10/10_a13.jpg)

文字层是一种特殊的图层，我们不能通过传统的选取工具来选择某些文字，转换为普通图层后可以，也称为栅格化图层，但不能再更改文字内容。

## 字符调板

【窗口_字符】显示字符调板，可以对文字设定更多的选项。在实际使用中也很少直接在公共栏中更改选项，大多数都是通过字符调板完成对文字的调整的。

![](http://www.99ut.com/library/turlib/serieslib/10/10_a14.jpg)

行间距控制文字行之间的距离，若设为自动，间距将会跟随字号的改变而改变，若为固定的数值时则不会。因此如果手动指定了行间距，在更改字号后一般也要再次指定行间距。

竖向缩放相当于将字体变高或变矮，横向缩放相当于变胖和变瘦，数值小于100%为缩小，大于100%为放大。如下右图中3个字分别为标准、竖向50%、横向50%的效果。

在字符调板中有比例间距和字符间距，它们的作用都是更改字符与字符之间的距离，但在原理和效果上却不相同。

我们看到整个文字的宽度是由字符本身的字宽与字符之间的距离构成的。这两者都是在制作字体的时候就定义好的。有的字符本身较窄，但其左右的字距也较大，这样做是为了保证每个字符占用的宽度一致。否则，较窄的字符就只能占用较小的宽度。但这种设计却也造成了字符之间疏密不同。如下图中的mp之间与pl之间的疏密就不同。这种情况一般出现在使用中文字库输入字母的时候，Windows系统自带的黑体、宋体、楷体字体都存在这种现象。因此输入英文时应避免使用这些字体。

字宽与字距间的比例将随着字号的大小相应改变，也就是说，对于同一个字体来说，字号越大，字符之间的距离也越大。反而反之。  

那么，字符间距选项![](http://www.99ut.com/library/turlib/serieslib/10/P_TextTracking_Md_N.jpg)的作用相当于对所有字距增加或减少一个相同的数量。可手动输入数值。如下图中将字符间距减去100，所有的字符间距都减去100，字符就互相靠拢了。但是这样做并没有改变疏密不同的情况，尽管mp已经是互相紧靠着密不透风，但pl还是有很大的距离。当然，如果继续减少字符间距也可以最终令pl之间也“密不透风”(设为-300左右)，但mp之间却会产生重叠的效果了。

我们可以用一个简单的算式来理解：假设mp原来的距离为100，pl之间的距离为300，当字符宽度设置为-100的时候，mp之间的距离为0，pl之间的距离还有200。要令pl之间的距离为0，字符宽度必须设置为-300，但同时mp的距离必须为-200，所以mp产生了重叠的现象。  

比例间距选项![](http://www.99ut.com/library/turlib/serieslib/10/P_AsianTextTsume_Md_N.jpg)的作用是同比例地减少(注意，只能是减少而不能增大)字符的间距。按照上一个算式中的前提来假设计算的话就是：当比例间距设为50%，相当于所有字符间距减半(mp间距为50，pl间距为150)，当设为33%的时候，所有字符间距缩减去三分之一(mp间距约为30，pl间距为100)，当设为100%的时候，所有字符的间距就都被降为0了。因此我们看到的效果是所有字符都彼此依靠(抗锯齿选项及字体形式的不同可能带来微小差异)。

![](http://www.99ut.com/library/turlib/serieslib/10/10_a17.jpg)

间距微调选项![](http://www.99ut.com/library/turlib/serieslib/10/P_TextKerning_Md_N.jpg)是用来调整两个字符之间的距离，使用方法与字符间距选项![](http://www.99ut.com/library/turlib/serieslib/10/P_TextTracking_Md_N.jpg)相同。但其只能针对某两个字符之间的距离有效。因此只有当文本输入光标置于字符之间时，这个选项才能使用。

竖向偏移(也称基线偏移)![](http://www.99ut.com/library/turlib/serieslib/10/P_TextBaselineShift_Md_N.jpg)的作用是将字符上下调整，常用来制作上标和下标。正数为上升，负数为下降。一般来说作为上下标的字符应使用较小的字号。如下图。

![](http://www.99ut.com/library/turlib/serieslib/10/10_a18.jpg)

强迫形式的名称是我们为了与文字形式相区别而起的，它的作用也和文字形式一样是将字体作加粗、加斜等效果，但选项更多。即使字体本身不支持改变形式，在这里也可以强迫指定。它与字体形式可以同时使用，效果加倍(更斜、更粗)。其中的全部大写字母选项的作用是将文本中的所有小写字母都转换为大写字母。而小型大写字母选项的作用也是将所有小写字母转为大写，但转换后的大写字母将参照原有小写字母的大小。

上标![](http://www.99ut.com/library/turlib/serieslib/10/P_TextSuperscript_Md_N.jpg)与下标![](http://www.99ut.com/library/turlib/serieslib/10/P_TextSubscript_Md_N.jpg)选项的作用与竖向偏移类似，就是增加了可同时缩小字号的功能。下划线选项![](http://www.99ut.com/library/turlib/serieslib/10/P_TextUnderline_Md_N.jpg)与删除线选项![](http://www.99ut.com/library/turlib/serieslib/10/P_TextStrikeThrough_Md_N.jpg)的作用是在字体下方及中部产生一条横线。

![](http://www.99ut.com/library/turlib/serieslib/10/10_a19.jpg)

## 区域文字排版

就如同使用矩形选框工具一样，用文本工具在图像中拖拉出一个输入框，然后输入文字。这样文字在输入框的边缘将自动换行，如下左图。这样排版的文字也称为文字块。

![](http://www.99ut.com/library/turlib/serieslib/10/10_a22.jpg)

可以通过【图层_文字_转换为段落文本】命令将行式文本变为框式文本。

在上面所说的调整文字输入框的时候，只会更改文字显示区域而不会影响文字的大小。如果在调整的时候按住〖CTRL〗就可类似自由变换〖CTRL_T〗那样对文字的大小和形态加以修改。按住〖CTRL〗后拖拉下方的控制点可产生压扁效果。对其他控制点如此操作可以产生倾斜的效果。

![](http://www.99ut.com/library/turlib/serieslib/10/10_a23.jpg)

中文对于行首和行尾可以使用的标点是有限制的，称作避头尾。以下就常用标点的限制作一个说明：

- 行首不允许：逗号、句号、感叹号、问号、分号、冒号、省略号、后引号、后书名号、后括号。  
- 行尾不允许：前引号、前书名号、前括号。  

在输入过程中刻意去遵照这些规定是很难的。我们可以通过段落调板【窗口_段落】令已输入的文字遵照避头尾法则。如下左图是段落调板，右图是应用了避头尾法则前后的对比，注意红色箭头所指处的变化。

![](http://www.99ut.com/library/turlib/serieslib/10/10_a26.jpg)-![](http://www.99ut.com/library/turlib/serieslib/10/10_a25.jpg)

在公共栏见过的3种对齐方式(居左对齐![](http://www.99ut.com/library/turlib/serieslib/10/P_TextAlignLeft_Md_N.jpg)、居中对齐![](http://www.99ut.com/library/turlib/serieslib/10/P_TextAlignCenter_Md_N.jpg)、居右对齐![](http://www.99ut.com/library/turlib/serieslib/10/P_TextAlignRight_Md_N.jpg))，还有4种新的对齐方式(末行居左![](http://www.99ut.com/library/turlib/serieslib/10/P_TextJustLeft_Md_N.jpg)、末行居中![](http://www.99ut.com/library/turlib/serieslib/10/P_TextJustCenter_Md_N.jpg)、末行居右![](http://www.99ut.com/library/turlib/serieslib/10/P_TextJustRight_Md_N.jpg)、全部对齐![](http://www.99ut.com/library/turlib/serieslib/10/P_TextJustAll_Md_N.jpg))，注意这4种对齐方式只针对由框式文本输入的段落文字才有效。

居左对齐![](http://www.99ut.com/library/turlib/serieslib/10/P_TextAlignLeft_Md_N.jpg)以文字宽度为参照物。而末行居左![](http://www.99ut.com/library/turlib/serieslib/10/P_TextJustLeft_Md_N.jpg)以文本输入框的宽度作为参照物，这样就保证了文字充满整个输入框。其余两种居中和两种居右的区别也在于此。最后一个比较独特的是全部对齐![](http://www.99ut.com/library/turlib/serieslib/10/P_TextJustAll_Md_N.jpg)，它令文字中每一行都充满输入框。这样可以令字数不同的多行文字左右边界相齐(无论字号大小)。

![](http://www.99ut.com/library/turlib/serieslib/10/10_a28.jpg)

横排文字蒙版![](http://www.99ut.com/library/turlib/serieslib/10/P_TypeHorizMask_Lg_N.jpg)和直排文字蒙版![](http://www.99ut.com/library/turlib/serieslib/10/P_TypeVertMask_Lg_N.jpg)并不产生文字本身，而只是产生与文字形状相同的选区。不能修改排版。其实通过普通的文字层也可以产生选区〖CTRL_单击图层缩略图〗，因此使用的机会并不多。

## 使用OpenType字体

在Windows系统中，字体文件都保存在系统目录下的fonts子目录中，如果想要使用更多的字体，就要将字体文件(文件本身或快捷方式)拷贝到这个目录中。Windows3.1时代开始使用一种称之为TrueType的字体格式，这就是一种基于矢量制作的字体。

除了TrueType之外，常见的还有PostScript、OpenType字体标准。其中TrueType主要应用在屏幕显示及普通打印上，是最常见的。PostScript是由Adobe开发的用作印刷的精细字体标准，但与应用程序的兼容性稍差。而OpenType兼备TrueType与PostScript的优点。并提供一些新特征，如连笔字、分数字等。可以为文字排版添加新的效果。

在字符调板的字体列表中，位于字体名称左方的如果是![](http://www.99ut.com/library/turlib/serieslib/10/font-opentype.jpg)图标，则表示这是一个OpenType字体。如果是![](http://www.99ut.com/library/turlib/serieslib/10/font-truetype.jpg)图标则表示是TrueType字体。确保所选择的是OpenType字体。

![](http://www.99ut.com/library/turlib/serieslib/10/10e01.jpg)

点击字符调板右上角的圆三角按钮，观察在出现的菜单中OpenType选项(下右图绿色箭头处)是否可用。有些OpenType字体并没有提供特殊特征，那么OpenType选项就不可用。

![](http://www.99ut.com/library/turlib/serieslib/10/10e02.jpg)

OpenType的特殊特征为：标准连字、上下文替代字、自由连字、花饰边、旧样式、替代文字、标题替代字、花饰字、序数字、分数字。此外还有一些专门应用于亚洲语言的特征。不同的OpenType字体提供的可用特征种类也不相同，某些特征可能不可用。

下面我们使用“Adobe Garamond Pro”字体对其中一些常用的特征进行演示。可以看到标准连字是将相邻字母笔画互相融合；自由连字是将相邻字母笔画互相衔接；旧样式将数字错落有致地排列；替代样式改变了字母的外形；序数字将st、nd、rd、th这些英文序数词后缀上移并缩小；分数字将分子和分母排列的更加紧密。

![](http://www.99ut.com/library/turlib/serieslib/10/10e03.jpg)-![](http://www.99ut.com/library/turlib/serieslib/10/10e04.jpg)-![](http://www.99ut.com/library/turlib/serieslib/10/10e05.jpg)

![](http://www.99ut.com/library/turlib/serieslib/10/10e06.jpg)-![](http://www.99ut.com/library/turlib/serieslib/10/10e07.jpg)-![](http://www.99ut.com/library/turlib/serieslib/10/10e08.jpg)

各个特征都有应用的前提条件。如标准连字和自由连字，并非所有相邻的字母都能产生连字效果。某些特征只能应用于字母或只能应用于数字。某些特征又只能改变部分字母或数字的外观。而某些特征与其他特征之间有冲突(如分数字和序数字)。具体的情况还是要看字体文件本身所包含的特征信息量而定。

由上面的例子我们可以看出OpenType具有很大的优势，越来越多的字体都采用这个标准，中文字体也不例外。不过目前而言，大部分具有应用特征的OpenType字体都是英文，中文字体虽然也有OpenType标准，但极少具有能应用OpenType特殊特征的中文字体，即使有也大都只能对字母或数字有效，对于汉字却并无效果。

## 路径文字排版

See [<#10_路径文字排版>Photoshop](http://www.99ut.com/text/photoshop/basic/10/pss10_04.html)