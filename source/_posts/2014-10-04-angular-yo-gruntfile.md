---
layout: post
title: "使用 Yoeman generator-angular 生成工程的 Gruntfile 源码分析"
category: Angular
tags: [angular, yo, grunt]
--- 

Yeoman 生成的 Angular 脚手架提供了 27 个任务配置和 3 个自定义任务。这三个自定义任务分贝为:

- build 编译产品化的版本。
- serve 编译，让后启动一个 web 服务器。
- test 执行应用的单元测试。
- default 构建一个优化过的，产品化的应用版本。

```js
module.exports = function(grunt) {
    grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'wiredep',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngAnnotate',
        'copy:dist',
        'cdnify',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
}
```

## serve

```js
grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'wiredep',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });
```

如果 `serve` 的目标是 `dist`，那么就运行 build，并且为 build 后的版本启动 web 服务器，这个服务器是持久运行的。主要用于测试发布版本。

在调试阶段，一般使用非 `dist` 目标，这个目标运行的任务为：

- clean:server,
- wiredep,
- concurrent:server,
- autoprefixer,
- connect:livereload,
- watch

### clean

[gruntjs/grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean) 用于清除文件和文件夹。

clean 的任务配置为：

```js
clean: {
  dist: {
    files: [{
      dot: true,
      src: [
        '.tmp',
        '<%= yeoman.dist %>/{,*/}*',
        '!<%= yeoman.dist %>/.git*'
      ]
    }]
  },
  server: '.tmp'
}
```

`serve` 任务只是用了 `clean:server` 目标，即删除 `.tmp` 目录。

### wiredep

[stephenplusplus/grunt-wiredep](https://github.com/stephenplusplus/grunt-wiredep) 插件基于 [taptapship/wiredep](https://github.com/taptapship/wiredep)。用来根据 bower.json 在指定文件的占位符中注入 JavaScript 或者 CSS 依赖。

`wiredep` 的配置为：

```js
wiredep: {
  app: {
    src: ['<%= yeoman.app %>/index.html'],
    ignorePath:  /\.\.\//
  }
}
```

`index.html` 中两个占位符：

```html
<!-- bower:js -->
<!-- endbower -->

<!-- bower:css -->
<!-- endbower -->
```

运行 grunt:wiredep 后，这两个占位符会根据 `bower.json` 中的依赖关系正确填充。

