layout: post
title: "Android Loader"
description: ""
category: Android
tags: [android]
---

See [Android中Loader及LoaderManager的使用](http://blog.csdn.net/iispring/article/details/48834767)

## managedQuery方法的缺陷

Loader是用来更好地加载数据的，在我们谈论Loader之前，我们先研究一下Activity的managedQuery方法，该方法也是用于在Activity中加载数据的。在Android 3.0之前的版本中，我们如果想在Activity中通过ContentResolver对ContentProvider进行查询，我们可以方便的调用Activity的managedQuery方法，该方法的源码如下：

<!-- more -->

```java
@Deprecated
public final Cursor managedQuery(Uri uri, String[] projection, String selection,
        String[] selectionArgs, String sortOrder) {
    Cursor c = getContentResolver().query(uri, projection, selection, selectionArgs, sortOrder);
    if (c != null) {
        startManagingCursor(c);
    }
    return c;
}
```

从上面的代码我们可以看出managedQuery中通过ContentResolver执行了query方法，并将得到的Cursor对象交给startManagingCursor()方法来管理，这就导致了managedQuery方法存在如下缺陷：   

1. Activity的managedQuery方法内部在主线程上执行了ContentResolver的query()方法，但该方法是个耗时方法，很可能导致应用程序无响应，出现ANR现象。   

2. ContentResolver的query()方法返回了一个Cursor对象，将该Cursor对象传递给了startManagingCursor()方法，该方法是干嘛的呢？查看API文档，我们发现可以用startManagingCursor()方法管理Cursor的生命周期，使Cursor的生命周期与Activity的生命周期相对应，具体如下：

* 当Activity处于stopped状态的时候，会自动调用Cursor的deactive()方法
* 当Activity从stopped状态变为started状态的时候，其又会自动调用该Cursor的requery()方法重新查询数据
* 当Activity销毁的时候，该Cursor对象也会自动关闭
* 当Activity configuration发生变化的时候（比如手机的横屏竖屏来回切换等），Activity会重启，在重启的时候Cursor也会重新执行requery()方法

通过上面的描述，看起来startManagingCursor()很智能，而且貌似很完美地帮我们处理了Cursor的生命周期，但是我们需要注意的是，当Activity从onStop()转变到onStart()的时候，其会重新执行Cursor的requery()方法，但是该方法的执行时运行在主线程上的，并且Cursor的requery()方法也是耗时方法，该方法很有可能阻塞UI线程，导致ANR现象，并且在Activity重启的时候，也会导致Cursor执行requery()方法，进一步增加应用出现无响应的情况，即ANR。

综上，如果我们在Activity中调用了managedQuery()方法，那么我们就导致我们在主线程上执行ContentResolver的query()方法，并增大了在主线程上执行Cursor的requery()方法的几率，这两个方法都是耗时方法，都会阻塞主线程，因此，Activity中调用managedQuery()方法会极大增加应用出现ANR的现象。

## Loader相关的核心类

现在如果去看Android 最新的API查看Activity的startManagingCursor()方法，你会发现该方法从Android 3.0之后就被废弃掉了，Android官方建议用Loader作为替代，其实Loader的作用不仅仅是作为startManagingCursor()方法的替代品，**Loader以及LoaderManager是Android Framework中异步加载各种数据（不限于Cursor）的标准机制。**

Android从3.0版本之后引入了Loader以及LoaderManager，使得我们可以在Activity或Fragment中使用它们。Loader是加载器，它完成实际的数据加载工作。LoaderManager是Loader的管理着，其管理着一个或多个Loader的生命周期。

在应用程序中使用Loader常牵涉到以下的及各类：

**LoaderManager**：我们使用Loader加载数据时，实际上我们并不直接与Loader打交道，即我们无需也不应该调用Loader的相应的方法，相反，我们应用使用LoaderManager实现对Loader的管理。LoaderManager，顾名思义，就是Loader的管理器，我们可以在Activity或Fragment中通过调用getLoaderManager()方法获取到LoaderManager对象，一个Activity/Fragment只有一个单例的LoaderManager对象。LoaderManager可以管理一个或多个的Loader，能够维护Loader的生命周期。LoaderManger有两个方法我们会经常用到：initLoader()方法和restartLoader()方法。

* initLoader：通过调用LoaderManagr的initLoader()方法，我们可以创建一个Loader。
* restartLoader：通过调用LoaderManager的restartLoader()方法，我们可以重启一个Loader。
* destroyLoader：另外通过调用LoaderManager的destroyLoader()方法我们可以销毁一个Loader，不过该方法不常用，因为LoaderManager在合适的时机下会自动销毁Loader。

我们是在Activity或Fragment使用Loader的，Activity、Fragment与LoaderManagement交互类似于client-server模式，即Activity或Fragment是该client-server模型中的client端，即客户端，在本文中，我们所提到的客户端均指的是Loader的使用者，即Activity或Fragment。

**LoaderManager.LoaderCallbacks**：LoaderManager.LoaderCallbacks是LoaderManager中的内部接口，客户端与Loader的通信完全是事件机制，即客户端需要实现LoaderCallbacks中的各种回调方法，以响应Loader & LoaderManager触发的各种事件。客户端在调用LoaderManager的initLoader()或restartLoader()方法时，就需要客户端向这两个方法中传入一个LoaderCallbacks的实例。LoaderCallbacks有三个回调方法需要实现：onCreateLoader()、onLoadFinished()以及onLoaderReset()。

* onCreateLoader：我们要在onCreateLoader()方法内返回一个Loader的实例对象。很多情况下，我们需要查询ContentProvider里面的内容，那么我们就需要在onCreateLoader中返回一个CursorLoader的实例，CursorLoader继承自Loader。当然，如果CursorLoader不能满足我们的需求，我们可以自己编写自己的Loader然后在此onCreateLoader方法中返回。

* onLoadFinished：当onCreateLoader中创建的Loader完成数据加载的时候，我们会在onLoadFinished回调函数中得到加载的数据。在此方法中，客户端可以得到数据并加以使用，在这之前，如果客户端已经保存了一份老的数据，那么我们需要释放对老数据的引用。

* onLoaderReset：当之前创建的Loader被销毁（且该Loader向客户端发送过数据）的时候，就会触发onLoaderReset()回调方法，此时表明我们之前获取的数据被重置且处于无效状态了，所以客户端不应该再使用这份“过期”的无效的老数据，应该释放对该无效数据的引用。

**Loader**：Loader是具体的数据加载器，但是需要说明的是Loader类本身并不支持异步加载机制，所以当我们要编写自己的数据加载器的时候，我们不应该直接继承自Loader类，我们应该继承自AsyncTaskLoader类，AsyncTaskLoader支持异步加载机制，下面会对AsyncTaskLoader详细解释，此处不多说。Loader有许多public的方法，比如startLoading()、stopLoading()等，但是客户端不应该直接调用这些方法，这些方法是由LoaderManager调用的，如果客户端调用了这些public的方法，就很有可能导致Loader生命周期出现混乱，进而影响到LoaderManager对Loader的管理。

**AsyncTaskLoader**： AsyncTaskLoader继承自Loader，上面我们提到了Loader类本身没有异步加载数据的机制，但是AsyncTaskLoader具有异步加载的机制，这是因为AsyncTaskLoader内部使用了AsyncTask来进行异步数据加载，所以如果我们想实现自己的Loader，我们应该直接继承自AsyncTaskLoader类（或其子类），而非Loader类。AsyncTaskLoader中的loadInBackground()方法是抽象方法，所以AsyncTaskLoader是抽象类，其子类应该实现loadInBackground()方法，在该方法中应该实现具体的异步加载逻辑。总之，AsyncTaskLoader不会阻塞主线程。

**CursorLoader**：CursorLoader继承自AsyncTaskLoader，其实现了AsyncTaskLoader的loadInBackground()方法，在该方法中会执行ContentResolver的query()方法，从而实现对ContentProvider的数据查询，其得到的数据是Cursor对象。当我们想从ContentProvider中查询数据时候，我们不应该使用Activity中的managedQuery()方法，我们应该使用LoaderManager和CursorLoader，因为CursorLoader是异步加载数据，不会阻塞主线程。

下面一张图能反应出这几个类之间的关系：   
![这里写图片描述](http://img.blog.csdn.net/20150930001204214)

Activity与Fragment是客户端，客户端通过LoaderManager的initLoader或restartLoader向LoaderManager发起获取数据的请求，LoaderManager内部会创建相应的Loader去加载数据，数据加载完毕后会触发LoaderCallbacks中的相应回调方法，通过这些回调方法，Loader可以得知相应事件的触发。

## 示例代码

我根据Android API中的示例代码做了一个示例应用，并做了一些相应处理。该应用默认情况下会显示用户的所有联系人，也可以输入相应的关键字对联系人进行过滤，UI界面如下所示：

![这里写图片描述](http://img.blog.csdn.net/20150930003216022)

代码如下所示：

```java
package com.ispring.loaderdemo;

import android.app.Activity;
import android.app.LoaderManager;
import android.content.CursorLoader;
import android.content.Loader;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.KeyEvent;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.SimpleCursorAdapter;
import android.widget.TextView;

public class MainActivity extends Activity implements LoaderManager.LoaderCallbacks<Cursor>, TextWatcher {

    private EditText editText = null;

    private ListView listView = null;

    private SimpleCursorAdapter adapter = null;

    private final int CURSOR_LOADER_ID = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //绑定编辑框的文本变化事件
        editText = (EditText)findViewById(R.id.editText);
        editText.setOnEditorActionListener(new TextView.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
                return false;
            }
        });
        editText.addTextChangedListener(this);

        //获取ListView
        listView = (ListView)findViewById(R.id.listView);

        //创建Adapter
        adapter = new SimpleCursorAdapter(
                this,
                android.R.layout.simple_list_item_2,
                null,
                new String[]{ContactsContract.Contacts.DISPLAY_NAME, ContactsContract.Contacts.CONTACT_STATUS},
                new int[]{android.R.id.text1, android.R.id.text2},
                0);
        listView.setAdapter(adapter);

        //查询全部联系人
        Bundle args = new Bundle();
        args.putString("filter", null);
        LoaderManager lm = getLoaderManager();
        lm.initLoader(CURSOR_LOADER_ID, args, this);
    }

    @Override
    public void beforeTextChanged(CharSequence s, int start, int count, int after) {
    }

    @Override
    public void onTextChanged(CharSequence s, int start, int before, int count) {
    }

    @Override
    public void afterTextChanged(Editable s) {
        String filter = editText.getText().toString();
        Bundle args = new Bundle();
        args.putString("filter", filter);
        LoaderManager lm = getLoaderManager();
        lm.restartLoader(CURSOR_LOADER_ID, args, this);
    }

    @Override
    public Loader<Cursor> onCreateLoader(int id, Bundle args) {

        Uri uri;

        String filter = args != null ? args.getString("filter") : null;

        if(filter != null){
            //根据用户指定的filter过滤显示
            uri = Uri.withAppendedPath(ContactsContract.Contacts.CONTENT_FILTER_URI, Uri.encode(filter));
        }else{
            //显示全部
            uri = ContactsContract.Contacts.CONTENT_URI;
        }

        String[] projection = new String[]{
                ContactsContract.Contacts._ID,
                ContactsContract.Contacts.DISPLAY_NAME,
                ContactsContract.Contacts.CONTACT_STATUS
        };

        String selection = "((" + ContactsContract.Contacts.DISPLAY_NAME + " NOTNULL) AND "+
                "(" + ContactsContract.Contacts.HAS_PHONE_NUMBER + " =1) AND "+
                "(" + ContactsContract.Contacts.DISPLAY_NAME + " != ''))";

        String sortOrder = ContactsContract.Contacts.DISPLAY_NAME + " COLLATE LOCALIZED ASC";

        return new CursorLoader(this, uri, projection, selection, null, sortOrder);
    }

    @Override
    public void onLoadFinished(Loader<Cursor> loader, Cursor data) {
        adapter.swapCursor(data);
    }

    @Override
    public void onLoaderReset(Loader<Cursor> loader) {
        adapter.swapCursor(null);
    }
}
```

我们在AndroidManifest.xml中需要加入`android.permission.READ_CONTACTS`权限以读取联系人信息。

我们分析一下以上代码：

1. 首先MainActivity实现了LoaderManager.LoaderCallbacks接口，实现了其中的onCreateLoader()、onLoadFinished()和onLoaderReset()方法。

2. 在MainActivity的onCreate()方法中，我们为ListView创建了一个SimpleCursorAdapter对象，不过我们在SimpleCursorAdapter的构造函数中传入的cursor对象为null，因为我们后面会通过Loader得到该Cursor对象。

3. 我们创建了一个Bundle对象，并向其中添加了一个key为filter的键值对，值为null，表示我们不过滤，这在后面会用到。然后我们调用LoaderManager的initLoader(loaderId, bundle, LoaderCallbacks)方法，该方法会启动一个指定ID的Loader。

    - 该方法的第一个参数loaderId指的是我们要启动的Loader的ID，如果我们想要启动多个不同用途的Loader，那么我们就要给不同用途的Loader设置不同的loaderId，如果我们的Activity中只用到了一个Loader，那么此处的loaderId就不那么重要了，随便一个数字即可，比如0。
    - 该方法的第二个参数是Bundle对象，该对象携带了我们要创建Loader时所需要的必要信息，当然如果我们没有必要信息需要传递，那么第二个参数可以传递null。
    - 该方法的第三个参数是一个LoaderCallbacks对象，由于我们的MainActivity实现了LoaderCallbacks接口，所以我们此处就传递了this。

4. 在执行了LoaderManager的initLoader()方法之后，Android会首先查找LoaderManager中有没有指定loaderId的Loader，如果没有，就会执行LoaderCallbacks的onCreateLoader()方法去创建一个Loader，onCreateLoader()方法是个回调方法，该方法中的loaderId参数和Bundle参数都是在上面提到的LoaderManager的initLoader(loaderId， bundle, LoaderCallbacks)中传递过来的。由于我们的Activity中在业务逻辑上只用到一种类型的Loader，所以我们无需在onCreateLoader()方法中判断loaderId的类型做判断处理。然后我们根据传入的bundle对象判断是要查询全部联系人还是查询包含指定关键字的联系人，并基于创建了用于查询ContentProvider的Uri和sql语句，并将其作为CursorLoader()的构造函数，从而得到CursorLoader的实例对象。此处需要注意的是，虽然LoaderManager的initLoader()方法会返回一个Loader对象，但是我们在Activity中不应该保存该Loader对象，因为客户端不应该直接调用Loader的方法，所以保存一个Loader对象也是无意义的。在执行了LoaderManager的initLoader()方法之后，Android会将该方法得到的Loader对象保存在LoaderManager中。

5. 当我们创建的CursorLoader对象获取到Cursor数据的时候，Android会执行onLoadFinished()回调方法，在该方法的的形参中我们可以得到Cursor数据对象，然后调用`adapter.swapCursor(data)`方法，这样我们的ListView就会用我们得到的Cursor对象显示UI了。

6. 上面的过程演示了我们的应用在一开始的时候会显示所有的联系人信息，当我们文本编辑框中输入关键字的时候，会触发afterTextChanged()方法的执行，在该方法中我们又构建了一个Bundle对象，并将文本编辑框中的关键字放入到Bundle对象中，然后我们调用了LoaderManager的restartLoader(loaderId, Bundle, LoaderCallbacks)方法，该方法与initLoader(loaderId, Bundle, LoaderCallbacks)方法中的形参列表完全相同。当我们调用restartLoader()方法时，LoaderManager会首先查找看一下LoaderManager中是否已经存在该指定loaderId的Loader，如果有的话先标记一下。然后重新执行LoaderCallbacks的onCreateLoader()方法，不过这次由于Bundle中含有关键字信息，所以我们会利用该关键字构建Uri及sql语句，从而构建新的Loader，从而根据关键字从ContentProvider中过滤并加载新的数据。当该新的Loader完成加载数据之后，LoaderManager会首先看一下有没有标记过该loaderId对应的老的Loader，如果有的话会执行LoaderCallbacks的onLoaderReset()方法，从而告知客户端老的Cursor对象废弃无用了，所以我们在onLoaderReset()中执行`adapter.swapCursor(null)`，从而是客户端取消对原有Cursor对象的引用，在这之后LoaderManager会销毁该loaderId的老的Loader。然后LoaderManager又会马上将新的Loader得到的数据传递给LoaderCallbacks方法的onLoadFinished()方法中，这样我们就在onLoadFinished()中获取到了新的数据，并通过调用`adapter.swapCursor(data)`而使客户端能够应用到新的Cursor对象。

以上就是我们全部的逻辑代码，需要注意的是，我们在以上代码中并没有调用LoaderManager的destroyLoader()方法，因为在Activity和Fragment销毁执行onDestroy()的时候，Android会执行LoaderManager的doDestroy()方法，该方法会销毁LoaderManager中所存储的所有的Loader对象。需要注意的是，LoaderManager的doDestroy()方法不是一个public方法，所以在API文档中看不到，在源码中可以看到。

## 使用support v4 支持库

我们在上面提到，Loader机制是从Android 3.0才开始引入的，那么是不是Android 3.0之前我们就不能使用Loader了呢？

其实在Android 3.0之前，我们也可以使用Loader，方案就是使用Android提供的support v4支持库。

这里简单介绍一下Android的support支持库。Android系统在不断更新，每个版本都会推出许多重要的新的类和特性，那么为了让低版本的Android系统也能使用这些新的特性，Google的工程师们开发了许多向后支持库，目前有v4、v7、v8、v13、v14、v17等版本。支持库的命名原则很简单，就是”v”加上从开始支持的API Level，比如support v4支持从API Level 4开始的Android系统，即从Android 1.6开始可以使用support v4；support v7支持从API Level 7开始的Android系统，即从Android 2.1开始可以使用support v7。每个版本的support支持库都对应一个jar包，在使用时我们需要引入对应的jar包。需要注意的是，高版本的support支持库需要依赖低版本的support支持库，比如要使用support v7支持库，那么我们也必须同时引入support v4支持库，因为v7依赖v4。

每个support版本支持的特性不一样，拿support v4支持库来说，v4最大的作用就是可以使低版本的Android（1.6+）的系统可以使用Fragment和Loader，所以为了让低版本的Android能够使用Loader，我们需要使用support v4支持库，我们要对以上的源码进行一些类的替换，具体方法如下：

首先在MainActivity开头要引入support v4相关的类，即首先注释掉以下代码：

```java
import android.app.Activity;
import android.app.LoaderManager;
import android.content.Loader;
import android.content.CursorLoader;
import android.widget.SimpleCursorAdapter;
```

然后将其替换成如下的support v4的相关类：

```java
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.LoaderManager;
import android.support.v4.content.Loader;
import android.support.v4.content.CursorLoader;
import android.support.v4.widget.SimpleCursorAdapter;
```

让我们的MainActivity继承自`android.support.v4.app.FragmentActivity`而非直接继承自`android.app.Activity`。

将系统中两处调用`getLoaderManager()`的地方替换成`getSupportLoaderManager()`，`getSupportLoaderManager()`是`android.support.v4.app.FragmentActivity`中的方法，该方法返回`android.support.v4.app.LoaderManager`的实例，而非`android.app.LoaderManager`。

源码下载链接：   
http://download.csdn.net/detail/sunqunsunqun/9150955

如果想深入了解Loader的生命周期以及Loader、AsyncTaskLoader、CursorLoader、LoaderManager的源码执行过程，可参见博文[《深入源码解析Android中Loader、AsyncTaskLoader、CursorLoader、LoaderManager》](http://blog.csdn.net/iispring/article/details/48958117)。

## More

- [深入源码解析Android中Loader、AsyncTaskLoader、CursorLoader、LoaderManager](http://blog.csdn.net/iispring/article/details/48958117)   
- [使用详解及源码解析Android中的Adapter、BaseAdapter、ArrayAdapter、SimpleAdapter和SimpleCursorAdapter](http://blog.csdn.net/iispring/article/details/50793455)


