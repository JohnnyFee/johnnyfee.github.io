---
layout: post
title: 机器学习算法 PCA 与梯度上升法
tags: [python, language, machine learning]
category: AI
---

[Python3入门机器学习_经典算法与应用](https://coding.imooc.com/class/169.html#Anchor)

## PCA

PCA 是主成分分析法，为 Principal Component Analysis 的缩写，是数理统计中的知识。

**特点：**

- 是一个非监督的机器学习算法
- 主要用于数据的降维
- 通过降维，可以发现更便于人类理解的特征
- 其他应用：可视化，去噪。 

 以下是一个二维特征集：

![image-20200206232143428](../resources/images/image-20200206232143428.png)

假如我们对其降维，降成一维特征集。如果我们简单处理，只保留其中一个。只保留特征 2 和特征 1 后的映射：

![image-20200206232433502](../resources/images/image-20200206232433502.png)

相对而言，图 2 的方案是比较好的降维方案。因为点和点之间的间隔比较大，拥有更高的可区分度，更好地保持了原来的点和点之间的距离。我们再来看一另一种映射方案：

![image-20200206232844665](../resources/images/image-20200206232844665.png)

上述方案将所有点映射到一条斜线上，这比方案2的点几句更大，也更能体现原点之间的原理。  

如何找到样本间间距最大的轴是 PCA 的关键。样本间的间距通过方差 Variance 来定义。在概率论与数理统计中，方差可以用来描述样本整体的疏密程度。方差越大，样本越稀疏；方差越小，样本越紧密。

方差的表示方式：$Var(x)=\frac 1 m \sum_{i=1}^m(x_i-\bar x)^2$

问题转化为找到一个轴，是的样本空间的所有点映射到这个轴的方差最大。  

![image-20200206234436734](../resources/images/image-20200206234436734.png)

为了求解最大方差值，我们首先将样本的均值归零，改过程称为 demean。即所有的样本减去样本的均值。相当于将坐标轴的原点移动到特向量的均值位置：

![image-20200206234942121](../resources/images/image-20200206234942121.png)

对应的方差公式演变为：$Var(x)=\frac 1 m \sum_{i=1}^m(x_i-\bar x)^2=\frac 1 m \sum_{i=1}^mx_i^2, \bar x=0$。其中 $x_i$ 为映射到新的坐标轴后得到的新样本。

目标轴的方向记为 $w=(w_1, w_2)$。

问题转化为将所有样本映射到 w 后，是的方差最大，即：
$$
Var(X_{project}) = \frac 1 m \sum_{i=1}^m(X_{project}^{(i)}-\bar X_{project})^2
$$
  

## 工具

- [LaTeX/Mathematics - Wikibooks, open books for an open world](https://en.wikibooks.org/wiki/LaTeX/Mathematics)
- [Play-with-Machine-Learning-Algorithms: Code of my MOOC Course](https://github.com/liuyubobobo/Play-with-Machine-Learning-Algorithms)

