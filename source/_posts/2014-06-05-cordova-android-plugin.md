---
layout: post
title: "Cordova Android Plugin"
category: Cordova
tags: [phonegap, cordova]
--- 

## 插件的目录结构

我们以 `org.apache.cordova.device` 插件为例：

    org.apache.cordova.device
    |   LICENSE
    |   package.json 插件的模块描述文件，模仿 Node。
    |   plugin.xml 插件的配置文件。
    |   README.md
    |
    +---doc
    |       index.md 插件的 API 文档。
    |
    +---src Native 层代码。
    |   +---android
    |   |       Device.java
    |   |
    |   +---ios
    |   |       CDVDevice.h
    |   |       CDVDevice.m
    |   |
    |   \...other platforms
    |
    \---www
            device.js JavaScript 层代码的实现。

<!--more-->

## plugin.xml

`plugin.xml` 的内容如下：

    <plugin xmlns="http://apache.org/cordova/ns/plugins/1.0"
        xmlns:rim="http://www.blackberry.com/ns/widgets"
        xmlns:android="http://schemas.android.com/apk/res/android"
        id="org.apache.cordova.device"
        version="0.2.9">
        <name>Device</name>
        <description>Cordova Device Plugin</description>
        <license>Apache 2.0</license>
        <keywords>cordova,device</keywords>
        <repo>https://git-wip-us.apache.org/repos/asf/cordova-plugin-device.git</repo>
        <issue>https://issues.apache.org/jira/browse/CB/component/12320648</issue>

        <js-module src="www/device.js" name="device">
            <clobbers target="device" />
        </js-module>

         <!-- android -->
        <platform name="android">
            <config-file target="res/xml/config.xml" parent="/*">
                <feature name="Device" >
                    <param name="android-package" value="org.apache.cordova.device.Device"/>
                </feature>
            </config-file>

            <source-file src="src/android/Device.java" target-dir="src/org/apache/cordova/device" />
        </platform>

         <!-- ios -->
        <platform name="ios">
            <config-file target="config.xml" parent="/*">
                <feature name="Device">
                    <param name="ios-package" value="CDVDevice"/>
                </feature>
            </config-file>

            <header-file src="src/ios/CDVDevice.h" />
            <source-file src="src/ios/CDVDevice.m" />
        </platform>

        <!--other platforms-->
    </plugin>

其中：

- id: 插件的标识，即发布到 [plugins.cordova.io](http://plugins.cordova.io/) 的 ID。
- name：插件的名称
- description：插件描述信息
- js-module 插件的 JavaScript 模块申明。

        <js-module src="www/device.js" name="device">
            <clobbers target="device" />
        </js-module>

    插件对应的 javascript 模块，src 属性指向 JavaScript 文件，如这里的 `www/device.js`。对于 Android 平台，插件安装后，该文件会被拷贝到 `assets/www/plugins/org.apache.cordova.device/www/` 下。该 JavaScript 文件被在 `index.html` 被加载。`clobbers` 为映射的变量，默认为全局变量，本例中将 device 模块映射为全局变量 `windows.device`。如果没有使用 `clobbers` 来映射，我们可以使用 `require` 方法来加载模块：

        var device = cordova.require('org.apache.cordova.device');

- platform：插件的平台配置，以 Android 为例。

        <config-file target="res/xml/config.xml" parent="/*">
            <feature name="Device" >
                <param name="android-package" value="org.apache.cordova.device.Device"/>
            </feature>
        </config-file>

    The service `name` matches the one used in the JavaScript exec call. The `value` is the Java class's fully qualified namespace identifier.

    安装插件后 `feature` 标签会被添加到 res/xml/config.xml 文件中。

        <source-file src="src/android/Device.java" target-dir="src/org/apache/cordova/device" />

    安装插件后，`src/android/Device.java` 复制到 android 的 package 包(`src/`)中。

## www/device.js

模块的写法采用 CommonJS Module 规范。

### The JavaScript Interface

    cordova.exec(function(winParam) {},
        function(error) {},
        "service",
        "action",
        ["firstArgument", "secondArgument", 42, false]);

Here is how each parameter works:

* `function(winParam) {}`: A success callback function. Assuming your exec call completes successfully, this function executes along with any parameters you pass to it.
* `function(error) {}`: An error callback function. If the operation does not complete successfully, this function executes with an optional error parameter.
* `"service"`: The service name to call on the native side. This corresponds to a native class, for which more information is available in the native guides listed below.
* `"action"`: The action name to call on the native side. This generally corresponds to the native class method. See the native guides listed below.
* [/* arguments */]: An array of arguments to pass into the native environment.

This example shows one way to implement the plugin's JavaScript interface:

    window.echo = function(str, callback) {  
        cordova.exec(callback, function(err) {  
            callback('Nothing to echo.');  
        }, "Echo", "echo", [str]);  
    };  

In this example, the plugin attaches itself to the window object as the echo function, which plugin users would call as follows:

    window.echo("echome", function(echoValue) {  
        alert(echoValue == "echome"); // should alert true.  
    });

## src/android/Device.java

    public class Device extends CordovaPlugin {
        public static String uuid;                                // Device UUID

        // ... other fileds

        public void initialize(CordovaInterface cordova, CordovaWebView webView) {
            super.initialize(cordova, webView);
            Device.uuid = getUuid();
        }

        /**
         * Executes the request and returns PluginResult.
         *
         * @param action            The action to execute.
         * @param args              JSONArry of arguments for the plugin.
         * @param callbackContext   The callback id used when calling back into JavaScript.
         * @return                  True if the action was valid, false if not.
         */
        public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
            if (action.equals("getDeviceInfo")) {
                JSONObject r = new JSONObject();
                r.put("uuid", Device.uuid);
                r.put("version", this.getOSVersion());
                r.put("platform", this.getPlatform());
                r.put("model", this.getModel());
                callbackContext.success(r);
            }
            else {
                return false;
            }
            return true;
        }

        /**
         * Get the device's Universally Unique Identifier (UUID).
         *
         * @return
         */
        public String getUuid() {
            String uuid = Settings.Secure.getString(this.cordova.getActivity().getContentResolver(), android.provider.Settings.Secure.ANDROID_ID);
            return uuid;
        }

        // ... other method
    }

其中：

- 插件必须继承插件父类 `CordovaPlugin`。
- `initialize` 重写父类的初始化方法，当插件被实例化后，该方法自动被调用。
- `execute` 重写父类的执行请求方法。
    
    execute 的方法签名为：

        public boolean execute(String action, JSONArray args, CallbackContext callbackContext)

    + action 用于标识插件的行为。
    + args 参数。
    + callbackContext 和 JavaScript 交互时的上下文。成功的话调用 `callbackContext.success(message)`，失败调用 `callbackContext.error(message)` 方法，分别对应 javascript 文件中的 success 和 error 回调函数。

## Android Plugin (Native Interfaces)

Android plugins are based on Cordova-Android, which consists of an Android WebView with hooks attached to it. Plugins are represented as class mappings in the `config.xml` file. A plugin consists of at least one Java class that extends the CordovaPlugin class, overriding one of its execute methods. As best practice, the plugin should also handle `pause` and `resume` events, along with any message passing between plugins. Plugins with long-running requests, background activity such as media playback, listeners, or internal state should implement the `onReset()` method as well. It executes when the WebView navigates to a new page or refreshes, which reloads the JavaScript.

Whether you distribute a plugin as Java file or as a jar file of its own, the plugin must be specified in your Cordova-Android application's `res/xml/config.xml` file. See Application Plugins for more information on how to use the `plugin.xml` file to inject this feature element:

    <feature name="<service_name>">
        <param name="android-package" value="<full_name_including_namespace>" />
    </feature>

The service `name` matches the one used in the JavaScript exec call. The value is the Java class's fully qualified namespace identifier. Otherwise, the plugin may compile but still be unavailable to Cordova.

### Plugin Initialization and Lifetime

One instance of a plugin object is created for the life of each WebView. Plugins are not instantiated until they are first referenced by a call from JavaScript, unless `<param>` with an onloadname attribute is set to "true" in `config.xml`. E.g.:

    <feature name="Echo">  
        <param name="android-package" value="<full_name_including_namespace>" />  
        <param name="onload" value="true" />  
    </feature>  

Plugins should use the initialize method for their start-up logic.

    @override  
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {  
        super.initialize(cordova, webView);
        // your init code here
    }

### Threading

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

### Android Integration

Android features an Intent system that allows processes to communicate with each other. Plugins have access to a CordovaInterface object, which can access the Android Activity that runs the application. This is the Context required to launch a new Android Intent. The CordovaInterface allows plugins to start an Activity for a result, and to set the callback plugin for when the Intent returns to the application.

As of Cordova 2.0, Plugins can no longer directly access the Context, and the legacy ctx member is deprecated. All ctx methods exist on the Context, so both getContext() and getActivity() can return the required object.

### Upgrading Android

- [PhoneGap API Documentation](http://docs.phonegap.com/en/edge/guide_platforms_android_upgrade.md.html#Upgrading%20Android)

## Reference

- [Plugin Development Guide](http://docs.phonegap.com/en/edge/guide_hybrid_plugins_index.md.html)
- [Cordova 开发属于自己的插件（plugin） —— 文翼的博客](http://wenzhixin.net.cn/2014/03/20/cordova_my_plugin)