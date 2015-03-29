layout: post
title: "Sqlite 数据库"
category: Database
tags: [sqlite, database]
--- 

## FAQ

### How do I check in SQLite whether a table exists?

If you're using SQLite version 3.3+ you can easily create a table with:   

```
create table if not exists TableName (col1 typ1, ..., colN typN)
```

In the same way, you can remove a table only if it exists by using:

```
drop table if exists TableName
```

Otherwise, you can use:

```
SELECT name FROM sqlite_master WHERE type='table' AND name='yourTableName';
```

if returning array count is equal to 1 its means table exist else not exist.

See [javascript - Web SQL SELECT transaction return value - Stack Overflow](http://stackoverflow.com/questions/7816509/web-sql-select-transaction-return-value)