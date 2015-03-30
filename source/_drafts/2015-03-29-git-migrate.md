layout: post
title: "GIT 数据迁移"
category : Git
tags : [git]
---

__安装cygwin__

按照《gitolite + cygwin + windows xp》要求安装cygwin(版本v2.852，gitolite

__当客户端安装完git时请按照以下步骤进行__

1.把旧的 _id_rsa.pub_ (gitolite管理员证书)上传到服务器的git目录下.

   - 客户端在桌面右键打开git bash.
   - 输入 `scp id_rsa.pub`(相对路径)  _git@server:id_rsa.pub_

2. 初始化 gitolite

    - 输入 `ssh git@server` 登录到服务器server(先删除 `.ssh/known_hosts`)
    - 输入 `mkdir -p $home/bin`
    - 输入 `./gitolite/install -t $home/bin`
    - 输入 `$home/bin/gitolite setup -pk ./id_rsa.pub` 
    - 输入 exit 离开 ssh

3. 克隆gitolite管理

    - git clone git@server:gitolite-admin(如果提示输入密码，则前面的设置有问题，需要重新安装cygwin,gitolite)
    - 找到旧的gitolite-admin/keydir,gitolite-admin/conf，覆盖刚刚clone的gitolite-admin目录下，然后add,commit,push
    - 登录 server，将旧的repository覆盖到新的git目录下
    
4. 客户端测试git
         
- 删除 _%USERPROFILE%\.ssh\known_hosts_
- 在 cmd 命令行中执行 `git clone server:testing`，当遇到 `yes/no `提示时选择 yes。 (如果提示输入密码，请重装git)
- 使用smartgit进行push操作