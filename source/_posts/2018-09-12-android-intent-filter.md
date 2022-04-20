layout: post
title: Android Intent Filter
tags: [android, intent]
category: Android
---

From [你必须弄懂的Intent Filter匹配规则 - Android研发专栏 - CSDN博客](https://blog.csdn.net/mynameishuangshuai/article/details/51673273)

## Intent简介

Android中提供了Intent机制来协助应用间的交互与通讯，Intent负责对应用中一次操作的动作、动作涉及数据、附加数据进行描述，Android则根据此Intent的描述，负责找到对应的组件，将 Intent传递给调用的组件，并完成组件的调用。Intent不仅可用于应用程序之间，也可用于应用程序内部的 Activity/Service 之间的交互。因此，Intent在这里起着一个媒体中介的作用，专门提供组件互相调用的相关信息，实现调用者与被调用者之间的解耦。在SDK中给出了 Intent 作用的表现形式为：

* 通过 `Context.startActivity()` or `Activity.startActivityForResult()`  启动一个Activity；
* 通过 Context.startService() 启动一个服务，或者通过Context.bindService() 和后台服务交互；
* 通过广播方法(比如 Context.sendBroadcast(),Context.sendOrderedBroadcast(),    
    Context.sendStickyBroadcast()) 发给broadcast receivers。

    **Intent可分为隐式（implicitly）和显式（explicitly）两种：**

### （1）显式 Intent

即在构造Intent对象时就指定接收者，它一般用在知道目标组件名称的前提下，一般是在相同的应用程序内部实现的，如下：

```hljs
Intent intent = new Intent(MainActivit.this, NewActivity.class);
startActivity(intent );
```

上面那个intent中，直接指明了接收者：NewActivity

### 2）隐式 Intent

即Intent的发送者在构造Intent对象时，并不知道也不关心接收者是谁，有利于降低发送者和接收者之间的耦合，它一般用在没有明确指出目标组件名称的前提下，一般是用于在不同应用程序之间，如下：

```hljs
Intent intent = new Intent();
intent.setAction("com.wooyun.test");
startActivity(intent);
```

上面那个intent，没有指明接收者，只是给了一个action作为接收者的过滤条件。   
对于显式Intent，Android不需要去做解析，因为目标组件已经很明确，Android需要解析的是那些隐式Intent，通过解析，将Intent映射给可以处理此Intent的Activity、IntentReceiver或Service。        

## Intent Filter匹配规则

Intent解析机制主要是通过查找已注册在AndroidManifest.xml中的所有IntentFilter及其中定义的Intent，最终找到匹配的Intent。在这个解析过程中，Android是通过Intent的action、type、category这三个属性来进行匹配判断的。一个过滤列表中的action、type、category可以有多个，所有的action、type、category分别构成不同类别，同一类别信息共同约束当前类别的匹配过程。只有一个Intent同时匹配action、type、category这三个类别才算完全匹配，只有完全匹配才能启动Activity。另外一个组件若声明了多个Intent Filter，只需要匹配任意一个即可启动该组件。   
例如：

```hljs
<action android:name="com.wooyun.project.SHOW_CURRENT" />
<category android:name="android.intent.category.DEFAULT" />
<data android:mimeType="video/mpeg" android:scheme="http" . . . />
<data android:mimeType="image/*" />
<data android:scheme="http" android:type="video/*" />
```


### （1）action的匹配规则

action是一个字符串，如果Intent指明定了action，则目标组件的IntentFilter的action列表中就必须包含有这个action，否则不能匹配。一个Intent Filter中可声明多个action，Intent中的action与其中的任一个action在字符串形式上完全相同（注意，区分大小写，大小写不同但字符串内容相同也会造成匹配失败），action方面就匹配成功。可通过setAction方法为Intent设置action，也可在构造Intent时传入action。需要注意的是，隐式Intent必须指定action。比如我们在Manifest文件中为MyActivity定义了如下Intent Filter：

```hljs
<intent-filter>
    <action android:name="android.intent.action.SEND"/>
    <action android:name="android.intent.action.SEND_TO"/>
</intent-filter>
```


那么只要Intent的action为“SEND”或“SEND_TO”，那么这个Intent在action方面就能和上面那个Activity匹配成功。比如我们的Intent定义如下：

```hljs
Intent intent = new Intent("android.intent.action.SEND") ;
startActivity(intent);
```


那么我们的Intent在action方面就与MyActivity匹配了。   
Android系统预定义了许多action，这些action代表了一些常见的操作。常见action如下（Intent类中的常量）：

```hljs
Intent.ACTION_VIEW
Intent.ACTION_DIAL
Intent.ACTION_SENDTO
Intent.ACTION_SEND
Intent.ACTION_WEB_SEARCH
```

### （2）data的匹配规则

如果Intent没有提供type，系统将从data中得到数据类型。和action一样，同action类似，只要Intent的data只要与Intent Filter中的任一个data声明完全相同，data方面就完全匹配成功。   
**data由两部分组成**：mimeType和URI   
**MineType指的是媒体类型**：例如imgage/jpeg，auto/mpeg4和viedo/*等，可以表示图片、文本、视频等不同的媒体格式   
uri则由scheme、host、port、path | pathPattern | pathPrefix这4部分组成

```hljs
<scheme>://<host>:<port>/[<path>|<pathPrefix>|<pathPattern >]
```

例如：   
content://com.wooyun.org:200/folder/etc   
[http://www.wooyun.org:80/search/info](http://www.wooyun.org/search/info)

Intent的uri可通过setData方法设置，mimetype可通过setType方法设置。   
需要注意的是：若Intent Filter的data声明部分未指定uri，则缺省uri为content或file，Intent中的uri的scheme部分需为content或file才能匹配；若要为Intent指定完整的data，必须用setDataAndType方法，究其原因在，setData和setType方法的源码中我们发现：

```hljs
public Intent setData(Uri data) {
    mData = data;
    mType = null;
    return this;
}
```


```hljs
public Intent setType(String type) {
    mData = null;
    mType = type;
    return this;
}
```


这两个方法会彼此互相清除对方的值（这个比较逗），即setData会把mimeType置为null，setType会把uri置为null。   
下面我们来举例说明一下data的匹配。首先我们先来看一下Intent Filter中指定data的语法：

```hljs
<data android:scheme="String.“ 
          android:host="String"
          android:port="String"
          android:path="String"
          android:pathPattern="String"
          android:pathPrefix="String"
          android:mimeType="String"/>
    其中scheme、host等各个部分无需全部指定。
```


使用案例：   
（1）如果我们想要匹配 http 以 “.pdf” 结尾的路径，使得别的程序想要打开网络 pdf 时，用户能够可以选择我们的程序进行下载查看。   
我们可以将 scheme 设置为 “http”，pathPattern 设置为 “.*//.pdf”，整个 intent-filter 设置为：

```hljs
<intent-filter>  
    <action android:name="android.intent.action.VIEW"></action>  
    <category android:name="android.intent.category.DEFAULT"></category>  
    <data android:scheme="http" android:pathPattern=".*//.pdf"></data>  
</intent-filter>
```

如果你只想处理某个站点的 pdf，那么在 data 标签里增加  android:host=”yoursite.com” 则只会匹配 http://yoursite.com/xxx/xxx.pdf，但这不会匹配 www.yoursite.com，如果你也想匹配这个站点的话，你就需要再添加一个 data 标签，除了 android:host 改为 “www.yoursite.com” 其他都一样。

（2）如果我们做的是一个IM应用，或是其他类似于微博之类的应用，如何让别人通过 Intent 进行调用出现在选择框里呢？我们只用注册 android.intent.action.SEND 与 mimeType 为 “text/plain” 或 “_/_” 就可以了，整个 intent-filter 设置为：

```hljs
<intent-filter>  
    <action android:name="android.intent.action.SEND" />  
    <category android:name="android.intent.category.DEFAULT" />  
    <data mimeType="*/*" />  
</intent-filter>
```


这里设置 category 的原因是，创建的 Intent 的实例默认 category 就包含了 Intent.CATEGORY_DEFAULT ，google 这样做的原因是为了让这个 Intent 始终有一个 category。

![这里写图片描述](https://img-blog.csdn.net/20160614172340659)

（3）如果我们做的是一个音乐播放软件，当文件浏览器打开某音乐文件的时候，使我们的应用能够出现在选择框里？这类似于文件关联了，其实做起来跟上面一样，也很简单，我们只用注册 android.intent.action.VIEW 与 mimeType 为 “audio/*” 就可以了，整个 intent-filter 设置为：

```hljs
<intent-filter>  
     <action android:name="android.intent.action.VIEW" />  
     <category android:name="android.intent.category.DEFAULT" />  
     <data android:mimeType="audio/*" />  
</intent-filter>
```


![这里写图片描述](https://img-blog.csdn.net/20160614172309205)

### （3）category的匹配规则

category也是一个字符串，但是它与action的过滤规则不同，它要求Intent中个如果含有category，那么所有的category都必须和过滤规则中的其中一个category相同。也就是说，Intent中如果出现了category，不管有几个category，对于每个category来说，它必须是过滤规则中的定义了的category。当然，Intent中也可以没有category（若Intent中未指定category，系统会自动为它带上“android.intent.category.DEFAULT”），如果没有，仍然可以匹配成功。category和action的区别在于，action要求Intent中必须有一个action且必须和过滤规则中的某几个action相同，而category要求Intent可以没有category，但是一旦发现存在category，不论你有多少，每个都要能够和过滤规则中的任何一个category相同。我们可以通过addCategory方法为Intent添加category。

特别说明：

```hljs
<intent-filter>
    <action android:name="android.intent.action.MAIN" />

    <category android:name="android.intent.category.LAUNCHER" />
</intent-filter>
```


这二者共同出现，标明该Activity是一个入口Activity，并且会出现在系统应用列表中，二者缺一不可。

## Intent Filter常见问题汇总

### （1）path、pathPrefix、pathPattern 之间的区别 

path 用来匹配完整的路径，如：http://example.com/blog/abc.html，这里将 path 设置为 /blog/abc.html 才能够进行匹配；   
pathPrefix 用来匹配路径的开头部分，拿上来的 Uri 来说，这里将 pathPrefix 设置为 /blog 就能进行匹配了；   
pathPattern 用表达式来匹配整个路径，这里需要说下匹配符号与转义。   
匹配符号：   
“_” 用来匹配0次或更多，如：“a_” 可以匹配“a”、“aa”、“aaa”…   
“.” 用来匹配任意字符，如：“.” 可以匹配“a”、“b”，“c”…   
因此 “.*” 就是用来匹配任意字符0次或更多，如：“.*html” 可以匹配 “abchtml”、“chtml”，“html”，“sdf.html”…   
转义：因为当读取 Xml 的时候，“/” 是被当作转义字符的（当它被用作 pathPattern 转义之前），因此这里需要两次转义，读取 Xml 是一次，在 pathPattern 中使用又是一次。如：“_” 这个字符就应该写成 “//_”，“/” 这个字符就应该写成 “////”。

### （2）查询是否有Activity可以匹配我们指定Intent的组件

采用PackageManager的resolveActivity或者Intent的resolveActivity方法会获得最适合Intent的一个Activity   
调用PackageManager的queryIntentActivities会返回所有成功匹配Intent的Activity

### （3）android.intent.action.MAIN 与android.intent.category.LAUNCHER的区别

**区别一：**  
android.intent.action.MAIN决定一个应用程序最先启动那个组件   
android.intent.category.LAUNCHER决定应用程序是否显示在程序列表里(说白了就是是否在桌面上显示一个图标)   
这两个属性组合情况：   
**第一种情况**：有MAIN,无LAUNCHER，程序列表中无图标   
原因：android.intent.category.LAUNCHER决定应用程序是否显示在程序列表里    
**第二种情况**：无MAIN,有LAUNCHER，程序列表中无图标   
原因：android.intent.action.MAIN决定应用程序最先启动的Activity，如果没有Main，则不知启动哪个Activity，故也不会有图标出现   
所以这两个属性一般成对出现。   
如果一个应用中有两个组件intent-filter都添加了android.intent.action.MAIN和   
android.intent.category.LAUNCHER这两个属性， 则这个应用将会显示两个图标， 写在前面的组件先运行。   
**区别二：**

android.intent.category.LAUNCHER：android.intent.category.LAUNCHER决定应用程序是否显示在程序列表里，就是android开机后的主程序列表。   
android.intent.category.HOME：按住“HOME”键，该程序显示在HOME列表里。

### （4）关于隐式intent

每一个通过 startActivity() 方法发出的隐式 Intent 都至少有一个 category，就是 “android.intent.category.DEFAULT”，所以只要是想接收一个隐式 Intent 的 Activity 都应该包括 “android.intent.category.DEFAULT” category，不然将导致 Intent 匹配失败.   
比如说一个activity组件要想被其他组件通过隐式intent调用， 则其在manifest.xml中的声明如下：

```hljs
<activity android:name="com.wooyun.org.MainActivity">
     <intent-filter>  
           <action android:name="com.google.test" />
           <category android:name="android.intent.category.DEFAULT" />
 </intent-filter> 
</activity>
```


### （5）于intent-filter匹配优先级

首先查看Intent的过滤器(intent-filter),按照以下优先关系查找：action->data->category

参考链接：http://blog.csdn.net/cnnumen/article/details/8464786