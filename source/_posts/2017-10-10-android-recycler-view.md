---
layout: "post"
title: "Android RecyclerView – The Basics"
categories: Android
tags: [android, ui]
---

[`RecyclerView`](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.html) 小部件比 `[ListView](https://developer.android.com/reference/android/widget/ListView.html)` 更高级且更具灵活性。 此小部件是一个用于显示庞大数据集的容器，可通过保持有限数量的视图进行非常有效的滚动操作。
如果您有数据集合，其中的元素将因用户操作或网络事件而在运行时发生改变，请使用
`RecyclerView` 小部件。

RecyclerView 在功能上可以取代 List 和 GridView。

`RecyclerView` 类别将通过提供下列功能简化庞大数据集的显示与处理：

* 用于项目定位的布局管理器
* 用于通用项目操作（例如删除或添加项目）的默认动画

## How it works

![](https://developer.android.com/training/material/images/RecyclerView.png)

如果要使用 `RecyclerView` 小部件，您必须指定一个适配器和一个布局管理器。 如果要创建一个适配器，请扩展 `RecyclerView` 类别。实现的详情将取决于数据集的具体信息以及视图的类型。

### LayoutManager

LayoutManager does the actual layout of the child views. 

**布局管理器** 用来管理子视图的布局，确定 `RecyclerView`
内各项目视图的位置并决定何时重新使用用户已不可见的项目视图。如果要重新使用（或_重复使用_）一个视图，布局管理器可能会要求适配器以数据集中的另一个元素替换视图的内容。
以此方式重复使用视图将可避免创建不必要的视图或执行成本高昂的 `[findViewById()](https://developer.android.com/reference/android/app/Activity.html#findViewById(int))` 查找，从而改善性能。

`RecyclerView` 提供这些内置布局管理器：

* [`LinearLayoutManager`](https://developer.android.com/reference/android/support/v7/widget/LinearLayoutManager.html) 以垂直或水平滚动列表方式显示项目。
* [`GridLayoutManager`](https://developer.android.com/reference/android/support/v7/widget/GridLayoutManager.html) 在网格中显示项目。
* [`StaggeredGridLayoutManager`](https://developer.android.com/reference/android/support/v7/widget/StaggeredGridLayoutManager.html) 在分散对齐网格中显示项目。

如果要创建一个自定义布局管理器，请扩展 [`RecyclerView.LayoutManager`](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.LayoutManager.html) 类别。

### Adapter and ViewHolder

RecyclerView uses the **[Adapter](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.Adapter.html)** class to bind the data that you want to display to the corresponding Views. 

Unlike ListView, **[ViewHolder](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.ViewHolder.html)** is mandatory in RecyclerView. ViewHolder stores some meta information about the position of the view in the RecyclerView. ViewHolder should be used to cache findViewById of child views.

### Recycler

There is a **[Recycler](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.Recycler.html)** class which is responsible to manage scrapped views and views that are recycled to be used in future. The LayoutManager won’t directly communicate with the Adapter. Instead it contacts the Recycler for any recycled views and if available renders it. If not, Recycler asks the Adapter for a new view and gives it back to LayoutManager.

## How to use it

<img src="https://developer.android.com/design/material/images/list_mail.png" style="float: right;" width="300">

将 `RecyclerView` 添加至布局：

```
<!-- A RecyclerView with some commonly used attributes -->
<android.support.v7.widget.RecyclerView
    android:id="@+id/my_recycler_view"
    android:scrollbars="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent"/>
```

将 RecyclerView 小部件添加至您的布局后，立即获取对象图柄并将其连接至布局管理器，同时附加一个适配器以便显示数据：

```java
public class MyActivity extends Activity {  
    private RecyclerView mRecyclerView;  
    private RecyclerView.Adapter mAdapter;  
    private RecyclerView.LayoutManager mLayoutManager;  

    @Override  
    protected void onCreate(Bundle savedInstanceState) {  
        super.onCreate(savedInstanceState);  
        setContentView(R.layout.my_activity);  
        mRecyclerView = (RecyclerView) findViewById(R.id.my_recycler_view);  

        // use this setting to improve performance if you know that changes  
        // in content do not change the layout size of the RecyclerView  
        mRecyclerView.setHasFixedSize(true);  

        // use a linear layout manager  
        mLayoutManager = new LinearLayoutManager(this);  
        mRecyclerView.setLayoutManager(mLayoutManager);  

        // specify an adapter (see also next example)  
        mAdapter = new MyAdapter(myDataset);  
        mRecyclerView.setAdapter(mAdapter);  
    }  
    ...
}
```

适配器可让您存取数据集中的项目，为项目创建视图，并且在原始项目不再可见时以新数据项目替换视图的某些内容。 下列代码示例将展示一个简单的实现，目标为一个包含使用 `[TextView](https://developer.android.com/reference/android/widget/TextView.html)` 小部件显示的字符串阵列的数据集：

```java
public class MyAdapter extends RecyclerView.Adapter<MyAdapter.ViewHolder> {
    private String[] mDataset;

    // Provide a reference to the views for each data item
    // Complex data items may need more than one view per item, and
    // you provide access to all the views for a data item in a view holder
    public static class ViewHolder extends RecyclerView.ViewHolder {
        // each data item is just a string in this case
        public TextView mTextView;
        public ViewHolder(TextView v) {
            super(v);
            mTextView = v;
        }
    }

    // Provide a suitable constructor (depends on the kind of dataset)
    public MyAdapter(String[] myDataset) {
        mDataset = myDataset;
    }

    // Create new views (invoked by the layout manager)
    @Override
    public MyAdapter.ViewHolder onCreateViewHolder(ViewGroup parent,
                                                   int viewType) {
        // create a new view
        View v = LayoutInflater.from(parent.getContext())
                               .inflate(R.layout.my_text_view, parent, false);
        // set the view's size, margins, paddings and layout parameters
        ...
        ViewHolder vh = new ViewHolder(v);
        return vh;
    }

    // Replace the contents of a view (invoked by the layout manager)
    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        // - get element from your dataset at this position
        // - replace the contents of the view with that element
        holder.mTextView.setText(mDataset[position]);

    }

    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        return mDataset.length;
    }
}
```

## RecyclerView Adapter

Source code [here](https://github.com/sjthn/RecyclerViewDemo).

<img src="https://therubberduckdev.files.wordpress.com/2017/10/screenshot_20171009-003555.jpg" style="float: right;">

The main functions that’s required to override are

* `onCreateViewHolder`
* `onBindViewHolder`
* `getItemCount`
* `getItemViewType`

### onCreateViewHolder

This method is called each time a new view is required to be inflated for displaying child. This is where we create and return a new instance of the ViewHolder for each child item.

Whenever there is no child view to be reused a new view is created using this method.

It takes two parameters: a `parent` ViewGroup and a `viewType` int.  
The `viewType` integer is used to identify the type of child view that needs to be displayed based on the data. Using this you can inflate the necessary view.

_**Remember:** Do not try to cache the inflated views yourselves as it may lead to inconsistent behaviours. The necessary caching is done internally by RecyclerView itself._

Here is a simple example of onCreateViewHolder:

```java
@Override  
public UserViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {  
    View view = LayoutInflater.from(parent.getContext())  
        .inflate(R.layout.layout_user_list_item, parent, false);  
    return new UserViewHolder(view);  
}  

```

In this example, a layout is inflated using the LayoutInflater and a new ViewHolder is returned. This View is used as a child view and the ViewHolder is used to identify the views position within the RecyclerView and refer the views inside the child view.

### onBindViewHolder

This is where the data at a given position is displayed on the child view. It takes two parameters: a `ViewHolder` and a `position`. By referring the view items in the ViewHolder you can show relevant information for the given `position` in RecyclerView. The ViewHolder is used to refer the view items and the position can be used to get the data from say, an ArrayList.

**_Remember:_** _For example, when using an `onClickListener` in this method you might make the position parameter final. Do not do this. Since RecyclerView will not call this method again if the position of the data in the ArrayList changes. So to handle this condition, you can use the `getAdapterPosition()` method of the ViewHolder inside onClickListener._  

```java
@Override  
public void onBindViewHolder(UserViewHolder holder, int position) {  
    holder.username.setText(usersList.get(position).getName());  
    Glide.with(holder.itemView).load(usersList.get(position).getImageUrl()).into(holder.userAvatar);  
}  
```

In the code, `userList` is an ArrayList. Using the `position` param, the name of the user at that position in the ArrayList is retrieved. Now using the ViewHolder, the TextView is referred and the name is set to the it.

### getItemCount

This method is used to return the total number of data items that needs to be displayed in the Adapter. If it returns zero, no view items will be rendered. If any positive number is returned, then the adapter should handle that many data items.

### getItemViewType

Sometimes you want to display different types of views based on different data at each position in RecyclerView. This is when getItemViewType is used.

Based on the position parameter, you can return a integer representing the type of view that needs to be displayed at the position.

```java
@Override  
publicint getItemViewType(int position) {  
    int type;  
    if (!TextUtils.isEmpty(usersList.get(position).getName())) {  
        type = USER_TYPE;  
    } else {  
        type = HEADER_TYPE;  
    }  
    return type;  
}  

```

Here the type is represented by a constant integers. Now the type of view to be displayed is returned based on the data. Next change the onCreateViewHolder to return the relevant view based on the view type.

```java
@Override  
publicRecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {  
    View view;  
    switch (viewType) {  
    case USER_TYPE:  
        view = LayoutInflater.from(parent.getContext())  
                .inflate(R.layout.layout_user_list_item, parent, false);  
        return new UserViewHolder(view);  
    case HEADER_TYPE:  
        view = LayoutInflater.from(parent.getContext())  
                .inflate(R.layout.layout_user_list_section_header, parent, false);
        return new SectionHeaderViewHolder(view);  
    default:  
        view = LayoutInflater.from(parent.getContext())  
                .inflate(R.layout.layout_user_list_item, parent, false);  
        return new UserViewHolder(view);  
    }  
}  

```

After that in onBindViewHolder bind the correct data to the correct view type using the relevant ViewHolder.

```java
@Override  
public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {  
    int itemViewType = getItemViewType(position);  
    if (itemViewType == USER_TYPE) {  
        ((UserViewHolder) holder).username.setText(usersList.get(position).getName());  
        Glide.with(holder.itemView).load(usersList.get(position).getImageUrl()).into(((UserViewHolder) holder).userAvatar);  
    } else {  
        ((SectionHeaderViewHolder) holder).sectionTitle.setText(usersList.get(position).getType());  
    }  
}

```

Here the bold titles are the section headers which is represented by type `HEADER_TYPE` and user views are represented by type `USER_TYPE`.

This is how you can create a simple RecyclerView.

In the next post, I will cover how to decorate items like adding dividers and how to animate the views when new view is added, or a view is removed or changed.

## Library

- [Zuluft/AutoAdapter](https://github.com/Zuluft/AutoAdapter) This Repository simplifies working with RecyclerView Adapter

## Reference

- [Android RecyclerView – The Basics – TheRubberDuckDev](https://therubberduckdev.wordpress.com/2017/10/09/android-recyclerview-the-basics/)

