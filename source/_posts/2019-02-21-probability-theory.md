---
layout: post
title: Probability Theory 概率论
tags: [ai]
category: AI
---

看 [可汗学院公开课：概率 _基本概率_网易公开课](https://open.163.com/movie/2011/3/B/Q/M82IF3HFQ_M831V1DBQ.html)

## 基本概念

**样本空间**：随机试验的所有可能结果构成的集合，即为 S={e}。样本空间中的元素 e 称为样本点。

**随机事件**：样本空间 A 的子集 A 称为随机事件 A，简称事件 A。当且仅当 A 中的某个样本点发生称为事件 A 发生。

**事件的关系：**

1. $A\subset B​$ ，事件 A 发生一定导致 B 发生。
2. $A = B$，事件 A 发生，B 一定发生；反之亦然。
3. $A \cup B$ ，A 与 B 的和事件，A 与 B 至少有一个发生过。
4. $A \cap B$，A 与 B 的积事件，A 与 B 同时发生。
5. $U_{i=1}^n$ 表示 $A_1, A_2, \dots, A_n$ 至少有一个发生。
6. $\cap_{i=1}^n​$ 表示 ​$A_1, A_2, \dots, A_n​$ 同时发生。
7. $AB=\varnothing​$ 时，称事件A和事件B不相容或互斥。
8. A-B，A 与 B的差事件，A 发生，B 不发生。
9. $\overline{A}$，A 的逆事件。

$A-B=A\overline{B}=A \cup B=A-AB$

**事件的运算定律：**

![image-20190222154634858](https://ws2.sinaimg.cn/large/006tKfTcgy1g0f8z38ez5j30o50aun0j.jpg)

![image-20190222154737937](https://ws4.sinaimg.cn/large/006tKfTcgy1g0f906z0ecj30ni0a3gpx.jpg)



![image-20190222154820754](https://ws1.sinaimg.cn/large/006tKfTcgy1g0f90xipd6j30lu083tbj.jpg)

![image-20190222155043343](https://ws4.sinaimg.cn/large/006tKfTcgy1g0f93emg4oj30nm0aswik.jpg)

![image-20190222155133150](https://ws1.sinaimg.cn/large/006tKfTcgy1g0f949grfaj30nk08kwh1.jpg)

## 概率

当实验次数增加时，随机事件A发生的频率的稳定值 p 称为概率，记为 P(A)=p。

性质：

1. 非负性：P(A)≥0；

2. $P(A)=1-P(\overline A)​$

3. 有限可加性：

   $A_1, A2, \dots​$ 两两互斥，即 $A_iA_j=\varnothing​$，则 $P(\cup_{i=1}^\infty A_i)=\sum_{i=1}^{\infty} (A_i) ​$

4. 若 $A \subset B​$，则 P(B-A)=P(B)-P(A)

5. 概率的加法公式：$P(AUB)=P(A)+P(B)-P(AB)​$

   推理：$P(AUBUC)=P(A)+P(B)+P(C)-P(AB)-P(AC)-P(BC)+P(ABC)$

![image-20190222163823264](https://ws3.sinaimg.cn/large/006tKfTcgy1g0fagzzxg5j30nl08gq69.jpg)

![image-20190222163855923](https://ws3.sinaimg.cn/large/006tKfTcgy1g0fahkmce9j30o20agq6p.jpg)

## 古典概型

若实验满足：

1. 样本空间S中样本点有限（有限性）
2. 出现没一个样本点的概率相等（等可能性）

则称这种实验为等可能概型（或古典概型）。
$$
P(A) = \frac{\text{A 所包含的样本点数}}{\text{S 中的样本点数}}
$$
![image-20190222164751385](https://ws2.sinaimg.cn/large/006tKfTcgy1g0faqurgb1j30nr077acp.jpg)

![image-20190222170052539](https://ws4.sinaimg.cn/large/006tKfTcgy1g0fb4e85x1j30m90addjh.jpg)

![image-20190222170543172](https://ws3.sinaimg.cn/large/006tKfTcgy1g0fb9g0q9oj30ms058myu.jpg)

![image-20190222170449937](https://ws3.sinaimg.cn/large/006tKfTcgy1g0fb8ib3lnj30lj09t42o.jpg)

![image-20190222170931520](https://ws2.sinaimg.cn/large/006tKfTcgy1g0fbde8rqfj30mf09pjv1.jpg)



![image-20190222171350102](https://ws1.sinaimg.cn/large/006tKfTcgy1g0fbhvs45jj30l50apn0j.jpg)

## 条件概率

例：一个家庭中有两个小孩，已知至少一个是女孩，问两个都是女孩的概率是多少？

S = {{兄弟}、{兄妹}、{姐弟}、{姐妹}}

A={{兄妹}、{姐弟}、{姐妹}}

B={{姐妹}}

则：P(B|A)=1/3，P(B|A)表示A发生的条件下，B发生的条件概率。

![image-20190227115803280](https://ws1.sinaimg.cn/large/006tKfTcly1g0kugwxzfpj30pd08pgo0.jpg)

![image-20190227115950664](https://ws2.sinaimg.cn/large/006tKfTcly1g0kuiq43eyj30oz0cnjvw.jpg)

![image-20190227120127146](https://ws4.sinaimg.cn/large/006tKfTcly1g0kukekl1fj30q70blwki.jpg)

![image-20190227133644572](https://ws2.sinaimg.cn/large/006tKfTcly1g0kxbjm3bkj30nh0bvdip.jpg)

![image-20190227133849076](https://ws1.sinaimg.cn/large/006tKfTcly1g0kxdph4znj30qf0ataea.jpg)

## 全概率公式与贝叶斯公式

![image-20190227134732664](https://ws2.sinaimg.cn/large/006tKfTcly1g0kxms5a54j30qa0b0tdq.jpg)

![image-20190227135534656](https://ws2.sinaimg.cn/large/006tKfTcly1g0kxv57878j30oi0ayq6d.jpg)

![image-20190227135556614](https://ws1.sinaimg.cn/large/006tKfTcly1g0kxviyl4fj30ll08840n.jpg)

## 事件独立性

![image-20190227135918557](https://ws1.sinaimg.cn/large/006tKfTcly1g0kxz0tsa0j30pm09ywhz.jpg)

![image-20190227135940780](https://ws2.sinaimg.cn/large/006tKfTcly1g0kxzeumeuj30oy0acads.jpg)

![image-20190227140021607](https://ws4.sinaimg.cn/large/006tKfTcly1g0ky044rdzj30nw0a5juf.jpg)

![image-20190227140101564](https://ws3.sinaimg.cn/large/006tKfTcly1g0ky0tdsr4j30oj0a1q62.jpg)

![image-20190227140145345](https://ws4.sinaimg.cn/large/006tKfTcly1g0ky1kjcztj30n20baq6v.jpg)

![image-20190227140218088](https://ws1.sinaimg.cn/large/006tKfTcly1g0ky24q52xj30mk07y41j.jpg)

![image-20190227140534080](https://ws3.sinaimg.cn/large/006tKfTcly1g0ky5jc8g3j30px0a0gq1.jpg)

![image-20190227140350248](https://ws4.sinaimg.cn/large/006tKfTcly1g0ky3q8cqzj30oo0c1432.jpg)



## 工具

- [LaTeX/Mathematics - Wikibooks, open books for an open world](https://en.wikibooks.org/wiki/LaTeX/Mathematics)