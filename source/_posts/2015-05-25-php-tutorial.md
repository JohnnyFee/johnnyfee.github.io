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

## Arrays

Some arrays are referenced by numeric indices; others allow alphanumeric identifiers. 

### Numerically Indexed Arrays

```
<?php
  $paper[] = "Copier";
  $paper[] = "Inkjet";
  $paper[] = "Laser";
  $paper[] = "Photo";

  print_r($paper);
?>
```

In this example, each time you assign a value to the array `$paper`, the first empty location within that array is used to store the value, and a pointer internal to PHP is incremented to point to the next free location, ready for future insertions.

The previous code could also have been written:

```
<?php
  $paper[0] = "Copier";
  $paper[1] = "Inkjet";
  $paper[2] = "Laser";
  $paper[3] = "Photo";

  print_r($paper);
?>
```

So unless you wish to specify a different order, it’s usually better to simply let PHP handle the actual location numbers.

### Associative Arrays

```
<?php
  $paper['copier'] = "Copier & Multipurpose";
  $paper['inkjet'] = "Inkjet Printer";
  $paper['laser']  = "Laser Printer";
  $paper['photo']  = "Photographic Paper";

  echo $paper['laser'];
?>
```

In place of a number (which doesn’t convey any useful information, aside from the position of the item in the array), each item now has a unique name that you can use to reference it elsewhere.

This very powerful feature of PHP is often used when you are extracting information from XML and HTML. For example, an HTML parser such as those used by a search engine could place all the elements of a web page into an associative array whose names reflect the page’s structure:

    $html['title'] = "My web page";
    $html['body']  = "... body of web page ...";

The program would also probably break down all the links found within a page into another array, and all the headings and subheadings into another. When you use associative rather than numeric arrays, the code to refer to all of these items is easy to write and debug.

### Assignment Using the array Keyword

```
<?php
  $p1 = array("Copier", "Inkjet", "Laser", "Photo");

  echo "p1 element: " . $p1[2] . "<br>";

  $p2 = array('copier' => "Copier & Multipurpose",
              'inkjet' => "Inkjet Printer",
              'laser'  => "Laser Printer",
              'photo'  => "Photographic Paper");

  echo "p2 element: " . $p2['inkjet'] . "<br>";
?>
```

The first half of this snippet assigns the old, shortened product descriptions to the array `$p1`. There are four items, so they will occupy slots 0 through 3. 

The second half assigns associative identifiers and accompanying longer product descriptions to the array `$p2` using the format _`index`_ `=>` _`value`_.

### The foreach...as Loop

Numberic array:

```
<?php
  $paper = array("Copier", "Inkjet", "Laser", "Photo");
  $j = 0;

  foreach($paper as $item)
  {
    echo "$j: $item<br>";
    ++$j;
  }
?>
```

Now let’s see how foreach works with an associative array:

```
<?php
  $paper = array('copier' => "Copier & Multipurpose",
                 'inkjet' => "Inkjet Printer",
                 'laser'  => "Laser Printer",
                 'photo'  => "Photographic Paper");

  foreach($paper as $item => $description)
    echo "$item: $description<br>";
?>
```

Each item of the array `$paper` is fed into the key/value pair of variables `$item` and `$description`, from which they are printed out. 

As an alternative syntax to `foreach...as`, you can use the `list` function in conjunction with the `each` function:

```
<?php
  $paper = array('copier' => "Copier & Multipurpose",
                 'inkjet' => "Inkjet Printer",
                 'laser'  => "Laser Printer",
                 'photo'  => "Photographic Paper");

  while (list($item, $description) = each($paper))
    echo "$item: $description<br>";
?>
```

A `while` loop is set up and will continue looping until `each` returns a value of `FALSE`. The `each` function acts like `foreach`: it returns an array containing a key/value pair from the array `$paper` and then moves its built-in pointer to the next pair in that array. When there are no more pairs to return, `each` returns `FALSE`.

The `list` function takes an array as its argument (in this case, the key/value pair returned by the function `each`) and then assigns the values of the array to the variables listed within parentheses.

```
<?php
  list($a, $b) = array('Alice', 'Bob');
  echo "a=$a b=$b";
?>
```

So you can take your pick when walking through arrays. Use `foreach...as` to create a loop that extracts values to the variable following the `as`, or use the `each` function and create your own looping system.

### Using Array Functions

See [PHP: Array Functions - Manual](http://php.net/manual/en/ref.array.php)

## printf

###  echo and print

The two commands are quite similar, but `print` is a function-like construct that takes a single parameter and has a return value (which is always `1`), whereas `echo` is purely a PHP language construct. 

By and large, the `echo` command will be a tad faster than `print` in general text output, because it doesn’t set a return value. On the other hand, because it isn’t implemented like a function, `echo` cannot be used as part of a more complex expression, whereas `print` can. Here’s an example to output whether the value of a variable is `TRUE` or `FALSE` using `print`, something you could not perform in the same manner with `echo`, because it would display a `Parse error` message:

    $b ? print "TRUE" : print "FALSE";

A much more powerful function, `printf`, controls the format of the output by letting you put special formatting characters in a string.

For instance, the following example uses the `%d` conversion specifier to display the value `3` in decimal:

    printf("There are %d items in your basket", 3);

If you replace the `%d` with `%b`, the value `3` would be displayed in binary (`11`). 

Specifier |  Conversion action on argument arg  | Example (for an arg of 123)
--------|--------|--------
`%` |  Display a % character (no arg required) |%
`b` |  Display arg as a binary integer |1111011
`c` |  Display ASCII character for the arg |{
`d` |  Display arg as a signed decimal integer |123
`e` |  Display arg using scientific notation   |1.23000e+2
`f` |  Display arg as floating point  | 123.000000
`o` |  Display arg as an octal integer |173
`s` |  Display arg as a string |123
`u` |  Display arg as an unsigned decimal  |123
`x` |  Display arg in lowercase hexadecimal |   7b
`X` |  Display arg in uppercase hexadecimal  |  7B

You can have as many specifiers as you like in a `printf` function, as long as you pass a matching number of arguments, and as long as each specifier is prefaced by a `%` symbol. Therefore, the following code is valid, and will output `"My name is Simon. I'm 33 years old, which is 21 in hexadecimal"`:

    printf("My name is %s. I'm %d years old, which is %X in hexadecimal", 'Simon', 33, 33);

A more practical example of `printf` sets colors in HTML using decimal. For example, suppose you know you want a color that has a triplet value of 65 red, 127 green, and 245 blue, but don’t want to convert this to hexadecimal yourself. Here’s an easy solution is:

    printf("<span style='color:#%X%X%X'>Hello</span>", 65, 127, 245);

Check the format of the color specification between the apostrophes (`''`) carefully. First comes the pound, or hash, sign (`#`) expected by the color specification. Then come three `%X` format specifiers, one for each of your numbers. The resulting output from this command is as follows:

    <span style='color:#417FF5'>Hello</span>

### Precision Setting

Not only can you specify a conversion type, but you can also set the precision of the displayed result. 

    printf("The result is: $%.2f", 123.42 / 12); // The result is $10.29

You can also specify whether to pad output with either zeros or spaces by prefacing the specifier with certain values.

```php
<?php
  echo "<pre>"; // Enables viewing of the spaces

  // Pad to 15 spaces
  printf("The result is $%15f\n", 123.42 / 12); //  $      10.285000

  // Pad to 15 spaces, fill with zeros
  printf("The result is $%015f\n", 123.42 / 12); // $00000010.285000

  // Pad to 15 spaces, 2 decimal places precision
  printf("The result is $%15.2f\n", 123.42 / 12); // $          10.29

  // Pad to 15 spaces, 2 decimal places precision, fill with zeros
  printf("The result is $%015.2f\n", 123.42 / 12); // $000000000010.29

  // Pad to 15 spaces, 2 decimal places precision, fill with # symbol
  printf("The result is $%'#15.2f\n", 123.42 / 12); // $##########10.29
?>
```

### String Padding

You can also pad strings to required lengths (as you can with numbers), select different padding characters, and even choose between left and right justification.

```php
<?php
  echo "<pre>"; // Enables viewing of the spaces

  $h = 'Rasmus';

  // [Rasmus]
  printf("[%s]\n",         $h); // Standard string output
  
  // [      Rasmus]
  printf("[%12s]\n",       $h); // Right justify with spaces to width 12

  // [Rasmus      ]
  printf("[%-12s]\n",      $h); // Left justify with spaces

  // [000000Rasmus]
  printf("[%012s]\n",      $h); // Zero padding

  // [######Rasmus]
  printf("[%'#12s]\n\n",   $h); // Use the custom padding character '#'

  $d = 'Rasmus Lerdorf';        // The original creator of PHP

  // [    Rasmus L]
  printf("[%12.8s]\n",     $d); // Right justify, cutoff of 8 characters

  // [Rasmus Lerdo]
  printf("[%-12.12s]\n",   $d); // Left justify, cutoff of 12 characters

  // [Rasmus Ler@@]
  printf("[%-'@12.10s]\n", $d); // Left justify, pad '@', cutoff 10 chars
?>
```

### Using sprintf

Often, you don’t want to output the result of a conversion but need it to use elsewhere in your code. This is where the `sprintf` function comes in. With it, you can send the output to another variable rather than to the browser.You might use it to make a conversion, as in the following example, which returns the hexadecimal string value for the RGB color group 65, 127, 245 in `$hexstring`:

    $hexstring = sprintf("%X%X%X", 65, 127, 245);

Or you may wish to store output ready to display later on:

    $out = sprintf("The result is: $%.2f", 123.42 / 12);
    echo $out;

## Date and Time

To keep track of the date and time, PHP uses standard Unix timestamps, which are simply the number of seconds since the start of January 1, 1970. To determine the current timestamp, you can use the `time` function:

    echo time();

Because the value is stored as seconds, to obtain the timestamp for this  time next week, you would use the following, which adds 7 days times 24 hours times 60 minutes times 60 seconds to the returned value:

    echo time() + 7 * 24 * 60 * 60;

If you wish to create a timestamp for a given date, you can use the `mktime` function. Its output is the timestamp `946684800` for the first second of the first minute of the first hour of the first day of the year 2000:

    echo mktime(0, 0, 0, 1, 1, 2000); // (hour, minute, seconds, month, day, year)

To display the date, use the `date` function, which supports a plethora of formatting options, enabling you to display the date any way you wish. The format is as follows:

    date($format, $timestamp);

The parameter `$format` should be a string containing formatting specifiers as bellowing, and `$timestamp` should be a Unix timestamp. See [PHP: date - Manual](http://php.net/manual/en/function.date.php).

Format|  Description| Returned value
------|------|------
Day specifiers | |
d |  Day of month, two digits, with leading zeros  |  01 to 31
D |  Day of the week, three letters | Mon to Sun
j |  Day of the month, no leading zeros | 1 to 31
l |  Day of week, full names Sunday to Saturday
N |  Day of week, numeric, Monday to Sunday | 1 to 7
S |  Suffix for day of month (useful with specifier j)  | st, nd, rd, or th
w |  Day of week, numeric, Sunday to Saturday  |  0 to 6
z |  Day of year | 0 to 365
Week specifier | |
W |  Week number of year |01 to 52
Month specifiers | |
F |  Month name  |January to December
m |  Month number with leading zeros| 01 to 12
M |  Month name, three letters |  Jan to Dec
n |  Month number, no leading zeros| 1 to 12
t |  Number of days in given month |  28 to 31
Year specifiers | |
L |  Leap year  | 1 = Yes, 0 = No
y |  Year, 2 digits  |00 to 99
Y |  Year, 4 digits |0000 to 9999
Time specifiers | |
a |  Before or after midday, lowercase  | am or pm
A |  Before or after midday, uppercase  | AM or PM
g |  Hour of day, 12-hour format, no leading zeros  | 1 to 12
G |  Hour of day, 24-hour format, no leading zeros   |00 to 23
h |  Hour of day, 12-hour format, with leading zeros |01 to 12
H |  Hour of day, 24-hour format, with leading zeros |00 to 23
i |  Minutes, with leading zeros |00 to 59
s |  Seconds, with leading zeros |00 to 59

### Dates, Times, and Time Zones

Working with dates and times is hard. Pretty much every PHP developer has, at one time or another, made a mistake working with dates and times. This is precisely why I recommend you do not manage dates and times on your own. There are too many considerations to juggle, including date formats, time zones, daylight saving, leap years, leap seconds, and months with variable numbers of days. It’s too easy for your own calculations to become inaccurate. Instead, use the `DateTime`, `DateInterval`, and `DateTimeZone` classes introduced in PHP 5.2.0. These helpful classes provide a simple object-oriented interface to accurately create and manipulate dates, times, and timezones.

### Set a Default Time Zone

The first thing you should do is declare a default time zone for PHP’s date and time functions. If you don’t set a default time zone, PHP shows an `E_WARNING` message. There are two ways to set the default time zone. You can declare the default time zone in the _php.ini_ file like this:

    date.timezone = 'America/New_York';

You can also declare the default time zone during runtime with the `date_default_timezone_set()` function.

```
<?php
date_default_timezone_set('America/New_York');
```

Either solution requires a valid time-zone identifier. You can find a complete list of PHP time-zone identifiers at <http://php.net/manual/timezones.php>.

### The DateTime Class

The `DateTime` class provides an object-oriented interface to manage date and time values. A single `DateTime` instance represents a specific date and time. The `DateTime` class constructor is the simplest way to create a new `DateTime` instance.

```
<?php
$datetime = new DateTime();
```

Without arguments, the `DateTime` class constructor creates an instance that represents the current date and time. You can pass a string argument into the `DateTime` class constructor to specify a custom date and time (Example 5-11). The string argument must use one of the valid date and time formats listed at <http://php.net/manual/datetime.formats.php>.

```
<?php
$datetime = new DateTime('2014-04-27 5:03 AM');
```

In an ideal world, you are given date and time data in a format that PHP understands. Unfortunately, this is not always the case. Sometimes you must work with date and time values in different and unexpected formats. I experience this problem on a daily basis. Many of my clients send Excel spreadsheets with data to import into an application, and each client provides date and time values in wildly different formats. The `DateTime` class makes this a nonissue.

Use the `DateTime::createFromFormat()` static method to create a `DateTime` instance with a date and time string that uses a custom format. This method’s first argument is the date and time string _format_. The second argument is the date and time string that uses said format:

```
<?php
$datetime = DateTime::createFromFormat('M j, Y H:i:s', 'Jan 2, 2014 23:04:12');
```

The `DateTime::createFromFormat()` static method accepts the same date and time formats as the `date()` function. Valid date and time formats are available at <http://php.net/manual/datetime.createfromformat.php>.

### The DateInterval Class

The `DateInterval` class is pretty much prerequisite knowledge for manipulating `DateTime` instances. A `DateInterval` instance represents a fixed length of time (e.g., “two days”) or a relative length of time (e.g., “yesterday”). You use `DateInterval` instances to modify `DateTime` instances. For example, the `DateTime` class provides `add()` and `sub()` methods to manipulate a `DateTime` instance’s value. Both methods accept a `DateInterval` argument that specifies the amount of time added to or subtracted from a `DateTime` instance.

Instantiate the `DateInterval` class with its constructor. The `DateInterval` class constructor accepts a string argument that provides an _interval specification_. Interval specifications are a little tricky at first, but there’s not much to them. First, an interval specification is a string that begins with the letter `P`. Next, you append an integer. And last, you append a _period designator_ that qualifies the preceding integer value. Valid period designators are:* `Y` (years)

* `M` (months)
* `D` (days)
* `W` (weeks)
* `H` (hours)
* `M` (minutes)
* `S` (seconds)

An interval specification can include both date and time values. If you include a time value, separate the date and time parts with the letter `T`. For example, the interval specification `P2D` means _two days_. The interval specification `P2DT5H2M` means _two days, five hours, and two minutes_.

```
<?php
// Create DateTime instance
$datetime = new DateTime('2014-01-01 14:00:00');

// Create two weeks interval
$interval = new DateInterval('P2W');

// Modify DateTime instance
$datetime->add($interval);
echo $datetime->format('Y-m-d H:i:s');
```

You can create an _inverted_ `DateInterval`, too. This lets you traverse a `DatePeriod` instance in reverse chronology!

```
$dateStart = new \DateTime();
$dateInterval = \DateInterval::createFromDateString('-1 day');
$datePeriod = new \DatePeriod($dateStart, $dateInterval, 3);
foreach ($datePeriod as $date) {
    echo $date->format('Y-m-d'), PHP_EOL;
}
```

This outputs:

```
2014-12-08
2014-12-07
2014-12-06
2014-12-05
```

### The DateTimeZone Class

If your application caters to an international clientele, you’ve probably wrestled with time zones. Time zones are tricky, and they are a constant source of confusion for many PHP developers.

PHP represents time zones with the `DateTimeZone` class. All you have to do is pass a valid time-zone identifier into the `DateTimeZone` class constructor:

```
<?php
$timezone = new DateTimeZone('America/New_York');
```

Find a complete list of valid time-zone identifiers at <http://php.net/manual/timezones.php>.

You often use `DateTimeZone` instances when creating `DateTime` instances. The `DateTime` class constructor’s optional second argument is a `DateTimeZone` instance. The `DateTime` instance’s value, and all modifications to its value, are now relative to the specified time zone. If you omit the constructor’s second argument, the time zone is determined by your default time-zone setting:

```
<?php
$timezone = new DateTimeZone('America/New_York');
$datetime = new DateTime('2014-08-20', $timezone);
```

You can change a `DateTime` instance’s time zone after instantiation with the `setTimezone()` method:

```
<?php
$timezone = new DateTimeZone('America/New_York');
$datetime = new \DateTime('2014-08-20', $timezone);
$datetime->setTimezone(new DateTimeZone('Asia/Hong_Kong'));
```

I find it easiest if I always work in the `UTC` time zone. My server’s time zone is `UTC`, and my PHP default time zone is `UTC`. If I persist date and time values into a database, I save them as the `UTC` timezone. I convert the `UTC` date and time values to the appropriate time zone when I display the data to application users.

### The DatePeriod Class

Sometimes you need to iterate a sequence of dates and times that recur over a specific interval of time. Repeating calendar events are a good example. The `DatePeriod` class solves this problem. The `DatePeriod` class constructor accepts three required arguments:* A `DateTime` instance that represents the date and time from which iteration begins

* A `DateInterval` instance that represents the interval of time between subsequent dates and times 
* An integer that represents the number of total iterations A `DatePeriod` instance is an iterator, and each iteration yields a `DateTime` instance. 

```
<?php
$start = new DateTime();
$interval = new DateInterval('P2W');
$period = new DatePeriod($start, $interval, 3);

foreach ($period as $nextDateTime) {
    echo $nextDateTime->format('Y-m-d H:i:s'), PHP_EOL;
}
```

The `DatePeriod` class constructor accepts an optional fourth argument that specifies the period’s explicit end date and time. If you want to exclude the start date from the period’s iteration, pass the `DatePeriod::EXCLUDE_START_DATE` constant as the final constructor argument.

```
<?php
$start = new DateTime();
$interval = new DateInterval('P2W');
$period = new DatePeriod(
    $start,
    $interval,
    3,
    DatePeriod::EXCLUDE_START_DATE
);

foreach ($period as $nextDateTime) {
    echo $nextDateTime->format('Y-m-d H:i:s'), PHP_EOL;
}
```

### The nesbot/carbon Component

If you work with dates and times more often than not, you should use Brian Nesbitt’s [`nesbot/carbon`](https://github.com/briannesbitt/Carbon) PHP component. Carbon provides a simple user interface with many useful methods for working with date and time values.

## Using Regular Expressions in PHP

The most common regular expression functions that you are likely to use in PHP are `preg_match`, `preg_match_all`, and `preg_replace`.

To test whether the word _cats_ appears anywhere within a string, in any combination of upper- and lowercase, you could use `preg_match` like this:

    $n = preg_match("/cats/i", "Cats are crazy. I like cats.");

Because PHP uses `1` for `TRUE` and `0` for `FALSE`, the preceding statement sets `$n` to `1`. The first argument is the regular expression, and the second is the text to match. But `preg_match` is actually a good deal more powerful and complicated, because it takes a third argument that shows what text matched:

    $n = preg_match("/cats/i", "Cats are curious. I like cats.", $match);
    echo "$n Matches: $match[0]";

The third argument is an array (here, given the name `$match`). The function puts the text that matches into the first element, so if the match is successful, you can find the text that matched in `$match[0]`. In this example, the output lets us know that the matched text was capitalized:

    **1 Matches: Cats**

If you wish to locate all matches, you use the `preg_match_all` function, like this:

```
$n = preg_match_all("/cats/i", "Cats are strange. I like cats.", $match);
echo "$n Matches: ";
for ($j=0 ; $j < $n ; ++$j) echo $match[0][$j]." ";
```

As before, `$match` is passed to the function and the element `$match[0]` is assigned the matches made, but this time as a subarray. To display the subarray, this example iterates through it with a `for` loop.

When you want to replace part of a string, you can use `preg_replace` as shown here. This example replaces all occurrences of the word _cats_ with the word _dogs_, regardless of case:

```
echo preg_replace("/cats/i", "dogs", "Cats are furry. I like cats.");
```

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

A potential problem with `include` and `include_once` is that PHP will only _attempt_ to include the requested file. Program execution continues even if the file is not found.

When it is absolutely essential to include a file, `require` it. For the same reasons I gave for using `include_once`, I recommend that you generally stick with `require_once` whenever you need to `require` a file:

```php
<?php
  require_once "library.php";

  // Your code goes here
?>
```

## PHP Version Compatibility

PHP is in an ongoing process of development, and there are multiple versions. If you need to check whether a particular function is available to your code, you can use the `function_exists` function, which checks all predefined and user-created functions.

```php
<?php
  if (function_exists("array_combine"))
  {
    echo "Function exists";
  }
  else
  {
    echo "Function does not exist - better write our own";
  }
?>
```

Using code such as this, you can take advantage of features in newer versions of PHP and yet still have your code run on earlier versions, as long as you replicate any features that are missing. Your functions may be slower than the built-in ones, but at least your code will be much more portable.

You can also use the `phpversion` function to determine which version of PHP your code is running on. The returned result will be similar to the following, depending on the version:

    **5.5.11**

## Logger Interface

The third PHP-FIG recommendation is not a set of guidelines like its predecessors. PSR-3 is an interface, and it prescribes methods that can be implemented by PHP logger components.

Many PHP frameworks implement logging in some capacity. Before the PHP-FIG, each framework solved logging differently, often with a proprietary implementation. In the spirit of interoperability and specialization—recurring motifs in modern PHP—the PHP-FIG established the PSR-3 logger interface. Frameworks that accept PSR-3 compatible loggers accomplish two important things: logging concerns are delegated to a third party, and end users can provide their preferred logger component. It’s a win-win for everyone.

A PHP logger component compatible with the PSR-3 recommendation must include a PHP class that implements the interface named Psr\Log\LoggerInterface. The PSR-3 interface replicates the RFC 5424 syslog protocol and prescribes nine methods:

```
<?php
namespace Psr\Log;

interface LoggerInterface
{
    public function emergency($message, array $context = array());
    public function alert($message, array $context = array());
    public function critical($message, array $context = array());
    public function error($message, array $context = array());
    public function warning($message, array $context = array());
    public function notice($message, array $context = array());
    public function info($message, array $context = array());
    public function debug($message, array $context = array());
    public function log($level, $message, array $context = array());
}
```

Each interface method maps to a corresponding RFC 5424 protocol level and accepts two arguments. The first `$message` argument must be a string or an object with a `__toString()` method. The second `$context` argument is optional and provides an array of placeholder values that replace tokens in the first argument.

Use the `$context` argument to construct complicated logger messages. You use _placeholders_ in the message text. A placeholder looks like `{placeholder_name}`; it contains a `{`, the placeholder name, and a `}`. A placeholder does not contain spaces. The `$context` argument is an associative array; its keys are placeholder names (without brackets), and its values replace the related placeholders in the message text.

To write a PSR-3 logger, create a new PHP class that implements the `Psr\Log\LoggerInterface` interface and provide a concrete implementation for each interface method.

If you are creating your own PSR-3 logger, stop and reconsider if you are spending your time wisely. I strongly discourage you from writing your own logger. Why? Because there are some truly amazing PHP logger components already available!

If you need a PSR-3 logger, just use [`monolog/monolog`](https://packagist.org/packages/monolog/monolog). Don’t waste time looking elsewhere. The Monolog PHP component fully implements the PSR-3 interface, and it’s easily extended with custom message formatters and handlers. Monolog’s message handlers let you send log messages to text files, syslog, email, HipChat, Slack, networked servers, remote APIs, databases, and pretty much anywhere else you can imagine. In the very unlikely event Monolog does not provide a handler for your desired output destination, it’s super-easy to write and integrate your own Monolog message handler. Example 3-1 demonstrates how easy it is to setup Monolog and log messages to a text file.

```
<?php
use Monolog\Logger;
use Monolog\Handler\StreamHandler;

// Prepare logger
$log = new Logger('myApp');
$log->pushHandler(new StreamHandler('logs/development.log', Logger::DEBUG));
$log->pushHandler(new StreamHandler('logs/production.log', Logger::WARNING));

// Use logger
$log->debug('This is a debug message');
$log->warning('This is a warning message');
```

## COMMAND-LINE SCRIPTS WITH PHP

- [PHP: php:// - Manual](http://php.net/manual/en/wrappers.php.php)
- [PHP: $argv - Manual](https://php.net/manual/en/reserved.variables.argv.php)
- [PHP: $argc - Manual](https://php.net/manual/reserved.variables.argc.php)

## Built-in HTTP server

This is another hidden gem unknown to PHP developers who assume they need Apache or nginx to preview PHP applications. You shouldn’t use it for production, but PHP’s built-in web server is a perfect tool for local development.

I use PHP’s built-in web server every day, whether I’m writing PHP or not. I use it to preview [Laravel](http://laravel.com) and [Slim Framework](http://slimframework.com) applications. I use it while building websites with the Drupal content-management framework. I also use it to preview static HTML and CSS if I’m just building out markup.

PHP’s built-in web server should not be used for production. It is for local development only. If you use the PHP built-in web server on a production machine, be prepared for a lot of disappointed users and a flood of [Pingdom](https://www.pingdom.com) downtime notifications.

* The built-in server performs suboptimally because it handles one request at a time, and each HTTP request is blocking. Your web application will stall if a PHP file must wait on a slow database query or remote API response.
* The built-in server supports only a [limited number of mimetypes](http://bit.ly/built-in-ws).
* The built-in server has limited URL rewriting with router scripts. You’ll need Apache or nginx for more advanced URL rewrite behavior.

### Start the Server

It’s easy to start the PHP web server. Open your terminal application, navigate to your project’s document root directory, and execute this command:

    php -S localhost:4000

Sometimes it’s useful to access the PHP web server from other machines on your local network (e.g., for previewing on your iPad or local Windows box). To do this, tell the PHP web server to listen on all interfaces by using `0.0.0.0` instead of `localhost`:

    php -S 0.0.0.0:4000

### Configure the Server

It’s not uncommon for an application to require its own PHP INI configuration file, especially if it has unique requirements for memory usage, file uploads, profiling, or bytecode caching. You can tell the PHP built-in server to use a specific INI file with the `-c` option:

    php -S localhost:8000 -c app/config/php.ini

It’s a good idea to keep the custom INI file beneath the application’s root directory and, optionally, version-control the INI file if it should be shared with other developers on your team.

### Router Scripts

The PHP built-in server has one glaring omission. Unlike Apache or nginx, it doesn’t support .htaccess files. This makes it difficult to use front controllers that are common in many popular PHP frameworks.

A front controller is a single PHP file to which all HTTP requests are forwarded (via .htaccess files or rewrite rules). The front-controller PHP file is responsible for routing the request and dispatching the appropriate PHP code. This is a common pattern used by Symfony and other popular frameworks.

The PHP built-in server mitigates this omission with _router scripts_. The router script is executed before every HTTP request. If the router script returns false, the static asset referenced by the current HTTP request URI is returned. Otherwise, the output of the router script is returned as the HTTP response body. In other words, if you use a router script you’re effectively hardcoding the same functionality as an _.htaccess_ file.

Using a router script is easy. Just pass the PHP script file path as a an argument when you start up the PHP built-in server:

    php -S localhost:8000 router.php

### Detect the Built-in Server

Sometimes it’s helpful to know if your PHP script is served by PHP’s built-in web server versus a traditional web server like Apache or nginx. Perhaps you need to set specific headers for nginx (e.g., `Status:`) that should not be set for the PHP web server. You can detect the PHP web server with the `php_sapi_name()` function. This function returns the string `cli-server` if the current script is served with the PHP built-in server:

```
<?php
if (php_sapi_name() === 'cli-server') {
    // PHP web server
} else {
    // Other web server
}
```