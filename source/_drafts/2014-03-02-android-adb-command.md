---
layout: post
title: "Android Adb 常用命令"
category: Android
tags: [android, adb]
--- 
原文：[Handy adb commands for Android - Growing with the Web](http://www.growingwiththeweb.com/2014/01/handy-adb-commands-for-android.html)

## View connected device(s)

Use this to view all connected devices and list their IDs.

    adb devices

If multiple devices are attached, use adb -s DEVICE_ID to target a specific device.

## Install an application

Use the install command to install an apk, the optional -r argument reinstalls and keeps any data if the application is already installed on the device.

    adb install -r APK_FILE
    
    # example
    adb install -r com.growingwiththeweb.example

## Uninstall an application

    adb uninstall PACKAGE_NAME
    
    # example
    adb uninstall com.growingwiththeweb.example

## Start an activity

    adb shell am start PACKAGE_NAME/ACTIVITY_IN_PACKAGE
    adb shell am start PACKAGE_NAME/FULLY_QUALIFIED_ACTIVITY
    
    # example
    adb shell am start -n com.growingwiththeweb.example/.MainActivity
    adb shell am start -n com.growingwiththeweb.example/com.growingwiththeweb.example.MainActivity

## Entering the device’s shell

    adb shell

## Take a screenshot

[Sergei Shvetsov](https://plus.google.com/113036707377007500168/) came up with a nice one liner that takes a screenshot with shell screencap and outputs it to a local directory using perl. Checkout [his blog](http://blog.shvetsov.com/2013/02/grab-android-screenshot-to-computer-via.html) for an explanation.

    adb shell screencap -p | perl -pe 's/\x0D\x0A/\x0A/g' > screen.png

## Unlock screen

This command sends the event that unlocks the lockscreen on the device.

    adb shell input keyevent 82

## Logging

To show the log stream on your command line.

    adb logcat

### Filter by tagname

    adb logcat -s TAG_NAME
    adb logcat -s TAG_NAME_1 TAG_NAME_2
    
    #example
    adb logcat -s TEST
    adb logcat -s TEST MYAPP

### Filter by priority

To show logs of a specific priority warning and above.

    adb logcat "*:PRIORITY"
    
    # example
    adb logcat "*:W"

Here are the priority levels:

* V - Verbose (lowest priority)
* D - Debug
* I - Info
* W - Warning
* E - Error
* F - Fatal
* S - Silent (highest priority, on which nothing is ever printed)

### Filter by tagname and priority

    adb logcat -s TAG_NAME:PRIORITY
    adb logcat -s TAG_NAME_1:PRIORITY TAG_NAME_2:PRIORITY
    
    #example
    adb logcat -s TEST: W

### Filter using grepAlternatively the output of logcat can be piped to grep on a system that supports it.

    adb logcat | grep "SEARCH_TERM"
    adb logcat | grep "SEARCH_TERM_1\|SEARCH_TERM_2"
    
    #example
    adb logcat | grep "Exception"
    adb logcat | grep "Exception\|Error"

### Clearing the logcat buffer

Use this to clear the buffer to remove any old log data.

    adb logcat -c

## Further reading

See more details on the [official adb reference site](http://developer.android.com/tools/help/adb.html).
