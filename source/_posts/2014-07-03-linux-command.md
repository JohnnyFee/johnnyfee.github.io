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

<!--more-->

### history

“history”命令就是历史记录。它显示了在终端中所执行过的所有命令的历史。

    root@tecmint:~# history
     
    sudo add-apt-repository ppa:tualatrix/ppa
    sudo apt-get update
    sudo apt-get install ubuntu-tweak
    cd /usr/share/unity

注意：按住“CTRL + R”就可以搜索已经执行过的命令，它可以你写命令时自动补全。

    (reverse-i-search)`if': ifconfig

### sudo

“sudo”(super user do)命令允许授权用户执行超级用户或者其它用户的命令。通过在sudoers列表的安全策略来指定。

注意：sudo 允许用户借用超级用户的权限，然而"su"命令实际上是允许用户以超级用户登录。所以sudo比su更安全。
并不建议使用sudo或者su来处理日常用途，因为它可能导致严重的错误如果你意外的做错了事，这就是为什么在linux社区流行一句话：

“To err is human, but to really foul up everything, you need root password.”
“人非圣贤孰能无过，但是拥有root密码就真的万劫不复了。”

假设你运行一个没带 sudo 前缀的命令，如果你不想再次输入这个相同的命令，你可以运行下面的命令来运行最近一次运行的命令。

    sudo !!

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

## system

### service

‘service‘命令控制服务的启动、停止和重启，它让你能够不重启整个系统就可以让配置生效以开启、停止或者重启某个服务。

在Ubuntu上启动apache2 server：

    root@tecmint:~# service apache2 start
    httpd (pid 1285) already running                        [ OK ]
　　
重启apache2 server：

    root@tecmint:~# service apache2 restart

停止apache2 server：

    root@tecmint:~# service apache2 stop
 
注意：要想使用service命令，进程的脚本必须放在‘/etc/init.d‘，并且路径必须在指定的位置。

如果要运行“service apache2 start”实际上实在执行“service /etc/init.d/apache2 start”.

### alias

alias是一个系统自建的shell命令，允许你为名字比较长的或者经常使用的命令指定别名。

我经常用‘ls -l‘命令，它有五个字符（包括空格）。于是我为它创建了一个别名‘l'。

    root@tecmint:~# alias l='ls -l'

试试它是否能用：

    root@tecmint:~# l
     
    total 36 
    drwxr-xr-x 3 tecmint tecmint 4096 May 10 11:14 Binary 
    drwxr-xr-x 3 tecmint tecmint 4096 May 21 11:21 Desktop 
    drwxr-xr-x 2 tecmint tecmint 4096 May 21 15:23 Documents 
    ...

去掉’l'别名，要使用unalias命令：

    root@tecmint:~# unalias l

再试试：

    root@tecmint:~# l
 
    bash: l: command not found

开个玩笑，把一个重要命令的别名指定为另一个重要命令：

    alias cd='ls -l' (set alias of ls -l to cd)
    alias su='pwd' (set alias of pwd to su)
    ....
    (You can create your own)
    ....
　　
想想多么有趣，现在如果你的朋友敲入‘cd'命令，当他看到的是目录文件列表而不是改变目录；当他试图用’su‘命令时，他会进入当前目录。你可以随后去掉别名，向他解释以上情况。

### passwd

这是一个很重要的命令，在终端中用来改变自己密码很有用。显然的，因为安全的原因，你需要知道当前的密码。

    root@tecmint:~# passwd 
     
    Changing password for tecmint. 
    (current) UNIX password: ******** 
    Enter new UNIX password: ********
    Retype new UNIX password: ********
    Password unchanged   [这里表示密码未改变，例如：新密码=旧密码]
    Enter new UNIX password: #####
    Retype new UNIX password:#####

### apt

Debian系列以“apt”命令为基础，“apt”代表了Advanced Package Tool。APT是一个为Debian系列系统（Ubuntu，Kubuntu等等）开发的高级包管理器，在Gnu/Linux系统上，它会为包自动地，智能地搜索，安装，升级以及解决依赖。

```shell
root@tecmint:~# apt-get install mplayer

Reading package lists... Done
Building dependency tree       
Reading state information... Done
...
```

```shell
root@tecmint:~# apt-get update
 
Hit http://ppa.launchpad.net raring Release.gpg                                           
Hit http://ppa.launchpad.net raring Release.
```

注意：上面的命令会导致系统整体的改变，所以需要root密码（查看提示符为"#"，而不是“$”）.和yum命令相比，Apt更高级和智能。

见名知义，apt-cache用来搜索包中是否包含子包mplayer, apt-get用来安装，升级所有的已安装的包到最新版。

关于apt-get 和 apt-cache命令更多信息，请查看 [25 APT-GET和APT-CACHE命令](http://www.tecmint.com/useful-basic-commands-of-apt-get-and-apt-cache-for-package-management/)

### wget

Wget是用于非交互式（例如后台）下载文件的免费工具.支持HTTP, HTTPS, FTP协议和 HTTP 代理。

使用wget下载ffmpeg

    root@tecmint:~# wget http://downloads.sourceforge.net/project/ffmpeg-php/ffmpeg-php/0.6.0/ffmpeg-php-0.6.0.tbz2
    ...
    HTTP request sent, awaiting response... 200 OK

## datetime

### date

“data”命令使用标准的输出打印当前的日期和时间，也可以深入设置。

    root@tecmint:~# date
        Fri May 17 14:13:29 IST 2013
    
    root@tecmint:~# date --set='14 may 2013 13:57' 
        Mon May 13 13:57:00 IST 2013
　　注意：这个命令在脚本中十分有用，以及基于时间和日期的脚本更完美。而且在终端中改变日期和时间，让你更专业！！！（当然你需要root权限才能操作这个，因为它是系统整体改变）

### ddate

[Discordian calendar](http://en.wikipedia.org/wiki/Discordian_calendar) 是一个备用日历，用 1YOLD表示1166BC。ddate 可以显示Discordian date。

![](http://johnnyimages.qiniudn.com/20140702110450667472.PNG)

### cal

“cal”（Calender），它用来显示当前月份或者未来或者过去任何年份中的月份。

    root@tecmint:~# cal 
     
    May 2013        
    Su Mo Tu We Th Fr Sa  
              1  2  3  4  
     5  6  7  8  9 10 11  
    12 13 14 15 16 17 18  
    19 20 21 22 23 24 25  
    26 27 28 29 30 31
　　
显示已经过去的月份，1835年2月

    root@tecmint:~# cal 02 1835
     
       February 1835      
    Su Mo Tu We Th Fr Sa  
     1  2  3  4  5  6  7  
     8  9 10 11 12 13 14  
    15 16 17 18 19 20 21  
    22 23 24 25 26 27 28
　　
显示未来的月份，2145年7月。

    root@tecmint:~# cal 07 2145
     
         July 2145        
    Su Mo Tu We Th Fr Sa  
                 1  2  3  
     4  5  6  7  8  9 10  
    11 12 13 14 15 16 17  
    18 19 20 21 22 23 24  
    25 26 27 28 29 30 31
　　
注意： 你不需要往回调整日历50年，既不用复杂的数据计算你出生那天，也不用计算你的生日在哪天到来，[因为它的最小单位是月，而不是日]。

## process

### ps

ps命令给出正在运行的某个进程的状态，每个进程有特定的id成为PID。

    root@tecmint:~# ps
     
     PID TTY          TIME CMD
     4170 pts/1    00:00:00 bash
     9628 pts/1    00:00:00 ps
　　
使用‘-A‘选项可以列出所有的进程及其PID。

    root@tecmint:~# ps -A
     
     PID TTY          TIME CMD
        1 ?        00:00:01 init
        2 ?        00:00:00 kthreadd
        3 ?        00:00:01 ksoftirqd/0
        5 ?        00:00:00 kworker/0:0H
        7 ?        00:00:00 kworker/u:0H
        8 ?        00:00:00 migration/0
        9 ?        00:00:00 rcu_bh
    ....
　　
注意：当你要知道有哪些进程在运行或者需要知道想杀死的进程PID时ps命令很管用。你可以把它与‘grep‘合用来查询指定的输出结果，例如：

    root@tecmint:~# ps -A | grep -i ssh
     
     1500 ?        00:09:58 sshd
     4317 ?        00:00:00 sshd
　　
ps命令与grep命令用管道线分割可以得到我们想要的结果。

### kill

也许你从命令的名字已经猜出是做什么的了,kill是用来杀死已经无关紧要或者没有响应的进程.它是一个非常有用的命令,而不是非常非常有用.你可能很熟悉Windows下要杀死进程可能需要频繁重启机器因为一个在运行的进程大部分情况下不能够杀死,即使杀死了进程也需要重新启动操作系统才能生效.但在linux环境下,事情不是这样的.你可以杀死一个进程并且重启它而不是重启整个操作系统.

杀死一个进程需要知道进程的PID.

假设你想杀死已经没有响应的‘apache2'进程,运行如下命令:

    root@tecmint:~# ps -A | grep -i apache2
     
    1285 ?        00:00:00 apache2
　　
搜索‘apache2'进程,找到PID并杀掉它.例如:在本例中‘apache2'进程的PID是1285..

    root@tecmint:~# kill 1285 (to kill the process apache2)
　　
注意:每次你重新运行一个进程或者启动系统,每个进程都会生成一个新的PID.你可以使用ps命令获得当前运行进程的PID.

另一个杀死进程的方法是:

    root@tecmint:~# pkill apache2
　　
注意:kill需要PID作为参数,pkill可以选择应用的方式,比如指定进程的所有者等.

### pkill

pkill 也就是”process kill”,终止一个运行的进程。当一个应用没反应的时候，这个命令非常有用。语法：

    pkill [application_name]

pkiil的一个有趣的使用情况是你可以远程登录别人正在使用的计算机，检查别人在运行的应用，并执行 pkill命令来终止那些进程，而当他们在四周盼望是谁在恶作剧的时候，你装作没什么事发生一样。当然，你应该确认它不是关键应用，并且不会有很大的损失。

### whereis

whereis的作用是用来定位命令的二进制文件\资源\或者帮助页.举例来说,获得ls和kill命令的二进制文件/资源以及帮助页:

    root@tecmint:~# whereis ls 
    ls: /bin/ls /usr/share/man/man1/ls.1.gz
    root@tecmint:~# whereis kill
 
    kill: /bin/kill /usr/share/man/man2/kill.2.gz /usr/share/man/man1/kill.1.gz
　　
注意:当需要知道二进制文件保存位置时有用.

## text

### grep

　‘grep‘命令搜索指定文件中包含给定字符串或者单词的行。举例搜索‘/etc/passwd‘文件中的‘tecmint'

    root@tecmint:~# grep tecmint /etc/passwd 
     
    tecmint:x:1000:1000:Tecmint,,,:/home/tecmint:/bin/bash
    　　使用’-i'选项将忽略大小写。

    root@tecmint:~# grep -i TECMINT /etc/passwd 
     
    tecmint:x:1000:1000:Tecmint,,,:/home/tecmint:/bin/bash
　　
使用’-r'选项递归搜索所有自目录下包含字符串 “127.0.0.1“.的行。

    root@tecmint:~# grep -r "127.0.0.1" /etc/ 
     
    /etc/vlc/lua/http/.hosts:127.0.0.1
    /etc/speech-dispatcher/modules/ivona.conf:#IvonaServerHost "127.0.0.1"
    /etc/mysql/my.cnf:bind-address      = 127.0.0.1

**注意：您还可以使用以下选项：**

1. **-w** 搜索单词 (egrep -w ‘**word1**|**word2**‘ /path/to/file).
2. **-c** 用于统计满足要求的行 (i.e., total number of times the pattern matched) (grep -c ‘**word**‘ /path/to/file).
3. **–color** 彩色输出 (grep **–color** server /etc/passwd).


### cat

[13 Basic Cat Command Examples in Linux](http://www.tecmint.com/13-basic-cat-command-examples-in-linux/)

cat – 连接文件，并输出结果

cat 命令非常的简单，你从下面的例子可以看到。

    jfields$ cat order.out.log 
    8:22:19 111, 1, Patterns of Enterprise Architecture, Kindle edition, 39.99
    8:23:45 112, 1, Joy of Clojure, Hardcover, 29.99
    8:24:19 113, -1, Patterns of Enterprise Architecture, Kindle edition, 39.99

就像它的说明描述的，你可以用它来连接多个文件。

    jfields$ cat order.* 
    8:22:20 111, Order Complete
    8:23:50 112, Order sent to fulfillment
　　
如果你想看这些log文件的内容，你可以把它们连接起来并输出到标准输出上，就是上面的例子展示的。这很有用，但输出的内容可以更有逻辑些。

### sort

[> sort](http://linux.about.com/library/cmd/blcmdl1_sort.htm)>  – 文件里的文字按行排序

此时sort命令显然是你最佳的选择。

    jfields$ cat order.* | sort
    8:22:19 111, 1, Patterns of Enterprise Architecture, Kindle edition, 39.99
    8:22:20 111, Order Complete
    8:23:45 112, 1, Joy of Clojure, Hardcover, 29.99
    8:23:50 112, Order sent to fulfillment
    8:24:19 113, -1, Patterns of Enterprise Architecture, Kindle edition, 39.99
    8:24:20 113, Refund sent to processing

就像上面例子显示的，文件里的数据已经经过排序。对于一些小文件，你可以读取整个文件来处理它们，然而，真正的log文件通常有大量的内容，你不能不考虑这个情况。此时你应该考虑过滤出某些内容，把cat、sort后的内容通过[管道](http://en.wikipedia.org/wiki/Pipeline_%28Unix%29)传递给过滤工具。

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

### cut

[> cut](http://linux.about.com/od/commands/l/blcmdl1_cut.htm)>  – 删除文件中字符行上的某些区域

又要使用grep，我们用grep过滤出我们想要的行。有了我们想要的行信息，我们就可以把它们切成小段，删除不需要的部分数据。

    jfields$ cat order.* | sort | grep Patterns
    8:22:19 111, 1, Patterns of Enterprise Architecture, Kindle edition, 39.99
    8:24:19 113, -1, Patterns of Enterprise Architecture, Kindle edition, 39.99
     
    jfields$ cat order.* | sort | grep Patterns | cut -d"," -f2,5
     1, 39.99
     -1, 39.99

现在，我们把数据缩减为我们计算想要的形式，把这些数据粘贴到Excel里立刻就能得到结果了。

cut是用来消减信息、简化任务的，但对于输出内容，我们通常会有更复杂的形式。假设我们还需要知道订单的ID，这样可以用来关联相关的其他信息。我们用cut可以获得ID信息，但我们希望把ID放到行的最后，用单引号包上。

### jot

正如其名所示，jot的为generates some text,包括从数字到字符以及一些乱码。如果你想生成一定范围内的数字，可运行下面的命令：

    jot [number_of_numbers] [starting_number]

如果你只提供一个参数，它将会生成从1到这个数字之间的数字。

-r 参数可生成随机数，语法如下：

    jot -r [number_of_numbers] [lower_limit] [upper_limit]

![](http://www.admin10000.com/UploadFiles/Document/201407/02/20140702110450702855.PNG)

-b 参数可重复给定的单词。了解更多参数列表，你可以运行 man jot, 或者看这个[文档](http://docstore.mik.ua/orelly/unix/upt/ch45_11.htm)。

###  pv 命令

在电影里尤其是好莱坞电影你可能已经看见过模拟文本了，像是在实时输入文字，你可以用pv命令仿照任何类型模拟风的文本输出，包括流水线输出。pv可能没有在你的系统上安装，你需要用apt或yum获取安装包，然后安装pv到你的机器。

    root@localhost:# echo "Tecmint [dot] com is the world's best website for qualitative Linux article" | pv -qL 20

### echo

echo  的功能正如其名，就是基于标准输出打印一段文本。它和shell无关，shell也不读取通过echo命令打印出的内容。然而在一种交互式脚本中，echo通过终端将信息传递给用户。它是在脚本语言，交互式脚本语言中经常用到的命令。

    root@tecmint:~# echo "Tecmint.com is a very good website" 
     
    Tecmint.com is a very good website
　　
创建一小段交互式脚本

1. 在桌面上新建一个文件，命名为 ‘interactive_shell.sh‘  (记住必须带 ‘.sh‘扩展名)。

2. 复制粘贴如下脚本代码，确保和下面的一致。

        #!/bin/bash 
        echo "Please enter your name:"
           read name 
           echo "Welcome to Linux $name"
        
        接下来，设置执行权限并运行脚本。

        root@tecmint:~# chmod 777 interactive_shell.sh
        root@tecmint:~# ./interactive_shell.sh
 
        Please enter your name:
        Ravi Saive
        Welcome to Linux Ravi Saive

注意: ‘#!/bin/bash‘ 告诉shell这是一个脚本，并且在脚本首行写上这句话是个好习惯。. ‘read‘ 读取给定的输出.

## util

### factor

如果你想分解一个数字，不需要其它的工作，仅运行下面的命令即可获得一个数字的质因数分解。

    factor [number]

![](http://www.admin10000.com/UploadFiles/Document/201407/02/20140702110450660551.PNG)

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

### dd

“dd”命令代表了转换和复制文件。可以用来转换和复制文件，大多数时间是用来复制iso文件(或任何其它文件)到一个usb设备(或任何其它地方)中去，所以可以用来制作USB启动器。

    root@tecmint:~# dd if=/home/user/Downloads/debian.iso of=/dev/sdb1 bs=512M; sync

注意：在上面的例子中，usb设备就是sdb1（你应该使用lsblk命令验证它，否则你会重写你的磁盘或者系统），请慎重使用磁盘的名，切忌。

dd 命令在执行中会根据文件的大小和类型 以及 usb设备的读写速度，消耗几秒到几分钟不等。

### mount

mount 是一个很重要的命令，用来挂载不能自动挂载的文件系统。你需要root权限挂载设备。

在插入你的文件系统后，首先运行"lsblk"命令，识别出你的设备，然后把分配的设备名记下来。

    root@tecmint:~# lsblk 
     
    NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT 
    sda      8:0    0 931.5G  0 disk 
    ├─sda1   8:1    0 923.6G  0 part / 
    ├─sda2   8:2    0     1K  0 part 
    └─sda5   8:5    0   7.9G  0 part [SWAP] 
    sr0     11:0    1  1024M  0 rom  
    sdb      8:16   1   3.7G  0 disk 
    └─sdb1   8:17   1   3.7G  0 part
　　
从这个输出上来看，很明显我插入的是4GB的U盘，因而“sdb1”就是要挂载上来的文件系统。以root用户操作，然后切换到/dev目录，它是所有文件系统挂载的地方。

    root@tecmint:~# su
    Password:
    root@tecmint:~# cd /dev
　　
创建一个任何名字的目录，但是最好和引用相关。

    root@tecmint:~# mkdir usb
　　
现在将“sdb1”文件系统挂载到“usb”目录.

    root@tecmint:~# mount /dev/sdb1 /dev/usb
　　
现在你就可以从终端进入到/dev/usb或者通过X窗口系统从挂载目录访问文件。

列出了所有挂载文件系统：

    mount | colum -t

### df

报告系统的磁盘使用情况。在跟踪磁盘使用情况方面对于普通用户和系统管理员都很有用。 ‘df‘ 通过检查目录大小工作，但这一数值仅当文件关闭时才得到更新。

    root@tecmint:~# df
     
    Filesystem     1K-blocks    Used Available Use% Mounted on
    /dev/sda1       47929224 7811908  37675948  18% /
    none                   4       0         4   0% /sys/fs/cgroup
    udev             1005916       4   1005912   1% /dev
    tmpfs             202824     816    202008   1% /run

‘**df**’命令的更多例子请参阅 [12 df Command Examples in Linux](http://www.tecmint.com/how-to-check-disk-space-in-linux/).

### du

估计文件的空间占用。 逐层统计文件（例如以递归方式）并输出摘要。

    root@tecmint:~# du
     
    8       ./Daily Pics/wp-polls/images/default_gradient
    8       ./Daily Pics/wp-polls/images/default
    32      ./Daily Pics/wp-polls/images
    8       ./Daily Pics/wp-polls/tinymce/plugins/polls/langs
    ...

**注意**: ‘**df**‘ 只显示文件系统的使用统计，但‘**du**‘统计目录内容。‘**du**‘命令的更详细信息请参阅[10 du (Disk Usage) Commands](http://www.tecmint.com/check-linux-disk-usage-of-files-and-directories/).

## device

### uname

"uname"命令就是Unix Name的简写。显示机器名，操作系统和内核的详细信息。

    root@tecmint:~# uname -a
     
    Linux tecmint 3.8.0-19-generic #30-Ubuntu SMP Wed May 1 16:36:13 UTC 2013 i686 i686 i686 GNU/Linux

注意： uname显示内核类别， uname -a显示详细信息。上面的输出详细说明了uname -a

- “Linux“: 机器的内核名
- “tecmint“: 机器的分支名
- “3.8.0-19-generic“: 内核发布版本
- “#30-Ubuntu SMP“: 内核版本
- “i686“: 处理器架构
- “GNU/Linux“: 操作系统名

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

### cp

“copy”就是复制。它会从一个地方复制一个文件到另外一个地方。

    root@tecmint:~# cp /home/user/Downloads abc.tar.gz /home/user/Desktop (Return 0 when sucess)
　　
注意： cp，在shell脚本中是最常用的一个命令，而且它可以使用通配符（在前面一块中有所描述），来定制所需的文件的复制。

### rm

rm' 标准移除命令。 rm 可以用来删除文件和目录。

删除目录

    root@tecmint:~# rm PassportApplicationForm_Main_English_V1.0
 
    rm: cannot remove `PassportApplicationForm_Main_English_V1.0': Is a directory

'rm' 不能直接删除目录,需要加上相应的'-rf'参数才可以。

    root@tecmint:~# rm -rf PassportApplicationForm_Main_English_V1.0
　　
警告: "rm -rf" 命令是一个破坏性的命令, 一旦你使用'rm -rf' 删除一个目录,在目录中所有的文件包括目录本身会被永久的删除,所以使用这个命令要非常小心。

### mv

“mv”命令将一个地方的文件移动到另外一个地方去。

    root@tecmint:~# mv /home/user/Downloads abc.tar.gz /home/user/Desktop (Return 0 when sucess)
　　
注意：mv 命令可以使用通配符。mv需谨慎使用，因为易懂系统的或者未授权的文件不但会导致安全性问题，而且可能系统崩溃。

### pwd

“pwd”（print working directory），在终端中显示当前工作目录的全路径。

    root@tecmint:~# pwd 
        /home/user/Desktop
　　
注意： 这个命令并不会在脚本中经常使用，但是对于新手，当从连接到nux很久后在终端中迷失了路径，这绝对是救命稻草。

### cd

最后，经常使用的“cd”命令代表了改变目录。它在终端中改变工作目录来执行，复制，移动，读，写等等操作。

    root@tecmint:~# cd /home/user/Desktop
    server@localhost:~$ pwd
 
    /home/user/Desktop

注意： 在终端中切换目录时，cd就大显身手了。“cd ～”会改变工作目录为用户的家目录，而且当用户发现自己在终端中迷失了路径时，非常有用。“cd ..”从当前工作目录切换到(当前工作目录的)父目录。

如果你在一个目录里面工作，突然切换到另外一个目录中去了，有一个方法让你轻松的回到刚才的工作目录。运行下面的命令即可回到刚刚的工作目录：

    cd -

### mkdir

“mkdir”(Make directory)命令在命名路径下创建新的目录。然而如果目录已经存在了，那么它就会返回一个错误信息"不能创建文件夹，文件夹已经存在了"("cannot create folder, folder already exists")

    root@tecmint:~# mkdir tecmint
　　
注意：目录只能在用户拥有写权限的目录下才能创建。mkdir：不能创建目录`tecmint`，因为文件已经存在了。（上面的输出中不要被文件迷惑了，你应该记住我开头所说的-在linux中，文件，文件夹，驱动，命令，脚本都视为文件）

### stat

Linux中的stat命令用来显示文件或文件系统的状态信息。当用文件名作为参数时，stat将会展示文件的全部信息。状态信息包括文件 大小、块、权限、访问时间、修改时间、状态改变时间等。

    avi@localhost:~$ stat 34.odt 
      File: `34.odt'
      Size: 28822   Blocks: 64 IO Block: 4096   regular file 
    Device: 801h/2049d  Inode: 5030293 Links: 1 
    Access: (0644/-rw-r--r--)  Uid: ( 1000/ avi)   Gid: ( 1000/ avi) 
    Access: 2013-10-14 00:17:40.000000000 +0530 
    Modify: 2013-10-01 15:20:17.000000000 +0530 
    Change: 2013-10-01 15:20:17.000000000 +0530

### find

搜索指定目录下的文件，从开始于父目录，然后搜索子目录。


    root@tecmint:~# find -name *.sh 
     
    ./Desktop/load.sh 
    ./Desktop/test.sh 
    ./Desktop/shutdown.sh 
    ./Binary/firefox/run-mozilla.sh 

注意： `-name‘选项是搜索大小写敏感。可以使用`-iname‘选项，这样在搜索中可以忽略大小写。（*是通配符，可以搜索所有的文件；‘.sh‘你可以使用文件名或者文件名的一部分来制定输出结果）

    root@tecmint:~# find -iname *.SH ( find -iname *.Sh /  find -iname *.sH)
     
    ./Desktop/load.sh 
    ./Desktop/test.sh 
    ./Desktop/shutdown.sh 

    root@tecmint:~# find -name *.tar.gz 
     
    /var/www/modules/update/tests/aaa_update_test.tar.gz 
    ./var/cache/flashplugin-nonfree/install_flash_player_11_linux.i386.tar.gz 

注意：以上命令查找根目录下和所有文件夹以及加载的设备的子目录下的所有包含‘tar.gz'的文件。

’find'命令的更详细信息请参考[35 Find Command Examples in Linux](http://www.tecmint.com/35-practical-examples-of-linux-find-command/)

### less

[> less](http://linux.about.com/library/cmd/blcmdl1_less.htm)>  – 在文件里向前或向后移动

让我们再回到简单的 cat | sort 例子中来，下面的命令就是将经过合并、排序后的内容输出到less命令里。在 less 命令，使用“/”来执行向前搜索，使用“？”命令执行向后搜索。搜索条件是一个正则表达式。

    jfields$ cat order* | sort | less

如果你在 less 命令里使用 /113.*，所有113订单的信息都会高亮。你也可以试试?.*112，所有跟订单112相关的时间戳都会高亮。最后你可以用 ‘q’ 来退出less命令。

linux里有很丰富的各种命令，有些是很难用的。然而，学会了前面说的这8个命令，你已经能处理大量的log分析任务了，完全不需要用脚本语言写程序来处理它们。

### tar

[18 Tar Command Examples in Linux](http://www.tecmint.com/18-tar-command-examples-in-linux/)

### touch

“touch”命令代表了将文件的访问和修改时间更新为当前时间。touch命令只会在文件不存在的时候才会创建它。如果文件已经存在了，它会更新时间戳，但是并不会改变文件的内容。

    root@tecmint:~# touch tecmintfile

注意：touch 可以用来在用户拥有写权限的目录下创建不存在的文件。

### chmod

“chmod”命令就是改变文件的模式位。chmod会根据要求的模式来改变每个所给的文件，文件夹，脚本等等的文件模式（权限）。
　　
在文件(文件夹或者其它，为了简单起见，我们就使用文件)中存在3中类型的权限

    Read (r)=4
    Write(w)=2
    Execute(x)=1
　　
所以如果你想给文件只读权限，就设置为'4';只写权限，设置权限为'2';只执行权限，设置为1; 读写权限，就是4+2 = 6, 以此类推。

现在需要设置3种用户和用户组权限。第一个是拥有者，然后是用户所在的组，最后是其它用户。

    rwxr-x--x   abc.sh

这里root的权限是 rwx（读写和执行权限），

所属用户组权限是 r-x (只有读写权限, 没有写权限)，

对于其它用户权限是 -x(只有只执行权限)

为了改变它的权限，为拥有者，用户所在组和其它用户提供读，写，执行权限。

    root@tecmint:~# chmod 777 abc.sh
    　　三种都只有读写权限

    root@tecmint:~# chmod 666 abc.sh
　　
拥有者用户有读写和执行权限，用户所在的组和其它用户只有可执行权限

    root@tecmint:~# chmod 711 abc.sh

注意：对于系统管理员和用户来说，这个命令是最有用的命令之一了。在多用户环境或者服务器上，对于某个用户，如果设置了文件不可访问，那么这个命令就可以解决，如果设置了错误的权限，那么也就提供了为授权的访问。

### cmp

比较两个任意类型的文件并将结果输出至标准输出。如果两个文件相同， ‘cmp‘默认返回0；如果不同，将显示不同的字节数和第一处不同的位置。

以下面两个文件为例：

file1.txt

    root@tecmint:~# cat file1.txt
     
    Hi My name is Tecmint

file2.txt

    root@tecmint:~# cat file2.txt
     
    Hi My name is tecmint [dot] com
　　
比较一下这两个文件，看看命令的输出。

    root@tecmint:~# cmp file1.txt file2.txt 
     
    file1.txt file2.txt differ: byte 15, line 1

### chown

“chown”命令就是改变文件拥有者和所在用户组。每个文件都属于一个用户组和一个用户。在你的目录下，使用"ls -l",你就会看到像这样的东西。

    root@tecmint:~# ls -l 
     
    drwxr-xr-x 3 server root 4096 May 10 11:14 Binary 
    drwxr-xr-x 2 server server 4096 May 13 09:42 Desktop

在这里，目录Binary属于用户"server",和用户组"root",而目录"Desktop"属于用户“server”和用户组"server"

“chown”命令用来改变文件的所有权，所以仅仅用来管理和提供文件的用户和用户组授权。

    root@tecmint:~# chown server:server Binary
     
    drwxr-xr-x 3 server server 4096 May 10 11:14 Binary 
    drwxr-xr-x 2 server server 4096 May 13 09:42 Desktop

注意：“chown”所给的文件改变用户和组的所有权到新的拥有者或者已经存在的用户或者用户组。

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

## program

### gcc

gcc 是Linux环境下C语言的内建编译器。下面是一个简单的C程序，在桌面上保存为Hello.c （记住必须要有‘.c‘扩展名）。

#include <stdio.h>

    int main()
    {
      printf("Hello world\n");
      return 0;
    }
　　
编译

    root@tecmint:~# gcc Hello.c
　　
运行

    root@tecmint:~# ./a.out 
     
    Hello world
　　
注意: 编译C程序时，输出会自动保存到一个名为“a.out”的新文件，因此每次编译C程序 “a.out”都会被修改。 因此编译期间最好定义输出文件名.，这样就不会有覆盖输出文件的风险了。

用这种方法编译

    root@tecmint:~# gcc -o Hello Hello.c
　　
这里‘-o‘将输出写到‘Hello‘文件而不是 ‘a.out‘。再运行一次。

    root@tecmint:~# ./Hello 
    Hello world

### g++

g++是C++的内建编译器。下面是一个简单的C++程序，在桌面上保存为Add.cpp （记住必须要有‘.cpp‘扩展名）。

    #include <iostream>
     
    using namespace std;
     
    int main() 
        {
              int a;
              int b;
              cout<<"Enter first number:\n";
              cin >> a;
              cout <<"Enter the second number:\n";
              cin>> b;
              cin.ignore();
              int result = a + b;
              cout<<"Result is"<<"  "<<result<<endl;
              cin.get();
              return 0;
         }
　　
编译

root@tecmint:~# g++ Add.cpp
　　
运行


    root@tecmint:~# ./a.out
     
    Enter first number: 
    ...
    ...
　　
注意:编译C++程序时，输出会自动保存到一个名为“a.out”的新文件，因此每次编译C++程序 “a.out”都会被修改。 因此编译期间最好定义输出文件名.，这样就不会有覆盖输出文件的风险了。

用这种方法编译

    root@tecmint:~# g++ -o Add Add.cpp
　　
运行

    root@tecmint:~# ./Add 
     
    Enter first number: 
    ...
    ...

### java

Java 是世界上使用最广泛的编程语言之一. 它也被认为是高效, 安全和可靠的编程语言. 现在大多数基于网络的服务都使用Java实现. 

　　拷贝以下代码到一个文件就可以创建一个简单的Java程序. 不妨把文件命名为tecmint.java (记住: '.java'扩展名是必需的).

    class tecmint {
      public static void main(String[] arguments) {
        System.out.println("Tecmint ");
      }
    }
　　
用javac编译tecmint.java

    root@tecmint:~# javac tecmint.java
　　
运行

    root@tecmint:~# java tecmint
　　
注意: 几乎所有的Linux发行版都带有gcc编译器, 大多数发行版都内建了g++ 和 java 编译器, 有些也可能没有. 你可以用apt 或 yum 安装需要的包.

## Shortcut

### Ctrl+x+e命令

这个命令对于管理员和开发者非常有用。为了使每天的任务自动化，管理员需要通过输入**vi**、**vim**、**nano**等打开编辑器。

仅仅从命令行快速的敲击“Ctrl-x-e”，就可以在编辑器中开始工作了。

## Tutorial

- [Commandlinefu.cn](http://commandlinefu.cn/)

该站点由一群爱好者维护，致力于打造中文版的Commandlinefu.com，主要是翻译来自Commandlinefu.com站点的内容，更加方便中文用户。

该站点全部内容托管在[Github](https://github.com/tg123/commandlinefu.cn)上，官方也有[新浪微博账号](http://weibo.com/commandlinefu)。同时，也有一个命令行操作视频演示子站：[beta.commandlinefu.cn](http://beta.commandlinefu.cn/)。

- [Commandlinefu.com](http://www.commandlinefu.com/)

本站点汇聚了数以万计、由用户推荐的Shell命令，更新频率很高。每条Shell命令行的用法都有对应的解释。

同时，该站点会根据用户投票情况推出[每周最受欢迎的命令排行榜](http://www.commandlinefu.com/commands/browse/last###week/sort###by###votes)以及[长期最受欢迎的命令排行榜](http://www.commandlinefu.com/commands/browse/sort###by###votes)，供大家参考。

本站也提供了API和插件，供爱好者开发相关应用或将相关内容嵌入到到自己的博客和站点上。

- [Linux commands examples](http://linux-commands-examples.com/)：Linux命令示例站点

本站点不仅可以提供Linux命令的在线参考手册，还提供了与此命令相关的大量用例，使得命令学习更加具体。比较符合Linux用户习惯的是，支持使用通配符（.、*、？）进行命令搜索查询，很贴心。

- [Explainshell](http://explainshell.com/)：在线Linux命令查询工具

在搜索框里任意输入Linux命令，系统会将对命令进行解析，并调用Ubuntu在线manpage库中的解释文本进行显示。

## Reference

- [20 Advanced Commands for Middle Level Linux Users](http://www.tecmint.com/20-advanced-commands-for-middle-level-linux-users/)
