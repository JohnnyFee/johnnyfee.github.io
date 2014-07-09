---
layout: post
title: "Powershell Tutorial"
category: PowerShell
tags: [powershell, tutorial]
--- 

## Tutorial

- [PowerShell 中文博客](http://www.pstips.net/)
- [叹为观止](http://blog.vichamp.com/)

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

- [Powershell中禁止执行脚本解决办法](http://www.cnblogs.com/shanyou/archive/2011/09/03/2165371.html) set-ExecutionPolicy RemoteSigned

