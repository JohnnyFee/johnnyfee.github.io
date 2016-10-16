layout: post
title: "Dealing with the deprecation of peerDependencies in NPM 3"
category: Node
tags: [node, npm, peerDependencies]
---

From: [Dealing with the deprecation of peerDependencies in NPM 3](https://codingwithspike.wordpress.com/2016/01/21/dealing-with-the-deprecation-of-peerdependencies-in-npm-3/)

The `peerDependencies` configuration was originally designed to address the problem of NPM packages that were ‘plugins’ for other frameworks.

The original problem is discussed more in-depth [here on the NPM blog](https://nodejs.org/en/blog/npm/peer-dependencies/).

For example, the `grunt-contrib-jasmine` package requires that the project using it also lists `grunt` in its dependencies. Because of the way NPM v1 and v2 resolved packages, `grunt-contrib-jasmine` couldn’t just list `grunt` as one of its dependencies and expect things to work.

Let’s look at a more detailed explanation of why:

## Dependencies vs PeerDependencies in NPM2

Assume we are working on our own project, named “MySuperApp”. We have a few dependencies we want to use.

One of them will be “PackageA”. `PackageA`‘s package.json file looks like this:

```json
{
  dependencies: {
    "PackageB": "1.0.0"
  }
}
```

So we can see here that `PackageA` has a dependency on `PackageB`.

If you were to `npm install PackageA`, you would end up with the directory structure:

```
MySuperApp
|- node_modules
   |- PackageA
      |- node_modules
         |- PackageB
```

So back in “MySuperApp” we can get a reference to “PackageA” by doing:


```js
var packageA = require('PackageA');
```

You might also want to use “PackageB” directly in “MySuperApp”, and knowing that `PackageA` already depends on, and installed `PackageB`, you might think that you can do:

```js
var packageA = require('PackageA');
var packageB = require('PackageB');
```

But you can’t. The require for `PackageB` would fail. Node would only look in “MySuperApp/node_modules” for a “PackageB” but would not look further down the tree, under `PackageA`‘s modules.

To fix this, “MySuperApp” would have to directly import “PackageB”.

Sometimes this is OK, but if `PackageA` was something like a grunt plugin, for example `grunt-contrib-jshint`, then `MySuperApp` would _always_ have to depend on the `grunt` package as well.

## peerDependencies to the rescue

To make this “if you install me, you better also install X, Y, and Z!” problem easier, `peerDependencies` was introduced. If “PackageA” had this `package.json`:

```
{
  peerDependencies: {
    "PackageB": "1.0.0"
  }
}
```

Then it would tell NPM that “if a package lists me as a dependency, then assume that package also has a dependency on PackageB”.

If you were to `npm install PackageA` now with, you would end up with the directory structure:

```
MySuperApp
|- node_modules
   |- PackageA
   |- PackageB
```

Notice that “PackageB” is now in “MySuperApp”‘s node_modules folder even though it didn’t directly depend on PackageB.

This code would now work just fine, because both packages can be resolved from “MySuperApp/node_modules”:

```js
var packageA = require('PackageA');
var packageB = require('PackageB');
```

## Buh-bye, peerDependencies!

With the introduction of NPM3, peerDependencies behaves differently. It no longer actually installs the peerDependency packages. Instead, it just checks at the end of install to see that they are resolvable, and prints a warning if they are not. So from the previous example, if you were to `npm install PackageA` then you would get a warning at the end saying that “PackageB” is a required dependency but is not resolved. You would need to manually add “PackageB” to “MySuperApp”‘s dependencies.

In real-life, this sort of sucks. It means that if a package you are using gets updated and they change a version of a peerDependency, you now need to also change your own package.json to get the right version.

In my real-life use of peerDependencies, I actually have a “core” projects that is using peerDependencies to make sure 4 other “child” projects all have the same dependencies. Then if a version changes, I only have to change the package.json in “core” and the 4 other projects are automatically updated on next npm install. This is no more with NPM3![😦](https://s0.wp.com/wp-content/mu-plugins/wpcom-smileys/twemoji/2/svg/1f626.svg)

## So what now?

So how do we deal with this in a sane way, especially when as a package maintainer, you don’t know if someone using your package will be on NPM2 or 3?

The solution I used was in my package (“PackageA” in this example) I list all the `peerDependencies` in the regular `dependencies` too:

In PackageA’s package.json:

```js
{
  dependencies: {
    "PackageB": "1.0.0"
  },
  peerDependencies: {
    "PackageB": "1.0.0"
  }
}
```

So the dependencies are duplicated. This seems weird, but let’s explore why it works:

### in NPM2…

It actually installs the dependency twice. You get the directory structure:

```
MySuperApp
|- node_modules
   |- PackageA
   |  |- node_modules
   |     |- PackageB
   |- PackageB
```

So PackageB is actually installed twice, but you can “fix” this with an `npm dedupe` which would clean up the duplicate. Even without the dedupe, you waste some drive space, but the code at least works and can resolve its dependencies!

### in NPM3…

NPM3 installs to a “flat” directory structure now. So as it runs through the `dependencies` section, it actually makes the directory structure:

```
MySuperApp
|- node_modules
   |- PackageA
   |- PackageB
```

Then NPM checks the `peerDependencies` and sees that `PackageB` is installed and resolvable, so does not complain.

### Works on my machine!

In my case I needed to support both versions of NPM, because I can’t reasonable expect to have all developers and all build servers update from NPM 2 to 3 at the same time.

This “duplicating” of the dependencies seems to work great for me and what I needed it to do.

If it works for you too, awesome!
