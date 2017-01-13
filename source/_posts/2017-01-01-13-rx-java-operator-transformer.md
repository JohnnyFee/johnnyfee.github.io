---
layout: post
title: "Rx Operators and Transformations"
description: ""
category: Rx
tags: [rx, java, operator]
---

## Operators

One of the reasons why RxJava is so powerful is the rich universe of built-in operators it provides and the possibility of creating custom ones. An operator is a function that takes upstream `Observable<T>` and returns downstream `Observable<R>`, where types `T` and `R` might or might not be the same. Operators allow composing simple transformations into complex processing graphs.

Operators are typically instance methods on `Observable` that somehow alter the behavior of upstream `Observable` as seen by downstream `Observable`s or `Subscriber`s.

In RxJava, you must forget about mutating data structures internally: modifying variables outside of stream is considered very nonidiomatic and dangerous. Every single operator returns a _new_ `Observable`, leaving the original one untouched.

Every time you use any operator, including those that we did not explain yet, you basically create a wrapper around original `Observable`. This wrapper can intercept events flying through it but typically does not subscribe on its own.

## Marble Diagrams

A marble diagram illustrates how various operators work. Most of the time you will see two horizontal axes representing time flying by from left to right. Shapes on these diagrams (the aforementioned marbles) visualize events. Between the top and bottom axes there is an operator in question that somehow alters the sequence of events coming from the source `Observable` (upstream) to form the resulting `Observable` (downstream), as demonstrated in the following graphic:

![](../uploads/rprx_03in01.png)

## Core Operators: Filtering

![](../uploads/rprx_03in02.png)

It is also a common practice to `filter()` the same `Observable` multiple times, each time with a different predicate. We can apply several filters on original `Observable` and even chain them (`filter(p1).filter(p2).filter(p3)`), effectively implementing logical conjunction (`filter(p1 && p2 && p3)`).

```java
Observable<String> strings = someFileSource.lines();
Observable<String> comments = strings.filter(s -> s.startsWith("#"));
Observable<String> instructions = strings.filter(s -> s.startsWith(">"));
Observable<String> empty = strings.filter(String::isBlank);
```

## Core Operators: Mapping

Mappings are used to perform certain transformation on each event. This can be decoding from  JSON to Java object (or vice versa), enriching, wrapping, extracting from the event, and so on.

![](../uploads/rprx_03in03.png)

```java
import rx.functions.Func1;

Observable<Status> tweets = //...
Observable<Date> dates = tweets.map(new Func1<Status, Date>() {
    @Override
    public Date call(Status status) {
        return status.getCreatedAt();
    }
});

Observable<Date> dates =
        tweets.map((Status status) -> status.getCreatedAt());

Observable<Date> dates =
        tweets.map((status) -> status.getCreatedAt());

Observable<Date> dates =
        tweets.map(Status::getCreatedAt);
```

Whatever you return from a function in `map()` is wrapped again inside an `Observable`.

By the way having mutable events (like `java.util.Date`) is problematic because any operator or `Subscriber` can unintentionally mutate events consumed by other `Subscriber`s. We can quickly fix this by applying subsequent `map()`:

```java
Observable<Instant> instants = tweets
        .map(Status::getCreatedAt)
        .map((Date d) -> d.toInstant());
```

`doOnNext()` is like a probe that you can safely inject anywhere in your pipeline of `Observable`s to keep an eye on what is flowing through. `doOnNext()` allows looking at items going through without touching them. `doOnNext()` simply receives every event that flew from upstream `Observable` and passes it downstream, it cannot modify it in any way. 

Technically, `doOnNext()` can mutate the event. However, having mutable events controlled by `Observable` is a recipe for a disaster.

## Wrapping Up Using flatMap()

`flatMap()` first constructs `Observable<Observable<R>>` replacing all upstream values of type `T` with `Observable<R>` (just like `map()`). However, it does not stop there: it automatically subscribes to these inner `Observable<R>` streams to produce a single stream of type `R`, containing all values from all inner streams, as they come.

![](../uploads/rprx_03in04.png)

`flatMap()` is the most fundamental operator in RxJava, using it one can easily implement `map()` or `filter()`:

```java
import static rx.Observable.empty;
import static rx.Observable.just;

numbers.map(x -> x * 2);
numbers.filter(x -> x != 10);

//equivalent
numbers.flatMap(x -> just(x * 2));
numbers.flatMap(x -> (x != 10) ? just(x) : empty());
```

In practice, we do not replace `map()` and `filter()` with `flatMap()` due to the clarity of code and performance.

As a rule of thumb, you use `flatMap()` for the following situations:

* The result of transformation in `map()` must be an `Observable`. For example, performing long-running, asynchronous operation on each element of the stream without blocking.

* You need a one-to-many transformation, a single event is expanded into multiple sub-events. For example, a stream of customers is translated into streams of their orders, for which each customer can have an arbitrary number of orders.

Now imagine that you would like to use a method returning an `Iterable`  (like  `List` or  `Set`). For example, if `Customer` has a simple `List<Order> getOrders()`, you are forced to go through several operators to take advantage of it in `Observable` pipeline:

```java
Observable<Customer> customers = //...
Observable<Order> orders = customers
        .flatMap(customer -> Observable.from(customer.getOrders()));
```

Or, equivalent and equally verbose:

```java
Observable<Order> orders = customers
        .map(Customer::getOrders)
        .flatMap(Observable::from);
```

The need to map from a single item to `Iterable` is so popular that an operator, `flatMapIterable()`, was created to perform just such a transformation:

```java
Observable<Order> orders = customers
        .flatMapIterable(Customer::getOrders);
```

If `getOrders()` was not a simple getter but an expensive operation in terms of run time, it is better to implement `getOrders()` to explicitly return `Observable<Order>`.

Another interesting variant of `flatMap()` can react not only to events, but on any notification, namely events, errors, and completion. The simplified signature of this `flatMap()` overload follows. For an `Observable<T>` we must provide the following:

* A function mapping single `T` → `Observable<R>`
* A function mapping an error notification → `Observable<R>`
* A no-arg function reacting on upstream completion that can return `Observable<R>`

Here is what the code looks like:

```java
<R> Observable<R> flatMap(
        Func1<T, Observable<R>> onNext,
        Func1<Throwable, Observable<R>> onError,
        Func0<Observable<R>> onCompleted)
```

Imagine that you are creating a service that uploads videos. It takes a `UUID` and returns upload progress with `Observable<Long>`:

```java
void store(UUID id) {
    upload(id).subscribe(
            bytes -> {}, //ignore
            e -> log.error("Error", e),
            () -> rate(id)
    );
}

Observable<Long> upload(UUID id) {
    //...
}

Observable<Rating> rate(UUID id) {
    //...
}
```

```java
upload(id)
    .flatMap(
            bytes -> Observable.empty(),
            e -> Observable.error(e),
            () -> rate(id)
    );
```

the last lambda expression (`() -> rate(id)`) reacts upon stream completion. At this point, we replace completion notification with another `Observable<Rating>`.  So, even if the original `Observable` wanted to terminate, we ignore that and in a way append a different `Observable`. Keep in mind that all three callbacks must return `Observable<R>` of the same type `R`.

Just to make sure you understand the syntactic part of `flatMap()`, another abstract example translates from a sequence of characters to Morse code:

```java
import static rx.Observable.empty;
import static rx.Observable.just;

Observable<Sound> toMorseCode(char ch) {
    switch(ch) {
        case 'a': return just(DI, DAH);
        case 'b': return just(DAH, DI, DI, DI);
        case 'c': return just(DAH, DI, DAH, DI);
        //...
        case 'p': return just(DI, DAH, DAH, DI);
        case 'r': return just(DI, DAH, DI);
        case 's': return just(DI, DI, DI);
        case 't': return just(DAH);
        //...
        default:
            return empty();
    }
}

enum Sound { DI, DAH }

//...

just('S', 'p', 'a', 'r', 't', 'a')
    .map(Character::toLowerCase)
    .flatMap(this::toMorseCode)
```

As you can clearly see, every character is replaced by a sequence of `DI` and `DAH` sounds (_dots_ and _dashes_). When character is unrecognizable, an empty sequence is returned. `flatMap()` ensures that we get a steady, flat stream of sounds, as opposed to `Observable<Observable<Sound>>`, which we would get with plain `map()`. At this point, we touch an important aspect of `flatMap()`: order of events. This is best explained with an example, which will be much more enjoyable with _delay()_ operator.