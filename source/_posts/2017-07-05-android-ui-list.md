---
layout: "post"
title: "Android UI List"
categories: Android
tags: [android, ui, list]
---

See [Android开发：ListView、AdapterView、RecyclerView全面解析 - 简书](http://www.jianshu.com/p/4e8e4fd13cf7)

## AdapterView简介

AdapterView本身是一个抽象类，AdapterView及其子类的继承关系如下图：  

![](http://upload-images.jianshu.io/upload_images/944365-a6f76b5bc3010aa0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  

AdapterView及其子类的继承关系.png

**特征：**

* AdapterView继承自ViewGroup，本质是个容器
* AdapterView可以包含多个“列表项”，并将这多个列表项以合适的形式展示
* AdapterView显示的列表项内容由**Adapter**提供
* 它派生的子类在用法上也基本相似，只是在显示上有一定区别，因此把他们也归为一类。
* 由AdapterView直接派生的三个类：

> AbsListView、AbsSpinner、AdapterViewAnimator

都是抽象类，所以我们用的最多的也就是图中第四行及以下的子类。

## ListView 简介

即列表视图，是Android开发中一种常用的视图组件

ListView的作用:

1.  将所要展示的数据集合起来
2.  以列表的形式展示到用户界面上

### 工作原理

* ListView、GridView、Spinner等AdapterView都只是容器，主要用于装载要显示的数据和显示数据，而Apdater负责提供容器的内容，即AdapterView负责采用合适的方式显示Adapter提供的内容。

* 在运行时，当需要显示数据时，ListView会针对数据项向Adapter取出数据，从而加载到界面上。

    > 试想下这么一个场景：如果把所有数据集合的信息都加载到View上，如果ListView要为每个数据都创建一个视图，那么会占用非常多的内存

从上面可知，ListView不会为每一个数据创建一个视图，为了节省空间和时间，Android采用了一个叫**Recycler的组件**。

工作原理：当屏幕需要显示x个item时，那么ListView只会创建x+1个视图，当第一个item离开屏幕时，此item的view就会被拿来重用（用于显示下一个item（即第x+1个）的内容）。

### 工作原理实例

假如屏幕只能显示7个item，那么ListView只会创建（7+1）个item的视图。当第1个item离开屏幕时，此item的view就会被拿来重用（用于显示第8个item的内容）。原理如下图显示  

![](http://upload-images.jianshu.io/upload_images/944365-bae0adba10cc7f46.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  

### ListView的使用

**1. 生成方式**

生成列表视图（ListView）的方式主要有两种：

* 直接用ListView进行创建
* 让Activity继承ListActivity

**2. xml文件配置信息**

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"   
    xmlns:tools="http://schemas.android.com/tools"   
    android:layout_width="match_parent"   
    android:layout_height="match_parent"   
    android:background="#FFE1FF"   
    android:orientation="vertical" >   
    <ListView   
        android:id="@+id/listView1"   
        android:layout_width="match_parent"   
        android:layout_height="match_parent" />   
</LinearLayout>
```

AbsListView的常用属性和相关方法：

属性                        |               说明                |                                                                                                                               备注
------------------------- |:-------------------------------:| --------------------------------------------------------------------------------------------------------------------------------:
android:choiceMode        |      列表的选择行为，默认：none没有选择行为      |            选择方式： none：不显示任何选中项  singleChoice：允许单选multipleChoice：允许多选multipleChoiceModal：允许多选 （把Activity里面adapter的第二个参数改成支持选择的布局）
android:drawSelectorOnTop |                                 |                                                                                                       如果该属性设置为true，选中的列表项将会显示在上面
android:listSelector      |          为点击到的Item设置图片          |                                                                                                       如果该属性设置为true，选中的列表项将会显示在上面
android：fastScrollEnabled |           设置是否允许快速滚动            |                                                                                        如果该属性设置为true，将会显示滚动图标，并允许用户拖动该滚动图标进行快速滚动。
android：listSelector      |      指定被选中的列表项上绘制的Drawable      |                                                                                                                                 
android：scrollingCache    |            滚动时是否使用缓存            |                                                                                                            如果设置为true，则在滚动时将会使用缓存
android：stackFromBottom   |         设置是否从底端开始排列列表项          |                                                                                                                                 
android：transcriptMode    | 指定列表添加新的选项的时候，是否自动滑动到底部，显示新的选项。 | disabled：取消transcriptMode模式；默认的normal：当接受到数据集合改变的通知，并且仅仅当最后一个选项已经显示在屏幕的时候，自动滑动到底部。 alwaysScroll：无论当前列表显示什么选项，列表将会自动滑动到底部显示最新的选项。

Listview提供的XML属性：

XML属性                        |                   说明                   |                      备注
---------------------------- |:--------------------------------------:| -----------------------:
android:divider              | 设置List列表项的分隔条（可用颜色分割，也可用图片（Drawable）分割 | 不设置列表之间的分割线，可设置属性为@null
android:dividerHeight        |               用于设置分隔条的高度               |                        
android:background属性         |                设置列表的背景                 |                        
android：entries              |  指定一个数组资源，Android将根据该数组资源来生成ListView   |                        
android：footerDividerEnabled |    如果设置成false，则不在footer View之前绘制分隔条    |                        
andorid：headerDividerEnabled |    如果设置成false，则不再header View之前绘制分隔条   

## Adapter

作用： 作为View和数据之间的桥梁

> 由于ListView和所要展现的数据是分开的，不直接接触，所以，**Adapter的作用是把数据映射到ListView上，作为中介的作用**，如下图

![](http://upload-images.jianshu.io/upload_images/944365-f7a1cd052d1a9c56.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  

Adapter本身是一个接口，Adapter接口及其子类的继承关系如下图：

![](http://upload-images.jianshu.io/upload_images/944365-078700715f8460d7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  

Adapter接口派生了ListAdapter和SpinnerAdapter两个子接口。其中ListAdapter为AbsAdapter提供列表项，而SpinnerAdapter为AbsSpinner提供列表项。

ArrayAdapter、SimpleAdapter、SimpleCursorAdapter、BaseAdapter都是常用的实现适配器的类。

1.  ArrayAdapter：简单、易用的Adapter，用于将数组绑定为列表项的数据源，支持泛型操作
2.  SimpleAdapter：功能强大的Adapter，用于将XML中控件绑定为列表项的数据源
3.  SimpleCursorAdapter：与SimpleAdapter类似，用于绑定游标（直接从数据数取出数据）作为列表项的数据源
4.  BaseAdapter：可自定义ListView，通用用于被扩展。扩展BaseAdapter可以对各个列表项进行最大程度的定制。

### ArrayAdapter

简单、易用的Adapter，用于将数组绑定为列表项的数据源，支持泛型操作

**1. 在xml文件布局上实现ListView**

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"    xmlns:tools="http://schemas.android.com/tools"    
android:layout_width="match_parent"    
android:layout_height="match_parent"    
android:paddingBottom="@dimen/activity_vertical_margin"    
android:paddingLeft="@dimen/activity_horizontal_margin"    
android:paddingRight="@dimen/activity_horizontal_margin"    
android:paddingTop="@dimen/activity_vertical_margin"    
tools:context="com.example.carson_ho.adapte_demo.MainActivity">   
 <ListView        
  android:id="@+id/list_item"        
  android:layout_width="match_parent"        
  android:layout_height="match_parent"        
  android:divider="#f00"        
  android:dividerHeight="1sp"        
  android:headerDividersEnabled="false">        
</ListView>
</RelativeLayout>
```

**2. 在MainActivity上定义一个链表，将所要展示的数据以存放在里面**  
**3. 构造ArrayAdapter对象，设置适配器**  
**4. 将LsitView绑定到ArrayAdapter上**  

如下图：

```java
public class MainActivity extends AppCompatActivity {     

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

       ListView listView = (ListView) findViewById(R.id.list_item);
        //定义一个链表用于存放要显示的数据
        final List<String> adapterData = new ArrayList<String>();
        //存放要显示的数据
        for (int i = 0; i < 20; i++) {
            adapterData.add("ListItem" + i);
        }
        //创建ArrayAdapter对象adapter并设置适配器
         ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_list_item_1, adapterData);
        //将LsitView绑定到ArrayAdapter上
        listView.setAdapter(adapter);
    }
}
```

创建ArrayAdapter对象要指定三个参数:

* context：代表方位Android应用的接口
* textViewRseourceld：资源ID，代表一个TextView
* 数组：列表项展示的数据

**5.  在xml文件布局添加资源文件TextView,该TextView组件将作列表项的组件**

```xml
<?xml version="1.0" encoding="utf-8"?>

<TextView xmlns:android="http://schemas.android.com/apk/res/android"    
android:layout_width="match_parent"    
android:layout_height="wrap_content">
android:textSize="24sp"
</TextView>
```

### 最终效果图

![](http://upload-images.jianshu.io/upload_images/944365-3b88a8f79cd9b51a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  

**缺点**  ArrayAdapter较为简单，易用，但每个列表项只能是TextView，功能实现的局限性非常大。

### SimpleAdapter

功能强大的Adapter，用于将XML中控件绑定作为列表项的数据源

可对每个列表项进行定制（自定义布局），能满足大多数开发的需求场景，灵活性较大

**1. 在xml文件布局上实现ListView**

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"    
xmlns:tools="http://schemas.android.com/tools"    
android:layout_width="match_parent"    
android:layout_height="match_parent"    
android:paddingBottom="@dimen/activity_vertical_margin"    
android:paddingLeft="@dimen/activity_horizontal_margin"    
android:paddingRight="@dimen/activity_horizontal_margin"    
android:paddingTop="@dimen/activity_vertical_margin"    
tools:context="com.example.carson_ho.adapte_demo.MainActivity">   
 <ListView        
  android:id="@+id/list_item"        
  android:layout_width="match_parent"        
  android:layout_height="match_parent"        
  android:divider="#f00"        
  android:dividerHeight="1sp"        
  android:headerDividersEnabled="false">        
</ListView>
</RelativeLayout>
```

**2. 根据实际需求定制列表项：实现ListView每行的xml布局（即item布局）**

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"    
android:layout_width="match_parent"    
android:layout_height="match_parent">        

<TextView            
    android:id="@+id/name"            
    android:layout_width="wrap_content"            
    android:layout_height="wrap_content"            
    android:textSize="17sp"            
    android:paddingLeft="14dp"/>        
    <TextView            
    android:id="@+id/address"            
    android:layout_below="@id/name"            
    android:textSize="17sp"            
    android:layout_width="wrap_content"            
    android:layout_height="wrap_content" />        
    <TextView            
    android:id="@+id/lowerest_wholesale"            
    android:layout_toRightOf="@id/address"            
    android:textSize="17sp"            
    android:layout_width="wrap_content"            
    android:layout_height="wrap_content" />        
    <TextView            
    android:id="@+id/price"            
    android:textSize="17sp"            
    android:layout_below="@id/address"            
    android:layout_width="wrap_content"            
    android:layout_height="wrap_content" />        
    <ImageView            
    android:id="@+id/picture"            
    android:layout_alignParentRight="true"            
    android:layout_width="115dp"            
    android:layout_height="86dp"         />        
</RelativeLayout>
```

**3. 定义一个HashMap构成的列表以键值对的方式存放数据**  
**4. 构造SimpleAdapter对象，设置适配器**  
**5. 将LsitView绑定到SimpleAdapter上**

```java
public class MainActivity extends AppCompatActivity {
//定义数组以填充数据
    private String[] name=new String[]{"威龙注塑机","霸龙注塑机","恐龙注塑机"};
    private String[] address =new String[]{"广东","北京","黑龙江"};    
    private int[] lowerest_wholesale =new int[]{11, 22, 33};    
    private int[] price =new int[]{11,22,33};
    private int[] picture =new int[]{
            R.drawable.home_selected,
            R.drawable.home_selected, 
            R.drawable.home_selected   };    

    @Override    
    protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);   
             setContentView(R.layout.activity_main);

    //定义一个HashMap构成的列表以键值对的方式存放数据
    ArrayList<HashMap<String, Object>> listItem = new ArrayList<HashMap<String,Object>>();        
    //循环填充数据   
    for(int i=0;i<name.length;i++)        { 
        HashMap<String,Object> map = new HashMap<String,Object>();            
        map.put("name", name[i]);            
        map.put("address", address[i]);            
        map.put("lowerest_wholesale", lowerest_wholesale[i]);            
        map.put("price", price[i]);            
        map.put("picture", picture[i]);            
        listItem.add(map);  
     }        

    //构造SimpleAdapter对象，设置适配器        
    SimpleAdapter mSimpleAdapter = new SimpleAdapter(this, 
        listItem,//需要绑定的数据
        R.layout.item_imformation,//每一行的布局                
        new String[] {"name","address", "lowerest_wholesale","price","picture"},
        //数组中的数据源的键对应到定义布局的View中                
        new int[] {R.id.name,R.id.address,R.id.lowerest_wholesale,R.id.price,R.id.picture});

    ListView list= (ListView) findViewById(R.id.list_item);        
    //为ListView绑定适配器        
    list.setAdapter(mSimpleAdapter);   
    }
}
```

结果显示

![](http://upload-images.jianshu.io/upload_images/944365-22f55d183eaa50ad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  

### BaseAdapter

可自定义ListView，通用用于被扩展。扩展BaseAdapter可以对各个列表项进行最大程度的定制

1.  定义主xml布局
2.  根据需要定义ListView每行所实现的xml布局
3.  定义一个Adapter类继承BaseAdapter，重写里面的方法。
4.  定义一个HashMap构成的列表，将数据以键值对的方式存放在里面。
5.  构造Adapter对象，设置适配器。
6.  将LsitView绑定到Adapter上。

**先定义一个Adapter类继承BaseAdapter，并重写里面的方法**

使用BaseAdapter必须写一个类继承它，同时BaseAdapter是一个抽象类，继承它必须实现它的方法。

```aspectj
class MyAdapter extends BaseAdapter {
    private LayoutInflater mInflater;//得到一个LayoutInfalter对象用来导入布局

 //构造函数
    public MyAdapter(Context context,ArrayList<HashMap<String, Object>> listItem) {
        this.mInflater = LayoutInflater.from(context);
        this.listItem = listItem;
    }//声明构造函数

    @Override
    public int getCount() {
        return listItem.size();
    }//这个方法返回了在适配器中所代表的数据集合的条目数

    @Override
    public Object getItem(int position) {
        return listItem.get(position);
    }//这个方法返回了数据集合中与指定索引position对应的数据项

    @Override
    public long getItemId(int position) {
        return position;
    }//这个方法返回了在列表中与指定索引对应的行id

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        return null;
    }//这个方法返回了指定索引对应的数据项的视图，还没写完
}
```

**这里主要讲一下BaseAdapter里必须要重写的4个方法**

* BaseAdapter的灵活性就在于它要重写很多方法，其中最重要的即为getView()方法。
* 我们结合上述重写的4个方法了解下**系统绘制ListView的原理：**

    > 1.  当系统开始绘制ListView的时候，首先调用getCount()方法。得到它的返回值，即ListView的长度。
    > 2.  系统调用getView()方法，根据这个长度逐一绘制ListView的每一行。（如果让getCount()返回1，那么只显示一行）。
    > 3.  getItem()和getItemId()则在需要处理和取得Adapter中的数据时调用。
    > 4.  那么getView()如何使用呢？如果有10000行数据  
    >     ，就绘制10000次？这肯定会极大的消耗资源，导致ListView滑动非常的慢，那应该怎么做呢？可以使用BaseAdapter进行优化ListView的显示。  
    >     以下将使用4种重写方法来说明getView()的使用

#### 重写getView()的第一种方法

```java
@Override
public View getView(int position, View convertView, ViewGroup parent) {
    View item = mInflater.inflate(R.layout.item,null);
    ImageView img = (ImageView)item.findViewById(R.id.ItemImage);
    TextView title = (TextView)item.findViewById(R.id.ItemTitle);
    TextView test = (TextView)item.findViewById(R.id.ItemText);
    Button btn = (Button) item.findViewById(R.id.ItemBottom);
    img.setImageResource((Integer) listItem.get(position).get("ItemImage"));
    title.setText((String) listItem.get(position).get("ItemTitle"));
    test.setText((String) listItem.get(position).get("ItemText"));

    return item;
}
```

这个方法返回了指定索引对应的数据项的视图


这种方法每次getView()都要findViewById和重新绘制一个View，当列表项数据量很大的时候会严重影响性能，造成下拉很慢，所以数据量大的时候不推荐用这种方式。

#### 重写getView()的第二种方法

使用convertView作为缓存进行优化，getView()返回值是一个View，把它作为输入参数并放到getView()输入参数里，形成反馈。这样就形成了Adapter的itemView重用机制，减少了重绘View的次数。

```java
@Override
    public View getView(int position, View convertView, ViewGroup parent) {
        if(convertView == null)
        {
            convertView = mInflater.inflate(R.layout.item, null);
        }//检测有没有可以重用的View，没有就重新绘制
        ImageView img = (ImageView)convertView.findViewById(R.id.ItemImage);
        TextView title = (TextView)convertView.findViewById(R.id.ItemTitle);
        TextView test = (TextView)convertView.findViewById(R.id.ItemText);
        Button btn = (Button) convertView.findViewById(R.id.ItemBottom);
        img.setImageResource((Integer) listItem.get(position).get("ItemImage"));
        title.setText((String) listItem.get(position).get("ItemTitle"));
        test.setText((String) listItem.get(position).get("ItemText"));

        return convertView;
    }//这个方法返回了指定索引对应的数据项的视图
```

> 这种方法和第一种相比减少了重绘View的次数，但是还是每一次都要findViewById

#### 重写getView()第三种方法  

通过convertView+ViewHolder来实现缓存进而进行优化

convertView缓存了View，ViewHolder相当于更加具体的缓存：View里的组件，即把View和View的组件一并进行缓存，那么重用View的时候就不用再重绘View和View的组件（findViewById）

```java
static class ViewHolder
    {
        public ImageView img;
        public TextView title;
        public TextView text;
        public Button btn;
    }//声明一个外部静态类
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ViewHolder holder ;
        if(convertView == null)
        {
            holder = new ViewHolder();
            convertView = mInflater.inflate(R.layout.item, null);
            holder.img = (ImageView)convertView.findViewById(R.id.ItemImage);
            holder.title = (TextView)convertView.findViewById(R.id.ItemTitle);
            holder.text = (TextView)convertView.findViewById(R.id.ItemText);
            holder.btn = (Button) convertView.findViewById(R.id.ItemBottom);
            convertView.setTag(holder);
        }
        else {
            holder = (ViewHolder)convertView.getTag();

        }
        holder.img.setImageResource((Integer) listItem.get(position).get("ItemImage"));
        holder.title.setText((String) listItem.get(position).get("ItemTitle"));
        holder.text.setText((String) listItem.get(position).get("ItemText"));

        return convertView;
    }//这个方法返回了指定索引对应的数据项的视图
```

返回了指定索引对应的数据项的视图这种方法就既减少了重绘View，又减少了findViewById的次数，所以这种方法是最能节省资源的，所以非常推荐大家使用通过convertView+ViewHolder来重写getView()

## RecyclerView介绍

RecyclerView是Google推出用来**代替ListView组件的**，是一个强大的滑动组件。

RecyclerView强制使用了ViewHolder，直接把viewholder的实现封装起来，用户只要实现自己的viewholder就可以了，该组件会自动帮你回收复用每一个item。

### 工作原理

当屏幕需要显示x个item时，那么ListView只会创建x+1个视图，当第一个item离开屏幕时，此item的view就会被拿来重用（用于显示下一个item（即第x+1个）的内容）。

假如屏幕只能显示7个item，那么ListView只会创建（7+1）个item的视图。当第1个item离开屏幕时，此item的view就会被拿来重用（用于显示第8个item的内容）。

原理如下图显示

![](http://upload-images.jianshu.io/upload_images/944365-bae0adba10cc7f46.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  

### RecyclerView的重要概念介绍

* RecyclerView.Adapter  
    和ListView一样，RecyclerView一样需要适配器，而且这个适配器强制要求了我们必须要用Viewholder，让性能得到优化，而且getView方法不需自己写，我们只需要写好Viewholder，View的复用已经封装好了。

* LayoutManager  
    管理布局，设置为LinearLayoutManager、GridLayoutManager、StaggeredGridLayoutManager可以轻易地实现ListView，GridView以及流式布局的列表效果。它还可以管理滚动和循环利用。

* ItemAnimator  
    这个类可以实现增删动画，而且不想设置的话它的默认效果已经很好了。

### 优缺点

**优点 ：**  

有了ListView、GridView为什么还需要RecyclerView这样的控件呢？优点在于：

* item复用性高。把ViewHolder的实现封装起来，规范了ViewHolder，把item的view写入ViewHolder中，可以通过复用ViewHolder来实现view的复用
* 灵活、可定制化高、可拓展性高。整体上看RecyclerView架构，提供了一种插拔式的体验：高度的解耦，异常的灵活：

    * 控制其显示的方式-通过布局管理器LayoutManager
    * 控制Item间的间隔（可绘制）-通过ItemDecoration
    * 控制Item增删的动画- 通过ItemAnimator

```java
mRecyclerView = findView(R.id.id_recyclerview);
//设置布局管理器
mRecyclerView.setLayoutManager(layout);
//设置adapter
mRecyclerView.setAdapter(adapter)
//设置Item增加、移除动画
mRecyclerView.setItemAnimator(new DefaultItemAnimator());
//添加分割线
mRecyclerView.addItemDecoration(new DividerItemDecoration(
                getActivity(), DividerItemDecoration.HORIZONTAL_LIST));
```

* 问：相比较于ListView，RecyclerView基本需要上面一系列步骤进行设置，而ListView可能只需要去设置一个adapter就能正常使用。那么为什么会添加这么多的步骤呢？
* 答：从名字上看RecyclerView，即回收循环视图，也就是说RecyclerView只管回收与复用View，其他的你可以自己去设置，可以看出其高度的解耦，给予你充分的定制自由

**缺点：**  
RecyclerView实现控制点击、长按事件较为麻烦，需要自己写

### 使用实例

使用RecyclerView的步骤：

1.  定义主xml布局
2.  根据需要定义RecyclerView每行所实现的xml布局
3.  定义一个Adapter类继承RecyclerView.Adapter，重写里面的方法。
4.  定义一个HashMap构成的列表，将数据以键值对的方式存放在里面。
5.  构造Adapter对象，设置适配器。
6.  将RecyclerView绑定到Adapter上。

### Demo的源码下载

https://github.com/Carson-Ho/RecyclerView  
（个人推荐先fork下来再对着下面的分析看，效果会更好哦！）