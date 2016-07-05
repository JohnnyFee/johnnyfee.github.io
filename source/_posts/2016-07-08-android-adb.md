layout: post
title: "Android Adb Commands"
description: ""
category: Android
tags: [android, adb, command]
---

To get Android version you can use:

```
adb shell getprop ro.build.version.release
```

to get API level:

```
adb shell getprop ro.build.version.sdk
```

You can see all available properties with this command:

```
adb shell getprop
```

See [shell - get android OS version of device connected via adb - Stack Overflow](http://stackoverflow.com/questions/29968096/get-android-os-version-of-device-connected-via-adb)