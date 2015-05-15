layout: post
title: "PhotoShop"
category: PhotoShop
tags: [ps]
---

## Tutorial

- [Designer's guide to DPI](http://sebastien-gabriel.com/designers-guide-to-dpi/home)
- [Photoshop CC 2014最新版软件下载及安装破解教程（含苹果MAC跟win64位&32位） – 三人行PS学堂](http://www.ren3.cn/14573.htm)
- <http://www.99ut.com/text/photoshop/basic/01/pss01_02.html>

## 颜色模式

### RGB 颜色模式

Photoshop RGB 颜色模式使用 RGB 模型，并为每个像素分配一个强度值。在 8 位/通道的图像中，彩色图像中的每个 RGB（红色、绿色、蓝色）分量的强度值为 0（黑色）到 255（白色）。

在 8 位/通道的图像中，这三个通道将每个像素转换为 24（8 位 x 3 通道）位颜色信息，称为 24 位色。

例如，亮红色使用 R 值 246、G 值 20 和 B 值 50。当所有这 3 个分量的值相等时，结果是中性灰度级。当所有分量的值均为 255 时，结果是纯白色；当这些值都为 0 时，结果是纯黑色。

对于单独的R或G或B而言，当数值为0的时候，代表这个颜色不发光；如果为255，则该颜色为最高亮度。这就好像调光台灯一样，数字0就等于把灯关了，数字255就等于把调光旋钮开到最大。纯黑，是因为屏幕上没有任何色光存在。相当于RGB三种色光都没有发光。所以屏幕上黑的RGB值是0,0,0。而白正相反，是RGB三种色光都发到最强的亮度，所以纯白的RGB值就是255,255,255。同理，最绿色就是0,255,0；而最蓝色就是0,0,255。

新建的 Photoshop 图像的默认模式为 RGB，计算机显示器使用 RGB 模型显示颜色。这意味着在使用非 RGB 颜色模式（如 CMYK）时，Photoshop 会将 CMYK 图像转换为 RGB，以便在屏幕上显示。

尽管 RGB 是标准颜色模型，但是所表示的实际颜色范围仍因应用程序或显示设备而异。Photoshop 中的 RGB 颜色模式会根据您在“颜色设置”对话框中指定的工作空间设置而不同。

调出颜色调板〖F6〗。色彩的色相谱如下左图：

![](http://www.99ut.com/library/turlib/serieslib/01/ps1_12.jpg) ![](http://www.99ut.com/library/turlib/serieslib/01/ps1_13.jpg)

在上图中间是白色，可以看出，如要得到最黄色，就需要把选色框向最黄色的方向移动，同时也逐渐远离最蓝色。当达到圆环黄色部分的边缘时，就是最黄色，同时我们离最蓝色也就最远了。由此得出，黄色＝白色－蓝色”。为什么不是白色＋黄色呢？因为蓝色是原色光，要以原色光的调整为准。因此，最黄色的数值是255,255,0。也可以得出：纯黄色＝纯红色＋纯绿色 。

三原色光各自的反转色。红色对青色、绿色对洋红色、蓝色对黄色。

一般来说通道调板和图层调板是拼接在一起的，可以通过调出图层调板〖F7〗后切换到通道。也可以使用菜单【窗口 通道】。

我们看到的通道调板类似下图。

![](http://www.99ut.com/library/turlib/serieslib/01/ps1_21.jpg)

此时注意红色绿色蓝色三个通道的缩览图都是以灰度显示的。如果我们点击通道名字，就会发现图像也同时变为了灰度图像。快捷键分别是：〖CTRL ~〗〖CTRL 1〗〖CTRL 2〗〖CTRL 3〗。

最顶部的RGB不是一个通道，而是代表三个通道的总合效果。如果关闭了红色绿色蓝色中任何一个，最顶部的RGB也会被关闭。点击了RGB后，所有通道都将处在显示状态。

如果关闭了红色通道，那么图像就偏青色。如下左图。如果关闭了绿色通道，那么图像就偏洋红色。如下中图。如果关闭了蓝色通道，那么图像就偏黄色。

下面再次列出RGB3个通道的灰度图。

![](http://www.99ut.com/library/turlib/serieslib/01/ps1_25.jpg) ![](http://www.99ut.com/library/turlib/serieslib/01/ps1_26.jpg) ![](http://www.99ut.com/library/turlib/serieslib/01/ps1_27.jpg)

我们从中可以分析出：

1.  三个通道中帽子部分都是白。代表这个地方的RGB都有最高亮度，那么可以判断出这个地方是白色(或较白)。
2.  三个通道中坐垫下的挂包中部都是黑色，那么这个地方RGB都不发光，可以判定这个地方是黑色的(或较黑)。
3.  R通道中的前轮圈是白色，G和B通道中为黑色，说明这个地方只有红色，没有绿色和蓝色，那么这个地方应该是红色(或较红色)。
4.  三个通道中后轮胎都是差不多的灰度，说明这个地方RGB值较为接近，那么这个地方应该是灰色(或接近灰色)。

现在我们要增加几条内容后重新记忆概念：

1.  通道中的纯白，代表了该色光在此处为最高亮度，亮度级别是255。
2.  通道中的纯黑，代表了该色光在此处完全不发光，亮度级别是0。
3.  介于纯黑纯白之间的灰度，代表了不同的发光程度，亮度级别介于1至254之间。
4.  灰度中越偏白的部分，表示色光亮度值越高，越偏黑的部分则表示亮度值越低。

色彩平衡工具用来作色彩调整，快捷键〖CTRL B〗，菜单【图像 调整 色彩平衡】。因为直接调整通道不方便，效果也不直观，比如我们增亮绿色通道的时候看到的只是灰度图，无法准确判断最终的调整效果。如果要看效果必须确认操作后切换回RGB观看，如果不满意还要重复操作步骤。较为不便。而色彩平衡工具在你拉动滑块的时候，就能够实时地把最终效果显示出来，让我们可以准确的感受从而判断。因此那些各种各样的调整工具是为了让我们使用起来更加方便和快速。

### CMYK 颜色模式

印刷品与网页的区别在于色彩模式不同，印刷品必须是CMYK色彩模式，而网页主要使用RGB色彩模式。Photoshop的色彩管理功能主要是针对印刷品的。

CMY是3种印刷油墨名称的首字母：青色Cyan、洋红色Magenta、黄色Yellow。而K取的是black最后一个字母，之所以不取首字母，是为了避免与蓝色(Blue)混淆。从理论上来说，只需要CMY三种油墨就足够了，它们三个加在一起就应该得到黑色。但是由于目前制造工艺还不能造出高纯度的油墨，CMY相加的结果实际是一种暗红色。因此还需要加入一种专门的黑墨来调和。

RGB模式是一种发光的色彩模式，你在一间黑暗的房间内仍然可以看见屏幕上的内容；
CMYK是一种依靠反光的色彩模式，我们是怎样阅读报纸的内容呢？是由阳光或灯光照射到报纸上，再反射到我们的眼中，才看到内容。它需要由外界光源，如果你在黑暗房间内是无法阅读报纸的。

只要在屏幕上显示的图像，就是RGB模式表现的。现在加上一句：只要是在印刷品上看到的图像，就是CMYK模式表现的。比如期刊、杂志、报纸、宣传画等，都是印刷出来的，那么就是CMYK模式的了。

在 CMYK 模式下，可以为每个像素的每种印刷油墨指定一个百分比值。为最亮（高光）颜色指定的印刷油墨颜色百分比较低；而为较暗（阴影）颜色指定的百分比较高。例如，亮红色可能包含 2% 青色、93% 洋红、90% 黄色和 0% 黑色。在 CMYK 图像中，当四种分量的值均为 0% 时，就会产生纯白色。

在制作要用印刷色打印的图像时，应使用 CMYK 模式。将 RGB 图像转换为 CMYK 即产生分色。如果您从 RGB 图像开始，则最好先在 RGB 模式下编辑，然后在编辑结束时转换为 CMYK。在 RGB 模式下，可以使用“校样设置”命令模拟 CMYK 转换后的效果，而无需更改实际的图像数据。您也可以使用 CMYK 模式直接处理从高端系统扫描或导入的 CMYK 图像。

尽管 CMYK 是标准颜色模型，但是其准确的颜色范围随印刷和打印条件而变化。Photoshop 中的 CMYK 颜色模式会根据您在“颜色设置”对话框中指定的工作空间设置而不同。

转换图像色彩模式可以从菜单【图像 模式 CMYK颜色】。

CMYK通道的灰度图和RGB类似，是一种含量多少的表示。RGB灰度表示色光亮度，CMYK灰度表示油墨浓度。  
但两者对灰度图中的明暗有着不同的定义：

* RGB通道灰度图中较白表示亮度较高，较黑表示亮度较低。纯白表示亮度最高，纯黑表示亮度为零。

* CMYK通道灰度图中较白表示油墨含量较低，较黑表示油墨含量较高，纯白表示完全没有油墨。纯黑表示油墨浓度最高。

### 灰度模式

所谓灰度色，就是指纯白、纯黑以及两者中的一系列从黑到白的过渡色。灰度色中不包含任何色相，即不存在红色、黄色这样的颜色。灰度的形成是RGB数值相等，灰度隶属于RGB色域(色域指色彩范围)。

灰度模式在图像中使用不同的灰度级。在 8 位图像中，最多有 256 级灰度。灰度图像中的每个像素都有一个 0（黑色）到 255（白色）之间的亮度值。与RGB正好相反，百分比越高颜色越偏黑，百分比越低颜色越偏白。
灰度最高相当于最高的黑，就是纯黑。

灰度值也可以用黑色油墨覆盖的百分比来度量（0% 等于白色，100% 等于黑色）。比如18％的灰度，对应的灰度值为 256×82%＝209.92。

### HSB色彩

HSB色彩把颜色分为色相、饱和度、明度三个因素。注意它将我们人脑的“深浅”概念扩展为饱和度(S)和明度(B)。所谓饱和度相当于家庭电视机的色彩浓度，饱和度高色彩较艳丽。饱和度低色彩就接近灰色。明度也称为亮度，等同于彩色电视机的亮度，亮度高色彩明亮，亮度低色彩暗淡，亮度最高得到纯白，最低得到纯黑。

如果我们需要一个浅绿色，那么先将H拉到绿色，再调整S和B到合适的位置。一般浅色的饱和度较低，亮度较高。如果需要一个深蓝色，就将H拉到蓝色，再调整S和B到合适的位置。一般深色的饱和度高而亮度低。如下左图和中图。这种方式选取的颜色修改方便，比如要将深蓝色加亮，只需要移动B就可以了，既方便又直观。  

如果要选择灰度，只需要将S放在0%，然后拉动B滑杆就可以如同灰度模式那样选择了。如下右图。注意，HSB方式得到的灰度，与灰度滑块K的数值是不同的。我们在Photoshop中选择灰度时候，应以灰度滑块为准。

![](http://www.99ut.com/library/turlib/serieslib/01/ps1_90.jpg) ![](http://www.99ut.com/library/turlib/serieslib/01/ps1_91.jpg) ![](http://www.99ut.com/library/turlib/serieslib/01/ps1_92.jpg)

在HSB模式中，S和B的取值都是百分比，唯有H的取值单位是度，表示色相位于色相环上的位置。

![](http://www.99ut.com/library/turlib/serieslib/01/ps1_a05.jpg)

从0度的红色开始，逆时针方向增加角度，60度是黄色，180度是青色等等。360度又回到红色。

我们再看一下Photoshop的拾色器，拾色器的H方式其实就是HSB取色方式。色谱就是色相，而大框就包含了饱和度和明度(横方向是饱和度，竖方向是明度)。

![](http://www.99ut.com/library/turlib/serieslib/01/ps1_68.jpg)

在选取颜色的时候，HSB模式较为直观和方便。

### 颜色的选取

hotoshop中提供了三种选择任意色彩的方式：

- 第一是使用颜色调板〖F6〗，拉动滑块确定颜色。Photoshop中颜色分为前景色和背景色，如下图。位于左上的色块代表前景色，位于其右下方的色块代表背景色。通过点击可以在两者间切换选取颜色。
  
    注意有时候会出现一个![](http://www.99ut.com/library/turlib/serieslib/01/P_Warning_Sm_N.gif)标志，这是在警告该颜色不在CMYK色域，单击![](http://www.99ut.com/library/turlib/serieslib/01/P_Warning_Sm_N.gif)右边的色块就会切换到离目前颜色最接近的CMYK可打印色。

    ![](http://www.99ut.com/library/turlib/serieslib/01/ps1_60.jpg)

- 第二是使用滑块下方的色谱图，用鼠标直接在色谱图中点击即可选中颜色。也可以按住鼠标在色谱中拖动，松手确定颜色。选中颜色的同时，上方的滑块会跟着变换读数。色谱最右方是一个纯白和纯黑。色谱分为RGB、CMYK、灰度，顺序如下3图。可以明显感觉到RGB色谱比CMYK明亮。

    ![](http://www.99ut.com/library/turlib/serieslib/01/ps1_64.jpg)-![](http://www.99ut.com/library/turlib/serieslib/01/ps1_65.jpg)-![](http://www.99ut.com/library/turlib/serieslib/01/ps1_66.jpg)

    色谱中还有一种“当前颜色”，是指从已选颜色到纯白的过渡，效果类似灰度。一般用于制作印刷图像时选取淡印色。第三种方法是使用Photoshop的拾色器，方法是点击工具栏上的前景色或背景色色块(点击颜色调板上的也可)。

- 第三种方法是使用Photoshop的拾色器，方法是点击工具栏上的前景色或背景色色块(点击颜色调板上的也可)，如下左图。

    ![](http://www.99ut.com/library/turlib/serieslib/01/ps1_67.jpg)-![](http://www.99ut.com/library/turlib/serieslib/01/ps1_68.jpg)

    这个拾色器功能强大，使用方法也很多，图示的是最通常的用法。左边那个大方框是鼠标色彩选取区，使用鼠标像在前面色谱中那样选色即可。也可以由右边直接填入数字。在大框右边那一竖条的是色谱，注意右边HSB方式的H目前被选择，那么现在这个色谱就是色相色谱。即：红色橙色黄色绿色青色蓝色紫色。

    除了H，S、B、R、G、B、L、a、b都可以作为色谱的标准，但那些方式较为难懂，目前不必去深究。只要知道H色相方式就够了。比如现在要选择一个深绿色，就先把色相移动到绿色那一段，然后在大框中移动鼠标到较深的区域即可完成。

    纯白在大框最左上角，注意那个选色的小圈的心才是选中的颜色，因此要选择最左上角的那个点，小圈要移出大框四分之三才可以，如下左图。注意RGB的数值，均为255了说明就已经是纯白了。

    色谱右上方有一个从中间一分为二的方框，里面是这次选择前后颜色的对比。比如下半部显示着刚才选中的青色。点击这个颜色就可以回到刚才的选择。同样，要在这里选取灰度必须在大框最左边的那一条竖线中，小圈只能看到一半，同时RGB值应相等。如下右图。

    ![](http://www.99ut.com/library/turlib/serieslib/01/ps1_69.jpg)-![](http://www.99ut.com/library/turlib/serieslib/01/ps1_70.jpg)

## 图像

Photoshop可以同时打开多幅图像进行制作，图像之间还可以互相传送数据，可以快捷键〖CTRL TAB〗完成图像切换。

所谓A4就是一种纸张规格。一张大纸对折切开，得到的两片纸称为A1，A1再对折切开称为A2，以此类推。A4就是对折切开4次后的大小。关系如下右图。还有一种B类分割法，B4比A4要大一些。

我们想把图像变成一片空白，就如同新建一样。可以通过以下方式：

- 填充命令在菜单【编辑 填充】〖SHIFT F5〗。在内容中使用白色，模式正常，不透明度100%，确定后即可完成对整幅图像的填充。

    ![](http://www.99ut.com/library/turlib/serieslib/03/003_30.jpg)

- 通过快捷键 〖ALT DELETE〗或〖ALT BackSpace〗用前景色填充。先按〖D〗将颜色设为默认的前黑后白，然后按下〖X〗把前景色变为白色，最后按下〖ALT DELETE〗完成前景色填充。其实也可以通过快捷键直接用背景色填充，它是〖CTRL DELETE〗或〖CTRL BackSpace〗，因此上面的操作实际上可以简化成〖D〗、〖CTRL DELETE〗。

### 图像尺寸

用菜单【图像 图像大小】，可看到如下右图的信息。

![](http://www.99ut.com/library/turlib/serieslib/02/002_028.jpg) ![](http://www.99ut.com/library/turlib/serieslib/02/002_029.jpg)

位于上面的像素大小我们都已经熟悉了，指的就是图像在电脑中的大小。其下的文档大小，实际上就是打印大小，指的就是这幅图像打印出来的尺寸。 可以看到打印大小为17.64×10.58厘米。它可以被打印在一张A4(有关A4的解释在后面)大小的纸上。

打印分辨率 = 显示像素大小/打印尺寸。在国际标准中，打印分辨率的单位是“像素/英寸”。

如上图中的打印分辨率为 72像素/英寸。像素/尺寸简称为 DPI，Dot(点)Per(每)Inch(英寸)。在Photoshop中，也可以把分辨率单位换成符合我们习惯的“像素每厘米”。

一般对于打印分辨率，印刷行业有一个标准：300dpi。就是指用来印刷的图像分辨率，至少要为300dpi 才可以，低于这个数值印刷出来的图像不够清晰。

如果打印或者喷绘，只需要 72dpi 就可以了。注意这里说的是打印不是印刷。打印是指用普通的家用或办公喷墨打印机。喷绘就是街头的大幅面广告，因为需求数量少一般不作印刷。因为印刷有一个起步成本，数量越多单价就越便宜。比如印1000份需要500元，而印3000份可能总共也只需要1000元就可以了。所以一般的街头广告(比如公车站的灯箱广告)都是使用大幅面喷绘机制作的。喷绘机的工作原理和喷墨打印机类似，只是体积大上许多，价格也较为昂贵。

打印分辨率和打印尺寸，顾名思义就是在在那些需要打印或印刷的用途上才起作用。比如海报设计，报纸广告等。而对于网页设计等主要在屏幕上显示的用途来说，则不必去理会打印分辨率和打印尺寸。只需要按照像素去定义图像大小就可以了。

### 缩放移动图像

〖CTRL +〗用于放大图像，〖CTRL -〗用于缩小图像，沿着图像的中心点进行缩放。

还有一种定点放大方式是按住空格和CTRL键，用鼠标单击图像的一个部分，这样会以单击的地方作为中心放大。缩小是按住空格和ALT键单击。 

图像窗口的标题栏以及状态栏都会显示缩放倍数。 

可按住空格键在图像中按下鼠标拖动。当鼠标开始拖动以后，空格键可以松开。

按下TAB键将隐藏除了菜单以外所有的内容，方便整体观看图像。再次按TAB键恢复。下面是组合过程的视频动画。

### 图像格式

电脑中的图像类型分为两大类，一类称为点阵图，一类称为矢量图。
点阵图顾名思义就是由点构成的。像素就是组成点阵图像中的那些点，是点阵图最小的单位。

数码相机拍摄的照片、扫描仪扫描的稿件以及绝大多数的图片都属于点阵图，如下左图就是一个典型的点阵图。

使用菜单【图像 图像大小】就可以看到图像大小信息。

![](http://www.99ut.com/library/turlib/serieslib/02/002_001.jpg) ![](http://www.99ut.com/library/turlib/serieslib/02/002_002.jpg)

点阵格式是把图像分为若干个点(像素)，依靠储存或再现每个点的信息，从而储存或再现整幅图像。
由于像素数量的限制，所以点阵图像的大小是固定的。缩小或放大图像都会造成对图像的破坏。

矢量图像是基于线段的，因此它不适合记录色彩较为复杂的图像。矢量的图像缩放自如，不会导致图像失真。

## 工具

### 历史纪录

菜单【窗口 历史纪录】，会看到调板中纪录了这个图像新建以来所做过的所有操作步骤。顺序从上至下代表操作步骤的从先至今。如下右图。点击相应的步骤就可以回到那次操作之后图像的状态。就如同时光倒流般。这个历史纪录主要就是用来撤消操作的，如果对图像做了不满意的修改，可以通过这个调板来撤消。

可以撤消的步骤默认是20步。如果纪录的步骤超过20步，最新的步骤将取代最早的步骤。假设做了21步操作，那么下右图中位于顶部的第一步的“新建”步骤将消失。消失的历史纪录是不能找回来的。历史纪录的步骤数可从Photoshop预置〖CTRL K〗“常规”中的“历史纪录状态”修改。最多为1000。

可以通过快捷键〖CTRL ALT Z〗进行逐步的撤消，按一次退一步。可以通过快捷键〖CTRL SHIFT Z〗逐步重做。

### 画笔

画笔工具和铅笔工具的快捷键都是〖B〗，按下后选择的是上一次使用的画笔或铅笔工具。按住 〖SHIFT〗 再按 〖B〗 即可在画笔和铅笔之间切换，也可以按住ALT键单击。

这时鼠标在图像中会变为笔刷大小的圆形，如果不是，首先确定键盘上的大小写转换键CapsLock处于关闭状态，然后从Photoshop首选项中的“显示与光标”项目中的“绘画光标”指定为“正常画笔笔尖”。

按下〖D〗，它的作用是将颜色设置为默认的前景黑色、背景白色。也可以点击工具栏颜色区的默认按钮(下左图红色箭头处)。点击蓝色箭头处将交换前景和背景色，如果现在按下前景色将变为白色而背景色变为黑色，它的快捷键是〖X〗。

![](http://www.99ut.com/library/turlib/serieslib/03/003_23.jpg) ![](http://www.99ut.com/library/turlib/serieslib/03/003_24.jpg)

画笔的“流量”和不透明度效果差不多。不同之处在于在一次绘制中，重叠的区域也会有加深的效果。多重叠几次颜色就更饱和。

更改流量的快捷键和更改不透明度快捷键类似，也是通过数字键，不同的是要先按住SHIFT键再按相应的数字键。如50%就是〖SHIFT 5〗，80%就是〖SHIFT 8〗，45%就是〖SHIFT 45〗，1%就是〖SHIFT 01〗。

## Demo

- [16个创意Photoshop图像处理教程](http://www.shejidaren.com/photoshop-image-processing-tutorials.html)
- [UI设计师的Photoshop配置技巧](http://www.shejidaren.com/photoshop-configuration-tips-for-ui-designer.html)
- [21款强大高效的Photoshop扩展插件](http://www.shejidaren.com/21-photoshop-plugins-for-designer.html)
- [PS黄金分割工具：黄金螺旋 黄金三角 黄金比例 三分法](http://www.shejidaren.com/photoshop-huang-jin-fen-ge.html)
- [36个漂亮的浏览器PSD模型素材](http://www.shejidaren.com/browser-psd-mockup.html)
- [默默图标生成器](http://www.zcool.com.cn/article/ZMzY5ODA=.html)
- [16个创意Photoshop图像处理教程](http://www.shejidaren.com/photoshop-image-processing-tutorials.html)
- [设计素材：手机锁屏界面-临摹](http://www.zcool.com.cn/gfx/ZMzA0MzMy.html)
- [超赞！32款扁平化Photoshop PSD UI工具包（下）-控件新闻-慧都控件网](http://www.evget.com/article/2014/8/21/21491.html)
- [UI Animation in Photoshop – Tutorial #1](http://androiduiux.com/2014/08/26/ui-animation-in-photoshop-tutorial-1)
- [50个热门的网页PSD模板下载](http://caibaojian.com/50-top-best-psd.html)
- [5种实用的移动手机APP导航菜单设计方案](http://www.shejidaren.com/mobile-app-menus-design.html)
- [优秀设计资源与教程分享 2014-9月](http://www.shejidaren.com/design-resources-september-2014.html)
- [Ready For Retina HD: Create Pixel-Perfect Assets For Multiple Scale Factors](http://www.smashingmagazine.com/2014/10/15/create-assets-for-multiple-scale-factors)

## Design Resource

- [站酷](http://www.zcool.com.cn/gfxs/)


## Web Design

- [优秀创新的admin后台界面设计欣赏](http://www.shejidaren.com/creative-dashboard-designs.html)
- [最新15个高品质用户界面UI KIT素材](http://www.shejidaren.com/free-ui-kits-psd-download.html)
- [54个新出的免费UI设计PSD素材下载](http://www.shejidaren.com/54-free-ui-psd.html)
- [一共500种俏皮的人物形象PSD素材](http://www.shejidaren.com/500-ren-wu-dong-zuo-su-cai.html)
- [2014人气网站界面设计免费PSD素材](http://www.shejidaren.com/free-psd-website-templates.html)
- [20个色彩美丽的UI KIT设计素材（PSD）](http://www.shejidaren.com/20-beautiful-ui-kits-for-designer.html)
- [Sunday Freebie: 5 Premium Design Resources - DealFuel](http://dealfuel.com/seller/premium-design-resources)
- [Best PSD Freebies - Download Free PSD Photoshop Resources for Web Design](http://www.bestpsdfreebies.com/)
- [UX用户体验博客与资源 推荐！](http://www.shejidaren.com/ux-design-blog-and-resources.html)

## Material

- [Material设计素材与灵感](http://www.shejidaren.com/material-design-resourices.html)

### Button & Swither

- [90个免费漂亮的切换开关按钮PSD](http://www.shejidaren.com/switch-and-toggle-button-psds.html)

### Apple

- [30个苹果系列产品模型（Mock Up:iPhone/iMac…）](http://www.shejidaren.com/apple-product-psd-mockups.html)
- [iPhone GUI PSD](http://www.teehanlax.com/tools/iphone/)
- [iOS 7 iPhone GUI PSD](http://www.teehanlax.com/tools/ios7-iphone/)











