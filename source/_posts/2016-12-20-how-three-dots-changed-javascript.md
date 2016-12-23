---
layout: "post"
title: "How three dots changed JavaScript"
date: "2016-12-20 23:25"
categories: JavaScript
---

From [How three dots changed JavaScript: spread operator and rest parameter](https://rainsoft.io/how-three-dots-changed-javascript/)

_Off topic_
I recently released my first open source JavaScript library: [https://vocajs.com](https://vocajs.com/). Feel free to check it out, install, use, and [star](https://github.com/panzerdp/voca) if you like it.
Shortly, Voca library offers helpful functions to make string manipulations comfortable: _change case, trim, pad, slugify, latinise, sprintf'y, truncate, escape_ and [much more](https://vocajs.com/).
_Off topic end_

When accessing arguments values in a function call, I always felt uncomfortable with `arguments` object. Its hardcoded name makes difficult to access `arguments` of an outer function in an inner one (which defines its own `arguments`).
Even worse JavaScript provides it as an array-like object. It is not possible to use array methods like `.map()` or `.forEach()` directly on it.

To access `arguments` from the enclosing function, you have to use workarounds by storing it into a separated variable. And to walk through this array-like object, you have to use _duck typing_ and make indirect invocations. See the following example:

```
function outerFunction() {
   // store arguments into a separated variable
   var argsOuter = arguments;
   function innerFunction() {
      // args is an array-like object
      var even = Array.prototype.map.call(argsOuter, function(item) {
         // do something with argsOuter
      });
   }
}
```

Another situation is the function invocation that accepts a dynamic number of arguments. Filling the arguments from an array is unpleasant.

For instance `.push(item1, ..., itemN)` inserts elements into an array one by one: you have to enumerate each element as an argument. This is not always convenient: often an entire array of elements needs to be pushed into an existing array, without creating a new instance.
In ES5 it's solved with `.apply()`: an unfriendly and verbose approach. Let's  take a look:

[Try in JS Bin](http://jsbin.com/qokari/1/edit?js,console)

```
var fruits = ['banana'];
var moreFruits = ['apple', 'orange'];
Array.prototype.push.apply(fruits, moreFruits);
console.log(fruits); // => ['banana', 'apple', 'orange']
```

Fortunately the JavaScript world is changing. The three dots operator `...` fixes many of these situations. The operator is introduced by ECMAScript 6 and in my opinion is a noticeable improvement.
This article walks through `...` operator use cases and shows how to solve similar problems.

### 1. Three dots

**The rest operator** is used to get the arguments list passed to function on invocation and in array destructure. A case when _the operator gathers the rest remained after the operation_.

[Try in JS Bin](http://jsbin.com/gujukih/2/edit?js,console)

```
function countArguments(...args) {
   return args.length;
}
// get the number of arguments
countArguments('welcome', 'to', 'Earth'); // => 3
// destructure an array
let otherSeasons, autumn;
[autumn, ...otherSeasons] = cold;
otherSeasons      // => ['winter']
```

**The spread operator** is used for array construction and destructuring, and to fill function arguments from an array on invocation. A case when _the operator spreads the array (or iterable object) elements_.

[Try in JS Bin](http://jsbin.com/becugu/2/edit?js,console)

```
let cold = ['autumn', 'winter'];
let warm = ['spring', 'summer'];
// construct an array
[...cold, ...warm] // => ['autumn', 'winter', 'spring', 'summer']
// function arguments from an array
cold.push(...warm);
cold              // => ['autumn', 'winter', 'spring', 'summer']
```

### 2. Improved parameters access

#### 2.1  Rest parameter

As presented in the introduction, dealing with `arguments` object in a function body becomes troublesome in complex scenarios.

For example a JavaScript inner function `filterNumbers()` wants to access `arguments` from its outer function `sumOnlyNumbers()`:

[Try in JS Bin](http://jsbin.com/kumudo/2/edit?js,console)

```
function sumOnlyNumbers() {
  var args = arguments;
  var numbers = filterNumbers();
  return numbers.reduce((sum, element) => sum + element);
  function filterNumbers() {
     return Array.prototype.filter.call(args,
       element => typeof element === 'number'
     );
  }
}
sumOnlyNumbers(1, 'Hello', 5, false); // => 6
```

In order to access `arguments` of `sumOnlyNumbers()` inside `filterNumbers()` you have to create a temporary variable `args`. It happens because `filterNumbers()` defines its own `arguments` object that overwrites the external one.
The approach works, but it's too verbose. `var args = arguments` can be omitted and `Array.prototype.filter.call(args)` can be transformed to `args.filter()` using a rest parameter. Let's optimize this part.

The rest operator solves this elegantly. It allows to define a **rest parameter** `...args` in a function declaration:

[Try in JS Bin](http://jsbin.com/wiroya/2/edit?js,console)

```
function sumOnlyNumbers(...args) {
  var numbers = filterNumbers();
  return numbers.reduce((sum, element) => sum + element);
  function filterNumbers() {
     return args.filter(element => typeof element === 'number');
  }
}
sumOnlyNumbers(1, 'Hello', 5, false); // => 6
```

The function declaration `function sumOnlyNumbers(...args)` indicates that `args` receives the invocation arguments in an array. Because the names conflict is solved, `args` can be used inside `filterNumbers()`.
Also forget about array-like objects: **`args` is an array**, which is a nice bonus. As result `filterNumbers()` can get rid of `Array.prototype.filter.call()` and make a filter method call directly  `args.filter()`.

Notice that rest parameter should be last one in the function parameters list.

#### 2.2 Selective rest parameter

If not all values should be included in the rest parameter, you could define those  as comma separated parameters at the beginning. Explicitly defined parameters are not included in the rest parameter.
Let's see an example:

[Try in JS Bin](http://jsbin.com/yapiluh/2/edit?js,console)

```
function filter(type, ...items) {
  return items.filter(item => typeof item === type);
}
filter('boolean', true, 0, false);        // => [true, false]
filter('number', false, 4, 'Welcome', 7); // => [4, 7]
```

`arguments` object doesn't have this selective property and always includes all the values.

#### 2.3 Arrow function case

[An arrow function](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) does not define `arguments` object in its body, but accesses the one from the enclosing scope.
If you want to get all the arguments, use a rest parameter.
Let's try this in an example:

[Try in JS Bin](http://jsbin.com/jesecom/2/edit?js,console)

```
(function() {
  let outerArguments = arguments;
  const concat = (...items) => {
    console.log(arguments === outerArguments); // => true
    return items.reduce((result, item) => result + item, '');
  };
  concat(1, 5, 'nine'); // => '15nine'
})();
```

`items` rest parameter contains all function call arguments in an array. Also `arguments` object is taken from the enclosing scope and equals to `outerArguments` variable, so it has no valuable meaning.

### 3. Improved function call

In the article introduction, the second problem asks a better way to fill the invocation arguments from an array.
ES5 provides [`.apply()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) method on the function object to solve this. Unfortunately  this technique has 3 problems:

* It's necessary to indicate manually the context of the function invocation
* Is not possible to use in a constructor invocation
* A shorter solution is more preferable

Let's see an example of `.apply()` usage:

[Try in JS Bin](http://jsbin.com/lokage/4/edit?js,console)

```
let countries = ['Moldova', 'Ukraine'];
let otherCountries = ['USA', 'Japan'];
countries.push.apply(countries, otherCountries);
console.log(countries); // => ['Moldova', 'Ukraine', 'USA', 'Japan']
```

As mentioned, it seems irrelevant to indicate in `.apply()` second time the context `countries`. The property accessor `countries.push` is enough to determine the method invocation on an object.
And the entire invocation looks verbose.

**The spread operator**  fills the function invocation arguments with values from an array (or more strictly from an iterable object, see [5.](https://rainsoft.io/how-three-dots-changed-javascript/#5spreadoperatoranditerationprotocols)).
Let's improve the above sample with a spread operator:

[Try in JS Bin](http://jsbin.com/xakavuv/3/edit?js,console)

```
let countries = ['Moldova', 'Ukraine'];
let otherCountries = ['USA', 'Japan'];
countries.push(...otherCountries);
console.log(countries); // => ['Moldova', 'Ukraine', 'USA', 'Japan']
```

As seen, spread operator is cleaner and straightforward solution. The only additional characters are 3 dots (`...`).

Spread operator configures the constructor invocation arguments from an array, which is [not possible directly](http://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible) when using `.apply()`. Let's see an example:

[Try in JS Bin](http://jsbin.com/zihunih/2/edit?js,console)

```
class King {
   constructor(name, country) {
     this.name = name;
     this.country = country;
   }
   getDescription() {
     return `${this.name} leads ${this.country}`;
   }
}
var details = ['Alexander the Great', 'Greece'];
var Alexander = new King(...details);
Alexander.getDescription(); // => 'Alexander the Great leads Greece'
```

Moreover you can combine multiple spread operators and regular arguments in the same invocation. The following example is removing from an array existing elements, then adds other array and an element:

[Try in JS Bin](http://jsbin.com/cihopo/2/edit?js,console)

```
var numbers = [1, 2];
var evenNumbers = [4, 8];
const zero = 0;
numbers.splice(0, 2, ...evenNumbers, zero);
console.log(numbers); // => [4, 8, 0]
```

### 4. Improved array manipulation

#### 4.1 Array construction

The array literal `[item1, item2, .., itemN]` does not provide functionality other than enumerating the initial array elements.

The spread operator improves array literals by allowing to insert on the fly another arrays (or any other [iterables](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols#Iterable_examples)) into the initialized instance.
This improvement makes easier to accomplish common tasks described below.

**Create** an array with initial elements **from another array**:

[Try in JS Bin](http://jsbin.com/decuyad/2/edit?js,console)

```
var initial = [0, 1];
var numbers1 = [...initial, 5, 7];
console.log(numbers1); // => [0, 1, 5, 7]
let numbers2 = [4, 8, ...initial];
console.log(numbers2); // => [4, 8, 0, 1]
```

`number1` and `number2` arrays are created using an array literal and in the meantime initialized with items from `initial`.

**Concatenate** 2 or more arrays:

[Try in JS Bin](http://jsbin.com/kiqame/2/edit?js,console)

```
var odds = [1, 5, 7];
var evens = [4, 6, 8];
var all = [...odds, ...evens];
console.log(all); // => [1, 5, 7, 4, 6, 8]
```

`all` array is created from concatentation of `odds` and `evens` arrays.

**Clone** an array instance:

[Try in JS Bin](http://jsbin.com/jifazev/2/edit?js,console)

```
var words = ['Hi', 'Hello', 'Good day'];
var otherWords = [...words];
console.log(otherWords);           // => ['Hi', 'Hello', 'Good day']
console.log(otherWords === words); // => false
```

`otherWords` is a clone version of `words` array. Notice that cloning happens only on array itself, but not on the contained elements (i.e. it's not a deep clone).

#### 4.2 Array destructure

[Destructuring assignments](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), available in ECMAScript 6, are powerful expressions to extract data from arrays and objects.

As a part of the destructuring, the rest operator extracts parts of an array. The extraction result is always an array.

In term of syntax, the rest operator should be the last one in a destructuring assignment: `[extractItem1, ...extractedArray] = destructuredArray`.

Let's see some applications:

[Try in JS Bin](http://jsbin.com/voyesel/2/edit?js,console)

```
var seasons = ['winter', 'spring', 'summer', 'autumn'];
var coldSeason, otherSeasons;
[coldSeason, ...otherSeasons] = seasons;
console.log(coldSeason);   // => 'winter'
console.log(otherSeasons); // => ['spring', 'summer', 'autumn']
```

`[coldSeason, ...otherSeasons]` extracts the first item `'winter'` into `coldSeason` variable and the rest of elements into `otherSeasons` array.

### 5. Spread operator and iteration protocols

The spread operator is using the [iteration protocols](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols) to navigate over elements and collect the results. This makes the spread operator even more valuable, because any object can define how the operator will extract data.

An object is iterable when it conforms to [iterable protocol](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols#iterable).
Iterable protocol requires the object to contain a special property. The property name should be [`Symbol.iterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator) and value as a function that returns an iterator object.
The iterator object should conform to [iterator protocol](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols#iterator). It needs to provide a property `next`, which value is a function that returns an object with properties `done` (a boolean to indicate the end of iteration) and `value` (the iteration result).
It seems though to understand the iteration protocols from verbal description, but the code behind those is quite simple.

The object or primitive **must** be iterable in order that spread operator to extract data from it.

Many native primitive types and objects are iterable: strings, arrays, [typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray), [sets](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Set) and [maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map). So they work by default with the spread operator.
For instance, let's see how a string conforms to iteration protocols:

[Try in JS Bin](http://jsbin.com/pifiya/2/edit?js,console)

```
var str = 'hi';
var iterator = str[Symbol.iterator]();
iterator.toString(); // => '[object String Iterator]'
iterator.next();     // => { value: 'h', done: false }
iterator.next();     // => { value: 'i', done: false }
iterator.next();     // => { value: undefined, done: true }
[...str];            // => ['h', 'i']
```

I like the spread operator for its ability to use object's custom iteration implementation. You can control how spread operator consumes  your object - an effective coding technique.

The following sample makes an array-like object conformed to iteration protocols, then transforms it to an array using spread operator:

[Try in JS Bin](http://jsbin.com/vebulu/2/edit?js,console)

```
function iterator() {
  var index = 0;
  return {
    next: () => ({ // Conform to Iterator protocol
      done : index >= this.length,
      value: this[index++]
    })
  };
}
var arrayLike = {
  0: 'Cat',
  1: 'Bird',
  length: 2
};
arrayLike[Symbol.iterator] = iterator; //Conform to Iterable Protocol
var array = [...arrayLike];
console.log(array); // => ['Cat', 'Bird']
```

`arrayLike[Symbol.iterator]` creates a property on the object that contains an iteration function `iterator()`, making the object conformed to [iterable protocol](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols#iterable). `iterator()` returns an object (conformed to [iteration protocol](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols#iterator)) with `next` property as a function that returns the control object `{done: <boolean>, value: <item>}`.
Since `arrayLike` is now iterable, the spread operator is used to extract its elements into an array: `[...arrayLike]`.

### 6. Finale

Three dots operator adds a bunch of great features to JavaScript.

The rest parameter makes a lot easier to collect the arguments. It's a reasonable replacement for the hardcoded array-like object `arguments`. If the situation permits to choose between rest parameter and `arguments`, use the first one.

`.apply()` method is not convenient for its verbose syntax. The spread operator is a good alternative when invocation arguments should be taken from an array.

The spread operator improves the array literals. You can initialise, concatenate and clone arrays a lot simpler.
You can extract parts of an array using the destructuring assignments. And in combination with iterator protocols, it is possible to use the operator in a more configurable manner.

I hope from now on the spread operator will appear more often in your code!

**P.S. Check out popular posts on Rainsoft:**
[Gentle explanation of 'this' keyword in JavaScript](http://rainsoft.io/gentle-explanation-of-this-in-javascript/)
[When 'not' to use arrow functions](http://rainsoft.io/when-not-to-use-arrow-functions-in-javascript/)
[The legend of JavaScript equality operator](http://rainsoft.io/the-legend-of-javascript-equality-operator/)
