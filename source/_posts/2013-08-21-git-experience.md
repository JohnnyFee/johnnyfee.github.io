---
layout: post
title: "Git Experience"
description: ""
category: Git
tags: [git]
--- 
## 新增远程库[^1]

	git remote add repo_b username@host:path/to/repository.git
	git pull repo_b master

<!--more-->

## FAQ

`.gitignore` 中这样配置 `views/**/*.html` ，可以排除

	view/a.html
	view/b/c.html
	view/d/e/f.html


[^1]: http://stackoverflow.com/questions/4131164/git-pulling-from-another-local-repository