layout: post
title: "Android Security Algorithm"
description: ""
category: Android
tags: [android, security]
---

From: [Android应用安全开发之浅谈加密算法的坑-阿里聚安全](https://jaq.alibaba.com/community/art/show?articleid=209)

Android开发中，难免会遇到需要加解密一些数据内容存到本地文件、或者通过网络传输到其他服务器和设备的问题，但并不是使用了加密就绝对安全了，如果加密函数使用不正确，加密数据很容易受到逆向破解攻击。还有很多开发者没有意识到的加密算法的问题。

# 1 需要了解的基本概念

密码学的三大作用：加密（ Encryption）、认证（Authentication），鉴定（Identification）

- 加密：防止坏人获取你的数据。
- 认证：防止坏人修改了你的数据而你却并没有发现。
- 鉴权：防止坏人假冒你的身份。

明文、密文、密钥、对称加密算法、非对称加密算法，这些基本概念和加密算法原理就不展开叙述了。

# 2 Android SDK 提供的 API

## 2.1 Android 加密相关API结构

Android SDK 使用的 API 和 JAVA 提供的基本相似，由以下组成：

- Java Cryptography Architecture (JCA，java加密体系结构)
- Java Cryptography Extension (JCE，Java加密扩展包)
- Java Secure Sockets Extension(JSSE，Java安全套接字扩展包)
- Java Authentication and Authentication Service(JAAS，Java 鉴别与安全服务)



JCA 提供基本的加密框架，如证书、数字签名、消息摘要和密钥对产生器，对应的 Android API 中的以下几个包：

![](https://img.alicdn.com/L0/tfscom/TB1z7peMXXXXXcuaXXXXXXXXXXX.jpg)

JCE扩展了JCA，提供了各种加密算法、摘要算法、密钥管理等功能，对应的Android API中的以下几个包：

![](https://img.alicdn.com/L0/tfscom/TB1jMRjMXXXXXbaaXXXXXXXXXXX.JPG)

JSSE 提供了 SSL（基于安全套接层）的加密功能，使用HTTPS加密传输使用，对应的Android API主要是java.net.ssl包中。

JAAS 提供了在Java平台上进行用户身份鉴别的功能。对应的Android API主要在以下几个包：

![](https://img.alicdn.com/L0/tfscom/TB1GAhbMXXXXXcEapXXXXXXXXXX.JPG)

它们其实只是一组接口，实际的算法是可由不同的Provider提供，Android API默认的Provider主要是是Bouncy Castle和OpenSSL。
此外Android API还提供了android.security和android.security.keystore（API 23新增）来管理keychain和keystore。

## 2.2 Base64编码算法

Base64编码算法是一种用64个字符（ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/）来表示任意二进制数据的方法。在计算机网络发展的早期，由于“历史原因”，电子邮件不支持非ASCII码字符，如果要传送的电子邮件带有非ASCII码字符（诸如中文）或者图片，用户收到的电子邮件将会是一堆乱码，因此发明了Base64编码算法。至于为何会乱码？请大家自行Google。在加解密算法中，原始的数据和加密后的数据一般也是二进制数据，为了不传输出错，方便保存或者调试代码，一般需要对加密后的数据进行base64编码。

Android提供了Base64编码的工具类android.util.Base64，可以直接使用，不用自己去实现base64编码的算法了。

如：

![](https://img.alicdn.com/L0/tfscom/TB1gOc_LVXXXXaNapXXXXXXXXXX.JPG)

**开发者建议：**

base64只是一种编码方式，并不是一种加密算法，不要使用base64来加密数据。

## 2.3 随机数生成器

在Android加密算法中需要随机数时要使用SecureRandom来获取随机数。
如：

![](https://img.alicdn.com/L0/tfscom/TB1GkFDMXXXXXc6XXXXXXXXXXXX.JPG)

注意不要给SecureRandom设置种子。调用seeded constructor或者setSeed(byte[])是不安全的。SecureRandom()默认使用的是dev/urandom作为种子产生器，这个种子是不可预测的。

**开发者建议：**

1. 不要使用Random类来获取随机数。
2. 在使用SecureRandom时候，不要设置种子。使用以下函数设置种子都是有风险的：

![](https://img.alicdn.com/L0/tfscom/TB18rFCMXXXXXX7XpXXXXXXXXXX.JPG)

## 2.4 Hash算法

Hash算法是指任意长度的字符串输入，此算法能给出固定n比特的字符串输出，输出的字符串一般称为Hash值。

具有以下两个特点：

* 抗碰撞性：寻找两个不同输入得到相同的输出值在计算上是不可行的，需要大约 ![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAmCAYAAACcRCiyAAAFkklEQVRoQ9WaZchlVRSGn1Gwu7BARRwxsRDsTuzuRGwRseuH3YE5dmEndmAXGJigIoqI3YVioDyytuw5c+oe5jr3LBg+7j1777PfVe9a684Y+iEzA1MDXwF/FK7s99MBfwE/lTwvRTimB7hnAW4C5gD2A16IO6uMQ4FVgKmAyUIxtwNXAX/XYesD8HWBh4H3gBWAb4H547uxFeDuALYNL+itxS8G9gX8uz8wA/ByuL4A3w5FLA1skKE8HDizyuqjbvHZgOcALbsO8BhwArAHsA3wfAZscuBI4KT47h1gZeCbMvCjDjx38xWB34BHgSvjXxHTlMCdwIbxYEHggz4CvygSWnLzeYAbgU2AHyrc+Dpg53i2cOSGCZYO2+JTBNUYlwsBTwB/Ar53KcC4NHF9UgIid3Mtr6WVGWtA+1xXPyaobTHg4//T4tLLGcDcwHzAchGfWkq+HQfsFhcS9FrAu4UL5m6+EvB1S+pNFlehvu/3QYGbLLSSsTV78KJU8iLwfsRb1V3cu1WAPj0WmXgujBj8EXgVOCWe7RPKyM8runkb3DMBdwOrRfK7bdCsbjY8OEDPVdhsdfQKcA5wb8NttKSZWFk+3FDARwEmHhWomKHzS+Zuvh7wSBvUwBrA44A0t12EVenWshjfHLgm+LLufVpNXr2hZtFpwBHA08BLUWEdEOu9mBWZ5ywJfJSdI3UJ1qJFI1iqNsk0wEPhnZuVhM54+4vANw0g1r5a9sNIRJZ/CwDTF95uZtUzVFRRXHt/lJRSjElJpXqucj5wEPBM0M/P2QHJzS+JrN4E2ud7AWcDGwNPNW3Igc8ZWl4i4sTYlANtCoydaQPk1gVveDOKiy8KL7OsfCOUZWaVW9+KNWZ5w2RVwPcY/0lmjcLEomX9yPpNOLYALgAOjBzStP5fWkliieclro7KqGrzYcCxBfDbAzcXNvidnKucCByfPdd7Xg+lFGN4UDdfPGLa829pRBwLEnAtcA9gJ+SLv6w5QG4W0JbZmjJlXQ/sFBwtnX2erd8buBT4FFi28GwQN18UuAu4HDir4s4yjBQ6niTgurd173HAeS20ZlKTmpIYw9JXagV1V3lUUMb/7tla3+l3u2TZV2X+Gor3Hm3cXKq9L9hADyyTNaNGsKApBW4LZ5Iy+eSWqdKB7WHeIJjZU5noHi1sFlfyqsvPKsXGw3LS2D43XFRONwFaoZnN7bOrPM8zrCceBGSOomgAc5asIYskSv1vXbK4TbyHtaENN+titoNJ1PjJ2WcpzAvpyssAeeIzvlPjIFVJPb7XFlIvcthQl81VjqFmNaeCysSK0bpeGjXLS5mlFq+ybNX38q7JKYmFioWDYoekC64d8ScL5DFm4WIRY15RMbq9rphnc/tqObkocrUxrRe1ET0qVY4TBbj8Kw8rT0aIfJ8BtxLTMj5LFJa/eM9w5WeBK+KBDcu1EWoqq6z7sjawxrfRaRINYAK1lZ1AunZnxvSOcZr0VpVR6y7nu/O5mJ+tFfQOE91QpQtw48fY0WUdAZk5UzU21MtOzMO7AD8kSkNLTKsxS87eyaDA5w2akirssMqopBdKGBS4hYpc7yDBHrq3Mghwk5hTlQcAu7g2mXVkFdMWuJXdZcBrwEZ9TGZFC7QB7uTEhsPZmPxaOqceWdNWXKwJuE2G7aa8avv4Wd8AVt23Drgdm+WhYkJz4NBUkKTJzcjrpwq4RYoDO4d+zsYcLjaJ1Cbd2YOPvJQBF+ytAWLX7GfZOjBp3uX65CUjDb4I3CbAWZhzaVvD0l8hMkTW2otEa+mPdHZVzt5HXnLgdjMOARwAdJFTgaO7bJwUexJw/zrHtofuIk5tVm+aZXc5eFh7EnBnYjYftf99ouYS9tw7DOuSwzg3AdfN/X2sq3wH/NJ186TY9w+KiyU2g6h6XwAAAABJRU5ErkJggg==) 的时间去寻找到具有相同输出的两个输入字符串。
* 不可逆：不可从结果推导出它的初始状态。

抗碰撞性使Hash算法对原始输入的任意一点更改，都会导致产生不同的Hash值，因此Hash算法可以用来检验数据的完整性。我们经常见到在一些网站下载某个文件时，网站还提供了此文件的hash值，以供我们下载文件后检验文件是否被篡改。
不可逆的特性使Hash算法成为一种单向密码体制，只能加密不能解密，可以用来加密用户的登录密码等凭证。

**开发者建议：**

1. 建议使用SHA-256、SHA-3算法。

    如使用SHA-256算法对message字符串做哈希：

    ![](https://img.alicdn.com/L0/tfscom/TB1KddEMXXXXXcHXXXXXXXXXXXX.JPG)

2. 不建议使用MD2、MD4、MD5、SHA-1、RIPEMD算法来加密用户密码等敏感信息。这一类算法已经有很多破解办法，例如md5算法，网上有很多查询的字典库，给出md5值，可以查到加密前的数据。

    ![](https://img.alicdn.com/L0/tfscom/TB1of4tMXXXXXc2XFXXXXXXXXXX.JPG)

3. 不要使用哈希函数做为对称加密算法的签名。
4. 注意：当多个字符串串接后再做hash，要非常当心。

    如：字符串S，字符串T，串接做hash，记为 H (S||T)。但是有可能发生以下情况。如“builtin||securely” 和 “built||insecurely”的hash值是完全一样的。

    如何修改从而避免上述问题产生？

    改为H(length(S) || S || T)或者 H(H(S)||H(T))或者H(H(S)||T)。

    实际开发过程中经常会对url的各个参数，做词典排序，然后取参数名和值串接后加上某个SECRET字符串，计算出hash值，作为此URL的签名，

    如 foo=1, bar=2, baz=3 排序后为 bar=2, baz=3, foo=1，做 hash 的字符串为：SECRETbar2baz3foo1，在参数和值之间没有分隔符，则”foo=bar”和”foob=ar”的hash值是一样的，”foo=bar&fooble=baz”和”foo=barfooblebaz”一样，这样通过精心构造的恶意参数就有可能与正常参数的hash值一样，从而骗过服务器的签名校验。

## 2.5 消息认证算法

要确保加密的消息不是别人伪造的，需要提供一个消息认证码（MAC，Message authentication code）。

消息认证码是带密钥的hash函数，基于密钥和hash函数。

密钥双方事先约定，不能让第三方知道。

消息发送者使用MAC算法计算出消息的MAC值，追加到消息后面一起发送给接收者。
接收者收到消息后，用相同的MAC算法计算接收到消息MAC值，并与接收到的MAC值对比是否一样。

**开发者建议：**

建议使用HMAC-SHA256算法，避免使用CBC-MAC。

HMAC-SHA256例子如下：

![](https://img.alicdn.com/L0/tfscom/TB1.5tIMXXXXXXbXXXXXXXXXXXX.JPG)

## 2.6 对称加密算法

在对称加密算法中，数据发信方将明文（原始数据）和加密密钥一起经过特殊加密算法处理后，使其变成复杂的加密密文发送出去。收信方收到密文后，若想解读原文，则需要使用加密用过的密钥及相同算法的逆算法对密文进行解密，才能使其恢复成可读明文。在对称加密算法中，使用的密钥只有一个，发收信双方都使用这个密钥对数据进行加密和解密，这就要求解密方事先必须知道加密密钥。
该算法的缺点是，如果一旦密钥泄漏，那么加密的内容将都不可信了。

**开发者建议：**

1. 建议使用AES算法。
2. DES默认的是56位的加密密钥，已经不安全，不建议使用。
3. 注意加密模式不要使用ECB模式。ECB模式不安全，说明问题的经典的三张图片，如

    明文是：

    ![](../resources/images/anroid-security-normal.png)

    用ECB加密模式后：

    ![](../resources/images/android-security-ecb.png)

    用CBC加密模式后：

    ![](../resources/images/android-security-cbc.png)

    想更深入的了解关于对CBC加密模式的攻击，可参看：《SSL/TLS协议安全系列：CBC 模式的弱安全性介绍(一)》http://drops.wooyun.org/tips/6619

4. Android 提供的AES加密算法API默认使用的是ECB模式，所以要显式指定加密算法为：CBC或CFB模式，可带上PKCS5Padding填充。AES密钥长度最少是128位，推荐使用256位。

    ![](https://img.alicdn.com/L0/tfscom/TB1.RpBMXXXXXaoXpXXXXXXXXXX.JPG)

## 2.7 非对称加密

非对称加密算法需要两个密钥：公开密钥（publickey）和私有密钥（privatekey）。公开密钥与私有密钥是一对，如果用公开密钥对数据进行加密，只有用对应的私有密钥才能解密；如果用私有密钥对数据进行加密，那么只有用对应的公开密钥才能解密（这个过程可以做数字签名）。
非对称加密主要使用的是RSA算法。

**开发者建议：**
1、注意密钥长度不要低于512位，建议使用2048位的密钥长度。
使用RSA进行数字签名的算法，如：

![](https://img.alicdn.com/L0/tfscom/TB1zuRrMXXXXXaBXVXXXXXXXXXX.JPG)

2、使用RSA算法做加密，RSA加密算法应使用Cipher.getInstance(RSA/ECB/OAEPWithSHA256AndMGF1Padding)，否则会存在重放攻击的风险。
如：

![](https://img.alicdn.com/L0/tfscom/TB1A9pCMXXXXXXPXpXXXXXXXXXX.JPG)

**2.8 加密算法PBE**

PBE是一种基于口令的加密算法，其特点是使用口令代替了密钥，而口令由用户自己掌管，采用随机数杂凑多重加密等方法保证数据的安全性。
开发者建议：
使用基于口令的加密算法PBE时，生成密钥时要加盐，盐的取值最好来自SecureRandom，并指定迭代次数。
如：

![](https://img.alicdn.com/L0/tfscom/TB1nAhGMXXXXXaHXXXXXXXXXXXX.JPG)

（以上所有示例算法仅供参考）

# 3 总结

几条原则：

1. 不要自己设计加密算法和协议，使用业界标准的算法。
2. 对称加密算法不要使用ECB模式，不建议使用DES算法。
3. 要选择合适长度的密钥。
4. 要确保随机数生成器的种子具有足够的信息熵。
5. 不要使用没有消息认证的加密算法加密消息，无法防重放。
6. 当多个字符串拼接后做hash，要非常当心。
7. 当给算法加yan盐取值时不要太短，不要重复。
8. 使用初始化向量时IV时，IV为常量的CBC，CFB，GCM等和ECB一样可以重放，即采用上一个消息的最后一块密文作为下一个消息的IV，是不安全的。
9. 密钥应遵循的原则

  - 密钥不能为常量，应随机，定期更换，如果加密数据时使用的密钥为常量，则相同明文加密会得到相同的密文，很难防止字典攻击。
  - 开发同学要防范密钥硬编码的毛病。

  而在实际开发中，密钥如何保存始终是绕不过的坎？如果硬编码在代码中容易被逆向，如果放在设备的某个文件，也会被有经验的破解者逆向找到，在这里推荐阿里聚安全的安全组件服务，其中的安全加密功能提供了开发者密钥的安全管理与加密算法实现，保证密钥的安全性，实现安全的加解密操作。

参考：

1. 《Java加密与解密的艺术》
2. 《Android Application Secure Design/Secure Coding Guidebook》
3. <http://security.stackexchange.com/questions/2202/lessons-learned-and-misconceptions-regarding-encryption-and-cryptology>
4. [_http://netifera.com/research/flickr_api_signature_forgery.pdf_](http://netifera.com/research/flickr_api_signature_forgery.pdf)
5. [_http://nelenkov.blogspot.com/2012/04/using-password-based-encryption-on.html_](http://nelenkov.blogspot.com/2012/04/using-password-based-encryption-on.html)

**作者：阿里移动安全@伊樵，@舟海**

## Tutorial

- [Keys, Credentials and Storage on Android](https://code.tutsplus.com/tutorials/keys-credentials-and-storage-on-android--cms-30827)

