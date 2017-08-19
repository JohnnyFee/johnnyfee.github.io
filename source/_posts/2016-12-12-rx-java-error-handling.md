---
layout: "post"
title: "Rx Java Error Handling"
date: "2016-12-12 14:50"
categories: RxJava
tags: [rx, java, rxjava]
---
## Error Handling

In RxJava, failures are just another type of notification. Every `Observable<T>` is a sequence of events of type `T` optionally followed by completion or error notification. This means that errors are implicitly a part of every stream, and even though we are not required to handle them, there are plenty of operators that declaratively handle errors in a more elegant way. Also, an obtrusive `try`-`catch` around `Observable` will not capture any errors, they are only propagated through the aforementioned error notifications.

`subscribe()` only listening for values and not errors is often a bad sign and possibly missed errors. Even if you do not expect any exceptions to happen (which is rarely the case), at least place error logging that plugs into your logging framework:

```java
private static final Logger log = LoggerFactory.getLogger(My.class);

//....
.subscribe(
    System.out::println,
    throwable -> log.error("That escalated quickly", throwable));
```

It is a good practice to surround a lambda expression within `create()` with a `try`-`catch()` block, just like in the previous example:

```java
Observable.create(subscriber -> {
    try {
        subscriber.onNext(1 / 0);
    } catch (Exception e) {
        subscriber.onError(e);
    }
});
```

However, if you forget about the `try`-`catch` and let `create()` throw an exception, RxJava does its best and propagates such an exception as an `onError()` notification:

```java
Observable.create(subscriber -> subscriber.onNext(1 / 0));
```

The two preceding code examples are semantically equivalent. Exceptions thrown from `create()` are caught internally by RxJava and translated to error notification. Yet, it is advised to explicitly propagate exceptions via `subscriber.onError()` if possible. Even better, use `fromCallable()` ):

```java
Observable.fromCallable(() -> 1 / 0);
```

All lambda expressions passed to higher-order functions like `map()` or `filter()` should be pure, whereas throwing an exception is an impure side effect. RxJava again does its best to handle unexpected exceptions here and the behavior is exactly what you would expect. If any operator in the pipeline throws an exception, it is translated to error notification and passed downstream.

```java
Observable
    .just(1, 0)
    .map(x -> 10 / x);

Observable
    .just("Lorem", null, "ipsum")
    .filter(String::isEmpty);
```

Despite RxJava making an effort to fix broken user code, if you suspect your lambda expression to potentially throw an exception, make it explicit by using `flatMap()`:

```java
Observable
    .just(1, 0)
    .flatMap(x -> (x == 0) ?
            Observable.error(new ArithmeticException("Zero :-(")) :
            Observable.just(10 / x)
    );
```

`flatMap()` is a very versatile operator, it does not need to manifest the next step of asynchronous computation. `Observable` is a container for values or errors, so if you want to declaratively express even very fast computation that can result in an error, wrapping it with `Observable` is a good choice, as well.

This is fine: ordinary operators transform values flowing through but skip completion and error notifications, letting them flow downstream. This means that a single error from any upstream `Observable` will propagate with a cascading failure to all downstream subscribers.

Again, this is fine if your business logic requires absolutely all steps to succeed. But sometimes you can safely ignore failures and replace them with fallback values or secondary sources.

## Replacing errors with a fixed result using onErrorReturn()

The simplest error handling operator in RxJava is `onErrorReturn()`: when encountered, an error simply replaces it with a fixed value:

```
Observable<Income> income = person
    .flatMap(this::determineIncome)
    .onErrorReturn(error -> Income.no())

//...

private Observable<Income> determineIncome(Person person) {
    return Observable.error(new RuntimeException("Foo"));
}

class Income {
    static Income no() {
        return new Income(0);
    }
}
```

`onErrorReturn()` is a fluent and very pleasant to read alternative to a `try`-`catch` block that returns fixed result in the `catch` statement known from imperative style:

```java
try {
    return determineIncome(Person person)
} catch(Exception e) {
    return Income.no();
}
```

## Lazily computing fallback value using onErrorResumeNext()

```java
Observable<Person> person = //...
Observable<Income> income = person
    .flatMap(this::determineIncome)
    .onErrorResumeNext(person.flatMap(this::guessIncome));

//...

private Observable<Income> guessIncome(Person person) {
  //...
}
```

The `onErrorResumeNext()` operator basically replaces error notification with another stream. If you subscribe to an an `Observable` guarded with `onErrorResumeNext()` in case of failure, RxJava transparently switches from main `Observable` to the fallback one, specified as an argument.

Theoretically we can return a different fallback stream based on the exception message or type. The `onErrorResumeNext()` operator has an overloaded version that allows just that:

```java
Observable<Income> income = person
    .flatMap(this::determineIncome)
    .onErrorResumeNext(th -> {
        if (th instanceof NullPointerException) {
            return Observable.error(th);
        } else {
            return person.flatMap(this::guessIncome);
        }
    });
```

## Timing Out When Events Do Not Occur

`timeout()` operator that listens to the upstream `Observable`, constantly monitoring how much time elapsed since the last event or subscription. If it so happens that the silence between consecutive events is longer than a given period, the `timeout()` operator publishes an error notification that contains  `TimeoutException`.

```java
Observable<Confirmation> confirmation() {
    Observable<Confirmation> delayBeforeCompletion =
        Observable
            .<Confirmation>empty()
            .delay(200, MILLISECONDS);
    return Observable
            .just(new Confirmation())
            .delay(100, MILLISECONDS)
            .concatWith(delayBeforeCompletion);
}
```

Now, let’s test drive the `timeout()` operator in its simplest overloaded version:

```java
import java.util.concurrent.TimeoutException;

//...

confirmation()
    .timeout(210, MILLISECONDS)
    .forEach(
        System.out::println,
        th -> {
            if ((th instanceof TimeoutException)) {
                System.out.println("Too long");
            } else {
                th.printStackTrace();
            }
        }
    );
```

The overloaded version of `timeout()` does just that: it accept two factories of `Observable`s, one marking the timeout of the first event, and the second one for each subsequent element. An example is worth a thousand words:

```java
nextSolarEclipse(LocalDate.of(2016, SEPTEMBER, 1))
    .timeout(
        () -> Observable.timer(1000, TimeUnit.MILLISECONDS),
        date -> Observable.timer(100, MILLISECONDS))
```

Here, the first `Observable` emits exactly one event after one second—this is the acceptable latency threshold for the first event. The second `Observable` is created for each event that appears on the stream and allows fine tuning of the timeout for the subsequent event.

It is sometimes useful to also track the latency of each event, even if we do not timeout. The handy `timeInterval()` operator does just that: it replaces each event of type `T` with `TimeInterval<T>`  that encapsulates the event but also shows how much time has elapsed since the previous event (or subscription in case of first event):

```
Observable<TimeInterval<LocalDate>> intervals =
        nextSolarEclipse(LocalDate.of(2016, JANUARY, 1))
                .timeInterval();
```

Apart from `getValue()` that returns `LocalDate`, `TimeInterval<LocalDate>` also has `getIntervalInMilliseconds()` but it is easier to see how it looks studying the output of the preceding program after subscription. You can clearly see that it took 533 milliseconds for the first event to arrive but only around 50 milliseconds for each one subsequently:

```
TimeInterval [intervalInMilliseconds=533, value=2016-03-09]
TimeInterval [intervalInMilliseconds=49, value=2016-09-01]
TimeInterval [intervalInMilliseconds=50, value=2017-02-26]
TimeInterval [intervalInMilliseconds=50, value=2017-08-21]
TimeInterval [intervalInMilliseconds=50, value=2018-02-15]
TimeInterval [intervalInMilliseconds=50, value=2018-07-13]
TimeInterval [intervalInMilliseconds=50, value=2018-08-11]
TimeInterval [intervalInMilliseconds=50, value=2019-01-06]
TimeInterval [intervalInMilliseconds=51, value=2019-07-02]
TimeInterval [intervalInMilliseconds=49, value=2019-12-26]
```

The `timeout()` operator has yet another overloaded version that accepts the fallback `Observable` replacing the original source in case of error. It is very similar in behavior to `onErrorResumeNext()`.

## Retrying After Failures

The simplest version of the `retry()` operator resubscribes to a failed `Onservable` hoping that it will keep producing normal events rather than failures. For educational purposes, we will create an `Observable` that misbehaves severely:

```java
Observable<String> risky() {
    return Observable.fromCallable(() -> {
        if (Math.random() < 0.1) {
            Thread.sleep((long) (Math.random() * 2000));
            return "OK";
        } else {
            throw new RuntimeException("Transient");
        }
    });
}
```

In 90 percent of the cases, subscribing to `risky()` ends with a `RuntimeException`. If you somehow make it to the `"OK"` branch an artificial delay between zero and two seconds is injected. Such a risky operation will serve as a demonstration of `retry()`:

```java
risky()
    .timeout(1, SECONDS)
    .doOnError(th -> log.warn("Will retry", th))
    .retry()
    .subscribe(log::info);
```

The behavior of `retry()` is fairly straightforward: it pushes all events and completion notification downstream, but not `onError()`. The error notification is swallowed (so no exception is logged whatsoever), thus we use `doOnError()` callback. Every time `retry()` encounters a simulated `RuntimeException` or `TimeoutException`, it tries subscribing again.

A word of caution here: if your `Observable` is cached or otherwise guaranteed to always return the same sequence of elements, `retry()` will not work:

```
risky().cached().retry()  //BROKEN
```

If `risky()` emits errors once, it will continue emitting them forever, no matter how many times you resubscribe. To overcome this issue, you can delay the creation of `Observable` even further by using ) `defer()`:

```java
Observable
    .defer(() -> risky())
    .retry()
```

Even if an `Observable` returned from `risky()` is cached, `defer()` calls `risky()` multiple times, possibly getting a new `Observable` each time.

### Retrying by using delay and limited attempts

Basically, parameterless `retry()` is a `while` loop with a `try` block within it, followed by an empty `catch`.

First, we should limit the number of attempts, which happens to be built in:

```java
risky()
    .timeout(1, SECONDS)
    .retry(10)
```

The integer parameter to `retry()` instructs how many times to resubscribe, thus `retry(0)` is equivalent to no retry at all. If the upstream `Observable` failed for the tenth time, the last seen exception is propagated downstream.

A more flexible version of `retry()` leaves you with a decision about retry, based on the attempt number and the actual exception:

```java
risky()
    .timeout(1, SECONDS)
    .retry((attempt, e) ->
        attempt <= 10 && !(e instanceof TimeoutException))
```

This version not only limits the number of resubscription attempts to 10, but also drops retrying prematurely if the exception happens to be `TimeoutException`.

If failures are transient, waiting a little bit prior to a resubscription attempt sounds like a good idea. The `retry()` operator does not provide such a possibility out of the box, but it is relatively easy to implement. A more robust version of `retry()` called `retryWhen()` takes a function receiving an `Observable` of failures. Every time an upstream fails, this `Observable` emits a `Throwable`. Our responsibility is to transform this `Observable` in such a way that it emits some arbitrary event when we want to retry (hence the name):

```java
risky()
    .timeout(1, SECONDS)
    .retryWhen(failures -> failures.delay(1, SECONDS))
```

The preceding example of `retryWhen()` receives an `Observable` that emits a `Throwable` every time the upstream fails. We simply delay that event by one second so that it appears in the resulting stream one second later. This is a signal to `retryWhen()` that it should attempt retry. If we simply returned the same stream (`retryWhen(x -> x)`), `retryWhen()` would behave exactly like `retry()`, resubscribing immediately when an error occurs. With `retryWhen()`, we can also easily simulate `retry(10)` (well, almost… keep reading):

```
.retryWhen(failures -> failures.take(10))
```

We receive an event each time a failure occurs. The stream we return is supposed to emit an arbitrary event when we want to retry. Thus, we simply forward the first 10 failures, causing each one of them to be retried immediately.

But what happens when eleventh failure occurs in a `failures` `Observable`? This is where it becomes tricky. The `take(10)` operator emits an `onComplete` event immediately following the 10th failure. Therefore, after the 10th retry, `retryWhen()` receives a completion event. This completion event is interpreted as a signal to stop retrying and complete downstream. It means that after 10 failed attempts, we simply emit nothing and complete. However, if we complete `Observable` returned inside `retryWhen()` with an error, this error will be propagated downstream.

In other words, as long as we emit any event from an `Observable` inside `retryWhen()`, they are interpreted as retry requests. However, if we send a completion or error notification, retry is abandoned and this completion or error is passed downstream. Doing just `failures.take(10)` _will_ retry 10 times, but in case of yet another failure, we do not propagate the last error but the successful completion, instead. Let’s have a look at it:

```java
static final int ATTEMPTS = 11;

//...

.retryWhen(failures -> failures
        .zipWith(Flowerble.range(1, ATTEMPTS), (err, attempt) ->
                attempt < ATTEMPTS ?
                        Flowable.timer(1, SECONDS) :
                        Flowable.error(err))
        .flatMap(x -> x)
)
```

This looks quite complex, but it is also really powerful. We `zip` failures with sequence numbers from 1 to 11. We would like to perform as many as 10 retry attempts, so if the attempt sequence number is smaller than 11, we return `timer(1, SECONDS)`. The `retryWhen()` operator will capture this event and retry one second after failure. However, when the 10th retry ends with a failure, we return an `Observable` with that error, completing the retry mechanism with the last seen exception.

This gives us a lot of flexibility. We can stop retrying when a certain exception appears or when too many attempts were already performed. Moreover, we can adjust the delay time between attempts! For example, the first retry can appear immediately but the delays between subsequent retries should grow exponentially:

```java
.retryWhen(failures -> failures
    .zipWith(Observable.range(1, ATTEMPTS),
         this::handleRetryAttempt)
    .flatMap(x -> x)
)

//...

Observable<Long> handleRetryAttempt(Throwable err, int attempt) {
    switch (attempt) {
        case 1:
            return Observable.just(42L);
        case ATTEMPTS:
            return Observable.error(err);
        default:
            long expDelay = (long) Math.pow(2, attempt - 2);
            return Observable.timer(expDelay, SECONDS);
    }
}
```

## Monitoring and Debugging

Gives you few tips on how to make monitoring and debugging easier in applications using RxJava.

### doOn…() Callbacks

Every `Observable` has a set of callback methods that you can use to peek into various events, namely:* `doOnCompleted()`

* `doOnEach()`
* `doOnError()`
* `doOnNext()`
* `doOnRequest()`
* `doOnSubscribe()`
* `doOnTerminate()`
* `doOnUnsubscribe()`

What they all have in common is that they are not allowed to alter the state of an `Observable` in any way and they all return the same `Observable`, which makes them an ideal place to sprinkle some logging logic.

```java
Observable<Instant> timestamps = Observable
    .fromCallable(() -> dbQuery())
    .doOnSubscribe(() -> log.info("subscribe()"));

timestamps
    .zipWith(timestamps.skip(1), Duration::between)
    .map(Object::toString)
    .subscribe(log::info);
```

`zipWith()` actually subscribes to all of the underlying streams, effectively subscribing to the same `timestamps` `Observable` twice. This is a problem that you can discover by observing `doOnSubscribe()` is being invoked twice.

Speaking of `zip()`, thanks to backpressure it no longer buffers faster stream infinitely, waiting for a slower one to emit events.
Instead, it asks for a fixed batch of values from each `Observable`, throwing `MissingBackpressureException` if it received more:

```
.doOnSubscribe(() -> log.info("subscribe()"))
.doOnRequest(c -> log.info("Requested {}", c))
.doOnNext(instant -> log.info("Got: {}", instant));
```

`doOnRequest()` logs `Requested 128`, the value chosen by `zip` operator.
Even when the source is infinite or very large, we should see at most 128 messages such as `Got: ...` afterward from a well-behaving `Observable`.

You **CANNOT** use `doOnError()` for any error handling; it is for logging only. It does not consume the error notification, which keeps propagating downstream:

```java
Observable<String> obs = Observable
  .<String>error(new RuntimeException("Swallowed"))
  .doOnError(th -> log.warn("onError", th))
  .onErrorReturn(th -> "Fallback");
```

As clean as `onErrorReturn()` looks, it is very easy to swallow exceptions with it. It does provide the exception that we want to replace with a fallback value, but logging it is our responsibility. To keep functions small and composable, logging the error first in `doOnError()` and then handling the exception in the following line silently is a little bit more robust. Forgetting to log the exception is rarely a good idea and must be a careful decision, not an oversight.


`doOnEach()`: This is invoked for each `Notification`, namely `onNext()`, `onCompleted()`, and `onError()`. It can accept either a lambda invoked for each `Notofication` or an  `Observer`.

`doOnTerminate()`: This is invoked when either `onCompleted()` or `onError()` occurs. It is impossible to distinguish between them, so it might be better to use `doOnCompleted()` and `doOnError()` independently.

### Measuring and Monitoring

TODO

From [RxJava中的错误处理 - 简书](http://www.jianshu.com/p/916b72778145)

在RxJava中我们可以很方便地处理异常，只要加上`onError`即可。

不过，如果异常发生在操作符内部，比如`flatMap`，那我们怎么把这个异常传递给`onError`呢。

> Checked异常和Unchecked异常
>
> * Checked异常必须被显式地捕获或者传递，而unchecked异常则可以不必捕获或抛出。
> * Checked异常继承java.lang.Exception类。Unchecked异常继承自java.lang.RuntimeException类。

## Unchecked异常

一般情况下，unchecked异常会自动传递给`onError`。例如以下代码可以打印出“Error!”。

```java
Observable.just("Hello!")
          .map(input -> {throw new RuntimeException();})
          .subscribe(
              System.out::println,
              error -> System.out.println("Error!")
          );
```

也有例外的情况，那就是... 那些非常严重的错误，以致于RxJava都不能继续运行了。比如`StackOverflowError`，这些异常被认为是致命的，对它们来说，调用`onError`毫无意义，并没什么用。你可以用[`Exceptions.throwIfFatal`](http://reactivex.io/RxJava/javadoc/rx/exceptions/Exceptions.html#throwIfFatal(java.lang.Throwable))来过滤掉这些致命的异常并重新抛出，不发射关于它们的通知。

## Checked异常

尽管RxJava有自己的异常处理机制，不过Checked异常还是必须由你的代码来处理，也就是说，还是要自己加`try-catch`。

假设我们用到这样方法：

```java
String transform(String input) throws IOException;
```

我们可以把Checked异常转换为Unchecked异常，像这样：

```java
Observable.just("Hello!")
    .map(input -> {
        try {
            return transform(input);
        } catch (Throwable t) {
            throw Exceptions.propagate(t);
        }
    });
```

`Exceptions.propagate()`只是简单地做了这样一件事：如果异常是Checked异常，那就把它包装成Unchecked异常。

而对于像`flatMap`这样返回Observable对象的操作，可以直接返回`Observable.error()`。

```java
Observable.just("Hello!")
    .flatMap(input -> {
        try {
            return Observable.just(transform(input));
        } catch (Throwable t) {
            return Observable.error(t);
        }
    });
```

## 异常的屏蔽

很多RxJava初学者都犯了一个错误，过度地使用`onError`，其实`onError`应该在数据无法继续处理下去时才使用。例如，在使用[Retrofit 1](https://github.com/square/retrofit)的时候，响应的状态码为非200的结果调用`onError`，这样，我们在处理非200的响应结果时就会变得十分麻烦。这个问题在Retrofit 2已经解决了，现在可以通过`Observable<Response<Type>>`和`Observable<Result<Type>>`，来处理`onNext`中的非200的结果返回。

也就是说，通常，你可以在发生错误的时候给`onNext`一个错误的标识，然后直接在`onNext`中处理问题，而不是跳过代码进入`onError`，这样还是可以不中断你的数据流，继续运行你的代码。

如何屏蔽异常而不把异常抛给`onError`，以下有两种选择：

* `onErrorReturn()`，在遇到错误时发射一个特定的数据
* `onErrorResumeNext()`，在遇到错误时发射一个数据序列

```java
Observable.just("Request data...")
    .map(this::dangerousOperation)
    .onErrorReturn(error -> "Empty result");
```

当dangerousOperation产生异常时，不会触发`onError`，而是返回字符串"Empty result"。

当上游的`Observable`观察到异常通知(`onError`)时，通过`onErrorReturn`或`onErrorResumeNext`来把`onError`转换成与下游序列有所区分的数据。

## Tutorial

- [Intro to Rx - Advanced error handling](http://www.introtorx.com/Content/v1.0.10621.0/11_AdvancedErrorHandling.html)
- [Error Handling With Observable Sequences](https://xgrommx.github.io/rx-book/content/getting_started_with_rxjs/creating_and_querying_observable_sequences/error_handling.html)
