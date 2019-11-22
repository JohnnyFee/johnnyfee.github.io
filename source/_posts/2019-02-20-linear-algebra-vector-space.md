---
layout: post
title: Linear Algebra 线性代数
tags: [math]
category: Math
---

课程：[麻省理工公开课：线性代数_全35集_网易公开课](http://open.163.com/special/opencourse/daishu.html)

## 向量空间 Subspaces

向量空间必须满足加法和数乘封闭，v + w and cv are in the space, 或者说 all combinations cv + dw are in the space. **向量空间必须穿过原点。**

$R^2$ = all 2-dimension real vectors.

​      = x, y 平面

![image-20190220112827552](https://ws1.sinaimg.cn/large/006tKfTcgy1g0cqa11wukj30ay056jto.jpg)

如：
$$
\begin{bmatrix}
3\\ 
2
\end{bmatrix},
\begin{bmatrix}
0\\ 
0
\end{bmatrix},
\begin{bmatrix}
π\\ 
e
\end{bmatrix}
$$


同理：

$R^3$= all vectors with 3 components.

$R^n$=all column vectors with n real components.

一个向量空间中的向量经过加法和数乘后仍然在向量空间中，也就是对线性组合封闭。

向量子空间：$R^n$向量空间的子空间。

比如一条$R^2$内经过原点的直线，就是向量空间$R^2$的子空间，因为直线上的向量满足加法和数乘的封闭性。

![image-20190220113510921](https://ws4.sinaimg.cn/large/006tKfTcgy1g0cqgwhncwj30e907eaem.jpg)

并不是所有的直线都能构成子空间，比如不经过原点的直线：

![image-20190220113744468](https://ws3.sinaimg.cn/large/006tKfTcgy1g0cqjkf7bhj30em086ter.jpg)

Subspaces of $R^2$:

1. all of $R^2$. 最大子空间
2. Any line through $[0,0]^T$
3. zero vector only. 最小子空间

Subspances of $R^3$:

1. $R^3$
2. 过原点的平面
3. 过原点的直线
4. 原点

## 列空间

可以根据矩阵 A 来构造子空间，其中一种方法，是通过列向量构造。使用下列矩阵构造$R^3$的子空间：
$$
A=
\begin{bmatrix}
	1 & 3 \\
    2 & 3\\
    4 & 1
\end{bmatrix}
$$
A 的所有列向量的线性组合构成一个子空间：
$$
x\begin{bmatrix}
	1 \\
    2\\
    4
\end{bmatrix}
+
y\begin{bmatrix}
	1 \\
    2\\
    4
\end{bmatrix}
$$
在几何上，这个子空间是由这两个列向量决定的面。

通过这种方法得到的子空间称为列空间，C(A)。

任意两个不同的子空间的并集 $P \cup L$ 不是子空间, 交集 $P \cap L$ 是子空间。

考虑下面这个矩阵的子空间：
$$
\begin{bmatrix}
	1 & 1 & 2 \\
    2 & 1 & 3\\
    3 & 1 & 4\\
    4 & 1 & 5
\end{bmatrix}
$$
Does Ax  = b have a solution for every b?   No. 因为有4个方程，但只有三个未知数，所有并不总是有解。
$$
\begin{bmatrix}
	1 & 1 & 2 \\
    2 & 1 & 3\\
    3 & 1 & 4\\
    4 & 1 & 5
\end{bmatrix}
\begin{bmatrix}
x_1 \\
x_2 \\
x_3
\end{bmatrix}
=
\begin{bmatrix}
b_1 \\
b_2 \\
b_3 \\
b_4
\end{bmatrix}
$$
那什么 b 能让方程组有解呢？Ax=b有解，当且仅当b属于A的列向量(b in C(A))，除了零向量。

由于这个矩阵的第三列是第一列和第二列的和，所以第三列可以去除，所以有该矩阵构成的子空间为$R^4$中的二维子空间。

## 零空间 Null Space

零空间是除列空间外，构建子空间的另外一种方法。

All x solutions to Ax=0.

对于以下矩阵
$$
\begin{bmatrix}
	1 & 1 & 2 \\
    2 & 1 & 3\\
    3 & 1 & 4\\
    4 & 1 & 5
\end{bmatrix}
\begin{bmatrix}
x_1 \\
x_2 \\
x_3
\end{bmatrix}
=
\begin{bmatrix}
0 \\
0 \\
0 \\
0
\end{bmatrix}
$$
A 的零空间，N(A) 为：
$$
\begin{bmatrix}
0 \\
0 \\
0
\end{bmatrix},
\begin{bmatrix}
1 \\
1 \\
-1
\end{bmatrix}
...
$$
所有的解可以表示为：
$$
\begin{bmatrix}
c \\
c \\
-c
\end{bmatrix}
$$
A 的零空间属于$R^3$，为三维空间中的一条直线。

Check tat solutions to Ax=0 always give a subspace.

证明过程：

> Av=0, Aw=0 => A(v+w) = Av+Aw=0
> Av =0, A(cv)=cAv=0

加入 b 不再是 0 向量，比如：

$$
\begin{bmatrix}
	1 & 1 & 2 \\
    2 & 1 & 3\\
    3 & 1 & 4\\
    4 & 1 & 5
\end{bmatrix}
\begin{bmatrix}
x_1 \\
x_2 \\
x_3
\end{bmatrix}
=
\begin{bmatrix}
1 \\
2 \\
3 \\
4
\end{bmatrix}
$$
那么 x 的解不构成子空间，因为 0 不是 x 的解，所以不构成任何子空间。


## 工具

- [LaTeX/Mathematics - Wikibooks, open books for an open world](https://en.wikibooks.org/wiki/LaTeX/Mathematics)