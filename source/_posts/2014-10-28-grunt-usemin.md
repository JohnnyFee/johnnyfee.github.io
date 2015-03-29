layout: post
title: "Grunt usemin"
category: Node
tags: [node, grunt]
--- 

[yeoman/grunt-usemin](https://github.com/yeoman/grunt-usemin) 用来将 HTML 文件中（或者 templates/views）中没有优化的 script 和 stylesheets 替换为优化过的版本。

`usemin` 暴露两个内置的任务，分别为：

- `useminPrepare` 为将指定文件中的 usemin block 转换为单独的一行（优化版本）准备配置。这通过为每个优化步骤生成名为 `generated` 的子任务来完成。
- `usemin` 使用优化版本替换 usemin 块，如果在磁盘上可以找到 revisioned 版本，则替换为 revisioned 版本。

<!--more-->

`usemin` 可能用到的插件：

* [`concat`](https://github.com/gruntjs/grunt-contrib-concat) 合并文件 (usually JS or CSS).
* [`uglify`](https://github.com/gruntjs/grunt-contrib-uglify) 压缩 JS 文件。
* [`cssmin`](https://github.com/gruntjs/grunt-contrib-cssmin) 压缩 CSS 文件。
* [`filerev`](https://github.com/yeoman/grunt-filerev) 通过文件内容的哈希重命名静态资源。

`usemin` 的典型步骤是，先使用 `useminPrepare`，然后调用每个优化步骤的 `generated` 子任务，最后调用 `usemin`。如：

```js
// simple build task
grunt.registerTask('build', [
  'useminPrepare',
  'concat:generated',
  'cssmin:generated',
  'uglify:generated',
  'filerev',
  'usemin'
]);
```

关于目录和任务，最主要的区别是 `useminPrepare` 的需要指定输入路径、临时路径（默认为 `.tmp`）和输出路径，这个输出路径用来为处理器管道输出正确的配置，然后 `usemin` 只和输出路径有关，所有需要的资源都应该已经输入到了目标目录中（变化或者只是拷贝）。

合并文件默认生成到临时目录(`.tmp`)下，混淆后的文件默认生成到指定的 dest 目录下。

## useminPrepare

`useminPrepare` 试图为应用到 usemin 块的步骤（如 concatenation and uglify-cation）准备正确的配置。这需要输入目录，临时目录和目标目录。usemin 块中引用的文件要么是相对路径要么是绝对路径（`/images/foo.png` or `../../images/foo.png`）。通过绝对路径引用的文件在指定的搜索路径集合中查找，默认路径为包含 usemin 块的 html/css 文件所在的路径。相对路径引用的文件也在包含 usemin 块文件所在的路径中查找。如果不指定 root，绝对路径和相对路径其实都是相对当前检查的 html/css 文件所在的目录。

`useminPrepare` 任务更新 grunt 配置，以便对被标记的文件（i.e. usemin 块）应用配置好的变化流程。JS 的默认变换流程由 `concat` 和 `uglifyjs` 组成，当可以配置。

usemin 块可以如下表达:

```html
<!-- build:<type>(alternate search path) <path> -->
... HTML Markup, list of script / link tags.
<!-- endbuild -->
```

* **type**: 可以是 `js`, `css` 或者使用 [block replacement function](https://github.com/yeoman/grunt-usemin#blockreplacements) 定义的自定义类型。
* **alternate search path**: (可选) 默认情况下，输入文件时相对 usemin 块所在的文件，Alternate search path 让你改变相对路径。这个对应 `options.root` 选项。
* **path**: 优化后的文件路径。

如:

```html
<!-- build:js js/app.js -->
<script src="js/app.js"></script>
<script src="js/controllers/thing-controller.js"></script>
<script src="js/models/thing-model.js"></script>
<script src="js/views/thing-view.js"></script>
<!-- endbuild -->
```

### 变换流程

变换流程有有序的步骤组成：每个步骤都会变换文件，为了让步骤能够正确执行，`useminPrepare` 会修改配置。

JS 默认流程是 `concat -> uglifyjs`，CSS 的默认流程是 concat --> cssmin。此外，一些后处理器可以进一步地修改配置。`useminPrepare.options.flow` 用来配置流程，可以在目标上指定，也可以在整个任务上指定。你可以分别指定 `steps` 或者后处理器 `post`。

例如，假设目录结构如下：

    |
    +- app
    |   +- index.html
    |   +- assets
    |       +- js
    |          +- foo.js
    |          +- bar.js
    +- dist

我们想优化 `foo.js` and `bar.js`，并生成到使用相对路径的 `optimized.js` 文件中。`index.html` 包含下面的 usemin 块；

```html
<!-- build:js assets/js/optimized.js -->
<script src="assets/js/foo.js"></script>
<script src="assets/js/bar.js"></script>
<!-- endbuild -->
```

如果想让我们的文件生成到 `dist`  目录中，我们可以使用下面的 `useminPrepare` 配置：

```js
{
  useminPrepare: {
    html: 'app/index.html',
    options: {
      dest: 'dist'
    }
  }
}
```

这会产生如下配置：

```js
{
  concat:
  {
    '.tmp/concat/assets/js/optimized.js': [
      'app/assets/js/foo.js',
      'app/assets/js/bar.js'
    ]
  },

  uglify:
  {
    'dist/assets/js/optimized.js': ['.tmp/concat/assets/js/optimized.js']
  }
}
```

### 路径

`useminPrepare` 解析你的 HTML 标签，找到每个 block，然后初始化对应的 Grunt 配置，当 `type=js` 时，使用 `concat/uglify`，当 `type=css` 时，使用 `concat/cssmin`。你不用在指定 concat/uglify/cssmin 的相关配置。

`useminPrepare` 只有一个目标: `html`，这个文件中包含相关文件的列表。例如，在 `Gruntfile.js` 文件中：

```js
useminPrepare: {
  html: 'index.html'
}
```

默认，它会将这个 html 文件所在的目录当做 'root' 目录，其他文件都将相对这个路径。如果你想改变这个根目录，可以使用 `root` 选项。`useminPrepare` 的目标也可以使用 grunt 的 src-dest 文件语法。

__兄弟目录中的  HTML 文件和 资源文件：__

    app
    |
    +- html
    |   +- index.html
    +- assets
    |   +- js
    |      +- foo.js
    |      +- bar.js
    +- dist

我们想优化 `foo.js` and `bar.js`，并且生成到使用绝对路径引用的 `optimized.js` 目录中。`index.html` 包含的 usemin 块：

```html
<!-- build:js /assets/js/optimized.js -->
<script src="/assets/js/foo.js"></script>
<script src="/assets/js/bar.js"></script>
<!-- endbuild -->
```

我们想让文件生成到 `dist` 目录，使用的 `useminPrepare` 配置为：

```js
{
  useminPrepare: {
    html: 'html/index.html',
    options: {
      root: 'app',
      dest: 'dist'
    }
  }
}
```

这会生成下面的配置：

```js
{
  concat:
  {
    '.tmp/concat/assets/js/optimized.js': [
      'app/assets/js/foo.js',
      'app/assets/js/bar.js'
    ]
  },

  uglify:
  {
    'dist/assets/js/optimized.js': ['.tmp/concat/assets/js/optimized.js']
  }
}
```

## usemin

`usemin` 目标使用优化后的文件替换 html/css 中 images, scripts, css 的引用。 `usemin` 任务完成两件事:

* 首先，使用变换流程创建的优化文件替换替换所有的 usemin 块。
* 然后，试图使用 [grunt-filerev](https://github.com/yeoman/grunt-filerev)  创建的 revved 版本替换资源文件（i.e. images, scripts, ...）的引用。

### 查找资源

`usemin` 默认会去找 [grunt-filerev](https://github.com/yeoman/grunt-filerev) 创建的映射对象，该对象存在于 `grunt.filerev.summary`。如果没找到，则会到磁盘上查找。

通过使用 `options.revmap`，你可以提供映射对象。

### 路径

当 `usemin` 试图使用资源的引用替换为他们的 revved 版本时，他们必须查找目录（asset search paths）集合。资源索索路径集合默认是相对当前处理的的文件所在的目录，当让，你可以使用 `options.root` 修改。

__Example 1: file `dist/html/index.html` has the following content:__

```html
<link rel="stylesheet" href="styles/main.css">
<img src="../images/test.png">
```

`usemin` 默认会在 `dist/html` 下查找 revved 版本：

* `styles/main.css`: `main.css` 的 revved 版本会在 `dist/html/styles` 下找到。比如 `dist/html/styles/main.1234.css` 会被匹配到，而 `dist/html/main.1234.css` 不会被匹配，引用文件的路径很重要。
* `../images/test.png`: `test.png` 的 revved 版本会在 `dist/images` 查找。

__Example 2: file `dist/html/index.html` has the following content:__

```js
<link rel="stylesheet" href="/styles/main.css">
<img src="/images/test.png">
```

`usemin` 默认会在 `dist/html` 下查找 `styles/main.css` 和 `images/test.png` 的 revved 版本。假设我们的资源分散在 `dist/assets`，通过修改资源的搜索路径列表为 `['dist/assets']`，revved 版本就会在 `dist/assets` 下找到（如 `dist/assets/images/test.875487.png` and `dist/assets/styles/main.98090.css`）。如：

```js
usemin: {
  html: 'dist/html/index.html',
  options: {
    assetsDirs: ['dist/assets']
  }
}
```
