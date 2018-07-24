layout: post
title: Gradle 打包 APK 的一些小技巧和 productFlavor 配置
tags: [android, gradle, productFlavor]
category: Android
---

## 前言

在使用Gradle来打包Android应用之前，Android自动化打包通常会选择使用ant，ant是一种一步一步来执行任务的工具，通常打包一个apk要经过一个复杂的过程，ant工具通过一步一步完成这些过程来生成一个apk。如果要实现一个复杂一点的打包过程，它的xml配置文件的长度也是足以让你崩溃的。Gradle的出现让打包过程变得十分轻松，而且配置起来也是简单易懂。以前需要写好几天的配置文件现在只要简单的几步就能完成，配合Android Studio更加得心应手。

一个完整的打包流程如下：
![pic](https://github.com/junyuecao/private-static/blob/master/20160301a.png?raw=true)

## 基本的build.gradle

如果你用Android Studio生成一个项目的话，在app模块中你会看到一个build.gradle文件，这个文件就是配置这个模块的地方，大致文件结构如下：

```language-groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 23
    buildToolsVersion "23.0.2"

    defaultConfig {
        minSdkVersion 8
        targetSdkVersion 23
        versionCode 1
        versionName "1.0"
    }
    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    compile 'com.android.support:appcompat-v7:19.0.1'
}
```

这里就不一行行地解释了，关于Gradle的语法可以自行Google。

这里主要有**两个小技巧**：

1.  **签名**：开发App时经常遇到Release版和Debug版共存问题，由于默认的签名不同，经常要卸载Debug版安装Release版，非常麻烦。有两种方法可以避免这种情况：1. **使用同一个签名**;2. **使用不同包名**。

        // 方法1 (签名配置方法可以Google)
        android {
           buildTypes {
               debug {signingConfig signingConfigs.myConfig}
               release {signingConfig signingConfigs.myConfig}
           }
        }

        // 方法2 
        android {
           buildTypes {
               debug {packageNameSuffix ".debug"}
           }
        }

1.  **Release版打包的apk文件名**：通过下面的代码可以自动为生成的apk文件附加上版本和build日期，这里可以根据你的需求添加各种信息上去。

        android {
            buildTypes {
                release {
                    minifyEnabled true
                    proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'

                    def today = new Date()
                    if (variant.buildType.getName().equals("release")) {
                        println "Change output apk name"
                        variant.outputs.each { output ->
                            output.outputFile = new File(
                                    output.outputFile.parent,
                                    output.outputFile.name.replace(".apk", "-" + defaultConfig.versionName + "-" + today.format('yyyyMMdd') + ".apk"))
                        }
                    }
                }
            }
        }

## BuildVariants

Gradle的Android插件中有个BuildVariants的概念，其实简单来说其实就是buildTypes＋productFlavors，buildType前面我们看到过了，主要就是debug和release的分别。而productFlavors就是我们用来打包不同版本app的主要方式。从字面意思来翻译指的就是不同的“产品特点”。

Android Studio会自动根据build.gradle 生成对应的BuildVariants。比如以下代码：

```
android {
    productFlavors {
        free {}
        paid {}
    }
}
```

会生成以下的BuildVariants：

![pic](https://github.com/junyuecao/private-static/blob/master/20160301b.png?raw=true)

## productFlavors的维度

productFlavors可以是多维的，听起来好像很难理解，这里举个栗子，有如下代码：

```
android {
    flavorDimensions("isfree", "channel")
    productFlavors {
        free {dimension "isfree"}
        paid {dimension "isfree"}

        googleplay {dimension "channel"}
        wandoujia {dimension "channel"}
    }
}
```

能够生成如下的BuildVariants：

![pic](https://github.com/junyuecao/private-static/blob/master/20160301c.png?raw=true)

这里我们就可以看到，我们有两个维度，一个是是否免费，另一个是渠道，我们能够生成2*2＝4种Flavor，并且每个Flavor都有debug和release，总共就有8种不同的APK。所以理论上来说通过组合Flavor，我们可以做到各种不同的分类。

接下来我们来看看productFlavors能做什么？

### 定义渠道

在国外一般来说开发者不太需要去管渠道的问题，他们的App只需要发往GooglePlay就可以了，但是在中国，我们有众多的APK分发平台，我们的APK需要发往各种地方，在做APP统计的时候我们就需要在APK里写入一些特征变量，发送到统计平台，以区分不同的渠道，在过去用ant打包的时代，我们通常的做法就是用不同的渠道名来重复ant任务一遍一遍地打包。

如果用gradle：我们可以通过增加一个名为channel的dimension来给每一个渠道一个特殊标示，代码就是我们之前看到的。但是你可能会问，我怎么在统计的时候获取这个渠道名呢？其实很简单，Android Studio会为我们生成一个名叫BuildConfig的类，这个类有一些关于打包的静态变量，下面是一个示例：

```java
public final class BuildConfig {
  public static final boolean DEBUG = Boolean.parseBoolean("true");
  public static final String APPLICATION_ID = "me.zheteng.android.example";
  public static final String BUILD_TYPE = "debug";
  public static final String FLAVOR = "freeGoogleplay";
  public static final int VERSION_CODE = 1;
  public static final String VERSION_NAME = "1.0";
  public static final String FLAVOR_isfree = "free";
  public static final String FLAVOR_channel = "googleplay";
}
```

其实不止是渠道，通过这个类我们还可以很方便地获得这个APK的各种信息。相信大家一眼就能看出来每个字段的意思。（我们甚至还可以自定义字段）。

如果渠道非常多，你也可以通过读配置文件的方式动态生成不同的flavors。

### 如果我每个flavor都有点特别呢？

有的时候我们每个flavor可能不只是一个渠道名这么简单，我的ICON可能给每个渠道的有所不同，我的包名也可能有所不同。所有这些，都可以直接在这个flavor中重新定义：

```
android {
    productFlavors {
        googleplay {
            applicationId "me.zheteng.android.example.googleplay"
        }
    }
}
```

如果需要不同的源代码或资源文件，可以在app/src下新建一个名为“flavor名”的目录（这里就是googleplay）。也就是app/src/googleplay，然后这个目录下的结构和app/src/main中是一样的，打包的时候会优先使用当前flavor下的文件。

## 其他Gradle小技巧

### Provider名称

我们知道Provider的authority是系统中全局唯一的，有时候我们要为不同的flavor将authority改成不同的，通过gradle你可以这样实现：

```xml
<provider
    android:exported="true"
    android:name="com.path.to.my.Provider"
    android:authorities="${applicationId}.provider"/>
```

你问我Java代码中怎么获取？难道你忘了BuildConfig了嘛？

### Manifest 占位符

有些SDK会把配置在Manifest文件中的meta信息里，而不同的flavor这个信息不一样，这是我们可以通过Manifest 占位符来实现：

```xml
<meta-data android:value="${UMENG_APPKEY}" android:name="UMENG_APPKEY"/>
```

```
android {
    productFlavors {
        googleplay {
            applicationId "me.zheteng.android.example.googleplay"
            manifestPlaceholders = [UMENG_APPKEY: "我的友盟KEY"]
        }
    }
}
```

## 总结

Gradle的灵活程度超乎想象，如果基本功能无法满足你，你还可以通过自己编写Groovy插件或者task来实现无穷的可能性，欢迎将你的思路分享出来～

## Tutorial

- [Android productFlavors实现差异化打包 - 简书](https://www.jianshu.com/p/1ae5c85d2ff2)
- [美团多渠道打包原理以及使用 - 简书](https://www.jianshu.com/p/969996a662c8)