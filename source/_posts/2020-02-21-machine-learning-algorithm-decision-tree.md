---
layout: post
title: 机器学习算法 - 决策树
tags: [python, language, machine learning]
category: AI
---

## 决策树

决策树是用树形结构来表达决策的过程，可以解决分类问题和回归问题。在树结构中， 叶子节为决策结果，内部节点代表某个属性条件。

决策树的特点：

- 是非参数学习算法。
- 可以解决分类问题（包括多分类问题）和回归问题（利用所在叶子节点的平均值）。
- 非常好的可解释性。

如下是公司招聘机器学习算法工程师的决策过程：

<img src="../resources/images/image-20200221144424228.png" alt="image-20200221144424228" style="zoom:30%;" />

上面这棵树的深度为 3，最多通过 3 次判断可以判定决策结果。

## 信息熵

信息熵是信息论的一个概念，用来度量随机变量的不确定度。熵越大，数据的不确定越高；熵越小，数据的不确定性越低。熵的概念来源于物理热力学，熵越大，例子的无规则运动越剧烈，不确定性越高；熵越小，例子越趋于静止。

信息熵的计算公式如下：
$$
H = -\sum_{i=1}^kp_ilog(p_i)
$$
其中，$p_i$ 是指一个数据集中，第 i 个种类所占的比例。

比如，一个 3 等分的数据集 $\{\frac 1 3, \frac 1 3, \frac 1 3\}$，对应的信息熵为 $H=-\frac 1 3 log(\frac 1 3)\cdot3=1.0986$；另一个数据集 $\{\frac 1 {10}, \frac 2 {10}\, \frac 7 {10}\}$ 的信息熵 $H=-\frac 1 {10}log(\frac 1 {10})-\frac 2 {10}log\frac 2 {10}-\frac 7 {10}log\frac 7 {10}=0.8018$。第二组数据集的数据上较小，直观上是因为第二组数据中有个大比例数据 $\frac 7 {10}$ ，数据更趋于相同。一个极端的数据集 $\{1, 0, 0}\$ 的信息熵为 0，数据是完全确定的，即都属于同一类。

在二分类算法中，数据类别只有两类，公式可以简化为：
$$
H = -xlog(x)-(1-x)log(1-x)
$$
我们可以用代码中来绘制 x 在 (0-1) 范围内的数据上变化：

```python
import numpy as np
import matplotlib.pyplot as plt

def entropy(p):
    return -p * np.log(p) - (1-p) * np.log(1-p)
  
x = np.linspace(0.01, 0.99, 200)

plt.plot(x, entropy(x))
plt.show()
```

![image-20200221175123233](../resources/images/image-20200221175123233.png)

当  x = 0.5 是，取得最大值，数据是最不确定的；而在曲线的两侧，数据越偏向于每一类，信息熵越低。在多分类问题同理。

决策树的问题演变为要找到划分维度以及在这个维度上的阈值，使得信息熵最低，即利用信息上寻找最优划分。

## 基于信息熵的最优划分

我们通过 sklearn 来分类鸢尾花数据集：

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn import datasets

iris = datasets.load_iris()
X = iris.data[:,2:]
y = iris.target
```

![image-20200221144746277](file:///Users/feiq/Documents/dev/johnnyfee.github.io/source/resources/images/image-20200221144746277.png?lastModify=1582294789)

利用基于信息熵的决策树来分类：

```python
from sklearn.tree import DecisionTreeClassifier

# criterion="entropy" 表示评判标准为信息熵。
dt_clf = DecisionTreeClassifier(max_depth=2, criterion="entropy", random_state=42)
dt_clf.fit(X, y)
```

决策树要解决的关键问题是节点应该在哪个维度划分以及如何决定这个维度的阈值。

每个非叶子节点对应一个特征和特征的边界值。

对应的决策树类似为：

<img src="file:///Users/feiq/Documents/dev/johnnyfee.github.io/source/resources/images/image-20200221144946287.png?lastModify=1582294789" alt="image-20200221144946287" style="zoom:40%;" />

决策边界为：

![image-20200221144848091](file:///Users/feiq/Documents/dev/johnnyfee.github.io/source/resources/images/image-20200221144848091.png?lastModify=1582294789)



下面我们实现代码来实现这一过程

```python
import numpy as np

# 根据特征条件 d <= value 来分离样本
def split(X, y, d, value):
    index_a = (X[:,d] <= value)
    index_b = (X[:,d] > value)
    return X[index_a], X[index_b], y[index_a], y[index_b]
```

```python
from collections import Counter
from math import log

# 计算向量 y 的信息熵
def entropy(y):
    counter = Counter(y)
    res = 0.0
    for num in counter.values():
        p = num / len(y)
        res += -p * log(p)
    return res

# 找到一组最佳信息熵以及对应的向量和值
def try_split(X, y):  
    best_entropy = float('inf')
    best_d, best_v = -1, -1
    # 遍历所有特征向量
    for d in range(X.shape[1]):
      	# 排序第 d 个特征向量
        sorted_index = np.argsort(X[:,d])
        # 按行遍历
        for i in range(1, len(X)):
          	# 和前一个样本的特征值比较，如果数值不同，则取两个特征的平均值
            if X[sorted_index[i], d] != X[sorted_index[i-1], d]:
                v = (X[sorted_index[i], d] + X[sorted_index[i-1], d])/2
                # 按照平均值分离
                X_l, X_r, y_l, y_r = split(X, y, d, v)
                # 计算左右 2 个数据集的占比
                p_l, p_r = len(X_l) / len(X), len(X_r) / len(X)
                # 计算此时的信息熵
                e = p_l * entropy(y_l) + p_r * entropy(y_r)
                if e < best_entropy:
                    best_entropy, best_d, best_v = e, d, v
                
    return best_entropy, best_d, best_v
```

```python
# 查找第一个最优信息熵，以及对应的向量和值
# 对应样本空间的第 1 特征，条件值为 2.45
best_entropy, best_d, best_v = try_split(X, y)
# best_entropy = 0.46209812037329684
# best_d = 0
# best_v = 2.45

# 分离结果
X1_l, X1_r, y1_l, y1_r = split(X, y, best_d, best_v)
entropy(y1_l) # 左边的信息熵值为 0
entropy(y1_r) # 右边的信息熵为 0.6931471805599453

# 继续分离右边的数据集
X2_l, X2_r, y2_l, y2_r = split(X1_r, y1_r, best_d2, best_v2)
entropy(y2_l) # 0.30849545083110386
entropy(y2_r) # 0.10473243910508653
```

我们可以用二叉树构建这颗决策树。

## 基尼系数

## 工具

- [LaTeX/Mathematics - Wikibooks, open books for an open world](https://en.wikibooks.org/wiki/LaTeX/Mathematics)
- [Play-with-Machine-Learning-Algorithms Source](https://github.com/liuyubobobo/Play-with-Machine-Learning-Algorithms)
- [Python3入门机器学习经典算法与应用视频](https://coding.imooc.com/class/chapter/169.html#Anchor)
