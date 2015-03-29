layout: post
title: "Html5 Tutorial"
category: Web
tags: [web, html, tutorial]
--- 

## HTML 元素

### 虚元素

没有结束标签，在其中放置任何内容都不符合 HTML 规范，这类元素称为虚元素，它是一种组织性元素，如 `<hr>`。虚元素有两种表示方法，`<hr>` 和 `<hr />`，建议使用后一种。

### 属性

对于布尔类型的属性，只需要将属性名称添加到元素中即可，如：

    <input disabled>

为布尔值指定一个空字符串或者属性名称字符串也可以达到同样的效果：

    <input disabled="">
    <input disabled="disabled">
    <input disabled="true">

<!--more-->

contenteditable: 

- [The HTML5 Contenteditable Attribute](http://blog.teamtreehouse.com/html5-contenteditable-attribute)
- [HTML5 Local Storage](http://blog.teamtreehouse.com/html5-local-storage)

### 自定义属性

用户可以使用自定义元素，自定义元素必须以 `data-` 开头。如：

    <input disabled="true" data-creator="adam">

### 元素类型

HTML5 规范将元素分为三大类： 

- 元数据元素 （matadata element）用来构建 HTML 的基本结构，以及就如何向浏览器提供信息和指示。
- 流元素（flow element）短语元素的超级。
- 短语元素（phrasing element）HTML 的基本成分。

## 文档结构

可以使用 base 标签来设置基准 URL，让 HTML 文档中的相对链接在此基础上进行解析。如：

```html
<head>
    <title></title>
    <base href="http://titan/listings" />
</head>
```

如果在页面中 `<a>` 的超链接为 page2.html，则浏览器会将 `<a>` 的完整路径解析为 "http://titan/listings/page2.html"。如果不指定 base，在 "http://myserver.com/app/page1.html" 页面中，对于 `<a href="page2.html"></a>` 完整路径为  "http://myserver.com/app/page2.html"。

### 元数据

#### 指定名/值元数据对

指定名值元数据对，如：

```html
<head>
    <meta name="author" content="Adam Freeman"/>
    <meta name="description" content="A simple example"/>
</head>
```

供 meta 元素使用的预定义的元数据有：

- application name 当前页所属 Web 应用系统的名称。
- author 当前页的作者名
- description 当前页的描述
- generator 用来成成 HTMl 的软件名称，如ASP.NET等。
- keywords 以逗号分隔的字符串，用来描述页面的内容。

#### 声明字符编码

    <meta charset="utf-8">

#### 模拟 HTTP 表字段

如让浏览器每个 5 秒刷新 1 次：

    <meta http-equiv="refresh" content="5">

除了 `refresh` 属性中，另外一个常用的属性为 `content-tyle`，使用这个属性也可以指定 HTML 页面的编码： `<meta http-equiv="content-type" content="text/html charset=UTF-8">`

### DOCTYPE 元素

DOCTYPE 告诉浏览器两件事：第一，它处理的是 HTML 文档；第二，用来标志文档内容的 HTML 所属的版本。

XHTML的声明太长了，我相信很少会有前端开发人员能手写出这个Doctype声明。

```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

HTML5的 Doctype 声明很短，看到这个声明相信你马上就能记住，不用浪费脑细胞去记那长的有点变态的 XHTML 的 Doctype 声明了。

    <!DOCTYPE html>

HTML5 的简短的 DOCTYPE 声明是让 Firefox、Chrome 等现代浏览器和 IE6/7/8 等浏览器都进入(准)标准模式，你可能会奇怪 IE6/7 居然也可以支持HTML5 Doctype，事实上，IE是只要doctype符合这种格式，都会进入标准模式。

### link

link 元素用来在 HTML 文档中引入外部资源，link 常用的属性为：

- href 指向的资源的 URL
- media 说明所关联的内容用于哪种设备。
- ref 所关联资源的类型。
- sizes 指定图标的大小。
- type 关联资源的 MINE 类型，如 text/css、image/x-icon

其中，ref 常用的属性有：

- author: 链接到文档的作者
- icon: 指定图标资源
- prefetch: 预先获取一个资源
- stylesheet: 外辱外部样式表

#### 载入外部样式

如：载入外部的 style.css 样式表：

    <link rel="stylesheet" type="text/css" href="style.css">

#### 为页面定义网站标志

    <link rel="shortcut icon" type="image/x-icon" href="favicon.ico">

如果网站图标位于 /favicon.ico ，则可以省略该 link 元素。

    <link rel="stylesheet" type="text/css" href="">

## 标记文字

元素 | 用途 | Example
-----|-------|------
a    | 超链接。将 href 属性设置为绝对或相对 URL，链接指向其他文档的超链接；将 href 属性设置为文档中元素中的 id，则链接指向文档中的相应元素。|
b  | 用来标志一段文字，但不表示特别的强调或重要性。习惯样式为加粗。| I like <b>apple </b> and <b>orange</b>
strong | 表示一段重要文字。| <strong>Warning:</strong> Eating more is bad.
u  | 呈现行元素，没有实际的语义。| Eating <u>too many</u> is bad.
em   | 表示强调。习惯样式为斜体字。| <em>I</em> like apple.
i    | 表示科学术语或外文词语。| Mandarin, properly known as <i>cirtrus reticulata</i>
s    | 表示不精确或不正确的内容| Orange at my local store cost <s>$1</s> &2 for 3.
small | 表示小号字体内容，常用于免责声明和澄清声明。| It costs $1 each <small>(plus tax)</small>
sup/sub | 表示上标或下标 | <sup>1</sup>/<sub>3</sub>
br | 使用与换行也是内容的一部分，切勿用于创建段落或别的内容组。
wbr | 表示成果当前浏览器窗口的内容适合在此换行。
code| 计算机代码 code {font-family: monospace;}
var| 变量 var {font-style: italic;}
samp | 程序输出 samp { font-family: monospace; }
kdb| 用户输入 kdb { font-family: monospace; }
abbr| 表示缩写，无习惯样式 | <abbr title="Florida Department of Citrus">FDOC</abbr>
dfn | 表示术语定义，没有习惯样式。如果要为 dfn 定义 title，则必须定义 title = 所定义的术语。如果 dfn 元素包含一个 abbr 元素，则该缩写词就是要定义的术语。| <dfn title="apple">apple</dfn>
q   | 表示引用内容，属性 cite 用来指定原文章的 URL。习惯样式是使用 :before 和 :after 这两个伪元素选择器在内容前后生成引号。 | <q cite="http://inching.org">Oh, It's my life.</q>
cite | 表示作品的标题。| My favorite book on fruit is <cite>Fruit: Editable, Inedible</cite> by Stuppy.
ruby、rt、rp | 表示东亚预研中的注音符号。ruby 元素表示一段包含注音符号的文字，rt 用来标记注音符号，rp 用来标记供不支持注音符号特性的浏览器显示在注音符号前后的括号。| <ruby>吃<rp>(</rp><rt>chī</rt><rp>)</rp></ruby>
bdo | 指定内容的文本方向。使用的 dir 属性指定方向，rtl（从右到左），ltr（从左到右）。| <bdo dir="rtl"> I love you.</bdo>
bdi | 出于文本方向的考虑将文本与其他内容隔离开来。| 
span | 对一段内容应用全局属性，无任何语义。
mark | 表示与另一段上下文相关而被突出显示的内容。| I would like a  <mark>pair</mark> of <mark>pears</mark>.
ins/del | 表示添加/删除的文本。属性 cite 指定解释添加或删除文字原因的文档的 URL，属性 datetime 用来设置修改时间。| <ins>I', ins.</ins><br/><del>I'm del.</del>
time | 表示时间或日期。如果布尔属性 pubdate 存在，则 time 元素表示的是整个 HTML 文档或离该文档最近的 article 元素的发布日期。datetime 属性以 [RFC 3330](http://tools.ietf.org/html/rfc3339) 规定的格式指定日期或时间。有了 datetime， 可以在元素中以便于阅读的形式设置日期或时间，同时又确保计算机能无歧义地解析指定的日期或时间。  | I bought it at <time datetime="15:00">3 o'clock</time>

align、width、noshade、size、color 属性在 HTML 中已不再使用。

## 组织内容

元素|用途|示例
----|----|------
p   | 段落。HTML 要求浏览器将连在一起的几个空白字符这算为一个空格。 |
div | 无语义。在不在万不得已的情况下最好不要用 div 元素，应尽可能考虑那些具有语义的元素，如 article、section 等。
pre | 保留 HTML 文档中的布局。最常用的场景是和 code 元素结合使用，用来表示编程语言的代码。| <pre><code>var a; a= 1;</code></pre>
blockquote | 表示引自他处的内容。与 `<q>` 类似，但常用在引用的内容更多的情况下。
hr |都是段落级别的主题转变。可以在 `<blockquote>` 中加入一些 `<hr> ` 形成一定的结构。

### 列表

### 有序列表

ol 和 li 用来生成有序列表。可以通过设置 li 的 value 属性来生成编号不连续的有序列表。ol 的 type 属性用来显示在各列表项旁的编号的类型。

ol 常用的 type 属性为：

值|说明|示例
---|-----|--------
1 | 十进制（默认）| 1. 2. 3.
a | 小写拉丁字母|a. b. c.
A | 大写拉丁字母 | A. B. C.
i | 小写罗马字母 | i. ii. iii. iv
I | 大写罗马字母 | I. II. III. IV.

可以通过 ol 的 start 属性设定列表项相的编号值，默认首项的编号为 1：

    <ol>
        <li>bananas</li>
        <li value="4">mongoes</li>
        <li>cherries</li>
        <li value="7">plums</li>
        <li>peaches</li>
    </ol>

#### 无序列表

ul 无任何局部属性。可以通过 CSS 属性 list-style-type 控制无序列表的样式。

#### 自定义列表

ul 和 li 用来生成无序列表。可以配合 CSS 的 :before 选择器和 counter 特性，可以生成自定义编号的列表。

### 说明列表

dl、dt、dd 用来生成术语极其定义的列表。dl 表示说明列表，dt 表示列表中的术语，表示列表中术语的定义。

```html
<dt>
    <dt>Apple</dt>
    <dd>The apple is the pomaceous fruit of the apple tree.</dd>
    <dd><i>Musa acuminata</i></dd>
    <dt>Orange</dt>
    <dd>The orange is ...</dd>
</dt>
```

### figure

figure、figcaption 通常作为一个成体文档的主题引用，把它从主体中删除也不会影响文档的意思。可以用来表示插图，标题可有可无，可以放在 figure 的头部也可放在尾部。

<figure>
    <figcaption>Listing 23. Using the code element</figcaption>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQanHp0lRoIxq7ejlAKGpksWNF6OTuZPrJEsvlx6d-bcbxe0hT-">
</figure>

## 文档分节

### hgroup

`<hgroup>` 可以用来讲几个标题元素作为一个整体处理，以免搅乱 HTML 文档的大纲。hgroup 主要用来解决子标题的问题。hgroup 元素在从 h1
到 h6 的标题体系中的位置取决于第一个标题子元素。

如：

```html
<hgroup>
    <h1>Fruite I Like</h1>
    <h2>How I learned to Love Citrus</h2>
</hgroup>
<h2>Additional fruites</h2>
```

这样，文档大纲是：

- Fruite I Like
    - Additional fruites

而非：

- Fruite I Like
    - How I learned to Love Citrus
    - Additional fruites

### header & footer

header 元素表示一节的首部，包含适合出现在首部的东西，包括刊头或徽标。header 元素通常包含一个标题元素或一个 hgroup 元素，还可以包含改节的导航元素。

footer 表示一节的尾部，包含该节的总结信息，如作者介绍、版权信息、到相关内容的链接、徽标及免责申明。

```html
<body>
    <header>
        <hgroup>
            <h1>Things I like</h1>
            <h2>by Adam Freeman</h2>    
        </hgroup>
        <section>
            ...
        </section>
    </header>

    <section>
        <header>
            <h1>Archive I like</h1>
        </header>
        <section>
            ...
        </section>
    </section>
</body>
```

### nav

nav 元素是一个可以用于页面导航的链接组。nav 元素可以用于以下场景：

1. 传统导航栏。
2. 侧边栏导航。
3. 页内导航。
4. 翻页操作。

如：

```html
<article>
    <header>
        <h1>HTML 与 CSS3 的历史</h1>
        <nav>
            <ul>
                <li><a href="#HTML">HTML5 的历史</a></li>
                <li><a href="#CSS">CSS3 的历史</a></li>
            </ul>
        </nav>
    </header>
</article>
```

### aside

aside 用来表示跟周边内容稍微沾一点关系的内容，该内容与页面中的其他内容、article、section 有点关系，但并非主题内容的一部分。如：主要内容相关的引用、侧边栏（如评论）、广告、背景信息等。

```html
<article>
    <h1>词法闭包</h1>
    <p>...</p>
    <aside>
        <h1>名词解释</h1>
        <dl>
            <dt>闭包</dt>
            <dd>...</dd>
        </dl>
    </aside>
</article>
```

### article

article 元素代表文档、页面或应用程序中独立的、完整的
可以独立被外部引用的内容。可以是一篇博客或报刊中的文章、一篇论坛帖子、一段用户评论等。

article 可以用自己的标题（一般放在 header 元素中）。

```html
<article>
    <h1>苹果</h1>
    <p>...</p>
    <section>
        <h2>评论</h2>
        <article>
            <h3>发表者：阿萨</h3>
            <p>...</p>
        </article>
    </section>
</article>
```

### section

section 元素的作用是对页面上的内容进行分块，或者说对文章分段。如：

```html
<article>
    <h1>Apple</h1>
    <p>苹果，植物类水果，多次花果...</p>
    <section>
        <h2>红富士</h2>
        <p>红富士是从普通富士的芽...</p>
    </section>
    <section>
        <h2>国光</h2>
        <p>国光苹果品，...</p>
    </section>
</article>
```

section 元素的使用总结：

- 不要将 section 元素用作设置样式的页面容器，那是 div 元素的工作。
- 如果 article 、aside、nav 元素更符合使用条件，不要使用 section 元素。
- 尽量不要为没有标题的内容区块使用 section 元素。

### address

address 元素用来表示文档或 article 元素的联系信息。address 元素不能表示文档或文章的联系信息之外的地址，如不能再文档内容中表示客户或用户的地址。

```html
<article>
    <address>
        Questions and comments? <a href="mailto:hello@123.com">Email me</a>
    </address>
</article>
```

### details

details 元素在文档中生成一个区域，用户可以展示它以了解关于某个主题的更多详情。details 可以包含一个 summary 元素，用于为详情区域生成一个说明标签或标题。

<details>
    <summary>Kinds of Triathlon</summary>
    There are different kinds of triathlon - sprint, Olympic and so on.
    <ol>
        <li>1.5km swim</li>
        <li>40km cycle</li>
    </ol>
</details>

## table

`<table>` 在 CSS 一般不用来布局，主要用来展示二维数据。`<table>` 常用的标签主要有：
- `capttion` 表格标题
- `thead` 表头
- `th` 表头单元格
- `tbody` 主体部分
- `tr` 主体行
- `td` 主体列
- `tfoot` 表脚

### th

可以使用 th 在表格中添加表格单元格：

```html
<table>
    <tr>
        <th>Rank</th>
        <th>Name</th>
        <th>Color</th>
    </tr>
    <tr>
        <th>Favorite</th>
        <td>Apple</td>
        <td>Green</td>
    </tr>
    <tr>
        <th>2nd Favorite</th>
        <td>Orange</td>
        <td>Orange</td>
    </tr>
</table>
```

在一行中可以混合使用 tr 和 td 元素，也可以让一行包含清一色的 th 元素。

### thead & tbody

tbody 表示构成表格主体的全体行——不包括表头行和表脚行，thead 表示表头行，tfoot 表示表脚行。如果没有 thead，tr 元素都会被视为表格主体的一部分。

```html
<table>
    <caption>Results of the 2011 Fruit Survey</caption>
    <thead>
        <th>Rank</th>
        <th>Name</th>
        <th>Color</th>
    </thead>
    <tbody>
        <tr>
            <th>Favorite</th>
            <td>Apple</td>
            <td>Green</td>
        </tr>
        <tr>
            <th>2nd Favorite</th>
            <td>Orange</td>
            <td>Orange</td>
        </tr>
    </tbody>
    <tfoot>
        <th>Rank</th>
        <th>Name</th>
        <th>Color</th>
    </tfoot>
</table>
```

### 不规则表格

td 元素的 colspan 属性用于跨列，tr 元素的 rowspan 属性用于跨行。

## form

定义表单：

    <form action="/form" method="post"></form>

form 元素的 action 属性用于指定表单要提交到的服务器的 URL，method 只提交方法，target 属性用于指定反馈信息的目标显示位置，同 a 元素的 target 属性，name 指定表单的名称。

### enctype

form 元素的 enctype 属性用来指定浏览器发送到服务器的数据采用的编码方式。可用的中有：

值               |说明
-----------------|-----------
application/x-www-form-urlencoded | 默认值。每项数据的名称和值都与 URL 采用相同的编码方式。如：fava=Apples&name=Adam+Freeman
multipart/form-data | 用于文件上传。
text/plain | 浏览器的实现不同，不常用。

### autocomplete

autocomplete 用于设置表单的自动完成。

```html
<form action="" autocomplete>
    <input type="text" name="fave" />
</form>
```

autocomplete 的属性值有两个，on 和 off。form 的 autocomplete 属性设置的是表单中的 input 元素默认的行为方式，各 input 元素同样可以设置该属性以覆盖默认方式。

### label

```html
<form action="" method="">
        <p>
            <label for="name">账号：<input type="text" id="name"></label>
        </p>
        <p>
            <label for="pw">密码：<input type="password" id="pw"></label>
        </p>
</form>
```

为 input 元素指定 id 属性值，并将相关 label 的 for 属性设置为这个 id 值，这样便可以将 input 元素和 label 元素关联起来，这种方式时显示关联。在设置负载的表单是，通常将 input 元素置于 label 元素中，这是可以省略 label 的 for 属性和 input 的 id 属性，这种方式为 隐式关联。关联的作用是点击 label 时，相应的控件也会获得焦点。

### autofocus

设计者可以使用 input 的 autofocus 属性让表单显示出来的时候自动聚焦于某个 input 元素，这样用户可以直接输入数据。

    <input type="text" autofocus />

### disabled

禁用 input：

    <input type="text" disabled />

### fieldset

对于复杂的表单可以使用 fieldset 将一些表单元素组织在一起。fieldset 的 legend 属性用于为组指定说明标签，可以使用 fieldset 的 disabled 禁用或禁用组元素。

```html
<form action="" method="">
    <fieldset disabled>
        <legend>登录表单</legend>
        <p><label for="name">账号：</label><input type="text" id="name"></p>
        <p><label for="pw">密码：</label><input type="password" id="pw"></p>
        <input type="submit" value="登陆">
    </fieldset>
</form>
```

### button

### sbumit

可以通过将 button 元素的 type 设置为 submit，来提交表单。

    <button type="sbumit">提交</button>

一旦 type 被设置为 submit，则该 button 具有了 form 元素的一些属性：

属性          | 说明
--------------|--------------
form | 指定按钮关联的表单，如果按钮处于 form 内，该属性可以省略。
formaction | 覆盖 form 元素的 action 属性。
formenctype | 覆盖 form 元素的 enctype 属性。
formmethod | 覆盖 form 元素的 method 属性。
formtarget | 覆盖 form 元素的 target 属性。
formnovalidate | 覆盖 form 元素的 novalidate 属性。

### reset

    <button type="reset"></button>

### select

用来生成一个选项列表用用户选择，size 属性用来设置要显示给用户的选项数，在 Chrome36 中 size>4 才有意义。 multiple 元素用来让用户一次选择多个选项。

要提供给用户的选项有 option 定义，如 datalist 中的 option，option 的 selected 用来将该选项自动选中。

```html
<select name="select" multiple="" size="5">
    <option value="Apples" label="Apples"/>
    <option value="Oranges" selected>Oranges</option>
    <option value="Cherries">Pear</option>
    <option value="Pear" />
    <option value="Watermelons" />
    <option value="Hamilons"/>
</select>
```

optgroup 元素可以用来给 option 元素分组，其 label
属性可以用来为整租选项提供一个小标题，disabled 属性可以用来阻止选择选项组内的任何选择。

```html
<select name="select">
    <optgroup label="Top Choice">
        <option value="Apples" label="Apples"/>
        <option value="Oranges" selected>Oranges</option>
    </optgroup>
    <optgroup label="No Sale" disabled="">
        <option value="Cherries">Pear</option>
        <option value="Pear" />
    </optgroup>
</select>
```

### textarea

textarea 用来输入多行文字。textare 可以用 rows 和cols 属性设置大小。wrap 属性控制提交表单时在文字中插入换行符的方式，值为 hard 值会在每行的末尾插入换行符，结果是所提交的文字中每行的字符数都不超过 cols 属性的规定；值为 soft 时，不会自动插入换行符。

其他支持的属性同 type=text。

    <textarea name="" id="" cols="30" rows="10"></textarea>

### output

output 用来表示输出结果。

```html
<fieldset>
    <legend>Price Calculator</legend>
    <input type="number" id="quant" placeholder="quant" /> × <input type="number" id="price" placeholder="price" /> = <output for="quant price"></output>
</fieldset>
```

### 验证

使用 HTML 的验证功能时，存在的问题是一次向用户提示的，如果表单中存在多处问题，那么用户不得不提交多次才能发现所有错误，而且错误提示的外观也不受设计者控制。

HTML 中用于验证的属性有：required、min、max、pattern。

## input

HTML5 中 input 的 type 值有 23 个不同的值。

### text

type 属性设置为 text 在浏览器中显示为一个单行文本框，常用属性有：

属性 | 说明
-----|--------------
list | 为文本框提供建议值的 datalist 元素，其值为 datalist 元素的 id 值。
manlength | 允许用户输入的字符的最大值。
pattern | 指定用于验证的正则表达式。
placeholder | 占位式提示。
readonly | 只读，防止用户编辑内容。
required | 表示用户必须输入一个值，否则无法通过验证。
size | 通过指定文本框可见的字符数目设置其宽度。
value | 文本框的初始值。

如：

指定文本框大小，并限制最大输入字符数：

    <input type="text" maxlength="10" size="10" />

设置初始值和占位提示：

    <input type="text" placehold="Your name" name="name" value="Lucy"/>

使用数据列表：

```html
<input type="text" list="fruitlist" name="fave"/>
<datalist id="fruitlist">
    <option value="Apples" label="Lovely Apples" />
    <option value="Orange">Refreshing Oranges</option>
    <option value="Cherries"/>
</datalist>
```

option 的值通过 value 设置，显示可以通过 label 属性设置，也可以通过 option 的元素内容设置。

生成只读或被禁用的文本框：

    <input type="text" disabled />
    <input type="text" readonly />

设置为 disabled 的元素不能被发送到服务端。

### password

属性通 type=text。用户输入的内容只是显示为掩饰字符，而不是被替换成掩饰字符，提交表但是，服务器收到的是明文密码。对于安全敏感的应用，应该考虑使用 SSL/HTTPS 对通信内容加密。

### button

可以设置 type=submit、reset、button 来生成提交、重置、普通按钮。用法同 <a href="#button">button 一节</a>

input 生成的按钮和用 button 生成的an牛的不同之处在于 button 生成的an牛可以用来显示含标志的文字。

### number

type 属性值为 number 时，只能输入整数和浮点数。常用属性为：

属性 | 说明
-----|--------
list | datalist 元素的 id，表示提供的建议值。
min | 可接受的最小值。
max | 可接受的最大值。
step | 上下调节数值的步长。
value | 元素的初始值。

readonly、required 同 type=text。

    <input type="number" step="1" min="0" max="100" value="1" name="price" />

### range

range 可以用来从实现规定的范围内选择一个数值。支持的属性和 type=number 相同。

    <input type="range" value="10" min="1" max="20" />

### checkbox

checkbox 用来用来生成供用户选择是否的复选框支持的额外属性为：

属性| 说明
----|--------
checked | 表示复选框刚显示数来或重置后成勾选状态。
required | 表示用户必须勾选该复选框，否则无法通过验证。
value | 设置在复选框在勾选时提交给服务器的数据值，默认为 on。

    <input type="checkbox" name="vaggie" />

提交表单是，只有勾选状态的复选框的数据值才会发送到服务端。

### radio

radio 用来生成一组单选按钮，供用户从一批固定选项中选择一项。

额外支出支持的属性：

属性|说明
-----|------
checked | 初始勾选状态
required | 表示用户必须在一组单选an牛中选择一个，否则无法通过输入验证。

每个 type=radio 的 input 元素代表一个选项，如果要生成一组互斥的选项，只需要将相关的 input 元素的 name 属性设置为同一个值即可。

```html
<fieldset>
    <label for="apples">
        <input type="radio" name="fruit" value="apples" id="apples"/>
        Apples
    </label>
    <label for="oranges">
        <input type="radio" name="fruit" value="oranges" id="oranges" />
        Oranges
    </label>
</fieldset>
```

和 checkbox 类似，未选择的单选按钮的值不会被发送到服务器。

### email & tel & url

这三种 input 支持的属性和 type=text 相同。email 还支持一个名为 multiple 的属性，设置了改属性的 input 元素可以接受多个电子邮箱地址。

```html
<label>
    Email:
    <input type="email" placeholder="user@mail.com"/>
</label>
<label>
    TEL:
    <input type="tel" placeholder="(XXX)-XXX-XXXX"/>
</label>
<label>URL:
    <input type="url"/>
</label>
```

### datetime

支持的属性和 type=number 相同。

用来获取时间和日期的 input 元素类型：

type 属性 | 说明 | 格式| 示例
----------|-------|-----|----
datetime | 带时区信息的世界时（包括日期和时间）| 2011-07-19T16:12:31.491Z |<input type="datetime" value="2011-07-19T16:12:31.491Z" />
datetime-local | 不带时区信息的世界时（包括日期和时间）| 2011-07-19T16:12:31.491 | <input type="datetime-local" value="2011-07-19T16:12:31.491" />
date | 日期 | 2011-07-19 | <input type="date" />
time | 只能输入事件信息 | 16:12:31.491 | <input type="time" value="16:12:31.491"/>
month| 只能输入年和月|2011-07| <input type="month" value="2011-07" />
week | 只能输入年和星期 | 2011-W30 |<input type="week" value="2011-W30" />

See [demosthenes.info – Using The HTML5 Date Input](http://demosthenes.info/blog/923/Using-The-HTML5-Date-Input)

### color

type 为 color 的 input 用来选择颜色。

    <input type="color" />

### search

用来生成一个文本框，用用户输入搜索词。支持的属性和 type=text 相同。

    <input type="search" />

### hidden

用来呈现希望用户看不到或不能编辑的数据项，但又表单提交时希望发送服务上的元素。

    <input type="hidden" name="id" value="123456" />

### image

用来将生成的按钮显示为图像，点击该图像会导致提交表单。支持的属性同 type=submit 时的按钮。初次之外，还支持的属性有 width、height、alt。

表单提交时，用户点击图片的坐标（相对图像的左上角）会提交到服务器，如：submit.x/submit.x，可以根据图像的不同区域代表不同的操作。

### file

用来选择文件，提交表单时将文件上传到服务器。有上传文件的 input 时，form
的 enctype 属性必须设置为 multipart/form-data，接受的额外属性为：

属 性 | 说明
-------|-----
accept | 接受的 MINE 类型。关于 MINE 类型的定义，参见 [RFC 2046](http://tools.ietf.org/html/rfc2046)
multiple | 设置这个属性可以一次上传多个文件。
required | 必须选择至少一个文件。

## 嵌入内容

- [Built-in Browser Support for Responsive Images - HTML5 Rocks](http://www.html5rocks.com/en/tutorials/responsive/picture-element/)

### image

要嵌入一张图像需要使用 src 和 alt 属性，src 指定预嵌入图像的 URL，alt 定义了 img 元素的备用内容，在图像无法正常呈现时显示。如：

    <img src="http://temp.im/200x200" alt="200x200">

可以使用 width 和 height 来指定图像的大小，这样可以让浏览器在图像尚未载入时正确摆放网页里的各个元素。注意，width 和 height 不能用来动态缩放图像。

在超链接中嵌入图像时，如果给 img 加上 ismap 属性加载创建了一个服 _务器端分区响应图_，在图像上点击的位置坐标（相对左上角）会附加到 URL 上。点击的位置是距图像顶部4px，左边 10px，浏览器会导航到：http://server.com/some.html/10,4。

我们可以创建 _客户端分区响应图_，通过点击图像上的不同区域让浏览器导航到不同的 URL 上。这一过程不需要服务器的引导，因此需要使用元素来定义图像上的各个区域以及他们所代表的行为。实现客户端分区响应图的关键元素时 map。

map 包含一个活多个 area，他们各自代表了图像上可以被点击的一块区域。are 元素的属性可以分为两类，第一类通 a 元素的属性，代表用户点击后浏览器导航到的 URL，第二类为 shape 和 coords 属性，coords 属性根据 shape 的值而定：

shap 值 | coords 值
---------|--------
rect | 代表一个矩形区域。coords 为由逗号分隔的四个整数值，分别代表：<li>图像左边缘和矩形的左侧<li>图像上边缘和矩形的上侧<li>图像左边缘和矩形的右侧<li>图像上边缘和矩形的下侧
circle | 代表一个圆形区域。coors 为由三个逗号分隔的整数值组成：<li>图像左边缘到圆心的距离<li>图像下边缘到圆心的距离<li>图像的半径
poly | 代表一个多边形。coords 属性为六个用逗号分隔的整数，每一个数字各代表多边形的一个顶点。
default |默认区域，即覆盖正常图，不需要提供 coords 值。

```html
<img src="http://temp.im/300x100" alt="300x100" usemap="mymap">
<map name="mymap">
    <area href="http://google.com.hk" shape="rect" coords="0,0,100,100" />
    <area href="http://baidu.com" shape="rect" coords="0,0,200,100" />
    <area href="http://inching.org" shape="default"/>
</map>
```

### iframe

iframe 元素允许我们在现有的 HTML 文档中嵌入另一张文档。

    <iframe name="myframe" src="http://inching.org" frameborder="0" width="600" height="600" seamless sandbox></iframe>

我们创建了一个 name 属性为 myframe 的 iframe，这样我们可以将 a、form、button、input 等元素的 target 属性指定为 myframe，则相应的链接会在 myframe 中打开，如：

    <a href="http://www.baidu.com" target="myframe">www.baidu.com</a>

width 和 height 用来指定大小，src 用来指定 URL。

### progress

progress 用来表现某项任务进度逐渐完成的过程。progress 的 value 属性定义了当前的进度，它位于 0 和 max 属性的值（省略时为 1）所定义的范围之间。

    <progress value="10" max="30"></progress>

<progress value="10" max="30"></progress>

### meter

meter 元素显示了某个范围内所有可能值中的一个。min、max 定义了可能值所处范围的边界，可以用浮点数来表示。meter 元素的显示可分为三个部分：过低、过高、最佳。< low 属性值都认为是过低，> high 属性值则认为过高，optimum 指定了最佳值。

    <meter value="90" min="10" max="100" low="40" hight="80" optimum="60"></meter>

<meter value="90" min="10" max="100" low="40" hight="80" optimum="60"></meter>

## API

- [Introducing the Screen Orientation API](http://www.sitepoint.com/introducing-screen-orientation-api)
- [The Screen Orientation API Reloaded](http://www.sitepoint.com/screen-orientation-api-reloaded)
- [Talk: Keeping secrets with JavaScript - An Introduction to the WebCrypto API - Tim Taubert](https://timtaubert.de/blog/2014/10/keeping-secrets-with-javascript) 加密。

### File

- [Exploring the FileSystem APIs - HTML5 Rocks](http://www.html5rocks.com/en/tutorials/file/filesystem/)
- [阅读以 JavaScript 编写的本地文件 - HTML5 Rocks](http://www.html5rocks.com/zh/tutorials/file/dndfiles/)
- [Use the HTML5 File API to Work with Files Locally in the Browser ♥ Scotch](http://scotch.io/tutorials/use-the-html5-file-api-to-work-with-files-locally-in-the-browser?&mc_cid=36aa7ac1ca&mc_eid=8a875429cf)
- [Debugging the Filesystem API](http://updates.html5rocks.com/2011/08/Debugging-the-Filesystem-API)

## Tutorial

- [Learn to Code HTML & CSS - Beginner & Advanced](http://learn.shayhowe.com/)
- [diegocard/awesome-html5](https://github.com/diegocard/awesome-html5)
- [HTML5研究小组](http://www.mhtml5.com/)
- [WebHek](http://www.webhek.com/)
- [HTML5DevConf](https://www.youtube.com/watch?v=8J6EdpXdzqc)
- [HTML-MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML)
- [Glyphs](http://css-tricks.com/snippets/html/glyphs/)
- [HTML5 中 40 个最重要的技术点 - WEB开发者](http://www.admin10000.com/document/5332.html)

### video

- [Adding captions and subtitles to HTML5 video ✩ Mozilla Hacks – the Web developer blog](https://hacks.mozilla.org/2014/07/adding-captions-and-subtitles-to-html5-video)
- [Google I/O 2014 - HTML5 everywhere: How and why YouTube uses the Web platform - YouTube](https://www.youtube.com/watch?v=2gLq4Ze0Jq4)

### Argument

- [HTML5 Vs. Native Apps for Mobile - Business Insider](http://www.businessinsider.com/html5-vs-native-apps-for-mobile-2013-6?op=1)

## Tools

- [Can I use... Support tables for HTML5, CSS3, etc](http://caniuse.com/)

## HTML5 Test

- <http://html5test.com/>
- [Test the Web Forward](http://testthewebforward.org/) The [layoutTest coverage in WebKit](http://trac.webkit.org/browser/trunk/LayoutTests) is enormous (28,000 layoutTests at last count), not only for existing features but for any found regressions. In fact, whenever you’re exploring some new or esoteric DOM/CSS/HTML5-y feature, the layoutTests often have fantastic minimal demos of the entire web platform.

    In addition, the [W3C is ramping up its effort for conformance suite testing](http://www.w3.org/QA/2013/02/testing_the_open_web_platform.html). This means we can expect both different WebKit ports and all browsers to be testing against the same suite of tests, leading to fewer quirks and a more interoperable web. For all those who have assisted this effort by going to a [Test The Web Forward event](http://testthewebforward.org/)… thank you!

## Books

- [HTML5 Pocket Reference, 5th Edition](http://www.salttiger.com/html5-pocket-reference-5th-edition/)
- [HTML5 in Action](http://www.salttiger.com/html5-action/)
