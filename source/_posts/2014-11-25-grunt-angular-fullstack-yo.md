layout: post
title: "使用 Yoeman generator-angular-fullstack 生成工程的 Gruntfile 源码分析"
category: Grunt
tags: [angular, fullstack, yo, grunt]
--- 

本文基于 [使用 Yoeman generator-angular 生成工程的 Gruntfile 源码分析](http://inching.org/2014/11/06/grunt-angular-yo/) 中的一些内容，与其中重复的内容不再描述。

Yeoman 生成的 [DaftMonk/generator-angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack) 脚手架提供了 26 个任务配置和 4 个自定义任务。这 4 个自定义任务分贝为:

<!-- more -->

- serve 启动服务器。
    + default 调试前端代码。前端代码的修改会 livereload，后端代码的修改会导致重启服务。
    + dist 运行打包之后的版本。
    + debug 在浏览器中调试后端代码。前端代码的修改不会 livereload。
- test 测试
    + default 服务端和客户端测试。
    + server 服务端测试。
    + client 客户端测试。
    + e2e e2e 测试。
- build 打包。前端打包到 `dist/public/` 下，后端打包到 `dist/server/` 下。
- default jshint，测试，打包。

## build

```js
grunt.registerTask('build', [
    // 1. 清除 .tmp 和 dist 目录。
    'clean:dist', 
  
    // 2. 将客户端的所有 less 文件导入到 `app.less` 中。
    'injector:less', 
  
    // 3. 将 app.less 文件编译到 `.tmp/app/app.css` 中，压缩图片。
    'concurrent:dist', 
  
    // 4. 将 `client/{app,components}` 中的所有 js 和 css 文件注入到 `client/index.html` 中。
    'injector',
  
    // 5. 在 `client/index.html` 中注入 bower 组件。 
    'wiredep', 
  
    // 6. 修改 将 js 和 css 合并压缩到 `dist/public/app` 下的 Grunt 配置，由 `concat`、`uglify`、`cssmin` 组成。
    'useminPrepare',
  
    // 7. 为 `.tmp/` 中的 css 添加前缀。
    'autoprefixer',

    // 8. 将模板文件压缩后添加到 <!-- build:js({.tmp,client}) app/app.js --> 下。
    'ngtemplates',

    // 9. 合并
    'concat',

    // 10. 为 .tmp/concat/ 下的所有 js 模块重建依赖注入，以便混淆。
    'ngAnnotate',

    // 11. 将 client/ 下的图标文件、bower_components、图片、字体、index.html
    // 和 .tmp 目录下生成的图片拷贝到 dist 目录。
    // 将 server 下的所有文件和 package.json 拷贝到 dist 下。
    'copy:dist',

    // cdn 化
    'cdnify',

    // 压缩 CSS
    'cssmin',

    // 压缩混淆 JavaScript
    'uglify',

    // 重命名 dist/public 下的资源文件
    'rev',

    // 根据 useminPare 配置 和 rev 修改文件中的引用。
    'usemin'
  ]);
```

### injector:less

[klei/grunt-injector](https://github.com/klei/grunt-injector) 用于将 html 依赖的 JavaScript 和 CSS 文件文件插入到指定的位置。

```js
injector: {
      options: {

      },

      // Inject component less into app.less
      less: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/client/app/', '');
            filePath = filePath.replace('/client/components/', '');
            return '@import \'' + filePath + '\';';
          },
          starttag: '// injector',
          endtag: '// endinjector'
        },
        files: {
          '<%= yeoman.client %>/app/app.less': [
            '<%= yeoman.client %>/{app,components}/**/*.less',
            '!<%= yeoman.client %>/app/app.less'
          ]
        }
      }
  });
```

将 `client/{app,components}` 中除 `app.less` 外的其他 less 文件导入到 app.less 中。运行该任务后 app.less 中：

```
// injector
@import 'main/main.less';
@import 'modal/modal.less';
// endinjector
```

### concurrent:dist

```js
concurrent: {
  dist: [
    'less',
    'imagemin',
    'svgmin'
  ]
}
```

并行执行：

- 将 app.less 文件编译到 `.tmp/app/app.css` 中。
- 将图片压缩到 dist 目录下。
- 将 svg 压缩到 dist 目录下。

### less

[gruntjs/grunt-contrib-less](https://github.com/gruntjs/grunt-contrib-less) 用于编译 less 文件。

```js
// Compiles Less to CSS
    less: {
      options: {
        paths: [
          '<%= yeoman.client %>/bower_components',
          '<%= yeoman.client %>/app',
          '<%= yeoman.client %>/components'
        ]
      },
      server: {
        files: {
          '.tmp/app/app.css' : '<%= yeoman.client %>/app/app.less'
        }
      },
    }
```

其中，`options.paths` 指定 `@import` 的搜索路径，默认值为源文件所在的目录。

less 任务将 app.less 文件编译到 `.tmp/app/app.css` 中。

### injector

```js
injector: {
  options: {

  },
  // Inject application script files into index.html (doesn't include bower)
  scripts: {
    options: {
      transform: function(filePath) {
        filePath = filePath.replace('/client/', '');
        filePath = filePath.replace('/.tmp/', '');
        return '<script src="' + filePath + '"></script>';
      },
      starttag: '<!-- injector:js -->',
      endtag: '<!-- endinjector -->'
    },
    files: {
      '<%= yeoman.client %>/index.html': [
          ['{.tmp,<%= yeoman.client %>}/{app,components}/**/*.js',
           '!{.tmp,<%= yeoman.client %>}/app/app.js',
           '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.spec.js',
           '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.mock.js']
        ]
    }
  },

  // Inject component less into app.less
  less: {
    ...
  },

  // Inject component css into index.html
  css: {
    options: {
      transform: function(filePath) {
        filePath = filePath.replace('/client/', '');
        filePath = filePath.replace('/.tmp/', '');
        return '<link rel="stylesheet" href="' + filePath + '">';
      },
      starttag: '<!-- injector:css -->',
      endtag: '<!-- endinjector -->'
    },
    files: {
      '<%= yeoman.client %>/index.html': [
        '<%= yeoman.client %>/{app,components}/**/*.css'
      ]
    }
  }
}
```

- `injector:scripts` 将 `{.tmp, client}/{app,components}` 中的所有 js 文件（不包括测试、mock 文件、app.js）注入到 `client/index.html` 中的指定位置。
- `injector:less` 将 `client/{app,components}` 中除 `app.less` 外的其他 less 文件导入到 app.less 中。
- `injector:css` 将 `client/{app,components}` 中的所有 css 文件注入到 `client/index.html` 中的指定位置。

至此，injector:less 执行两次，第二次其实无需重复运行。

### wiredep

将 `bower.json` 中的组件注入到 `client/index.html` 中：

```js
wiredep: {
  target: {
    src: '<%= yeoman.client %>/index.html',
    ignorePath: '<%= yeoman.client %>/',
    exclude: [/bootstrap-sass-official/, /bootstrap.js/, '/json3/', '/es5-shim/', /bootstrap.css/, /font-awesome.css/ ]
  }
}
```

其中要排除 bootstrap、json3、es5-shim、font-awesome 相关的文件。bootstrap.css 和 font-awesome.css 通过 less 文件注入到 app.less 中，json3 和 es5-shim 通过判断 IE 版本手动引入。

### useminPrepare

```js
// Reads HTML for usemin blocks to enable smart builds that automatically
// concat, minify and revision files. Creates configurations in memory so
// additional tasks can operate on them
useminPrepare: {
  html: ['<%= yeoman.client %>/index.html'],
  options: {
    dest: '<%= yeoman.dist %>/public'
  }
}
```

根据 HTML 的 usemin 块来修改 grunt 配置。

- 将通过 wiredep 任务注入的 js 合并混淆压缩到 `dist/public/app/verdor.js` 中。
- 将通过 `injector:scripts` 注入的 js 和 `app.js` 合并混淆压缩到 `dist/public/app/app.js` 中。
- 将通过 wiredep 任务注入的 css 合并压缩到 `dist/public/app/vendor.css` 中。
- 将通过 `injector:css` 中注入 css 和 `app.js` 合并压缩到 `dist/public/app/app.css` 中。

### ngtemplates

[ericclemmons/grunt-angular-templates](https://github.com/ericclemmons/grunt-angular-templates) 用于将所有的模板文件使用 `$templateCache` 整合到一个 JavaScript 文件中，这样，所有的模板请求无需发起 HTTP 请求，都在内存中加载。

```js
// Package all the html partials into a single javascript payload
ngtemplates: {
  options: {
    // This should be the name of your apps angular module
    module: 'angularFullstack2App',
    htmlmin: {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    },
    usemin: 'app/app.js'
  },
  main: {
    cwd: '<%= yeoman.client %>',
    src: ['{app,components}/**/*.html'],
    dest: '.tmp/templates.js'
  },
  tmp: {
    cwd: '.tmp',
    src: ['{app,components}/**/*.html'],
    dest: '.tmp/tmp-templates.js'
  }
},
```

其中：

- options.module 指定 angular 模块名。
- options.htmlmin 配置模板压缩选项。
- options.usemin 指将生成的 js 添加 useminPrepare 生成的合并压缩配置，生成的模板文件会合并到 `app/app.js` 中。

## serve

```js
grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'env:all', 'env:prod', 'express:prod', 'wait', 'open', 'express-keepalive']);
    }

    if (target === 'debug') {
      return grunt.task.run([
        // 1. 清除 .tmp 目录
        'clean:server', 

        // 2. 配置环境变量
        'env:all',

        // 3. 将客户端的所有 less 文件导入到 `app.less` 中。
        'injector:less',

        // 4. 将 app.less 文件编译到 `.tmp/app/app.css` 中。
        'concurrent:server',

        // 5. 将 `client/{app,components}` 中的所有 js 和 css 文件注入到 `client/index.html` 中。
        'injector',

        // 6. 在 `client/index.html` 中注入 bower 组件。 
        'wiredep',

        // 7. 为 `.tmp/` 中的 css 添加前缀。
        'autoprefixer',

        // 8. 使用 nodemon 启动服务器，启动 node-inspector 调试器
        'concurrent:debug'
      ]);
    }

    grunt.task.run([
      // 1. 清除 .tmp 目录
      'clean:server',

      // 2. 配置环境变量
      'env:all',

      // 3. 将客户端的所有 less 文件导入到 `app.less` 中。
      'injector:less',

      // 4. 将 app.less 文件编译到 `.tmp/app/app.css` 中。
      'concurrent:server',

      // 5. 将 `client/{app,components}` 中的所有 js 和 css 文件注入到 `client/index.html` 中。
      'injector',

      // 6. 在 `client/index.html` 中注入 bower 组件。 
      'wiredep',

      // 7. 为 `.tmp/` 中的 css 添加前缀。
      'autoprefixer',

      // 8. 启动 express 服务器
      'express:dev',

      // 服务重启之后，等待 1500ms。
      'wait',

      // 打开应用首页
      'open',

      // 各种监视
      'watch'
    ]);
  });
```

### env

[jsoverson/grunt-env](https://github.com/jsoverson/grunt-env) 用于为之后的任务配置环境变量。

```js
env: {
  test: {
    NODE_ENV: 'test'
  },
  prod: {
    NODE_ENV: 'production'
  },
  all: localConfig
},

localConfig = require('./server/config/local.env')
```

_local.env_:

```js
module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: "angularfullstack2-secret",
  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
```

### concurrent:debug

```js
concurrent: {
    debug: {
        tasks: [
          'nodemon',
          'node-inspector'
        ],
        options: {
          logConcurrentOutput: true
        }
      }
}
```

### nodemon

[ChrisWren/grunt-nodemon](https://github.com/ChrisWren/grunt-nodemon) 用于监视 nodejs 应用的文件修改，并自动重启服务，主要用于开发环境。

```js
nodemon: {
  debug: {
    script: 'server/app.js',
    options: {
      nodeArgs: ['--debug-brk'],
      env: {
        PORT: process.env.PORT || 9000
      },
      callback: function (nodemon) {
        nodemon.on('log', function (event) {
          console.log(event.colour);
        });

        // opens browser on initial server start
        nodemon.on('config:update', function () {
          setTimeout(function () {
            require('open')('http://localhost:8080/debug?port=5858');
          }, 500);
        });
      }
    }
  }
}
```

其中：

- `options.script` 指定 nodemon 运行和重启的脚本。
- `options.args` 是指传入脚本的参数列表。
- `options.nodeArgs` 传入 node 的参数列表。最常用的使用 `--debug` or `--debug-brk` 来启用一个调试服务器。
- `options.callback` 在上例中，在回调中记录 log，监听 `config:update` 事件，即 nodemon 服务器首次启动时触发，延时 500ms 在默认浏览器中打开指定 url。

### node-inspector

[node-inspector/node-inspector](https://github.com/node-inspector/node-inspector) 是基于 Blink 开发者工具的调试器。

```js
// Debugging with node inspector
'node-inspector': {
  custom: {
    options: {
      'web-host': 'localhost'
    }
  }
}
```

### express

[blai/grunt-express](https://github.com/blai/grunt-express) 用于启动一个 Express web 服务器。

```js
express: {
  options: {
    port: process.env.PORT || 9000
  },
  dev: {
    options: {
      script: 'server/app.js',
      debug: true
    }
  },
  prod: {
    options: {
      script: 'dist/server/app.js'
    }
  }
}
```

### watch

```js
watch: {
  // 1. 监视需要通过 injector 注入的 JavaScript 文件，如果修改，重新注入。
  injectJS: {
    files: [
      '<%= yeoman.client %>/{app,components}/**/*.js',
      '!<%= yeoman.client %>/{app,components}/**/*.spec.js',
      '!<%= yeoman.client %>/{app,components}/**/*.mock.js',
      '!<%= yeoman.client %>/app/app.js'],
    tasks: ['injector:scripts']
  },

  // 2. 监视需要通过 injector 注入的 CSS 文件，如果修改，重新注入。
  injectCss: {
    files: [
      '<%= yeoman.client %>/{app,components}/**/*.css'
    ],
    tasks: ['injector:css']
  },

  // 3. 
  mochaTest: {
    files: ['server/**/*.spec.js'],
    tasks: ['env:test', 'mochaTest']
  },

  // 4. 
  jsTest: {
    files: [
      '<%= yeoman.client %>/{app,components}/**/*.spec.js',
      '<%= yeoman.client %>/{app,components}/**/*.mock.js'
    ],
    tasks: ['newer:jshint:all', 'karma']
  },

  // 5. 监视需要通过 injector 注入的 LESS 文件，如果修改，重新注入。
  injectLess: {
    files: [
      '<%= yeoman.client %>/{app,components}/**/*.less'],
    tasks: ['injector:less']
  },

  // 6. 监视 LESS 文件，如果修改，重新生成 less。
  less: {
    files: [
      '<%= yeoman.client %>/{app,components}/**/*.less'],
    tasks: ['less', 'autoprefixer']
  },

  // 7.
  gruntfile: {
    files: ['Gruntfile.js']
  },

  // 8. 监视 JavaScript、HTML、CSS、图片，如果修改，刷新浏览器。
  livereload: {
    files: [
      '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.css',
      '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.html',
      '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.js',
      '!{.tmp,<%= yeoman.client %>}{app,components}/**/*.spec.js',
      '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.mock.js',
      '<%= yeoman.client %>http://johnnyimages.qiniudn.com/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
    ],
    options: {
      livereload: true
    }
  },

  // 9. 监视 server 下的 js、json 文件， 如果修改，启动 express 服务。
  express: {
    files: [
      'server/**/*.{js,json}'
    ],
    tasks: ['express:dev', 'wait'],
    options: {
      livereload: true,
      nospawn: true //Without this option specified express won't be reloaded
    }
  }
}
```

### express-keepalive

```js
 grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
    this.async();
  });
```

该任务是不让 Grunt 结束。

## test

```js
grunt.registerTask('test', function(target) {
    if (target === 'server') {
      return grunt.task.run([
        'env:all',
        'env:test',
        'mochaTest'
      ]);
    }

    else if (target === 'client') {
      return grunt.task.run([
        'clean:server',
        'env:all',
        'injector:less',
        'concurrent:test',
        'injector',
        'autoprefixer',
        'karma'
      ]);
    }

    else if (target === 'e2e') {
      return grunt.task.run([
        'clean:server',
        'env:all',
        'env:test',
        'injector:less',
        'concurrent:test',
        'injector',
        'wiredep',
        'autoprefixer',
        'express:dev',
        'protractor'
      ]);
    }

    else grunt.task.run([
      'test:server',
      'test:client'
    ]);
});
```

## FAQ

### 拷贝字体

`copy:dist` 中只拷贝了 _assets/fonts/_ 字体，通过 bower 安装的字体并不会拷贝到目标目录下，在 `copy:dist` 目标中添加如下配置：

```
copy: {
dist: {
    ...,
    {
        expand: true,
        dest: '<%= yeoman.dist %>/public/assets/fonts',
        src: ['<%= yeoman.app %>/{components,assets}/**/fonts/*', '<%= yeoman.bower %>/**/fonts/*'],
        flatten: true
    }
}}
```

其中 yeoman.bower 为 _bower_components/_ 路径：

```
yeoman: {
  // ...
  bower: 'bower_components'
}
```

### 不拷贝 bower_components 到目标文件夹

修改 `copy:dist` 目标：

```js
files: [{
  expand: true,
  dot: true,
  cwd: '<%= yeoman.client %>',
  dest: '<%= yeoman.dist %>/public',
  src: [
    '*.{ico,png,txt}',
    '.htaccess',
    'bower_components/**/*',
    'assets/images/{,*/}*.{webp}',
    'assets/fonts/**/*',
    'index.html'
  ]
},
...
]
```

将 `src:` 下的  ~~'bower_components/**/*',~~。

### TRAVIS CI

See [First Steps In Setting Up Travis CI To Your Javascript Project](http://orizens.com/wp/topics/first-steps-in-setting-up-travis-ci-to-your-javascript-project)