layout: post
title: "Using Streams in Node.js"
category: Node
tags: [node, io]
--- 

We’ve discussed the three main alternatives when it comes to controlling execution: Sequential, Full Parallel and Parallel. Streams are an alternative way of accessing data from various sources such as the network (TCP/UDP), files, child processes and user input. In doing I/O, Node offers us multiple options for accessing the data:

&nbsp; | Synchoronous |   Asynchronous
------|--------|-------------------
Fully buffered  |readFileSync()  |readFile()
Partially buffered (streaming)  |readSync()  | read(), createReadStream()

The difference between these is how the data is exposed, and the amount of memory used to store the data.

Streams are EventEmitters. If our 1 GB file would, for example, need to be processed in some way once, we could use a stream and process the data as soon as it is read. This is useful, since we do not need to hold all of the data in memory in some buffer: after processing, we no longer need to keep the data in memory for this kind of application.

The Node stream interface consists of two parts: Readable streams and Writable streams. Some streams are both readable and writable.

<!--more-->

## Readable Streams

The following Node core objects are Readable streams:

- Files `fs.createReadStream(path, [options])`  Returns a new ReadStream object (See Readable Stream).
- HTTP (Server) `http.ServerRequest`    The request object passed when processing the request/response callback for HTTP servers.
- HTTP (Client) `http.ClientResponse`   The response object passed when processing the response from an HTTP client request.
- TCP `net.Socket`  Construct a new socket object.
- Child process   `child.stdout`    The stdout pipe for child processes launched from Node.js
- Child process   `child.stderr`    The stderr pipe for child processes launched from Node.js
- Process `process.stdin`   A Readable Stream for stdin. The stdin stream is paused by default, so one must call process.stdin.resume() to read from it.


Readable streams emit the following events:

- Event: ‘data’   Emits either a Buffer (by default) or a string if setEncoding() was used.
- Event: ‘end’    Emitted when the stream has received an EOF (FIN in TCP terminology). Indicates that no more 'data' events will happen.
- Event: ‘error’  Emitted if there was an error receiving data.

To bind a callback to an event, use stream.on(eventname, callback). For example, to read data from a file, you could do the following:

```js
var fs = require('fs');
var file = fs.createReadStream('./test.txt');
file.on('error', function(err) {
  console.log('Error '+err);
  throw err;
});
file.on('data', function(data) {
  console.log('Data '+data);
});
file.on('end', function(){
  console.log('Finished reading all of the data');
});
```

Readable streams have the following functions:

- pause() Pauses the incoming 'data' events.
- resume()    Resumes the incoming 'data' events after a pause().
- destroy()   Closes the underlying file descriptor. Stream will not emit any more events.

## Writable Streams

The following Node core objects are Writable streams:

- Files   fs.createWriteStream(path, [options])   Returns a new WriteStream object (See Writable Stream).
- HTTP (Server)   http.ServerResponse 
- HTTP (Client)   http.ClientRequest  
- TCP net.Socket  
- Child process   child.stdin 
- Process process.stdout  A Writable Stream to stdout.
- Process process.stderr  A writable stream to stderr. Writes on this stream are blocking.

Writable streams emit the following events:

- Event: ’drain’  After a write() method returned false, this event is emitted to indicate that it is safe to write again.
- Event: ’error’  Emitted on error with the exception exception.

Writable streams have the following functions:

- write(string, encoding='utf8')  Writes string with the given encoding to the stream.
- end()   Terminates the stream with EOF or FIN. This call will allow queued write data to be sent before closing the stream.
- destroy()   Closes the underlying file descriptor. Stream will not emit any more events. Any queued write data will not be sent.

Lets read from stdin and write to a file:

```js
var fs = require('fs');

var file = fs.createWriteStream('./out.txt');

process.stdin.on('data', function(data) {
  file.write(data);
});
process.stdin.on('end', function() {
  file.end();
});
process.stdin.resume(); // stdin in paused by default
```


Running the code above will write everything you type in from stdin to the file out.txt, until you hit Ctrl+d (e.g. the end of file indicator in Linux).

You can also pipe readable and writable streams using readableStream.pipe(destination, [options]). This causes the content from the read stream to be sent to the write stream, so the program above could have been written as:

```js
var fs = require('fs');
process.stdin.pipe(fs.createWriteStream('./out.txt'));
process.stdin.resume();
```

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

## Reference

- [Using Streams in Node.js](http://blog.safaribooksonline.com/2013/05/01/using-streams-in-node-js/)
- [Fundamentals: Timers, EventEmitters, Streams and Buffers - Mixu's Node book](http://book.mixu.net/node/ch9.html)

## Library

- [substack/stream-handbook](https://github.com/substack/stream-handbook) streams 使用教程.
- [Obvious/sculpt](https://github.com/Obvious/sculpt) 数据流操作库。
- [sindresorhus/trash](https://github.com/sindresorhus/trash) 将文件或者目录移动到回收站中。
- [sgmonda/stdio](https://github.com/sgmonda/stdio) 标准输入输出管理模块。
- [mafintosh/peerflix](https://github.com/mafintosh/peerflix) Streaming torrent client for node.js

## Tutorial

- [StrongLoop](http://strongloop.com/strongblog/whats-new-io-js-beta-streams3)
