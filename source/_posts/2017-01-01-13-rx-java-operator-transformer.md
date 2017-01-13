layout: post
title: "Rx Operators and Transformations"
description: ""
category: Rx
tags: [rx, java, operator]
---
## Core Operators: Mapping and Filtering



## Operators

One of the reasons why RxJava is so powerful is the rich universe of built-in operators it provides and the possibility of creating custom ones. An operator is a function that takes upstream `Observable<T>` and returns downstream `Observable<R>`, where types `T` and `R` might or might not be the same. Operators allow composing simple transformations into complex processing graphs.



### Timing: timer() and interval()

`timer()` and `interval()` use threads underneath. 
The former simply creates an `Observable` that emits a `long` value of zero after a specified delay and then completes:

```java
Observable
   .timer(1, TimeUnit.SECONDS)
   .subscribe((Long zero) -> log(zero));
```

The fixed value of `0` (in variable `zero`) is just a convention without any specific meaning. It is basically an asynchronous equivalent of `Thread.sleep()`. Rather than blocking the current thread, we create an `Observable` and `subscribe()` to it.

`interval()` generates a sequence of `long` numbers, beginning with zero, with a fixed delay between each one of them:

```java
Observable
    .interval(1_000_000 / 60, MICROSECONDS)
    .subscribe((Long i) -> log(i));
```

`interval()` is sometimes used to control animations or processes that need to run with certain frequency.