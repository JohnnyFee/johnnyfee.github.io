layout: post
title: "Ionic Tutorial"
category: Mobile
tags: [mobile]
---

[Ionic](http://ionicframework.com/) 是一个使用 HTML5 进行移动混合应用开发的开源框架，它专注于视觉，并集成 Cordova、Angular、Node、Grunt、Bowser、Sass 等，形成混合开发的解决方案。Ionic 的跨平台解决方案使用的是 Cordova。

## Install

Cordova command needs to use some programs located into your `sdk/tools` directory. You need also have installed **apache ant**.

Then you must add these directories into your `PATH` system variable:

**Background:**

<!-- more -->

* let's assume you have installed your [Android SDK](http://cordova.apache.org/docs/en/3.2.0/guide_platforms_android_index.md.html#Android%20Platform%20Guide_requirements_and_support) to the `c:\sdk\android` directory
* you have installed you **Apache ant** to the `c:\tools\apache-ant` directory

Then you must create two system variables:

1.  `ANDROID_HOME` with the `c:\sdk\android` value
2.  `ANT_HOME` with the `c:\tools\apache-ant` value

Finally, you must modify the `PATH` variable and add those two to the end of the `PATH`' value: 

```
%ANT_HOME%\bin;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools
```

**NOTE:** for those who uses Linux, the instruction differs a bit.

More documentation available [here](http://docs.phonegap.com/en/3.2.0/guide_platforms_android_index.md.html#Android%20Platform%20Guide).

See [windows - cordova platform add android not working while listing Android targets - Stack Overflow](http://stackoverflow.com/questions/20323787/cordova-platform-add-android-not-working-while-listing-android-targets)

## Quick Start

See [diegonetto/generator-ionic](https://github.com/diegonetto/generator-ionic)

```sh
# 1. Install Ionic
# 确保已经安装了 Node.js，也可以尝试 [driftyco/ionic-box](https://github.com/driftyco/ionic-box) 来 all-in-one 安装。
npm install -g cordova ionic

# 2. Start a project
ionic start myApp tabs

# 3. Run it
$ cd myApp
$ ionic platform add ios
$ ionic build ios
$ ionic emulate ios
```

See [Getting Started with Ionic - Ionic Framework](http://ionicframework.com/getting-started/)

## Form

- [ionic framework validation](https://gist.github.com/malixsys/8721568)

## Tools

- [Ionicons: The premium icon font for Ionic Framework](http://ionicons.com/)

## Demo

- [Ionic Expense Tracker Sample: Creating the Project - Wijmo](http://wijmo.com/expense-tracker-sample-creating-the-project/) 

## Tutorial

- [Understanding Tabs In Ionic Framework](https://blog.nraboy.com/2014/12/understanding-tabs-ionic-framework)
- [ionic中文教程](http://haomou.net/2014/10/06/2014_ionic_learn/)
- [Mastering the Ionic Framework: Learn to Build & Deploy Native Speed HTML5 Based Apps](https://thinkster.io/ionic-framework-tutorial/)
- [Building a hybrid multi-platform real-time mobile applications using Ionic Framework and Firebase](http://www.toptal.com/front-end/building-multi-platform-real-time-mobile-applications-using-ionic-framework-and-firebase)
- [Automating Icons and Splash Screens](http://ionicframework.com/blog/automating-icons-and-splash-screens)
- [ccoenraets/directory-angular-ionic](https://github.com/ccoenraets/directory-angular-ionic) Sample Employee Directory application built with Ionic and AngularJS.

### Auth

- [OAuth with Ionic and ngCordova](http://ionicframework.com/blog/oauth-ionic-ngcordova/)
- [Build an Instagram clone with AngularJS, Satellizer, Node.js and MongoDB](https://hackhands.com/building-instagram-clone-angularjs-satellizer-nodejs-mongodb) 登陆验证模块。
- [Adding Auth to your Ionic app in 5 mins with Auth0](http://ionicframework.com/blog/authentication-in-ionic)


### ng-confg

- [Ionic and Angular Superpowers for Mobile App Development - Adam Bradley - YouTube](https://www.youtube.com/watch?v=wvr11fvCeu4&feature=youtu.be)

## FAQ

### build fails on windows

See: 

- [build fails on windows (spawn issue) · Issue #15 · diegonetto/generator-ionic](https://github.com/diegonetto/generator-ionic/issues/15#issuecomment-38075095)
- [Why "ionic serve" fails? - Ionic](http://forum.ionicframework.com/t/why-ionic-serve-fails/4466)

A solution would be to replace spawn by `win-spawn`:

1. npm install `cross-spawn`
2. Replace the line in the Gruntfile.js:
    
        var spawn = require('child_process').spawn;

    by

        var spawn = require('cross-spawn');

### Handling CORS issues in Ionic

See [Handling CORS issues in Ionic](http://ionicframework.com/blog/handling-cors-issues-in-ionic/)