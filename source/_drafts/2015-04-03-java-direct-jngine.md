layout: post
title: "DirectJNgine 配置"
category : Java
tags : [java]
---

## 拷贝 jar

根据官方文档把需要的jar包拷贝到lib下，清单如下

- directjngine.2.0-alpha1
- gson-1.3
- commons-fileupload-1.2.1
- commons-io-1.4
- commons-lang-2.3
- log4j-1.2.15
- jargs-1.0
- rhino-1.6R7
- yuicompressor-2.4.2

## 配置web.xml

```xml
<servlet>
        <servlet-name>DjnServlet</servlet-name>
        <servlet-class>
                com.softwarementors.extjs.djn.servlet.DirectJNgineServlet</servlet-class>
        <init-param>
                <param-name>debug</param-name>
                <param-value>true</param-value>
        </init-param>
        <init-param>
                <param-name>providersUrl</param-name>
                <param-value>djn/directprovider</param-value>
        </init-param>

        <init-param>
                <param-name>apis</param-name>
                <param-value>test</param-value>
        </init-param>

        <init-param>
                <param-name>test.apiFile</param-name>
                <param-value>test/Api.js</param-value>
        </init-param>

        <init-param>
                <param-name>test.apiNamespace</param-name>
                <param-value>Ext.test</param-value>
        </init-param>

        <init-param>
                <param-name>test.classes</param-name>
                <param-value>test.ActionTest </param-value>
        </init-param>
        <!--more parameters -->
        <load-on-startup>1</load-on-startup>
        </servlet>
        <servlet-mapping>
                <servlet-name>DjnServlet</servlet-name>
                <url-pattern>/djn/directprovider/*</url-pattern>
        </servlet-mapping>
```

其中，黄色背景的需要根据具体的项目进行配置。具体含义可以参考这里。

- _apis：_可以理解把本模块应用程序起个别名，以便组织模块（个人理解）。本模块命名为test，如果有多个用逗号分隔即可；
- _%apiName%.apiFile：_本例中%apiName%=test（test.apiFile）即在apis中定义的别名，用于定义DirectJNgine自动生成的js代码存放位置。在本例存放到test/testApi.js中，这个文件服务器端会自动生成，注意这里的生成路径相对于webapp的根目录。%apiName%.apiFile后面的“.apiFile”为固定模式，我们只需要根据项目配置%apiName%即可；
- _%apiName%.aipNamespace：_用于定义自动生成js代码的命名空间。同上我们只需要替换%apiName%为test即可。
- _%apiName%.classes_：为本模块依赖的后端java类，它的值可以有多个类，用逗号分隔即可。本例中就是com.demo.ext.directjngine.
- `TestAction`，这样客户端js就可以调用TestAction中所有使用@DirectMethod注解的方法。

## 创建Direct方法

```
package test;

import com.softwarementors.extjs.djn.config.annotations.DirectMethod;

public class ActionTest {
    @DirectMethod
    public String doEcho(String data) {
        return data;
    }

    @DirectMethod
    public double multiply(String num) {
        try {
            double num_ = Double.parseDouble(num);
            return num_ * 0.8;
        } catch (NumberFormatException e) {
            throw e;
        }
    }
}
```

## 发布工程

启动服务器，在WebRoot/%apis%下会生成Api.js以及其压缩版本以及调试版本三个文件。

## 引用

在页面中引用Api.js文件即可调用direct方法，如

```js
Ext.Direct.addProvider(Ext.test.REMOTING_API);
ActionTest.doEcho('123', function(result, e) {
            var t = e.getTransaction();
            if (e.status) {
                Ext.Msg.alert('Direct OK!');
            } else {
                Ext.Msg.alert('Direct Faild');
            }
        });
```
