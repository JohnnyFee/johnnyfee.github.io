---
layout: post
title: "Android 设计框架"
description: ""
category: Android
tags: [android,framework]
---
### 
##概述

各框架简短介绍。

##RoboGuice

__Benefits of using RoboGuice:__

- No need to initialize views, if you want then Inject it using @InjectViews
- No need to initialize System service. If you need then Inject it using @Inject
- No need to initialize Drawable, string and other resources. If you require - then Inject it using @InjectResource
- All of these above practices helps you to slim down the code.
- Less code => Less chances of bugs/issues
- Less code => Android developer can save coding efforts and can focus fully on actual business logic of android app



###Usage of RoboGuice library

- Views Injection:: To initialize views, use @InjectViews, for example: - @InjectView(R.id.textView1) TextView textView1;
- Resources Injection: To initialize and get resources, use @InjectResources, - for example: @InjectResource(R.string.app_name) String name;
- System services Injection: To initialize and access system services, use - @Inject, for example: @Inject LayoutInflater inflater;
- POJO object Injection: To inject and initialize POJO object, use @Inject, for - example: @Inject Foo foo;

因为RoboGuice本身需要继承 RoboActivity or RoboFragment 来实现，当碰到类似 ActionBarSherlock 也需要继承来实现的库时，可以使用以下方法解决：我们可以自定义 RoboGuice 的基类，让基类继承自 ActionBarSherlock，最终使该基类具有两者的特性。该解决方案的项目为[rtyley/roboguice-sherlock](https://github.com/rtyley/roboguice-sherlock)。

###Example

    public class TestActivity extends Activity{
     
        TextView textView1;
        TextView textView2;
        ImageView imageView1;
        String name;
        Drawable icLauncher;
        LocationManager locManager;
        LayoutInflater inflater;
        NotificationManager notifyManager;
     
        @Override
        protected void onCreate(Bundle savedInstanceState) {
            // TODO Auto-generated method stub
            super.onCreate(savedInstanceState);
            setContentView(R.layout.layout_test);
     
            textView1 = (TextView) findViewById(R.id.textView1);
            textView2 = (TextView) findViewById(R.id.textView2);
            imageView1 = (ImageView) findViewById(R.id.imageView1);
            name = getString(R.string.app_name);
            icLauncher = getResources().getDrawable(R.id.ic_launcher);
            locManager = (LocationManager) getSystemService(Activity.LOCATION_SERVICE);
            inflater = (LayoutInflater) getSystemService(Activity.LAYOUT_INFLATER_SERVICE);
            notifyManager = (NotificationManager) getSystemService(Activity.NOTIFICATION_SERVICE);
     
            textView1.setText("Hello World! RoboGuice demo");
     
        }
    }

###参考

- [Be a lazy but a productive android developer - 1 => RoboGuiceTechnoTalkative](http://www.technotalkative.com/lazy-productive-android-developer-1)


