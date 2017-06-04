---
layout: "post"
title: "GitLab Pages"
categories: GitLab
tags: [gitlab, pages]
---

## Setup

- [How to Enable GitLab Pages for GitLab CE and EE - YouTube](https://www.youtube.com/watch?v=dD8c7WNcc6s&feature=youtu.be)
- [gitlab-ci-multi-runner · GitLab](https://gitlab.com/gitlab-org/gitlab-ci-multi-runner/blob/master/docs/commands/README.md)

## FAQ

### 提交了代码没有触发，一直停留在pending

报错：This job is stuck, because you don't have any active runners that can run this job.

原因：  注册gitlab runner 的时候，有一步提示：

```dockerfile
Can run untagged jobs: [false/true]
```

默认值为false。这句话的意思是：是否在没有标记`tag`的job上运行，如果选择默认值`false`，那没有标记`tag`的代码提交是不会触发gitlab runner的，如果做测试，最好填`true`。

### 如何提升权限

gitlab runner默认运行时`user mode`，想提升权限，只需要运行gitlab runner 的时候使用`sudo`即可。

```dockerfile
sudo gitlab-ci-multi-runner run
```

这样，持续集成调用命令的时候，就可以执行`super-user`权限了。

> via: https://gitlab.com/gitlab-org/gitlab-ci-multi-runner/blob/master/docs/commands/README.md

You still have to start the runner:

Execute `gitlab-ci-multi-runner start` to start the service, or `gitlab-ci-multi-runner run` to run it directly in the terminal.

### Docker endpoint with name XXX already exists in network bridge

See [Error response from daemon: endpoint with name XXX already exists in network bridge (#2400) · Issues · GitLab.org / gitlab-ci-multi-runner · GitLab](https://gitlab.com/gitlab-org/gitlab-ci-multi-runner/issues/2400)

```
systemctl restart docker
```