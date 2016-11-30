---
layout: "post"
title: "Java Exception"
date: "2016-11-30 14:22"
categories: Java
---


## What is an Exception?

Exceptions are events that occurs when executing the programs that will disrupt or terminate the normal flow of the program. In Java, an exception is an object that contains the type of the exception and details of the root cause for that exception.

1.  The exception can be JDK library exception (built-in with JDK API) or user defined custom exception.
2.  In general practice, we can use the `printStackTrace()` for printing the complete details of the exception. This method will be print the origin of the exception and path of the exception propagation.
3.  The exceptions can be thrown because of programmatic errors or environment issues.

## Exception Hierarchy

![Exception Hierarchy in java](http://howtodoinjava.files.wordpress.com/2013/04/exceptionhierarchy3.png "Exception Hierarchy in java")

- **Checked exceptions** are exceptions that must be declared in the throws clause of a method. They extend Exception and are intended to be an “in your face” type of exceptions. Java wants you to handle them because they somehow are dependent on external factors outside your program. A checked exception indicates an expected problem that can occur during normal system operation. Mostly these exception happen when you try to use external systems over network or in file system. Mostly, the correct response to a checked exception should be to try again later, or to prompt the user to modify his input.

- **Unchecked exceptions** are exceptions that do not need to be declared in a throws clause. JVM simply doesn’t force you to handle them as they are mostly generated at runtime due to programmatic errors. They extend RuntimeException. The most common example is a NullPointerException [Quite scary.. Isn’t it?]. An unchecked exception probably shouldn’t be retried, and the correct action should be usually to do nothing, and let it come out of your method and through the execution stack. At a high level of execution, this type of exceptions should be logged.

- **Errors** are serious runtime environment problems that are almost certainly not recoverable. Some examples are OutOfMemoryError, LinkageError, and StackOverflowError. They generally crash you program or part of program. Only a good logging practice will help you in determining the exact causes of errors.

## How to Handle Exceptions?

Java provides keywords `try`,`catch`,`finally`,`throw` and `throws` for handling the exceptions. We will go through each one in detail and how to use them in your Java program.

### try and catch

The try and catch block is used for writing the code that might throw an exception. In simple words, put the code that would throw exceptions inside the try and catch block. 

Every try block must be followed by a catch or finally block. It is perfectly valid for a try block to ignore catch and have only a finally block. 

A try block may have more than one catch or finally block.

```java
public void method(){
  try{
  	//statements here
  }catch (Exception e){
  	e.printStackTrace();
}
```

### finally

Finally blocks are executed always even there is exception thrown by the applications. It is good practice to put the code which must be executed for cleaning up the resources, etc. For example : If you want to close the database connection or close the file operations, finally block is the right place to write that code.

Finally block appears after the try or catch block. **The syntax for the finally block looks like this:**

```java
try{
   //Protected code
}catch(Exception e1){
   //Catch block
}catch(Exception e2){
   //Catch block
}catch(Exception e3){
   //Catch block
}finally{
   //The finally block always executes.
}
```

### throw



`throw` is used for invoking the exception explicitly. When throw statement is encountered in your program, the next statement is not executed. The control is immediatlely transferred to catch block to see if the thrown exception is handled there.

If none of the catch block is handling the exception, the thrown exception will be shown to the user. We can use `throw` keyword for throwing new exception or re-throwing the exception caught in the catch block.

```java
public class ExceptionExample {
	public static void main(String args[]) {
		try {
			new ExceptionExample().method2();
		} catch (IOException e) {
			System.out.println("Exception handled in this method : "
					+ e.getMessage());
		}
	}

	public void method1(){
		File file = new File("wrongfile.txt");
		try {
			FileInputStream fin = new FileInputStream(file);
			System.out.println(fin.read());
		} catch (FileNotFoundException e) {
			throw e;
		} catch (IOException e) {
			throw e;
		}
	}

	public void method2() throws IOException {
		method1();
	}
}
```

In the above example exceptions are re-thrown from the catch block and handled in another method. 

### throws

`throws` is used for postponing the exception handling and can be used as the alternative for try and catch block. Throws is declared at the end of method signature.If the method might throw multiple exceptions, all the exception can be declared in the method signature with coma separated.  

Suppose, one method is declaring the `throws` clause in the method signature, then calling method must handle those exceptions.

```java
public void method2() throws IOException {
	method1();
}
```

Using the throws clause is that we are just avoiding the try and catch but the actual handling is propagated to caller method. If you declare an exception in the throws clause, then the caller method muse handle the exception. Otherwise code will not compile.

## User defined custom exceptions

Custom exceptions are the exceptions that are application specific exceptions. These exceptions are not part of the Java’s built-in **exception hierarchy**. If you are working on a Java application, there would be a requirement to write your own custom exceptions to handle the application specific errors which will be more convenient for the application to understand and interpret the messages to the users in-case of any error.

Note that if you want to write checked exception, please extend your exception class with `java.lang.Exception` or if you want to write runtime exception, then please extend your exception class with `java.lang.RuntimeException`.

I have written a very simple custom exception that would explain you the real purpose for writing our own exception. Let’s look at the below code:

Anytime when user feels that he wants to use its own application specific exception for some reasons, he can create a new class extending appropriate super class (mostly its Exception.java) and start using it in appropriate places. These user defined exceptions can be used in two ways:

**1)** Either directly throw the custom exception when something goes wrong in application

```
throw new DaoObjectNotFoundException("Couldn't find dao with id " + id);
```

**2)** Or wrap the original exception inside custom exception and throw it

```
catch (NoSuchMethodException e) {
  throw new DaoObjectNotFoundException("Couldn't find dao with id " + id, e);
}
```

Wrapping an exception can provide extra information to the user by adding your own message/ context information, while still preserving the stack trace and message of the original exception. It also allows you to hide the implementation details of your code, which is the most important reason to wrap exceptions.

Now lets start exploring the best practices followed for exception handling industry wise.

## Improvements in Java 7

### Multiple Exceptions in Catch Block

There are lot of new features introduces as part of the [Java 7 release](http://www.javabeat.net/new-features-in-java-7-0-part-1/) ([some more](http://www.javabeat.net/whats-new-in-java-7-features-as-part-of-project-coin/)). One of them is the catching multiple exceptions in the single catch block. Prior to [Java 7](http://www.javabeat.net/java-7/), a catch block can catch only one exception at a time. With the Java 7 release, developers can add multiple exceptions using the “|” symbol.

**Let’s look at a simple example:**

```java
public void method1() throws IOException {
	File file = new File("wrongfile.txt");
	try {
		FileInputStream fin = new FileInputStream(file);
		System.out.println(fin.read());
	} catch (IOException | NullPointerException  e) {
		throw e;
	} 
}
```

1.  But, you can not declare the same exception hierarchy in the same catch block. For example, `IOException` and `FileNotFoundException` can not be in the same catch block since both are of the same type. You would get the error message something like : `The exception FileNotFoundException is already caught by alternative exception IOException`.
2.  Another point is that when you handle more than one exception in single catch block, the exception variable used in the catch block is implicitly `final`. You can not assign any value to the variable `e`.

### **Try with Resources statement**

Another improvement in Java 7 is introduction of try-with-resource statement for auto-closing the resource instances. A resource is an object, that must be closed after it finished the operation. Any object that implements the class `java.lang.AutoCloseable` or `java.io.Closeable` can be used as a resource.

This classes will override the method `close` that will be invoked automatically at the time of closing the operation. Prior to java 7, this method will be invoked in the `finally` block. But, if there is any exception in the finally block, that also has to be handle. This handling become much easier in Java 7.

```java
try ( Resource myResource2 = new Resource("TRY-WITH-RESOURCE")){
  myResource2.useResource();
}catch ( SomeException | IOException ex){
  ex.printStackTrace();
}
```

If you want to read more about this feature, please our previous tutorial on [try-with-resource block](http://try%20%28%20resource%20myresource2%20%3D%20new%20resource%28/) or [official documentation](http://docs.oracle.com/javase/7/docs/technotes/guides/language/try-with-resources.html).

### Suppressed Exceptions Handling in Java 7

Another nice feature introduced in the Java 7 release is the handling of suppressed exception while using the try-with-resource block. Prior to java 7, second exception thrown while closing the resource was suppressed and not shown to the user.

With the improvements, lot of code has been reduced and Java itself handles the suppressed exception. Here is the more detailed tutorial on [suppressed exceptions used in Java 7 with multiple scenarios](http://www.javabeat.net/java-suppressed-exceptions/).

## Best Practice

### 不要在 catch 语句块中压制/吞噬异常

```java
public class ExceptionExample {
 public FileInputStream testMethod1(){
     File file = new File("test.txt");
     FileInputStream fileInputStream = null;
     try{
         fileInputStream = new FileInputStream(file);
         fileInputStream.read();
     }catch (IOException e){            
         return null;
     }
     return fileInputStream;
 }
 public static void main(String[] args){
     ExceptionExample instance1 = new ExceptionExample();
     instance1.testMethod1();
 }
}
```

在异常处理时进行异常压制是非常不好的编程习惯，上面的例子中，无论抛出什么异常都会被忽略，以至没有留下任何问题线索。如果在这一层次不知道如何处理异常，最好将异常重新抛出，由上层决定如何处理异常。

```java
public class ExceptionExample {
 public FileInputStream testMethod1() throws IOException{
     File file = new File("test.txt");
     FileInputStream fileInputStream = null;
     try{
         fileInputStream = new FileInputStream(file);
         fileInputStream.read();
     }catch (IOException e){            
         throw e;
     }
     return fileInputStream;
 }
 public static void main(String[] args) throws IOException{
     ExceptionExample instance1 = new ExceptionExample();
     instance1.testMethod1();
 }
}
```

### 要在方法定义分句中定义具体的异常  

```java
public FileInputStream testMethod1() throws Exception
```

按照这种写法，表示该方法会抛出所有受检查异常，这不是一个良好的编程习惯。在这种情况下，我们最好抛出足够具体的异常，以便调用者进行合适的捕获和处理，例如

```java
public FileInputStream testMethod1() throws IOException
```

Relevancy is important to keep application clean. A method which tries to read a file; if throws NullPointerException then it will not give any relevant information to user. Instead it will be better if such exception is wrapped inside custom exception e.g. NoSuchFileFoundException then it will be more useful for users of that method.

### 捕获具体的异常  

在调用其他模块时，最好捕获由该模块抛出的具体的异常。如果某个被调用模块抛出了多个异常，那么只捕获这些异常的父类是不好的编程习惯。  

例如，如果一个模块抛出 _FileNotFoundException_ 和 _IOException_，那么调用这个模块的代码最好写两个 `catch` 语句块分别捕获这两个异常，而不要只写一个捕获 `Exception` 的 `catch` 语句块。  

正确的写法如下：

```java
try {
    //some statements
}
catch(FileNotFoundException e){
    //handle here
}
catch(IOException e){
    //handle here
}
```

你最好不要这么写：

```java
try {
    //some statements
}catch(Exception e){
    //handle here
}
```

### 记得在finally语句块中释放资源  

If you are using resources like database connections or network connections, make sure you clean them up. If the API you are invoking uses only unchecked exceptions, you should still clean up resources after use, with try – finally blocks. Inside try block access the resource and inside finally close the resource. Even if any exception occur in accessing the resource, then also resource will be closed gracefully.

为了避免这种情况发生，可以使用Java 7 的语句

```java
try(open the resources) {
  deal with resources
}
```

，如果你还是习惯这种老式写法，则可以按照如下方式写：

```java
finally {
     try {
        
     } catch (SQLException sqlee) {
          if (con != null) {
             con.close();
         }
         if (stat != null) {
             stat.close();
         }
     }
 }
```

5.  异常会影响性能  

![](http://upload-images.jianshu.io/upload_images/44770-c9d31b45bfab862c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  

异常处理的性能成本非常高，每个Java程序员在开发时都应牢记这句话。创建一个异常非常慢，抛出一个异常又会消耗1~5ms，当一个异常在应用的多个层级之间传递时，会拖累整个应用的性能。

+ 仅在异常情况下使用异常；
+ 在可恢复的异常情况下使用异常；

尽管使用异常有利于Java开发，但是在应用中最好不要捕获太多的调用栈，因为在很多情况下都不需要打印调用栈就知道哪里出错了。因此，异常消息应该提供恰到好处的信息。

### 使用标准异常  

如果使用内建的异常可以解决问题，就不要定义自己的异常。Java API提供了上百种针对不同情况的异常类型，在开发中首先尽可能使用Java API提供的异常，如果标准的异常不能满足你的要求，这时候创建自己的定制异常。尽可能得使用标准异常有利于新加入的开发者看懂项目代码。

###  正确得包装异常类型  

当需要在应用重新抛出异常时，应该正确得包装原始异常，否则会丢失原始异常，例如下面的例子中：

```java
import java.io.IOException;
public class HelloWorld{
  public static void main(String []args) throws Exception{
     try{
         throw new IOException("IOException");    
     }catch (IOException e){
         throw new ExampleException1("Example Exception and " + e.getMessage());
     }

  }
}
class ExampleException1 extends Exception{
 public ExampleException1(String s, Throwable t){
     super(s,t);
 }
 public ExampleException1(String s){
     super(s);
 }
}
```

这个程序的输出为：

```
Exception in thread "main" ExampleException1: Example Exception and IOException
     at HelloWorld.main(HelloWorld.java:8)
```

这里发现，IOException的调用栈已经丢失了，因为我们在catch语句块中没有正确包装IOException。若将catch语句块修改成下面这样，这可以发现原始异常的调用栈也被打印出来了。

```java
catch (IOException e){
    throw new ExampleException1("Example Exception",e);
}
```

这时候的输出如下：

```
Exception in thread "main" ExampleException1: Example Exception                
     at HelloWorld.main(HelloWorld.java:8)
Caused by: java.io.IOException: IOException                                    
     at HelloWorld.main(HelloWorld.java:6)
```

### 避免在finally语句块中抛出异常

```java
try {
    method();  //here throws first exception
} finally {
    shutdown(); //If finally blockthrew any exception the first exception will be lost forever
}
```

在上面的这个代码片段中，`finally` 代码块也可能再次抛出异常。如果同时抛出两个异常，则第一个异常的调用栈会丢失。在 `finally` 语句块中最好只做打印错误信息或者关闭资源等操作，避免在finally语句块中再次抛出异常。

### 不要使用异常控制程序的流程  

不应该使用异常控制应用的执行流程，例如，本应该使用 `if` 语句进行条件判断的情况下，你却使用异常处理，这是非常不好的习惯，会严重影响应用的性能。

### 不要捕获 Throwable 类  

在应用中不应捕获Throwable类，Error是Throwable类的子类，当应用抛出Errors的时候，一般都是不可恢复的情况。

### 为异常记录合适的文档  

为应用中定义的异常定义合适的文档，如果你写了一个自定义的异常却没有文档，其他开发者会不清楚这个异常的含义，为你定义的异常配备对应的文档是一个非常好的习惯。

### Either log the exception or throw it but never do the both

```java
catch (NoSuchMethodException e) {
   LOGGER.error("Some information", e);
   throw e;
}
```

As in above example code, logging and throwing will result in multiple log messages in log files, for a single problem in the code, and makes life hell for the engineer who is trying to dig through the logs.

### Always catch only those exceptions that you can actually handle

```java
catch (NoSuchMethodException e) {
   throw e; //Avoid this as it doesn't help anything
}
```

Well this is most important concept. Don’t catch any exception just for the sake of catching it. Catch any exception only if you want to handle it or, you want to provide additional contextual information in that exception. If you can’t handle it in catch block, then best advice is just don’t catch it only to re-throw it.

### Don’t use printStackTrace() statement or similar methods

Never leave printStackTrace() after finishing your code. Chances are one of your fellow colleague will get one of those stack traces eventually, and have exactly zero knowledge as to what to do with it because it will not have any contextual information appended to it.

### Use finally blocks instead of catch blocks if you are not going to handle exception

```java
try {
  someMethod();  //Method 2
} finally {
  cleanUp();    //do cleanup here
}
```

This is also a good practice. If inside your method you are accessing some method 2, and method 2 throw some exception which you do not want to handle in method 1, but still want some cleanup in case exception occur, then do this cleanup in finally block. Do not use catch block.

### Remember “Throw early catch late” principle

This is probably the most famous principle about Exception handling. It basically says that you should throw an exception as soon as you can, and catch it late as much as possible. You should wait until you have all the information to handle it properly.

This principle implicitly says that you will be more likely to throw it in the low-level methods, where you will be checking if single values are null or not appropriate. And you will be making the exception climb the stack trace for quite several levels until you reach a sufficient level of abstraction to be able to handle the problem.

### Validate user input to catch adverse conditions very early in request processing

Always validate user input in very early stage, even before it reached to actual controller. It will help you to minimize the exception handling code in your core application logic. It also helps you in making application consistent if there is some error in user input.

For example: If in user registration application, you are following below logic:

1. Validate User  
1. Insert User  
1. Validate address  
1. Insert address  
1. If problem the Rollback everything

This is very incorrect approach. It can leave you database in inconsistent state in various scenarios. Rather validate everything in first place and then take the user data in dao layer and make DB updates. Correct approach is:

1. Validate User  
1. Validate address  
1. Insert User  
1. Insert address  
1. If problem the Rollback everything

### Always terminate the thread which it is interrupted

```java
while (true) {
  try {
    Thread.sleep(100000);
  } catch (InterruptedException e) {} //Don't do this
  doSomethingCool();
}
```

InterruptedException is a clue to your code that it should stop whatever it’s doing. Some common use cases for a thread getting interrupted are the active transaction timing out, or a thread pool getting shut down. Instead of ignoring the InterruptedException, your code should do its best to finish up what it’s doing, and finish the current thread of execution. So to correct the example above:

```java
while (true) {
  try {
    Thread.sleep(100000);
  } catch (InterruptedException e) {
    break;
  }
}
doSomethingCool();
```

## See 

- [Java Exceptions Tutorial](http://javabeat.net/java-exceptions/)
- [Top 20 Java Exception Handling Best Practices - HowToDoInJava](http://howtodoinjava.com/best-practices/java-exception-handling-best-practices/)
- [Top 11 Java Exception Best Practices](http://javabeat.net/java-exception-best-practices/) / [【译】11条Java异常处理的最佳实践 - 简书](http://www.jianshu.com/p/38c5ba78db57)