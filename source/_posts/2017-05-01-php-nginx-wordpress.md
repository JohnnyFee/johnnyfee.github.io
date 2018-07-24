---
layout: "post"
title: "How To Install WordPress with Nginx on a CentOS 7 Server"
categories: PHP
tags: [centos, php, nginx, lamp, wordpress]
---

WordPress is the most widely used open source web blogging and content management software written in php and MySQL. In this article, I will show you how to install WordPress using Nginx on CentOS/RHEL 7/6/5.

## **Step #1 Prerequisite:**

You’ll need to have a LEMP (Linux, Nginx, MySQL, and PHP) installed on your CentOS/RHEL server. If LEMP hasn’t installed or configured on server, you c
an use below articles to install LEMP.

**On RHEL/CentOS 7**

```shell
yum install nginx mariadb mariadb-server php php-fpm php-common php-mysql php-gd php-xml php-mbstring php-mcrypt 
```

**On RHEL/CentOS 6/5** 

```
yum install nginx mysql mysql-server php php-fpm php-common php-mysql php-gd php-xml php-mbstring php-mcrypt
```

<!-- more -->

It will install php5, if you want to install PHP7, do as [How to Install PHP 7, NGINX & MySQL 5.6 on CentOS/RHEL 7.1 & 6.7](http://blog.inching.org/PHP/2017-05-01-centos7-nginx-lamp.html)

Next, start the service to reflect changes.

**On RHEL/CentOS 7** 

```shell
# systemctl start nginx
# systemctl start mysqld
# systemctl start php-fpm
```

**On RHEL/CentOS 6/5** 

```shell
# service nginx start
# service mysqld start
# service php-fpm start
```

[Install LAMP on CentOS/RHEL 7](http://www.techoism.com/how-to-install-lamp-on-centosrhel-7/)  
[Install LAMP on CentOS/RHEL 5/6](http://www.techoism.com/install-lamp-on-centosrhel/)

## **Step #2 Downloading & Extracting WordPress**

WordPress content can be downloaded using the commands below.

```shell
# cd /opt
# wget https://wordpress.org/latest.tar.gz
```

Once the download finish, run the following command extract it.

```shell
# tar -xvzf latest.tar.gz -C /usr/share/nginx/html/
```

Next, change the permissions and ownership of the WordPress content folders.

```shell
# chown -R apache: /usr/share/nginx/html/wordpress
# chmod -R 755 /usr/share/nginx/html/wordpress
```

## **Step #3 Creating MySQL Database for WordPress**

Now create a mysql database and user for wordpress. Use following set of command to create database and user.

```shell
# mysql -u root -p
```

```shell
mysql> CREATE DATABASE <dbname>; 
mysql> CREATE USER <username>@localhost IDENTIFIED BY 'password';
mysql> GRANT ALL PRIVILEGES ON <dbname>.* TO <username>@localhost;
mysql> FLUSH PRIVILEGES;
mysql> quit
```

如果需要在其他主机也可以访问该数据库，则需要添加 User：

```
mysql> CREATE USER <username>@'%' IDENTIFIED BY 'password';
mysql> GRANT ALL PRIVILEGES ON <dbname>.* TO <username>@'%';
mysql> FLUSH PRIVILEGES;
```


## **Step #4 Creating Nginx VirtualHost**

Open the Nginx configuration file with “vi” editor and add the following lines:

```shell
# vi /etc/nginx/conf.d/blog.techoism.conf
```

```
server {
        listen 80;
        server_name localhost;
        root   /usr/share/nginx/html/wordpress;
        index index.php index.html;
        location / {
            try_files $uri $uri/ /index.php?$args;
        }
        
        location ~ .php$ {
            try_files $uri =404;
            fastcgi_pass    127.0.0.1:9000;
            fastcgi_index   index.php;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            include fastcgi_params;
        }
}
```

Next, restart the nginx service to reflect changes.

```shell
**On RHEL/CentOS 7** 
# systemctl restart nginx 
**On RHEL/CentOS 6/5** 
# service nginx restart 
```

## **Step #5 Configuring WordPress Installation**

Use following command to configure WordPress installation.

```shell
# cd /usr/share/nginx/html/wordpress
# cp wp-config-sample.php wp-config.php
# chmod 777 wp-config.php
# chown apache:apache wp-config.php
```

Open wordpress configuration file and change MySQL setting.

```shell
# vi wp-config.php
```

```
// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'techoism_db');

/** MySQL database username */
define('DB_USER', 'techoism_user');

/** MySQL database password */
define('DB_PASSWORD', 'redhat');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');
```

## **Step #6 WordPress Installation**

Open your browser and type any of the following address.

```
http://blog.techoism.com
http://Server-IP
```

## FAQ

### WHY WORDPRESS ASKS FOR CONNECTION INFO

[Why WordPress Asks for Connection Info](https://www.chrisabernethy.com/why-wordpress-asks-connection-info/)

One of the great features of WordPress is that it allows you to automatically install and upgrade plugins.

A common problem is that WordPress is unable to access the filesystem directly, which results in a page indicating that “_To perform the requested action, connection information is required._“

![Connection Information](http://www.chrisabernethy.com/wp-content/uploads/2008/12/connection_info_needed.jpg "Connection Information")

If you feel that your WordPress installation should not be asking you for this information, or you simply do not want WordPress to use this method of plugin management, you may be able to work around it.

#### What is Causing This?

Whenever you use the WordPress control panel to automatically install, upgrade, or delete plugins, WordPress must make changes to files on the filesystem.

Before making any changes, WordPress first checks to see whether or not it has access to directly manipulate the file system.

If WordPress does not have the necessary permissions to modify the filesystem directly, you will be asked for FTP credentials so that WordPress can try to do what it needs to via FTP.

#### Why Can’t WordPress Write To The Filesystem?

In order to understand why WordPress can’t write to the filesystem, we need to take a look at some WordPress internals.

The following code is from the `get_filesystem_method()` method in the `wp-admin/includes/file.php` file:

<pre>
if( function_exists('getmyuid') && function_exists('fileowner') ){
    $temp_file = wp_tempnam();
    if ( getmyuid() == fileowner($temp_file) )
        $method = 'direct';
    unlink($temp_file);
}
</pre>

This code creates a temporary file and confirms that the file just created is owned by the same user that _owns the script currently being run_. In the case of installing plugins, the script being run is `wp-admin/plugin-install.php`.

This may seem a little counter-intuitive, since the only thing WordPress really needs to be able to do is write to the `wp-content/plugins` directory.

#### What Can I Do About It?

In order to fix this issue, you will need to make sure that the scripts which need to write to the filesystem are owned by the same user that apache is running as.

Many hosting companies will run your apache instance using your user account, and all of your files will be owned by the same account. In those cases, you will probably not have the issue described here.

If your hosting company is running apache as a system user, and your files are owned by your own account, your only option may be to enter your FTP credentials here and allow WordPress to use FTP.

If you are running on a hosting company that gives you root access, or you have installed WordPress on your own development machine at home or at work, you should be able to modify the filesystem permissions to allow WordPress to directly access the filesystem.

The easiest way to do this is to find out what user apache is running as and change ownership of the entire WordPress directory to that user. For example, if apache is running as ‘httpd’, you could use the following commands on your WordPress installation directory:

<pre>
# chown -R apache: wordpress
</pre>

Note that not all versions of `chown` are equal. If that command does not work, see your local `chown` man page for usage information.

**Tip:** In order to find out what user your instance of apache is running as, create a test script with the following content:  
`<?php echo(exec("whoami")); ?>`  
Thanks [Suzanne](http://wp-wizardry.com/ "WP Wizardry: Magical Stuff for WordPress")!

## FAQ

### Nginx: 413 Request Entity Too Large Error and Solution

See [Nginx: 413 Request Entity Too Large Error and Solution – nixCraft](https://www.cyberciti.biz/faq/linux-unix-bsd-nginx-413-request-entity-too-large/)

See also [Increase file upload size limit in PHP-Nginx](https://easyengine.io/tutorials/php/increase-file-upload-size-limit/)

#### Nginx configuration

The 
<kbd>client_max_body_size</kbd> directive assigns the maximum accepted body size of client request, indicated by the line Content-Length in the header of request. If size is greater the given one, then the client gets the error “Request Entity Too Large” (413). To fix this issue edit your nginx.conf. Open the Terminal or login to the remote server using ssh client. Type the following command to edit your nginx.conf using a text editor such as vi or joe:  
`# vi /etc/nginx/nginx.conf`  
OR  
`# vi /usr/local/nginx/conf/nginx.conf`  
Add the following line to **http or server or location context** to increase the size limit in nginx.conf, enter:

```
# set client body size to 2M #
client_max_body_size 2M;
```

Save and close the file. [Reload the nginx webserver](https://www.cyberciti.biz/faq/nginx-linux-restart/), enter:  
`# /usr/local/nginx/sbin/nginx -s reload`  
OR  
`# /sbin/nginx -s reload`  
OR use the following on RHEL/CentOS/Debian/Ubuntu Linux:  
`# service nginx reload`

#### PHP configuration (optional)

Your php installation also put limits on upload file size. Edit php.ini and set the following directives

```
;This sets the maximum amount of memory in bytes that a script is allowed to allocate
memory_limit = 32M

;The maximum size of an uploaded file.
upload_max_filesize = 2M

;Sets max size of post data allowed. This setting also affects file upload. To upload large files, this value must be larger than upload_max_filesize
post_max_size = 3M
```

Save and close the file. Make sure you reload/restart back-end apache or nginx web server as per your setup. See “[PHP Increase Upload File Size Limit](https://www.cyberciti.biz/faq/linux-unix-apache-increase-php-upload-limit/)” tutorial for more information.

