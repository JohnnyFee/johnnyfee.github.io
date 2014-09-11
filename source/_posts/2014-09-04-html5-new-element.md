---
layout: post
title: "常见的 HTML5 技巧和实际应用"
category: HTML
tags: [web, html]
--- 

## HTML



<!--more-->

### `<figure>`标签

看看下面一段简单的代码：

    <img src="path/to/image" alt="About image" />
    <h6>Image of Mars.</h6>

遗憾的是，这里的h6标签和img标签好像没有什么关系，语义不够明确。HTML5意识到了这一点，于是就采用了`<figure>`标签。当`<figure>`结合`<figcaption>`标签的使用，可以让h6标签和img标签组合起来，代码就更具语义化了。

```html
<figure>
   <img src="path/to/image" alt="About image" />
    <figcaption>
       <h6>This is an image of something interesting. </h6>
   </figcaption>
</figure>
```

### 重新定义`<small>`

不久前，我使用了`<small>`标签来创建与logo相关的副标题。但是在HTML5中重新定义了`<small>`标签，使之更能表现语义化，在`<small>`的字号都会变小，想想如果这个标签用于网站的底部的版权信息还是个不错的做法。

### 去掉了Javascript和CSS标签的type属性

通常你会在`<link>`和`<script>`加上type属性：

```html
<link rel="stylesheet" href="path/to/stylesheet.css" type="text/css" />
<script type="text/javascript" src="path/to/script.js"></script>
```

在HTML5中，不再需要type属性了，因为这显得有点多余，去掉之后可以让代码更为简洁。
view sourceprint?

```html
<link href="path/to/stylesheet.css" />
<script src="path/to/script.js"></script>
```

### 是否使用双引号

这有点让人纠结，HTML5并不是XTHML，你可以省去标签中的双引号。相信大多数同志也包括我都习惯了加上双引号，因为这让代码看起来会更标准。不过，这可以根据你的个人喜好来确定是到底要不要双引号。

```
<h6 class=myClass id=someId> Start the reactor.  </h6>
```

### IE对HTML5的支持

IE浏览器目前对HTML5的支持并不好，也是阻碍HTML5的更快普及的一大绊脚石，不过，IE9对HTML5的支持度还是很不错的。

IE把HTML5新增的标签都解析成内联元素，而实际上它们是块级元素，所以有必要为它们定义一个样式：

```html
header, footer, article, section, nav, menu, hgroup {
   display: block;
}
```

尽管如此，IE还是不能解析这些新增的HTML5标签，这个时候就需要借助Javascript来解决这个问题：

```js
document.createElement("article");
document.createElement("footer");
document.createElement("header");
document.createElement("hgroup");
document.createElement("nav");
document.createElement("menu");
```

你可以借助这一段Javascript代码来修复IE更好的解析HTML5

```html
 
<!--[if IE]>
<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
 <![endif]-->
```

### 标题群( hgroup)

这个类似于第二点技巧。如果用h1和h2标签分别表示网站的名称和副标题，但这会让两个本义上密切相关的标题并没有关联起来。这个时候可以使用  

`<hgroup>`标签将它们组合起来，这样代码会更有语义。

```html
<header>
    <hgroup>
         <h1> Recall Fan Page </h1>
        <h2> Only for people who want the memory of a lifetime. </h2>
    </hgroup>
</header>
```

### 检测浏览器对HTML5属性的支持

由于各浏览器对HTML5属性的支持度不同，这就造成了一些兼容问题。但是可以使用方法来检测该浏览器是否支持这些属性，上例中的代码如果要检测pattern属性是否被浏览器识别，可以使用Javascript代码来检测。

    alert( 'pattern' in document.createElement('input') ) // boolean;

其实这是确定浏览器兼容常用的方法，jQuery库就经常使用这种方法。上面的代码中创建了一个input标签，并检测pattern属性是否被浏览器支持，如果能支持的话，浏览器就支持这个功能，否则就不支持。

```html
<script>
 if (!'pattern' in document.createElement('input') ) {  
    // do client/server side validation  
 }  
</script>
```

### Mark标签

`<mark>`标签用于高亮显示那些需要在视觉上向用户突出其重要性的文字，包裹在此标签里的字符串必须与用户当前的行为相关。例如，如果我在一些博客中搜索“Open your Mind” ，我可以使用在`<mark>`标签里使用 JavaScript 来包裹每一次动作。

```html
<h3> Search Results <h3>
<h6> They were interrupted, just after Quato said, <mark>"Open your Mind"</mark>. </h6>
```

### 该如何正确的使用div标签

有些人可能会有疑问，有了`<header>`和`<footer>`等这些标签，`<div>`标签在HTML5中还有用吗？答案是肯定的，比如你想创建一个能包裹特殊内容的容器自由灵活的`<div>`肯定是首选，而你要创建一篇文章或者一个导航菜单，建议你使用更有语义的`<article>`和`<nav>`标签。

很多人认为HTML5可能还是很遥远的事，所以直接无视，其实不然，现在很多网站都已经开始使用HTML5了，事实上，HTML5的一些新增属性和功能是让代码变得更简洁，这总归是一件好事，应该值得我们推崇。最后感谢你阅读了这篇HTML5的入门级文章，希望能为你进一步学习HTML5提供一些帮助。

## Layout

### 更有语义的header和footer

下面的代码在HTML5中将不复存在

```html
<div id="header">
     ...
</div>

<div id="footer">
     ...
</div>
```

通常我们都会给header和footer定义一个div，然后再添加一个id，但是在HTML5中可以直接使用`<header>`和`<footer>`标签，所以可以将上面的代码改写成：

```html
<header>
    ...  
</header>
  
<footer>
    ...  
</footer>
```

要注意不要将这两个标签和网站的头部和页脚混淆起来，它们只是代表它们的容器。

### section

### article

## Video And Audio

### 音频播放的支持

HTML5中提供了`<audio>`标签，解决了以往必须依靠第三方插件才能播放音频文件的问题。目前为止，还只有少数的最新浏览器支持该标签。

```html
<audio autoplay="autoplay" controls="controls">
    <source src="file.ogg" />  
    <source src="file.mp3" />  
    <a href="file.mp3">Download this file.</a>
</audio>
```

为什么会有两种格式的音频文件？因为Firefox和Webkit浏览器所支持的格式存在差异，Firefox只能支持.ogg文件，而Webkit只支持.mp3的文件，解决的办法就是创建两个版本的音频文件，这样就可以兼容Firefox和Webkit的浏览器了，需要注意的是IE不支持该标签。

### 视频播放的支持

和`<audio>`标签一样，HTML5也提供了`<video>`标签对播放视频文件的支持。YouTube也宣布了一项新的HTML5的视频嵌入。不过有点遗憾，HTML5的规范并没有指定特定的视频解码器，而是让浏览器自己来决定。这就造成了个浏览器的兼容问题，虽然Safari和IE9都支持还H.264格式的视频( Flash 播放器可以可以播放)，Firefox和Opera则支持开源的Theora和Vorbis格式。因此，当显示HTML5视频的时候，也得准备2种格式。

```html
<video controls preload>
    <source src="cohagenPhoneCall.ogv" 
    type="video/ogg; codecs='vorbis, theora'" />
    <source src="cohagenPhoneCall.mp4" 
    type="video/mp4; 'codecs='avc1.42E01E, mp4a.40.2'" />
    <div> Your browser is old. 
    <a href="cohagenPhoneCall.mp4">Download this video instead.</a> </div>
</video> 
```

需要注意的是，type属性虽然可以省略掉，但是如果加上的话，浏览器就可以更快的准确的解析该视频文件。并不是所有的浏览器都支持HTML5的视频，所以得做好使用Flash版本来代替，当然，这个决定权在于你。

### 预加载视频

预加载属性：preload，首先要确定是否需要预先加载视频，假如，访客在访问一个有很多视频展示的页面，那么就有必要预先加载一段视频，这样可以节省访客的等待时间，提高用户体验。你可以给`<video>`标签添加一个preload属性来实现预先加载的功能。

```html
<video preload="preload">
 ...
</video>
```

### 显示控件

显示控件属性可以给视频添加一个播放暂停的控件，需要注意的是每个浏览器显示的效果可能会有些差异。

```html
<video preload="preload" controls="controls">
...
</video>
```

## Form

### 占位符

文本框中的占位符(看看本博的搜索框效果)有利于提升用户体验，之前，我们只能依靠JS来实现占位符的效果，在HTML5中新增了占位符属性placeholder。

```html
<input name="email" type="email" placeholder="doug@givethesepeopleair.com" />  
```

同样，目前的主流现代浏览器对该属性的支持不大好，暂时只有Chrome和Safari支持该属性，Firefox和Opera不支持该属性。

```html
<img src=”http://stylechen.com/wp-content/uploads/2010/08/validation.png” alt=”HTML5 占位符” />
```

### 使网页内容可以编辑

![HTML5 可编辑的内容](http://stylechen.com/wp-content/uploads/2010/08/contenteditable.png)

这是HTML5新增的一个功能，在标签中加上一个contenteditable属性，并且设置值为true，就可以直接在页面上编辑这个标签的内容，包括这个标签的子级标签的内容。有了这个属性，你可以利用这个属性完成很多事，比如在网页中编辑一个待办事项的清单。

### 电子邮件输入框

HMTL5中新增了一个输入框的电子邮件属性，可以检测输入的内容是否符合电子邮件的书写格式，功能越来越强大了吧，在HTML5之前只能依靠JS来检测。虽然内置的表单验证功能很快就会成为现实，但这个属性很多浏览器都还不支持，只会当作普通的文本输入框来处理。

```html
<form method="get">
  <label for="email">Email:</label>
<input id="email" name="email" type="email" />
  <button> Submit Form </button>
</form>
```

![HTML5 电子邮件输入框](http://stylechen.com/wp-content/uploads/2010/08/email_validation.png)

### 必填项属性

前端人员肯定做过不少表单验证的项目，其中很重要的一点就是有些输入框的内容是必须填写的，这里就需要使用Javascript来检查。在HTML5中，新增了一个“必须填写”的属性：required。required属性有两种使用方法，第二种方法显得更有结构性，而第一种更简洁。

```html
<input type="text" name="someInput" required />
```

```html
<input type="text" name="someInput" required="required"/>
```

有了这个属性，使表单的提交验证变得更简单了，看看下面简单的例子：

```
<form method="post">
    <label for="someInput"> Your Name: </label>
    <input id="someInput" name="someInput" 
    type="text" placeholder="Douglas Quaid" required="required" />
    <button>Go</button>
</form>
```

![HTML5 必填项属性](http://stylechen.com/wp-content/uploads/2010/08/placeholder_required.png)

如果输入框为空，表单将无法提交成功。

### 使用正则表达式

在HTML5中，我们可以直接使用正则表达式。

```html
<form action="" method="post"> 
    <label for="username">Create a Username: </label>
    <input type="text" name="username"  id="username"  
    placeholder="4,10" pattern="[A-Za-z]{4,10}" 
    autofocus="autofocus" required="required" />
    <button type="submit">Go </button> 
</form>
```
### 自动获取焦点

同样的，HTML5也不再需要Javascript来解决输入框的自动获取焦点，如果某个输入框应当被选择或是获取到输入焦点，HTML5新增了自动获取焦点属性autofocus：

```html
<input type="text" name="someInput" placeholder="Douglas Quaid" required="required" autofocus="autofocus" />
```

`autofocus` 也同样可以写 `autofocus=autofocus`，这样看起来标准些，这个根据自己的个人喜好而定。

## Tutorial

## Reference

- [22个HTML5的初级技巧](http://stylechen.com/22-html5-tips.html) [原文：[28 HTML5 Features, Tips, and Techniques you Must Know - Tuts+ Code Tutorial](http://code.tutsplus.com/tutorials/25-html5-features-tips-and-techniques-you-must-know--net-13520)]