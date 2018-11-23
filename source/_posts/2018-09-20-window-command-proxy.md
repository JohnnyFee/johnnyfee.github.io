layout: post
title: 给 Windows 的终端配置代理
tags: [windows, proxy]
category: OS
---

From https://zcdll.github.io/2018/01/27/proxy-on-windows-terminal/

### 缘起

之前遇到在 Windows 下给终端（cmd，Git Bash，PowerShell）配置代理时，总是模模糊糊的就过去了，今天又折腾了一次，恰巧有时间记下来，不想要再次重复了。

其实命令很简单，跟在 **Linux** 下没什么区别。

```
set http_proxy=http://127.0.0.1:1080

set https_proxy=http://127.0.0.1:1080

set http_proxy_user=user
set http_proxy_pass=pass

set https_proxy_user=user
set https_proxy_pass=pass

# 恢复
set http_proxy=

set https_proxy=

# Ubuntu 下命令为 export
# export http_proxy=http://127.0.0.1:1080
```

就是两条命令，前两条。

### [](https://zcdll.github.io/2018/01/27/proxy-on-windows-terminal/#%E8%A6%81%E7%82%B9 "要点")要点

1.  一定要加 `http://`，直接写域名或者 IP 不行。
2.  **http** 和 **https** 都要设置。

然后如果想验证是否成功配置了代理的话，用 `ping` 命令是不可以的

### [](https://zcdll.github.io/2018/01/27/proxy-on-windows-terminal/#ping-%E8%BF%98%E6%98%AF%E4%B8%8D%E8%A1%8C%E7%9A%84%E5%8E%9F%E5%9B%A0 "ping 还是不行的原因")ping 还是不行的原因

ping的协议不是https，也不是https，是ICMP协议。

### [](https://zcdll.github.io/2018/01/27/proxy-on-windows-terminal/#%E9%AA%8C%E8%AF%81%E6%96%B9%E5%BC%8F "验证方式")验证方式

`curl -vv http://www.google.com`，用这条命令来验证，如果返回如下结果表示代理设置成功。

![curl-google](https://zcdll.github.io/images/curl-google.png)

这里还有一个坑是，**cmd**，**Git Bash**，**PowerShell** 设置的方式不同！！！有点精神分裂了。。。

* **cmd** 中用 `set http_proxy` 设置

* **Git Bash** 中用 `export http_proxy` 设置

* **PowerShell** 中按照这样设置

        NOTE: registry keys for IE 8, may vary for other versions

        $regPath = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings'

        function Clear-Proxy
        {
            Set-ItemProperty -Path $regPath -Name ProxyEnable -Value 0
            Set-ItemProperty -Path $regPath -Name ProxyServer -Value ''
            Set-ItemProperty -Path $regPath -Name ProxyOverride -Value ''

            [Environment]::SetEnvironmentVariable('http_proxy', $null, 'User')
            [Environment]::SetEnvironmentVariable('https_proxy', $null, 'User')
        }

        function Set-Proxy
        {
            $proxy = 'http://example.com'

            Set-ItemProperty -Path $regPath -Name ProxyEnable -Value 1
            Set-ItemProperty -Path $regPath -Name ProxyServer -Value $proxy
            Set-ItemProperty -Path $regPath -Name ProxyOverride -Value '<local>'

            [Environment]::SetEnvironmentVariable('http_proxy', $proxy, 'User')
            [Environment]::SetEnvironmentVariable('https_proxy', $proxy, 'User')
        }

**纠结于应该用 `set` 还是 `export` 还有一个判断方法是，敲一下这两个命令，如果返回一个长长的列表，就表示应该用这个命令，反之，如果返回找不到这个命令，就不应该用这个命令。**

### [](https://zcdll.github.io/2018/01/27/proxy-on-windows-terminal/#%E6%80%BB%E7%BB%93 "总结")总结

这次应该是搞清楚了 Windows 下如何给 **Terminal** 设置代理，花了一个多小时的时间，感觉很值！

### [](https://zcdll.github.io/2018/01/27/proxy-on-windows-terminal/#%E5%8F%82%E8%80%83%E9%93%BE%E6%8E%A5%EF%BC%9A "参考链接：")参考链接：

* [命令行配置代理服务器](https://yevon-cn.github.io/2017/05/05/set-proxy-of-cmd.html)
* [windows终端命令行下如何使用代理？](https://github.com/shadowsocks/shadowsocks-windows/issues/1489)
* [windows（64位）下使用curl命令](https://www.cnblogs.com/xing901022/p/4652624.html)
* [ICMP协议与ping原理](https://www.s0nnet.com/archives/icmp-ping)
* [ping](https://zh.wikipedia.org/wiki/Ping)
* [PowerShell Set-Proxy, Clear-proxy](https://gist.github.com/famousgarkin/c5138b1e13ac41920d22)