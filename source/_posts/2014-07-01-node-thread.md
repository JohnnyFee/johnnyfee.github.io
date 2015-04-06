layout: post
title: "Node Thread"
category: Node
tags: [node, thread]
---

- [Node.js: managing child processes - Tech.pro](http://tech.pro/tutorial/2074/nodejs-managing-child-processes)

## process constant

- [Node.js的process模块 – WEB前端开发](http://www.css88.com/archives/4548)

### argv

An array containing the command line arguments. The first element will be 'node', the second element will be the name of the JavaScript file. The next elements will be any additional command line arguments.

```javascript
// print process.argv
process.argv.forEach(function(val, index, array) {
  console.log(index + ': ' + val);
});
This will generate:
```

<!-- more -->

```shell
$ node process-2.js one two=three four
0: node
1: /Users/mjr/work/node/process-2.js
2: one
3: two=three
4: four
```

We can use [substack/minimist](https://github.com/substack/minimist) to process the arguments.

```javascript
var argv = require('minimist')(process.argv.slice(2));
console.dir(argv);
```

```
$ node example/parse.js -a beep -b boop
{ _: [], a: 'beep', b: 'boop' }

$ node example/parse.js -x 3 -y 4 -n5 -abc --beep=boop foo bar baz
{ _: [ 'foo', 'bar', 'baz' ],
  x: 3,
  y: 4,
  n: 5,
  a: true,
  b: true,
  c: true,
  beep: 'boop' }
```

## Tutorial

- [doxout/recluster](https://github.com/doxout/recluster) Node clustering library with support for zero downtime reloading.
- [supervizer](https://github.com/oOthkOo/supervizer)
- [Node.js: managing child processes - Tech.pro](http://tech.pro/tutorial/2074/nodejs-managing-child-processes?)
- [Supervisor: A Process Control System — Supervisor 3.1.2 documentation](http://supervisord.org/)