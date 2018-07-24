layout: post
title: "Android Handler, Message, MessageQueue, Looper"
description: ""
category: Android
tags: [android]
---

From [Understanding Android/Java Processes and Threads Related Concepts (Handlers, Runnables, Loopers, MessageQueue, HandlerThread) – Code Theory](http://codetheory.in/android-handlers-runnables-loopers-messagequeue-handlerthread/)

In this article we’ll try to briefly go through the various sort of low level concepts in Android that are really important to understand IMHO. Once you have a good grasp on these, a lot of things that are actually built atop these concepts become much easier to understand and code. We’ll go through processes, threads, loopers, message queues, messages, handlers, runnables, etc. I’ll also point to various external resources that you should definitely go through for a much better understanding.

## Process

When an Android application starts for the first time, the Android system starts a new Linux [process](http://en.wikipedia.org/wiki/Process_(computing)) for the application with a single [thread of execution](http://en.wikipedia.org/wiki/Thread_(computing)) (also known as the main thread or UI thread). By default all the components of an application runs in the same thread (“main” thread) of that process.

By default every Android application will run in its own process and will be assigned its own unique User ID that can be set by the [`sharedUserId`](http://developer.android.com/guide/topics/manifest/manifest-element.html#uid) manifest attribute. Two applications could share the same user ID (if they’re also signed by the same certificate) in which case they can read each others data even when running in separate processes. You can always go to `$ adb shell` and execute `$ ps` to view a list of processes on your Android device or emulator connected to your computer.

Each process has its own memory space and communicate with each other through various Inter Process Communication (IPC) mechanisms like pipes and sockets not only on the same systems, but also different systems.

Helpful Resources:

* <http://developer.android.com/guide/components/processes-and-threads.html>

## Thread

[Threads](http://en.wikipedia.org/wiki/Thread_(computing)) are the smallest sequence of programmed instructions that can be managed independently by operating system ([schedulers](http://en.wikipedia.org/wiki/Scheduling_(computing))). They are units of computation that run simultaneously within a process (Linux process in Android). They usually reside in a process and share resources such as memory (but have independent call stacks). Threads running in the same process can communicate with each other via shared objects or message passing. Creating threads require fewer resources and they’re also sometimes referred to as lightweight processes.

Concurrent Programming (Concurrency) is basically when processes and threads execute simultaneously in multiple processors (CPU) or multiple cores on a system (computers, mobiles, etc.).

In Android, when an application is launched, the system creates a thread of execution called “main”. This main thread (also called the UI thread) is responsible for drawing the user interface including dispatching events to appropriate user interface widgets, toolkits and other components. It is the thread responsible for what the user gets the see on the screen and interacts with.

All the components (Activity, Service, BroadcastReceiver, Content Providers) instantiated in the same process/application are not created in a separate thread but the main thread only. So for example:

* Start of an Activity
* Execution of a Service
* Receival of BroadcastReceiver (onReceive())
* Querying a content provider
* Responding to system callbacks for user events like [`onTouchListener`](http://developer.android.com/reference/android/view/View.OnTouchListener.html), [`onKeyDown`](http://developer.android.com/reference/android/view/KeyEvent.Callback.html#onKeyDown(int, android.view.KeyEvent)

All these and more, all are processed on the main thread. This is why long running operations like network access, database queries, complicated calculations, accessing big files or any task that could possibly take more than 5 seconds should not be executed on the main thread which’ll cause it to block leading to no events getting dispatched, including drawing events. The user will also be presented with the [Application Not Responding (ANR)](http://developer.android.com/training/articles/perf-anr.html) dialog leading to an unresponsive laggy application. This could lead to users uninstalling your app and submitting low ratings and negative feedbacks on the play store.

Hence, all sorts of intensive operations should be done in Background/Worker threads. It is recommended to user Services (has no user interface like an Activity) for long-running background operations by spawning a separate worker thread in it.

More Helpful Resources:

* <http://developer.android.com/guide/components/processes-and-threads.html>
* <https://docs.oracle.com/javase/tutorial/essential/concurrency/procthread.html>
* <http://stackoverflow.com/questions/200469>
* <http://stackoverflow.com/questions/1762418>
* <http://stackoverflow.com/q/11566780>
* <http://stackoverflow.com/questions/11909248>
* <http://stackoverflow.com/questions/3318750>
* <http://www.uml-diagrams.org/examples/java-6-thread-state-machine-diagram-example.html>

## Looper and MessageQueue

Android maintains a [MessageQueue](http://developer.android.com/reference/android/os/MessageQueue.html) (message loop) on the main thread which basically contains a list of [Messages](http://developer.android.com/reference/android/os/Message.html) or [Runnables](http://developer.android.com/reference/java/lang/Runnable.html) (set of executable code) that the [Looper](http://developer.android.com/reference/android/os/Looper.html) dispatches to appropriate Handlers.

Messages are not added to the MessageQueue directly in Android, but through the [Handler](http://developer.android.com/reference/android/os/Handler.html) objects from any thread (but the same process) associated with the Looper. So the Looper sort of polls (also referred to as a “tick”) for the next message in the queue and as soon as a message is encountered, it is passed to its respective handler. You might want to go through the [`Looper.loop()`](http://developer.android.com/reference/android/os/Looper.html#loop()) [source code](http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/4.3_r1/android/os/Looper.java#Looper.loop%28%29) where you’ll notice an infinite for loop being run checking for the next message. If I’m not mistaken every message has a reference to the next message too.

So basically a [Looper](http://developer.android.com/reference/android/os/Looper.html) contains a synchronized MessageQueue that’s used to process Messages placed on the queue. It implements a Thread-specific event loop that waits for and dispatches Messages to handlers. By default, a thread does not have a message loop associated with it, hence doesn’t have a Looper either. To create a Looper for a thread and dedicate that thread to process messages serially from a message loop, you can use the [Looper class](http://developer.android.com/reference/android/os/Looper.html).

This is how you make a thread capable of having a Looper:

```java
class LooperThread extends Thread {
    public Handler mHandler;
 
    @Override
    public void run() {
        // Initialize the current thread as a Looper
        // (this thread can have a MessageQueue now)
        Looper.prepare();
 
        mHandler = new Handler() {
            @Override
            public void handleMessage(Message msg) {
                // process incoming messages here
            }
        };
 
        // Run the message queue in this thread
        Looper.loop();
    }
}
```

Next, starting the thread is as simple as doing this:

```java
// Let's say from MainActivity.onCreate()
 
LooperThread looperThread = new LooperThread();
looperThread.start();
```

Since you’ve a reference to the Handler object inside the Looper, you can send Messages or post Runnables. We’ll discuss how to do this later.

`Looper.loop()` is a blocking method ensuring that the `run()` method blocks and is not finished.

A thread can have only one associated Looper and hence a single message queue. So if multiple threads tries to send messages to a particular Looper thread then all of them will be processed sequentially. Trying to setting up another Looper will throw a runtime error with a message like this `java.lang.RuntimeException: Only one Looper may be created per thread`.

There are 2 methods to terminate a Looper:

* [`Looper.quit()`](http://developer.android.com/reference/android/os/Looper.html#quit()) – Terminates the Looper without processing any more messages in the MessageQueue. Any attempt to post messages to the queue will fail once the Looper is asked to quit. For example, the `Handler.sendMessage()` or `Handler.post()` dispatching methods will return `false`.
* [`Looper.quitSafely()`](http://developer.android.com/reference/android/os/Looper.html#quitSafely()) – Similar to the previous version but makes sure that the pending messages that are due to be delivered are handled. Messages with due times in the future won’t be delivered before the Looper quits though.

Terminating the Looper lets the thread resume running the method that had invoked the call to `Looper.loop()`. The old Looper or even a new Looper cannot be started anymore. So the thread can no longer enqueue and handle messages. `Looper.prepare()` called again should throw a `RuntimeException` whereas `Looper.loop()` called again will block but no messages will be dispatched from the queue.

In the previous code sample where we created a Looper thread, you shouldn’t forget to terminate the Looper when its purpose is fulfilled. Termination could be for instance done in the Activity’s `onDestroy()` method. The Activity that kicks off the thread.

### UI Thread Looper

The UI thread is the only thread that is associated with a Looper by default before the application components are initialized. There are a few differences (or maybe specialities that it has) between it and other application thread Loopers:

* It cannot be terminated with `Looper.quit()`. A `RuntimeException` is thrown if that is tried.
* It is accessible from everywhere through the `Looper.getMainLooper()` method.
* It is associated with the UI thread via `Looper.prepareMainLooper()` and can be done only once per application. Trying to call this in some other Thread to attach the main looper will throw an exception.

### MessageQueue.IdleHandler

Pending Messages are sorted based on timestamps in the MessageQueue. The one with the lowest value and less than the current time is the first one to be dispatched. The dispatcher waits (blocking the Looper thread) until the current time has passed the lowest timestamp value from the queue. If there’s a new message with the lowest timestamp then the list is rearranged for proper sorting so that this recent message can be dispatched first.

If there’s no message to process then that means the consumer thread has some idle time that it can use to execute some task rather than just waiting. Infact this way your idle slots can be filled with execution of short non-critical tasks. Make sure you don’t perform any long running operations that might delay the dispatch of pending Messages. So in these idle slots the [`queueIdle()`](http://developer.android.com/reference/android/os/MessageQueue.IdleHandler.html#queueIdle()) method on all the registered [`MessageQueue.IdleHandler`](http://developer.android.com/reference/android/os/MessageQueue.IdleHandler.html) interfaces are called. Let’s see an example:

```java
// Get the MessageQueue object associated with the current thread
MessageQueue mq = Looper.myQueue();
 
// Create an IdleHandler
MessageQueue.IdleHandler idleHandler = new MessageQueue.IdleHandler() {
    @Override
    public boolean queueIdle() {
        // ... Do some jazz
        return false;
    }
};
 
// Register the IdleHandler
mq.addIdleHandler(idleHandler);
 
// Unregister an IdleHandler (if you want to)
mq.removeIdleHandler(idleHandler);
```

So `queueIdle()` will be called when the message queue has run out of messages and has to wait for more. If you return `true` from the method then your handler will be active and keep on getting called for further successive idle time slots. If `false` is returned then it becomes inactive and gets removed (same as calling [`removeIdleHandler()`](http://developer.android.com/reference/android/os/MessageQueue.html#removeIdleHandler(android.os.MessageQueue.IdleHandler))).

#### Terminating Unused Thread with IdleHandler

In the `queueIdle()` callback, you can somehow get the Looper and `quit()` it causing the associated Thread to terminate if you want to. This way if you’re sure that your producer thread inserts Messages without any delay and the consumer thread is never idle until the last message dispatched then you can terminate the thread causing it to free up resources/memory. Remember idle slots can occur before the first message, between messages and after the last message. So if you terminate betwen messages then that could be a problem. Be careful!

```java
// Various ways to quit
Looper.getLooper().quit(); // Cannot do this on main thread
// or
mHandler.getLooper().quit(); // from a Handler
```

Quitting from a Looper makes it return from `Looper.loop()`. Assuming you don’t have any code following that in the `run()` method of the Thread, the thread should definitely quit (but it really depends upon the implementation).

Helpful Resources:

* <http://blog.carbonfive.com/2013/10/27/the-javascript-event-loop-explained/> (with regards to JS but useful and conceptually similar)
* <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/EventLoop> (with regards to JS but useful and conceptually similar)
* <https://www.youtube.com/watch?v=A0PAhoHzlsQ&list=PLonJJ3BVjZW6hmkEaYIvLLm5IEGM0kpwU&index=4> (Very simple Illustrations-based explanation of Looper, MessageQueue, Messages and Threads)

## Runnable

A [Runnable](http://developer.android.com/reference/java/lang/Runnable.html) object represents a piece of code or a command that can be executed. Generally it is used to execute some command in a different [Thread](http://developer.android.com/reference/java/lang/Thread.html). This is how a Runnable object would look like:

```java
Runnable r = new Runnable() {
    @Override
    public void run() {
        // Block of code to execute
        System.out.println("Runnable run() method executed.");
    }
};
```

Now if you want to execute this in a separate Thread, then here’s how we can do it:

```java
Thread t = new Thread(r);
t.start();
```

Similarly we could just use the Thread class:

```java
Thread t = new Thread() {
    @Override
    public void run() {
        // Block of code to execute
        System.out.println("Thread run() method executed.");
    }
};
 
t.start();
```

Here’s an interesting [SO thread](http://stackoverflow.com/q/541487) that talks about both the versions where in one we use the Runnable interface and in the other one the Thread class. It’s worth reading.

If we wanted to execute the Runnable piece in the UI thread then we could have used the [`Activity.runOnUiThread()`](http://developer.android.com/reference/android/app/Activity.html#runOnUiThread(java.lang.Runnable)) method. In that case if the current thread **is** the UI thread then the runnable will be executed _immediately_ else it’ll be put on to the MessageQueue of the UI thread. Another way to do this same thing is like this:

```java
new Handler(Looper.getMainLooper()).post(runnable);
```

**Note:** The [`View`](http://developer.android.com/reference/android/view/View.html) class has a [`post()`](http://developer.android.com/reference/android/view/View.html#post(java.lang.Runnable)) method too, which lets you add a Runnable to the UI thread’s MessageQueue. Hence, the runnable will be run on the user interface thread. You can read this SO thread to understand the difference between `Activity.runOnUiThread()` and `View.post()`.

There’s a general notion that Runnables mean they’ll be executed in a different thread which is not through unless you explicitly wrap it in the Thread class or maybe use it in conjunction with a [Handler](http://developer.android.com/reference/android/os/Handler.html).

## Message

A [Message](http://developer.android.com/reference/android/os/Message.html) object basically defines a message that you can send to a [Handler](http://developer.android.com/reference/android/os/Handler.html) which in turn puts it in the MessageQueue so that later the Looper can dispatch it to its respective handler. We’ll discuss how to send and receive Messages using Handlers in the next section. Using Handlers of UI thread in another thread we can pass on Messages from the worker thread to the UI Handler which will place it in the MessageQueue for later dispatching. This helps with inter-thread communication.

So generally creating a Message is done via either [`Message.obtain()`](http://developer.android.com/reference/android/os/Message.html#obtain()) or [`Handler.obtainMessage()`](http://developer.android.com/reference/android/os/Handler.html#obtainMessage()). There are various versions of both the methods that accepts various arguments. Once called, these static methods will return a Message object from a global pool of recycled objects (better performance).

Let’s see an example of creating a Message:

```java
Message msg = Message.obtain();
 
// Read the documentation on the properties used below
// http://developer.android.com/reference/android/os/Message.html
 
msg.arg1 = 100;
msg.arg2 = 200;
 
msg.obj = "String";
 
Bundle bundle = new Bundle();
bundle.putString("foo", "bar");
msg.setData(bundle);
 
// At a later stage
// handler.sendMessage(msg);
```

## Handlers

A [Handler](http://developer.android.com/reference/android/os/Handler.html) defines a set of methods using which we can post/send (as well as remove) and process [Message](http://developer.android.com/reference/android/os/Message.html) (data message) and [Runnable](http://developer.android.com/reference/java/lang/Runnable.html) (task message) objects in the MessageQueue associated with the Thread-specific Looper. Each Handler instance is actually bound to the thread (and hence the message queue associated with the thread) in which it is created. It delivers Message and Runnable objects to that associated MessageQueue and executes them as they get dispatched by the Looper.

A Handler has to be bound to a Looper else they cannot function. A Looper is strictly required for it to couple with/connect to a queue to insert messages and receive messages from the Looper. When creating a Handler object you’ve to pass the Looper object as the first argument to the constructor explicitly. If not then it binds to the Looper of the current thread. If you try to be implicit and the thread doesn’t have a Looper then a `RuntimeException` will be thrown.

Note: Multiple Handlers doesn’t ensure concurrent execution as the Messages/Runnables will be posted in the queue from which they’re processed sequentially.

Let’s see how to enqueue Messages to the MessageQueue associated with the Handler and later when it’s dequeued the Handler itself will receive and handle/process it:

```java
Handler mHandler;
 
class MyThread implements Runnable {
 
    @Override
    public void run() {
        Message msg = Message.obtain();
        msg.obj = "My message!";
 
        mHandler.sendMessage(msg);
    }
}
 
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
 
    mHandler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            System.out.println(msg.obj);
        }
    };
 
    Thread t = new Thread(new MyThread());
    t.start();
}
```

The Handler was created in the UI thread, hence it’s associated with it and its MessageQueue. In a Runnable that is executed in a completely different Thread, a Message is created using `sendMessage()` and passed on to the Handler’s MessageQueue which is the one associated with the UI thread. Once the event loop iterating the queue gets to that Message, it passed it on to the `handleMessage()` method which executes in the main thread’s context. This behaviour of `handleMessage()` running in the UI thread’s context means you won’t have to use `runOnUiThread()` if you’ve to do some really important operation like modifying the UI by manipulating the Views in the layout. This way you’ve also seen how Handlers can be used to communicate between Threads.

There’s this version of [Message.obtain(Handler h, Runnable callback)](http://developer.android.com/reference/android/os/Message.html#obtain(android.os.Handler, java.lang.Runnable)) that accepts the Handler object and a Runnable callback. Apparently when you do a `msg.sendToTarget()` or `handler.sendMessage(msg)`, they won’t be sent to `Handler.receiveMessage()` but just the Runnable callback will get executed (but without the Message object). It is actually somewhat similar to doing this `handler.post(runnable)`.

Once the [Message](http://developer.android.com/reference/android/os/Message.html) is processed, its state is cleared and the instance is returned to the message pool by the runtime (VM) so that it can be recycled later.

Let’s also see how we can enqueue a Runnable to the MessageQueue using Handlers:

```java
Runnable r = new Runnable() {
    @Override
    public void run() {
        System.out.println("My Runnable");
    }
};
 
Handler handler = new Handler();
handler.post(r);
```

Pretty simple! The Handler posts the Runnable in the MessageQueue and once the Looper gets to it, the Runnable is executed. You should go through all the methods available in the Handler [documentation](http://developer.android.com/reference/android/os/Handler.html). For example there’s `postDelayed()` and `sendMessageDelayed()` using which you can schedule the processing of Runnable and Message objects to a later time.

The [`dispatchMessage()`](http://developer.android.com/reference/android/os/Handler.html#dispatchMessage(android.os.Message)) method of the Handler class is used to dispatch messages to the appropriate consumer thread by the Looper. If you try to directly call the method then the message will be processed immediately on the calling thread and not the consumer thread (that might be UI thread in your case). Here’s a [SO thread](http://stackoverflow.com/q/10227219) that has some relevant information.

A very important thing to remember is that only Message objects are allowed in the MessageQueue. Hence Runnables sent through the [`post*`](http://developer.android.com/reference/android/os/Handler.html#post(java.lang.Runnable)) methods and `what` integers sent through [`sendEmptyMessage*`](http://developer.android.com/reference/android/os/Handler.html#sendEmptyMessage(int)) are wrapped into Message objects.

### Remove Messages from the MessageQueue

Once you’ve enqueued messages, it is possible to remove those from the queue that have not been dequeued by the Looper, i.e., the pending ones. The Handler class gives us various methods to do so.

If you want to remove the Runnables that you posted, then we have:

* [`removeCallbacks(Runnable r)`](http://developer.android.com/reference/android/os/Handler.html#removeCallbacks(java.lang.Runnable))
* [`removeCallbacks(Runnable r, Object token)`](http://developer.android.com/reference/android/os/Handler.html#removeCallbacks(java.lang.Runnable, java.lang.Object))

For removing messages from the queue, we have:

* [`removeMessages(int what)`](http://developer.android.com/reference/android/os/Handler.html#removeMessages(int))
* [`removeMessages(int what, Object object)`](http://developer.android.com/reference/android/os/Handler.html#removeMessages(int, java.lang.Object))

Oh and if you want to remove both Runnables (tasks) and Messages (data) from the message queue, then we have this:

* [`removeCallbacksAndMessages(Object token)`](http://developer.android.com/reference/android/os/Handler.html#removeCallbacksAndMessages(java.lang.Object))

If you pass `null` to `removeCallbacksAndMessages()`, then that’ll remove all the callbacks and messages.

Let’s quickly see an example of how removal is done:

```java
Object token = new Object();
 
Handler handler = new Handler() {
    @Override
    public void handleMessage(Message msg) {
        // Do something with the msg
    }
};
 
// Add a Message
Message msg = handler.obtainMessage(0, token);
handler.sendMessage(msg);
 
// Add a Runnable
handler.postAtTime(new Runnable() {
    @Override
    public void run() {
        // Do some task
    }
}, token, SystemClock.uptimeMillis());
 
 
// and the removal!
handler.removeCallbacksAndMessages(token);
```

Remember only pending messages can/will be removed. I don’t think there’s a neat way (API) to find out whether a message has been dispatched and called without some hacks.

Note: A Handler cannot remove messages that were inserted by another Handler in the queue.

### Observing (Dump or Track) the MessageQueue

It is possible to either dump the entire list of pending messages from the MessageQueue or observe the messages as they get dispatched.

```
mHandler.dump(new LogPrinter(Log.DEBUG, TAG), "");
```

Using the [`Handler.dump()`](http://developer.android.com/reference/android/os/Handler.html#dump(android.util.Printer, java.lang.String)) instance method you can print a snapshot of all the pending messages.

Similarly you can trace the dispatching of messages by the Looper associated with the message queue of the calling thread like this:

```
Looper.myLooper().setMessageLogging(new LogPrinter(Log.DEBUG, TAG));
```

Using the [`setMessageLogging()`](http://developer.android.com/reference/android/os/Looper.html#setMessageLogging(android.util.Printer)) on your Looper object you can print information at the beginning and end of each message dispatch identifying the Handler and message contents.

## HandlerThread

[`HandlerThread`](http://developer.android.com/reference/android/os/HandlerThread.html) is a handy class for starting a new thread that has a Looper (hence an associated MessageQueue) attached so that one doesn’t have to go through creating a Thread and calling `Looper.prepare()`, `Looper.loop()`, etc. in that. You generally need a thread attached with a Looper when you want sequential execution of tasks without race conditions and keep a thread alive even after a particular task is completed so that it can be reused so that you don’t have to create new thread instances. Also starting the same thread object again raises `IllegalThreadStateException` with a `Thread already started` message.

Once a `HandlerThread` is started, it sets up queuing through a Looper and MessageQueue and waits for incoming messages to process:

```
HandlerThread handlerThread = new HandlerThread("HandlerThread");
handlerThread.start();
 
// Create a handler attached to the HandlerThread's Looper
mHandler = new Handler(handlerThread.getLooper()) {
    @Override
    public void handleMessage(Message msg) {
        // Process messages here
    }
};
 
// Now send messages using mHandler.sendMessage()
```

There’s only one associated MessageQueue on the thread, hence execution is guaranteed to be sequential and therefore thread-safe. Behind the scenes, HandlerThread guarantees no race condition between the Looper creation and sending messages by making `handlerThread.getLooper()` a blocking call until the it is ready to receive messages. This is an important reason why `HandlerThread` should be used over manual setup with `Looper.prepare()`, `Looper.loop()`, `Looper.quit()`, etc.

The [`HandlerThread.onLooperPrepared()`](http://developer.android.com/reference/android/os/HandlerThread.html#onLooperPrepared()) method can be used to execute some sort of setup before the Looper loops, like creating a `Handler` that will be associated with the `HandlerThread`. This method is invoked on the background thread when the Looper is prepared (after the `Looper.prepare()` call).

If you want to prevent access to the `Handler` that is used to pass a data message or a task to a `HandlerThread` and ensure that the Looper is also not accessible, then you can create a separate class with a private `Handler` and public methods that actually does the job of passing messages or tasks. Something like this:

```java
class MyHandlerThread extends HandlerThread {
 
    private Handler mHandler;
 
    public MyHandlerThread() {
        super("MyHandlerThread", Process.THREAD_PRIORITY_BACKGROUND);
    }
 
    @Override
    protected void onLooperPrepared() {
        super.onLooperPrepared();
 
        mHandler = new Handler(getLooper()) {
            @Override
            public void handleMessage(Message msg) {
                switch (msg.what) {
                    case 1:
                        // Handle message
                        break;
                    case 2:
                        // Handle message
                        break;
                }
            }
        };
    }
 
    public void taskOne() {
        mHandler.sendEmptyMessage(1);
    }
 
    public void taskTwo() {
        mHandler.sendEmptyMessage(2);
    }
     
}
```

Pretty straightforward code. Although one important line of code to notice is this – `super("MyHandlerThread", Process.THREAD_PRIORITY_BACKGROUND);`. This `HandlerThread` [constructor](http://developer.android.com/reference/android/os/HandlerThread.html#HandlerThread%28java.lang.String,%20int%29) takes a:

* `name` argument required for debugging purposes so that the thread can be found easily in logs.
* `priority` argument specified via `Process.setThreadPriority()` with values supplied from [`Process`](http://developer.android.com/reference/android/os/Process.html). The default priority is [`Process.THREAD_PRIORITY_DEFAULT`](http://developer.android.com/reference/android/os/Process.html#THREAD_PRIORITY_DEFAULT) (same as that of the UI thread) but can be lowered down to [`Process.THREAD_PRIORITY_BACKGROUND`](http://developer.android.com/reference/android/os/Process.html#THREAD_PRIORITY_BACKGROUND) (less important tasks).

You can go through the HandlerThread source code [here](http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/5.0.0_r1/android/os/HandlerThread.java).

Note: It’s a good idea to quit the HandlerThread when you don’t need it anymore.

## Additional Helpful Resources

* [Slidenerd Presentations on Processes and Threads on Youtube](https://www.youtube.com/playlist?list=PLonJJ3BVjZW6hmkEaYIvLLm5IEGM0kpwU)
* [Pattern-Oriented Software Architectures: Programming Mobile Services for Android Handheld Systems (Coursera Course)](https://www.coursera.org/course/posa)
* [Efficient Android Threading Book](http://www.amazon.com/Efficient-Android-Threading-Asynchronous-Applications/dp/1449364136)
* [Java Concurrency](http://docs.oracle.com/javase/tutorial/essential/concurrency/index.html)

## FQA

### What is the relationship between Looper, Handler and MessageQueue in Android?


A [`Looper`](http://developer.android.com/reference/android/os/Looper.html) is a message handling loop: it reads and processes items from a [`MessageQueue`](http://developer.android.com/reference/android/os/MessageQueue.html). The `Looper` class is usually used in conjunction with a [`HandlerThread`](http://developer.android.com/reference/android/os/HandlerThread.html) (a subclass of `Thread`).

A [`Handler`](http://developer.android.com/reference/android/os/Handler.html) is a utility class that facilitates interacting with a `Looper`—mainly by posting messages and `Runnable` objects to the thread's `MessageQueue`. When a `Handler` is created, it is bound to a specific `Looper` (and associated thread and message queue).

In typical usage, you create and start a `HandlerThread`, then create a `Handler` object (or objects) by which other threads can interact with the `HandlerThread` instance. The `Handler` must be created while running on the `HandlerThread`, although once created there is no restriction on what threads can use the `Handler`'s scheduling methods (`post(Runnable)`, etc.)

The main thread (a.k.a. UI thread) in an Android application is set up as a looper thread before your application is created.

Aside from the class docs, there's a nice discussion of all of this [here](http://mindtherobot.com/blog/159/android-guts-intro-to-loopers-and-handlers/).

## Tutorial

- [Looper](https://developer.android.com/reference/android/os/Looper.html)
- [Communicating with the UI Thread](https://developer.android.com/training/multiple-threads/communicate-ui.html#MoveValues)
- [Android: Looper, Handler, HandlerThread. Part I.](https://blog.nikitaog.me/2014/10/11/android-looper-handler-handlerthread-i/)
- [深入了解Looper、Handler、Message之间关系 - 简书](http://www.jianshu.com/p/36a978b6cacc)
- [android的消息处理机制（图+源码分析）——Looper,Handler,Message - CodingMyWorld](http://www.cnblogs.com/codingmyworld/archive/2011/09/12/2174255.html)
- [Understanding Android Core: Looper, Handler, and HandlerThread](https://medium.com/mindorks/android-core-looper-handler-and-handlerthread-bd54d69fe91a)