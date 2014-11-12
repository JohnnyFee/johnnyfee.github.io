---
layout: post
title: "Console object you didn’t know"
description: ""
category: JavaScript
tags: [javascript]
--- 

I always thought libraries like Lo-Dash can’t really get any&nbsp;faster than they already are. Lo‑Dash almost perfectly mixes [various techniques](https://www.youtube.com/watch?v=NthmeLEhDDM "Unorthodox Performance") to squeeze out the most from JavaScript. It uses JavaScript fastest statements, adaptive algorithms, it even measures performance to avoid accidental regressions in subsequent releases.

<!-- more -->

## Lazy Evaluation

But it seems I was wrong – it is actually possible to make Lo-Dash significantly faster. All you need to do is stop thinking about micro-optimizations and start figuring&nbsp;out the right&nbsp;algorithm to use. For example,&nbsp;in a typical loop we usually&nbsp;tend to optimize a single‑iteration time:

```rainbow
var len = getLength();
for(var i = 0; i < len; i++) {
    operation(); // <- 10ms - how to make it 9ms?!
}
```

But it’s often hard and very limited. Instead, it&nbsp;makes&nbsp;a lot&nbsp;more sense in some cases to optimize&nbsp;`getLength()` function. The smaller the number it returns, the less `10ms`&nbsp;cycles we have.

This is roughly the idea behind&nbsp;the lazy evaluation in Lo-Dash. It’s about reducing the number of cycles, not reducing a cycle time. Let’s consider the following example:

```rainbow
function priceLt(x) {
   return function(item) { return item.price < x; };
}
var gems = [
   { name: 'Sunstone', price: 4 }, { name: 'Amethyst', price: 15 },
   { name: 'Prehnite', price: 20}, { name: 'Sugilite', price: 7  },
   { name: 'Diopside', price: 3 }, { name: 'Feldspar', price: 13 },
   { name: 'Dioptase', price: 2 }, { name: 'Sapphire', price: 20 }
];

var chosen = _(gems).filter(priceLt(10)).take(3).value();
```

We want to take&nbsp;only&nbsp;first 3 gems with price lower than $10. Regular Lo-Dash approach (strict evaluation) filters all 8 gems – then returns the first three&nbsp;that passed filtering:

[![Lodash naïve approach](http://filimanjaro.com/blog/wp-content/uploads/2014/11/lodash-naive.gif)](http://filimanjaro.com/blog/wp-content/uploads/2014/11/lodash-naive.gif)

It’s not cool though. It processes all 8 elements, while in fact we need to read only 5 of them. Lazy evaluation algorithm, on the contrary, processes the minimal number of elements in an array to get the correct result. Check it out in action:

[![Lo-Dash regular approach](http://filimanjaro.com/blog/wp-content/uploads/2014/11/grafika.gif)](http://filimanjaro.com/blog/wp-content/uploads/2014/11/grafika.gif)

We’ve easily gained 37.5% performance boost. But it’s not all we can achieve, actually it’s quite easy to find an example with ×1000+ perf boost. Let’s have a look:

```rainbow
var phoneNumbers = [5554445555, 1424445656, 5554443333, … ×99,999];

// get 100 phone numbers containing „55”
function contains55(str) {
    return str.contains("55"); 
};

var r = _(phoneNumbers).map(String).filter(contains55).take(100);
```

In such an example map and filter is ran on 99,999 elements, while it may be sufficient to run&nbsp;it only on e.g. 1,000&nbsp;elements. The performance gain is massive here ([benchmark](http://jsperf.com/lazy-demo "jsperf benchmark")):

[![benchmark](http://filimanjaro.com/blog/wp-content/uploads/2014/11/benchmark.jpg)](http://filimanjaro.com/blog/wp-content/uploads/2014/11/benchmark.jpg)

## Pipelining

Lazy evaluation brings another benefit, which I call a “pipelining”. The idea behind is to avoid&nbsp;creating intermediary arrays during the chain execution.&nbsp;Instead we should perform all operations&nbsp;on a single element in place. So, the following piece of code:

```rainbow
var result = _(source).map(func1).map(func2).map(func3).value();
```

would translate roughly to this in regular Lo-Dash (strict evaluation)

```rainbow
var result = [], temp1 = [], temp2 = [], temp3 = [];

for(var i = 0; i < source.length; i++) {
   temp1[i] = func1(source[i]);
}

for(i = 0; i < source.length; i++) {
   temp2[i] = func2(temp1[i]);
}

for(i = 0; i < source.length; i++) {
   temp3[i] = func3(temp2[i]);
}
result = temp3;
```

While with the lazy evaluation turned on it’d perform more like this:

```rainbow
var result = [];
for(var i = 0; i < source.length; i++) {
   result[i] = func3(func2(func1(source[i])));
}
```

Lack of temporary arrays may give us&nbsp;a significant performance gain, especially when source arrays are huge&nbsp;and memory&nbsp;access is expensive.

## Deferred execution

Another benefit that&nbsp;was brought together with the lazy evaluation is deferred execution. Whenever you create a chain, it’s not computed&nbsp;until `.value()` is called implicitly or explicitly. This approach helps to prepare a query first and execute&nbsp;it later with the most recent data.

```rainbow
var wallet = _(assets).filter(ownedBy('me'))
                      .pluck('value')
                      .reduce(sum);

$json.get("/new/assets").success(function(data) {
    assets.push.apply(assets, data); // update assets
    wallet.value(); // returns most up-to-date value
});
```

It may also speed up execution time in some cases. We can create a complex query early and then, when time is critical, execute it.

## Wrap up

Lazy evaluation is not the new idea in the industry. It has&nbsp;already been there with excellent libraries like [LINQ](http://en.wikipedia.org/wiki/Language_Integrated_Query "LINQ"), [Lazy.js](http://danieltao.com/lazy.js/ "Lazy.js") and many others. The main difference Lo-Dash makes, I believe, is that you still have good ol` Underscore API with a new powerful engine inside.&nbsp;No new library to learn, no significant code changes to make, just&nbsp;a pending upgrade.

But even if you’re not going to use Lo-Dash, I hope this article inspired you. Now,&nbsp;when you find&nbsp;a bottleneck in your application, stop trying to optimize&nbsp;it in jsperf.com try/fail style. Instead go,&nbsp;grab a coffee and start thinking about algorithms. Creativity is important here, but a good math background won’t hurt&nbsp;too&nbsp;([book](http://mitpress.mit.edu/books/introduction-algorithms "Introduction to Algorithms - book")). Good luck!

_TBC… I’d like to write another – more advanced – post explaining how the Lazy algorithm is implemented in detail. If you like the idea, vote on it by following me on [Twitter](http://twitter.com/filip_zawada "My Twitter")._

## Reference

- [How to Speed Up Lo-Dash ×100? Introducing Lazy Evaluation.](http://filimanjaro.com/blog/2014/introducing-lazy-evaluation)