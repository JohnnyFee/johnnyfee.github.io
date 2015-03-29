layout: post
title: "Console object you didn’t know"
description: ""
category: JavaScript
tags: [javascript]
---

The spiritual successor to underscore.js, lodash maintains backwards compatibility with underscore code (if you use the compatible version), and takes bold steps forward to help you manipulate those objects and arrays quickly and easily.

There are many more methods to lodash then I've covered here, these are the ones I find myself using the most.

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

[![Lodash naïve approach](http://johnnyimages.qiniudn.com/lodash-naive.gif)](http://filimanjaro.com/blog/wp-content/uploads/2014/11/lodash-naive.gif)

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

## Array

**first**

Pop, shift, slice? How about just give me the `_.first` x numbers of elements.

```javascript
var array = [ 1, 2, 3, 4 ,5 ];
_.first(array, 3);
// returns [1,2,3]
```

**rest**

Push, unshift or splice? Wha

Push, unshift or splice? What about when you just want the last few items of an array?

```
var array = [ 1, 2, 3, 4 ,5 ];
    _.rest(array, 3);
    // returns [1,2,3]
```

**compact**

Sometimes you end up with a bunch of empty fields in an array. `_.compact` removes everything which evaluates to `false`, `null`, `0`, `undefined` or `NaN`. Useful for keeping data tidy.

```
var array = [ 0, 1, 0, 2, false, true ];
_.compact(array);
// returns [ 1,2, true]
```

**flatten**

Nested arrays are often part of working with JavaScript, use `_.flatten` to get rid of the un-needed structure.

```
var array = [[ 1,2 ], [3,4]];
_.flatten(array);
// returns [1,2,3,4]
```

**each**

Good old forEach, except it works in all browsers and is a little trimmer.

```
var array = [1,2,3];
_.each(array, function(v,i){
  array[i] = v*2;
});
// does not return anything, just sets array to [ 2, 4, 6 ];
```

It's important to notice that lodash uses the following formats on anonymous functions:

Dealing with arrays


```
function(value, i)
```

Dealing with objects

```
function(value, key)
```

This may be second nature to anyone used to `for-in` loops, but it could be a stumbling block for anyone used to the key, value notation.

Collections are arrays of objects, and while the above functions work perfectly well on them, there are other ways we can traverse and manipulate them. 

## Collections - [{},{},{}]

**map**

`Map` is useful when you need to transform values of an array or object. Unlike each, this generates a new array. 

```
function toDogYears(dog){
  return dog.age*7;
};
var dogs = [{ name: "arf", age: 3}, {name:'bark', age: 5}]

_.map(dogs, toDogYears);
//returns [21,35]
```

**reduce**

`_.reduce` turns an array or collection into a single value, using an accumulator as a starting point and passing it into a function for each iteration.

```
// array reduction
var array = [ 1,2,3 ];
_.reduce(array, function(total, number){
  return total + number;
}, 0);

// object reduction
var workers = [{ name: 'john', years: 5 }, {name: 'susan', years: 3}, {name: 'lucy', years: 2 }];

_.reduce(workers, function(combined, worker){
  return combined.years += worker.years
},{});
// returns { years: 10 };
```

**filter**

For the next three functions, assume this dataset:

```
var cats = [{ name: 'fuzzy', color: 'orange', age: 12 },
{ name: 'tiny', color: 'red', age: 7 },
{ name: 'grumpy', color: 'white', age: 5 } ]
```

`_.filter` returns an array of objects which all pass a truth test.


```
_.filter(cats, function getYoungerCats(cat){
return (cat.age < 10);
});
// returns [ { name: 'tiny', color: 'red', age: 7 }, { name: 'grumpy', color: 'white', age: 5 } ]
```

**pluck**

Pluck is similar to reduce, except you get an ordered list of properties as an array, instead of an accumulated value. Useful when you need to build isolated datasets out of large collections.

```
_.pluck(cats, 'name');
// return [ 'fuzzy', 'tiny', 'grumpy']
```

**where**

Where is a shorthand for what you might otherwise accomplish with `_.filter`.


```
_.where(cats, { color: 'red'});
// returns [{ name: 'fuzzy', color: 'orange', age: 12 }]
```

## Objects - {}

**clone**

One of the gotchas in JavaScript-land is using an object as a property of another object, and we change that property, thinking that we are affecting a copy of the object. Not true. Only a pointer to the original object is stored.

```
var obj = { 'a' : true, 'b': true };
var smartContainer = { foo: _.clone(obj) }
smartContainer.foo.a = false;
// obj.a == true
// original object was not changed

var container = { foo: obj };
container.foo.a = false;
// obj.a == false
// original object changed, even though it's inside another object
```

**extend**

`_.extend` divides your development experience into before you used extend and after you used extend. Simply, it merges objects. Properties of subsequent objects will override earlier.

```
_.extend({ type: 'ball', color: 'blue' }, { name: 'bob', color: 'red' });
// { type: 'ball', color: 'red', name: 'bob' }
```

**has**

Useful as a safe alternative to `if (obj.prop)` conditional testing.

```
if ( _.has(obj, 'prop')) { }
```

**isEmpty / isPlainObject / isUndefined / isEqual / isNull**

These simple conditional tests are extremely useful, abstract away all sorts of edge cases, and are easy to use.

**transform**

`_.transform` is similar to reduce, in that it runs a function for each element of an array or object. Transform does not need an explicit starting point for the accumulator however.

```
var coords = { lat: 35.34534534534, long: 40.3552523434 };
_.transform( coords, function roundCoords(result, val, key){
return result["short"+key] = Math.round(val);
});
// returns { shortlat: 35, shortlong: 40 }
```

**pick**

`_.pick` can be handy when you need to turn a large object into a specific smaller one.

```
var userModel = { attributes: [ 'username' , 'email'] };
var customerData = { username: 'foo', email: "a@a.com", address:"123 Fine St", phone:"1234561231" }}

_.pick(customerData, _.(userModel);
// returns { username: 'foo', email: "a@a.com" }
```

## Chains - _.()

Chains allow you to put together all your lodash knowledge in a very powerful sequence of code. 

Chains can be started with `_.chain(value)` or the shorthand `_(value)`.

The value is then substituted for the input value for each chainable function that supports it. You can see a list of what methods are and aren't supported [here](https://lodash.com/docs#_), as well as the native Array methods supported by lodash. 

If you want your chain to return a value, not just manipulate provided arrays, you have to use `.value()` at the end of your chain. 

```
var array = [1,2,3,4];
_(array)
    .map( function(val){ return val*val; } )
    .filter( function(val){ return ( val % 2 === 0) } )
    .reverse()
    .value();
// returns [16,4]
```

Chains keep code concise and readable for easy maintenance. If, for debugging, or for detailed manipulation, you need to access an array in the middle of chaining, you can use the `_.tap` method.

```
var array = [1,2,3,4];
_(array)
    .tap(function(arr){ arr.splice(2,1,'three'); })
    .filter( function(val){ return ( val % 2 !== 0 )} )
    .value();
// returns [1, 'three']
```

## Wrap up

Lazy evaluation is not the new idea in the industry. It has&nbsp;already been there with excellent libraries like [LINQ](http://en.wikipedia.org/wiki/Language_Integrated_Query "LINQ"), [Lazy.js](http://danieltao.com/lazy.js/ "Lazy.js") and many others. The main difference Lo-Dash makes, I believe, is that you still have good ol` Underscore API with a new powerful engine inside.&nbsp;No new library to learn, no significant code changes to make, just&nbsp;a pending upgrade.

But even if you’re not going to use Lo-Dash, I hope this article inspired you. Now,&nbsp;when you find&nbsp;a bottleneck in your application, stop trying to optimize&nbsp;it in jsperf.com try/fail style. Instead go,&nbsp;grab a coffee and start thinking about algorithms. Creativity is important here, but a good math background won’t hurt&nbsp;too&nbsp;([book](http://mitpress.mit.edu/books/introduction-algorithms "Introduction to Algorithms - book")). Good luck!

_TBC… I’d like to write another – more advanced – post explaining how the Lazy algorithm is implemented in detail. If you like the idea, vote on it by following me on [Twitter](http://twitter.com/filip_zawada "My Twitter")._

## Reference

- [How to Speed Up Lo-Dash ×100? Introducing Lazy Evaluation.](http://filimanjaro.com/blog/2014/introducing-lazy-evaluation)
- [Utilities for Everyday Node.js Development](https://www.airpair.com/node.js/posts/utilities-for-everyday-node-development)
