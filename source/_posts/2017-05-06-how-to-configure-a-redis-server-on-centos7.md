---
layout: "post"
title: "How to install redis server on CentOS 7 / RHEL 7"
categories: Redis
tags: [centos, ssr, redis]
---

See  [How to install redis server on CentOS 7 / RHEL 7](http://sharadchhetri.com/2014/10/04/install-redis-server-centos-7-rhel-7/)

In this tutorial we will learn, how to install redis server on CentOS 7 / RHEL 7 . The abbreviation of redis is REmote DIctionary Server. It is one the of the most popular open source,advanced key-value cache and store.

**Project URL :** http://redis.io/
<input type="hidden" name="IL_IN_ARTICLE" value="1" class="IL_IN_AUTO">

Follow the given below steps to install redis server on CentOS 7 and Red Hat Enterprise Linux 7.

### Install wget utility

Install wget command

<pre class="wp-code-highlight prettyprint prettyprinted">
yum install wget
</pre>

### Install EPEL repo

First we will install the EPEL repo. For more detail on EPEL repo, we suggest you to read our [this post](http://sharadchhetri.com/2014/01/03/install-epel-repo-centosscientific-linuxred-hat/ "this post").

Because our system has x86_64 Operating System architecture, we will use only epel repo package for x86_64 . Search epel repo package as per your Operating System architecture([EPEL URL](http://dl.fedoraproject.org/pub/epel "EPEL URL"))

<pre class="wp-code-highlight prettyprint prettyprinted">
wget -r --no-parent -A 'epel-release-*.rpm' http://dl.fedoraproject.org/pub/epel/7/x86_64/e/rpm -Uvh dl.fedoraproject.org/pub/epel/7/x86_64/e/epel-release-*.rpm
</pre>

It will create two epel’s repo file inside **/etc/yum.repos.d**  
These are –  
1. epel.repo  
2.epel-testing.repo

<pre class="wp-code-highlight prettyprint prettyprinted">
[root@localhost ~]# ls -l /etc/yum.repos.d/total 28-rw-r--r--. 1 root root 1612 Jul  4 07:00 CentOS-Base.repo-rw-r--r--. 1 root root  640 Jul  4 07:00 CentOS-Debuginfo.repo-rw-r--r--. 1 root root 1331 Jul  4 07:00 CentOS-Sources.repo-rw-r--r--. 1 root root  156 Jul  4 07:00 CentOS-Vault.repo-rw-r--r--. 1 root root  957 Sep  2 12:14 epel.repo-rw-r--r--. 1 root root 1056 Sep  2 12:14 epel-testing.repo[root@localhost ~]#
</pre>

### Install redis server

Now use yum command to install redis server

<pre class="wp-code-highlight prettyprint prettyprinted">
yum install redis
</pre>

**Two important redis server configuration file’s path**  
`1. /etc/redis.conf  
2. /etc/redis-sentinel.conf`

Now start the redis server after this.

<pre class="wp-code-highlight prettyprint prettyprinted">
systemctl start redis.service
</pre>

Check the running status of redis server

<pre class="wp-code-highlight prettyprint prettyprinted">
systemctl status redis.service
</pre>

To test the installation of Redis, use below given command

<pre class="wp-code-highlight prettyprint prettyprinted">
redis-cli ping
</pre>

If the response output is PONG, it means installation is completed successfully.

<pre class="wp-code-highlight prettyprint prettyprinted">
[root@localhost ~]# redis-cli ping
PONG[root@localhost ~]#
</pre>

### Start/Stop/Restart/Status and Enable redis server

To start redis server

<pre class="wp-code-highlight prettyprint prettyprinted">
systemctl start redis.service
</pre>

To stop redis server

<pre class="wp-code-highlight prettyprint prettyprinted">
systemctl stop redis.service
</pre>

To restart redis server

<pre class="wp-code-highlight prettyprint prettyprinted">
systemctl restart redis.service
</pre>

To get running status of redis server

<pre class="wp-code-highlight prettyprint prettyprinted">
systemctl status redis.service
</pre>

To enable redis server at system’s booting time.

<pre class="wp-code-highlight prettyprint prettyprinted">
systemctl enable redis.service
</pre>

To disable redis server at system’s booting time.

<pre class="wp-code-highlight prettyprint prettyprinted">
systemctl disable redis.service
</pre>

### Listening Port Of Redis Server

Redis Server listens by default at port number 6379. Use below given ss command. (To learn more about [ss command](http://sharadchhetri.com/2014/09/27/ss-command-alternate-netstat/ "ss command"))

<pre class="wp-code-highlight prettyprint prettyprinted">
[root@localhost ~]# ss -nlp|grep redis
tcp    LISTEN     0      128            127.0.0.1:6379                  \*:*      users:(("redis-server",19706,4))[root@localhost ~]#
</pre>

**Note:** On minimal installed CentOS 7/ RHEL 7,you wont get netstat command. Instead of netstat command, use [ss command](http://sharadchhetri.com/2014/09/27/ss-command-alternate-netstat/ "ss command") which is by default available on system.

**Learn Redis :** http://redis.io/documentation

**Who is using redis:** [Who is using Redis](http://redis.io/topics/whos-using-redis "Who is using redis")

## FAQ

### redis server predis permission denied: setsebool

Problem solved, type:

```
/usr/sbin/setsebool httpd_can_network_connect=1
```

By default, SELinux does not allow Apache to make socket connections. More information can be found [here](http://fedoraproject.org/wiki/SELinux/apache).

See [Troubleshooting "Permission denied" when attempting to connect to Redis from PHP script - Stack Overflow](http://stackoverflow.com/questions/8765848/troubleshooting-permission-denied-when-attempting-to-connect-to-redis-from-php)

See more details [redis server predis permission denied: setsebool](https://williamjxj.wordpress.com/2013/07/19/redis-server-predis-permission-denied-setsebool/)