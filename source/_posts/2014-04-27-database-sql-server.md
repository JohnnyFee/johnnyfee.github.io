layout: post
title: "Sql Server Database"
category: Database
tags: [database]
---

## 备份数据库

需要以sa的身份登录，否则无法备份数据库。

## 把远程数据库移植到数据库

1. 将自己的域用户加入到server的Administrations下，这样就可以在本地通过\\server\d$访问服务器的D盘。
1. 数据库连接到server，备份，然后把备份文件拷贝到本地。
1. 用sa登录，然后Restore Database

<!-- more -->

## Login Name、User、Role的关系

1. Login只能用于连接到server数据库服务器，不具备操作数据库的权限，这个一层的用户在最外层的Security/Logins建立。如果在这个目录下建立一个用户，可以登录到服务器，但是不能访问数据库。尽管在数据级别下已经建立了相应的用户，但是登陆级别和服务器级别没有建立关系，所以不具备访问数据库的权限。
1. 数据库级别下的User和Role的关系。为了实现项目的重构，通常需要将共有的Schema放在Role下，如项目中的EPS角色，它具有Membership、KaYou等每个项目都要用的Schema。它拥有N个个Role Members，分别对应着每个项目的用户。这样，每个项目的用户分别能看到自己拥有的Schema以及EPS角色的Schema，而看不到其他用户的Schema，这在以不同用户登陆时可见一斑。每个用户分别有一个属性Default Schema，在查询的时候，如果不输入Schema，则使用的就是这个默认的Schema。
1. Sa用户具有最高权限，可以看到所有的Schema。

## 连接数据库时常用的调试手段

### ping命令测试是否连接上了服务器

如果ping服务器后，能够解析到一个IP地址，则说明连接上DNS，有时候服务器可能安装了防火墙，导致能解析服务器名，但是连接建立不成功。

### telnet server 1433

其中1433是sqlserver服务器的端口，如果能连接上，说明与服务器已经建立了连接。
提示：对win7系统来说，安装telnet的方法为，控制面板程序程序和功能打开或关闭Windows服务，同样安装IIS的方法也是如此。