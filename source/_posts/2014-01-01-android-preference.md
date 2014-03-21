---
layout: post
title: "Android Preferences"
category: Android
tags: [android]
---
### 
##Preference

官方描述：Represents the basic Preference UI building block displayed by a PreferenceActivity in the form of a ListView. This class provides the View to be displayed in the activity and associates with a SharedPreferences to store/retrieve the preference data.

也就是说，Preferences为用于存储用户设置提供UI控件，而SharedPreferences用户持久化用户设置。

Preferences的使用方法如下：

	<?xml version="1.0" encoding="utf-8"?>
	<PreferenceScreen xmlns:android="http://schemas.android.com/apk/res/android">
	    <CheckBoxPreference
	        android:key="pref_sync"
	        android:title="@string/pref_sync"
	        android:summary="@string/pref_sync_summ"
	        android:defaultValue="true" />
	    <ListPreference
	        android:dependency="pref_sync"
	        android:key="pref_syncConnectionType"
	        android:title="@string/pref_syncConnectionType"
	        android:dialogTitle="@string/pref_syncConnectionType"
	        android:entries="@array/pref_syncConnectionTypes_entries"
	        android:entryValues="@array/pref_syncConnectionTypes_values"
	        android:defaultValue="@string/pref_syncConnectionTypes_default" />
	</PreferenceScreen>

<!--more-->

A Preference object is the building block for a single setting. Each Preference appears as an item in a list and provides the appropriate UI for users to modify the setting. Each Preference you add has a corresponding key-value pair that the system uses to save the setting in a default SharedPreferences file for your app's settings. When the user changes a setting, the system updates the corresponding value in the SharedPreferences file for you. **The only time you should directly interact with the associated SharedPreferences file is when you need to read the value in order to determine your app's behavior based on the user's setting.** The value saved in SharedPreferences for each setting can be one of the following data types:

- Boolean
- Float
- Int
- Long
- String
- String Set

You must save the XML file in the res/xml/ directory. Although you can name the file anything you want, it's traditionally named **preferences.xml**. You usually need only one file, because branches in the hierarchy (that open their own list of settings) are declared using nested instances of PreferenceScreen.

##常用的Preference

###二选一类Preference
CheckBoxPreference和SwitchPreference提供二选一组件，用来存储一个boolean类型的值。

- [CheckBoxPreference](http://developer.android.com/reference/android/preference/CheckBoxPreference.html)
- [SwitchPreference](http://developer.android.com/reference/android/preference/SwitchPreference.html)

###列表类Preference

ListPreference和MultiSelectListPrefe分别以Dialog的方式显示列表，ListPreference将存储一个String值，而MultiSelectListPrefe将存储一个String集合。也就是说ListPreference为列表单选，而MultiSelectListPrefe为列表多选。

- [ListPreference](http://developer.android.com/reference/android/preference/ListPreference.html) 
- [MultiSelectListPrefe](http://developer.android.com/reference/android/preference/MultiSelectListPreference.html) A Preference that displays a list of entries as a dialog. This preference will store a set of strings into the SharedPreferences. 

###编辑类Preference

EditTextPreference是以Dialog的方式用于输入文本。

- [EditTextPreference](http://developer.android.com/reference/android/preference/EditTextPreference.html)

###容器类Preference

PreferenceScreen和PreferenceCategory可以理解为Preference容器。一次只能显示一个PreferenceScreen，当你有些Preference要在单独的Screen中显示时，需要将这些Preference放置到单独的PreferenceScreen，这样的PreferenceScreen称为subscreen。PreferenceCategory为Preference组件提供分组特性。

**使用subscreen的效果：**

![subscreen](http://developer.android.com/images/ui/settings/settings-subscreen.png)

**使用subscreen的例子：**

	<PreferenceScreen  xmlns:android="http://schemas.android.com/apk/res/android">
	    <!-- opens a subscreen of settings -->
	    <PreferenceScreen
	        android:key="button_voicemail_category_key"
	        android:title="@string/voicemail"
	        android:persistent="false">
	        <ListPreference
	            android:key="button_voicemail_provider_key"
	            android:title="@string/voicemail_provider" ... />
	        <!-- opens another nested subscreen -->
	        <PreferenceScreen
	            android:key="button_voicemail_setting_key"
	            android:title="@string/voicemail_settings"
	            android:persistent="false">
	            ...
	        </PreferenceScreen>
	        <RingtonePreference
	            android:key="button_voicemail_ringtone_key"
	            android:title="@string/voicemail_ringtone_title"
	            android:ringtoneType="notification" ... />
	        ...
	    </PreferenceScreen>
	    ...
	</PreferenceScreen>

**使用PreferenceCategory的例子：**

	<PreferenceScreen xmlns:android="http://schemas.android.com/apk/res/android">
	    <PreferenceCategory 
	        android:title="@string/pref_sms_storage_title"
	        android:key="pref_key_storage_settings">
	        <CheckBoxPreference
	            android:key="pref_key_auto_delete"
	            android:summary="@string/pref_summary_auto_delete"
	            android:title="@string/pref_title_auto_delete"
	            android:defaultValue="false"... />
	        <Preference 
	            android:key="pref_key_sms_delete_limit"
	            android:dependency="pref_key_auto_delete"
	            android:summary="@string/pref_summary_delete_limit"
	            android:title="@string/pref_title_sms_delete"... />
	        <Preference 
	            android:key="pref_key_mms_delete_limit"
	            android:dependency="pref_key_auto_delete"
	            android:summary="@string/pref_summary_delete_limit"
	            android:title="@string/pref_title_mms_delete" ... />
	    </PreferenceCategory>
	    ...
	</PreferenceScreen>

- [PreferenceScreen](http://developer.android.com/reference/android/preference/PreferenceScreen.html)
- [PreferenceCategory](http://developer.android.com/reference/android/preference/PreferenceCategory.html)

###Intent类的Preference

In some cases, you might want a preference item to open a different activity instead of a settings screen, such as a web browser to view a web page. To invoke an Intent when the user selects a preference item, add an `<intent>` element as a child of the corresponding `<Preference>` element.

For example, here's how you can use a preference item to open a web page:

	<Preference android:title="@string/prefs_web_page" >
	    <intent android:action="android.intent.action.VIEW"
	            android:data="http://www.example.com" />
	</Preference>

###其他
RingtonePreference是以Dialog的方式用于铃声选择。

- [RingtonePreference](http://developer.android.com/reference/android/preference/RingtonePreference.html)


其他子类请参考[Preference](http://developer.android.com/reference/android/preference/Preference.html)。
当现有的Preference无法满足需求时，可以[自定义Preference](http://developer.android.com/guide/topics/ui/settings.html#Custom)。

##Preferences常用属性

- android:key
This attribute is required for preferences that persist a data value. It specifies the unique key (a string) the system uses when saving this setting's value in the SharedPreferences.
The only instances in which this attribute is not required is when the preference is a PreferenceCategory or PreferenceScreen, or the preference specifies an Intent to invoke (with an `<intent>` element) or a Fragment to display (with an android:fragment attribute).

- android:title
- android:defaultValue

##Preferences的持久化(SharedPreferences)

[SharedPreferences](http://developer.android.com/reference/android/content/SharedPreferences.html) 通常作为Preferences的持久化方式，它以键值对的方式，存储在xml文件中，这些xml文件位于`/data/data/<package name>/shared_prefs` 目录下。

Android中可通过以下三种方式获取SharedPreferences，分别对应着三种不同的作用范围。

- public SharedPreferences getPreferences(int mode)。该方法属于Activity，获取的是本Activity私有的Preferences，使用当前类不带包名的类名作为文件的名称，Activity最多对应一个这样的xml存储文件。如果一个Activity想访问另一个Activity的私有的Preferences，则可以

- public SharedPreferences getSharedPreferences(String name, int mode)。该方法也可以在Activity中调用，从Activity的父类ContextWrapper继承。整个应用程序共享这些SharedPreferences，可以有多个，以第一参数的name为文件名保存在系统中。在一个Activity中，可以通过指定不同的name来读写不同的xml持久化文件。

-  public static SharedPreferences getDefaultSharedPreferences(Context context)。 PreferenceManager的静态函数，用于保存PreferenceActivity中的设置。一个应用程序只有一个，名字为`<com.package.name>_preferences.xml`。从PreferenceManager源码可得出此结论：

	public static SharedPreferences getDefaultSharedPreferences(Context context) {
	    return context.getSharedPreferences(getDefaultSharedPreferencesName(context),
	        getDefaultSharedPreferencesMode());
	}

	private static String getDefaultSharedPreferencesName(Context context) {
	    return context.getPackageName() + "_preferences";
	}

	private static int getDefaultSharedPreferencesMode() {
	    return Context.MODE_PRIVATE;
	}

###应用程序间共享Preferences

如果访问其他应用中的Preference，前提条件是：该preference创建时指定了Context.MODE_WORLD_READABLE或者Context.MODE_WORLD_WRITEABLE权限。如：有个`<package name>`为com.ljq.action的应用使用下面语句创建了preference。

	getSharedPreferences("ljq", Context.MODE_WORLD_READABLE);

其他应用要访问上面应用的preference，首先需要创建上面应用的Context，然后通过Context访问其Preference ，访问Preference时会在应用所在包下的shared_prefs目录找到preference ：

	Context otherAppsContext = createPackageContext("com.ljq.action", Context.CONTEXT_IGNORE_SECURITY);
	SharedPreferences sharedPreferences = otherAppsContext.getSharedPreferences("ljq", Context.MODE_WORLD_READABLE);
	String name = sharedPreferences.getString("name", "");
	int age = sharedPreferences.getInt("age", 0);

如果不通过创建Context访问其他应用的preference，也可以以读取xml文件方式直接访问其他应用preference对应的xml文件，如：

	File xmlFile = new File("/data/data/<package name>/shared_prefs/itcast.xml");//<package name>应替换成应用的包名

参考 [使用SharedPreferences进行数据存储](http://www.cnblogs.com/linjiqin/archive/2011/05/26/2059133.html)

##在界面中显示Preferences

我们可以在Activity或者Fragment中显示Prefrences，并且当Preferences在界面上被用户改变时，更改将被自动持久化。在Android 3.0+我们使用PreferenceFragement来实现，在Android 3.0之前，我们使用PreferenceActivity来实现。不管是在PrererencesFragment中还是在PreferenceActivity，加载layout文件均不是使用setContent方法，而是使用addPreferencesFromResource加载一个xml资源文件。

定义PreferenceActivity方法为：

	public class SettingsActivity extends PreferenceActivity {
	    @Override
	    public void onCreate(Bundle savedInstanceState) {
	        super.onCreate(savedInstanceState);
	        addPreferencesFromResource(R.xml.preferences);
	    }
	}

定义PrererencesFragment方法为：

	public static class SettingsFragment extends PreferenceFragment {
	    @Override
	    public void onCreate(Bundle savedInstanceState) {
	        super.onCreate(savedInstanceState);

	        // Load the preferences from an XML resource
	        addPreferencesFromResource(R.xml.preferences);
	    }
	    ...
	}

You can then add this fragment to an Activity just as you would for any other Fragment. For example:

	public class SettingsActivity extends Activity {
	    @Override
	    protected void onCreate(Bundle savedInstanceState) {
	        super.onCreate(savedInstanceState);

	        // Display the fragment as the main content.
	        getFragmentManager().beginTransaction()
	                .replace(android.R.id.content, new SettingsFragment())
	                .commit();
	    }
	}

###设置默认值

为Preference设置默认值需要以下两步：

	

1. 在Preference的xml中通过android:defaultValue指定默认值，如：

	<!-- default value is a boolean -->
		<CheckBoxPreference android:defaultValue="true" 
			... />

		<!-- default value is a string -->
		<ListPreference
		    android:defaultValue="@string/pref_syncConnectionTypes_default"
		    ... />

2. 在该Actvity(或者其他Activty)的onCreate方法中调用以下方法：

	PreferenceManager.setDefaultValues(this, R.xml.advanced_preferences, false); 

第三个参数指定默认值是否可以设置多次。false表示默认值只被设置一次，多次调用该方法不会覆盖用户设置的值；true表示每次调用该API时，所有设置都将恢复为默认值。

###使用Preference Headers

通常，我们可能会这样设置设置界面，在第一个设置界面使用一个PreferenceScreen列出所有设置项，然后每个设置项对应一个subscreen。但在Android 3.0+，这种做法已经被淘汰，取而代之的是Preference Headers特性。这种方法的最大优势在于，在较大屏幕上点击一个设置项时，对应的设置界面将在第二个Panel上显示，也是就是使用two-pane展现方式。而在较小屏幕，则跟subscreen的展现效果类似。

![settings-headers-tablet](http://developer.android.com/images/ui/settings/settings-headers-tablet.png)

![settings-headers-handset	](http://developer.android.com/images/ui/settings/settings-headers-handset.png)

实现方式参考 [Using Preference Headers](http://developer.android.com/guide/topics/ui/settings.html#PreferenceHeaders)。

###读取默认值

默认情况下PreferenceFragment和PreferenceActivity都将存储到DefaultSharedReference中，可以在任意地方通过静态方法[PreferenceManager.getDefaultSharedPreferences()](http://developer.android.com/reference/android/preference/PreferenceManager.html#getDefaultSharedPreferences(android.content.Context)获取SharedReference实例，并读取其中的值。

使用方法如下：

	SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(this);
	String syncConnPref = sharedPref.getString(SettingsActivity.KEY_PREF_SYNC_CONN, "");

监听Preference的变化可参考 [Reading Preferences](http://developer.android.com/guide/topics/ui/settings.html#ReadingPrefs)

##其他

- [Android Tricks and Tips: Storing a POJO Into Shared Preferences | Engineering Serendipity](http://engineering.meetme.com/2014/03/android-tricks-and-tips-storing-a-pojo-into-shared-preferences/)
- [johnjohndoe/TypedPreferences](https://github.com/johnjohndoe/TypedPreferences)

##参考

- [Android的设置界面及Preference使用](http://blog.csdn.net/ichliebephone/article/details/5916320)
- [Setting Doc](http://developer.android.com/guide/topics/ui/settings.html)
- [Settings Design](http://developer.android.com/design/patterns/settings.html)
- [Hack4-自定义PreferenceActivity界面](http://blog.csdn.net/kost_/article/details/13510369)
- [《[50.Android.Hacks(2013.6)].Carlos.Sessa.文字版》](http://www.salttiger.com/50-android-hacks/)