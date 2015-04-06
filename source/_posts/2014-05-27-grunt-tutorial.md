layout: post
title: "Grunt Tutorial"
category : Grunt
tags : [node, grunt]
---

简单说，Grunt是一个自动任务运行器，会按照预先设定的顺序自动运行一系列的任务。这可以简化工作流程，减轻重复性工作带来的负担。    

## Grunt 学习路线

- [Grunt Tutorial](http://inching.org/2014/05/27/grunt-tutorial/) 本文为学习 Grunt 的基础和入口点。
- [使用 Yoeman generator-angular 生成工程的 Gruntfile 源码分析](http://inching.org/2014/11/06/grunt-angular-yo/) 分析 [yeoman/generator-angular](https://github.com/yeoman/generator-angular) 生成器生成的 Grunt 脚本。
- [使用 Yoeman generator-angular-fullstack 生成工程的 Gruntfile 源码分析](http://inching.org/2014/11/25/grunt-angular-fullstack-yo/) 分析 [DaftMonk/generator-angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack) 生成器生成的 Grunt 脚本。

## Install

安装CLI:

    npm install -g grunt-cli

安装 [grunt-init](http://gruntjs.com/project-scaffolding):

    npm install -g grunt-init

准备一个新的Grunt项目:

    grunt-init gruntfile    

安装Grunt和grunt插件:

    npm install

<!-- more -->

## Gruntfile

一个Gruntfile由下面几部分组成：

* "wrapper"函数(包装函数)
* 项目和任务配置
* 加载的Grunt插件和任务
* 自定义任务

## "wrapper" 函数

每个Gruntfile(和Grunt插件)都使用这个基本格式，并且所有你的 Grunt 代码都必须指定在这个函数里面：

```js
module.exports = function(grunt) {
    // 在这里处理Grunt相关的事情
}
```

## 任务和目标

大多数 Grunt 任务所依赖的配置数据都被定义在传递给 [grunt.initConfig](http://gruntjs.com/grunt#grunt.initconfig) 方法的一个对象中。

这个配置主要都是一些命名任务属性。通常任务都被定义为一个对象传递给 `grunt.initConfig` 方法, 可以通过这个对象的属性来定义任务目标，如：

```js
grunt.initConfig({
    concat: {
        foo: {
            // 这里是concat任务'foo'目标的选项和文件
        },
        bar: {
            // 这里是concat任务'bar'目标的选择和文件
        }
    },
    uglify: {
        bar: {
            // 这里是uglify任务'bar'目标的选项和文件
        }
    }
});
```

运行 `grunt concat:foo` 或者 `grunt concat:bar` 的任务和目标只会处理指定的任务目标配置，而运行 `grunt concat` 将遍历运行指定任务的所有目标。注意，如果一个任务使用 [grunt.renameTask](https://github.com/gruntjs/grunt/wiki/grunt#wiki-grunt-renameTask) 重命名过，Grunt将在配置对象中查找新的任务名称属性。

你可以在这个配置对象中(传递给 initConfig() 方法的对象)存储任意的数据，只要它不与你任务配置所需的属性冲突，否则会被忽略。此外，由于这本身就是 JavaScript，你不仅限于使用JSON；你可以在这里使用任意的有效的JS代码。

如果有必要，你甚至可以以编程的方式生成配置。Grunt有 `grunt.file.readJSON` 和 `grunt.file.readYAML` 两个方法分别用于引入JSON和YAML数据。

如：

```js
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
});
```

在这个例子中，`grunt.file.readJSON('package.json')` 会把存储在`package.json`中的JSON元数据导入到Grunt配置中。由于`<% %>`模板字符串可以引用任意的配置属性，因此可以通过这种方式来指定诸如文件路径和文件列表类型的配置数据，从而减少一些重复的工作。

```js
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
        options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build: {
            src: 'src/<%=pkg.name %>.js',
            dest: 'build/<%= pkg.name %>.min.js'
        }
    }
});
```

与大多数任务一样，[grunt-contrib-uglify](http://github.com/gruntjs/grunt-contrib-uglify) 插件的 `uglify`任务要求它的配置被指定在一个同名属性中。在这里有一个例子, 我们指定了一个 `banner` 选项(用于在文件顶部生成一个注释)，紧接着是一个名为 `build`  的 uglify 目标，用于将一个js文件压缩为一个目标文件(比如将src目录 `jquery-1.9.0.js` 压缩为 `jquery-1.9.0.min.js` 然后存储到dest目录)。

### 加载 grunt 插件和任务

当一个插件被作为一个依赖指定在项目的 `package.json` 文件中，并且已经通过 `npm install` 安装好，都可以在你的 Gruntfile 文件中使用下面这个简单的命令启用它。

```js
// 加载提供"uglify"任务的插件
grunt.loadNpmTasks('grunt-contrib-uglify');
```

**注意**: `grunt --help`命令可以列出所有可用的任务。

你需要使用几个模块，这里就要写几条grunt.loadNpmTasks语句，将各个模块一一加载。

如果加载模块很多，这部分会非常冗长。而且，还存在一个问题，就是凡是在这里加载的模块，也同时出现在 `package.json` 文件中。如果使用npm命令卸载模块以后，模块会自动从 `package.json`文件中消失，但是必须手动从Gruntfile.js文件中清除，这样很不方便，一旦忘记，还会出现运行错误。这里有一个解决办法，就是安装load-grunt-tasks模块，然后在Gruntfile.js文件中，用下面的语句替代所有的grunt.loadNpmTasks语句。

```javascript
require('load-grunt-tasks')(grunt);
```

这条语句的作用是自动分析package.json文件，自动加载所找到的grunt模块。

### options

在一个任务配置中，`options` 属性指定覆盖属性的内置默认值。此外，每一个任务中更具体的目标都可以拥有一个 `options` 属性。目标级的选项将会覆盖任务级的选项(就近原则————`options`离目标越近,其优先级越高)。

`options`对象是可选，如果不需要，可以省略。

```js
grunt.initConfig({
    concat: {
        options: {
            // 这里是任务级的Options，覆盖任务的默认值 
        },
        foo: {
            options: {
                // 这里是'foo'目标的options，它会覆盖任务级的options.
            }
        },
        bar: {
            // 没有指定options，这个目标将使用任务级的options
        }
    }
});
```

## 文件

由于大多数的任务都需要执行文件操作，Grunt 有一个强大的功能来申明任务操作的文件。有好几种定义 `src-dest` (源文件-目标文件)文件映射的方式，都提供了不同程度的描述和控制方式。任何一种多任务(包含多个任务目标的任务)都能理解下面的格式，所以你只需要选择满足你需求的格式就行。

所有的文件格式都支持 `src` 和 `dest` 属性，此外 Compact(简洁)和 Files Array(文件数组)格式还支持以下一些额外属性：

* `filter` 它通过接受任意一个有效的[fs.Stats方法名](http://nodejs.org/docs/latest/api/fs.html#fs_class_fs_stats)或者一个参数为 `src` 并且返回 `true` 或者 `false` 的函数。

* `nonull`  If set to `true` then the operation will include non-matching patterns. 结合Grunt的`--verbore`标志, 这个选项可以帮助用来调试文件路径的问题。

* `dot` 它允许模式匹配句点开头的文件名，even if the pattern does not explicitly have a period in that spot.

* `matchBase` 如果设置这个属性，缺少斜线的模式，意味着模式中不能使用斜线进行文件路径的匹配，将不会匹配包含在斜线中的文件名。 例如，`a?b` 将匹配`/xyz/123/acb`但不匹配`/xyz/acb/123`。

* `expand` 处理动态的`src-dest`文件映射，更多的信息请查看["动态构建文件对象"](http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically)。

* 其他的属性将作为匹配项传递给底层的库。在 [node-glob](https://github.com/isaacs/node-glob) 和 [minimatch](https://github.com/isaacs/minimatch) 文档中可以查看更多选项。

### 简洁格式

这种形式允许每个目标对应一个 **src-dest** 文件映射。

通常情况下它用于只读任务，比如 [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint), 只需指定 `src` 属性，而无需指定 `dest` 参数。这种格式还支持为每个 `src-dest` 文件映射指定附加属性。

```js
grunt.initConfig({
    jshint: {
        foo: {
            src: ['src/aa.js', 'src/aaa.js']
        }
    },
    concat: {
        bar: {
            src: ['src/bb.js', 'src/bbb.js'],
            dest: 'dest/b.js'
        }
    }
});
```

### 文件对象格式

这种形式支持每个任务目标对应多个 `src-dest` 形式的文件映射，属性名就是目标文件，源文件就是它的值，源文件列表则使用数组格式声明。可以使用这种方式指定数个 `src-dest` 文件映射，但是不能给每个映射指定附加的属性。

```js
grunt.initConfig({
    concat: {
        foo: {
            files: {
                'dest/a.js': ['src/aa.js', 'src/aaa.js'],
                'dest/a1.js': ['src/aa1.js', 'src/aaa1.js']
            }
        },
        bar: {
            files: {
                'dest/b.js': ['src/bb.js', 'src/bbb.js'],
                'dest/b1.js': ['src/bb1.js', 'src/bbb1.js']
            }
        }
    }
});
```

### 文件数组格式

这种形式支持每个任务目标对应多个 `src-dest` 文件映射，同时也允许每个映射拥有附加属性：

```js
grunt.initConfig({
    concat: {
        foo: {
            files: [
                {src: ['src/aa.js', 'src/aaa.js'], dest: 'dest/a.js'},
                {src: ['src/aa1.js', 'src/aaa1.js'], dest: 'dest/a1.js'}
            ]
        },
        bar: {
            files: [
                {src: ['src/bb.js', 'src/bbb.js'], dest: 'dest/b/', nonull: true},
                {src: ['src/bb1.js', 'src/bbb1.js'], dest: 'dest/b1/', filter: 'isFile'}
            ]
        }
    }
});
```

### 较老的格式

**dest-as-target** 文件格式在多任务和目标形式出现之前是一个过渡形式，目标文件路径实际上就是目标名称。遗憾的是, 由于目标名称是文件路径，那么运行 `grunt task:target` 可能不合适。此外，你也不能指定目标级的 `options` 或者给每个 `src-dest` 文件映射指定附加属性。

```js
grunt.initConfig({
    concat: {
        'dest/a.js': ['src/aa.js', 'src/aaa.js'],
        'dest/b.js': ['src/bb.js', 'src/bbb.js']
    }
});
```

### 自定义过滤函数

`filter` 属性可以给你的目标文件提供一个更高级的详细帮助信息。只需要使用一个有效的 [fs.Stats方法名](http://nodejs.org/docs/latest/api/fs.html#fs_class_fs_stats)。下面的配置仅仅清理一个与模式匹配的真实的文件：

```js
grunt.initConfig({
    clean: {
        foo: {
            src: ['temp/**/*'],
            filter: 'isFile'
        }
    }
});
```

或者创建你自己的 `filter` 函数根据文件是否匹配来返回 `true` 或者 `false` 。下面的例子将仅仅清理一个空目录：

```js
grunt.initConfig({
    clean: {
        foo: {
            src: ['temp/**/*'],
            filter: function(filepath){
                return (grunt.file.isDir(filepath) && require('fs').readdirSync(filepath).length === 0);
            }
        }
    }
});
```

### 通配符模式（Globbing patterns）

有时，逐个指定所有源文件路径是不切实际的，因此 Grunt 通过内置的 [node-glob](https://github.com/isaacs/node-glob) 和 [minimatch](https://github.com/isaacs/minimatch) 库来支持 filename expansion(又叫作 `globbing`)。

当然这并不是一个综合的匹配模式方面的教程，你只需要知道如何在文件路径匹配过程中使用它们即可：

* `*` 匹配任意数量的字符，但不匹配 `/`
* `?` 匹配单个字符，但不匹配 `/`
* `**` 匹配任意数量的字符，包括 `/`，as long as it's the only thing in a path part。
* `{}` 允许使用一个逗号分割的列表或者表达式，表示逻辑或关系。
* `!` 在模式的开头用于否定一个匹配模式(即排除与模式匹配的信息)

大多数的人都知道 `foo/*.js` 将匹配位于`foo/`目录下的所有的`.js`结尾的文件, 而`foo/**/*.js`将匹配`foo/`目录以及其子目录中所有以`.js`结尾的文件。

此外, 为了简化原本复杂的通配符模式，Grunt 可以指定文件路径数组，也可以指定通配符模式。模式按序处理，带有 `!`前缀的模式将其匹配到的文件排除在外。

示例：

```js
//可以指定单个文件
{src: 'foo/this.js', dest: …}

//或者指定一个文件数组
{src: ['foo/this.js', 'foo/that.js', 'foo/the-other.js'], dest: …}

//或者使用一个匹配模式
{src: 'foo/th*.js', dest: …}

//一个独立的 node-glob 模式
{src: 'foo/{a,b}*.js', dest: …}
//也可以这样编写
{src: ['foo/a*.js', 'foo/b*.js'], dest: …}

//foo目录中所有的.js文件，按字母排序
{src: ['foo/*js'], dest: …}

//这里首先是bar.js，接着是剩下的.js文件按字母排序
{src: ['foo/bar.js', 'foo/*.js'], dest: …}

//除bar.js之外的所有的.js文件，按字母排序
{src: ['foo/*.js', '!foo/bar.js'], dest: …}

//所有.js文件按字母排序, 但是bar.js在最后.
{src: ['foo/*.js', '!foo/bar.js', 'foo/bar.js'], dest: …}

//模板也可以用于文件路径或者匹配模式中
{src: ['src/<%= basename %>.js'], dest: 'build/<%= basename %>.min.js'}

//它们也可以引用在配置中定义的其他文件列表
{src: ['foo/*.js', '<%= jshint.all.src %>'], dest: …}
```

可以在 [node-glob](https://github.com/isaacs/node-glob) 和 [minimatch](https://github.com/isaacs/minimatch) 文档中查看更多的关于通配符模式的语法。

### 构建动态文件对象

当你希望处理大量的单个文件时，这里有一些附加的属性可以用来动态的构建一个文件. 这些属性都可以指定在 `Compact` 和 `Files Array` 映射格式中(这两种格式都可以使用)。

`expand` 设置 `true` 用于启用下面的选项：

* `cwd` 相对当前路径（不包括）的所有 `src` 路径。
* `src` 相对于 `cwd` 路径的匹配模式。
* `dest` 目标文件路径前缀。
* `ext` 使用这个属性值替换生成的 `dest` 路径下文件的扩展名(比如我们通常将压缩后的文件命名为`.min.js`)。
* `extDot` Used to indicate where the period indicating the extension is located. Can take either `'first'` (extension begins after the first period in the file name) or `'last'` (extension begins after the last period), and is set by default to `'first'` _[Added in 0.4.3]_
* `flatten` 从生成的 `dest` 路径中移除所有的路径部分。
* `rename` 对每个匹配的 `src` 文件调用这个函数(在执行 `ext` 和 `flatten` 之后)。传递 `dest` 和匹配的 `src` 路径给它，这个函数返回一个新的 `dest` 值。 如果相同的 `dest` 返回不止一次，每个使用它的 `src` 都将被添加到一个数组中。

在下面的例子中，`minify` 任务将在 `static_mappings` 和 `dynamic_mappings`两个目标中查看相同的 `src-dest` 文件映射列表, 这是因为任务运行时 Grunt 会自动展开 `dynamic_mappings` 文件对象为4个单独的静态 `src-dest` 文件映射--假设这4个文件能够找到。

静态 `src-dest` 和动态的 `src-dest` 可以任意结合来指定文件映射。

```js
grunt.initConfig({
    minify: {
        static_mappings: {
            // 由于这里的 src-dest 文件映射时手动指定的, 
            // 每一次新的文件添加或者删除文件时，Gruntfile 都需要更新
            files: [
                {src: 'lib/a.js', dest: 'build/a.min.js'},
                {src: 'lib/b.js', dest: 'build/b.min.js'},
                {src: 'lib/subdir/c.js', dest: 'build/subdir/c.min.js'},
                {src: 'lib/subdir/d.js', dest: 'build/subdir/d.min.js'}
            ]
        },
        dynamic_mappings: {
            //当'minify'任务运行时Grunt将自动在"lib/"下搜索"**/*.js", 
            // 然后构建适当的src-dest文件映射，因此你不需要在文件添加或者移除时更新Gruntfile
            files: [
                {
                    expand: true, //启用动态扩展
                    cwd: 'lib/', //批匹配相对lib目录的src来源
                    src: '**/*.js', //实际的匹配模式
                    dest: 'build/', //目标路径前缀
                    ext: '.min.js' //目标文件路径中文件的扩展名.
                }
            ]
        }
    }
});
```

### 模板

使用`<% %>`分隔符指定的模板会在任务从配置中读取相应的数据时将自动填充。模板会以递归的方式填充，直到配置中不再存在遗留模板相关的信息。

整个配置对象是属性解析的上下文。此外，在模板中使用 `grunt` 以及它的方法都是有效的，例如：`<%= grunt.template.today('yyyy-mm-dd') %>`。

* `<%= prop.subprop %>` 将会自动展开配置信息中的 `prop.subprop` 的值，不管是什么类型。像这样的模板不仅可以用来引用字符串值，还可以引用数组或者其他对象类型的值。
* `<% %>`执行任意内联的 JavaScript 代码，对于控制流或者循环来说是非常有用的。

下面提供了一个 `concat` 任务配置示例，运行 `grunt concat:sample` 时将通过 banner 中的 `/* abcde */` 连同 `foo/*.js`+`bar/*.js`+`bar/*.js` 匹配的所有文件来生成一个名为 `build/abcde.js` 的文件。

```js
grunt.initConfig({
    concat: {
        sample: {
            options: {
                banner: '/* <%= baz %> */\n' // '/* abcde */\n'
            },
            src: ['<%= qux %>', 'baz/*.js'], // [['foo/*js', 'bar/*.js'], 'baz/*.js']
            dest: 'build/<%= baz %>.js'
        }
    },
    //用于任务配置模板的任意属性
    foo: 'c',
    bar: 'b<%= foo %>d', //'bcd'
    baz: 'a<%= bar %>e', //'abcde'
    qux: ['foo/*.js', 'bar/*.js']
});
```

### Gruntfile 示例

下面我们通过一个用了5个Grunt插件的`gruntfile`示例来讨论一下Gruntfile。

* [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
* [grunt-contrib-qunit](https://github.com/gruntjs/grunt-contrib-qunit)
* [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)
* [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
* [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)

```js
module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        jshint: {
            files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                //这里是覆盖JSHint默认配置的选项
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'qunit']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
};
```

- 让 `concat` 任务将所有存在于 `src/` 目录下以 `.js` 结尾的文件合并起来，然后存储在 `dist` 目录中，并以项目名来命名。
- 让 uglify 在 `dist/` 目录中创建了一个包含压缩结果的 JavaScript文件。

## 自定义任务

你可以通过定义一个 `default`任务来配置Grunt，让它默认运行一个或者多个任务。在下面的例子中，在命令行中运行`grunt`而不指定特定的任务将自动运行`uglify`任务。这个功能与显示的运行`grunt uglify`或者等价的`grunt default`一样。你可以在任务参数数组中指定任意数量的任务(这些任务可以带参数，也可以不带参数)。

```js
// 默认任务
grunt.registerTask('default', ['uglify']);
```

如果你的项目所需的任务没有对应的Grunt插件提供相应的功能，你可以在`Gruntfile`内定义自定义的任务。例如，下面的Gruntfile就定义了一个完整的自定义的`default`任务，它甚至没有利用任务配置(没有使用grunt.initConfig()方法)：

```js
module.exports = function(grunt) {
    // 一个非常基础的default任务
    grunt.registerTask('default', 'Log some stuff.', function() {
        grunt.log.write('Logging some stuff...').ok();
    });
};
```

自定义的项目特定的任务可以不定义在Gruntfile中；它们可以定义在一个外部`.js`文件中，然后通过[grunt.loadTasks](http://gruntjs.com/grunt#grunt.loadtasks)方法来加载。

## 常用模块

grunt的[模块](http://gruntjs.com/plugins)接近 4k 个，且还在快速增加。下面是一些常用的模块（按字母排序）。

1.  **grunt-contrib-clean**：删除文件。
2.  **grunt-contrib-compass**：使用compass编译sass文件。
3.  **grunt-contrib-concat**：合并文件。
4.  **grunt-contrib-copy**：复制文件。
5.  **grunt-contrib-cssmin**：压缩以及合并CSS文件。
6.  **grunt-contrib-imagemin**：图像压缩模块。
7.  **grunt-contrib-jshint**：检查JavaScript语法。
8.  **grunt-contrib-uglify**：压缩以及合并JavaScript文件。
9.  **grunt-contrib-watch**：监视文件变动，做出相应动作。
10. [ChrisWren/grunt-inject](https://github.com/ChrisWren/grunt-inject) 注入 JavaScript 文件。
11. [intesso/connect-livereload](https://github.com/intesso/connect-livereload) connect middleware for adding the livereload script to the response.
12. [jsoverson/grunt-open](https://github.com/jsoverson/grunt-open) 使用默认浏览器打开指定的 url。

模块的前缀如果是 grunt-contrib，就表示该模块由grunt开发团队维护；如果前缀是grunt（比如grunt-pakmanager），就表示由第三方开发者维护。

以下选几个模块，看看它们配置参数的写法，也就是说如何在grunt.initConfig方法中配置各个模块。

### grunt-contrib-jshint

[gruntjs/grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint) 用来检查语法错误，比如分号的使用是否正确、有没有忘记写括号等等。它在grunt.initConfig方法里面的配置代码如下。

```js
jshint: {
    options: {
        eqeqeq: true,
        trailing: true
    },
    files: ['Gruntfile.js', 'lib/**/*.js']
},
```

上面代码先指定jshint的[检查项目](http://www.jshint.com/docs/options/)，eqeqeq表示要用严格相等运算符取代相等运算符，trailing表示行尾不得有多余的空格。然后，指定files属性，表示检查目标是Gruntfile.js文件，以及lib目录的所有子目录下面的JavaScript文件。

### grunt-contrib-concat

concat用来合并同类文件，它不仅可以合并JavaScript文件，还可以合并CSS文件。

```javascript
concat: {
  js: {
    src: ['lib/module1.js', 'lib/module2.js', 'lib/plugin.js'],
    dest: 'dist/script.js'
  }
  css: {
    src: ['style/normalize.css', 'style/base.css', 'style/theme.css'],
    dest: 'dist/screen.css'
  }
}
```

js目标用于合并JavaScript文件，css目标用语合并CSS文件。两者的src属性指定需要合并的文件（input），dest属性指定输出的目标文件（output）。

### grunt-contrib-uglify

uglify模块用来压缩代码，减小文件体积。

```javascript
uglify: {
  options: {
    banner: bannerContent,
    sourceMapRoot: '../',
    sourceMap: 'distrib/'+name+'.min.js.map',
    sourceMapUrl: name+'.min.js.map'
  },
  target : {
    expand: true,
    cwd: 'js/origin',
    src : '*.js',
    dest : 'js/'
  }
},
```

上面代码中的options属性指定压缩后文件的文件头，以及sourceMap设置；target目标指定输入和输出文件。

### grunt-contrib-copy

[copy模块](https://github.com/gruntjs/grunt-contrib-copy)用于复制文件与目录。

```javascript
copy: {
  main: {
    src: 'src/*',
    dest: 'dest/',
  },
},
```

上面代码将src子目录（只包含它下面的第一层文件和子目录），拷贝到dest子目录下面（即dest/src目录）。如果要更准确控制拷贝行为，比如只拷贝文件、不拷贝目录、不保持目录结构，可以写成下面这样：

```javascript
copy: {
  main: {
    expand: true,
    cwd: 'src/',
    src: '**',
    dest: 'dest/',
    flatten: true,
    filter: 'isFile',
  },
},
```

### grunt-contrib-watch

[watch模块](https://github.com/gruntjs/grunt-contrib-watch)用来在后台运行，监听指定事件，然后自动运行指定的任务。

```javascript
watch: {
   scripts: {
    files: '**/*.js',
    tasks: 'jshint',
    options: {
      livereload: true,
    },
   },
   css: {
    files: '**/*.sass',
    tasks: ['sass'],
    options: {
      livereload: true,
    },
   },
},
```

设置好上面的代码，打开另一个进程，运行grunt watch。此后，任何的js代码变动，文件保存后就会自动运行jshint任务；任何sass文件变动，文件保存后就会自动运行sass任务。

需要注意的是，这两个任务的options参数之中，都设置了livereload，表示任务运行结束后，自动在浏览器中重载（reload）。这需要在浏览器中安装[livereload插件](http://livereload.com/)。安装后，livereload的默认端口为localhost:35729，但是也可以用livereload: 1337的形式重设端口（localhost:1337）。

### grunt-contrib-clean

该模块用于删除文件或目录。

```javascript
clean: {
  build: {
    src: ["path/to/dir/one", "path/to/dir/two"]
  }
}
```

### grunt-autoprefixer

该模块用于为CSS语句加上浏览器前缀。

```javascript
autoprefixer: {
  build: {
    expand: true,
    cwd: 'build',
    src: [ '**/*.css' ],
    dest: 'build'
  }
},
```

### grunt-contrib-connect

[gruntjs/grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect) 用于在本机运行一个 Web Server。

```javascript
connect: {
  server: {
    options: {
      port: 4000,
      base: 'build',
      hostname: '*'
    }
  }
}
```

connect模块会随着grunt运行结束而结束，为了使它一直处于运行状态，可以把它放在watch模块之前运行。因为watch模块需要手动中止，所以connect模块也就会一直运行。

### grunt-htmlhint

该模块用于检查HTML语法。

```javascript
htmlhint: {
    build: {
        options: {
            'tag-pair': true,
            'tagname-lowercase': true,
            'attr-lowercase': true,
            'attr-value-double-quotes': true,
            'spec-char-escape': true,
            'id-unique': true,
            'head-script-disabled': true,
        },
        src: ['index.html']
    }
}
```

上面代码用于检查index.html文件：HTML标记是否配对、标记名和属性名是否小写、属性值是否包括在双引号之中、特殊字符是否转义、HTML元素的id属性是否为唯一值、head部分是否没有script标记。

### grunt-contrib-sass

该模块用于将SASS文件转为CSS文件。

```javascript
sass: {
    build: {
        options: {
            style: 'compressed'
        },
        files: {
            'build/css/master.css': 'assets/sass/master.scss'
        }
    }
}
```

上面代码指定输出文件为build/css/master.css，输入文件为assets/sass/master.scss。

### grunt-markdown

该模块用于将markdown文档转为HTML文档。

```javascript
markdown: {
    all: {
      files: [
        {
          expand: true,
          src: '*.md',
          dest: 'docs/html/',
          ext: '.html'
        }
      ],
      options: {
        template: 'templates/index.html',
      }
    }
},
```

上面代码指定将md后缀名的文件，转为docs/html/目录下的html文件。template属性指定转换时采用的模板，模板样式如下。

```html
<!DOCTYPE html>
<html>
<head>
    <title>Document</title>
</head>
<body>

    <div id="main" class="container">
        <%=content%>
    

</body>
</html>
```

## FAQ

### `{,*/}*.`

See [node.js - What does `{,*/}` mean in paths of Gruntfile.js? - Stack Overflow](http://stackoverflow.com/questions/19485806/what-does-mean-in-paths-of-gruntfile-js)

```js
watch: {
    styles: {
      files: [
        '<%= yeoman.app %>/styles/{,*/}*.less'
      ],
      tasks: ['copy:styles', 'autoprefixer']
    }
}
```

`{,*/}` 用逗号表达式来表示逻辑或关系。`{,*/}*.less` 表示 `*.less` 或者 `*/*.cess`。这是为了效率考虑，只往下匹配一层子目录，如果你想递归匹配，可是使用 `styles/**/*.less`。

### How do I run grunt from a different folder than my root project

See [node.js - How do I run grunt from a different folder than my root project - Stack Overflow](http://stackoverflow.com/questions/14873356/how-do-i-run-grunt-from-a-different-folder-than-my-root-project)

You can set two parameters `--base` and `--gruntfile`

From `grunt --help`:

`--base` Specify an alternate base path. By default, all file paths are relative to the Gruntfile. (grunt.file.setBase) *

`--gruntfile` Specify an alternate Gruntfile. By default, grunt looks in the current or parent directories for the nearest Gruntfile.js or Gruntfile.coffee file.

So, you can execute:

```
grunt --base c\my_app --gruntfile c\my_app\GruntFile.js mytask
```

## Debug

- [javascript - How to debug grunt in PHPStorm (WebStorm) - Stack Overflow](http://stackoverflow.com/questions/16233279/how-to-debug-grunt-in-phpstorm-webstorm)

## Tutorial

- 入门
    - 中文官网：<http://www.gruntjs.org/>、<http://www.gruntjs.net/> 先将“新手上路”看过一遍，基本了解 grunt 是什么，怎么用的。
    - 阮一峰博客：<http://javascript.ruanyifeng.com/tool/grunt.html>，对 grunt 入门介绍得简单易懂，对几个常用的 grunt 插件进行了简单的介绍。
    - 英文官网：<http://gruntjs.com/>，在对 grunt 基本了解以后，在中文官网上看不明白的地方，可以直接看英文官网的说明。
- grunt 相关：
    - [编写可维护的 Gruntfile.js](http://blog.segmentfault.com/heroic/1190000000343005?page=1#c-1190000000343005-1050000000344590)
    - [配置 WebStorm Grunt 环境](http://www.cnblogs.com/eboke/p/3793922.html)
    - [grunt 有提供对文件操作的 API](http://www.gruntjs.org/api/grunt.file.html)
    - [使用 grunt-contrib-copy 自动复制文件](http://keenwon.com/1082.html)
    - [Automate Recurring Tasks with Grunt](http://www.sitepoint.com/automate-recurring-tasks-grunt)
    - [Automate with Grunt](http://www.salttiger.com/automate-with-grunt/)
    - [Five Grunt Tasks You Won't Want to Miss!](http://www.sitepoint.com/five-grunt-tasks-wont-want-miss/)
- grunt api
    - [grunt api](http://www.gruntjs.org/api/grunt.html)


## Reference

- [新手上路 - Grunt 中文社区](http://www.gruntjs.org/docs/getting-started.html#cli) / [Getting started - Grunt: The JavaScript Task Runner](http://gruntjs.com/getting-started)
- [配置任务 - Grunt 中文社区](http://www.gruntjs.org/docs/configuring-tasks.html) / [Configuring tasks - Grunt: The JavaScript Task Runner](http://gruntjs.com/configuring-tasks)
- [Grunt：任务自动管理工具 -- JavaScript 标准参考教程（alpha）](http://javascript.ruanyifeng.com/tool/grunt.html#toc4)
