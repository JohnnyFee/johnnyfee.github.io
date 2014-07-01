---
layout: post
title: "Using Streams in Node.js"
category: Node
tags: [node, io]
--- 

原文： <http://blog.safaribooksonline.com/2013/05/01/using-streams-in-node-js/>

ode.js is a JavaScript platform for building networked applications. Node.js was not the first server-side JavaScript implementation, but it’s different from all the previous ones because it does I/O in a different way. The I/O operations are event-driven: instead of making sequential I/O operations, the developer defines functions that are called once a relevant event happens. Such an event can be, for instance, that a socket has a new connection or that data is available to be read from a socket. In this article we will take a look at using streams in Node.js, using the latest Streams2 API.

Node.js comes with a set of useful abstractions for doing I/O, and one of them is Streams. A stream represents an object that can either be the source of data or it can be the target of data. Node.js provides these abstractions, but it also implements streams in the core modules. For instance, a file can be a stream that is readable, and an HTTP response is a stream that you can write to. A TCP connection is a stream that is both readable and writable. Take a look at [Chapter 9: Reading and Writing Streams of Data](http://my.safaribooksonline.com/9781118240564/chapter09_html) in _Professional Node.js: Building Javascript Based Scalable Software_ for more on reading and writing streams in Node.js.

<!--more-->

## Readable Streams

Here is an example of a readable stream (01_file.js)-you can access all of the source code found in this article here: [https://github.com/pgte/using-streams-nodejs-article-src](https://github.com/pgte/using-streams-nodejs-article-src):

```js
var fs = require('fs');
var stream = fs.createReadStream(__filename, {encoding: 'utf8'});

function read() {
  var buf;
  while (buf = stream.read()) {
    console.log('Read from the file:', buf);
  }
}

stream.on('readable', read);

stream.once('end', function() {
  console.log('stream ended');
});
```

Here we are creating a readable stream that reads the contents of the current source code file. Every time that the stream has data available on it, it emits the readable event. Here we attached our read function to that event, which makes the function get called every time there is data available. In this function we read from the file until there is no more data left to read.

Also, we attach a listener to the end event, which gets called once the stream ends, which in this case means that we reached the end of the file. After the end event we will not get any more readable events.

## Writable Streams

In addition to readable streams, we can also use writable streams with Node.js. Following this example, we can have a writable file stream, 02_writable.js:

```js
var fs = require('fs');
var stream = fs.createWriteStream('out.txt');

var interval = setInterval(function() {
  stream.write((new Date()).toString());
}, 1000);

setTimeout(function() {
  clearInterval(interval);
  stream.end();
}, 5000);
```

Here we are creating a writable stream on top of a file named out.txt. Using a setInterval, we write the current date and time to this file on every second. After 5 seconds have elapsed, we end the stream and stop the interval.

## Piping

We can connect a readable stream to a writable stream by using source.pipe(target). In this next example (03_pipe.js) we create two streams, one readable and another writable, and write the content of one into the other:

```js
var fs = require('fs');
var source = fs.createReadStream(__filename);
var target = fs.createWriteStream('copy.js');
source.pipe(target);
```

## A Transform Stream

We can also create our own type of stream. For instance, we can create a stream that is both readable and writable, and that, for every UTF-8 character it receives, transforms it into the uppercase version (04_transform.js):

```js
var fs = require('fs');
var source = fs.createReadStream(__filename);
var target = fs.createWriteStream('copy.js');
source.pipe(target);
```

Here we are using the Node native streams module (which is extensively used inside the Node core) to create our transform stream by specifying the stream._transform function, which does the actual transformation on incoming data.

Now that we have this transform stream, we can pipe any readable stream into it and pipe it into any writable stream:

```js
var fs = require('fs');
var source = fs.createReadStream(__filename);
var target = fs.createWriteStream('copy.js');
source.pipe(target);
```

Here, in this last line of code, we are taking advantage of the fact that stream.pipe returns the target stream so that we can pipe it again to the target. If you replace the pipe occurrences with arrows and remove the parenthesis, you can picture the flow of data that is happening:

source -> uppercase -> target

## Reuse the Stream

Since we created an abstract stream, we can reuse it on any other stream. In this example (05_tcp_server.js) we use this uppercase transform stream to create a simple TCP service:

```js
var fs = require('fs');
var source = fs.createReadStream(__filename);
var target = fs.createWriteStream('copy.js');
source.pipe(target);
```

Here we are creating a server which, on every connection, calls our onConnection function. This function receives the socket object. This object is a stream that is both readable (when the peer sends data) and writable (when we send data to the peer). In Node.js nomenclature, this stream is called a duplex stream.

On each connection we create this transform stream, into which we pipe the socket incoming data. We then pipe the output of the uppercase transform stream back to the socket.

Start this server form the command line:

    $ node 05_tcp_server.js

You can then connect to it using telnet or any other TCP client like nc:

```shell
$ nc localhost 3000
please pass me the salt
PLEASE PASS ME THE SALT
```

By treating your incoming and outgoing data as streams, you can create your own stream implementations, tie them together using pipe, and reuse them seamlessly throughout many types of streams. Some examples of types of streams include: files, network connections, HTTP requests and responses, database connections, websockets and other existing stream implementations.


