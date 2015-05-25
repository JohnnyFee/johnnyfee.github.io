layout: post
title: "PHP Tutorial"
description: ""
category: PHP
tags: [php, tutorial]
---

## Basic Syntax

By default, PHP documents end with the extension .php. When a web server encounters this extension in a requested file, it automatically passes it to the PHP processor. 

To trigger the PHP commands, you need to learn a new tag. Here is the first part:

```php
<?php
    The first thing you may notice is that the tag has not been closed. This is because entire sections of PHP can be placed inside this tag, and they finish only when the closing part is encountered, which looks like this:
?>
```

A small PHP “Hello World” program:

```php
<?php
  echo "Hello world";
?>
```

The way you use this tag is quite flexible. Some programmers open the tag at the start of a document and close it right at the end, outputting any HTML directly from PHP commands. 

By the way, there is a slight variation to the PHP syntax, but should be discouraged.

```php
<?
  echo "Hello world";
?>
```

PHP is quite a simple language with roots in C and Perl, yet it looks more like Java. It is also very flexible, but there are a few rules that you need to learn about its syntax and structure.

- PHP commands ended with a semicolon, like `$x += 10;`
- In PHP, however, you must place a $ in front of all variables. This is required to make the PHP parser faster, as it instantly knows whenever it comes across a variable. Whether your variables are numbers, strings, or arrays, they should all look something like those:

        <?php
          $mycounter = 1;
          $mystring  = "Hello";
          $myarray   = array("One", "Two", "Three");
        ?>



### Comments

There are two ways in which you can add comments to your PHP code.

```php
<?php

// echo "X equals $x";

/* This is a section
   of multiline comments
   which will not be
   interpreted */

?>
```

### String

#### String concatenation

String concatenation uses the period (`.`) to append one string of characters to another. The simplest way to do this is as follows:

    echo "You have " . $msgs . " messages.";

Just as you can add a value to a numeric variable with the `+=` operator, you can append one string to another using _.=_, like this:

    $bulletin .= $newsflash;

#### String types

PHP supports two types of strings that are denoted by the type of quotation mark that you use. If you wish to assign a literal string, preserving the exact contents, you should use the single quotation mark (apostrophe), like this:

    $info = 'Preface variables with a $ like this: $variable';


In this case, every character within the single-quoted string is assigned to `$info`. If you had used double quotes, PHP would have attempted to evaluate `$variable` as a variable.

On the other hand, when you want to include the value of a variable inside a string, you do so by using double-quoted strings:

    echo "This week $count people have viewed your profile";

As you will realize, this syntax also offers a simpler form of concatenation in which you don’t need to use a period, or close and reopen quotes, to append one string to another. This is called _variable substitution_, and you will notice some applications using it extensively and others not using it at all.

#### Escaping characters

```php
<?php
$text = 'My spelling\'s still atroshus';
$text = "She wrote upon it, \"Return to sender\".";
$heading = "Date\tName\tPayment";
?>
```

#### Multiple-Line Commands

There are times when you need to output quite a lot of text from PHP, and using several `echo` (or `print`) statements would be time-consuming and messy. To overcome this, PHP offers two conveniences. The first is just to put multiple lines between quotes:

```php
<?php
  $author = "Steve Ballmer";

  echo "Developers, Developers, developers, developers, developers,
  developers, developers, developers, developers!

  - $author.";
?>
```

PHP also offers a multiline sequence using the `<<<` operator—commonly referred to as a _here-document_ or _heredoc_—as a way of specifying a string literal, preserving the line breaks and other whitespace (including indentation) in the text.

```php
<?php
  $author = "Brian W. Kernighan";

  echo <<<_END
  Debugging is twice as hard as writing the code in the first place.
  Therefore, if you write the code as cleverly as possible, you are,
  by definition, not smart enough to debug it.

  - $author.
_END;
?>
```

using the `<<<_END..._END;` heredoc construct, you don’t have to add `\n` linefeed characters to send a linefeed—just press Return and start a new line. Also, unlike either a double-quote- or single-quote-delimited string, you are free to use all the single and double quotes you like within a heredoc, without escaping them by preceding them with a slash (`\`).

###  echo and print

The two commands are quite similar, but `print` is a function-like construct that takes a single parameter and has a return value (which is always `1`), whereas `echo` is purely a PHP language construct. 

By and large, the `echo` command will be a tad faster than `print` in general text output, because it doesn’t set a return value. On the other hand, because it isn’t implemented like a function, `echo` cannot be used as part of a more complex expression, whereas `print` can. Here’s an example to output whether the value of a variable is `TRUE` or `FALSE` using `print`, something you could not perform in the same manner with `echo`, because it would display a `Parse error` message:

    $b ? print "TRUE" : print "FALSE";

### Functions

To create a function:

```php
<?php
  function longdate($timestamp)
  {
    return date("l F jS Y", $timestamp);
  }
?>
```

## Variables

You must enclose each string in either quotation marks or apostrophes (single quotes).

    $username = "Fred Smith";

You can assign it to another variable:

    $current_user = $username;

You can print it out:

    echo $username;

```php
<?php
    // number
    $count = 17;

    // array
    $team = array('Bill', 'Mary', 'Mike', 'Chris', 'Anne');
    echo $team[3]; // Displays the name Chris

    // two-dimensional arrays
    $oxo = array(array('x', ' ', 'o'),
               array('o', 'o', 'x'),
               array('x', 'o', ' '));
    echo $oxo[1][2];
?>
```

PHP is a very loosely typed language. This means  that variables do not have to be declared before they are used, and that PHP always converts variables to the type required by their context when they are accessed.

For example, you can create a multiple-digit number and extract the nth digit from it simply by assuming it to be a string. 

```php
<?php
  $number = 12345 * 67890;
  echo substr($number, 3, 1);
?>
```

The same goes for turning a string into a number, and so on. 

```php
<?php
  $pi     = "3.1415927";
  $radius = 5;
  echo $pi * ($radius * $radius);
?>
```

### Implicit and Explicit Casting

PHP is a loosely typed language that allows you to declare a variable and its type simply by using it. It also automatically converts values from one type to another whenever required. This is called implicit casting.

However, at times PHP’s implicit casting may not be what you want.

```php
<?php
  $a = 56;
  $b = 12;
  $c = $a / $b;

  echo $c;
?>
```

But what if we had wanted `$c` to be an integer instead? There are various ways in which we could achieve this, one of which is to force the result of `$a`/`$b` to be cast to an integer value using the integer cast type `(int)`, like this:

    $c = (int) ($a / $b);

You can explicitly cast to the types shown in flowing table, but you can usually avoid having to use a cast by calling one of PHP’s built-in functions. For example, to obtain an integer value, you could use the `intval` function. As with some other sections in this book, this one is mainly here to help you understand third-party code that you may encounter.

Cast type |  Description
----------|----------
(int) |(integer) Cast to an integer by dropping the decimal portion
(bool) |(boolean)    Cast to a Boolean
(float) |(double) (real) Cast to a floating-point number
(string) |   Cast to a string
(array) |Cast to an array
(object) |   Cast to an object

### Constants

Constants are similar to variables, holding information to be accessed later, except that they are what they sound like—constant. In other words, once you have defined one, its value is set for the remainder of the program and cannot be altered.

One example of a use for a constant is to hold the location of your server root (the folder with the main files of your website). You would define such a constant like this:
 
    define("ROOT_LOCATION", "/usr/local/www/");

Then, to read the contents of the variable, you just refer to it like a regular variable (but it isn’t preceded by a dollar sign):

    $directory = ROOT_LOCATION;

The main two things you have to remember about constants are that they must _not_ be prefaced with a `$` (as with regular variables), and that you can define them only using the `define` function.

### Predefined Constants

PHP comes ready-made with dozens of predefined constants that you generally will be unlikely to use as a beginner to PHP. However, there are a few—known as the magic constants—that you will find useful. The names of the magic constants always have two underscores at the beginning and two at the end, so that you won’t accidentally try to name one of your own constants with a name that is already taken.


Magic constant  |    Description
----------------|-----------------
__LINE__        |    The current line number of the file.
__FILE__        |    The full path and filename of the file. If used inside an include, the name of the included file is returned. In PHP 4.0.2, __FILE__ always contains an absolute path with symbolic links resolved, whereas in older versions it might contain a relative path under some circumstances.
__DIR__         |    The directory of the file. If used inside an include, the directory of the included file is returned. This is equivalent to dirname(__FILE__). This directory name does not have a trailing slash unless it is the root directory. (Added in PHP 5.3.0.)
__FUNCTION__    |    The function name. (Added in PHP 4.3.0.) As of PHP 5, returns the function name as it was declared (case-sensitive). In PHP 4, its value is always lowercase.
__CLASS__       |    The class name. (Added in PHP 4.3.0.) As of PHP 5, returns the class name as it was declared (case-sensitive). In PHP 4, its value is always lowercased.
__METHOD__      |    The class method name. (Added in PHP 5.0.0.) The method name is returned as it was declared (case-sensitive).
__NAMESPACE__   |    The name of the current namespace (case-sensitive). This constant is defined at compile time. (Added in PHP 5.3.0.)

### Global variables

To declare a variable as having global scope, use the keyword `global`. Let’s assume that you have a way of logging your users into your website and want all your code to know whether it is interacting with a logged-in user or a guest. One way to do this is to create a global variable such as `$is_logged_in`:

    global $is_logged_in;

Sometimes I adopt the convention of making all global variable names uppercase (just as it’s recommended that constants should be uppercase) so that I can see at a glance the scope of a variable.

### Static variables

Here’s an interesting case. What if you have a local variable inside a function that you don’t want any other parts of your code to have access to, but you would also like to keep its value for the next time the function is called? Why? Perhaps because you want a counter to track how many times a function is called. The solution is to declare a static variable.

```php
<?php
  function test()
  {
    static $count = 0;
    echo $count;
    $count++;
  }
?>
```

If you plan to use static variables, you should note that you cannot assign the result of an expression in their definitions. They can be initialized only with predetermined values:

```php
<?php
  static $int = 0;         // Allowed
  static $int = 1+2;       // Disallowed (will produce a Parse error)
  static $int = sqrt(144); // Disallowed
?>
```

### Superglobal variables

Starting with PHP 4.1.0, several predefined variables are available. These are known as superglobal variables, which means that they are provided by the PHP environment but are global within the program, accessible absolutely everywhere.
These superglobals contain lots of useful information about the currently running program and its environment:

Superglobal name |   Contents
--------|--------
`$GLOBALS`|  All variables that are currently defined in the global scope of the script. The variable names are the keys of the array.
`$_SERVER` | Information such as headers, paths, and script locations. The entries in this array are created by the web server, and there is no guarantee that every web server will provide any or all of these.
`$_GET`  | Variables passed to the current script via the HTTP Get method.
`$_POST`  |Variables passed to the current script via the HTTP Post method.
`$_FILES`|Items uploaded to the current script via the HTTP Post method.
`$_COOKIE` |   Variables passed to the current script via HTTP cookies.
`$_SESSION` |  Session variables available to the current script.
`$_REQUEST` |  Contents of information passed from the browser; by default, $_GET, $_POST, and $_COOKIE.
`$_ENV`  | Variables passed to the current script via the environment method.

All of the superglobals (except for `$GLOBALS`) are named with a single initial underscore and only capital letters; therefore, you should avoid naming your own variables in this manner to avoid potential confusion.

A word of caution is in order before you start using superglobal variables, because they are often used by hackers trying to find exploits to break into your website. What they do is load up `$_POST`, `$_GET`, or other superglobals with malicious code, such as Unix or MySQL commands that can damage or display sensitive data if you naïvely access them.Therefore, you should always sanitize superglobals before using them. One way to do this is via the PHP `htmlentities` function. It converts all characters into HTML entities. For example, less-than and greater-than characters (`<` and `>`) are transformed into the strings `&lt;` and `&gt;` so that they are rendered harmless, as are all quotes and backslashes, and so on.

Therefore, here is a much better way to access `$_SERVER` (and other superglobals) is:

    $came_from = htmlentities($_SERVER['HTTP_REFERER']);

Using the `htmlentities` function for sanitization is an important practice in any circumstance where user or other third-party data is being processed for output, not just with superglobals.

## Including and Requiring Files

As you progress in your use of PHP programming, you are likely to start building a library of functions that you think you will need again. You’ll also probably start using libraries created by other programmers.There’s no need to copy and paste these functions into your code. You can save them in separate files and use commands to pull them in. There are two types of command to perform this action: `include` and `require`.

Using `include`, you can tell PHP to fetch a particular file and load all its contents. 

```php
<?php
  include "library.php";

  // Your code goes here
?>
```

Each time you issue the `include` directive, it includes the requested file again, even if you’ve already inserted it. For instance, suppose that _library.php_ contains a lot of useful functions, so you include it in your file, but also include another library that includes _library.php_. Through nesting, you’ve inadvertently included _library.php_ twice. This will produce error messages, because you’re trying to define the same constant or function multiple times. So you should use `include_once` instead. 

```php
<?php
  include_once "library.php";

  // Your code goes here
?>
```

Then, whenever another `include` or `include_once` is encountered, if it has already been executed, it will be completely ignored. To determine whether the file has already been executed, the absolute file path is matched after all relative paths are resolved and the file is found in your `include` path.

In general, it’s probably best to stick with `include_once` and ignore the basic `include` statement. That way, you will never have the problem of files being included multiple times.

