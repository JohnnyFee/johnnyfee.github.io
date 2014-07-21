---
layout: post
title: "Jquery Plugin"
description: ""
category: Jquery
tags: [jquery]
--- 
## 编写插件的模板

参考：[我最喜欢的jQuery插件模板 - OurJS.com](http://ourjs.com/detail/52be911dd17d41eb0b000025)
原文：[My Favorite jQuery Plugin Template - Moshe's Blog](http://kolodny.github.io/blog/blog/2013/12/27/my-favorite-jquery-plugin-template/)

我使用jQuery已经有相当长的时间了，并且我会常常为它写一些插件（plugin）。我尝试过用不同的方式去写，现在这个模板是我最喜欢的：

    ;(function($) {
      // multiple plugins can go here
      (function(pluginName) {
        var defaults = {
          color: 'black',
          testFor: function(div) {
            return true;
          }
        };
        $.fn[pluginName] = function(options) {
          options = $.extend(true, {}, defaults, options);
                
          return this.each(function() {
            var elem = this,
              $elem = $(elem);
    
            // heres the guts of the plugin
              if (options.testFor(elem)) {
                $elem.css({
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: options.color
                });
              }
          });
        };
        $.fn[pluginName].defaults = defaults;  
      })('borderize');
    })(jQuery);
      
//下面是用法
    
    $('div').borderize();
    $('div').borderize({color: 'red'});

<!--more-->
  
以下是我喜欢这种模板的原因  
  
1. 你仍然可以访问里面的默认选项，即便它被重写了（简单地通过父属性的访问）  
2. 通过修改pluginName即可更改插件的名字。（这种方式对代码压缩也非常有利）  
  
第#1点非常强大，比如说我们希望复写这个方法，但是仍然希望保留原来的方法，我们可以看下面的例子：

    $('.borderize').borderize({
        testFor: function(elem) {
            var $elem = $(elem);
            if (elem.is('.inactive')) {
                return false;
            } else {
                // calling "parent" function
                return $.fn.borderize.defaults.testFor.apply(this, arguments);
            }
        }
    });
    We can even do this with regular properties like this
    
    var someVarThatMayBeSet = false;
    /* code ... */
    
    $('.borderize').borderize({
        color: someVarThatMayBeSet ? 'red' : $.fn.borderize.defaults.color
    });

## slick

- [slick - the last carousel you'll ever need](http://kenwheeler.github.io/slick/)

## Table

- [响应式表格jQuery插件 – Responsive tables](http://www.shejidaren.com/responsive-tables-for-bootstrap-3.html)

## CSS

- [JSIZES](http://www.bramstein.com/projects/jsizes/) JQUERY EXTENSION PLUGIN FOR CSS PROPERTIES

## DOM

- [Kreate.js](http://itsjonq.github.io/kreate/)这款工具有助于对 jQuery对象快速生成DOM。你可以创建单个或多个元素。

## Progress

- [30个jQuery & CSS3加载动画和进度栏插件 - WEB开发者](http://www.admin10000.com/document/3957.html)

### [NProgress](http://ricostacruz.com/nprogress/)

NProgress.js 是纳米级的进度条插件。拥有逼真的的涓涓细流动画效果来告诉你的用户，某些事情正在发生。它的灵感来自于谷歌，YouTube，应用了，这款苗条的进度条是完美的，适用于 Turbolinks，Pjax 以及其他重 Ajax 的应用程序。

[![](http://img.readitlater.com/i/www.admin10000.com/UploadFiles/Document/201402/10/20140210111632427889/RS/w640.JPG)](http://ricostacruz.com/nprogress/)

[插件下载](https://github.com/rstacruz/nprogress/archive/master.zip "Download")[在线演示](http://ricostacruz.com/nprogress/ "Download")

### TAG

- [taggingJS](http://sniperwolf.github.io/taggingJS/)

## Scroll

- [20 个用于处理页面滚动效果的 jQuery 插件](http://www.oschina.net/translate/20-jquery-plugins-for-scrolling-effects)
- [garand / sticky](https://github.com/garand/sticky)
- [bbarakaci / fixto](https://github.com/bbarakaci/fixto)

### [jQuery Scroll Path](http://joelb.me/scrollpath/)

这款插件用于实现自定义路径的滚动效果。可以显示 使用 Canvas 绘制 路径线条和弧形，看到非常形象的运动效果。

使用示例：

    $(".your-container-element").scrollPath({
        drawPath: true,
        wrapAround: true,
        scrollBar: false
    });
    

[![](http://img.readitlater.com/i/www.admin10000.com/UploadFiles/Document/201402/10/20140210111632312497/RS/w640.JPG)](http://joelb.me/scrollpath/)

[插件下载](https://github.com/JoelBesada/scrollpath/zipball/master "Download")  [在线演示](http://joelb.me/scrollpath/ "Demo")

## Toolbar

### [Toolbar.Js](http://paulkinzett.github.io/toolbar/)

Toolbar.js 是一款帮助你快速创建 Tooltip 风格工具栏的 jQuery 插件，可以用于网站或者 Web 应用。工具栏的风格可以使用 [T](http://www.cnblogs.com/lhb25/archive/2012/09/11/resources-that-complement-twitter-bootstrap.html)witter Bootstrap 的图标轻松定制，还提供了灵活的工具栏展示位置和图标数量配置。

#### 主要特色：

* 简单的实现，简单的参数设置；
* 根据需要，可以运行尽可能多的工具栏；
* 工具栏可以连接到所需的任何元素；
* 工具栏的图标能够通过流行的 Twitter Bootstrap 框架定制；
* 工具栏能够响应元素的尺寸变化。


[![](http://img.readitlater.com/i/www.admin10000.com/UploadFiles/Document/201402/10/20140210111632264971/RS/w640.JPG)](http://paulkinzett.github.io/toolbar/)

[插件下载](https://github.com/paulkinzett/toolbar/zipball/master "Download")  [在线演示](http://paulkinzett.github.io/toolbar/ "Demo")

##Layout

- [15款最好的 jQuery 网格布局插件 - WEB开发者](http://www.admin10000.com/document/3942.html)

### [freetile.js](http://yconst.com/web/freetile/)

Freetile 这款 jQuery 插件，用于高效的组织网页内容为动态、响应式的布局。

使用示例：

    $('#container').freetile({ animate: true, elementDelay: 30 });
    

[![](http://img.readitlater.com/i/www.admin10000.com/UploadFiles/Document/201402/10/20140210111632215010/RS/w640.JPG)](http://yconst.com/web/freetile/)

[插件下载](https://github.com/yconst/Freetile/archive/master.zip "Download")  [在线演示](http://yconst.com/web/freetile/ "Demo")

### [gridster.js](http://gridster.net/)

这款插件用于实现神话般的可拖放的多列网格布局，允许建立直观的跨越多个列的拖动布局元素。

使用示例：

    $(function(){
     
        $(".gridster ul").gridster({
            widget_margins: [10, 10],
            widget_base_dimensions: [140, 140]
        });
     
    });
    

[![](http://img.readitlater.com/i/www.admin10000.com/UploadFiles/Document/201402/10/20140210111632826461/RS/w640.JPG)](http://gridster.net/)

[插件下载](https://github.com/ducksboard/gridster.js/zipball/master "Download")[在线演示](http://gridster.net/ "Demo")

### [FlowType](http://simplefocus.com/flowtype/)

在理想的情况下，最易读的版式包含每行的字符在45和75之间。所有的屏幕宽度只用 CSS 媒体查询是很难完成的。

FlowType.JS 简化了这一困难，基于 特定元素的宽度改变字体大小和随后的行高的，这使得在任何屏幕都有完美的排版。

[![](http://img.readitlater.com/i/www.admin10000.com/UploadFiles/Document/201402/10/20140210111632769174/RS/w640.JPG)](http://simplefocus.com/flowtype/)

[插件下载](https://github.com/simplefocus/FlowType.JS/archive/master.zip)[在线演示](http://simplefocus.com/flowtype/)

##补全
- [MagicSuggest](http://nicolasbize.github.io/magicsuggest/) Auto-suggest combo with bootstrap theme using jQuery.

##图片
- [malsup / cycle](https://github.com/malsup/cycle/tree/master)
- [20 个具有惊艳效果的 jQuery 图像缩放插件 - WEB开发者](http://www.admin10000.com/document/3853.html)

##通知
- [noty](http://ned.im/noty/) noty is a jQuery plugin that makes it easy to create alert - success - error - warning - information - confirmation messages as an alternative the standard alert dialog. Each notification is added to a queue. 

##选项卡

- [zhangxinxu / powerSwitch](https://github.com/zhangxinxu/powerSwitch) It's a jQuery plugin, whitch is used for web, used for almost any switch affect.
  [jQuery powerSwitch万能slide(切换)插件](http://www.zhangxinxu.com/wordpress/2013/11/jquery-powerswitch-%E4%B8%87%E8%83%BD%E5%88%87%E6%8D%A2-slide-%E6%8F%92%E4%BB%B6/)
- [jsw0528/jQuery.Switchable](https://github.com/jsw0528/jQuery.Switchable)
  + [jQuery.Switchable - Tabs, Slide, Scrollable & Accordion, 4 in 1](http://switchable.mrzhang.me/)
- 

##Form

- [jQuery UI Virtual Keyboard plugin](http://jquerybyexample.blogspot.com/2012/04/jquery-ui-virtual-keyboard-plugin.html)
- [numberMask](https://github.com/MaximTkachenko/jquery.numberMask) 
    This jquery plugin gives you full control of input and formatting of numbers in web-form.
- [10个用来处理键盘事件的JQuery插件和JS类库](http://www.admin10000.com/document/3748.html)

### [Fancy Input](http://dropthebit.com/demos/fancy_input/fancyInput.html)

这款 jQuery 插件不只是关注外观，同时在交互方面通过 CSS3 特性让文本输入域变得更有趣，更有吸引力。

[![](http://img.readitlater.com/i/www.admin10000.com/UploadFiles/Document/201402/10/20140210111632309036/RS/w640.JPG)](http://dropthebit.com/demos/fancy_input/fancyInput.html)

[插件下载](https://github.com/yairEO/fancyInput/archive/master.zip "Download")[在线演示](http://dropthebit.com/demos/fancy_input/fancyInput.html "Demo")

### [jQuery File Upload](https://github.com/blueimp/jQuery-File-Upload)

这是最受欢迎的 jQuery 文件上传组件，支持批量上传，拖放上传，显示上传进度条以及校验功能。

支持预览图片、音频和视频，支持跨域上传和客户端图片缩放，支持的服务端平台有：PHP, Python, Ruby on Rails, Java, Node.js, Go 等等。

[插件下载](https://github.com/blueimp/jQuery-File-Upload/archive/8.8.5.zip)[在线演示](http://blueimp.github.io/jQuery-File-Upload/)

### [jQuery Validation Engine](https://github.com/posabsolute/jQuery-Validation-Engine)

这款插件的校验提示效果很漂亮，基于 CSS3 实现，可以参考一下。

[![](http://img.readitlater.com/i/www.admin10000.com/UploadFiles/Document/201402/10/20140210111632020345/RS/w640.JPG)](https://github.com/posabsolute/jQuery-Validation-Engine)

[插件下载](http://github.com/posabsolute/jQuery-Validation-Engine)[在线演示](http://www.position-relative.net/creation/formValidator/demos/demoValidators.html)

### [equalize.js](http://tsvensen.github.com/equalize.js/)

用于均衡元素的的高度或宽度的 jQuery 插件。这对于统一页面元素规格的布局非常有用。

均衡 id 为 width-example 的元素的宽度的使用实例：

    $('#width-example').equalize('width');

均衡 class 为 parent 的元素的子段落的使用实例：

    $('.parent').equalize({children: 'p'});

[插件下载](https://github.com/tsvensen/equalize.js/archive/master.zip "Download")[在线演示](http://tsvensen.github.com/equalize.js/ "Demo")



### Jquery-maskMoney
[Jquery-maskMoney](http://plentz.github.io/jquery-maskmoney/) 
    jQuery plugin to mask data entry in the input text in the form of money (currency).

- bug: 当值发生改变时，并不会触发change事件，可以使用`onKeyDown`代替，参考[错误报告]        (https://github.com/plentz/jquery-maskmoney/issues?labels=&page=1&state=open)。
 
- bug: 当输入的值超过浮点值的精度范围后，讲出现溢出的错误
    <https://github.com/plentz/jquery-maskmoney/issues/61>
 
### 设置光标位置
 
[jQuery Set Cursor Position in Text Area](http://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area)
 
    new function($) {
      $.fn.setCursorPosition = function(pos) {
        if ($(this).get(0).setSelectionRange) {
          $(this).get(0).setSelectionRange(pos, pos);
        } else if ($(this).get(0).createTextRange) {
          var range = $(this).get(0).createTextRange();
          range.collapse(true);
          range.moveEnd('character', pos);
          range.moveStart('character', pos);
          range.select();
        }
      }
    }(jQuery);

## Templating

10 个强大的JavaScript / jQuery 模板引擎推荐 <http://www.iteye.com/news/24827>

- codepb / jquery-template <https://github.com/codepb/jquery-template>
- BorisMoore / jsviews <https://github.com/BorisMoore/jsviews>
- BorisMoore / jsrender <https://github.com/BorisMoore/jsrender>
- Tempo 2.0 <http://twigkit.github.io/tempo/>
- janl / mustache.js <https://github.com/janl/mustache.js#readme>

## 参考

- [期待已久的2013年度最佳 jQuery 插件揭晓 - WEB开发者](http://www.admin10000.com/document/3847.html)
- [50个jQuery 插件可将你的网站带到另外一个高度 - WEB开发者](http://www.admin10000.com/document/4551.html)

## TODO

- [2014年50个程序员最适用的免费jQuery插件 - WEB开发者](http://www.admin10000.com/document/4711.html)
