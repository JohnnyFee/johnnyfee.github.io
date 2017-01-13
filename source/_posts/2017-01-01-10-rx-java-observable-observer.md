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

### Hot and Cold Observables

A cold `Observable` is entirely lazy and never begins to emit events until
someone is actually interested. A cold `Observable` is entirely lazy and never begins to emit events until someone is actually interested.

A hold of such an `Observable` it might already be emitting events no matter how many `Subscriber`s they have. `Observable` pushes events downstream, even if no one listens and events are possibly missed. Examples of such `Observable`s include mouse movements, keyboard inputs, or button clicks.

How to ensure that every subscriber received all events:

-  One such technique already sneaked into this chapter: the `cache()` operator. Technically, it can buffer all events from a hot `Observable` and allow subsequent subscribers to receive the same sequence of events. However, because it consumes theoretically an unlimited amount of memory, be careful with caching hot `Observable`s.

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

#### Create Oberservable with Observable.create()

```
Observable<Integer> ints = Observable
    .create(new Observable.OnSubscribe<Integer>() {
        @Override
        public void call(Subscriber<? super Integer> subscriber) {
            log("Create");
            subscriber.onNext(5);
            subscriber.onNext(6);
            subscriber.onNext(7);
            subscriber.onCompleted();
            log("Completed");
        }
    });
```

`Observable.create()` is so versatile that in fact you can mimic all
of the previously discovered factory methods on top of it. For example,
`Observable.just(x)`, emits a single value `x` and immediately
completes afterward, might look like this:

```java
static <T> Observable<T> just(T x) {
    return Observable.create(subscriber -> {
            subscriber.onNext(x);
            subscriber.onCompleted();
        }
    );
}
```

As an exercise, try to implement `never()`, `empty()`, or even `range()` by using only `create()`.

#### From Callback API to Observable Stream

We will use the open source [Twitter4J](http://twitter4j.org/)  library that can push a subset of new tweets using a callback-based API:

```java
import twitter4j.Status;
import twitter4j.StatusDeletionNotice;
import twitter4j.StatusListener;
import twitter4j.TwitterStream;
import twitter4j.TwitterStreamFactory;

void consume(
            Consumer<Status> onStatus,
            Consumer<Exception> onException) {
    TwitterStream twitterStream = new TwitterStreamFactory().getInstance();
    twitterStream.addListener(new StatusListener() {
        @Override
        public void onStatus(Status status) {
            onStatus.accept(status);
        }

        @Override
        public void onException(Exception ex) {
            onException.accept(ex);
        }

        //other callbacks
    });
    twitterStream.sample();
}
```

Calling `twitterStream.sample()` starts a background thread that logs in to Twitter and awaits new messages. Every time a tweet appears, the `onStatus` callback is executed.Execution can jump between threads, therefore we can no longer rely on throwing exceptions. Instead the `onException()` notification is used.

Use it as:

```java
consume(
    status -> log.info("Status: {}", status),
    ex     -> log.error("Error callback", ex)
);
```

What if we want to count the number of tweets per second? Or consume just the first five? And what if we would like to have multiple listeners? In these situations, each of these situations opens a new HTTP connection. Last but not least, this API does not allow unsubscribing when we are done, risking resource leak.

```java
Observable<Status> observe() {
    return Observable.create(subscriber -> {
        TwitterStream twitterStream =
            new TwitterStreamFactory().getInstance();
        twitterStream.addListener(new StatusListener() {
            @Override
            public void onStatus(Status status) {
                if (subscriber.isUnsubscribed()) {
                    twitterStream.shutdown();
                } else {
                    subscriber.onNext(status);
                }
            }

            @Override
            public void onException(Exception ex) {
                if (subscriber.isUnsubscribed()) {
                    twitterStream.shutdown();
                } else {
                    subscriber.onError(ex);
                }
            }

            //other callbacks
        });
        subscriber.add(Subscriptions.create(twitterStream::shutdown));
    });
}
```

When someone subscribes only to receive a small fraction of the stream, our `Observable` will make sure to clean up the resources.

We know a second technique to implement clean-up that does not require waiting for an upstream event. The moment a subscriber unsubscribes, we call `shutdown()` immediately, rather than waiting for the next tweet to come just to trigger clean-up behavior (last line):

```java
twitterStream.addListener(new StatusListener() {
    //callbacks...
});
twitterStream.sample();

subscriber.add(Subscriptions.create(twitterStream::shutdown));
```

The subscription is very similar:

```java
observe().subscribe(
        status -> log.info("Status: {}", status),
        ex -> log.error("Error callback", ex)
);
```

However, keep in mind that the implementation still opens a new network connection for each `Subscriber`.

This `Observable` blurs the difference between hot and cold streams. On one hand, it represents external events that appear without our control (hot behavior). On the other hand, events will not begin flowing (no underlying HTTP connection) to our system until we actually `subscribe()`.

Manually keeping track of all subscribers and shutting down the connection to the external system only when all subscribers leave is a Sisyphean task that we will implement anyway, just to appreciate idiomatic solutions later on. The idea is to keep track of all subscribers in some sort of `Set<Subscriber<Status>>` and start/shut down the external system connection when it becomes empty/nonempty:

```java
//DON'T DO THIS, very brittle and error prone
class LazyTwitterObservable {

  private final Set<Subscriber<? super Status>> subscribers =
    new CopyOnWriteArraySet<>();

  private final TwitterStream twitterStream;

  public LazyTwitterObservable() {
    this.twitterStream = new TwitterStreamFactory().getInstance();
    this.twitterStream.addListener(new StatusListener() {
      @Override
      public void onStatus(Status status) {
        subscribers.forEach(s -> s.onNext(status));
      }

      @Override
      public void onException(Exception ex) {
        subscribers.forEach(s -> s.onError(ex));
      }

      //other callbacks
    });
  }

  private final Observable<Status> observable = Observable.create(
      subscriber -> {
        register(subscriber);
        subscriber.add(Subscriptions.create(() ->
            this.deregister(subscriber)));
      });

  Observable<Status> observe() {
    return observable;
  }

  private synchronized void register(Subscriber<? super Status> subscriber) {
    if (subscribers.isEmpty()) {
      subscribers.add(subscriber);
      twitterStream.sample();
    } else {
      subscribers.add(subscriber);
    }
  }

  private synchronized void deregister(Subscriber<? super Status> subscriber) {
    subscribers.remove(subscriber);
    if (subscribers.isEmpty()) {
      twitterStream.shutdown();
    }
  }

}
```

The `subscribers` set thread-safely stores a collection of currently subscribed `Observer`s. Every time a new `Subscriber` appears, we add it to a set and connect to the underlying source of events lazily. Conversely, when the last `Subscriber` disappears, we shut down the upstream source. The key here is to always have exactly one connection to the upstream system rather than one connection per subscriber. This works and is quite robust, however, the implementation seems too low-level and error-prone. Access to the `subscribers` set must be `synchronized`, but the collection itself must also support safe iteration. Calling `register()` _must_ appear before adding the `deregister()` callback; otherwise, the latter can be called before we register. There must be a better way to implement such a common scenario of multiplexing a single upstream source to multiple `Observer`s—luckily, there are at least two such mechanisms. RxJava is all about reducing such dangerous boilerplate and abstracting away concurrency.

### ConnectableObservable

`ConnectableObservable`  is an interesting way of coordinating multiple `Subscriber`s and sharing a single underlying subscription.`ConnectableObservable` is a type of `Observable` that ensures there exists at most one `Subscriber` at all times, but in reality there can be many of them sharing the same underlying resource.

Remember our first attempt at creating a single, lazy connection to an underlying resource with `LazyTwitterObservable`? We had to manually keep track of all `subscribers` and connect/disconnect as soon as the first subscriber appeared or the last one left.

See 

- [Connectable Observable Operators · ReactiveX/RxJava Wiki](https://github.com/ReactiveX/RxJava/wiki/Connectable-Observable-Operators)
- [Intro to Rx - Hot and Cold observables](http://www.introtorx.com/Content/v1.0.10621.0/14_HotAndColdObservables.html#PublishAndConnect)

#### Single Subscription with publish().refCount()

```java
Observable<Status> observable = Observable.create(subscriber -> {
    System.out.println("Establishing connection");
    TwitterStream twitterStream = new TwitterStreamFactory().getInstance();
    //...
    subscriber.add(Subscriptions.create(() -> {
        System.out.println("Disconnecting");
        twitterStream.shutdown();
    }));
    twitterStream.sample();
});
```

When we try to use this `Observable`, each `Subscriber` establishes a new
connection, like so:

```java
Subscription sub1 = observable.subscribe();
System.out.println("Subscribed 1");
Subscription sub2 = observable.subscribe();
System.out.println("Subscribed 2");
sub1.unsubscribe();
System.out.println("Unsubscribed 1");
sub2.unsubscribe();
System.out.println("Unsubscribed 2");
```

Here is the output:

```
Establishing connection
Subscribed 1
Establishing connection
Subscribed 2
Disconnecting
Unsubscribed 1
Disconnecting
Unsubscribed 2
```

This time, to simplify, we use a parameterless `subscribe()` method that triggers subscription but drops all events and notifications. 

The most scalable and simplest solution: the `publish().refCount()` pair:

```java
lazy = observable.publish().refCount();
//...
System.out.println("Before subscribers");
Subscription sub1 = lazy.subscribe();
System.out.println("Subscribed 1");
Subscription sub2 = lazy.subscribe();
System.out.println("Subscribed 2");
sub1.unsubscribe();
System.out.println("Unsubscribed 1");
sub2.unsubscribe();
System.out.println("Unsubscribed 2");
```

The output is much like what we expect:

```
Before subscribers
Establishing connection
Subscribed 1
Subscribed 2
Unsubscribed 1
Disconnecting
Unsubscribed 2
```

`refCount()` does is basically count how many active `Subscriber`s we have at the moment, much like reference counting in historic garbage-collection algorithms. When this number goes from zero to one, it subscribes to the upstream `Observable`. Every number above one is ignored and the same upstream `Subscriber` is simply shared between all downstream `Subscriber`s. However, when the very last downstream `Subscriber` unsubscribes, the counter drops from one to zero and `refCount()` knows it must unsubscribe right away.

The connection is not established until we actually get the first `Subscriber`. But, more important, the second `Subscriber` does not initiate a new connection, it does not even touch the original `Observable`. The `publish().refCount()` tandem wrapped the underlying `Observable` and intercepted all subscriptions.

Thankfully, `refCount()` does precisely what we implemented manually with `LazyTwitterObservable`. You can use the `publish().refCount()` duet to allow sharing of a single `Subscriber` while remaining lazy. This pair of operators is used very frequently and therefore has an alias named `share()`.

Keep in mind that if unsubscription is shortly followed by subscription, `share()` still performs reconnection, as if there were no caching at all.

#### ConnectableObservable Lifecycle

Another useful use case of the `publish()` operator is forcing subscription in the absence of any `Subscriber`.

We can call `Observable.publish()` on any `Observable` and get
`ConnectableObservable` in return. 

Anyone who subscribes to `ConnectableObservable` is placed in a set of `Subscriber`s. As long as `connect()` is not called, these `Subscriber`s are put on hold, they never directly subscribe to upstream `Observable`. However, when `connect()` is called, a dedicated mediating `Subscriber` subscribes to upstream `Observable` (`tweets`), no matter how many downstream subscribers appeared before—even if there were none. But if there were some `Subscriber`s of `ConnectableObservable` put on hold, they will all receive the same sequence of notifications.

This mechanism has multiple advantages. Imagine that you have an `Observable` in your application in which multiple `Subscriber`s are interested. On startup, several components (e.g., Spring beans or EJBs) subscribe to that `Observable` and begin listening. Without `ConnectableObservable`, it is very likely that hot `Observable` will begin emitting events that will be consumed by the first `Subscriber`, but `Subscriber`s started later will miss out on the early events. This can be a problem if you want to be absolutely sure that all `Subscriber`s receive a consistent view of the world. All of them will receive events in the same order, unfortunately `Subscriber` appearing late will lose early notifications.

The solution to this problem is to `publish()` such an `Observable` first and make it possible for all of the components in your system to `subscribe()`; for example, during application startup. When you are 100% sure that all `Subscriber`s that need to receive the same sequence of events (including initial event) had a chance to `subscribe()`, connect such `ConnectableObservable` with `connect()`. This will create a single `Subscriber` in upstream `Observable` and begin pushing events to all downstream `Subscriber`s. The following example uses [Spring framework](http://projects.spring.io/spring-framework/), but as a matter of fact it is framework agnostic:

```java
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextRefreshedEvent;
import rx.Observable;
import rx.observables.ConnectableObservable;

@Configuration
class Config implements ApplicationListener<ContextRefreshedEvent> {

    private final ConnectableObservable<Status> observable =
        Observable.<Status>create(subscriber -> {
            log.info("Starting");
            //...
        }).publish();

    @Bean
    public Observable<Status> observable() {
        return observable;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        log.info("Connecting");
        observable.connect();
    }
}

@Component
class Foo {

    @Autowired
    public Foo(Observable<Status> tweets) {
        tweets.subscribe(status -> {
            log.info(status.getText());
        });
        log.info("Subscribed");
    }
}

@Component
class Bar {

    @Autowired
    public Bar(Observable<Status> tweets) {
        tweets.subscribe(status -> {
            log.info(status.getText());
        });
        log.info("Subscribed");
    }
}
```

Our simple application first eagerly creates an `Observable` (`ConnectableObservable` subclass underneath). `Observable`s are lazy by design, so it is fine to create them even statically. This `Observable` is `publish()`-ed so that all subsequent `Subscriber`s are put on hold and do not receive any notifications until we do `connect()`. Later, two `@Component`s  are found that require this `Observable`. Dependency injection framework provides our `ConnectableObservable` and allows everyone to subscribe. However, the events, even in case of hot `Observable` will not arrive until full application startup. When all of the components are instantiated and wired together, a `ContextRefreshedEvent`  sent from the framework can be consumed. At this point, we can guarantee that all components had a chance to request a given `Observable` and `subscribe()` to it. When the application is about to start, we call `connect()`. This subscribes to the underlying `Observable` exactly once and forwards the exact same sequence of events to every component. The trimmed-down logging output might look as follows (the component names are in square brackets):

```
[Foo   ] Subscribed
[Bar   ] Subscribed
[Config] Connecting
[Config] Starting
[Foo   ] Msg 1
[Bar   ] Msg 1
[Foo   ] Msg 2
[Bar   ] Msg 2
```

### Subscribing Observable

#### Subscribing to notifications from Observable

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

#### Subscribing to notifications by using Observer<T>

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

#### Unsubscribing from Observable

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

#### Managing multiple subscribers

Every time `subscribe()` is called, our subscription handler inside
`create()` is invoked. 

For example, `Observable.just(42)` should emit `42` to every subscriber, not just the first one. On the other hand, if you put a database query or heavyweight computation inside `create()`, it might be beneficial to share a single invocation among all subscribers.

Consider the following code sample that subscribes to the same Observable twice:

```java
Observable<Integer> ints =
        Observable.create(subscriber -> {
                    log("Create");
                    subscriber.onNext(42);
                    subscriber.onCompleted();
                }
        );
log("Starting");
ints.subscribe(i -> log("Element A: " + i));
ints.subscribe(i -> log("Element B: " + i));
log("Exit");
```

The out put is:

```
main: Starting
main: Create
main: Element A: 42
main: Create
main: Element B: 42
main: Exit
```

If you would like to avoid calling `create()` for each subscriber and simply reuse events that were already computed, there exists a handy `cache()` operator:

```java
Observable<Integer> ints =
    Observable.<Integer>create(subscriber -> {
                //...
            }
    )
    .cache();
```

With caching, the output for two `Subscriber`s is quite different:

```
main: Starting
main: Create
main: Element A: 42
main: Element B: 42
main: Exit
```

When the first subscriber appears, `cache()` delegates subscription to the underlying `Observable` and forwards all notifications (events, completions, or errors) downstream. However, at the same time, it keeps a copy of all notifications internally. When a subsequent subscriber wants to receive pushed notifications, `cache()` no longer delegates to the underlying `Observable` but instead feeds cached values.

Of course, you must keep in mind that `cache()` plus infinite stream is the recipe for a disaster, also known as `OutOfMemoryError`. 

#### Subscriber.isUnsubscribed

It is advised to check the `isUnsubscribed()` flag as often as possible to avoid sending events after a subscriber no longer wants to receive new events. 

```java
Observable<BigInteger> naturalNumbers = Observable.create(
    subscriber -> {
        Runnable r = () -> {
            BigInteger i = ZERO;
            while (!subscriber.isUnsubscribed()) {
                subscriber.onNext(i);
                i = i.add(ONE);
            }
        };
        new Thread(r).start();
    });
```

Rather than have a blocking loop running directly in the client thread, we spawn a custom thread and emit events directly from there. 

__Please note that you should not use explicit threads inside
`create()`. Concurrency and custom schedulers that allow you to write concurrent code without really interacting with threads yourself.__

Even if someone poorly implemented the `Observable`, we can easily fix it by applying the `serialize()` operator, such as `loadAll(...).serialize()`. This operator ensures that events are serialized and sequenced. It also enforces that no more events are sent after completion or error.

```java
Observable<Data> loadAll(Collection<Integer> ids) {
    return Observable.create(subscriber -> {
        ExecutorService pool = Executors.newFixedThreadPool(10);
        AtomicInteger countDown = new AtomicInteger(ids.size());
        //DANGER, violates Rx contract. Don't do this!
        ids.forEach(id -> pool.submit(() -> {
            final Data data = load(id);
            subscriber.onNext(data);
            if (countDown.decrementAndGet() == 0) {
                pool.shutdownNow();
                subscriber.onCompleted();
            }
        }));
    });
}
```

## Subject

The `Subject` class is quite interesting because it extends `Observable` and implements `Observer`  at the same time. What that means is that you can treat it as `Observable` on the client side (subscribing to upstream events) and as `Observer` on the provider side (pushing events downstream on demand by calling `onNext()` on it). 

Typically, what you do is keep a reference to `Subject` internally so that you can push events from any source you like but externally expose this `Subject` as `Observable`.

```java
class TwitterSubject {

    private final PublishSubject<Status> subject = PublishSubject.create();

    public TwitterSubject() {
        TwitterStream twitterStream = new TwitterStreamFactory().getInstance();
        twitterStream.addListener(new StatusListener() {
            @Override
            public void onStatus(Status status) {
                subject.onNext(status);
            }

            @Override
            public void onException(Exception ex) {
                subject.onError(ex);
            }

            //other callbacks
        });
        twitterStream.sample();
    }

    public Observable<Status> observe() {
        return subject;
    }

}
```

`Subject` is a useful tool for creating `Observable` instances when `Observable.create(...)` seems too complex to manage.

`Subject`s are useful, but there are many subtleties you must understand. For example, after calling `subject.onError()`, the `Subject` silently drops subsequent `onError` notifications, effectively swallowing them.

`PublishSubject` is one of the flavors (subclasses) of `Subject`. Other types of `Subject`s include the following:


- `AsyncSubject`

    Remembers last emitted value and pushes it to subscribers when `onComplete()` is called. As long as `AsyncSubject` has not completed, events except the last one are discarded. 
- `BehaviorSubject`

    Pushes all events emitted after subscription happened, just like `PublishSubject`. However, first it emits the most recent event that occurred just before subscription. This allows `Subscriber` to be immediately notified about the state of the stream. For example, `Subject` may represent the current temperature broadcasted every minute. When a client subscribes, he will receive the last seen temperature immediately rather than waiting several seconds for the next event. But the same `Subscriber` is not interested in historical temperatures, only the last one. If no events have yet been emitted, a special default event is pushed first (if provided).

- `ReplaySubject`

    The most interesting type of `Subject` that caches events pushed through the entire history. If someone subscribes, first he receives a batch of missed (cached) events and only later events in real-time. By default, all events since the creation of this `Subject` are cached. This can be become dangerous if the stream is infinite or very long. In that case, there are overloaded versions of `ReplaySubject` that keep only the following:

        + Configurable number of events in memory (`createWithSize()`)
        + Configurable time window of most recent events (`createWithTime()`)
        + Or even constraint both size and time (whichever limit is reached first) with `createWithTimeAndSize()`

`Subject`s should be treated with caution: often there are more idiomatic ways of sharing subscriptions and caching events—for example, “ConnectableObservable”. For the time being, prefer relatively low-level `Observable.create()` or even better, consider standard factory methods like `from()` and `just()`.

One more thing to keep in mind is concurrency. By default calling `onNext()` on a `Subject` is directly propagated to all `Observer`’s `onNext()` callback methods. It is not a surprise that these methods share the same name. In a way, calling `onNext()` on `Subject` indirectly invokes `onNext()` on each and every `Subscriber`. But you need to keep in mind that according to _Rx Design Guidelines_ all calls to `onNext()` on `Observer` must be serialized (i.e., sequential), thus two threads cannot call `onNext()` at the same time. However, depending on the way you stimulate `Subject`, you can easily break this rule—e.g., calling `Subject.onNext()` from multiple threads from a thread pool. Luckily, if you are worried that this might be the case, simply call `.toSerialized()` on a `Subject`, which is quite similar to calling `Observable.serialize()`. This operator makes sure downstream events occur in the correct order.

## Error Handling

It is a good practice to wrap entire expressions within `create()` in a `try`-`catch` block. `Throwable`s should be propagated downstream rather than logged or rethrown, as demonstrated here:

```java
Observable<Data> rxLoad(int id) {
    return Observable.create(subscriber -> {
        try {
            subscriber.onNext(load(id));
            subscriber.onCompleted();
        } catch (Exception e) {
            subscriber.onError(e);
        }
    });
}
```

The pattern of completing an `Observable` with one value and wrapping with the `try`-`catch` statement is so prevalent that the built-in `fromCallable()` operator was introduced:

```java
Observable<Data> rxLoad(int id) {
    return Observable.fromCallable(() ->
        load(id));
}
```

It is semantically equivalent but much shorter and has some other benefits over `create()` that you will discover later.

