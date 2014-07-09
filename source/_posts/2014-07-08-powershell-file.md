---
layout: post
title: "Powershell File"
category: PowerShell
tags: [powershell, file]
--- 

## 概述

* [PowerShell文件系统（一）前言](http://www.pstips.net/the-file-system.html)
* [PowerShell文件系统（二）访问文件和目录](http://www.pstips.net/accessing-files-and-directories.html)
* [PowerShell文件系统（三）导航文件系统](http://www.pstips.net/navigating-the-file-system.html)
* [PowerShell文件系统（四）使用目录和文件工作](http://www.pstips.net/working-with-files-and-directories.html)
* [PowerShell文件系统（五）管理访问权限](http://www.pstips.net/managing-access-permissions.html)


在PowerShell控制台中，文件系统有很特别的重要性。一个明显的原因是管理员需要执行许多涉及文件系统的任务。另一个原因是文件系统是一个层次结构信息模型。在接下来的章节中，你还会看到PowerShell在此基础上控制其它层次信息系统。你可以非常容易的将PowerShell中学到的驱动器，目录和文件的知识点应用到其它地方，其中就包括注册表或者微软的Exchange。

<!--more-->

在下面表格中列出的PowerShell命令中，其全名可能很少有人用到。大家更倾向与使用它们非常实用的别名，这些别名来自Windows和Unix系统。可以让初学者可以非常快速地找到合适的命令。

非常重要的文件系统命令概览

| 别名                         | 描述                                           | 命令             |
|------------------------------|------------------------------------------------|------------------|
| cp, cpi                      | 复制文件或者目录                               | Copy-Item        |
| Dir, ls, gci                 | 列出目录的内容                                 | Get-Childitem    |
| type, cat, gc                | 基于文本行来读取内容                           | Get-Content      |
| gi                           | 获取指定的文件或者目录                         | Get-Item         |
| gp                           | 获取文件或目录的属性                           | Get-ItemProperty |
| ii                           | 使用对应的默认windows程序运行文件或者目录      | Invoke-Item      |
| –                            | 连接两个路径为一个路径                         | Join-Path        |
| mi, mv, move                 | 移动文件或者目录                               | Move-Item        |
| ni                           | 创建新文件或者目录                             | New-Item         |
| ri, rm, rmdir,del, erase, rd | 删除空目录或者文件                             | Remove-Item      |
| rni, ren                     | 重命名文件或者路径                             | Rename-Item      |
| rvpa                         | 处理相对路径或者包含通配符的路径               | Resolve-Path     |
| sp                           | 设置文件或路径的属性                           | Set-ItemProperty |
| Cd,chdir, sl                 | 更改当前目录的位置                             | Set-Location     |
| –                            | 提取路径的特定部分，例如父目录，驱动器，文件名 | Split-Path       |
| –                            | 测试指定的路径是否存在                         | Test-Path        |

## Csv

The Import-Csv cmdlet provides a way for you to read in data from a comma-separated values file (CSV) and then display that data in tabular format within the Windows PowerShell console.

    Import-Csv c:\scripts\test.txt
    Import-Csv c:\scripts\test.txt | Where-Object {$_.department -eq "Finance"}

The content in test.txt is like:

```
Name,Department,Title
Pilar Ackerman,Research,Manager
Jonathan Haas,Finance,Finance Specialist
Ken Myer,Finance,Accountant
```

- [Using the Import-Csv Cmdlet](http://technet.microsoft.com/en-us/library/ee176874.aspx)

## Test-Path

Using Test-Path to Verify the Existence of an Object.

```shell
Test-Path C:\Scripts\Archive
Test-Path Env:\username

# The –pathType to specify the path is a folder or file. container as folder and leaf as file.
Test-Path C:\Scripts\Archive -pathType container

# Test-Path returns True if the folder contains at least one .PS1 file, and False if the folder doesn’t contain any .PS1 files.
Test-Path C:\Scripts\Archive\*.ps1

# Whether the Archive folder has either one or more .PS1 files or one or more .VBS files
Test-Path C:\Scripts\Archive\* -include *.ps1, *.vbs

# Are there are any files in the Archive folder that don’t have a .PS1 file extension?
Test-Path C:\Scripts\Archive\* -exclude *.ps1
```

- [Using Test-Path to Verify the Existence of an Object](http://technet.microsoft.com/en-us/library/ff730955.aspx)

## Dir

使用 `Get-ChildItem` 列出目录的内容，预定义的别名为 `Dir` 和 `ls`。

```shell
# 想列出当前目录下的所有PowerShell脚本
Dir *.ps1

# Dir甚至能支持数组，能让你一次性列出不同驱动器下的内容。
# 下面的命令会同时列出PowerShell根目录下的PowerShell脚本和Windows根目录下的所有日志文件。
Dir $pshome\*.ps1, $env:windir\*.log

# 如果你只对一个目录下的项目名称感兴趣
Dir -name

# 特殊字符被视为路径片段
Dir -LiteralPath .\a[0].txt

# 递归搜索整个子目录树
Dir *.ps1 -recurse

# 过滤出你想要列出的文件
Dir $home -filter *.ps1 -recurse

# 功能同上，-filter的执行效率明显高于-include
# 其原因在于-include支持正则表达式，而-filter只支持简单的模式匹配。
Dir $home -include *.ps1 -recurse
Dir $home -include [a-f]*.ps1 -recurse

# 获取 home 目录下所有的图片文件，filter 不支持数组
Dir $home -recurse -include *.bmp,*.png,*.jpg, *.gif

# 指定文件不小于 100MB 的文件
Dir $home -recurse | Where-Object { $_.length -gt 100MB }
```

```
# 获取文件对象，对于文件，以下两条指令效果等同。
$file = Dir C:\a.html
$file = Get-Item C:\a.html

# 获取文件的 FileInfo 信息
$file | Format-List *

# 获取文件的 Attributes 信息
$file.Attributes
```

你还可以将多个Dir 命令执行的结果结合起来。在下面的例子中，两个分开的Dir命令，产生两个分开的文件列表。然后PowerShell将它们结合起来发送给管道进行深度处理。这个例子获取Windows目录和安装程序目录下的所有的dll文件，然后返回这些dll文件的名称，版本，和描述：

```shell
$list1 = Dir $env:windir\system32\*.dll
$list2 = Dir $env:programfiles -recurse -filter *.dll
$totallist = $list1 + $list2
$totallist | ForEach-Object {
$info =
[system.diagnostics.fileversioninfo]::GetVersionInfo($_.FullName);
"{0,-30} {1,15} {2,-20}" -f $_.Name, `
$info.ProductVersion, $info.FileDescription
}
```

```shell
# 只列出目录::
Dir | Where-Object { $_ -is [System.IO.DirectoryInfo] }
Dir | Where-Object { $_.PSIsContainer }
Dir | Where-Object { $_.Mode.Substring(0,1) -eq "d" }
# 只列出文件:
Dir | Where-Object { $_ -is [System.IO.FileInfo] }
Dir | Where-Object { $_.PSIsContainer -eq $false}
Dir | Where-Object { $_.Mode.Substring(0,1) -ne "d" }
```

前面的例子（识别对象类型）是目前速度最快的，而后面的（文本比较）比较复杂和低效。

通过管道过滤2007年5月12日后更改过的文件：

    Dir |Where-Object{$_.CreationTime-gt[datetime]::Parse("May 12, 2007") }

也可以使用相对时间获取2周以内更改过的文件：

    Dir |Where-Object{$_.CreationTime-gt(Get-Date).AddDays(-14) }

## Creat File

- [创建文件](http://technet.microsoft.com/en-us/library/hh849795.aspx) 
    - [Using the New-Item Cmdlet](http://technet.microsoft.com/en-us/library/ee176914.aspx)
    - [合并路径](http://technet.microsoft.com/en-us/library/hh849799.aspx)
- 拷贝文件
    - [Copy-Item](http://technet.microsoft.com/en-us/library/hh849793.aspx)
    - [Use PowerShell to Copy Files and Folders to a New Location](http://blogs.technet.com/b/heyscriptingguy/archive/2013/04/19/use-powershell-to-copy-files-and-folders-to-a-new-location.aspx)
    - 如果拷贝文件件中的东东，可以设置 -Source path/*.*，否则该文件夹也会同时被拷贝到目标文件夹中
- 执行可执行程序
    - [PowerShell: Running Executables](http://social.technet.microsoft.com/wiki/contents/articles/7703.powershell-running-executables.aspx) 使用其中的第5个方法。
    - [PowerShell Call Operator](http://com2kid.wordpress.com/2011/09/25/powershell-call-operator-using-an-array-of-parameters-to-solve-all-your-quoting-problems/)
- 读取文件 <http://technet.microsoft.com/zh-cn/library/hh849787(v=wps.620).aspx>
    - 使用**Get-Content**结果为字符串数组，可以使用**-Raw**获得字符串
- [获取当前路径](http://superuser.com/questions/237902/how-can-one-show-the-current-directory-in-powershell)
- Get-Date | Select-Object **-ExpandProperty** DayOfWeek
- 字符串转化为日期格式   ([datetime]'2012/02/01').ToString("MM-dd-yyyy") [#PSTip Converting a String to a System.DateTime object](http://www.powershellmagazine.com/2013/07/08/pstip-converting-a-string-to-a-system-datetime-object/)
- 回车换行 `r`n
- 可以使用 | tee 输出双向管道，如"abc" | tee -FilePath d:\output.log
- cat 获取文件呃逆荣
- gal 获取别名类型
-从文件读取字符串的方法
    - Select-String C:\Scripts\*.txt -pattern "Hey, Scripting Guy!"
    - Get-Content

