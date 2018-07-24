layout: post
title: "VIM Tutorial"
category : Tool
tags : [tool, vim]
---

[Vim](http://www.vim.org/) the Six Billion Dollar editor

> Better, Stronger, Faster.

学习 [vim](http://www.vim.org/) 并且其会成为你最后一个使用的文本编辑器。没有比这个更好的文本编辑器了，非常地难学，但是却不可思议地好用。

我建议下面这四个步骤：

1.  存活
2.  感觉良好
3.  觉得更好，更强，更快
4.  使用VIM的超能力

当你走完这篇文章，你会成为一个vim的 superstar。

在开始学习以前，我需要给你一些警告：

* 学习vim在开始时是痛苦的。
* 需要时间
* 需要不断地练习，就像你学习一个乐器一样。
* 不要期望你能在3天内把vim练得比别的编辑器更有效率。
* 事实上，你需要2周时间的苦练，而不是3天。

## 第一级 – 存活

1.  安装 [vim](http://www.vim.org/)
2.  启动 vim
3.  **什么也别干！**请先阅读

当你安装好一个编辑器后，你一定会想在其中输入点什么东西，然后看看这个编辑器是什么样子。但vim不是这样的，请按照下面的命令操作：

* 启 动Vim后，vim在 _Normal_ 模式下。
* 让我们进入 _Insert_ 模式，请按下键 i 。(陈皓注：你会看到vim左下角有一个–insert–字样，表示，你可以以插入的方式输入了）
* 此时，你可以输入文本了，就像你用“记事本”一样。
* 如果你想返回 _Normal_ 模式，请按 `ESC` 键。

现在，你知道如何在 _Insert_ 和 _Normal_ 模式下切换了。下面是一些命令，可以让你在 _Normal_ 模式下幸存下来：

> * `i` → _Insert_ 模式，按 `ESC` 回到 _Normal_ 模式.
> * `x` → 删当前光标所在的一个字符。
> * `:wq` → 存盘 + 退出 (`:w` 存盘, `:q` 退出)   （陈皓注：:w 后可以跟文件名）
> * `dd` → 删除当前行，并把删除的行存到剪贴板里
> * `p` → 粘贴剪贴板
>
> **推荐**:
>
> * `hjkl` (强例推荐使用其移动光标，但不必需) →你也可以使用光标键 (←↓↑→). 注: `j` 就像下箭头。
> * `:help <command>` → 显示相关命令的帮助。你也可以就输入 `:help` 而不跟命令。（陈皓注：退出帮助需要输入:q）

你能在vim幸存下来只需要上述的那5个命令，你就可以编辑文本了，你一定要把这些命令练成一种下意识的状态。于是你就可以开始进阶到第二级了。

当是，在你进入第二级时，需要再说一下 _Normal_ 模式。在一般的编辑器下，当你需要copy一段文字的时候，你需要使用 `Ctrl` 键，比如：`Ctrl-C`。也就是说，Ctrl键就好像功能键一样，当你按下了功能键Ctrl后，C就不在是C了，而且就是一个命令或是一个快键键了，**在VIM的Normal模式下，所有的键就是功能键了**。这个你需要知道。

标记:

* 下面的文字中，如果是 `Ctrl-λ`我会写成 `<C-λ>`.
* 以 `:` 开始的命令你需要输入 `<enter>`回车，例如 — 如果我写成 `:q` 也就是说你要输入 `:q<enter>`.

上面的那些命令只能让你存活下来，现在是时候学习一些更多的命令了，下面是我的建议：（陈皓注：所有的命令都需要在Normal模式下使用，如果你不知道现在在什么样的模式，你就狂按几次ESC键）

## 各种插入模式

* `a` → 在光标后插入
* `o` → 在当前行后插入一个新行
* `O` → 在当前行前插入一个新行
* `cw` → 替换从光标所在位置后到一个单词结尾的字符

## 简单的移动光标

** `0` → 数字零，到行头
* `^` → 到本行第一个不是blank字符的位置（所谓blank字符就是空格，tab，换行，回车等）
* `$` → 到本行行尾
* `g_` → 到本行最后一个不是blank字符的位置。
* `/pattern` → 搜索 `pattern` 的字符串（陈皓注：如果搜索出多个匹配，可按n键到下一个）

**单词级**

* `w` or `W` 向右移动到下一单词开头
* `e` or `E` 向右移动到单词结尾
* `b` or `B` 向左移动到单词开头

_注意：所有小写单词都是以分词符作为单词界限，大写字母以空格作为界限_

**块级**

* `gg` 到文档第一行
* `G` 到文档最后一行
* `0` 到行首（第 1 列）
* `^` 到第一个非空白字符
* `$` 到行尾
* `Ctrl-d` 向下移动半页
* `Ctrl-u` 向上移动半页
* `Ctrl-f` 向下移动一页
* `Ctrl-b` 向上移动一页
* `:<N>` or `<N>gg` 跳转到第 N 行
* `:+<N>` or `<N>j` 向下跳 N 行
* `:-<N>` or `<N>k` 向上跳 N 行

_注意：所有命令前都可以加一个数字 N，表示对后面的命令执行 N 次，例如你想向下移动 3 行，除了
可以用 `:+3` 之外，还可以用 `3j` 来实现同样的效果。另外，上面实际上有两种命令：一种是键入后
立即执行的，比如 `gg`；还有一种是先输入 `:` 的（后面还会出现先按 `/` 的），这类命令需要在
输入完成后按回车执行，后面的教程中也是一样。_

## **拷贝/粘贴**

（陈皓注：p/P都可以，p是表示在当前位置之后，P表示在当前位置之前）  

* `P` → 粘贴
* `yy` → 拷贝当前行当行于 `ddP`

## **Undo/Redo**  

* `u` → undo
* `<C-r>` → redo

## 文件操作

打开/保存/退出/改变文件

* `:e <path/to/file>` → 打开一个文件
* `:w` → 存盘
* `:saveas <path/to/file>` → 另存为 `<path/to/file>`
* `:x`， `ZZ` 或 `:wq` → 保存并退出 (`:x` 表示仅在需要时保存，ZZ不需要输入冒号并回车)
* `:q!` → 退出不保存 `:qa!` 强行退出所有的正在编辑的文件，就算别的文件有更改。
* `:bn` 和 `:bp` → 你可以同时打开很多文件，使用这两个命令来切换下一个或上一个文件。（陈皓注：我喜欢使用:n到下一个文件）
* `:Ex` 在 vim 中打开目录树，光标选中后回车打开对应文件（提示：`-` 进入上级目录）

花点时间熟悉一下上面的命令，一旦你掌握他们了，你就几乎可以干其它编辑器都能干的事了。但是到现在为止，你还是觉得使用vim还是有点笨拙，不过没关系，你可以进阶到第三级了。

## 查找

### 文档内查找

* `*` 向后查找光标当前所在单词
* `#` 向前查找光标当前所在单词
* `/<search>` 向后查找指定字符串
* `?<search>` 向前查找指定字符串
* `n` 继续查找下一个
* `N` 继续查找上一个

_注意： `n` 和 `N` 是有方向性的，若你之前通过 `*` 查找，则 `n` 会继续向文档尾方向查找，`N`
向文档首方向；反之，若你通过 `#` 查找，则 `n` 指向文档首，`N` 指向文档尾_

### 行内查找

* `f<X>` 当前行内向行尾方向查找并定位到字符 `X`
* `t<X>` 当前行内向行尾方向查找并定位到字符 `X` 之前
* `F<X>` 当前行内向行首方向查找并定位到字符 `X`
* `T<X>` 当前行内向行首方向查找并定位到字符 `X` 之后
* `;` 继续向当前方向查找下一个字符
* `,` 向当前相反方向查找下一个字符

> 当前文档中有几个 “vim” 单词，你可以尝试用 `*` 和 `#` 进行查找并感受 `n` 和 `N` 的方向性。
>
> 上面的 “注意” 中有几个字符 "n"，你可以在那试试行内查找并感受下 `;` 和 `,` 的方向性。

### 匹配查找

vim 中可以使用 `%` 对 `(` 和 `)`，`[` 和 `]`，`{` 和 `}` 进行匹配查找，当光标位于其中一个
符号上时，按下 `%`，光标会跳到与之匹配的另外一个符号上。

> 在下列文本中的 `()[]{}` 字符上按 `%` 看看效果，连续多按几次。

<pre>
(function(win, doc) {
    var n = ((1 + 2) \* (3 + 4)) / 7;
    var a = [1, 2, 3, 4, 5, 6, 7];
    var f = function(b) {
        if(b) {
            return false;
        } else {
            return true;
        }
    };
})(window, document);
</pre>

[下一章](https://github.com/dofy/learn-vim/blob/master/file-three.md)将介绍文档的修改，在这之前先简单介绍一下 vim 的 buffer，简单理解
buffer 就是当前 vim session 的文件历史记录。

> 现在你的 buffer 中应该已经有两个文件了，你可以用 `:buffers` 或 `:ls` 命令查看，看到
> buffer 列表了吧，大概是这个样子的：

```
:ls
  1 #h   "file-one.md"                  line 47
  2 %a   "file-two.md"                  line 1
Press ENTER or type command to continue
```

> 接下来你可以尝试通过以下命令在文件缓存中进行跳转了
>
> * `:bn` 打开缓存中下一个文件
> * `:bp` 打开缓存中上一个文件
> * `:b<N>` 打开缓存中第 N 个文件
>
> 你也可以使用 `:bdelete<N>` 来删除所要关闭的缓冲区，缩写 `:bd<N>`。
>
> 当然你也可以使用 `:Ex` 命令，选择 file-three.md 并打开，进入[第三章](https://github.com/dofy/learn-vim/blob/master/file-three.md)。

## 修改文档

### 插入

* `i` 当前字符前插入
* `a` 当前字符后插入
* `I` 行首插入
* `A` 行尾插入
* `o` 在下一行插入
* `O` 在上一行插入

_注意：以上任何一个命令都会使 vim 进入 insert 模式，进入该模式后光标会发生变化，这时输入的
文字会直接出现在文档中，按 `Esc` 键或 `Ctrl-[` 或 `Ctrl-C` 退出 insert 模式。_

### 删除(并保存到 vim 剪贴板)

* `x` 删除当前字符，相当于 insert 模式下的 `Delete`
* `X` 删除前一个字符，相当于 insert 模式下的 `Backspace`
* `dd` 删除当前行，并将删除的内容保存到 vim 剪贴板
* `d<X>` 删除指定内容并保存到 vim 剪贴板
* `c<X>` 删除指定内容并保存到 vim 剪贴板，同时进入 insert 模式

_说明： `<X>` 部分是对操作内容的描述，如果要删除一个单词，就输入 `dw` 或者 `de`，要复制当前
位置到行尾的内容，就输入 `y$`，要删除后面 3 个字符并插入，就输入 `c3l` 诸如此类。_

### 复制

* `yy` 复制当前行到 vim 剪贴板
* `y<X>` 复制指定内容到 vim 剪贴板

### 粘贴

* `p` 在当前位置后粘贴
* `P` 在当前位置前粘贴

### 合并

* `J` 将当前行与下一行合并

> 尝试在下面的文本中进行复制粘贴练习

```
删除这一行
粘贴到这一行下面
剪切 ABC 并把它粘贴到 XYZ 前面，使这部分内容看起来像
剪切 并把它粘贴到 ABC XYZ 前面。
```

### 替换

* `r<X>` 将当前字符替换为 X
* `gu<X>` 将指定的文本转换为小写
* `gU<X>` 将指定的文本转换为大写
* `:%s/<search>/<replace>/` 查找 search 内容并替换为 replace 内容

> 尝试修改下列文本的大小写

```
Change this line to UPPERCASE, THEN TO lowercase.
```

> 还有个更好玩的命令 `g~<X>`，先将光标定位到上面那行文本，执行 `0g~$` 看看发生了什么。

### 撤销、重做

* `u` 撤销
* `Ctrl-r` 重做

### 保存文件

* `:w` 保存当前文件
* `:wa` 保存全部文件
* `:wq` or `ZZ` 保存并退出
* `:q!` or `ZQ` 强制退出，不保存
* `:saveas <new filename>` 文件另存为
* `:w <new filename>` 文件另存一份名为 `<new filename>` 的副本并继续编辑原文件

> 你可以试着把当前（也许已经改得面目全非的）文件另存一份，然后继续[下一章](https://github.com/dofy/learn-vim/blob/master/file-four.md)的学习。

## 一些小技巧

## 简单设置 vim

“工欲善其事，必先利其器”。尽管 vim 非常强大，但默认配置的 vim 看起来还是比较朴素的，为了适合
我们的开发需求，要对 vim 进行一些简单的配置。

* `:set number` 显示行号
* `:set relativenumber` 显示相对行号（这个非常重要，慢慢体会）
* `:set hlsearch` 搜索结果高亮
* `:set autoindent` 自动缩进
* `:set smartindent` 智能缩进
* `:set tabstop=4` 设置 tab 制表符所占宽度为 4
* `:set softtabstop=4` 设置按 `tab` 时缩进的宽度为 4
* `:set shiftwidth=4` 设置自动缩进宽度为 4
* `:set expandtab` 缩进时将 tab 制表符转换为空格
* `:filetype on` 开启文件类型检测
* `:syntax on` 开启语法高亮

这里列出的是命令，你可以通过在 vim 中输入进行设置，但这种方式设置的参数只在本次关闭 vim 前生效，
如果你退出 vim 再打开，之前的设置就失效了。

若要永久生效，需要修改 vim 的一个自动配置文件，一般文件路径是 `/home/<user>/.vimrc`（Linux
系统）或 `/Users/<user>/.vimrc`（Mac OS 系统）

如果没有就新建一个，以 Mac OS 系统为例：

> 在控制台执行如下命令，每行结尾记得回车

<pre>
cd ~
vim .vimrc
</pre>

> 现在你已经在 vim 中打开了你的 vim 专属配置文件，将上面提到的配置复制到你的文件中，记得要删除
> 每行开头的 `:`
>
> 修改完成执行 `:wq` 或者 `ZZ` 保存退出，再次进入 vim 时，你的这些配置就已经生效了
>
> 当然，机智如我也为你准备好了一份 [vimrc](https://github.com/dofy/learn-vim/blob/master/vimrc.vim) 样本文件，你可以在控制台执行
> `cp vimrc.vim ~/.vimrc` 直接使用，再次启动 vim 或在 vim 中执行  `:source ~/.vimrc`你的配置就
> 应该生效了。

_**[ AD ]** 当然你也可以在我维护的另外一个项目 [7th-vim](https://github.com/dofy/7th-vim) 中找到一个更为完整的配置方案。_

## 清除搜索高亮

前面提到的配置中，有一项是高亮全部搜索结果 `:set hlsearch`，其作用是当你执行 `/`
、`?`、`*` 或 `#` 搜索后高亮所有匹配结果。

> 如果你已经设置了这个选项，尝试执行 `/set`

看到效果了吧，搜索结果一目了然，但这有时候也是一种困扰，因为知道搜索结果后高亮就没用了，但高亮
本人并不这样认为，它会一直高亮下去，直到你用 `:set nohlsearch` 将其关闭。

但这样需要就打开，不需要就关闭也不是个办法，有没有更好的解决方案呢？当然！请看下面的终极答案：

> **再搜一个不存在的字符串**

通常我用来清除搜索高亮的命令是 `/lfw`，一是因为 `lfw` 这个组合一般不会出现（不适用于
本文档...），二是这三个字母的组合按起来比较舒服，手指基本不需要怎么移动（你感受一下）。

## 重复上一次命令

vim 有一个特殊的命令 `.`，你可以用它重复执行上一个命令。

> 按下面的说明进行操作

```
按 dd 删除本行
按 . 重复删除操作
2. 再删除两行
这行也没了
p 把刚才删掉的粘回来
3. 又多出 6 行
```

## 缩进

* `>>` 向右缩进当前行
* `<<` 向左缩进当前行

> 在这一行上依次按 `3>>`，`<<` 和 `<G` 看看效果
>
> 打酱油行

## 自动排版

* `==` 自动排版当前行
* `gg=G` 当前文档全文自动排版
* `<N>==` 对从当前行开始的 N 行进行自动排版
* `=<N>j` 对当前行以及向下 N 行进行自动排版
* `=<N>k` 对当前行以及向上 N 行进行自动排版

> 另外，还可以利用[第二章](https://github.com/dofy/learn-vim/blob/master/file-two.md)中提到的匹配搜索对代码块进行批量排版，尝试用
> `gf` 命令打开 file-four-demo.js 按照里面的说明进行操作

如果智能缩进设置生效了，执行后会看到如[第二章](https://github.com/dofy/learn-vim/blob/master/file%EF%BC%8Dtwo.md)中一样的排版效果。

## 分屏与标签页

## 窗口分屏

工作中经常会遇到这种情况，就是需要参照其他文档编辑当前文档（场景：翻译），或者从另外一个文档
copy 代码到当前文档（场景：复制 html 元素类名到 css 文档），这时候就是你最需要分屏的时候。

### 分屏方式

* `:split` 缩写 `:sp` or `Ctrl-w s` 上下分屏
* `:vsplit` 缩写 `:vs` or `Ctrl-w v` 左右分屏
* `:diffsplit` 缩写 `:diffs` diff 模式打开一个分屏，后面可以加上 {filename}

### 窗口跳转

* `Ctrl-w w` 激活下一个窗口
* `Ctrl-w j` 激活下方窗口
* `Ctrl-w k` 激活上方窗口
* `Ctrl-w h` 激活左侧窗口
* `Ctrl-w l` 激活右侧窗口

### 屏幕缩放

* `Ctrl-w =` 平均窗口尺寸
* `Ctrl-w +` 增加高度
* `Ctrl-w -` 缩减高度
* `Ctrl-w _` 最大高度
* `Ctrl-w >` 增加宽度
* `Ctrl-w <` 缩减宽度
* `Ctrl-w |` 最大宽度

> 实践！实践！实践！

## 标签页

[第二章](https://github.com/dofy/learn-vim/blob/master/file-two.md)中提到过的 buffer 和刚刚讲到的分屏操作都很适合在少量文件之间进行切换，
文件超过 3 个我觉得就不方便了，而标签页则更适合多文件之间的切换。

### 创建标签页

* `:tabnew` or `:tabedit` 缩写 `:tabe` 打开新标签页
* `Ctrl-w gf` 在新标签页中打开当前光标所在位置的文件名

_注意：`:tabnew` 和 `:tabedit` 后面都可以跟一个 <空格><文件名> 用以在新标签页中
打开指定文件，还可以在 `:` 后面加一个数字，指出新标签页在列表中的位置（从 0 开始）。_

### 切换标签页

* `gt` or `:tabnext` 缩写 `:tabn` 下一个标签页（最后一个会循环到第一个）
* `gT` or `:tabprevious` 缩写 `:tabp` 上一个标签页（第一个会循环到最后一个）
* `:tabrewind` 缩写 `:tabr` or `:tabfirst` 缩写 `:tabfir` 到第一个
* `:tablast` 缩写 `:tabl` 到最后一个标签页

### 关闭标签页

* `:tabclose` 缩写 `:tabc` 关闭当前标签页
* `:-tabc` 关闭上一个标签页
* `:+tabc` 关闭下一个标签页
* `:tabonly` 缩写 `:tabo` 关闭其他标签页

## 第三级 – 更好，更强，更快

先恭喜你！你干的很不错。我们可以开始一些更为有趣的事了。在第三级，我们只谈那些和vi可以兼容的命令。

### 更好

下面，让我们看一下vim是怎么重复自己的：

1.  `.` → (小数点) 可以重复上一次的命令
2.  N<command> → 重复某个命令N次

下面是一个示例，找开一个文件你可以试试下面的命令：

> * `2dd` → 删除2行
> * `3p` → 粘贴文本3次
> * `100idesu [ESC]` → 会写下 “desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu “
> * `.` → 重复上一个命令—— 100 “desu “.
> * `3.` → 重复 3 次 “desu” (注意：不是 300，你看，VIM多聪明啊).

### 更强

你要让你的光标移动更有效率，你一定要了解下面的这些命令，**千万别跳过**。

1.  N`G` → 到第 N 行 （陈皓注：注意命令中的G是大写的，另我一般使用 : N 到第N行，如 :137 到第137行）
2.  `gg` → 到第一行。（陈皓注：相当于1G，或 :1）
3.  `G` → 到最后一行。
4.  按单词移动：  

    > 1.  `w` → 到下一个单词的开头。
    > 2.  `e` → 到下一个单词的结尾。
    >
    > > 如果你认为单词是由默认方式，那么就用小写的e和w。默认上来说，一个单词由字母，数字和下划线组成（陈皓注：程序变量）
    >
    > > 如果你认为单词是由blank字符分隔符，那么你需要使用大写的E和W。（陈皓注：程序语句）
    >
    > ![Word moves example](http://yannesposito.com/Scratch/img/blog/Learn-Vim-Progressively/word_moves.jpg)

下面，让我来说说最强的光标移动：

> * `%` : 匹配括号移动，包括 `(`, `{`, `[`. （陈皓注：你需要把光标先移到括号上）
> * `*` 和 `#`:  匹配光标当前所在的单词，移动光标到下一个（或上一个）匹配单词（*是下一个，#是上一个）

相信我，上面这三个命令对程序员来说是相当强大的。

#### 更快

你一定要记住光标的移动，因为很多命令都可以和这些移动光标的命令连动。很多命令都可以如下来干：

`<start position><command><end position>`

例如 `0y$` 命令意味着：

* `0` → 先到行头
* `y` → 从这里开始拷贝
* `$` → 拷贝到本行最后一个字符

你可可以输入 `ye`，从当前位置拷贝到本单词的最后一个字符。

你也可以输入 `y2/foo` 来拷贝2个 “foo” 之间的字符串。

还有很多时间并不一定你就一定要按y才会拷贝，下面的命令也会被拷贝：

* `d` (删除 )
* `v` (可视化的选择)
* `gU` (变大写)
* `gu` (变小写)
* 等等

（陈皓注：可视化选择是一个很有意思的命令，你可以先按v，然后移动光标，你就会看到文本被选择，然后，你可能d，也可y，也可以变大写等）

## 块操作

我们经常会遇到这种情况：某处有一个多行文本，我们要把他复制到代码中用来初始化一个数组。 大部分
时候我们会这么做：

- 写好数组声明；
- 把内容复制到中括号内（大概长成下面那段文本的样子）
- 然后行首加 `'` 行尾加 `',`，重复直到最后一行（想象一下这段文本有50行）

> 有了 vim 块操作就不用这么麻烦了，按 `014gg`，然后跟着选中那一行的指示操作。

```javascript
var myArray = [
Ctrl-v 进入块操作，$ 到行尾，j 到下一行（做！）。
按 j 到下一行
下面还好多行，干脆来个 4j 多跳几行
http://www.geekpark.net
http://www.geekpark.net
以后看好行号再跳！现在按 A 插入，然后输入 <单引号><逗号><Esc> 完成第一步。
// Oops... 跳多了，没事，按 k 回到上一行
];
```

> 现在已经完成了第一步，还需要补前面的 `'`，按 `14gg` 回到那一行，再操作一次，但是这次有三个
> 地方要变化一下：
>
> 1. 第一行按 `$` 时改按 `0`，因为这次要在行首插入；
> 1. 末行按 `A` 时改按 `I`，块操作中 `A` 是字符后插入， `I` 是字符前插入；
> 1. 最后按 `<单引号><Esc>`。
>
> 最后再做些收尾工作，`19gg$x` 删掉最后一行结尾处的 `,`，然后 `14gg7==` 把代码缩进一下。
>
> Done!

_注意：选择行首行尾的操作也可以在选择完要处理的内容之后执行，即 `Ctrl-v jjj$',<Esc>`_

接下来我们说说 [vim 中的宏](file-seven.md)。


## 第四级 – Vim 超能力

你只需要掌握前面的命令，你就可以很舒服的使用VIM了。但是，现在，我们向你介绍的是VIM杀手级的功能。下面这些功能是我只用vim的原因。

### 在当前行上移动光标: `0` `^` `$` `f` `F` `t` `T` `,` `;`

> * `0` → 到行头
> * `^` → 到本行的第一个非blank字符
> * `$` → 到行尾
> * `g_` → 到本行最后一个不是blank字符的位置。
> * `fa` → 到下一个为a的字符处，你也可以fs到下一个为s的字符。
> * `t,` → 到逗号前的第一个字符。逗号可以变成其它字符。
> * `3fa` → 在当前行查找第三个出现的a。
> * `F` 和 `T` → 和 `f` 和 `t` 一样，只不过是相反方向。  
>     ![Line moves](http://yannesposito.com/Scratch/img/blog/Learn-Vim-Progressively/line_moves.jpg)

还有一个很有用的命令是 `dt"` → 删除所有的内容，直到遇到双引号—— `"。`

### 区域选择 `<action>a<object>` 或 `<action>i<object>`

在visual 模式下，这些命令很强大，其命令格式为

`<action>a<object>` 和 `<action>i<object>`

* action可以是任何的命令，如 `d` (删除), `y` (拷贝), `v` (可以视模式选择)。
* object 可能是： `w` 一个单词， `W` 一个以空格为分隔的单词， `s` 一个句字， `p` 一个段落。也可以是一个特别的字符：`"、` `'、` `)、` `}、` `]。`

假设你有一个字符串 `(map (+) ("foo"))`.而光标键在第一个 `o `的位置。

> * `vi"` → 会选择 `foo`.
> * `va"` → 会选择 `"foo"`.
> * `vi)` → 会选择 `"foo"`.
> * `va)` → 会选择`("foo")`.
> * `v2i)` → 会选择 `map (+) ("foo")`
> * `v2a)` → 会选择 `(map (+) ("foo"))`

![Text objects selection](http://yannesposito.com/Scratch/img/blog/Learn-Vim-Progressively/textobjects.png)

### 块操作: `<C-v>`

块操作，典型的操作： `0 <C-v> <C-d> I-- [ESC]`

* `^` → 到行头
* `<C-v>` → 开始块操作
* `<C-d>` → 向下移动 (你也可以使用hjkl来移动光标，或是使用%，或是别的)
* `I-- [ESC]` → I是插入，插入“`--`”，按ESC键来为每一行生效。

![Rectangular blocks](http://yannesposito.com/Scratch/img/blog/Learn-Vim-Progressively/rectangular-blocks.gif)

在Windows下的vim，你需要使用 `<C-q>` 而不是 `<C-v>` ，`<C-v>` 是拷贝剪贴板。

### 自动提示： `<C-n>` 和 `<C-p>`

在 Insert 模式下，你可以输入一个词的开头，然后按 `<C-p>或是<C-n>，自动补齐功能就出现了……`

``![Completion](http://yannesposito.com/Scratch/img/blog/Learn-Vim-Progressively/completion.gif)

### 宏录制： `qa` 操作序列 `q`, `@a`, `@@`

* `qa` 把你的操作记录在寄存器 `a。`
* 于是 `@a` 会replay被录制的宏。
* `@@` 是一个快捷键用来replay最新录制的宏。

> **_示例_**
>
> 在一个只有一行且这一行只有“1”的文本中，键入如下命令：
>
> * `qaYp<C-a>q`→
>
>     * `qa` 开始录制
>     * `Yp` 复制行.
>     * `<C-a>` 增加1.
>     * `q` 停止录制.
>
> * `@a` → 在1下面写下 2
> * `@@` → 在2 正面写下3
> * 现在做 `100@@` 会创建新的100行，并把数据增加到 103.

![Macros](http://yannesposito.com/Scratch/img/blog/Learn-Vim-Progressively/macros.gif)

### 可视化选择： `v`,`V`,`<C-v>`

前面，我们看到了 `<C-v>`的示例 （在Windows下应该是<C-q>），我们可以使用 `v` 和 `V`。一但被选好了，你可以做下面的事：

* `J` → 把所有的行连接起来（变成一行）
* `<` 或 `>` → 左右缩进
* `=` → 自动给缩进 （陈皓注：这个功能相当强大，我太喜欢了）

![Autoindent](http://yannesposito.com/Scratch/img/blog/Learn-Vim-Progressively/autoindent.gif)

在所有被选择的行后加上点东西：

* `<C-v>`
* 选中相关的行 (可使用 `j` 或 `<C-d>` 或是 `/pattern` 或是 `%` 等……)
* `$` 到行最后
* `A`, 输入字符串，按 `ESC。`

![Append to many lines](http://yannesposito.com/Scratch/img/blog/Learn-Vim-Progressively/append-to-many-lines.gif)

### 分屏: `:split` 和 `vsplit`.

下面是主要的命令，你可以使用VIM的帮助 `:help split`. 你可以参考本站以前的一篇文章[VIM分屏](https://coolshell.cn/articles/1679.html "Vim的分屏功能")。

> * `:split` → 创建分屏 (`:vsplit`创建垂直分屏)
> * `<C-w><dir>` : dir就是方向，可以是 `hjkl` 或是 ←↓↑→ 中的一个，其用来切换分屏。
> * `<C-w>_` (或 `<C-w>|`) : 最大化尺寸 (<C-w>| 垂直分屏)
> * `<C-w>+` (或 `<C-w>-`) : 增加尺寸

![Split](http://yannesposito.com/Scratch/img/blog/Learn-Vim-Progressively/split.gif)

### 结束语

* 上面是作者最常用的90%的命令。
* 我建议你每天都学1到2个新的命令。
* 在两到三周后，你会感到vim的强大的。

* 有时候，学习VIM就像是在死背一些东西。
* 幸运的是，vim有很多很不错的工具和优秀的文档。
* 运行vimtutor直到你熟悉了那些基本命令。
* 其在线帮助文档中你应该要仔细阅读的是 `:help usr_02.txt`.
* 你会学习到诸如  `!，` 目录，寄存器，插件等很多其它的功能。

学习vim就像学弹钢琴一样，一旦学会，受益无穷。

## Bundle

完整列表在此：<http://vim-scripts.org/vim/scripts.html>

"语法及高亮主要支持了JavaScript/jQuery/HTML5/LESS/Markdown

```shell
Bundle 'DirDiff.vim'
Bundle 'lookupfile'
Bundle 'The-NERD-tree'
Bundle 'taglist.vim'
Bundle 'genutils'
Bundle 'AutoComplPop'
```

"HTML/JS混排缩进改善

    Bundle "pangloss/vim-javascript"

"代码自动补全

    Bundle 'Shougo/neocomplcache'

## Tutorial

- [简明 Vim 练级攻略](http://coolshell.cn/articles/5426.html)
- [拼装的艺术：vim之IDE进化实录](http://blog.csdn.net/yangyang_gnu/article/details/6642271)
- [手把手教你把Vim改装成一个IDE编程环境(图文)](http://blog.csdn.net/wooin/article/details/1858917)
- [谁说Vim不是IDE？（一）](http://www.cnblogs.com/chijianqiang/archive/2012/10/30/vim-1.html)
- [将Vim改造为强大的IDE—Vim集成](http://blog.csdn.net/bokee/article/details/6633193)
- <http://blog.csdn.net/bokee/article/details/6633193>
