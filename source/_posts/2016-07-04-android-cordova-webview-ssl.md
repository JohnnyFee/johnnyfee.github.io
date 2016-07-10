layout: post
title: "Android Corodova SSL HTTPS"
description: ""
category: Cordova
tags: [cordova, ssl, https, webview]
---

## Plugins

[wymsee/cordova-HTTP: Cordova / Phonegap plugin for communicating with HTTP servers. Allows for SSL pinning!](https://github.com/wymsee/cordova-HTTP)

See also [Secure HTTP](http://plugins.telerik.com/cordova/plugin/secure-http#TipCordovaCLI)

Answer for "Ajax GET request over HTTPS": [javascript - Ajax GET request over HTTPS - Stack Overflow](http://stackoverflow.com/questions/15375908/ajax-get-request-over-https)

- [How To: Use mitmproxy to read and modify HTTPS traffic - Philipp's Tech Blog](https://blog.heckel.xyz/2013/07/01/how-to-use-mitmproxy-to-read-and-modify-https-traffic-of-your-phone/)

## Tools

- [Shining Light Productions - Win32 OpenSSL](http://slproweb.com/products/Win32OpenSSL.html)
- [SSL Converter - Convert SSL Certificates to different formats](https://www.sslshopper.com/ssl-converter.html)

## DER vs. CRT vs. CER vs. PEM

[怎样区别电子证书格式 DER vs. CRT vs. CER vs. PEM » 阿蒙的礼物](http://amon.org/how-to-know-ca-famat-der-vs-crt-vs-cer-vs-pem.html)

**证书与编码**

本质上，X.509证书是一个数字文档，这个文档根据RFC 5280来编码并/或签发。

实际上，“X.509证书”经常被用来指代IETF的PKIX（Public Key Infrastructure）证书和X.509 v3 证书标准中的CRL（Certificate Revocation List）。

**X509 文件扩展名**

首先我们要理解文件的扩展名代表什么。DER、PEM、CRT和CER这些扩展名经常令人困惑。很多人错误地认为这些扩展名可以互相代替。尽管的确有时候有些扩展名是可以互换的，但是最好你能确定证书是如何编码的，进而正确地标识它们。正确地标识证书有助于证书的管理。

**编码 (也用于扩展名)**

* .DER = 扩展名DER用于二进制DER编码的证书。这些证书也可以用CER或者CRT作为扩展名。比较合适的说法是“我有一个DER编码的证书”，而不是“我有一个DER证书”。
* .PEM = 扩展名PEM用于ASCII（Base64）编码的各种X.509 v3 证书。文件开始由一行”—– BEGIN …“开始。

**常用的扩展名**

* .CRT = 扩展名CRT用于证书。证书可以是DER编码，也可以是PEM编码。扩展名CER和CRT几乎是同义词。这种情况在各种unix/linux系统中很常见。
* .CER = CRT证书的微软型式。可以用微软的工具把CRT文件转换为CER文件（CRT和CER必须是相同编码的，DER或者PEM）。扩展名为CER的文件可以被IE识别并作为命令调用微软的cryptoAPI（具体点就是rudll32.exe cryptext.dll, CyrptExtOpenCER），进而弹出一个对话框来导入并/或查看证书内容。
* .KEY = 扩展名KEY用于PCSK#8的公钥和私钥。这些公钥和私钥可以是DER编码或者PEM编码。

CRT文件和CER文件只有在使用相同编码的时候才可以安全地相互替代。

**OpenSSL支持几种不同的证书格式。这些证书都是基于DSA或者RSA算法，并被用于公钥加密。**

证书的格式取决于它们的应用，因为现在还没有一个证书文件格式的标准。

**私钥（Private Key）**通常以PEM和DER编码格式出现。相关的文件看起来是下面这样的：

* pem文件：*key-rsa.pem
* der文件：key-rsa.der

对于OpenSSL的应用，PEM编码就够用了。对于Java应用，DER编码可能更适合用来导入私钥和证书。

对于数字证书（Certificate），可用的格式有PEM、DER和PKCS12：

* pem文件：*cert.pem
* der文件：*cert.der
* pkcs12文件：*cert.p12

通常，PEM编码用于Unix系统，PKCS12用于微软，而DER用于Java。

数字证书是由ASN.1编码的对象组成的。这些对象可用通过DES（Data Encryption Standard）来加密，也可用通过其他的对称加密算法来加密，例如3DES。

**未加密**
<tt>的PEM</tt>文件内容看起来是下面这个样子的：

```
-----BEGIN CERTIFICATE-----
MB4CGQDUoLoCULb9LsYm5+/WN992xxbiLQlEuIsCAQM=
-----END CERTIFICATE-----
```

以MB4C… 的字符串是一个Base64编码（Base64-encoded）、ASN.1编码（ASN.1-encoded）的对象。

**加密后**的文件有一些header来描述加密类型和初始向量：

```
-----BEGIN RSA PRIVATE KEY-----
Proc-Type: 4,ENCRYPTED
DEK-Info: DES-EDE3-CBC,C814158661DC1449
AFAZFbnQNrGjZJ``/ZemdVSoZa3HWujxZuvBHzHNoesxeyqqidFvnydA==
-----END RSA PRIVATE KEY-----
```

Proc-Type和DEK-Info声明了加密算法, 以AFAZ…开头的字符串是一个Base64编码（Base64-encoded）、ASN.1编码（ASN.1-encoded）的对象。由于网页浏览器会使用Java应用程序，浏览器会以pkcs12格式导入/导出数字证书，即公钥和私钥会被用PKCS#12算法打包在一个文件中。其他应用程序会要求未打包的PEM编码的公钥和私钥，因此用户必须记住应用程序需要的适当的格
