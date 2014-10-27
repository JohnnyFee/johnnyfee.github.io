---
layout: post
title: "Cordova Android WebView"
category: Cordova
tags: [phonegap, cordova, webview,android]
--- 

使用 Cordova 实现自己的 Activity 时，有两种方法：

- 继承 `CordovaActivity`，使用 cordova 命令行生成的工程脚手架默认使用这种方式。
- 继承 `Activity`，实现 `CordovaInterface` 接口。如果你的 Activity 必须继承其他的类时，可以使用这种方式。接口的实现可以参考 `CordovaActivity`。

以下是官方使用第二方式来实现 Activity 的方法：

1. 下载最新的 Cordova，地址为 [cordova.apache.org](http://cordova.apache.org/) ，解压 Android 包。
2. 导航到 Android 包的 /framework 目录，运行 ant jar。它会创建 Cordova .jar 文件，格式为 `/framework/cordova-x.x.x.jar`。
3. 拷贝 .jar 文件到 Android 项目的 /lib 目录中。
4. 添加下面的代码到 /res/xml/main.xml 文件中：

        <org.apache.cordova.CordovaWebView  
            android:id="@+id/tutorialView"  
            android:layout_width="match_parent"  
            android:layout_height="match_parent" />  

    <!--more-->

5. 修改 Activity，使它实现 CordovaInterface 接口，它应该实现包含的方法。你可以从  `/framework/src/org/apache/cordova/CordovaActivity.java` 拷贝也可以自己实现。下面的代码片段显示了一个基于这个接口的基本应用。

        public class CordovaViewTestActivity extends Activity implements CordovaInterface {  
            CordovaWebView cwv;  
            /* Called when the activity is first created. */  
            @Override  
            public void onCreate(Bundle savedInstanceState) {  
                super.onCreate(savedInstanceState);  
                setContentView(R.layout.main);  
                cwv = (CordovaWebView) findViewById(R.id.tutorialView);  
                Config.init(this);  
                cwv.loadUrl(Config.getStartUrl());  
        }  

6. 如果应用需要使用 camera，按照下面的方式实现：

        @Override  
        public void setActivityResultCallback(CordovaPlugin plugin) {  
            this.activityResultCallback = plugin;  
        }  
        /**  
         * Launch an activity for which you would like a result when it finished. When this activity exits,  
         * your onActivityResult() method is called.  
         *  
         * @param command           The command object  
         * @param intent            The intent to start  
         * @param requestCode       The request code that is passed to callback to identify the activity  
         */  
        public void startActivityForResult(CordovaPlugin command, Intent intent, int requestCode) {  
            this.activityResultCallback = command;  
            this.activityResultKeepRunning = this.keepRunning;  

            // If multitasking turned on, then disable it for activities that return results  

            if (command != null) {  
                this.keepRunning = false;  
            }  
              
            // Start activity  
            super.startActivityForResult(intent, requestCode);  
        }     
          
          
        
        /**  
         * Called when an activity you launched exits, giving you the requestCode you started it with,  
         * the resultCode it returned, and any additional data from it.  
         *  
         * @param requestCode       The request code originally supplied to startActivityForResult(),  
         *                          allowing you to identify who this result came from.  
         * @param resultCode        The integer result code returned by the child activity through its setResult().  
         * @param data              An Intent, which can return result data to the caller (various data can be attached to Intent "extras").  
         */  
        @Override  
        protected void onActivityResult(int requestCode, int resultCode, Intent intent) {  
            super.onActivityResult(requestCode, resultCode, intent);  
            CordovaPlugin callback = this.activityResultCallback;  
            if (callback != null) {  
                callback.onActivityResult(requestCode, resultCode, intent);  
            }  
        }  

7. 最后，别忘了添加线程池，否则，插件没有可运行的线程：

        @Override  
        public ExecutorService getThreadPool() {  
            return threadPool;  
        }  

8. 拷贝应用的 HTML 和 JavaScript 文件到 Android 项目的 `/assets/www` 目录下。
9. 从 `/framework/res/xml` 拷贝 config.xml 文件到项目的 `/res/xml` 下。

## 线程

插件的 JavaScript 不会运行在 WebView 接口的主线程中，而是运行在 WebCore 线程中，execute 方法也是一样。如果你需要和 UI 交互，你应该使用下面的变种：

```java
@Override  
public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {  
  if ("beep".equals(action)) {  
    final long duration = args.getLong(0);  
    cordova.getActivity().runOnUiThread(new Runnable() {  
      public void run() {  
        ...  
        callbackContext.success(); // Thread-safe.  
      }  
    });  
    return true;  
  }  
  return false;  
} 
```

如果你不需要跑在主接口线程中，请使用下面的代码，但不要阻塞 WebCore 线程：

```java
@Override  
public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {  
  if ("beep".equals(action)) {  
    final long duration = args.getLong(0);  
    cordova.getThreadPool().execute(new Runnable() {  
      public void run() {  
        ...  
        callbackContext.success(); // Thread-safe.  
      }
    });  
    return true;  
  }  
  return false;  
}
```