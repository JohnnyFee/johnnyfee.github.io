layout: post
title: "微软简体中文本地化规范"
category : Writing
tags : [writing]
---

See [Susan的翻译博客 - IT博客](http://www.cnitblog.com/susanster/default.html?page=2)

## 表达方式

译文的用词及语气应避免带有对性别、年龄、种族、职业、宗教信仰、政治信仰、政党、国籍、地区、贫富以及身体残疾者（注：一般称为残障人士、听力有障碍的人士、视觉有障碍的人士或行动有障碍的人士等）的歧视。
译文须遵循中文句法和中文习惯用的表达方式。

1. 避免直译

    例句一：此数据库曾被用于建立本书中的一些图例。

    建议：本书中的一些图例是由此数据库建立出来的。

    例句二：假如此软件尚未安装，您可以安装此软件在您自己的电脑上或在一个网络位置上。

    建议：假如您尚未安装这个软件，可以将它安装在自己的电脑上或网络的某个位置上。

2. 语言通顺

    我们的对象是最终用户，因此译文必须平实、亲切。多用陈述句，少用疑问句、祈使句。原则上尽量少使用“不…就不…”或“不是不…”等双重否定的表示方法。

3. 出于法律方面的考虑，除非绝对必要，不要使用“最好”、“最强”、“唯一”等词。

4. 必要的调整

    在翻译中可能会遇到一些适用于英文，但并不适用于中文的内容，例如外国人名、货币单位、度量衡单位，甚至一些举例（如在英文文档中提到已婚妇女的娘家姓，夫家姓）等等。在确认不影响功能的情况下，可以对这些内容作适当的调整，转换为更适合中国国情的说法。

## 标点符号通用标准

### 逗号

软件本地化，使用全角的逗号。

文档本地化，使用全角的逗号。

英文中的逗号有时候本地化时，根据语义是用顿号来表示的。

例如，Microsoft has added new file formats to Microsoft Office Word, Excel, and PowerPoint 2007.应翻译为 Microsoft 在 Microsoft Office Word 、Excel 和 PowerPoint 2007 中增 加了新的文件格式。


### 圆括号

有双重括号时，在圆括外面加方括号。

例如： [……(……)……]

如果括号中的文字不是针对正文中的词或词组，而是对正文的整行或整段的补充说明，则将括号放在正文的句号之后；括号中是完整的句子时，应将句子的句号放在括号内。若遇到括号相互紧连的情况，括号间不加空格。

### 正斜线 /

正斜线为半角字符，前后不加半角空格。

遇到下列情况时可以使用正斜线：

1. 表示并列、选择、切换概念时。

    例如：显示/不显示
        On/Off

2. 命令中使用正斜线时。

    例如：在命令提示符下键入:

    a:setup/u

3. 表示分数时。

    例如：1 磅等于 1/72 英寸。

4. 表示日期时。

    例如：1994/1/1

### 反斜线 \

反斜线为半角字符，前后不加半角空格。用于表示路径名或在命令时使用。

例如： c:\fruit> cd\

### 省略号

表示文中省略的部分。中文用居中六连点 (……) 表示，英文中用居中偏下三连点 (¼ ) 表示。

画面插图中，用引出线表示连续操作时。

例如： 要选择这个范围……

### 连字符　－

又叫对开线或半字线。用半角字符表示。

1. 用于注册商标、商标、产品名、公司名等正式名称中。

    例如： MS-DOS

2. 用于表示两个名词的复合，也可表示型号系列数字号码之间的连结。

    例如：氧化-还原反应（前后不加空格）

    JRX-11 型电器

3. 用于图序、表序的编号。

    例如： 图 1-1 表 13-1

4. 技术支持中的电话号码用连字符连接。

    例如：请拨电话 (54)(1)814-0356。

5. 连字符也可用于行末显示英文单词需要分为两行时的情况。

### 冒号

表示句中较大的停顿，并借此提示下文或总结上文。此时为全角字符。

1. 冒号也可用于命令、文件路径名之中，此时为半角字符。

    例如： dir c:\*.pds

    DEVICE=C:\PDOS\PBIOS.SYS

2. 在表示程序中的运算符或标号时，冒号为半角字符。

    例如：

    i=0;

    START : i=i+1;

    if (i<10) goto START:

3. 感叹号 ！

    表示句子结束后的停顿，有感叹或强调的语气。单独使用在中文句子中为全角标点；在英文句子中或与“？”并用或几个感叹号并用时为半角标点。


### 其他符号及数字使用原则

测量、统计数据，公历的年、月、日，一般用阿拉伯数字。阿拉伯数字用半角字符表示。

数字的翻译沿袭英文的用法。如果在英文中为阿拉伯数字，翻译后仍写为阿拉伯数字；如果在英文中以英文单词表示，则翻译后应为中文形式。

例如： “three thousand” 应译为： “三千”

大约的数目可用汉字，也可用阿拉伯数字。

若单位是英文字母时，一律用阿拉伯数字。

年代数用汉字表示。

分数可用阿拉伯数字表示，也可用中文表示，但不要混用。分数的分子和分母用斜线分开时，要避免含义不清。

某些表示法已成为惯例的，按惯例用。

例如：可用空间 124,680 字节

1994 年 10 月 17 日出版

八个数据位，一个停止位

256 个字符

大约 1500 个汉字

大约十几个英文字符

“1/4"或“四分之一”，但不能写成“4 分之 1”。

a/bcosx 可能被认为是 a/(bcosx)，也可被认为是 (a/b)cosx，因此要表示明确。

阿拉伯数字、小数点、百分号以及运算符号均应保留英文格式。

@、#、$、%、&、*、=、~ 等特殊符号均使用半角

原文中所有 High ANSI 的字（例如 ®、©、™ ）在手册中须维持原样。在联机帮助或软件中无法显示这些字时，应使用半角括号和半角字母代替（如 (R)、(C)、(TM)）。

## 年代、日期和时间

一般应按照中国的习惯表示法表示。如：98 年 9 月 3 日。

时刻的表示法可保留原文格式（如 8:00 A.M. ）或改写为中文格式（如上午 8:00 ）。


下表为一般及缩写的英文星期格式所对应的中文译法：

英文格式 | 应译为
------------ | ---------
Sunday| 星期日
Monday|星期一
Tuesday  |星期二
Wednesday|星期三
Thursday |星期四
Friday|星期五
Saturday |星期六
SUN   |周日
MON   |周一
TUE   |周二
WED   |周三
THU   |周四
FRI   |周五
SAT   |周六

## 键盘上特殊键的名称

**键盘上特殊键的名称**

←、↑、→、↓等四键分别译为向左键、向上键、向右键、向下键。
Spacebar 应译为“空格键”。

为兼顾中文键盘和美式键盘的使用者，凡是有英文名的功能键如 Esc、Shift、Alt、Tab、Ctrl、Enter、Insert (Ins)、Delete (Del)、、Home、End、Page Up、Page Down、Print Screen、Scroll Lock、Pause、Break、Num Lock、Caps Lock 以及 F1 至 F12 等均应保留原文不译。

对于英文 Press Ctrl, Press Ctrl+Alt+Del 等，应译为: 按 Ctrl, 按 Ctrl+Atl+Del, 而不需加“键”、“组合键”。


英文键名 | 应译为
---------|-----------
ALT   | Alt
BACKSPACE| Backspace
BREAK | Break
CAPS LOCK| Caps Lock
CTRL  | Ctrl
DEL (Delete)      | Del
DELETE| Delete
DOWN ARROW        | 向下键
END   | End
ENTER | Enter
ESC   | Esc
F1-F12| F1-F12
HOME  | Home
INS   | Ins
INSERT| Insert
LEFT ARROW        | 向左键
NUM LOCK | Num Lock
PAGE DOWN| Page Down
PAGE UP  | Page Up
PAUSE | Pause
PRINT SCREEN      | Print Screen
RETURN| Return
RIGHT ARROW       | 向右键
SCROLL LOCK       | Scroll Lock
SHIFT | Shift
SPACEBAR | 空格键
TAB   | Tab
UP ARROW | 向上键

## 须特殊处理的项目


下表中列出了一些中文的特殊格式规定及例子。注意：特殊格式中的标点符号，其格式及与字符间距应遵守 4.5 节的规定。
加上灰色底纹部分为与原文格式不同者。

用户界面||  |
--------|---|----|-------------------
菜单名称 | 加上中文双引号 | The **File** menu      |  “文件”菜单
命令名称 |加上中文双引号 | The **Page Setup** command        |“页面设置”命令
对话框标题|加上中文双引号 | The **Options** dialog box        |“选项”对话框
（对话框组件：）        ||  |
选项卡名称|| The **View** tab       | “视图”选项卡
选项名称 || the **Portrait** option| “纵向”选项
按钮名称 |加上中文双引号 | the **Cancel** button  | “取消”按钮
列表框名称|| the **File of type** list box     | “文件类型”列表框
文本框名称|| the **Password** text box         | “密码”文本框
复选框名称|| the **Read Only** check box       | “只读”复选框
图标名称 |不翻译     | Click the Microsoft Internet Explorer icon   | 单击Microsoft Internet Explorer图标
显示方式（有大写单词）     |加上中文双引号 | Full Screen view |“全屏幕”显示方式
窗口（有大写单词）       |加上中文双引号 | the Print window       |“打印”窗口
显示方式（一般叙述）      |不加中文双引号 | switch to normal view |切换到标准显示方式
窗口（一般叙述）        |不加中文双引号 | in the document window |在文档窗口中
||  |
用户输入内容         ||  |
实际输入英文          |加粗      | Type **a:setup**       |输入**a:setup**
输入文字的替代文字       |斜体（Italic) | Type _password_        |输入<em>密码</em>
(placeholder)     || Type _your name_       |输入<em>您的名字</em>
操作按键 |保留英文字，大写| …press ENTER|按Enter
||  |
文内交互参照         ||  |
手册标题 |加书名号《》| see Chapter 12 in the Microsoft Word for Windows User's Guide.     |请参阅《Microsoft Word for Windows用户指南》第 12 章。
附录及章节号          |加中文双引号  | see "Special Characters"in charpter 4, "Programming Fundamentals." |请参阅第 4 章“程序设计基础”的“特殊字符”一节。
联机帮助的英文索引       |加粗      | In the online index look up: **Favorites**   |在联机帮助索引中找出：**Favorites**
||  |
其他  ||  |
产品名  |不翻译     | Internet Explorer      | Internet Explorer
组件名称        | 翻译，不加中文双引号| Form Field Help  | 窗体域帮助
组件名称        | 容易引起异议时，可加中文双引号或改变句型 | Help on Cube Editor | “多维数据集编辑器”帮助    
Help on Cube Editor    | 关于多维数据集编辑器的帮助 
文件、路径及URL
的名称          |不翻译     | Open the letter to Joe file       |打开文件letter to Joe
       || Lexirom.exe | Lexirom.exe
       || EXCEL.EXE   | EXCEL.EXE
       || http://www.yale.edu    | http://www.yale.edu
       || C:\folder\file.txt     | C:\folder\file.txt
英文缩写 |全部大写    | DDE, OLE    | DDE, OLE
英文命令叙述          |加粗      |  **copy** command| **copy** 命令
新词及强调|加中文双引号  | …look on the World Wide Web. The World Wide Web is…     |到“万维网”上查看。万维网是……
程序码举例|保留原文    | Sub Main    | Sub Main
硬件名称 |全部大写    | LPT1, COM1, IRQ        | LPT1, COM2, IRQ
程序写作及产品特有项目（data types, argumemts, functions, macro names,etc) |视情况而定   |  |可向产品组或 Microsoft Language Excellence 询问     

## 与法律有关的翻译规则

## 软件中的标点符号

