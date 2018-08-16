layout: "post"
title: "Java Cryptography - ECC"
categories: [Cryptography, Java, Android]
---

## ECC

很多人都听说过加密算法，包括ECC、ECDH或者ECDSA。ECC是Elliptic Curve Cryptography的缩写，就是椭圆加密算法，ECDH和ECDSA是ECC的不同实现。

椭圆加密算法的应用范围很广，主要的三个技术 [TLS](https://link.jianshu.com/?t=https%3A%2F%2Ftools.ietf.org%2Fhtml%2Frfc4492)、[PGP](https://link.jianshu.com/?t=https%3A%2F%2Ftools.ietf.org%2Fhtml%2Frfc6637)以及[SSH](https://link.jianshu.com/?t=https%3A%2F%2Ftools.ietf.org%2Fhtml%2Frfc5656) 都在使用它，更别提[比特币](https://link.jianshu.com/?t=https%3A%2F%2Fen.bitcoin.it%2Fwiki%2FSecp256k1)以及其他加密数字货币了。

在椭圆加密算法流行之前，绝大多数的公钥加密算法都是基于RSA、DSA以及DH这些基于模运算的替代加密系统。这些加密算法在今天依然占据非常重要的位置。然而，尽管ECC背后的这些算法很容易理解而且广泛使用，但是对于绝大多数人来说，这些算法是一个谜团。

## 椭圆曲线

首先：什么是椭圆曲线？Wolfram MathWorld给出了个准确非凡的定义[椭圆曲线](https://link.jianshu.com/?t=http%3A%2F%2Fmathworld.wolfram.com%2FEllipticCurve.html)。但对于目前的我们来说，椭圆曲线可以暂时简单的理解为**描述了特定点的集合的公式**：

![](https://upload-images.jianshu.io/upload_images/785822-8ee3bbea234a8538.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/165)

该公式在椭圆曲线里面称为*Weierstrass normal form*  

其中， ![](http://upload-images.jianshu.io/upload_images/785822-6c9ac5e2d832271e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

以下是a和b参数的变化对应的图形的示例：

![](https://upload-images.jianshu.io/upload_images/785822-e5a23063156c261b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/440)

b=1，a取值范围从2到-3

![](https://upload-images.jianshu.io/upload_images/785822-ada1cd71cb2934d3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300)

特殊曲线：左边参数是a=b=0，右边参数是a=-3，b=2.这两条都不是符合标准的曲线

a和b的取值变化决定了曲线在坐标系上的不同形状。从图中可以看到，椭圆曲线是相对X轴对称。

为了达到我们的目的，我们还要定义一个**[无穷大的点](https://link.jianshu.com/?t=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FPoint_at_infinity)**（也可以成为理想点），从现在开始，我们以符号0，也就是零表示该点。

把上面几个点结合起来，我们的椭圆曲线公式就变成了

![](https://upload-images.jianshu.io/upload_images/785822-01a7671c7b8b3028.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/488)

## 群(Groups)

数学上，群(Groups)指的是我们定义了二元操作“运算”并且用符号+表示的一个集合。假定我们要操作的群用 𝔾表示，那么我们在这个群上面要定义的“运算”必须符合以下几个属性：

* **闭包**。如果a和b都是𝔾的成员，那么a+b也是𝔾的成员。
* **组合性**。(a+b)+c=a+(b+c)
* **单位元**。存在确切的一个值，称之为单位元，0可以保证该等式成立 a+0=0+a=a
* **逆元**。每个成员都有一个相反数：对于任意值a必定存在b使得a+b=0

如果加上第五条这要求：

* **交换性**a+b=b+a

这样的群我们称之为 [阿贝尔群](https://link.jianshu.com/?t=https%3A%2F%2Fzh.wikipedia.org%2Fwiki%2F%25E9%2598%25BF%25E8%25B2%259D%25E7%2588%25BE%25E7%25BE%25A4)。

根据以上的定义，我们很容易得知，整数集合 ℤ 是一个群，也可以称之为  [阿贝尔群](https://link.jianshu.com/?t=https%3A%2F%2Fzh.wikipedia.org%2Fwiki%2F%25E9%2598%25BF%25E8%25B2%259D%25E7%2588%25BE%25E7%25BE%25A4)。自然数集合  ℕ 却不是一个群，因为不符合第四个属性（自然数都是整数，不存在a+b=0）。

根据组的这四个属性，我们很容易可以推导出其他属性。比如：第三个属性的确切的值0是唯一的；相反数也是唯一的，也就意味着a+b=0，a的相反数b也是唯一的。这些属性有助于我们接下去的数学逻辑推理。

## 椭圆曲线里的群公理

如上文所说，我们可以基于椭圆曲线定义一个群。特别要指出的是：

* 群里的元素都在椭圆曲线上
* 椭圆上的单位元指的是无限远点
* 椭圆上的点P的逆元与P关于X轴轴对称
* 定义+运算：给定三个非零的点 P，Q和R，则P+Q+R=0（无限远点）成立

![](https://upload-images.jianshu.io/upload_images/785822-44d41eb2a2d7917c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300)

P+Q+R=0（无限远点）

注意：最后一条公理里，给出了三个点，但是没有限定顺序，也就意味着P+(Q+R)=Q+(P+R)=R+(P+Q)=⋯=0。这就充分表明了，这里定义的+运算符符合群公理的组合性和交换性，也就意味着椭圆曲线符合阿贝尔群。

到目前为止，一切都推理挺顺利的，对吧。那么问题来了，我们要如何计算两个任意点之和呢？

## 几何学上的加法

因为椭圆曲线是阿贝尔群，所以公式P+Q+R=0  以及 P+Q=−R成立。根据这些公式，我们可以从几何学的角度去计算点P+点Q的值：在椭圆曲线上画出点P和点Q，连直线穿过P和Q，该直线会与椭圆曲线相较于第三个点，称之为R。根据R取得R的逆元-R，P+Q=-R。

![](https://upload-images.jianshu.io/upload_images/785822-ea55d7f664296250.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/287)

运用几何学的方法很容易得到我们要的结果，但是我们需要再对一些更精确的解释。特别是有一些问题需要考虑：

* 如果P=0或者Q=0(0是无穷远点)呢？我们当然无法画出该直线，因为无穷远点无法体现在直角坐标系里。但是既然已经定义了无穷远点0，那么对于任意给定的P或者Q，P+0=P以及0+Q=Q都是成立的。
* 如果P=-Q呢？这种情况下该直线是与X轴是垂直的，并且不会与椭圆曲线相交于第三个点。 根据公理，P就是Q的逆元，P+Q=P+(-P)=0。
* 如果P=Q呢？这种情况下，存在无数条线穿过这个点。这里要用到极限的思维。假设线上有另外一个点Q1，让Q1不断靠近P，会怎么样？

    ![](https://upload-images.jianshu.io/upload_images/785822-85f0ed4e61c77f27.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/300)

    随着两个点的不断靠近，最终产生的线跟椭圆曲线是切线关系

    随着Q1不断靠近P，最终Q1无限靠近P，产生了一条直线与椭圆曲线相切。那么可以得到 P+P=-R, 在这里R就是该直线与椭圆曲线的另外一个交点。

* 如果P≠Q，但是不存在第三个交点R呢？这种情况和上一个情况很类似。实际上，这种情况下该直线跟椭圆曲线是相切的关系。

    ![](https://upload-images.jianshu.io/upload_images/785822-b67b787448fc72d4.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/300)

    假设P就是相切的点。在上一个情况里，有该等式P+P=-Q。而在这里变成了P+Q=-P。另一方面，如果Q是相切的点，那么P+Q=-Q。

我们需要了解的几何学只是已经差不多涵盖了所有情况了。只要给我们笔和尺子，我们就能在椭圆曲线上执行加法。**如果有兴趣，可以到**[HTML5/JavaScript visual tool](https://link.jianshu.com/?t=https%3A%2F%2Fcdn.rawgit.com%2Fandreacorbellini%2Fecc%2F920b29a%2Finteractive%2Freals-add.html)**计算椭圆曲线上的加法**

## 代数上的加法

要计算点的加法的话，我们必须把前面的几何学的讨论转到代数上的讨论。最直接的方法是把上面的公理用代数上的公式表示出来，但是这件事情会很乏味而且需要解决一些三次方程。所以在这里我就只给出结果吧。

首先，声明下我们暂时不讨论一些特殊情况。比如我们已经知道了P+(-P)=0，P+0=0+P=P，所以，接下去我们不考虑这两种情况。我们考虑的是 **非0，非对称的点 P和Q，如下图**

![](https://upload-images.jianshu.io/upload_images/785822-e9777c7fcafca805.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/104)

![](https://upload-images.jianshu.io/upload_images/785822-fed9da41ba13d3e4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/110)


**[声明下，因为编辑器的问题，下文中将用P=(xP,yP)(P是下标)来表示这种等式，否则一直贴图排版很累]**

如果xP≠xQ(P和Q是下标)，那么该直线的斜率是：

![](https://upload-images.jianshu.io/upload_images/785822-64d2f81fa9a952f8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/130)

该直线与椭圆曲线相交的第三个点R(xR,yR)(R是下标)：

![](https://upload-images.jianshu.io/upload_images/785822-ab46380833155f96.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/253)


或者也可以写成：

![](https://upload-images.jianshu.io/upload_images/785822-c9ee32ebd18a685c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/205)

特别强调一下  (xP,yP)+(xQ,yQ)=(xR,−yR)（P，Q，R都是下标）。  
如果要检查结果是否正确，我们需要检查R是否在椭圆曲线上，以及P，Q和R是否都在直线上。检查这些点是否在直线上是显而易见的，然而检查R是否属于椭圆曲线并不是，因为我们不得不解决一个一点都不有趣的三次方程问题。

考虑这么一个例子：根据我们给出的[visual tool](https://link.jianshu.com/?t=https%3A%2F%2Fcdn.rawgit.com%2Fandreacorbellini%2Fecc%2F920b29a%2Finteractive%2Freals-add.html)，给定的P=（1，2）和Q=（3，4）都在曲线上y2=x3−7x+10（y的2次方，x的3次方），那么P+Q=-R=（-3，2）。反过来去根据我们前面的公式验证该结果是否正确：

![](https://upload-images.jianshu.io/upload_images/785822-b7bfa44d4aefee3f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/438)


验证正确！

注意，即使P或者Q是切点，该等式依然成立。拿P=(-1,4) Q=(1,2)尝试下：

![](https://upload-images.jianshu.io/upload_images/785822-18093086d6b2cc2f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/445)


得到的结果是P+Q=(1,-2)，该结果与用该工具[visual tool](https://link.jianshu.com/?t=https%3A%2F%2Fcdn.rawgit.com%2Fandreacorbellini%2Fecc%2F920b29a%2Finteractive%2Freals-add.html%3Fpx%3D-1%26py%3D4%26qx%3D1%26qy%3D2)计算是一样的。

**另一种情况P=Q则需要另外处理了**：关于xR以及yR的公式是一样的，但是针对直线的斜率必须用另外的方式处理：

![](https://upload-images.jianshu.io/upload_images/785822-e0d532a0c86d80b5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/135)

注意，该公式是由一下公式推导出来的：

![](https://upload-images.jianshu.io/upload_images/785822-8ed662547eb47738.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/233)

为了证明该公式的正确性，有必要验证R是否属于椭圆曲线上，以及P和R连成的直线与椭圆曲线有且仅有2个交点。但是在这里，我们不作证明，先做个测试：P=Q=(1,2)

![](https://upload-images.jianshu.io/upload_images/785822-52209bffece45d64.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/445)

所以得出 P+P=-R=(-1, -4)。[正确](https://link.jianshu.com/?t=https%3A%2F%2Fcdn.rawgit.com%2Fandreacorbellini%2Fecc%2F920b29a%2Finteractive%2Freals-add.html%3Fpx%3D1%26py%3D2%26qx%3D1%26qy%3D2)

## 标量乘法

除了加法之外，我们定义另外一个运算：标量乘法：

![](https://upload-images.jianshu.io/upload_images/785822-dd08aba62c8d2e19.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/192)

在这里n是一个自然数。嗯，我写了个**[visual tool](https://link.jianshu.com/?t=https%3A%2F%2Fcdn.rawgit.com%2Fandreacorbellini%2Fecc%2F920b29a%2Finteractive%2Freals-mul.html)**用来玩标量乘法，有兴趣点击去试试吧。

该公式看起来计算nP需要计算n次加法。如果n是k个二进制位，那么该算法复杂度是O(2k)（2的k次方），计算量有点大。但是其实存在更快速的方案。

其中一个就是**先做倍数再做加法**。要了解基本原理还是直接看例子会比较快。假设n=151，其对应的二进制是10010111。而该二进制数字可以转化为：

![](https://upload-images.jianshu.io/upload_images/785822-a05354232c519c65.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/673)

所以我们可以这么写：

![](https://upload-images.jianshu.io/upload_images/785822-b95a001e969cad78.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/377)

所以，该运算过程是这样的：

* 获取P
* 取P的2倍，得到2P
* 2P加上P
* 把2P再取2倍，得到4P
* 4P加上2P加上P
* 4P再取2倍，得到8P
* 不取8P做运算
* 8P取2倍，得到16P
* 16P加上4P加上2P加上P
* ……  

    最终，要得到151P我们只是做了一些简单的倍数以及加法。

如果还是不清楚，可以看看下面的Python代码

```python
def bits(n):
    """
    Generates the binary digits of n, starting
    from the least significant bit.

    bits(151) -> 1, 1, 1, 0, 1, 0, 0, 1
    """
    while n:
        yield n & 1
        n >>= 1

def double_and_add(n, x):
    """
    Returns the result of n * x, computed using
    the double and add algorithm.
    """
    result = 0
    addend = x

    for bit in bits(n):
        if bit == 1:
            result += addend
        addend *= 2

    return result
```

如果倍数和加法都是复杂度为O(1)的运算，那么该算法的复杂度就是O(log n)（或者O(k)）（考虑到k个bit的长度）。依然比O(n)的复杂度要好。

## 对数

给定n和P，我们运算Q=nP至少需要一个多项式时间。但是如果反过来呢？**如果我们知道Q和P，要反过来得到n呢？**该问题被认为是对数问题。为了与其他加密算法保持一致性，我们称该问题为“对数”问题而非“除法”。

我并不清楚什么是“简单”的问题，但是从[该链接里的乘法](https://link.jianshu.com/?t=https%3A%2F%2Fcdn.rawgit.com%2Fandreacorbellini%2Fecc%2F920b29a%2Finteractive%2Freals-mul.html%3Fa%3D-3%26b%3D1%26px%3D0%26py%3D1)，很容易看出一些规则。举个例子，假设该曲线是  y2=x3−3x+1（y的2次方，x的3次方），P点是（0，1）。我们很容易验证得到，如果n是奇数，nP是在左半边坐标轴里，如果n是偶数，nP在右半边坐标轴里。如果做更多实验，甚至发现更多规则，最终可以写出算法让我们计算曲线可以更高效。

但是还有个算法问题：离散数学问题。在下篇文章里，我们会讨论如果我们减少椭圆曲线的域，标量乘法依然是个“简单”的数学问题，然而离散数学变成一个“困难”的数学问题。这种二元性就是椭圆加密算法的核心。

注：该文章翻译自[这里](https://link.jianshu.com/?t=http%3A%2F%2Fandrea.corbellini.name%2F2015%2F05%2F17%2Felliptic-curve-cryptography-a-gentle-introduction%2F)，如果有翻译不当的地方，请指正。