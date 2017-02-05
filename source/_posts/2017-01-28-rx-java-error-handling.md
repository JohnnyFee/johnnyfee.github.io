---
layout: post
title: "RxJava Error Handling"
description: ""
category: [RxJava]
tags: [rx, rxjava]
---

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

## onErrorResumeNext

```
void bestBookFor(Person person) {
    recommend(person)
            .onErrorResumeNext(bestSeller())
            .map(Book::getTitle)
            .subscribe(this::display);
}
```

`onErrorResumeNext()` is a powerful operator that intercepts exceptions happening upstream, swallows them, and subscribes to provided _backup_ `Observable`. This is how Rx implements a `try`-`catch` clause.