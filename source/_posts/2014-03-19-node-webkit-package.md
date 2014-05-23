---
layout: post
title: "使用 Node-Webkit 打包 Web 应用"
category: Node
tags: [node, webkit]
--- 
本教程仅针对Windows，其他平台请直接参考[rogerwang/node-webkit](https://github.com/rogerwang/node-webkit)。

## 下载

- 下载 [node-webkit-v0.9.2-win-ia32](http://dl.node-webkit.org/v0.9.2/node-webkit-v0.9.2-win-ia32.zip) 。这个版本为当前最新，请到[官网](https://github.com/rogerwang/node-webkit)关注最新版本。

我们把内容解压缩到`node-webkit/`文件夹中。

<!--more-->

## 创建 `package.json`

    {
      "name": "nw-demo",
      "main": "index.html"
    }

其他常用配置请参考：[Manifest format · rogerwang/node-webkit Wiki](https://github.com/rogerwang/node-webkit/wiki/Manifest-format)

常用的配置如：

    {
      "main": "index.html",
      "name": "nw-demo",
      "description": "demo app of node-webkit",
      "version": "0.1.0",
      "keywords": [ "demo", "node-webkit" ],
      "window": {
        "title": "node-webkit demo",
        "icon": "link.png",
        "toolbar": true,
        "frame": false,
        "width": 800,
        "height": 500,
        "position": "mouse",
        "min_width": 400,
        "min_height": 200,
        "max_width": 800,
        "max_height": 600
      }
    }

其中icon要求的格式为PNG或者JPG。

## 运行

可以使用两种方案运行，一种是将网页内容（和index.html平行的内容）+package.json打包，然后拷贝到`node-webkit/`文件夹中；另一种是将`node-webkit/`内容拷贝到网页所在的文件夹中。

### 压缩 App

将你的网页内容（主页是index.html）和上述的`package.json`压缩为zip，如`app.zip`，将`app.zip`改名为`app.nw`。

完成上述步骤可以通过压缩软件，也可以通过命令：

    zip app.nw index.html package.json

注意，不要压缩`index.html`所在的目录，而是该目录下的内容。最终`app.nw`的结构如下：

    app.nw
    |-- package.json
    |-- ...
    `-- index.html

将app.nw拷贝到`node-webkit/`下，`node-webkit/`目前的文件结构如下：

- app.exe
- app.nw
- ffmpegsumo.dll
- icudt.dll
- libEGL.dll
- libGLESv2.dll
- nw.exe
- nw.pak
- nwsnapshot.exe

运行请执行以下命令：

    nw.exe app.nw

可以通过以下命令将`app.nw`合并到`nw.exe`中：

    copy /b nw.exe+app.nw app.exe 

有两个工具可以同时执行压缩和合并，分别为：

- [nodebob](https://github.com/geo8bit/nodebob) 使用Windows Bat脚本写的工具，只适用于Windows，并且只能打包为Windows的可执行程序。
- [grunt-node-webkit-builder](https://github.com/mllrsohn/grunt-node-webkit-builder) 使用Grunt工具，可以构建Linux、Windows、Mac平台的可执行程序。

两者最终生成的目录结构为：

- ffmpegsumo.dll
- icudt.dll
- libEGL.dll
- libGLESv2.dll
- nw.exe
- nw.pak

其中nw.exe为可执行程序（包含nw文件），其他为依赖项，依赖项的作用分别为：

- __nw.pak__ contains important javascript lib files. Required.
- __icudt.dll__ a important network library. Required.
- __ffmpegsumo.dll__  media library, if you want to use `<video>` and `<audio>` tag, or other media related features, you should ship it.
- __libEGL.dll__ used for WebGL. Recomended.
- __libGLESv2.dll__ used for GPU acceleration Recomended.
- __D3DCompiler_43.dll d3dx9_43.dll__  if you want to make sure WebGL works on more hardware. These 2 files are from DirectX redistributable. 

注意：采用合并的方式需要为每个平台提供单独的可执行程序，否则可以提供nw压缩包，在不同的note-webkit中运行。

参考：[How to package and distribute your apps · rogerwang/node-webkit Wiki](https://github.com/rogerwang/node-webkit/wiki/How-to-package-and-distribute-your-apps)

### 不压缩 App

将`package.json`拷贝到跟`index.html`平行的目录，然后将下载的`node-webkit`离线包中的文件拷贝到和`package.json`平行的目录。最终的文件结构：

- index.html
- ... Other website content
- ffmpegsumo.dll
- icon.png
- icudt.dll
- libEGL.dll
- libGLESv2.dll
- nw.exe
- nw.pak
- package.json

指点单击`nw.exe`即可运行。

## 打包

### 单一可执行文件

接下来我们可以将所有文件打包成一个可执行程序，使用的工具为：[Enigma Virtual Box](http://enigmaprotector.com/en/aboutvb.html)。

使用方法：

- [下载](http://enigmaprotector.com/assets/files/enigmavb.exe)
- 安装并打开。
- 对于中文用户可以在`Language`菜单中选择`Chinese`
- 在`请选择待封包的主程`中浏览和选择主程序，如nw.exe。
- 拖拽（或者单击`Add`按钮）所有依赖项，包括`*.dll`和nw.pak到`File`选项卡的空白处。
- 选择选择`文件选项`，选择`压缩文件`来压缩。尽管这样可以在一定程度上较小压缩包的大小，但不建议这么做，因为或拖慢最终可执行程序的速度。
- 点击`执行封包`。

    ![Enigma Virtual Box](http://johnnyimages.qiniudn.com/enigma-virtual-box.png)

也可以使用命令：

  enigmavbconsole project.evb

其中project.evb为工程文件，我们可以在GUI工具中配置好后保存为工程文件。

### 修改可执行文件图标

参考：[Icons · rogerwang/node-webkit Wiki](https://github.com/rogerwang/node-webkit/wiki/Icons)

默认情况下，可执行文件的图标为nw.exe的图标，如果我们需要自定义，需要使用 `resource editor`。官方推荐的为 [Resource Hacker](http://www.angusj.com/resourcehacker/)。

使用教程为：

参考 [How to Change the Default Icon of an Exe using Resource Editor / Resource Hacker? - TIPS 'n' TRICKS](http://www.techtalkz.com/tips-n-tricks/3866-how-change-default-icon-exe-using-resource-editor-resource-hacker.html)

1. Get a Resource Editor. I strongly recomend [Resource Hacker](http://www.angusj.com/resourcehacker/). 
2. Open your Executable app in it. 
3. You can see the resources in the exe there. In the Left Pane Choose Icons> Icon No>Right Click> Replace.

    ![Resource Hacker](http://johnnyimages.qiniudn.com/resource-hacker.png)

4. Browse any other Executable or icon file.
5. Repeat Steps 3 & 4 for all other icons remaining.
6. Save exe & Enjoy!

接下来，你就可以将你的程序发布给你的客户了，步骤有点儿繁琐，最终的可执行文件有一定的大小。除了打包成一个可执行文件和修改图标，其他均可以使用批处理文件完成。

同样可以使用命令行工具：

  ResHacker.exe -addoverwrite Project.exe, Project1.exe, "html5_logo.ico", ICONGROUP, IDR_MAINFRAME, 1033

参考：[delphi - Using Resource Hacker for changing the icon after the build - Stack Overflow](http://stackoverflow.com/questions/5165594/using-resource-hacker-for-changing-the-icon-after-the-build)

## Reference

- [你所不知道的Node-webkit](http://blog.whattoc.com/2013/12/16/node-webkit01/)
- [Build Desktop Apps with JavaScript and Node WebKit](http://flippinawesome.org/2014/02/10/build-desktop-apps-with-javascript-and-node-webkit/)

## Other

- [heX - 指南](http://hex.youdao.com/zh-cn/tutorial/index.html)