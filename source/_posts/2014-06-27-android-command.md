layout: post
title: "Android Adb 常用命令"
category: Android
tags: [android, adb]
---
原文：[Handy adb commands for Android - Growing with the Web](http://www.growingwiththeweb.com/2014/01/handy-adb-commands-for-android.html)

## Adb

### View connected device(s)

Use this to view all connected devices and list their IDs.

    adb devices

If multiple devices are attached, use adb -s DEVICE_ID to target a specific device.

### Install an application

Use the install command to install an apk, the optional -r argument reinstalls and keeps any data if the application is already installed on the device.

    adb install -r APK_FILE
    
    # example
    adb install -r com.growingwiththeweb.example

### Uninstall an application

    adb uninstall PACKAGE_NAME
    
    # example
    adb uninstall com.growingwiththeweb.example

<!-- more -->

### Start an activity

    adb shell am start PACKAGE_NAME/ACTIVITY_IN_PACKAGE
    adb shell am start PACKAGE_NAME/FULLY_QUALIFIED_ACTIVITY
    
    # example
    adb shell am start -n com.growingwiththeweb.example/.MainActivity
    adb shell am start -n com.growingwiththeweb.example/com.growingwiththeweb.example.MainActivity

### Entering the device’s shell

    adb shell

### Take a screenshot

[Sergei Shvetsov](https://plus.google.com/113036707377007500168/) came up with a nice one liner that takes a screenshot with shell screencap and outputs it to a local directory using perl. Checkout [his blog](http://blog.shvetsov.com/2013/02/grab-android-screenshot-to-computer-via.html) for an explanation.

    adb shell screencap -p | perl -pe 's/\x0D\x0A/\x0A/g' > screen.png

### Unlock screen

This command sends the event that unlocks the lockscreen on the device.

    adb shell input keyevent 82

### Connecting to an Android Device Over WiFi

ADB can connect to a device over WiFi as well. You can enable ADB over WiFi on the device by executing the following set of commands on the device.

```shell
adb shell
setprop service.adb.tcp.port 9999
stop adbd start adbd
```

On the development computer, you can connect to the device using the following command:

    adb connect 192.168.1.1:9999

Make sure you replace 192.168.1.1 with the actual IP address associated with the Android device and 9999 with an available port on the device you wish to use for ADB.
The following command can be used to switch ADB back to the USB mode:

    adb usb

### Logging

To show the log stream on your command line.

    adb logcat

#### Filter by tagname

    adb logcat -s TAG_NAME
    adb logcat -s TAG_NAME_1 TAG_NAME_2
    
    #example
    adb logcat -s TEST
    adb logcat -s TEST MYAPP

#### Filter by priority

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

#### Filter by tagname and priority

    adb logcat -s TAG_NAME:PRIORITY
    adb logcat -s TAG_NAME_1:PRIORITY TAG_NAME_2:PRIORITY
    
    #example
    adb logcat -s TEST: W

#### Filter using grepAlternatively the output of logcat can be piped to grep on a system that supports it.

    adb logcat | grep "SEARCH_TERM"
    adb logcat | grep "SEARCH_TERM_1\|SEARCH_TERM_2"
    
    #example
    adb logcat | grep "Exception"
    adb logcat | grep "Exception\|Error"

#### Clearing the logcat buffer

Use this to clear the buffer to remove any old log data.

    adb logcat -c

## Building Android Applications

To compile and package the application into what is known as an Android Package (APK) from the command line, we will use Apache Ant.

To create a new Android project from the command line:

```sh
$ mkdir project_dir
$ cd project_dir
$ android create project -n HelloWorld -p ./ -t android-14
  -k com.helloworld --activity MainActivity
# -p is the path where the project files are to be generated
# -n Specified the name of the Project
# -t The android SDK to be used for compilation
# -k package name for the generated project
# --activity Name of the generated Activity Class
```

Here’s the output of the preceding command:

```sh
Created directory
/Users/<username>/project_dir/src/com/helloworld Added file
./src/com/helloworld/MainActivity.java Created directory
/Users/<username>/project_dir/res Created directory
/Users/<username>/project_dir/bin Created directory
/Users/<username>/project_dir/libs Created directory
/Users/<username>/project_dir/res/values Added file
./res/values/strings.xml Created directory
/Users/<username>/project_dir/res/layout Added file
./res/layout/main.xml Created directory
/Users/<username>/project_dir/res/drawable-xhdpi Created directory
/Users/<username>/project_dir/res/drawable-hdpi Created directory
/Users/<username>/project_dir/res/drawable-mdpi Created directory
/Users/<username>/project_dir/res/drawable-ldpi Added file
./AndroidManifest.xml Added file ./build.xml Added file
./proguard-project.txt
```

To create the Ant build system for an existing project created using Eclipse, run the following:

```sh
$ cd project_dir $ android update project -p .
# -p is the path
```

Now that we have a basic understanding of how Ant works, let’s address the functionality of some common build targets you will be using through your development.

```sh
# cleans up the compiled files and generated resources
ant clean

# compile and package a debug version of the app
ant debug

# builds the debug version and installs it on the device or the
# emulator. Another interesting aspect to observe is that you are chaining
# multiple targets in the order they were mentioned on the command line
ant debug install

# builds release version
ant release
```

If you want to release your Android application to Google Play or any other app store, you need to self-sign your application with a certificate. Details about creating a self-sign certificate can be found at the Android application signing instruction website.
In general, you will execute the following command to generate a signing key:

```sh
keytool -genkey -v -keystore project_release.keystore -alias \
 project -keyalg RSA -keysize 2048 -validity 10000
```

After running this command, the key tool will prompt you for a password and a number of distinguished data fields to identify your key and the keystore. It then generates the keystore as a file called project_release.keystore in the current directory. The keystore and key are protected by the passwords you entered. The keystore contains a single key, valid for 10,000 days. After having created a valid key store, you will have to inform the Android build system about the keystore to be used for your project. Do that by creating an ant.properties file in your project’s base directory (in the same directory as build.xml). In this file, you need to specify the paths to the signing key and the alias.

```
# sample ant.properties file
# Relative path to the keystore
key.store=project_release.keystore

# The alias for the
key.alias=project

# The password which you supplied while creating the alias for the
key.alias.password=MyPassword

# Password for the key
key.store.password=MyPassword
```



## Tutorial

- [official adb reference site](http://developer.android.com/tools/help/adb.html).
- [Get database from an Android app (Android 4.3+)](https://gist.github.com/ignasi/8706888)
