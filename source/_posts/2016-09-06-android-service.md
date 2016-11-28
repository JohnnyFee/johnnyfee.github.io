---
layout: post
title: "Android Service"
description: ""
category: Android
tags: [android, service]
typora-copy-images-to: ipic
---

## 服务

See [服务](https://developer.android.com/guide/components/services.html#CreatingStartedService)


Service 是一个可以在后台执行长时间运行操作而不提供用户界面的应用组件。服务可由其他应用组件启动，而且即使用户切换到其他应用，服务仍将在后台继续运行。

组件可以绑定到服务，以与之进行交互，甚至是执行进程间通信 (IPC)。

服务可以处理网络事务、播放音乐，执行文件 I/O 或与内容提供程序交互，而所有这一切均可在后台进行。

服务基本上分为两种形式：

- 启动服务

- 绑定服务

您可以通过清单文件将服务声明为私有服务，并阻止其他应用访问。

**注意：**服务在其托管进程的主线程中运行，它既**不**创建自己的线程，也**不**在单独的进程中运行（除非另行指定）。 这意味着，如果服务将执行任何 CPU 密集型工作或阻止性操作（例如 MP3 播放或联网），则应在服务内创建新线程来完成这项工作。通过使用单独的线程，可以降低发生“应用无响应”(ANR) 错误的风险，而应用的主线程仍可继续专注于运行用户与 Activity 之间的交互。

## 您应使用服务还是线程？

简单地说，服务是一种即使用户未与应用交互也可在后台运行的组件。因此，您应仅在必要时才创建服务。

如需在主线程外部执行工作，不过只是在用户正在与应用交互时才有此需要，则应创建新线程而非服务。

例如，如果您只是想在 Activity 运行的同时播放一些音乐，则可在
`onCreate()` 
中创建线程，在 `onStart()` 中启动线程，然后在 `onStop()` 中停止线程。您还可以考虑使用
`AsyncTask` 或 `HandlerThread` 类。如需了解有关线程的详细信息，请参阅[进程和线程](https://developer.android.com/guide/components/processes-and-threads.html#Threads)文档。

## 声明服务

如同 Activity（以及其他组件）一样，您必须在应用的清单文件中声明所有服务。

要声明服务，请添加 `<service>` 
元素作为 `<application>` 
元素的子元素。例如：

```xml
<manifest ... >
  ...
  <application ... >
      <service android:name=".ExampleService" />
      ...
  </application>
</manifest>
```

为了确保应用的安全性，**请始终使用显式 Intent 启动或绑定 `Service`**，且不要为服务声明 Intent 过滤器。 启动哪个服务存在一定的不确定性，而如果对这种不确定性的考量非常有必要，则可为服务提供 Intent 过滤器并从 `Intent` 中排除相应的组件名称，但随后必须使用 `setPackage()`
方法设置 Intent 的软件包，这样可以充分消除目标服务的不确定性。

您还可将其他属性包括在
`<service>` 
元素中，以定义一些特性，如启动服务及其运行所在进程所需的权限。请参阅
[`<service>`](https://developer.android.com/guide/topics/manifest/service-element.html) 元素参考文档。

- `android:name` 
  属性是唯一必需的属性，用于指定服务的类名。
- [`android:exported`](https://developer.android.com/guide/topics/manifest/service-element.html#exported)
  属性并将其设置为 `"false"`，确保服务仅适用于您的应用。这可以有效阻止其他应用启动您的服务，即便在使用显式 Intent 时也如此。

## 生命周期

服务生命周期（从创建到销毁）可以遵循两条不同的路径：

<img style="float: right;" src="https://developer.android.com/images/service_lifecycle.png" alt="服务生命周期">

### 启动服务

该服务在其他组件调用 `startService()` 时创建，然后无限期运行，且必须通过调用 `stopSelf()` 来自行停止运行。此外，其他组件也可以通过调用 `stopService()` 来停止服务。服务停止后，系统会将其销毁。

### 绑定服务

该服务在另一个组件（客户端）调用 `bindService()` 时创建。然后，客户端通过 `IBinder` 接口与服务进行通信。客户端可以通过调用 `unbindService()` 关闭连接。多个客户端可以绑定到相同服务，而且当所有绑定全部取消后，系统即会销毁该服务。

当服务与所有客户端之间的绑定全部取消时，Android 系统便会销毁服务（除非还使用 `onStartCommand()` 启动了该服务）。因此，如果您的服务是纯粹的绑定服务，则无需对其生命周期进行管理 — Android 系统会根据它是否绑定到任何客户端代您管理。

不过，如果您选择实现 `onStartCommand()` 回调方法，则您必须显式停止服务，因为系统现在已将服务视为_已启动_。在此情况下，服务将一直运行到其通过 `stopSelf()` 自行停止，或其他组件调用 `stopService()` 为止，无论其是否绑定到任何客户端。


<img style="float: left;" src="http://ww4.sinaimg.cn/large/006y8mN6jw1fa72qf8yysj30em0frgn8.jpg" alt="">

Additionally, if your service is started and accepts binding, then when the system calls your `onUnbind()` method, you can optionally return `true` if you would like to receive a call to `onRebind()` the next time a client binds to the service. `onRebind()` returns void, but the client still receives the `IBinder` in its `onServiceConnected()` callback. The following figure illustrates the logic for this kind of lifecycle.

<div style="clear: both;"></div>

### 绑定到已启动服务

正如[服务](https://developer.android.com/guide/components/services.html)文档中所述，您可以创建同时具有已启动和绑定两种状态的服务。 也就是说，可通过调用 `startService()` 启动该服务，让服务无限期运行；此外，还可通过调用 `bindService()` 使客户端绑定到服务。

如果您确实允许服务同时具有已启动和绑定状态，则服务启动后，系统“不会”__在所有客户端都取消绑定时销毁服务。 为此，您必须通过调用 `stopSelf()` 或 `stopService()` 显式停止服务。

尽管您通常应该实现 `onBind()` _或_ `onStartCommand()`，但有时需要同时实现这两者。例如，音乐播放器可能发现让其服务无限期运行并同时提供绑定很有用处。 这样一来，Activity 便可启动服务进行音乐播放，即使用户离开应用，音乐播放也不会停止。 然后，当用户返回应用时，Activity 可绑定到服务，重新获得回放控制权。

### 启动服务 & 绑定服务

启动服务和绑定服务并非完全独立。也就是说，您可以绑定到已经使用 `startService()` 启动的服务。例如，可以通过使用 `Intent`（标识要播放的音乐）调用 `startService()` 来启动后台音乐服务。随后，可能在用户需要稍加控制播放器或获取有关当前播放歌曲的信息时，Activity 可以通过调用 `bindService()` 绑定到服务。在这种情况下，除非所有客户端均取消绑定，否则 `stopService()` 或 `stopSelf()` 不会实际停止服务。

<div style="clear: both; margin-bottom: 30px;"></div>

### 实现生命周期回调

与 Activity 类似，服务也拥有生命周期回调方法，您可以实现这些方法来监控服务状态的变化并适时执行工作。
以下框架服务展示了每种生命周期方法：

```java
public class ExampleService extends Service {
    int mStartMode;       // indicates how to behave if the service is killed
    IBinder mBinder;      // interface for clients that bind
    boolean mAllowRebind; // indicates whether onRebind should be used

    @Override
    public void onCreate() {
        // The service is being created
    }
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        // The service is starting, due to a call to startService()
        return mStartMode;
    }
    @Override
    public IBinder onBind(Intent intent) {
        // A client is binding to the service with bindService()
        return mBinder;
    }
    @Override
    public boolean onUnbind(Intent intent) {
        // All clients have unbound with unbindService()
        return mAllowRebind;
    }
    @Override
    public void onRebind(Intent intent) {
        // A client is binding to the service with bindService(),
        // after onUnbind() has already been called
    }
    @Override
    public void onDestroy() {
        // The service is no longer used and is being destroyed
    }
}
```

> **注：**与 Activity 生命周期回调方法不同，您_不_需要调用这些回调方法的超类实现。

- `onStartCommand()`

    当另一个组件（如 Activity）通过调用 `startService()` 请求启动服务时，系统将调用此方法。一旦执行此方法，服务即会启动并可在后台无限期运行。 如果您实现此方法，则在服务工作完成后，需要由您通过调用 `stopSelf()` 或 `stopService()` 来停止服务。（如果您只想提供绑定，则无需实现此方法。）

- `onBind()`

  当另一个组件想通过调用 `bindService()` 与服务绑定（例如执行 RPC）时，系统将调用此方法。在此方法的实现中，您必须通过返回 `IBinder` 提供一个接口，供客户端用来与服务进行通信。请务必实现此方法，但如果您并不希望允许绑定，则应返回 null。 

- `onCreate()`

  首次创建服务时，系统将调用此方法来执行一次性设置程序（在调用 `onStartCommand()` 或 `onBind()` 之前）。如果服务已在运行，则不会调用此方法。

- `onDestroy()`

  当服务不再使用且将被销毁时，系统将调用此方法。服务应该实现此方法来清理所有资源，如线程、注册的侦听器、接收器等。 这是服务接收的最后一个调用。

通过实现这些方法，您可以监控服务生命周期的两个嵌套循环： 

* 服务的**整个生命周期**从调用 `onCreate()` 开始起，到 `onDestroy()` 返回时结束。与 Activity 类似，服务也在 `onCreate()` 中完成初始设置，并在 `onDestroy()` 中释放所有剩余资源。例如，音乐播放服务可以在 `onCreate()` 中创建用于播放音乐的线程，然后在 `onDestroy()` 中停止该线程。 无论服务是通过 `startService()` 还是 `bindService()` 创建，都会为所有服务调用 `onCreate()` 和 `onDestroy()` 方法。

* 服务的**有效生命周期**从调用 `onStartCommand()` 或 `onBind()` 方法开始。每种方法均有 `Intent` 对象，该对象分别传递到 `startService()` 或 `bindService()`。 对于启动服务，有效生命周期与整个生命周期同时结束（即便是在 `onStartCommand()` 返回之后，服务仍然处于活动状态）。对于绑定服务，有效生命周期在 `onUnbind()` 返回时结束。

  **注：**尽管启动服务是通过调用 `stopSelf()` 或 `stopService()` 来停止，但是该服务并无相应的回调（没有 `onStop()` 回调）。因此，除非服务绑定到客户端，否则在服务停止时，系统会将其销毁 — `onDestroy()` 是接收到的唯一回调。

## 启动服务

启动服务通常是执行单一操作，而且不会将结果返回给调用方。开启者**不能调用**服务里面的方法。例如，它可能通过网络下载或上传文件。

当应用组件（如 Activity）通过调用 `startService()` 启动服务时，服务即处于“启动”状态。一旦启动，服务即可在后台无限期运行，即使启动服务的组件已被销毁也不受影响。

应用组件（如 Activity）可以通过调用 `startService()` 方法并传递 `Intent` 对象（指定服务并包含待使用服务的所有数据）来启动服务。服务通过 `onStartCommand()` 方法接收此 `Intent`。

例如，假设某 Activity 需要将一些数据保存到在线数据库中。该 Activity 可以启动一个协同服务，并通过向 `startService()` 传递一个 Intent，为该服务提供要保存的数据。服务通过 `onStartCommand()` 接收 Intent，连接到互联网并执行数据库事务。事务完成之后，服务会自行停止运行并随即被销毁。

### 创建启动服务

从传统上讲，您可以扩展两个类来创建启动服务：

- Service

    这是适用于所有服务的基类。扩展此类时，必须创建一个用于执行所有服务工作的新线程，因为默认情况下，服务将使用应用的主线程，这会降低应用正在运行的所有 `Activity` 的性能。

- IntentService

  这是 `Service` 的子类，它使用工作线程逐一处理所有启动请求。如果您不要求服务同时处理多个请求，这是最好的选择。 您只需实现 `onHandleIntent()` 方法即可，该方法会接收每个启动请求的 `Intent`，使您能够执行后台工作。

### 扩展 IntentService 类

由于大多数启动服务都不必同时处理多个请求（实际上，这种多线程情况可能很危险），因此使用 `IntentService` 类实现服务也许是最好的选择。

`IntentService` 执行以下操作：

* 创建默认的工作线程，用于在应用的主线程外执行传递给 `onStartCommand()` 的所有 Intent。
* 创建工作队列，用于将 Intent 逐一传递给 `onHandleIntent()` 实现，这样您就永远不必担心多线程问题。 
* 在处理完所有启动请求后停止服务，因此您永远不必调用 `stopSelf()`。
* 提供 `onBind()` 的默认实现（返回 null）。
* 提供 `onStartCommand()` 的默认实现，可将 Intent 依次发送到工作队列和 `onHandleIntent()` 实现。

综上所述，您只需实现 `onHandleIntent()` 来完成客户端提供的工作即可。

以下是 IntentService 的实现示例：

```java
public class HelloIntentService extends IntentService {

  /**
   * A constructor is required, and must call the super IntentService(String)
   * constructor with a name for the worker thread.
   */
  public HelloIntentService() {
      super("HelloIntentService");
  }

  /**
   * The IntentService calls this method from the default worker thread with
   * the intent that started the service. When this method returns, IntentService
   * stops the service, as appropriate.
   */
  @Override
  protected void onHandleIntent(Intent intent) {
      // Normally we would do some work here, like download a file.
      // For our sample, we just sleep for 5 seconds.
      try {
          Thread.sleep(5000);
      } catch (InterruptedException e) {
          // Restore interrupt status.
          Thread.currentThread().interrupt();
      }
  }
}
```

您只需要一个构造函数和一个 `onHandleIntent()` 实现即可。

如果您决定还重写其他回调方法（如 `onCreate()`、`onStartCommand()` 或 `onDestroy()`），请确保调用超类实现，以便 `IntentService` 能够妥善处理工作线程的生命周期。

例如，`onStartCommand()` 必须返回默认实现（即，如何将 Intent 传递给 `onHandleIntent()`）：

```java
@Override
public int onStartCommand(Intent intent, int flags, int startId) {
    Toast.makeText(this, "service starting", Toast.LENGTH_SHORT).show();
    return super.onStartCommand(intent,flags,startId);
}
```

除 `onHandleIntent()` 之外，您无需从中调用超类的唯一方法就是 `onBind()`（仅当服务允许绑定时，才需要实现该方法）。

### 扩展服务类

使用 `IntentService` 显著简化了启动服务的实现。但是，若要求服务执行多线程（而不是通过工作队列处理启动请求），则可扩展 `Service` 类来处理每个 Intent。

为了便于比较，以下提供了 `Service` 类实现的代码示例，该类执行的工作与上述使用 `IntentService` 的示例完全相同。也就是说，对于每个启动请求，它均使用工作线程执行作业，且每次仅处理一个请求。

```java
public class HelloService extends Service {
  private Looper mServiceLooper;
  private ServiceHandler mServiceHandler;

  // Handler that receives messages from the thread
  private final class ServiceHandler extends Handler {
      public ServiceHandler(Looper looper) {
          super(looper);
      }
      @Override
      public void handleMessage(Message msg) {
          // Normally we would do some work here, like download a file.
          // For our sample, we just sleep for 5 seconds.
          try {
              Thread.sleep(5000);
          } catch (InterruptedException e) {
              // Restore interrupt status.
              Thread.currentThread().interrupt();
          }
          // Stop the service using the startId, so that we don't stop
          // the service in the middle of handling another job
          stopSelf(msg.arg1);
      }
  }

  @Override
  public void onCreate() {
    // Start up the thread running the service.  Note that we create a
    // separate thread because the service normally runs in the process's
    // main thread, which we don't want to block.  We also make it
    // background priority so CPU-intensive work will not disrupt our UI.
    HandlerThread thread = new HandlerThread("ServiceStartArguments",
            Process.THREAD_PRIORITY_BACKGROUND);
    thread.start();

    // Get the HandlerThread's Looper and use it for our Handler
    mServiceLooper = thread.getLooper();
    mServiceHandler = new ServiceHandler(mServiceLooper);
  }

  @Override
  public int onStartCommand(Intent intent, int flags, int startId) {
      Toast.makeText(this, "service starting", Toast.LENGTH_SHORT).show();

      // For each start request, send a message to start a job and deliver the
      // start ID so we know which request we're stopping when we finish the job
      Message msg = mServiceHandler.obtainMessage();
      msg.arg1 = startId;
      mServiceHandler.sendMessage(msg);

      // If we get killed, after returning from here, restart
      return START_STICKY;
  }

  @Override
  public IBinder onBind(Intent intent) {
      // We don't provide binding, so return null
      return null;
  }

  @Override
  public void onDestroy() {
    Toast.makeText(this, "service done", Toast.LENGTH_SHORT).show();
  }
}
```

正如您所见，与使用 `IntentService` 相比，这需要执行更多工作。

但是，因为是由您自己处理对 `onStartCommand()` 的每个调用，因此可以同时执行多个请求。此示例并未这样做，但如果您希望如此，则可为每个请求创建一个新线程，然后立即运行这些线程（而不是等待上一个请求完成）。

请注意，`onStartCommand()`
方法必须返回整型数。整型数是一个值，用于描述系统应该如何在服务终止的情况下继续运行服务（如上所述，`IntentService`
的默认实现将为您处理这种情况，不过您可以对其进行修改）。从
`onStartCommand()`
返回的值必须是以下常量之一：

- `START_NOT_STICKY`

    如果系统在 `onStartCommand()` 返回后终止服务，则除非有挂起 Intent 要传递，否则系统不会重建服务。这是最安全的选项，可以避免在不必要时启动服务以及应用能够轻松重启任何未完成的作业。

    The service will not receive a `onStartCommand(Intent, int, int)` call with a null Intent because it will not be re-started if there are no pending Intents to deliver.

    This mode makes sense for things that want to do some work as a result of being started, but can be stopped when under memory pressure and will explicit start themselves again later to do more work. An example of such a service would be one that polls for data from a server: it could schedule an alarm to poll every N minutes by having the alarm start its service. When its `onStartCommand(Intent, int, int)` is called from the alarm, it schedules a new alarm for N minutes later, and spawns a thread to do its networking. If its process is killed while doing that check, the service will not be restarted until the alarm goes off.

- `START_STICKY`

  如果系统在 `onStartCommand()` 返回后终止服务，则会重建服务并调用 `onStartCommand()`，但不会重新传递最后一个 Intent。相反，除非有挂起 Intent 要启动服务（在这种情况下，将传递这些 Intent ），否则系统会通过空 Intent 调用 `onStartCommand()`。这适用于不执行命令、但无限期运行并等待作业的媒体播放器（或类似服务）。

   if this service's process is killed while it is started (after returning from `onStartCommand(Intent, int, int)`), then leave it in the started state but don't retain this delivered intent.  Later the system will try to re-create the service.  Because it is in the started state, it will guarantee to call `onStartCommand(Intent, int, int)` after creating the new service instance; if there are not any pending start commands to be delivered to the service, it will be called with a null intent object, so you must take care to check for this.

   This mode makes sense for things that will be explicitly started and stopped to run for arbitrary periods of time, such as a service performing background music playback.


- `START_REDELIVER_INTENT`

    如果系统在 `onStartCommand()` 返回后终止服务，则会重建服务，并通过传递给服务的最后一个 Intent 调用 `onStartCommand()`。任何挂起的 Intent 均依次传递。这适用于主动执行应该立即恢复的作业（例如下载文件）的服务。 

    if this service's process is killed while it is started (after returning from `onStartCommand(Intent, int, int)`), then it will be scheduled for a restart and the last delivered Intent re-delivered to it again via `onStartCommand(Intent, int, int)`.  This Intent will remain scheduled for redelivery until the service calls `stopSelf(int)` with the start ID provided to `onStartCommand(Intent, int, int)`.  The service will not receive a `onStartCommand(Intent, int, int)` call with a null Intent because it will will only be re-started if it is not finished processing all Intents sent to it (and any such pending events will be delivered at the point of restart).

    This mode makes sense for things that will be explicitly started and stopped to run for arbitrary periods of time, such as a service performing background music playback.

### 启动服务

您可以通过将 `Intent`（指定要启动的服务）传递给 `startService()`，从 Activity 或其他应用组件启动服务。Android 系统调用服务的 `onStartCommand()` 方法，并向其传递 `Intent`。（切勿直接调用 `onStartCommand()`。）

例如，Activity 可以结合使用显式 Intent 与 `startService()`，启动上文中的示例服务 (`HelloService`)：

```
Intent intent = new Intent(this, HelloService.class);
startService(intent);
```

`startService()` 方法将立即返回，且 Android 系统调用服务的 `onStartCommand()` 方法。如果服务尚未运行，则系统会先调用 `onCreate()`，然后再调用 `onStartCommand()`。

多个服务启动请求会导致多次对服务的 `onStartCommand()` 进行相应的调用。但是，要停止服务，只需一个服务停止请求（使用 `stopSelf()` 或 `stopService()`）即可。

### 停止服务

启动服务必须管理自己的生命周期。也就是说，除非系统必须回收内存资源，否则系统不会停止或销毁服务，而且服务在 `onStartCommand()` 返回后会继续运行。因此，服务必须通过调用 `stopSelf()` 自行停止运行，或者由另一个组件通过调用 `stopService()` 来停止它。

一旦请求使用 `stopSelf()` 或 `stopService()` 停止服务，系统就会尽快销毁服务。

但是，如果服务同时处理多个 `onStartCommand()` 请求，则您不应在处理完一个启动请求之后停止服务，因为您可能已经收到了新的启动请求（在第一个请求结束时停止服务会终止第二个请求）。为了避免这一问题，您可以使用 `stopSelf(int)` 确保服务停止请求始终基于最近的启动请求。也就说，在调用 `stopSelf(int)` 时，传递与停止请求的 ID 对应的启动请求的 ID（传递给 `onStartCommand()` 的 `startId`）。然后，如果在您能够调用 `stopSelf(int)` 之前服务收到了新的启动请求，ID 就不匹配，服务也就不会停止。

**注意：**为了避免浪费系统资源和消耗电池电量，应用必须在工作完成之后停止其服务。 如有必要，其他组件可以通过调用 `stopService()` 来停止服务。即使为服务启用了绑定，一旦服务收到对 `onStartCommand()` 的调用，您始终仍须亲自停止服务。

## 绑定服务

See [绑定服务](https://developer.android.com/guide/components/bound-services.html#Binder)

绑定服务是客户端-服务器接口中的服务器。绑定服务可让组件（例如 Activity）绑定到服务、发送请求、接收响应，甚至执行进程间通信 (IPC)。

仅当与另一个应用组件绑定时，绑定服务才会运行。 多个组件可以同时绑定到该服务，但全部取消绑定后，该服务即会被销毁。

绑定服务是 `Service` 类的实现，可让其他应用与其绑定和交互。要提供服务绑定，您必须实现 `onBind()`回调方法。该方法返回的 `IBinder` 对象定义了客户端用来与服务进行交互的编程接口。

客户端可通过调用 `bindService()` 绑定到服务。调用时，它必须提供 `ServiceConnection` 的实现，后者会监控与服务的连接。`bindService()` 方法会立即无值返回，但当 Android 系统创建客户端与服务之间的连接时，会对 `ServiceConnection` 调用 `onServiceConnected()`，向客户端传递用来与服务通信的 `IBinder`。

多个客户端可同时连接到一个服务。不过，只有在第一个客户端绑定时，系统才会调用服务的 `onBind()` 方法来检索 `IBinder`。系统随后无需再次调用 `onBind()`，便可将同一 `IBinder` 传递至任何其他绑定的客户端。

### 创建绑定服务

创建提供绑定的服务时，您必须提供 `IBinder`，用以提供客户端用来与服务进行交互的编程接口。
您可以通过三种方法定义接口：扩展 Binder 类，使用 Messenger，使用 AIDL。

### 扩展 Binder 类

如果您的服务仅供本地应用使用，不需要跨进程工作，则可以实现自有 `Binder` 类，让您的客户端通过该类直接访问服务中的公共方法。

**注**：此方法只有在客户端和服务位于同一应用和进程内这一最常见的情况下方才有效。例如，对于需要将 Activity 绑定到在后台播放音乐的自有服务的音乐应用，此方法非常有效。

以下是具体的设置方法：

1. 在您的服务中，创建一个可满足下列任一要求的 `Binder` 实例：

    * 包含客户端可调用的公共方法
    * 返回当前 `Service` 实例，其中包含客户端可调用的公共方法
    * 或返回由服务承载的其他类的实例，其中包含客户端可调用的公共方法
2. 从 `onBind()` 回调方法返回此 `Binder` 实例。
3. 在客户端中，从 `onServiceConnected()` 回调方法接收
    `Binder`，并使用提供的方法调用绑定服务。

例如，以下这个服务可让客户端通过 `Binder` 实现访问服务中的方法：

```java
public class LocalService extends Service {
    // Binder given to clients
    private final IBinder mBinder = new LocalBinder();
    // Random number generator
    private final Random mGenerator = new Random();

    /**
     * Class used for the client Binder.  Because we know this service always
     * runs in the same process as its clients, we don't need to deal with IPC.
     */
    public class LocalBinder extends Binder {
        LocalService getService() {
            // Return this instance of LocalService so clients can call public methods
            return LocalService.this;
        }
    }

    @Override
    public IBinder onBind(Intent intent) {
        return mBinder;
    }

    /** method for clients */
    public int getRandomNumber() {
      return mGenerator.nextInt(100);
    }
}
```

`LocalBinder` 为客户端提供 `getService()` 方法，以检索 `LocalService`
的当前实例。这样，客户端便可调用服务中的公共方法。
例如，客户端可调用服务中的 `getRandomNumber()`。

点击按钮时，以下这个 Activity 会绑定到 `LocalService` 并调用 `getRandomNumber()`：

```java
public class BindingActivity extends Activity {
    LocalService mService;
    boolean mBound = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
    }

    @Override
    protected void onStart() {
        super.onStart();
        // Bind to LocalService
        Intent intent = new Intent(this, LocalService.class);
        bindService(intent, mConnection, Context.BIND_AUTO_CREATE);
    }

    @Override
    protected void onStop() {
        super.onStop();
        // Unbind from the service
        if (mBound) {
            unbindService(mConnection);
            mBound = false;
        }
    }

    /** Called when a button is clicked (the button in the layout file attaches to
      * this method with the android:onClick attribute) */
    public void onButtonClick(View v) {
        if (mBound) {
            // Call a method from the LocalService.
            // However, if this call were something that might hang, then this request should
            // occur in a separate thread to avoid slowing down the activity performance.
            int num = mService.getRandomNumber();
            Toast.makeText(this, "number: " + num, Toast.LENGTH_SHORT).show();
        }
    }

    /** Defines callbacks for service binding, passed to bindService() */
    private ServiceConnection mConnection = new ServiceConnection() {

        @Override
        public void onServiceConnected(ComponentName className,
                IBinder service) {
            // We've bound to LocalService, cast the IBinder and get LocalService instance
            LocalBinder binder = (LocalBinder) service;
            mService = binder.getService();
            mBound = true;
        }

        @Override
        public void onServiceDisconnected(ComponentName arg0) {
            mBound = false;
        }
    };
}
```

上例说明了客户端如何使用 `ServiceConnection` 的实现和 `onServiceConnected()`
回调绑定到服务。

**注**：在上例中，`onStop()` 方法将客户端与服务取消绑定。客户端应在适当时机与服务取消绑定。

如需查看更多示例代码，请参见 [ApiDemos](https://developer.android.com/resources/samples/ApiDemos/index.html) 中的 [`LocalService.java`](https://android.googlesource.com/platform/development/+/master/samples/ApiDemos/src/com/example/android/apis/app/LocalService.java) 类和 [`LocalServiceActivities.java`](https://android.googlesource.com/platform/development/+/master/samples/ApiDemos/src/com/example/android/apis/app/LocalServiceActivities.java) 类。


### 使用 Messenger

如需让服务与远程进程通信，则可使用 `Messenger` 为您的服务提供接口。利用此方法，您无需使用 AIDL 便可执行进程间通信 (IPC)。

当您需要执行 IPC 时，为您的接口使用 `Messenger` 要比使用 AIDL 实现它更加简单，因为 `Messenger` 会将所有服务调用排入队列，而纯粹的 AIDL 接口会同时向服务发送多个请求，服务随后必须应对多线程处理。对于大多数应用，服务不需要执行多线程处理，因此使用 `Messenger` 可让服务一次处理一个调用。如果您的服务必须执行多线程处理，则应使用 [AIDL](https://developer.android.com/guide/components/aidl.html) 来定义接口。

服务可以这种方式定义对应于不同类型 `Message` 对象的 `Handler`。此 `Handler` 是 `Messenger` 的基础，后者随后可与客户端分享一个 `IBinder`，从而让客户端能利用 `Message` 对象向服务发送命令。此外，客户端还可定义自有 `Messenger`，以便服务回传消息。

这是执行进程间通信 (IPC) 的最简单方法，因为 `Messenger` 会在单一线程中创建包含所有请求的队列，这样您就不必对服务进行线程安全设计。

以下是 `Messenger` 的使用方法摘要：

* 服务实现一个 `Handler`，由其接收来自客户端的每个调用的回调
* `Handler` 用于创建 `Messenger` 对象（对 `Handler` 的引用）
* `Messenger` 创建一个 `IBinder`，服务通过 `onBind()` 使其返回客户端
* 客户端使用 `IBinder` 将 `Messenger`（引用服务的 `Handler`）实例化，然后使用后者将 `Message` 对象发送给服务
* 服务在其 `Handler` 中（具体地讲，是在 `handleMessage()` 方法中）接收每个 `Message`。

这样，客户端并没有调用服务的“方法”。而客户端传递的“消息”（`Message` 对象）是服务在其 `Handler` 中接收的。

以下是一个使用 `Messenger` 接口的简单服务示例：

```java
public class MessengerService extends Service {
    /** Command to the service to display a message */
    static final int MSG_SAY_HELLO = 1;

    /**
     * Handler of incoming messages from clients.
     */
    class IncomingHandler extends Handler {
        @Override
        public void handleMessage(Message msg) {
            switch (msg.what) {
                case MSG_SAY_HELLO:
                    Toast.makeText(getApplicationContext(), "hello!", Toast.LENGTH_SHORT).show();
                    break;
                default:
                    super.handleMessage(msg);
            }
        }
    }

    /**
     * Target we publish for clients to send messages to IncomingHandler.
     */
    final Messenger mMessenger = new Messenger(new IncomingHandler());

    /**
     * When binding to the service, we return an interface to our messenger
     * for sending messages to the service.
     */
    @Override
    public IBinder onBind(Intent intent) {
        Toast.makeText(getApplicationContext(), "binding", Toast.LENGTH_SHORT).show();
        return mMessenger.getBinder();
    }
}
```

请注意，服务就是在 `Handler` 的 `handleMessage()` 方法中接收传入的 `Message`，并根据 `what` 成员决定下一步操作。

客户端只需根据服务返回的 `IBinder` 创建一个 `Messenger`，然后利用 `send()` 发送一条消息。例如，以下就是一个绑定到服务并向服务传递 `MSG_SAY_HELLO` 消息的简单 Activity：

```java
public class ActivityMessenger extends Activity {
    /** Messenger for communicating with the service. */
    Messenger mService = null;

    /** Flag indicating whether we have called bind on the service. */
    boolean mBound;

    /**
     * Class for interacting with the main interface of the service.
     */
    private ServiceConnection mConnection = new ServiceConnection() {
        public void onServiceConnected(ComponentName className, IBinder service) {
            // This is called when the connection with the service has been
            // established, giving us the object we can use to
            // interact with the service.  We are communicating with the
            // service using a Messenger, so here we get a client-side
            // representation of that from the raw IBinder object.
            mService = new Messenger(service);
            mBound = true;
        }

        public void onServiceDisconnected(ComponentName className) {
            // This is called when the connection with the service has been
            // unexpectedly disconnected -- that is, its process crashed.
            mService = null;
            mBound = false;
        }
    };

    public void sayHello(View v) {
        if (!mBound) return;
        // Create and send a message to the service, using a supported 'what' value
        Message msg = Message.obtain(null, MessengerService.MSG_SAY_HELLO, 0, 0);
        try {
            mService.send(msg);
        } catch (RemoteException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
    }

    @Override
    protected void onStart() {
        super.onStart();
        // Bind to the service
        bindService(new Intent(this, MessengerService.class), mConnection,
            Context.BIND_AUTO_CREATE);
    }

    @Override
    protected void onStop() {
        super.onStop();
        // Unbind from the service
        if (mBound) {
            unbindService(mConnection);
            mBound = false;
        }
    }
}
```

请注意，此示例并未说明服务如何对客户端作出响应。如果您想让服务作出响应，则还需要在客户端中创建一个 `Messenger`。然后，当客户端收到 `onServiceConnected()` 回调时，会向服务发送一条 `Message`，并在其 `send()` 方法的 `replyTo` 参数中包含客户端的 `Messenger`。

如需查看如何提供双向消息传递的示例，请参阅 [`MessengerService.java`](https://android.googlesource.com/platform/development/+/master/samples/ApiDemos/src/com/example/android/apis/app/MessengerService.java)（服务）和 [`MessengerServiceActivities.java`](https://github.com/android/platform_development/blob/master/samples/ApiDemos/src/com/example/android/apis/app/MessengerServiceActivities.java)（客户端）示例。

### 使用 AIDL

See [Android 接口定义语言 (AIDL)](https://developer.android.com/guide/components/aidl.html)

AIDL（Android 接口定义语言）执行所有将对象分解成原语的工作，操作系统可以识别这些原语并将它们编组到各进程中，以执行 IPC。

之前采用 `Messenger` 的方法实际上是以 AIDL 作为其底层结构。 如上所述，`Messenger` 会在单一线程中创建包含所有客户端请求的队列，以便服务一次接收一个请求。 不过，如果您想让服务同时处理多个请求，则可直接使用 AIDL。 在此情况下，您的服务必须具备多线程处理能力，并采用线程安全式设计。

如需直接使用 AIDL，您必须创建一个定义编程接口的 `.aidl` 文件。Android SDK 工具利用该文件生成一个实现接口并处理 IPC 的抽象类，您随后可在服务内对其进行扩展。

**注**：大多数应用“都不会”****使用
AIDL 来创建绑定服务，因为它可能要求具备多线程处理能力，并可能导致实现的复杂性增加。因此，AIDL 并不适合大多数应用，本文也不会阐述如何将其用于您的服务。如果您确定自己需要直接使用 AIDL，请参阅 [AIDL](https://developer.android.com/guide/components/aidl.html) 文档。

### 绑定到服务

应用组件（客户端）可通过调用 `bindService()` 绑定到服务。Android 系统随后调用服务的 `onBind()` 方法，该方法返回用于与服务交互的 `IBinder`。

绑定是异步的。`bindService()` 会立即返回，“不会”__使 `IBinder` 返回客户端。要接收 `IBinder`，客户端必须创建一个 `ServiceConnection` 实例，并将其传递给 `bindService()`。`ServiceConnection` 包括一个回调方法，系统通过调用它来传递 `IBinder`。

**注**：只有 Activity、服务和内容提供程序可以绑定到服务 — 您**无法**从广播接收器绑定到服务。

因此，要想从您的客户端绑定到服务，您必须： 

1.  实现 `ServiceConnection`。

    您的实现必须重写两个回调方法：

    - `onServiceConnected()` 系统会调用该方法以传递服务的　onBind() 方法返回的 IBinder。 
    - `onServiceDisconnected()` 系统会在与服务的连接意外中断时（例如当服务崩溃或被终止时）调用该方法。当客户端取消绑定时，系统“不会”__调用该方法。</dd>

2.  调用 `bindService()`，传递 `ServiceConnection` 实现。 
3.  当系统调用您的 `onServiceConnected()` 回调方法时，您可以使用接口定义的方法开始调用服务。
4.  要断开与服务的连接，请调用 `unbindService()`。

    如果应用在客户端仍绑定到服务时销毁客户端，则销毁会导致客户端取消绑定。 更好的做法是在客户端与服务交互完成后立即取消绑定客户端。 这样可以关闭空闲服务。

例如，以下代码段将客户端与上面创建的服务相连，它只需将返回的 `IBinder` 转换为 `LocalService` 类：

```java
LocalService mService;
private ServiceConnection mConnection = new ServiceConnection() {
    // Called when the connection with the service is established
    public void onServiceConnected(ComponentName className, IBinder service) {
        // Because we have bound to an explicit
        // service that is running in our own process, we can
        // cast its IBinder to a concrete class and directly access it.
        LocalBinder binder = (LocalBinder) service;
        mService = binder.getService();
        mBound = true;
    }

    // Called when the connection with the service disconnects unexpectedly
    public void onServiceDisconnected(ComponentName className) {
        Log.e(TAG, "onServiceDisconnected");
        mBound = false;
    }
};
```

客户端可通过将此 `ServiceConnection` 传递至 `bindService()` 绑定到服务。例如：

```java
Intent intent = new Intent(this, LocalService.class);
bindService(intent, mConnection, Context.BIND_AUTO_CREATE);
```

`bindService()` 参数说明：

* 第一个参数是一个 `Intent`，用于显式命名要绑定的服务（但 Intent 可能是隐式的）
* 第二个参数是 `ServiceConnection` 对象
* 第三个参数是一个指示绑定选项的标志。它通常应该是 `BIND_AUTO_CREATE`，以便创建尚未激活的服务。其他可能的值为 `BIND_DEBUG_UNBIND` 和 `BIND_NOT_FOREGROUND`，或 `0`（表示无）。

以下是一些有关绑定到服务的重要说明：

* 您应该始终捕获 `DeadObjectException` 异常，它们是在连接中断时引发的。这是远程方法引发的唯一异常。 
* 对象是跨进程计数的引用。
* 您通常应该在客户端生命周期的匹配引入 (bring-up) 和退出 (tear-down) 时刻期间配对绑定和取消绑定。 例如：
* 如果您只需要在 Activity 可见时与服务交互，则应在 `onStart()` 期间绑定，在 `onStop()` 期间取消绑定。
* 如果您希望 Activity 在后台停止运行状态下仍可接收响应，则可在 `onCreate()` 期间绑定，在 `onDestroy()` 期间取消绑定。请注意，这意味着您的 Activity 在其整个运行过程中（甚至包括后台运行期间）都需要使用服务，因此如果服务位于其他进程内，那么当您提高该进程的权重时，系统终止该进程的可能性会增加。

  **注**：通常情况下，**切勿**在 Activity 的 `onResume()`
  和 `onPause()`
  期间绑定和取消绑定，因为每一次生命周期转换都会发生这些回调，您应该使发生在这些转换期间的处理保持在最低水平。此外，如果您的应用内的多个 Activity 绑定到同一服务，并且其中两个 Activity 之间发生了转换，则如果当前 Activity 在下一个 Activity 绑定（恢复期间）之前取消绑定（暂停期间），系统可能会销毁服务并重建服务。
  （[Activity](https://developer.android.com/guide/components/activities.html#CoordinatingActivities)文档中介绍了这种有关 Activity 如何协调其生命周期的 Activity 转换。）

如需查看更多显示如何绑定到服务的示例代码，请参阅 [ApiDemos](https://developer.android.com/resources/samples/ApiDemos/index.html) 中的 [`RemoteService.java`](https://developer.android.com/resources/samples/ApiDemos/src/com/example/android/apis/app/RemoteService.html) 类。

## 向用户发送通知

一旦运行起来，服务即可使用 [Toast 通知](https://developer.android.com/guide/topics/ui/notifiers/toasts.html)或[状态栏通知](https://developer.android.com/guide/topics/ui/notifiers/notifications.html)来通知用户所发生的事件。

Toast 通知是指出现在当前窗口的表面、片刻随即消失不见的消息，而状态栏通知则在状态栏中随消息一起提供图标，用户可以选择该图标来采取操作（例如启动 Activity）。

通常，当某些后台工作已经完成（例如文件下载完成）且用户现在可以对其进行操作时，状态栏通知是最佳方法。
当用户从展开视图中选定通知时，通知即可启动 Activity（例如查看已下载的文件）。

如需了解详细信息，请参阅
[Toast 通知](https://developer.android.com/guide/topics/ui/notifiers/toasts.html)或[状态栏通知](https://developer.android.com/guide/topics/ui/notifiers/notifications.html)开发者指南。

## 在前台运行服务

前台服务被认为是用户主动意识到的一种服务，因此在内存不足时，系统也不会考虑将其终止。
前台服务必须为状态栏提供通知，放在“正在进行”标题下方，这意味着除非服务停止或从前台移除，否则不能清除通知。

例如，应该将通过服务播放音乐的音乐播放器设置为在前台运行，这是因为用户明确意识到其操作。
状态栏中的通知可能表示正在播放的歌曲，并允许用户启动 Activity 来与音乐播放器进行交互。

要请求让服务运行于前台，请调用 `startForeground()`。此方法采用两个参数：唯一标识通知的整型数和状态栏的 `Notification`。例如：

```java
Notification notification = new Notification(R.drawable.icon, getText(R.string.ticker_text), System.currentTimeMillis());

Intent notificationIntent = new Intent(this, ExampleActivity.class);
PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, notificationIntent, 0);

notification.setLatestEventInfo(this, getText(R.string.notification_title),
        getText(R.string.notification_message), pendingIntent);
startForeground(ONGOING_NOTIFICATION_ID, notification);
```

**注意：**提供给 `startForeground()` 的整型 ID 不得为 0。

要从前台移除服务，请调用 `stopForeground()`。此方法采用一个布尔值，指示是否也移除状态栏通知。
此方法_不会_停止服务。
但是，如果您在服务正在前台运行时将其停止，则通知也会被移除。

如需了解有关通知的详细信息，请参阅[创建状态栏通知](https://developer.android.com/guide/topics/ui/notifiers/notifications.html)。

## Examples

- [Android通过startService播放背景音乐简单示例](http://blog.csdn.net/iispring/article/details/47764607)
- [Android通过startService实现批量下载示例](http://blog.csdn.net/iispring/article/details/48015475)