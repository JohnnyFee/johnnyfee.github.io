---
layout: post
title: "Git tutorial"
description: ""
category: Git
tags: [git]
--- 

## Git 详解

* [Git详解之一：Git起步](http://blog.jobbole.com/25775/)
* [Git详解之二：Git基础](http://blog.jobbole.com/25808/)
* [Git详解之三：Git分支](http://blog.jobbole.com/25877/)
* [Git详解之四：服务器上的Git](http://blog.jobbole.com/25944/)
* [Git详解之五：分布式Git](http://blog.jobbole.com/25660/)
* [Git详解之六：Git工具](http://blog.jobbole.com/26112/)
* [Git详解之七：自定义Git](http://blog.jobbole.com/26131/)
* [Git详解之八：Git与其他系统](http://blog.jobbole.com/26198/)
* [Git详解之九：Git内部原理](http://blog.jobbole.com/26209/)

## Quick Start

### clone

执行如下命令以创建一个本地仓库的克隆版本：

```shell
git clone /path/to/repository 
```

如果是远端服务器上的仓库，你的命令会是这个样子：

```shell
git clone username@host:/path/to/repositor
```

### add and commit

暂存已修改文件（把它们添加到暂存区），使用如下命令：

    git add <filename>
    git add *

这是 git 基本工作流程的第一步；使用如下命令以实际提交改动：

    git commit -m "代码提交信息"

现在，你的改动已经提交到了 HEAD，但是还没到你的远端仓库。

__跳过使用暂存区域__

尽管使用暂存区域的方式可以精心准备要提交的细节，但有时候这么做略显繁琐。Git 提供了一个跳过使用暂存区域的方式，只要在提交的时候，给 git commit 加上-a 选项，Git 就会自动把所有已经跟踪过的文件暂存起来一并提交，从而跳过 git add 步骤：

```shell
$ git status
# On branch master
#
# Changed but not updated:
#
#   modified:   benchmarks.rb
#
$ git commit -a -m 'added new benchmarks'
```

    [master 83e38c7] added new benchmarks
     1 files changed, 5 insertions(+), 0 deletions(-)

看到了吗？提交之前不再需要 git add 文件 benchmarks.rb 了。

## rm

一般情况下，你通常直接在文件管理器中把没用的文件删了，或者用rm命令删了：

    $ rm test.txt
    

这个时候，Git知道你删除了文件，因此，工作区和版本库就不一致了，_git status_命令会立刻告诉你哪些文件被删除了：

    $ git status
    # On branch master
    # Changes not staged for commit:
    #   (use "git add/rm <file>..." to update what will be committed)
    #   (use "git checkout -- <file>..." to discard changes in working directory)
    #
    #       deleted:    test.txt
    #
    no changes added to commit (use "git add" and/or "git commit -a")
    

现在你有两个选择，一是确实要从版本库中删除该文件，那就用命令_git rm_删掉，并且commit：

    $ git rm test.txt
    rm 'test.txt'
    $ git commit -m "remove test.txt"
    [master d17efd8] remove test.txt
     1 file changed, 1 deletion(-)
     delete mode 100644 test.txt
    

现在，文件就从版本库中被删除了。

另一种情况是删错了，因为版本库里还有呢，所以可以很轻松地把误删的文件恢复到最新版本：

    $ git checkout -- test.txt

`git checkout` 其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。

### status

要确定哪些文件当前处于什么状态，可以用 git status 命令。

    git status

### push

你的改动现在已经在本地仓库的 HEAD 中了。执行如下命令以将这些改动提交到远端仓库：

    git push origin master

可以把 master 换成你想要推送的任何分支。 

如果你还没有克隆现有仓库，并欲将你的仓库连接到某个远程服务器，你可以使用如下命令添加：

    git remote add origin <server>

如此你就能够将你的改动推送到所添加的服务器上去了。

### branch

创建一个叫做“feature_x”的分支，并切换过去：  

    git checkout -b feature_x  

切换回主分支：  

    git checkout master  

再把新建的分支删掉：  

    git branch -d feature_x  

除非你将分支推送到远端仓库，不然该分支就是 _不为他人所见的_：  

    git push origin <branch>

### pull and merge

要更新你的本地仓库至最新改动，执行：

    git pull

以在你的工作目录中 获取（fetch） 并 合并（merge） 远端的改动。
要合并其他分支到你的当前分支（例如 master），执行：

    git merge <branch>

两种情况下，git 都会尝试去自动合并改动。不幸的是，自动合并并非次次都能成功，并可能导致 冲突（conflicts）。 这时候就需要你修改这些文件来人肉合并这些 冲突（conflicts） 了。改完之后，你需要执行如下命令以将它们标记为合并成功：

    git add <filename>

在合并改动之前，也可以使用如下命令查看：

    git diff <source_branch> <target_branch>

### tag

在软件发布时创建标签，是被推荐的。这是个旧有概念，在 SVN 中也有。可以执行如下命令以创建一个叫做 1.0.0 的标签：

    git tag 1.0.0 1b2e1d63ff

1b2e1d63ff 是你想要标记的提交 ID 的前 10 位字符。使用如下命令获取提交 ID：

    git log

你也可以用该提交 ID 的少一些的前几位，只要它是唯一的。

### reset

从 `reset --HARD` 中恢复提交，使用 `git reflog` 命令就好了. (由 Gittenberg 提供)

### diff

如果你想查看两个分支之间有什么不同之处，你只需要这样做:

    git diff branch1 branch2

### FAQ

内建的图形化 git：

    gitk

彩色的 git 输出：
    
    git config color.ui true

显示历史记录时，只显示一行注释信息：
    
    git config format.pretty oneline

交互地添加文件至缓存区：

    git add -i

## 文件的三种状态

对于任何一个文件，在 Git 内都只有三种状态：

- 已提交（committed）已提交表示该文件已经被安全地保存在本地数据库中了。
- 已修改（modified）已修改表示修改了某个文件，但还没有提交保存。
- 已暂存（staged）已暂存表示把已修改的文件放在下次提交时要保存的清单中。

由此我们看到 Git 管理项目时，文件流转的三个工作区域：Git 的工作目录，暂存区域，以及本地仓库。

![Git详解之一：Git起步](http://jbcdn2.b0.upaiyun.com/2012/08/Git-start6.png)

__基本的 Git 工作流程如下：__

1. 在工作目录中修改某些文件。 
2. 对修改后的文件进行快照，然后保存到暂存区域。 
3. 提交更新，将保存在暂存区域的文件快照永久转储到 Git 目录中。

所以，我们可以从文件所处的位置来判断状态：如果是 Git 目录中保存着的特定版本文件，就属于已提交状态；如果作了修改并已放入暂存区域，就属于已暂存状态；如果自上次取出后，作了修改但还没有放到暂存区域，就 是已修改状态。

## .gitignore

一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。我们可以创建一个名为 .gitignore 的文件，列出要忽略的文件模式。来看一个实际的例子：

    $ cat .gitignore *.[oa] *~

第一行告诉 Git 忽略所有以 .o 或 .a 结尾的文件。一般这类对象文件和存档文件都是编译过程中出现的，我们用不着跟踪它们的版本。第二行告诉 Git 忽略所有以波浪符（~）结尾的文件，许多文本编辑软件（比如 Emacs）都用这样的文件名保存副本。此外，你可能还需要忽略 log，tmp 或者 pid 目录，以及自动生成的文档等等。要养成一开始就设置好 .gitignore 文件的习惯，以免将来误提交这类无用的文件。

- 所有空行或者以注释符号 ＃ 开头的行都会被 Git 忽略。
- 可以使用标准的 glob 模式匹配。 * 匹配模式最后跟反斜杠（/）说明要忽略的是目录。 * 要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（!）取反。

所谓的 glob 模式是指 shell 所使用的简化了的正则表达式。星号（*）匹配零个或多个任意字符；[abc] 匹配任何一个列在方括号中的字符（这个例子要么匹配一个 a，要么匹配一个 b，要么匹配一个 c）；问号（?）只匹配一个任意字符；如果在方括号中使用短划线分隔两个字符，表示所有在这两个字符范围内的都可以匹配（比如[0-9] 表示匹配所有 0 到 9 的数字）。

我们再看一个 .gitignore 文件的例子：

```
# 此为注释 – 将被 Git 忽略
*.a       # 忽略所有 .a 结尾的文件
!lib.a    # 但 lib.a 除外
/TODO     # 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
build/    # 忽略 build/ 目录下的所有文件
doc/*.txt # 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
```

文件 .gitignore 的格式规范如下：

- <http://www.gitignore.io/> 各种 git 模板。

    `.gitignore` 中这样配置 `views/**/*.html` ，可以排除

        view/a.html
        view/b/c.html
        view/d/e/f.html

- 反排除

        node_modules/*
        !node_modules/app-widget

## Tutorial

- [Git Community Book 中文版](http://gitbook.liuhui998.com/)
- [Git教程 - 廖雪峰的官方网站](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
- [git 使用简易指南](http://www.bootcss.com/p/git-guide/)

## Reference

- [version control - git workflow and rebase vs merge questions - Stack Overflow](http://stackoverflow.com/questions/457927/git-workflow-and-rebase-vs-merge-questions)
- [gitguru » Rebase v Merge in Git](http://gitguru.com/2009/02/03/rebase-v-merge-in-git/)