---
layout: "post"
title: "Android Serializable"
date: "2016-11-26 15:05"
categories: Android
---

## Serializable

`Serializable`是java提供的标准序列化接口，它是一个空接口，为对象提供标准的序列化和反序列化操作。

You can just implement Serializable interface and add override methods.The problem with this approach is that reflection is used and it is a slow process. This method create a lot of temporary objects and cause quite a bit of garbage collection. Serializable interface is easier to implement.

实现接口 `Serializable` 接口

```java
public class MyObjects implements Serializable {

private String name;
private int age;

public ArrayList<String> address;

public MyObjects(String name, int age, ArrayList<String> address) {
    super();
    this.name = name;
    this.age = age;
    this.address = address;
}

public ArrayList<String> getAddress() {
    if (!(address == null))
        return address;
    else
        return new ArrayList<String>();
}

public String getName() {
    return name;

}

public String getAge() {
    return age;
}

}
```

传递 Serializable 对象：

```java
//MyObjects instance
MyObjects mObjects = new MyObjects("name","age","Address array here");

//Passing MyObjects instance via intent
Intent mIntent = new Intent(FromActivity.this, ToActivity.class);
mIntent.putExtra("UniqueKey", mObjects);
startActivity(mIntent);


//Getting MyObjects instance
Intent mIntent = getIntent();
MyObjects workorder = (MyObjects) mIntent.getSerializableExtra("UniqueKey");
```


`Serializable`的实现原理是将需要序列化的对象写入文件内，反序列化的时候再从文件内读取数据组成对象。这个过程中会有一个`serialVersionID`来标记当前序列化文件的版本，反序列化的时候会
检测当前类的serialVersionID和文件中的serialVersionID是否一样，如果一样，那么就说明当前类和序列化的对象的版本相同（即使类不同，也能恢复大部分数据），否则就说明当前类和序列化对象有所不同，可能是增减了成员变量之类的变化，这个时候反序列化程序就会crash。
另外，序列化和反序列化的过程是通过`writeObject`和`readObject`来实现的，可以重写他们改变系统的默认序列化和反序列化过程。

ObjectOutputStream 序列化

```
//序列化
User user = new User(0,"jack",true);
ObjectOutputStream out = new ObjectOutputStream(
  new FileOutputStream("cache.txt"));
  out.writeObject(user);
  out.close();
```

ObjectInputStream 反序列化

```java
//反序列化
ObjectInputStream in = new ObjectInputStream(
  new FileInputStream("cache.txt"));
User user = (User) in.readObject();
in.close();
```

## Parcelable

android中提供的序列化接口，实现这个接口以后就可以实现序列化并且可以通过Intent和Binder传递。

Parcelable process is much faster than serializable. One of the reasons for this is that we are being explicit about the serialization process instead of using reflection to infer it. It also stands to reason that the code has been heavily optimized for this purpose.

```java
//MyObjects Parcelable class

import java.util.ArrayList;

import android.os.Parcel;
import android.os.Parcelable;

public class MyObjects implements Parcelable {

private int age;
private String name;

private ArrayList<String> address;

public MyObjects(String name, int age, ArrayList<String> address) {
    this.name = name;
    this.age = age;
    this.address = address;

}

public MyObjects(Parcel source) {
    age = source.readInt();
    name = source.readString();
    address = source.createStringArrayList();
}

@Override
public int describeContents() {
    return 0;
}

@Override
public void writeToParcel(Parcel dest, int flags) {
    dest.writeInt(age);
    dest.writeString(name);
    dest.writeStringList(address);

}

public int getAge() {
    return age;
}

public String getName() {
    return name;
}

public ArrayList<String> getAddress() {
    if (!(address == null))
        return address;
    else
        return new ArrayList<String>();
}

public static final Creator<MyObjects> CREATOR = new Creator<MyObjects>() {
    @Override
    public MyObjects[] newArray(int size) {
        return new MyObjects[size];
    }

    @Override
    public MyObjects createFromParcel(Parcel source) {
        return new MyObjects(source);
    }
};

}
```


```java
MyObjects mObjects = new MyObjects("name","age","Address array here");

//Passing MyOjects instance
Intent mIntent = new Intent(FromActivity.this, ToActivity.class);
mIntent.putExtra("UniqueKey", mObjects);
startActivity(mIntent);

//Getting MyObjects instance
Intent mIntent = getIntent();
MyObjects workorder = (MyObjects) mIntent.getParcelable("UniqueKey");

//You can pass Arraylist of Parceble obect as below

//Array of MyObjects
ArrayList<MyObjects> mUsers;

//Passing MyOjects instance
Intent mIntent = new Intent(FromActivity.this, ToActivity.class);
mIntent.putParcelableArrayListExtra("UniqueKey", mUsers);
startActivity(mIntent);


//Getting MyObjects instance
Intent mIntent = getIntent();
ArrayList<MyObjects> mUsers = mIntent.getParcelableArrayList("UniqueKey");
```

## Parcelable and Serializable 比较

1.  Parcelable is faster than serializable interface
2.  Parcelable interface takes more time for implemetation compared to serializable interface
3.  serializable interface is easier to implement
4.  serializable interface create a lot of temporary objects and cause quite a bit of garbage collection
5.  Parcelable array can be pass via Intent in android

If you want to be a good citizen, take the extra time to implement [Parcelable](http://developer.android.com/reference/android/os/Parcelable.html) since it will perform 10 times faster and use less resources.

However, in most cases, the _slowness_ of [Serializable](https://developer.android.com/reference/java/io/Serializable.html) won’t be noticeable. Feel free to use it  but  remember that serialization is an expensive operation so keep it to a minimum.

If you are trying to pass a list with thousands of serialized objects, it is possible that the whole process will take more than a second. It can make transitions or rotation from portrait to landscape feel very sluggish.

## References

- [Android: Difference between Parcelable and Serializable? - Stack Overflow](http://stackoverflow.com/questions/3323074/android-difference-between-parcelable-and-serializable)
- [Parcelable vs Serializable](http://www.developerphil.com/parcelable-vs-serializable/)

## Library

- [twitter/Serial](https://github.com/twitter/serial) Light-weight, fast framework for object serialization in Java, with Android support.