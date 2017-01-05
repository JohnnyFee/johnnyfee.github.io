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

## Observable

`rx.Observable<T>`  represent a flowing sequence of values. It is _the_ abstraction that you will use all of the time. Because these values often appear over a wide time range, we tend to think about an `Observable` as a stream of events.

Indeed, `Observable<T>` can actually produce three types of events:

* Values of type `T`, as declared by `Observable`
* Completion event
* Error event

The specification of reactive extensions clearly states that every `Observable` can emit an arbitrary number of values optionally followed by completion or error (but not both). Strictly speaking _Rx Design Guidelines_ define this rule as follows: `OnNext* (OnCompleted | OnError)?`—where `OnNext` represents a new event.

### Creating Observables

Unless you work with an external API that already exposes `Observable`s, you first must learn where `Observable`s come from and how you can create a stream and handle subscriptions.

First, there are several factory methods that create fixed constant `Observable`s. These are useful if you want to use RxJava consistently across an entire codebase or when values to be emitted are cheap to produce and known in advance:

-  `Observable.just(value)`

    Creates an `Observable` instance that emits exactly one `value` to all future subscribers and completes afterward. Overloaded versions of the `just()` operator can take anything from two to nine values to be emitted. 

- `Observable.from(values)`

    Similar to `just()` but accepts `Iterable<T>` or `T[]`, thus creating `Observable<T>` with as many values emitted as elements in `values` collection. Another overloaded version accepts a `Future<T>`, emitting an event when the underlying `Future` completes. 

- `Observable.range(from, n)`

    Produces `n` integer numbers starting from `from`. For example, `range(5, 3)` will emit `5`, `6`, and `7` and then complete normally. Each subscriber will receive the same set of numbers. `Observable.empty()`

    Completes immediately after subscription, without emitting any values.
    
- `Observable.never()`

    Such `Observable` never emits any notifications, neither values nor completion or error. This stream is useful for testing purposes.

- `Observable.error()`

    Emits an `onError()` notification immediately to every subscriber. No other values are emitted and according to contract `onCompleted()` cannot occur as well.

All the `empty()`, `never()`, and `error()` factories don’t seem terribly useful; however, they are quite handy when composing with genuine `Observable`s.

All the factory methods by default operate on the client thread. Have a look at the following code sample:

```java
private static void log(Object msg) {
    System.out.println(
          Thread.currentThread().getName() +
          ": " + msg);
}

//...

log("Before");
Observable
    .range(5, 3)
    .subscribe(i -> {
        log(i);
    });
log("After");
```

What we are interested in is the thread that executed each log statement:

```
main: Before
main: 5
main: 6
main: 7
main: After
```

#### Mastering Observable.create()



What we are interested in is the thread that executed each log statement:

### Subscribing to Notifications from Observable

An instance of `Observable` does not emit any events until someone is actually interested in receiving them. To begin watching an `Observable`, you use the `subscribe()` family of methods:

```java
Observable<Tweet> tweets = //...

tweets.subscribe((Tweet tweet) ->
    System.out.println(tweet));
```

`Observable` does not throw exceptions. Instead, exceptions are just another type of notification (event) that `Observable` can propagate. Therefore, you do not use the `try`-`catch` block around `subscribe()` to catch exceptions produced along the way. Instead, you provide a separate callback:

There are multiple overloaded versions of `subscribe()` that are more specific.

```java
tweets.subscribe(
        (Tweet tweet) -> { System.out.println(tweet); },
        (Throwable t) -> { t.printStackTrace(); }
);
```

The second argument to `subscribe()` is optional. It notifies about exceptions that can potentially occur while producing items. It is guaranteed that no other `Tweet` will appear after the exception.

The third optional callback allows us to listen for stream completion:

```
tweets.subscribe(
        (Tweet tweet) -> { System.out.println(tweet); },
        (Throwable t) -> { t.printStackTrace(); },
        () -> {this.noMore();}
);
```

As a side note, often you can use Java 8 method references instead of
lambdas to improve readability, as illustrated here:

```
tweets.subscribe(
    System.out::println,
    Throwable::printStackTrace,
    this::noMore);
```

### Subscribing to Notifications by Using Observer<T>

It turns out that providing all three arguments to `subscribe()` is quite useful, thus it would be helpful to have a simple wrapper holding all three callbacks. This is what `Observer<T>`  was designed for. `Observer<T>` is a container for all three callbacks, receiving all possible notifications from `Observable<T>`. Here is how you can register an `Observer<T>`:

```java
Observer<Tweet> observer = new Observer<Tweet>() {
    @Override
    public void onNext(Tweet tweet) {
        System.out.println(tweet);
    }

    @Override
    public void onError(Throwable e) {
        e.printStackTrace();
    }

    @Override
    public void onCompleted() {
        noMore();
    }
};

//...
tweets.subscribe(observer);
```

As a matter of fact `Observer<T>` is the core abstraction for listening in RxJava. Yet if you want even greater control, `Subscriber` (`Observer`s abstract implementation) is even more powerful.

### Unsubscribing from Observable

There are two means to support that: `Subscription`  and  `Subscriber` to `unsubscribe` to cancel a subscription.

`Subscription` is a handle that allows client code to cancel a subscription by using the `unsubscribe()` method. Additionally, you can query the status of a subscription by using `isUnsubscribed()`. It is important to unsubscribe from `Observable<T>` as soon as you no longer want to receive more events; this avoids memory leaks and unnecessary load on the system.

```java
Subscription subscription =
        tweets.subscribe(System.out::println);

//...

subscription.unsubscribe();
```

We know that we can use `Subscription` to control subscription outside of the `Observer` or callback. `Subscriber<T>`, on the other hand, implements both `Observer<T>` and `Subscription`. Thus, it can be used both to consume notifications (events, completions, or errors) and control subscription.

The code example that follows subscribes to all events, but the subscriber itself decides to give up receiving notifications under certain criteria. Normally, this can be done by using the built-in `takeUntil()` operator, but for the time being we can unsubscribe manually:

```java
Subscriber<Tweet> subscriber = new Subscriber<Tweet>() {
    @Override
    public void onNext(Tweet tweet) {
        if (tweet.getText().contains("Java")) {
            unsubscribe();
        }
    }

    @Override
    public void onCompleted() {}

    @Override
    public void onError(Throwable e) {
        e.printStackTrace();
    }
};
tweets.subscribe(subscriber);
```