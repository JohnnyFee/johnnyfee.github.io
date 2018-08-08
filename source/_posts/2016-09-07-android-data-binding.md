layout: post
title: "Android Data Binding"
description: ""
category: Android
tags: [android]
---

## Tutorial

- [Data Binding（数据绑定）用户指南](http://www.jianshu.com/p/b1df61a4df77)
- [Data Binding Guide (Android)](https://developer.android.com/tools/data-binding/guide.html)
- [LyndonChin/MasteringAndroidDataBinding: A comprehensive tutorial for Android Data Binding](https://github.com/LyndonChin/MasteringAndroidDataBinding)
- [Applying Data Binding for Views](https://guides.codepath.com/android/Applying-Data-Binding-for-Views)
- [Two-way Android data binding – Medium](https://medium.com/@fabioCollini/android-data-binding-f9f9d3afc761#.z2gx4qqdv)

## 介绍

这篇文章介绍了如何使用Data Binding库来写声明的layouts文件，并且用最少的代码来绑定你的app逻辑和layouts文件。

Data Binding库不仅灵活而且广泛兼容- 它是一个support库，因此你可以在所有的Android平台最低能到Android 2.1（API等级7+）上使用它。

**需求：**Android Plugin for Gradle **1.5.0-alpha1** 或 **更高版本**。

## 构建环境

要开始使用Data Binding，首先需要在Android SDK Manager的支持库里下载该库。

你的app要使用Data Binding，需要添加Data Binding到gradle构建文件里，如下：

```groovy
android {
    ....
    dataBinding {
        enabled = true
    }
}
```

Data Binding插件将会在你的项目内添加必需提供的以及编译配置依赖。

请确保您使用的是Android Studio的兼容版本。Android Studio的Data Binding插件需要Android Studio **1.3.0** 或 **更高版本**。

## Data Binding Layout文件

##### Data Binding表达式

Data Binding layout文件有点不同的是：起始根标签是**layout**，接下来一个**data**元素以及一个**view**的根元素。这个**view**元素就是你没有使用Data Binding的layout文件的根元素。举例说明如下：

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android">
   <data>
       <variable name="user" type="com.example.User"/>
   </data>
   <LinearLayout
       android:orientation="vertical"
       android:layout_width="match_parent"
       android:layout_height="match_parent">
       <TextView android:layout_width="wrap_content"
           android:layout_height="wrap_content"
           android:text="@{user.firstName}"/>
       <TextView android:layout_width="wrap_content"
           android:layout_height="wrap_content"
           android:text="@{user.lastName}"/>
   </LinearLayout>
</layout>
```

在**data**内描述了一个名为user的变量属性，使其可以在这个layout中使用：

```scala
<variable name="user" type="com.example.User"/>
```

在layout的属性表达式写作`@{}`，下面是一个TextView的text设置为user的firstName属性：

```xml
<TextView android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          android:text="@{user.firstName}"/>
```

##### Data对象

假设你有一个**user**的plain-old Java Object（POJO）：

```java
public class User {
   public final String firstName;
   public final String lastName;
   public User(String firstName, String lastName) {
       this.firstName = firstName;
       this.lastName = lastName;
   }
}
```

这个类型的对象拥有从不改变的数据。在app中它是常见的，可以读取一次并且之后从不改变。当然也可以使用JavaBeans对象：

```java
public class User {
   private final String firstName;
   private final String lastName;
   public User(String firstName, String lastName) {
       this.firstName = firstName;
       this.lastName = lastName;
   }
   public String getFirstName() {
       return this.firstName;
   }
   public String getLastName() {
       return this.lastName;
   }
}
```

从Data Binding的角度来看，这两个类是等价的。用于TextView中的`android:text`属性的表达式`@{user.firstName}`将访问前者POJO对象中的`firstName`和后者JavaBeans对象中的`getFirstName()`方法。Alternatively, it will also be resolved to `firstName()` if that method exists.

##### Binding数据

默认情况下，一个Binding类会基于layout文件的名称而产生，将其转换为Pascal case（译注：首字母大写的命名规范）并且添加“Binding”后缀。上述的layout文件是`activity_main.xml`，因此生成的类名是`ActivityMainBinding`。此类包含从layout属性到layout的Views中所有的bindings（例如`user`变量），并且它还知道如何给Binding表达式分配数值。创建bindings的最简单的方式是在inflating（译注：layout文件与Activity/Fragment的“链接”）期间如下：

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
   super.onCreate(savedInstanceState);
   ActivityMainBinding binding = DataBindingUtil.setContentView(this, R.layout.main_activity);
   User user = new User("Test", "User");
   binding.setUser(user);
}
```

就是这样，运行app后，你将会看到Test User。或者你可以通过如下获取View：

```
MainActivityBinding binding = MainActivityBinding.inflate(getLayoutInflater());
```

如果你在**ListView**或者**RecyclerView** adapter使用Data Binding时，你可能会使用：

```objectivec
ListItemBinding binding = ListItemBinding.inflate(layoutInflater, viewGroup,
false);
//or
ListItemBinding binding = DataBindingUtil.inflate(layoutInflater, R.layout.list_item, viewGroup, false);
```

##### 事件处理

数据绑定允许你编写表达式来处理view分派的事件。事件属性名字取决于监听器方法名字。例如[View.OnLongClickListener](https://developer.android.com/reference/android/view/View.OnLongClickListener.html)有[onLongClick()](https://developer.android.com/reference/android/view/View.OnLongClickListener.html#onLongClick(android.view.View))的方法，因此这个事件的属性是`android:onLongClick`。处理事件有两种方法：

* [Method References](https://developer.android.com/topic/libraries/data-binding/index.html#method_references)
* [Listener Bindings](https://developer.android.com/topic/libraries/data-binding/index.html#listener_bindings)

## 深入Layout文件

##### Import

零个或多个`import`元素可能在`data`元素中使用。这些只用在你的layout文件中添加引用，就像在Java中：

```scala
<data>
    <import type="android.view.View"/>
</data>
```

现在，View可以使用你的Binding表达式：

```perl
<TextView
   android:text="@{user.lastName}"
   android:layout_width="wrap_content"
   android:layout_height="wrap_content"
   android:visibility="@{user.isAdult ? View.VISIBLE : View.GONE}"/>
```

当类名有冲突时，其中一个类名可以重命名为`alias:`：

```scala
<import type="android.view.View"/>
<import type="com.example.real.estate.View"
        alias="Vista"/>
```

这样，在该layout文件中`Vista`对应`com.example.real.estate.View`，而`View`对应`android.view.View`。导入的类型可以在Variable和表达式中使用作为引用来使用：

```scala
<data>
    <import type="com.example.User"/>
    <import type="java.util.List"/>
    <variable name="user" type="User"/>
    <variable name="userList" type="List<User>"/>
 </data>
```

> 注意：Android Studio还没有处理**imports**，所以自动导入Variable在你的IDE不能使用。您的app仍会正常编译，你可以在您的Variable定义中使用完全符合规定的名称来解决该IDE问题。

```xml
<TextView
   android:text="@{((User)(user.connection)).lastName}"
   android:layout_width="wrap_content"
   android:layout_height="wrap_content"/>
```

导入的类型还可以在表达式中使用static属性和方法：

```scala
<data>
    <import type="com.example.MyStringUtils"/>
    <variable name="user" type="com.example.User"/>
</data>
…
<TextView
   android:text="@{MyStringUtils.capitalize(user.lastName)}"
   android:layout_width="wrap_content"
   android:layout_height="wrap_content"/>
```

就像在Java中，`java.lang。*`是自动导入的。

##### Variables

在`data`中可以使用任意数量的`variable`元素。每一个`variable`元素描述了一个用于layout文件中Binding表达式的属性。

```scala
<data>
    <import type="android.graphics.drawable.Drawable"/>
    <variable name="user"  type="com.example.User"/>
    <variable name="image" type="Drawable"/>
    <variable name="note"  type="String"/>
</data>
```

该`Variable`类型在编译时检查，因此如果一个Variable实现了[Observable](https://developer.android.com/tools/data-binding/guide.html#observable_objects)或[observable collection](https://developer.android.com/tools/data-binding/guide.html#observable_collections)，这应该反映在类型中。（译注：需要查找资料来理解）如果variable是一个没有实现Observable接口的基本类或者接口，Variables不会被observed！

当对于多种配置有不同的layout文件时（如，横向或纵向），Variables会被合并。这些layout文件之间必须不能有冲突的Variable定义。

产生的Binding类对于每一个描述的Variables都会有setter和getter。这些Variables会使用默认的Java值 - null（引用类型）、0（int）、false（boolean）等等，直到调用setter时。

##### 自定义Binding类名称

默认情况下，Binding类的命名是基于所述layout文件的名称，用大写开头，除去下划线（_）以及（_）后的第一个字母大写，然后添加“Binding”后缀。这个类将被放置在一个模块封装包里的`databinding`封装包下。例如，所述layout文件`contact_item.xml`将生成`ContactItemBinding`。如果模块包是`com.example.my.app`，那么它将被放置在`com.example.my.app.databinding`。

Binding类可通过调整`data`元素中的`class`属性来重命名或放置在不同的包中。例如：

```scala
<data class="ContactItem">
    ...
</data>
```

在模块封装包的databinding包中会生成名为`ContactItem`的Binding类。如果要想让该类生成在不同的包种，你需要添加前缀`.`，如下：

```scala
<data class=".ContactItem">
    ...
</data>
```

在这个情况下，`ContactItem`类直接在模块包种生成。或者你可以提供整个包名：

```scala
<data class="com.example.ContactItem">
    ...
</data>
```

#####Includes

通过使用**application namespace**以及在属性中的**Variable**名字从容器layout中传递Variables到一个被包含的layout：

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:bind="http://schemas.android.com/apk/res-auto">
   <data>
       <variable name="user" type="com.example.User"/>
   </data>
   <LinearLayout
       android:orientation="vertical"
       android:layout_width="match_parent"
       android:layout_height="match_parent">
       <include layout="@layout/name"
           bind:user="@{user}"/>
       <include layout="@layout/contact"
           bind:user="@{user}"/>
   </LinearLayout>
</layout>
```

注意：在`name.xml`以及`contact.xml`两个layout文件中必需要有`user` variable

#####表达式

* 常用表达式跟Java表达式很像，以下这些是一样的：
    * 数学 `+` `-` `/` `*` `%`
    * 字符串连接 `+`
    * 逻辑 `&&` `||`
    * 二进制 `&` `|` `^`
    * 一元运算 `+` `-` `!` `~`
    * 移位 `>>` `>>>` `<<`
    * 比较 `==` `>` `<` `>=` `<=`
    * `instanceof`
    * 分组 `()`
    * `null`
    * `Cast`
    * 方法调用
    * 数据访问 `[]`
    * 三元运算 `?:`

    * 示例：

        ```perl
        android:text="@{String.valueOf(index + 1)}"
        android:visibility="@{age < 13 ? View.GONE : View.VISIBLE}"
        android:transitionName='@{"image_" + id}'
        ```

* 缺少的操作：
    * `this`
    * `super`
    * `new`
    * 显式泛型调用

* Null合并操作
    * `??` - 左边的对象如果它不是null，选择左边的对象；或者如果它是null，选择右边的对象：

        ```perl
        android:text="@{user.displayName ?? user.lastName}"
        ```

* 函数上的写法如下：

    ```perl
    android:text="@{user.displayName != null ? user.displayName : user.lastName}"
    ```

* 属性引用
    第一个已经在前边提到了`a）Data Binding表达式`：JavaBean引用的简短格式。
    当一个表达式引用一个类的属性，它仍使用同样的格式对于字段、getters以及ObservableFields。

    ```perl
    android:text="@{user.lastName}"
    ```

* 避免 NullPointerException
    Data Binding代码生成时自动检查是否为nulls来避免出现null pointer exceptions错误。例如，在表达式`@{user.name}`中，如果`user`是null，`user.name`会赋予它的默认值（**null**）。如果你引用`user.age`，age是`int`类型，那么它的默认值是**0**。

* 集合
    常用的集合：arrays、lists、sparse lists以及maps，为了简便都可以使用`[]`来访问。

    ```scala
    <data>
      <import type="android.util.SparseArray"/>
      <import type="java.util.Map"/>
      <import type="java.util.List"/>
      <variable name="list" type="List<String>"/>
      <variable name="sparse" type="SparseArray<String>"/>
      <variable name="map" type="Map<String, String>"/>
      <variable name="index" type="int"/>
      <variable name="key" type="String"/>
    </data>
    …
    android:text="@{list[index]}"
    …
    android:text="@{sparse[index]}"
    …
    android:text="@{map[key]}"
    ```

* 字符串
    当使用单引号包含属性值时，在表达式中使用双引号很容易：

    ```swift
    android:text='@{map["firstName"]}'
    ```

    使用双引号来包含属性值也是可以的。字符串前后需要使用"`"：

    ```perl
    android:text="@{map[`firstName`]}"
    android:text="@{map["firstName"]}"
    ```

* Resources
    使用正常的表达式来访问resources也是可行的：

    ```perl
    android:padding="@{large? @dimen/largePadding : @dimen/smallPadding}"
    ```

    格式化字符串和复数可以通过提供参数来判断

    ```perl
    android:text="@{@string/nameFormat(firstName, lastName)}"
    android:text="@{@plurals/banana(bananaCount)}"
    ```

    当复数需要多个参数时，所有的参数都会通过：

    ```perl
    Have an orange
    Have %d oranges
    android:text="@{@plurals/orange(orangeCount, orangeCount)}"
    ```

    一些资源需要显式类型判断：

类型                | 正常引用      | 表达式引用
----------------- | --------- | ------------------
String[]          | @array    | @stringArray
int[]             | @array    | @intArray
TypedArray        | @array    | @typedArray
Animator          | @animator | @animator
StateListAnimator | @animator | @stateListAnimator
color int         | @color    | @color
ColorStateList    | @color    | @colorStateList

## Data 对象

任何Plain old Java object（PO​​JO）可用于Data Binding，但修改POJO不会导致UI更新。Data Binding的真正能力是当数据变化时，可以通知给你的Data对象。有三种不同的数据变化通知机制：`Observable`对象、`ObservableFields`以及`observable  collections`。

当这些可观察Data对象​​绑定到UI，Data对象属性的更改后，UI也将自动更新。

##### Observable 对象

实现`android.databinding.Observable`接口的类可以允许附加一个监听器到Bound对象以便监听对象上的所有属性的变化。

`Observable`接口有一个机制来添加和删除监听器，但通知与否由开发人员管理。为了使开发更容易，一个`BaseObservable`的基类为实现监听器注册机制而创建。Data实现类依然负责通知当属性改变时。这是通过指定一个`Bindable`注解给getter以及setter内通知来完成的。

```java
private static class User extends BaseObservable {
   private String firstName;
   private String lastName;
   @Bindable
   public String getFirstName() {
       return this.firstName;
   }
   @Bindable
   public String getFirstName() {
       return this.lastName;
   }
   public void setFirstName(String firstName) {
       this.firstName = firstName;
       notifyPropertyChanged(BR.firstName);
   }
   public void setLastName(String lastName) {
       this.lastName = lastName;
       notifyPropertyChanged(BR.lastName);
   }
}
```

在编译期间，`Bindable`注解在BR类文件中生成一个Entry。BR类文件会在模块包内生成。如果用于Data类的基类不能改变，`Observable`接口通过方便的`PropertyChangeRegistry`来实现用于储存和有效地通知监听器。

##### Observable 字段

一些小工作会涉及到创建Observable类，因此那些想要节省时间或者几乎没有几个属性的开发者可以使用`ObservableFields`。`ObservableFields`是自包含具有单个字段的observable对象。它有所有基本类型和一个是引用类型。要使用它需要在data对象中创建public final字段：

```php
private static class User {
   public final ObservableField<String> firstName =
       new ObservableField<>();
   public final ObservableField<String> lastName =
       new ObservableField<>();
   public final ObservableInt age = new ObservableInt();
}
```

就是这样，要访问该值，使用set和get方法：

```cs
user.firstName.set("Google");
int age = user.age.get();
```

##### Observable 集合

一些app使用更多的动态结构来保存数据。Observable集合允许键控访问这些data对象。`ObservableArrayMap`用于键是引用类型,如`String`。

```javascript
ObservableArrayMap<String, Object> user = new ObservableArrayMap<>();
user.put("firstName", "Google");
user.put("lastName", "Inc.");
user.put("age", 17);
```

在layout文件中，通过String键可以访问map：

```xml
<data>
    <import type="android.databinding.ObservableMap"/>
    <variable name="user" type="ObservableMap<String, Object>"/>
</data>
…
<TextView
   android:text='@{user["lastName"]}'
   android:layout_width="wrap_content"
   android:layout_height="wrap_content"/>
<TextView
   android:text='@{String.valueOf(1 + (Integer)user["age"])}'
   android:layout_width="wrap_content"
   android:layout_height="wrap_content"/>
```

`ObservableArrayList`用于键是整数：

```cpp
ObservableArrayList<Object> user = new ObservableArrayList<>();
user.add("Google");
user.add("Inc.");
user.add(17);
```

在layout文件中，通过索引可以访问list：

```xml
<data>
    <import type="android.databinding.ObservableList"/>
    <import type="com.example.my.app.Fields"/>
    <variable name="user" type="ObservableList<Object>"/>
</data>
…
<TextView
   android:text='@{user[Fields.LAST_NAME]}'
   android:layout_width="wrap_content"
   android:layout_height="wrap_content"/>
<TextView
   android:text='@{String.valueOf(1 + (Integer)user[Fields.AGE])}'
   android:layout_width="wrap_content"
   android:layout_height="wrap_content"/>
```

## Binding生成

Binding类的生成链接了layout中variables与Views。如前面所讨论的，Binding的名称和包名可以定制。所生成的Binding类都扩展了`android.databinding.ViewDataBinding`。

##### 创建

Binding应在inflation之后就立马创建，以确保View层次结构不在之前打扰layout中的binding到views上的表达式。有几个方法可以绑定到一个layout。最常见的是在Binding类上使用静态方法.`inflate`方法载入View的层次结构并且绑定到它只需这一步。还有一个更简单的版本，只需要`LayoutInflater`还有一个是采用`ViewGroup`：

```objectivec
MyLayoutBinding binding = MyLayoutBinding.inflate(layoutInflater);
MyLayoutBinding binding = MyLayoutBinding.inflate(LayoutInflater, viewGroup, false);
```

如果使用不同的机制载入layout，他可一分开绑定：

```perl
MyLayoutBinding binding = MyLayoutBinding.bind(viewRoot);
```

有时Binding不能提前知道，对于这种情况，可以使用`DataBindingUtil`类来创建Binding：

```php
ViewDataBinding binding = DataBindingUtil.inflate(LayoutInflater, layoutId,
    parent, attachToParent);
ViewDataBinding binding = DataBindingUtil.bindTo(viewRoot, layoutId);
```

##### 带ID的Views

在layout中对于每个带ID的View会生成一个public final字段。Binding在View层次结构上做单一的传递，提取带ID的Views。这种机制比起某些Views使用`findViewById`还要快。例如:

```xml
<layout xmlns:android="http://schemas.android.com/apk/res/android">
   <data>
       <variable name="user" type="com.example.User"/>
   </data>
   <LinearLayout
       android:orientation="vertical"
       android:layout_width="match_parent"
       android:layout_height="match_parent">
       <TextView android:layout_width="wrap_content"
           android:layout_height="wrap_content"
           android:text="@{user.firstName}"
   android:id="@+id/firstName"/>
       <TextView android:layout_width="wrap_content"
           android:layout_height="wrap_content"
           android:text="@{user.lastName}"
  android:id="@+id/lastName"/>
   </LinearLayout>
</layout>
```

它会生成如下的Binding类：

```php
public final TextView firstName;
public final TextView lastName;
```

IDs不像没有Data Bindings那样几乎没有必要，但是仍然会有一些实例需要从代码中访问Views。

##### Variables

每个Variable会有访问方法。

```scala
<data>
    <import type="android.graphics.drawable.Drawable"/>
    <variable name="user"  type="com.example.User"/>
    <variable name="image" type="Drawable"/>
    <variable name="note"  type="String"/>
</data>
```

它会在Binding中生成setters和getters：

```cs
public abstract com.example.User getUser();
public abstract void setUser(com.example.User user);
public abstract Drawable getImage();
public abstract void setImage(Drawable image);
public abstract String getNote();
public abstract void setNote(String note);
```

##### ViewStubs

ViewStubs跟正常的Views略有不同。他们开始时是不可见的，当他们要么设置为可见或被明确告知要载入时，它们通过载入另外一个layout取代了自己。

由于ViewStub基本上从View的层次结构上消失，在Binding对象的View也必须消失来允许被收集。因为Views是最后的，一个`ViewStubProxy`对象取带ViewStub，给开发者获得了ViewStub，当它存在以及还可以访问载入的View层次结构时当ViewStub已被载入时。

当载入另一个layout，为新的布局必需创建一个Binding。因此，`ViewStubProxy`必需监听`ViewStub`的`OnInflateListener`监听器并在那个时候建立Binding。因为只有一个可以存在，`ViewStubProxy`允许开发者在其上设置一个`OnInflateListener`它会在建立Binding后调用。

##### Binding进阶

* 动态Variables

有时，不知道具体的Binding类，例如，一个`RecyclerView`适配器对layouts任意操作并不知道具体的Binding类。它仍然必需在`onBindViewHolder`期间赋值给Binding。

在这个例子中，该`RecyclerView`绑定的所有layouts有一个“item”的Variable。该`BindingHolder`有一个`getBinding`方法返回`ViewDataBinding`。

```cs
public void onBindViewHolder(BindingHolder holder, int position) {
   final T item = mItems.get(position);
   holder.getBinding().setVariable(BR.item, item);
   holder.getBinding().executePendingBindings();
}
```

* 直接Binding

当一个variable或observable变化时，binding会在下一帧之前被计划要改变。有很多次，但是在Binding时必须立即执行。要强制执行，使用`executePendingBindings()`方法。

* 后台线程

只要它不是一个集合，你可以在后台线程中改变你的数据模型。在判断是否要避免任何并发问题时，Data Binding会对每个Varialbe/field本地化。

## 属性Setters

每当绑定值的变化，生成的Binding类必须调用setter方法​​。Data Binding框架有可以自定义赋值的方法。

##### 自动Setters

对于一个属性，Data Binding试图找到`setAttribute`方法。与该属性的namespace并不什么关系，仅仅与属性本身名称有关。

例如，有关TextView的`android:text`属性的表达式会寻找一个`setText(String)`的方法。如果表达式返回一个`int`，Data Binding会搜索的`setText(int)`方法。注意：要表达式返回正确的类型，如果需要的话使用`casting`。Data Binding仍会工作即使没有给定名称的属性存在。然后，您可以通过Data Binding轻松地为任何setter“创造”属性。例如，`DrawerLayout`没有任何属性，但大量的setters。您可以使用自动setters来使用其中的一个。

```css
<android.support.v4.widget.DrawerLayout
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    app:scrimColor="@{@color/scrim}"
    app:drawerListener="@{fragment.drawerListener}"/>
```

##### 重命名的Setters

一些有setters的属性按名称并不匹配。对于这些方法，属性可以通过`BindingMethods`注解相关联。这必须与一个包含`BindingMethod`注解的类相关联，每一个用于一个重命名的方法。例如，`android:tint`属性与`setImageTintList`相关联，而不与`setTint`相关。

```scala
@BindingMethods({
       @BindingMethod(type = "android.widget.ImageView",
                      attribute = "android:tint",
                      method = "setImageTintList"),
})
```

以上例子，开发者需要重命名setters是不太可能了，android架构属性已经实现了。

##### 自定义Setters

有些属性需要自定义绑定逻辑。例如，对于`android:paddingLeft`属性并没有相关setter。相反，`setPadding(left, top, right, bottom)`是存在在。一个带有`BindingAdapter`注解的静态绑定适配器方法允许开发者自定义setter如何对于一个属性的调用。

Android的属性已经创造了`BindingAdapters`。举例来说，对于`paddingLeft`：

```java
@BindingAdapter("android:paddingLeft")
public static void setPaddingLeft(View view, int padding) {
   view.setPadding(padding,
                   view.getPaddingTop(),
                   view.getPaddingRight(),
                   view.getPaddingBottom());
}
```

Binding适配器对其他定制类型非常有用。例如，自定义loader可以用来异步载入图像。

当有冲突时，开发人员创建的Binding适配器将覆盖Data Binding默认适配器。

您也可以创建可以接收多个参数的适配器。

```css
@BindingAdapter({"bind:imageUrl", "bind:error"})
public static void loadImage(ImageView view, String url, Drawable error) {
   Picasso.with(view.getContext()).load(url).error(error).into(view);
}
```

```xml
<ImageView app:imageUrl=“@{venue.imageUrl}”
app:error=“@{@drawable/venueError}”/>
```

如果对于一个`ImageView`**imageUrl**和**error**都被使用并且`imageUrl`是一个string类型以及**error**是一个drawable时，该适配器会被调用。

* 匹配的过程中自定义namespaces将被忽略。
* 你也可以为Android namespaces写适配器。

## 转换

##### 对象转换

当从Binding表达式返回一个对象，一个setter会从自动、重命名以及自定义的setters中选择。该对象将被转换为所选择的setter的参数类型。

这是为了方便那些使用`ObservableMaps`来保存数据。例如：

```xml
<TextView
   android:text='@{userMap["lastName"]}'
   android:layout_width="wrap_content"
   android:layout_height="wrap_content"/>
```

在`userMap`返回一个对象并且该对象将自动转换为`setText(CharSequence)`的参数类型。当有关参数类型可能混乱时，开发人员需要在表达式中转换。

##### 自定义转换

有时候转换应该是自动的在特定类型之间。例如，设置背景的时候：

```perl
<View
   android:background="@{isError ? @color/red : @color/white}"
   android:layout_width="wrap_content"
   android:layout_height="wrap_content"/>
```

这里，背景需要`Drawable`对象，但颜色是一个整数。不管何时有`Drawable`并且返回值是一个整数，那么整数类型会被转换为`ColorDrawable`。这个转换是通过使用带有`BindingConversion`注解的静态方法完成的：

```java
@BindingConversion
public static ColorDrawable convertColorToDrawable(int color) {
   return new ColorDrawable(color);
}
```

**注意：**转换仅仅发生在setter级别，因此它是不允许以下混合类型：

```perl
<View
   android:background="@{isError ? @drawable/error : @color/white}"
   android:layout_width="wrap_content"
   android:layout_height="wrap_content"/>
```

### Android Studio支持

Android Studio为数据绑定支持许多的代码编辑。例如，它支持以下功能：

* 语法高亮
* 标记表达式的语法错误
* XML代码补全
* 引用，包括[navigation](https://www.jetbrains.com/help/idea/2016.1/navigation-in-source-code.html?origin=old_help)(如导航到声明处)以及[快速文档查询](https://www.jetbrains.com/help/idea/2016.1/viewing-inline-documentation.html?origin=old_help)

> **注意**： 数组以及[通用类型](https://docs.oracle.com/javase/tutorial/java/generics/types.html)，比如说[Observable](https://developer.android.com/reference/android/databinding/Observable.html)类，可能会显示错误事实上并没有错误。

预览面板会显示数据绑定的默认值。在以下例子中，面板会在`TextView`中显示`PLACEHOLDER`默认值

```xml
<TextView android:layout_width="wrap_content"   android:layout_height="wrap_content"   android:text="@{user.firstName, default=PLACEHOLDER}"/>
```

如果你需要在设计阶段就显示默认值，你可以使用工具属性来代替默认表达数值，参考：[Designtime Layout Attributes](http://tools.android.com/tips/layout-designtime-attributes)

## More

- [Android官方数据绑定框架DataBinding(一)](http://blog.csdn.net/qibin0506/article/details/47393725)
- [Android官方数据绑定框架DataBinding(二)](http://blog.csdn.net/qibin0506/article/details/47720125)
- [konmik/nucleus: Nucleus is a simple Android library, which utilizes the Model-View-Presenter pattern to properly connect background tasks with visual parts of an application.](https://github.com/konmik/nucleus)

## Other MVVM Architecture

- [konmik/nucleus: Nucleus is a simple Android library, which utilizes the Model-View-Presenter pattern to properly connect background tasks with visual parts of an application.](https://github.com/konmik/nucleus)
- [mortar](https://github.com/square/mortar)

## Best Practice

- [从零开始的Android新项目8 - Data Binding高级篇](http://blog.zhaiyifan.cn/2016/07/06/android-new-project-from-0-p8/)
- [Data Binding Component详解 - 换肤什么的只是它的一个小应用！](http://blog.zhaiyifan.cn/2016/07/21/data-binding-component/)
- [从零开始的Android新项目7 - Data Binding入门篇](http://blog.zhaiyifan.cn/2016/06/16/android-new-project-from-0-p7/)

## FAQ

- [Android Data Binding: That <include> Thing – Google Developers – Medium](https://medium.com/google-developers/android-data-binding-that-include-thing-1c8791dd6038#.965zwocww)

## Library

- [Ilhasoft/data-binding-validator: Android fields validation library based on data binding adapters.](https://github.com/Ilhasoft/data-binding-validator)
- [Android Data Binding: 2-way Your Way – Google Developers – Medium](https://medium.com/google-developers/android-data-binding-2-way-your-way-ccac20f6313)

