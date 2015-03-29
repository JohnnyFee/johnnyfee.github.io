layout: post
title: "Powershell Tutorial"
category: PowerShell
tags: [powershell, tutorial]
--- 

## Tutorial

- [PowerShell 中文博客](http://www.pstips.net/)
- [叹为观止](http://blog.vichamp.com/)

## Quick Start

### Get-Member

Listing the Properties and Methods of a Command or Object.

查看一个对象的所有属性：

```shell
#  You’d like to know which properties and methods are available for event logs
# Get-EventLog -list will retrieve an event log object
Get-EventLog -list | Get-Member

#  -membertype parameter in order to limit returned data to properties
#　 setting -membertype to methods returns just the methods.
Get-WmiObject win32_bios | Get-Member -membertype properties

# Did you know that some of the properties returned by the Get-Process cmdlet have aliases?
Get-Process | Get-Member -membertype aliasproperty
Get-Process | Select-Object name, npm
```

[Using the Get-Member Cmdlet](http://technet.microsoft.com/en-us/library/ee176854.aspx)

### Get-Help

    update-help

    # displays a list of the available help topics.
    Get-Help Get-Alias

    # display basic information about the Get-Alias cmdlet. 
    # 以下三种方法等效
    Get-Help Get-Alias
    Help Get-Alias
    Get-Alias -?

    # use wildcard character
    Get-Help Get-alia*

    #  displays the online version of the help topic
    Get-Help Get-Member -Online

    #  including parameter descriptions and examples
    get-help get-command -detailed

    #　To display all of the available Help for a cmdlet, including technical information about the cmdlet and its parameters
    get-help get-command -full

    #  To see only the examples
    get-help get-command -examples

    # to see a description of the TotalCount parameter of Get-Command
    get-help get-command -parameter totalcount

- [Getting Help: Get-Help](http://technet.microsoft.com/en-us/library/bb648604(v=vs.85).aspx)
- [Get-Help](http://technet.microsoft.com/zh-CN/library/hh849696.aspx)

### Get-Alias

Listing All Your Windows PowerShell Aliases

## Set Up

- [PowerShell_零基础自学课程_5_自定义PowerShell环境及Powershell中的基本概念 - volcanol - 博客园](http://www.cnblogs.com/volcanol/archive/2012/05/08/2490886.html)

## 日期

- Get-Date | Select-Object -ExpandProperty DayOfWeek
- 字符串转化为日期格式   ([datetime]'2012/02/01').ToString("MM-dd-yyyy") [#PSTip Converting a String to a System.DateTime object](http://www.powershellmagazine.com/2013/07/08/pstip-converting-a-string-to-a-system-datetime-object/)

## 可执行程序

- [PowerShell: Running Executables](http://social.technet.microsoft.com/wiki/contents/articles/7703.powershell-running-executables.aspx) 使用其中的第5个方法。
- [获取当前路径](http://superuser.com/questions/237902/how-can-one-show-the-current-directory-in-powershell)

## Performance

    (Measure-Command {Dir $home -filter *.ps1 -recurse}).TotalSeconds
    4,6830099
    (Measure-Command {Dir $home -include *.ps1 -recurse}).TotalSeconds
    28,1017376

## 对象

- [PowerShell 创建自定义对象](http://www.pstips.net/powershell-create-creating-custom-objects.html)
- [Powershell Define Powershell Objects](http://stackoverflow.com/questions/9885072/powershell-define-powershell-objects)

## 错误处理

- [PowerShell, batch files, and exit codes. Recipes & Secrets.](http://zduck.com/2012/powershell-batch-files-exit-codes/)
- [An Introduction to Error Handling in PowerShell](http://blogs.msdn.com/b/kebab/archive/2013/06/09/an-introduction-to-error-handling-in-powershell.aspx)
- 使用$LastErrorCode检测命令执行的错误码，使用$Error获取错误消息
- 忽略输出信息 Add-Item|Out-Null <http://stackoverflow.com/questions/5260125/whats-the-better-cleaner-way-to-ignore-output-in-powershell>
- 重定向错误级别 [about_Redirection](http://technet.microsoft.com/en-us/library/hh847746.aspx) 3 >&1
- 发送邮件 send-mailmessage -to "吴波 <wub@landicorp.com>" -from "吴波 <wub@landicorp.com>" -subject "Test mail" -SmtpServer mail.landicorp.com

## 字符串

- [Use PowerShell to Replace Text in Strings](http://blogs.technet.com/b/heyscriptingguy/archive/2011/03/21/use-powershell-to-replace-text-in-strings.aspx)

## 环境

- [Powershell中禁止执行脚本解决办法](http://www.cnblogs.com/shanyou/archive/2011/09/03/2165371.html) set-ExecutionPolicy RemoteSigned.
- [apetrovskiy/STUPS](https://github.com/apetrovskiy/STUPS)

## FAQ

### How to get current username in Windows Powershell?

<http://stackoverflow.com/questions/2085744/how-to-get-current-username-in-windows-powershell>

    [Environment]::UserName

There is also:

    [Environment]::UserDomainName
    [Environment]::MachineName