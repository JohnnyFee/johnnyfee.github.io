---
layout: post
title: "Android Hybrid Develpment Tutorial"
category: Android
tags: [mobile, android, hybrid]
--- 

## What's Hybrid

__The benefits of hybrid apps compared to native include:__

- Inexpensive cross-platform development cycle
- Abundant human resources
- Approval process
    Most of the app stores do have an approval process for which each app has to qualify before it can be made available through the sales channels of that app store. Because hybrid apps can be updated outside the bounds of an app store, you can typically get away with one submission to the app store. Once you are approved, you can push subsequent updates independently through your server if you like. A key point to note however, is that a fresh submission of the application would be required every time you make changes in the native code associated with the hybrid app.
- Hybrid apps are the future

    Looking toward the future and upcoming advancements in mobile OS technologies, one can easily argue that hybrid apps are the future of development. Windows Phone 8, Google announcements to eventually merge Chromium OS and Android, Tizen OS, and Firefox all hint toward a hybrid future, not too far away, and hence, building and deploying hybrid apps is strategically a right thing to do.

<!--more-->

__The possible drawbacks of hybrid apps as compared to native apps include:__

- Performance
    You may experience potential performance issues because JavaScript is fundamentally single-threaded, which means that only one operation can be performed at a time. However, if done right, you can come up with a solution wherein you can offload background tasks to a native thread, which would execute in parallel while your app is busy performing UI operations. The native thread would then notify the JavaScript of the events and task completions/failures.
- Differences in cross-platforms
    WebKit is not equally maintained in all mobile platforms, which means that there might be indistinct differences between renderings and platform-specific features to watch out for, though one could arguably say it is a better scenario than rewriting all code from scratch. Further, this is such a well-understood topic that often you would find material describing ways to identify and mitigate these UI experience risks.
- Unavailable advanced features
    There might be advanced features that cannot always be easily implemented on the hybrid layer—for example, OpenGL-based rendering—however, the set of features is rapidly shrinking with companies like Microsoft, Google, and Mozilla introducing a bunch of new standards aimed at bridging this gap.
- Inconsistent user interfaces

    Platform-specific UIs’ look and feel might be seriously difficult to mimic using HTML, CSS, and JavaScript.

### Hybrid Application Architecture

![](http://johnnyimages.qiniudn.com/android-hybrid-architect.png)

Key highlights of the architecture include：

* Application UI and business logic reside within a context of a headless web browser that is fully contained within your application.
* For features that are available within the web browser, the user interacts with the browser and the browser interacts with the native platform environment.
* Resources and assets are available locally or can be downloaded from the Web.
* For the platform features that are not natively available to apps through the standard JavaScript environment; custom extensions and plug-ins can be developed. These plug-ins act as a bridge, if you will, diminishing the gaps between the native and web environments.
