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

## 运行

```
python fibo.py <arguments>
```

### VS Code

[Get Started Tutorial for Python in Visual Studio Code](https://code.visualstudio.com/docs/python/python-tutorial)

- 安装 Python 插件

- **Command Palette** (⇧⌘P) 选择正确的解析器版本

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

- `F12` Go to definition; `⌥F12` Peek Definition

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

### 逻辑控制

条件判断

```python
if condition1:
	pass #空语句
elif condition2:
else:
	pass #空语句
```

没有 switch 语法。

循环：

```python
while expression:
		pass
else: #当条件不满足 while 条件时执行
		pass
```

遍历：

```python
# 使用 for in
for target_list in expression_list:
    pass
  	# break, continue
else: # 遍历完成之后执行，break 退出则不会执行
    pass
```

执行 10 次：

```python
for x in range(10)
	pass
```

```python
# range 函数可以指定开始数字和结束数字，也可以指定步长
range(5, 10) # 5, 6, 7, 8, 9
range(0, 10, 3) # 0, 3, 6, 9
range(-10, -100, -30) # -10, -40, -70
```

### 参数

```python
# 参数位置参数和关键字参数
# 关键字参数必须跟随在位置参数的后面
def ask_ok(prompt, retries=4, reminder='Please try again!'):
```

```python
# 定义可变参数
# numbers 接收到的是一个 tuple。
def calc(*numbers):
  
    sum = 0
    for n in numbers:
        sum = sum + n * n
    return sum

# 传入可变参数，可以传入 0 个参数。
calc(1, 2, 3)

# 可以传入一个list或者tuple，*nums表示把nums这个list的所有元素作为可变参数传进去。
nums = [1, 2, 3]
calc(*nums)
```

```python
# 定义可变关键字参数
def person(name, age, **kw):
    print('name:', name, 'age:', age, 'other:', kw)
    
# 传入关键字参数
person('Adam', 45, gender='M', job='Engineer')

# 传入 dict 类型的参数
extra = {'city': 'Beijing', 'job': 'Engineer'}
person('Jack', 24, **extra)

# 如果要限制关键字参数的名字，可以在 * 之后，定义参数名称。必须传入每个参数。
def person(name, age, *, city, job):
    print(name, age, city, job)
person('Jack', 24, city='Beijing', job='Engineer')

```

```python
# 参数定义的顺序必须是：必选参数、默认参数、可变参数/命名关键字参数和关键字参数。
def f1(a, b, c=0, *args, **kw):
    print('a =', a, 'b =', b, 'c =', c, 'args =', args, 'kw =', kw)

def f2(a, b, c=0, *, d, **kw):
    print('a =', a, 'b =', b, 'c =', c, 'd =', d, 'kw =', kw)
```

```python
# 限定传参类型
# / 前面的所有关键字必须以位置参数传入，* 后面的参数必须以关键字参数传入
def f(pos1, pos2, /, pos_or_kwd, *, kwd1, kwd2):
```

### del

```python
# 删除变量
del a

# 从列表中移除切片
del a[0]
```

## 数据结构

### 字符串 str

- '单引号'，"双引号" 可以用来表示字符串。 
- `ord` 获取字符的 ASC 码。
- 转义字符，`\`；在字符串前加`r` 将字符串当做原始字符串，即字符串中的特殊字符会自动转义。
- 多行字符串用 `'''` 或者 `"""`
- `\n` 表示回车
- `+` 连接字符串；`* 数字`，复制字符串。
- `[index]` 去索引位置的字符，正数表示整形，负数表示反向。
- `[from:to]` 截取 `[from, to)` 之间的字符串，负数表示反向索引；to 省略表示截取到字符串结尾，from 省略表示从字符串开头开始截取。
- `[from:to:step]` 跳步切片。



[`repr()`](https://docs.python.org/zh-cn/3/library/functions.html#repr) or [`str()`](https://docs.python.org/zh-cn/3/library/stdtypes.html#str) 函数将任何值转化为字符串，区别是 `repr` 会对字符串保留引号。

#### 格式化

在字符串前加 `f` 或 `F` 可以快速格式化字符串：

```python
year = 2016
event = 'Referendum'

f'Results of the {year} {event}'

# 可选的格式说明符可以跟在表达式后面
print(f'The value of pi is approximately {math.pi:.3f}.')

# 在 ':' 后传递一个整数可以让该字段成为最小字符宽度。
print(f'{name:10} ==> {phone:10d}')
```

也可以使用 [`str.format()`](https://docs.python.org/zh-cn/3/library/stdtypes.html#str.format)  方法格式化字符串：

```python
# 使用 {} 占位
print('We are the {} who say "{}!"'.format('knights', 'Ni'))

# 在 {} 输入数字表示传入参数的位置
print('{0} and {1}'.format('spam', 'eggs'))
print('{1} and {0}'.format('spam', 'eggs'))

# 如果传入的是关键字参数，则使用参数的名称引用它们的值
print('This {food} is {adjective}.'.format(
		food='spam', adjective='absolutely horrible'))

# 位置和关键字参数可以任意组合:
print('The story of {0}, {1}, and {other}.'.format('Bill', 'Manfred',
		other='Georg'))

# 引用字典的元素
table = {'Sjoerd': 4127, 'Jack': 4098, 'Dcab': 8637678}
print('Jack: {0[Jack]:d}; Sjoerd: {0[Sjoerd]:d}; '
		'Dcab: {0[Dcab]:d}'.format(table))

# 使用 '**' 符号将关键字参数解包传递
print('Jack: {Jack:d}; Sjoerd: {Sjoerd:d}; Dcab: {Dcab:d}'.format(**table))


yes_votes = 42_572_654
no_votes = 43_132_495
percentage = yes_votes / (yes_votes + no_votes)

'{:-9} YES votes  {:2.2%}'.format(yes_votes, percentage)
```

更多 format 的使用参考 [格式字符串语法](https://docs.python.org/zh-cn/3/library/string.html#formatstrings) 。

其他的修饰符可用于在格式化之前转化值。 `'!a'` 应用 [`ascii()`](https://docs.python.org/zh-cn/3/library/functions.html#ascii) ，`'!s'` 应用 [`str()`](https://docs.python.org/zh-cn/3/library/stdtypes.html#str)，还有 `'!r'` 应用 [`repr()`](https://docs.python.org/zh-cn/3/library/functions.html#repr):

```python
animals = 'eels'

print(f'My hovercraft is full of {animals}.')
print(f'My hovercraft is full of {animals!r}.')
```

#### 填充

 [`str.rjust()`](https://docs.python.org/zh-cn/3/library/stdtypes.html#str.rjust) 方法通过在左侧填充空格来对给定宽度的字段中的字符串进行右对齐。类似的方法还有 [`str.ljust()`](https://docs.python.org/zh-cn/3/library/stdtypes.html#str.ljust) 和 [`str.center()`](https://docs.python.org/zh-cn/3/library/stdtypes.html#str.center) 。如果如果输入的字符串太长，则原样返回，可以通过  `x.ljust(n)[:n]` 来截取。

```python
for x in range(1, 11):
     print(repr(x).rjust(2), repr(x*x).rjust(3), repr(x*x*x).rjust(4))
```



[`str.zfill()`](https://docs.python.org/zh-cn/3/library/stdtypes.html#str.zfill) ，它会在数字字符串的左边填充零。可以识别正负号:

```python
'12'.zfill(5) # '00012'
'-3.14'.zfill(7) # '-003.14'
'3.14159265359'.zfill(5) # '3.14159265359'
```

### 列表 list

通过 List 来实现栈：

```python
stack = [3, 4, 5]
stack.append(6) # 入栈
stack.pop() # 出栈
```

列表也可以用作队列，但在表头插入或弹出元素效率低，所以一般通过 [`collections.deque`](https://docs.python.org/zh-cn/3/library/collections.html#collections.deque)  来实现队列。

```python
from collections import deque

queue = deque(["Eric", "John", "Michael"])
queue.append("Terry") # 入队
queue.popleft() # 出队
 
```

#### 基本操作

```python
# 定义列表 ，列表中的数据类型可以不同。
list = [1, 'hello', True, [3, 4]]
list(range(4))

# 切片和字符串的使用基本相同，不同的是字符串是 immutable 类型, 列表是 mutable 类型
# 所有的切片操作都返回一个包含所请求元素的新列表。 这意味着以下切片操作会返回列表的一个浅拷贝:
squares = [1, 4, 9, 16, 25]
squares[-3:]

# 删除元素
del squares[2:5]

# 包含元素，in 和 not in 判断元素是否包含在列表中
3 in [1, 3, 4] 

# + 列表合并，* 数字 重复列表。
# len(list) 长度， list.append() 追加元素
# `max` 最大值；`min` 最小值。

# reversed 逆序列表
reversed(range(1, 10, 2))

# sorted 排序列表
sorted(set(basket))
```

更多 List 操作方法参考 [列表特性](https://docs.python.org/zh-cn/3/tutorial/datastructures.html#more-on-lists)。

#### 遍历

```python
# 遍历
# 使用 emumerate 遍历列表
for i, v in enumerate(['tic', 'tac', 'toe']):
		print(i, v) # i 为索引，v 为值

# 使用 zip() 同时遍历多个列表
questions = ['name', 'quest', 'favorite color']
answers = ['lancelot', 'the holy grail', 'blue']
for q, a in zip(questions, answers):
     print('What is your {0}?  It is {1}.'.format(q, a))
    
```

#### 推导式

队列推导式是快速创建列表的一种方法。

```python
squares = [x**2 for x in range(10)]

# 将两个列表中不相等的元素组合起来
[(x, y) for x in [1,2,3] for y in [3,1,4] if x != y]

# 使用复杂的表达式和嵌套函数
from math import pi
[str(round(pi, i)) for i in range(1, 6)]
```

```python
# 交换矩阵的行和列
matrix = [
     [1, 2, 3, 4],
     [5, 6, 7, 8],
     [9, 10, 11, 12]
]

# 列表推导式中的初始表达式是另一个列表推导式
[[row[i] for row in matrix] for i in range(4)]
# 等价于
list(zip(*matrix))
```



```python
# 推导式同样适用于集合，字典
# 字典
students = {'喜小乐': 18, '石敢当': 20}
b = {value:key for key, value in students.items()}
```

### 数组 Array

```python
import array

# 第一个参数为元素类型
arr = array.array('i', [i for i in rage(10)])
```



### 元组 tuple

元组可以理解为不可变列表，基本操作与列表一样。

```python
# 定义元组，括号可以省略
t = (12345, 54321, 'hello!')
# 定义空元组
t = ()
# 定义只有一个元素的元组
t = 'hello',

# 序列解包，访问元组中的元素
# 等号左侧的变量数与右侧序列里所含的元素数相同
x, y, x = t

# 不能改变元组中的元素值
t[0]=888
```

### 集合 set

集合是由不重复元素组成的无序的集。支持联合，交集，差集，对称差分等数学运算。

列表，元组、字符串属于序列，是有序的；集合、字典是无序的。所以集合不支持索引和切片操作。

```python
# 创建集合
basket = {'apple', 'orange', 'apple', 'pear', 'orange', 'banana'}
# 创建空集合，不如能用 {}，因空 {} 用来创建空字典
empty = set()
```

`-` 求两个集合的差集；`&` 两个集合的交集；'+' 两个集合的并集。

```python
a - b                              # letters in a but not in b
a | b                              # letters in a or b or both
a & b                              # letters in both a and b
a ^ b                              # letters in a or b but not both
```

集合也支持推导式

### 字典 dict

字典 key 的类型是任意不可变类型，如 int、str、tuple，而 set 不行；value 的值可以是任意数据类型。`{}` 定义空字典。

#### 创建字典

```python
# 定义字典
tel = {'jack': 4098, 'sape': 4139}
# 创建空字典
empty = {}
# 直接从键值对序列里创建字典
dict([('sape', 4139), ('guido', 4127), ('jack', 4098)])
# 从推导式创建
{x: x**2 for x in (2, 4, 6)}
# 关键字是简单字符串时，有时直接通过关键字参数来指定键值对更方便
dict(sape=4139, guido=4127, jack=4098)
```

#### 基本操作

```python
# 添加元素
tel['guido'] = 4127
# 删除元素
del tel['sape']

list(tel) # 转成列表
sorted(tel) # 排序
'guido' in tel
```

#### 遍历

```python
knights = {'gallahad': 'the pure', 'robin': 'the brave'}
for k, v in knights.items():
     print(k, v)
```



### 进制

- `0b` 表示二进制，如 `-b10`。`bin()` 将其他数据转为二进制，如 `bin(0x11)`
- `0o` 表示八进制，转换方法为 `oct`
- `0x` 表示十六进，，转换方法为 `hex`
- `int()` 转化为十进制

### 变量与运算符

```
a = [1, 2, 3]
```

- 不需要定义变量，赋值即定义。在函数中定义变量，默认情况下是局部变量，即使用同名的全局变量；如果要使用全局变量，则需要在 global 关键字。

  ```python
  origin = 0
  def factory(step)
  	global origin
  	origin+=2
  ```

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

- 三元表达式 `r = x if x>y else y`。

  语法：`条件为真时返回的结果 if 条件判断 else 条件为假时的返回结果 `

### 枚举

```python
from enum import Enum
# IntEnum

@unique
class VIP(Enum):
	YELLOW =1
	GREEN = 2
	BLACK = 3
	RED = 4
```

```python
# 遍历枚举
# 遍历枚举 VIP.__members__.items()
for v in VIP
	print(v)
  
# 枚举类型转化
VIP(1)
```

## 函数

定义函数：

```python
def function_name(argument_list):
  	# 当返回多个值时，会将返回值封装成元组。调用函数时，可以用多个变量接收。
    # var1 var2 = function_name();
    return ret1, ret2; 

```

[函数标注](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#function) 是指函数的元数据，可以通过 `__annotations__` 获取函数标注信息。

```python
def f(ham: str, eggs: str = 'eggs') -> str:
...     print("Annotations:", f.__annotations__)
```



## 工程结构

### 包

文件夹，内置一个 `__init__.py` 文件，当包被导入时，init 中的代码自动执行。

定义模块导出的变量：

```python
__all__ = ['module1', 'var1']
```

### 模块

一个文件为一个模块。可以通过全局变量 `__name__` 的值获得模块名。

```python
# 导入模块
import package1.package2.模块名 as alias

# 导入 init 中 __all__ 中定义的模块
from package import *

# 导入变量/函数
from package import * 
```

通常情况下从一个模块或者包内调入 `*` 的做法是不太被接受的， 因为这通常会导致代码的可读性很差。

包和模块不会被重复导入。不能循环引入。

### 模块导入路径

1. 内置模块

2. 输入脚本的目录
3. [`PYTHONPATH`](https://docs.python.org/zh-cn/3/using/cmdline.html#envvar-PYTHONPATH) （一个包含目录名称的列表，它和shell变量 `PATH` 有一样的语法）。

4. 安装的默认设置

### 标准模块

- `sys.path` 变量是一个字符串列表，用于确定解释器的模块搜索路径。
- [`dir()`](https://docs.python.org/zh-cn/3/library/functions.html#dir) 用于查找模块定义的名称，包括变量，模块，函数，等等。 它返回一个排序过的字符串列表。如果没有参数，[`dir()`](https://docs.python.org/zh-cn/3/library/functions.html#dir) 会列出你当前定义的名称。
- [`__path__`](https://docs.python.org/zh-cn/3/reference/import.html#__path__)  包的目录名称。

## 面向对象

## 类定义

```python
#定义类
class Student():
  	# 类变量，相当于类的静态属性，和具体的实例无关。
    sum=0
    
    # 构造函数，不能有返回值
    def __init__(self, name, age, score):
      # 实例变量
      self.name = name
      self.age = age
      # 私有变量
      self.__score = score
      
      # 访问类变量有以下两种方式
      self.__class__.sum++;
      Student.sum++;
      
    # 实例方法，默认为公共方法  
    def func(self): # 必须加入一个参数
			return self.name + self.age
    
    # 私有方法
    def private_fucntion(self):
      pass;
    
    # 类方法
    @classmethod
    def plus_sum(cls):
      cls.sum++
    
    # 静态方法，和类方法类型，不需要默认参数
    @staticmethod
    def add(x, y):
      pass

# 实例化和调用
student = Student()
student.func()

# 实例变量字典
student.__dict__
```

## 继承

```python
# 父类
class Human():
  def __init__(self, name, age):
    self.name = name
    self.age = age
    
  def dohomework(self):
    pass

# 子类
class Student(Human):
  def __init__(self, score, name, age):
		# 调用父类构造函数
    # Human.__init__(self, name, age)
    super(Student, self, name, age)
    
  def dohomework(self):
    super(Student, self).dohomework();
```

- 使用 [`isinstance()`](https://docs.python.org/zh-cn/3/library/functions.html#isinstance) 来检查一个实例的类型: `isinstance(obj, int)` 仅会在 `obj.__class__` 为 [`int`](https://docs.python.org/zh-cn/3/library/functions.html#int) 或某个派生自 [`int`](https://docs.python.org/zh-cn/3/library/functions.html#int) 的类时为 `True`。
- 使用 [`issubclass()`](https://docs.python.org/zh-cn/3/library/functions.html#issubclass) 来检查类的继承关系: `issubclass(bool, int)` 为 `True`，因为 [`bool`](https://docs.python.org/zh-cn/3/library/functions.html#bool) 是 [`int`](https://docs.python.org/zh-cn/3/library/functions.html#int) 的子类。 但是，`issubclass(float, int)` 为 `False`，因为 [`float`](https://docs.python.org/zh-cn/3/library/functions.html#float) 不是 [`int`](https://docs.python.org/zh-cn/3/library/functions.html#int) 的子类。

多重继承：

```python
class DerivedClassName(Base1, Base2, Base3):
    <statement-1>
    .
    .
    .
    <statement-N>
```

了解多继承中父类方法的查找策略 [The Python 2.3 Method Resolution Order](https://www.python.org/download/releases/2.3/mro/)。



## 高阶语法

### 正则表达式

```python
import re

# 查找
list = re.findall('\d', string, re.I | re.S)

# 替换
s = re.sub('C#', 'Go', language, max_replace_count);

# 动态替换
def convert(match):
  matched = match.group()
  return '!!!'+matched
s = re.sub('\d', convert, language);

# 从首字母开始匹配，找到即返回
re.match

# 匹配到即返回
r = re.search('life(.*)python(.*)python', s);
# 取分组结果
r.group() # 相当于 group(0)
r.group(0, 1, 2) # 返回多个 group
r.groups() # 返回除 0 之外的所有分组

```

### 函数式编程

函数可以作为参数传入，也可以在函数中被返回。

```python
def curve_pre():
		a = 25

    # 定义内部函数
    def curve(x):
        # 引用外部变量 a，产生闭包
        return a * x * x

    return curve

f = curve_pre();
f(2);
```

### Lamda 表达式（匿名函数）

```python
# 定义 lamda 表达式
# lamda paramenter_list: expression

# 例子
f = lamda x, y: x+y
print(f(1, 2))
```

```python
# map
list_x = [1, 2, 3, 4, 5]
list_x = [2, 3, 4, 5, 6]
r=map(lamda x, y: x*x + y, list_x, list_y)
print(list(r))
```

```python
# reduce
from functools import reduce

list_x = [1, 2, 3, 4, 5]
r = reduce(lamda x,y: x+y, list_x)

# filter
r = filter(lamda x: x<3, list_x)
```

### 装饰器

```python
# 定义装饰器
from datetime import time

def decorator(func):
    def wrapper(*args, **kw):
        print(time.time())
        func(*args, **kw)
    return

# 使用装饰器
@decorator
def f1(func_name):
    print('This is a function named' + func_name)

# 调用函数
f1()

```

### 闭包

闭包  = 函数 + 环境变量

```python
def factory(pos):
  def go(step):
    	nonlocal pos
      return pos = pos+step
  return go
```

如果返回的函数内部没有引用外部变量，则不产生闭包。

## 读写文件

[`open()`](https://docs.python.org/zh-cn/3/library/functions.html#open) 返回一个 [file object](https://docs.python.org/zh-cn/3/glossary.html#term-file-object)，最常用的有两个参数： `open(filename, mode)`。

- 第一个参数为文件名
- 第二个参数是文件使用方式。*mode* 可以是 `'r'` ，表示文件只能读取，`'w'` 表示只能写入（已存在的同名文件会被删除），还有 `'a'` 表示打开文件以追加内容；任何写入的数据会自动添加到文件的末尾。`'r+'` 表示打开文件进行读写。*mode* 参数是可选的；省略时默认为 `'r'`。

```python
with open('workfile') as f:
     read_data = f.read()
```

读取文件：

```python
# 当 size 被省略或者为负数时，将读取并返回整个文件的内容
f.read(size)

# 从文件中读取一行
f.readline()

# 以列表的形式读取文件中的所有行
list(f)
f.readlines()。

# 遍历文件
for line in f:
     print(line, end='')
```

写入文件：

```python
f.write('This is a test\n')

# 在写入其他类型的对象之前，需要先把它们转化为字符串（在文本模式下）或者字节对象（在二进制模式下）
value = ('the answer', 42)
s = str(value)  # convert the tuple to string
f.write(s)

```

参考更多：[7. 输入输出 — Python 3.8.1 文档](https://docs.python.org/zh-cn/3/tutorial/inputoutput.html#reading-and-writing-files)

## JSON

### 基本操作

```python
import json

# 反序列化
json_str = '{name: "小了", age: 18}'
student = json.loads(json_str)

# 序列化
students = [
  {'name': '小了', 'age': 18, 'flag': False}, 
  {'name': '大了', 'age': 18}
]

json_str = json.dumps(students)

```

| JSON 数据类型 | Python 数据类型 |
| ------------- | --------------- |
| object        | dict            |
| array         | list            |
| string        | str             |
| number        | int/float       |
| true/false    | True/False      |
| null          | None            |

### 字符文件操作

```python
# 将 JSON 对象写入文件对象
json.dump(x, f) # f 为文件对象

# 从文件对象读取 JSON
x = json.load(f)
```

### 字节文件操作

参考 [pickle --- Python 对象序列化](https://docs.python.org/zh-cn/3/library/pickle.html#module-pickle)

## 错误异常

```python
try:
    # 抛出异常
    raise Exception('spam', 'eggs')
except OSError as err: # 捕获具体异常
    print("OS error: {0}".format(err))
except: # 捕获以上未捕获的所有异常
    print("Unexpected error:", sys.exc_info()[0])
    raise
else: # 不引发异常时调用
    print(arg, 'has', len(f.readlines()), 'lines')
    f.close()
finally:
    # 不论是正常和异常情况，最后均会执行 
    print('Goodbye, world!')
```

```python
# 通过 args 捕获异常实例中的参数
except Exception as inst:
    x, y = inst.args     # unpack args
    print(inst.args)     # arguments stored in .args
    print(inst) # __str__ allows args to be printed directly,
                # but may be overridden in exception subclasses
```

自定义异常应该直接或间接地从 [`Exception`](https://docs.python.org/zh-cn/3/library/exceptions.html#Exception) 类派生。大多数异常都定义为名称以“Error”结尾，类似于标准异常的命名。

```python
class Error(Exception):
    """Base class for exceptions in this module."""
    pass

class InputError(Error):
    """Exception raised for errors in the input.

    Attributes:
        expression -- input expression in which the error occurred
        message -- explanation of the error
    """

    def __init__(self, expression, message):
        self.expression = expression
        self.message = message

class TransitionError(Error):
    """Raised when an operation attempts a state transition that's not
    allowed.

    Attributes:
        previous -- state at beginning of transition
        next -- attempted new state
        message -- explanation of why the specific transition is not allowed
    """

    def __init__(self, previous, next, message):
        self.previous = previous
        self.next = next
        self.message = message
```

## 标准库

```python
# 查看模块的所有方法
dir(os)

# 获取模块的帮助
help(os)
```

参考 [标准库简介第一部分](https://docs.python.org/zh-cn/3/tutorial/stdlib.html)、[ 标准库简介 第二部分](https://docs.python.org/zh-cn/3/tutorial/stdlib2.html#multi-threading)

## 包管理

[虚拟环境和包](https://docs.python.org/zh-cn/3/tutorial/venv.html)

