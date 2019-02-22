---
layout: post
title: Linear Algebra 线性代数
tags: [math]
category: Math
---

课程：[麻省理工公开课：线性代数_全35集_网易公开课](http://open.163.com/special/opencourse/daishu.html)

线性代数的作用求解线性方程组。

用于表示线性方程组的方法：

- Row Picture
- **Column Picture**
- Matrix form

给定一下方程
$$
\begin{cases}
    2x-y=0 \\
    -x+2y=3
  \end{cases}
$$

**使用矩阵方式表示：**
$$
\begin{bmatrix}
	2 & -1\\
	-1 & 2           
\end{bmatrix}
\begin{bmatrix}
	x\\
	y
\end{bmatrix}
=
\begin{bmatrix}
	0\\
	3
\end{bmatrix}
$$
即
$$
Ax=b
$$

**Row Picture：**

$$
\begin{bmatrix}
	1 & 2 & 7\\
\end{bmatrix}
\begin{bmatrix}
	2 & -1\\
	-1 & 2\\
	4 & 3
\end{bmatrix}
=
1
\begin{bmatrix}
	2 & -1
\end{bmatrix}
+
2
\begin{bmatrix}
	-1 & 2
\end{bmatrix}
+
7
\begin{bmatrix}
	4 & 3
\end{bmatrix}
$$

用几何图形表示：

![image-20190215151259926](https://ws3.sinaimg.cn/large/006tKfTcly1g074o77haoj307g05bq4f.jpg)

两条直接的交点即为方程组的解。

**Cololum Picure:**
$$
x
\begin{bmatrix}
	2 \\
	-1
\end{bmatrix}
+
y
\begin{bmatrix}
	-1 \\
	2
\end{bmatrix}
=
\begin{bmatrix}
	0 \\
	3
\end{bmatrix}
$$

Column Picture 的表示方式就是找到正确的系数 x 和  y，来组合向量[2 -1]^T^ 和 [-1, 2]^T^，从而得到目标向量[0, 3]^T^，即要找到正确的**线性组合（Linear Combination of Columns）**。

几何形式：

$$
1
\begin{bmatrix}
	2 \\
	-1
\end{bmatrix}
+
2
\begin{bmatrix}
	-1 \\
	2
\end{bmatrix}
=
\begin{bmatrix}
	0 \\
	3
\end{bmatrix}
$$


我们先把结果替代进去，向量 [2, -1]^T^+2[-1, 2]^T^表示左移 2，上移 4，得到向量 b=[0, 3]^T^。

![image-20190215163343168](https://ws3.sinaimg.cn/large/006tKfTcly1g07701iz1ij307s05jwfz.jpg)

三元线性方程同理。

## 转置

矩阵A的**转置**是另一个矩阵$A^T$，由下列等价动作建立:

- 把*A*的横行写为*A*T的纵列
- 把*A*的纵列写为*A*T的横行

![](https://upload.wikimedia.org/wikipedia/commons/e/e4/Matrix_transpose.gif)

例如：
$$
\begin{bmatrix}
	1 & 3 \\
	2 & 3\\
	4 & 1
\end{bmatrix}^T
=
\begin{bmatrix}
	1 & 2 & 4 \\
	3 & 3 & 1
\end{bmatrix}^T
$$
转置公式：
$$
(A^T)_{ij}=A_{ji}
$$

## 对称矩阵 Symmetic Matrics

$A^T=A$的矩阵称为堆成矩阵。

如：
$$
\begin{bmatrix}
	3 & 1 & 7 \\
	1 & 2 & 9\\
	7 & 9 & 4
\end{bmatrix}
$$
$R^TR$ is always symmetric, R 为长方形矩阵，如：
$$
\begin{bmatrix}
	1 & 3 \\
	2 & 3\\
	4 & 1
\end{bmatrix}
\begin{bmatrix}
	1 & 2 & 4 \\
	3 & 3 & 1
\end{bmatrix}
=
\begin{bmatrix}
	10 & 11 & 7 \\
	11 &  &   \\
	7 &  & 
\end{bmatrix}
$$
证明如下：
$$
(R^TR)^T=R^T(R^T)^T=(R^TR)^T
$$


## 矩阵乘法

A~mxn~·B~n*p~=C~m*p~

### 点积

计算公式：

$$
\begin{align*}
C_{3,4} &= (Row3 of A)·(Column 4 of B)\\
&= a_{3,1}b_{1,4}+a_{3,2}b_{2,4}~+…\\
&= \sum_{k=1}^{n} a_{3k}b_{k4}
\end{align*}
$$

计算 Ax：

$$
\begin{bmatrix}
	2 & 5\\
	1 & 3
\end{bmatrix}
\begin{bmatrix}
	1\\
	2
\end{bmatrix}
=
\begin{bmatrix}
	2*1 + 5*2 \\
	1*1 + 3* 2
\end{bmatrix}
=
\begin{bmatrix}
	12 \\
	7
\end{bmatrix}
$$

### 列线性组合

矩阵乘以向量 Ax：

$$
\begin{bmatrix}
	2 & 5\\
	1 & 3
\end{bmatrix}
\begin{bmatrix}
	1\\
	2
\end{bmatrix}
=
1
\begin{bmatrix}
	2 \\
	1
\end{bmatrix}
+
2
\begin{bmatrix}
	5 \\
	3
\end{bmatrix}
=
\begin{bmatrix}
	12 \\
	7
\end{bmatrix}
$$

Ax is a cominations of columns of A. 对于维数较少的向量可以使用各种方法，但以后对于较多维数的向量，推荐使用列向量的线性组合的方法。

对于矩阵相乘，我们把 B 考虑为 p 个单独的列向量，用 A 乘以每个列向量，得到 p 列的答案。

$$
\begin{bmatrix}
	a_{1,1} & a{1,2} & ...\\
	a_{2,1} & a{2,2} & ...\\
	a_{3,1} & a{3,2} & ...
\end{bmatrix}
\begin{bmatrix}
	b_{1,1} & b{1,2} & ...\\
	b_{2,1} & b{2,2} & ...\\
	b_{3,1} & b{3,2} & ...
\end{bmatrix}
=
\begin{bmatrix}
	Ab_{:1}, Ab_{:2}, ...
\end{bmatrix}
$$

Columns of C are combinations of columns A. C 中的每一列相当于 A 中每个列向量的线性组合，即可简化为 Ab=c, b 即为线性组合的解。

### 行线性组合

Rows of C are combinatitons of rows of B.
$$
\begin{bmatrix}
	a_{1,1} & a{1,2} & ...\\
	a_{2,1} & a{2,2} & ...\\
	a_{3,1} & a{3,2} & ...
\end{bmatrix}
\begin{bmatrix}
	b_{1,1} & b{1,2} & ...\\
	b_{2,1} & b{2,2} & ...\\
	b_{3,1} & b{3,2} & ...
\end{bmatrix}
=
\begin{bmatrix}
	a_{1:}B \\
	a_{2:}B \\
    ...
\end{bmatrix}
$$

### 列乘行

(Columns of A)~mx1~ * (Rows of B)~1xp~

$$
\begin{bmatrix}
	2 \\
	3 \\
	4
\end{bmatrix}
\begin{bmatrix}
	1 & 6
\end{bmatrix}
=
\begin{bmatrix}
	2 & 12 \\
	3 & 18 \\
	4 & 24
\end{bmatrix}
$$

这是个特殊的矩阵，结果矩阵的每行是 B 的倍数，每列是 A 的倍数，即线性组合关系。

AB = Sum of (Columns of A)~mx1~ * (Rows of B)~1xp~

$$
\begin{bmatrix}
	2 & 7\\
	3 & 8\\
	4 & 9
\end{bmatrix}
\begin{bmatrix}
	1 & 6 \\
	0 & 0
\end{bmatrix}
=
\begin{bmatrix}
	2 \\
	3 \\
	4
\end{bmatrix}
\begin{bmatrix}
	1 & 6
\end{bmatrix}
+
\begin{bmatrix}
	7 \\
	8 \\
	9
\end{bmatrix}
\begin{bmatrix}
	0 & 0
\end{bmatrix}
$$

### 分块乘法 Block

$$
\begin{array}{c|c}
A_1 & A_2 \\ 
\hline
A_3 & A_4
\end{array}
\begin{array}{c|c}
B_1 & B_2 \\ 
\hline
B_3 & B_4
\end{array}
=
\begin{array}{c|c}
A_1B_1+A_2B_3 & ... \\ 
\hline
... & ...
\end{array}
$$

## 矩阵消元 Emilation

消元法求解任意元的方程组。所有计算机程序使用的都是该方法求解。

求解方程组：

```
x +2y + z = 2
3x+8y + z = 12
   4y + z = 2
```

使用矩阵表示：

$$
\begin{bmatrix}
	1 & 2 & 1 \\
	3 & 8 & 1 \\
	0 & 4 & 1
\end{bmatrix}
\begin{bmatrix}
	x \\
	y \\
	z 
\end{bmatrix}
=
\begin{bmatrix}
	2 \\
	12 \\
	2
\end{bmatrix}
$$

只要矩阵的可逆的，则用消元法总是可以求解。

首先将目标向量和矩阵 A 合并为一个增广矩阵 Augmented matrix：

$$
\begin{bmatrix}
	1 & 2 & 1 & 2\\
	3 & 8 & 1 & 12\\
	0 & 4 & 1 & 2
\end{bmatrix}
$$

取主元 A~1,1~

1. 消除 A~2,1~ 的元素： 第 2 行 - 3 * 第一行
2. 消除 A~3,1~ 的元素，已经是 0，不用做。

取主元 A~2,2~

1. 消除 A~3,2~，A~3:~ - A~2~ * 2。

$$
\begin{bmatrix}
	1 & 2 & 1 & 2\\
	3 & 8 & 1 & 16\\
	0 & 4 & 1 & 2
\end{bmatrix}
→
\begin{bmatrix}
	1 & 2 & 1 & 2 \\
	0 & 2 & -2 & 6\\
	0 & 4 & 1 & 2
\end{bmatrix}
→
Do Nothing
→
\begin{bmatrix}
	1 & 2 & 1 & 2\\
	0 & 2 & -2 & 6\\
	0 & 0 & 5 & -10
\end{bmatrix}
$$

我们把上述过程记为：

A → U，U 为上三角矩阵。

消元之后，还需要**回代**，最后的方程变为：

```
x + 2y + z  = -2
    2y - 2z = 6
         5z = -10
```

$$
b=
\begin{bmatrix}
	2 \\
	1 \\
	-2
\end{bmatrix}
$$

使用消元法时，主元不能为 0。如果主元为 0，可以通过行交换使主元不为 0。如果通过行交换都无法得到非 0 的主元，则无法得到唯一解，此矩阵不可逆。

如：

$$
\begin{bmatrix}
	1 & 2 & 1 \\
	3 & 8 & 1 \\
	0 & 4 & -4
\end{bmatrix}
$$

在选定 A~2,2~ 为主元时，第三行都变成了 0。

## 矩阵变换 Exchange

在消元法中，矩阵之间的变换使用的是简记法。我们用矩阵变化表示上面的消元过程。

**取主元 A~1,1~，消除 A~2,1~ 的元素： 第 2 行 - 3 * 第 1 行**
$$
\begin{bmatrix}
	1 & 0 & 0\\
	-3 & 1 & 0\\
	0 & 0 & 1
\end{bmatrix}_{E_{2,1}}
\begin{bmatrix}
	1 & 2 & 1\\
	3 & 8 & 1\\
	0 & 4 & 1
\end{bmatrix}_A
=
\begin{bmatrix}
	1 & 2 & 1 \\
	0 & 2 & -2\\
	0 & 4 & 1
\end{bmatrix}
$$

1. 由于第一行不变，所以转换矩阵的第一行为 [1, 0, 0]
2. 同理，由于第三行不变，转换矩阵的第三行为 [0, 0, 1]
3. 根据 Row Picture，由于现在需要 Substract 3 * row1 from row2，所以第二行为 [-1, 2, 0]
4. 消除 A~3,1~ 的元素，已经是 0，不用做。

转化矩阵用 E~2,1~ 来表示，E~2,1~ 称为初等矩阵。

**取主元 A~2,2~，消除 A~3,2~ 的元素： 第 3 行 - 2 * 第  2 行**

$$
\begin{bmatrix}
	1 & 0 & 0 \\
	0 & 1 & 0\\
	0 & -2 & 1
\end{bmatrix}_{E_{3,2}}
\begin{bmatrix}
	1 & 2 & 1 \\
	0 & 2 & -2\\
	0 & 4 & 1
\end{bmatrix}
=
\begin{bmatrix}
	1 & 2 & 1\\
	0 & 2 & -2\\
	0 & 0 & 5
\end{bmatrix}
$$

转化矩阵用 E~3,2~ 来表示。

整个变化过程表示为：

E~3,2~( E~2,1~A)=U

根据乘法矩阵结合律可以变换为：

(E~3,2~E~2,1~)A=U

→EA=U

## 矩阵置换 Permutation

在消元过程中，当主元为 0 时，可以需要交换行来使主元非零，继续消元。

用来交换一个矩阵的行或列的矩阵称为交换矩阵。
$$
\begin{bmatrix}
	0 & 1\\
	1 & 0           
\end{bmatrix}
\begin{bmatrix}
	a & b\\
	c & d           
\end{bmatrix}
=
\begin{bmatrix}
	c & d\\
	a & b           
\end{bmatrix}
$$
以上说的都是行变换，假如要进行如下的列变换：
$$
\begin{bmatrix}
	a & b\\
	c & d           
\end{bmatrix}
\begin{bmatrix}
	0 & 1\\
	1 & 0           
\end{bmatrix}
=
\begin{bmatrix}
	b & a\\
	d & c           
\end{bmatrix}
$$
对于 3*3 的矩阵，有 6 中变换，每种变换相乘或者取逆的结果仍然是在这个 6 个变换矩阵中。
$$
\begin{bmatrix}
	1 & 0 & 0 \\
	0 & 1 & 0\\
	0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
	1 & 0 & 0 \\
	0 & 0 & 1\\
	0 & 1 & 0
\end{bmatrix}
\begin{bmatrix}
	0 & 1 & 0 \\
	1 & 0 & 0\\
	0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
	0 & 1 & 0 \\
	0 & 0 & 1\\
	1 & 0 & 0
\end{bmatrix}
\begin{bmatrix}
	0 & 0 & 1 \\
	1 & 0 & 0\\
	0 & 1 & 0
\end{bmatrix}
\begin{bmatrix}
	0 & 0 & 1 \\
	0 & 1 & 0\\
	1 & 0 & 0
\end{bmatrix}
$$

对于 4 阶矩阵，有 24 个变换举证。n 阶矩阵有 n! 种置换方法。

性质：置换矩阵的逆等于其转置。

$P^{-1}=P^T$

所以
$$
P^TP=I
$$

$$
\begin{bmatrix}
	1 & 0 & 0 \\
	0 & 0 & 1\\
	0 & 1 & 0
\end{bmatrix}
$$

对于需要行置换的消元过程记为：
$$
PA=LU
$$
P = 行重新排列了的单位矩阵。

对于任意可逆矩阵 A，均有这种形式。

## 逆 Inverses

> Can I solve Ax=b for every b?
>
> Do the linear combinations of the columns fill N dimension Space?

符合这两个条件的矩阵 A 称为可逆矩阵或非奇异矩阵。

对于一些方程组，以 3 维为例，每个方程表示一个平面，如何其中两个平面平行，则列向量的任意组合无法充满整个三维空间，改 矩阵即为不可逆的或者是奇异的。
$$
A^{-1}A=I=AA^{-1’}
$$

求以下矩阵的逆：
$$
\begin{bmatrix}
	1 & 0 & 0 \\
	-3 & 1 & 0\\
	0 & 0 & 1
\end{bmatrix}
$$

求解过程:

$$
\begin{bmatrix}
	1 & 0 & 0 \\
	-3 & 1 & 0\\
	0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
	1 & 0 & 0 \\
	3 & 1 & 0\\
	0 & 0 & 1
\end{bmatrix}
=
\begin{bmatrix}
	1 & 0 & 0 \\
	0 & 1 & 0\\
	0 & 0 & 1
\end{bmatrix}
$$

我们使用行变换的思路，第一行和第三行没变，第二行的意思的 -3 * Row1 + Row2，它的逆其实就是 3* Row1 + Row2。

**If you can find a vector x with Ax=0, x≠0, then the matrix is no inversable(Singular).**

如：

$$
Ax=
\begin{bmatrix}
	1 & 3 \\
	2 & 6
\end{bmatrix}
\begin{bmatrix}
	3 \\
	-1
\end{bmatrix}
=
\begin{bmatrix}
	0 \\
	0
\end{bmatrix}
$$

矩阵 A，存在向量 x，使 Ax=0，所以 A 是奇异的或者不可逆的。

假设要求解以下矩阵的逆，

$$
\begin{bmatrix}
	1 & 3 \\
	2 & 7
\end{bmatrix}
\begin{bmatrix}
	a & c \\
	b & d
\end{bmatrix}
=
\begin{bmatrix}
	1 & 0 \\
	0 & 1
\end{bmatrix}
$$

Gausss-Jordan can solves two equations at once. 高斯-若当能同事处理两个方程组。

对于高斯来说，需要求解一下两个方程组：

$$
\begin{bmatrix}
	1 & 3 \\
	2 & 7
\end{bmatrix}
\begin{bmatrix}
	a \\
	b
\end{bmatrix}
=
\begin{bmatrix}
	1 \\
	0
\end{bmatrix}
\\
\begin{bmatrix}
	1 & 3 \\
	2 & 7
\end{bmatrix}
\begin{bmatrix}
	c \\
	d
\end{bmatrix}
=
\begin{bmatrix}
	0 \\
	1
\end{bmatrix}
$$

若尔当让这两个方程同时求解。

$$
\begin{array}{c c|c c}
1 & 3 & 1 & 0 \\ 
2 & 7 & 0 & 1
\end{array}
=
\begin{array}{c c|c c}
1 & 3 & 1 & 0 \\ 
0 & 1 & -2 & 1
\end{array}
$$

使用消元法，高斯做到这一步就够了。若尔当继续向上消元：

$$
\begin{array}{c c|c c}
1 & 3 & 1 & 0 \\ 
0 & 1 & -2 & 1
\end{array}
=
\begin{array}{c c|c c}
1 & 0 & 7 & -3 \\ 
0 & 1 & -2 & 1
\end{array}
$$

A 的逆即为：

$$
\begin{bmatrix}
7 & -3 \\ 
-2 & 1
\end{bmatrix}
$$

## A 的 LU 分解

AB 的逆为 B^-1^A^-1^：
$$
AB(B^{-1}A^{-1})=I
$$

A^T^的逆为 A^-1^ 的转置，A 的逆的转置就是 A 转置的逆：

$$
AA^{-1}=I \\

(A^{-1})^TA^T=I
$$

矩阵变换 E~2,1~ A=U

$$
\begin{bmatrix}
1 & 0 \\ 
-4 & 0
\end{bmatrix}_E
\begin{bmatrix}
2 & 1 \\ 
8 & 7
\end{bmatrix}_A
=
\begin{bmatrix}
2 & 1 \\ 
0 & 3
\end{bmatrix}_U
$$

A=LU 形式

$$
\begin{bmatrix}
2 & 1 \\ 
8 & 7
\end{bmatrix}_A
=
\begin{bmatrix}
1 & 0 \\ 
4 & 1
\end{bmatrix}_L
\begin{bmatrix}
2 & 1 \\ 
0 & 3
\end{bmatrix}_U
$$

L 为 E 的逆。

U 表示 Upper，上三角；L 表示 Lower，下三角。L 的对角线均为 1，U 的对角线为主元。

如果将主元单独出来，则变成 A = LDU

$$
\begin{bmatrix}
2 & 1 \\ 
8 & 7
\end{bmatrix}_A
=
\begin{bmatrix}
1 & 0 \\ 
4 & 1
\end{bmatrix}_L
\begin{bmatrix}
2 & 0 \\ 
0 & 3
\end{bmatrix}_D
\begin{bmatrix}
1 & 1/2 \\ 
0 & 1
\end{bmatrix}_{U'}
$$

DU'=U，可以根据列变换来计算出 U'。

假设 A 是三维矩阵，则：
$$
E_{32}E_{31}E_{21}A=U
$$
假设没有行交换。
$$
\begin{align*}
A &= E_{21}^{-1}E_{32}E_{31}^{-1}E_{32}^{-1}U \\
&= LU
\end{align*}
$$
假设E~31~ 是单位矩阵，则左边
$$
E=E_{32}E_{21}=
\begin{bmatrix}
1 & 0 & 0 \\ 
0 & 1 & 0 \\
0 & -5 & 1
\end{bmatrix}_{E_{32}}
\begin{bmatrix}
1 & 0 & 0 \\ 
-2 & 1 & 0 \\
0 & 0 & 1
\end{bmatrix}_{E_{21}}
=
\begin{bmatrix}
1 & 0 & 0 \\ 
-2 & 1 & 0 \\
10 & -5 & 1
\end{bmatrix}_{E}\\
$$


使用 LU 的形式：
$$
L=E_{21}^{-1}E_{32}^{-1}=
\begin{bmatrix}
1 & 0 & 0 \\ 
2 & 1 & 0 \\
0 & 0 & 1
\end{bmatrix}_{E_{21}^{-1}}
\begin{bmatrix}
1 & 0 & 0 \\ 
0 & 1 & 0 \\
0 & 5 & 1
\end{bmatrix}_{E_{32}^{-1}}
=
\begin{bmatrix}
1 & 0 & 0 \\ 
2 & 1 & 0 \\
0 & 5 & 1
\end{bmatrix}_L
$$
两种形式可以表示为：
$$
EA=U\\
A=LU
$$
如果不存在行互换，则消元乘数可以直接写入 L 中，如上例中的 L，而 E 则不具备这样的特性，所以用 LU  来表示消元步骤更先进。

How many operations on n*n martrix A? 解某方程组n为一百万，需要1秒、1小时还是 1周？

对于 100*100 的矩阵，消元的步骤为 99+98+97+...

第一次消元，需要变动的元素个数接近 $100^2$；第二次接近 ；$99^2$...

总的计算次数为：
$$
n^2+(n-1)^2+...+1^2=\frac{1}{2}n^3
$$
对于 Ax=b，除了A的变换，常量 b 的计算次数为 $n^2$。

## 工具

- [LaTeX/Mathematics - Wikibooks, open books for an open world](https://en.wikibooks.org/wiki/LaTeX/Mathematics)