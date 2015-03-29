layout: post
title: "Html5 Storage —— IndexedDB"
description: ""
category: HTML5
tags: [html5, storage, indexeddb]
---

This API is available in the underlying WebView. Indexed DB offers more features than LocalStorage but fewer than WebSQL.

IndexedDB是基于简单的平面文件（flat-file）数据库，采用了分层的键值存储（key/value persistence）和基本的索引。

So far, we have seen that Web Storage and Web SQL Database both have major strengths as well as major weaknesses. [Indexed Database](http://www.w3.org/TR/IndexedDB/) has arisen from experiences with both of those earlier APIs, and can be seen as an attempt to combine their strengths without incurring their weaknesses.

An Indexed Database is a collection of "object stores" which you can just drop objects into. The stores are something like SQL tables, but in this case, there's no constraints on the object structure and so no need to define anything upfront. So this is similar to Web Storage, with the advantage that you can have as many databases as you like, and as many stores within each database. But unlike Web Storage, there are important performance benefits: An asynchronous API, and you can create indexes on stores to improve search speed.

优点：

1.  Good performance generally, being an asynchronous API. Database interaction won't lock up the user interface. (Synchronous API is also available for WebWorkers.)
2.  Good search performance, since data can be indexed according to search keys.
3.  Supports versioning.
4.  Robust, since it supports a [transactional database model](http://en.wikipedia.org/wiki/Database_transaction).
5.  Fairly easy learning curve, due to a simple data model.
6.  Decent browser support: Chrome, Firefox, mobile FF, IE10.

缺点：

1.  Very complex API resulting in large amounts of nested callbacks.

See [Introduction to IndexedDB: The In-Browser Database](http://www.codemag.com/Article/1411041)

## API

1.  [`IDBFactory`](https://developer.mozilla.org/en-US/docs/IndexedDB/IDBFactory) 提供了对数据库的访问。这是由全局对象 `indexedDB` 实现的接口，因而也是该 API 的入口。
2.  [`IDBCursor`](https://developer.mozilla.org/en-US/docs/IndexedDB/IDBCursor) 遍历对象存储空间和索引。
3.  [`IDBCursorWithValue`](https://developer.mozilla.org/en-US/docs/IndexedDB/IDBCursorWithValue) 遍历对象存储空间和索引并返回游标的当前值。
4.  [`IDBDatabase`](https://developer.mozilla.org/en-US/docs/IndexedDB/IDBDatabase) 表示到数据库的连接。只能通过这个连接来拿到一个数据库事务。
5.  [`IDBEnvironment`](https://developer.mozilla.org/en-US/docs/IndexedDB/IDBEnvironment) 提供了到客户端数据库的访问。它由 [window](https://developer.mozilla.org/en-US/docs/DOM/window) 对象实现。
6.  [`IDBIndex`](https://developer.mozilla.org/en-US/docs/IndexedDB/IDBIndex) 提供了到索引元数据的访问。
7.  [`IDBKeyRange`](https://developer.mozilla.org/en-US/docs/IndexedDB/IDBKeyRange)` 定义键的范围。
8.  [`IDBObjectStore`](https://developer.mozilla.org/en-US/docs/IndexedDB/IDBObjectStore) 表示一个对象存储空间。
9.  [`IDBOpenDBRequest`](https://developer.mozilla.org/en-US/docs/IndexedDB/IDBOpenDBRequest) 表示一个打开数据库的请求。
10.  [`IDBRequest`](https://developer.mozilla.org/en-US/docs/IndexedDB/IDBRequest) 提供了到数据库异步请求结果和数据库的访问。这也是在你调用一个异步方法时所得到的。
11.  [`IDBTransaction`](https://developer.mozilla.org/en-US/docs/IndexedDB/IDBTransaction) 表示一个事务。你在数据库上创建一个事务，指定它的范围（例如你希望访问哪一个对象存储空间），并确定你希望的访问类型（只读或写入）。
12.  [`IDBVersionChangeEvent`](https://developer.mozilla.org/en-US/docs/IndexedDB/IDBVersionChangeEvent) 表明数据库的版本号已经改变。

See [IndexedDB - Web API 接口](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)

IndexedDB 鼓励使用的基本模式如下所示：

1.  打开数据库并且开始一个事务。
2.  创建一个 object store。
3.  构建一个请求来执行一些数据库操作，像增加或提取数据等。
4.  通过监听正确类型的 DOM 事件以等待操作完成。
5.  在操作结果上进行一些操作（可以在 request 对象中找到）

## 判断浏览器是否支持 IndexedDB

```js
if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")
}
```

## 打开数据库

    var request = window.indexedDB.open("MyTestDatabase");

`indexedDB` 对象只有一个单一方法，`open()`， 当这个方法被调用时，打开名为 "MyTestDatabase"的数据库。如果该数据库不存在，则会被创建；如果已经存在，则被打开。`open()` 的第二个参数为版本号，是可选的，默认版本号为 1：

    var request = indexedDB.open("MyTestDatabase", 3);

在IndexedDB大部分操作是请求——响应的模式。`open` 函数的结果是一个 `IDBOpenDatabase` 对象的实例。这条指令请求的响应 `request.result` 是一个 `IDBDatabase` 对象，即 `indexedDB` 对象。

除了result，`IDBOpenDBRequest` 接口定义了几个重要属性

* `onerror`: 请求失败的回调函数句柄
* `onsuccess`: 请求成功的回调函数句柄
* `onupgradeneeded`: 请求数据库版本变化句柄

```js
var db;
var request = indexedDB.open("MyTestDatabase");
request.onerror = function(event) {
  alert("Why didn't you allow my web app to use IndexedDB?!");
};
request.onsuccess = function(event) {
  db = request.result;
};
```

在打开数据库时常见的可能出现的错误之一是 `VER_ERR`。这表明存储在磁盘上的数据库的版本高于你试图打开的版本。这是一种必须要被错误处理程序处理的一种出错情况。

## 关闭与删除数据库

关闭数据库可以直接调用数据库对象的 `close` 方法，删除数据库使用 indexedDB 对象的 `deleteDatabase` 方法。

```js
db.close();
indexedDB.deleteDatabase(name);
```

## 创建和更新数据库版本号

要更新数据库的 schema，也就是创建或者删除对象存储空间，需要实现 `onupgradeneeded` 处理程序，这个处理程序将会作为一个允许你处理对象存储空间的 `versionchange` 事务的一部分被调用。

```js
// 该事件仅在较新的浏览器中被实现
request.onupgradeneeded = function(event) { 
   // 更新对象存储空间和索引 .... 
};
```

在数据库第一次被打开时或者当指定的版本号高于当前被持久化的数据库的版本号时，这个 versionchange 事务将被创建。

版本号是一个 unsigned long long 数字，这意味着它可以是一个非常大的整数。

__当一个 web app 在另一个标签页中被打开时的版本变更：__

当你的 web app 在这样一种方式下改变你的数据库时碰到被要求进行版本变化，你需要考虑如果用户已经在一个标签页中打开了你的应用的旧版本的数据库，然后他又在另一个标签页中加载了你的应用的新版本，这种情况下会发生什么事情。当你带着比数据库实际版本更高的版本号调用 `open()` 时，所有其他打开的数据库必须在你开始实际对数据库进行修改之前显式通知这个请求。这里是它如何工作的：

```js
var openReq = mozIndexedDB.open("MyTestDatabase", 2);

openReq.onblocked = function(event) {
  // 如果其他标签页已经加载了这个数据库，那么
  // 在我们可以继续处理之前它需要被关闭。
  alert("Please close all other tabs with this site open!");
};
  
openReq.onupgradeneeded = function(event) {
  // 所有其它数据库都已经被关掉了。Set everything up.
  db.createObjectStore(/* ... */);
  useDatabase(db);
}  
  
openReq.onsuccess = function(event) {
  var db = event.target.result;
  useDatabase(db);
  return;
}

function useDatabase(db) {
  // 确保添加一个如果另一个页面请求一个版本变化时来被通知的处理程序。
  // 我们必须关闭这个数据库。这就允许其他页面对数据库进行升级。
  // 如果你不这么做的话，除非用户关闭标签页否则升级就不会发生。
  db.onversionchange = function(event) {
    db.close();
    alert("A new version of this page is ready. Please reload!");
  };

  // 其他针对数据库的处理
}
```

## 构建数据库

现在来构建数据库。IndexedDB 使用对象存储空间而不是表，并且一个单独的数据库可以包含任意数量的对象存储空间。每当一个值被存储进一个对象存储空间时，它会被和一个键相关联。键的提供可以有几种不同的方法，这取决于对象存储空间是使用 [key path](https://developer.mozilla.org/en/IndexedDB#gloss_key_path) 还是 [key generator](https://developer.mozilla.org/en/IndexedDB#gloss_key_generator)。

下面的表格显示了几种不同的提供键的方法。

Key Path | Key Generator | Description                                                                                                      
--------| -------------| -----
No       | No            | 这种对象存储空间可以持有任意类型的值，甚至是像数字和字符串这种基本数据类型的值。每当我们想要增加一个新值的时候，必须提供一个单独的键参数。                                            
Yes      | No            | 这种对象存储空间只能持有 JavaScript 对象。这些对象必须具有一个和 key path 同名的属性。                                                           
No       | Yes           | 这种对象存储空间可以持有任意类型的值。键会为我们自动生成，或者如果你想要使用一个特定键的话你可以提供一个单独的键参数。                                                      
Yes      | Yes           | 这种对象存储空间只能持有 JavaScript 对象。通常一个键被生成的同时，生成的键的值被存储在对象中的一个和 key path 同名的属性中。然而，如果这样的一个属性已经存在的话，这个属性的值被用作键而不会生成一个新的键。

你也可以使用对象存储空间持有的对象，不是基本数据类型，在任何对象存储空间上创建索引。索引可以让你使用被存储的对象的属性的值来查找存储在对象存储空间的值，而不是用对象的键来查找。

此外，索引具有对存储的数据执行简单限制的能力。通过在创建索引时设置 unique 标记，索引可以确保不会有两个具有同样索引 key path 值的对象被储存。因此，举例来说，如果你有一个用于持有一组 people 的对象存储空间，并且你想要确保不会有两个拥有同样 email 地址的 people，你可以使用一个带有 unique 标识的索引来确保这些。

这听起来可能有点混乱，但下面这个简单的例子应该可以演示这些个概念：

```js
// 我们的客户数据看起来像这样。
const customerData = [
  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
];
const dbName = "the_name";

var request = indexedDB.open(dbName, 2);

request.onerror = function(event) {
  // 错误处理程序在这里。
};
request.onupgradeneeded = function(event) {
  var db = event.target.result;

  // 创建一个对象存储空间来持有有关我们客户的信息。
  // 我们将使用 "ssn" 作为我们的 key path 因为它保证是唯一的。
  var objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

  // 创建一个索引来通过 name 搜索客户。
  // 可能会有重复的，因此我们不能使用 unique 索引。
  objectStore.createIndex("name", "name", { unique: false });

  // 创建一个索引来通过 email 搜索客户。
  // 我们希望确保不会有两个客户使用相同的 email 地址，因此我们使用一个 unique 索引。
  objectStore.createIndex("email", "email", { unique: true });

  // 在新创建的对象存储空间中保存值
  for (var i in customerData) {
    objectStore.add(customerData[i]);
  }
};
```

正如前面提到的，`onupgradeneeded` 是我们唯一可以修改数据库结构的地方。在这里面，我们可以创建和删除对象存储空间以及构建和删除索引。

<div>  对象存储空间仅调用 `createObjectStore()` 就可以创建。这个方法使用存储空间的名称，和一个对象参数。即便这个参数对象是可选的，它还是非常重要的，因为它可以让你定义重要的可选属性和完善你希望创建的对象存储空间的类型。在我们的示例中，我们请求了一个名为“customers” 的对象存储空间并且定义了一个 使得存储空间中每个单独的对象都是唯一的属性作为 key path。在这个示例中的属性是 “ssn”，因为社会安全号码被确保是唯一的。被存储在对象存储空间中的所有对象都必须存在“ssn”。 </div>

我们也请求了一个名为 “name” 的着眼于存储的对象的 `name` 属性的索引。如同 `createObjectStore()`，`createIndex()` 使用了一个完善了我们希望创建的索引类型的可选的 `options` 对象。添加一个不带 `name` 属性的对象也会成功，但是这个对象不会出现在 "name" 索引中。

我们现在可以使用存储的用户对象的 `ssn` 直接从对象存储空间中把它们提取出来，或者通过使用索引来使用他们的 name 进行提取。要了解这些是如何实现的，请参见 [使用索引](https://developer.mozilla.org/en/IndexedDB/Using_IndexedDB#Using_an_index) 章节。

__Using a key generator:__

Setting up an `autoIncrement `flag when creating the object store would enable the key generator for that object store. By default this flag is not set.

With the key generator, the key would be generated automatically as you add the value to the object store. The current number of a key generator is always set to 1 when the object store for that key generator is first created. Basically the newly auto-generated key is increased by 1 based on the previous key. The current number for a key generator never decreases, other than as a result of database operations being reverted, for example, the database transaction is aborted. Therefore deleting a record or even clearing all records from an object store never affects the object store's key generator.

We can create another object store with the key generator as below:

```js
// Open the indexedDB.
var request = indexedDB.open(dbName, 3);

request.onupgradeneeded = function (event) {

    var db = event.target.result;

    // Create another object store called "names" with the autoIncrement flag set as true.    
    var objStore = db.createObjectStore("names", { autoIncrement : true });

    // Because the "names" object store has the key generator, the key for the name value is generated automatically.
    // The added records would be like:
    // key : 1 => value : "Bill"
    // key : 2 => value : "Donna"
    for (var i in customerData) {
        objStore.add(customerData[i].name);
    }
}
```


## 事务

在你可以对新数据库做任何事情之前，你需要开始一个事务。事务来自于数据库对象，而且你必须指定你想让这个事务跨越哪些对象存储空间。另外，你需要决定你是否将要对数据库进行更改或者你只是需要从它里面进行读取。虽然事务具有三种模式（只读，读写，和版本变更），在可以的情况下你最好还是使用只读事务，因为它们可以并发运行。

```js
var transaction = db.transaction(["customers"], IDBTransaction.READ_WRITE);
```

`transaction()` 方法接受三个参数（虽然两个是可选的）并返回一个事务对象。第一个参数是事务希望跨越的对象存储空间的列表。如果你希望事务能够跨越所有的对象存储空间你可以传入一个空数组。如果你没有为第二个参数指定任何内容，你得到的是只读事务。因为这里我们是想要写入所以我们需要传入 `"readwrite"` 标识。

现在我们已经有了一个事务，我们需要理解它的生命周期。事务和事件循环的联系非常密切。如果你创建了一个事务但是并没有使用它就返回给事件循环，那么事务将变得无效。保持事务活跃的唯一方法就是在其上构建一个请求。当请求完成时你将会得到一个 DOM 事件，并且，假设请求成功了，你将会有另外一个机会在回调中来延长这个事务。如果你没有延长事务就返回到了事件循环，那么事务将会变得不活跃，依此类推。只要还有待处理的请求事务就会保持活跃。事务生命周期真的很简单但是可能需要一点时间你才能对它变得习惯。还有就是来几个例子也会有所帮助。如果你开始看到 `TRANSACTION_INACTIVE_ERR` 错误代码，那么你已经把某些事情搞乱了。

事务可以接收三种不同类型的 DOM 事件： `error`，`abort`，以及` complete`。我们已经讨论过 `error`事件冒泡，所以一个事务要接收所有可能产生错误事件的请求所产生的错误事件。更微妙的一点是一个 error 的默认行为是终止发生错误的事务。除非你在 error 事件上通过调用 `preventDefault()` 处理了这个错误，整个事务被回滚了。这样的设计迫使你去思考和处理错误，但是如果细粒度的错误处理太过繁琐的话，你也可以总是对数据库添加一个总的错误处理程序。如果你不处理一个错误事件或者你在事务中调用 `abort()`，那么事务被回滚并且有关事物的一个 `abort` 事件被触发。否则，在所有的未处理请求都完成后，你将得到一个 `complete` 事件。如果你正在做大量的数据库操作，那么追踪事务而不是单个的请求当然可以帮助你进行决断。

## 添加数据

现在你有了一个事务了，你将需要从它拿到一个对象存储空间。事务只能让你拿到一个你在创建事务时已经指定过的对象存储空间。然后你可以增加你需要的所有数据。

```js
// 当所有的数据都被增加到数据库时执行一些操作
transaction.oncomplete = function(event) {
  alert("All done!");
};

transaction.onerror = function(event) {
  // 不要忘记进行错误处理！
};

var objectStore = transaction.objectStore("customers");
for (var i in customerData) {
  var request = objectStore.add(customerData[i]);
  request.onsuccess = function(event) {
    // event.target.result == customerData[i].ssn
  };
}
```

## Updating an entry in the database

Now we've retrieved some data, updating it and inserting it back into the IndexedDB is pretty simple. Let's update the previous example somewhat:

```js
var objectStore = db.transaction(["customers"], "readwrite").objectStore("customers");
var request = objectStore.get("444-44-4444");
request.onerror = function(event) {
  // Handle errors!
};
request.onsuccess = function(event) {
  // Get the old value that we want to update
  var data = request.result;
  
  // update the value(s) in the object that you want to change
  data.age = 42;

  // Put this updated object back into the database.
  var requestUpdate = objectStore.put(data);
   requestUpdate.onerror = function(event) {
     // Do something with the error
   };
   requestUpdate.onsuccess = function(event) {
     // Success - the data is updated!
   };
};
```

So here we're creating an `objectStore` and requesting a customer record out of it, identified by its ssn value (`444-44-4444`). We then put the result of that request in a variable (`data`), update the `age` property of this object, then create a second request (`requestUpdate`) to put the customer record back into the `objectStore`, overwriting the previous value.

## 删除数据

```js
var request = db.transaction(["customers"], "readwrite")
                .objectStore("customers")
                .delete("444-44-4444");
request.onsuccess = function(event) {
  // 删除数据成功！
};
```

## 获取数据

```js
var transaction = db.transaction(["customers"]);
var objectStore = transaction.objectStore("customers");
var request = objectStore.get("444-44-4444");
request.onerror = function(event) {
  // 错误处理!
};
request.onsuccess = function(event) {
  // 对 request.result 做些操作！
  alert("Name for SSN 444-44-4444 is " + request.result.name);
};
```

对于一个“简单”的提取这里的代码有点多了。下面看我们怎么把它再缩短一点，假设你在数据库的级别上来进行的错误处理：

```js
db.transaction("customers").objectStore("customers").get("444-44-4444").onsuccess = function(event) {
  alert("Name for SSN 444-44-4444 is " + event.target.result.name);
};
```

这是如何工作的呢？由于只有一个对象存储空间，你可以避免传入一个在你的事务中需要的对象存储空间的列表，而只是作为一个字符串把名字传入即可。同样，你只是在从数据库读取数据，所以你不需要一个 `"readwrite"`事务。调用一个没有指定模式的 `transaction()`将给你一个 `"readonly"`事务。这里的另外一个微妙之处在于你实际上不需要保存请求对象到一个变量。因为 DOM 事件把这个请求作为它的 target，你可以使用 event 来得到 `result` 属性。

## 使用游标

使用 `get()` 要求你知道你想要检索哪一个键。如果你想要遍历对象存储空间中的所有值，那么你可以使用游标。看起来会像下面这样：

```js
var objectStore = db.transaction("customers").objectStore("customers");

objectStore.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    alert("Name for SSN " + cursor.key + " is " + cursor.value.name);
    cursor.continue();
  }
  else {
    alert("No more entries!");
  }
};
```

`openCursor()` 函数需要几个参数。首先，你可以使用一个 key range 对象来限制被检索的项目的范围。第二，你可以指定你希望进行迭代的方向。在上面的示例中，我们在以升序迭代所有的对象。游标成功的回调有点特别。游标对象本身是请求的 `result` （上面我们使用的是简写形式，所以是 `event.target.result`）。然后实际的 key 和 value 可以根据游标对象的 `key` 和 `value` 属性被找到。如果你想要保持继续前行，那么你必须调用游标上的 `continue()` 。当你已经到达数据的末尾时（或者没有匹配 `openCursor()` 请求的条目）你仍然会得到一个成功回调，但是 `result` 属性是 `undefined。`

使用游标的一种常见模式是提取出在一个对象存储空间中的所有对象然后把它们添加到一个数组中，像这样：

```js
var customers = [];

objectStore.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    customers.push(cursor.value);
    cursor.continue();
  }
  else {
    alert("Got all customers: " + customers);
  }
};
```

Mozilla 也已经实现了 `getAll()`来处理这种情况。它不是 IndexedDB 标准的一部分，所以它未来可能会消失。我们已经把它包含在这里是因为我们觉得它比较有用。下面的代码实现的是跟上面同样的事情：

```js
objectStore.getAll().onsuccess = function(event) {
  alert("Got all customers: " + event.target.result);
};
```

查找游标的 `value`属性会引起相关的性能损耗，因为对象是被延迟创建的。当使用 `getAll()` 时，Gecko 必须立即创建所有的对象。如果你仅是对检索每个键感兴趣，举个例子，使用游标比使用 `getAll()`要高效的多。如果你试图获得一个对象存储空间内所有对象的一个数组，那么，使用` getAll()`。

## 使用索引

使用 SSN 作为键来存储客户数据是合理的，因为 SSN 唯一地标识了一个个体（对隐私来说这是否是一个好的想法是另外一个话题，不在本文的讨论范围内）。如果你想要通过姓名来查找一个客户，那么，你将需要在数据库中迭代所有的 SSN 直到你找到正确的那个。以这种方式来查找将会非常的慢，相反你可以使用索引。

```js
var index = objectStore.index("name");
index.get("Donna").onsuccess = function(event) {
  alert("Donna's SSN is " + event.target.result.ssn);
};
```

“name” 游标不是唯一的，因此 `name` 被设成 `"Donna"` 的记录可能不止一条。在这种情况下，你总是得到键值最小的那个。

如果你需要访问带有给定 `name` 的所有的记录你可以使用一个游标。你可以在索引上打开两个不同类型的游标。一个常规游标映射索引属性到对象存储空间中的对象。一个键索引映射索引属性到用来存储对象存储空间中的对象的键。不同之处被展示如下：

```
index.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    // cursor.key 是一个 name, 就像 "Bill", 然后 cursor.value 是整个对象。
    alert("Name: " + cursor.key + ", SSN: " + cursor.value.ssn + ", email: " + cursor.value.email);
    cursor.continue();
  }
};

index.openKeyCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    // cursor.key is 一个 name, 就像 "Bill", 然后 cursor.value 是那个 SSN。
    // 没有办法可以得到存储对象的其余部分。
    alert("Name: " + cursor.key + ", "SSN: " + cursor.value);
    cursor.continue();
  }
};
```

__指定游标的范围和方向:__

如果你想要限定你在游标中看到的值的范围，你可以使用一个 key range 对象然后把它作为第一个参数传给 openCursor() 或是 openKeyCursor()。你可以构造一个只允许一个单一 key 的 key range，或者一个具有下限或上限，或者一个既有上限也有下限。边界可以是闭合的（也就是说 key range 包含给定的值）或者是“开放的”（也就是说 key range 不包括给定的值）。

```js
// 只匹配 "Donna"
var singleKeyRange = IDBKeyRange.only("Donna");

// 匹配所有在 "Bill" 前面的, 包括 "Bill"
var lowerBoundKeyRange = IDBKeyRange.lowerBound("Bill");

// 匹配所有在 “Bill” 前面的, 但是不需要包括 "Bill"
var lowerBoundOpenKeyRange = IDBKeyRange.lowerBound("Bill", true);

// Match anything up to, but not including, "Donna"
var upperBoundOpenKeyRange = IDBKeyRange.upperBound("Donna", true);

//Match anything between "Bill" and "Donna", but not including "Donna"
var boundKeyRange = IDBKeyRange.bound("Bill", "Donna", false, true);

index.openCursor(boundKeyRange).onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    // Do something with the matches.
    cursor.continue();
  }
};
```

有时候你可能想要以倒序而不是正序（所有游标的默认顺序）来遍历。切换方向是通过传递 `prev` 到 `openCursor()` 方法来实现的：

```js
objectStore.openCursor(null, IDBCursor.prev).onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    // Do something with the entries.
    cursor.continue();
  }
};
```

因为 “name” 索引不是唯一的，那就有可能存在具有相同 `name` 的多条记录。要注意的是这种情况不可能发生在对象存储空间上，因为键必须永远是唯一的。如果你想要在游标在索引迭代过程中过滤出重复的，你可以传递 `nextunique` （或 `prevunique` 如果你正在向后寻找）作为方向参数。 当 `nextunique` 或是 `prevunique` 被使用时，被返回的那个总是键最小的记录。

```js
index.openKeyCursor(null, IDBCursor.nextunique).onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    // Do something with the entries.
    cursor.continue();
  }
};
```

## Library

- [bramski/angular-indexedDB](https://github.com/bramski/angular-indexedDB) An angularjs serviceprovider to utilize indexedDB with angular.

## FAQ

### How to delete indexedDB in Chrome

See [html5 - How to delete indexedDB in Chrome - Stack Overflow](http://stackoverflow.com/questions/9384128/how-to-delete-indexeddb-in-chrome)

In theory, all you need to do to delete an IndexedDB in Chrome is:

1.  In Chrome, go to Options > Under the Hood > Content Settings > All cookies and Site Data > find the domain where you created the IndexedDB
2.  Hit either the "X" or click "Indexed Database" > Remove

In windows, the file is located here:

C:\Users[USER_NAME]\AppData\Local\Google\Chrome\User Data\Default\IndexedDB

On Mac, do the following:

1.  In Chrome, go to "Settings" (or "Preferences" under the Chrome menu) 
2.  Click "show advanced settings" (at the bottom of the page)
3.  Go to "Privacy" > "Content Settings" > "All cookies and Site Data" > find the domain where you created the IndexedDB
4.  Hit either the "X" or click "Indexed Database" > Remove

## Ref

- [使用 IndexedDB - Web API 接口](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Using_IndexedDB)

## Tutorial

- [Storage - HTML5 Rocks](http://www.html5rocks.com/en/features/storage)
- [HTML5 Web Storage](http://dev.w3.org/html5/webstorage/)
- [Indexed Database API](http://www.w3.org/TR/IndexedDB/)
- [Using the HTML5 IndexedDB API](http://www.ibm.com/developerworks/library/wa-indexeddb/)
