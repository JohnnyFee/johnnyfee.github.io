---
layout: post
title: "Qt 线程同步"
description: ""
category: Qt
tags: [qt, thread]
--- 

> 原文：<http://blog.csdn.net/hai200501019/article/details/9889123>

## Qt同步线程

我们知道，多线程有的时候是很有用的，但是在访问一些公共的资源或者数据时，需要进行同步，否则会使数据遭到破坏或者获取的值不正确。Qt提供了一些类来实现线程的同步，如：

- [QMutex](http://qt-project.org/doc/qt-5.0/qtcore/qmutex.html)
- [QMutexLocker](http://qt-project.org/doc/qt-5.0/qtcore/qmutexlocker.html)
- [QReadWriteLock](http://qt-project.org/doc/qt-5.0/qtcore/qreadwritelock.html)
- [QReadLocker](http://qt-project.org/doc/qt-5.0/qtcore/qreadlocker.html)
- [QWriteLocker](http://qt-project.org/doc/qt-5.0/qtcore/qwritelocker.html)
- [QSemaphore](http://qt-project.org/doc/qt-5.0/qtcore/qsemaphore.html)
- [QWaitCondition](http://qt-project.org/doc/qt-5.0/qtcore/qwaitcondition.html)。

下面我们分别来看它们的用法：

<!--more-->

## QMutex

首先，简单的了解一下QMutex提供的函数。
构造函数：

	QMutex (RecursionMode mode = NonRecursive )

需要注意的是构造函数的参数，`RecursionMode` 递归模式。枚举类型 RecursionMode有两个值：

- QMutex::Recursive ，在这个模式下，一个线程可以多次锁同一个互斥量。需要注意的是，调用 lock() 多少次锁，就必须相应的调用 unlock() 一样次数解锁。
- QMutex::NonRecursive( 默认 ) ，在这个模式下，一个线程只能锁互斥量一次。

	void QMutex:: lock ()

该函数用来锁住一个互斥量。如果另外的线程已经锁住了互斥量，函数将被阻塞等待另外的线程解锁互斥量。
如果是一个可递归的互斥量，则可以从同一个线程多次调用这个函数，如果是非递归的互斥量，多次调用这个函数将会引发死锁。

	bool QMutex::tryLock ()

该函数试图锁一个互斥量，如果成功则返回 true 。如果另外的线程已经锁住了互斥量，函数直接返回 false 。

	bool QMutex::tryLock ( int timeout)

该函数跟上面的 trylock() 相似。不同的是，如果互斥量在别的线程锁住的情况下，函数会等待 timeout 毫秒。需要注意的是，如果传入的 timeout 为负数，函数将无限期等待，跟调用 lock() 一样的效果。

	void QMutex::unlock ()

该函数对互斥量进行解锁。如果在另外的线程加锁，尝试在别的线程进行解锁则会引发错误。试图对没有加锁的互斥量解锁结果是未定义的。

## QMutexLocker

QmutexLocker 只是为了简化我们队互斥量的加锁和解锁操作。就像智能指针方便我们使用普通指针一样。

	QMutexLocker(QMutex * mutex)

构造函数必须传入一个互斥量指针，然后在构造函数里 mutex 直接调用 lock() 。

下面来看看具体的用法：

假设有个函数有很多return 语句，那么我们就必须记得在每个语句前unlock互斥量，否则互斥量将无法得到解锁，导致其他等待的线程无法继续执行。

	int complexFunction(intflag)
	{
		mutex.lock();

		int retVal = 0;
		switch (flag) {
			case 0:
			case1:
				retVal = moreComplexFunction(flag);
				break;
			case 2:
				{
					int status = anotherFunction();
					if (status < 0) {
						mutex.unlock();
						return -2;
					}
					retVal = status + flag;
				}
				break;
			default:
				if (flag > 10) {
					mutex.unlock();
					return -1;
				}

				break;
		}

		mutex.unlock();
		return retVal;
	}

这样的代码显得很冗余又容易出错。如果我们用 QMutexLocker

	int complexFunction(int flag)
	{
		QMutexLocker locker(&mutex);

		int retVal = 0;
		switch (flag) {
			case 0:
			case 1:
				return moreComplexFunction(flag);
			case 2:
				{
				int status = anotherFunction();

				if (status < 0)
					return -2;

				retVal = status + flag;
				}
				break;

			default:
				if (flag > 10)
					return -1;
					break;
				}

		return retVal;
	}

由于locker 是局部变量，在离开函数作用域时，mutex肯定会被解锁。

## QreadWriteLock 

QreadWriteLock是一个读写锁，主要用来同步保护需要读写的资源。当你想多个读线程可以同时读取资源，但是只能有一个写线程操作资源，而其他线程必须等待写线程完成时，这时候用这个读写锁就很有用了。QreadWriteLock也有递归和非递归模式之分。

我们主要来看看最重要的两个函数是如何实现读写操作的同步的。

	void QReadWriteLock::lockForRead ()

该函数lock接了读操作的锁。如果有别的线程已经对lock接了写操作的锁，则函数会阻塞等待。

	void QReadWriteLock::lockForWrite ()

该函数给lock加了写操作的锁，如果别的线程已经加了读或者写的锁，则函数会被阻塞。

## QSemaphore 

QSemaphore是提供一个计数的信号量。信号量是泛化的互斥量。一个信号量只能锁一次，但是我们可以多次获得信号量。信号量可以用来同步保护一定数量的资源。

信号量支持两个基本是函数， `acquire`和`release`：

- acquire(n) ：尝试获取n个资源。如果没有足够的可用资源，该函数调用会被则是。
- release(n) ：释放n个资源。

由于avail变量，实际就是一个int的计数变量 。所以我们在调用release()传入的参数n大于信号量初始值也没关系，只是说明可用资源增加了。

例如以下代码：

	int main( int argc, char *argv[])
	{
		QCoreApplication a(argc, argv);

		QSemaphore sem(5); 
		sem.acquire(5); 

		cout<< "acquire(5); " << "remaindresource :" <<sem.available()<<endl;
		sem.release(5); 
		cout<< "release(5) " << "remaindresource :" <<sem.available()<<endl;

		sem.release(10); 
		cout<< "release(10) " << "remaindresource :" <<sem.available()<<endl;

		sem.acquire(15);
		cout<< "acquire(15); " << "remaindresource :" <<sem.available()<<endl;
		return a.exec();
	}

![](http://johnnyimages.qiniudn.com/Centerundefined)

信号量最著名的就是生产者与消费者的例子，以后再研究了。

## QWaitCondition

QWaitCondition类提供了一个条件变量，它允许我们通知其他线程，等待的某些条件已经满足。等待QWaitCondition变量的可以是一个或多个线程。当我们用 `wakeOne` 通知其他线程时，系统会随机的选中一个等待进行唤醒，让它继续运行。其实前面的信号量和读写锁内部实现都有用到QWaitCondition的。

下面我们来看这个类重要的几个函数：

bool QWaitCondition::wait (QMutex * mutex, unsigned long time =ULONG_MAX )

该函数对mutex解锁，然后等待。在调用这个函数之前，mutex必须是加锁状态。如果mutex没有加锁，则函数直接返回。如果mutex是可递归的，函数也直接返回。该函数对mutex解锁，然后等待，知道以下条件之一满足：

1. 另外的线程调用 `wakeOne()` 或 `wakeAll()`，则该函数会返回 true。
2. 时间过了Time毫秒。如果time为ULONG_MAX（默认），则将会一直等待不会超时。如果超时则返回false。

	bool QWaitCondition::wait (QReadWriteLock * readWriteLock, unsigned long time = ULONG_MAX)

函数对 `readWriteLock` 解锁并等待条件变量。在调用这个函数之前，`readWriteLock` 必须是加锁状态的。如果不是加锁状态，则函数立即返回。`readWriteLock` 必须不能是递归加锁的，否则将不能正确的解锁。返回的满足条件跟上面的函数一样。