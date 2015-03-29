layout: post
title: "自定义ViewGroup"
category: Android
tags: [android,hack]
--- 
##目标

实现类似这样的层叠布局：

![层叠样式](http://johnnyimages.qiniudn.com/cascade-layout.png) ![层叠样式](http://johnnyimages.qiniudn.com/cascade-layout-android.png) 

##使用RelativeLayout和`layout_margin*`实现

	<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
	    android:layout_width="fill_parent"
	    android:layout_height="fill_parent">

	    <View
	        android:layout_width="100dp"
	        android:layout_height="150dp"
	        android:background="#FF0000" />
	    <View
	        android:layout_width="100dp"
	        android:layout_height="150dp"
	        android:layout_marginLeft="30dp"
	        android:layout_marginTop="20dp"
	        android:background="#00FF00" />
	    <View
	        android:layout_width="100dp"
	        android:layout_height="150dp"
	        android:layout_marginLeft="60dp"
	        android:layout_marginTop="40dp"
	        android:background="#0000FF" />
	</RelativeLayout>

对于简单的布局使用这种方法相对简单，下面我们使用自定的ViewGroup实现一个通用的布局容器，使用起来会更加简单和直观，我们称之为CascadeLayout。

<!--more-->

##Android 控件的渲染原理
在使用自定义ViewGroup实现之前我们需要知道Android View的渲染Android 控件的渲染过程。

Android 控件的渲染过程分为两个阶段，分别为：

- measure，即确定子控件的尺寸的过程。在这个过程中，每个子控件的尺寸都被确认。
- layout，即将子控件布局到画布上的过程。使用以上measure过程得到的尺寸等属性将子控件渲染到父容器中。

这两个过程都是自顶向下递归遍历的。


##使用自定义的ViewGroup实现

###使用CascadeLayout的方式

我们最终或许会这样使用该层叠控件

	<FrameLayout xmlns:cascade="http://schemas.android.com/apk/res-auto"
	    xmlns:android="http://schemas.android.com/apk/res/android"
	    android:layout_width="fill_parent"
	    android:layout_height="fill_parent" >

	    <com.example1.myapplication.CascadeLayout
	        android:layout_width="fill_parent"
	        android:layout_height="fill_parent"
	        cascade:horizontal_spacing="30dp"
	        cascade:vertical_spacing="20dp" >

	        <View
	            android:layout_width="100dp"
	            android:layout_height="150dp"
	            cascade:layout_vertical_spacing="90dp"
	            android:background="#FF0000" />

	        <View
	            android:layout_width="100dp"
	            android:layout_height="150dp"
	            android:background="#00FF00" />

	        <View
	            android:layout_width="100dp"
	            android:layout_height="150dp"
	            android:background="#0000FF" />
	    </com.example1.myapplication.CascadeLayout>

	</FrameLayout>

其中`xmlns:cascade="..." `为cascade专有的命名空间。`cascade:horizontal_spacing`和`cascade:vertical_spacing`为CascadeLayout的布局属性。下面我们逐个实现。

###实现CascadeLayout自定义布局属性

需要在res/values文件件下创建attrs.xml文件(如果没有的话)，并添加如下内容

	<resources>
	    <declare-styleable name="CascadeLayout">
	        <attr name="horizontal_spacing" format="dimension" />
	        <attr name="vertical_spacing" format="dimension" />
	    </declare-styleable>
	</resources>

###添加自定义布局属性的默认值

在res/values文件夹下创建dimens.xml文件(如果没有的话)，并添加以下内容：

	<resources>
	    <dimen name="cascade_horizontal_spacing">10dp</dimen>
	    <dimen name="cascade_vertical_spacing">10dp</dimen>
	</resources>

这和attrs.xml中定义的属性并未直接关联，需要使用代码关联，请继续往下看。

###CascadeLayout.java的实现

主要代码集中的三个部分，分别为构造函数、onMeasure()和onLayout()中。

####构造函数

	public class CascadeLayout extends ViewGroup {

	    private int mHorizontalSpacing;
	    private int mVerticalSpacing;

	    public CascadeLayout(Context context, AttributeSet attrs) {
	        super(context, attrs);

	        TypedArray a = context.obtainStyledAttributes(attrs,
	                R.styleable.CascadeLayout);

	        try {
	            mHorizontalSpacing = a.getDimensionPixelSize(
	                    R.styleable.CascadeLayout_horizontal_spacing,
	                    getResources().getDimensionPixelSize(
	                            R.dimen.cascade_horizontal_spacing));

	            mVerticalSpacing = a.getDimensionPixelSize(
	                    R.styleable.CascadeLayout_vertical_spacing, getResources()
	                    .getDimensionPixelSize(R.dimen.cascade_vertical_spacing));
	        } finally {
	            a.recycle();
	        }

	    }
	}

其中，	obtainStyledAttributes是从上下文中获取CascadeLayout对应的自定义属性和值，后续可以通过该对象的getDimensionPixelSize()方法获得对应属性的值。

getDimensionPixelSize()方法接收两个参数，第一个为属性对应的索引，第二为该属性默认值。当在布局中定义了horizontal_spacing属性时，则使用horizontal_spacing指定的值，否则使用默认值。

**使用完TypedArray对象之后，一定要在finally语句块使用recycle回收资源。**

####onMeasure()

我们在CascadeLayout类中定义一个内部静态类LayoutParams，用来保存每个子控件的x、y坐标，代码如下：

	public static class LayoutParams extends ViewGroup.LayoutParams {
	    int x;
	    int y;
	    public int verticalSpacing;

	    public LayoutParams(Context context, AttributeSet attrs) {
	        super(context, attrs);

	        TypedArray a = context.obtainStyledAttributes(attrs,
	                R.styleable.CascadeLayout_LayoutParams);
	        try {
	            verticalSpacing = a
	                    .getDimensionPixelSize(
	                            R.styleable.CascadeLayout_LayoutParams_layout_vertical_spacing,
	                            -1);
	        } finally {
	            a.recycle();
	        }
	    }

	    public LayoutParams(int w, int h) {
	        super(w, h);
	    }

	}

其中，verticalSpacing是为了保存子控件中定义的layout_vertical_spacing属性，该属性为CascadeLayout_LayoutParams的自定义属性，定义在attrs.xml中：

	<declare-styleable name="CascadeLayout_LayoutParams">
	    <attr name="layout_vertical_spacing" format="dimension" />
	</declare-styleable>

因为layout_vertical_spacing是跟布局有关的属性，所以它作为LayoutParams属性，并通过`R.styleable.CascadeLayout_LayoutParams_layout_vertical_spacing`访问该属性。

使用该属性的方式为：

	<com.example1.myapplication.CascadeLayout
	        android:layout_width="fill_parent"
	        android:layout_height="fill_parent"
	        cascade:horizontal_spacing="30dp"
	        cascade:vertical_spacing="20dp" >

	        <View
	            android:layout_width="100dp"
	            android:layout_height="150dp"
	            cascade:layout_vertical_spacing="90dp"
	            android:background="#FF0000" />

		<View
		    android:layout_width="100dp"
		    android:layout_height="150dp"
		    cascade:layout_vertical_spacing="90dp"
		    android:background="#FF0000" />	
	</com.example1.myapplication.CascadeLayout>

为了使CascadeLayout.LayoutParams能起到我们所说的保存子控件属性的作用，需要重写CascadeLayout类的一些方法，以使布局中使用的是我们自定义的ViewGroup.LayoutParams，而不是原生的。

- checkLayoutParams()
- generateDefaultLayoutParams()
- generateLayoutParams(AttributeSet  attrs)
- generateLayoutParams(ViewGroup.LayoutParams p)

这些方法在自定义ViewGroup时形式都差不多，具体可参考源码中的[CascadeLayout类](https://github.com/Macarse/50AH-code/blob/master/hack003/src/com/manning/androidhacks/hack003/view/CascadeLayout.java)。

下面看onMeasure方法的代码

	protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
	        int width = getPaddingLeft();
	        int height = getPaddingTop();
	        int verticalSpacing;

	        final int count = getChildCount();
	        for (int i = 0; i < count; i++) {
	            verticalSpacing = mVerticalSpacing;

	            View child = getChildAt(i);
	            measureChild(child, widthMeasureSpec, heightMeasureSpec);

	            LayoutParams lp = (LayoutParams) child.getLayoutParams();
	            width = getPaddingLeft() + mHorizontalSpacing * i;

	            lp.x = width;
	            lp.y = height;

	            if (lp.verticalSpacing >= 0) {
	                verticalSpacing = lp.verticalSpacing;
	            }

	            width += child.getMeasuredWidth();
	            height += verticalSpacing;
	        }

	        width += getPaddingRight();
	        height += getChildAt(getChildCount() - 1).getMeasuredHeight()
	                + getPaddingBottom();

	        setMeasuredDimension(resolveSize(width, widthMeasureSpec),
	                resolveSize(height, heightMeasureSpec));
	}

在这个方法中主要做两件事情：

- 计算CascadeLayout布局的大小，并通过setMeasuredDimension()方法设置。
- 计算每个子控件的x、y坐标，这在下一步的渲染过程会用到

####onLayout

	 protected void onLayout(boolean changed, int l, int t, int r, int b) {

	    final int count = getChildCount();
	    for (int i = 0; i < count; i++) {
	        View child = getChildAt(i);
	        LayoutParams lp = (LayoutParams) child.getLayoutParams();

	        child.layout(lp.x, lp.y, lp.x + child.getMeasuredWidth(), lp.y
	                + child.getMeasuredHeight());
	    }
	}

代码也很简单，根据每个子控件的x、y坐标、长宽，呈现子控件。

##其他

- [Protip. Inflating layout for your custom view](http://trickyandroid.com/protip-inflating-layout-for-your-custom-view/)
    
##参考

- [源码](https://github.com/Macarse/50AH-code/tree/master/hack003)
- [Android高手进阶之自定义View，自定义属性（带进度的圆形进度条）](http://blog.csdn.net/xiaanming/article/details/10298163)
- [Android自定义属性](http://blog.csdn.net/veryitman/article/details/7409086)
- [How Android Draws Views](http://developer.android.com/guide/topics/ui/how-android-draws.html)
- [Hack3-创建自定义ViewGroup](http://blog.csdn.net/kost_/article/details/13296541)
- [《[50.Android.Hacks(2013.6)].Carlos.Sessa.文字版》](http://www.salttiger.com/50-android-hacks/)