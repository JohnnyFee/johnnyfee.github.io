layout: post
title: "Android Cordova Plugin Plugman"
description: ""
category: Cordova
tags: [android, cordova, plugin, plugman]
---

如果你使用的是以平台为中心(Platform-centered)的方法开发插件，你需要使用更底层的 [Plugman](https://github.com/apache/cordova-plugman/) 来管理插件。

<!-- see -->

See [Using Plugman to Manage Plugins - Apache Cordova](https://cordova.apache.org/docs/en/latest/plugin_ref/plugman.html)

## 安装

    $ npm install -g plugman

## 添加插件

    $ plugman --platform <ios|amazon-fireos|android|blackberry10|wp7|wp8> 
    --project <directory> 
    --plugin <name|url|path> [--plugins_dir <directory>] 
    [--www <directory>] [--variable <name>=<value> [--variable <name>=<value> ...]]

- `--platform` 指定平台。
- `--project` cordova 项目的平台位置。
- `--plugin` 指定插件。允许的值有以下几种：
    + name: 插件所在的目录名。该目录必须是 `--plugins_dir` 目录下存在的目录或者是 Cordova registry 中的插件。
    + url: 以 `https://` or `git://` 开头 git repo 地址，该库中必须包含 `plugin.xml` 文件。git 库中的内容将拷贝到 `--plugins_dir` 下。
    + path: 包含 `plugin.xml` 文件的插件路径。内容也会被拷贝到 `--plugins_dir` 下。
- `--plugins_dir` defaults to `<project>/cordova/plugins`。 插件路径。
- `--www` defaults to the `<project>/www`。 `www` 路径。
- `--variable` 安装插件时需要指定的变量。

如：

       $ plugman install --platform ios --project /path/to/my/project --plugin /path/to/my/plugin

## 移除插件

    $ plugman uninstall --platform <ios|amazon-fireos|android|blackberry10|wp7|wp8> 
    --project <directory> --plugin <id> [--www <directory>] [--plugins_dir <directory>]

## Registry Actions

There are a number of plugman commands that can be used for interacting with the [Plugin registry](http://plugins.cordova.io/).
Please note that these registry commands are specific to the _plugins.cordova.io_ plugin registry and may not be implemented by
third-party plugin registries.

### Searching for a Plugin

You can use Plugman to search the [Plugin registry](http://plugins.cordova.io/) for plugin id's that match the given space separated list of keywords.

```bash
plugman search <plugin keywords>
```

### Changing the Plugin Registry

You can get or set the URL of the current plugin registry that plugman is using. Generally you should leave this set at http://registry.cordova.io unless you want to use a third party plugin registry.

```bash
plugman config set registry <url-to-registry>
plugman config get registry
```

### Get Plugin Information

You can get information about any specific plugin stored in the plugin repository with:

```language-bash
plugman info <id>
```

This will contact the plugin registry and fetch information such as the plugin's version number.

## Installing Core Plugins

The examples below show how to add plugins as needed so that any
Cordova APIs you use in your project still work after you upgrade to
version 3.0.  For each command, you need to select the target
platform, and reference the platform's project directory.

* cordova-plugin-battery-status

    ```language-bash
    plugman install --platform <ios|android|blackberry10|wp8> --project <directory> --plugin cordova-plugin-battery-status
    ```

* cordova-plugin-camera

    ```language-bash
    plugman install --platform <ios|android|blackberry10|wp8> --project <directory> --plugin cordova-plugin-camera
    ```

* cordova-plugin-console

    ```language-bash
    plugman install --platform <ios|android|blackberry10|wp8> --project <directory> --plugin cordova-plugin-console
    ```

* cordova-plugin-contacts

    ```language-bash
    plugman install --platform <ios|android|blackberry10|wp8> --project <directory> --plugin cordova-plugin-contacts
    ```

* cordova-plugin-device

    ```language-bash
    plugman install --platform <ios|android|blackberry10|wp8> --project <directory> --plugin cordova-plugin-device
    ```

* cordova-plugin-device-motion (accelerometer)

    ```language-bash
    plugman install --platform <ios|android|blackberry10|wp8> --project <directory> --plugin cordova-plugin-device-motion
    ```

* cordova-plugin-device-orientation (compass)

    ```language-bash
    plugman install --platform <ios|android|blackberry10|wp8> --project <directory> --plugin cordova-plugin-device-orientation
    ```

* cordova-plugin-dialogs

    ```language-bash
    plugman install --platform <ios|android|blackberry10|wp8> --project <directory> --plugin cordova-plugin-dialogs
    ```

* cordova-plugin-file

    ```language-bash
    plugman install --platform <ios|android|blackberry10|wp8> --project <directory> --plugin cordova-plugin-file
    ```

* cordova-plugin-file-transfer

    ```language-bash
    plugman install --platform <ios|android|blackberry10|wp8> --project <directory> --plugin cordova-plugin-file-transfer
    ```

* cordova-plugin-geolocation

    ```language-bash
    plugman install --platform <ios|android|blackberry10|wp8> --project <directory> --plugin cordova-plugin-geolocation
    ```

* cordova-plugin-globalization

    ```language-bash
    plugman install --platform <ios|android|blackberry10|wp8> --project <directory> --plugin cordova-plugin-globalization
    ```

* cordova-plugin-inappbrowser

    ```language-bash
    plugman install --platform <ios|android|blackberry10|wp8> --project <directory> --plugin cordova-plugin-inappbrowser
    ```

* cordova-plugin-media

    ```language-bash
    plugman install --platform <ios|android|blackberry10|wp8> --project <directory> --plugin cordova-plugin-media
    ```

* cordova-plugin-media-capture

    ```language-bash
    plugman install --platform <ios|android|blackberry10|wp8> --project <directory> --plugin cordova-plugin-media-capture
    ```

* cordova-plugin-network-information

    ```language-bash
    plugman install --platform <ios|android|blackberry10|wp8> --project <directory> --plugin cordova-plugin-network-information
    ```

* cordova-plugin-splashscreen

    ```language-bash
    plugman install --platform <ios|android|blackberry10|wp8> --project <directory> --plugin cordova-plugin-splashscreen
    ```

* cordova-plugin-vibration

    ```language-bash
    plugman install --platform <ios|android|blackberry10|wp8> --project <directory> --plugin cordova-plugin-vibration
    ```