layout: post
title: Android Http Server
tags: [android, http server]
category: JavaScript
---

目前在 Android 上启用 HTTP Server 的开源库有两个：

- [koush/AndroidAsync](https://github.com/koush/AndroidAsync) 
- ~~[NanoHttpd/nanohttpd: Tiny, easily embeddable HTTP server in Java.](https://github.com/NanoHttpd/nanohttpd)~~

AndroidAsync 更易用写，封装更好，而且功能也比较多些。

One of the main difference between the two is that NanoHTTPD is using threads while AndroidAsync is based on NIO. I can’t tell you which one is better in terms of speed as I didn’t test this yet, but I will let you know as soon as I have more data on both.

## Get started

Let’s start coding
Before starting the exciting coding make sure you add the following code to your AndroidManifest.xml file:

```xml
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"></uses-permission>
<uses-permission android:name="android.permission.INTERNET"></uses-permission>
```

For this project I also used Gradle. So in order to add [AndroidAsync](https://github.com/koush/AndroidAsync) to your project add the following line to your build.gradle file:

```
compile 'com.koushikdutta.async:androidasync:2.+'
```

Now let’s modify MainActivity.java accordingly:

```java
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuItem;

import com.koushikdutta.async.AsyncServer;
import com.koushikdutta.async.http.server.AsyncHttpServer;
import com.koushikdutta.async.http.server.AsyncHttpServerRequest;
import com.koushikdutta.async.http.server.AsyncHttpServerResponse;
import com.koushikdutta.async.http.server.HttpServerRequestCallback;


public class MainActivity extends AppCompatActivity {

    private AsyncHttpServer server = new AsyncHttpServer();
    private AsyncServer mAsyncServer = new AsyncServer();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        if(id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onResume() {
        super.onResume();
        startServer();
    }

    private void startServer() {
        server.get("/", new HttpServerRequestCallback() {
            @Override
            public void onRequest(AsyncHttpServerRequest request, AsyncHttpServerResponse response) {
                response.send("Hello!!!");
            }
        });
        server.listen(mAsyncServer, 8080);
    }
}
```

Now start the application and after go to your device’s browser or to your emulator’s browser and type http://localhost:8080/ and you should see:
**Hello!!!**

I assume the code above is pretty self explanatory and it doesn’t need too much description. But what I did was to add a new AsyncHttpServer and handled a GET request to which we respond with the String “Hello!!!”. Also we made our server to listen on port 8080. You can choose any port you want.

I suggest you create a separate class that handles all the server methods. In this case I have added it in the MainActivity.java for convenience purposes.
In order to stop the server you have to call the following methods:

```
server.stop();
mAsyncServer.stop();
```

That’s about it. If you need further examples using [ NanoHTTPD ](https://github.com/NanoHttpd/nanohttpd) or [AndroidAsync](https://github.com/koush/AndroidAsync) please let me know in the comments bellow and will come with more in detail examples.
You can find the full project on GitHub [ here.](https://github.com/andreivisan/AndroidAsyncHttpServer)

## Processing request body with AndroidAsync

Another challenge of using it would be how to parse the request body of a request coming from a REST client.

Preparation
In order to test the code I recommend installing RESTClient for Firefox or any REST client for the browser that you use. This will help us send the request to our server that we have [ previously ](http://programminglife.io/android-http-server-with-androidasync/) created. 
Lets also send as a JSON request the example bellow:

```json
{"menu": {
  "id": "file",
  "value": "File",
  "popup": {
    "menuitem": [
      {"value": "New", "onclick": "CreateNewDoc()"},
      {"value": "Open", "onclick": "OpenDoc()"},
      {"value": "Close", "onclick": "CloseDoc()"}
    ]
  }
}}
```

__The Solution__
Let’s add the following piece of code to the startServer() method that we created:

```java
server.post("/testJson", new HttpServerRequestCallback() {
    @Override
    public void onRequest(AsyncHttpServerRequest asyncHttpServerRequest, 
                          AsyncHttpServerResponse asyncHttpServerResponse) {
        AsyncHttpRequestBody requestBody = asyncHttpServerRequest.getBody();
        try {
            asyncHttpServerResponse.code(200);
            asyncHttpServerResponse.send(
                new JSONObject(requestBody.toString()).getJSONObject("menu").getString("value"));
        } catch (JSONException e) {
            Log.e("MainActivity", e.getMessage(), e);
        }
    }
});
```

Now go open your browser, enter the REST client and type in: your.tablet.ip:8080/testJSON, with HTTP method POST and in the request body paste the JSON object above. If all works well you should see in the Response field the value **File**.

__The Explanation__

A question that may come up from the code above is why the JSON transformation? Well, JSON is a format that is very easy to work with and I find it very practical to work with JSON objects. On the other hand the method above is performant and makes sense only if you know for sure that you will receive JSON format on you request object. If not use the parsing methods in the  **AsyncHttpRequestBody**  class.

Please let me know if there is any other part of the AndroidAsync that you want me to cover in a future post.

You can also find the complete code [ here ](https://github.com/andreivisan/AndroidAsyncHttpServer).

## See also

- [基于AndroidAsync框架搭建android http server - 简书](https://www.jianshu.com/p/1c74b5116cd0)