---
layout: "post"
title: "Android RecyclerView – Expandable Headers"
categories: Android
tags: [android, ui]
---

From [Android RecyclerView – Expandable Headers – TheRubberDuckDev](https://therubberduckdev.wordpress.com/2017/10/17/android-recyclerview-expandable-headers/)

RecyclerView provides several optimisations over ListView. But it doesn’t provide an important component which ListView provides out-of-the-box. And that’s the ExpandableListView. Many of us still require such a kind of design where headers can be expanded/collapsed to show/hide child views. In this post, we will look at an idea of how to implement this functionality using RecyclerView.

If you are not familiar with RecyclerView, you can go through my previous blog posts [here](https://therubberduckdev.wordpress.com/2017/10/09/android-recyclerview-the-basics/) and [here](https://therubberduckdev.wordpress.com/2017/10/12/android-recyclerview-itemdecoration-and-itemanimator/).

Let’s consider a list of employees who are categorised according to their designation. The designations and employees are shown using different view types. The designation view act as header and employee views act as children.

I have two Lists containing employees denoted by `userList` and their designations denoted by `userTypeList` respectively.

<pre>
List usersList = usersData.getUsersList();
List userTypeList = usersData.getUserTypeList();
</pre>

We have to change our Adapter class to handle the expand/collapse functionality. To keep track of the expand/collapse state I am using a SparseIntArray in the adapter where `0` represents collapsed state and `1` expanded state.

<pre>
private SparseIntArray headerExpandTracker;
</pre>

To keep track of the view type and its position in the respective Lists I am using a `SparseArray` of `ViewType` where `ViewType` holds the data index and type as shown below.

<pre>
public class ViewType {

    private int dataIndex;
    private int type;

    public ViewType(int dataIndex, int type) {
        this.dataIndex = dataIndex;
        this.type = type;
    }

    public int getDataIndex() {
        return dataIndex;
    }

    public int getType() {
        return type;
    }
}
</pre>

Now we will change the `getItemCount()` method to get the number of items to display. Initially all the items will be in collapsed state. So only headers will be visible.

Here is the getItemCount():

<pre>
@Override
public int getItemCount() {
    int count = 0;
    if (userTypeList != null && usersList != null) {
        viewTypes.clear();
        int collapsedCount = 0;
        for (int i = 0; i < userTypeList.size(); i++) {
            viewTypes.put(count, new ViewType(i, HEADER_TYPE));
            count += 1;
            String userType = userTypeList.get(i);
            int childCount = getChildCount(userType);
            if (headerExpandTracker.get(i) != 0) {
                // Expanded
                for (int j = 0; j < childCount; j++) {
                    viewTypes.put(count, new ViewType(count - (i + 1) + collapsedCount, USER_TYPE));
                    count += 1;
                }
            } else {
                // Collapsed
                collapsedCount += childCount;
            }
        }
    }
    return count;
}
</pre>

In the code, I am looping through the `userTypeList` adding each of the header view type to the `viewTypes` SparseArray. Then we check whether the header is expanded or not using this code:

<pre>
if (headerExpandTracker.get(i) != 0) {
    // Expanded State
} else {
    // Collapsed State
}
</pre>

If it is collapsed we are adding the count of the collapsed child views to the `collapsedCount`. The number of children for a given user type will be calculated and returned in the `getChildCount` method.

If it is expanded we are adding each child view type to the `viewTypes` array. Note this line:

<pre>
viewTypes.put(count, 

<mark>new ViewType(count - (i + 1) + collapsedCount, USER_TYPE)</mark>);
</pre>

Here the first parameter of the `ViewType` class represents the `index` of the data in the userList. We subtract the headers added from the count using `(i + 1)` and adding the count of any collapsed views before this user view, using `collapsedCount`.

Next in the `getItemViewType()` we return the correct view type based on the position.

<pre>
@Override
public int getItemViewType(int position) {
    if (viewTypes.get(position).getType() == HEADER_TYPE) {
        return HEADER_TYPE;
    } else {
        return USER_TYPE;
    }
}
</pre>

Then in the `onCreateViewHolder()`, based on the `viewType` the correct view is inflated and the ViewHolder is returned.

After that, based on the view type, `onBindViewHolder` binds the necessary data to the necessary view.

<pre>
@Override
public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
    int itemViewType = getItemViewType(position);
    ViewType viewType = viewTypes.get(position);
    if (itemViewType == USER_TYPE) {
        bindUserViewHolder(holder, viewType);
    } else {
        bindHeaderViewHolder(holder, position, viewType);
    }
}
</pre>

<pre>
private void bindHeaderViewHolder(RecyclerView.ViewHolder holder, int position, ViewType viewType) {
    int dataIndex = viewType.getDataIndex();
    SectionHeaderViewHolder headerViewHolder = (SectionHeaderViewHolder) holder;
    headerViewHolder.sectionTitle.setText(userTypeList.get(dataIndex));
    if (isExpanded(position)) {
        headerViewHolder.sectionTitle
                .setCompoundDrawablesWithIntrinsicBounds(null, null, headerViewHolder.arrowUp, null);
    } else {
        headerViewHolder.sectionTitle
                .setCompoundDrawablesWithIntrinsicBounds(null, null, headerViewHolder.arrowDown, null);
    }
}

private void bindUserViewHolder(RecyclerView.ViewHolder holder, ViewType viewType) {
    int dataIndex = viewType.getDataIndex();
    ((UserViewHolder) holder).username.setText(usersList.get(dataIndex).getName());
    Glide.with(holder.itemView).load(usersList.get(dataIndex).getImageUrl()).into(((UserViewHolder) holder).userAvatar);
}
</pre>

Note this `int dataIndex = viewType.getDataIndex();` in the code above. Using this dataIndex we will get the correct data from `userTypeList` and `userList` respectively.

The expand/collapse action is triggered from the Header ViewHolder’s onClickListener. In the click listener, an interface function is called which is implemented by the Adapter. This function takes the adapter position as parameter.

<pre>
@Override
public void onHeaderClick(int position) {
    ViewType viewType = viewTypes.get(position);
    int dataIndex = viewType.getDataIndex();
    String userType = userTypeList.get(dataIndex);
    int childCount = getChildCount(userType);
    if (headerExpandTracker.get(dataIndex) == 0) {
        // Collapsed. Now expand it
        headerExpandTracker.put(dataIndex, 1);
        notifyItemRangeInserted(position + 1, childCount);
    } else {
        // Expanded. Now collapse it
        headerExpandTracker.put(dataIndex, 0);
        notifyItemRangeRemoved(position + 1, childCount);
    }
}
</pre>

Here the `headerExpandTracker` is checked to see if header is expanded or collapsed. If collapsed, it has to be expanded. The `headerExpandTracker` value is changed and the adapter is notified about the insertion of the child views using `notifyItemRangeInserted` passing the position of the first child view and the total count. Similarly if it’s in expanded state, the `headerExpandTracker` value is changed and `notifyItemRangeRemoved()` is called.

After implementing all, this is how the RecyclerView looks like:

![android-expandable-recyclerview](https://therubberduckdev.files.wordpress.com/2017/10/android-expandable-recyclerview.gif?w=576&h=1024)

You can build upon this example for more complex and feature rich Expandable RecyclerView.

Full source code can be found [here](https://github.com/sjthn/RecyclerViewDemo/tree/expandable-recyclerview).

In the next posts I will cover more use-cases with RecyclerView.

Thanks for reading. If you have any feedback comment below.