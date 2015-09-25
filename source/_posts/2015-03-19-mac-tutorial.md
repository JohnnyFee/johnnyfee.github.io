layout: post
title: "Mac Basic Tutorial"
description: ""
category: Mac
tags: [macbook, tutorial]
---

## Application Manager

### 安装文件

Mac 系统的安装文件后缀名是 `.dmg`，双击打开后，会出现一个安装对话框， 把图标拖拽到 Application 中就可以了。

如果网上下载应用无法安装使用的话，打开“安全性与隐私”里面 打开左下脚的小锁 先鉴定一下，然后选中“来自任何来源”。

<!-- more -->

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

#### 更新软件

    brew update && brew upgrade

### News

* [Mac软件推荐 | 玩儿法](http://www.waerfa.com/)
* [The Setup / Interviews](http://usesthis.com/interviews/)
* [新工具](http://xingongju.com/)
* [The Setup](http://setup.xiuxiu.de/interviews/)
* [V2EX › MacBook Air](http://v2ex.com/go/mba)
* [V2EX › Mac OS X](http://v2ex.com/go/macosx)
* [V2EX › MacBook Pro](http://v2ex.com/go/mbp)

### 权限

启用 Root：_/System/Library/CoreServices_  找到“目录实用工具”-点击左下角-鉴定-（有设开机密码的需要输入开机密码）鉴定完了-菜单栏 编辑-启用root账户 -设置root账户密码。ok 这样就启用成功了，如果管理员密码忘了，就可以通过root账号重设 管理员密码！

## Software

- iLife 包括 iPhoto、iMovie、GrageBand。iMovie 影片剪辑；GarageBand，音乐爱好者的神器。Download from [Apple - Press Info - Product Images & Info - iLife](http://www.apple.com/pr/products/ilife/ilife.html).
- iWork 办公三件套。Download from [Apple - Press Info - Product Images & Info - iWork](http://www.apple.com/pr/products/iwork/iWork.html).
- [Aperture](https://www.apple.com/cn/aperture/) 照片处理。
- MplayerX 或 VLC。 视频软件。
- xee 图片预览。
- Splashtop iphone 远程控制 mac。
- Cleanapp 应用程序卸载。
- DynamicLyrics itunes 增强，这个绝对是精品 能够自动搜索歌词并且非常漂亮。
- Paparazzi 截取网页。
- paragon NTFS 格式for mac 必备。 NTFS 格式支持，如果你发现无法往u盘或者硬盘拷贝文件那么基本上就是不支持ntfs这个格式，安装这个插件就能解决了，必装。
- screentest 屏幕坏点检测软件。

### Office

- [Pages 09 官方视频教程](http://v.youku.com/v_show/id_XNDkzNzI4MTY4.html) 兼容 Word。
- [Keynote 09 官方教程视频](http://v.youku.com/v_show/id_XNDkzNjg3Nzg4.html) 兼容 PowerPoint。
- [Numbers 09官方视频教程](http://v.youku.com/v_show/id_XNDkzNzM3ODM2.html) 兼容 Excel。
- [GarageBand 11官方教程视频](http://v.youku.com/v_show/id_XNDkzNjgxMTg0.html) 音乐教程和工具。
- [iMovie 11官方视频教程](http://v.youku.com/v_show/id_XNDkzNjc4OTA4.html)
    - [Apple – iCloud 版 iWork (测试版)](https://www.apple.com/cn/iwork-for-icloud/)

## Common Operation

### 如何锁屏

1.  在 _System Preferences_ -> _Desktop&ScreenSaver_ 里面选择自己喜爱的 _ScrenSaver_。
2.  然后在 _System Preferences_ -> _Security_ -> _General_ -> 勾选 _Require password to week this computer from sleep or sreen saver._”

设置完成后，可使用 `Shift+Control+推出键` 锁屏。

### Mac中没有最大化，只有最适化

在Windows系统中，我们习惯了把窗口最大化。 但是在苹果系统中没有最大化，而是”最适化“， 意思是“将窗口放大到最合适的宽度”。 这个让习惯了Windows的用户来说，很不习惯。

在Mac OS 实现最大化窗口，可惜在窗口的右下角拖放，放大窗口

小技巧： Chrome中，按住Shift键，然后点击“最适化”。 可以实现最大化。把窗口铺满整个屏幕。

### Finder

OS X 中通过 Finder 您能访问自己的文件和文件夹。

鼠标选中一个文件，然后按一下 Space 空格键，可以快速预览文件内容。

勾选 _Finder/偏好设置/通用/_ -> 硬盘、外置磁盘。

See [Mac 101：Finder - Apple 支持](https://support.apple.com/zh-cn/HT2470)

### 搜索程序和文档

类似 Windows 开始菜单中的搜索，可以用来搜索文档，也可以搜索本机的程序。 点击右上角的“放大镜”图标，或者快捷键 `Command+Space` 来调用 Spotlight。

如果您想要在终端脚本中使用 Spotlight，请使用“
<tt>mdfind</tt>”命令。

如果您想要使用终端来管理 Spotlight 使用的元数据储存，请使用“
<tt>mdutil</tt>”命令。

See [Mac 基础知识：Spotlight - Apple 支持](https://support.apple.com/zh-cn/HT2531)

### 进程管理

MAC 中的 Activity Monitor 类似于 Windows 中的任务管理器，用来管理当前运行的进程。在Spotlight中搜索 Activity， 可以快速启动 Activity Monitor。.

### 修改系统的语言

有人喜欢用英文版， 有人喜欢用中文版。 Mac 系统跟 IPhone 手机一样，可以方便的切换语言。

打开 _System Preferences->_Person_ 下的 _Language&Text->Launage_ 下。 把你想要的语言拖拽到第一位。

### 访问远程共享的目录

先打开 Finder，`Command+K` 打开共享目录，输入：`smb://192.168.0.4/share`。

### 输入法

Mac OS X Lion 系统自带的中文输入法里也内置了颜文字表情输入功能，同时按下 `shift+6` 两个键即可调出颜文字表情列表。

如果你想用苹果logo，一般情况都是网上找或者自己ps，其实mac下可以就像打字一样打一个出来，快捷键是：`option+shift+K `。

### 菜单栏

屏幕最上边那栏软件多了，不需要的小图标也多了，可以按住 Command 从上面拖出来 扔掉。

### 听写与语音

按两下 Fn 键启动。

### 多显示器

您可以在“系统偏好设置”的“显示器”部分找到“检测显示器”按钮。进入“显示器”部分后，按住 Option 键即可在右下角看到“检测显示器”按钮。您可以点按此按钮以手动检测另一个显示器。

### 双系统

搜索栏搜 BootCamp ，这个应用会一步一步教你安装 Windows。See ![ ](https://support.apple.com/library/content/dam/edam/applecare/images/en_US/macbookpro/mac_yos_poster-boot_camp-hero.png)

See also [Boot Camp - 使用入门 - Apple 支持](http://www.apple.com/cn/support/bootcamp/getstarted/)

## 文件管理

### 文件管理工具

- [Total Commander for Mac: download free alternatives](http://formac.informer.com/total-commander)
- [XtraFinder adds Tabs and features to Mac Finder.](https://www.trankynam.com/xtrafinder/)

### 文件系统

- [paragon ntfs for mac 免费版](http://www.pc6.com/mac/112001.html)

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
Command+Option+M: 最小化当前程序的所有窗口
Command+T: 在浏览器中打开新的选项卡
Command+W: 关闭窗口
Command+Q: 退出程序
Command + Option + H: 隐藏所有其他软件的的窗口
Command + Control + F: 进入全屏模式
command+~: 可切换同一个程序的不同窗口。 
Command + F3: 显示桌面。
```

__最大化当前窗口__

当然，这个操作我们可以通过窗口左上角的绿色符号实现，但是我们也可以为这个功能设置一个键盘快捷键，虽然不是系统默认自带的，但设置也不麻烦：  

-打开 系统偏好设置=》键盘=》键盘快捷键 标签  

-选中左侧栏中的“应用程序快捷键”，点击下方的“+”加号符号来新增快捷键  

-在菜单标题填入“缩放”（英文系统填入“Zoom”），快捷键这只成为 Control+Command+=  

确认添加后即可使用这个快捷键对窗口进行最大化的控制了  

<img id="aimg_442359" src="http://images.macx.cn/forum/201303/23/1609421hzhjylole7z4h7e.jpg"></img>

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
---------------------------| ------
Option 或 Alt               | 显示所有启动宗卷（[启动管理器](http://support.apple.com/kb/HT1310?viewlocale=zh_CN)）
Shift  | 在[安全模式](http://support.apple.com/kb/HT1455?viewlocale=zh_CN)下启动
C      | 从可引导介质（DVD、CD、USB 闪存驱动器）启动
T      | 在[目标磁盘模式](http://support.apple.com/kb/PH19021?viewlocale=zh_CN)下启动
N      | 从 NetBoot 服务器启动.
X      | 强制 OS X 启动（如果非 OS X 启动宗卷可用）
D      | 使用 Apple Hardware Test
Command-R                   | 使用 [OS X 恢复功能](http://support.apple.com/kb/HT4718?viewlocale=zh_CN)（OS X Lion 或更高版本）
Command-Option-R            | 在受支持的电脑上使用[互联网恢复](http://support.apple.com/kb/HT4718?viewlocale=zh_CN).
Command-V                   | 以[详细模式](http://support.apple.com/kb/HT1492?viewlocale=zh_CN)启动
Command-S                   | 以[单用户模式](http://support.apple.com/kb/HT1492?viewlocale=zh_CN)启动
Command-Option-P-R          | [重置](http://support.apple.com/kb/PH18761?viewlocale=zh_CN) NVRAM
按住介质推出 (⏏) 键、F12 键、鼠标或触控板按钮 | 推出活动光盘

### 睡眠、关闭和注销快捷键

Mac 启动后使用这些组合键可让电脑进入睡眠状态、关机、注销或重新启动。

按键或组合键   | 功能
-----------------------------| --------------------------------------
电源按钮     | 轻按可开机。在通电后，轻按“电源”按钮可使您的 Mac 唤醒或进入睡眠状态。
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

组合键    | 功能
---------------| --------
Command-A   | 在最前面的窗口中选择所有项目或文本
Command-空格键         | 显示或隐藏 Spotlight 搜索栏
Command-Option-空格键  | 显示 Spotlight 搜索结果窗口
Command-Tab         | 在打开的 app 列表中，向下移动到下一个最近使用的 app.
Command-调低亮度 (F1)   | 切换针对多显示器配置的“镜像显示器”.
Command-调高亮度 (F2)   | 切换[目标显示器模式](http://support.apple.com/kb/PH19038?viewlocale=zh_CN)
Command-Mission Control (F3) | 显示桌面.
Command-F5          | 切换 VoiceOver 的开关.
Option-亮度 (F2)      | 打开“显示器”系统偏好设置.
Option-Mission Control (F3) | 打开“Mission Control”偏好设置.
Option-音量键 (F12)    | 打开“声音”偏好设置.
Command-减号 (–)      | 缩小所选项.
Command-冒号 (:)      | 显示“拼写和语法”窗口.
Command-分号 (;)      | 查找文稿中拼写错误的词.
Command-逗号 (,)      | 打开最前面的 app 的偏好设置窗口.
Command-问号 (?)      | 打开“帮助”菜单.
Command-加号 (+)  或 Command-Shift-等号 (=) | 放大所选项.
Command-Option-D    | 显示或隐藏 Dock.
Command-Control-D   | 显示或隐藏选中字词的定义.
Command-D           | 在“打开和存储”对话框中选择“桌面”文件夹.
Command-Delete      | 选择包含“删除”或“不存储”按钮的对话框中的“不存储”.
Command-E           | 使用所选内容进行查找.
Command-F           | 打开“查找”窗口，或在文稿中查找文本.
Command-Option-F    | 移到搜索栏控件.
Command-G           | 查找所选内容出现的下一个位置.
Command-Shift-G     | 查找所选内容出现的上一个位置.
Command-H           | 隐藏当前正在运行的 app 的窗口.
Command-Option-H    | 隐藏所有其他正在运行的 app 的窗口.
Command-Option-I    | 显示检查器窗口.
Command-M           | 将活跃窗口最小化至 Dock.
Command-Option-M    | 将处于活动状态的 app 的所有窗口最小化至 Dock 中.
Command-N           | 在最前面的 app 中创建新文稿.
Command-O           | 显示一个对话框，用于选择要在最前面的 app 中打开的文稿.
Command-P           | 打印当前文稿.
Command-Shift-P     | 显示用于指定文稿参数（页面设置）的对话框.
Command-Q           | 退出最前面的 app.
Command-S           | 存储活跃文稿.
Command-Shift-S     | 显示“存储为”对话框或复制当前文稿.
Command-Option-T    | 显示或隐藏工具栏.
Command-W           | 关闭最前面的窗口.
Command-Option-W    | 关闭当前 app 中的所有窗口.
Command-Z           | 撤消上一命令（有些 app 允许多次撤消）.
Command-Shift-Z     | 重做，恢复上次使用撤消进行的更改（有些 app 可让您重做多次）.
Command-Option-esc  | 选择要[强制退出](http://support.apple.com/kb/HT3411?viewlocale=zh_CN)的 app
Command-Shift-Option-Esc（按住三秒钟）          | [强制退出](http://support.apple.com/kb/HT3411?viewlocale=zh_CN)最前面的 app

### 对文本进行处理

编辑某个字段或文稿中的文本时可使用这些组合键。

组合键                    | 功能.
----------------------| -------------------------------------
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

### 全键盘控制

通过全键盘控制，您可以使用键盘进行导航，并与屏幕上的项目进行交互。使用这些快捷键可选择并调整文本栏和滑块等控件。按 Control-F7 或从“系统偏好设置”中“键盘”偏好设置的“快捷键”面板中选择“全键盘控制”，可以切换此设置开/关。 

组合键                    | 功能
----------------------| ----------------------------------------------
Tab                    | 移至下一个控件
Shift-Tab              | 移至上一个控件
Control-Tab            | 已选择文本栏时移至下一个控件
Shift-Control-Tab      | 将焦点移至上一组控件
箭头键                    | 移至列表、标签组或菜单中的相邻项，或
移动滑块和调节器（用于增加和减小值的垂直上下箭头）
Control-箭头键            | 移至与文本栏相邻的控件
空格键                    | 选择高亮显示的菜单项
Return 或 Enter 键       | 点按默认按钮或执行默认操作
Esc 键                  | 点按“取消”按钮，或关闭菜单而不选取项目
Shift-Control-F6       | 将焦点移至上一个面板
Control-F7             | 临时覆盖窗口和对话框中的当前键盘访问模式
Control-F8             | 移到菜单栏中的状态菜单
Command-重音符 (`)        | 激活最前面的 app 中下一个打开的窗口
Command-Shift-重音符 (`)  | 激活最前面的 app 中上一个打开的窗口
Command-Option-重音符 (`) | 将焦点移至窗口抽屉

您可以在菜单栏中浏览菜单，而无需使用鼠标或触控板。若要将焦点置于菜单栏中，请按 Control-F2（便携式键盘上的 fn-Control-F2）。然后使用下列组合键。

组合键      | 功能
--------| ------------
左箭头和右箭头  | 从一个菜单移到另一个菜单
Return   | 打开所选菜单
上箭头和下箭头  | 移至所选菜单中的菜单项
键入菜单项的名称 | 跳到所选菜单中的菜单项
Return   | 选择菜单项

### Finder 快捷键

 组合键                         | 功能
---------------------------| ---------------------------------------
Command-A                   | 选择最前面的窗口中的所有文件
Command-Option-A            | 取消选择所有项
Command-C                   | 拷贝选中的文件，然后使用“粘贴”或“移动”来移动这些文件。
Command-D                   | 重复选中的文件
Command-E                   | 推出
Command-F                   | 查找任何匹配 Spotlight 属性的内容
Command-I                   | 显示选中的文件的“显示简介”窗口
Command-Shift-C             | 打开“电脑”窗口
Command-Shift-D             | 打开“桌面”文件夹
Command-Shift-F             | 显示“我的所有文件”窗口
Command-Shift-G             | 前往文件夹
Command-Shift-H             | 打开当前已登录用户帐户的个人文件夹
Command-Shift-I             | 打开 iCloud Drive
Command-Shift-K             | 打开“网络”窗口
Command-Shift-L             | 打开“下载”文件夹
Command-Shift-O             | 打开“文稿”文件夹
Command-Shift-R             | 打开 AirDrop 窗口
Command-Shift-U             | 打开“实用工具”文件夹
Command-Control-T           | 添加到边栏 (OS X Mavericks)
Command-Option-I            | 显示或隐藏“检查器”窗口
Command-Control-I           | 获得摘要信息
Command-Option-P            | 隐藏或显示路径栏
Command-Option-S            | 隐藏或显示边栏
Command-正斜线 (/)             | 隐藏或显示状态栏
Command-J                   | 调出“显示”选项
Command-K                   | 连接到服务器
Command-L                   | 为所选项制作替身
Command-N                   | 新建 Finder 窗口
Command-Shift-N             | 新建文件夹
Command-Option-N            | 新建智能文件夹
Command-O                   | 打开所选项
Command-R                   | 显示（替身的）原身
Command-T                   | 在当前 Finder 窗口中打开单个标签时显示或隐藏标签栏
Command-Shift-T             | 显示或隐藏 Finder 标签
Command-Option-T            | 在当前 Finder 窗口中打开单个标签时显示或隐藏工具栏
Command-V                   | 将您放在剪贴板上的文本副本粘贴到当前位置。
Command-Option-V            | 将您放在剪贴板上的文本从其原始位置移动到当前位置。
Command-Option-Y            | 查看选中文件的快速查看幻灯片。
Command-1                   | 以图标显示
Command-2                   | 以列表方式显示
Command-3                   | 以分栏方式显示
Command-4        | 以 Cover Flow 方式显示（Mac OS X v10.5 或更高版本）
Command-逗号 (,)              | 打开 Finder 偏好设置
Command-左中括号 ([)            | 前往上一文件夹
Command-右中括号 (])            | 前往下一文件夹
Command-上箭头                 | 打开包含当前文件夹的文件夹
Command-Control-上箭头         | 在新窗口中打开包含当前文件夹的文件夹
Command-下箭头                 | 打开高亮显示的项目
 右箭头（以列表视图显示）                | 打开所选文件夹
 左箭头（以列表视图显示）                | 关闭所选文件夹
Option-点按显示三角形（以列表视图显示）     | 打开所选文件夹内的所有文件夹
Option-连按                   | 在单独窗口中打开文件夹，并关闭当前窗口
Command-连按                  | 在单独标签或窗口中打开文件夹
Command-点按窗口标题              | 查看包含当前窗口的文件夹
Command-Delete              | 移至废纸篓
Command-Shift-Delete        | 清倒废纸篓
Command-Shift-Option-Delete | 清倒废纸篓（不显示确认对话框）
空格键（或 Command-Y）    | 快速查看选中的文件
拖移时按 Command 键       | 将拖移的项目移至其他宗卷或位置（按住按键时指针会改变）
拖移时按 Option 键     | 拷贝拖移的项目（按住按键时指针会改变）
拖移时按 Command-Option 组合键 | 对拖移的项目赋予别名（按住按键时指针会改变）

## Tutorial

See:

- [Mac入门（一）基本用法 - 小坦克 - 博客园](http://www.cnblogs.com/TankXiao/p/2845413.html)
- [Mac入门笔记（1）：开机ABC - 阳志平的网志](http://www.yangzhiping.com/tech/mac1.html)

### TO SEE

- 你需要知道的15条OS X Mountain Lion提示和技巧 http://tech.hexun.com/2012-08-09/144573828.html
- Mac OS X Lion技巧全集（不断更新）http://www.macx.cn/thread-2037901-1-1.html  
- Mission Control的几个操作小贴士，你都知道么？ http://www.macx.cn/a/a100i1980525.htm
- Mission Control 桌面背景可以不同： http://www.macx.cn/a/a100i1980352.htm
- Misson Control中的一些设置技巧： http://www.macx.cn/a/a100i1970204.htm
- Lion：为你的程序分配一个桌面Space http://www.macx.cn/a/a100i1980396.htm
- 开启或关闭Lion中全屏程序的快捷键 http://www.macx.cn/a/a100i1976055.htm
- 10 个 Lion 纯新用户可能会忽略的系统设置 http://www.macx.cn/a/a100i1978995.htm
- 分享一下本人收集的Lion小技巧与新发现 http://www.macx.cn/a/a100i1966457.htm



