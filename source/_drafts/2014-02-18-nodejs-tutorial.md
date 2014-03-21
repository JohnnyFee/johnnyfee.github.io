---
layout: post
title: "Node Tutorial"
category: Web
tags: [web]
--- 
## 定义模块

### exports 

The attachment to exportsapproach is pretty straightforward, as you can 
see from the following example:

mymod.js：

    var name = exports.name = 'Packt';
    var secret = 'zoltan';
    exports.lower = function(input) {
    return input.toLowerCase();
    };
    exports.upper = function(input) {
    return input.toUpperCase();
    }

运行：

    $ node test.js

### module.exports

The assignment to module.exportsapproach is straightforward too. If you were 
to implement the previous module using the assignment method, this is how it 
would look like:

    var secret = 'zoltan';
        module.exports = {
        name: 'Packt',
        lower: function(input) {
        return input.toLowerCase();
        },
        upper: function(input) {
        return input.toUpperCase();
        }
    }

There is an interesting thing about the second method of writing Node modules: 
you can assign any valid JavaScript object to the module.exportsproperty, and it becomes the module. In the following example, we assign a function to the module.exports property:

    module.exports = function(word) {
        var reversed = '';
        var i = word.length - 1;
        while (i> -1) {
            var letter = word[i];
            reversed += letter;
            i--;
        }
        return reversed;
    };

test.js:

    var reverse = require('./reverse.js');
    console.log(reverse('hippopotamus'));

运行：

    $ node test.js
    sumatopoppih


## package.json

package 是一个应用的 manifest 文件 which contains meta data about some software. The content of the file may be used by the software to customize itself.

请参考 http://package.json.nodejitsu.com/

    {
        "name": "application-name",
        "version": "0.0.1",
        "private": true,
        "scripts": {
            "start": "node app"
        },
        "dependencies": {
            "express": "3.2.6",
            "jade": "*",
            "stylus": "*"
        }
    }

在版本控制工具中，通常需要忽略模块依赖的安装目录`npm_modules/`。