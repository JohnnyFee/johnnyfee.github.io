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

### CMYK 颜色模式

印刷品与网页的区别在于色彩模式不同，印刷品必须是CMYK色彩模式，而网页主要使用RGB色彩模式。Photoshop的色彩管理功能主要是针对印刷品的.

在 CMYK 模式下，可以为每个像素的每种印刷油墨指定一个百分比值。为最亮（高光）颜色指定的印刷油墨颜色百分比较低；而为较暗（阴影）颜色指定的百分比较高。例如，亮红色可能包含 2% 青色、93% 洋红、90% 黄色和 0% 黑色。在 CMYK 图像中，当四种分量的值均为 0% 时，就会产生纯白色。

在制作要用印刷色打印的图像时，应使用 CMYK 模式。将 RGB 图像转换为 CMYK 即产生分色。如果您从 RGB 图像开始，则最好先在 RGB 模式下编辑，然后在编辑结束时转换为 CMYK。在 RGB 模式下，可以使用“校样设置”命令模拟 CMYK 转换后的效果，而无需更改实际的图像数据。您也可以使用 CMYK 模式直接处理从高端系统扫描或导入的 CMYK 图像。

尽管 CMYK 是标准颜色模型，但是其准确的颜色范围随印刷和打印条件而变化。Photoshop 中的 CMYK 颜色模式会根据您在“颜色设置”对话框中指定的工作空间设置而不同。

### 灰度模式

所谓灰度色，就是指纯白、纯黑以及两者中的一系列从黑到白的过渡色。灰度色中不包含任何色相，即不存在红色、黄色这样的颜色。灰度的形成是RGB数值相等，灰度隶属于RGB色域(色域指色彩范围)。

灰度模式在图像中使用不同的灰度级。在 8 位图像中，最多有 256 级灰度。灰度图像中的每个像素都有一个 0（黑色）到 255（白色）之间的亮度值。与RGB正好相反，百分比越高颜色越偏黑，百分比越低颜色越偏白。
灰度最高相当于最高的黑，就是纯黑。

灰度值也可以用黑色油墨覆盖的百分比来度量（0% 等于白色，100% 等于黑色）。比如18％的灰度，对应的灰度值为 256×82%＝209.92。

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











