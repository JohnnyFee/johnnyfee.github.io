layout: post
title: "WebSQL Databases"
description: ""
category:
tags: [websql, html5, javascript]
---

参考：<http://dev.w3.org/html5/webdatabase/>

Web SQL是基于浏览器中嵌入的[sqlite](http://www.sqlite.org/)，继承了平面文件（flat-file）数据库的优点（高并发性）但缺少一些特性（存储过程（stored procs）和其它一些高端数据库特性）。

[Web SQL Database](http://www.w3.org/TR/webdatabase/) is a structured database with all the functionality - and complexity - of a typical [SQL-powered relational database](http://en.wikipedia.org/wiki/Structured_Query_Language). Indexed Database sits somewhere between the two. It has free-form key-value pairs, like Web Storage, but also the capability to index fields from those values, so searching is much faster.

<!-- more -->

优点：

1.  Supported on major mobile browsers (Android Browser, Mobile Safari, Opera Mobile) as well as several desktop browsers (Chrome, Safari, Opera).
2.  Good performance generally, being an asynchronous API. Database interaction won't lock up the user interface. (Synchronous API is also available for WebWorkers.)
3.  Good search performance, since data can be indexed according to search keys.
4.  Robust, since it supports a [transactional database model](http://en.wikipedia.org/wiki/Database_transaction).
5.  Easier to maintain integrity of data, due to rigid data structure.

缺点：

1.  Deprecated. Will not be supported on IE or Firefox, and will probably be phased out from the other browsers at some stage.
2.  Steep learning curve, requiring knowledge of relational databases and SQL.
3.  Suffers from [object-relational impedance mismatch](http://en.wikipedia.org/wiki/Object-relational_impedance_mismatch).

4.  Diminishes agility, as database schema must be defined upfront, with all records in a table matching the same structure.

The following test confirms support for WebSQL:

```js
if (!!window.openDatabase) {
 // supports WebSQL
}
```

## API

Calls to databases made via the WebSQL API are made asynchronously via transactions to avoid the user interface from locking up, as database interaction may occur from several windows at a time.

The three core API methods are:

1. `openDatabase`: This method creates the database object either using existing database or creating new one.
2. `transaction`: This method give us the ability to control a transaction and performing either commit or rollback based on the situation.
3. `executeSql`: This method is used to execute actual SQL query.

## Creating and Opening a New Database

To create and open a database, use openDatabase()on the Window object, for example:

```js
var db = openDatabase('mydb', '1.0', 'my first database', 2*1024*1024);
var db = openDatabase('notes', '', 'The Example Notes App!', 1048576);
```

Above method took following five paramters:

1.  Database name
2.  Version number
    The second example above specifies an empty string for the version. In this case, the database opens no matter what the database version is. (An `openDatabase()` call specifying the wrong version for an existing database throws an `INVALID_STATE_ERR` exception.) You can then query the version by examining the database object's version property, for example:

        var version = db.version;

3.  Text description
4.  Size of database
5.  Creation callback. You can supply a function as an optional fifth argument to serve as a callback when a database is created. It may be used to call the `changeversion()` method, in which case the callback is invoked with an empty string for the database version.

Note that you don't need to close a client-side Web SQL database when you're done working with it.

## transaction

Performing database transactions is superior to running SQL statements directly because transactions are not committed if they fail and you can undo them if needed. Transactions also allow you to handle errors using a callback. To implement a transaction, specify a callback function such as the following:

```js
db.transaction(function (tx) {
  // SQL details on the tx object go here
})
```

The `transaction()` method takes one to three arguments:

* a required transaction callback, in which `executeSQL()` calls belong
* an optional transaction error callback
* an optional success callback.

## executeSQL

See [Introducing Web SQL Databases](http://html5doctor.com/introducing-web-sql-databases/)

Use the `executeSQL()` method to specify SQL statements for read and write operations. The method protects against SQL injection and provides a callback method to process the results of any SQL queries you specify. The `executeSQL()` method takes from one to four arguments:

    executeSql(sqlStatement, arguments, callback, errorCallback)

* a required SQL statement
* an optional object array of arguments
* an optional SQL statement callback.  This success callback takes two arguments: a `SQLTransaction` object and a `SQLResultSet` object.
* an optional SQL statement error callback

According to the specification, the `SQLResultSet` object is defined like this:

```java
interface SQLResultSet {
  readonly attribute long insertId;
  readonly attribute long rowsAffected;
  readonly attribute SQLResultSetRowList rows;
};
```

* `insertId` returns the row ID of the row that the SQL statement inserted into the database (or the last one if more than one has been inserted).
* `rowsAffected` returns the number of rows that were modified by the SQL statement.
* `rows` is a `SQLResultSetRowList` object. it contains the rows returned by a SELECT statement.

he `SQLResultSetRowList` is described like this in the specification:  

```
interface SQLResultSetRowList {  
  readonly attribute unsigned long length;  
  getter any item(in unsigned long index);  
};  
```

* `length` is the number of rows returned by the database 
* The `item(index)` method returns the row with the given index number. If there is no such row, then this method returns null. You can then access the different fields by doing for instance `item(index).fieldname`

The example below creates the database if it doesn't exist, adds a two-column table to the database, and adds a row of data to the table:

```js
var db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS foo (id unique, text)');
    tx.executeSql('INSERT INTO foo (id, text) VALUES (1, "synergies")');
});
```

To capture data from the user or an external source, use ? placeholders to map that data into the SQL query. This ensures the data doesn't compromise database security, for example from SQL injection:

```js
tx.executeSql('INSERT INTO foo (id, text) VALUES (?, ?)', [id, value]);
```

`id` and `value` are external variables, and `executeSql` maps the items in the array to the ?s.

To select values from the table, use a callback to capture the results:

```js
tx.executeSql('SELECT * FROM foo', [], function(tx, results) {
    for (var i = 0 , len = results.rows.length; i < len; i++) {
        // do something with results.rows.item(i).text
    }
});
```

No fields are mapped in the above query, but to use the third argument you need to pass in an empty array as the second argument.

The SQL statement callback for `executeSQL()` is called with the transaction object and a SQL statement result object. The result gives access to the ID of the last inserted row, the number of rows affected, and an indexed list representing the rows returned, in the order returned.

The result object contains an array-like rows object. It has a length, but to access individual rows you need to use `results.rows.item(i)`, where i is the index of the row. This returns an object representation of each row. For example, if your database has a name and an age field, the row contains a name and an age property. The value of the age field can be accessed using results.`rows.item(i).age`.

## Changing Database Versions

Each database has one version at a time and multiple versions cannot exist at one time. Versions allow you to manage schema changes incrementally.

You can change the version of a client-side Web SQL database using the `changeversion()` method:

```js
if (db.version == "1.0") {
    try {
        // comment out for crash recovery.
        db.changeVersion("1.0", "2.0", cv_1_0_2_0, oops_1_0_2_0, success_1_0_2_0);
    } catch(e) {
        alert('changeversion 1.0 -> 2.0 failed');
        alert('DB Version: '+db.version);
    }
}
```

`changeversion()` takes the following arguments: required old and new version numbers, optional SQL transaction callback, optional SQL transaction error callback, and optional success callback.

See more [HTML5 Web SQL Database – Intro to Versioning and Migrations « occasionally useful](http://blog.maxaller.name/2010/03/html5-web-sql-database-intro-to-versioning-and-migrations/)

## Errors

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

## Demos

* [HTML5 demo showing simple database usage](http://html5demos.com/database)
* [HTML5 demonstration of a transaction rolling back](http://html5demos.com/database-rollback)
* [Demo showing time range selection using SQLite](http://rem.im/html5-tweet-time-range.html)
