---
layout: post
title: "Node Stream"
category: Node
tags: [node, stream]
--- 

原文： <http://book.mixu.net/node/ch9.html> 9.3

We’ve discussed the three main alternatives when it comes to controlling execution: Sequential, Full Parallel and Parallel. Streams are an alternative way of accessing data from various sources such as the network (TCP/UDP), files, child processes and user input. In doing I/O, Node offers us multiple options for accessing the data:

&nbsp; | Synchoronous |   Asynchronous
------|--------|-------------------
Fully buffered  |readFileSync()  |readFile()
Partially buffered (streaming)  |readSync()  | read(), createReadStream()

<!--more-->

The difference between these is how the data is exposed, and the amount of memory used to store the data.

Streams are EventEmitters. If our 1 GB file would, for example, need to be processed in some way once, we could use a stream and process the data as soon as it is read. This is useful, since we do not need to hold all of the data in memory in some buffer: after processing, we no longer need to keep the data in memory for this kind of application.

The Node stream interface consists of two parts: Readable streams and Writable streams. Some streams are both readable and writable.

## Readable streams

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

Writable streams

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
