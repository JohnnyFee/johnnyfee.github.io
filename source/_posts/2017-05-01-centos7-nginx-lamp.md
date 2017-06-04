---
layout: "post"
title: "How to Install PHP 7, NGINX & MySQL 5.6 on CentOS/RHEL 7.1 & 6.7"
categories: PHP
tags: [centos, php, nginx, lamp]
---

See 

- [How To Install PHP 7, NGINX & MySQL 5.6 on CentOS/RHEL 7.1 & 6.7](https://tecadmin.net/install-php-7-nginx-mysql-5-on-centos/#)
- [CentOS 7 安裝 Apache + PHP 7 + MySQL + phpMyAdmin + FTP](https://jsnwork.kiiuo.com/archives/2118/centos-7-%E5%AE%89%E8%A3%9D-apache-php-mysql-phpmyadmin-ftp)

Few days back PHP version 7.0 has been released. Which has number of changes and improvements  over PHP version 5.X.  This article will help you to install  PHP 7, NGINX and  MySQL 5.6 on CentOS / RHEL 7.1 & 6.7 operating systems. This tutorial has been tested with CentOS 7.1, so all the services command are used with systemctl, For CentOS 6 users change all **systemctl** command correspondence **service** command.

<!-- more -->

## Step 1. Setup Yum Repository

In the first step install all the required yum repositories in your system used in remaining tutorial for various installations. You are adding REMI, EPEL, Webtatic & MySQL community server repositories in your system.

### CentOS / RHEL 7 

<pre>
# yum install epel-release
# rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
# rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm
# rpm -Uvh http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm
</pre>

### CentOS / RHEL 6 

<pre>
# yum install epel-release
# rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-6.rpm
# rpm -Uvh https://mirror.webtatic.com/yum/el6/latest.rpm
# rpm -Uvh http://repo.mysql.com/mysql-community-release-el6-5.noarch.rpm
</pre>

## Step 2. Install PHP 7 

Now install php 7 packages from webtatic rpm repository using following command.

<pre>
# yum install php70w
</pre>

Now install required php modules. Use following command to list available modules in yum repositories.

<pre>
# yum search php70w
</pre>

Now check all listed modules in above command and install required modules like below.

<pre>
# yum install php70w-mysql php70w-xml php70w-soap php70w-xmlrpc
# yum install php70w-mbstring php70w-json php70w-gd php70w-mcrypt
</pre>

## Step 3. Install NGINX 

NGINX is the popular web server used on Linux systems. Let’s install Nginx web server using following command on your system.

<pre>
# yum install nginx
</pre>

Now start nginx service and enable to start on boot using below commands.

<pre>
# systemctl enable nginx.service
# systemctl start nginx.service
</pre>

## Step 4. Install MySQL 5.6 

In step 1 we already have installed required yum repository in your system. Lets use following command to install MySQL server on your system.

<pre>
# yum install mysql-server
</pre>

You need to execute mysql_secure_installation once after installation of MySQL server using following command. First it will prompt to set a password for root account, after that ask few questions, I suggest to say yes ( y ) for all.

<pre>
# systemctl start mysqld.service
# mysql_secure_installation
</pre>

Now restart MySQL service and enable to start on system boot.

<pre>
# systemctl restart mysqld.service
# systemctl enable mysqld.service
</pre>

See more [How To Install MySQL on CentOS 7](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-centos-7)

## Step 5 — Setup PHP-FPM 

Now use following command to install php7 fpm package using following command.

<pre>
# yum install php70w-fpm
</pre>

## Step 6 — Create Nginx VirtualHost 

Finally do the configuration of Nginx VirtualHost. For this example we are editing default configuration file.

<pre>
$ sudo nano /etc/nginx/conf.d/example.conf
</pre>

and make changes as below.

<pre class="pretty">
server {
        listen   80;

        root /var/www;
        index index.php index.html index.htm;
        server_name  example.com www.example.com;

        location / {
                try_files $uri $uri/ /index.html;
        }

        error_page 404 /404.html;
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
              root /usr/share/nginx/www;
        }

        location ~ .php$ {
                try_files $uri =404;
                fastcgi_pass 127.0.0.1:9000;
                fastcgi_index index.php;
                fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
                include fastcgi_params;
        }
}
</pre>

You have to do the same changes in all Virtual Hosts configured.

## Step 7 – Restart Services

After installing all services on your  system, start all required services.

<pre>
# systemctl restart nginx.service
# systemctl restart php-fpm.service
</pre>

## Step 8. Open Port in Firewall 

Finally open firewall ports for http (80) and https (443) services using following command.

<pre>
# firewall-cmd --permanent --zone=public --add-service=http
# firewall-cmd --permanent --zone=public --add-service=https
# firewall-cmd --reload
</pre>

## Step 9. Verify Setup

Let’s check the installed versions of packages on system using following commands one by one.

<pre>
# php -v

PHP 7.0.2 (cli) (built: Jan  9 2016 14:00:11) ( NTS )
Copyright (c) 1997-2015 The PHP Group
Zend Engine v3.0.0, Copyright (c) 1998-2015 Zend Technologies
</pre>

<pre>
# nginx -v

nginx version: nginx/1.6.3
</pre>

Finally verify installation of PHP 7 with NGINX. Let’s create a file index.php on website document root using following content.

<!-- Crayon Syntax Highlighter v_2.7.2_beta -->

```
phpinfo();
```

<!-- [Format Time: 0.0018 seconds] -->

Now browse this file in web browser. It will so all the details about version’s and installation.

![php7-nginx-centos](https://tecadmin.net/wp-content/uploads/2016/02/php7-nginx-centos.png)

You have successfully configured LEMP Stack setup on your CentOS / RHEL 7.1 & 6.7 system.

## FAQ

### Update php

If you have installed php in lower version, you can rm the outdated version:

```
yum remove php* php-common
```

If you don't care the newest php version, you can use default version. See [How To Install Linux, Nginx, MySQL, PHP (LEMP) stack On CentOS 7](https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-on-centos-7)

### centos nginx bind() to 0.0.0.0:8090 failed (13: Permission denied)

[nginx: no permission to bind port 8090 but it binds to 80 and 8080 - Server Fault](https://serverfault.com/questions/566317/nginx-no-permission-to-bind-port-8090-but-it-binds-to-80-and-8080)

cnetos下修改端口成非常规端口出现报错

```hljs
2014/01/10 09:20:02 [emerg] 30181#0: bind() to 0.0.0.0:8090 failed (13: Permission denied)
```

This will most likely be related to SELinux

```
semanage port -l | grep http_port_t
http_port_t                    tcp      80, 81, 443, 488, 8008, 8009, 8443, 9000
```

As you can see from the output above with SELinux in enforcing mode http is only allowed to bind to the listed ports. The solution is to add the ports you want to bind on to the list

```
semanage port -a -t http_port_t  -p tcp 8090
```

will add port 8090 to the list.

如果出现 semanage command not found错误就执行  

```
yum -y install policycoreutils-python
```

See [semanage command not found on CentOS 7 and RHEL 7](http://sharadchhetri.com/2014/10/07/semanage-command-found-centos-7-rhel-7/)

### SElinux error :ValueError: Port tcp/5000 already defined

[httpd - SElinux error :ValueError: Port tcp/5000 already defined - Server Fault](https://serverfault.com/questions/790404/selinux-error-valueerror-port-tcp-5000-already-defined)

On the systems I have to hand (C6, C7 and F24), tcp port 5000 has an SELinux context of `commplex_port_t`. This will be why, when you try to add it you get the error message 

```
/usr/sbin/semanage: Port tcp/5000 already defined
```

To change the context of tcp port 5000 from `commplex_port_t` to `http_port_t` you will need to use the -m | --modify switch

```
-m, --modify     Modify a OBJECT record NAME
```

so

```
semanage port -m -t http_port_t -p tcp 5000
```

should do what you want 

```
semanage port -l | grep 5000
http_port_t                tcp      5000, 80, 81, 443, 488, 8008, 8009, 8443, 9000
```

### ERROR 1396 (HY000): Operation CREATE USER failed for 'xxx'@'localhost'

yes this bug is there. However, I found a small workaround.

* Assume the user is there, so drop the user
* After deleting the user, there is need to flush the mysql privileges
* Now create the user.

That should solve it. Assuming we want to create the user admin @ localhost, these would be the commands:

```shell
drop user admin@localhost;
flush privileges;
create user admin@localhost identified by '_admins_password_'
```

See [mysql - ERROR 1396 (HY000): Operation CREATE USER failed for 'jack'@'localhost' - Stack Overflow](http://stackoverflow.com/questions/5555328/error-1396-hy000-operation-create-user-failed-for-jacklocalhost)