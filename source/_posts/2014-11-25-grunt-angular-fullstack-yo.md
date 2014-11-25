---
layout: post
title: "使用 Yoeman generator-angular-fullstack 生成工程的 Gruntfile 源码分析"
category: Grunt
tags: [angular, fullstack, yo, grunt]
--- 

本文是给予 

Yeoman 生成的 [yeoman/generator-angular](https://github.com/yeoman/generator-angular) 脚手架提供了 26 个任务配置和 6 个自定义任务。这 6 个自定义任务分贝为:

- wait 
- express-keepalive 
- serve 
- test 
- build
- defalt

## build

```js
grunt.registerTask('build', [
    'clean:dist',
    'injector:less', 
    'concurrent:dist',
    'injector',
    'wiredep',
    'useminPrepare',
    'autoprefixer',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);
```

由 16 个子任务组成，






