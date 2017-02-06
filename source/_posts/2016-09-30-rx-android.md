---
layout: post
title: "Rx Android"
description: ""
category: Android
tags: [rx, java]
---

## UI Events as Streams

From the syntax level, RxJava aims to avoid _callback hell_ by replacing nested callbacks with declarative transformations.Therefore, `setOnClickListener()` enclosing `Observable` looked a bit disturbing.
Fortunately, there is a library that translates Android UI events into streams.

```
compile 'com.jakewharton.rxbinding:rxbinding:0.4.0'
```

```java
RxView
    .clicks(button)
    .flatMap(listCities(52.229841, 21.011736))
    .delay(2, TimeUnit.SECONDS)
    .concatMapIterable(extractCities())
    .map(toCityName())
    .toList()
    .subscribeOn(Schedulers.io())
    .observeOn(AndroidSchedulers.mainThread())
    .subscribe(
        putOnListView(),
        displayError());

Func1<Void, Observable<Cities>> listCities(final double lat, final double lon) {
    return new Func1<Void, Observable<Cities>>() {
        @Override
        public Observable<Cities> call(Void aVoid) {
            return meetup.listCities(lat, lon);
        }
    };
}
```

We begin with `Observable<Void>` representing button clicks. Each click event triggers an asynchronous HTTP request returning `Observable<Cities>`.

```java
import android.widget.EditText;
import com.jakewharton.rxbinding.widget.RxTextView;
import com.jakewharton.rxbinding.widget.TextViewAfterTextChangeEvent;


EditText latText = //...
EditText lonText = //...

Observable<Double> latChanges = RxTextView
    .afterTextChangeEvents(latText)
    .flatMap(toDouble());
Observable<Double> lonChanges = RxTextView
    .afterTextChangeEvents(lonText)
    .flatMap(toDouble());

Observable<Cities> cities = Observable
    .combineLatest(latChanges, lonChanges, toPair())
    .debounce(1, TimeUnit.SECONDS)
    .flatMap(listCitiesNear());
```

And all transformations (note how verbose the code is when lambda expressions are not an option):

```java
Func1<TextViewAfterTextChangeEvent, Observable<Double>> toDouble() {
    return new Func1<TextViewAfterTextChangeEvent, Observable<Double>>() {
        @Override
        public Observable<Double> call(TextViewAfterTextChangeEvent e) {
            String s = e.editable().toString();
            try {
                return Observable.just(Double.parseDouble(s));
            } catch (NumberFormatException e) {
                return Observable.empty();
            }
        }
    };
}

//return Pair::new
Func2<Double, Double, Pair<Double, Double>> toPair() {
    return new Func2<Double, Double, Pair<Double, Double>>() {
        @Override
        public Pair<Double, Double> call(Double lat, Double lon) {
            return new Pair<>(lat, lon);
        }
    };
}

//return latLon -> meetup.listCities(latLon.first, latLon.second)
Func1<Pair<Double, Double>, Observable<Cities>> listCitiesNear() {
    return new Func1<Pair<Double, Double>, Observable<Cities>>() {
        @Override
        public Observable<Cities> call(Pair<Double, Double> latLon) {
            return meetup.listCities(latLon.first, latLon.second);
        }
    };
}
```

`RxTextView.afterTextChangeEvents()` transforms the imperative callbacks invoked by `EditText` whenever the content changes. Having two streams of doubles, we combine them using `combineLatest()` so that we receive a stream of pairs every time either of the inputs change.

Just make sure that you unsubscribe from `afterTextChangeEvents()`; failing to do so can lead to memory leak.

## Avoiding Memory Leaks in Activities



## (RxAndrod](https://github.com/ReactiveX/RxAndroid)

- [kaushikgopal/RxJava-Android-Samples: Learning RxJava for Android by example](https://github.com/kaushikgopal/RxJava-Android-Samples)

## Library

- [reark/reark](https://github.com/reark/reark) RxJava architecture library for Android.

## Tutorial

- [RxJava 与 Retrofit 结合的最佳实践](http://gank.io/post/56e80c2c677659311bed9841)