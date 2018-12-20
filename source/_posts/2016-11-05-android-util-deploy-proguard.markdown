---
layout: post
title: Android 混淆从入门到精通
date: '2016-11-05 21:25'
categories: Android
---

## Android Application 最佳实践

修改应用模块的 `build.gradle` 文件，将 mappings 文件保存到工程目录下：

```gradle
android {
    applicationVariants.all { variant ->
        variant.outputs.each { output ->
            if (variant.getBuildType().isMinifyEnabled()) {
                variant.assemble.doLast{
                    copy {
                        from variant.mappingFile
                        into "${projectDir}/mappings"
                        rename { String fileName ->
                            "mapping-${variant.name}-v${defaultConfig.versionName}.txt"
                        }
                    }
                }
            }
        }
    }
}
```

修改 gradle，启用 proguard:

```
buildTypes {
    release {
        minifyEnabled true
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

如果需要调试环节下启用 proguard，可以添加：

```
debug {
    minifyEnabled true
    proguardFiles getDefaultProguardFile('proguard-android..txt'), 'proguard-rules.pro'
}
```

由于 Proguard 优化速度比较慢，影响构建速度，我们将基础配置文件替换为 `proguard-android.txt`，这个文件关闭了字节码优化开关。两个基础配置文件位于 `<android-sdk>/tools/proguard/`。

修改 `proguard-rules.pro` 文件：

<script src="http://git.landicorp.com/snippets/4.js"></script>

另外一些自定义文件，比如需要反射的类，第三方 AIDL 接口，可以继续在这个文件中添加。

下面我们讲解下 Proguard 技术的理论基础。

## ProGuard 作用

**压缩**（Shrinking）：默认开启，用以减小应用体积，移除未被使用的类和成员，并且会在**优化**动作执行之后再次执行（因为优化后可能会再次暴露一些未被使用的类和成员）。

```
-dontshrink 关闭压缩

-printusage {filename}
-whyareyoukeeping {class_specification}
```

See more https://www.guardsquare.com/en/products/proguard/manual/usage#shrinkingoptions

**优化**（Optimization）：默认开启，在字节码级别执行优化，让应用运行的更快。

```cpp
-dontoptimize  关闭优化
-optimizationpasses n 表示proguard对代码进行迭代优化的次数，Android一般为5
```
See more https://www.guardsquare.com/en/products/proguard/manual/usage#optimizationoptions

**混淆**（Obfuscation）：默认开启，增大反编译难度，类和类成员会被随机命名，除非用keep保护。

```
-dontobfuscate 关闭混淆
```

See more https://www.guardsquare.com/en/products/proguard/manual/usage#obfuscationoptions

其他配置项见 https://www.guardsquare.com/en/products/proguard/manual/usage#generaloptions

## ProGuard 使用

要通过 ProGuard 启用 Proguard，请在 `build.gradle` 文件内相应的构建类型中添加 `minifyEnabled true`。

```gradle
android {
    ...
    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

以上示例代码表示对release版本进行混淆处理。如果要在调试阶段也是用 Proguard 特性，则添加：

```
debug {
    minifyEnabled true
    proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
}
```

除了 `minifyEnabled` 属性外，还有用于定义 ProGuard 规则的 `proguardFiles` 属性：

* `getDefaultProguardFile('proguard-android.txt')` 方法可从 Android SDK `tools/proguard/` 文件夹获取默认的 ProGuard 设置。 

    **提示**：要想做进一步的代码压缩，请尝试使用位于同一位置的 `proguard-android-optimize.txt` 文件。它包括相同的 ProGuard 规则，但还包括其他在字节码一级（方法内和方法间）执行分析的优化，以进一步减小 APK 大小和帮助提高其运行速度。

* `proguard-rules.pro` 文件用于添加自定义 ProGuard 规则。默认情况下，该文件位于模块根目录（`build.gradle` 文件旁）。

每次构建时 ProGuard 都会输出下列文件：

- `dump.txt` 说明 APK 中所有类文件的内部结构。
- `mapping.txt` 提供原始与混淆过的类、方法和字段名称之间的转换。
- `seeds.txt` 列出未进行混淆的类和成员。
- `usage.txt` 列出从 APK 移除的代码。

这些文件保存在 `<module-name>/build/outputs/mapping/release/` 中。

## 解码混淆过的堆叠追踪

我们可以用 Android Studio 直接查看 APK 的混淆结果:

![](https://ws3.sinaimg.cn/large/006tNbRwly1fwx92d7xhdj31h90ilteo.jpg)

如果需要查看正常的类名，变量名，可以 `Load Proguard mappings...`。

对于日志堆栈的反混淆，我们需要借助 proguardgui.bat 或者 `retrace.bat` 命令。

**HOW TO DECODE STACK TRACE VIA GUI**  

1. Open <android-sdk>/tools/proguard/bin/proguardgui.bat
2. Select the “ReTrace” option on the left column.  
3. Add your mapping file and obfuscated stack trace.  
4. Click “ReTrace!”</android-sdk>

__HOW TO DECODE STACK TRACE VIA COMMAND LINE__

1. You will need your ProGuard’s mapping.txt file and the stack trace (Ex: stacktrace.txt) that you want to de-obfuscate.
2. The easiest way to do the next step is copy both these files into your /tools/proguard/bin</span>. 
3. If you are on Windows, **run the following command** in the same directory as the files (make sure you change to your own file names):

        retrace.bat|retrace.sh -verbose mapping.txt stacktrace.txt > out.txt

4. out.txt will have the stack trace de-obfuscated. Now you can debug much easier and faster than before.

See [Android: How To Decode ProGuard’s Obfuscated Code From Stack Trace](http://simplyadvanced.net/blog/android-how-to-decode-proguards-obfuscated-code-from-stack-trace/)

每次使用 ProGuard 创建发布构建时都会覆盖 `mapping.txt` 文件，因此您每次发布新版本时都必须小心地保存一个副本。通过为每个发布构建保留一个 `mapping.txt` 文件副本，您就可以在用户提交的已混淆堆叠追踪来自旧版本应用时对问题进行调试。

我们可以使用一下 Gradle 脚本将每次编译的 mappings 文件保存到工程目录：

```gradle
android {
applicationVariants.all { variant ->
        variant.outputs.each { output ->
            if (variant.getBuildType().isMinifyEnabled()) {
                variant.assemble.doLast{
                        copy {
                            from variant.mappingFile
                            into "${projectDir}/mappings"
                            rename { String fileName ->
                                "mapping-${variant.name}.txt"
                            }
                        }
                }
            }
        }
        ......
    }
}
```

## 自定义要保留的代码

对于某些情况，默认 ProGuard 配置文件 (`proguard-android.txt`) 足以满足需要，ProGuard 会移除所有（并且只会移除）未使用的代码。不过，ProGuard 难以对许多情况进行正确分析，可能会移除应用真正需要的代码。举例来说，它可能错误移除代码的情况包括：

* 当应用引用的类只来自 `AndroidManifest.xml` 文件时
* 当应用调用的方法来自 Java 原生接口 (JNI) 时
* 当应用在运行时（例如使用反射或自检）操作代码时

测试应用应该能够发现因不当移除的代码而导致的错误，但您也可以通过查看 `<module-name>/build/outputs/mapping/release/` 中保存的 `usage.txt` 输出文件来检查移除了哪些代码。

要保留代码，可以在 `proguard-rules.pro` 中使用 `-keep` 配置，也可以在代码中使用 `@Keep` 注解标注。`@Keep` 可以用于类、成员和方法上。

接下来，主要讲通过 `-keep` 来保留代码。先看如下两个比较常用的命令，很多童鞋可能会比较迷惑以下两者的区别。

```ruby
-keep class arke.core.**
-keep class arke.core.*
```

- 一颗星表示只是保持该包下的类名，而子包下的类名还是会被混淆；
- 两颗星表示把本包和所含子包下的类名都保持；

用以上方法保持类后，你会发现类名虽然未混淆，但里面的具体方法和变量命名还是变了，这时如果既想保持类名，又想保持里面的内容不被混淆，我们就需要以下方法了

`-keep class arke.core.* {*;}`

在此基础上，我们也可以使用Java的基本规则来保护特定类不被混淆，比如我们可以用`extend`，`implement`等这些Java规则。如下例子就避免所有继承Activity的类被混淆

`-keep public class * extends android.app.Activity`

如果我们要保留一个类中的内部类不被混淆则需要用`$`符号，如下例子表示保持ScriptFragment内部类JavaScriptInterface中的所有public内容不被混淆。

```java
-keepclassmembers class cc.ninty.chat.ui.fragment.ScriptFragment$JavaScriptInterface {
   public *;
}
```

再者，如果一个类中你不希望保持全部内容不被混淆，而只是希望保护类下的特定内容，就可以使用

```
<init>;     //匹配所有构造器
<fields>;   //匹配所有域
<methods>;  //匹配所有方法方法
```

你还可以在`<fields>`或`<methods>`前面加上`private` 、`public`、`native`等来进一步指定不被混淆的内容，如

```
-keep class cn.hadcn.test.One {
    public <methods>;
}
```

表示`One`类下的所有`public`方法都不会被混淆，当然你还可以加入参数，比如以下表示用JSONObject作为入参的构造函数不会被混淆

```
-keep class cn.hadcn.test.One {
   public <init>(org.json.JSONObject);
}
```

有时候你是不是还想着，我不需要保持类名，我只需要把该类下的特定方法保持不被混淆就好，那你就不能用keep方法了，keep方法会保持类名，而需要用`keepclassmembers` ，如此类名就不会被保持，为了便于对这些规则进行理解，官网给出了以下表格

保留              | 防止被移除或者被重命名             | 防止被重命名
--------------- | ----------------------- | ---------------------------
类和类成员           | -keep                   | -keepnames
仅类成员            | -keepclassmembers       | -keepclassmembernames
如果拥有某成员，保留类和类成员 | -keepclasseswithmembers | -keepclasseswithmembernames

移除是指在**压缩(Shrinking)**时是否会被删除。以上内容时混淆规则中需要重点掌握的，了解后，基本所有的混淆规则文件你应该都能看懂了。

在使用 `-keep` 选项时，有许多事项需要考虑；如需了解有关自定义配置文件的详细信息，请阅读 [ProGuard 手册](http://stuff.mit.edu/afs/sipb/project/android/sdk/android-sdk-linux/tools/proguard/docs/index.html#manual/introduction.html)。[问题排查](http://stuff.mit.edu/afs/sipb/project/android/sdk/android-sdk-linux/tools/proguard/docs/index.html#manual/troubleshooting.html)一章概述了您可能会在混淆代码时遇到的其他常见问题。

### 类描述通配符

通配符        | 意义                                               
---------- | -------------------------------------------------
?          | 匹配单个字符                                           
\*         | 匹配类名中的任何部分，但不包含包分隔符                              
\**        | 匹配类名中的任何部分，并且可以包含包分隔符                            
%          | 匹配java中的基本数据类型(int, boolean, long, float,double等)
...        | 匹配任意参数列表                       
< init >   | 匹配任何构造器                                          
< ifield>  | 匹配任何字段名                                          
< imethod> | 匹配任何方法                                           
$          | 指内部类                                             

> 需要注意的是：?, _, *_ 不能够匹配任何java中的基本类型和数组（在匹配类型的时候）

对于基础 `proguard-android.txt` 中包含基础配置，文件位于 ，`proguard-android-optimize.txt` 启用了优化配置。

## 资源

### 移除未使用的备用资源

Gradle 资源压缩器只会移除未被您的应用代码引用的资源，这意味着它不会移除用于不同设备配置的[备用资源](https://developer.android.com/guide/topics/resources/providing-resources.html?hl=zh-cn#AlternativeResources)。必要时，您可以使用 Android Gradle 插件的 `resConfigs` 属性来移除您的应用不需要的备用资源文件。

例如，如果您使用的库包含语言资源（例如使用的是 AppCompat 或 Google Play 服务），则 APK 将包括这些库中消息的所有已翻译语言字符串，无论应用的其余部分是否翻译为同一语言。如果您想只保留应用正式支持的语言，则可以利用 `resConfig` 属性指定这些语言。系统会移除未指定语言的所有资源。

下面这段代码展示了如何将语言资源限定为仅支持英语和法语：

```
android {
    defaultConfig {
        ...
        resConfigs "en", "fr"
    }
}
```

同理，您也可以利用 [APK 拆分](https://developer.android.com/studio/build/configure-apk-splits.html?hl=zh-cn)为不同设备构建不同的 APK，自定义在 APK 中包括的屏幕密度或 ABI 资源。

### 合并重复资源

默认情况下，Gradle 还会合并同名资源，例如可能位于不同资源文件夹中的同名可绘制对象。这一行为不受 `shrinkResources` 属性控制，也无法停用，因为在有多个资源匹配代码查询的名称时，有必要利用这一行为来避免错误。

只有在两个或更多个文件具有完全相同的资源名称、类型和限定符时，才会进行资源合并。Gradle 会在重复项中选择其视为最佳选择的文件（根据下述优先顺序），并只将这一个资源传递给 AAPT，以供在 APK 文件中分发。

Gradle 会在下列位置寻找重复资源：

* 与主源集关联的主资源，一般位于 `src/main/res/` 中。
* 变体叠加，来自构建类型和构建风味。
* 库项目依赖项。

Gradle 会按以下级联优先顺序合并重复资源：

依赖项 → 主资源 → 构建风味 → 构建类型

例如，如果某个重复资源同时出现在主资源和构建风味中，Gradle 会选择构建风味中的重复资源。

如果完全相同的资源出现在同一源集中，Gradle 无法合并它们，并且会发出资源合并错误。如果您在 `build.gradle` 文件的 `sourceSet` 属性中定义了多个源集，则可能会发生这种情况，例如，如果 `src/main/res/` 和 `src/main/res2/` 包含完全相同的资源，就可能会发生这种情况。

### 排查资源压缩问题

当您压缩资源时，Gradle Console 会显示它从应用软件包中移除的资源的摘要。例如：

```
:android:shrinkDebugResources
Removed unused resources: Binary resource data reduced from 2570KB to 1711KB: Removed 33%
:android:validateDebugSigning
```

Gradle 还会在 `<module-name>/build/outputs/mapping/release/`（ProGuard 输出文件所在的文件夹）中创建一个名为 `resources.txt 的诊断文件。该文件包括诸如哪些资源引用了其他资源以及使用或移除了哪些资源等详情。```例如，要了解您的 APK 为何仍包含 `@drawable/ic_plus_anim_016`，请打开 `resources.txt` 文件并搜索该文件名。您可能会发现，有其他资源引用了它，如下所示：

```
16:25:48.005 [QUIET] [system.out] @drawable/add_schedule_fab_icon_anim : reachable=true
16:25:48.009 [QUIET] [system.out]     @drawable/ic_plus_anim_016
```

现在您需要了解为何 `@drawable/add_schedule_fab_icon_anim` 可以访问 - 如果您向上搜索，就会发现“The root reachable resources are:”之下列有该资源。这意味着存在对 `add_schedule_fab_icon_anim` 的代码引用（即在可访问代码中找到了其 R.drawable ID）。

如果您使用的不是严格检查，则存在看似可用于为动态加载资源构建资源名称的字符串常量时，可将资源 ID 标记为可访问。在这种情况下，如果您在构建输出中搜索资源名称，可能会找到类似下面这样的消息：

```
10:32:50.590 [QUIET] [system.out] Marking drawable:ic_plus_anim_016:2130837506
    used because it format-string matches string pool constant ic_plus_anim_%1$d.
```

如果您看到一个这样的字符串，并且您能确定该字符串未用于动态加载给定资源，就可以按照有关如何[自定义要保留的资源](https://developer.android.com/studio/build/shrink-code?hl=zh-cn#keep-resources)部分中所述利用 `tools:discard` 属性通知构建系统将它移除。``

### 移除日志

See [Stripping Log Statements using Proguard – Craig Russell – Medium](https://medium.com/@trionkidnapper/stripping-log-statements-using-proguard-73dedc68ee97)

**Stripping Standard Log Statements**

Modify the `proguard-rules.pro` file, which should live under your standard Android `app` directory:

```
# This will strip `Log.v`, `Log.d`, and `Log.i` statements and will leave `Log.w` and `Log.e` statements intact.

-assumenosideeffects class android.util.Log {
    public static boolean isLoggable(java.lang.String, int);
    public static int v(...);
    public static int d(...);
    public static int i(...);
}
```

__Stripping Timber Log Statements__

Modify the `proguard-rules.pro` file:

```
-assumenosideeffects class timber.log.Timber* {
    public static *** v(...);
    public static *** d(...);
    public static *** i(...);
}
```

## Android Library 最佳实践

- [How to use ProGuard with your Android library – RoboPress](https://robopress.robotsandpencils.com/how-to-use-proguard-with-your-android-library-c0a2b2b5d3b)

## Tutorial

- [Practical ProGuard rules examples – Google Developers – Medium](https://medium.com/google-developers/practical-proguard-rules-examples-5640a3907dc9)
- [压缩代码和资源](https://developer.android.com/studio/build/shrink-code?hl=zh-cn)
- [Android混淆从入门到精通 - 简书](http://www.jianshu.com/p/7436a1a32891)
- [Android混淆（ProGuard）从0到1 - 简书](https://www.jianshu.com/p/1b76e4c10495)
- [深入学习ProGuard之：ProGuard简介与android的应用](https://juejin.im/post/5854fbc98d6d810065a006c4)
- [How to use ProGuard with your Android library – RoboPress](https://robopress.robotsandpencils.com/how-to-use-proguard-with-your-android-library-c0a2b2b5d3b)