layout: post
title: Android Constraint Layout
tags: [android, ui, layout]
category: Android
---

[`ConstraintLayout`](https://developer.android.com/reference/android/support/constraint/ConstraintLayout.html) 可以取代传统的布局方式，如线性布局，表格布局，相对布局等。它允许你使用平板（而非嵌套）地创建复杂的布局，这在一定程度上提升了 UI 性能。

ConstraintLayout 和 Relative Layout 很像，都是根据兄弟组件、父亲组件来确定当前组件的位置，但是它比相对布局更加灵活，并且借助于 Android Studio 的布局可视化编辑器让约束布局更加好用。

约束布局是未来的布局趋势，只需要是用拖拽的方式就可以构建复杂的布局。

但这并不是说 ConstraintLayout 能够完全取代所有的布局，比如 CoordinatorLayout。相应的讨论可以看 [ConstraintLayout vs Coordinator layout](https://stackoverflow.com/questions/40929686/constraintlayout-vs-coordinator-layout)。

## 快速开始

### 升级 Android Studio

兄弟，升级到 Android Studio 3.0 吧。

### 创建 Android 工程

使用 Android Studio 3.0 生成工程的布局文件使用的布局都是 Constraint Layout，也会自动引入 ConstraintLayout 的依赖库。新建布局文件时，默认的布方式也是 ConstraintLayout。

<details><summary>对于老工程，需要引入 ConstraintLayout 依赖</summary>

修改工程目录下 _build.gradle_ 文件，添加 google 仓库：

<pre><code>
repositories {  
    google()
    jcenter()
}
</code></pre>

修改 _app/build.gradle_ 文件，添加依赖：:

<pre><code>
dependencies {  
    implementation 'com.android.support.constraint:constraint-layout:1.0.2'
}
</code></pre>

In the toolbar or sync notification, click **Sync Project with Gradle Files**.

并且可以将 RelativeLayout 等其他布局右键转化为 ConstraintLayout：

<img src="https://developer.android.com/training/constraint-layout/images/layout-editor-convert-to-constraint_2x.png" width="400">

</details>


### 入门视频

<details>
<summary>我们可以看官方教程中的视频，直观感受下如何给控件添加依赖已完成布局。</summary>

<iframe width="560" height="315" src="https://www.youtube.com/embed/XamMbnzI5vE" frameborder="0" allowfullscreen></iframe>

</details>

<div style="overflow: hidden">
<img src="../assets/images/constraint-layout/constraint-layout-constraint1.png" style="float: right;">
<p>
看完这个视屏，我们应该学会了如何添加约束了。但是，这还不足以让我们理解 ConstraintLayout。
</p>
<p>
当我们选中控件时，边的终点位置的圆是用来添加约束的，四个角的正方形是用来调整位置的。
</p>
</div>

## 约束

当你拖拽一个控件到布局编辑器时，默认是没有约束的。缺少约束并不会引起编译错误，但不加约束一般都会造成布局混乱，可以通过 <img src="https://developer.android.com/studio/images/buttons/layout-editor-errors.png" height="25px"> 来查看当前的布局错误信息。

If a view has no constraints when you run your layout on a device, it is drawn at position [0,0] (the top-left corner).

约束布局中控件的位置是用约束来定位的，约束分为水平约束和垂直约束。要确定一个控件的位置，必须至少有一个水平约束和垂直约束。这跟我们在平面上要确定一个点是同样的道理，要同时有 X 值和 Y 值才能确定。比如

![](../assets/images/constraint-layout/constraint-layout-constrain-hv.png)

上图中，按钮约束于父容器（根容器），除此之外，还可以用兄弟控件，或者引导线（Guidline）。

只能在水平约束点或者垂直约束点点之前建立约束，水平约束点和垂直约束点指点不能建立约束关系。用来建立水平约束的点叫水平约束点，用来建立垂直约束的点叫垂直约束点。

<video width="620" controls>
  <source src="https://storage.googleapis.com/androiddevelopers/videos/studio/studio-constraint-first.mp4" type="video/mp4">
</video>

一个约束点只能作为一条约束的出发点，但是可以有多个约束的入口点。

## 排列位置

![](https://developer.android.com/training/constraint-layout/images/position-constraint_2x.png)

如上这个图中的约束约定了 B 在 A 的右边，C 在 A 的下面。我们前面有讲过，一个控件的位置需要同时有两个方向的约束才能确定。所以这种约束关系只能大致排列一下位置关系，不足以定位控件的位置。如 B 的垂直方向的位置会上顶，而 C 在水平方向会左顶。

![](../assets/images/constraint-layout/order-position.png)

## 对齐

用约束布局来做控件对齐不是一般的简单。

假如要左对其两个控件。那我们可以建立下图的约束。我们省略了垂直约束。

<img src="https://developer.android.com/training/constraint-layout/images/alignment-constraint_2x.png"">

如果期望 B 在位置相对 A 的左边有一定的偏移，则可以将 B 往右拖，或者在属性面板中直接修改左 Margin 值。

<img src="https://developer.android.com/training/constraint-layout/images/alignment-constraint-offset_2x.png">

另外，我们还可以使用 Android Studio 的对齐工具来对齐。选中你要对齐的所有控件，然后选择 **Align** ![](https://developer.android.com/studio/images/buttons/layout-editor-align.png) 中的左对齐。注意，一定要先选中要对齐的控件，否则对齐的下拉框都点不动。

![](../assets/images/constraint-layout/align-left.png)

也可以右键选择左对齐。

![](../assets/images/constraint-layout/context-menu-align-left.png)

同理可以用于：

- 右对齐
- 垂直居中对齐
- 顶端对齐
- 水平居中对齐
- 顶端对齐
- 基线对齐

这里要提一下是居中对齐，居中对齐其实就是左对齐和右对齐。

![](../assets/images/constraint-layout/align-center.png)

如果期望控件对齐于父容器，则用父容器来约束控件就好了。与父容器的左边建立约束，则相当于与父容器左边对齐。如果期望居中与父容器，则同样左右对齐于父容器即可。

![](../assets/images/constraint-layout/center-align-parent.png)

## 调节约束轴

当控件的左右都被约束的时候，默认情况下该控件水平居中于两个约束点，这时候的偏差为 50%。我们可以通过调节属性面板来调节这个偏差。

<video width="600" controls>
  <source src="https://storage.googleapis.com/androiddevelopers/videos/studio/adjust-constraint-bias.mp4" type="video/mp4">
</video>

## 约束于指导线

前面我们说过可以约束于兄弟控件，可以约束于父容器，除此之外，还可以约束指导线。

指导线是根据父容器定位的基准线，比如我们希望在 C10 上使用 3 列布局，则可以用垂直基准线划分 3 个布局区域。如：

![](../assets/images/constraint-layout/guideline.png)

To create a guideline, click **Guidelines** ![](https://developer.android.com/studio/images/buttons/layout-editor-guidelines.png) in the toolbar, and then click either **Add Vertical Guideline** or **Add Horizontal Guideline**.

指导线是对用户是不可见的，分为水平指导线和垂直指导线。Drag the dotted line to reposition it and click the circle at the edge of the guideline to toggle the measurement mode.

## 调整控件大小

<style type="text/css">
.callout1 {
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    background: #E92663;
    text-align: center;
    color: white;
}
</style>

<img src="https://developer.android.com/training/constraint-layout/images/layout-editor-properties-callouts_2x.png" alt="" width="284" style="float: right;">

可调整的属性包括：

<span class="callout1">1</span> 比例大小的,
<span class="callout1">2</span> 删除约束,
<span class="callout1">3</span> 宽高模式,
<span class="callout1">4</span> 边距
<span class="callout1">5</span> 约束偏差</p>

控件的大小调整可以通过控件四角的小正方形来调整，不过通过这种方式调整的大小是固定值，也就是硬编码的方式，一般情况下不建议用这种方式。

我们通过属性面板的 <span class="callout1">3</span> 来调整宽高模式。

宽高模式有三种可选值：

1.  <img src="https://developer.android.com/studio/images/buttons/layout-width-fixed.png" width="30px"> **Fixed**: 可以通过 `layout_width` 用硬编码方式调整大小，和在编辑器中通过拖拽了调整大小类似.
2.  <img src="https://developer.android.com/studio/images/buttons/layout-width-wrap.png"  width="30px"> **Wrap Content**: The view expands only as much as needed to fit its contents. 调整控件大小为内容大小。相当于 `wrap_content`。
3.  <img src="https://developer.android.com/studio/images/buttons/layout-width-match.png" width="30px"> **Match Constraints**:  控件展开直到充满约束点之间的空白（该空白不包括边距大小），相当于 `match_parent`
  

    <details>
    <summary>尽量展开是默认行为，你可以同规模修改下面的属性来修改这种行为：</summary>

    -  `layout_constraintWidth_default`

        - `spread`: 默认值，尽可能展开。
        - `wrap`: Expands the view only as much as needed to fit its contents, but still allows the view to be smaller than that if the constraints require it. So the difference between this and using **Wrap Content** (above), is that setting the width to **Wrap Content** forces the width to always exactly match the content width; whereas using **Match Constraints** with **layout_constraintWidth_default** set to **wrap** also allows the view to be smaller than the content width.
    -  `layout_constraintWidth_min` This takes a `dp` dimension for the view's minimum width.

    - `layout_constraintWidth_max` This takes a `dp` dimension for the view's maximum width.

    </details>

### 用比例来设置大小

<img src="https://developer.android.com/training/constraint-layout/images/layout-editor-ratio-properties_2x.png" width="300px" style="float: right; margin-left: 20px"> 

当宽高至少有一个设置为 "match constraints" (`0dp`) 时，便可以使用比例来设置控件的大小。To enable the ratio, click **Toggle Aspect Ratio Constraint**，如上图中的 <span class="callout1">1</span>。

If both the width and height are set to match constraints, you can click **Toggle Aspect Ratio Constraint** to select which dimension is based on a ratio of the other. The view inspector indicates which is set as a ratio by connecting the corresponding edges with a solid line.

For example, if you set both sides to "match constraints", click **Toggle Aspect Ratio Constraint** twice to set the width be a ratio of the height. Now the entire size is dictated by the height of the view (which can be defined in any way).

## 调整控件的默认边距

通过下面的工具来修改边距值的默认值，当你新增一个控件，为该控件添加约束时，默认的边距即为该值。

<img src="https://developer.android.com/training/constraint-layout/images/layout-editor-margin-callout_2x.png" height="30">

随后，你可以在属性面板中修改该边距值。

## 双向约束 - 链

建立双向关系的控件组，我们称之为链。如右图， A 和 B 之间建立了水平链。

<img src="https://developer.android.com/training/constraint-layout/images/constraint-chain_2x.png" width="300">

要在控件间建立双向关联，可以选中你要关联的链，右键 -> Chain -> Create Horizontal Chain，如图：

![](../assets/images/constraint-layout/horizontal-chain.png)

还可以在选中之后，右键 -> Center -> Center Horizontally。垂直链的建立同理。

<video width="400" controls>
  <source src="https://storage.googleapis.com/androiddevelopers/videos/studio/constraint-chains.mp4" type="video/mp4">
</video>

A、B 之间的那条链就是所谓的双向关联，左右两边的约束是普通的约束。我们观察控件间的水平空隙，除下左右两边的边距，中间的空隙是平均分布的。没错，链就是用来分配空白的。

如何分配空白是由属性 `layout_constraintHorizontal_chainStyle` 决定的，默认是平均分布空白区域，这个属性的默认值为 `Spread`，该属性的可选值为：

<img src="https://developer.android.com/training/constraint-layout/images/constraint-chain-styles_2x.png" width="400" style="float: left; margin-right: 20px" >

<span class="callout1">1</span>  **Spread:** 默认值，平均分配边距外的空白.

<span class="callout1">2</span>  **Spread inside:** 第一个控件的左侧和最后一个控件的右侧不分配空白，然后再平均分配。

<span class="callout1">3</span>  **Weighted:** `layout_constraintHorizontal_chainStyle` 并没有这个值，它是通过当链模式的是 **spread** or **spread inside** 时，通过扩展控件的长度来填充剩余空白。

如果只有一个控件的长度设置为 "match constraints"(`0dp`)，该控件的长度边长，充满剩余空白。当有多个控件设置为 0dp 时，默认扩展这多个控件的长度平均分配剩余空间。可以通过修改 `layout_constraintHorizontal_weight` 属性来调整对剩余空间的分配比例，工作原理类似于 LinearLayout 中的 `layout_weight` 属性。

<span class="callout1">4</span> **Packed:** 所有的控件挨在一起，左右两边默认平均分配剩余空白，可以通过在属性面板中调整偏差来调整左右两边对剩余空白的占比。

调整链模式的方法是，选择链中的任意一个控件，选择控件下方出现的 <img src="https://developer.android.com/studio/images/buttons/layout-editor-action-chain.png" width="20"> 来调整模式。也可以修改属性 `layout_constraintHorizontal_chainStyle`  来调整。

在使用链的时候有几点要注意：

- 控件可以同时组成水平链和垂直链，可以轻松构建成表格布局。
- 只能在同一轴上建立链，比如只能在水平约束点或者垂直约束点之间建链。
- 链只管水平或者垂直方向的剩余空间的分配，并没有约束位置的功能。

**练习：** 你可以试着建立九宫格计算器，这个计算器可移植性要强。

![](../assets/images/constraint-layout/constraint-computer.png)

## 自动连接和自动推荐约束

Android Studio 还提供了两个工具，自动连接和自动约束，都是用来帮开发者自动找到约束。

选定一个控件的时候，可以点击 <img height="20px" src="https://developer.android.com/studio/images/buttons/layout-editor-infer.png"> 来让 IDE 帮我们推测一下。

自动连接 <img src="https://developer.android.com/studio/images/buttons/layout-editor-autoconnect-on.png" height="20px"> 默认是关闭的，可以点击打开。当拖拽新控件到设计器的时候，会自动添加约束，如果它能推测出来的话。

个人认为这两个工具都是玩具级别的，玩玩即可。

## FAQ

### 重叠

当需要达到重叠效果时，因该如何控制 z 轴。答案是通过 `android:elevation` 属性。

- [How to bring ImageView in front of Button in android 5? - Stack Overflow](https://stackoverflow.com/questions/27216080/how-to-bring-imageview-in-front-of-button-in-android-5/27216368#27216368)
- [Android 视图高度和阴影的那点事儿](http://yifeng.studio/2017/02/26/android-elevation-and-shadow/)

## Resource 

官方教程：

- [Build a Responsive UI with ConstraintLayout](https://developer.android.com/training/constraint-layout/index.html)
- [ConstraintLayout](https://developer.android.com/reference/android/support/constraint/ConstraintLayout.html)

<details>
<summary>再提供三个视屏</summary>
<iframe width="560" height="315" src="https://www.youtube.com/embed/z53Ed0ddxgM?rel=0" frameborder="0" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/CTYf1qwrXuw" frameborder="0" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/yT22cqCGjQQ" frameborder="0" allowfullscreen></iframe>
</details>

## Tutorial

- [Introducing Constraint Layout 1.1 – Google Developers – Medium](https://medium.com/google-developers/introducing-constraint-layout-1-1-d07fc02406bc)
- [(13) ConstraintLayout Tutorial - Android Programming - YouTube - YouTube](https://www.youtube.com/playlist?list=PLrnPJCHvNZuA80lNWNCLICR3qYzhw3iPI)