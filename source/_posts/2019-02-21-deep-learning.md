---
layout: post
title: Deep Learning
tags: [ai]
category: AI
---

看 [深度学习之神经网络入门最佳路径](https://www.imooc.com/learn/1063)

## 机器学习

机器学习：无需数据转化为有价值的方法。从数据中抽取规律，并用来预测未来。

**机器学习的应用场景：**

- 分类问题：图像识别、垃圾邮件识别、选择电视转播画面。

- 回归问题：股价预测，房价预测。
- 排序问题：电商点击率预测、推荐。
- 生成问题：图像生成、图像风格转化、图像文字描述生成。

**机器学习应用流程：**

![image-20190222110141681](https://ws1.sinaimg.cn/large/006tKfTcgy1g0f0qpzb31j30ka077wg3.jpg)

**机器学习岗位职责：**

- 数据处理（采集+去燥）
- 模型训练（提取 特征+模型）
- 模型的评估和优化（MSE、F1-score、AUC+调参）
- 模型应用（A/B测试）

##深度学习 

深度学习：机器学习是实现人工智能的方法，深度学习是实现机器学习算法的技术。

深度学习算法集合：

- 卷积神经网络。多用于 CV 领域。
- 循环神经网络。处理不定长数据，如文本分类，多用于 NLP 领域。
- 自动编码器
- 稀疏编码
- 深度信念网络
- 限制玻尔兹曼机
- 深度学习+强化学习=深度强化学习。Alpha Go，Alpha Zero。

### 进展

**图像分类错误率：**

![image-20190222111240044](https://ws3.sinaimg.cn/large/006tKfTcgy1g0f123egblj30hs088aar.jpg)

**机器翻译：**

使用循环神经网络，大大提高翻译的准确率。

![image-20190222111326155](https://ws4.sinaimg.cn/large/006tKfTcgy1g0f12vy8l0j30li084gq7.jpg)



**图像生成：**

根据素描，生成图片

![image-20190222111546072](https://ws1.sinaimg.cn/large/006tKfTcgy1g0f15bk92lj30g107t793.jpg)



在云盘技术中，可以通过传输更小分辨率图标减少带宽，然后使用图片超清技术使图片看起来并没有减少分辨率，Google 云盘和百度云盘采用了这个技术。

![image-20190222111841593](https://ws4.sinaimg.cn/large/006tKfTcgy1g0f18fk4ouj30k007idpv.jpg)

AlphaGo

![image-20190222112318809](https://ws3.sinaimg.cn/large/006tKfTcgy1g0f1d5v2kwj31350exn9w.jpg)

## 神经网络

-  神经元：神经网络的最小结构，将多个神经元组合在一起，便可形成神经网络。
- 逻辑回归模型：在深度学习出现之前最赚钱的业务，用于广告业务中的点击率预估。
- 神经网络训练：知道神经网络的结构后，通过调整参数，使神经网络给出比较好的预测。

### 神经元

最小的神经网络。

![image-20190222113101007](https://ws4.sinaimg.cn/large/006tKfTcgy1g0f1l6bue6j30jo07pta1.jpg)

其中：

- w：权重。
- f: 激活函数，为计算出来的內积做非线性线性变换。
- x: 从问题中，抽取出来的特征。比如购买房子时，特意提取一特征 x=[房屋面积，房屋价格，社区评分]
- b: 偏值，分类线或者分类面和交点的值。![image-20190222114334933](https://ws3.sinaimg.cn/large/006tKfTcgy1g0f1y98poij304f04odg4.jpg)

如:
$$
x=[3, 1, 2]^T \\
w=[0.4, 0.6, 0.5]\\
H(a)=a/10\\
$$
则：
$$
wx=
\begin{bmatrix}
0.4 & 0.6& 0.5
\end{bmatrix}
\begin{bmatrix}
3\\
1\\
2
\end{bmatrix}
= 2.8\\
H(wx)=0.28
$$
以上只有一个神经元，也即一个输出，可以用来做二分类逻辑斯蒂回归模型；当需要多有多个输出时，则需要多个神经元，即多*输出神经元*，用来实现多酚类逻辑斯蒂回归模型。

则：

- w 从向量扩展为矩阵
- 输出 wx 则变成向量

![image-20190222141826718](https://ws1.sinaimg.cn/large/006tKfTcgy1g0f6fe1f4nj306t098gmj.jpg)

例:
$$
x=\begin{bmatrix}3\\ 1\\ 2\end{bmatrix}\\
W=
\begin{bmatrix}
0.4 & 0.6 & 0.5 \\
0.3 & 0.2 & 0.1
\end{bmatrix} \\
Y=wx=\begin{bmatrix}2.8\\ 1.3\end{bmatrix}
$$


### 激活函数 sigmoid

神经元 → 激活函数 sigmoid → 二分类逻辑斯蒂回归模型。

sigmoid 函数：

![image-20190222115214411](https://ws3.sinaimg.cn/large/006tKfTcgy1g0f279ftxtj30db06kwfa.jpg)

性质：

- 输出 0-1
- 对称函数

将 $x=w^tx​$代入方程

![image-20190222134128686](https://ws4.sinaimg.cn/large/006tKfTcgy1g0f5cztzrvj309s05sq3n.jpg)





## 工具

- [LaTeX/Mathematics - Wikibooks, open books for an open world](https://en.wikibooks.org/wiki/LaTeX/Mathematics)