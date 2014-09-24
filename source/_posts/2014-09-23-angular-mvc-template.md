---
layout: post
title: "Angular Template Loading"
category : Angular
tags : [angular, tutorial]
--- 

Angular 模板可以通过内存加载、AJAX 两种方式加载。

## Cache 加载

如果之前使用过 Bootstrap 插件的 ng 版，即 angular-ui，就会了解到这种方式的具体应用。模板本质上是字符串，把字符串直接写入内存，加载时直接从内存获取，速度会更快，有两种方式显式启用内存加载。

### 通过 `script` 标签引入 

```html
<script type="text/ng-template" id="templateId.html">
  <p>This is the content of the template</p>
</script>
```

其中，`type="text/ng-template"` 是指明这是 ng 模板。id 是模板标识。

__Note:__ the `script` tag containing the template does not need to be included in the `head` of the document, but it must be below the `ng-app` definition.

### 通过使用 `$templateCache` service 来实现

```js
angular.module('myApp', [])
  .controller('myCtrl', ['$scope', '$templateCache', function($scope, $templateCache){
       var tmp = '<h4>lovestory</h4>'
             + '<p>这是直接调用$templateCache服务获取模板文件的方式</p>'
             + '<a href="http://www.baidu.com">服务启用templateCache方式</a>';
       $templateCache.put('lovestory.html',tmp);                
   }])
```

```js
var myApp = angular.module('myApp', []);
myApp.run(function($templateCache) {
    $templateCache.put('templateId.html', 'This is the content of the template');
});
```

`$templateCache` 服务 put 方法负责向内存写入模板内容。

<!--more-->

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

### 使用 Cache 模板

    <div ng-include="'lovestory.html'" class="well"></div>

使用 `ng-include` 的时候，应该注意，id 不是 `ng-expression`，而只是一个字符串，所以不要忘了加单引号。

你也可以通过 JavaScript 来获取缓存模板

    $templateCache.get('templateId.html')

### 合并模板

在开发简短，我们可以用远程模板，在发布的时候，我们可以将模板压缩到一个文件，以减少 AJAX 请求，

这里以 [grunt-html2js](https://www.npmjs.org/package/grunt-html2js) 为例：

```js
grunt.initConfig({
  html2js: {
    options: {
      // custom options, see below
    },
    main: {
      src: ['src/**/*.tpl.html'],
      dest: 'tmp/templates.js'
    },
  },
})
```

`src/` 文件夹下的所有模板文件全部放入 `templates.js` 中。

合并模板之后，不会影响路由的定义：

```js
angular.module('main', ['templates-main'])
  .config(['$routeProvider', function ($routeProvidear) {
    $routeProvider.when('/somepath', {
      templateUrl:'some/template.tpl.html',
```

See also [grunt-angular-templates](https://www.npmjs.org/package/grunt-angular-templates)

## AJAX 加载

当 NG 在内存中找不到对应模板时，就会启用 AJAX 请求，去拉取对应模板。假设项目入口文件地址为 <http://127.0.0.1/index.html>。

    <div ng-include="'lovestory.html'" class="well"></div>

在指令中同样可以使用，templateUrl 对应值

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

内存中没有对应模板时，AJAX请求地址为 <http://127.0.0.1/lovestory.html>, 请求成功后将对应内容写入 `$templateCache`，在页面不进行刷新，不手动删除的情况下，写入的内容不会丢失。

## Tutorial

- [AngularJS Dynamic Templates – Yes We Can! – One Hungry Mind](http://onehungrymind.com/angularjs-dynamic-templates/)

## Reference

- [AngularJS: API: $templateCache](https://docs.angularjs.org/api/ng/service/$templateCache)
- [angular模板加载 - SegmentFault](http://segmentfault.com/blog/bornkiller/1190000000437230)