---
layout: "post"
title: "Nginx server name"
categories: Nginx
tags: [nginx]
---

Nginx强大的正则表达式支持，可以使server_name的配置变得很灵活，如果你要做多用户博客，那么每个用户拥有自己的二级域名也就很容易实现了。  

下面我就来说说server_name的使用吧：  

## server_name的匹配顺序

nginx中的server_name指令主要用于配置基于名称虚拟主机，server_name指令在接到请求后的匹配顺序分别为：  

准确的server_name匹配，例如：  

```
server {  
    listen 80;  
    server_name ssdr.info www.ssdr.info;  
    ...  
}
``` 

以 `*` 通配符开始的字符串：  

```
server {  
listen 80;  
server_name *.ssdr.info;  
...  
}
```

以 `*` 通配符结束的字符串：  

`server {  
    listen 80;  
    server_name www.*;  
    ...  
}
```

匹配正则表达式：  

```
server {  
    listen 80;  
    server_name ~^(?
    <www>.+)\.howtocn\.org$;<br>...<br>}</www>
```

nginx将按照1,2,3,4的顺序对server name进行匹配，只有有一项匹配以后就会停止搜索，所以我们在使用这个指令的时候一定要分清楚它的匹配顺序（类似于location指令）。  
server_name指令一项很实用的功能便是可以在使用正则表达式的捕获功能，这样可以尽量精简配置文件，毕竟太长的配置文件日常维护也很不方便。下面是2个具体的应用：  

## 在一个server块中配置多个站点

```
server{  
    listen 80;  
    server_name ~^(www\.)?(.+)$;  
    index index.php index.html;  
    root /data/wwwsite/$2;  
}
```

站点的主目录应该类似于这样的结构：  

```
/data/wwwsite/ssdr.info  
/data/wwwsite/linuxtone.org  
/data/wwwsite/baidu.com  
/data/wwwsite/google.com
```

这样就可以只使用一个server块来完成多个站点的配置。

## 在一个server块中为一个站点配置多个二级域名

实际网站目录结构中我们通常会为站点的二级域名独立创建一个目录，同样我们可以使用正则的捕获来实现在一个server块中配置多个二级域名：  

```
server{  
    listen 80;  
    server_name ~^(.+)?\.howtocn\.org$;  
    index index.html;  
    if ($host = ssdr.info){  
    rewrite ^ http://www.ssdr.info permanent;  
    }  
    root /data/wwwsite/ssdr.info/$1/;  
}
```

站点的目录结构应该如下：  

```
/data/wwwsite/ssdr.info/www/  
/data/wwwsite/ssdr.info/nginx/
```

这样访问www.ssdr.info时root目录为/data/wwwsite/ssdr.info/www/，nginx.ssdr.info时为/data/wwwsite/ssdr.info/nginx/，以此类推。  
后面if语句的作用是将ssdr.info的方位重定向到www.ssdr.info，这样既解决了网站的主目录访问，又可以增加seo中对www.ssdr.info的域名权重。

## 多个正则表达式

如果你在server_name中用了正则，而下面的location字段又使用了正则匹配，这样将无法使用$1，$2这样的引用，解决方法是通过set指令将其赋值给一个命名的变量：  

```
server{
    listen 80;  
    server_name ~^(.+)?\.howtocn\.org$;  
    set $www_root $1;  
    root /data/wwwsite/ssdr.info/$www_root/;  
    location ~ .*\.php?$ {  
    fastcgi_pass 127.0.0.1:9000;  
    fastcgi_index index.php;  
    fastcgi_param SCRIPT_FILENAME /data/wwwsite/ssdr.info/$fastcgi_script_name;  
    include fastcgi_params;  
    }  
}
```

From [Nginx技巧：灵活的server_name - 美车匠 - 博客园](http://www.cnblogs.com/buffer/archive/2011/08/17/2143514.html)