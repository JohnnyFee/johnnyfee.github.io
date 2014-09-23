---
layout: post
title: "Angular Template Loading"
category : Angular
tags : [angular, tutorial]
--- 

> 原文：[angular模板加载 - SegmentFault](http://segmentfault.com/blog/bornkiller/1190000000437230)

Angular 模板可以通过内存加载、AJAX 两种方式加载。

如果之前使用过Bootstrap 插件的ng版，即angular-ui，就会了解到这种方式的具体应用。模板本质上是字符串，把字符串直接写入内存，加载时直接从内存获取，速度会更快，有两种方式显式启用内存加载。

<!--more-->

* 通过使用`$templateCache` service来实现

        angular.module('myApp', [])
          .controller('myCtrl', ['$scope','$templateCache', function($scope,$templateCache){
               var tmp = '<h4>lovestory</h4>'
                     + '<p>这是直接调用$templateCache服务获取模板文件的方式</p>'
                     + '<a href="http://www.baidu.com">服务启用templateCache方式</a>';
               $templateCache.put('lovestory.html',tmp);                
           }])


`$templateCache`服务put方法负责向内存写入模板内容。

* 通过`script`标签引入 

        <script type="text/ng-template" id="lovestory.html">
            <h4>lovestory</h4>
            <p>这是script标签获取模板文件的方式</p>
            <a href="http://www.baidu.com">标签启用templateCache方式</a>
        </script>


这里需要注意，`type="text/ng-template"`是指明这是ng模板，id属性是指实际使用模板时的一个引用，标签之间的内容才是实际的模板内容。而且，需要注意，id绝对不是URL，这个`script`标签绝对不会发出HTTP请求，具体讨论见最后。  
实际应用模板时候，使用`ID`属性，即可从内存中获取对应数据。

    <div ng-include="'lovestory.html'" class="well"></div>


使用`ng-include`的时候，应该注意，id相当于一个字符串，不是`ng-expression`，所以不要忘了加单引号。

## AJAX加载

上述的内存加载，相当于一个预定义模板，定义在`client-side`，不会与服务器有任何交互，适合变化频率低的模板。

当NG在内存中找不到对应模板时，就会启用AJAX请求，去拉取对应模板。假设项目入口文件地址为http://127.0.0.1/index.html;

    <div ng-include="'lovestory.html'" class="well"></div>

在指令中同样可以使用，templateUrl对应值

```js
angular.module('myApp', [])
    .directive('templateDemo', ['$log', function($log){
        return {
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: 'butterfly.html',
        replace: true,
        link: function($scope, iElm, iAttrs, controller) {}
        }
    }])
```

内存中没有对应模板时，AJAX请求地址为http://127.0.0.1/lovestory.html, 请求成功后将对应内容写入`$templateCache`，在页面不进行刷新，不手动删除的情况下，写入的内容不会丢失。而且，务必记住，AJAX是有缓存控制的。。。

## 内存模板优点

> 在雅虎前端优化34条里，有一条是“合并压缩文件”。

合并压缩文件可以减小HTTP请求量，又可以减小网络传输量，对于路径依赖并不严重的JS,CSS文件完全是必备，因为各JS,CSS文件开发时分割为不同的文件，实现各自的功能需求，上线时合并即可，但是，HTML文件可以压缩，但是无法合并，因为路径依赖严重。

## $templateCache 方法

`$templateCache`基于`cacheFactory`而来，接口保持一致，可以认为  
`$templateCache = $cacheFactory('template');`

方法        | 功能                    
--------- | ----------------------
put       | 向内存写入模板内容             
get       | 从内存获取模板内容             
remove    | 传入key值，删除对应模板内容       
removeAll | 删除所有模板内容              
destroy   | 解除key-value对应关系，但不释放内存
info      | 模板缓存对象的信息             

## Grunt与ID属性误解

```js
module.exports = function(grunt){
    grunt.initConfig({
        html2js : {
            simple : {
                options : {
                    base : '',
                    module : 'templateStore'
                },
                files : [{
                    src  : ['views/*.html'],
                    dest : 'build/scripts/templateStore.js'
                }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-html2js');
    grunt.registerTask('default',['html2js']);
}
```

这是我目前使用 Grunt 的 html2js 的配置方案，目的是将`views`文件夹下的所有模板文件全部放入`templateStore`模块中，各模板对应ID即为路径，生成的部分代码如下：

```js
angular.module("views/diaryList.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/diaryList.html",  '...'
}]);
```

这部分代码等效于

```js
<script type="text/ng-template" id="views/diaryList.html">
      ***********
</script>
```

现在应该明白，id只是个标示，不是URL。。。。。。
