---
layout: "post"
title: "Rx Java Error Handling"
date: "2016-12-12 14:50"
categories: Android
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

TODO

## Retrying After Failures

TODO

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
