layout: post
title: "MySQL Tutorial"
description: ""
category: Database
tags: [database, mysql]
---

## MySQL Commands

    mysql -u root

    # MySQL on a remote server
    mysql -u username -p

This command tells MySQL to log you in as user _root_, without a password. You will now be logged into MySQL and can start entering commands. 

<!-- more -->

If you prefer, you can place your password immediately following the -p (without any spaces) to avoid having to enter it when prompted.

    SHOW databases;

### Creating a database

    CREATE DATABASE publications;
    USE publications;

### Creating users

To create a user, issue the `GRANT` command, which takes the following form (don’t type this in; it’s not an actual working command):

    GRANT PRIVILEGES ON database.object TO 'username'@'hostname'
        IDENTIFIED BY 'password';

This should be pretty straightforward, with the possible exception of the `database.object` part, which refers to the database itself and the objects it contains, such as tables

Arguments                   | Meaning                              
--------------------------- | ---------------------
`*.*`                       | All databases and all their objects
``_`database`_.*``          | Only the database called _`database`_ and all its objects
``_`database`_._`object`_`` | Only the database called _`database`_ and its object called _`object`_

So let’s create a user who can access just the new _publications_ database and all its objects, by entering the following (replacing the username _jim_ and also the password _mypasswd_ with ones of your choosing):

    GRANT ALL ON publications.* TO 'jim'@'localhost'
        IDENTIFIED BY 'mypasswd';

### Creating a table

```sql
CREATE TABLE classics (
 author VARCHAR(128),
 title VARCHAR(128),
 type VARCHAR(16),
 year CHAR(4)) ENGINE MyISAM;
```

To check whether your new table has been created, type the following:

    DESCRIBE classics;

### Adding data to a table

```sql
INSERT INTO classics(author, title, type, year)
 VALUES('Mark Twain','The Adventures of Tom Sawyer','Fiction','1876');
```

    SELECT * FROM classics;

There’s also a shortcut for inserting multiple rows of data, as in Example 8-28, in which you can replace the three separate INSERT INTO queries with a single one listing the data to be inserted, separated by commas, like this:

```sql
INSERT INTO customers(name,isbn) VALUES
('Joe Bloggs','9780099533474'),
('Mary Smith','9780582506206'),
('Jack Wilson','9780517123201');
```

### Renaming a table

    ALTER TABLE classics RENAME pre1900;

### Changing the data type of a column

Changing a column’s data type also makes use of the `ALTER` command, this time in conjunction with the `MODIFY` keyword. So to change the data type of column _year_ from `CHAR(4)` to `SMALLINT` (which requires only 2 bytes of storage and so will save disk space), enter the following:

    ALTER TABLE classics MODIFY year SMALLINT;

When you do this, if the conversion of data type makes sense to MySQL, it will automatically change the data while keeping the meaning. In this case, it will change each string to a comparable integer, and so on, as the string is recognizable as referring to an integer.

### Adding a new column

Let’s suppose that you have created a table and populated it with plenty of data, only to discover you need an additional column. Not to worry. Here’s how to add the new column _pages_, which will be used to store the number of pages in a publication:

    ALTER TABLE classics ADD pages SMALLINT UNSIGNED;

This adds the new column with the name _pages_ using the `UNSIGNED SMALLINT` data type, sufficient to hold a value of up to 65,535—hopefully that’s more than enough for any book ever published!

### Renaming a column

You may decide that having a column named _type_ can be confusing, because that is the name used by MySQL to identify data types. Again, no problem—let’s change its name to _category_, like this:

    ALTER TABLE classics CHANGE type category VARCHAR(16);

Note the addition of `VARCHAR(16)` on the end of this command. That’s because the `CHANGE` keyword requires the data type to be specified, even if you don’t intend to change it, and `VARCHAR(16)` was the data type specified when that column was initially created as _type_.

### Removing a column

Actually, upon reflection, you might decide that the page count column _pages_ isn’t actually all that useful for this particular database, so here’s how to remove that column by using the `DROP` keyword:

    ALTER TABLE classics DROP pages;

Remember that `DROP` is irreversible and you should always use it with caution, because you could inadvertently delete entire tables (and even databases) with it if you are not careful!

### Deleting a table

    DROP TABLE disposable;

## Data Types

### CHAR and VARCHAR

You may have noticed that three of the table’s fields were given the data type of `VARCHAR`, and one was given the type `CHAR`. The term `VARCHAR` stands for _VARiable length_ _CHARacter string_, and the command takes a numeric value that tells MySQL the maximum length allowed for a string stored in this field.

`CHAR` data types. All these types offer a parameter that sets the maximum (or exact) length of the string allowed in the field. As the table shows, each type has a built-in maximum number of bytes it can occupy.

Data type  |  Bytes used  |Examples
CHAR(n) | Exactly n (<= 255) | CHAR(5) “Hello” uses 5 bytes <br>
CHAR(57) “Goodbye” uses 57 bytes
VARCHAR(n) | Up to n (<= 65535)  | VARCHAR(7) “Morning” uses 7 bytes <br>
VARCHAR(100) “Night” uses 5 bytes

### BINARY

The `BINARY` data type is used for storing strings of full bytes that do not have an associated character set. For example, you might use the `BINARY` data type to store a GIF image:

Data type                            | Bytes used             | Examples
------------------ | ---------------------- | ------------
`BINARY(`_`n`_`)` or `BYTE(`_`n`_`)` | Exactly _`n`_ (<= 255) | As `CHAR` but contains binary data 
`VARBINARY(`_`n`_`)`                 | Up to _`n`_ (<= 65535) | As `VARCHAR` but contains binary data

### TEXT

The differences between `TEXT` and `VARCHAR` are small:

* Prior to version 5.0.3, MySQL would remove leading and trailing spaces from `VARCHAR` fields.
* `TEXT` fields cannot have default values.
* MySQL indexes only the first _n_ characters of a `TEXT` column (you specify _n_ when you create the index).

What this means is that `VARCHAR` is the better and faster data type to use if you need to search the entire contents of a field. If you will never search more than a certain number of leading characters in a field, you should probably use a `TEXT` data type 

Data type             | Bytes used               | Attributes
--------------------- | ------------------------ | --------
``TINYTEXT(_`n`_)``   | Up to _`n`_ (<= 255)     | Treated as a string with a character set
``TEXT(_`n`_)``       | Up to _`n`_ (<= 65535)   | Treated as a string with a character set
``MEDIUMTEXT(_`n`_)`` | Up to _`n`_ (<= 1.67e+7) | Treated as a string with a character set
``LONGTEXT(_`n`_)``   | Up to _`n`_ (<= 4.29e+9) | Treated as a string with a character set

### BLOB

The term `BLOB` stands for _Binary_ _Large_ _OBject_ and, therefore, as you would think, the `BLOB` data type is most useful for binary data in excess of 65,536 bytes in size. The main other difference between the `BLOB` and `BINARY` data types is that `BLOB`s cannot have default values

Data type             | Bytes used               | Attributes
--------------------- | ------------------------ | ----------
``TINYBLOB(_`n`_)``   | Up to _`n`_ (<= 255)     | Treated as binary data—no character set
``BLOB(_`n`_)``       | Up to _`n`_ (<= 65535)   | Treated as binary data—no character set
``MEDIUMBLOB(_`n`_)`` | Up to _`n`_ (<= 1.67e+7) | Treated as binary data—no character set
``LONGBLOB(_`n`_)``   | Up to _`n`_ (<= 4.29e+9) | Treated as binary data—no character set

MySQL supports various numeric data types from a single byte up to double-precision floating-point numbers. Although the most memory that a numeric field can use up is 8 bytes, you are well advised to choose the smallest data type that will adequately handle the largest value you expect. Your databases will be small and quickly accessible.

### BLOB

MySQL supports various numeric data types from a single byte up to double-precision floating-point numbers. Although the most memory that a numeric field can use up is 8 bytes, you are well advised to choose the smallest data type that will adequately handle the largest value you expect. Your databases will be small and quickly accessible.

In case you are not acquainted with the terms, a _signed number_ is one with a possible range from a minus value, through 0, to a positive one; and an _unsigned_ one has a value ranging from 0 to a positive one. They can both hold the same number of values; just picture a signed number as being shifted halfway to the left so that half its values are negative and half are positive. Note that floating-point values (of any precision) may only be signed.

![](http://johnnyimages.qiniudn.com/mysql-datatype-number.png)

To specify whether a data type is signed or unsigned, use the `UNSIGNED` qualifier. The following example creates a table called _tablename_ with a field in it called _fieldname_ of the data type `UNSIGNED INTEGER`:

    CREATE TABLE tablename (fieldname INT UNSIGNED);

When creating a numeric field, you can also pass an optional number as a parameter, like this:

    CREATE TABLE tablename (fieldname INT(4));

But you must remember that, unlike `BINARY` and `CHAR` data types, this parameter does not indicate the number of bytes of storage to use. It may seem counterintuitive, but what the number actually represents is the display width of the data in the field when it is retrieved. It is commonly used with the `ZEROFILL` qualifier, like this:

    CREATE TABLE tablename (fieldname INT(4) ZEROFILL);

What this does is cause any numbers with a width of less than four characters to be padded with one or more zeros, sufficient to make the display width of the field four characters long. When a field is already of the specified width or greater, no padding takes place.

### DATE and TIME

Data type   | Time/date format                      
----------- | --------------------------------------
`DATETIME`  | `'0000-00-00 00:00:00'`               
`DATE`      | `'0000-00-00'`                        
`TIMESTAMP` | `'0000-00-00 00:00:00'`               
`TIME`      | `'00:00:00'`                          
`YEAR`      | `0000` (Only years 0000 and 1901–2155)

The `DATETIME` and `TIMESTAMP` data types display the same way. The main difference is that `TIMESTAMP` has a very narrow range (from the years 1970 through 2037), whereas `DATETIME` will hold just about any date you’re likely to specify, unless you’re interested in ancient history or science fiction.`TIMESTAMP` is useful, however, because you can let MySQL set the value for you. If you don’t specify the value when adding a row, the current time is automatically inserted. You can also have MySQL update a `TIMESTAMP` column each time you change a row.

### AUTO_INCREMENT

    ALTER TABLE classics ADD id INT UNSIGNED NOT NULL AUTO_INCREMENT KEY;

## Indexes

### Creating an Index

The way to achieve fast searches is to add an _index_, either when creating a table or at any time afterward. But the decision is not so simple. For example, there are different index types such as a  regular `INDEX`, `PRIMARY KEY`, and `FULLTEXT`. Also, you must decide which columns require an index, a judgment that requires you to predict whether you will be searching any of the data in that column. Indexes can also get complicated, because you can combine multiple columns in one index. And even when you’ve decided that, you still have the option of reducing index size by limiting the amount of each column to be indexed.

```sql
ALTER TABLE classics ADD INDEX(author(20));
ALTER TABLE classics ADD INDEX(title(20));
ALTER TABLE classics ADD INDEX(category(4));
ALTER TABLE classics ADD INDEX(year);
```

The first two commands create indexes on both the _author_ and _title_ columns, limiting each index to only the first 20 characters. For instance, when MySQL indexes the following title: _The Adventures of Tom Sawyer_

It will actually store in the index only the first 20 characters: _The Adventures of To_

This is done to minimize the size of the index, and to optimize database access speed. I chose 20 because it’s likely to be sufficient to ensure uniqueness for most strings in these columns. If MySQL finds two indexes with the same contents, it will have to waste time going to the table itself and checking the column that was indexed to find out which rows really matched. And finally, I set no limit to the year column’s index, because it’s an integer, not a string.

### Using CREATE INDEX

An alternative to using `ALTER TABLE` to add an index is to use the `CREATE INDEX` command. They are equivalent, except that `CREATE INDEX` cannot be used for creating a `PRIMARY KEY` (see the section “Primary keys”). 

```sql
ALTER TABLE classics ADD INDEX(author(20));
CREATE INDEX author ON classics (author(20));
```

Adding indexes when creating tables:

```sql
CREATE TABLE classics (
 author VARCHAR(128),
 title VARCHAR(128),
 category VARCHAR(16),
 year SMALLINT,
 INDEX(author(20)),
 INDEX(title(20)),
 INDEX(category(4)),
 INDEX(year)) ENGINE MyISAM;
```

### Primary keys

    ALTER TABLE classics ADD isbn CHAR(13) PRIMARY KEY;

To have created a primary key when the table classics was created, you can:

```
CREATE TABLE classics (
 author VARCHAR(128),
 title VARCHAR(128),
 category VARCHAR(16),
 year SMALLINT,
 isbn CHAR(13),
 INDEX(author(20)),
 INDEX(title(20)),
 INDEX(category(4)),
 INDEX(year),
 PRIMARY KEY (isbn)) ENGINE MyISAM;
```

### Creating a FULLTEXT index

Unlike a regular index, MySQL’s `FULLTEXT` allows super-fast searches of entire columns of text. It stores every word in every data string in a special index that you can search using “natural language,” in a similar manner to using a search engine.

It’s not strictly true that MySQL stores _all_ the words in a `FULLTEXT` index, because it has a built-in list of more than 500 words that it chooses to ignore because they are so common that they aren’t very helpful for searching anyway. This list, called _stopwords_, includes _the_, _as_, _is_, _of_, and so on. The list helps MySQL run much more quickly when performing a `FULLTEXT` search and keeps database sizes down. 

Here are some things that you should know about `FULLTEXT` indexes:

* `FULLTEXT` indexes can be used only with MyISAM tables, the type used by MySQL’s default storage engine (MySQL supports at least 10 different storage engines). If you need to convert a table to MyISAM, you can usually use the MySQL command `ALTER TABLE tablename ENGINE = MyISAM;`. 
* `FULLTEXT` indexes can be created for `CHAR`, `VARCHAR`, and `TEXT` columns only.   
* A `FULLTEXT` index definition can be given in the `CREATE TABLE` statement when a table is created, or added later using `ALTER TABLE` (or `CREATE INDEX`). 
* For large data sets, it is _much_ faster to load your data into a table that has no `FULLTEXT` index and then create the index than to load data into a table that has an existing `FULLTEXT` index.

To create a `FULLTEXT` index, apply it to one or more records, which adds a `FULLTEXT` index to the pair of columns _author_ and _title_ in the _classics_ table (this index is in addition to the ones already created and does not affect them):

    ALTER TABLE classics ADD FULLTEXT(author,title);

## Querying a MySQL Database

    SELECT something FROM tablename;

The _`something`_ can be an `*` (asterisk) as you saw before, which means _every column_, or you can choose to select only certain columns.

```
SELECT author,title FROM classics;
```

### SELECT COUNT

Another replacement for the _`something`_ parameter is `COUNT`, which can be used in many ways. It displays the number of rows in the table by passing `*` as a parameter, which means _all rows_. 

    SELECT COUNT(*) FROM classics;

### SELECT DISTINCT

    SELECT DISTINCT author FROM classics;

### DELETE

    DELETE FROM classics WHERE title='Little Dorrit';

### WHERE

    SELECT author,title FROM classics WHERE author="Mark Twain";
    SELECT author,title FROM classics WHERE author LIKE "%Charles%";

The `%` will also match if there is nothing in the position it occupies; in other words, it can match an empty string.

### LIMIT

The `LIMIT` qualifier enables you to choose how many rows to return in a query, and where in the table to start returning them. 

When passed a single parameter, it tells MySQL to start at the beginning of the results and just return the number of rows given in that parameter. If you pass it two parameters, the first indicates the offset from the start of the results where MySQL should start the display, and the second indicates how many to return. You can think of the first parameter as saying, “Skip this number of results at the start.”

```sql
SELECT author,title FROM classics LIMIT 3;
SELECT author,title FROM classics LIMIT 1,2;
SELECT author,title FROM classics LIMIT 3,1;
```

The first returns the first three rows from the table. The second returns two rows starting at position 1 (skipping the first row). The last command returns a single row starting at position 3 (skipping the first three rows).

### MATCH...AGAINST

The `MATCH...AGAINST` construct can be used on columns that have been given a `FULLTEXT` index. With it, you can make natural-language searches as you would in an Internet search engine. Unlike the use of `WHERE...=` or `WHERE...LIKE`, `MATCH...AGAINST` lets you enter multiple words in a search query and checks them against all words in the `FULLTEXT` columns. `FULLTEXT` indexes are case-insensitive, so it makes no difference what case is used in your queries.

```sql
SELECT author,title FROM classics
 WHERE MATCH(author,title) AGAINST('and');
SELECT author,title FROM classics
 WHERE MATCH(author,title) AGAINST('curiosity shop');
SELECT author,title FROM classics
 WHERE MATCH(author,title) AGAINST('tom sawyer');
```

Assuming that you have added a `FULLTEXT` index to the _author_ and _title_ columns, enter the three queries shown in Example 8-24. The first asks for any of these columns that contain the word _and_ to be returned. Because _and_ is a stopword, MySQL will ignore it and the query will always produce an empty set—no matter what is stored in the columns. The second query asks for any rows that contain both of the words _curiosity_ and _shop_ anywhere in them, in any order, to be returned. And the last query applies the same kind of search for the words _tom_ and _sawyer_. 

If you wish to give your `MATCH...AGAINST` queries even more power, use Boolean mode. This changes the effect of the standard `FULLTEXT` query so that it searches for any combination of search words, instead of requiring all search words to be in the text. The presence of a single word in a column causes the search to return the row.

Boolean mode also allows you to preface search words with a `+` or `-` sign to indicate whether they must be included or excluded. If normal Boolean mode says, “Any of these words will do,” a plus sign means, “This word must be present; otherwise, don’t return the row.” A minus sign means, “This word must not be present; its presence disqualifies the row from being returned.”

```sql
SELECT author,title FROM classics
 WHERE MATCH(author,title)
 AGAINST('+charles -species' IN BOOLEAN MODE);
SELECT author,title FROM classics
 WHERE MATCH(author,title)
 AGAINST('"origin of"' IN BOOLEAN MODE);
```

The first asks for all rows containing the word _charles_ and not the word _species_ to be returned. The second uses double quotes to request that all rows containing the exact phrase _origin of_ be returned.

### UPDATE...SET

```sql
UPDATE classics SET author='Mark Twain (Samuel Langhorne Clemens)'
 WHERE author='Mark Twain';
```

### ORDER BY

```sql
SELECT author,title FROM classics ORDER BY author;
SELECT author,title FROM classics ORDER BY title DESC;
```

If you wanted to sort all the rows by _author_ and then by descending _year_ of publication (to view the most recent first), you would issue the following query:

```sql
SELECT author,title,year FROM classics ORDER BY author,year DESC;
```

This shows that each ascending and descending qualifier applies to a single column. The `DESC` keyword applies only to the preceding column, _year_. Because you allow _author_ to use the default sort order, it is sorted in ascending order. You could also have explicitly specified ascending order for that column, with the same results:

```
SELECT author,title,year FROM classics ORDER BY author ASC,year DESC;
```

If you want to know how many publications there are of each category in the _classics_ table, you can issue the following query:

    SELECT category,COUNT(author) FROM classics GROUP BY category;

### Using Logical Operators

You can also use the logical operators `AND`, `OR`, and `NOT` in your MySQL `WHERE` queries to further narrow down your selections. Example 8-30 shows one instance of each, but you can mix and match them in any way you need.

```sql
SELECT author,title FROM classics WHERE
 author LIKE "Charles%" AND author LIKE "%Darwin";
SELECT author,title FROM classics WHERE
 author LIKE "%Mark Twain%" OR author LIKE "%Samuel Langhorne Clemens%";
SELECT author,title FROM classics WHERE
 author LIKE "Charles%" AND author NOT LIKE "%Darwin";
```

### Joining Tables Together

```sql
SELECT name,author,title from customers,classics
 WHERE customers.isbn=classics.isbn;
```

#### NATURAL JOIN

Using `NATURAL JOIN`, you can save yourself some typing and make queries a little clearer. This kind of join takes two tables and automatically joins columns that have the same name.

    SELECT name,author,title FROM customers NATURAL JOIN classics;

#### JOIN...ON

If you wish to specify the column on which to join two tables, use the `JOIN...ON` construct:

```sql
SELECT name,author,title FROM customers
 JOIN classics ON customers.isbn=classics.isbn;
```

#### Using AS

You can also save yourself some typing and improve query readability by creating aliases using the `AS` keyword. Follow a table name with `AS` and the alias to use. Aliases can be particularly useful when you have long queries that reference the same table names many times.

```sql
SELECT name,author,title from
 customers AS cust, classics AS class WHERE cust.isbn=class.isbn;
```

## MySQL Functions

See [MySQL :: MySQL 5.7 Reference Manual :: 12 Functions and Operators](http://dev.mysql.com/doc/refman/5.7/en/functions.html)

## Backing Up and Restoring

### Using mysqldump

With `mysqldump`, you can dump a database or collection of databases into one or more files containing all the instructions necessary to re-create all your tables and repopulate them with your data.  It can also generate files in _CSV (comma-separated values)_ and other delimited text formats, or even in XML format. Its main drawback is that you must make sure that no one writes to a table while you’re backing it up. There are various ways to do this, but the easiest is to shut down the MySQL server before `mysqldump` and start up the server again after `mysqldump` finishes.

Or you can lock the tables you are backing up before running `mysqldump`. To lock tables for reading (as we want to read the data), from the MySQL command line issue this command:

    LOCK TABLES _tablename1 READ, tablename2_ READ ...

Then, to release the lock(s), enter the following:

    UNLOCK TABLES;

By default, the output from `mysqldump` is simply printed out, but you can capture it in a file through the `>` redirect symbol.

The basic format of the `mysqldump` command is shown here:

    mysqldump -u user -ppassword database

You must make sure that mysqldump is in your path, or that you specify its location as part of your command.

Operating system and program | Likely folder location   
---------------------------- | -------------------------
Windows XAMPP                | _C:\xampp\mysql\bin_     
OS X XAMPP                   | _/Applications/xampp/bin_
Linux XAMPP                  | _/Applications/xampp/bin_

Make sure that you replace _`user`_ and _`password`_ with the correct details for your installation of MySQL. If there is no password set for the user, you can omit that part of the command, but the `-u` _`user`_ part is mandatory—unless you have root access without a password and are executing as root (not recommended). 

### Creating a Backup File

Now that you have `mysqldump` working, and have verified it outputs correctly to the screen, you can send the backup data directly to a file using the `>` redirect symbol.  Assuming that you wish to call the backup file _publications.sql_.

    mysqldump -u user –p password publications > publications.sql

### Backing up a single table

To back up only a single table from a database (such as the _classics_ table from the _publications_ database), you should first lock the table from within the MySQL command line, by issuing a command such as the following:

    LOCK TABLES publications.classics READ;

This ensures that MySQL remains running for read purposes, but writes cannot be made. Then, while keeping the MySQL command line open, use another terminal window to issue the following command from the operating system command line:

    mysqldump -u user -ppassword publications classics > classics.sql

You must now release the table lock by entering the following command from the MySQL command line in the first terminal window, which unlocks all tables that have been locked during the current session:

    UNLOCK TABLES;

### Backing up all tables

If you want to back up all your MySQL databases at once (including the system databases such as _mysql_), you can use a command which would enable you to restore an entire MySQL database installation. 

    mysqldump -u user -ppassword --all-databases > all_databases.sql

Of course, there’s a lot more than just a few lines of SQL code in backed-up database files. I recommend that you take a few minutes to examine a couple in order to familiarize yourself with the types of commands that appear in backup files and how they work.

### Restoring from a Backup File

To perform a restore from a file, call the _mysql_ executable, passing it the file to restore from using the `<` symbol. So, to recover an entire database that you dumped using the `--all-databases` option:

    mysql -u user -ppassword < all_databases.sql

To restore a single database, use the `-D` option followed by the name of the database:

    mysql -u user -ppassword -D publications < publications.sql

To restore a single table to a database:

    mysql -u user -ppassword -D publications < classics.sql

### Dumping Data in CSV Format

As previously mentioned, the `mysqldump` program is very flexible and supports various types of output.

```
mysqldump -u user -ppassword --no-create-info --tab=c:/temp
  --fields-terminated-by=',' publications
```