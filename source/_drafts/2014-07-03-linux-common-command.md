---
layout: post
title: "Linux Common Command"
category: Linux
tags: [linux, tutorial]
---

## common

### man

我们以一个简单的例子开始。man命令代表“manual”,手册的意思。如果你想了解任何Unix命令，你可以运行下面的命令： 

    mman  [command]

最简单的使用例子是用man来查看man命令自己的使用手册：

    man man

man命令本身未必是一个鲜为人知的命令，你能在任何Unix教程中看到它。然而，我想强调它在那些在常规教程中很少见的特殊用法。

如果你需要知道ASCII字符，试试这个：

    man ascii

### cd -

如果你在一个目录里面工作，突然切换到另外一个目录中去了，有一个方法让你轻松的回到刚才的工作目录。运行下面的命令即可回到刚刚的工作目录：

    cd -

### sudo !!

sudo 以管理员的权限运行命令，用户也被添加到 sudo用户组。

假设你运行一个没带 sudo 前缀的命令，如果你不想再次输入这个相同的命令，你可以运行下面的命令来运行最近一次运行的命令。

    sudo !!

### df

一个相对简单的命令，df 代表“disk free”，并显示你的磁盘空闲的空间。

![](http://www.admin10000.com/UploadFiles/Document/201407/02/20140702110450039539.PNG)

### pkill

pkill 也就是”process kill”,终止一个运行的进程。当一个应用没反应的时候，这个命令非常有用。语法：

    pkill [application_name]

pkiil的一个有趣的使用情况是你可以远程登录别人正在使用的计算机，检查别人在运行的应用，并执行 pkill命令来终止那些进程，而当他们在四周盼望是谁在恶作剧的时候，你装作没什么事发生一样。当然，你应该确认它不是关键应用，并且不会有很大的损失。

### ddate

[Discordian calendar](http://en.wikipedia.org/wiki/Discordian_calendar) 是一个备用日历，用 1YOLD表示1166BC。ddate 可以显示Discordian date。

![](http://www.admin10000.com/UploadFiles/Document/201407/02/20140702110450667472.PNG)

### cal

如果你想查看老的Gregorian日历，使用 cal即可查看当月月份的日历。

![](http://www.admin10000.com/UploadFiles/Document/201407/02/20140702110450220567.PNG)

这只是默认的显示，. [这个cal手册](http://unixhelp.ed.ac.uk/CGI/man###cgi?cal) 列出了不同的可选项参数，可以按不同的样式显示更多的月份。

### factor

如果你想分解一个数字，不需要其它的工作，仅运行下面的命令即可获得一个数字的质因数分解。

    factor [number]

![](http://www.admin10000.com/UploadFiles/Document/201407/02/20140702110450660551.PNG)

### <空格> 命令

你在终端上键入的每个命令都会记录到history，也能用history命令重新调用。

如何骗过history 命令呢？呵呵，你可以轻而易举地做到。在终端，只需要在键入命令之前输入一个或多个空格，这样你的命令就不会被记录了。

让我们体验一下吧，先在终端尝试五个常见的 Linux 命令并在命令之前留个空(例如** ls, pwd, uname, echo “hi”** 和 who)，然后检查这些命令是不是记录在历史中。

    avi@localhost:~$  ls
    avi@localhost:~$  pwd
    avi@localhost:~$  uname
    avi@localhost:~$  echo “hi”
    avi@localhost:~$  who
　　
现在运行 history 命令来查看上面已执行的命令是否已经被记录了.

    avi@localhost:~$ history
       40  cd /dev/ 
       41  ls 
       42  dd if=/dev/cdrom1 of=/home/avi/Desktop/squeeze.iso 
       43  ping www.google.com 
       44  su
　　
你看到没有最后执行的命令没有被记录。我们也可以用另一个命令cat | bash欺骗history，结果跟上面一样。

### `<alt>` + . 和 `<esc>` + .

上面的组合键事实上不是一个命令，而是传递最后一个命令参数到提示符后的快捷键，以输入命令的倒序方式传递命令。按住 Alt或Esc再按一下 “.”。

###  pv 命令

在电影里尤其是好莱坞电影你可能已经看见过模拟文本了，像是在实时输入文字，你可以用pv命令仿照任何类型模拟风的文本输出，包括流水线输出。pv可能没有在你的系统上安装，你需要用apt或yum获取安装包，然后安装pv到你的机器。

    root@localhost:# echo "Tecmint [dot] com is the world's best website for qualitative Linux article" | pv -qL 20

## text

### nl

“nl命令”添加文件的行数。一个叫做'one.txt'的文件，其每行的内容是（Fedora、Debian、Arch、Slack和Suse），给每行添加行号。首先使用cat命令显示“one.txt”的文件内容。

    # cat one.txt 

    fedora 
    debian 
    arch 
    slack 
    suse

现在运行“nl命令”，以添加行号的方式来显示。

    # nl one.txt 
     
    1 fedora 
    2 debian 
    3 arch 
    4 slack 
    5 suse

### jot

正如其名所示，jot的为generates some text,包括从数字到字符以及一些乱码。如果你想生成一定范围内的数字，可运行下面的命令：

    jot [number_of_numbers] [starting_number]

如果你只提供一个参数，它将会生成从1到这个数字之间的数字。

-r 参数可生成随机数，语法如下：

    jot -r [number_of_numbers] [lower_limit] [upper_limit]

![](http://www.admin10000.com/UploadFiles/Document/201407/02/20140702110450702855.PNG)

-b 参数可重复给定的单词。了解更多参数列表，你可以运行 man jot, 或者看这个[文档](http://docstore.mik.ua/orelly/unix/upt/ch45_11.htm)。

## util

### md5sum

“md5sum”就是计算和检验MD5信息签名。md5 checksum(通常叫做哈希)使用匹配或者验证文件的文件的完整性，因为文件可能因为传输错误，磁盘错误或者无恶意的干扰等原因而发生改变。

root@tecmint:~# md5sum teamviewer_linux.deb 
    47790ed345a7b7970fc1f2ac50c97002  teamviewer_linux.deb
　　
注意：用户可以使用官方提供的和md5sum生成签名信息匹对以此检测文件是否改变。Md5sum没有sha1sum安全，这点我们稍后讨论。

## disk

### lsblk

"lsblk"就是列出块设备。除了RAM外，以标准的树状输出格式，整齐地显示块设备。

    root@tecmint:~# lsblk
     
    NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
    sda      8:0    0 232.9G  0 disk 
    ├─sda1   8:1    0  46.6G  0 part /
    ├─sda2   8:2    0     1K  0 part 
    ├─sda5   8:5    0   190M  0 part /boot
    ├─sda6   8:6    0   3.7G  0 part [SWAP]
    ├─sda7   8:7    0  93.1G  0 part /data
    └─sda8   8:8    0  89.2G  0 part /personal
    sr0     11:0    1  1024M  0 rom

“lsblk -l”命令以列表格式显示块设备(而不是树状格式)。

    root@tecmint:~# lsblk -l
     
    NAME MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
    sda    8:0    0 232.9G  0 disk 
    sda1   8:1    0  46.6G  0 part /
    sda2   8:2    0     1K  0 part 
    sda5   8:5    0   190M  0 part /boot
    sda6   8:6    0   3.7G  0 part [SWAP]
    sda7   8:7    0  93.1G  0 part /data
    sda8   8:8    0  89.2G  0 part /personal
    sr0   11:0    1  1024M  0 rom

注意：lsblk是最有用和最简单的方式来了解新插入的USB设备的名字，特别是当你在终端上处理磁盘/块设备时。



## file

### ls

ls命令是列出目录内容(List Directory Contents)的意思。运行它就是列出文件夹里的内容，可能是文件也可能是文件夹。

    root@tecmint:~# ls
     
    Android-Games                     Music
    Pictures                          Public
    ...

“ls -l”命令已详情模式(long listing fashion)列出文件夹的内容。

    root@tecmint:~# ls -l
     
    total 40588
    drwxrwxr-x 2 ravisaive ravisaive     4096 May  8 01:06 Android Games
    drwxr-xr-x 2 ravisaive ravisaive     4096 May 15 10:50 Desktop
    drwxr-xr-x 2 ravisaive ravisaive     4096 May 16 16:45 Documents
    ...

"ls -a"命令会列出文件夹里的所有内容，包括以"."开头的隐藏文件。

注意：在Linux中，文件以“.”开头的就是隐藏文件，并且每个文件，文件夹，设备或者命令都是以文件对待。ls -l 命令输出：

1. d (代表了是目录).
2. rwxr-xr-x 是文件或者目录对所属用户，同一组用户和其它用户的权限。
3. 上面例子中第一个ravisaive 代表了文件文件属于用户ravisaive
4. 上面例子中的第二个ravisaive代表了文件文件属于用户组ravisaive
5. 4096 代表了文件大小为4096字节.
6. May 8 01:06 代表了文件最后一次修改的日期和时间.
7. 最后面的就是文件/文件夹的名字

更多"ls"例子请查看 [15 linux中ls命令实例](http://www.tecmint.com/15-basic-ls-command-examples-in-linux/)

### stat 命令

Linux中的stat命令用来显示文件或文件系统的状态信息。当用文件名作为参数时，stat将会展示文件的全部信息。状态信息包括文件 大小、块、权限、访问时间、修改时间、状态改变时间等。

    avi@localhost:~$ stat 34.odt 
      File: `34.odt'
      Size: 28822   Blocks: 64 IO Block: 4096   regular file 
    Device: 801h/2049d  Inode: 5030293 Links: 1 
    Access: (0644/-rw-r--r--)  Uid: ( 1000/ avi)   Gid: ( 1000/ avi) 
    Access: 2013-10-14 00:17:40.000000000 +0530 
    Modify: 2013-10-01 15:20:17.000000000 +0530 
    Change: 2013-10-01 15:20:17.000000000 +0530

### mount | colum -t

上面的命令用一个很不错的格式与规范列出了所有挂载文件系统。

## net

### mtr

mtr 是一个强大的网络诊断工具。它结合了 traceroute 和 ping 这两个命令的功能

    mtr [hostname]

mtr检测运行mtr这台机子与远程主机之间的网络连接，[这里有](https://library.linode.com/linux###tools/mtr)关于mtr的详细说明，列举了mtr的全部扩展命令。


如果mtr没在你的机子上安装，apt或者yum需要的包。

    $ sudo apt-get install mtr (On Debian based Systems)
    # yum install mtr (On Red Hat based Systems)

### ping -i 60 -a IP_address

我们都用ping命令检测服务器是否连通。我通常ping google，来检测我是否连接到了因特网。

当你等待或者持续盯着你的终端等待命令的回应或者等待服务器的连接时，有时是很气人的。

一旦服务器连通就有一个声音如何（译注：下面命令是等60秒PING一次）？

    $ ping -i 60 -a www.google.com 
     
        PING www.google.com (74.125.200.103) 56(84) bytes of data. 
        64 bytes from www.google.com (74.125.200.103): icmp_req=1 ttl=44 time=105 ms 
        64 bytes from 74.125.200.103: icmp_req=2 ttl=44 time=281 ms

注意，当你发现命令不会返回声音时。请确保你的系统不是静音的，声音已经在 **sound preferences(声音选项)** 中启用并确保勾选了 **Enable window and window sound**。

### expr

`expr` 不是那么鲜为人知的命令。这个命令在终端中计算简单的算数时非常有用。

    expr 2 + 3 
    5
     
    expr 6 – 3 
    3
     
    expr 12 / 3 
    4

    expr 2 \* 9 
    18

## Shortcut

### Ctrl+x+e命令

这个命令对于管理员和开发者非常有用。为了使每天的任务自动化，管理员需要通过输入**vi**、**vim**、**nano**等打开编辑器。

仅仅从命令行快速的敲击“Ctrl-x-e”，就可以在编辑器中开始工作了。

## Tutorial

### [Commandlinefu.cn](http://commandlinefu.cn/)

该站点由一群爱好者维护，致力于打造中文版的Commandlinefu.com，主要是翻译来自Commandlinefu.com站点的内容，更加方便中文用户。

该站点全部内容托管在[Github](https://github.com/tg123/commandlinefu.cn)上，官方也有[新浪微博账号](http://weibo.com/commandlinefu)。同时，也有一个命令行操作视频演示子站：[beta.commandlinefu.cn](http://beta.commandlinefu.cn/)。

### [Commandlinefu.com](http://www.commandlinefu.com/)

本站点汇聚了数以万计、由用户推荐的Shell命令，更新频率很高。每条Shell命令行的用法都有对应的解释。

同时，该站点会根据用户投票情况推出[每周最受欢迎的命令排行榜](http://www.commandlinefu.com/commands/browse/last###week/sort###by###votes)以及[长期最受欢迎的命令排行榜](http://www.commandlinefu.com/commands/browse/sort###by###votes)，供大家参考。

本站也提供了API和插件，供爱好者开发相关应用或将相关内容嵌入到到自己的博客和站点上。

### [Linux commands examples](http://linux-commands-examples.com/)：Linux命令示例站点

本站点不仅可以提供Linux命令的在线参考手册，还提供了与此命令相关的大量用例，使得命令学习更加具体。比较符合Linux用户习惯的是，支持使用通配符（.、*、？）进行命令搜索查询，很贴心。

### [Explainshell](http://explainshell.com/)：在线Linux命令查询工具

在搜索框里任意输入Linux命令，系统会将对命令进行解析，并调用Ubuntu在线manpage库中的解释文本进行显示。

## Reference

### [15 个鲜为人知的Unix命令](http://www.admin10000.com/document/4655.html)
### [5个Linux命令学习站点推荐](http://www.admin10000.com/document/3436.html)
### [11 个很少人知道但很有用的 Linux 命令](http://www.admin10000.com/document/3182.html)