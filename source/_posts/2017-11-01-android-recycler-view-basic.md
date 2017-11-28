---
layout: "post"
title: "Android RecyclerView – The Basics"
categories: Android
tags: [android, ui]
---

From [Android RecyclerView – The Basics – TheRubberDuckDev](https://therubberduckdev.wordpress.com/2017/10/09/android-recyclerview-the-basics/)

When it comes to displaying a lot of similar data on mobile, you usually rely on List or Grid structure. In Android you can implement this using ListView for Lists, GridView for Grids, or RecyclerView for both.

[RecyclerView](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.html) provides advanced set of features to enable complex animations, child view decorations and performance compared to ListView or GridView.

`RecyclerView` 小部件为 [v7 支持内容库](https://developer.android.com/tools/support-library/features.html#v7)的一部分。 如果要在您的项目中使用这些小部件，请将这些 [Gradle 依赖项](https://developer.android.com/studio/build/index.html#dependencies)添加至您的应用模块：

```
dependencies {  
    ...  
    compile 'com.android.support:recyclerview-v7:21.0.+'  }
```

## How it works

### Adapter and ViewHolder

RecyclerView uses the **[Adapter](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.Adapter.html)** class to bind the data that you want to display to the corresponding Views. Unlike ListView, **[ViewHolder](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.ViewHolder.html)** is mandatory in RecyclerView. ViewHolder stores some meta information about the position of the view in the RecyclerView. ViewHolder should be used to cache findViewById of child views.

### LayoutManager

The way in which the data should be rendered i.e., either List or Grid is specified using a **[LayoutManager](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.LayoutManager.html)**. LayoutManager does the actual layout of the child views. RecyclerView provides three basic LayoutManagers:

* **[LinearLayoutManager](https://developer.android.com/reference/android/support/v7/widget/LinearLayoutManager.html)** – for laying out children as a list either vertically or horizontally
* **[GridLayoutManager](https://developer.android.com/reference/android/support/v7/widget/GridLayoutManager.html)** – for laying out children as a grid either vertically or horizontally
* **[StaggeredGridLayoutManager](https://developer.android.com/reference/android/support/v7/widget/StaggeredGridLayoutManager.html)** – for laying out children in a staggered grid format, where each child may have different dimensions

All three layout managers support reverse ordering of child views.

### Recycler

There is a **[Recycler](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.Recycler.html)** class which is responsible to manage scrapped views and views that are recycled to be used in future. The LayoutManager won’t directly communicate with the Adapter. Instead it contacts the Recycler for any recycled views and if available renders it. If not, Recycler asks the Adapter for a new view and gives it back to LayoutManager.

## RecyclerView Adapter

The main functions that’s required to override are

* onCreateViewHolder
* onBindViewHolder
* getItemCount
* getItemViewType

### **onCreateViewHolder**

This method is called each time a new view is required to be inflated for displaying child. This is where we create and return a new instance of the ViewHolder for each child item.

Whenever there is no child view to be reused a new view is created using this method.

It takes two parameters: a `parent` ViewGroup and a `viewType` int.  
The `viewType` integer is used to identify the type of child view that needs to be displayed based on the data. Using this you can inflate the necessary view.

_**Remember:** Do not try to cache the inflated views yourselves as it may lead to inconsistent behaviours. The necessary caching is done internally by RecyclerView itself._

  __

Here is a simple example of onCreateViewHolder:

```
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
  __Here is an example of onBindViewHolder:

```
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

```
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

```
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

```
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

Here is how the UI looks like:

[![RecyclerView using view types](https://therubberduckdev.files.wordpress.com/2017/10/screenshot_20171009-003555.jpg?w=360&h=640 "RecyclerView list using view types")](https://therubberduckdev.files.wordpress.com/2017/10/screenshot_20171009-003555.jpg)

Here the bold titles are the section headers which is represented by type `HEADER_TYPE` and user views are represented by type `USER_TYPE`.

This is how you can create a simple RecyclerView.

In the next post, I will cover how to decorate items like adding dividers and how to animate the views when new view is added, or a view is removed or changed.

Source code [here](https://github.com/sjthn/RecyclerViewDemo).

If you have any feedback, please comment below.

## Tutorial

- [StanKocken/EfficientAdapter](https://github.com/StanKocken/EfficientAdapter) An efficient adapter to make the use of RecyclerView much easier for Android.