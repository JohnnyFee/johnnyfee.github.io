---
layout: post
title: 机器学习算法 - SVM
tags: [python, language, machine learning]
category: AI
---

## SVM

SVM（支撑向量机） 是 Supported Vector Machine 的缩写。可同时解决分类和回归问题。SVM 尝试寻找一个最优的决策边界，这个边界距离两个类别最近的样本最远。

对于以下分类样本，决策边界不止一个，这称为不适定问题。这两条边界直线对应的模型可能都没有较好的泛化能力，因为两条直线离样本数据太近，离红色比较近的直接可能造成本应该数据红色的点判断为蓝色的点，离蓝色近的直线也有类似的问题。

<img src="../resources/images/image-20200217180723913.png" alt="image-20200217180723913" style="zoom:30%;" />

在逻辑回归中，是通过概率函数（sigmoid）建模的损失函数的最小值来唯一确定决策边界。支撑向量解决这个问题的方法与此不同。SVM 的目的是找到离红色和蓝色的样本点均尽可能较远的边界，从而带来比较好的泛化能力。（背后的统计理论请参考相应资料）

<img src="../resources/images/image-20200217181639500.png" alt="image-20200217181639500" style="zoom:30%;" />

样本中离 SVM 所求的决策边界最近的点均尽可能远，如上图中两个红色和蓝色到边界的具体一样。

<img src="../resources/images/image-20200217182341953.png" alt="image-20200217182341953" style="zoom:30%;" />

与 SVM 决策边界平行，并且经过离边界最近的点称为支撑向量。SVM最优决策边界由这些支撑向量组成一个区域所定义。

<img src="../resources/images/image-20200217182821880.png" alt="image-20200217182821880" style="zoom:30%;" />

支撑向量到决策边界的距离成为 d，支撑向量之间的距离成为 margin，SVM 的目标是最大化 margin。

SVM 算法的基础是找到支撑向量，我们称可以找到支撑向量的问题为线性可分问题，对应的 SVM 方法称为 Hard Margin SVM。对于一些线性不可分问题，我们可以转化为线性可分问题，这种 SVM 方法称为 Soft Margin SVM。

## 工具

- [LaTeX/Mathematics - Wikibooks, open books for an open world](https://en.wikibooks.org/wiki/LaTeX/Mathematics)
- [Play-with-Machine-Learning-Algorithms: Code of my MOOC Course](https://github.com/liuyubobobo/Play-with-Machine-Learning-Algorithms)
