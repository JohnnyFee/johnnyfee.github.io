---
layout: "post"
title: "Linux: Find Out What Is Using TCP Port 80"
categories: Linux
tags: [linux, port]
---

See [Linux: Find Out What Is Using TCP Port 80 – nixCraft](https://www.cyberciti.biz/faq/find-linux-what-running-on-port-80-command/)

How do I find out what is listing or using tcp port number 80 on Linux based systems using command line options?  

 You can use any one of the following command to find out what is using tcp or udp port number 80 on Linux operating systems:

1.  <kbd><strong>netstat</strong></kbd> – a command-line tool that displays network connections, routing tables, and a number of network interface statistics.
2.  <kbd><strong>fuser</strong></kbd> – a command line tool to identify processes using files or sockets.
3.  <kbd><strong>lsof</strong></kbd> – a command line tool to list open files under Linux / UNIX to report a list of all open files and the processes that opened them.
4.  <kbd><strong>/proc/$pid/</strong></kbd> **file system** – Under Linux /proc includes a directory for each running process (including kernel processes) at /proc/PID, containing information about that process, notably including the processes name that opened port.

<!-- more -->

## Examples

Open a terminal and then type the following command as root user:

### netstat command find out what is using port 80

Type the following command  
`# netstat -tulpn | grep :80`  
OR pass the [–color option to grep command](https://www.cyberciti.biz/faq/howto-use-grep-command-in-linux-unix/) as follows:  
`# netstat -tulpn | grep --color :80`  
Sample outputs:

<pre>
tcp        0      0 0.0.0.0:80                  0.0.0.0:*                   LISTEN      1215/nginx
</pre>

Where,

1.  0 0.0.0.0:80 – Source IP:Port
2.  1215/nginx  – PID/Process name

The tcp port 80 is opened and used by nginx web server. Type the following command to find out more about nginx:

<pre class="bash" style="font-family:monospace;">
whatis nginx
whereis nginx
</pre>

whatis nginx
whereis nginx

Note: You may need to install lsof and fuser command.

### Use /proc/$pid/exec file find out what is using port 80

First, find out the processes PID that opened tcp port 90, enter:  
`# fuser 80/tcp`  
Sample outputs:

<pre>
80/tcp:              12161 21776 25250 25393
</pre>

Finally, find out process name associated with PID # 3813, enter:  
`# ls -l /proc/12161/exe`  
Sample outputs:

<pre>
lrwxrwxrwx. 1 root root 0 Aug  9 13:28 /proc/12161/exe -> /usr/sbin/lighttpd
</pre>

Find out more about lighttpd:

<pre class="bash" style="font-family:monospace;">
man lighttpd
whatis lighttpd
whereis lighttpd
</pre>

man lighttpd
whatis lighttpd
whereis lighttpd

Sample outputs:

<pre>
lighttpd             (8)  - a fast, secure and flexible web server
lighttpd: /usr/sbin/lighttpd /usr/lib64/lighttpd /usr/share/man/man8/lighttpd.8.gz
</pre>

You can use package manager to dig into lighttpd:  

`# rpm -qa | grep lighttpd`  

Sample outputs:

<pre>
lighttpd-1.4.32-1.el6.x86_64
</pre>

To find out more about lighttpd-1.4.32-1.el6.x86_64 package, type:

```
# yum info lighttpd-1.4.32-1.el6.x86_64
```

Sample outputs:

```
Loaded plugins: auto-update-debuginfo, protectbase, rhnplugin, security
This system is receiving updates from RHN Classic or RHN Satellite.
0 packages excluded due to repository protections
Installed Packages
Name        : lighttpd
Arch        : x86_64
Version     : 1.4.32
Release     : 1.el6
Size        : 664 k
Repo        : installed
Summary     : A web server more optimized for speed-critical environments.
URL         : http://lighttpd.net/
License     : Revised BSD
Description : It is a secure and fast web server a very low memory footprint compared
            : to other webservers and takes care of cpu-load.
```

OR use rpm command:  

```
# rpm -qi lighttpd
```

Sample outputs:

```
Name        : lighttpd                     Relocations: (not relocatable)
Version     : 1.4.32                            Vendor: nixCraft
Release     : 1.el6                         Build Date: Sun 03 Feb 2013 03:22:08 AM CST
Install Date: Mon 04 Feb 2013 04:44:26 AM CST      Build Host: rhel6.nixcraft.net.in
Group       : System Environment/Daemons    Source RPM: lighttpd-1.4.32-1.el6.src.rpm
Size        : 680402                           License: Revised BSD
Signature   : (none)
URL         : http://lighttpd.net/
Summary     : A web server more optimized for speed-critical environments.
Description :
It is a secure and fast web server a very low memory footprint compared
to other webservers and takes care of cpu-load.
```

Debian / Ubuntu Linux user can use the following commands:

```
# dpkg --list | grep lighttpd  
# apt-cache search lighttpd  
# apt-cache show lighttpd
```

Sample outputs from the last command:

<pre>
Package: lighttpd
Priority: optional
Section: universe/web
Installed-Size: 841
Maintainer: Ubuntu Developers 
Original-Maintainer: Debian lighttpd maintainers 
Architecture: amd64
Version: 1.4.28-2ubuntu4
Provides: httpd, httpd-cgi
Depends: libattr1 (>= 1:2.4.46-5), libbz2-1.0, libc6 (>= 2.4), libgamin0 | libfam0, libldap-2.4-2 (>= 2.4.7), libpcre3 (>= 8.10), libssl1.0.0 (>= 1.0.0), zlib1g (>= 1:1.1.4), lsb-base (>= 3.2-14), mime-support, libterm-readline-perl-perl
Recommends: spawn-fcgi
Suggests: openssl, rrdtool, apache2-utils, ufw
Conflicts: cherokee (<= 0.6.1-1)
Filename: pool/universe/l/lighttpd/lighttpd_1.4.28-2ubuntu4_amd64.deb
Size: 279838
MD5sum: 65aedfd0e0ab6d3ee28e7b394567ed22
SHA1: 34a9156fa3d23635eb24efb436de585c0594f046
SHA256: 751d6f8309d249740d7aab240a74b6bae713e524cf6815544b6cdbb6107fded2
Description-en: A fast webserver with minimal memory footprint
 lighttpd is a small webserver and fast webserver developed with
 security in mind and a lot of features.
 It has support for
   * CGI, FastCGI and SSI
   * virtual hosts
   * URL rewriting
   * authentication (plain files, htpasswd, ldap)
   * transparent content compression
   * conditional configuration
 and configuration is straight-forward and easy.
Homepage: http://www.lighttpd.net
Description-md5: 267ee2989b526d8253e822e7d8244ccd
Bugs: https://bugs.launchpad.net/ubuntu/+filebug
Origin: Ubuntu
</pre>

### lsof command find out what is using port 80

Type the following command  
`# lsof -i :80 | grep LISTEN`  
Sample outputs:

<pre>
apache2   1607     root    3u  IPv4   6472      0t0  TCP *:www (LISTEN)
apache2   1616 www-data    3u  IPv4   6472      0t0  TCP *:www (LISTEN)
apache2   1617 www-data    3u  IPv4   6472      0t0  TCP *:www (LISTEN)
</pre>

##### See also

* [Linux: Find Out Which Process Is Listening Upon a Port](https://www.cyberciti.biz/faq/what-process-has-open-linux-port/)
* [ss: Display Linux TCP / UDP Network and Socket Information](https://www.cyberciti.biz/tips/linux-investigate-sockets-network-connections.html)
* See man pages for more info [lsof(8)](http://www.manpager.com/linux/man8/lsof.8.html "See lsof(8) linux man page for more information and examples"), [fuser(1)](http://www.manpager.com/linux/man1/fuser.1.html "See fuser(1) linux man page for more information and examples"), [proc(5)](http://www.manpager.com/linux/man5/proc.5.html "See proc(5) linux man page for more information and examples"), [netstat(8)](http://www.manpager.com/linux/man8/netstat.8.html "See netstat(8) linux man page for more information and examples"), [ss(8)](http://www.manpager.com/linux/man8/ss.8.html "See ss(8) linux man page for more information and examples")