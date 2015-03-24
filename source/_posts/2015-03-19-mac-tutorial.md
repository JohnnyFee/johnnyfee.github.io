---
layout: post
title: "JavaScript Tutorial"
description: ""
category: JavaScript
tags: [javascript]
--- 

## Application Manager

### 安装文件

Mac 系统的安装文件后缀名是 `.dmg`，双击打开后，会出现一个安装对话框， 把图标拖拽到 Application 中就可以了。

### 卸载软件

打开 Finder, 到 Application 文件夹下，找到你要卸载的软件，右键，选择 Move To Trash 就卸载好了。

注意：这种卸载方法，不会删除个人目录下的library下的preferences中的配置文件。（不删除配置文件对用户一般没影响）

### brew

#### 安装软件

```sh
brew cask install the-unarchiver   #解压软件，类似于Windows下的winrar
brew cask install evernote           #与windows下一样，笔记软件
brew cask install dropbox            #与windows下一样，文件同步软件，你的Windows数据在这里
brew cask install zotero              #网页收藏与文献管理软件
brew cask install anki                 #记忆软件
brew cask install google-chrome  #与windows下一样，已同步Windows上的书签
brew cask install mou                 #Mac独有的写作软件，基于Markdown格式，可导出PDF
brew cask install virtualbox         #用来跑Windows的虚拟机
brew cask install vagrant            #用来在后台跑Windows的虚拟机
brew cask install alfred               #Mac独特软件，用来帮你快速调用程序与算账
```

### 更新软件

    brew update && brew upgrade

### News

* [Mac软件推荐 | 玩儿法](http://www.waerfa.com/)
* [The Setup / Interviews](http://usesthis.com/interviews/)
* [新工具](http://xingongju.com/)
* [The Setup](http://setup.xiuxiu.de/interviews/)
* [V2EX › MacBook Air](http://v2ex.com/go/mba)
* [V2EX › Mac OS X](http://v2ex.com/go/macosx)
* [V2EX › MacBook Pro](http://v2ex.com/go/mbp)

## Common Operation

### 如何锁屏

1.  在 _System Preferences_ -> _Desktop&ScreenSaver_ 里面选择自己喜爱的 _ScrenSaver_。
2.  然后在 _System Preferences_ -> _Security_ -> _General_ -> 勾选 _Require password to week this computer from sleep or sreen saver._”

设置完成后，可使用 `Shift+Control+推出键` 锁屏。

### Mac中没有最大化，只有最适化

在Windows系统中，我们习惯了把窗口最大化。 但是在苹果系统中没有最大化，而是”最适化“， 意思是“将窗口放大到最合适的宽度”。 这个让习惯了Windows的用户来说，很不习惯。

在Mac OS 实现最大化窗口，可惜在窗口的右下角拖放，放大窗口

小技巧： Chrome中，按住Shift键，然后点击“最适化”。 可以实现最大化。把窗口铺满整个屏幕。

### 搜索程序和文档

类似 Windows 开始菜单中的搜索，可以用来搜索文档，也可以搜索本机的程序。 点击右上角的“放大镜”图标，或者快捷键 `Command+Space` 来调用 Spotlight。

### 进程管理

MAC 中的 Activity Monitor 类似于 Windows 中的任务管理器，用来管理当前运行的进程。在Spotlight中搜索 Activity， 可以快速启动 Activity Monitor。

### 修改系统的语言 

有人喜欢用英文版， 有人喜欢用中文版。 Mac 系统跟 IPhone 手机一样，可以方便的切换语言。

打开 _System Preferences->_Person_ 下的 _Language&Text->Launage_ 下。 把你想要的语言拖拽到第一位。

### 访问远程共享的目录

先打开 Finder，`Command+K` 打开共享目录，输入：`smb://192.168.0.4/share`。

## Terminal

### 编辑 Hosts 文件

在应用程序里面打开终端(Terminal),  输入 `sudo vi /etc/hosts`。 然后提示输入系统密码 Hosts 文件就自动打开了。接着输入 `i`  进入编辑模式。

### 显示 Library 文件夹

在应用程序里面打开终端(Terminal)， `chflags nohidden ~/Library/`

### 获取 IP 地址

输入命令 `ifconfig`

## 常用快捷键

许多键盘快捷键中都包含修饰键。修饰键将改变 OS X 对其他键击或鼠标/触控板点按动作的解释方式。修饰键包括：Command、Shift、Option、Control、Caps Lock 和 fn 键。这些按键由特殊符号表示，可在 OS X 的菜单和其他部分中看到：

![](http://johnnyimages.qiniudn.com/mac-key.png)

如果您使用包含 Windows 按键的非 Apple 键盘，则 Alt 键相当于 Option 键，Windows 键相当于 Command 键。

See [OS X：键盘快捷键 - Apple 支持](https://support.apple.com/zh-cn/HT201236)。

### 窗口管理

```
Command+M: 最小化窗口
Command+T: 在浏览器中打开新的选项卡
Command+W: 关闭窗口
Command+Q: 退出程序
```

### 截图

- `Command+Shift+3` 将屏幕捕捉到文件。
- `Command-Shift-Control-3` 将屏幕内容捕捉到剪贴板。
- `Command+Shift+4`，使用快捷键后会出现带坐标的瞄准器， 拖拽选择要截图的区域，或按空格键仅捕捉一个窗口。
- `Command+Shift+Control+4`
将所选屏幕内容捕捉到剪贴板，或按空格键仅捕捉一个窗口。

注意： 默认情况下， 所有的截图会保存在桌面上。 也就是Desktop文件夹下。

### 启动快捷键

使用这些组合键可更改电脑的启动方式。启动 Mac 后立即按住相关按键或组合键，直到所需的功能出现。例如，启动时按住 Option 键，直到“启动管理器”出现。


按键或组合键                | 功能
--------------------------- | ------
Option 或 Alt               | 显示所有启动宗卷（[启动管理器](http://support.apple.com/kb/HT1310?viewlocale=zh_CN)）
Shift.  | 在[安全模式](http://support.apple.com/kb/HT1455?viewlocale=zh_CN)下启动
C.      | 从可引导介质（DVD、CD、USB 闪存驱动器）启动
T.      | 在[目标磁盘模式](http://support.apple.com/kb/PH19021?viewlocale=zh_CN)下启动
N.      | 从 NetBoot 服务器启动.  
X.      | 强制 OS X 启动（如果非 OS X 启动宗卷可用）
D.      | 使用 Apple Hardware Test                
Command-R                   | 使用 [OS X 恢复功能](http://support.apple.com/kb/HT4718?viewlocale=zh_CN)（OS&nbsp;X&nbsp;Lion 或更高版本）
Command-Option-R            | 在受支持的电脑上使用[互联网恢复](http://support.apple.com/kb/HT4718?viewlocale=zh_CN).   
Command-V                   | 以[详细模式](http://support.apple.com/kb/HT1492?viewlocale=zh_CN)启动    
Command-S                   | 以[单用户模式](http://support.apple.com/kb/HT1492?viewlocale=zh_CN)启动   
Command-Option-P-R          | [重置](http://support.apple.com/kb/PH18761?viewlocale=zh_CN) NVRAM  
按住介质推出 (⏏) 键、F12 键、鼠标或触控板按钮 | 推出活动光盘

### 睡眠、关闭和注销快捷键

Mac 启动后使用这些组合键可让电脑进入睡眠状态、关机、注销或重新启动。

按键或组合键.   | 功能
----------------------------- | --------------------------------------
电源按钮.     | 轻按可开机。在通电后，轻按“电源”按钮可使您的 Mac 唤醒或进入睡眠状态。
按住电源按钮 1.5 秒                  | 显示重新启动/睡眠/关闭对话框.  
按住电源按钮 5 秒                    | 强制 Mac 关机.        
Control-电源按钮  
               | 显示重新启动/睡眠/关闭对话框.  
Command-Control-电源按钮          | 强制 Mac 重新启动.      
Command-Option-电源按钮         |   使电脑进入睡眠状态.        
Command-Control-电源按钮        |   退出所有 app（会让您先存储对已打开文稿所作的更改），然后重新启动电脑  
Command-Option-Control-电源按钮 |   退出所有 app（会让您先存储对已打开文稿所作的更改），然后关闭电脑    
Shift-Control-电源按钮          |   使所有显示器进入睡眠状态.     
Command-Shift-Q               | 注销.  
Command-Shift-Option-Q        | 立即注销.             

### App 快捷键

这些键盘快捷键适用于大部分 app。

组合键.    | 功能
--------------- | -------- 
Command-A   | 在最前面的窗口中选择所有项目或文本
Command-Z.           | 撤消上一命令（有些 app 可让您撤消多次）
Command-Shift-Z.     | 重做，恢复上次使用撤消进行的更改（有些 app 可让您重做多次）. 
Command-空格键.         | 显示或隐藏 Spotlight 搜索栏  

（如果同时使用多语种，此快捷键可能会转而循环显示启用的脚本系统）            
Command-Option-空格键.  | 显示 Spotlight 搜索结果窗口（如果安装了多语种，则可能循环显示某一脚本中的键盘布局和输入法）                
Command-Tab.         | 在打开的 app 列表中，向下移动到下一个最近使用的 app.   
Option-介质推出键 (⏏).    | 从备选光盘驱动器中推出（如果已安装）.       
Command-调低亮度 (F1).   | 切换针对多显示器配置的“镜像显示器”.       
Command-调高亮度 (F2).   | 切换[目标显示器模式](http://support.apple.com/kb/PH19038?viewlocale=zh_CN)  
Command-Mission Control (F3)             | 显示桌面.                     
Command-F5.          | 切换 VoiceOver 的开关.         
Option-亮度 (F2).      | 打开“显示器”系统偏好设置.            
Option-Mission Control (F3)              | 打开“Mission Control”偏好设置.  
Option-音量键 (F12).    | 打开“声音”偏好设置.               
Command-减号 (–).      | 缩小所选项.                    
Command-冒号 (:).      | 显示“拼写和语法”窗口.              
Command-分号 (;).      | 查找文稿中拼写错误的词.              
Command-逗号 (,).      | 打开最前面的 app 的偏好设置窗口.       
Command-问号 (?).      | 打开“帮助”菜单.                 
Command-加号 (+)  

或 Command-Shift-等号 (=) | 放大所选项.                    
Command-Option-D.    | 显示或隐藏 Dock.               
Command-Control-D.   | 显示或隐藏选中字词的定义.             
Command-D.           | 在“打开和存储”对话框中选择“桌面”文件夹.    
Command-Delete.      | 选择包含“删除”或“不存储”按钮的对话框中的“不存储”.      
Command-E.           | 使用所选内容进行查找.               
Command-F.           | 打开“查找”窗口，或在文稿中查找文本.       
Command-Option-F.    | 移到搜索栏控件.                  
Command-G.           | 查找所选内容出现的下一个位置.           
Command-Shift-G.     | 查找所选内容出现的上一个位置.           
Command-H.           | 隐藏当前正在运行的 app 的窗口.        
Command-Option-H.    | 隐藏所有其他正在运行的 app 的窗口.      
Command-Option-I.    | 显示检查器窗口.                  
Command-M.           | 将活跃窗口最小化至 Dock.           
Command-Option-M.    | 将处于活动状态的 app 的所有窗口最小化至 Dock 中.    
Command-N.           | 在最前面的 app 中创建新文稿.         
Command-O.           | 显示一个对话框，用于选择要在最前面的 app 中打开的文稿.    
Command-P.           | 打印当前文稿.                   
Command-Shift-P.     | 显示用于指定文稿参数（页面设置）的对话框.     
Command-Q.           | 退出最前面的 app.               
Command-S.           | 存储活跃文稿.                   
Command-Shift-S.     | 显示“存储为”对话框或复制当前文稿.        
Command-Option-T.    | 显示或隐藏工具栏.                 
Command-W.           | 关闭最前面的窗口.                 
Command-Option-W.    | 关闭当前 app 中的所有窗口.          
Command-Z.           | 撤消上一命令（有些 app 允许多次撤消）.    
Command-Shift-Z.     | 重做，恢复上次使用撤消进行的更改（有些 app 可让您重做多次）. 
Command-Option-esc.  | 选择要[强制退出](http://support.apple.com/kb/HT3411?viewlocale=zh_CN)的 app
Command-Shift-Option-Esc（按住三秒钟）          | [强制退出](http://support.apple.com/kb/HT3411?viewlocale=zh_CN)最前面的 app

## 对文本进行处理

编辑某个字段或文稿中的文本时可使用这些组合键。

组合键                    | 功能. 
---------------------- | -------------------------------------
Command-B              | 以粗体显示所选文本或切换文本粗体显示开/关                
Command-I              | 以斜体显示所选文本或切换文本斜体显示开/关                
Command-U              | 对所选文本加下划线或打开/关闭加下划线功能                
Command-T              | 显示或隐藏“字体”窗口.     
fn-Delete              | 向前删除（适用于便携式 Mac 的内建键盘）               
fn-上箭头                 | 向上滚动一页（相当于 Page Up 键）                
fn-下箭头                 | 向下滚动一页（相当于 Page Down 键）              
fn-左箭头                 | 滚动至文稿开头（相当于 Home 键）                  
fn-右箭头                 | 滚动至文稿末尾（相当于 End 键）                   
Command-右箭头            | 将文本插入点移至当前行的行尾.  
Command-左箭头            | 将文本插入点移至当前行的行首.  
Command-下箭头            | 将文本插入点移至文稿末尾.    
Command-上箭头            | 将文本插入点移至文稿开头.    
Option-右箭头             | 将文本插入点移至下一个单词的末尾
Option-左箭头             | 将文本插入点移至上一个单词的开头
Option-Delete          | 删除光标左侧的词，以及词后的任何空格或标点符号
Command-Shift-右箭头      | 选中插入点与当前行行尾之间的文本 (*). 
Command-Shift-左箭头      | 选中插入点与当前行行首之间的文本 (*). 
Command-Shift-上箭头      | 选中插入点与文稿开头之间的文本 (*).  
Command-Shift-下箭头      | 选中插入点与文稿末尾之间的文本 (*).  
Shift-左箭头              | 将文本选择范围向左扩展一个字符 (*).  
Shift-右箭头              | 将文本选择范围向右扩展一个字符 (*).  
Shift-上箭头              | 将文本选择范围扩展到上一行相同水平位置的最近字符边缘 (*)       
Shift-下箭头              | 将文本选择范围扩展到下一行相同水平位置的最近字符边缘 (*)       
Shift-Option-右箭头       | 将文本选择范围扩展到当前词的词尾，再按一次则扩展到后一词的词尾 (*)  
Shift-Option-左箭头       | 将文本选择范围扩展到当前词的词首，再按一次则扩展到后一词的词首 (*)  
Shift-Option-下箭头       | 将文本选择范围扩展到当前段落的段尾，再按一次则扩展到下一段落的结尾 (*)
Shift-Option-上箭头       | 将文本选择范围扩展到当前段落的段首，再按一次则扩展到下一段落的段首 (*)
Control-A              | 移至行或段落的开头.       
Control-B              | 向后移动一个字符.        
Control-D              | 删除光标前的字符.        
Control-E              | 移至行或段落的开头.       
Control-F              | 向前移动一个字符.        
Control-H              | 删除光标后的字符.        
Control-K              | 删除从光标前的字符到行或段落末尾的所有内容                
Control-L              | 将光标或所选内容置于可见区域中央.     
Control-N              | 下移一行.            
Control-O              | 在光标后插入一行.        
Control-P              | 上移一行.            
Control-T              | 调换光标前后的字符.       
Control-V              | 下移. 
Command-{              | 使所选内容左对齐.        
Command-}              | 使所选内容右对齐.        
Command-|              | 使所选内容居中对齐.       
Command-Option-C       | 拷贝所选项的格式设置并存储到剪贴板.    
Command-Option-V       | 将某对象的样式应用于所选对象（粘贴样式）. 
Command-Shift-Option-V | 将周围文本的样式应用于所插入对象（粘贴并匹配样式）
Command-Control-V      | 将格式设置应用于所选对象（粘贴标尺）.   

## Tutorial

See:
 
- [Mac入门（一）基本用法 - 小坦克 - 博客园](http://www.cnblogs.com/TankXiao/p/2845413.html)
- [Mac入门笔记（1）：开机ABC - 阳志平的网志](http://www.yangzhiping.com/tech/mac1.html)



