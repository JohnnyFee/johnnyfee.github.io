---
layout: post
title: "Android动画"
category: Android
tags: [android,animation]
--- 
## 概述

参考官方文档，Android动画分为两类，分别为：

- [Property Animation](http://developer.android.com/guide/topics/resources/animation-resource.html#Property)用于改变目标对象的属性，如背景颜色，透明度等。

- [View Animation](http://developer.android.com/guide/topics/resources/animation-resource.html#View) View动画又分为
	- [Tween Animation](http://developer.android.com/guide/topics/resources/animation-resource.html#Tween) 通过对场景里的对象不断做图像变换(平移、缩放、旋转)产生动画效果，可以理解为渐变动画或者补间动画。
	- [Frame Animation](http://developer.android.com/guide/topics/resources/animation-resource.html#Frame) 通过[AnimationDrawable](http://developer.android.com/reference/android/graphics/drawable/AnimationDrawable.html)来顺序显示一组图片，可以理解为逐帧动画。


所有关于动画的定义均应放在res/anim/目录下，在Java中通过`R.anim.filename`来引用，在XML中通过` @[package:]anim/filename`来引用。

Animator对应的监听接口为`Animator.AnimatorListener`，可以继承AnimatorListenerAdapter而不是实现AnimatorListener接口来简化操作，这个类对AnimatorListener中的函数都定义了一个空函数体，这样我们就只用定义想监听的事件而不用实现每个函数却只定义一空函数体。如：

	ObjectAnimator oa=ObjectAnimator.ofFloat(tv, "alpha", 0f, 1f);
	oa.setDuration(3000);
	oa.addListener(new AnimatorListenerAdapter(){
	    public void on AnimationEnd(Animator animation){
	        Log.i("Animation","end");
	    }
	});
	oa.start();

关于Animator的监听器请参考[Animation Listeners](http://developer.android.com/guide/topics/graphics/prop-animation.html#listeners)。

<!--more-->

## Property Animation

在XML中定义的语法如下：

	<set
	  android:ordering=["together" | "sequentially"]>

	    <objectAnimator
	        android:propertyName="string"
	        android:duration="int"
	        android:valueFrom="float | int | color"
	        android:valueTo="float | int | color"
	        android:startOffset="int"
	        android:repeatCount="int"
	        android:repeatMode=["repeat" | "reverse"]
	        android:valueType=["intType" | "floatType"]/>

	    <animator
	        android:duration="int"
	        android:valueFrom="float | int | color"
	        android:valueTo="float | int | color"
	        android:startOffset="int"
	        android:repeatCount="int"
	        android:repeatMode=["repeat" | "reverse"]
	        android:valueType=["intType" | "floatType"]/>

	    <set>
	        ...
	    </set>
	</set>

Property Animation不仅可以应用于View，还可以应用于任何对象。Property Animation只是表示一个值在一段时间内的改变，当值改变时要做什么事情完全是你自己决定的。

Property Animation更改的是对象的实际属性。如Button的缩放，Button的位置与大小属性值都改变了。这点和View Animation截然不同，可参考本文的View Animation一节。

定义Propertiy Animation的XML标签包括set、objectAnimator、animator，分别对应的Java类为[AnimatorSet](http://developer.android.com/reference/android/animation/AnimatorSet.html), [ObjectAnimator](http://developer.android.com/reference/android/animation/ObjectAnimator.html), [ValueAnimator](http://developer.android.com/reference/android/animation/ValueAnimator.html)。

The following example plays the two sets of object animations sequentially, with the first nested set playing two object animations together:

	<set android:ordering="sequentially">
	    <set>
	        <objectAnimator
	            android:propertyName="x"
	            android:duration="500"
	            android:valueTo="400"
	            android:valueType="intType"/>
	        <objectAnimator
	            android:propertyName="y"
	            android:duration="500"
	            android:valueTo="300"
	            android:valueType="intType"/>
	    </set>
	    <objectAnimator
	        android:propertyName="alpha"
	        android:duration="500"
	        android:valueTo="1f"/>
	</set>

In order to run this animation, you must inflate the XML resources in your code to an AnimatorSet object, and then set the target objects for all of the animations before starting the animation set. Calling setTarget() sets a single target object for all children of the AnimatorSet as a convenience. The following code shows how to do this:

	AnimatorSet set = (AnimatorSet) AnimatorInflater.loadAnimator(myContext,
	    R.anim.property_animator);
	set.setTarget(myObject);
	set.start();

### ObjectAnimator和ValueAnimator

ObjectAnimator继承自ValueAnimator。ValueAnimator包含Property Animation动画的所有核心功能，如开始值，结束值，持续时间等属性，以及相应时间属性值的计算方法等。应用Property Animation有两个步聚：

1. 计算属性值。
2. 根据属性值执行相应的动作，如改变对象的某一属性。

ObjectAnimator可以自动完成两步，而ValueAnimiator只完成了第一步工作，如果要完成第二步，需要实现ValueAnimator.onUpdateListener接口，这个接口只有一个函数onAnimationUpdate()，在这个函数中会传入ValueAnimator对象做为参数，通过这个ValueAnimator对象的getAnimatedValue()函数可以得到当前的属性值如：

	ValueAnimator animation = ValueAnimator.ofFloat(0f, 1f);
	animation.setDuration(1000);
	animation.addUpdateListener(new AnimatorUpdateListener() {
	    @Override
	    public void onAnimationUpdate(ValueAnimator animation) {
	        Log.i("update", ((Float) animation.getAnimatedValue()).toString());
	    }
	});
	animation.setInterpolator(new CycleInterpolator(3));
	animation.start();

实际应用中一般都会用ObjectAnimator来改变某一对象的某一属性。

要想使用ObjectAnimator，应该满足以下条件：

1. 对象应该有一个setter函数：`set<PropertyName>`（驼峰命名法）
2. 如上面的例子中，像ofFloat之类的工场方法，第一个参数为对象名，第二个为属性名，后面的参数为可变参数，如果values…参数只设置了一个值的话，那么会假定为目的值，属性值的变化范围为当前值到目的值，为了获得当前值，该对象要有相应属性的getter方法：`get<PropertyName>`
3. 如果有getter方法，其应返回值类型应与相应的setter方法的参数类型一致。

如果上述条件不满足，则不能用ObjectAnimator，应用ValueAnimator代替。

在Java中的使用Object Property的方法如下：

	tv=(TextView)findViewById(R.id.textview1);
	btn=(Button)findViewById(R.id.button1);
	btn.setOnClickListener(new OnClickListener() {
	　　@Override
	　　public void onClick(View v) {
	　　　　ObjectAnimator oa=ObjectAnimator.ofFloat(tv, "alpha", 0f, 1f);
	　　　　oa.setDuration(3000);
	　　　　oa.start();
	　　}
	});

**根据应用动画的对象或属性的不同，可能需要在onAnimationUpdate函数中调用invalidate()函数刷新视图。**	

### AnimatorSet

AnimatorSet 用于定义动画的集合，常用的属性为android:ordering表示动画播放的顺序，取值为：

- sequentially 顺序播放。
- together 同时播放。

以下例子同时应用5个动画：

播放anim1；
同时播放anim2,anim3,anim4；
播放anim5。

	AnimatorSet bouncer = new AnimatorSet();
	bouncer.play(anim1).before(anim2);
	bouncer.play(anim2).with(anim3);
	bouncer.play(anim2).with(anim4)
	bouncer.play(anim5).after(amin2);
	animatorSet.start();

### ViewPropertyAnimator

ViewPropertyAnimator和ObjectAnimator类似，都是用于处理对象属性动画的。不同之处在于，ViewPropertyAnimator可以并行地作用于多个属性，而一个ObjectAnimator对象只能作用于一个属性上。而且，在多个属性上应用动画时使用ViewPropertyAnimator更高效。以下使用三种方法将动画同时作用于某个控件的x和y坐标。

使用多个ObjectAnimator对象：

	ObjectAnimator animX = ObjectAnimator.ofFloat(myView, "x", 50f);
	ObjectAnimator animY = ObjectAnimator.ofFloat(myView, "y", 100f);
	AnimatorSet animSetXY = new AnimatorSet();
	animSetXY.playTogether(animX, animY);
	animSetXY.start();

使用一个ObjectAnimator：

	PropertyValuesHolder pvhX = PropertyValuesHolder.ofFloat("x", 50f);
	PropertyValuesHolder pvhY = PropertyValuesHolder.ofFloat("y", 100f);
	ObjectAnimator.ofPropertyValuesHolder(myView, pvhX, pvyY).start();

使用ViewPropertyAnimator：

	myView.animate().x(50f).y(100f);

ViewPropertyAnimator的更多内容请参考 [Introducing ViewPropertyAnimator](http://android-developers.blogspot.com/2011/05/introducing-viewpropertyanimator.html)。


### TypeEvalutors和TimeInterplator

ValueAnimator封装了一个TimeInterpolator和TypeAnimator。TimeInterpolator定义了属性值在开始值与结束值之间的插值方法，TypeAnimator根据开始、结束值与TimeIniterpolator计算得到的值计算出属性值。

![ValueAnimator](http://developer.android.com/images/animation/valueanimator.png)

Android提供了以下几个evalutor：

- IntEvaluator：属性的值类型为int；
- FloatEvaluator：属性的值类型为float；
- ArgbEvaluator：属性的值类型为十六进制颜色值；

自定义TypeEvalutor很简单，只需要实现一个方法，如FloatEvalutor的定义：

	public class FloatEvaluator implements TypeEvaluator {
	    public Object evaluate(float fraction, Object startValue, Object endValue) {
	        float startFloat = ((Number) startValue).floatValue();
	        return startFloat + fraction * (((Number) endValue).floatValue() - startFloat);
	    }
	}

在Property Animation中是TimeInterplator，在View Animation中是Interplator，Interplator继承自TimeInterplator，内部没有任何其他代码。Android中提供以下TimeInterplator：

- AccelerateInterpolator 加速，开始时慢中间加速
- DecelerateInterpolator 减速，开始时快然后减速
- AccelerateDecelerateInterolator 先加速后减速，开始结束时慢，中间加速
- AnticipateInterpolator 反向 ，先向相反方向改变一段再加速播放
- AnticipateOvershootInterpolator 反向加回弹，先向相反方向改变，再加速播放，会超出目的值然后缓慢移动至目的值
- BounceInterpolator 跳跃，快到目的值时值会跳跃，如目的值100，后面的值可能依次为85，77，70，80，90，100
- CycleIinterpolator 循环，动画循环一定次数，值的改变为一正弦函数：Math.sin(2 * mCycles * Math.PI * input)
- LinearInterpolator 线性，线性均匀改变
- OvershottInterpolator 回弹，最后超出目的值然后缓慢改变到目的值

与之对应的Android标签以及更多使用方法请参考 [Interpolator](http://developer.android.com/guide/topics/resources/animation-resource.html#Interpolators)

应用interpolator的方法如：

	<set android:interpolator="@android:anim/accelerate_interpolator">
	    ...
	</set>

ValueAnimator根据动画已进行的时间跟动画总时间(duration)的比计算出一个时间因子(0~1，然后根据TimeInterpolator计算出另一个因子，最后TypeAnimator通过这个因子计算出属性值。

如使用LinearInterpolator的例子：

![LinearInterpolator](http://developer.android.com/images/animation/animation-linear.png)

时间因子（即经过的时间百分比）为：t=10ms/40ms=0.25

使用AccelerateDecelerateInterolator的例子：

![AccelerateDecelerateInterolator](http://developer.android.com/images/animation/animation-nonlinear.png)

经插值计算(inteplator)后的插值因子:大约为0.15，上述例子中用了AccelerateDecelerateInterpolator，计算公式为（input即为时间因子）：

	(Math.cos((input + 1) * Math.PI) / 2.0f) + 0.5f;  

最后根据TypeEvaluator计算出在10ms时的属性值：`0.15*（40-0）=6pixel`。上例中TypeEvaluator为FloatEvaluator，计算方法为 ：

	public Float evaluate(float fraction, Number startValue, Number endValue) {
	    float startFloat = startValue.floatValue();
	    return startFloat + fraction * (endValue.floatValue() - startFloat);
	}

参数分别为上一步的插值因子，开始值与结束值。

### 其他

- [指定关键帧](http://developer.android.com/guide/topics/graphics/prop-animation.html#keyframes)
- [当Layout改变时应用动画](http://developer.android.com/guide/topics/graphics/prop-animation.html#layout) 如当一个元素在其父元素中变为Visible或者Gone时。

## View Animation

View animation只能应用于View对象。

View animation，它只是改变了View绘制效果，而**没有改变View对象本身的属性**，比如，你有一个Button，坐标(100,100)，Width:200,Height:50，而你有一个动画使其变为Width：100，Height：100，你会发现动画过程中触发按钮点击的区域仍是[(100,100),(300,150)]，而不是[(100,100),(200,200)]。这和Property Animation有很大的不同。

XML文件的根元素可以为`<alpha>`,`<scale>`,`<translate>`,`<rotate>`或`<set>`(表示以上几个动画的集合，set可以嵌套)。默认情况下，所有动画是同时进行的，可以通过startOffset属性设置各个动画的开始偏移（开始时间）来达到动画顺序播放的效果。

可以通过设置interpolator属性改变动画渐变的方式，如AccelerateInterpolator，开始时慢，然后逐渐加快。默认为AccelerateDecelerateInterpolator。

定义好动画的XML文件后，可以通过类似下面的代码对指定View应用动画。

	ImageView spaceshipImage = (ImageView)findViewById(R.id.spaceshipImage);
	Animation hyperspaceJumpAnimation=AnimationUtils.loadAnimation(this, R.anim.hyperspace_jump);
	spaceshipImage.startAnimation(hyperspaceJumpAnimation);

### Tween Animation

在XML中的使用语法如下：

	<?xml version="1.0" encoding="utf-8"?>
	<set xmlns:android="http://schemas.android.com/apk/res/android"
	    android:interpolator="@[package:]anim/interpolator_resource"
	    android:shareInterpolator=["true" | "false"] >
	    <alpha
	        android:fromAlpha="float"
	        android:toAlpha="float" />
	    <scale
	        android:fromXScale="float"
	        android:toXScale="float"
	        android:fromYScale="float"
	        android:toYScale="float"
	        android:pivotX="float"
	        android:pivotY="float" />
	    <translate
	        android:fromXDelta="float"
	        android:toXDelta="float"
	        android:fromYDelta="float"
	        android:toYDelta="float" />
	    <rotate
	        android:fromDegrees="float"
	        android:toDegrees="float"
	        android:pivotX="float"
	        android:pivotY="float" />
	    <set>
	        ...
	    </set>
	</set>

使用的例子如：

	<set xmlns:android="http://schemas.android.com/apk/res/android"
	    android:shareInterpolator="false">
	    <scale
	        android:interpolator="@android:anim/accelerate_decelerate_interpolator"
	        android:fromXScale="1.0"
	        android:toXScale="1.4"
	        android:fromYScale="1.0"
	        android:toYScale="0.6"
	        android:pivotX="50%"
	        android:pivotY="50%"
	        android:fillAfter="false"
	        android:duration="700" />
	    <set
	        android:interpolator="@android:anim/accelerate_interpolator"
	        android:startOffset="700">
	        <scale
	            android:fromXScale="1.4"
	            android:toXScale="0.0"
	            android:fromYScale="0.6"
	            android:toYScale="0.0"
	            android:pivotX="50%"
	            android:pivotY="50%"
	            android:duration="400" />
	        <rotate
	            android:fromDegrees="0"
	            android:toDegrees="-45"
	            android:toYScale="0.0"
	            android:pivotX="50%"
	            android:pivotY="50%"
	            android:duration="400" />
	    </set>
	</set>

This application code will apply the animation to an ImageView and start the animation:

	ImageView image = (ImageView) findViewById(R.id.image);
	Animation hyperspaceJump = AnimationUtils.loadAnimation(this, R.anim.hyperspace_jump);
	image.startAnimation(hyperspaceJump);



Tween Animation分为以下几种

- alpha AlphaAnimation 渐变透明度动画效果 
- scale ScaleAnimation 渐变尺寸伸缩动画效果 
- translate TranslateAnimation 画面转换位置移动动画效果 
- rotate RotateAnimation 画面转移旋转动画效果

Tween Animation的interpolator以及使用方法和Property Animation的TimeiInterpolator相同。

### Frame Animation

[AngelDevil](http://www.cnblogs.com/angeldevil/) 在[Android动画学习笔记-Android Animation](http://www.cnblogs.com/angeldevil/archive/2011/12/02/2271096.html)中提到在使用Frame Animation时，需要注意的几点：

1. 要在代码中调用Imageview的setBackgroundResource方法，如果直接在XML布局文件中设置其src属性当触发动画时会FC。
2. 在动画start()之前要先stop()，不然在第一次动画之后会停在最后一帧，这样动画就只会触发一次。
3. 最后一点是SDK中提到的，不要在onCreate中调用start，因为AnimationDrawable还没有完全跟Window相关联，如果想要界面显示时就开始动画的话，可以在onWindowFoucsChanged()中调用start()。

使用方法如

	<?xml version="1.0" encoding="utf-8"?>
	<animation-list xmlns:android="http://schemas.android.com/apk/res/android"
	    android:oneshot="false">
	    <item android:drawable="@drawable/rocket_thrust1" android:duration="200" />
	    <item android:drawable="@drawable/rocket_thrust2" android:duration="200" />
	    <item android:drawable="@drawable/rocket_thrust3" android:duration="200" />
	</animation-list>

This application code will set the animation as the background for a View, then play the animation:

	ImageView rocketImage = (ImageView) findViewById(R.id.rocket_image);
	rocketImage.setBackgroundResource(R.drawable.rocket_thrust);

	rocketAnimation = (AnimationDrawable) rocketImage.getBackground();
	rocketAnimation.start();

## Library

- [daimajia/AnimationEasingFunctions](https://github.com/daimajia/AnimationEasingFunctions)
- [Udinic / ActivitySplitAnimation](https://github.com/Udinic/ActivitySplitAnimation) Activity展开动画。
- [JakeWharton / NineOldAndroids](https://github.com/JakeWharton/NineOldAndroids) Android library for using the Honeycomb animation API on all versions of the platform back to 1.0!
- [koral--/android-gif-drawable](https://github.com/koral--/android-gif-drawable)
- [DesarrolloAntonio/FragmentTransactionExtended](https://github.com/DesarrolloAntonio/FragmentTransactionExtended)

## 参考

- [Android动画学习笔记-Android Animation](http://www.cnblogs.com/angeldevil/archive/2011/12/02/2271096.html)
- [Animation Resources](http://developer.android.com/guide/topics/resources/animation-resource.html)
- [View Animation](http://developer.android.com/guide/topics/graphics/view-animation.html)
- [Property Animation](http://developer.android.com/guide/topics/graphics/prop-animation.htm)
- [Animation Docs](http://developer.android.com/reference/android/view/animation/Animation.html#attr_android:repeatMode)
- [ListView Animation Tutorial](http://karnshah8890.blogspot.com/2013/04/listview-animation-tutorial.html)
- [Android Animations动画使用详解](http://blog.csdn.net/ithomer/article/details/7523328)
- [Building Animations with the android.transition Framework, Part 1](http://blog.bignerdranch.com/4541-building-animations-android-transition-framework-part-1)
- [Android Property Animations: Building Complex Animations | Cogito Learning](http://cogitolearning.co.uk/?p=1404)

## Tutorial

- [Getting Started with Activity & Fragment Transitions (part 1)](http://www.androiddesignpatterns.com/2014/12/activity-fragment-transitions-in-android-lollipop-part1.html)
- [Getting Started with Activity & Fragment Transitions (part 1)](http://www.androiddesignpatterns.com/2014/12/activity-fragment-transitions-in-android-lollipop-part1.html)
