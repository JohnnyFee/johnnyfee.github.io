layout: post
title: "基于GitHub搭建jekyll博客"
description: ""
category: Blog
tags: [github, blog]
---

## GitHub Pages

### GitHub Pages 概述 

github提供的[GitHub Pages](http://pages.github.com/)服务使用户可以为项目提供漂亮的页面（即wiki），甚至可以利用github.io提供的二级域名实现自己的网站或博客。
	
GitHub Pages分为User, Organization Pages(博客或网站)和Project Pages(项目doc)。不过所有的页面必须的静态的，也就是说只能使用HTML/CSS/JavaScript等前端技术。但Github后台使用Jekyll[^1][^2]将一些特殊格式的文本文档（[Markdown](http://daringfireball.net/projects/markdown/) ,[Textile](http://textile.sitemonks.com/), [Liquid](http://wiki.shopify.com/Liquid)）转化为html文档。所以我们可以使用[Markdown](http://markdownpad.com/)等编辑器、提交markdown文档到github后，即可正常访问它生成的页面，通常提交之后要等上一会儿，10分钟以内。所以作为新手，可以现在本地搭建一个jekyll服务，实时查看更改。待熟悉之后，就可以使用程序员最喜欢方式写博客了，编辑，提交，编辑，提交...

<!-- more -->	

### 创建User Pages

创建一个按照USERNAME.github.io命名的GitHub库，其中USERNAME为你的GitHub用户名。在该库的`设置`选项中点击`GitHub Pages`/`Automatic Page Generator`。按照向导编辑首页，选择`网站模版`。再查看该库的`设置`/`GitHub Pages`就可以看到`Your site is published at http://johnnyfee.github.io`的字样。这个就是我所用的github.io二级域名了。通过修改库中的内容，可以编辑我们的静态网站或博客。

### 创建Project Pages

创建方法类似于创建User Pages，只是git库是项目库。还有一个区别是，编辑网页的时候，需要切换到gh-pages分支，才能看到项目的文档。
 

## Jekyll

['dʒekil; 'dʒi:ki]

### 安装

See [Running Jekyll on Windows – Madhur Ahuja](http://www.madhur.co.in/blog/2011/09/01/runningjekyllwindows.html).

1. 安装[Ruby2.0](http://rubyinstaller.org/)，傻瓜式安装即可。
2. Download "DEVELOPMENT KIT" installer(<http://rubyinstaller.org/downloads/)>) that matches the Windows architecture and the Ruby version just installed. 

    For example, DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe is for 64-bit Windows   with Ruby 2.0.0 x64. Install the Ruby development kit from  [the same location above](http://rubyinstaller.org/downloads/) and extract it to path such as c:\devkit.

    Run the following commands 

        ruby dk.rb init
    
    to generate the config.yml file to be used later in this Step. 如果生成的 config.xml 文件中包含了 `- C:/Ruby200`，则下一步可以省略。
3. Edit the generated config.yml file to include installed Rubies. For example, in our case, it will look like this:

        - C:/Ruby200

4. Run the following command to install to DevKit enhance your installed Rubies. This step installs (or updates) an operating_system.rb file into the relevant directory needed to implement a RubyGems

        ruby dk.rb install

5. Install Jekyll using following command:

   	    $ gem install jekyll

	**注意**，对于中国大陆的用户请国内镜像：

    - 淘宝的[RubyGems镜像](http://ruby.taobao.org/)。
    - [Rubygems 镜像 - 山东理工大学](http://ruby.sdutlinux.org/)

6. 使用[Jekyll-Bootstrap](http://jekyllbootstrap.com/index.html#start-now)快速搭建博客[^3]

	Jekyll-Bootstrap提供了能够被GitHub完美解析的文件结构和配置。

	`git clone https://github.com/plusjade/jekyll-bootstrap.git USERNAME.github.com`

    将修改push到远程库，等几分钟即可看到博客首页了，接下来就是慢慢完善你的博客了。

###显示页面中显示中文乱码[^4]

将%ruby installation path%/lib/ruby/gems/2.0.0/gems/jekyll-1.1.2/lib/jekyll/commands/以下文件中的File.read全部显示指定编码方式。
- convertible.rb
- tags/include.rb
- commands/new.rb

如convertible.rb中的File.read调用方法修改为

	self.content = File.read(File.join(base, name), :encoding => "utf-8")		

另外需要将文件保存为无BOM的UTF-8格式，通常通过编辑器(如Evernote)的另存为，便可看到`BOM`的勾选框。

- [Jekyll对中文问题的处理](http://nepshi.com/2012-10-08/chinese-characters-in-jekyll/)
- [Jekyll中文问题](http://vlucas.net/essay/2012/02/19/jekyll-y/ "Jekyll中文问题")


###代码高亮[使用Pygments]

- [用Jekyll和Pygments配置代码高亮](http://zyzhang.github.io/blog/2012/08/31/highlight-with-Jekyll-and-Pygments/)

####安装python

[Python Releases](http://www.python.org/download/releases/)

添加安装目录到Path中。

笔者使用的版本为2.7.x，使用3.x会有问题。

####安装easy_install(即python的包管理器)

[setuptools for Windows](https://pypi.python.org/pypi/setuptools/1.0#id115)

下载[ez_setup.py](https://bitbucket.org/pypa/setuptools/raw/bootstrap/ez_setup.py)到pyton安装的根目录
运行该文件，将在相同目录下产生Scripts目录，在该目录中包含easy_install-3.3.exe和easy_install.exe，将该路径添加到Path中。

####安装Python Pygments

	easy_install Pygments	

####设置代码高亮的样式

**通过下面的命令可以查看当前支持的样式**

	>>> from pygments.styles import STYLE_MAP
	>>> STYLE_MAP.keys()

Output:

	['monokai', 'manni', 'rrt', 'perldoc', 'borland', 'colorful', 'default', 'murphy', 'vs', 'trac', 'tango', 'fruity', 'autumn', 'bw', 'emacs', 'vim', 'pastie', 'friendly', 'native']	

生成指定样式的css文件

	pygmentize -S native -f html > pygments.css

将生成的css文件拷贝到主题的css目录下，如

	%github pages project folder%\assets\themes\twitter\css\

引入default.html中引入css文件	

{% raw %}
	// default目录如
	%github pages project folder%\includes\themes\twitter\

	// 引入如下代码
	<link href='{{ ASSET_PATH }}/css/pygments.css' rel="stylesheet" media="all">
{% endraw %}

在文章中高亮代码	
{% raw %}

	{% highlight java %} 
	public class HelloWorld { 
		public static void main(String args[]) { 
			System.out.println("Hello World!"); 
		} 
	} 
	{% endhighlight %}	

{% endraw %}

运行jekyll服务，如果报以下问题

	Liquid Exception: No such file or directory - /bin/sh in ...	

这个是语法高亮插件 Pygments 引起。解决方法是卸载最新版本的 Pygments （0.5.1+），重新安装 0.5.0 版本的 Pygments:

	gem uninstall pygments.rb --version "=0.5.2"
	gem install pygments.rb --version "=0.5.0"	

[Windows 安装 Jekyll 若干问题的解决](http://dannyli.net/notes/fix-problems-of-jekyll-on-windows/)	

####Python国内镜像

设置方法请参考 [使用国内镜像源来加速](http://www.leadnt.com/2013/08/%E4%BD%BF%E7%94%A8%E5%9B%BD%E5%86%85%E9%95%9C%E5%83%8F%E6%BA%90%E6%9D%A5%E5%8A%A0%E9%80%9Fpython-pypi%E5%8C%85%E7%9A%84%E5%AE%89%E8%A3%85/)

- http://mirrors.sohu.com/python/

- http://pypi.sdutlinux.org/ 山东理工大学
- http://pypi.douban.com/ 豆瓣
- http://e.pypi.python.org/ 清华大学
- http://pypi.hustunique.com/ 华中理工大学
- http://pypi.mirrors.ustc.edu.cn 中国科学技术大学

###代码高亮[使用Google Code Prettify]

- [jekyll中代码高亮 google-code-prettify](http://www.heiniuhaha.com/lessons/2012/08/09/use-google-code-prettify/)

- [google-code-prettify](https://code.google.com/p/google-code-prettify/downloads/list)

###TOC

- [jekyll-table-of-contents ](https://github.com/ghiculescu/jekyll-table-of-contents)
- [gfranko / jquery.tocify.js](https://github.com/gfranko/jquery.tocify.js) 建议使用，用于生成TOC。生成TOC没有问题，但是jquery.tocify.css中.tocify和bootstrap3的兼容不是很好。我使用以下代码覆盖其中的某些值：

		.tocify {
			position: inherit;
			width:240px;
		    max-height: 80%;
		    overflow: auto;
		}

	然后，使用[bbarakaci / fixto](https://github.com/bbarakaci/fixto)将toc元素的定位变成fixed。同时，加入以下class调整样式以适应自己的页面：

		#toc {
			    margin: 20px 0px 20px 0px;
		}

		.active {
			color:white;
			background-color: #dff0d8;
		}

###分页

[Pagination](http://jekyllrb.com/docs/pagination/)

###分享

####分享到
- [百度分享](http://share.baidu.com/)
- [JiaThis](http://www.jiathis.com/)

####划词分享
- [JiaThis™“分享到”划词分享代码](http://www.jiathis.com/getcode/streak)

###关注
- [关注按钮](http://www.jiathis.com/getcode/follow)

###评论

- [多说](http://duoshuo.com/)
- [为 Jekyll 添加多说评论系统](http://havee.me/internet/2013-07/add-duoshuo-commemt-system-into-jekyll.html)

在_includes/custom下添加文件duoshuo，内容为从duoshuo.com获取到的代码，以下代码把`short_name`的值改为jekyll `_config.yml`中配置的值，故以下代码通用。

{% raw %}
	<!-- Duoshuo Comment BEGIN -->
	<div class="ds-thread"></div>
	<script type="text/javascript">
	var duoshuoQuery = {short_name:"{{ site.JB.comments.duoshuo.short_name }}"};
	(function() {
		var ds = document.createElement('script');
		ds.type = 'text/javascript';ds.async = true;
		ds.src = 'http://static.duoshuo.com/embed.js';
		ds.charset = 'UTF-8';
		(document.getElementsByTagName('head')[0] 
		|| document.getElementsByTagName('body')[0]).appendChild(ds);
	})();
	</script>
	<!-- Duoshuo Comment END -->
{% endraw %}

其中 short_name的值在_config.yml中配置，之后会提到。

修改‘_includes/JB/’下的comments文件，添加以下分支

{% raw %}
	{{ '{% when "duoshuo"'  }}%}
	<hr>
	{{'{% include custom/duoshuo' }}%}
{% endraw %}

###关联

####关联推荐
在_includes/themes/[theme-name]/post.html的末尾添加通过[安装关联推荐插件](http://www.wumii.com/widget/getWidget)中的两段代码，注意两段脚本的顺序要一致。

{% raw %}
	//第一段
	<script type="text/javascript" id="wumiiRelatedItems"></script>

	// 第二段
	<script type="text/javascript">
    var wumiiPermaLink = "{{site.production_url}}{{page.url}}";
    var wumiiTitle = "{{page.title}}";
    var wumiiTags = "{% for tag in page.tags %}{{tag}}, {% endfor %}";
    var wumiiCategories = [{% for tag in page.categories %} "{{tag}}", {% endfor %}];
    var wumiiSitePrefix = "{{site.production_url}}";
    var wumiiParams = "&num=5&mode=3&pf=JAVASCRIPT";
	</script>
	<script type="text/javascript" src="http://widget.wumii.cn/ext/relatedItemsWidget"></script>
{% endraw %}

- [wumii 关联推荐](http://www.wumii.com/widget/getWidget)
- [在jekyll里使用无觅相关文章插件](http://www.wumii.com/topbar/HTYezSxL)

####TOP

通过无觅的[热门文章Widget](http://www.wumii.com/site/setting/hotWidget?prefix=http%3a%2f%2fjohnnyfee.github.io%2f)获得代码，复制到你需要热门文章的地方。

###分类

- [为Jekyll 博客添加 category 分类](http://pizn.github.io/2012/02/23/use-category-plugin-for-jekyll-blog.html)

###全文搜索

- [使用Tapir给Jekyll博客添加全文搜索](http://hantconny.github.io/2013/05/15/searching-jekyll-with-tapirgo/)
- [HOW CAN I ADD A GOOGLE SEARCH BOX TO MY WEB SITE?](http://www.askdavetaylor.com/how_can_i_add_a_google_search_box_to_my_web_site/)

###统计

- [Google Analytics for Jekyll Bootstrap](http://truongtx.me/2013/04/05/google-analytics-for-jekyll-bootstrap/)
- [为 Jekyll 添加百度统计](http://havee.me/internet/2013-07/add-baidu-analytics-for-jekyll.html)
- [百度统计](http://tongji.baidu.com/)

###Read More

- [Jekyll - Read More without plugin](http://truongtx.me/2013/05/01/jekyll-read-more-feature-without-any-plugin/)

###Jekyll常用命令

####本地运行服务

	jekyll serve --watch

通过watch参数可以让jekyll服务自动感知更改。其他用法请参考[Basic Usage](http://jekyllrb.com/docs/usage/)。

####创建文章

	$ rake post title="Hello World"

####创建页面

	$ rake page name="about.md"

	#Create a nested page:

	$ rake page name="pages/about.md"

	#Create a page with a “pretty” path:
	$ rake page name="pages/about"
	# this will create the file: ./pages/about/index.html

其他主题请参考Jekyll和Jekyll-BootStrap的官方文档，相关链接见`参考`。

###主题参考

- [jekyll-bootstrap](https://github.com/plusjade/jekyll-bootstrap)
- pizn.github.com
- prose.io
- hugozhu.github.io
- mojombo.github.io
- https://github.com/wendal/gor
- http://liufeiyu.cn/
- http://www.heiniuhaha.com/

##GitHub的Markdown解析器

- `****`加粗标签之间不能有空格，否则启动本地服务时解析失败，在GitHub的Markdown解析器上能否通过为验证。

##Jekyll-AJAX

- [Jekyll-AJAX](https://github.com/joelhans/Jekyll-AJAX)

##liquid

- [liquid](https://github.com/shopify/liquid/wiki)

##加速

另外，[七牛云存储](http://www.qiniu.com/)也可以托管静态文件，速度会明显比访问github快，所以不妨试试，以下是两个参考教程：

- [使用七牛云存储来托管静态博客](http://support.qiniu.com/hc/zh-cn/articles/200654133)
- [一键实现 WordPress 博客静态文件 CDN 加速](http://blog.wpjam.com/project/wpjam-qiniutek/)

至少你可以考虑将图片放到七牛上去，在文章中使用网络地址插入图片，方便预览，也加速图片的加载。

##其他

- [使用hexo搭建博客](http://yangjian.me/workspace/building-blog-with-hexo/)

##参考

- [zhanxin](http://www.zhanxin.info/)的[jekyll教程](http://www.zhanxin.info/jekyll/)

[^1]: [jekyllbootstrap](http://jekyllbootstrap.com/usage/jekyll-quick-start.html)
[^2]: [jekyllrb](http://jekyllrb.com/)
[^3]: [Zero to Hosted Jekyll Blog in 3 Minutes](http://jekyllbootstrap.com/index.html#start-now)

