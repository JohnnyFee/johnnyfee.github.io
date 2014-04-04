---
layout: post
title: "Git Submodule"
description: ""
category: Git
tags: [git]
--- 

添加submodule
选择要添加子模块的目录，Remote/Submodule/Add

![git-submodule-add.png](http://johnnyimages.qiniudn.com/git-submodule-add.png)

输入子模块名

![git-submodule-input.png](http://johnnyimages.qiniudn.com/git-submodule-input.png)

提交修改

删除Submodule
选择要删除的子模块

![git-submodule-delete.png](http://johnnyimages.qiniudn.com/git-submodule-delete.png)

Remote/Submodule/Unregister
执行该命令时，如果子目录文件夹未被删除，则手动删除。另外，删除工程目录/.git/config中该模块的注册信息，如：

	[submodule "libs/lib1"]
	url = D:\\current\\repos\\lib1.git\\

可能还需要手动删除.git/modules/下的相应子模块目录

修改子模块 Pull Submodule
选择需要更新的子模块，Remote/Pull
如果子模块有修改，Pull之后该子模块会变为更改状态，选择子工程，Stage，Commit，Push保存引用submodule的commit id。

从外层工程更新子模块

![git-submodule-update.png](http://johnnyimages.qiniudn.com/git-submodule-update.png)

注：这两项默认就是勾选的。其中Update registered submodules表示Pull外层工程时，子模块也会被Pull。And initialize new submodules的意思是，如果子模块未被注册，则先注册子模块，再Pull。

提交子模块的修改
修改子模块内容后，提交，选择子工程，Push或者Sync
保存子模块的Commit Id，选择子模块，Commit，Push或者Sync

SmartGit关于子模块的命令：

Rmote/Submodule/

	Initialize 注册子模块
	Synchronize  同步子模块，如果子模块的远程地址修改，则先修改.submodules中的远程地址，再调用该命令，则.git/config中的注册信息将被修改。
	Reset 当Checkout子模块的某个Commit时，可以选择提交，外层工程对于该子模块的的Commit将被修改。也可以调用Reset命令，外层工程对于该子模块的Commit Id的修改将被撤销。
	Add 添加子模块。修改.submodules，修改.git/config，即自动完成注册。之后clone子模块。
	Unregister 参考删除Submodule
	
参考资料：
http://www.syntevo.com/smartgithg/documentation?page=submodules
http://www.kafeitu.me/git/2012/03/27/git-submodule.html

