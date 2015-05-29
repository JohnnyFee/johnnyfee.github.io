layout: post
title: "PHP Database"
description: ""
category: PHP
tags: [php, tutorial]
---

See [《Modern PHP》](http://www.salttiger.com/modern-php/) and [《Learning PHP, MySQL & JavaScript, 4th Edition》](http://www.salttiger.com/learning-php-mysql-javascript-4th-edition/).

Many PHP applications persist information in a wide assortment of databases like MySQL, PostgreSQL, SQLite, MSSQL, and Oracle. Each database provides its own PHP extension to establish communication between PHP and the database. MySQL, for example, uses the `mysqli` extension, which adds various `mysqli_*()` functions to the PHP language. SQLite3 uses the `SQLite3` extension, which adds the `SQLite3`, `SQLite3Stmt`, and `SQLite3Result` classes to the PHP language. If you work with different databases in one or more projects, you have to install and learn various PHP database extensions and interfaces. This increases your cognitive and technical overhead.

<!-- more -->

### The PDO Extension

This is exactly why PHP provides the native PDO extension. PDO (or _PHP data objects_) is a collection of PHP classes that communicate with many different SQL databases via a single user interface. Database implementations are abstracted away. Instead, we can write and execute database queries with a single interface regardless of the particular database system we happen to be using at the time.

Even though the PDO extension provides a single interface to different databases, we still must write our own SQL statements. This is the downside to PDO. Each database provides proprietary features, and these features often require unique SQL syntax. I recommend you write ANSI/ISO SQL when using PDO so that your SQL doesn’t break if/when you change database systems. If you absolutely must use a proprietary database feature, keep in mind you must update your SQL statements if you change database systems.

### Database Connections and DSNs

First, select the database system most appropriate for your application. Install the database, create the schema, and optionally load an initial dataset. Next, instantiate the `PDO` class in PHP. The `PDO` instance establishes a connection between PHP and the database.

The `PDO` class constructor accepts a string argument called a DSN, or data source name, that provides database connection details. A DSN begins with the database driver name (e.g., `mysql` or `sqlite`), a `:`, and the remainder of the connection string. The DSN connection string is different for each database, but it typically includes:* Hostname or IP address

* Port number
* Database name
* Character set

Learn more about your database’s DSN format at <http://php.net/manual/pdo.drivers.php>.

The `PDO` class constructor’s second and third arguments are a username and password for your database. Provide these arguments if your database requires authentication.

```
<?php
try {
    $pdo = new PDO(
        'mysql:host=127.0.0.1;dbname=books;port=3306;charset=utf8',
        'USERNAME',
        'PASSWORD'
    );
} catch (PDOException $e) {
    // Database connection failed
    echo "Database connection failed";
    exit;
}
```

The database is available at IP address `127.0.0.1`, and it listens on the standard MySQL port `3306`. The database username is `josh`, and the database password is `sekrit`. The connection character set is `utf8`.

The `PDO` class constructor’s first argument is the DSN. The DSN begins with `mysql:`. This instructs PDO to use the PDO MySQL driver to connect to a MySQL database. After the `:` character, we specify a semicolon-delimited list of keys and values. Specifically, we specify the `host`, `dbname`, `port`, and `charset` settings.

The PDO constructor throws a `PDOException` instance if the database connection fails. It’s important that you anticipate and catch this exception when creating PDO connections.

_Never hard-code database credentials into PHP files_, especially PHP files served to the public. If PHP exposes raw PHP code to HTTP clients due to a bug or server misconfiguration, your database credentials are naked for the world to see. Instead, move your database credentials into a configuration file _above_ the document root and include them into your PHP files when necessary.

Do not version control your credentials, either. Protect your credentials with a _.gitignore_ file. Otherwise, you will publish your secret credentials into your code repository for others to see. This is especially bad if you are using a public repository.

In this example, the _settings.php_ file contains our database connection credentials. It lives beneath the project root directory but above the document root. The _index.php_ file lives beneath the document root directory, and it is served to the public with a web server. The _index.php_ file uses the credentials in the _settings.php_ file:

This is the _settings.php_ file:

```
<?php
$settings = [
    'host' => '127.0.0.1',
    'port' => '3306',
    'name' => 'acme',
    'username' => 'USERNAME',
    'password' => 'PASSWORD',
    'charset' => 'utf8'
];
```

PDO constructor with external settings, _index.php_:

```
<?php
include('../settings.php');

$pdo = new PDO(
    sprintf(
        'mysql:host=%s;dbname=%s;port=%s;charset=%s',
        $settings['host'],
        $settings['name'],
        $settings['port'],
        $settings['charset']
    ),
    $settings['username'],
    $settings['password']
);
```

This is much safer. If the _index.php_ code leaks to the public, our database credentials remain secret.

### Prepared Statements

A prepared statement is a `PDOStatement` instance. However, I rarely instantiate the `PDOStatement` class directly. Instead, I fetch a prepared statement object with the `PDO` instance’s `prepare()` method. This method accepts a SQL statement string as its first argument, and it returns a `PDOStatement` instance:

```
<?php
$sql = 'SELECT id FROM users WHERE email = :email';
$statement = $pdo->prepare($sql);
```

Pay close attention to the SQL statement. The `:email` is a _named placeholder_ to which I can safely bind any value. I bind the HTTP request query string to the `:email` placeholder with the `$statement` instance’s `bindValue()` method.

```
<?php
$sql = 'SELECT id FROM users WHERE email = :email';
$statement = $pdo->prepare($sql);

$email = filter_input(INPUT_GET, 'email');
$statement->bindValue(':email', $email);
```

The prepared statement automatically sanitizes the `$email` value, and it protects our database from SQL injection attacks. You can include multiple named placeholders in a SQL statement string and invoke the prepared statement’s `bindValue()` method for each placeholder.

the `:email` named placeholder represents a string value. What if we change our SQL statement to find a user by a numeric ID? In this case, we must pass a third argument to the prepared statement’s `bindValue()` method to specify the type of data bound to the placeholder. Without the third argument, a prepared statement assumes bound data is a string.

```
<?php
$sql = 'SELECT email FROM users WHERE id = :id';
$statement = $pdo->prepare($sql);

$userId = filter_input(INPUT_GET, 'id');
$statement->bindValue(':id', $userId, PDO::PARAM_INT);
```

We use the `PDO::PARAM_INT` constant as the third argument. This tells PDO that the bound data is an integer. There are several PDO constants you can use to specify various data types:

```
PDO::PARAM_BOOL
PDO::PARAM_NULL
PDO::PARAM_INT
PDO::PARAM_STR (default)
```

See more <http://php.net/manual/pdo.constants.php>.

### Query Results

We now have a prepared statement, and we’re ready to execute SQL queries against the database. The prepared statement’s `execute()` method executes the statement’s SQL statement with any bound data. If you are executing `INSERT`, `UPDATE`, or `DELETE` statements, invoke the `execute()` method and you’re done. If you execute a `SELECT` statement, you probably expect the database to return matching records. You can fetch query results with the prepared statement’s `fetch()`, `fetchAll()`, `fetchColumn()`, and `fetchObject()` methods.

The `PDOStatement` instance’s `fetch()` method returns the next row from the result set. I use this method to iterate large result sets, especially if the entire result set cannot fit in available memory.

```
<?php
// Build and execute SQL query
$sql = 'SELECT id, email FROM users WHERE email = :email';
$statement = $pdo->prepare($sql);
$email = filter_input(INPUT_GET, 'email');
$statement->bindValue(':email', $email, PDO::PARAM_INT);
$statement->execute();

// Iterate results
while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {
    echo $result['email'];
}
```

In this example, I use the `PDO::FETCH_ASSOC` constant as the first argument in the statement instance’s `fetch()` method. This argument determines how the `fetch()` and `fetchAll()` methods return query results. You can use any of these constants:

- PDO::FETCH_ASSOC

    Prompts the fetch() or fetchAll() method to return an associative array. The array keys are database column names.

- PDO::FETCH_NUM

    Prompts the fetch() or fetchAll() method to return a numeric array. The array keys are the numeric index of database columns in your query result.

- PDO::FETCH_BOTH

    Prompts the fetch() or fetchAll() method to return an array that contains both associative and numeric array keys. This is a combination of PDO::FETCH_ASSOC and PDO::FETCH_NUM.

- PDO::FETCH_OBJ

    Prompts the fetch() or fetchAll() method to return an object whose properties are database column names.

See more <http://php.net/manual/pdostatement.fetch.php>.

If you are working with smaller result sets, you can fetch _all_ query
results with the prepared statement’s `fetchAll()` method. I typically discourage this method unless you are absolutely sure the complete query result is small enough to fit in available memory.

```
<?php
// Build and execute SQL query
$sql = 'SELECT id, email FROM users WHERE email = :email';
$statement = $pdo->prepare($sql);
$email = filter_input(INPUT_GET, 'email');
$statement->bindValue(':email', $email, PDO::PARAM_INT);
$statement->execute();

// Iterate results
$results = $statement->fetchAll(PDO::FETCH_ASSOC);
foreach ($results as $result) {
    echo $result['email'];
}
```

If you are concerned only with a single column in your query result, you can use the prepared statement’s `fetchColumn()` method. This method, similar to the `fetch()` method, returns the value of a single column from the next row of the query result. The `fetchColumn()` method’s one and only argument is the index of the desired column.

The query result column order matches the column order specified in the SQL query.

```php
<?php
// Build and execute SQL query
$sql = 'SELECT id, email FROM users WHERE email = :email';
$statement = $pdo->prepare($sql);
$email = filter_input(INPUT_GET, 'email');
$statement->bindValue(':email', $email, PDO::PARAM_INT);
$statement->execute();

// Iterate results
while (($email = $statement->fetchColumn(1)) !== false) {
    echo $email;
}
?>
```

The `email` column is listed second in the SQL query. It therefore becomes the second column in each query result row, and I pass the number `1` into the `fetchColumn()` method.

You can also use the prepared statement’s `fetchObject()` method to fetch the next query result row as an object whose property names are the SQL query result columns.

```
<?php
// Build and execute SQL query
$sql = 'SELECT id, email FROM users WHERE email = :email';
$statement = $pdo->prepare($sql);
$email = filter_input(INPUT_GET, 'email');
$statement->bindValue(':email', $email, PDO::PARAM_INT);
$statement->execute();

// Iterate results
while (($result = $statement->fetchObject()) !== false) {
    echo $result->name;
}
```

### Transactions

Not all databases support transactions. Check your database’s documentation and its associated PHP PDO driver for more information.

Atomicity is important when data integrity is paramount. Let’s explore example code that handles bank account transactions. Our code can deposit funds into an account. It can also withdraw funds from an account assuming there are sufficient funds.

```
<?php
require 'settings.php';

// PDO connection
try {
    $pdo = new PDO(
        sprintf(
            'mysql:host=%s;dbname=%s;port=%s;charset=%s',
            $settings['host'],
            $settings['name'],
            $settings['port'],
            $settings['charset']
        ),
        $settings['username'],
        $settings['password']
    );
} catch (PDOException $e) {
    // Database connection failed
    echo "Database connection failed";
    exit;
}

// Statements
$stmtSubtract = $pdo->prepare('
    UPDATE accounts
    SET amount = amount - :amount
    WHERE name = :name
');
$stmtAdd = $pdo->prepare('
    UPDATE accounts
    SET amount = amount + :amount
    WHERE name = :name
');

// Start transaction
$pdo->beginTransaction();

// Withdraw funds from account 1
$fromAccount = 'Checking';
$withdrawal = 50;
$stmtSubtract->bindParam(':name', $fromAccount);
$stmtSubtract->bindParam(':amount', $withDrawal, PDO::PARAM_INT);
$stmtSubtract->execute();

// Deposit funds into account 2
$toAccount = 'Savings';
$deposit = 50;
$stmtAdd->bindParam(':name', $toAccount);
$stmtAdd->bindParam(':amount', $deposit, PDO::PARAM_INT);
$stmtAdd->execute();

// Commit transaction
$pdo->commit();
```