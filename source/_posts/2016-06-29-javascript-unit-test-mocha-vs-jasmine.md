layout: post
title: "JavaScript Unit Test, Mocha vs Jasmine"
description: ""
category: JavaScript
tags: [javascript, unit test, jasmine, mocha]
---

See [Jasmine vs. Mocha](https://marcofranssen.nl/jasmine-vs-mocha/)

In this blog post I want to highlight the similarities and the differences between [Jasmine](https://jasmine.github.io/2.4/introduction.html) and [Mocha](https://mochajs.org/#getting-started). In this comparison I will focus on the latest versions of both libraries. As of this writing `Jasmine 2.4` and `Mocha 2.3`.

When comparing both libraries at [NPMCompare](https://npmcompare.com/compare/jasmine,mocha) you notice that Mocha is the more popular framework today. Mocha has more frequent updates, more downloads and more forks on Github. Although both frameworks are pretty popular and do have a lot of similarities. Lets go have a look at some more details of both libraries.

<!-- more -->

## Similarities Jasmine and Mocha

Both libraries have a similar API regarding the structure of your tests. They both allow you to write your tests using a `describe` block. They also both have the same approach for asynchronous testing using a callback method (done). In the next code example you can see the similarities between both the frameworks.

```js
describe('User', function () {
    describe('When getting the users details', function () {
        it('should contain the full name', function (done) {
            // assertions go here
        });
    });
});
```

_Please note that the asynchronous behavior is only the same as of Jasmine 2.x. In Jasmine 1.x you had to use methods like waitsFor to write a test that required asynchronous behavior._

Both libraries are also supported in the popular test runner [Karma](https://karma-runner.github.io/0.13/index.html). Karma can run your tests against different browsers like, Chrome, Firefox, PhantomJS etc. It can watch you tests and source files for changes and automatically run your tests against the browsers you configured in the config file. This gives you continuous feedback while developing your code.

## Differences Jasmine and Mocha

### Assertions

The differences of both libraries start where you are doing your assertions. Mocha does not come with a built in assertion library. There are several assertions libraries available for Mocha:

* Chai
* should.js
* expect.js
* better-assert

It seems many developers choose Chai as an assertion library for Mocha. So where you can use Jasmine as is to write your tests, you will have to load another assertion library with Mocha. Lets have a closer look at `Chai` as I have some hands-on experience with this assertion library. Chai comes with three assertion styles, the `should`, `expect` and `assert` style. The expect style is similar to Jasmine and is therefore the easiest to migrate from Mocha to Jasmine or the other way around.

```js
//Jasmine
expect(calculator.multiply(3, 4)).toEqual(12);
```

```js
// Chai
expect(calculator.multiply(3, 4)).to.equal(12);
```

### Mocking

Mocking in JavaScript comes in the form of spies. A spy is a function that replaces a function from your code where you want to control its behavior in a test. You could for example record on how such a function is used in your test to do some assertions based on usage. Some more concrete examples are:

* Count how many times a spy has been called
* Specify a return value to have your code follow a specific path
* Throw an error to test the exception flow
* Inspect the arguments a spy has been called with
* Have the spy call the original function, this is not by default. (This enables you to count for example the calls to the method and still execute the original logic)

Also for mocking Mocha does not come with built in mocking. If you want to use mocking/spies with Mocha you need to use another library called `Sinon`. Sinon is a very powerful library which is equivalent to Jasmine spies with some additional features. In Jasmine you can create a spy like this:

```js
// existing methods
var blogPostSaveSpy = spyOn(BlogPost.prototype, 'save');
// non existing method spy
var spy = jasmine.createSpy();
```

Sinon has three different approaches to apply mocking. Spies, stubs and mocks, each of them have some subtle differences. For example a spy in Jasmine will not call though on the method being spied, where in Sinon this is default behavior. A small example:

```js
// Jasmine
spyOn(blogpost, 'publish').andCallTrough();
```

```js
sinon.spy(blogpost, 'publish');
```

A sinon stub has equal behavior to the default behavior of a Jasmine spy. Example:

```js
// Jasmine
spyOn(blogpost, 'publish').andReturns(200);
```

```js
//Sinon
sinon.stub(blogpost, 'publish').returns(200);
```

In many situations Jasmine spies will cover all you need with regards to mocking. In case you need a little bit more features you can however also use Sinon with Jasmine.

## Zooming in on the asynchronous tests

Asynchronous tests will be useful for all you code that does Ajax calls or in case of Node.js goes to the database or file system. In those cases you need to inform both Jasmine or Mocha that your code finished executing. Two examples of asynchronous code is code with callbacks or Promises. In the following code example I will show you how to use both approaches in an asynchronous test. Imagine the `Blogpost.getById` method returns a promise which resolves with a user object. The following example code uses `Bluebird` for the promises to have some syntactic sugar like the catch and finally methods.

```js
describe('When loading a blog post from database', function () {  
    it('should return an instance of Blogpost', function (done) {  
        BlogPost.getById(1).then(function (post) {  
            expect(post instanceof Blogpost).toBe(true);  
        }).finally(done);  
    });  

    it('should return the user with id 1', function (done) {  
        BlogPost.getById(1).then(function (post) {  
            expect(post.id).toEqual(1);  
        }).finally(done);  
    });  

    it('should fail with a 401 for non-existing posts', function (done) {  
        BlogPost.getById(2).catch(function (err) {  
            expect(err.status).toEqual(401);  
        }).finally(done);  
    });  
});  
```

_Notice that we use the finally statement to call the done function. By doing this we are sure the done method is always invoked, even if the test fails (basically caused by not going into the `then` or the `catch`)._

```js
describe('When loading a blog post from database', function () {  
    it('should return an instance of Blogpost', function (done) {  
        BlogPost.getById(1, function (err, post) {  
            expect(post instanceof Blogpost).toBe(true);  
            done();  
        });  
    });  

    it('should return the user with id 1', function (done) {  
        BlogPost.getById(1, function (err, post) {  
            expect(post.id).toEqual(1);  
            done();  
        });  
    });  

    it('should fail with a 401 for non-existing posts', function (done) {  
        BlogPost.getById(2).catch(function (err, post) {  
            expect(err.status).toEqual(401);  
            done();  
        });  
    });  
});  
```

_Note we are invoking the done method after we did our assertion, to tell Jasmine/Mocha the asynchronous code finished. Also note we have been using Jasmine in this example (you can see that based on the assertions). Obviously you could have achieved the same using Mocha, as the way of doing asynchronous testing is exactly the same for both frameworks._

Please ref [Using Mocha Chai Sinon to test Node.js](https://marcofranssen.nl/using-mocha-chai-sinon-to-test-node-js/) to see an event example.

## Wrapup

Overall I think you have a little more flexibility when using Mocha, since you can pick your own assertion library and your own mocking library. This however also comes with a price of a slightly more complex setup and some additional dependencies. Overall I think it depends on each project or your personal preference which of these libraries you want to use. When using Jasmine this does not exclude you from using Sinon. You can still benefit for example from its fake server. Both frameworks are perfectly able to do the job. As of Jasmine 2.x, I think Jasmine is back in the race with Mocha.

Also consider reading one of my previous blog posts:

* [Using Mocha Chai Sinon to test Node.js](https://marcofranssen.nl/using-mocha-chai-sinon-to-test-node-js)

In this blog post I have some more detailed examples on how to use Mocha with Chai assertions and Sinon Mocks. Thanks for reading this blog post. I hope it was useful for you. Please leave me a comment in case you have questions or remarks.