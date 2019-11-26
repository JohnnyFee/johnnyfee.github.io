---
layout: post
title: Linear Algebra 线性代数
tags: [math]
category: Math
---

课程：[麻省理工公开课：线性代数_全35集_网易公开课](http://open.163.com/special/opencourse/daishu.html)

教程：[Linear Algebra – Medium](https://medium.com/linear-algebra)

## 线性方程

[Part 1 : Linear equation of two variables and Matrices](https://medium.com/linear-algebra/part-1-linear-equation-of-two-variables-and-matrices-d8de21eb8d51)

*线性代数* 的作用是求解 *线性方程组(system of linear equations)*。

比如以下线性方程组：


$$
x-2y = 6 →(1) \\
x-y = 4 →(2) \\
x+y = 0 →(3)
$$
*矩阵（Metrices）* 是元素在行和列中的排列。元素可以是任何东西（常量，数字，变量等）。

可以用举证来表示线性方程。

比如系数端（coefficient side ）用矩阵表示为：
$$
\begin{bmatrix}
	1 & -2\\
	1 & -1\\
	1 & 1
\end{bmatrix}
$$
常数端（constant side）用矩阵表示为：
$$
\begin{bmatrix}
	6 \\
	4 \\
	0
\end{bmatrix}
$$
可以将两个矩阵一起写成一个增广矩阵( [augmented matrix](https://en.wikipedia.org/wiki/Augmented_matrix))，用“ |”或虚线分隔。
$$
\left[\begin{array}{crr|r}
1 & -2 && 6\\
1 & -1 && 4 \\
1 &  1 && 0
\end{array}\right]
$$


## 矩阵运算

### 加法和减法

[Part 2 : Operations on Matrices - Linear Algebra - Medium](https://medium.com/linear-algebra/part-2-operations-on-matrices-3caab542aebd)

矩阵的加法和减法的运算方法是将相同位置的元素相加减。

行列数相同的矩阵才允许做加减法。

![img](../resources/images/1*hUtgcNIxknjUZu-Wewxm1Q.png)

=



![img](../resources/images/1*eQFxiJSwD6Mohnm5j3qzQg.png)

减法同理。

### 与标量的乘法和除法

标量与矩阵相乘，结果为标量与矩阵中的每个元素相乘。

![img](../resources/images/1*e87O1tDfgJ8PXivwIBtFnA.png)

标量与矩阵的除法与乘法类似，如：

```
 J/3 = (1/3) × J = K
```

### 乘法

两矩阵相乘 A · B 必须满足 A 的列数和 B 的行数相同，否则不可乘。

如：
$$
A~mn~·B~np~=C~mp~
$$


如计算 C~3,4~，为 A 的 3 行 与 B 的第三列的点积：
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

#### 列线性组合

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
Ax is a cominations of columns of A. 对于维数较少的向量可以使用这种方法，但以后对于较多维数的向量，推荐使用列向量的线性组合的方法。

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

#### 行线性组合

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

#### 列乘行

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

#### 分块乘法 Block

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

### 矩阵的除法

矩阵除法与标量除法不同。矩阵 B 除以矩阵 A（B / A），也可以写成 B×A^⁻1^。其中，A^-1^是A的逆矩阵。

Taking an example

![img](../resources/images/1*GsW1KrpiaqTqW0sJX72R3Q-20191126112214504.png)

This is equivalent to multiplication of matrix B with inverse of A.

As

![img](../resources/images/1*MibBJHMxP5jw0rNlauz4sQ.png)

## 矩阵的类型

如果一个矩阵的行数和列数相同，我们称该矩阵为 *正方形矩阵（Square matrices， 方阵）*，否则我们称之为 *长方形矩阵（Rectangular matrices）*。

### 对角线

行和列相同的所有元素，形成矩阵的 *对角线（Diagonal of  a matrix）*。如以下矩阵：

![img](../resources/images/1*8RWNMmWLGa4chA5QYwYSwQ.png)

a11, a22, a33 形成上述矩阵的对角线。

矩形矩阵的对角线的查找方法类似：

![img](../resources/images/1*mdTwXCRW1vhjoKH-4kATww.png)

### 单位矩阵

对角元素是 1 ，其他元素均为 0 的**方阵**称为 *单位矩阵（Identity matrix）*。用 **I** 表示。如：

![img](../resources/images/1*FoSu_wiKRln_Y_FA-NggFQ.png)

任何方阵乘以相应的单位矩阵结果是该矩阵本身。就像任何数乘以 1，结果不变一样。

```
Matrix A × I = matrix A
```

### 零矩阵

所有元素均为  0  的矩阵称为 *零矩阵（Zero or Null Matrices）*。零矩阵可以是矩形矩阵。

### 三角矩阵

对角线以下均为 0，对角线或对角线以上(in and above)具有非零元素的矩阵称为 *上三角矩阵（Upper Triangualr Matrices）*，记为  **U**。

对角线以上均为 0，对角线或对角线以下(in and below)具有非零元素的矩阵称为 *下三角矩阵（Lower Triangualr Matrices）*，记为  **L**。

### 转置

矩阵的 *转置（Transpose）* 是将矩阵所有行改成列（列改成行）。For example, element at position **a12** (row 1 and column 2) will now be shifted to position **a21** (row 2 and column 1), **a13** to **a31**, **a21** to **a12** and so on.

转置时，只有对角线的元素保持不变。

A的转置矩阵记为$A^T$。

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

#### 对称矩阵 Symmetic Matrics

$A^T=A $的矩阵称为对称矩阵，即矩阵转置之后保持不变的矩阵称为对称矩阵。

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
(R^TR)^T=R^T(R^T)^T=R^TR
$$


#### 反对称矩阵

一个矩阵转置之后的结果为 -1 x 该矩阵，则称为该矩阵为 *反对称矩阵（Skew-symmetric Matrices， 斜对称矩阵）*。

```
matrix Aᵀ = (-1) × matrix A
// 即 
Aᵀ = -A
```

如：

![img](../resources/images/1*k9bNpRHA_QTo4LPpSG-xcQ.png)

反对称矩阵的对角线元素一定是 0，只有 0 x (-1) 才不会变。

## 张量、标量、向量

[Part 4B : Tensors, Scalars, Vectors, and Matrices - Linear Algebra - Medium](https://medium.com/linear-algebra/part-4b-tensors-scalars-and-vectors-68cf6c1f2be)

**Additional Resource :** [An Introduction to Tensors for Students of Physics and Engineering by Joseph C. Kolecki](https://www.grc.nasa.gov/www/k-12/Numbers/Math/documents/Tensors_TM2002211716.pdf)

### 张量

*张量（tensor）*是一个可以扩张为任意维数的数据（数字，函数等）的数组。数据的维数称为张量的 *阶* 或 *秩*（rank of tensor）。

*0 阶张量（Rank 0 tensor）*：0 维张量。如 数字：

![img](../resources/images/1*NHiz-7zr9KOs-mZAmYC0Mg.png)

*1 阶张量（Rank 1 tensor）*：仅可以扩展为 1 维的张量。如：

![img](../resources/images/1*5Ve2VqtS3BKvWo-s-D3JDg.png)

![img](../resources/images/1*aNMwE3t3Sh23q-eytn1lWA.png)

*2 级张量（Rank 2 tensor）*：

![img](../resources/images/1*4POSt42PKvTY1yfIV7fo4Q.png)

*3 级张量（Rank 3 tensor）*：

![img](../resources/images/1*yrbDX4OZCsvYktC77kDx8Q.png)

3 阶张量具有立体空间。

超过 3 阶的张量很难可视化。

### 标量

0阶张量称为 *标量（Scalar）*。在物理学中，各种量都用标量表示，例如：距离（500 km），温度（10ºC），速度（34 km / h）等。

### 向量

1 阶张量称为 *矢量（Vector）*。例如速度（10 m / s），位移（向东54 m），电磁场（1 V / m）。

标量和向量的区别：标量不需要额外的信息（如方向）表示；向量除了大小还需要方向（如点场）来表示。

向量由粗体字母(**A**)或 $\vec A$ 表示。

向量只是具有一行（称为列向量）或一列（称为行向量）的矩阵。

向量 (0.5, 0.5) 用来来表示为:

![img](../resources/images/1*stk14TMH47aDiwTty_uN_w.png)

### 矩阵

2 阶张量称为 *矩阵（Matrix）*。

超过 2 阶的张量没有特别的名字。



## 行图和列图

[Part 5 : Row Picture and Column Picture - Linear Algebra - Medium](https://medium.com/linear-algebra/part-5-row-picture-and-column-picture-899e6d834564)

用于表示线性方程组的方法：

- Row Picture
- Column Picture

给定以下方程


$$
\begin{cases}
3x-5y = 6 →(1) \\
x+y = 4 →(2)\\
3x+y = 0 →(3)
  \end{cases}\begin{cases}
3x-5y = 6 →(1) \\
x+y = 4 →(2)\\
3x+y = 0 →(3)
  \end{cases}
$$

### Row Picture

In row picture representation we make a coefficient matrix, a variable matrix and a constant matrix. 

以上线性方式使用 Row Picture 来表示：

![img](../resources/images/1*z-qiGZfJnNVJGFGoZdorKA.png)

即
$$
Ax=b
$$

### 

The row picture of (1), (2) and (3) could be plotted on graph as （**Row picture on graph**）:

![img](../resources/images/1*x5k7D6D-uYkFbEVwXSikhw-20191122105030444.png)

To find solution of system of linear equations from Row picture, we look at graph and see if there is any one point of intersection for all the lines, that point is called solution for the system of equations.

If there is no common point, then there is no solution for the system of equations (as seen in the case above).

### Cololum Picure

A column picture is where coefficient matrix if formed separately for each variable. After that variables are multiplied with their coefficient matrices ([scalar multiplication](https://cdn-images-1.medium.com/max/800/1*e87O1tDfgJ8PXivwIBtFnA.png)) and added together. Then, it is equated to constant matrix.

Taking the system of linear equations (1), (2) and (3), the column picture would be as follows :

![img ](../resources/images/1*UxQ0SCIhsR0TAkxk-dzzqw.png)

>  “x” and “y” are scalars being multiplied with their corresponding coefficient matrices

Column Picture 的表示方式就是找到正确的系数 x 和  y，来组合向量[3 1 3]^T^ 和 [-5, 1, 1]^T^，从而得到目标向量[6, 4, 0]^T^，即要找到正确的**线性组合（Linear Combination of Columns）**。



几何形式(**Column picture on graph**)：

To show column picture on graph, we treat individual coefficient matrices as [vectors](https://medium.com/linear-algebra/part-4b-tensors-scalars-and-vectors-68cf6c1f2be) and plot those vectors on graph.

![img](../resources/images/1*plQThMshpk5RvZCqPykcdA.png)

> Blue vector is coefficient matrix of X ,Red vector is coefficient matrix of Y and Green Vector is Constant matrix.

为了从 Coloumn Pictire 中找到方程组的解，我们将系数矩阵与变量（x和y）的不同值相乘并将它们相加。 如果结果等于常数矩阵，则x和y的值称为线性方程组的解。

## 求解方程组

[Part 6 : Gaussian Elimination - Linear Algebra - Medium](https://medium.com/linear-algebra/part-6-gaussian-elimination-b1ad4a279a74)

*高斯消元 Gaussian Emilation* 用于求解任意元的方程组。所有计算机程序使用的都是该方法求解。

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

只要矩阵是可逆的，则用消元法总是可以求解。

首先将目标向量和矩阵 A 合并为一个增广矩阵 Augmented matrix：

$$
\begin{bmatrix}
	1 & 2 & 1 & | & 2\\
	3 & 8 & 1 & | & 12\\
	0 & 4 & 1 & | & 2
\end{bmatrix}
$$

取主元 A~1,1~

1. 消除 A~2,1~ 的元素： 第 2 行 - 3 * 第 1 行
2. 消除 A~3,1~ 的元 素，已经是 0，不用做。

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
$$



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

我们把上述过程记为：A → U，U 为上三角矩阵。

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

当出现主元为 0 ，无法消元时，可以先进行行交换，然后再进行消元。如：

![img](../resources/images/1*gn6XY-lEnIoET5DgxCYgkw.png)

![img](../resources/images/1*71AX5gffOAAd5mAjRasooA.png)

![img](../resources/images/1*EVR4Wtd9xcwHTujQX1yivw-20191126111331384.png)



## 矩阵变换 Exchange

在消元法中，矩阵之间的变换使用的是简记法。我们用矩阵变换表示上面的消元过程。

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

[Part 7 : Inverses and Gauss-Jordan Elimination - Linear Algebra - Medium](https://medium.com/linear-algebra/part-7-inverses-and-gauss-jordan-elimination-39c5162428e0)

如果一个矩阵 **A** 和 另一个矩阵 **B** 的乘积是单位矩阵 **I**，则 **B** 为 **I** 的逆矩阵，**B** 记为 **A**^-1^。

> Can I solve Ax=b for every b?
>
> Do the linear combinations of the columns fill N dimension Space?

符合这两个条件的矩阵 A 称为可逆矩阵或非奇异矩阵。

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

对于一些方程组，以 3 维为例，每个方程表示一个平面，如何其中两个平面平行，则列向量的任意组合无法充满整个三维空间，该矩阵即为不可逆的或者是奇异的。

矩阵乘法是不可交换的，但矩阵和逆的乘法是可以交换的。

只有正矩阵有逆。
$$
A^{-1}A=I=AA^{-1}
$$

求以下矩阵的逆：

$$
\begin{bmatrix}

​	1 & 0 & 0 \\

​	-3 & 1 & 0\\

​	0 & 0 & 1

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

​	1 & 0 & 0 \\

​	3 & 1 & 0\\

​	0 & 0 & 1

\end{bmatrix}

=

\begin{bmatrix}

​	1 & 0 & 0 \\

​	0 & 1 & 0\\

​	0 & 0 & 1

\end{bmatrix}
$$



我们使用行变换的思路，第一行和第三行没变，第二行的意思的 -3 * Row1 + Row2，它的逆其实就是 3* Row1 + Row2。

求以下矩阵的逆：
$$
\begin{bmatrix}
	1 & 3 & 6 \\
	1 & 2 & 5\\
	2 & 9 & 4
\end{bmatrix}
$$



1. 将矩阵及其单位矩阵构成增强矩阵。
   $$
   \begin{bmatrix}
   	1 & 3 & 6 & 1 & 0 & 0\\
   	1 & 2 & 5 & 0 & 1 & 0\\
   	2 & 9 & 4 & 0 & 0 & 1
   \end{bmatrix}
   $$

2. 执行高斯消除，得到下三角形式。

   消除第一列：

   ![img](../resources/images/1*SMCcbgjufcJpc_ApgT_dyw.png)

   ![img](../resources/images/1*Z3VEmYE0g6gQhH2xp98Ihg-20191126133903948.png)

   ![img](../resources/images/1*PHYr72kHfzWh5RhsKbAuSQ-20191126133904399.png)

   Now, we apply similar operations for column 2.

   ![img](../resources/images/1*WBFs7rGL1hfHKK11FlJ3nw-20191126134036879.png)

   ![img](../resources/images/1*IsydlA3OcsFTxkmgW5uJdw.png)

   ![img](../resources/images/1*NztnaLbP5E4TEwv2tv0q6A.png)

   If we were doing Gaussian Elimination, we would’ve finished by now and started back substitution but to find inverse we have to take it one step further. We have to find Reduced Row Echelon Form.

3. 进一步消元得到上三角形式，并且主元为 1 （行梯形形式 *Reduced Row Echelon Form*）。

   从下往上，把主元变成 1。把第 3 行主元变成 1：

   ![img](../resources/images/1*oo-vt9w6deyoJEbcYOdRUA-20191126134415600.png)

   
   ![img](../resources/images/1*Hso3ACz0gFDl4XCHv70iqA.png)
   
   至此，所有主元都变成了 1。
   
   继续消除第 2 行。
   
   
      ![img](../resources/images/1*hPqXzPaO24GACThKvqpwjQ-20191126134416306.png)
   
      ![img](../resources/images/1*w6hQa6tBqdCP7W1vx7yCpA.png)
   
   
   
   消除第一行：
   
      ![img](../resources/images/1*tiQAWvOzCeVL_HWIGXrSNw-20191126134416719.png)
   
      ![img](../resources/images/1*iR9iI6KSg1PudshL1hNfRQ.png)
   
      ![img](../resources/images/1*5OwWDsbOG_muPhnjUuLr_A-20191126134417385.png)
   
      ![img](../resources/images/1*SvPV8_gH2XkAfa62c44fcA-20191126134417864.png)
   
   
   
4. 左边是单位矩阵，右边便是矩阵的逆。

      ![img](../resources/images/1*_4J65Cwafc1zb4vZykQCog-20191126134417665.png)

   

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