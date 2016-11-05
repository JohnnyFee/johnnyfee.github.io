layout: post
title: "Less Sass"
description: ""
category: CSS
tags: [css]
---
##比较

参考：[LESS vs Sass？是时侯选择Sass了 - OurJS.com](http://ourjs.com/detail/52e096ce4534c0d806000003)

###为什么Sass比LESS要好

Sass有很多可用的方法和逻辑。例如：条件和循环语句。LESS也可以做到，但不是很高效且不直观。像LESS一样，Sass也内置了一些非常友好的函数，像颜色，数字，还有变量列表。

Sass用户可以使用功能强大的Compass库。这些库LESS用户也可以用，但并不完全一样，因为这是由一个庞大的社区来共同维护的。Compass有非常强大的特性，像自动生成图片切片（CSS Sprites)，传统浏览器支持，还有对CSS3的跨浏览器支持等。

<!-- more -->

Compass同样允许你使用外部框架像Blueprint, Foundation 或 Bootstrap。这也意味着你可以非常容易的使用你喜欢的框架而不需要掌握各种不同的工具。

###LESS的问题

LESS的目标是尽量跟CSS在风格上保持一致，包括语义和结构。这对于用户的书写习惯来说是一个很好的想法，这样也让它的工作方式和SASS有很大的不同。

逻辑语句

在LESS中你可以使用"guarded mixin"来表达基本的逻辑：

    .lightswitch(@colour) when (lightness(@colour) > 40%) {
      color: @colour;
      background-color: #000;
      .box-shadow(0 3px 4px #ddd);
    }
    .lightswitch(@colour) when (lightness(@colour) < 41%) {
      color: @colour;
      background-color: #fff;
      .box-shadow(0 1px 1px rgba(0,0,0,0.3));
    }

The equivalent in Sass uses if statements:

    @mixin lightswitch($colour) {
      color: $colour;
      @if(lightness($colour) > 40%) {
        background-color: #000;
        @include box-shadow(0 3px 4px #ddd);
      }
      @if(lightness($colour) <= 40%) {
        background-color: #fff;
        @include box-shadow(0 1px 1px rgba(#000,0.3));
      }
    }

###循环

在LESS中你可以使用数字来实现循环

    .looper (@i) when (@i > 0) {
      .image-class-@{i} {
        background: url("../img/@{i}.png") no-repeat;
      }
      .looper(@i - 1);
    }
    .looper(0);
    .looper(3);

输出:

    //.image-class-3 {
    //  background: url("../img/10.png") no-repeat;
    //}
    //.image-class-2 {
    //  background: url("../img/9.png") no-repeat;
    //}
    //.image-class-1 {
    //  background: url("../img/8.png") no-repeat;
    //}

在Sass中你可以枚举任何类型的数据，这个可能更有用

    @each $beer in stout, pilsner, lager {
      .#{$beer}-background {
        background: url("../img/beers/#{$beer}.png") no-repeat;
      }
    }


输出:

    //.stout-background {
    //  background: url("../img/beers/stout.png") no-repeat;
    //}
    //.pilsner-background {
    //  background: url("../img/beers/pilsner.png") no-repeat;
    //}
    //.lager-background {
    //  background: url("../img/beers/porter.png") no-repeat;
    //}

###自定义函数

在Sass中，你可以创建你顺手的字定义函数，像这样：

    //Courtesy of Foundation... 
    $em-base: 16px !default;
    @function emCalc($pxWidth) {
      @return $pxWidth / $em-base * 1em;
    }

LESS中：

    @em-base: 16px;
    .emCalc(@pxWidth) {
      //Ah. 没办法了...
    }

呵呵… 你更喜欢哪一个呢？

###用Sass和Compass时的问题

这些似乎是人们在使用Sass时遇到的最大问题：

建立Ruby的运行环境会产生的工作量；

对命令行的恐惧；

切换到另一个工具所产生的不便和额外的时间消耗；
