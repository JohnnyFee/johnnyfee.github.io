layout: post
title: "PHP Components"
description: ""
category: PHP
tags: [php, tutorial]
---

The most popular modern PHP frameworks include:

* [Aura](http://auraphp.com/framework)
* [Laravel](http://laravel.com/)
* [Symfony](http://symfony.com/)
* [Yii](http://www.yiiframework.com/)
* [Zend](http://framework.zend.com/)

Should you use components or a framework? _Use the right tool for the job_. Most modern PHP frameworks are only a set of conventions built atop smaller PHP components.If you are working on a smaller project that can be solved with a precise collection of PHP components, then use components. Components make it super-easy to shop for and use existing tools so we can focus less on boilerplate and more on the larger task at hand. Components also help our code remain lightweight and nimble. We use only the code we need, and it’s super-easy to swap one component with another that may be better suited for our project.

If you are working on a large project with multiple team members and can benefit from the conventions, discipline, and structure provided by a framework, then use a framework. However, frameworks make many decisions for us and require us to adhere to its set of conventions. Frameworks are less flexible, but we do get far more out-of-the-box than we do with a collection of PHP components. If these tradeoffs are acceptable, by all means use a framework to guide and expedite your project development.

## Find Components

- [Packagist](https://packagist.org/)
- [ziadoz/awesome-php](https://github.com/ziadoz/awesome-php)

## Use PHP Components

[Composer](https://getcomposer.org/) is how you install PHP components. Composer is a dependency manager for PHP components that runs on the command line. You tell Composer which PHP components you need, and Composer downloads and autoloads the components into your project. It’s as simple as that. Because Composer is a dependency manager, it also resolves and downloads your components’ dependencies (and their dependencies, _ad infinitum_).

Composer works hand-in-hand with Packagist, too. When you tell Composer you want to use the `guzzlehttp/guzzle` component, Composer fetches the `guzzlehttp/guzzle` component listing on Packagist, finds the component’s repository URL, determines the appropriate version to use, and discovers the component’s dependencies. Composer then downloads the `guzzlehttp/guzzle` component and its dependencies into your project.

Composer is important because dependency management and autoloading are hard problems to solve. Autoloading is the process of automatically loading PHP classes on-demand without explicitly loading them with the `require()`, `require_once()`, `include()`, or `include_once()` functions. Older PHP versions let us write custom autoloaders with the `\__autoload()` function; this function is automatically invoked by the PHP interpreter when we instantiate a class that has not already been loaded. PHP later introduced the more flexible `spl_autoload_register()` function in its SPL library. Exactly how a PHP class is autoloaded is entirely up to the developer. Unfortunately, the lack of a common autoloader standard often necessitates a unique autoloader implementation for every project. This makes it difficult to use code created and shared by other developers if each developer provides a unique autoloader.

The PHP Framework Interop Group recognized this problem and created the PSR-0 standard (superseded by the PSR-4 standard). The PSR-0 and PSR-4 standards suggest how to organize code into namespaces and filesystem directories so it is compatible with one standard autoloader implementation. We don’t have to write a PSR-4 autoloader on our own. Instead, the Composer dependency manager automatically generates a PSR-compatible autoloader for _all_ of our project’s PHP components. Composer effectively abstracts away dependency management and autoloading.

## Install Composer

Composer is easy to install. Open a terminal and execute this command:

    curl -sS https://getcomposer.org/installer | php

This command downloads the Composer installer script with `curl`, executes the installer script with `php`, and creates a _composer.phar_ file in the current working directory. The _composer.phar_ file is the Composer binary.

I prefer to move and rename the downloaded Composer binary to _/usr/local/bin/composer_ with this command:

    sudo mv composer.phar /usr/local/bin/composer

Be sure you run this command to make the `composer` binary executable:

    sudo chmod +x /usr/local/bin/composer

Finally, add the _/usr/local/bin_ directory to your environment `PATH` by appending this line to your _~/.bash_profile_ file:

    PATH=/usr/local/bin:$PATH

You should now be able to execute `composer` in your terminal application to see a list of Composer options:

## Use Composer

Navigate to your project’s topmost directory in your terminal application and run this command once for each PHP component:

    composer require vendor/package

Replace `_vendor/package_` with the component’s vendor and package names. To install the Flysystem component, for example, run this command:

    composer require league/flysystem

This command instructs Composer to find and install the PHP component’s most stable version. It also instructs Composer to update the component up to, but not including, the component’s next major version. The previous example, as of October 2014, installs Flysystem version `0.5.9`, and it will update the Flysystem component up to, but not including, version `1.*`.

You can review the result of this command in the newly created or updated _composer.json_ file in your project’s topmost directory. This command also creates a _composer.lock_ file. Commit both of these files into your version control system.

_composer.lock_  file lists all of the PHP components used by our project and the components’ exact version numbers (including major, minor, and patch numbers). This effectively locks our project to these specific PHP component versions.

If a _composer.lock_ file is present, Composer downloads the specific PHP component versions listed in the _composer.lock_ file regardless of the component’s latest available version on Packagist. You should version control the _composer.lock_ file and distribute it to your team members so they can use the same PHP component versions as you.

The one downside with the _composer.lock_ file is that `composer install` will not install versions newer than those listed in the _composer.lock_ file. If you do need to download newer component versions _and_ update your _composer.lock_ file, use `composer update`. The `composer update` command updates your components to their latest stable versions and also updates the _composer.lock_ file with new PHP component version numbers.

## Autoloading PHP components

Now that our project’s PHP components are installed with Composer, how do we use them? Luckily for us, when Composer downloads the PHP components it also creates a single PSR-compatible autoloader for all of our project dependencies. All we have to do  is `require` Composer’s autoloader at the top of the _scan.php_ file:

```
<?php
require 'vendor/autoload.php';
```

Composer’s autoloader is just a PHP file named _autoload.php_ located inside the _vendor/_ directory. When Composer downloads each PHP component, Composer inspects each component’s own _composer.json_ file to determine how the component prefers to be autoloaded and, with this information, creates a local PSR-compatible autoloader for it. Ultimately, we can instantiate any of our project’s PHP components and they are autoloaded on-demand!

## Create PHP Components

### Filesystem Organization

PHP components have largely standardized on this filesystem structure:

- src/

    This directory contains the component’s source code (e.g., PHP class files).
- tests/

    This directory contains the component’s tests. We will not use this directory in this example.

- composer.json

    This is the Composer configuration file. This file describes the component and tells Composer’s autoloader to map your component’s PSR-4 namespace to the src/ directory.

- README.md

    This Markdown file provides helpful information about this component, including its name, description, author, usage, contributor guidelines, software license, and credits.

- CONTRIBUTING.md

    This Markdown file describes how others can contribute to this component.

- LICENSE
    
    This plain-text file contains the component’s software license.

- CHANGELOG.md

    This Markdown file lists changes introduced in each new component version.

### The composer.json File

The _composer.json_ file is _required_ and must contain valid JSON. It includes information used by Composer to find, install, and autoload the PHP component. It also contains information for the component’s Packagist directory listing.

It includes all of the composer.json properties that I use most often for my own PHP components.

```json
{
    "name": "modernphp/scanner",
    "description": "Scan URLs from a CSV file and report inaccessible URLs",
    "keywords": ["url", "scanner", "csv"],
    "homepage": "http://example.com",
    "license": "MIT",
    "authors": [
        {
            "name": "Josh Lockhart",
            "homepage": "https://github.com/codeguy",
            "role": "Developer"
        }
    ],
    "support": {
        "email": "help@example.com"
    },
    "require": {
        "php" : ">=5.4.0",
        "guzzlehttp/guzzle": "~5.0"
    },
    "require-dev": {
        "phpunit/phpunit": "~4.3"
    },
    "suggest": {
        "league/csv": "~6.0"
    },
    "autoload": {
        "psr-4": {
            "Oreilly\\ModernPHP\\": "src/"
        }
    }
}
```

This is admittedly a lot to digest, so let’s step through each composer.json property in detail:

- name

    This is the component’s vendor and package name, separated with a / character. This value is displayed on Packagist.

- description

    This contains a few sentences that succinctly describe the component. This description is displayed on Packagist.

- keywords

    This contains an appropriate number of keywords that describe the component. These keywords help others find this component on Packagist.

- homepage

    This is the URL of the component’s website.

- license

    This is the software license with which the PHP component is released. I prefer to use the MIT Public License. You can read more about software licenses at http://choosealicense.com. Remember to always release your code with a license.

- authors

    This is an array of information for each project author. You should include at least a name and URL for each author.

- support

    This is how the component’s users find technical support. I prefer to include an email address and support forum URL. You could also list an IRC channel, for example.

- require
    
    This lists the PHP component’s own component dependencies. You should list each dependency’s vendor/package name and minimum version number. I also like to list the minimum PHP version required by this component. All dependencies listed beneath this property are installed for both development and production project installations.

- require-dev

    This acts like the require property, but it lists only the dependencies required to develop this component. For example, I often list phpunit as a dev dependency so that other component contributors can write and run tests. These dependencies are installed only during development. They are not installed in production projects.

- suggest

    This acts like the require property, but it merely suggests other components because they may be useful when used with our component. Unlike the require property, this object’s values are free text fields that describe each suggested component. Composer does not install suggested components.

- autoload

    This tells the Composer autoloader how to autoload this component. I recommend you use the PSR-4 autoloader, as demonstrated in Example 4-2. Beneath the `psr-4` property, you map the component’s namespace prefix to a filesystem path relative to the component’s root directory. This makes our component compatible with a standard PSR-4 autoloader. In Example 4-2, I map the `Oreilly\ModernPHP` namespace to the _src/_ directory. The mapping’s namespace must end with two back slash characters (`\\`) to avoid conflicts with other components that use a namespace with a similar sequence of characters. Based on the example mapping, if we instantiate a hypothetical `Oreilly\ModernPHP\Url\Scanner` class, Composer will autoload the PHP class file at _src/Url/Scanner.php_.

The _README_ file is often the component’s first introduction to its users. This is especially true for components hosted on GitHub and Bitbucket. Therefore, it’s important that the component’s _README_ file provides, at a minimum, this information:* Component name and description * Install instructions:

* Usage instructions
* Testing instructions
* Contributing instructions
* Support resources
* Author credits
* Software license

### Component Implementation

And now we arrive at the component’s meat and potatoes—its implementation. This is where you write the PHP classes, interfaces, and traits that form the PHP component. What classes you write, and how many, depends entirely on the PHP component’s purpose. However, all component classes, interfaces, and traits must live in the _src/_ directory and exist beneath the component’s namespace prefix listed in the _composer.json_ file.

For this demonstration, I’ll create a single PHP class named `Scanner` that exists beneath the `Url` subnamespace beneath the `Oreilly\ModernPHP` namespace listed in the _composer.json_ file. The `Scanner` class file lives at _src/Url/Scanner.php_. The `Scanner` class implements the same logic as our earlier URL scanner example application, except it encapsulates the URL scanning behavior in a PHP class:

```
<?php
namespace Oreilly\ModernPHP\Url;

class Scanner
{
    /**
     * @var array An array of URLs
     */
    protected $urls;

    /**
     * @var \GuzzleHttp\Client
     */
    protected $httpClient;

    /**
     * Constructor
     * @param array $urls An array of URLs to scan
     */
    public function __construct(array $urls)
    {
        $this->urls = $urls;
        $this->httpClient = new \GuzzleHttp\Client();
    }

    /**
     * Get invalid URLs
     * @return array
     */
    public function getInvalidUrls()
    {
        $invalidUrls = [];
        foreach ($this->urls as $url) {
            try {
                $statusCode = $this->getStatusCodeForUrl($url);
            } catch (\Exception $e) {
                $statusCode = 500;
            }

            if ($statusCode >= 400) {
                array_push($invalidUrls, [
                    'url' => $url,
                    'status' => $statusCode
                ]);
            }
        }

        return $invalidUrls;
    }

    /**
     * Get HTTP status code for URL
     * @param string $url The remote URL
     * @return int The HTTP status code
     */
    protected function getStatusCodeForUrl($url)
    {
        $httpResponse = $this->httpClient->options($url);

        return $httpResponse->getStatusCode();
    }
}
```

Instead of parsing and iterating a CSV file, we inject an array of URLs into the `Scanner` class constructor. We want our URL scanner class to be as generic as possible. If we demand a CSV file, we inherently limit our component’s usefulness. If we accept an array of URLs, we let the end user decide how to fetch an array of URLs (from a PHP array, a CSV file, an iterator, etc). That being said, we still _recommend_ the `league/csv` component because it can be helpful for developers using our component. We include the `league/csv` component in the _composer.json_ manifest’s `suggest` property.

The `Scanner` class has a hard dependency on the `guzzlehttp/guzzle` component. However, we isolate each URL’s HTTP request in the `getStatusCodeForUrl()` method. This lets us stub (or _override_) this method’s implementation in our component’s unit tests so that our tests do not rely on a working Internet connection.

### Packagist Submission

Now we’re ready to submit the component to Packagist. If you don’t use GitHub, go ahead and [create a Packagist account](https://packagist.org/register/). You can also log in to Packagist with your GitHub credentials.

Once logged in, click the big green Submit Package button at the top right of the website. Enter the full Git repository URL into the Repository URL text field and click the Check button. Packagist verifies the repository URL and prompts you to confirm your submission. Click Submit to finalize your component submission.

You’ll notice it pulls the component name, description, keywords, dependencies, and suggestions from the component’s _composer.json_ file. You’ll also notice that it shows the repository branches and tags, too. Packagist establishes a direct correlation between repository tags and semantic version numbers. This is why I recommend your repository tags be valid version numbers like `1.0.0`, `1.1.0`, and so on. However, we still have that big red alert message that reads:

```
This package is not auto-updated. Please set up the GitHub Service Hook for
Packagist so that it gets updated whenever you push!
```

We can activate a GitHub or Bitbucket hook that notifies Packagist whenever the component repository is updated. Learn how to setup this repository hook at [_https://packagist.org/profile/_](https://packagist.org/profile/).

### Using the Component

We’re done! Now anyone can install the URL scanner component with Composer and use it in their PHP applications. Run this command in your terminal to install the URL scanner component with Composer:

    composer require modernphp/scanner

```
<?php
require 'vendor/autoload.php';

$urls = [
    'http://www.apple.com',
    'http://php.net',
    'http://sdfssdwerw.org'
];
$scanner = new \Oreilly\ModernPHP\Url\Scanner($urls);
print_r($scanner->getInvalidUrls());
```