---
layout: "post"
title: "How To Install and Update WordPress with Version Control on CentOS 7"
categories: WordPress
tags: [centos, wordpress, update, upgrade]
---

## Introduction

There are many ways to install the WordPress content management system. This tutorial introduces two methods for installing WordPress from a public repository: SVN or Git.

While you can install WordPress in a few different ways, e.g. using a one-click image, downloading a zip file, or using the built-in FTP service – using a repository has some unique benefits.

* Quick upgrades and downgrades to different versions of WordPress
* More secure protocols for transferring the files
* Faster updates since only the changed files are transferred

What happens if you update WordPress to the latest version and your site goes down? With SVN or Git, you can easily roll back the file changes with one command. This is impossible with the FTP updater.

### Git Step One — Install LAMP

Follow this tutorial to install Apache, MySQL, and PHP on your server:

[How To Install Linux, Apache, MySQL, PHP (LAMP) stack On CentOS 7](https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-on-centos-7)

You can stop after **Step Three — Install PHP**.

### Git Step Two — Install Git

Install Git with the following command:

```
yum install git
```

You'll need to answer yes to accept the download. Now let's test it.  Enter the following command:

```
git
```

You should see the following message:

```
usage: git ...
```

### Git Step Three — Clone WordPress

First, figure out which version of WordPress you want to install. The best place for this is to visit the [official WordPress website](http://www.wordpress.org/).

At the time of writing, this is WordPress 4.0, so that's what we'll use in the examples.

Decide where you want to install WordPress. In this example we'll use the default Apache document root, /var/www/html. If you want to set up a [virtual host](https://www.digitalocean.com/community/tutorials/how-to-set-up-apache-virtual-hosts-on-centos-7), you can do that instead.

Clone the latest version of WordPress from the GitHub repository:

```
git clone git://github.com/WordPress/WordPress /var/www/html/
```

The general form of the command is as follows:

```
git clone git://github.com/WordPress/WordPress [INSTALL IN THIS DIRECTORY]/
```

You'll see some messages such as Cloning in... along with, but not limited to, Receiving objects: and Receiving deltas: with some information. You now have a complete working development copy of WordPress, including past production runs.

However, we want the latest production (stable) version. First move to the WordPress directory on your server:

```
cd /var/www/html/
```

Check out WordPress 4.0, or the latest stable version, with the following command:

```
git checkout 4.0
```

The general form of the command is as follows:

```
git checkout [VERSION]
```

Git will display some information along with something like `HEAD is now at 8422210... Tag 4.0,` which indicates the file versions were successfully changed; in this case to 4.0.

Congratulations! You've just installed WordPress using Git. 

Now we need to set up the database and configure WordPress.

### Git Step Four — Configure WordPress

Follow the instructions in this [WordPress installation tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-wordpress-on-centos-7), but **without** the wget, tar, and rsync commands.

You do need to set up the database, change the wp-config.php details, and run the chown command:

```
chown -R apache:apache /var/www/html/*
```

At this point WordPress is ready to use! Visit your IP address or domain in your browser, and set your website and login details as prompted. You can add themes, plugins, and content as you like.

### Git Step Five — Secure the .git Directory

Git uses a special directory called `.git` that contain important information. You should block web access to this directory for security's sake.

If you want to see what it looks like now, visit http://example.com/.git/ in your browser, using your own domain name. It should list the files in the directory, which is a security issue.

First, open your Apache configuration file for editing:

```
nano /etc/httpd/conf/httpd.conf
```

Locate the AllowOverride line in the <Directory "/var/www/html"> section. It should be the third AllowOverride line in the default configuration file. Update the setting from **None** to **ALL**. This will allow your .htaccess file to become active.

```
...
<Directory "/var/www/html">

...

    Options Indexes FollowSymLinks

...

    AllowOverride ALL

    #
    # Controls who can get stuff from this server.
    #
    Require all granted
</Directory>
...
```

Now create a new .htaccess file in the /var/www/html/.git/.htaccess directory:

```
nano /var/www/html/.git/.htaccess
```

Add the following contents to the file:

```
order deny, allow
deny from all
```

Restart Apache:

```
service httpd restart
```

Now you, or anyone trying to snoop on your server, will get an Internal Server Error if they visit http://example.com/.git/.

### Git Step Six — Upgrade or Roll Back

Now it's time to upgrade WordPress. You'll want to keep up with security patches, bug fixes, and new features. So let's discuss how to upgrade with Git.

It's always a good idea to [make a backup](https://www.digitalocean.com/community/tutorials/how-to-choose-an-effective-backup-strategy-for-your-vps).

Connect to your server with SSH, and move to your WordPress installation directory:

```
cd /var/www/html/
```

Fetch the latest files from the third-party WordPress repository:

```
git fetch -p git://github.com/WordPress/WordPress
```

The -p switch tells Git to remove any old versions that are no longer in the repository. This helps keep your files in sync with the remote server.

Execute this command to check out a new version:

```
git checkout [VERSION]
```

**[VERSION]** is a placeholder for the actual number of the release. If the new version to be installed was 4.0.1, the command would be:

```
git checkout 4.0.1
```

This is also the method for downgrading, too. If you want to return to version 3.9.2; you would do that with this command:

```
git checkout 3.9.2
```

To see all the available options, check the **branch** dropdown and the **Tags** tab on the [repository page](https://github.com/WordPress/WordPress).

That's it! With Git, your custom settings, like your wp-config.php file and your themes and plugins, should stay the same. However, if you've modified any of the core files, you may run into problems; hence the need for a backup.

Once you have the files, you need to let WordPress make the changes it needs in the database.

Visit http://example.com/wp-admin/.

Click the **Update WordPress Database** button.

That's it! You should now be on your desired version of WordPress. If your site isn't working after the change, simply check out the version you had before.

## Conclusion

If you made it to the end of this tutorial you should have a basic understanding of setting up WordPress using the SVN and/or Git system(s). It is important to note that this method will back up the core WordPress system, but your custom themes and plugins will require a different approach.

Now that you have learned how to manage WordPress with version control, you'll probably never want to go back. This is so much faster, easier, and safer. You don't need to store any FTP information in your WordPress installation. Also, you can easily and quickly revert back to previous versions if the need arises, something that the FTP method makes more difficult.

This guide is not a replacement for a good [backup system](https://www.digitalocean.com/community/tutorials/how-to-choose-an-effective-backup-strategy-for-your-vps), so make sure you have good backups, too.