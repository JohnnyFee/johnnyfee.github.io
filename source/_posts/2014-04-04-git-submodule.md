---
layout: post
title: "Git Submodule"
description: ""
category: Git
tags: [git]
--- 

本文介绍使用SmartGit来操作子模块的方法和步骤。操作平台为Windows8和SmartGit 5.0。

A submodule is a nested repository that is embedded in a dedicated subdirectory of the working tree (which belongs to the parent repository). The submodule is always pointing at a particular commit of the embedded repository. The definition of the submodule is stored as a separate entry in the parent repository's git object database.

The link between working tree entry and __`foreign repository`__ is stored in the __`.gitmodules`__ file of the parent repository. The .gitmodules file is usually versioned, so it can be maintained by all users and/or changes are propagated to all users.

Setting submodule repositories involves an initialization process, in which the required entries are added to the __`.git/config`__ file. The user may later adjust it, for example to fix SSH login names.

<!--more-->

## Cloning Repositories with Submodules

If you clone an existing project containing one or more submodules via `Project|Clone`, make sure the option Include Submodules is selected, so that all submodules are automatically initialized and updated. Without this option, you may initialize the submodules later by hand via `Remote|Submodule|Initialize`. Just initialization itself will leave the submodule directory empty. For a fully functional submodule, you'll also need to do a pull on it, as described in Updating Submodules.

## 添加 Submodule

- 选择要添加子模块的目标目录，`Remote/Submodule/Add`
- 输入子模块名。
- 提交修改。

首次添加子模块，会在工作目录的根目录下生成一个`.gitmodules`文件。该文件用来存放子模块的列表（Submodule Entries）。每个模块对应一个类似下面的Entry：

	[submodule "lib1"]
		path = lib1
		url = D:\\temp\\repos\\lib1\\

使用该方法添加子模块之后在工作目录的`.git/`文件夹中的config添加如下内容：

	[submodule "lib1"]
		url = D:\\temp\\repos\\lib1\\

同时在`.git/modules`也会为子模块生成相同文件夹名的目录，对应的为子模块的repo信息。

## 删除 Submodule

- 选择要删除的子模块。
- 执行 `Remote/Submodule/Unregister`。执行该菜单之后，`.gitmodules`会被修改，提交更改。
- 删除工作目录中的子模块文件夹，使用`Remove`，而非`Delete`。提交修改。提交之后，`lib1/`的状态变成`<unknown branch/commit>`。
- 使用`Delete`删除子模块目录。
- 删除`.git/modules/`下的子模块文件夹，如果不删除，再次添加该子模块的时候将出错。

## 同步 Submodule

If the URL of a submodule's remote repository has changed, you need to modify the URL in the `.gitmodules` file and then synchronize the submodule, via `Remote|Submodule|Synchronize`, so that the new URL is written into Git's configuration.

## 更新子模块

![git-submodule-update.png](http://johnnyimages.qiniudn.com/git-submodule-update.png)

### Pulling on the Submodule

Select the submodule in the Directories view and invoke `Remote|Pull`. On the Pull dialog that shows up, check either the Rebase or the Merge option. Then, after the pull, the submodule will have a different appearance in the Directories view if new commits have been fetched and a rebase or merge has been performed. This different appearance indicates that the submodule has changed and that you need to commit the change in the outer repository.

### Pulling on the Outer Repository

Open the repository settings via `Project|Repository Settings`, and on the `Pull` tab, enable **Update registered submodules**, so that SmartGit/Hg automatically updates all registered submodules when pulling on the outer repository. Additionally, you may also enable **And initialize new submodules**; with this, SmartGit/Hg will update not only registered submodules when pulling, but also uninitialized submodules, after having initialized them. The aforementioned Update option will only fetch commits as needed, i.e. when a commit is referenced by the outer repository as the current state of the submodule. If you want to fetch all new commits instead, enable the option **Always fetch new commits, tags and branches from submodule**. Note that when you do a pull on the outer repository, you need to pull with subsequent rebase or merge, otherwise new submodule commits will only be fetched, without changing the submodule state (i.e. the commit the submodule is currently pointing at).
	
## 参考资料：

- [SmartGit - Git Client: Documentation](http://www.syntevo.com/smartgithg/documentation/5/show?page=submodules)
- <http://www.kafeitu.me/git/2012/03/27/git-submodule.html>

