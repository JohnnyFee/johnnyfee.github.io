---
layout: post
title: Python Tutorial
tags: [python, language]
category: AI
---

> Life is simple, I use Python. 人生苦短，我用 Python。
>
> Simple is better then complex.
>
> Now is better than never. Although never is often never then right now. 做好过不做，但不假思索的做不如不做。

## 语法

- `#` 注释单行
- `'''` 注释多行

### 数字类型 Number

`type` 查看数据的类型，如 `type(1.0)`

- 整形 int 类型，没有 long 等其他类型。
- 浮点只有 float 类型，没有 double 类型。
- `//` 为整除，`/`为除法，会自动转化为 float。
- `bool` 布尔类型，常量 `True`,`False`。`bool(1)` 非零为 True，零为 False；空字符串为 False，非空为 True；空数组为 False，非空位 True；空对象为 False，非空位 True；`None` 为 false。所有空值均为 False，非空位 True。
- `complex` 复数，`36j`。

### 序列

#### 字符串 str

- '单引号'，"双引号" 可以用来表示字符串。 
- `ord` 获取字符的 ASC 码。
- 转移字符，`\`；在字符串前加`r` 将字符串当做原始字符串，即字符串中的特殊字符会自动转义。
- 多行字符串用 `'''` 或者 `"""`
- `\n` 表示回车
- `+` 连接字符串；`* 数字`，复制字符串。
- `[index]` 去索引位置的字符，正数表示整形，负数表示反向。
- [from:to] 截取 [from, to) 之间的字符串，负数表示反向索引；to 省略表示截取到字符串结尾，from 省略表示从字符串开头开始截取。

#### 列表 list

- 定义列表 [1, 'hello', True, [3, 4]]，列表中的数据类型可以不同。
- 择取方法和字符串相同。
- `+` 列表合并，`* 数字` 重复列表。
- `3 in [1, 3, 4]` 是否包含在列表中，`not in` 不包含
- `len` 大小；`max` 最大值；`min` 最小值。

#### 元组 tuple

- 基本操作与列表一样
- 元组可以理解为不可变列表

### 集合 set

- `{}` 定义集合，如 `{1, 2, 3}`；`set()` 定义空集合。
- 列表，元组、字符串属于序列，是有序的；集合、字典是无序的。所以集合不支持索引和切片操作。
- 集合是不重复的。
- `in`, `not in` 等操作类似
- `-` 求两个集合的差集；`&` 两个集合的交集；'+' 两个集合的并集。

### 字典 dict

- 定义字典 `{k1:v1, k2:v2,...}`，key 的类型是任意不可变类型，如 int、str、tuple，而 set 不行；value 的值可以是任意数据类型。`{}` 定义空字典。
- 通过 key 来获取值，['k1']；key 值不能相同，后面的 key 会覆盖前面的 key 值。
- 字典的成员运算是根据 key 来判断，如 `c in {'c':1, 'a':2}` 

### 进制

- `0b` 表示二进制，如 `-b10`。`bin()` 将其他数据转为二进制，如 `bin(0x11)`
- `0o` 表示八进制，转换方法为 `oct`
- `0x` 表示十六进，，转换方法为 `hex`
- `int()` 转化为十进制

### 变量与运算符

```
a = [1, 2, 3]
```

- 不存在变量定义，赋值即定义。
- int, str, tuple 是不可改变的值类型；list, set, dict 是可变的引用类型。
- `id(a)`获取内存的地址。
- `2**2` 表示 $2^2$，`**`表示次方。
- 可以用 `+=` 等赋值
- 比较运算符和 Java 一样。字符串的比较是字母逐个比较，如 `abc` < `abd`，其他序列如元组，列表类似。
- 逻辑运算符，`and`, `or`, `not` 
- 成员运算符 `in`, `not in`
- 身份运算符 `is`, `is not`，比较内存地址是否相同。
- 类型比较 `type(a) = int` 或者 `isinstance(a, int)`，`isinstance(a, (int, float))`。`type`不能判断子类。
- 位运算符。`&` 按位与；`|` 按位或；`^` 按位异或；`~`按位取反；`<<` 做移动；`>>`右移动。
- 用 `_` 连接变量的单词，如 `user_name`
- Python 中没有常量，形式上的常量用全大写表示，`ACCOUNT='hello'`

### 逻辑控制

```python
if var:
	statements
else:
	statements
```







## 运行

- 运行文件 `python file.py`
- `input()` 终端输入

## VS Code

[Get Started Tutorial for Python in Visual Studio Code](https://code.visualstudio.com/docs/python/python-tutorial)

### 调试

- 安装 Python 插件

-  **Command Palette** (⇧⌘P) 选择正确的解析器版本

- `F9` 下断点，`F5` 开始调试，继续 (F5), step over (F10), step into (F11), step out (⇧F11), restart (⇧⌘F5), and stop (⇧F5). ![Debugging toolbar](../resources/images/debug-toolbar.png)

- 创建并选择 Python 虚拟环境

  ```shell
  python3 -m venv .venv
  source .venv/bin/activate
  ```

- 安装依赖包

  ```shell
  python3 -m pip install matplotlib
  ```

- 结束虚拟环境，在终端中执行

  ```
  deactivate
  ```

### 编辑

- `F12` Go to definition; `⌥F12` Peek Definition

