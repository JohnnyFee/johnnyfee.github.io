layout: post
title: "Get Apache, MySQL, PHP and phpMyAdmin working on OSX 10.10 Yosemite"
description: ""
category: AMP
tags: [mac, amp]
---

WAMP, MAMP, and LAMP are abbreviations for “Windows, Apache, MySQL, and PHP,” “Mac, Apache, MySQL, and PHP,” and “Linux, Apache, MySQL, and PHP.” These abbreviations describe a fully functioning setup used for developing dynamic Internet web pages.

See: [Apache, MySQL, PHP and phpMyAdmin on OSX 10.10 Yosemite for Local Development](http://coolestguidesontheplanet.com/get-apache-mysql-php-phpmyadmin-working-osx-10-10-yosemite/)

With Apples’ new OSX 10.10 Yosemite out of the bag, getting the **AMP** stack up and running on the new OSX may cause a few bumps on the upgrade from [OS X Mavericks 10.9](http://coolestguidesontheplanet.com/get-apache-mysql-php-phpmyadmin-working-osx-10-9-mavericks/ "Get Apache, MySQL, PHP and phpMyAdmin working on OSX 10.9 Mavericks"). This tutorial will go through the process on getting **Apache, MySQL, PHP** (or otherwise known as the ‘AMP’ stack) and **phpMyAdmin** running on the new Yosemite OS.

This tutorial sets up the AMP stack in more of a traditional way using the loaded Apache and PHP and downloading MySQL and phpMyAdmin.

## Apache/WebSharing

Their is no GUI to toggle Web Sharing on or off in OSX 10.10, which was previously a GUI [option](http://support.apple.com/kb/HT5230?viewlocale=en_US&locale=en_US "apple drop web sharing") in System Preferences way back in 10.7, but fear not Apache is installed ready to be fired up.

This needs to be done in the Terminal which is found at **/Applications/Utilities/Terminal**

For those not familiar with the Terminal, it really isn’t as intimidating as you may think, once launched you are faced with a command prompt waiting for your commands – just type/paste in a command and hit enter, some commands give you no response – it just means the command is done, other commands give you feedback – lets get to it….

to start it

    sudo apachectl start

to stop it

    sudo apachectl stop

to restart it

    sudo apachectl restart

To find the Apache version

    httpd -v

The Apache version that comes in OSX Yosemite is **Apache/2.4.9**

![localhost-osx-apache](http://coolestguidesontheplanet.com/wp-content/uploads/2014/07/localhost-osx-apache.png)

After starting **Apache** – test to see if the webserver is working in the browser – http://localhost – you should see the “It Works!” text.

## Document Root

Document root is the location where the files are shared from the file system and is similar to the traditional names of ‘**public_html**‘ and ‘**htdocs**‘, OSX has historically had 2 web roots one at a system level and one at a user level – you can set both up or just run with one, the user level one allows multiple accounts to have their own web root whilst the system one is global for all users. It seems there is less effort from Apple in continuing with the user level one but it still can be set up with a couple of extra tweaks in configuration files. It is easier to use the user level one as you don’t have to keep on authenticating as an admin user.

### System Level Web Root

- the default system document root is still found at -

**http://localhost/**

The files are shared in the filing system at -

    /Library/WebServer/Documents/


### User Level Root

The other web root directory which is missing by default is the ‘**~/Sites’** folder in the User account. This takes a bit longer to set up but some users are very accustomed to using it.

You need to make a “**Sites**” folder at the root level of your account and then it will work. Once you make the Sites folder you will notice that it has a unique icon which is a throwback from a few versions older. Make that folder before you set up the user configuration file described next.

You have to make a few additional tweaks to get the **~/Sites** folder back up and running.

![user-level-webroot-sites-folder](http://coolestguidesontheplanet.com/wp-content/uploads/2014/07/user-level-webroot-sites-folder.png)

Add  a “username.conf” filed under:

    /etc/apache2/users/

If you don’t already have one (very likely), then create one named by the short username of the account with the suffix **.conf**, its location and permissions/ownership is best tackled by using the **Terminal**, the text editor ‘**nano**‘ would be the best tool to deal with this.

Launch **Terminal**, (Applications/Utilities), and follow the commands below, first one gets you to the right spot, 2nd one cracks open the text editor on the command line (swap ‘**username**‘ with your account’s shortname, if you don’t know your account shortname type ‘_whoami_‘ the Terminal prompt):


    cd /etc/apache2/users
    sudo nano username.conf

Then add the content below swapping in your ‘**username’** in the code below:


```
<Directory "/Users/username/Sites/">
AllowOverride All
Options Indexes MultiViews FollowSymLinks
Require all granted
</Directory>
```

Permissions on the file should be:

    -rw-r--r--   1 root  wheel  298 Jun 28 16:47 username.conf

If not you need to change…

    sudo chmod 644 username.conf

Open the main **httpd.conf** and allow some modules:

    sudo nano /etc/apache2/httpd.conf

And make sure these 3 modules are uncommented (the first 2 should be on a clean install):

    LoadModule authz_core_module libexec/apache2/mod_authz_core.so
    LoadModule authz_host_module libexec/apache2/mod_authz_host.so
    LoadModule userdir_module libexec/apache2/mod_userdir.so

And also uncomment this configuration file also in **httpd.conf**

    Include /private/etc/apache2/extra/httpd-userdir.conf

Then open another Apache config file and uncomment another file:

    sudo nano /etc/apache2/extra/httpd-userdir.conf

And uncomment:

    Include /private/etc/apache2/users/*.conf

Restart Apache for the new file to be read:

    sudo apachectl restart

Then this user level document root will be viewable at:

**http://localhost/~username/**

You should only see a directory tree like structure if the folder is empty.

![osx-yosemite-user-site](http://coolestguidesontheplanet.com/wp-content/uploads/2014/07/osx-yosemite-user-site.png)

## Override .htaccess and allow URL Rewrites

If you are going to use the document root at /Library/WebServer/Documents it is a good idea to allow any **.htaccess** files used to override the default settings – this can be accomplished by editing the **httpd.conf** file at line 217 and setting the **AllowOverride** to **All** and then restart Apache. This is already taken care of at the Sites level webroot by following the previous step.


    sudo nano /etc/apache2/httpd.conf

![osx-htaccess-override](http://coolestguidesontheplanet.com/wp-content/uploads/2014/07/osx-htaccess-override.png)

Also whilst here allow URL **rewrites** so your permalinks look clean not ugly.

Uncomment in httpd.conf

    LoadModule rewrite_module libexec/apache2/mod_rewrite.so

## PHP

**PHP 5.5.14** is loaded in the final build of OSX 10.10 Yosemite and needs to be turned on by uncommenting a line in the **httpd.conf** file.


    sudo nano /etc/apache2/httpd.conf

Use “control” + “w” to search within **nano** and search for ‘php’ this will land you on the right line then uncomment the line (remove the #):


    LoadModule php5_module libexec/apache2/libphp5.so

Write out and Save using the nano short cut keys at the bottom ‘control o’ and ‘control x’

Reload apache to kick in

    sudo apachectl restart

To see and test PHP, create a file name it “phpinfo.php” and file it in your document root with the contents below, then view it in a browser.


    <?php phpinfo(); ?>

![osx-yosemite-php-site](http://coolestguidesontheplanet.com/wp-content/uploads/2014/07/osx-yosemite-php-site.png)

## MySQL

MySQL is again a missing component in OS X 10.10 and needs to be [dowloaded from the MySQL site](http://dev.mysql.com/downloads/mysql/) use the **Mac OS X ver. 10.9 (x86, 64-bit), DMG Archive** version (works on 10.10). The latest version available is MySQL 5.6.21. Their is an issue with this version and Yosemite in that it won’t start on reboot – it will need to be started via command line explained below.

If you are upgrading from a previous OSX and have an older MySQL version you do not have to update it, it will work just with the same start up issue. One thing with MySQL upgrades always take a[ data dump of your database](http://coolestguidesontheplanet.com/import-export-mysql-database-command-line/ "Import / Export a mysql database on the command line") in case things go south and before you upgrade to Yosemite make sure your MySQL Server is **not** running.

When downloading you don’t have to sign up, look for  – go straight to the download mirrors and download the software from a mirror which is closest to you.

Once downloaded open the .dmg and run the installer.

![sudo /usr/local/mysql/support-files/mysql.server start](http://coolestguidesontheplanet.com/wp-content/uploads/2014/07/osx-yosemite-mysql-install.png)

You will get a fail on the install but the software is still installed and useable, the reason is because the MySQL Start on Restart script fails.

![osx-yosemite-mysql-fail](http://coolestguidesontheplanet.com/wp-content/uploads/2014/07/osx-yosemite-mysql-fail.png)

If you do a custom install simply unclick that start up item. When you restart your machine just remember to start MySQL either via System Prefs or command line

![osx-yosemite-mysql-uncheck-start-up-item](http://coolestguidesontheplanet.com/wp-content/uploads/2014/10/osx-yosemite-mysql-uncheck-start-up-item.png)

## Starting MySQL

You can then start the MySQL server from the **System Preferences** or via the **command line** or if restarted it has to be **command line**

![osx-yosemite-mysql](http://coolestguidesontheplanet.com/wp-content/uploads/2014/07/osx-yosemite-mysql1.png)

Command line start MySQL.


    sudo /usr/local/mysql/support-files/mysql.server start

To find the MySQL version from the terminal, type at the prompt:


    /usr/local/mysql/bin/mysql -v

This also puts you in to a _shell_ interactive dialogue with mySQL, type q to exit.

After installation, in order to use mysql commands without typing the full path to the commands you need to add the [mysql directory to your shell path](http://coolestguidesontheplanet.com/add-shell-path-osx/ "What it is and How to Modify the Shell Path in OSX 10.10 Yosemite using Terminal"), (optional step) this is done in your “.bash_profile” file in your home directory, if you don’t have that file just create it using vi or nano:


    cd ; nano .bash_profile

    export PATH="/usr/local/mysql/bin:$PATH"

The first command brings you to your home directory and opens the .bash_profile file or creates a new one if it doesn’t exist, then add in the line above which adds the mysql binary path to commands that you can run. Exit the file with type “control + x” and when prompted save the change by typing “y”. Last thing to do here is to reload the shell for the above to work straight away.


    source ~/.bash_profile

    mysql -v

You will get the version number again, just type “q” to exit.

### Set the MySQL root password

Note that this is not the same as the root or admin password of OSX – this is a unique password for the **mysql root user**, use one and remember/jot down somewhere what it is.


    /usr/local/mysql/bin/mysqladmin -u root password 'yourpasswordhere'



### Fix the 2002 MySQL Socket error

Fix the looming 2002 socket error – which is linking where MySQL places the socket and where OSX thinks it should be, MySQL puts it in **/tmp** and OSX looks for it in **/var/mysql** the socket is a type of file that allows mysql client/server communication.


    sudo mkdir /var/mysql
    sudo ln -s /tmp/mysql.sock /var/mysql/mysql.sock

### AutoStarting MySQL on Reboot

There was a solution recently posted on how to autostart MySQL on reboot on Yosemite, if you follow this it will work:

    sudo nano /Library/LaunchDaemons/com.mysql.mysql.plist

And paste in:

```xml
<!--?xml version="1.0" encoding="UTF-8"?-->
<plist version="1.0">
  <dict>
    <key>KeepAlive</key>
    <true />
    <key>Label</key>
    <string>com.mysql.mysqld</string>
    <key>ProgramArguments</key>
    <array>
      <string>/usr/local/mysql/bin/mysqld_safe</string>
      <string>--user=mysql</string>
    </array>        
  </dict>
</plist>
```

Save it and then:

```
sudo chown root:wheel /Library/LaunchDaemons/com.mysql.mysql.plist
sudo chmod 644 /Library/LaunchDaemons/com.mysql.mysql.plist
sudo launchctl load -w /Library/LaunchDaemons/com.mysql.mysql.plist
```

Then it will load on a restart.

## phpMyAdmin

[phpMyAdmin is installed pretty much the same way as before](http://www.coolestguyplanettech.com/installing-phpmyadmin-on-mac-osx-10-7-lion/).

Fix the 2002 socket error first if you haven’t done so from the MySQL section-

    sudo mkdir /var/mysql

    sudo ln -s /tmp/mysql.sock /var/mysql/mysql.sock

Download [phpMyAdmin](http://www.phpmyadmin.net/home_page/downloads.php "phpmyadmin download"), the zip English package will suit a lot of users, then unzip it and move the folder with its contents into the document root level renaming folder to ‘phpmyadmin’.

Make the **config** folder

    mkdir ~/Sites/phpmyadmin/config

Change the permissions

    chmod o+w ~/Sites/phpmyadmin/config

Run the set up in the browser

<http://localhost/~username/phpmyadmin/setup/> or <http://localhost/phpmyadmin/setup/>

![](http://coolestguidesontheplanet.com/wp-content/uploads/2013/08/phpmyadmin-set-new-server.png)

You need to create a new localhost mysql server connection, click new server.

![](http://coolestguidesontheplanet.com/wp-content/uploads/2013/08/phpmyadmin-set-new-server-mysql-password.png)  

Switch to the **Authentication** tab and set the local mysql root user and the password.  
Add in the username “root” (maybe already populated, add in the password that you set up **[earlier](http://coolestguidesontheplanet.com/get-apache-mysql-php-phpmyadmin-working-osx-10-10-yosemite/#password)** for the MySQL root user set up, click on save and you are returned to the previous screen.  
(This is not the OSX Admin or root password – it is the MySQL root user).

![](http://coolestguidesontheplanet.com/wp-content/uploads/2013/08/phpmyadmin-save-config.png)  
Make sure you click on **save**, then a config.inc.php is now in the /config directory of phpmyadmin directory,  /config directory.

![](http://coolestguidesontheplanet.com/wp-content/uploads/2013/08/phpmyadmin-4-no-frames.png)

To upgrade phpmyadmin just download the latest version and copy the older ‘**config.inc.php**‘ from the existing directory into the new folder and replace – backup the older one just in case.

## Permissions

To run a website with no permission issues it is best to set the web root and its contents to be writeable by all, since it’s a local development it should’nt be a security issue.

Lets say that you have a site in the **User Sites** folder at the following location **~/Sites/testsite** you would set it to be writeable like so:


    sudo chmod -R a+w ~/Sites/testsite

If you are concerned about security then instead of making it world writeable you can set the owner to be Apache **_www** but when working on files you would have to authenticate more as admin you are “not” the owner, you would do this like so:

    sudo chown -R _www ~/Sites/testsite

This will set the contents recursively to be owned by the Apache user.

If you had the website stored at the **System** level Document root at say **/Library/WebServer/Documents/testsite** then it would have to be the latter:

    sudo chown -R _www /Library/WebServer/Documents/testsite

Another easier way to do this if you have a one user workstation is to change the [Apache web user from _www to your account](http://coolestguidesontheplanet.com/set-virtual-hosts-apache-mac-osx-10-10-yosemite/#apacheuser).

That’s it! You now have the native AMP stack running ontop of OSX Yosemite. [To get Virtual Hosts going there is a further guide here.](http://coolestguidesontheplanet.com/set-virtual-hosts-apache-mac-osx-10-10-yosemite/ "How to set up Virtual Hosts in Apache on Mac OSX 10.10 Yosemite")