---
layout: post
title: "使用 Yoeman generator-angular 生成工程的 Gruntfile 源码分析"
category: Grunt
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

### clean:server

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

运行 grunt:wiredep 后，这两个占位符会根据 `bower.json` 中的依赖关系正确填充，如；

```html
<!-- bower:css -->
<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css" />
<!-- endbower -->

<!-- bower:js -->
<script src="bower_components/jquery/dist/jquery.js"></script>
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/angular-touch/angular-touch.js"></script>
<script src="bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
<script src="bower_components/angular-ui-router/release/angular-ui-router.js"></script>
<script src="bower_components/bootstrap/dist/js/bootstrap.js"></script>
<!-- endbower -->
```

`bower.json` 为：

```json
{
  "name": "argo",
  "version": "0.0.0",
  "dependencies": {
    "angular": "~1.2.0",
    "angular-touch": "~1.2.0",
    "angular-bootstrap": "~0.11.2",
    "angular-ui-router": "~0.2.11",
    "bootstrap": "~3.2.0"
  },
  "devDependencies": {
    "angular-mocks": "~1.2.0",
    "angular-scenario": "~1.2.0"
  },
  "appPath": "app"
}
```

### concurrent:server

[sindresorhus/grunt-concurrent](https://github.com/sindresorhus/grunt-concurrent) 用于运行并行任务。对于耗时的任务（如 Coffee and Sass）或者运行[多个阻塞任务](https://github.com/sindresorhus/grunt-concurrent#logconcurrentoutput)（如 `nodemon` and `watch`） 时很有用。

`concurrent` 任务配置为：

```js
concurrent: {
  server: [
    'copy:styles'
  ]
}
```

`concurrent:server` 目标中，并行运行 `copy:styles`。

### copy:styles

[gruntjs/grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy) 用于拷贝文件。

```js
copy: {
    styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
    }
}
```

`expand: true` 是为了启用扩展属性，`cwd` 修改 `dest` 和 `src` 的相对路径，`flatten` 将 `dest` 文件全部平板地放置，即不含目录结构。所以，`style` 目标的作用是，将 `<%= yeoman.app %>/styles` 以及下级目录中的所有 css 文件以平板方式拷贝到 `.tmp/styles/`。

### autoprefixer

[nDmitry/grunt-autoprefixer](https://github.com/nDmitry/grunt-autoprefixer) 使用 [Can I Use](caniuse.com) 数据库为 CSS 添加前缀。

`options.browsers` 用于指定浏览器的版本，如 'last 1 version' 指定各浏览器的最后一个版本。

```js
autoprefixer: {
  options: {
    browsers: ['last 1 version']
  },
  dist: {
    files: [{
      expand: true,
      cwd: '.tmp/styles/',
      src: '{,*/}*.css',
      dest: '.tmp/styles/'
    }]
  }
}
```

`dist` 目标表示为 `.tmp/styles/` 目录以及下级目录中的所有 css 文件添加前缀，然后覆盖原文件。

### connect:livereload

[gruntjs/grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect) 用于启动一个静态 web 服务器。

```js
connect: {
  options: {
    port: 9000,
    // Change this to '0.0.0.0' to access the server from outside.
    hostname: 'localhost',
    livereload: 35729
  },
  livereload: {
    options: {
      open: true,
      middleware: function (connect) {
        return [
          connect.static('.tmp'),
          connect().use(
            '/bower_components',
            connect.static('./bower_components')
          ),
          connect.static(appConfig.app)
        ];
      }
    }
  }
```

`options.hostname` 和 `options.port` 用于指定服务器的主机名和端口。`options.hostname` 默认为 `0.0.0.0`，可以设置为 '*'，让它可以从任何地方访问。

`options.open` 指定为 `true` 时表示打开默认的服务器 URL，指定为字符串时，则打开该字符串指定的地址。

`options.livereload` 设置为 `true` 或者端口号，表示使用 [connect-livereload](https://github.com/intesso/connect-livereload) 在你的页面中注入 live reload 脚本。这不会执行 live reloading，它试图和 `grunt-contrib-watch` 或者其他根据文件的修改触发 live reload 的服务器结合使用。

`options.keepalive` 设置为 `true` 表示让服务器无限期的执行。而这个任务之后的其任务不再执行。默认情况下，grunt 任务执行完成，web 服务器会停止。

`options.middleware` 类型为 Function 或者数组，用来添加 Connect 中间件。如果是函数，该函数返回中间件数组。Default: `Array` of connect middlewares that use `options.base` for static files and directory browsing，如：

```js
connect: {
    server: {
      options: {
        middleware: [
          function myMiddleware(req, res, next) {
            res.end('Hello, world!');
          }
        ],
      },
    },
}
```

我们的例子中，`connect.livereload` 目标中使用的是函数方式，返回 3 个使用 [connect.static](http://www.senchalabs.org/connect/static.html) 方法构建的中间件。分别把 `.tmp`，`/bower_components`，`appConfig.app` 作为 static 资源。

### watch

[gruntjs/grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch) 用于监视文件的变化，然后运行指定的任务。

```js
watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    }
```

`options.livereload` 目标中通过 `options.livereload` 启用实时加载，使用的是 `connect` 任务的 `livereload` 配置。当 `livereload.files` 中指定的文件发生变化时，live reloading 服务器就会被触发。See also how to [enable livereload on your HTML](https://github.com/gruntjs/grunt-contrib-watch/blob/master/docs/watch-examples.md#enabling-live-reload-in-your-html). 在这里，我们是通过 `connect.livereload` 目标为页面注入 live reloading 脚本。

除了 `livereload` 之外，还有

- `bower` 监视 `bower.json` 文件，一旦文件发生变化，运行 `wiredep` 任务。
- `js` 监视 `<%= yeoman.app %>/scripts/{,*/}` 下的所有 js 文件，如果有变化，则运行 `newer:jshint:all` 任务，而且会触发 live reloading 服务器。
- `jsTest` 监视 `test/spec/{,*/}` 下的 js 文件，如果有变化，则运行 'newer:jshint:test' 和 'karma' 两个任务。
- `styles` 监视 `<%= yeoman.app %>/styles/` 下的文件，如果有变化，运行 'newer:copy:styles' 和 'autoprefixer' 两个任务。
- `gruntfile` 监视 Gruntfile 文件，没有任务。

### newer

[tschaub/grunt-newer](https://github.com/tschaub/grunt-newer) 配置任务只对新的文件运行任务。`newer` 任务不要求特殊的配置，你只需要在任务前加上 `newer:`。

对于同时有 `src` 和 `dest` 的任务，`src` 中的文件的修改时间会和 `dest` 中修改时间比较，如果有一个多多个更新的文件，则任务会重新运行，如：

```js
grunt.initConfig({
uglify: {
  all: {
    files: {
      'dest/app.min.js': ['src/**/*.js']
    }
  }
}
});

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-newer');

grunt.registerTask('minify', ['newer:uglify:all']);
```

`minify` 任务只有在 `src/**/*.js` 中的一个或多个文件比 `dest/app.min.js` 更新时，`uglify:all` 任务才会运行。

对于只有 `src` 没有 `dest` 的配置，`newer` 只会使用比上次成功运行的时间新的文件。如：

```js
jshint: {
  options: {
    jshintrc: '.jshintrc'
  },
  all: {
    src: 'src/**/*.js'
  }
}

grunt.registerTask('lint', ['newer:jshint:all']);
```

第一次运行 `grunt lint` 时，`jshint:newer:all` 会使用所有 src 下的文件，之后，只有你修改过的文件才会运行 `jshint`。

结合 `watch` 使用时，当 `src` 中的文件变化时，会使用新的文件运行任务，如：

```js
js: {
    files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
    tasks: ['newer:jshint:all'],
    options: {
      livereload: '<%= connect.options.livereload %>'
    }
  }
```

当 `files` 中的文件有变化时，针对新的文件运行指定的任务，如这里的 `jshint:all`。

## build

`build` 任务由以下 14 个子任务组成。 

```js
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
```

### clean:dist

清除 `.tmp` 和 `<%= yeoman.dist %>/{,*/}*`，但保留 `<%= yeoman.dist %>/.git*` 文件或者文件夹。

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

### wiredep

根据 bower 的依赖关系替换 `index.html` 中的占位符。

### usemin

```js
useminPrepare: {
  html: '<%= yeoman.app %>/index.html',
  options: {
    dest: '<%= yeoman.dist %>',
    flow: {
      html: {
        steps: {
          js: ['concat', 'uglifyjs'],
          css: ['cssmin']
        },
        post: {}
      }
    }
  }
}
```

`useminPrepare` 为实现优化修改 Grunt 配置，定义 js 的优化流程为 `concat` --> `uglifyjs`，css 的优化流程为 `cssmin`。优化的 html 文件为 `<%= yeoman.app %>/index.html`，优化后的文件路径为 `'<%= yeoman.dist %>`。

```js
// Performs rewrites based on filerev and the useminPrepare configuration
usemin: {
  html: ['<%= yeoman.dist %>/{,*/}*.html'],
  css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
  options: {
    assetsDirs: ['<%= yeoman.dist %>','<%= yeoman.dist %>/images']
  }
}
```

`usemin` 使用 `useminPrepare` 阶段准备的配置优化，将优化后的版本替换指定文件的 usemin 块。`usemin` 中定义了两个目标，`html` 和 `css`，先使用优化优化版本替换这些文件中的 usemin 块，让后试图使用 revved 的版本再次替换。`options.assetsDirs` 重定义了 revved 版本的查找路径。

### concurrent:dist

并行运行 `concurrent:dist` 目标中的三个子任务。

```js
concurrent: {
    dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
    ]
}
```

- copy:styles 将 `<%= yeoman.app %>/styles` 以及下级目录中的所有 css 文件以平板方式拷贝到 `.tmp/styles/`。
- imagemin 将 `<%= yeoman.app %>/images` 中的图片压缩到 `<%= yeoman.dist %>/images` 中。
- svgmin 将 `<%= yeoman.app %>/images/{,*/}/` 下的所有 svg 图片压缩到 `<%= yeoman.dist %>/images` 中。

###  imagemin

使用 [gruntjs/grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin) 进行图片压缩。

```js
imagemin: {
    dist: {
        files: [
            {
                expand: true,
                cwd: '<%= yeoman.app %>/images',
                src: '{,*/}*.{png,jpg,jpeg,gif}',
                dest: '<%= yeoman.dist %>/images'
            }
        ]
    }
}
```

压缩的图片存在于 `<%= yeoman.app %>/images` 压缩后的图片放置在 `<%= yeoman.dist %>/images`。所以这个任务的目的是将 `<%= yeoman.app %>/images` 中的图片压缩到 `<%= yeoman.dist %>/images` 中。

### svgmin

[sindresorhus/grunt-svgmin](https://github.com/sindresorhus/grunt-svgmin) 用来压缩 SVG。 

```js
svgmin: {
  dist: {
    files: [{
      expand: true,
      cwd: '<%= yeoman.app %>/images',
      src: '{,*/}*.svg',
      dest: '<%= yeoman.dist %>/images'
    }]
  }
}
```

将 `<%= yeoman.app %>/images/{,*/}/` 下的所有 svg 图片压缩到 `<%= yeoman.dist %>/images` 中。

### autoprefixer

### concat

### ngAnnotate

### copy:dist

### cdnify

### cssmin

### uglify

### filerev

### usemin

### htmlmin