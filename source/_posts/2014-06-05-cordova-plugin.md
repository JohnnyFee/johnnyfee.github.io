---
layout: post
title: "Cordova Tutorial"
category: Cordova
tags: [phonegap, cordova]
--- 

## Building a Plugin

## The JavaScript Interface

    cordova.exec(function(winParam) {},
        function(error) {},
        "service",
        "action",
        ["firstArgument", "secondArgument", 42, false]);

Here is how each parameter works:

* function(winParam) {}: A success callback function. Assuming your exec call completes successfully, this function executes along with any parameters you pass to it.
* function(error) {}: An error callback function. If the operation does not complete successfully, this function executes with an optional error parameter.
* "service": The service name to call on the native side. This corresponds to a native class, for which more information is available in the native guides listed below.
* "action": The action name to call on the native side. This generally corresponds to the native class method. See the native guides listed below.
* [/* arguments */]: An array of arguments to pass into the native environment.

### Sample JavaScript

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

## Android Plugin (Native Interfaces)

Android plugins are based on Cordova-Android, which consists of an Android WebView with hooks attached to it. Plugins are represented as class mappings in the `config.xml` file. A plugin consists of at least one Java class that extends the CordovaPlugin class, overriding one of its execute methods. As best practice, the plugin should also handle `pause` and `resume` events, along with any message passing between plugins. Plugins with long-running requests, background activity such as media playback, listeners, or internal state should implement the `onReset()` method as well. It executes when the WebView navigates to a new page or refreshes, which reloads the JavaScript.

Whether you distribute a plugin as Java file or as a jar file of its own, the plugin must be specified in your Cordova-Android application's res/xml/config.xml file. See Application Plugins for more information on how to use the plugin.xml file to inject this feature element:

    <feature name="<service_name>">
        <param name="android-package" value="<full_name_including_namespace>" />
    </feature>

The service name matches the one used in the JavaScript exec call. The value is the Java class's fully qualified namespace identifier. Otherwise, the plugin may compile but still be unavailable to Cordova.

### Plugin Initialization and Lifetime

One instance of a plugin object is created for the life of each WebView. Plugins are not instantiated until they are first referenced by a call from JavaScript, unless <param> with an onloadname attribute is set to "true" in config.xml. E.g.:

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

### Echo Android Plugin Example

To match the JavaScript interface's _echo_ feature described in Application Plugins, use the plugin.xml to inject a feature specification to the local platform's `config.xml` file:

    <platform name="android">
        <config-file target="config.xml" parent="/*">
            <feature name="Echo">
                <param name="android-package" value="org.apache.cordova.plugin.Echo"/>
            </feature>
        </config-file>
    </platform> 

Then add the following to the src/org/apache/cordova/plugin/Echo.java file:

    package org.apache.cordova.plugin;

    import org.apache.cordova.CordovaPlugin;
    import org.apache.cordova.CallbackContext;

    import org.json.JSONArray;
    import org.json.JSONException;
    import org.json.JSONObject;

    /**
     * This class echoes a string called from JavaScript.
     */
    public class Echo extends CordovaPlugin {

        @Override
        public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
            if (action.equals("echo")) {
                String message = args.getString(0);
                this.echo(message, callbackContext);
                return true;
            }
            return false;
        }

        private void echo(String message, CallbackContext callbackContext) {
            if (message != null && message.length() > 0) {
                callbackContext.success(message);
            } else {
                callbackContext.error("Expected one non-empty string argument.");
            }
        }
    }

### Android Integration

Android features an Intent system that allows processes to communicate with each other. Plugins have access to a CordovaInterface object, which can access the Android Activity that runs the application. This is the Context required to launch a new Android Intent. The CordovaInterface allows plugins to start an Activity for a result, and to set the callback plugin for when the Intent returns to the application.

As of Cordova 2.0, Plugins can no longer directly access the Context, and the legacy ctx member is deprecated. All ctx methods exist on the Context, so both getContext() and getActivity() can return the required object.

### Android WebViews

[PhoneGap API Documentation](http://docs.phonegap.com/en/edge/guide_platforms_android_webview.md.html#Android%20WebViews)

### Upgrading Android

- [PhoneGap API Documentation](http://docs.phonegap.com/en/edge/guide_platforms_android_upgrade.md.html#Upgrading%20Android)

## Reference

- [Plugin Development Guide](http://docs.phonegap.com/en/edge/guide_hybrid_plugins_index.md.html)