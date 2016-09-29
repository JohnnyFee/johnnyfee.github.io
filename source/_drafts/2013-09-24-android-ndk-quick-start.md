layout: post
title: "Android NDK Quick Start"
description: ""
category: Android
tags: [android, ndk, jni]
---

**以下配置均在Windows8 x64系统下配置。**

## 搭建NDK环境

- 下载并安装jdk
- 下载ADT Bundle的最新版本<http://developer.android.com/sdk/index.html>
- 下载NDK最新版本<http://developer.android.com/tools/sdk/ndk/index.html>
- 配置ADT Bundle的ndk路径， Eclipse/Window/Preference/Android/NDK
- 使用ndk提供的sample测试配置是否正确。
- 设置NDK Location为ndk的解压路径，如C:/android-ndk-r8e。

**注意**

使用NDK 7以上不再需要安装cygwin，这可以节约你不少折腾的时间。

运行hello-jni时，如果你发现在C/C++代码中下的断点无效，可能是因为GDB初始化的速度没赶上代码的执行速度，请在Android界面添加一个按钮来调用JNI代码。

JDK、ADT Bundle、NDK的平台一定要一致，本人都是用x86版本，亲测可以单步调试C/C++代码。

<!-- more -->

## 生成.h文件

根据native方法生成JNI对应的头文件，可以直接使用javah命令，也可以将改命令配置为Eclipse的外部工具，便于调用。

对应的jdk命令：

	javah -classpath bin/classes -jni com.example.hellojni.HelloJni

配置Eclipse工具，javah来生成.h文件
Open the Eclipse IDE, and choose **Run --> External Tools-->External Tools Configurations** from the top
menu bar. Using the External Tools Configurations dialog, select Program, and then click the New
launch configuration button. Using the Main tab, fill in the tool information as follows:

- Name: Generate C and C++ Header File
- Location: C:\Program Files (x86)\Java\jdk1.7.0_25\bin\javah.exe
- Working Directory: ${project_loc}/jni
- Arguments: -classpath "${project_classpath};${env_var:ANDROID_SDK_HOME}/platforms/android-14/android.jar" ${java_type_name}

其中Location需要根据自己的jdk路径调整。

Switch to the Refresh tab; put a checkmark next to the “Refresh resource upon completion” and
select “The project containing the selected resource” from the list.

![javah](http://johnnyimages.qiniudn.com/ndk/h.png)

Switch to the Common tab, and put a checkmark next to the External Tools under the “Display in
favorites menu” group.

![extern-tools](http://johnnyimages.qiniudn.com/ndk/extern-tools.png)

Click the OK button to save the external tool configuration. In order to test the new configuration,
using the Project Explorer view, select the HelloJni class, then choose **Run --> External Tools-->Generate C and C++ Header File**. The javah tool will parse the selected class file for native
methods, and it will generate a C/C++ header file called com_example_hellojni_HelloJni.h under
the jni directory with the method descriptions.

Now that you have automated the way to generate the native method declarations, let’s look into the
generated method declarations more in detail.

## 生成方法签名
在C/C++中调用Java方法，需要知道Java方法或者属性的签名，我们可以使用javap命令方便地得到签名信息。为了方便调用javap命令，我同样提供讲javap配置为Eclipse的外部工具的方法。

对应的jdk命令：

	javap -classpath bin/classes -p -s com.example.hellojni.HelloJni

Open the Eclipse IDE, and choose **Run --> External Tools Configurations** from the top menu
bar. Using the **External Tool Configurations** dialog, select Program, and then click the New launch
configuration button. Using the Main tab, fill in the tool information as follows、:

- Name: Java Class File Disassembler
- Location:  C:\Program Files (x86)\Java\jdk1.7.0_25\bin\javap.exe
- Working Directory: ${project_loc}
- Arguments: -classpath "${project_classpath};${env_var:ANDROID_SDK_HOME}/platforms/android-14/android.jar" -p -s ${java_type_name}
	
Click the OK button to save the external tool configuration. In order to test the new configuration, using
the Project Explorer view, select the HelloJni class, then choose **Run --> External Tools --> Java Class**.

![javah](http://johnnyimages.qiniudn.com/ndk/javap.png)

## 类型转换
JNI的基本类型可以直接当做Java对应的类型使用，可以通过Eclipse的F3(代码导航)看看JNI的基本类型对应的C/C++类型。JNI的引用类型通过需要通过JNI提供的特定方法转化之后才能被C/C++代码消费。

### 基本类型对应表
C++中直接可以使用JNI的基本类型，不需要将JNI类型转化为C++的类型。

![基本类型](http://johnnyimages.qiniudn.com/ndk/basic-type.png)

### 引用类型
C++中直接不可以使用JNI的引用类型，需要将JNI类型转化为C++的相应类型后再使用。

![引用类型](http://johnnyimages.qiniudn.com/ndk/object-type.png)


### 字符串
创建（C字符串转化为Java字符串）：

	jstring javaString = pEnv->NewStringUTF("Hello World!");

Java字符串转C字符串：

	const char* str;
	str = pEnv->GetStringUTFChars(javaString, &isCopy);

释放内存

	pEnv->ReleaseStringUTFChars(javaString, str);

### 数组

创建数组：

	jintArray javaArray;
	javaArray = pEnv->NewIntArray(10);
	if (0 != javaArray) {
	/* You can now use the array. */
	}

拷贝Java数组到C数组：

	jint nativeArray[10];
	// 建议使用以下方法，无需涉及内存管理
	pEnv->GetIntArrayRegion(javaArray, 0, 10, nativeArray);

拷贝C数组到Java数组：

	pEnv->SetIntArrayRegion(javaArray, 0, 10, nativeArray);

直接使用指针：

	jint* nativeDirectArray;
	jboolean isCopy;
	nativeDirectArray = pEnv->GetIntArrayElements(javaArray, &isCopy);
	// 使用该方法需要释放内存
	pEnv->ReleaseIntArrayElements(javaArray, nativeDirectArray, 0);

将jbyteArray转化为`char*`

	// 转化为jbyte数组
	jsize length = pEnv->GetArrayLength(javaContent);
	jbyte* jniContent = pEnv->GetByteArrayElements(javaContent,
			JNI_FALSE);

	// 将jbyte数组存储到本地数组
	char* nativeContent = new char[length + 1];

	memset(nativeContent, 0, length + 1);
	memcpy(nativeContent, jniContent, length);

	// 释放由GetByteArrayElements获取到的数组。
	pEnv->ReleaseByteArrayElements(javaContent, jniContent, 0);
	pEnv->DeleteLocalRef(src);

`nativeContent`为输出结果。		

## C++与Java互调

### Java调用NDK步骤

- 在Java中编写native方法
- 使用javah（参考“生成.h文件”）生成对应的C/C++头文件
- 实现C/C++
- 在需要调用native方法的类，load相应的so，使用System.loadLibrary("JniStudy");

其中JniStudy为模块名，对应的文件为libs/assembly/libJniStudy.so


### NDK调用Java

注意：以下方法均在.C中实现，如果在.CPP中，调用JNIEnv的方法为env->(args)。
NDK的方法签名如：
类的非静态方法对应的JNI形式如：

	Java_com_landi_applib_jni_NativeLog_log(JNIEnv *jobject instance, args);

类的静态方法对应的JNI形式如：

	Java_com_landi_applib_jni_NativeLog_log(JNIEnv *jclass instance, args);

其中env相当于虚拟机，每个线程拥有单独的env，线程间不能共享env。instance为Java对象，对于静态方法，该参数为jclass。

对于静态方法对应的C/C++代码中不能调用JAVA端的任何非静态方法。[Problem for call of Java method from c++ with jni](http://stackoverflow.com/questions/6584269/android-ndk-problem-for-call-of-java-method-from-c-with-jni)

### 获取类的属性：
根据jobject获取jclass

	jclass clazz;
	clazz = pEnv->GetObjectClass(instance);

获取fieldId

	jfieldID instanceFieldId;
	instanceFieldId = pEnv->GetFieldID(clazz,"instanceField", "Ljava/lang/String;");

获取值

	jstring instanceField;
	instanceField = pEnv->GetObjectField(instance, instanceFieldId);

对于static域，使用GetStaticFieldID和GetStaticObjectField方法。

### 执行类的方法：
获取MethodId

	jmethodID instanceMethodId;
	instanceMethodId = pEnv->GetMethodID(clazz,"instanceMethod", "()Ljava/lang/String;");

执行方法：

	jstring instanceMethodResult;
	instanceMethodResult = pEnv->CallStringMethod(env,instance, instanceMethodId);

对于static方法，分别使用GetStaticMethodID和CallStaticStringMethod方法。

参考：http://developer.51cto.com/art/201204/332810.htm

### 调用构造方法

	// 先获得class对象  
	jclass classMyCallback = env->FindClass("com/landi/jnistudy/MyCallback");

	// 调用默认构造函数  
	jobject obj =  env->AllocObject(classMyCallback);
	构造函数也是方法, 类似调用方法的方式.

	// 调用指定的构造函数, 构造函数的名字叫做<init>  
	mid = pEnv->GetMethodID(env, cls, "<init>", "()V");  
	obj = pEnv->NewObject(env, cls, mid);  

来自 <http://developer.51cto.com/art/201204/332810.htm> 

## 全局变量

通常class信息，object变量，方法ID等获取之后通常要保存到全局变量中，可以通过以下方法创建全局变量，详情请参考`参考/最贱实践`。

从一个local变量初始化全局变量

	jclass localClazz;
	jclass globalClazz;
	...
	localClazz = pEnv->FindClass("java/lang/String");
	globalClazz = pEnv->NewGlobalRef(localClazz);

删除全局变量

	pEnv->DeleteLocalRef(localClazz);

对于一些不再使用的局部变量，也可以显示调用`pEnv->DeleteLocalRef`来删除，以提高效率。

## 异常处理

### 捕获异常
NDK调用Java方法，Java方法抛出异常时（此时Java VM挂起），使用ExceptionOccurred来检查是否有异常，处理完后调用ExceptionClear清除异常。

	jthrowable ex;
	...
	pEnv->CallVoidMethod(instance, throwingMethodId);
	ex = pEnv->ExceptionOccurred(env);
	if (0 != ex) {
		pEnv->ExceptionClear(env);
		/* Exception handler. */
	}

### 抛出异常
As the code execution of native functions are not under the control of the virtual machine, throwing
an exception does not stop the execution of the native function and transfer control to the exception
handler.

	jclass clazz;
	...
	clazz = pEnv->FindClass("java/lang/NullPointerException");
	if (0 ! = clazz) {
	pEnv->ThrowNew(clazz, "Exception message.");
	// 是否会return，是否会抛到调用者的最外层
	}

## 线程

### 子线程中调用Java
在C++的字线程中需要调用Java相关的类、方法、属性，需要调用

	JNIEnv *pEnv = NULL;
	int ret = pJvm->AttachCurrentThread(&pNULL);
	if (ret != JNI_OK) {
		return;
	}

否则会崩溃。

即使如此，也不能用获取的pEnv的FindClass来查找Java，需要将object保存到全局变量

	gs_object=env->NewGlobalRef(obj)，

然后通过

	jclass cls = env->GetObjectClass(gs_object);

来获取jclass信息，再调用java方法或属性。

### 创建子线程

	pthread_t pth;
	pthread_create(&pth, NULL, startServer, NULL);
	pthread_join(pth, NULL);

来自 <http://stackoverflow.com/questions/8230361/jni-crashing-after-repeatedly-calling-a-method> 

### 用C实现延时

	struct timespec delay;
	delay.tv_sec = 2;
	delay.tv_nsec = 0;
	pthread_delay_np( &delay );

来自 <http://blog.csdn.net/sojohn/article/details/334719> 

## 构建系统(Android.mk)

以下若无说明，都是修改Android.mk

### 预编译宏

	LOCAL_CFLAGS := -DUSE_FILE32API 
	LOCAL_EXPORT_CFLAGS := -DUSE_FILE32API

To define additional options or flags in import modules that should be appended to clients options. For
example, if a module A defines

	LOCAL_EXPORT_LDLIBS := -llog

**LOCAL_EXPORT_CFLAGS,LOCAL_EXPORT_CPPFLAGS,LOCAL_EXPORT_LDLIBS**

because it needs an Android logging module, then a module B that depends on A will be automatically linked to –llog. LOCAL_EXPORT_ variables are not used when compiling the module that exports them. If required, they also need to be specified in their LOCAL counterpart.

**LOCAL_CFLAGS,LOCAL_CPPFLAGS,LOCAL_LDLIBS**

To specify any options, flags, or macro definitions, forcompilation and linking. The first one works for bothC and C++, the second one is for C++ only, and the lastone is for the linker.

	
### 构建动态库

	LOCAL_PATH := $(call my-dir)
	include $(CLEAR_VARS)
	LOCAL_MODULE := avilib
	LOCAL_SRC_FILES := avilib.c platform_posix.c
	
	#放在最后一行
	include $(BUILD_SHARED_LIBRARY)
	
在C++消费动态库

	include $(CLEAR_VARS)
	LOCAL_MODULE := module
	LOCAL_SRC_FILES := module.c
	LOCAL_SHARED_LIBRARIES += avilib

### 构建静态库

将构建动态库中的最后一行修改为

	include $(BUILD_STATIC_LIBRARY)
	
在C++消费静态库

	include $(CLEAR_VARS)
	LOCAL_MODULE := module
	LOCAL_SRC_FILES := module.c
	LOCAL_STATIC_LIBRARIES += avilib

也可以通过

	LOCAL_WHOLE_STATIC_LIBRARIES := cocos_libpng_static

使用LOCAL_WHOLE_STATIC_LIBRARIES后，编译器会将静态库完整链接而不会进行删减优化。
	
	
注：不可以直接在Android应用程序中使用静态库，需要编译到动态库中才能被Android应用程序消费。

### 在同一个NDK工程中构建多个动态库

	LOCAL_PATH := $(call my-dir)
	#
	# Module 1
	#
	include $(CLEAR_VARS)
	LOCAL_MODULE := module1
	LOCAL_SRC_FILES := module1.c
	CHAPTER 2: Exploring the Android NDK 55
	include $(BUILD_SHARED_LIBRARY)
	
	#
	# Module 2
	#
	include $(CLEAR_VARS)
	LOCAL_MODULE := module2
	LOCAL_SRC_FILES := module2.c
	include $(BUILD_SHARED_LIBRARY)
	
### 添加子文件夹中所有的mk文件

	include $(call all-subdir-makefiles)

	来自 <http://stackoverflow.com/questions/6942730/android-ndk-how-to-include-android-mk-into-another-android-mk> 


### 使用预编译方法引用第三方库

	#------------------
	#预编译app-lib
	
	include $(CLEAR_VARS)
	LOCAL_MODULE := app-lib
	LOCAL_SRC_FILES := ../../../app-lib/src/app-lib/libs/armeabi/libapp-lib.so
	include $(PREBUILT_SHARED_LIBRARY)
	#------------------
	
引用第三方库

	LOCAL_SHARED_LIBRARIES += app-lib
	
也可以通过LOCAL_LDFLAGS引用第三方库的方式导入预编译后的so。
	
通过该方法导入的库如果不存在于Android系统中，则必须存在于`libs/armeabi/`目录下，且要在Java端通过loadLibrary加载该库。
来自 <http://www.kandroid.org/ndk/docs/IMPORT-MODULE.html> 

### 通过LOCAL_LDFLAGS引用第三方库：

	LOCAL_LDFLAGS +=  -L$(LOCAL_PATH)/../../../../app-lib/src/app-lib/libs/$(TARGET_ARCH_ABI)/ -lapp-lib

其中，-L指定动态库的路径，-l指定动态库的名称。通过该方法导入的库如果不存在于Android系统中，则必须存在于libs/armeabi/目录下，且要在Java端通过loadLibrary加载该库。

### 多个NDK工程共享模块
该种方式未经实践，仅供参考。

共享库的Android.mk，假设位于`C:\android\shared-modules\transcode\avilib`.

	LOCAL_PATH := $(call my-dir)
	#
	# 3rd party AVI library
	#
	include $(CLEAR_VARS)
	LOCAL_MODULE := avilib
	LOCAL_SRC_FILES := avilib.c platform_posix.c
	include $(BUILD_SHARED_LIBRARY)
	
NDK工程的Android.mk，引用第三方库（未实现）
可参考Link shared library under Android NDK
	
	LOCAL_SHARED_LIBRARIES := avilib
	include $(BUILD_SHARED_LIBRARY)
	
	#位于最后一行
	$(call import-module,transcode/avilib)	
	
The import-module function macro needs to first locate the shared module and then import it into the NDK project. By default, only the < Android NDK> sources directory is searched by the import-module function macro. In order to include the `c:\android\shared-modules` directory into the search, define a new environment variable called NDK_MODULE_PATH and set it to the root directory of shared modules, such as `c:\android\shared-modules`.

**如添加工程中下的libjpeg库**
来自 <http://www.cfanz.cn/?c=article&a=read&id=38462>

添加外部导入库目录 

	$(call import-add-path,$(LOCAL_PATH)) 

添加导入库（基于上一行添加的导入库目录） 

	$(call import-module,platform/third_party/android/prebuilt/libjpeg)

	

## FAQ

### 在Android.mk中输入变量

	$(warning $(LOCAL_PATH))

### ReferenceTable overflow问题
对于频繁调用的方法，其中的一些局部变量需要及时释放，否会导致ReferenceTable overflow问题，如FindClass返回值，jbyteArray类型，通过NewString/NewStringUTF/NewObject/GetObjectField生成的变量。

参考 <http://bbs.csdn.net/topics/380134134?page=1#post-393496160> 

### 批量添加工程文件

<http://www.cfanz.cn/?c=article&a=read&id=38462>

### 添加STL

在jni目录下添加Application.mk，并添加以下内容：

	APP_STL := stlport_static
	APP_PLATFORM = android-10

修改Android.mk

	LOCAL_SHARED_LIBRARIES := libstlport

### Eclipse的编译器问题

对于可以通过ndk-build命令编译成功，而Eclipse中报编译错误的原因为，Java对于C/C++的编译器存在问题，可以通过禁用Eclispe一个错误提示来解决。

![Eclipse的编译器问题](http://johnnyimages.qiniudn.com/ndk/eclipse.png)

将所有的勾去掉。

### C/C++添加注释

- 安装eclox插件 http://home.gna.org/eclox/#download
- In c/c++->Editor->Documentation tool comments, Workspace default set doxygen. Then above a function write /** and press return.

See <http://stackoverflow.com/questions/3537542/a-doxygen-eclipse-plugin-with-automatic-code-completion>

## 参考

- [Apress.Pro.Android.CPP.with.the.NDK.Dec.2012.pdf](http://dl.dbank.com/c0z1lurn5u)
- [Android Native Development Kit Cookbook](http://www.salttiger.com/android-native-development-kit-cookbook/)

- 我的收藏 <https://delicious.com/johnnyfee/ndk>
- 最佳实践 <http://www.ibm.com/developerworks/cn/java/j-jni/>
- 系列教程 <http://www.cnblogs.com/oxgen/tag/Android%20JNI/>
- NDK-Home <http://www.kandroid.org/ndk/docs/IMPORT-MODULE.html>
- Oracle DOC <http://docs.oracle.com/javase/7/docs/technotes/guides/jni/spec/jniTOC.html>

- [NDK 视频教程](http://www.tudou.com/programs/view/edkMm1D6gjY/)

## Tutorial

[JNI/NDK开发指南（开山篇）](http://blog.csdn.net/xyang81/article/details/41759643)
