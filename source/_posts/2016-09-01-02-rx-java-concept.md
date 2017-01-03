layout: post
title: "Rx Java Concept"
description: ""
category: Rx
tags: [rx, java]
---

## Observable vs Observer vs Subscription

The Observable represents the stream of data and can be sub-scribed to by an Observer (which you’ll learn more about in “Capturing All Notifications by Using Observer<T>”):

```
interface Observable<T> {
    Subscription subscribe(Observer s)
}
```

Upon subscription, the `Observer` can have three types of events pushed to it:

* Data via the `onNext()` function
* Errors (exceptions or throwables) via the `onError()` function
* Stream completion via the `onCompleted()` function

```
interface Observer<T> {
    void onNext(T t)
    void onError(Throwable t)
    void onCompleted()
}
```

The `onNext()` method might never be called or might be called once, many, or infinite times. The `onError()` and `onCompleted()` are terminal events, meaning that only one of them can be called and only once. When a terminal event is called, the `Observable` stream is finished and no further events can be sent over it. Terminal events might never occur if the stream is infinite and does not fail.

As will be shown in Flow Control and Backpressure, there is an additional type of signature to permit interactive pull:

```
interface Producer {
   void request(long n)
}
```

This is used with a more advanced `Observer` called  `Subscriber` (with more details given in Controlling Listeners by Using Subscription and Subscriber<T>:

```
interface Subscriber<T> implements Observer<T>, Subscription {
    void onNext(T t)
    void onError(Throwable t)
    void onCompleted()
    ...
    void unsubscribe()
    void setProducer(Producer p)
}
```

The `unsubcribe` function as part of the `Subscription`  interface is used to allow a subscriber to unsubscribe from an `Observable` stream. The `setProducer` function and `Producer`  types are used to form a bidirectional communication channel between the producer and consumer used for flow control.

## 