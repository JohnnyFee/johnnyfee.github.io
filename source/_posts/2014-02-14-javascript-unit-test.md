layout: post
title: "JavaScript 单元测试"
description: ""
category: JavaScript
tags: [javascript]
--- 

随着单元测试的普及，尤其是敏捷开发的推动，涌现了许多优秀的JavaScript单元测试框架，如QUnit、Jasmine等。

<!--more-->

## Framework

- [Mocha - the fun, simple, flexible JavaScript test framework](http://mochajs.org/) Mocha is a feature-rich JavaScript test framework running on node.js and the browser, making asynchronous testing simple and fun.
- [Home - Chai](http://chaijs.com/) Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.
- [marmelab/gremlins.js](https://github.com/marmelab/gremlins.js) Monkey testing library for web apps and Node.js.
- [Intern: A next-generation JavaScript testing stack](http://theintern.io/)
- [Jest](http://facebook.github.io/jest/index.html)
- [Nightwatch.js](http://nightwatchjs.org/) Browser automated testing done easy. Write efficient and straightforward Javascript End-to-End tests in Node.js which run against a Selenium server.
- [Mocha - the fun, simple, flexible JavaScript test framework](http://visionmedia.github.io/mocha/)
- [pivotal/jasmine](https://github.com/pivotal/jasmine) DOM-less simple JavaScript testing framework <http://jasmine.github.io/>.
- [yahoo/preceptor](https://github.com/yahoo/preceptor)
- [krasimir/atomus](https://github.com/krasimir/atomus) A small utility library for running client-side tests in Node.js environment.

### E2E

- [Nightwatch.js - Developer Guide](http://nightwatchjs.org/guide)

### Util

- [basicallydan/interfake · GitHub](https://github.com/basicallydan/interfake) 快速创建虚拟 API。

## QUnit

QUnit是jQuery团队开发的JavaScript单元测试工具，功能强大且使用简单。目前所有的JQuery代码都使用QUnit进行测试，原生的JavaScript也可以使用QUnit。QUnit所有的API可以分为三类：Setup，Assertions，Asynchronous Testing。

- [QUnit](http://qunitjs.com/)
- [Introduction to Unit Testing | QUnit](http://qunitjs.com/intro/)
- [QUnit API Documentation](http://api.qunitjs.com/)
- [Cookbook | QUnit](http://qunitjs.com/cookbook/)

### 优点

- 有漂亮的外观和完整的测试功能（包括异步测试）；
- 非常简单，容易上手，目前公开的API只有19个；
- 不需要依赖其它任何软件包或框架，只要能运行JS的地方就可以，QUnit本身只有一个JS文件和CSS文件，当然如果需要可以和jQuery等其它框架集成；
- 不仅支持在浏览器中测试，还支持在Rhino和node.js等后端测试。

### 缺点

对自动化支持不好，很难和Ant、Maven或自动构建等工具集成，主要用在浏览器中进行测试。

## Demo

以下Demo用于异步测试：

    test( "a test", function() {
        stop();
        var result = null;
        $.ajax(
            url,
            {},
            function(data){
                result = data;
            }
        );
        setTimeout(function() {
            equals(result, "success" );
            start();
        }, 150 );
    });

## Jasmine框架

Jasmine是一个有名的JavaScript单元测试框架，它是独立的__行为驱动__开发框架，语法清晰易懂。

- 源码：[pivotal/jasmine](https://github.com/pivotal/jasmine)
- 文档：[introduction.js](http://jasmine.github.io/2.0/introduction.html)

### 优点

- 它是基于行为驱动开发实现的测试框架，它的语法非常贴近自然语言，简单明了，容易理 解。
- 能很方便的和Ant、Maven等进行集成进行自动化测试，也可以方便和Jekins等持续集成工- 具进行集成，可以生成测试结果的XMl文档。
- 它有丰富的API，同时用户也支持用户扩展它的API，这一点很少有其它框架能够做到。
- 使用方便简单，只需要引入两个js文件即可
- 不仅支持在浏览器中测试，还支持在Rhino和node.js等后端测试。
- 对于Ruby语言有特别的支持，能够非常方便的集成到Ruby项目中去

### 缺点

在浏览器中的测试界面不如QUnit美观、详细。

### Demo

    describe("测试add()函数", function() {
        it("1 + 1 = 2", function(){
            expect(add(1, 1)).toBe(2);
        });
    });

## JsTestDriver

JsTestDriver是一个JavaScript单元测试工具，易于与持续构建系统相集成并能够在多个浏览器上运行测试轻松实现TDD风格的开发。当在项目中配置好JsTestDriver以后，如同junit测试java文件一般，JsTestDriver可以直接通过运行js文件来进行单元测试。JsTestDriver框架本身就是JAVA的jar包，需要在本地运行并监听一个端口。

### 优点

- 可以一次测试多个浏览器，使用方法是在启动服务时可以将多个浏览器的路径作为参数传- 进去。可以在多台机器上的浏览器中运行，包括移动设备。
- 测试运行得很快，因为不需要将结果添加到DOM中呈现出来，它们能够同时在任意多的浏览- 器中运行，未修改的文件浏览器会从缓存提取。
- 不需要HTML配件文件，仅仅只需提供一个或多个脚本和测试脚本，测试运行器运行时会创- 建一个空文件。
- 能很方便的和Ant、Maven等进行集成进行自动化测试，也可以方便和Jekins等持续集成工- 具进行集成，可以生成测试结果的XML文档。
- 有Eclipse和IntelliJ插件，可以很方便的在这两个IDE中进行测试，和JUnit很像。
- 支持其它测试框架，可以测试其它测试框架写的测试代码，比如有对应的插件可以将QUnit- 和Jasmine测试代码转换成JsTestDriver的测试代码。

### 缺点

不能在浏览器中测试，只能通过自动化工具或控制台运行。生成的结果不够直观。
安装使用稍微有点麻烦，依赖于JAVA环境。

### 测试步骤

- cmd 进入目录
- 运行命令”java –jar JsTestDriver.jar –port 9876”
- 打开页面http://localhost:9876，点击“捕获浏览器”。
- 新打开一个终端，运行命令”java –jar JsTestDriver.jar –tests - all”，运行所有测试用例
- 也可以单独运行某一个用例，如运行命令” java –jar JsTestDriver.jar –tests addTest.testA”

### Reference

- [javascript单元测试 - 溤淋 - 博客园](http://www.cnblogs.com/frostbelt/archive/2012/08/03/2622302.html)

## Tutorial

- [christian-bromann/awesome-selenium](https://github.com/christian-bromann/awesome-selenium)
