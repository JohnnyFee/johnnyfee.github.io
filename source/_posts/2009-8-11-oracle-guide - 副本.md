layout: post
title: Oragle Guide
tags: [database, oracle]
category: Database
---

## Oracle安装及基本命令

### 配置服务

OracleOra10g_home1TNSListener，表示监听服务，如果客户端想连接到数据库，此服务必须打开，此服务必须打开。

1. OracleService数据库名，表示数据库的主服务，此服务必须启动。

1.  进入sqlplusw，主机字符串处输入数据库名

2.  设置行缓冲长度

    set linesize 长度;

1.  修改每页显示记录的长度

    set pagesize 行数;

1.  ed 文件名

    可以以相应的工具编辑sql文件

    然后通过\@文件名 就可以执行文件中的命令

    通过\@路径 可以访问磁盘上的文件，[如\@d:/demo.txt](如@d:/demo.txt) /可以省略

    如果文件的扩展名是.sql，则扩展名可以省略。

1.  更换用户

    conn 用户名/密码 [AS **SYSDBA**\| SYSOPER]

    如conn scott/manager

    如果现在连接的是超级管理员(sys)，则在连接的最后必须写上AS
    SYSDBA，表示以管理员的身份进行连接。

    如： conn sys/change_on_install

    conn system/manager

    访问不同用户下的表，需要加上相应的用户名，如select \* from scott.emp

1.  显示当前连接的是哪个用户

    show user;

1.  得到数据库中的所有表

        select \* from tab;

1.  得到表的详细描述

        desc emp;

## SQL的分类

1.  DML（Data Manipulation Language, 数据查询语言）：用于检索或者修改数据
3.  DDL（Data Definition Language,
    数据定义语言）：用于定义数据的结构，如创建、修改或者删除数据库对象。
4.  DCL（Data Control Language, 数据控制语言）：用于定义数据库用户的权限。

## 简单查询语句

1.  为显示列起别名

        select empno 编号, ename 姓名, job 工作 from emp;

1.  DISTINCT的使用

        select distinct job from emp;

1.  使用\|\|作连接操作

        select ‘编号是：’\|\|empno\|\|’的雇员，姓名是’\|\|enmae\|\|’工作是：’\|\|job
from emp;

1.  支持四则运算功能

        select ename, sal\*12 income from emp;

## 限定查询

1.  null（如果字段中不存在内容，则为null）

        select \* from emp where comm. is not null;（查询含有薪水的雇员儿）

1.  支持逻辑运算符and or

2.  not

        select \* from emp where not(sal\>1500 and comm is not null)

1.  between ……and……（包括两端数据）

        select \* from emp where sal between 1500 and 3000

    支持日期的区间取值

        select \* from emp where hiredate between ‘1-1月 -81’ and ’31-12月 -81’

1.  Oracle对字符串的大小写敏感

2.  [not] in(支持所有类型)

        select \* from emp where empno in (7369, 7499, 7521);

1. 模糊查询

    “%”：可以匹配任意长度的内容

    “_”：可以匹配一个长度的内容

    如：查询出所有孤雁姓名中第二个字母是M的信息

    select \* from emp where name like ‘_M%’

    查询出在1981年雇佣的雇员信息

    select \* from emp where hiredate like ‘%81%’

    查询工资中包含6的雇员信息

    select \* from emp where sal like ‘%6%’

    如果使用like时，没有查询关键字，则表示查询全部

1.  支持条件运算符，其中不等号有两种表示形式: \<\> !=

2.  distinct

        select {distinct} job from emp

1.  order by 子语中，asc 表示升序， desc表示降序

## 单行函数

### 字符函数

1.  upper(str) 将小写字母变成大写字母

        select upper(‘smith’) from dual

1.  lower(str) 将一个字符串变成小写字母表示

2.  initcap(str) 将单词的第一个字母大写

        select initcap(‘HELLOW word’) from dual;

1.  contact(str1, str2) 字符串连接操作

2.  substr(str, startPos, length)
    截取字符串，第二个参数为开始位置，第三个位置为长度，当第一个参数为0时，oracle会当做1处理，第三个参数省略时，表示截取到字符串尾部。第二个参数为负时，表示从后往前数的位置。

3.  length(str) 返回字符串长度

4.  replace(str, replacedStr, replaceStr )
    替换字符串，第二个参数为被替换的字符串，第三个参数为替换字符串

        select substr(‘hello’, 1, 3), length(‘hello’), replace(‘hello’, ‘l’, ‘x’)
from dual

    显示所有雇员的姓名及姓名后的三个字母

        select ename, substr(ename, length(ename)-2) from emp 或者

        select ename, substr(ename, -3, 3) from emp;

### 数值函数

1.  round(number) 四舍五入，默认截取所有小数，round(number,
        length),第二个参数为保留的小数点位数，当为负时表示舍去的整数位数。

        select round(789.536) from dual output:790

        select round(789.536, -2) from dual output:800

1.  trunk(number)
    截取小数位，用法和round相同，只是不进行四舍五入，而仅是进行舍去操作。

        select trunk(789.536, -2) output:700

1.  mod(number1, number1) 取余，即number1 mod number2

### 日期函数

1.  日期+（-）日期=日期

    日期-日期=数字（天数）

1.  显示当前日期：

        select sysdate from dual;

    显示雇员进入公司的星期数

        select empno, ename, round(sysdate-hiredate)/7 from emp;

1.  months_between(date1, date2): 求出给定日期范围的月数

        select empno, ename, months_between(sysdate, hiredate) from emp;

1.  add_months(date, number) 在指定的日期上加上指定的月数

        select add_months(sysdate, 4);

1.  next_day()：下一个日期是哪一天

        select next_day(sysdate, ‘星期一’) from dual;

1.  last_date(date): 求出给定日期的每月最后一天的日期

    找出每月倒数第三天受雇的所有员工

    select \* from emp where last_day(hiredate)-2=hiredate

### 转换函数

1.  to_char()：转换成字符串

        select empno, ename, to_char(hiredate, ‘yyyy’) year,
            to_char(hiredate,’mm’) months,
            to_char(hiredate, ‘dd’) day
        from emp;

    用作日期的转换

        to_char(hiredate, ‘yyyy-mm-dd’)

    在日期格式前加上fm，则会去除前导0

        to_char(hiredate, ‘fmyyyy-mm-dd’)

    可以用于格式化数字，格式字符串中可以使用\$（表示美元）L（Local的缩写，以本地的语言进行金额的显示）

        to_char(sal, ’L99.999’)

1.  to_number(str): 转换成数字
2.  to_date():转换成日期
        
        select to_date(‘2009-02-16’, ‘yyyy-mm-dd’) from dual;

## 通用函数

1.  nvl(col, value) 如果col的值为null，则表达式的值为value，否则为col

        select nvl(comm, 0)

1.  decode(col/expression, value1, result1, value2, result2, … , [default])
    相当于if… else if … else if… else… 语句

        select ename 雇员姓名, decode(job, ‘CLERK’, ‘业务员’, ‘SALESMAN’, ‘销售人员’, ‘MANAGER’, ‘经理’ ) 职位 from emp;

## 查询语句中应该注意的问题

### 左右连接

选择一个雇员的姓名和其领导的姓名

select e.ename, m.ename from emp from emp e, emp m where e.empno=m.empno(+)

此时使用做链接，雇员信息将全部显示出来，即使没有领导信息。

\+在左边表示右连接，+在右边表示左连接。左连接表示左边数据全部显示，有链接表示右表数据全部显示。


### SQL1999语法对SQL的支持

1.  交叉连接（corss join用于产生笛卡尔积）

        select \* from emp cross join dept;

1.  自然连接（nature join）

        select \* from emp nature join dept;

1.  using子句：用于指定连接的字段

        select \* from emp join dept using(deptno) where deptno=30;

1.  on子句，用于指定连接条件

        select \* from emp e join dept d on(e.deptno=d.deptno) where e.deptno=30;

1.   左（外）连接，右（外）连接

        select e.enme, e.ename from emp e RIGHT OUTER JOIN dept d ON(e.deptno=d.deptno); 即d中的所有行全部显示

左外连接同理。

## 组函数和分组统计

### 组函数

```sql
COUNT([DISTINCT\|ALL] 列名\|\*)
MAX([DISTINCT\|ALL] 列名\|\*)
MIN([DISTINCT\|ALL] 列名\|\*)
AVG([DISTINCT\|ALL] 列名\|\*)
SUM([DISTINCT\|ALL] 列名\|\*)
```

如果程序中出现了分组函数，则有两种使用的情况

1.  程序中存在了group by，并指定了分组条件，这样可以将分组条件一起查询出来。
2.  如果不适用分组，则只能单独使用分组函数

分组函数不允许在where语句中出现，分组条件只能通过having指定

组查询语法

    select … where …[ group by … having … ] [order by … ]

显示非销售人员工作名称及从事同一工作雇员的月工资的总和，并且满足同一工作的月工资合计大于\$5000，输出结果按月工资的合计排序

    select job, sum(sal) su from emp where job\<\>’SALSMAN’ group by job having sum(sa)\>5000 order by su

组函数可以嵌套使用，但是在组函数嵌套使用的时候不能再出现分组条件的查询语句。

    select max(avg(sal)) from emp group by deptno

## 子查询

子查询在操作中分为以下三类

1.  单列子查询：返回结果是一列的内容
2.  多行子查询：返回多个列，有可能是一条完整的记录
3.  多行子查询：返回多条记录

要求查询出：部门名称、部门的员工数、部门的平均工资，部门最低收入雇员的姓名。

```sql
select d.name, ed.ct, ed.av
from dept d,
    (select deptno count(empno) ct, avg(sal) av, min(sal) min
    from emp
    group by depno
    ) ed, emp e
where d.deptno = emp.deptno and d.deptno=emp.deptno and e.sal=ed.min
```

在子查询中，存在以下三种操作符号

1.  IN

    求出每个部门的最低工资的员工信息

        select \* from emp where emp.sal in
            (select min(sal) from emp group by deptno)

1.  ANY

    ANY 与IN操作完全相同

        select \* from emp
            where sal=any(select min(sal) from emp group by deptno)

    ANY 比里面最小的值要大

        select \* from emp
            where sal\>any(select min(sal) from emp group by deptno)

    ANY 比里面最大的值要小

        select \* from emp
            where sal\>any(select min(sal) from emp group by deptno)

1.  ALL

    \>ALL 比最大的值要大

    \<ALL比最小的值要小

## 事务处理

事务处理命令

1.  事务提交：commit
2.  事务回滚：rollback

Oracle中可能发生死锁

一个session如果更新了数据库中的记录，其他session是无法立刻更新的，要等待对方提交之后才允许更新。

## 数据库的更新操作

复制表:

    create table 表名称 as （子查询），此语法只在oracle中起作用

如果子查询中的where条件是一个非真条件，则只复制表结构，不复制表数据。

固定格式日期的插入，需要使用日期函数to_date();

## 数据库中的主要数据类型

| No. | 数据类型          | 描述|
|-----|-------------------|-----------------------------|
| 1   | varhcar, varchar2 | 表示一个整数，有长度限制，为255|
| 2   | number            | number(n)：表示一个整数，整数长度为n，可以用int                         |
|     |                   | number(m, n)：表示一个小数，数字小数长度为n，张数长度为m-n，可以用float |
| 3   | date              | 表示日期的类型，日期要按照标准的日期格式存放|
| 4   | clob              | 大对象，表示大文本数据，一般可以存放4G的文本|
| 5   | blob              | 大对象，表示二进制数据，最大可以存放4G，例如：存放电影，歌曲，图片|

## 约束

### 分类

1. 主键约束（PRIMARY KEY）：表示一个唯一标识，本事不为空

    在创建表的时候加入主键又两种方法

    1. 在字段后面加上关键字，primary key

            如：ID NUMBER(5) PRIMARY KEY

    2. 一种是在所有字段后加上语句

            constraint person_id_pk primary key(pid);

1. 唯一约束（**UNIQUE**）：不允许有重复值

    创建唯一约束的方法同样有两种，同主键约束。

    如：NAME VARCHAR2(15) UNIQUE

1.  检查约束（**CHECK**）：检查一个列的内容是否合法

    创建检查约束的条件两种：

    - 在字段后加关键词

            sex varchar2(2) check(sex in (‘男’,女’))

    - 加constraint语句

        constraint person_age_ck check(sex in(‘男’, ‘女’))

1.  非空约束（**NOT NULL**）

    如：ENAME VARCHAR2(10) NOT NULL

1.  外键约束（**foreign key**）：在两张表中进行约束

        constraint person_book_pid_fk foreign key(pid) references person(pid);

### 使用外键时应注意

1.  在子表中设置的外键在父表中必须是主键
2.  删除时应先删除子表，再删除父表

    也可以使用cascade语句强制删除，如：

        drop table book cascade constraint;

1.  使用级联删除

    在外键约束中加入语句：on delete cascade

    如：constraint person_book_pid_fk foreign key(pid) references person(pid) on delete cascade

1.  修改约束

    - 添加约束

        如：alter table person add constraint person_pid_pk primary key(pid)

    - 删除约束

        alter person drop constraint person_age_ck;

## ROWNUM

如果不用子查询，则只能使用\<号进行查询，使用子查询则可以使用各种逻辑符号。

显示前5条记录

    select \* from emp where rownum\<=5;

显示前6-10条数据

    select \* from
        (select rownum rn, empno, ename from emp where rownum\<=10) temp
    where temp.rn\>5;

## 集合操作

2.  UNION：将多个查询的结果组合到一个查询结果中，没有重复内容

    UNION ALL：将多个查询的结果组合到一个查询结果中，有重复内容

1.  INTERSECT：返回多个查询结果中相同的部分（交集）

2.  MINUS：返回两个查询结果的差集

    用法为 查询结果 关键字 查询结果

## 序列

### 创建语法

```
create sequence seq_name

[increment by n][start with n]

[maxvalue n \| nomaxvalue]

[cycle\|nocycle]

[cache n\| nocache]
```

创建序列完成之后，所有的自动增长由用户自己处理，在序列中提供了一下两种操作：

1.  nextVal：取得学列的写一个内容
2.  currVal：取得学列的当前内容

## 同义词

可以让其他用户通过一个名称方便地访问“用户名.表名称”

创建语法

    CREATE SYNONYM 同义词名称 FOR 用户名.表明
    如：create synonym emp for scott.emp

删除同义词

    drop synonym emp;

## 用户管理

### 创建语法

    create user 用户名 identified by 密码

只有用管理员权限，才能创建用户

### 为用户分配权限

语法

    grant 权限1, 权限2,….to 用户

如：将创建session的权限给test用户

    grant create session to test

如果要把多个权限一次性赋予一个用户，则可以将这些权限定义成一组角色。

Oracle提供了两个主要的角色，分别为CONNECT, RESOURCE。

    GRANT CONNECT, RESOURCE TO test

### 修给密码

    ALTER USER 用户名 IDENTIFIED BY 密码

1.  在一般系统中，用户第一次登陆时可以修改密码，要完成此功能，可以手工让一个密码失效，格式如下：

    ALTER USER 用户名 PASSWORD EXPIRE

1.  锁住用户

    ALTER USER 用户名 ACCOUNT LOCK

1. 解锁用户：ALTER USER 用户名 ACCOUNT UNLOCK

1.  如果新建用户想访问其他用户的表，需要授予此张表的访问权限

        GRANT SELECT, DELETE ON scott.emp TO test

    回收权限，使用REVOKE关键字

        REVOKE SELECT, DELETE ON scott.emp FROM test

## 数据库备份和恢复

1. 数据库备份使用关键字exp

    从cmd下进入到备份文件夹，使用命令exp

    输入要备份的用户

1.  数据库恢复使用关键字：imp

    进入到备份数据的文件夹，输入命令imp

    输入备份的用户

## 嵌套表：一个表中包含另一个子表

数据库在创建数据表时都要指定字段的类型，所以嵌套表本身也同样需要指定类型，这种类型需要单独定义：

```
CREATE TYPE project_ty AS OBJECT(
    proid NUMBER(4),
    proname VARCHAR2(50) ,
    prodate DATE);
```

在定义类型的时候不能加上约束条件

定义类型名称：

    CREATE TYPE project_nt AS TABLE OF project_ty;

利用自定义类型创建表

```
CREATE TABLE department(
    deptno NUMBER(2) PRIMARY KEY,
    dname VARCHAR2(50) NOT NULL,
    projects project_nt
) NESTED TABLE projects STORE AS project_nt_tab_temp;
```

指定嵌套表存储的位置

__插入数据__

```
INSERT INTO department(deptno, dname, projects) VALURS(1, ‘技术部’,
    project_nt(
    project_ty(1001, ‘ERP’ ,sysdate)
    project_ty(1002, ‘AO’ ,sysdate)
));
```

查询嵌套表信息

    SELECT \* FROM TABLE (SELECT projects FROM department WHERE deptno=1);

更新嵌套表

    UPDATE TABLE (SELECT projects FROM department WHERE deptno=1) pro

    set value(pro) = project_ty(‘1001’, ‘嵌套项目’,TO_DATE(‘2010-3-3’, ‘yyyy-mm-dd’));

## 可变数组

属于嵌套表的升级版本，可变数组中实际上是内部的嵌套表的内容的长度进行了限制

__定义可变数组__

定义Object TYPE同嵌套表

    CREATE TYPE worker_info_list AS VARRAY(10) OF worker_info

表的查询和更新统嵌套表

## 数据库设计范式

1. 第一范式（1NF）

    每个属性的值域第一范式都是不可分的简单数据项的集合。

1.  第二范式（2NF）：如学生和课程，设计成三张表

    如果关系R是1NF，而且每一个非主属性都完全依赖于R的键，则R称为第二范式关系模型。

1.  第三范式（3NF）：解决多对一问题，如学生和学院，最好设置成两张表

    如果R是2NF，而且它的任何一个非键属性都不传递得依赖于任何候选键，则R称为第三范式关系模型。
