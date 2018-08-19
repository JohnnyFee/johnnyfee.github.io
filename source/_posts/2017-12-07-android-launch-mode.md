layout: post
title: Android Activity 启动模式
tags: [android, activity]
category: Android
---

英文原文：[Understand Android Activity's launchMode: standard, singleTop, singleTask and singleInstance](http://inthecheesefactory.com/blog/understand-android-activity-launchmode/en)  另外关于启动模式还有篇很好的文章：[Android中Activity四种启动模式和taskAffinity属性详解 ](http://blog.csdn.net/zhangjg_blog/article/details/10923643)

Activity是安卓上最聪明的设计之一，优秀的内存管理让多任务完美运行在最流行的操作系统之上。并不是让Activity在屏幕上启动就完事了，其启动方式也是需要关注的。这个话题的内容很多，其中很重要的就是启动模式（launchMode）。这也是我们这篇博客要讨论的内容。

因为不同的Activity有不同的目的。有些被设计成每发送一个intent都单独一个Activity工作，比如邮件客户端中撰写邮件的Activity，而有些则被设计成单例的，比如邮件收件箱的Activity。

这就是为什么指明一个Activity是否需要新建还是使用现有Activity是很有必要的，否则可能导致糟糕的用户体验。多亏了安卓的核心工程师，让launchMode可以帮助你专门应对这种情况。  

## 设置一个launchMode

一般地，我们可以直接在AndroidManifest.xml <activity>标签的一个属性中设置launchMode，如下：

```
<activity
    android:name=".SingleTaskActivity"
    android:label="singleTask launchMode"
    android:launchMode="singleTask">
```

有4种类型的launchMode，我们一个一个的看。

## standard

这是默认的模式。  

这种模式下，当Intent发送的时候，Activity总是被创建一个新的出来单独工作。想象一下，如果有发送10个撰写邮件的Intent，那么将有10个不同的Activity启动。

**在**Lollipop**之前设备上的表现**

****

这种Activity将被创建并置于栈顶，和发送intent的Activity处于同一个任务中。注：一般来讲，安卓第三个虚拟键所列出的那些就是任务。

![standardtopstandard](http://www.jcodecraeer.com/uploads/20150520/1432087372621766.jpg)

下面的图片显示了向标准启动模式的Activity分享照片时的情况。虽然分别来自不同的应用，但仍然它会和发送intent的Activity处于同一个任务中。

注：从图中可以看出分享图片的是Gallery应用。

![standardgallery2](http://www.jcodecraeer.com/uploads/20150520/1432087374604123.jpg)

同时你会看到此时任务管理器是这样的（有一点怪异）。

![gallerystandard](http://www.jcodecraeer.com/uploads/20150520/1432087376117515.jpg)

如果我们切换到另外一个应用然后再切回到Gallery，你会发现standard launchMode启动的Activity仍然在Gallery任务的上面，导致在操作Gallery之前，我们必须首先结束这个额外的Activity。

**在**Lollipop**设备上的表现**

如果Activity都是来自同一个应用，其表现和Lollipop之前的设备一样，在任务的顶端。

![standardstandardl](http://www.jcodecraeer.com/uploads/20150520/1432087379116164.jpg)

但是如果intent来自其他应用，将创建一个新的任务，同时新创建的Activity会被作为一个根Activity，如下：

![standardgalleryl](http://www.jcodecraeer.com/uploads/20150520/1432087381513369.jpg)

注：图片中的Task#2和Task#3分别表示两个任务，序号大的比序号小的后启动。  

下面是任务管理器中的样子：

![gallerystandardl1](http://www.jcodecraeer.com/uploads/20150520/1432087384460569.jpg)

发生这种情况的原因是Lollipop中任务管理系统做了修改，让它看起来更合理了。因为它们在不同的任务中，你可以直接切回Gallery，你还可以触发另一个Intent，创建新的与之前相同的任务。

![gallerystandardl2](http://www.jcodecraeer.com/uploads/20150520/1432087386731411.jpg)

撰写邮件的Activity或者发布社交网络状态的Activity都是采用这种Activity的例子。如果你希望Activity单独服务于一个Intent，就可以考虑standard启动模式。

## singleTop

接下来就是singleTop模式。它的表现几乎和standard模式一模一样，一个singleTop Activity 的实例可以无限多，唯一的区别是如果在栈顶已经有一个相同类型的Activity实例，Intent不会再创建一个Activity，而是通过onNewIntent()被发送到现有的Activity。

![singletop](http://www.jcodecraeer.com/uploads/20150520/1432087389219419.jpg)

在singleTop模式下我们需要同时在onCreate() 和 onNewIntent()中处理发来的intent，以满足不同情况。

这种启动模式的用例之一就是搜索功能。假设我们创建了一个搜索框，点击搜索的时候将导航到一个显示搜索结果列表的SearchActivity中，为了更好的用户体验，这个搜索框一般也会被放到SearchActivity中，这样用户想要再次搜索就不需要按返回键。

想像一下，如果每次显示搜索结果的时候我们都启动一个新的activity，10次搜索10个activity，那样当我们想返回最初的那个activity的时候需要按10次返回。

所以我们应该这样，如果栈顶已经有一个SearchActivity，我们将Intent发送给现有的activity，让它来更新搜索结果。这样就只会有一个在栈顶的SearchActivity，只需点一次back就可以回到之前的activity。

不管怎样，singleTop和它的调用者处在一个任务中。如果你想要让intent发送给另一个任务中处于栈顶的Activity，是不行的。

而当Intent来自于另外一个应用的时候，新的Activity的启动方式和standard模式是一致的（pre-Lollipop:处于调用者任务的栈顶，Lollipop:会创建一个新的任务）。

## singleTask

这种模式和standard以及singleTop有很大不同。singleTask模式的Activity只允许在系统中有一个实例。如果系统中已经有了一个实例，持有这个实例的任务将移动到顶部，同时intent将被通过onNewIntent()发送。如果没有，则会创建一个新的Activity并置放在合适的任务中。

**在同一个应用中的情况**

****

如果系统中还没有singleTask的Activity，会新创建一个，并放在同一任务的栈顶。

![singleTask1](http://www.jcodecraeer.com/uploads/20150520/1432087391351182.jpg)

但是如果已经存在，singleTask Activity上面的所有Activity将以合适的方式自动销毁，让我们想要显示的Activity处于栈顶。同时Intent也会通过onNewIntent()方法发送到这个singleTask Activity。

![singleTaskD](http://www.jcodecraeer.com/uploads/20150520/1432087394416117.jpg)

在用户体验方面，可能不是很合理，但是它就是这样设计的...

你可能注意到了 [官方文档](http://developer.android.com/guide/components/tasks-and-back-stack.html) 中提到的一个问题：  

>  系统会创建一个新的任务，并将这个Activity实例化为新任务的根部（root）。

但从实验结果来看，并不是这么回事。singleTask Activity仍然在任务的Activity栈顶，我们可以从dumpsys activity 命令显示上看出来：  

<pre>
Task id #239
  TaskRecord{428efe30 #239 A=com.thecheesefactory.lab.launchmode U=0 sz=2}
  Intent
 { act=android.intent.action.MAIN cat=[android.intent.category.LAUNCHER]
 flg=0x10000000 
cmp=com.thecheesefactory.lab.launchmode/.StandardActivity }
    Hist #1: ActivityRecord{429a88d0 u0 com.thecheesefactory.lab.launchmode/.SingleTaskActivity t239}
      Intent { cmp=com.thecheesefactory.lab.launchmode/.SingleTaskActivity }
      ProcessRecord{42243130 18965:com.thecheesefactory.lab.launchmode/u0a123}
    Hist #0: ActivityRecord{425fec98 u0 com.thecheesefactory.lab.launchmode/.StandardActivity t239}
      Intent
 { act=android.intent.action.MAIN cat=[android.intent.category.LAUNCHER]
 flg=0x10000000 
cmp=com.thecheesefactory.lab.launchmode/.StandardActivity }
      ProcessRecord{42243130 18965:com.thecheesefactory.lab.launchmode/u0a123}
</pre>

如果你希望singleTask Activity表现的和文档中描述的一致，你需要为singleTask Activity设置`taskAffinity`属性。  

```
<activity
    android:name=".SingleTaskActivity"
    android:label="singleTask launchMode"
    android:launchMode="singleTask"
    android:taskAffinity="">
```

这里是启动`SingleTaskActivity`的的结果（使用了`taskAffinity之后`）。

![singleTaskTaskAffinity](http://www.jcodecraeer.com/uploads/20150520/1432087640888692.jpg)

![screenshot17](http://www.jcodecraeer.com/uploads/20150520/1432087642408027.jpg)

是否使用`taskAffinity`取决于你自己。

**和其他应用一起工作的情况**

一旦intent是从另外的应用发送过来，并且系统中也没有任何Activity的实例，则会创建一个新的任务，并且新的Activity被作为根Activity创建。

![singleTaskAnotherApp1](http://www.jcodecraeer.com/uploads/20150520/1432087644832751.jpg)

![singletaskfromapp2](http://www.jcodecraeer.com/uploads/20150520/1432087647863217.jpg)

除非拥有这个singleTask Activity 的应用已经存在，那样的话，新建的Activity会置于这个任务的上面（而不是新建一个任务）。

![singleTaskAnotherApp2](http://www.jcodecraeer.com/uploads/20150520/1432087649102071.jpg)

_In case that there is an Activity 
instance existed in any Task, the whole Task would be moved to top and 
every single Activity placed above the singleTask Activity will be 
destroyed with lifecycle. _If back button is pressed, user has to travel through the Activities in the stack before going back to the caller Task.

_假设已经有了一个Activity的实例，不管它是在哪个任务中（包括上面的那种情况，在用于这个Activity的应用中），整个任务将被移到顶端，而singleTask  Activity上面的所有 Activity 都将被销毁_， 用户需要按back键遍历玩栈中的Activity才能回到调用者任务。

![singleTaskAnotherApp3](http://www.jcodecraeer.com/uploads/20150520/1432087652830427.jpg)

这种模式的应用案例有。邮件客户端的收件箱或者社交网络的时间轴。这些Activity一般不会设计成拥有多个实例，singleTask可以满足。但是在使用这种模式的时候必须要明智，因为有些Activity会在用户不知情的情况下被销毁。

## singleInstance

这个模式非常接近于singleTask，系统中只允许一个Activity的实例存在。**区别在于持有这个**Activity**的任务中只能有一个**Activity**：即这个单例本身。**If another Activity is called from this kind of Activity, a new Task 
would be automatically created to place that new Activity. Likewise, if 
singleInstance Activity is called, new Task would be created to place 
the Activity.

不过结果却很怪异，从`dumpsys`提供的信息来看，似乎系统中有两个任务但任务管理器中只显示一个,即最后被移到顶部的那个。导致虽然后台有一个任务在运行，我们却无法切换回去，这一点也不科学。

下面是当singleInstance Activity被调用的同时栈中已经有一些Activity的情况下所发生的事情：

![singleInstance](http://www.jcodecraeer.com/uploads/20150520/1432087655129646.jpg)

本来有两个任务，但是任务管理器中却只显示一个任务：

![singleInstances](http://www.jcodecraeer.com/uploads/20150520/1432087657657439.jpg)

Since this Task could has only one Activity, we couldn't switch back 
to Task #1 anymore. Only way to do so is to relaunch the application 
from launcher but it appears that the singleInstance Task would be 
hidden in the background instead.

因为这个任务只有一个Activity，我们再也无法切回到任务#1了。唯一的办法是重新在launcher中启动这个应用。 but之后的没有翻译，因为我也不明白作者的意思。

不过这个问题也有解决方案，就像我们在singleTask Acvity中做的，只要为`singleInstance Activity设置taskAffinity属性就可以了。`

<pre class="brush:js;toolbar:false prettyprint linenums prettyprinted" style="overflow: auto;">
1.  <activity
2.              android:name=".SingleInstanceActivity"
3.              android:label="singleInstance launchMode"
4.              android:launchMode="singleInstance"
5.              android:taskAffinity="">
</pre>

现在科学多了。  

![screenshot18](http://www.jcodecraeer.com/uploads/20150520/1432087705107940.jpg)

这种模式很少被使用。实际使用的案例如Launcher的Activity或者100%确定只有一个Activity的应用。总之除非完全有必要，不然我不建议使用这种模式。

## Intent Flags

除了在`AndroidManifest.xml`中直接设置launch mode，我们还可以通过叫做 **Intent Flags**的东西设置更多的行为，比如：

```xml
<activity
    android:name=".SingleInstanceActivity"
    android:label="singleInstance launchMode"
    android:launchMode="singleInstance"
    android:taskAffinity="">
```

这段代码将会启动一个singleTop启动模式的的`StandardActivity` 。  

有许多种Flag可以使用，更多的请参考[Intent](http://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_BROUGHT_TO_FRONT)。