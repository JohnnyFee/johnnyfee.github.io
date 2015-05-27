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
