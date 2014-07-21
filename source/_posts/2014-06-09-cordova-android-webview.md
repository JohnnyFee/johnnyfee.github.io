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

1. To follow these instructions, make sure you have the latest Cordova distribution. Download it from [cordova.apache.org](http://cordova.apache.org/) and unzip its Android package.

2. Navigate to the Android package's /framework directory and run ant jar. It creates the Cordova .jar file, formed as /framework/cordova-x.x.x.jar.

3. Copy the .jar file into the Android project's /libs directory.

4. Add the following to the application's /res/xml/main.xml file, with the layout_height, layout_width and id modified to suit the application:

        <org.apache.cordova.CordovaWebView  
            android:id="@+id/tutorialView"  
            android:layout_width="match_parent"  
            android:layout_height="match_parent" />  

<!--more-->

5. Modify the activity so that it implements the CordovaInterface. It should implement the included methods. You may wish to copy them from `/framework/src/org/apache/cordova/CordovaActivity.java`, or else implement them on your own. The following code fragment shows a basic application that relies on the interface. Note how the referenced view id matches the id attribute specified in the XML fragment shown above:

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

6. If the application needs to use the camera, implement the following:

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
          
          
        @Override  
        /**  
         * Called when an activity you launched exits, giving you the requestCode you started it with,  
         * the resultCode it returned, and any additional data from it.  
         *  
         * @param requestCode       The request code originally supplied to startActivityForResult(),  
         *                          allowing you to identify who this result came from.  
         * @param resultCode        The integer result code returned by the child activity through its setResult().  
         * @param data              An Intent, which can return result data to the caller (various data can be attached to Intent "extras").  
         */  
        protected void onActivityResult(int requestCode, int resultCode, Intent intent) {  
            super.onActivityResult(requestCode, resultCode, intent);  
            CordovaPlugin callback = this.activityResultCallback;  
            if (callback != null) {  
                callback.onActivityResult(requestCode, resultCode, intent);  
            }  
        }  

7. Finally, remember to add the thread pool, otherwise plugins have no threads on which to run:

        @Override  
        public ExecutorService getThreadPool() {  
            return threadPool;  
        }  

8. Copy the application's HTML and JavaScript files to the Android project's `/assets/www` directory.

9. Copy the config.xml file from `/framework/res/xml` to the project's `/res/xml` directory.

## Threading

The plugin's JavaScript does not run in the main thread of the WebView interface; instead, it runs on the WebCore thread, as does the execute method. If you need to interact with the user interface, you should use the following variation:

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

Use the following if you do not need to run on the main interface's thread, but do not want to block the WebCore thread either:

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