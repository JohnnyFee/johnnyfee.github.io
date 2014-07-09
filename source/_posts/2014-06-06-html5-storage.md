---
layout: post
title: "Html5 Storage"
description: ""
category: Qt
tags: [html5, storage]
--- 

## Client Storage

Traditional mobile web development centered around the limitations of client handsets, which had very little storage for applications. As handsets become more powerful, however, this assumption is no longer valid. HTML5's newly introduced [Web Storage](http://dev.w3.org/html5/webstorage/) features expand application storage on the client.

HTML 5 standardizes access to an application's local data via LocalStorage and SessionStorage APIs. These APIs boost the amount of client storage available to web applications. They also can effectively replace cookies as a means to maintain application state and track user preferences.

Local storage persists indefinitely, while session storage lasts only for the duration of a window session. Local storage is available from any page or window from the same site, while session storage is local to each window. Both local and session storage rely on simple key/value pairs, with keys and values both stored as strings.

Local and session storage are not the only client storage available. HTML 5 WebSQL serves as a more full-featured, client-side database. WebSQL brings SQLite-based structured database functionality, typically deployed on servers, to client browser applications. WebSQL is appropriate for data-intensive applications requiring complex queries rather than simple key/value access. WebSQL database transaction calls help avoid interfaces from locking up, facilitate rollback and error handling, and protect against SQL injection. Database versioning allows you to manage schema changes incrementally.

<!--more-->

## Web Storage(Simple Data Storage)

参考：<http://dev.w3.org/html5/webstorage/>

Web存储（web storage），特别是本地存储（local storage）部分，是一个简单的键值存储系统（key/value persistence system）。

- 优点：十分简单的API，主流浏览器的新版本都已经获得支持。
- 缺点：不支持查询语言，模式（schemas），跟平常调用数据库不一样。对于大型数据的组织不能很好的进行扩展。不支持事务安全。如果应用在运行，我想晚上就不能睡个安稳觉了，因为随时可能出现竞争条件（race condition）并出现数据污染的危机。

The localStorage and sessionStorage APIs offer applications up to 5MB of data storage. They both share the same simple key/value interface, but have different namespaces and also differ in the extent to which data is available. Local storage persists indefinitely, while session storage only lasts for the duration of a window session. Local storage is available from any page or window from the same site, while session storage is local to each window.

The following examples demonstrate the API interface. While these use localStorage as an example, the same set of API calls work for sessionStorage, which is also available within the window object.

The following performs an initial check for support of browser-based storage and assigns the database to a variable:

     if (window.localStorage) {
         var db = window.localStorage;
         // storage functionality here
     }
     else {
         // store data remotely?
     }

The getItem() method retrieves the value of a database field named key:

     var value = db.getItem("key");

Note that both keys and values are represented as strings. If you specify any other type of data, it is converted silently to a string representation. (See [Storing Non-String Data](#storing-non-string-data) for ways around this limitation.) If getItem() returns null rather than a string value, it means the specified key does not exist.

The setItem() method establishes a new value. When adding data, it is a good idea to check to make sure you haven't exceeded the allotted storage space:

     try {
         db.setItem("key", "string");
     }
     catch(err) {
         if (err.QUOTA_EXCEEDED_ERR) {
             // storage space is exceeded
         }
     }

The removeItem() method deletes database fields:

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

![images/scr_storage.png](http://johnnyimages.qiniudn.com/scr_storage.png)

### Storing Non-String Data

Since local and session storage APIs only support string values, you need to be careful not to allow errors that result from passive conversions from other data types. The following sample shows how such an error might come about:

         var db = window.localStorage;
         var saveCardInfo;
             // user expresses preference NOT to save credit card info:
         saveCardInfo = false;
             // BUG happens here...
         db.setItem("save_card_info", saveCardInfo);
             // variable is now a string, not a boolean:
         saveCardInfo = db.getItem("save_card_info");
             // both "true" and "false" strings evaluate as true...
         if ( saveCardInfo ) {
             // ...so this code always executes...
         }
         else {
             // ...and this code never executes.
         }

The user's preference to retain credit card information is expressed within the application as a true or false boolean value. When each value is passed to storage, however, it is passively converted to a string. When reassigned to a JavaScript variable, it no longer serves as a valid boolean test. The application falsely assumes users want to save credit card information, regardless of their expressed preference.

The following sample fixes the problem. Instead of using true and false boolean values, it converts 1 and 0 strings to numbers:

         var db = window.localStorage;
         var saveCardInfo = 0;
         db.setItem("save_card_info", saveCardInfo);
         // multiplying forces numeric output:
         saveCardInfo = db.getItem("save_card_info") * 1;

For a more reliable alternative, store values as JSON strings and rely on automatic type conversion when subsequently parsing them. The following sample shows how parsing JSON preserves both boolean and numeric data:

         var saveCardInfo = true;                    // boolean
         var shipMethod = 2;                        // number
         var db = window.localStorage;
    
         db.setItem("save_card_info", JSON.stringify(saveCardInfo));
         db.setItem("ship_method", JSON.stringify(shipMethod));
    
         saveCardInfo = JSON.parse(db.getItem("save_card_info"));    // boolean
         shipMethod = JSON.parse(db.getItem("ship_method"));        // number

Note that this simple approach may cause problems of its own. For example, perhaps the words true and false really should be represented as strings. Encapsulating data within objects accounts for such variability:

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

The ability to save objects as JSON strings means that you can save an application's state within a single database field. For example, you might use the following approach to save the entire contents of a shopping cart in a single field for later use:

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

JSON allows you to store data types, but functions are ignored. That makes it more difficult to preserve objects representing fully functional applications.

### Storage Events

The storage event allows applications to respond indirectly to modified data resulting from calls to setItem(), removeItem(), or clear(). This may be useful in providing users with visual feedback notifying them of data that is modified locally, perhaps rather than being sent to a remote server:

         window.addEventListener("storage", function(event){
             var icon = document.querySelector("#indicator");
             if (event.storageArea.length) {
                 icon.className = "writing";
             }
             else {
                 icon.className = "empty";
             }
         }, false);

The storage event's storageArea attribute returns the localStorage or sessionStorage object being modified. The key is the name of the field being modified, and oldValue and newValue are its values before and after the event. The url is the page that called the method triggering the change.

## WebSQL Databases

参考：<http://dev.w3.org/html5/webdatabase/>

Web SQL是基于浏览器中嵌入的[sqlite](http://www.sqlite.org/)，继承了平面文件（flat-file）数据库的优点（高并发性）但缺少一些特性（存储过程（stored procs）和其它一些高端数据库特性）。

- 优点：快速和功能丰富的sql实现（除了select/insert/update/delete，还能使用joins、inner selects等）。
- 缺点：Firefox、IE、Opera mini 不支持。

The following test confirms support for WebSQL:

     if (!!window.openDatabase) {
         // supports WebSQL
     }

Calls to databases made via the WebSQL API are made asynchronously via transactions to avoid the user interface from locking up, as database interaction may occur from several windows at a time.

The three core API methods are:

* openDatabase()
* transaction()
* executeSql()

### Creating and Opening a New Database

To create and open a database, use openDatabase()on the Window object, for example:

         var db = openDatabase('mydb', '1.0', 'my first database', 2*1024*1024);
         var db = openDatabase('notes', '', 'The Example Notes App!', 1048576);

The four required arguments are the database name, version, display name, and estimated size in bytes. You can supply a function as an optional fifth argument to serve as a callback when a database is created. It may be used to call the changeversion() method, in which case the callback is invoked with an empty string for the database version.

The second example above specifies an empty string for the version. In this case, the database opens no matter what the database version is. (An openDatabase() call specifying the wrong version for an existing database throws an INVALID_STATE_ERR exception.) You can then query the version by examining the database object's version property, for example:

         var version = db.version;

Note that you don't need to close a client-side Web SQL database when you're done working with it.

### Transaction Calls and ExecuteSQL Method

Performing database transactions is superior to running SQL statements directly because transactions are not committed if they fail and you can undo them if needed. Transactions also allow you to handle errors using a callback. To implement a transaction, specify a callback function such as the following:

         db.transaction(function (tx) {
           // SQL details on the tx object go here
         }

The transaction() method takes one to three arguments:

* a required transaction callback, in which executeSQL() calls belong
* an optional transaction error object
* an optional success callback.


Use the executeSQL() method to specify SQL statements for read and write operations. The method protects against SQL injection and provides a callback method to process the results of any SQL queries you specify. The executeSQL() method takes from one to four arguments:

* a required SQL statement
* an optional object array of arguments
* an optional SQL statement callback
* an optional SQL statement error callback


The example below creates the database if it doesn't exist, adds a two-column table to the database, and adds a row of data to the table:

         var db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
         db.transaction(function (tx) {
             tx.executeSql('CREATE TABLE IF NOT EXISTS foo (id unique, text)');
             tx.executeSql('INSERT INTO foo (id, text) VALUES (1, "synergies")');
         });

To capture data from the user or an external source, use ? placeholders to map that data into the SQL query. This ensures the data doesn't compromise database security, for example from SQL injection:

         tx.executeSql('INSERT INTO foo (id, text) VALUES (?, ?)', [id, value]);

id and value are external variables, and executeSql maps the items in the array to the ?s.

To select values from the table, use a callback to capture the results:

         tx.executeSql('SELECT * FROM foo', [], function(tx, results) {
             for (var i = 0 , len = results.rows.length; i < len; i++) {
                 // do something with results.rows.item(i).text
             }
         });

No fields are mapped in the above query, but to use the third argument you need to pass in an empty array as the second argument.

The SQL statement callback for executeSQL() is called with the transaction object and a SQL statement result object. The result gives access to the ID of the last inserted row, the number of rows affected, and an indexed list representing the rows returned, in the order returned.

The result object contains an array-like rows object. It has a length, but to access individual rows you need to use results.rows.item(i), where i is the index of the row. This returns an object representation of each row. For example, if your database has a name and an age field, the row contains a name and an age property. The value of the age field can be accessed using results.rows.item(i).age.

### Changing Database Versions

Each database has one version at a time and multiple versions cannot exist at one time. Versions allow you to manage schema changes incrementally.

You can change the version of a client-side Web SQL database using the changeversion() method:

         if (db.version == "1.0") {
             try {
                 // comment out for crash recovery.
                 db.changeVersion("1.0", "2.0", cv_1_0_2_0, oops_1_0_2_0, success_1_0_2_0);
             } catch(e) {
                 alert('changeversion 1.0 -> 2.0 failed');
                 alert('DB Version: '+db.version);
             }
         }

changeversion() takes the following arguments: required old and new version numbers, optional SQL transaction callback, optional SQL transaction error callback, and optional success callback.

### Errors

Asynchronous API errors are reported using callbacks that have a SQLError object as one of their arguments. SQLError contains a code from the table below and a localized message string.

Error codes are:

* 0 UNKNOWN_ERROR Transaction failed for reasons unrelated to the DB
* 1 DATABASE_ERROR Statement failed for DB reasons not covered by other code
* 2 VERSION_ERROR DB version doesn't match expected version
* 3 TOO_LARGE_ERROR Data returned from DB was too large. Try the SQL LIMIT modifier.
* 4 QUOTA_ERROR Insufficient remaining storage
* 5 SYNTAX_ERROR Syntax error, argument mismatch, or unallowed statement
* 6 CONSTRAINT_ERROR An INSERT, UPDATE, or REPLACE statement failed due to a constraint error
* 7 TIMEOUT_ERROR Timeout waiting for transaction lock

## IndexedDB

参考: <http://www.w3.org/TR/IndexedDB/>

This API is available in the underlying WebView. Indexed DB offers more features than LocalStorage but fewer than WebSQL.

IndexedDB是基于简单的平面文件（flat-file）数据库，采用了分层的键值存储（key/value persistence）和基本的索引。

- 优点：如果你熟悉NoSQL，这是再适合不过了。
- 缺点：IE、Opera mini 不支持。

## Library

- [ask11/storage](https://github.com/ask11/storage) Asynchronous browser storage with multiple back-ends (IndexedDB, WebSQL, localStorage).

## Reference

- [QtWebKit Guide](http://qt-project.org/doc/qt-4.8/qtwebkit-guide.html)
- [HTML5 Storage Wars - localStorage vs. IndexedDB vs. Web SQL - csimms.botonomy.com](http://csimms.botonomy.com/2011/05/html5-storage-wars-localstorage-vs-indexeddb-vs-web-sql.html)

## Tutorial

- [Storage - HTML5 Rocks](http://www.html5rocks.com/en/features/storage)
- [HTML5 Web Storage](http://dev.w3.org/html5/webstorage/)
