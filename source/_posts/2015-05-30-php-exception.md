layout: post
title: "PHP Errors and Exceptions"
description: ""
category: PHP
tags: [php, tutorial]
---

It’s possible to circumvent PHP errors with the `@` prefix in front of a PHP function that might trigger an error (e.g., `@fopen()`). _This is an antipattern_. I recommend you change your code to avoid these situations.

Exceptions are an object-oriented evolution of PHP’s error handling system. They are instantiated, thrown, and caught. Exceptions are a more flexible device that anticipates and handles problems _in situ_ without halting script execution. Exceptions are also an offensive _and_ defensive device. We must anticipate exceptions thrown by third-party vendor code with `try {} catch {}` blocks. We can also act offensively by throwing an exception; this delegates exception handling to other developers when we don’t know how to handle a given situation on our own.

## Exceptions

An exception is an object of class `Exception` that is _thrown_ when you encounter an irreparable situation from which you cannot recover (e.g., a remote API is unresponsive, a database query fails, or a precondition is not satisfied). I call these _exceptional situations_. Exceptions are used offensively to delegate responsibility when a problem occurs, and they are used defensively to anticipate and mitigate potential problems.

You instantiate an `Exception` object with the `new` keyword just like any other PHP object. An `Exception` object has two primary properties: a message and a numeric code. The message describes what went wrong. The numeric code is optional and can be used to provide context for a given exception. You provide the message and optional numeric code when you instantiate an `Exception` object like this:

```
<?php
$exception = new Exception('Danger, Will Robinson!', 100);
```

You can inspect an `Exception` object with its `getCode()` and `getMessage()` public instance methods like this:

```
<?php
$code = $exception->getCode(); // 100
$message = $exception->getMessage(); // 'Danger...'
```

### Throw exceptions

You can assign an exception to a variable upon instantiation, but exceptions are meant to be _thrown_. If you write code for other developers, you must act offensively in exceptional situations, meaning you throw exceptions when your code encounters exceptional situations or cannot otherwise operate under current conditions. PHP component and framework authors, in particular, cannot presume how to handle exceptional situations; instead, they throw an exception and delegate responsibility to the developer using their code.

When an exception is thrown, code execution is immediately halted and subsequent PHP code is not run. To throw an exception, use the `throw` keyword followed by the `Exception` instance:

```
<?php
throw new Exception('Something went wrong. Time for lunch!');
```

You can only throw an instance of class `Exception` (or a subclass of `Exception`). PHP provides these built-in `Exception` subclasses:

1. [`Exception`](http://php.net/manual/class.exception.php)
2. [`ErrorException`](http://php.net/manual/class.errorexception.php)

he [Standard PHP Library](http://php.net/manual/book.spl.php) (SPL) supplements
PHP’s built-in exceptions with these additional `Exception` subclasses:

* [`LogicException`](http://php.net/manual/class.logicexception.php)
    * [`BadFunctionCallException`](http://php.net/manual/class.badfunctioncallexception.php)
        * [`BadMethodCallException`](http://php.net/manual/class.badmethodcallexception.php)
    * [`DomainException`](http://php.net/manual/class.domainexception.php)
    * [`InvalidArgumentException`](http://php.net/manual/class.invalidargumentexception.php)
    * [`LengthException`](http://php.net/manual/class.lengthexception.php)
    * [`OutOfRangeException`](http://php.net/manual/class.outofrangeexception.php)
* [`RuntimeException`](http://php.net/manual/class.runtimeexception.php)
    * [`OutOfBoundsException`](http://php.net/manual/class.outofboundsexception.php)
    * [`OverflowException`](http://php.net/manual/class.overflowexception.php)
    * [`RangeException`](http://php.net/manual/class.rangeexception.php)
    * [`UnderflowException`](http://php.net/manual/class.underflowexception.php)
    * [`UnexpectedValueException`](http://php.net/manual/class.unexpectedvalueexception.php)

Each subclass exists for a certain situation and provides context for _why_ an exception is thrown. For example, if a PHP component method expects a string argument with at least five characters but is given a string with only two characters, it can throw an `InvalidArgumentException` instance. Because PHP provides an exception _class_, you can easily extend the `Exception` class to create your own custom exception subclasses with their own custom properties and methods. Which exception subclass you use is subjective. Choose or create the exception subclass that best answers _why am I throwing this
exception?_, and document your choice.

### Catch exceptions

Surround code that might throw an exception with a `try/catch` block to intercept and handle potential exceptions. 

```
<?php
try {
    $pdo = new PDO('mysql://host=wrong_host;dbname=wrong_name');
} catch (PDOException $e) {
    // Inspect the exception for logging
    $code = $e->getCode();
    $message = $e->getMessage();

    // Display a nice message to the user
    echo 'Something went wrong. Check back soon, please.';
    exit;
}
```

You can use multiple `catch` blocks to intercept multiple types of exceptions. This is useful if you need to act differently based on the type of exception thrown. You can also use a `finally` block to _always_ run a block of code after you catch _any_ exception.

```
<?php
try {
    throw new Exception('Not a PDO exception');
    $pdo = new PDO('mysql://host=wrong_host;dbname=wrong_name');
} catch (PDOException $e) {
    // Handle PDO exception
    echo "Caught PDO exception";
} catch (Exception $e) {
    // Handle all other exceptions
    echo "Caught generic exception";
} finally {
    // Always do this
    echo "Always do this";
}
```

### Exception Handlers

An exception handler is anything that is _callable_. I prefer to use an anonymous function, but you can also use a class method. Whatever you choose, it must accept one argument of class `Exception`. You register your exception handler with the `set_exception_handler()` function like this:

```
<?php
set_exception_handler(function (Exception $e) {
    // Handle and log exception
});
```

In some situations, you may need to replace an existing exception handler with your own exception handler. PHP etiquette suggests you restore the existing exception handler when your code is finished. You can restore a previous exception handler with the `restore_exception_handler()` function:

```
<?php
// Register your exception handler
set_exception_handler(function (Exception $e) {
    // Handle and log exception
});

// Your code goes here...

// Restore previous exception handler
restore_exception_handler();
```

## Errors

PHP provides error-reporting functions in addition to exceptions. This confuses many PHP developers. PHP can trigger different types of errors, including fatal errors, runtime errors, compile-time errors, startup errors, and (more rarely) user-triggered errors. You’ll most often encounter PHP errors caused by syntax mistakes or uncaught exceptions.

The difference between errors and exceptions is subtle. Errors are often triggered when a PHP script cannot fundamentally run as expected for whatever reason (e.g., there is a syntax mistake). It is also possible to trigger your own errors with the `trigger_error()` function and handle them with a custom error handler, but it is better to use exceptions when writing userland code. Unlike errors, PHP exceptions can be thrown and caught at any level of your PHP application. Exceptions provide more contextual information than PHP errors. And you can extend the topmost `Exception` class with your own custom exception subclasses. Exceptions and a good logger like Monolog are a far more versatile solution than PHP errors. However, modern PHP developers must anticipate and handle both PHP errors and PHP exceptions. 

You can instruct PHP which errors to report, and which to ignore, with the `error_reporting()` function or the `error_reporting` directive in your _php.ini_ file. Both accept named `E_*` constants that determine which errors are reported and which are ignored.

Learn more about PHP error reporting at <http://php.net/manual/function.error-reporting.php>.

PHP error reporting can be as sensitive or stoic as you tell it to be. In development, I prefer PHP to obnoxiously display and log all error messages. In production, I instruct PHP to log most error messages but not display them. Whatever you do, you should always follow these four rules:

* Always turn on error reporting.
* Display errors during development.
* _Do not_ display errors during production.
* Log errors during development and production.

Here are my error-reporting _php.ini_ settings for development:

```
; Display errors
display_startup_errors = On
display_errors = On

; Report all errors
error_reporting = -1

; Turn on error logging
log_errors = On
```

Here are my error-reporting php.ini settings for production:

```
; DO NOT display errors
display_startup_errors = Off
display_errors = Off

; Report all errors EXCEPT notices
error_reporting = E_ALL & ~E_NOTICE

; Turn on error logging
log_errors = On
```

The main difference is that I display errors in my PHP script output during development. I do not display errors in my PHP script output in production. However, I log errors in both environments. If I have a bug in my production PHP application (and this never happens…cough), I can review my PHP log file for details.

### Error Handlers

Just as you can with exception handlers, you can set a global error handler to intercept and handle PHP errors with your own logic. The error handler lets you fail gracefully by cleaning up loose ends before terminating the PHP script.

An error handler, like an exception handler, is anything that is callable (e.g., a function or class method). It is your responsibility to `die()` or `exit()` inside of your error handler. If you don’t manually terminate the PHP script inside your error handler, the PHP script will continue executing from where the error occurred. You register your global error handler with the `set_error_handler()`, and you pass it an argument that is callable:

```
<?php
set_error_handler(function ($errno, $errstr, $errfile, $errline) {
    // Handle error
});
```

Your error-handler callable receives five arguments:

- $errno The error level (maps to a PHP E_* constant).
- $errstr The error message.
- $errfile The filename in which the error occurred.
- $errline The file line number on which the error occurred.
- $errcontext
    
    An array that points to the active symbol table when the error occurred. This is optional and is only useful for advanced debugging purposes. I usually ignore this argument.

There’s one important caveat that you absolutely must know when using a custom error handler. PHP will send _all_ errors to your error handler, even those that are excluded by your current error-reporting setting. It is your responsibility to inspect each error code (the first argument) and act appropriately. You _can_ instruct your error handler to only respond to a subset of error types with a second argument to the `set_error_handler()` function; this argument is a bitwise mask of `E_*` constants (e.g., `E_ALL | E_STRICT`).

This is as good a time as any to segue into a common practice that I and many other PHP developers use in our PHP applications. I like to convert PHP errors into `ErrorException` objects. The `ErrorException` class is a subclass of `Exception`, and it comes built into PHP. This lets me convert PHP errors into exceptions and funnel them into my existing exception handling workflow.

Not all errors can be converted into exceptions! These errors include `E_ERROR`, `E_PARSE`, `E_CORE_ERROR`, `E_CORE_WARNING`, `E_COMPILE_ERROR`, `E_COMPILE_WARNING`, and most of `E_STRICT`.

Converting PHP errors is a bit tricky, and we must be careful to convert only the errors that satisfy the `error_reporting` setting in our _php.ini_ file. Here’s an example error-handler function that converts PHP errors into `ErrorException` objects:

```
<?php
set_error_handler(function ($errno, $errstr, $errfile, $errline) {
    if (!(error_reporting() & $errno)) {
        // Error is not specified in the error_reporting
        // setting, so we ignore it.
        return;
    }

    throw new \ErrorException($errstr, $errno, 0, $errfile, $errline);
});
```

This error-handler function converts the appropriate PHP errors into `ErrorException` objects and throws them into our existing exception-handling system. It is considered good etiquette to restore the previous error handler (if any) after your own code is done. You can restore the previous handler with the `restore_error_handler()` function.

```
<?php
// Register error handler
set_error_handler(function ($errno, $errstr, $errfile, $errline) {
    if (!(error_reporting() & $errno)) {
        // Error is not specified in the error_reporting
        // setting, so we ignore it.
        return;
    }

    throw new ErrorException($errstr, $errno, 0, $errfile, $errline);
});

// Your code goes here...

// Restore previous error handler
restore_error_handler();
```

### Errors and Exceptions During Development

We know we should display errors during development. But PHP’s default error messages are ugly and often injected into the normal PHP script output, resulting in a hard-to-read mess. Use[Whoops](https://github.com/filp/whoops) instead. Whoops is a modern PHP component that provides a well-designed, easy-to-read diagnostics page for PHP errors and exceptions. Whoops, created and maintained by [Filipe Dobreira](https://github.com/filp) and [Denis Sokolov](https://github.com/denis-sokolov).

![](http://johnnyimages.qiniudn.com/php-error-develop.png)

The Whoops diagnostic screen is light years better than the default PHP error and exception output.

Whoops is easy to implement, too. Update your _composer.json_ file as shown below, and run either `composer install` or `composer update`:

```
{
    "require": {
        "filp/whoops": "~1.0"
    }
}
```

Next, register the Whoops error and exception handlers in your PHP application’s bootstrap file:

```
<?php
// Use composer autoloader
require 'path/to/vendor/autoload.php';

// Setup Whoops error and exception handlers
$whoops = new \Whoops\Run;
$whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler);
$whoops->register();
```

### Production

We know we should log errors in production. PHP provides the `error_log()` function to write messages to the filesystem, to `syslog`, or into an email. But there’s a better option, and it’s called[Monolog](https://github.com/Seldaek/monolog). Monolog is a very good PHP component that specializes in one thing—logging. It’s easy to integrate into your PHP applications with Composer.

First, require the `monolog/monolog` package in your _composer.json_ file:

```
{
    "require": {
        "monolog/monolog": "~1.11"
    }
}
```

Next, install the component with either `composer install` or `composer update`, and add the code from Example 5-43 to the top of your PHP application’s bootstrap file.

```
<?php
// Use Composer autoloader
require 'path/to/vendor/autoload.php';

// Import Monolog namespaces
use Monolog\Logger;
use Monolog\Handler\StreamHandler;

// Setup Monolog logger
$log = new Logger('my-app-name');
$log->pushHandler(new StreamHandler('path/to/your.log', Logger::WARNING));
```

That’s it. You now have a Monolog logger that will write all logged messages of type `Logger::WARNING` or higher to the _path/to/your.log_ file.

Monolog is very extensible. You can define multiple handlers that only handle specific log levels. For example, we can push a second Monolog handler that emails an administrator for critical, alert, or emergency errors. We’ll need the SwiftMailer PHP component, so let’s add that to the _composer.json_ file and run `composer update`:

```
{
    "require": {
        "monolog/monolog": "~1.11",
        "swiftmailer/swiftmailer": "~5.3"
    }
}
```

Next, we’ll modify our code and add a new Monolog handler that accepts a SwiftMailer instance to send email messages:

```
<?php
// Use Composer autoloader
require 'vendor/autoload.php';

// Import Monolog namespaces
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Monolog\Handler\SwiftMailerHandler;

date_default_timezone_set('America/New_York');

// Setup Monolog and basic handler
$log = new Logger('my-app-name');
$log->pushHandler(new StreamHandler('logs/production.log', Logger::WARNING));

// Add SwiftMailer handler for critical errors
$transport = \Swift_SmtpTransport::newInstance('smtp.example.com', 587)
             ->setUsername('USERNAME')
             ->setPassword('PASSWORD');
$mailer = \Swift_Mailer::newInstance($transport);
$message = \Swift_Message::newInstance()
           ->setSubject('Website error!')
           ->setFrom(array('daemon@example.com' => 'John Doe'))
           ->setTo(array('admin@example.com'));
$log->pushHandler(new SwiftMailerHandler($mailer, $message, Logger::CRITICAL));

// Use logger
$log->critical('The server is on fire!');
```

Now when a critical, alert, or emergency message is logged, Monolog emails the logged message using the SwiftMailer `$mailer` and `$message` objects. The email body is the logged message text.