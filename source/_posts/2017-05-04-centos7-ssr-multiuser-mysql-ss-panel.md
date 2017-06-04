ssp---
layout: "post"
title: "ShadowsocksR 多用户版安装教程"
categories: SSR
tags: [centos, ssr, ss-panel, ssr-multiuser]
---

```
PHP Version /PHP版本: PHP 7.0.18 (cli) (built: Apr 15 2017 07:09:11) ( NTS )
ss-panel version/ ss-panel版本: 3.4.5
System: CentOS Linux release 7.3.1611 (Core)
Nginx: nginx/1.10.2
```

## 安装 LAMP

[How to Install PHP 7, NGINX & MySQL 5.6 on CentOS/RHEL 7.1 & 6.7](http://blog.inching.org/PHP/2017-05-01-centos7-nginx-lamp.html)

## ss-panel

ss-panel 是 ssr mysql 多用户版本的前端管理。

### 安装

步骤：[orvice/ss-panel: Let's talk about cat](https://github.com/orvice/ss-panel)

Step0 之后，要 cd 到 `ss-panel/` 再执行 Step1。 

Step3 要先创建数据库

```sql
CREATE DATABASE sspanel;

CREATE USER sspanel@localhost IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON sspanel.* TO sspanel@localhost;

CREATE USER 'sspanel'@'%' IDENTIFIED BY  'password';
GRANT ALL PRIVILEGES ON *.* TO 'sspanel'@'%' WITH GRANT OPTION;
```

然后导入 `db.sql`:

```
$source db.sql;
```

也可以选择 phpMyAdmin 来操作。

Step4 的完整配置：

```
server {
        listen 80;
        server_name your_domain;
        root /var/www/ss-panel/public;

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

除了 try_files 之外，还要能够解析 php。

我是在 `etc/nginx/conf.d/sspanl.conf` 中添加上述内容的。可以实现在 80 端口下运行多个站点，nginx 会根据 `server_name` 来选择相应的 `server` 节点。

如果您是在 Google Cloud 上部署，仍可能碰到以下错误：

```
SmartyException: unable to write file /you/site/path/storage/framework/smarty/compile/wrtxxx
```

归根结底是权限的问题，可以不管你怎么折腾权限都无济于事。最终解决方案是将 `ss-panel` clone 到 `var/www/` 就好了，使用默认权限即可。关于这点，目前不知如何解释。

### 配置

[配置 - sspanel](https://sspanel.xyz/docs/intro/config) 

### FAQ

#### Permission Denied

如果在 CentOS 上出现关于 Permission Denied 之类的错误，可以尝试关闭 SELinux：

```
sudo setenforce 0
```

See [php - 'Failed to open stream: Permission denied' error - Laravel - Stack Overflow](http://stackoverflow.com/questions/23540083/failed-to-open-stream-permission-denied-error-laravel)

## shadowsocks-manyuser

### 安装

[Server Setup(manyuser with mysql) · breakwa11/shadowsocks-rss Wiki](https://github.com/breakwa11/shadowsocks-rss/wiki/Server-Setup\manyuser-with-mysql))

## Tutorial

- [ss-panel 部署教程-笨猫博客](https://www.nbmao.com/archives/2571)
- [Shadowsocks配合SS-panel 部署教程-李阳博客](https://blog.liyang.io/441.html)