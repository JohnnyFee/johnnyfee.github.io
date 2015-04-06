layout: post
title: "C语言内存地址基础"
category: C++
tags: [c++, syntax]
---

> 原文：<http://blog.jobbole.com/44845/>

从计算机内存的角度思考C语言中的一切东东，是挺有帮助的。我们可以把计算机内存想象成一个字节数组，内存中每一个地址表示 1 字节。比方说我们的电脑有 4K 内存，那这个内存数组将会有 4096 个元素。当我们谈论一个存储地址的指针时，就当相于我们在谈论一个存储着该内存数组某个元素索引的指针。逆向引用某个指针，将会得到数组中该索引所指向的值。这一切当然都是谎言。操作系统对内存的管理要远比这复杂。内存不一定连续，也不一定按顺序处理。但前面的类比是一种讨论C语言内存的简单方式。

如果对『指针』、『地址』和『逆向引用』感到混乱，请看《C语言指针5分钟教程》。// 译注：“dereferencing” 的译法比较多，本文采用了“逆向引用”。 

假设我们的计算机有 4K 的内存，下一个开放地址的索引是2048。我们声明一个新的字符变量i='a'。当该变量所获得的内存放置了它的值，变量的名字也与内存中的该位置关联，我们的字符i就获得了一个存储在2048位置的值。该字符是单字节的因此它只占用了索引为 2048 的位置。如果我们对 i 变量使用地址操作符（&），它将返回到索引为2048的位置。如果这个变量是另一种类型，比如是 int，它将占用4字节，在数组中占用索引为 2048-2051 的位置。使用地址操作符仍将返回索引2048的位置，因为 int 型即便占用了 4 字节，但它开始于 2048 位置。我们看一个例子：

<!-- more -->

    // intialize a char variable, print its address and the next address
    char charvar = '\0';
    printf("address of charvar = %p\n", (void *)(&charvar));
    printf("address of charvar - 1 = %p\n", (void *)(&charvar - 1));
    printf("address of charvar + 1 = %p\n", (void *)(&charvar + 1));
     
    // intialize an int variable, print its address and the next address
    int intvar = 1;
    printf("address of intvar = %p\n", (void *)(&intvar));
    printf("address of intvar - 1 = %p\n", (void *)(&intvar - 1));
    printf("address of intvar + 1 = %p\n", (void *)(&intvar + 1));

运行将得到如下的输出：

    address of charvar = 0x7fff9575c05f
    address of charvar - 1 = 0x7fff9575c05e
    address of charvar + 1 = 0x7fff9575c060
    address of intvar = 0x7fff9575c058
    address of intvar - 1 = 0x7fff9575c054
    address of intvar + 1 = 0x7fff9575c05c
 

在第一个例子的1-5行中，我们声明了一个字符变量，并打印输出该字符的地址，然后打印了内存中位于该变量前后的两个地址。我们是通过使用&操作符并+1或-1来获取前后两个地址的。在7-11行的第二个例子中我们做了差不多的事，除了声明了一个int型变量，打印出它的地址以及紧邻它前后的地址。

在输出中，我们看到地址是 16 进制的。更值得注意的是，字符的地址前后相差1字节。int 型变量地址前后相差四字节。内存地址的算法、指针的算法、都是根据所引用的类型的大小的。一个给定的类型的大小是依赖于平台的，我们这个例子中的char是1字节，int是四字节。将字符的地址-1是改地址前的地址，而将int型地址-1是该地址前4个的地址。

在例子中，我们是用地址操作符来获取变量的地址，这和使用表示变量地址的指针是一样的效果。

英文原博中评论已经提出：存储&charvar-1（一个非法的地址因它位于数组之前)在技术上是未特别指出的行为。C的标准已经声明，未特别指出的以及在一些平台存储一个非法地址都将引起错误。

 

## 数组地址

在C语言中，数组是相邻的内存区域，它存储了大量相同数据类型的值（int、long、*char等等）。很多程序员第一次用C时，会将数组当做指针。那是不对的。指针存储一个简单的内存地址，而一个数组是一块存储多个值的连续的内存区域。

    // initialize an array of ints
    int numbers[5] = {1,2,3,4,5};
    int i = 0;
     
    // print the address of the array variable
    printf("numbers = %p\n", numbers);
     
    // print addresses of each array index
    do {
        printf("numbers[%u] = %p\n", i, (void *)(&numbers[i]));
        i++;
    } while(i < 5);
     
    // print the size of the array
    printf("sizeof(numbers) = %lu\n", sizeof(numbers));

运行将得到如下的输出：

    numbers = 0x7fff0815c0e0
    numbers[0] = 0x7fff0815c0e0
    numbers[1] = 0x7fff0815c0e4
    numbers[2] = 0x7fff0815c0e8
    numbers[3] = 0x7fff0815c0ec
    numbers[4] = 0x7fff0815c0f0
    sizeof(numbers) = 20

在这个例子中，我们初始化了一个含有 5 个 int 元素的数组，我们打印了数组本身的地址，注意我们没有使用地址操作符 & 。这是因为数组变量已经代表了数组首元素的地址。你会看到数组的地址与数组首元素的地址是一样的。然后我们遍历这个数组并打印每个元素的内存地址。在我们的计算机中 int 是四个字节的，数组内存是连续的，因此每个int型元素地址之间相差4。

在最后一行，我们打印了数组的大小，数组的大小等于sizeof(type)乘上数组元素的数量。这里的数组有5个int型变量，每一个占用4字节，因此整个数组大小为20字节。

## 结构体地址

在C语言中，结构体一般是连续的内存区域，但也不一定是绝对连续的区域。和数组类似，它们能存储多种数据类型，但不同于数组的是，它们能存储不同的数据类型。

    struct measure {
      char category;
      int width;
      int height;
    };
 
    // declare and populate the struct
    struct measure ball;
    ball.category = 'C';
    ball.width = 5;
    ball.height = 3;
 
    // print the addresses of the struct and its members
    printf("address of ball = %p\n", (void *)(&ball));
    printf("address of ball.category = %p\n", (void *)(&ball.category));
    printf("address of ball.width = %p\n", (void *)(&ball.width));
    printf("address of ball.height = %p\n", (void *)(&ball.height));
     
    // print the size of the struct
    printf("sizeof(ball) = %lu\n", sizeof(ball));

运行后的输出结果如下：

    address of ball = 0x7fffd1510060
    address of ball.category = 0x7fffd1510060
    address of ball.width = 0x7fffd1510064
    address of ball.height = 0x7fffd1510068
    sizeof(ball) = 12

在这个例子中我们定义了一个结构体measure，然后声明了该结构体的一个实例ball，我们赋值给它的width、height以及category成员，然后打印出ball的地址。与数组类似，结构体也代表了它首元素的地址。然后打印了它每一个成员的地址。category是第一个成员，它与ball具有相同的地址。width后面是height，它们都具有比category更高的地址。

你可能会想因为category是一个字符，而字符型变量占用1字节，因此width的地址应该比开始出高1个字节。从输出来看这不对。 根据C99标准（§6.7.2.1），为边界对齐，结构体可以给成员增加填充字节。它不会记录数据成员，但会增加额外的字节。在实际中，大多数的编译器会使结构体中的每个成员与结构体最大的成员有相同大小，

在我们的例子中，你可以看到char实际上占用4字节，整个struct占用12个字节。都发生了什么？

1. struct变量指向struct首元素的地址
2. 不要去假设一个结构体的成员相对于另外一个成员有多少内存偏移量，结构体成员之间可能有边界字节，或者编译器也可能将它们放在不连续的内存空间中。使用地址操作符&来获得成员的地址

3. 使用sizeof(struct instance)来获得struct的总大小，不能假设它是各个成员大小的大小总和，也许还有填充字节。