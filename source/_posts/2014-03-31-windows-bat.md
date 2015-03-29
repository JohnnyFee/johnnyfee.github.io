layout: post
title: "Windows Bat"
category: OS
tags: [ps]
---
## 概述

1、.bat: 这是微软的第一个批处理文件的后缀名，在几乎所有的Windows 操作系统内都能运行。
2、 .cmd: 是为Windows NT 设计的命令行脚本， 为Cmd.exe shell而设计的， 对于COMMAND.COM不具有向后兼容性。
3、目前所知道的.cmd 和 .bat文件的区别是对ERRORLEVEL变量的改变：当Command Extensions （命令行扩展）处于enabled状态时，哪怕是.cmd文件中一个成功执行的命令都可以改变ERRORLEVEL的值，而在.bat 文件中ERRORLEVEL 变量只有在遇到错误的时候才发生改变。

## call

从一个批处理文件调用另一个批处理文件使用`call`命令。call 命令接受用作调用目标的标签。如果在脚本或批处理文件外使用 Call，它将不会在命令行起作用。 

不要在 call 命令中使用管道和重定向符号。 

如果启用命令扩展（即默认情况下），call 将接受 label 参数作为调用目标。正确语法如下： 

    call :label arguments 

有关启用和禁用命令扩展的详细信息，请参阅“”中的 cmd。

<!--more-->

### 语法 

    call [[Drive:][Path] FileName [BatchParameters]] [:label [arguments]] 

参数 
    
    [Drive:}[Path] FileName  

指定要调用的批处理程序的位置和名称。filename 参数必须具有 .bat 或 .cmd 扩展名。


- BatchParameters  
指定批处理程序所需的任何命令行信息，包括命令行选项、文件名、批处理参数（从 %0 到 %9）或变量（例如，%baud%）。  

- `:label`
指定批处理程序要跳转到的标签。使用带有该参数的 call 命令可以创建新的批处理文件上下文，并将控制权交给指定标签后的语句。当首次遇到该批处理文件的末尾时（在跳转到标签后），控制权将交还给 CALL 语句后的语句。第二次遇到批处理文件的末尾，批脚本将被退出。对于可允许您从批处理脚本返回的 goto :eof 命令扩展，要了解关于它的说明，请参阅“”。  

- `arguments`
对于以 :label 打头的批处理程序，指定要传送给其新实例的命令行信息，包括命令行选项、文件名、批处理参数（从 %1 到 %9）或者变量（比如 %baud%）。

### 范例 
要从其他批处理程序运行 Checknew.bat 程序，请在父批处理程序中键入以下命令：  

    call checknew  

如果父批处理程序接受两个批处理参数并且希望它将这些参数传递给 Checknew.bat，则可以在父批处理程序中使用以下命令：  

    call checknew %1 %2    

## echo

1. “echo” 用来在控制台上显示信息。
2. “echo.” 用来显示一空行。（注意：echo和右下角的点之间没有空格，如果有空格就变成显示句点了。）
3. “echo off”: 在使用了这行命令之后，其他命令都只显示命令的结果，而不显示命令本身。
4. “echo on”: 这是默认值，表示显示所有的命令结果和命令行本身。
5. “echo”: 当执行echo而不带任何参数的时候，会显示echo的打开或关闭的状态：“ECHO is on” 或者 “ECHO is off”。
6. “@”:@ 符号表示不显示本行的命令本身。如果只用echo off，虽然echo off后面的命令不显示出来，只显示命令的结果，但是echo off它自己确被显示出来了，这就是使用@echo off的原因。

## 变量
### SETLOCAL/ENDLOCAL

SETLOCAL用来控制批处理文件中变量的可见性。就是高级语言常说的局部变量。凡是在SETLOCAL和ENDLOCAL之间的变量都是局部的，以免被其他脚本文件改变变量的值，而没有使用这个标示的都是Global visible（全局变量），很可能被其他文件所改变。下面的例子很好的说明了这一点。

    @echo off
    setlocal
    set version=1.0
    echo the first version is %version%
    endlocal
    echo the second version is %version%
    ::The follow is global variable
    set version=2.0
    echo the third version is %version%

Output:

    the first version is 1.0
    the second version is
    the third version is 2.0
    第二个version是全局变量，但是没有定义，所以是空值。再次执行：
    the first version is 1.0
    the second version is 2.0
    the third version is 2.0

### 延迟环境变量扩展

申明 BAT 的变量，如%name%。在解析命令时，CMD 会找到变量名对应的值,用变量名的值替换掉这个变量名字(name)，如果变量名不存在值,就返回空值。再将这个替换好并且匹配的命令执行。这个替换值的过程,就叫做 _变量扩展_。

例如：

    set var=test
    echo %var%

变量替换后的变为：

    echo test

在 BAT 中，`IF`, `FOR` 这样的命令都可以加括号，将一些命令嵌套在里面执行。这样的话对于一条可以加扩号嵌其他命令的命令,他的完整格式就是 

    for %%i in (....)

如果我们在括号里面嵌入一些设置变量值的命令,就会出现问题了!

看例子

    @echo off 
    for /l %%i in (1,1,5) do ( 
            set var=%%i 
            echo %var% 
    )

执行后会显示5个空行的错误提示! 因为在 CMD 解析的时候，找不到 `%var%` 变量定义。如果改成：

    @echo off 
    set var=test 
    for /l %%i in (1,1,5) do ( 
            set var=%%i 
            echo %var% 
    )

则输出 5  次 test。

为了解决这个问题，我们是需要引入 _延迟环境变量扩展_ 的概念。使用以下方法启用 延迟环境变量扩展：

    setloacl ENABLEDELAYEDEXPANSION

例：

    @echo off 
    setlocal ENABLEDELAYEDEXPANSION 
    set var=test 
    for /l %%i in (1,1,5) do ( 
            set var=%%i 
            echo !var! 
    )

这样输出就正常了。

另外，

    @echo off 
    set var=test & echo %test% 
    pause

set 命令和 echo 命令放在一行，如果不启用"延迟环境变量扩展"，也会出现赋值错误。

### path

- `%cd%` 或者  `!cd!` 获取当前运行命令所在的目录路径。
- `%~dp0` 获取命令文件所在的目录路径。

如：

D:\test\test.bat:

    @echo off
    echo Path "cd": %cd%
    @echo off
    echo Path "dp0": %~dp0

在 C:\Users\Johnny 下运行该 bat 文件，输出为：

    Path "cd": C:\Users\Johnny
    Path "dp0": d:\test\

## set

1. SET 不带任何参数: 将显示当前用户的所有系统环境变量。(set)
2. SET 带一个变量名: 尝试搜索并显示以这个变量名开头的环境变量。（set PROCESSOR就会显示以PROCESSOR开始的变量）
3. SET variable=string: 给一个变量赋值。
4. SET "": 使用一对空的双引号，会显示一个不带参数的情况下没显示出来的变量。我这里就显示下面两个奇怪的变量。
    
    =C:=C:\Users\Lingli
    =E:=E:\Powershell
    
    使用cd %=C:%还真可以转到C:\Users\Lingli目录下。

5. SET “var=”(or SET var=): 删除一个变量。
6. SET /A variable=expression: 使用算数运算符来给变量赋值。

    运算符|描述
    -----------------|--------------
    ()               |    组合
    ! ~ -            |    一元操作符
    * / %            |    算数运算符
    + -              |   算数运算符
    << >>            |    逻辑偏移
    &                |    位与
    ^                |    位异或
    |                |    位或
    = *= /= %= += -= |    赋值
     &= ^= |= <<= >>=|   

7. SET /P variable=[提示字符]:提示用户输入并把输入的值赋给variable。提示字符可以为空。有时可以使用CHOICE来代替SET /P.

        @echo off
        setlocal
        set /p version=Please enter the QQ version:
        echo you will install QQ %version%
        endlocal

8. 有用的环境变量。

        %CD% - 当前路径名。
        %DATE% - 当前日期。
        %TIME% - 当前时间。
        %RANDOM% - 显示0 到32767之间的一个随机数。你看CMD也是可以获取随机数的。

## 逻辑控制

### choice

    CHOICE [/C choices] [/N] [/CS] [/T timeout /D choice] [/M text]
 
该命令可以提供用户一个选择列表，并使用ERRORLEVEL参数返回用户选择项的序号。第一项对于1，第二项对应 2，依次类推，如果用户按CTRL+C退出而不选择，就返回0。

如：

    @echo off
    SETLOCAL
    CHOICE /C ABC /M "选择登陆用户：A - 管理员；B 域用户；C注册用户"
    IF %errorlevel%==1 goto :Admin
    IF %errorlevel%==2 goto :Domain
    IF %errorlevel%==3 goto :Local
    goto Exit
     
    :Admin
        echo 欢迎管理员
        goto Exit
     
    :Domain
        echo 欢迎域用户
        goto Exit
     
    :Local
        echo 欢迎注册用户
        goto Exit
     
    :Exit
    endlocal

### if

    IF EXIST filename (del filename) ELSE ( echo The file was not found.)

### for

    @echo off
    setlocal
    for %%G in (*.bat *.txt) do echo %%G
    endlocal

### goto

指定跳转到标签，找到标签后，程序将处理从下一行开始的命令。

语法：

    goto label （label是参数，指定所要转向的批处理程序中的行。）

Sample：

    if { %1 }=={ } goto noparms
    if { %2 }=={ } goto

noparms（如果这里的if、%1、%2你不明白的话，先跳过去，后面会有详细的解释。）

    @Rem check parameters if null show usage
    :noparms
    echo Usage: monitor.bat ServerIP PortNumber
    goto end

标签的名字可以随便起，但是最好是有意义的字母啦，字母前加个：用来表示这个字母是标签，goto命令就是根据这个：来寻找下一步跳到到那里。最好有一些说明这样你别人看起来才会理解你的意图啊。

## rem

1. REM [comment]: 批处理文件的注释符，可以使用“::” 来代替REM。
2. 参数。
    %0对应文件名本身，其他分别对应一个参数值，支持255个参数。
3. 文件名参数扩展。

    当使用文件名作参数的时候，可以使用如下文件名扩展。下面的例子扩展%1，其实对所有的参数都可以进行类似的扩展。

    %~f1 - 扩展%1 为带路径的全名。
    %~d1 - 只显示磁盘名称。
    %~p1 - 只显示文件路径。
    %~n1 - 只显示文件名，不包括后缀名，也不包括路径。
    %~x1 - 只显示后缀名。
    %~s1 - 变成短文件名，将包含“~”符号。
    %~1  - 有时候文件名包含空格是，会对文件名加双引号。这个功能是去掉双引号。
    %~a1 - 显示文件的属性。
    %~t1 - 显示文件的修改时间。
    %~z1 - 显示文件的大小。
     
    上面的扩展是可以组合的:
    %~dp1 - 扩展%1 为磁盘名称和路径名。
    %~nx2 - 扩展%2 为文件名和文件后缀名。

例：

    ::Test.bat
    ::Example: test.bat test.bat
    @echo off
    setlocal
    set fn=%~f1
    echo %fn%
    endlocal

## net

1. 管理服务: Net start, stop, pause, continue [service]。
2. 连接到一个共享文件：Net use。
          NET USE [磁盘名:] \\共享名称[\子目录名] [密码] [/USER:[域名\]用户名]
          NET USE磁盘名:]: /delete
3. Net share: 显示本地的所有共享，包括隐藏的共享。
4. Net share ShareName: 显示共享的相关信息。
5. 创建一个本地共享: NET SHARE sharename=drive:path /REMARK:"text" [/CACHE:Manual | Automatic | No ]
6. 修改用户数量限制和标示。
          NET SHARE sharename /USERS:number /REMARK:"text"
          NET SHARE sharename /UNLIMITED /REMARK:"text"
7. 删除共享: NET SHARE {sharename | devicename | drive:path} /DELETE
8. Net view \\计算机名: 列出远程机器的所有共享。
9. Net localgroup: 把一个账户加入一个本地组，如加入管理员组：net localgroup administrators DomainName\UserName /add
10. 机器重命名: netdom renamecomputer 原机器名 /newname:修改后的机器名 /UserD:user /PasswordD:password
11. 加入域: net dom join 计算机名/domain:域名 /UserD:域管理员账户 /PasswordD:域管理员密码

## dir

批量列出文件

    dir /s /b /on

## 参考

- [BAT CMD 批处理文件脚本总结(中文) - 曾令理 - 博客园](http://www.cnblogs.com/linglizeng/archive/2010/01/29/Bat-CMD-ChineseVerion.html)

### Tutorial

- [An A-Z Index of the Windows CMD command line | SS64.com](http://ss64.com/nt/)