---
layout: "post"
title: "How To Install and Secure phpMyAdmin with Nginx on a CentOS 7 Server"
categories: PHP
tags: [centos, php, nginx, lamp, phpMyAdmin]
---

### Introduction

Relational database management systems like MySQL and MariaDB are needed for a significant portion of web sites and applications.  However, not all users feel comfortable administering their data from the command line.

To solve this problem, a project called phpMyAdmin was created in order to offer an alternative in the form of a web-based management interface.  In this guide, we will demonstrate how to install and secure a phpMyAdmin configuration on a CentOS 7 server.  We will build this setup on top of the Nginx web server, which has a good performance profile and can handle heavy loads better than some other web servers.

<!-- more -->

## Prerequisites

Before we begin, there are a few requirements that need to be settled.

To ensure that you have a solid base to build this system upon, you should run through our [initial server setup guide for CentOS 7](https://www.digitalocean.com/community/articles/initial-server-setup-with-centos-7).  Among other things, this will walk you through setting up a non-root user with `sudo` access for administrative commands.

The second prerequisite that must be fulfilled in order to start on this guide is to install a LEMP (Linux, Nginx, MariaDB, and PHP) stack on your CentOS 7 server.  This is the platform that we will use to serve our phpMyAdmin interface (MariaDB is also the database management software that we are wishing to manage).  If you do not yet have a LEMP installation on your server, follow our tutorial on [installing LEMP on CentOS 7](http://blog.inching.org/PHP/2017-05-01-php-nginx-centos7-phpMyAdmin).

When your server is in a properly functioning state after following these guides, you can continue on with the rest of this page.

## Step One — Install phpMyAdmin

With our LEMP platform already in place, we can begin right away with installing the phpMyAdmin software.  Unfortunately, phpMyAdmin is not available in CentOS 7's default repository.

To get the packages we need, we'll have to add an additional repo to our system.  The EPEL repo (**E**xtra **P**ackages for **E**nterprise **L**inux) contains many additional packages, including the phpMyAdmin package we are looking for.

Luckily, the procedure for adding the EPEL repository has gotten a lot easier.  There is actually a package called `epel-release` that reconfigures our package manager to use the EPEL repos.

We can install that now by typing:

```
sudo yum install epel-release
```

Now that you have access to the EPEL repository, you can install phpMyAdmin through yum:

```
sudo yum install phpmyadmin
```

The installation will now complete.  For the Nginx web server to find and serve the phpMyAdmin files correctly, we just need to create a symbolic link from the installation files to our Nginx document root directory by typing this:

```
sudo ln -s /usr/share/phpMyAdmin /usr/share/nginx/html
```

We should also restart our PHP processor to be sure that it can load the additional PHP modules that we installed:

```
sudo systemctl restart php-fpm
```

With that, our phpMyAdmin installation is now operational.  To access the interface, go to your server's domain name or public IP address followed by `/phpMyAdmin`, in your web browser:

```
http://server_domain_or_IP/phpMyAdmin
```

![phpMyAdmin login screen](https://assets.digitalocean.com/articles/phpmyadmin_lemp_centos7/login.png)

To sign in, use a username/password pair of a valid MariaDB user.  The `root` user and the MariaDB administrative password is a good choice to get started.  You will then be able to access the administrative interface:

![phpMyAdmin admin interface](https://assets.digitalocean.com/articles/phpmyadmin_lemp_centos7/main_page.png)

Click around to get familiar with the interface.  In the next section, we will take steps to secure our new interface.

## Step Two — Secure your phpMyAdmin Instance

The phpMyAdmin instance installed on our server should be completely usable at this point.  However, by installing a web interface, we have exposed our MySQL system to the outside world.

Even with the included authentication screen, this is quite a problem.  Because of phpMyAdmin's popularity combined with the large amount of data it provides access to, installations like these are common targets for attackers.

We will implement two simple strategies to lessen the chances of our installation being targeted and compromised.  We will change the location of the interface from `/phpMyAdmin` to something else to sidestep some of the automated bot brute-force attempts.  We will also create an additional, web server-level authentication gateway that must be passed before even getting to the phpMyAdmin login screen.

### Changing the Application's Access Location

In order for our Nginx web server to find and serve our phpMyAdmin files, we created a symbolic link from the phpMyAdmin directory to our document root in an earlier step.

To change the URL where our phpMyAdmin interface can be accessed, we simply need to rename the symbolic link.  Move into the Nginx document root directory to get a better idea of what we are doing:

```
cd /usr/share/nginx/html
ls -l
```

```
-rw-r--r-- 1 root root 537 Aug  5 08:15 50x.html
-rw-r--r-- 1 root root 612 Aug  5 08:15 index.html
lrwxrwxrwx 1 root root  21 Aug  6 17:29 phpMyAdmin -> /usr/share/phpMyAdmin
```

As you can see, we have a symbolic link called `phpMyAdmin` in this directory.  We can change this link name to whatever we would like.  This will change the location where phpMyAdmin can be accessed from a browser, which can help obscure the access point from hard-coded bots.

Choose a name that does not indicate the purpose of the location.  In this guide, we will name our access location `/nothingtosee`.  To accomplish this, we will just rename the link:

```
sudo mv phpMyAdmin nothingtosee
ls -l
```

```
total 8
-rw-r--r-- 1 root root 537 Aug  5 08:15 50x.html
-rw-r--r-- 1 root root 612 Aug  5 08:15 index.html
lrwxrwxrwx 1 root root  21 Aug  6 17:29 nothingtosee -> /usr/share/phpMyAdmin
```

Now, if you go to the previous location of your phpMyAdmin installation, you will get a 404 error:

```
http://server_domain_or_IP/phpMyAdmin
```

![phpMyAdmin 404 error](https://assets.digitalocean.com/articles/phpmyadmin_lemp_centos7/404_error.png)

However, your phpMyAdmin interface will be available at the new location we selected:

```
http://server_domain_or_IP/nothingtosee
```

![phpMyAdmin login screen](https://assets.digitalocean.com/articles/phpmyadmin_lemp_centos7/login.png)

### Setting up a Web Server Authentication Gate

The next feature we wanted for our installation was an authentication prompt that a user would be required to pass before ever seeing the phpMyAdmin login screen.

Fortunately, most web servers, including Nginx, provide this capability natively.  We will just need to modify our Nginx configuration file with the details.

Before we do this, we will create a password file that will store our the authentication credentials.  Nginx requires that passwords be encrypted using the `crypt()` function.  The OpenSSL suite, which should already be installed on your server, includes this functionality.

To create an encrypted password, type:

```
openssl passwd
```

You will be prompted to enter and confirm the password that you wish to use.  The utility will then display an encrypted version of the password that will look something like this:

```
O5az.RSPzd.HE
```

Copy this value, as you will need to paste it into the authentication file we will be creating.

Now, create an authentication file.  We will call this file `pma_pass` and place it in the Nginx configuration directory:

```
sudo nano /etc/nginx/pma_pass
```

Within this file, you simply need to specify the username you would like to use, followed by a colon (:), followed by the encrypted version of your password you received from the `openssl passwd` utility.

We are going to name our user `demo`, but you should choose a different username.  The file for this guide looks like this:

```
demo:O5az.RSPzd.HE
```

Save and close the file when you are finished.

Now, we are ready to modify our Nginx configuration file.  Open this file in your text editor to get started:

```
sudo nano /etc/nginx/conf.d/default.conf
```

Within this file, we need to add a new location section.  This will target the location we chose for our phpMyAdmin interface (we selected `/nothingtosee` in this guide).

Create this section within the `server` block, but outside of any other blocks.  We will put our new location block below the `location /` block in our example:

```
server {
    . . .

    location / {
        try_file $uri $uri/ =404;
    }

    location /nothingtosee {
    }

    . . .
}
```

Within this block, we need to set the value of a directive called `auth_basic` to an authentication message that our prompt will display to users.  We do not want to indicate to unauthenticated users what we are protecting, so do not give specific details.  We will just use "Admin Login" in our example.

We then need to use a directive called `auth_basic_user_file` to point our web server to the authentication file that we created.  Nginx will prompt the user for authentication details and check that the inputted values match what it finds in the specified file.

After we are finished, the file should look like this:

```
server {
    . . .

    location / {
        try_file $uri $uri/ =404;
    }

    location /nothingtosee {
        auth_basic "Admin Login";
        auth_basic_user_file /etc/nginx/pma_pass;
    }

    . . .
}
```

Save and close the file when you are finished.

To implement our new authentication gate, we must restart the web server:

```
sudo systemctl restart nginx
```

Now, if we visit our phpMyAdmin location in our web browser (you may have to clear your cache or use a different browser session if you have already been using phpMyAdmin), you should be prompted for the username and password you added to the `pma_pass` file:

```
http://server_domain_or_IP/nothingtosee
```

![Nginx authentication page](https://assets.digitalocean.com/articles/phpmyadmin_lemp_centos7/auth_gate.png)

Once you enter your credentials, you will be taken to the normal phpMyAdmin login page.  This added layer of protection will help keep your MySQL logs clean of authentication attempts in addition to the added security benefit.

## Conclusion

You can now manage your MySQL databases from a reasonably secure web interface.  This UI exposes most of the functionality that is available from the MySQL command prompt.  You can view databases and schema, execute queries, and create new data sets and structures.

## FAQ

### Phpmyadmin Session Start error on last version

I've updated Phpmyadmin from 4.4.1 version to 4.4.2 version and started to get this error:

> Warning in ./libraries/session.inc.php#101  session_start(): open(/var/lib/php/session/sess_bsv20h8gq58qq1ep33qbfrb7r62jtksi,
> O_RDWR) failed: Permission denied (13)
>
> Backtrace
>
> ./libraries/session.inc.php#101: session_start()
> ./libraries/common.inc.php#349: require(./libraries/session.inc.php)
> ./index.php#12: require_once(./libraries/common.inc.php)

This happened on two different machines with Centos 6.6 installed.
The serber have Apache 2.2, PHP 5.4 and Nginx as reverse proxy.

In my case, I was running nginx primarily so needed to chown the sessions directory to nginx for user and group... (By default, the session folder was in the apache group).

```
chown nginx:nginx /var/lib/php/session
```

Then force refresh the phpMyAdmin page and the session permission related errors are resolved.

And if existing sessions, the contents too:-

```
chown -R nginx:nginx /var/lib/php/session
```

