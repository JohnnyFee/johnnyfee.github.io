layout: post
title: "Windows IIS"
category: Windows
tags: [windows, iis]
---

## 安装

参考文档 <http://msdn.microsoft.com/zh-cn/library/ms751518.aspx?

注册ASP.NET最新版本，cmd切换到目录

_C:\Windows\Microsoft.NET\Framework\v4.0.30319_ 下，运行命令：

    aspnet_regiis.exe –i (-enable)

<!-- more -->

## 启用IIS

通过命令行启用：`inetmgr`
通过管理启用：管理服务和应用程序IIS

## 配置IIS

- 网站添加网站填写网站名称、选择物理路径
- 连接为输入管理员用户和密码
- 选择应用程序池选择.NET4
- 测试连接成功，确定
