---
layout: post
title: "Android EventBus"
description: ""
category: Android
tags: [android]
---

[EventBus: Events for Android - Open Source by greenrobot](http://greenrobot.org/eventbus/)

## EventBus框架

EventBus是一个Android端优化的publish/subscribe消息总线，简化了应用程序内各组件间、组件与后台线程间的通信。比如请求网络，等网络返回时通过Handler或Broadcast通知UI，两个Fragment之间需要通过Listener通信，这些需求都可以通过**EventBus**实现。

大家谈到EventBus，总会想到greenrobot的EventBus，但是实际上EventBus是一个通用的叫法，例如Google出品的Guava，Guava是一个庞大的库，EventBus只是它附带的一个小功能，因此实际项目中使用并不多。用的最多的是greenrobot/EventBus，这个库的优点是接口简洁，集成方便，但是限定了方法名，不支持注解。另一个库square/otto修改自 Guava ，用的人也不少。

这篇博文暂时只讨论greenrobot的EventBus库。

## 添加依赖库

首先你要为你的app添加依赖库：

```groovy
compile 'de.greenrobot:eventbus:3.0.0-beta1'
```

关于如何添加依赖库，请参考[Gradle for Android 第三篇( 依赖管理 )](http://segmentfault.com/a/1190000004237922)。

有些人会问为什么是beta版本，因为eventbus现阶段3.0版本只处于beta测试阶段。有些人会问如何找到eventbus 3.0.0版本，具体添加:

![](https://segmentfault.com/img/bVr7mp)

## 注册

举个例子，你需要在一个activity中注册eventbus事件，然后定义接收方法，这和Android的广播机制很像，你需要首先注册广播，然后需要编写内部类，实现接收广播，然后操作UI,在EventBus中，你同样需要这么做。

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    EventBus.getDefault().register(this);

}
@Override
protected void onDestroy() {
    super.onDestroy();
    EventBus.getDefault().unregister(this);
}
```

## 订阅者

类似广播，但是有别于2.4版本，你不必再去约定OnEvent方法开头了（看不懂没关系）：

```
@Subscribe(threadMode = ThreadMode.MainThread)
public void helloEventBus(String message){
    mText.setText(message);
}
```

该操作很简单，定义了一个hello方法，需要传入String参数，在其中操作UI操作，注意：  
我们添加了注解@Subscribe，其含义为订阅者，在其内传入了threadMode，我们定义为ThreadMode.MainThread，其含义为该方法在UI线程完成，这样你就不要担心抛出异常啦。是不是很简单？

## 发布者

既然你在某个地方订阅了内容，当然就会在某个地方发布消息。举个例子，你的这个activity需要http请求，而http请求你肯定是在异步线程中操作，其返回结果后，你可以这么写：

```java
String json="";
EventBus.getDefault().post(json);
```

这样就OK了，你可以试下能否正常运行了！

## 原理初探

你订阅了内容，所以你需要在该类注册EventBus，而你订阅的方法需要传入String,即你的接收信息为String类型，那么在post的时候，你post出去的也应该是String类型，其才会接收到消息。

## 如果你post的是对象

首先你需要定义一个类似pojo类：

```java
public class MessageEvent {
  public final String name;
  public final String password;
  public MessageEvent(String name,String password) {
    this.name = name;
    this.password=password;
  }
}
```

然后你post的时候：

```java
EventBus.getDefault().post(new MessageEvent("hello","world"));
```

当然，你接收的方法也需要改为：

```java
@Subscribe(threadMode = ThreadMode.MainThread)
public void helloEventBus(MessageEvent message){
    mText.setText(message.name);
}
```

疑问，当你post了消息之后，你的订阅者有多个，每一个都接收吗？能否做到指定接收者。
## 注解 `@Subscribe`

### ThreadMode

`threadMode = ThreadMode.MainThread`

用注解的方式代替约定的方法名规范，是其最大的改变。在2.4中，你可能需要这么定义：

```java
public void onEventMainThread(MessageEvent event) {
	log(event.message);
}
```

该方法为接收消息后在主线程中处理事件，而在3.0中：

```java
@Subscribe(threadMode = ThreadMode.MainThread) //在ui线程执行
public void onUserEvent(UserEvent event) {
        log(event.message);
    }
```

其中ThreadMode提供了四个常量：

1. PostThread：事件的处理在和事件的发送在相同的进程，所以事件处理时间不应太长，不然影响事件的发送线程，而这个线程可能是UI线程。对应的函数名是onEvent。
2. MainThread: 事件的处理会在UI线程中执行。事件处理时间不能太长，这个不用说的，长了会ANR的，对应的函数名是onEventMainThread。
3. BackgroundThread：事件的处理会在一个后台线程中执行，对应的函数名是onEventBackgroundThread，虽然名字是BackgroundThread，事件处理是在后台线程，但事件处理时间还是不应该太长，因为如果发送事件的线程是后台线程，会直接执行事件，如果当前线程是UI线程，事件会被加到一个队列中，由一个线程依次处理这些事件，如果某个事件处理时间太长，会阻塞后面的事件的派发或处理。
4. Async：事件处理会在单独的线程中执行，主要用于在后台线程中执行耗时操作，每个事件会开启一个线程（有线程池），但最好限制线程的数目。

### sticky = true

默认情况下，其为false。什么情况下使用sticky呢？

相信大多数使用过EventBus 2.4的同学或多或少的使用过：

```java
EventBus.getDefault().postSticky(new VoteEvent(obj));
EventBus.getDefault().registerSticky(this);
```

你会发现非常的麻烦，那么在3.0中：

```java
EventBus.getDefault().postSticky(new VoteEvent(obj));
EventBus.getDefault().register(this);
@Subscribe(sticky = true)
```

事件分为一般事件和Sticky事件，相对于一般事件，Sticky事件不同之处在于，当事件发布后，再有订阅者开始订阅该类型事件，依然能收到该类型事件的最近一个Sticky事件。

### priority = 1

相信大部分人知道该用法，值越小优先级越低，默认为0。

### 添加 processor

按照Markus Junginger的说法（EventBus创作者），在3.0中，如果你想进一步提升你的app的性能，你需要添加：

```
provided 'de.greenrobot:eventbus-annotation-processor:3.0.0-beta1'
```

其在编译的时候为注册类构建了一个索引，而不是在运行时，这样的结果是其让EventBus 3.0的性能提升了一倍，相比2.4来说，其会是它的3到6倍。大家可以感受下：

![](https://segmentfault.com/img/bVsgvf)

## Tutorial

- [EventBus 3.0的用法详解（一） - neu - SegmentFault](https://segmentfault.com/a/1190000004279679)
- [EventBus 3.0的用法详解(二) - neu - SegmentFault](https://segmentfault.com/a/1190000004314315)
- [EventBus使用详解 - 简书](http://www.jianshu.com/p/a040955194fc)
- [EventBus详解-全面讲解用法 - 简书](http://www.jianshu.com/p/818d0b56d40c)