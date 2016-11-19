---
layout: "post"
title: "Node Commander"
date: "2016-11-13 01:00"
categories: Node
---

[tj/commander.js](https://github.com/tj/commander.js) 快速定义 Node 命令行接口。

## 命令选项 Option

使用 `.option()` 方法定义命令选项，并且提供相应的选项描述。

`option` 接口定义如下：

```
Command.prototype.option = function(flags, description, fn, defaultValue)
```

* `falgs`：选项定义。
* `description` 选项描述。
* `fn` 选项值转换/验证的函数/正则表达式。如果类型不是函数/正则表达式，则认为该参数为默认值。
* `defaultValue` 选项默认值。

下面的例子解析 `process.argv` 中的 args 和 options：

```js
#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');

program
  .version('0.0.1')
  .option('-p, --peppers', 'Add peppers')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv);

console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers');
console.log('  - %s cheese', program.cheese);
```

在命令行中，可以通过 `=` 或者 ` `给选项赋值：

```
program.parse('node test --string=Hello --string2 Hello=World --num=5.5'.split(' '));
```

### 选项定义 flags

选项名称包含短名称（short name）和长名称（long name）。如：'-p, --pepper'，其中，`p` 为短名称，`pepper` 为长名称。

可以用长名称或者短名称来定义选项，在程序中，只能用长名称来取选项值。

短名称和长名称直接可以用`|`，`,`，` `连接：
    
- "-p, --pepper"
- "-p|--pepper"
- "-p --pepper"

Short flags may be passed as a single arg, for example `-abc` is equivalent to `-a -b -c`. Multi-word options such as "--template-engine" are camel-cased, becoming `program.templateEngine` etc.

没有被选项解析的参数留在 `program.args` 数组中：

```js
program
  .option('-f, --foo', 'add some foo')
  .option('-b, --bar', 'add some bar');

// 相当于 node test --foo ----bar bar
program.parse(['node', 'test', '--foo', '--', '--bar', 'baz']);

// foo 值为 true
program.foo.should.be.true;

// bar 值为 undefined
should.equal(undefined, program.bar);

// --bar，bar 均未被解析
program.args.should.eql(['--bar', 'baz']);
```

### Boolean 选项

当命令中无选项值时，选项的类型为 Boolean，命令中包含选项名时，值为 `true`，否则为 `false`：

```js
program.option('-p, --pepper', 'add pepper');

//命令中 --pepper 或 -p
// => true
program.pepper.should.be.true;

//命令中不包含选项
// => undefined
should.equal(undefined, program.pepper);
```

如果期望不包含选项名时为 `false`，包含时为 `true`，需要为属性名加 `no-` 前缀取反， ：

```js
program.option('-C, --no-cheese', 'remove cheese');

// 命令中不包含 --no-cheese
// => true
program.cheese.should.be.true;

// 命令中包含 --no-cheese 或者 -C
// => false
program.cheese.should.be.false;
```

短名称的联合写法：

```js
program
  .version('0.0.1')
  .option('-p, --pepper', 'add pepper')
  .option('-c, --no-cheese', 'remove cheese');

program.parse(['node', 'test', '-pc']);

// test
program.pepper.should.be.true;
program.cheese.should.be.false;
```

定义选项名用 `-` 连字符时，在程序中会将选项名的形式转化为小驼峰：

```js
program.option('-i, --my-int <n>', 'pass an int', parseInt)
       .option('-r, --my-long-range <a..b>', 'pass a range', parseRange);

program.parse('node test -i 5.5 -r 1..5'.split(' '));

// test
program.myInt.should.equal(5);
program.myLongRange.should.eql([1, 5]);
```

### 默认值

```js
program
  .version('0.0.1')

  // 无默认值
  .option('-a, --anchovies', 'Add anchovies?')

  // 默认值为 true
  .option('-o, --onions', 'Add onions?', true)

  // 默认值为 'black'
  .option('-v, --olives', 'Add olives? Sorry we only have black.', 'black')

  // 默认值值为 true
  .option('-s, --no-sauce', 'Uh… okay')

  // 必填选项，默认值为 'hand-tossed'
  .option('-r, --crust <type>', 'What kind of crust would you like?', 'hand-tossed')

  // 可选选项，默认值为 'mozzarella'
  .option('-c, --cheese [type]', 'optionally specify the type of cheese', 'mozzarella');

// 命令名
program.should.have.property('_name', '');

program.parse(['node', 'test']);
program.should.have.property('_name', 'test');

// 无默认值选项
program.should.not.have.property('anchovies');
program.should.not.have.property('onions');
program.should.not.have.property('olives');

// 以下选项均已提供默认值
program.should.have.property('sauce', true);
program.should.have.property('crust', 'hand-tossed');
program.should.have.property('cheese', 'mozzarella');
```

### 可选/必填

用尖括号 (e.g. `<cmd>`) 表示选项必须值，用中括号(e.g. `[env]`) 表示选项可选值。括号中的名称（`cmd`, `env`）用于描述选项值。

无选项值时，选项的类型默认为 Boolean。

```js
// 选项可选值
program.option('-c, --cheese [type]', 'optionally specify the type of cheese');

program.parse(['node', 'test', '--cheese']);
program.cheese.should.be.true;

// 选项必须值
program.option('-c, --cheese <type>', 'optionally specify the type of cheese');

// 没有提供 cheese 选项值，
// 将输出错误信息 "  error: option `-c, --cheese <type>' argument missing"
program.parse(['node', 'test', '--cheese']);

// 提供 cheese 选项值
program.parse(['node', 'test', '--cheese', 'feta']);
program.cheese.should.equal('feta');
```

### 选项值转换/验证 Coercion

命令选项值转换函数定义如下：

```js
fn(val, undefined === self[name]? defaultValue: self[name]);
```

转换函数 fn 的第一个参数为命令行中的选项值，第二个参数为命令选项值，即 `command.optionName` 的值，如果命令选项值为 `undefined`，则为选项默认值。

经过转换函数对命令行中的选项值转换后，将转换后的值保存为命令选项值。

```js
program
  .version('0.0.1')
  
  // 用 parseInt 将选项值转换为 int 类型 
  .option('-i, --int <n>', 'pass an int', parseInt)
  
  // 用 Number 构造函数，将选项值转换为 Number 类型 
  .option('-n, --num <n>', 'pass a number', Number)

  // 用 parseInt 将选项值转换为 parseFloat 类型 
  .option('-f, --float <n>', 'pass a float', parseFloat)

  // 用自定义函数 parseRange 将选项值转换为 Number 数组
  .option('-r, --range <a..b>', 'pass a range', parseRange)

  // 用自定义函数 parseRange 将选项值转换为 Number 数组
  .option('-v, --verbose', 'increase verbosity', increaseVerbosity, 0)
  .option('-c, --collect <str>', 'add a string (can be used multiple times)', collectValues, []);

function parseRange(str) {
  return str.split('..').map(Number);
}

function increaseVerbosity(v, total) {
  return total + 1;
}

function collectValues(str, memo) {
  memo.push(str);
  return memo;
}
```

```js
program.parse('node test -i 5.5 -f 5.5 -n 15.99 -r 1..5 -c foo -c bar -c baz -vvvv --verbose'.split(' '));

// parseInt
program.int.should.equal(5);

// Number
program.num.should.equal(15.99);

// parseFloat
program.float.should.equal(5.5);

// parseRange
program.range.should.eql([1, 5]);

// collectValues
program.collect.should.eql(['foo', 'bar', 'baz']);
```

使用正则表达式验证：

```js
program
  .version('0.0.1')
  .option('-s, --size <size>', 'Pizza Size', /^(large|medium|small)$/i, 'medium')
  .option('-d, --drink [drink]', 'Drink', /^(Coke|Pepsi|Izze)$/i)

program.parse('node test -s big -d coke'.split(' '));
program.size.should.equal('medium');
program.drink.should.equal('coke');
```

### Unknown option

当接收到未定义的option时，程序会自动抛出错误

```
✍ ./fe -b

  error: unknown option `-b'
```

Commander同时提供了api来取消这个自动报错机制， `.allowUnknownOption()`.

```js
#!/usr/bin/env node

var program = require('commander');
program
  .allowUnknownOption()
  .option('-d, --date', 'display current time')
  .parse(process.argv);

// omit some detail ...
```

## 命令 Commands

```js
var program = require('program')
```

`program` 返回一个 Command 对象，称为顶级命令，可以通过 `.command` 方法添加子命令。

### 顶级命令参数

通过 `.arguments` 定义顶级命令的参数语法：

```js
Command.prototype.arguments = function (desc){
  return this.parseExpectedArgs(desc.split(/ +/));  
}
```

如：

```js
var program = require('../')
  , should = require('should');

var envValue = "";
var cmdValue = "";

program
  .version('0.0.1')
  .arguments('<cmd> [env]')
  .action(function (cmd, env) {
    cmdValue = cmd;
    envValue = env;
  })
  .option('-C, --chdir <path>', 'change the working directory')
  .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
  .option('-T, --no-tests', 'ignore test hook');

// node test --config conf
program.parse(['node', 'test', '--config', 'conf']);

// config 选项值
program.config.should.equal("conf");

// 无 cmd 参数
cmdValue.should.equal("");

// 无 env 参数
envValue.should.equal("");

// node test --config conf1 setup --setup_mode mode3 env1
program.parse(['node', 'test', '--config', 'conf1', 'setup', '--setup_mode', 'mode3', 'env1']);

// config 选项值
program.config.should.equal("conf1");

// setup 参数
cmdValue.should.equal("setup");

// evn 参数
envValue.should.equal("env1");
```

### 子命令 Sub-Commands

通过 `command` 函数在顶级命令下创建子命令。

```
Command.prototype.command = function(name, desc, opts)
```

1. `name`，子命令名，可以使用`<>`，`[]` 语法参数。
2. `desc`，命令描述。
    - 没有该参数是，使用 `.action(callback)` 来处理子命令。返回值为新命令对象。
    - 当使用该参数时，不要调用 `.action(callback)` 来处理子命令，否则会出错。返回值为上级命令对象。
    
        commander 会使用独立的可执行子命令，如 `git(1)`。commander 会试图在入口脚本文件(like `./examples/pm`)所在目录下 ，按照 `program-command` 格式, like `pm-install`, `pm-search` 去搜索执行的命令。
      
        If the program is designed to be installed globally, make sure the executables have proper modes, like `755`.

3. `opts`: Options can be passed with the call to `.command()`. 

    * Specifying `true` for `opts.noHelp` will remove the option from the generated help output. 
    * Specifying `true` for `opts.isDefault` will run the subcommand if no other subcommand is specified.

```js
// 顶级命令选项
program
  .version('0.0.1')
  .option('-C, --chdir <path>', 'change the working directory')
  .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
  .option('-T, --no-tests', 'ignore test hook')

// 子命令 setup，无参数
program
  .command('setup')
  .description('run remote setup commands')
  .action(function() {
    console.log('setup');
  });

// 子命令 exec，必选参数 cmd
program
  .command('exec <cmd>')
  .description('run the given remote command')
  .action(function(cmd) {
   console.log('exec "%s"', cmd);
  });

// 子命令 teardown，必选参数 dir，可选参数 otherDirs
program
  .command('teardown <dir> [otherDirs...]')
  .description('run teardown commands')
  .action(function(dir, otherDirs) {
    console.log('dir "%s"', dir);
    if (otherDirs) {
      otherDirs.forEach(function (oDir) {
        console.log('dir "%s"', oDir);
      });
    }
  });

// When the `name` is "*" an un-matched command will be passed as the first arg, followed by the rest of **ARGV** remaining.
program
  .command('*')
  .description('deploy the given env')
  .action(function(env) {
    console.log('deploying "%s"', env);
  });

program.parse(process.argv);
```

See more examples:

- [commander.js/examples at master · tj/commander.js](https://github.com/tj/commander.js/tree/master/examples)
- [commander.js/test at master · tj/commander.js](https://github.com/tj/commander.js/tree/master/test)

### 命令别名 alias

通过 `.alias` 函数设置命令别名。

```js
Command.prototype.alias = function(alias){}
```

```js
program
  .command('info [thing]')
  .alias('i')
  .action(function () {
  });

program
  .command('save [file]')
  .alias('s')
  .action(function() {
  });

program.parse(['node', 'test']);

program.commandHelp().should.containEql('info|i');
program.commandHelp().should.containEql('save|s');
program.commandHelp().should.not.containEql('test|');
```

### allowUnknownOption

允许所有的命令选项，否则解析到未定义的选项时报错。

```js
program.allowUnknownOption()
```

### 可变参数

一个命令的最后一个参数可以是可变参数, 并且只能是最后一个参数。为了使参数可变，你需要在参数名后面追加 `...`。 下面是个示例：

```js
#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');

program
  .version('0.0.1')
  .command('rmdir <dir> [otherDirs...]')
  .action(function (dir, otherDirs) {
    console.log('rmdir %s', dir);
    if (otherDirs) {
      otherDirs.forEach(function (oDir) {
        console.log('rmdir %s', oDir);
      });
    }
  });

program.parse(process.argv);
```

An `Array` is used for the value of a variadic argument.  This applies to `program.args` as well as the argument passed to your action as demonstrated above.

More API [Commander.js - nodejs cli framework](http://tj.github.io/commander.js/)

### action

定义命令的执行体，传入的参数为按照命令格式传入的参数。

```
program
  .version('0.0.1')
  .arguments('<cmd> [env]')
  .action(function (cmd, env) {
    cmdValue = cmd;
    envValue = env;
  })
```

## Help

### 自动生成帮助信息

Commander 会根据配置的 option，sub-command 等信息，自动生成 help 信息。

```
$ ./examples/pizza --help

   Usage: pizza [options]

   An application for pizzas ordering

   Options:

     -h, --help           output usage information
     -V, --version        output the version number
     -p, --peppers        Add peppers
     -P, --pineapple      Add pineapple
     -b, --bbq            Add bbq sauce
     -c, --cheese <type>  Add the specified type of cheese [marble]
     -C, --no-cheese      You do not want any cheese
```

### 自定义帮助信息

You can display arbitrary `-h, --help` information by listening for "--help". 

```js
// must be before .parse() since node's emit() is immediate
program.on('--help', function(){
  console.log('  Examples:');
  console.log('');
  console.log('    $ custom-help --help');
  console.log('    $ custom-help -h');
  console.log('');
});

program.parse(process.argv);

console.log('stuff');
```

Commander will automatically exit once you are done so that the remainder of your program does not execute causing undesired behaviours, for example in the following executable "stuff" will not output when `--help` is used.

### 输出帮助信息

`.outputHelp(cb)`: Output help information without exiting. Optional callback cb allows post-processing of help text before it is displayed.

If you want to display help by default (e.g. if no command was provided), you can use something like:

```js
var program =require('commander');
var colors = require('colors');

program
  .version('0.0.1')
  .command('getstream [url]', 'get stream URL')
  .parse(process.argv);

  if (!process.argv.slice(2).length) {
    // 输出帮助信息
    program.outputHelp(make_red);
  }

function make_red(txt) {
  //display the help text in red on the console
  return colors.red(txt); 
}
```

`.help(cb)`: Output help information and exit immediately.
Optional callback cb allows post-processing of help text before it is displayed.


## References

* [Commander.js](https://github.com/tj/commander.js)
* https://news.ycombinator.com/item?id=7987146
* http://tj.github.io/commander.js/
