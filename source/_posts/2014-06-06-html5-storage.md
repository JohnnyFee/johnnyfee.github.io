layout: post
title: "Html5 Storage"
description: ""
category: HTML5
tags: [html5, storage]
---

## Client Storage

Traditional mobile web development centered around the limitations of client handsets, which had very little storage for applications. As handsets become more powerful, however, this assumption is no longer valid. HTML5's newly introduced [Web Storage](http://dev.w3.org/html5/webstorage/) features expand application storage on the client.

HTML 5 standardizes access to an application's local data via LocalStorage and SessionStorage APIs. These APIs boost the amount of client storage available to web applications. They also can effectively replace cookies as a means to maintain application state and track user preferences.

Local storage persists indefinitely, while session storage lasts only for the duration of a window session. Local storage is available from any page or window from the same site, while session storage is local to each window. Both local and session storage rely on simple key/value pairs, with keys and values both stored as strings.

Local and session storage are not the only client storage available. HTML 5 WebSQL serves as a more full-featured, client-side database. WebSQL brings SQLite-based structured database functionality, typically deployed on servers, to client browser applications. WebSQL is appropriate for data-intensive applications requiring complex queries rather than simple key/value access. WebSQL database transaction calls help avoid interfaces from locking up, facilitate rollback and error handling, and protect against SQL injection. Database versioning allows you to manage schema changes incrementally.

<!-- more -->

### Storage on the Client Device

In practice, "client-side storage" means data is passed to the browser's storage API, which saves it on the local device in the same area as it stores other user-specific information, e.g. preferences and cache. Beyond saving data, the APIs let you retrieve data, and in some cases, perform searches and batch manipulations.

### Sandboxed

All four storage APIs tie data to a single "origin". e.g. if http://abc.example.com saves some data, then the browser will only permit http://abc.example.com to access that data in the future. When it comes to "origins", the domain must be exactly the same, so http://example.com and http://def.example.com are both disqualified. The port must match too, so http://abc.example.com:123 also cannot see http://abc.example.com (which defaults to port 80), and so must the protocol (http versus https, etc.).

### Quotas

You can imagine the chaos if any website was allowed to populate unsuspecting hard drives with gigabytes of data! Thus, browsers impose limits on storage capacity. When your app attempts to exceed that limit, the browser will typically show a dialog to let the user confirm the increase. You might expect the browser to enforce a single limit for all storage an origin can use, but most enforce limits separately for each storage mechanism. This will change as the [Quota API](http://www.w3.org/TR/quota-api/) is adopted, but for now, you should think of the browser as maintaining a 2-D matrix, with "origin" in one dimension and "storage" in the other. For example, "http://abc.example.com" may be allowed to store up to 5MB of Web Storage, 25MB of Web SQL Database Storage, and forbidden to use Indexed Database due to the user denying access. The Quota API brings this into a central location and lets you query how much space is available and in use.

There are also environments where the user can see upfront how much storage will be used, e.g. in the case of the Chrome Web Store, when a user installs an app, they will be prompted upfront to accept its permissions, which include storage limits. One possible value in the manifest is "unlimited_storage".

### Transactions

The two "database" storage formats support transactions. The aim is the same reason regular relational databases use transactions: To ensure the integrity of the database. Transactions prevent "race conditions", a phenomenon where two sequences of operations are applied to the database at the same time, leading to results that are both unpredictable and a database whose state is of dubious accuracy.

### Synchronous and Asynchronous Modes

Most of the storage formats all support synchronous and asynchronous modes.  Synchronous mode is blocking, meaning that the storage operation will be executed to completion before the next line of JavaScript is executed. Asynchronous mode will cause the next lines of JavaScript to be executed before the storage operation completes. The storage operation will be performed in the background and the application will be notified when the operation is finished by way of a callback function being called, a function which must be specified when the call is made.

Synchronous mode should be avoided at all costs, it may seem like a simpler API, but it blocks rendering on the page while the operation completes, and in some cases freezes the whole browser. You've probably noticed when sites and even apps do this, you click on a button and everything freezes, you wonder whether it's crashed, then it springs back to life.

Some APIs don't have an async mode, such as `localStorage`, you should carefully performance monitor your use of these APIs, and be prepared to switch to one of the async APIs if it becomes an issue.

### Library

- [lz-string: JavaScript compression, fast! - pieroxy.net](http://pieroxy.net/blog/pages/lz-string/index.html) <span class="code">lz-string</span> was designed to fulfill the need of storing large amounts of data in <span class="code">localStorage</span>, specifically on mobile devices. <span class="code">localStorage</span> being usually limited to 5MB, all you can compress is that much more data you can store.

## Web Storage(Simple Data Storage)

参考：<http://dev.w3.org/html5/webstorage/>

Web存储（web storage），特别是本地存储（local storage）部分，是一个简单的键值存储系统（key/value persistence system）。包括 sessionStorage 和 localStorage。

The `localStorage` and `sessionStorage` APIs offer applications up to 5MB of data storage. They both share the same simple key/value interface, but have different namespaces and also differ in the extent to which data is available. Local storage persists indefinitely, while session storage only lasts for the duration of a window session. Local storage is available from any page or window from the same site, while session storage is local to each window.

优点：

1. Supported on all modern browsers, as well as on iOS and Android, for several years (IE since version 8).
2. Simple API signature.
3. Simple call flow, being a synchronous API.
4. Semantic events available to keep other tabs/windows in sync.

缺点：

1.  Poor performance for large/complex data, when using the synchronous API (which is the most widely supported mode).
2.  Poor performance when searching large/complex data, due to lack of indexing. (Search operations have to manually iterate through all items.)
3.  Poor performance when storing and retrieving large/complex data structures, because it's necessary to manually serialize and de-serialize to/from string values. The major browser implementations only support string values (even though the spec says otherwise).
4.  Need to ensure data consistency and integrity, since data is effectively unstructured.

### API

The following performs an initial check for support of browser-based storage and assigns the database to a variable:

```js
if (window.localStorage) {
    var db = window.localStorage;
    // storage functionality here
}
else {
    // store data remotely?
}
```

The `getItem()` method retrieves the value of a database field named key:

    var value = db.getItem("key");

Note that both keys and values are represented as strings. If you specify any other type of data, it is converted silently to a string representation. If `getItem()` returns null rather than a string value, it means the specified key does not exist.

The `setItem()` method establishes a new value. When adding data, it is a good idea to check to make sure you haven't exceeded the allotted storage space:

```js
try {
    db.setItem("key", "string");
}
catch(err) {
    if (err.QUOTA_EXCEEDED_ERR) {
        // storage space is exceeded
    }
}
```

The `removeItem()` method deletes database fields:

     db.removeItem("key");

The clear() method deletes all key/value pairs within the database, either for an entire site in the case of localStorage, or for an individual window session in the case of sessionStorage:

     db.clear();

Databases can be accessed as arrays using index notation, useful in cases where you may not know all the field names. The length property returns the number of fields in the database, and the key() method returns the name of the key corresponding to a given index. The following reflects the contents of a database in a JavaScript object:

     var obj = {};
     for ( var i = 0, l = db.length ; i < l ; i++ ) {
         obj[ db.key(i) ] = db.getItem(db.key(i) );
     }

Since keys correspond to array indexes, you should not add or remove keys during any operation that iterates over the full set of key/value pairs. Newly introduced keys are introduced randomly into the array's sequence.

The following displays simple storage functionality. The application prompts for a login and password if they are unavailable. This locally stored data is available the next time users open the browser. However, the contents of the credit card field is stored only for the duration of the browing session.

### Storing Non-String Data

Since local and session storage APIs only support string values, you need to be careful not to allow errors that result from passive conversions from other data types. The following sample shows how such an error might come about:

```js
var db = window.localStorage;
var saveCardInfo;
    // user expresses preference NOT to save credit card info:
saveCardInfo = false;
    // BUG happens here...
db.setItem("save_card_info", saveCardInfo);
    // variable is now a string, not a boolean:
saveCardInfo = db.getItem("save_card_info");
    // both "true" and "false" strings evaluate as true...
if (saveCardInfo) {
    // ...so this code always executes...
}
else {
    // ...and this code never executes.
}
```

The user's preference to retain credit card information is expressed within the application as a true or false boolean value. When each value is passed to storage, however, it is passively converted to a string. When reassigned to a JavaScript variable, it no longer serves as a valid boolean test. The application falsely assumes users want to save credit card information, regardless of their expressed preference.

The following sample fixes the problem. Instead of using true and false boolean values, it converts 1 and 0 strings to numbers:

```js
var db = window.localStorage;
var saveCardInfo = 0;
db.setItem("save_card_info", saveCardInfo);
// multiplying forces numeric output:
saveCardInfo = db.getItem("save_card_info") * 1;
```

For a more reliable alternative, store values as JSON strings and rely on automatic type conversion when subsequently parsing them. The following sample shows how parsing JSON preserves both boolean and numeric data:

```js
var saveCardInfo = true;                    // boolean
var shipMethod = 2;                        // number
var db = window.localStorage;
    
db.setItem("save_card_info", JSON.stringify(saveCardInfo));
db.setItem("ship_method", JSON.stringify(shipMethod));
    
saveCardInfo = JSON.parse(db.getItem("save_card_info"));    // boolean
shipMethod = JSON.parse(db.getItem("ship_method"));        // number
```

Note that this simple approach may cause problems of its own. For example, perhaps the words true and false really should be represented as strings. Encapsulating data within objects accounts for such variability:

```js
var db = window.localStorage;
var obj = {
    bool    : true,
    str        : "true",
    num        : 1
};
db.setItem("appState", JSON.stringify(obj));    // to database...
// "appState" is "{'bool':true,'num':1,'str':'true'}"
obj = JSON.parse(db.getItem("appState"));    // ...and back
// obj is same as initially defined.
```

The ability to save objects as JSON strings means that you can save an application's state within a single database field. For example, you might use the following approach to save the entire contents of a shopping cart in a single field for later use:

```js
var db = window.localStorage;
var cart = { items: [] };

cart.message = "From your loving uncle";

cart.items.push({
    description    : "Floor to Ceiling Shoe Rack",
    id        : 203174676,
    price    : 99.95,
    quantity    : 1,
    weight    : 20,
});

cart.items.push({
    description    : "Automatic Laser Toy for Cats",
    id        : 203345371,
    price    : 19.95,
    quantity    : 2,
    weight    : 0.5,
});

// save all cumulative items:
db.setItem("cart", JSON.stringify(cart));

// extract items from storage:
cart = JSON.parse(db.getItem("cart"));
```

JSON allows you to store data types, but functions are ignored. That makes it more difficult to preserve objects representing fully functional applications.

### Storage Events

The storage event allows applications to respond indirectly to modified data resulting from calls to `setItem()`, `removeItem()`, or `clear()`. This may be useful in providing users with visual feedback notifying them of data that is modified locally, perhaps rather than being sent to a remote server:

```js
window.addEventListener("storage", function(event){
    var icon = document.querySelector("#indicator");
    if (event.storageArea.length) {
        icon.className = "writing";
    }
    else {
        icon.className = "empty";
    }
}, false);
```

The storage event's storageArea attribute returns the localStorage or sessionStorage object being modified. The key is the name of the field being modified, and oldValue and newValue are its values before and after the event. The url is the page that called the method triggering the change.

### Library

- [grevory/angular-local-storage](https://github.com/grevory/angular-local-storage)

## WebSQL Databases

See ...

## IndexedDB

See ...

## FileSystem

The previous formats are all suitable for text and structured data, but when it comes to large files and binary content, we need something else. Fortunately, we now have a [FileSystem API standard](http://dev.w3.org/2009/dap/file-system/file-dir-sys.html). It gives each domain a full hierarchical filesystem, and in Chrome at least, these are real files sitting on the user's hard drive. For reading and writing of individual files, the API builds on the existing [File API](http://www.w3.org/TR/FileAPI/).

优点：

1.  Can store large content and binary files, so it's suitable for images, audio, video, PDFs, etc.
2.  Good performance, being an asynchronous API.

缺点：

1.  Very early standard. Only available in Chrome and Opera.
2.  No transaction support.
3.  No built-in search/indexing support.

## Offline

- [Offline - HTML5 Rocks](http://www.html5rocks.com/en/features/offline)
- [Working Off the Grid with HTML5 Offline - HTML5 Rocks](http://www.html5rocks.com/en/mobile/workingoffthegrid/)
- ["Offline": What does it mean and why should I care? - HTML5 Rocks](http://www.html5rocks.com/en/tutorials/offline/whats-offline/)

## Library

- [ask11/storage](https://github.com/ask11/storage) Asynchronous browser storage with multiple back-ends (IndexedDB, WebSQL, localStorage).
- [jas-/secStore.js](https://github.com/jas-/secStore.js) Encryption enabled browser storage.
- [arokor/barn](https://github.com/arokor/barn) Fast, atomic persistent storage layer on top of localstorage.

## Demo

- [HTML5 Demo: Storage](http://html5demos.com/storage)
- [Local Storage](http://www.ellipsetours.com/Demos/storage/)
- [Clock](http://project.mahemoff.com/timer/timer.html)


## Ref

- [Client-Side Storage - HTML5 Rocks](http://www.html5rocks.com/en/tutorials/offline/storage/)
- [QtWebKit Guide - Client Storage](http://qt-project.org/doc/qt-4.8/qtwebkit-guide-cache.html)

## Browser Support：

- [Web Storage - name/value pairs](http://caniuse.com/#search=namevalue-storage)
- [IndexedDB](http://caniuse.com/#search=indexeddb)
- [Web SQL Database](http://caniuse.com/#search=sql-storage)

## Tutorial

- [Storage - HTML5 Rocks](http://www.html5rocks.com/en/features/storage)
- [HTML5 Web Storage](http://dev.w3.org/html5/webstorage/)
