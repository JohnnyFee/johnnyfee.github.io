---
layout: post
title: "RxJava Custom Operator"
description: ""
category: [RxJava]
tags: [rx, rxjava]
---

See [Implementing Your Own Operators · ReactiveX/RxJava Wiki](https://github.com/ReactiveX/RxJava/wiki/Implementing-Your-Own-Operators)

## Transformational Operators

The following example shows how you can use the `compose( )` operator to chain your custom operator (in this example, an operator called `myTransformer` that transforms an Observable that emits Integers into one that emits Strings) alongside standard RxJava operators like `ofType` and `map`:

```java
fooObservable = barObservable.ofType(Integer)
    .map({it*2})
    .compose(new myTransformer<Integer,String>())
    .map({"transformed by myOperator: " + it});
```

Define your transforming function as a public class that implements the [`Transformer`](http://reactivex.io/RxJava/javadoc/rx/Observable.Transformer.html) interface, like so:

```java
public class myTransformer<Integer,String> implements Transformer<Integer,String> {
  public myTransformer( /* any necessary params here */ ) {
    /* any necessary initialization here */
  }

  @Override
  public Observable<String> call(Observable<Integer> source) {
    /* 
     * this simple example Transformer applies map() to the source Observable
     * in order to transform the "source" observable from one that emits
     * integers to one that emits string representations of those integers.
     */
    return source.map( new Func1<Integer,String>() {
      @Override
      public String call(Integer t1) {
        return String.valueOf(t1);
      }
    } );
  }
}
```

Another example:

```java
private <T> Observable.Transformer<T, T> odd() {
    Observable<Boolean> trueFalse = just(true, false).repeat();
    return upstream -> upstream
            .zipWith(trueFalse, Pair::of)
            .filter(Pair::getRight)
            .map(Pair::getLeft);
}

//...

//[A, B, C, D, E...]
Observable<Character> alphabet =
        Observable
                .range(0, 'Z' - 'A' + 1)
                .map(c -> (char) ('A' + c));

//[A, C, E, G, I...]
alphabet
        .compose(odd())
        .forEach(System.out::println);
```

The `odd()` function returns a `Transformer<T, T>` from `Observable<T>` to `Observable<T>` (of course, types can be different). Thus, `Transformer` is a function on its own, so we can replace it with a lambda expression (`upstream -> upstream...`).

Notice that the `odd()` function is executed eagerly when `Observable` is assembled, not during subscription.

## Implementing Advanced Operators Using lift()

`compose()` is only useful for grouping existing operators together.
With `lift()`, on the other hand, you can implement almost any operator, altering the flow of upstream events. 

Whereas `compose()` transforms `Observable`s, `lift()` allows transforming `Subscriber`s.

Almost all operators, excluding those working with multiple streams at once (like `flatMap()`) are implemented by means of `lift()`.

```java
Observable
    .range(1, 1000)
    .filter(x -> x % 3 == 0)
    .distinct()
    .reduce((a, x) -> a + x)
    .map(Integer::toHexString)
    .subscribe(System.out::println)
```

This quite complex sequence of operators becomes very regular (notice how `reduce()` is implemented using `scan().takeLast(1).single()`:

```
Observable
    .range(1, 1000)
    .lift(new OperatorFilter<>(x -> x % 3 == 0))
    .lift(    OperatorDistinct.<Integer>instance())
    .lift(new OperatorScan<>((Integer a, Integer x) -> a + x))
    .lift(    OperatorTakeLastOne.<Integer>instance())
    .lift(    OperatorSingle.<Integer>instance())
    .lift(new OperatorMap<>(Integer::toHexString))
    .subscribe(System.out::println);
```

### Looking under the hood of the map() operator

```java
public final class OperatorMap<T, R> implements Operator<R, T> {

    private final Func1<T, R> transformer;

    public OperatorMap(Func1<T, R> transformer) {
        this.transformer = transformer;
    }

    @Override
    public Subscriber<T> call(final Subscriber<R> child) {
        return new Subscriber<T>(child) {

            @Override
            public void onCompleted() {
                child.onCompleted();
            }

            @Override
            public void onError(Throwable e) {
                child.onError(e);
            }

            @Override
            public void onNext(T t) {
                try {
                    child.onNext(transformer.call(t));
                } catch (Exception e) {
                    onError(e);
                }
            }
        };
    }
}
```

This is essentially what `OperatorMap`  class is doing: providing a transformation from downstream (`child`) `Subscriber<R>` into upstream `Subscriber<T>`. Here is the real implementation found in RxJava, with some minor readability simplifications:

```java
public final class OperatorMap<T, R> implements Operator<R, T> {

    private final Func1<T, R> transformer;

    public OperatorMap(Func1<T, R> transformer) {
        this.transformer = transformer;
    }

    @Override
    public Subscriber<T> call(final Subscriber<R> child) {
        return new Subscriber<T>(child) {

            @Override
            public void onCompleted() {
                child.onCompleted();
            }

            @Override
            public void onError(Throwable e) {
                child.onError(e);
            }

            @Override
            public void onNext(T t) {
                try {
                    child.onNext(transformer.call(t));
                } catch (Exception e) {
                    onError(e);
                }
            }
        };
    }
}
```

One unusual detail is the reversed order of `T` and `R` generic types. The `map()` operator transforms values flowing from upstream of type `T` to type `R`. However, the operator’s responsibility is transforming `Subscriber<R>` (coming from downstream subscription) to `Subscriber<T>` (passed to upstream `Observable`). We expect subscribe via `Subscriber<R>`, whereas operator `map()` is used against `Observable<T>`, requiring `Subscriber<T>`.

Every time you `map()` over a stream, you actually call `lift()` with a new instance of `OperatorMap` class, providing the `transformer` function. This function operates on upstream events of type `T` and returns downstream events of type `R`.

Every time a user provides any custom function/transformation to your operator, make sure you catch all unexpected exceptions and forward them downstream via the `onError()` method. This also ensures that you unsubscribe from upstream, preventing it from emitting further events.

Keep in mind that until someone actually subscribes, we barely created a new `Observable` (`lift()`, like any other operator, creates new `Observable`) with a reference to `OperatorMap` instance underneath, which in turns holds a reference to our function. But only when someone actually subscribes, the `call()` function of `OperatorMap` is invoked. This function receives our `Subscriber<String>` (e.g., wrapping `System.out::println`) and returns another `Subscriber<Integer>`. It is the latter `Subscriber` that travels upstream, to preceding operators.

That is pretty much how all operators work, both built-in and custom. You receive a `Subscriber` and return another one, enhancing and passing whatever it wishes to downstream `Subscriber`.

### Our first operator

This time we would like to implement an operator that will emit `toString()` of every odd (1st, 3rd, 5th, etc.) element. It is best explained with some sample code:

```
Observable<String> odd = Observable
        .range(1, 9)
        .lift(toStringOfOdd()) 
// Will emit: "1", "3", "5", "7" and "9" strings
```

You can achieve the same functionality by using built-in operators, we are writing a custom operator just for educational purposes:

```
Observable
        .range(1, 9)
        .buffer(1, 2)
        .concatMapIterable(x -> x)
        .map(Object::toString);
```

`buffer(1, 2)` will transform any `Observable<T>` into `Observable<List<T>>`, where each inner `List` has exactly one odd element and skips even ones. We reconstruct a flat stream using `concatMapIterable()`.

The custom operator can be in one of two states:

* It either received odd event (1st, 3rd, 5th, etc.) from upstream which it forwards downstream after applying it to `toString()`.
* It received even event which it simply discards.

```java
<T> Observable.Operator<String, T> toStringOfOdd() {
    return new Observable.Operator<String, T>() {

        private boolean odd = true;

        @Override
        public Subscriber<? super T> call(Subscriber<? super String> child) {
            return new Subscriber<T>(child) {
                @Override
                public void onCompleted() {
                    child.onCompleted();
                }

                @Override
                public void onError(Throwable e) {
                    child.onError(e);
                }

                @Override
                public void onNext(T t) {
                    if(odd) {
                        child.onNext(t.toString());
                    } else {
                        request(1);
                    }
                    odd = !odd;
                }
            };
        }
    };
}
```

When a `Subscriber` requests just a subset of events—for example, only the first two (`take(2)`)—RxJava takes care of requesting only that amount of data by calling `request(2)` internally. This request is passed upstream and we receive barely `1` and `2`. However, we drop `2` (even), yet we were obligated to provide two events downstream. Therefore, we must request one extra event (`request(1)`) in addition to that so that we receive `3`, as well. RxJava implements quite a sophisticated mechanism called _backpressure_  that allows subscribers to request only the amount of events they can process, protecting from producers outperforming consumers.

