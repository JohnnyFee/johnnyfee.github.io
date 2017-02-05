---
layout: post
title: "RxJava Thead"
description: ""
category: [RxJava]
tags: [rx, rxjava, thread]
---

## What Is a Scheduler?

In principle it works similarly to `ScheduledExecutorService`  from `java.util.concurrent`.

Schedulers are used together with `subscribeOn()` and `observeOn()` operators as well as when creating certain types of `Observable`s. A scheduler only creates instances of `Worker`s that are responsible for scheduling and running code. When RxJava needs to schedule some code it first asks `Scheduler` to provide a `Worker` and uses the latter to schedule subsequent tasks.

You will find examples of this API later on, but first familiarize yourself with available built-in schedulers:

### `Schedulers.newThread()`

This scheduler simply starts a new thread every time it is requested via `subscribeOn()` or `observeOn()`. `newThread()` is hardly ever a good choice, not only because of the latency involved when starting a thread, but also because this thread is not reused. 

Stack space must be allocated up front (typically around one megabyte, as controlled by the `-Xss` parameter of the JVM) and the operating system must start new native thread. When the `Worker` is done, the thread simply terminates. 

This scheduler can be useful only when tasks are coarse-grained: it takes a lot of time to complete but there are very few of them, so that threads are unlikely to be reused at all. In practice, following `Schedulers.io()` is almost always a better choice.

### `Schedulers.io()`

This scheduler is similar to `newThread()`, but already started threads are recycled and can possibly handle future requests. This implementation works similarly to `ThreadPoolExecutor`  from `java.util.concurrent` with an unbounded pool of threads. Every time a new `Worker` is requested, either a new thread is started (and later kept idle for some time) or the idle one is reused.

The name `io()` is not a coincidence. Consider using this scheduler for I/O bound tasks which require very little CPU resources. However they tend to take quite some time, waiting for network or disk. Thus, it is a good idea to have a relatively big pool of threads. Still, be careful with unbounded resources of any kind—in case of slow or unresponsive external dependencies like web services, `io()` scheduler might start an enormous number of threads, leading to your very own application becoming unresponsive, as well.

### `Schedulers.computation()`

You should use a computation scheduler when tasks are entirely  CPU-bound; that is, they require computational power and have no blocking code (reading from disk, network, sleeping, waiting for lock, etc.) Because each task executed on this scheduler is supposed to fully utilize one CPU core, executing more such tasks in parallel than there are available cores would not bring much value. Therefore, `computation()` scheduler by default limits the number of threads running in parallel to the value of `availableProcessors()`, as found in the `Runtime.getRuntime()` utility class.If for some reason you need a different number of threads than the default, you can always use the `rx.scheduler.max-computation-threads` system property. By taking less threads you ensure that there is always one or more CPU cores idle, and even under heavy load, `computation()` thread pool does not saturate your server. It is not possible to have more computation threads than cores. 

`computation()` scheduler uses unbounded queue in front of every thread, so if the task is scheduled but all cores are occupied, they are queued. In case of load peak, this scheduler will keep the number of threads limited. However, the queue just before each thread will keep growing.

Luckily, built-in operators, especially `observeOn()` ensure that this `Scheduler` is not overloaded.

### `Schedulers.from(Executor executor)` 

`Scheduler`s are internally more complex than `Executor`s  from `java.util.concurrent`, so a separate abstraction was needed. But because they are conceptually quite similar, unsurprisingly there is a wrapper that can turn `Executor` into `Scheduler` using  the `from()` factory method:

```java
import com.google.common.util.concurrent.ThreadFactoryBuilder;
import rx.Scheduler;
import rx.schedulers.Schedulers;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.ThreadPoolExecutor;

//...

ThreadFactory threadFactory = new ThreadFactoryBuilder()
    .setNameFormat("MyPool-%d")
    .build();
Executor executor = new ThreadPoolExecutor(
    10,  //corePoolSize
    10,  //maximumPoolSize
    0L, TimeUnit.MILLISECONDS, //keepAliveTime, unit
    new LinkedBlockingQueue<>(1000),  //workQueue
    threadFactory
);
Scheduler scheduler = Schedulers.from(executor);
```

I am intentionally using this verbose syntax for creating `ExecutorService` rather than the more simple version:

```java
import java.util.concurrent.Executors;

//...
ExecutorService executor = Executors.newFixedThreadPool(10);
```

Although tempting, the `Executors`  factory class hardcodes several defaults that are impractical or even dangerous in enterprise applications. 

For examples, it uses unbounded `LinkedBlockingQueue` that can grow infinitely, resulting in `OutOfMemoryError` for cases in which there are a of large number of outstanding tasks. 

Also, the default `ThreadFactory`  uses meaningless thread names like `pool-5-thread-3`. Naming threads properly is an invaluable tool when profiling or analyzing thread dumps. 

Implementing `ThreadFactory` from scratch is a bit cumbersome, so we used ThreadFactoryBuilder from [Guava](https://github.com/google/guava).

Creating schedulers from `Executor` that we consciously configured is advised for projects dealing with high load. However, because RxJava has no control over independently created threads in an `Executor`, it cannot pin threads (that is, try to keep work of the same task on the same thread to improve cache locality). This `Scheduler` barely makes sure a single `Scheduler.Worker` processes events sequentially.

### `Schedulers.immediate()`

`Schedulers.immediate()` is a special scheduler that invokes a task within the client thread in a blocking fashion, rather than asynchronously. Using it is pointless unless some part of your API requires providing a scheduler, whereas you are absolutely fine with default behavior of `Observable`, not involving any threading at all. In fact, subscribing to an `Observable` (more on that in a second) via `immediate()` `Scheduler` typically has the same effect as not subscribing with any particular scheduler at all. In general, avoid this scheduler, it blocks the calling thread and is of limited use.

### `Schedulers.trampoline()`

The `trampoline()` scheduler is very similar to `immediate()` because it also schedules tasks in the same thread, effectively blocking. However, as opposed to `immediate()`, the upcoming task is executed when all previously scheduled tasks complete.

`immediate()` invokes a given task right away, whereas `trampoline()` waits for the current task to finish. Trampoline is a pattern in functional programming that allows implementing recursion without infinitely growing the call stack. This is best explained with an example, first involving `immediate()`. By the way, notice that we do not interact directly with a `Scheduler` instance but first create a  `Worker`.

The output is as expected; you could actually replace `schedule()` with a simple method invocation:

```
1044    | main  | Main start
1094    | main  |  Outer start
2097    | main  |   Inner start
3097    | main  |   Inner end
3100    | main  |  Outer end
3100    | main  | Main end
```

Inside the `Outer` block we `schedule()` `Inner` block that gets invoked immediately, interrupting the `Outer` task. When `Inner` is done, the control goes back to `Outer`. Again, this is simply a convoluted way of invoking a task in a blocking manner indirectly via `immediate()` `Scheduler`. But what happens if we replace `Schedulers.immediate()` with `Schedulers.trampoline()`? The output is quite different:

```
log("Main start");
worker.schedule(() -> {
    log(" Outer start");
    sleepOneSecond();
    worker.schedule(() -> {
        log("  Middle start");
        sleepOneSecond();
        worker.schedule(() -> {
            log("   Inner start");
            sleepOneSecond();
            log("   Inner end");
        });
        log("  Middle end");
    });
    log(" Outer end");
});
log("Main end");
```

The `Worker` from `immediate()` `Scheduler` outputs the following:

```
1029    | main  | Main start
1091    | main  |  Outer start
2093    | main  |   Middle start
3095    | main  |    Inner start
4096    | main  |    Inner end
4099    | main  |   Middle end
4099    | main  |  Outer end
4099    | main  | Main end
```

Versus the `trampoline()` worker:

```
1041    | main  | Main start
1095    | main  |  Outer start
2099    | main  |  Outer end
2099    | main  |   Middle start
3101    | main  |   Middle end
3101    | main  |    Inner start
4102    | main  |    Inner end
4102    | main  | Main end
```

### `Schedulers.test()`

This `Scheduler` is used only for testing purposes, and you will never see it in production code. Its main advantage is the ability to arbitrarily advance the clock, simulating time passing by.

## subscribeOn()
### Declarative Subscription with subscribeOn()

`subscribe()` by default uses the client thread. To recap, here is the most simple subscription that you can come up with where no threading was involved whatsoever:

```java
Observable<String> simple() {
    return Observable.create(subscriber -> {
        log("Subscribed");
        subscriber.onNext("A");
        subscriber.onNext("B");
        subscriber.onCompleted();
    });
}

//...

log("Starting");
final Observable<String> obs = simple();
log("Created");
final Observable<String> obs2 = obs
        .map(x -> x)
        .filter(x -> true);
log("Transformed");
obs2.subscribe(
        x -> log("Got " + x),
        Throwable::printStackTrace,
        () -> log("Completed")
);
log("Exiting");
```

Output:

```
33  | main  | Starting
120 | main  | Created
128 | main  | Transformed
133 | main  | Subscribed
133 | main  | Got A
133 | main  | Got B
133 | main  | Completed
134 | main  | Exiting
```

There is an inherent but hidden connection between `subscribe()` and `create()`. Every time you call `subscribe()` on an `Observable`, its  `OnSubscribe` callback method is invoked (wrapping the lambda expression you passed to `create()`). It receives your `Subscriber` as an argument.

By default, this happens in the same thread and is blocking, so whatever you do inside `create()` will block `subscribe()`. If your `create()` method sleeps for few seconds, `subscribe()` will block. Moreover, if there are operators between `Observable.create()` and your `Subscriber` (lambda acting as callback), all these operators are invoked on behalf of the thread that invoked `subscribe()`.

RxJava does not inject any concurrency facilities by default between `Observable` and `Subscriber`. The reason behind that is that `Observable`s tend to be backed by other concurrency mechanisms like event loops or custom threads, so Rx lets you take full control rather than imposing any convention.

By inserting `subscribeOn()` anywhere between an original `Observable` and `subscribe()`, you declaratively select `Scheduler` where the `OnSubscribe` callback method will be invoked. No matter what you do inside `create()`, this work is offloaded to an independent `Scheduler` and your `subscribe()` invocation no longer blocks:

```java
log("Starting");
final Observable<String> obs = simple();
log("Created");
obs
    .subscribeOn(schedulerA)
    .subscribe(
            x -> log("Got " + x),
            Throwable::printStackTrace,
            () -> log("Completed")
    );
log("Exiting");
```

```
35  | main  | Starting
112 | main  | Created
123 | main  | Exiting
123 | Sched-A-0 | Subscribed
124 | Sched-A-0 | Got A
124 | Sched-A-0 | Got B
124 | Sched-A-0 | Completed
```

The `schedulerA` as well as `Sched-A-0` thread come from the following sample schedulers we built for illustration purposes:

```java
import static java.util.concurrent.Executors.newFixedThreadPool;


ExecutorService poolA = newFixedThreadPool(10, threadFactory("Sched-A-%d"));
Scheduler schedulerA = Schedulers.from(poolA);

ExecutorService poolB = newFixedThreadPool(10, threadFactory("Sched-B-%d"));
Scheduler schedulerB = Schedulers.from(poolB);

ExecutorService poolC = newFixedThreadPool(10, threadFactory("Sched-C-%d"));
Scheduler schedulerC = Schedulers.from(poolC);

private ThreadFactory threadFactory(String pattern) {
    return new ThreadFactoryBuilder()
        .setNameFormat(pattern)
        .build();
}
```

In mature applications, in terms of Rx adoption, `subscribeOn()` is very seldom used. Normally, `Observable`s come from sources that are naturally asynchronous or apply scheduling on their own. You should treat `subscribeOn()` only in special cases when the underlying `Observable` is known to be synchronous (`create()` being blocking).

Most of the time `Observable`s come from asynchronous sources and they are treated as asynchronous by default. Therefore, using `subscribeOn()` is very limited, mostly when retrofitting existing APIs or libraries.

### subscribeOn() Concurrency and Behavior

- If two invocations of the `subscribeOn()` appear between `Observable` and `subscribe()`, `subscribeOn()` closest to the original `Observable` _wins_.
- If you are designing an API and you use `subscribeOn()` internally, the client code has no way of overriding the `Scheduler` of your choice. This can be a conscious design decision; after all, the API designer might know best which `Scheduler` is appropriate. On the other hand, providing an overloaded version of said API that allows overriding the chosen `Scheduler` is always a good idea.

All operators are executed by default in the same thread (scheduler), no concurrency is involved by default:

```java
log("Starting");
final Observable<String> obs = simple();
log("Created");
obs
        .doOnNext(this::log)
        .map(x -> x + '1')
        .doOnNext(this::log)
        .map(x -> x + '2')
        .subscribeOn(schedulerA)
        .doOnNext(this::log)
        .subscribe(
                x -> log("Got " + x),
                Throwable::printStackTrace,
                () -> log("Completed")
        );
log("Exiting");
```

Position of `subscribeOn()` is not relevant, it can be right after `Observable` or just before `subscribe()`.

```
20  | main  | Starting
104 | main  | Created
123 | main  | Exiting
124 | Sched-A-0 | Subscribed
124 | Sched-A-0 | A
124 | Sched-A-0 | A1
124 | Sched-A-0 | A12
124 | Sched-A-0 | Got A12
124 | Sched-A-0 | B
124 | Sched-A-0 | B1
124 | Sched-A-0 | B12
125 | Sched-A-0 | Got B12
```

RxJava creates a single `Worker` instance for the entire pipeline, mostly to guarantee sequential processing of events. This means that if one of your operators is particularly slow—for example, `map()` reading data from disk in order to transform events passing by—this costly operation will be invoked within the same thread. A single broken operator can slow down the entire pipeline, from production to consumption. This is an antipattern in RxJava, operators should be nonblocking, fast, and as pure as possible.

Rather than blocking within `map()`, we can invoke `flatMap()` and asynchronously collect all the results.

```java
class RxGroceries {

    Observable<BigDecimal> purchase(String productName, int quantity) {
        return Observable.fromCallable(() ->
            doPurchase(productName, quantity));
    }

    BigDecimal doPurchase(String productName, int quantity) {
        log("Purchasing " + quantity + " " + productName);
        //real logic here
        log("Done " + quantity + " " + productName);
        return priceForProduct;
    }

}
```

When purchasing several goods we would like to parallelize as much as possible and calculate total price for all goods in the end. The first attempt is fruitless:

```java
Observable<BigDecimal> totalPrice = Observable
    .just("bread", "butter", "milk", "tomato", "cheese")
    .subscribeOn(schedulerA)  //BROKEN!!!
    .map(prod -> rxGroceries.doPurchase(prod, 1))
    .reduce(BigDecimal::add)
    .single();
```

The code does not work concurrently because there is just a single flow of events, which by design must run sequentially. The main `Observable` emitting products cannot be parallelized. However, for each product, we create a new, independent `Observable` as returned from `purchase()`. Because they are independent, we can safely schedule each one of them concurrently:

```java
Observable<BigDecimal> totalPrice = Observable
    .just("bread", "butter", "milk", "tomato", "cheese")
    .flatMap(prod ->
            rxGroceries
                    .purchase(prod, 1)
                    .subscribeOn(schedulerA))
    .reduce(BigDecimal::add)
    .single();
```

Each substream created within `flatMap()` is supplied with a `schedulerA`. Every time `subscribeOn()` is used to the `Scheduler` gets a chance to return a new `Worker`, and therefore a separate thread (simplifying a bit):

```
113  | Sched-A-1 | Purchasing 1 butter
114  | Sched-A-0 | Purchasing 1 bread
125  | Sched-A-2 | Purchasing 1 milk
125  | Sched-A-3 | Purchasing 1 tomato
126  | Sched-A-4 | Purchasing 1 cheese
1126 | Sched-A-2 | Done 1 milk
1126 | Sched-A-0 | Done 1 bread
1126 | Sched-A-1 | Done 1 butter
1128 | Sched-A-3 | Done 1 tomato
1128 | Sched-A-4 | Done 1 cheese
```

We can no longer rely on the order of downstream events—they neither begin nor complete in the same order as they were emitted (the original sequence began at bread). When events reach the `reduce()` operator, they are already sequential and well behaving.

### Batching Requests Using groupBy()

We can declaratively batch such requests by using `groupBy()`—and this still works with declarative concurrency:

```java
import org.apache.commons.lang3.tuple.Pair;

Observable<BigDecimal> totalPrice = Observable
    .just("bread", "butter", "egg", "milk", "tomato",
      "cheese", "tomato", "egg", "egg")
    .groupBy(prod -> prod)
    .flatMap(grouped -> grouped
        .count()
        .map(quantity -> {
            String productName = grouped.getKey();
            return Pair.of(productName, quantity);
        }))
    .flatMap(order -> store
        .purchase(order.getKey(), order.getValue())
        .subscribeOn(schedulerA))
    .reduce(BigDecimal::add)
    .single();
```

The output:

```
164  | Sched-A-0 | Purchasing 1 bread
165  | Sched-A-1 | Purchasing 1 butter
166  | Sched-A-2 | Purchasing 3 egg
166  | Sched-A-3 | Purchasing 1 milk
166  | Sched-A-4 | Purchasing 2 tomato
166  | Sched-A-5 | Purchasing 1 cheese
1151 | Sched-A-0 | Done 1 bread
1178 | Sched-A-1 | Done 1 butter
1180 | Sched-A-5 | Done 1 cheese
1183 | Sched-A-3 | Done 1 milk
1253 | Sched-A-4 | Done 2 tomato
1354 | Sched-A-2 | Done 3 egg
```

## Declarative Concurrency with observeOn()