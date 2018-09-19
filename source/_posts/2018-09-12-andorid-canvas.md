layout: post
title: Android Canvas
tags: [android, canvas]
category: Android
---

Android中使用图形处理引擎，2D部分是android SDK内部自己提供，3D部分是用Open GL ES 1.0。今天我们主要要了解的是2D相关的，如果你想看3D的话那么可以跳过这篇文章。

大部分2D使用的api都在android.graphics和android.graphics.drawable包中。他们提供了图形处理相关的： Canvas、ColorFilter、Point(点)和RetcF(矩形)等，还有一些动画相关的：AnimationDrawable、 BitmapDrawable和TransitionDrawable等。以图形处理来说，我们最常用到的就是在一个View上画一些图片、形状或者自定义的文本内容，这里我们都是使用Canvas来实现的。你可以获取View中的Canvas对象，绘制一些自定义形状，然后调用View. invalidate方法让View重新刷新，然后绘制一个新的形状，这样达到2D动画效果。下面我们就主要来了解下Canvas的使用方法。

Canvas对象的获取方式有两种：一种我们通过重写View.onDraw方法，View中的Canvas对象会被当做参数传递过来，我们操作这个Canvas，效果会直接反应在View中。另一种就是当你想创建一个Canvas对象时使用的方法：

```
Bitmap b = Bitmap.createBitmap(100, 100, Bitmap.Config.ARGB_8888);   
Canvas c = new Canvas(b);
```

上面代码创建了一个尺寸是100*100的Bitmap，使用它作为Canvas操作的对象，这时候的Canvas就是使用创建的方式。当你使用创建的Canvas在bitmap上执行绘制方法后，你还可以将绘制的结果提交给另外一个Canvas，这样就可以达到两个Canvas协作完成的效果，简化逻辑。但是android SDK建议使用View.onDraw参数里提供的Canvas就好，没必要自己创建一个新的Canvas对象。接下来我们看看Canvas提供我们哪些绘制图形的方法。我们创建一个自定义View对象，使用onDraw方法提供的Canvas进行绘制图形。

CanvasDemoActivity.java：

```java
package com.android777.demo.uicontroller.graphics;   

import android.app.Activity;   
import android.content.Context;   
import android.graphics.Canvas;   
import android.graphics.Color;   
import android.graphics.Paint;   
import android.os.Bundle;   
import android.view.View;   
 
public class CanvasDemoActivity extends Activity {   

    @Override   
    protected void onCreate(Bundle savedInstanceState) {   
        super.onCreate(savedInstanceState);   

        setContentView(new CustomView1(this));   

    }   

    /**   
     \* 使用内部类 自定义一个简单的View   
     \* @author Administrator   
     \*   
     \*/
    class CustomView1 extends View{   

        Paint paint;   

        public CustomView1(Context context) {   
            super(context);   
            paint = new Paint(); //设置一个笔刷大小是3的黄色的画笔   
            paint.setColor(Color.YELLOW);   
            paint.setStrokeJoin(Paint.Join.ROUND);   
            paint.setStrokeCap(Paint.Cap.ROUND);   
            paint.setStrokeWidth(3);   
        }   

        //在这里我们将测试canvas提供的绘制图形方法   
        @Override   
        protected void onDraw(Canvas canvas) {   

        }   

    }   

}
```

执行结果是一片黑色的区域，因为在自定义的CustomView1中，我们没有做任何的绘制操作。canvas提供的绘制图形的方法都是以draw开头的，我们可以查看api：

![Css_bugtester](http://www.jcodecraeer.com/uploads/allimg/130305/19311M430-0.jpg)

从上面方法的名字看来我们可以知道Canvas可以绘制的对象有：**弧线(arcs)、填充颜色(argb和color)、 Bitmap、圆(circle和oval)、点(point)、线(line)、矩形(Rect)、图片(Picture)、圆角矩形 (RoundRect)、文本(text)、顶点(Vertices)、路径(path)**。通过组合这些对象我们可以画出一些简单有趣的界面出来，但是光有这些功能还是不够的，如果我要画一个仪表盘(数字围绕显示在一个圆圈中)呢？ 幸好Android还提供了一些对Canvas位置转换的方法：rorate、scale、translate、skew(扭曲)等，而且它允许你通过获得它的转换矩阵对象(getMatrix方法，不知道什么是转换矩阵？[看这里](http://www.android777.com/index.php/tutorial/use-of-2d-animation-tweening.html "使用2D动画 — 补间动画")) 直接操作它。这些操作就像是虽然你的笔还是原来的地方画，但是画纸旋转或者移动了，所以你画的东西的方位就产生变化。为了方便一些转换操作，Canvas 还提供了保存和回滚属性的方法(save和restore)，比如你可以先保存目前画纸的位置(save)，然后旋转90度，向下移动100像素后画一些图形，画完后调用restore方法返回到刚才保存的位置。下面我们就演示下canvas的一些简单用法：

```java
protected void onDraw(Canvas canvas) {   

    canvas.drawCircle(100, 100, 90, paint);   
}
```

效果是：

![](http://www.jcodecraeer.com/uploads/allimg/130305/19311J4E-1.jpg)

```java
@Override   
protected void onDraw(Canvas canvas) {   

    //绘制弧线区域   

    RectF rect = new RectF(0, 0, 100, 100);   

    canvas.drawArc(rect, //弧线所使用的矩形区域大小   
            0,  //开始角度   
             90, //扫过的角度   
             false, //是否使用中心   
             paint);   
 
}
```

![](http://www.jcodecraeer.com/uploads/allimg/130305/19311LN8-2.jpg)

使用下面的代码：[  ](http://www.android777.com/index.php/tutorial/wp-content/uploads/2011/04/g4.png)

```java
protected void onDraw(Canvas canvas) {   

    //绘制弧线区域   

    RectF rect = new RectF(0, 0, 100, 100);   

    canvas.drawArc(rect, //弧线所使用的矩形区域大小   
            0,  //开始角度   
            90, //扫过的角度   
             true, //是否使用中心   
             paint);   
 
}
```

![](http://www.jcodecraeer.com/uploads/allimg/130305/19311IW6-3.jpg)

两图对比我们可以发现，当 drawArcs(rect,startAngel,sweepAngel,useCenter,paint)中的useCenter为false时，弧线区域是用弧线开始角度和结束角度直接连接起来的，当useCenter为true时，是弧线开始角度和结束角度都与中心点连接，形成一个扇形。

```java
protected void onDraw(Canvas canvas) {   
    canvas.drawColor(Color.BLUE);   
}
```

![](http://www.jcodecraeer.com/uploads/allimg/130305/19311I022-4.jpg)

canvas.drawColor是直接将View显示区域用某个颜色填充满。

```java
@Override   
protected void onDraw(Canvas canvas) {   
    
    //画一条线   
    canvas.drawLine(10, 10, 100, 100, paint);   
    
}
```

![](http://www.jcodecraeer.com/uploads/allimg/130305/19311H643-5.jpg)

Canvas.drawOval：

```java
@Override   
protected void onDraw(Canvas canvas) {   
    
    //定义一个矩形区域   
    RectF oval = new RectF(0,0,200,300);   
    //矩形区域内切椭圆   
    canvas.drawOval(oval, paint);   
    
}
```

![](http://www.jcodecraeer.com/uploads/allimg/130305/1935452914-0.jpg)

canvas.drawPosText：

```java
@Override   
protected void onDraw(Canvas canvas) {   
    
    //按照既定点 绘制文本内容   
    canvas.drawPosText("Android777", new float[]{   
            10,10, //第一个字母在坐标10,10   
            20,20, //第二个字母在坐标20,20   
            30,30, //....   
            40,40,   
            50,50,   
            60,60,   
            70,70,   
            80,80,   
            90,90,   
            100,100   
    }, paint);   
    
}
```

![](http://www.jcodecraeer.com/uploads/allimg/130305/1935454O2-1.jpg)

canvas.drawRect：

```java
@Override   
    protected void onDraw(Canvas canvas) {   
    
        RectF rect = new RectF(50, 50, 200, 200);   
    
        canvas.drawRect(rect, paint);   
    
    }   
    
}
```

![](http://www.jcodecraeer.com/uploads/allimg/130305/1935455357-2.jpg)

canvas.drawRoundRect：

```java
@Override   
protected void onDraw(Canvas canvas) {   
    
    RectF rect = new RectF(50, 50, 200, 200);   
    
    canvas.drawRoundRect(rect,   
                        30, //x轴的半径   
                        30, //y轴的半径   
                        paint);   
    
}
```

![](http://www.jcodecraeer.com/uploads/allimg/130305/1935453P9-3.jpg)

canvas.drawPath：

```java
@Override   
protected void onDraw(Canvas canvas) {   
    
    Path path = new Path(); //定义一条路径   
    path.moveTo(10, 10); //移动到 坐标10,10   
    path.lineTo(50, 60);   
    path.lineTo(200,80);   
    path.lineTo(10, 10);   
    
    canvas.drawPath(path, paint);   
    
}
```

![](http://www.jcodecraeer.com/uploads/allimg/130305/1935455911-4.jpg)

canvas.drawTextOnPath：

```java
@Override   
        protected void onDraw(Canvas canvas) {   
    
            Path path = new Path(); //定义一条路径   
            path.moveTo(10, 10); //移动到 坐标10,10   
            path.lineTo(50, 60);   
            path.lineTo(200,80);   
            path.lineTo(10, 10);   
    
//          canvas.drawPath(path, paint);   
            canvas.drawTextOnPath("Android777开发者博客", path, 10, 10, paint);   
    
        }
```

![](http://www.jcodecraeer.com/uploads/allimg/130305/193545NE-5.jpg)

位置转换方法，canvas.rorate和canvas.translate：

```java
@Override   
protected void onDraw(Canvas canvas) {   
    
    paint.setAntiAlias(true);   
    paint.setStyle(Style.STROKE);   
    canvas.translate(canvas.getWidth()/2, 200); //将位置移动画纸的坐标点:150,150   
    canvas.drawCircle(0, 0, 100, paint); //画圆圈   
    
    //使用path绘制路径文字   
    canvas.save();   
    canvas.translate(-75, -75);   
    Path path = new Path();   
    path.addArc(new RectF(0,0,150,150), -180, 180);   
    Paint citePaint = new Paint(paint);   
    citePaint.setTextSize(14);   
    citePaint.setStrokeWidth(1);   
    canvas.drawTextOnPath("http://www.android777.com", path, 28, 0, citePaint);   
    canvas.restore();   
    
    Paint tmpPaint = new Paint(paint); //小刻度画笔对象   
    tmpPaint.setStrokeWidth(1);   
    
    float  y=100;   
    int count = 60; //总刻度数   
    
    for(int i=0 ; i <count ; i++){   
        if(i%5 == 0){   
            canvas.drawLine(0f, y, 0, y+12f, paint);   
            canvas.drawText(String.valueOf(i/5+1), -4f, y+25f, tmpPaint);   
    
        }else{   
            canvas.drawLine(0f, y, 0f, y +5f, tmpPaint);   
        }   
        canvas.rotate(360/count,0f,0f); //旋转画纸   
    }   
    
    //绘制指针   
    tmpPaint.setColor(Color.GRAY);   
    tmpPaint.setStrokeWidth(4);   
    canvas.drawCircle(0, 0, 7, tmpPaint);   
    tmpPaint.setStyle(Style.FILL);   
    tmpPaint.setColor(Color.YELLOW);   
    canvas.drawCircle(0, 0, 5, tmpPaint);   
    canvas.drawLine(0, 10, 0, -65, paint);   
    
}
```

![](http://www.jcodecraeer.com/uploads/allimg/130305/19354561M-6.jpg)  

上面几个例子基本已经将常用的canvas.draw*方法测试过了，我们结合一些事件，做一些有用户交互的应用：

```java
package com.android777.demo.uicontroller.graphics;   
    
import java.util.ArrayList;   
    
import android.app.Activity;   
import android.content.Context;   
import android.graphics.Canvas;   
import android.graphics.Color;   
import android.graphics.Paint;   
import android.graphics.PointF;   
import android.os.Bundle;   
import android.view.MotionEvent;   
import android.view.View;   
    
public class CanvasDemoActivity extends Activity {   
    
    @Override   
    protected void onCreate(Bundle savedInstanceState) {   
        super.onCreate(savedInstanceState);   
    
        setContentView(new CustomView1(this));   
    
    }   
    
    /**   
     \* 使用内部类 自定义一个简单的View   
     \* @author Administrator   
     \*   
     \*/
    class CustomView1 extends View{   
    
        Paint paint;   
        private ArrayList<PointF> graphics = new ArrayList<PointF>();   
        PointF point;   
    
        public CustomView1(Context context) {   
            super(context);   
            paint = new Paint(); //设置一个笔刷大小是3的黄色的画笔   
            paint.setColor(Color.YELLOW);   
            paint.setStrokeJoin(Paint.Join.ROUND);   
            paint.setStrokeCap(Paint.Cap.ROUND);   
            paint.setStrokeWidth(3);   
    
        }   
    
        @Override   
        public boolean onTouchEvent(MotionEvent event) {   
    
            graphics.add(new PointF(event.getX(),event.getY()));   
    
            invalidate(); //重新绘制区域   
    
            return true;   
        }   
    
        //在这里我们将测试canvas提供的绘制图形方法   
        @Override   
        protected void onDraw(Canvas canvas) {   
            for (PointF point : graphics) {   
                canvas.drawPoint(point.x, point.y, paint);   
            }   
//          super.onDraw(canvas);   
    
        }   
    }   
    
}
```

当用户点击时将出现一个小点，拖动时将画出一条用细点组成的虚线：

![](http://www.jcodecraeer.com/uploads/allimg/130305/1935452617-7.jpg)

**canvas的应用**

canva还可以制作很多自定义控件，比如google日历的monthview就是用canvas绘制出来的，github上有很多使用canva的项目，所有的图表库都是用canvas绘制的。

From [Android Canvas绘图详解（图文） - 泡在网上的日子](http://www.jcodecraeer.com/a/anzhuokaifa/androidkaifa/2012/1212/703.html)