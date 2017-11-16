layout: post
title: Welcome to Android Studio 3.0
tags: [android, android studio]
category: Android
---

## It’s a brave new world

After a long wait, Android Studio 3.0 has finally been released to the stable channel. This means everyone should be updating their IDE to the latest and greatest version. There are so many new features and improvements it is just a no brainer! I will go over the new features later on, but for now I will discuss the process of updating and cover the breaking changes in the new Gradle plugin.

## How to update

### Updating the IDE and plugin

Android Studio should have prompted you to update to 3.0, if not then go to ‘_Check for updates’_ in the menu to do so.

Once you launch your project in 3.0 for the first time, you will be told there is a new version of the plugin to update to. You can continue to use your project as it is, but you will miss out on many of the new features and improvements until you update. Simply, follow the prompts to have your project updated to version 3 of the Gradle plugin and to use the latest version of Gradle 4.

If for some reason you need to do this manually:

1.  Open `gradle-wrapper.properties`
2.  Enter the latest version of Gradle (above 4.1)
3.  Open `build.gradle` in the root of the project
4.  Ensure it contains the Google Maven repository and version 3 of the Gradle plugin. _Note: there might be a version higher than 3.0.0 available, so use the latest one._

```markup--code
buildscript {、
    repositories {
            google()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.0.0'
}}
```

### Dependency configurations

Previously, when defining dependencies you would use _compile._

<pre name="0f20" id="0f20" class="graf graf--pre graf-after--p">
compile 'com.android.support:support-compat:27.0.0'
</pre>

This has now been deprecated in favour of `implementation` and `api`. In general, you can simply update all dependencies to use `implementation`. However, if your project is a library and it leaks one its module’s interfaces you may need to use `api` for that instead.

To understand the difference, please read this [detailed guide](https://jeroenmols.com/blog/2017/06/14/androidstudio3/).

[**Implementation vs API dependency**  
_Upgrading to Android studio 3.0 territory will make building multi-module projects a lot faster, but it also means a…_jeroenmols.com](https://jeroenmols.com/blog/2017/06/14/androidstudio3/ "https://jeroenmols.com/blog/2017/06/14/androidstudio3/")[](https://jeroenmols.com/blog/2017/06/14/androidstudio3/)

### Flavour dimensions

Variants are now automatically matched, which means an app’s debug variant will automatically use a library module debug variant. The same happens for product flavours as well, such as _demo_ and _trial_.

To ensure this mechanism works correctly, it is now required that all product flavours are assigned to a particular flavour dimension. If you don’t need to use different dimensions, you can simply create one and assign all the flavours to it.

<pre name="ee68" id="ee68" class="graf graf--pre graf-after--p">
flavorDimensions "default"
</pre>

<pre name="52db" id="52db" class="graf graf--pre graf-after--pre">
productFlavors {  
  prod {  
    dimension "default"  
    ...  
  }
</pre>

<pre name="f50f" id="f50f" class="graf graf--pre graf-after--pre">
  dev {  
    dimension "default"  
    ...  
  }  
}
</pre>

If you use a build type or flavour that doesn’t exist in one of your library modules, a fallback will need to be specified. This isn’t required for `debug` or `release` as they are present in all modules automatically. The plugin will select the first fallback from the list which is found.

<pre name="7235" id="7235" class="graf graf--pre graf-after--p">
debug { ... }  
release { ... }  
staging {  
  matchingFallbacks = ['debug', 'release']  
  ...  
}
</pre>

### 3rd party plugins you no longer need

If you are still using the `android-apt` plugin for annotation processing support, you should remove that and use the built-in `annotationProcessor`. The third party plugin is no longer supported.

Similarly, many people have been using `retrolambda` for Java 8 features support. This is no longer required and will simply be provided automatically, so you should remove the `retrolambda` dependency.

### Variant API changes

You may find that there are Gradle API changes that remove certain functionality. One area that has some differences is the variant API, which mean you will no longer be able to manipulate variant outputs. This is due to variant-specific tasks no longer being created at configuration time.

If you are using the following Gradle syntax, you should check it is still functioning correctly.

<pre name="61e1" id="61e1" class="graf graf--pre graf-after--p">
android.applicationVariants.all { variant ->  
  ...  
}
</pre>

### Firebase plugin Guava issue

There is a known issue with the Firebase plugin causing a Guava dependency mismatch. It can be easily fixed by excluding Guava from the Firebase plugin.

<pre name="44cc" id="44cc" class="graf graf--pre graf-after--p">
dependencies {  
  classpath ('com.google.firebase:firebase-plugins:1.1.0') {  
    exclude group: 'com.google.guava', module: 'guava-jdk5'  
  }  
  ...  
}
</pre>

### Robolectric resources issue

This won’t affect everyone, however, if you are using Robolectric you may find there is a problem with missing resources. To fix this simply add the following to the `build.gradle` for your module.

<pre name="eff4" id="eff4" class="graf graf--pre graf-after--p">
testOptions {  
  unitTests {  
    includeAndroidResources = true  
  }  
}
</pre>

### Find out more

There are many other smaller changes which will affect some projects. Full details, including other known issues and how to fix them can be found on the [Android developers website](https://developer.android.com/studio/build/gradle-plugin-3-0-0-migration.html).

