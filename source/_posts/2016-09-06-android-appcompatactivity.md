layout: post
title: "AppCompatActivity"
description: ""
category: Android
tags: [android]
---

刚开始看HelloWorld的目录结构  
然后就发现Android Studio中的是

```scala
import android support.v7.app.AppcompatActivity;

public class MainActivity extends AppCompatActivity{
......
}
```

<!-- more -->

而不是继承自Activity

> 在光标指向AppCompatActivity，Ctrl+o即可查看本类中所有的方法  
> Alt+F7可以查看方法的引用  
> F4可以查看类的继承关系(Ctrl+H)

---

[Android Support Library(安卓兼容包)是为了构件一个可以跑在不同版本Android平台的软件。](https://segmentfault.com/a/1190000002702843)

重构AppCompat  
在新的AppCompat中，加入主题色，Toolbar等功能。在新版本中推荐使用AppCompatActivity代替ActionBarActivity。

android:theme  
新版本AppCompat允许了Toolbar使用android:theme代替app:theme,兼容API11+

```css
<android.support.v7.widget.Toolbar
            xmlns:android="http://schemas.android.com/apk/res/android"
            android:id="@+id/main_drawer_toolbar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            android:layout_below="@+id/main_statusBar"
            android:background="?attr/colorPrimary"
            android:translationZ="4dp"
            android:popupTheme="@style/ThemeOverlay.AppCompat.Light"
            android:theme="@style/ThemeOverlay.AppCompat.Dark.ActionBar"/>
```

AppCompatDialog对话框

终于加入MD对话框和新主题theme Theme.AppCompat.Dialog使用

```scala
AlertDialog.Builder builder = new AlertDialog.Builder(this);
    builder.setTitle("Dialog");
    builder.setMessage("少数派客户端");
    builder.setPositiveButton("OK", null);
    builder.setNegativeButton("Cancel", null);
    builder.show();
```

---

> 在API22之前我们使用标题栏基本都是在 ActionBarActivity的Activity 中处理的，而API22之后，谷歌遗弃了 ActionBarActivity，推荐我们也可以说是强制我们使用AppCompatActivity。  
> 然而 ActionBarActivity 和AppCompatActivity 的使用大同小异。

详解如下：

1.初探AppCompatActivity  
按照androidStudio默认顺序创建项目，默认Activity继承自AppCompatActivity.代码如下：

```scala
public class MainActivity extends AppCompatActivity { 
@Override 
protected void onCreate(Bundle savedInstanceState) { 
super.onCreate(savedInstanceState);
setContentView(R.layout.activity_main); 
}
}
```

运行。下面我们来一步一步扩展其标题栏，让它的内容更加丰富多彩。

1.  AppCompatActivity 与Toolbar结合

其实我们并不是要使用AppCompatActivity自带的标题栏，那样扩展会很麻烦，在14年的Android5.0的时候就用Toolbar替代了ActionBar，而ActionBarActivity又被AppCompatActivity替代，那么使用方法就是引入Toolbar设置到Activity中。

a. 首先我们必须在配置文件中，写入Toolbar，代码如下：

```css
<android.support.v7.widget.Toolbar 
android:id="@+id/activity_main_toolbar"     
android:layout_height="wrap_content" 
android:layout_width="match_parent" 
android:minHeight="?attr/actionBarSize" 
android:background="?attr/colorPrimary"> 

</android.support.v7.widget.Toolbar>
```

> 解释(1)android:minHeight = "?attr/actionBarSize":设置标题栏最小高度为ActionBar的高度。  
> 解释(2)android:background = "?attr/colorPrimary":该主题下的主色。也就是默认的灰色

我们知道在AndroidManifest.xml清单文件下application中设置了android:theme = "@style/AppTheme"而查看APPTheme看到如下样式

```xml
<resources> 
<!-- Base application theme. --> 
<style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar"> 
<!-- Customize your theme here. --> 
</style>
</resources>
```

从名字我们就可以看出来，默认的标题栏为黑色。我们使用了Toolbar就必须修改样式文件，将原来的标题栏去掉，修改后的样式文件如下：

```xml
<resources> 
<!-- Base application theme. --> 
<style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar"> 
<!-- Customize your theme here. --> 
</style>
</resources>
```

如下这个时候运行，那么你将看到界面也是没有标题栏的，因为你并没有设置到AppCompatActivity中去。

b. 将Toolbar显示到界面

我们创建一个方法名为initActionBar(),首先当然是获取Toolbar控件，然后将Toolbar设置到Activity中去。代码如下：

```cs
public void initActionBar() { 
Toolbar toolbar = (Toolbar) findViewById(R.id.activity_main_toolbar); 
setSupportActionBar(toolbar);
}
```

现在我们运行，我们将得到如下界面：

依然不是你期待的效果，下面我们将介绍AppCompatActivity的细节。

1.  AppCompatActivity详解

a. 设置title  
我们可以看到，标题栏始终显示我们的项目名，这样显然给用户看是不理想的。那么怎么设置标题栏的字符串。我们可以在setSupportActionBar(toolbar)之前加入如下代码：

```bash
setTitle("liyuanjinglyi");
```

此setTitle("liyuanjinglyj")是AppCompatActivity的方法，并不是Toolbar的方法，那么我们运行一下程序得到如下界面：

那么我们将刚才的AppCompatActivity的setTitle换成Toolbar的setTitle看看效果会怎么样，其实结果如上图一样，没有任何变化。

可能你希望title显示在中间，很遗憾，toolbar与AppCompatActivity并没有提供相关的方法，不过可以在toolbar中加入一个TextView，配置其属性，让其显示在最中间。

b. 设置回退按钮

假如我们这个界面并不是主界面，而是一个子界面，这个时候我有一个需求，需要回退到上一个界面，那么怎么设置左边的图标并实现其方法。其实很简单，在setSupportActionBar(toolbar);后面加入如下代码：

```java
toolbar.setNavigationIcon(R.drawable.back);
toolbar.setNavigationOnClickListener(new View.OnClickListener() { 

@Override 
public void onClick(View v) { 
finish(); 
}
});
```

为什么在setSupportActionBar(toolbar);后面假如而不在前面，你可以加入到前面试试，虽然可以显示回退的图片，但是点击并没有调用该按钮的点击事件，而在setSupportActionBar(toolbar);后面设置点击才有反应。一定要记住，不然回退是不会起作用的。

c. 设置logo

设置logo在标题栏并不少见，比如网易APP首页，其实代码很简单，也仅仅需要一条代码即可，在setSupportActionBar(toolbar)前加入如下代码：

```css
toolbar.setLogo(R.id.app_logo);
```

d.设置副标题  
在setSupportActionBar(toolbar)前加入如下代码：

```objectivec
toolbar.setSubtitile("liyuanjing");
```

运行界面后，如下：

e. 设置菜单

我们知道onCreateOptionMenu是上下文菜单，同理可以直接在该方法中设置菜单，代码如下：

```java
@Override
public boolean onCreateOptionsMenu(Menu menu) { 
getMenuInflater().inflate(R.menu.menu_main, menu); 
return true;
}
```

此方法为Activity方法。因为你在上面已经将Toolbar设置到了Activity中，所以默认也会显示到标题栏中，如果你觉得这样不习惯，那么你可以添加一条语句，不过这条语句添加与否都没关系。

```objectivec
toolbar.setOnCreateContextMenuListener(this);
```

1.  Toolbar的Style

标题下的Toolbar是蓝色，且有很好的Style，那么这是怎么设置呢？虽然我们这里重点是剖析Activity但是遇到有关Activity标题栏样式的还是要提到。

我们粗略的讲解上面的标题栏用到了哪些Style:

a. <item name = "colorPrimary">#4876FF<item>:如第一步直接在Toolbar控件下面设置的属性一样，就是Toolbar的颜色

b. <item name="colorPrimaryDark">#3A5FCD</item>：状态栏颜色也就是标题栏上面的那个颜色，而我用的是小米1S测试的，其固件并没有很好的实现其功能。

c. <item name = "android:windowBackground">@android:color/white</item>:窗口背景色，也就是Activity标题栏下面所有地方的颜色。

完整代码如下：

```xml
<!-- Base application theme. -->
<style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar"> 
<!-- toolbar（actionbar）颜色 --> 
<item name="colorPrimary">#4876FF</item> 
<!-- 状态栏颜色 --> 
<item name="colorPrimaryDark">#3A5FCD</item> 
<!-- 窗口的背景颜色 --> 
<item name="android:windowBackground">@android:color/white</item>     
</style>
```

1.  Toolbar菜单样式

我们来看看如果直接使用上面的点击后边的菜单会有什么效果：

需要完成的任务是将该菜单的样式和其他App一样，在标题栏下面弹出。

首先要说明一下，toolbar菜单默认样式的父类为Widget.AppCompat.Light.PopupMenu.Overflow，那么要更改toobar中菜单的弹出的样式，就必须继承这个父类的样式。

其代码如下：

```xml
<!-- Base application theme. -->
<style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar"> 
<!-- toolbar（actionbar）颜色 --> 
<item name="colorPrimary">#4876FF</item> 
<!-- 状态栏颜色 --> 
<item name="colorPrimaryDark">#3A5FCD</item> 
<!-- 窗口的背景颜色 --> 
<item name="android:windowBackground">@android:color/white</item>     
<item name="actionOverflowMenuStyle">@style/LYJMenuStyle</item>    
</style>

<style name="LYJMenuStyle" parent="@style/Widget.AppCompat.Light.PopupMenu.Overflow">     
<item name="overlapAnchor">false</item>
</style>
```

设置这一个属性那么其弹出的样式就与其他APP一样不会覆盖标题栏。

还有其他属性这里简要说明一下：

①<item name="android:popupBackground">?attr/colorPrimary</item>：弹出菜单背景色为标题栏的背景色

②<item name="android:dropDownVerticalOffset">0dip</item>：弹出菜单与标题栏的垂直间距

将这两条加入LYJMenuStyle中就可以了实现如下图所示的弹出菜单：

最后介绍一下菜单里面重要的几个属性：

app:showAsAction有三个值：  
always：总是显示在界面上never：不显示在界面上，只让出现在右边的三个点中ifRoom：如果有位置才显示，不然就出现在右边的三个点中

可以用 | 同时使用两个上面的值。

系统也为菜单提供了默认的分享菜单与查询菜单，代码如下：

app:actionViewClass="android.support.v7.widget.SearchView"  
app:actionProviderClass="android.support.v7.widget.ShareActionProvider"

从名字想必不需要过多解释，最后一个就是显示的[优先级](http://www.07net01.com/tags-%E4%BC%98%E5%85%88%E7%BA%A7-0.html)，也就是显示的顺序，谁在最前面，谁在后面：

android:orderInCategory数值越小，显示靠前，且优先级最大。

---

[Android Tips:Hello AppCompatActivity,Goodbye ActionBarActivity](https://blog.xamarin.com/android-tips-hello-appcompatactivity-goodbye-actionbaractivity/)

Beautiful Dialogs

Previously, to open a dialog may have used the following code:

```java
var builder = new AlertDialog.Builder (this);

builder.SetTitle ("Hello Dialog")  
.SetMessage ("Is this material design?")  
.SetPositiveButton ("Yes", delegate { Console.WriteLine("Yes"); })  
.SetNegativeButton ("No", delegate { Console.WriteLine("No"); }); 
```
builder.Create().Show ();