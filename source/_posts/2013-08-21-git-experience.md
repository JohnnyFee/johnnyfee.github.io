---
layout: post
title: "Git Experience"
description: ""
category: Git
tags: [git]
--- 
## 新增远程库>

	git remote add repo_b username@host:path/to/repository.git
	git pull repo_b master


参考：<http://stackoverflow.com/questions/4131164/git-pulling-from-another-local-repository>

## reset

从 `reset --HARD` 中恢复提交，使用 `git reflog` 命令就好了. (由 Gittenberg 提供)

## diff

如果你想查看两个分支之间有什么不同之处，你只需要这样做:git diff branch1..branch2。

## .gitignore

- <http://www.gitignore.io/> 各种 git 模板。

    `.gitignore` 中这样配置 `views/**/*.html` ，可以排除

    	view/a.html
    	view/b/c.html
    	view/d/e/f.html

- 反排除

        node_modules/*
        !node_modules/app-widget
