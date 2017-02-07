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

If your `Observer` holds a reference to such an `Activity`, it might never be garbage-collected, leading to memory leak and device killing your application in its entirety. Take the following innocent code:

```java
public class MainActivity extends AppCompatActivity {

    private final byte[] blob = new byte[32 * 1024 * 1024];

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        TextView text = (TextView) findViewById(R.id.textView);
        Observable
                .interval(100, TimeUnit.MILLISECONDS)
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(x -> {
                    text.setText(Long.toString(x));
                });
    }

}
```

The `blob` field is there just to speed up the memory-leak effects; imagine `MainActivity` being quite a complex tree of objects, instead.

If you rotate your device a couple of times it crashes with `OutOfMemoryError` for some reason. Here is what happens:

1.  `MainActivity` is created, and during `onCreate()` we subscribe to `interval()`.
2.  Every 100 milliseconds, we update `text` with the current counter value. Ignore `mainThread()` `Scheduler` for a second, it will be explained in [“Schedulers in Android”](http://192.168.31.250:8000/ch08.html#Schedulers-in-Android).
3.  The device changes orientation.
4.  `MainActivity` is destroyed, a new one is created, and `onCreate()` is executed again.
5.  We currently have two `Observable.interval()` running because we never unsubscribed from the first one.

The `interval()` operator uses a background thread (via `computation()` `Scheduler`) to emit counter events. These events are subsequently propagated to `Observer`, one of them holding a reference to `TextView` which in turn holds a reference to old `MainActivity`.

Even though the first instance of `MainActivity` was destroyed, it cannot be garbage-collected and the memory of our `blob` cannot be reclaimed. Every change of orientation (or whenever Android decides to destroy a particular `Activity`) increases memory leak. The solution is simple: let `interval()` know when it is no longer needed by unsubscribing from it. Just like `onCreate()`, Android has a callback on destruction called `onDestroy()`:

```java
private Subscription subscription;

@Override
protected void onCreate(Bundle savedInstanceState) {
    //...
    subscription = Observable
        .interval(100, TimeUnit.MILLISECONDS)
        .observeOn(AndroidSchedulers.mainThread())
        .subscribe(x -> {
            text.setText(Long.toString(x));
        });
}

@Override
protected void onDestroy() {
    super.onDestroy();
    subscription.unsubscribe();
}
```

When an `Observable` is created as part of `Activity`’s lifecycle, make sure to unsusbcribe from it when the `Activity` is destroyed. Calling `unsusbcribe()` will detach `Observer` from `Observable` so that it is eligible for garbage collection. Together with `Observer`, the entire `MainActivity` can be collected, as well. Also the `interval()` itself will stop emitting events because no one is listening to them. Double win.

When you create multiple `Observable`s together with some `Activity`, holding a reference to all `Subscription`s can become tedious.
A `CompositeSubscription` is a handy container in such cases.
Each `Subscription` can simply be inserted into `CompositeSubscription` and on destruction we can unsubscribe all of them in one easy step:

```java
private CompositeSubscription allSubscriptions = new CompositeSubscription();

@Override
protected void onCreate(Bundle savedInstanceState) {
    //...
    Subscription subscription = Observable
        .interval(100, TimeUnit.MILLISECONDS)
        .observeOn(AndroidSchedulers.mainThread())
        .subscribe(x -> {
            text.setText(Long.toString(x));
        });
    allSubscriptions.add(subscription);
}

@Override
protected void onDestroy() {
    super.onDestroy();
    allSubscriptions.unsubscribe();
}
```

## (RxAndrod](https://github.com/ReactiveX/RxAndroid)

- [kaushikgopal/RxJava-Android-Samples: Learning RxJava for Android by example](https://github.com/kaushikgopal/RxJava-Android-Samples)

## Library

- [reark/reark](https://github.com/reark/reark) RxJava architecture library for Android.

## Tutorial

- [RxJava 与 Retrofit 结合的最佳实践](http://gank.io/post/56e80c2c677659311bed9841)