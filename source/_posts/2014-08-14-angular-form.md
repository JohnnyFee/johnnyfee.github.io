---
layout: post
title: "Angular Form"
category : Angular
tags : [angular, form]
---

## Angular Form

HTML代码：

```html
<html ng-app='TestFormModule'>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <script src="../angular-1.0.3/angular.min.js"></script>
    </head>
    <body>
        <form name="myForm" ng-submit="save()" ng-controller="TestFormModule">
              <input name="userName" type="text" ng-model="user.userName" required/>
              <input name="password" type="password" ng-model="user.password" required/>
              <input type="submit" ng-disabled="myForm.$invalid"/>
        </form>
    </body>
    <script src="FormBasic.js"></script>
</html>
```

JS代码：

```js
var appModule = angular.module('TestFormModule', []);
appModule.controller("TestFormModule",function($scope){
    $scope.user={
        userName:'damoqiongqiu',
        password:''
    };
    $scope.save=function(){
        alert("保存数据!");
    }
});
```

注意：这里的form已经不是原生的HTML表单，而是Angular自己的指令了！
 
由于我们这个例子里面的<form>标签处于 `ng-app` 内部，所以它已经被Angular封装过，是一个 Angular 指令。

经过Angular封装之后的form具有哪些特性呢？

1. HTML原生的form表单是不能嵌套的，而Angular封装之后的form就可以嵌套。
2. Angular为form扩展了自动校验、防止重复提交等功能。

有人说，如果我想要使用原生的HTML表单，应该怎么做呢？

Angular提供了一个 `ng-pristine` 指令，把这个指令写在form标签中，Angular就知道你想使用原生的form标签了。

Angular为表单内置了4中CSS样式。

- `ng-valid` 校验合法状态
- `ng-invalid` 校验非法状态
- `ng-pristine` 如果要使用原生的form，需要设置这个值
- `ng-dirty`     表单处于脏数据状态

Angular 在对表单进行自动校验的时候会校验Model上的属性，如果不设置 `ng-model`，则Angular无法知道 `myForm.$invalid` 这个值是否为真。

我们可以把以上例子里面的代码改成这样：

```html
<input name="password" type="password" required/>
```

也就是把ng-model="user.password"这个属性去掉了，required配置项还保留在这里，然后你会发现，即使你不输入密 码，保存按钮也是可以用的。因为此时myForm.$invalid为false，也就是说如果input不绑定数据模型，校验机制就无法校验这个输入项。

## References

- [AngularJS Form 进阶：远程校验和自定义输入项](http://damoqiongqiu.iteye.com/blog/1920993)
- [AngularJS表单基础](http://damoqiongqiu.iteye.com/blog/1920191)