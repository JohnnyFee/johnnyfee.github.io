layout: post
title: "Fastest Way to install WordPress on OSX"
category : PHP
tags : [mac, amp, php]
---

See: [Install Wordpress Mac OS X 10.9 Yosemite on Local Development Server](http://coolestguidesontheplanet.com/fastest-way-to-install-wordpress-on-osx-10-6/)

See also [How to Install WordPress (and Multisite) Locally on Mac/OS X With MAMP - WPMU DEV](http://premium.wpmudev.org/blog/how-to-install-wordpress-and-multisite-locally-on-macos-x-with-mamp/?ppd=b)

This tutorial assumes a certain degree of comfort in the command line Terminal for installing WordPress on Mac OS X Yosemite, Mavericks, Mountain Lion or Snow Leopard, but the commands below are not overly complex and following the tutorial will get the job done. If you have no experience with the Terminal and want the easiest way to install on your local Mac then [follow this guide here which installs everything with a point and click in the Finder](http://coolestguidesontheplanet.com/install-wordpress-easily-os-x-mavericks-10-9/ "Install WordPress Easily on OS X Mavericks 10.9").

Before proceeding WordPress needs a couple of things to get going and those things are an AMP stack  – Apache, MySQL and PHP, Apache and PHP come bundled in OS X but MySQL needs to be downloaded and configured. Optionally install phpmyadmin to manage the database.

To get the AMP stack working correctly on OS X follow this [Mac OSX 10.10 Yosemite](http://coolestguidesontheplanet.com/get-apache-mysql-php-phpmyadmin-working-osx-10-10-yosemite/ "Get Apache, MySQL, PHP and phpMyAdmin working on OSX 10.10 Yosemite") or [OSX 10.9 Mavericks](http://coolestguidesontheplanet.com/get-apache-mysql-php-phpmyadmin-working-osx-10-9-mavericks/ "Get Apache, MySQL, PHP and phpMyAdmin working on OSX 10.9 Mavericks").

Once these components are in place you are OK to proceed.

OS X has 2 web document roots ‘/Library/WebServer/Documents’ and ‘/Users/username/Sites/’ also known as ‘~/Sites’ this guide uses  ‘~/Sites’.

The shared WordPress directory will be called “**wordpress**“.

## WordPress File Set Up

make a sharing directory and move into it

    mkdir ~/Sites/wordpress ; cd ~/Sites/wordpress

get the latest WordPress

    curl -O https://wordpress.org/latest.tar.gz

expand it

    tar -xvzf latest.tar.gz

move all files into shared directory one level up

    mv wordpress/* .

remove empty directory and compressed archive

    rmdir wordpress/ ; rm latest.tar.gz

create a settings file

    cp wp-config-sample.php wp-config.php

## Database Setup

create it a new database (no space between -p and password – as an alternative this can be done in phpmyadmin

    mysql -u [username] -p[password] -e "create database [databasename];"

or in phpmyadmin

[![phpmyadmin-create-database](http://coolestguidesontheplanet.com/wp-content/uploads/2011/07/phpmyadmin-create-database1.png "phpmyadmin-create-database")](http://coolestguidesontheplanet.com/wp-content/uploads/2011/07/phpmyadmin-create-database1.png)

[![create-database-wordpress-phpmyadmin](http://coolestguidesontheplanet.com/wp-content/uploads/2011/07/create-database-wordpress-phpmyadmin1.png "create-database-wordpress-phpmyadmin")](http://coolestguidesontheplanet.com/wp-content/uploads/2011/07/create-database-wordpress-phpmyadmin1.png)


You can do all of the above in one hit at the command line just separate the commands with “;”. This would be handy with multiple installs and can be scripted – not necessary for this guide – but I thought I’d throw it in.

    mkdir ~/Sites/wordpress ; cd ~/Sites/wordpress ; curl -O http://wordpress.org/latest.tar.gz ; tar -xvzf latest.tar.gz ; mv wordpress/* . ; rmdir wordpress/ ; rm latest.tar.gz ; rmdir wordpress/ ; rm latest.tar.gz ; cp wp-config-sample.php wp-config.php ; mysql -u [username] -p[password] -e "create database [databasename];" ; nano wp-config.php

## WordPress Database Config

Then proceed with the editing of the wp-config file which needs to have the database details added as below:

```
nano wp-config.php
```

```
// ** MySQL settings – You can get this info from your web host ** //
/** The name of the database for WordPress */
define(‘DB_NAME’, ‘wordpress‘);

/** MySQL database username */
define(‘DB_USER’, ‘root‘);

/** MySQL database password */
define(‘DB_PASSWORD’, ‘yourpassword‘);

/** MySQL hostname */
define(‘DB_HOST’, ‘localhost‘);
```

If you are not comfortable with editing this file in nano in the Terminal you can use Text Edit in Applications.

## Famous 5 Minute Install

open it up in your default browser

    open http://localhost/~username/wordpress/wp-admin/install.php

fill in your credentials:

[![wordpress-fastest-install-osx](http://coolestguidesontheplanet.com/wp-content/uploads/2011/07/wordpress-fastest-install-osx1.png "wordpress-fastest-install-osx")](http://coolestguidesontheplanet.com/wp-content/uploads/2011/07/wordpress-fastest-install-osx1.png)

voila

[![wordpress-fastest-install-osx-success](http://coolestguidesontheplanet.com/wp-content/uploads/2011/07/wordpress-fastest-install-osx-success1.png "wordpress-fastest-install-osx-success")](http://coolestguidesontheplanet.com/wp-content/uploads/2011/07/wordpress-fastest-install-osx-success1.png)

## Post Mortem

### OSX Yosemite 10.10

In your username.conf in /etc/apache/users/ make sure you have the following directives:

```
<Directory "/Users/USERNAME/Sites/">
AllowOverride All
Options Indexes MultiViews FollowSymLinks
Require all granted
</Directory>
```

This will allow .htaccess file usage.

But wait there’s more, you need to [fix up those ownership and permissions](http://coolestguidesontheplanet.com/wordpress-media-library-updates-not-working-osx/ "WordPress Media Library and Updates Not Working in OSX")

    sudo chown -R _www ~/Sites/wordpress ; sudo chmod -R g+w ~/Sites/wordpress

Or just change the[ Apache user to be your regular user](http://coolestguidesontheplanet.com/set-virtual-hosts-apache-mac-osx-10-10-yosemite/#apacheuser).

Thats it you should have a fully functioning local WordPress install built on a native AMP stack.
