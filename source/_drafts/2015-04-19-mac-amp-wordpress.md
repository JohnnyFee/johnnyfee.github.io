layout: post
title: "Fastest Way to install WordPress on OSX"
category : MAC
tags : [mac, amp, php]
---

See: [Install Wordpress Mac OS X 10.9 Yosemite on Local Development Server](http://coolestguidesontheplanet.com/fastest-way-to-install-wordpress-on-osx-10-6/)

This tutorial assumes a certain degree of comfort in the command line Terminal for installing WordPress on Mac OS X Yosemite, Mavericks, Mountain Lion or Snow Leopard, but the commands below are not overly complex and following the tutorial will get the job done. If you have no experience with the Terminal and want the easiest way to install on your local Mac then [follow this guide here which installs everything with a point and click in the Finder](http://coolestguidesontheplanet.com/install-wordpress-easily-os-x-mavericks-10-9/ "Install WordPress Easily on OS X Mavericks 10.9").

Before proceeding WordPress needs a couple of things to get going and those things are an AMP stack  – Apache, MySQL and PHP, Apache and PHP come bundled in OS X but MySQL needs to be downloaded and configured. Optionally install phpmyadmin to manage the database.

To get the AMP stack working correctly on OS X follow this [Mac OSX 10.10 Yosemite](http://coolestguidesontheplanet.com/get-apache-mysql-php-phpmyadmin-working-osx-10-10-yosemite/ "Get Apache, MySQL, PHP and phpMyAdmin working on OSX 10.10 Yosemite") or [OSX 10.9 Mavericks](http://coolestguidesontheplanet.com/get-apache-mysql-php-phpmyadmin-working-osx-10-9-mavericks/ "Get Apache, MySQL, PHP and phpMyAdmin working on OSX 10.9 Mavericks").

Once these components are in place you are OK to proceed.

OS X has 2 web document roots ‘/Library/WebServer/Documents’ and ‘/Users/username/Sites/’ also known as ‘~/Sites’ this guide uses  ‘~/Sites’.

The shared WordPress directory will be called “**wordpress**“.

## WordPress File Set Up

make a sharing directory and move into it

<pre class="crayon:false">
 mkdir ~/Sites/wordpress ; cd ~/Sites/wordpress
</pre>

get the latest WordPress

<pre class="crayon:false">
curl -O https://wordpress.org/latest.tar.gz
</pre>

expand it

<pre class="crayon:false">
 tar -xvzf latest.tar.gz
</pre>

move all files into shared directory one level up

<pre class="crayon:false">
mv wordpress/* .
</pre>

remove empty directory and compressed archive

<pre class="crayon:false">
rmdir wordpress/ ; rm latest.tar.gz
</pre>

create a settings file

<pre class="crayon:false">
cp wp-config-sample.php wp-config.php
</pre>

## Database Setup

create it a new database (no space between -p and password – as an alternative this can be done in phpmyadmin

<pre class="crayon:false">
mysql -u [username] -p[password] -e "create database [databasename];"
</pre>

or in phpmyadmin

<div id="attachment_2381" style="width: 600px" class="wp-caption aligncenter">[![phpmyadmin-create-database](http://coolestguidesontheplanet.com/wp-content/uploads/2011/07/phpmyadmin-create-database1.png "phpmyadmin-create-database")](http://coolestguidesontheplanet.com/wp-content/uploads/2011/07/phpmyadmin-create-database1.png)

phpmyadmin-create-database</div>

<div id="attachment_2385" style="width: 600px" class="wp-caption aligncenter">[![create-database-wordpress-phpmyadmin](http://coolestguidesontheplanet.com/wp-content/uploads/2011/07/create-database-wordpress-phpmyadmin1.png "create-database-wordpress-phpmyadmin")](http://coolestguidesontheplanet.com/wp-content/uploads/2011/07/create-database-wordpress-phpmyadmin1.png)

create-database-wordpress-phpmyadmin</div>

You can do all of the above in one hit at the command line just separate the commands with “;”. This would be handy with multiple installs and can be scripted – not necessary for this guide – but I thought I’d throw it in.

<pre class="crayon:false">
mkdir ~/Sites/wordpress ; cd ~/Sites/wordpress ; curl -O http://wordpress.org/latest.tar.gz ; tar -xvzf latest.tar.gz ; mv wordpress/* . ; rmdir wordpress/ ; rm latest.tar.gz ; rmdir wordpress/ ; rm latest.tar.gz ; cp wp-config-sample.php wp-config.php ; mysql -u [username] -p[password] -e "create database [databasename];" ; nano wp-config.php
</pre>

## WordPress Database Config

Then proceed with the editing of the wp-config file which needs to have the database details added as below:

<pre class="crayon:false ">
nano wp-config.php
</pre>

_// ** MySQL settings – You can get this info from your web host ** //_  
_/** The name of the database for WordPress */_  
_ define(‘DB_NAME’, ‘
<mark>wordpress</mark>‘);_

_/** MySQL database username */_  
_ define(‘DB_USER’, ‘
<mark>root</mark>‘);_

_/** MySQL database password */_  
_define(‘DB_PASSWORD’, ‘__<mark>yourpassword</mark>__‘);_

_/** MySQL hostname */_  
_ define(‘DB_HOST’, ‘
<mark>localhost</mark>‘);_

If you are not comfortable with editing this file in nano in the Terminal you can use Text Edit in Applications.

## Famous 5 Minute Install

open it up in your default browser

<pre class="crayon:false">
open http://localhost/~username/wordpress/wp-admin/install.php
</pre>

fill in your credentials:

<div id="attachment_1285" style="width: 610px" class="wp-caption aligncenter">[![wordpress-fastest-install-osx](http://coolestguidesontheplanet.com/wp-content/uploads/2011/07/wordpress-fastest-install-osx1.png "wordpress-fastest-install-osx")](http://coolestguidesontheplanet.com/wp-content/uploads/2011/07/wordpress-fastest-install-osx1.png)

wordpress-fastest-install-osx</div>

voila

<div id="attachment_1284" style="width: 610px" class="wp-caption aligncenter">[![wordpress-fastest-install-osx-success](http://coolestguidesontheplanet.com/wp-content/uploads/2011/07/wordpress-fastest-install-osx-success1.png "wordpress-fastest-install-osx-success")](http://coolestguidesontheplanet.com/wp-content/uploads/2011/07/wordpress-fastest-install-osx-success1.png)

success</div>

## Post Mortem

### OSX Yosemite 10.10

In your username.conf in /etc/apache/users/ make sure you have the following directives:

<div id="crayon-5531b29cc5f0d132071908" class="crayon-syntax crayon-theme-github crayon-font-monaco crayon-os-pc print-yes notranslate crayon-wrapped" data-settings=" minimize scroll-mouseover wrap" style="margin-top: 12px; margin-bottom: 12px; font-size: 13px !important; line-height: 15px !important; height: auto;">
    <div class="crayon-plain-wrap">
        <textarea class="crayon-plain print-no" data-settings="dblclick" readonly="" style="tab-size: 4; font-size: 13px !important; line-height: 15px !important; z-index: 0; opacity: 0; overflow: hidden;">&lt;Directory "/Users/USERNAME/Sites/"&gt;
        AllowOverride All
        Options Indexes MultiViews FollowSymLinks
        Require all granted
        &lt;/Directory&gt;
        </textarea>
    </div>

    <div class="crayon-main" style="position: relative; z-index: 1; overflow: hidden;">
        col 1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | col 2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
        ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        <div class="crayon-nums-content" style="font-size: 13px !important; line-height: 15px !important;">
            <div class="crayon-num" data-line="crayon-5531b29cc5f0d132071908-1" style="height: 15px;">1</div>

            <div class="crayon-num" data-line="crayon-5531b29cc5f0d132071908-2" style="height: 15px;">2</div>

            <div class="crayon-num" data-line="crayon-5531b29cc5f0d132071908-3" style="height: 15px;">3</div>

            <div class="crayon-num" data-line="crayon-5531b29cc5f0d132071908-4" style="height: 15px;">4</div>

            <div class="crayon-num" data-line="crayon-5531b29cc5f0d132071908-5" style="height: 15px;">5</div>

            <div class="crayon-num" data-line="crayon-5531b29cc5f0d132071908-6" style="height: 15px;">6</div>

            <div class="crayon-num" data-line="crayon-5531b29cc5f0d132071908-7" style="height: 15px;">7</div>
        </div> | <div class="crayon-pre" style="font-size: 13px !important; line-height: 15px !important; -moz-tab-size:4; -o-tab-size:4; -webkit-tab-size:4; tab-size:4;">
            <div class="crayon-line" id="crayon-5531b29cc5f0d132071908-1"></div>

            <div class="crayon-line" id="crayon-5531b29cc5f0d132071908-2"><span class="crayon-o"><</span><span class="crayon-i">Directory</span><span class="crayon-h"> </span><span class="crayon-s">"/Users/USERNAME/Sites/"</span><span class="crayon-o">></span></div>

            <div class="crayon-line" id="crayon-5531b29cc5f0d132071908-3"><span class="crayon-e">AllowOverride </span><span class="crayon-e">All</span></div>

            <div class="crayon-line" id="crayon-5531b29cc5f0d132071908-4"><span class="crayon-e">Options </span><span class="crayon-e">Indexes </span><span class="crayon-e">MultiViews </span><span class="crayon-e">FollowSymLinks</span></div>

            <div class="crayon-line" id="crayon-5531b29cc5f0d132071908-5"><span class="crayon-e">Require </span><span class="crayon-e">all </span><span class="crayon-v">granted</span></div>

            <div class="crayon-line" id="crayon-5531b29cc5f0d132071908-6"><span class="crayon-o"><</span><span class="crayon-o">/</span><span class="crayon-v">Directory</span><span class="crayon-o">></span></div>

            <div class="crayon-line" id="crayon-5531b29cc5f0d132071908-7"></div>
        </div>
    </div>
</div>

This will allow .htaccess file usage.

But wait there’s more, you need to [fix up those ownership and permissions](http://coolestguidesontheplanet.com/wordpress-media-library-updates-not-working-osx/ "WordPress Media Library and Updates Not Working in OSX")

<pre class="crayon:false">
sudo chown -R _www ~/Sites/wordpress ; sudo chmod -R g+w ~/Sites/wordpress
</pre>

Or just change the[ Apache user to be your regular user](http://coolestguidesontheplanet.com/set-virtual-hosts-apache-mac-osx-10-10-yosemite/#apacheuser).

Thats it you should have a fully functioning local WordPress install built on a native AMP stack.