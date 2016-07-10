layout: post
title: "Android Adb Commands"
description: ""
category: Android
tags: [android, adb, command]
---

## To get Android version you can use

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

解决adb运行故障：

    adb kill-server

看进程, 确保没有其他adb在运行
然后重启eclipse

    adb start-server

__Eclipse通过无线连接PAD__

1. PAD通过USB连接PC
2. 在PC上执行adb tcpip 5555
3. 在PC上执行adb connect ip:5555
4. 可以使用adb usb从tcp连接切换回usb连接

__查看设备__

    adb shell
    cd dev
    ls -l ttyU*

    adb connect 172.16.3.145:5555


停用跟豌豆荚相关的服务
