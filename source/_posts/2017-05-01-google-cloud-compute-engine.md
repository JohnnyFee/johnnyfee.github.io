---
layout: "post"
title: "GOOGLE COMPUTE ENGINE(GCE)注册开VPS教程"
categories: Google
tags: [centos, google cloud, gcloud]
---

See [GOOGLE COMPUTE ENGINE(GCE)注册开VPS教程](https://www.91yun.org/archives/2297)

## FAQ

### Google Cloud ssh timeout: how to increase session time?

[Google Cloud ssh timeout: how to increase session time? - Stack Overflow](https://stackoverflow.com/questions/30078348/google-cloud-ssh-timeout-how-to-increase-session-time)

See [Tips, Troubleshooting, & Known Issues](https://cloud.google.com/compute/docs/troubleshooting#communicatewithinternet)
  
MAC:

```
sudo sysctl -w net.inet.tcp.always_keepalive=1 net.inet.tcp.keepidle=60000 net.inet.tcp.keepinit=60000 net.inet.tcp.keepintvl=60000
```

[macos - How can I prevent an SSH session from hanging in OS X Terminal? - Ask Different](https://apple.stackexchange.com/questions/36690/how-can-i-prevent-an-ssh-session-from-hanging-in-os-x-terminal)

You can:

Configure your system, system-wide, for all connections
By editing: **/etc/ssh/ssh_config**
And add the line:

```
ServerAliveInterval 10
```

Or, per-server **~/.ssh/config**

```
Host keepsdroppingme.com
   ServerAliveInterval 10
```