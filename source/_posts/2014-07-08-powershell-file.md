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

在下面表格中列出的PowerShell命令中，其全名可能很少有人用到。大家更倾向与使用它们非常实用的别名，这些别名来自Windows和Unix系统。可以让初学者可以非常快速地找到合适的命令。

<!--more-->

__非常重要的文件系统命令概览__

| 别名 | 描述 | 命令 |
|-----------|-----------|------------------|
| cp, cpi | 复制文件或者目录 | Copy-Item |
| Dir, ls, gci | 列出目录的内容 | Get-Childitem |
| type, cat, gc | 基于文本行来读取内容 | Get-Content |
| gi | 获取指定的文件或者目录 | Get-Item |
| gp | 获取文件或目录的属性 | Get-ItemProperty |
| ii | 使用对应的默认windows程序运行文件或者目录 | Invoke-Item |
| – | 连接两个路径为一个路径 | Join-Path |
| mi, mv, move | 移动文件或者目录 | Move-Item |
| ni | 创建新文件或者目录 | New-Item |
| ri, rm, rmdir,del, erase, rd | 删除空目录或者文件 | Remove-Item |
| rni, ren | 重命名文件或者路径 | Rename-Item |
| rvpa | 处理相对路径或者包含通配符的路径 | Resolve-Path |
| sp | 设置文件或路径的属性 | Set-ItemProperty |
| Cd,chdir, sl | 更改当前目录的位置 | Set-Location |
| – | 提取路径的特定部分，例如父目录，驱动器，文件名 | Split-Path |
| – | 测试指定的路径是否存在 | Test-Path |

## Csv

The Import-Csv cmdlet provides a way for you to read in data from a comma-separated values file (CSV) and then display that data in tabular format within the Windows PowerShell console.

The content in test.txt is like:

```
Name,Department,Title
Pilar Ackerman,Research,Manager
Jonathan Haas,Finance,Finance Specialist
Ken Myer,Finance,Accountant
```

    Import-Csv c:\scripts\test.txt
    Import-Csv c:\scripts\test.txt | Where-Object {$_.department -eq "Finance"}
    Import-Csv test.txt | ForEach-Object { $_.Name }

除了使用ForEach-Object循环你还可以在括号中使用脚本块。对于每一个管道内部的管道对象，脚本块都会被执行。在下面的例子中，逗号分割文件中的每一个用户名都会通过echo的参数-InputObject返回并输出。

    Import-Csv test.txt | echo -InputObject {$_.Name }

- [Using the Import-Csv Cmdlet](http://technet.microsoft.com/en-us/library/ee176874.aspx)

## Path

### Test-Path

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

### Resolve-Path

相对路径转化为绝对路径：

    Resolve-Path .\a.png
    Resolve-Path $pshome\*.ps1xml
    notepad.exe (Resolve-Path  $pshome\types.ps1xml).providerpath

如果没有符合标准的文件，Resolve-Path会抛出一个异常，`$?` 为 `true`。

    function edit-file([string]$path=$(Throw "请输入相对路径!"))
    {
        # 处理相对路径，并抑制错误
        $files = Resolve-Path $path -ea SilentlyContinue
        # 验证是否有错误产生:
        if (!$?)
        {
            # 如果是，没有找到符合标准的文件，给出提醒并停止：
            "没有找到符合标准的文件.";
            break
        }
        # 如果返回结果为数组，表示有多个文件:
        if ($files -is [array])
        {
            # 此种情况下，列出你想打开的文件:
            Write-Host -foregroundColor "Red" -backgroundColor "White" `
            "你想打开这些文件吗?"
            foreach ($file in $files)
            {
                "- " + $file.Path
            }
            # 然后确认这些文件是否为用户想打开的：
            $yes = ([System.Management.Automation.Host.ChoiceDescription]"&yes")
            $no = ([System.Management.Automation.Host.ChoiceDescription]"&no")
            $choices = [System.Management.Automation.Host.ChoiceDescription[]]($yes,$no)
            $result = $host.ui.PromptForChoice('Open files','Open these files?',$choices,1)
            # 如果用户确认，使用"&"操作符启动所有的文件
            if ($result -eq 0)
            {
                foreach ($file in $files)
                {
                    & $file
                }
            }
        }
        else
        {
            # 如果是单个文件，可以直接使用"&"启动：
            & $files
        }
    }

### Join-Path

    path = [Environment]::GetFolderPath("Desktop") + "\file.txt"
    path = Join-Path ([Environment]::GetFolderPath("Desktop")) "test.txt"
    $path = [System.IO.Path]::Combine([Environment]::`GetFolderPath("Desktop"), "test.txt")

    # combine multiple path roots with a child path
    join-path -path C:, D:, E:, F: -childpath New
    
    # travel all driver and combile a child path
    get-psdrive -psprovider filesystem | foreach {$_.root} | join-path -childpath Subdir

- [Join-Path](http://technet.microsoft.com/en-us/library/hh849799.aspx)

__构造路径的方法:__

| 方法 | 描述 | 示例 |
|----|----|------
| ChangeExtension() | 更改文件的扩展名 | ChangeExtension(“test.txt”, “ps1″) |
| Combine() | 拼接路径字符串; 对应Join-Path | Combine(“C:\test”, “test.txt”) |
| GetDirectoryName() | 返回目录对象：对应Split-Path -parent | GetDirectoryName(“c:\test\file.txt”) |
| GetExtension() | 返回文件扩展名 | GetExtension(“c:\test\file.txt”) |
| GetFileName() | 返回文件名：对应Split-Path -leaf | GetFileName(“c:\test\file.txt”) |
| GetFileNameWithoutExtension() | 返回不带扩展名的文件名 | GetFileNameWithoutExtension(“c:\test\file.txt”) |
| GetFullPath() | 返回绝对路径 | GetFullPath(“.\test.txt”) |
| GetInvalidFileNameChars() | 返回所有不允许出现在文件名中字符 | GetInvalidFileNameChars() |
| GetInvalidPathChars() | 返回所有不允许出现在路径中的字符 | GetInvalidPathChars() |
| GetPathRoot() | 返回根目录：对应Split-Path -qualifier | GetPathRoot(“c:\test\file.txt”) |
| GetRandomFileName() | 返回一个随机的文件名 | GetRandomFileName() |
| GetTempFileName() | 在临时目录中返回一个临时文件名 | GetTempFileName() |
| GetTempPath() | 返回临时文件目录 | GetTempPath() |
| HasExtension() | 如果路径中包含了扩展名，则返回True | HasExtension(“c:\test\file.txt”) |
| IsPathRooted() | 如果是绝对路径，返回为True; Split-Path -isAbsolute | IsPathRooted(“c:\test\file.txt”) |        | 

### 存储在环境变量中的Windows特殊目录

特殊目录 |描述      |       示例
----------|---------|----------
Application data|    存储在本地机器上的应用程序数据| $env:localappdata
User profile|    用户目录  |  $env:userprofile
Data used incommon | 应用程序公有数据目录  |$env:commonprogramfiles
Public directory   | 所有本地用户的公有目录 |$env:public
Program directory  | 具体应用程序安装的目录 |$env:programfiles
Roaming Profiles   | 漫游用户的应用程序数据 |$env:appdata
Temporary files(private)  |  当前用户的临时目录 |  $env:tmp
Temporary files | 公有临时文件目录    |$env:temp
Windows directory |  Windows系统安装的目录  |$env:windir

环境变量返回的只是其中一部分，还不是全部的特殊目录。比如如果你想将某个文件放到一个用户的桌面，你需要的路径在环境变量中是无法获取的。但是你可以使用.NET的方法environment类下面的 `GetFolderPath()`方法。下面会演示如何在桌面上创建一个快捷方式。

```shell
# 在桌面上创建一个快捷方式:
$path = [Environment]::GetFolderPath("Desktop") + "\EditorStart.lnk"
$comobject = New-Object -comObject WScript.Shell
$link = $comobject.CreateShortcut($path)
$link.targetpath = "notepad.exe"
$link.IconLocation = "notepad.exe,0"
$link.Save()
```

GetFolderPath()目录的类型可以在枚举值SpecialFolder中找到。你可以使用下面一行脚本查看它的内容。

    [System.Environment+SpecialFolder] | Get-Member -static -memberType Property | select -ExpandPropert

如果你想预览所有GetFolderPath()支持的目录内容，可以使用下面的例子：

```shell
[System.Environment+SpecialFolder] |
Get-Member -static -memberType Property |
ForEach-Object { "{0,-25}= {1}" -f $_.name, [Environment]::GetFolderPath($_.Name) 
}
```

## Dir

使用 `Get-ChildItem` 列出目录的内容，预定义的别名为 `Dir` 和 `ls`。

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

获取文件信息：

    # 获取文件对象，对于文件，以下两条指令效果等同。
    $file = Dir C:\a.html
    $file = Get-Item C:\a.html

    # 获取文件的 FileInfo 信息
    $file | Format-List *

    # 获取文件的 Attributes 信息
    $file.Attributes

你还可以将多个Dir 命令执行的结果结合起来。在下面的例子中，两个分开的Dir命令，产生两个分开的文件列表。然后PowerShell将它们结合起来发送给管道进行深度处理。这个例子获取Windows目录和安装程序目录下的所有的dll文件，然后返回这些dll文件的名称，版本，和描述：

    $list1 = Dir $env:windir\system32\*.dll
    $list2 = Dir $env:programfiles -recurse -filter *.dll
    $totallist = $list1 + $list2
    $totallist | ForEach-Object {
    $info =
    [system.diagnostics.fileversioninfo]::GetVersionInfo($_.FullName);
    "{0,-30} {1,15} {2,-20}" -f $_.Name, `
    $info.ProductVersion, $info.FileDescription
    }

    # 只列出目录::
    Dir | Where-Object { $_ -is [System.IO.DirectoryInfo] }
    Dir | Where-Object { $_.PSIsContainer }
    Dir | Where-Object { $_.Mode.Substring(0,1) -eq "d" }
    # 只列出文件:
    Dir | Where-Object { $_ -is [System.IO.FileInfo] }
    Dir | Where-Object { $_.PSIsContainer -eq $false}
    Dir | Where-Object { $_.Mode.Substring(0,1) -ne "d" }

前面的例子（识别对象类型）是目前速度最快的，而后面的（文本比较）比较复杂和低效。

通过管道过滤2007年5月12日后更改过的文件：

    Dir |Where-Object{$_.CreationTime-gt[datetime]::Parse("May 12, 2007") }

也可以使用相对时间获取2周以内更改过的文件：

    Dir |Where-Object{$_.CreationTime-gt(Get-Date).AddDays(-14) }

## New 

### 创建新目录

创建一个新目录最方便的方式是使用MD函数，它内部调用的是New-Item命令，指定参数–type的值为“Directory”：

    # 以下两个命令等效
    md Test1
    New-Item Test1 -type Directory

你也可以一次性创建多层子目录，如果你指定的目录不存在，PowerShell会自动创建这些目录：

    md test\subdirectory\somethingelse

### 创建新文件

可能之前你已经使用过New-Item来创建过文件，但是它们完全是空的：

    New-Item "new file.txt" -type File

    Dir > info1.txt
    Dir | Out-File info2.txt
    Dir | Set-Content info3.txt
    # 将一个日期对象写入到文件中
    Set-Content info4.txt (Get-Date)

转化成 HTML 格式后输出，以下两个命令等价：

    Dir | ConvertTo-HTML | Out-File report1.htm
    Dir | ConvertTo-HTML | Set-Content report2.htm

重定向和Out-File非常的类似：当PowerShell转换管道结果时，文件的内容就像它在控制台上面输出的一样。Set-Content呢，稍微有所不同。它在文件中只列出目录中文件的名称列表,因为在你使用Set-Content时，PowerShell不会自动将对象转换成文本输入。相反，Set-Content会从对象中抽出一个标准属性。上面的情况下，这个属性就是Name了。

在重定向的过程中，控制台的编码会自动指定特殊字符在文本中应当如何显示。你也可以在使用Out-File命令时，使用-encoding参数来指定。

可以使用双重定向和Add-Content向一个文本文件中追加信息：

    Set-Content info.txt "First line"
    "Second line" >> info.txt
    Add-Content info.txt "Third line"

重定向操作符通常使用的是控制台的字符集，如果你的文本中碰巧同时包含了ANSI和Unicode字符集，可能会引起意外的结果。相反，使用Set-Content，Add-Content和Out-File这几条命令，而不使用重定向，可以有效地规避前面的风险。这三条命令都支持-encoding参数，你可以用它来选择字符集。

### 创建新驱动器

    # 创建一个网络驱动器
    New-PSDrive -name network -psProvider FileSystem -root \\127.0.0.1\share

创建一个名为 `desktop:` 和 `docs:`的驱动器，它可以代表你的”桌面“目录和Windows目录：“我的文档”

    New-PSDrive desktop FileSystem ([Environment]::GetFolderPath("Desktop")) | out-null
    New-PSDrive docs FileSystem ([Environment]::GetFolderPath("MyDocuments")) | out-null

然后你想更改当前目录为桌面时，只须输入：

    cd desktop:

## Read File

### 读取文本文件的内容

使用Get-Content可以获取文本文件的内容：

    Get-Content $env:windir\windowsupdate.log

使用 `Get-Content` 结果为字符串数组，可以使用 `-Raw` 获得字符串

Get-Content 逐行读取文本的内容，然后把文本的每一行传递给管道。因此，在你想读取一个长文件的前10行，应当适用Select-Object：

    Get-Content $env:windir\windowsupdate.log | Select-Object -first 10

使用Select-String可以过滤出文本文件中的信息。下面的命令行会从windowsupdate.log文件中过滤出包含”added update”短语的行。

    Get-Content $env:windir\windowsupdate.log | Select-String "Added update"

另外，可以使用 `Select-String`:

    Select-String C:\Scripts\*.txt -pattern "Hey, Scripting Guy!"

可以使用 `| tee` 输出双向管道，如
    
    "abc" | tee -FilePath d:\output.log

### 解析文本内容和提取文本信息

经常会碰到的一个任务就是解析原始数据，比如日志文件，从所有的数据中获取结构化的目标信息。比如日志文件：windowsupdate.log 它记录了windows更新的细节信息（在之前的例子中我们已经多次用到过这个小白鼠）。该文件还有大量数据，以至于乍一看没什么可读性。初步分析表明该文件是逐行存储的信息，并且每行的信息片段是以Tab字符分割的。

正则表达式为描述这类文件格式提供了最方便的方式，之前在第13章已经提到过。你可以按照下面的例子来使用正则表达式适当地描述文件indowsupdate.log的内容。

    # 文本模式包含了6个Tab字符分割的数组
    $pattern = "(.*)\t(.*)\t(.*)\t(.*)\t(.*)\t(.*)"
    # 输入日志
    $text = Get-Content $env:windir\windowsupdate.log
    # 从日志文件中提取出任意行（这里是第21行）
    $text[20] -match $pattern
     
    $matches
 
输出结果：

    Name Value
    ---------
    6      * Added update {17A5424C-4C70-4BB4-8F83-66DABE5E7CA2}.201 to search result
    5    Agent
    4    19a4
    3     448
    2    11:30:42:237
    1    2014-02-10
    0    2014-02-10    11:30:42:237     448    19a4    Agent      * Added update {17A5424C-4C70-4BB4-8F83-66DABE5E7CA2}....

$matches返回了每个圆括号中定义的子正则表达式的匹配项，这样你就可以使用数字索引来寻址每个文本数组元素了。比如你只对某一行中的日期和描述感兴趣，然后格式化输出它：

    PS > "On {0} this took place: {1}" -f $matches[1], $matches[6]
    On 2014-02-10 this took place:   * Added update {17A5424C-4C70-4BB4-8F83-66DABE5E7CA2}.201 to search result

这种情况下，推荐给每一个子表达式取一个名字，这样可以在后面通过该名字访问。

    # 这次子表达式拥有一个名称：
    $pattern = "(?<Datum>.*)\t(?<time>.*)\t(?<Code1>.*)" + "\t(?<Code2>.*)\t(?<Program>.*)\t(?<Text>.*)"
    # 输入日志:
    $text = Get-Content $env:windir\windowsupdate.log
     
    # 从日志中提取任意行来解析（这里取第21行）：
    $text[20] -match $pattern
    True
    # 从 $matches 中获取信息
    # 可以访问指定的名称:
    $matches.time + $matches.text

现在你可以使用Get-Content一行一行读取整个日志文件了，然后使用上面的方式逐行处理。这意味着即使在一个庞大的文件中，你也可以快速，相对高效地收集所有你需要的信息。下面的例子正好会列出那些日志行的描述信息中包含了短语“woken up”的文本行。这可以帮助你找出一台机器是否曾经因为自动更新被从待机或者休眠模式唤醒。

    Get-Content $env:windir\windowsupdate.log |
    ForEach-Object { if ($_ -match "woken up") { $_ } }

    2013-05-24 03:00:34:609 1276 1490 AU The machine was woken up by Windows Update
    2013-05-24 03:00:34:609 1276 1490 AU The system was woken up by Windows Update, but found to be running on battery power. Skip the forcedinstall.

如果进入循环，会将保存在$_中的完整文本行输出。你现在知道了如何使用正则表达式将一个包含特定信息片段的文本行分割成数组。

然而，还有第二种，更为精妙的方法，从文件中选择个别文本行，它就是Switch。你只需要告诉语句块，那个文件你想检查，那个模式你想匹配。剩下的工作就交给Switch吧！下面的语句会获取所有安装的自动更新日志。使用它比之前使用的Get-Content和ForEach-Object更快速。你只需要记住正则表达式“.*”代表任意数量的任意字符。

    Switch -regex -file $env:windir\wu1.log {
        'START.*Agent: Install.*AutomaticUpdates' { $_ }}

    2013-05-19 09:22:04:113 1248 1d0c Agent **START**
    Agent: Installing updates [CallerId = AutomaticUpdates]

如果你想找到其它程序的更新，比如SMS或者Defender。只需要在你的正则表达式中使用“SMS”或者“Defender”替换“automatic updates”即可。事实上，Switch可以接受多个模式，按照下面声明在花括号中的那样，依赖多个模式进行匹配。这就意味着只需几行代码，就可以找出多个程序的更新。

    # 为结果创建一个哈希表:
    result = @{Defender=0; AutoUpdate=0; SMS=0}
    # 解析更新日志，并将结果保存在哈希表中:
    Switch -regex -file $env:windir\wu1.log
    {
    'START.*Agent: Install.*Defender' { $result.Defender += 1 };
    'START.*Agent: Install.*AutomaticUpdates' { $result.AutoUpdate +=1 };
    'START.*Agent: Install.*SMS' { $result.SMS += 1}
    }

    # 输出结果:
    $result

    Name        Value
    ---------
    SMS     0
    Defender    1
    AutoUpdate  8

### 读取二进制的内容

[读取二进制的内容](http://www.pstips.net/working-with-files-and-directories.html#读取二进制的内容)

## Move File

### 移动和复制文件和目录

Move-Item 和 Copy-Item用来执行移动和拷贝操作。它们也支持通配符。比如下面的脚本会将你家目录下的的所有PowerShell脚本文件复制到桌面上：

    Copy-Item $home\*.ps1 ([Environment]::GetFolderPath("Desktop"))

但是，只有在家目录当下的脚本会被复制。幸亏Copy-Item还有一个参数-recurse，这个参数的效果类似Dir中的效果。如果你的初始化目录不包含任何目录，它也不会工作。

    Copy-Item -recurse $home\*.ps1 ([Environment]::GetFolderPath("Desktop"))

使用Dir也可以复制所有PowerShell脚本到你的桌面，让我们先给你找出这些脚本，然后将结果传递给Copy-Item：

    Dir -filter *.ps1 -recurse | ForEach-Object {
        Copy-Item $_.FullName ([Environment]::GetFolderPath("Desktop")) }

小技巧：你可能被诱惑去缩减脚本行，因为文件对象整合了一个CopyTo()方法。
    
    Dir -filter *.ps1 -recurse | ForEach-Object {
        $_.CopyTo([Environment]::GetFolderPath("Desktop")) }

但是结果可能会出错，因为CopyTo()是一个低级的函数。它需要文件的目标路径也被复制。因为你只是想复制所有文件到桌面，你已经指定了目标路径的目录。CopyTo()会尝试将文件复制这个精确的字符串路径（桌面）下，但是肯定不会得逞，因为桌面是一个已经存在的目录了。相反的Copy-Item就聪明多了：如果目标路径是一个目录，它就会把文件复制到这个目录下。
此时，你的桌面上可能已经堆满了PowerShell脚本，最好的方式是将它们保存到桌面的一个子目录中。你需要在桌面上创建一个新目录，然后从桌面到这个子目录中移动所有的脚本。

    $desktop = [Environment]::GetFolderPath("Desktop")
    md ($desktop + "\PS Scripts")
    Move-Item ($desktop + "\*.ps1") ($desktop + "\PS Scripts")

此时，你的桌面又恢复了往日的整洁，也把脚本安全的保存到桌面了。

### 重命名文件和目录

因为Rename-Item可以在管道中的语句块中使用，这就给一些复杂的任务提供了令人惊讶的方便的解决方案。比如，你想将一个目录的名称和它的子目录的名称，包括目录下的文件的名称中所有的“x86”词语移除掉。下面的命令就够了：

    Dir |ForEach-Object{Rename-Item$_.Name$_.Name.replace("-x86", "") }

然而，上面的命令会实际上会尝试重命名所有的文件和目录，即使你找的这个词语在文件名中不存在。产生错误并且非常耗时。为了大大提高速度，可是使用Where-Object先对文件名进行过滤，然后对符合条件的文件进行重命名，可以将速度增长50倍：（荔非苔注：为什么是50倍呢？我不知道。）

Dir |Where-Object{$_.Name-contains"-x86"} |ForEach-Object{Rename-Item$_.Name$_.Name.replace("-x86", "") }

#### 更改文件扩展名

如果你想更改文件的扩展名，首先需要意识到后果：文件随后会识别为其它文件类型，而且可能被错误的应用程序打开，甚至不能被任何应用程序打开。下面的命令会把当前文件夹下的所有的PowerShell脚本的后缀名从“.ps1”改为“.bak”。

    Dir *.ps1 | ForEach-Object { Rename-Item $_.Name `
    ([System.IO.Path]::GetFileNameWithoutExtension($_.FullName) + ".bak") -whatIf }

    What if: Performing operation "Rename file" on Target
    "Element: C:\Users\Tobias Weltner\tabexpansion.ps1
    Destination: C:\Users\Tobias Weltner\tabexpansion.bak".

#### 整理文件名

数据集往往随着时间的增长而增长。如果你想整理一个目录，你可以给定所有的文件一个统一的名称和序号。你可以从文件的某些具体的属性中合成文件名。还记得上面在桌面上为PowerShell脚本创建的那个子目录吗？让我们对它里面的PowerShell脚本以数字序号重命名吧。

    Dir $directory\*.ps1 | ForEach-Object {$x=0} {
    Rename-Item $_ ("Script " + $x + ".ps1"); $x++ } {"Finished!"}
    Dir $directory\*.ps1

## Delete

使用Remove-Item和别名Del可以删除文件和目录，它会不可恢复的删除文件和目录。如果一个文件属于只读文件，你需要指定参数-force ：

    # 创建示例文件:
    $file = New-Item testfile.txt -type file
    # 文件不是只读:
    $file.isReadOnly
        False
    # 激活只读属性:
    $file.isReadOnly = $true
    $file.isReadOnly
        True
    # 只读的文件需要指定-Force参数才能顺利删除:
    del testfile.txt
        Remove-Item : Cannot remove item C:\Users\Tobias Weltner\testfile.txt: Not enough permission to perform operation.
        At line:1 char:4
        + del <<<< testfile.txt
        del testfile.txt -force
        Table

#### 删除目录内容

如果你只想删除某个目录下的内容而保留目录本身，可以使用通配符。比如下面的脚本行会删除Recent目录下的内容，对应于启动菜单中的“My Recent Documents”。因为删除文件夹是一件掉以轻心就会产生严重后果的事情，所有你可以使用`-whatIf`参数模拟一下删除过程，看看可能会发生什么。

    $recents = [Environment]::GetFolderPath("Recent")
    del $recents\*.* -whatIf

如果你已经确认你的命令操作无误，将上面语句中的-whatif去掉即可删除这些文件。另一方面，如果你仍然不是很确定，可以使用`-confirm`，它会在每次删除操作执行前向你确认。

#### 删除目录和它的内容

如果一个目录被删除了，它里面所有的内容都会丢失。在你尝试去删除一个文件夹连同它的内容时，PowerShell都会请求你的批准。这样是为了防止你无意间销毁大量数据。只有空目录才不需要请求确认信息。

    # 新建一个测试目录:
    md testdirectory

    Directory: Microsoft.PowerShell.Core\FileSystem::C:\Users\Tobias Weltner\Sources\docs

    Mode LastWriteTime Length Name
    ---------------------------
    d----13.10.2007 13:31 testdirectory

    # 在目录中新建一个文件
    Set-Content .\testdirectory\testfile.txt "Hello"

    # 删除目录 directory:
    del testdirectory

    Confirm
    The item at "C:\Users\Tobias Weltner\Sources\docs\testdirectory" has children
    and the Recurse parameter was not specified. If you continue, all children
    will be removed with the item. Are you sure you want to continue?
    |Y| Yes |A| Yes to All |N| No |L| No to All |S| Suspend |?| Help (default is"Y"):

但是，如果你指定了参数-recurse：PowerShell会将这个目录连同它里面的内容删除，没有任何确认提示。