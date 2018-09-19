layout: post
title: What is a Digital Signature & Digital Certification?
tags: [security]
category: Security
---

## 数字签名是什么？

作者：David Youd

翻译：阮一峰

原文网址：http://www.youdzone.com/signature.html

![](http://www.ruanyifeng.com/blogimg/asset/201108/bg2011080901.png)

鲍勃有两把钥匙，一把是公钥，另一把是私钥。

![](http://www.ruanyifeng.com/blogimg/asset/201108/bg2011080902.png)

鲍勃把公钥送给他的朋友们----帕蒂、道格、苏珊----每人一把。

![](http://www.ruanyifeng.com/blogimg/asset/201108/bg2011080903.png)

苏珊要给鲍勃写一封保密的信。她写完后用鲍勃的公钥加密，就可以达到保密的效果。

![](http://www.ruanyifeng.com/blogimg/asset/201108/bg2011080904.png)

鲍勃收信后，用私钥解密，就看到了信件内容。这里要强调的是，只要鲍勃的私钥不泄露，这封信就是安全的，即使落在别人手里，也无法解密。

![](http://www.ruanyifeng.com/blogimg/asset/201108/bg2011080905.png)

鲍勃给苏珊回信，决定采用"数字签名"。他写完后先用Hash函数，生成信件的摘要（digest）。

![](http://www.ruanyifeng.com/blogimg/asset/201108/bg2011080906.png)

然后，鲍勃使用私钥，对这个摘要加密，生成"数字签名"（signature）。

![](http://www.ruanyifeng.com/blogimg/asset/201108/bg2011080907.png)

鲍勃将这个签名，附在信件下面，一起发给苏珊。

![](http://www.ruanyifeng.com/blogimg/asset/201108/bg2011080908.png)

苏珊收信后，取下数字签名，用鲍勃的公钥解密，得到信件的摘要。由此证明，这封信确实是鲍勃发出的。

![](http://www.ruanyifeng.com/blogimg/asset/201108/bg2011080909.png)

苏珊再对信件本身使用Hash函数，将得到的结果，与上一步得到的摘要进行对比。如果两者一致，就证明这封信未被修改过。

![](http://www.ruanyifeng.com/blogimg/asset/201108/bg2011080910.png)

复杂的情况出现了。道格想欺骗苏珊，他偷偷使用了苏珊的电脑，用自己的公钥换走了鲍勃的公钥。此时，苏珊实际拥有的是道格的公钥，但是还以为这是鲍勃的公钥。因此，道格就可以冒充鲍勃，用自己的私钥做成"数字签名"，写信给苏珊，让苏珊用假的鲍勃公钥进行解密。

![](http://www.ruanyifeng.com/blogimg/asset/201108/bg2011080911.png)

后来，苏珊感觉不对劲，发现自己无法确定公钥是否真的属于鲍勃。她想到了一个办法，要求鲍勃去找"证书中心"（certificate authority，简称CA），为公钥做认证。证书中心用自己的私钥，对鲍勃的公钥和一些相关信息一起加密，生成"数字证书"（Digital Certificate）。

![](http://www.ruanyifeng.com/blogimg/asset/201108/bg2011080912.png)

鲍勃拿到数字证书以后，就可以放心了。以后再给苏珊写信，只要在签名的同时，再附上数字证书就行了。

![](http://www.ruanyifeng.com/blogimg/asset/201108/bg2011080913.png)

苏珊收信后，用CA的公钥解开数字证书，就可以拿到鲍勃真实的公钥了，然后就能证明"数字签名"是否真的是鲍勃签的。

![](http://www.ruanyifeng.com/blogimg/asset/201108/bg2011080914.jpg)

下面，我们看一个应用"数字证书"的实例：https协议。这个协议主要用于网页加密。

![](http://www.ruanyifeng.com/blogimg/asset/201108/bg2011080915.png)

首先，客户端向服务器发出加密请求。

![](http://www.ruanyifeng.com/blogimg/asset/201108/bg2011080916.png)

服务器用自己的私钥加密网页以后，连同本身的数字证书，一起发送给客户端。

![](http://www.ruanyifeng.com/blogimg/asset/201108/bg2011080917.png)

客户端（浏览器）的"证书管理器"，有"受信任的根证书颁发机构"列表。客户端会根据这张列表，查看解开数字证书的公钥是否在列表之内。

![](http://www.ruanyifeng.com/blogimg/asset/201108/bg2011080918.png)

如果数字证书记载的网址，与你正在浏览的网址不一致，就说明这张证书可能被冒用，浏览器会发出警告。

![](http://www.ruanyifeng.com/blogimg/asset/201108/bg2011080919.jpg)

如果这张数字证书不是由受信任的机构颁发的，浏览器会发出另一种警告。

![](http://www.ruanyifeng.com/blogimg/asset/201108/bg2011080920.png)

如果数字证书是可靠的，客户端就可以使用证书中的服务器公钥，对信息进行加密，然后与服务器交换加密信息。

## 数字证书

对于非对称加密算法和数字签名来说，很重要的一点就是公钥的分发。理论上任何人可以公开获取到对方的公钥。然而这个公钥有没有可能是伪造的呢？传输过程中有没有可能被篡改掉呢？一旦公钥自身出了问题，则整个建立在其上的安全体系的安全性将不复存在。

数字证书机制正是为了解决这个问题，它就像日常生活中的一个证书一样，可以证明所记录信息的合法性。比如证明某个公钥是某个实体（如组织或个人）的，并且确保一旦内容被篡改能被探测出来，从而实现对用户公钥的安全分发。

根据所保护公钥的用途，可以分为加密数字证书（Encryption Certificate）和签名验证数字证书（Signature Certificate）。前者往往用于保护用于加密信息的公钥；后者则保护用于解密签名完成身份验证的公钥。两种类型的公钥也可以同时放在同一证书中。

一般情况下，证书需要由证书认证机构（Certification Authority，CA）来进行签发和背书。权威的证书认证机构包括 DigiCert、GlobalSign、VeriSign 等。用户也可以自行搭建本地 CA 系统，在私有网络中进行使用。

1.  **SSL／TLS**：一种加密协议，提供了计算机网络通信的安全规范和方案。
2.  **OpenSSL**：它是SSL／TLS的一个实现，而且包括了一批非常棒的工具软件。
3.  **X.509**：是由ITU-T为了公开密钥基础建设（PKI）与授权管理基础建设（PMI）提出的产业标准，规范了公开密钥认证、证书吊销列表、授权证书、证书路径验证算法、证书内容及格式等（https的证书就是遵循这个标准）。X.509的证书基于ASN.1来描述，按照[rfc5280规范](https://www.ietf.org/rfc/rfc5280.txt)，X509 V3版本的证书基本语法如下（只列举了Certificate和TBSCertificate，其它更详细的请参考rfc5280）。

    <font color="blue">其中tbsCertificate的数据段被拿来做信息摘要，并且用上级证书的私钥加密后形成签名置入https证书中。</font>

```cpp
Certificate  ::=  SEQUENCE  {
        tbsCertificate       TBSCertificate,
        signatureAlgorithm   AlgorithmIdentifier,
        signatureValue       BIT STRING  }
TBSCertificate  ::=  SEQUENCE  {
        version         [0]  EXPLICIT Version DEFAULT v1,
        serialNumber         CertificateSerialNumber,
        signature            AlgorithmIdentifier,
        issuer               Name,
        validity             Validity,
        subject              Name,
        subjectPublicKeyInfo SubjectPublicKeyInfo,
        issuerUniqueID  [1]  IMPLICIT UniqueIdentifier OPTIONAL,
                             -- If present, version MUST be v2 or v3
        subjectUniqueID [2]  IMPLICIT UniqueIdentifier OPTIONAL,
                             -- If present, version MUST be v2 or v3
        extensions      [3]  EXPLICIT Extensions OPTIONAL
                             -- If present, version MUST be v3
        }
```

1.  **ASN.1**（Abstract Syntax Notation One），一种描述数字对象的方法和标准。ASN.1提供了多种数据编码方法。包括了BER、DER、PER和XER等。这些编码方法规定了将数字对象转换成应用程序能够处理、保存和网络传输的二进制编码形式的一组规则。
2.  **DER编码**（Distinguished Encoding Rules）：属于ASN.1下的BER（Basic Encode Rules）编码派生出来的编码规则，这种编码规则下，一个相同的ASN.1对象编码后能得到唯一的编码数据（BER编码不能保证这一点，即一个对象编码后可能产生多个不同的编码数据）
3.  **PEM编码**（Privacy Enhanced Mail）：是一种保密邮件的编码标准，在[rfc1421规范](https://tools.ietf.org/html/rfc1421)中规定。X.509的证书在DER编码的基础上进行base64编码，然后添加一些头、尾标志就是PEM格式编码了，头尾的标志也是PEM的一部分，不要随意改动。比如baidu.com.cer经过下面命令转成PEM后：

```
//转换命令
openssl x509 -inform der -in <.cer file> -out <.pem output file>
//PEM格式的文件如下，头和尾告诉我们这是一个certificate：
-----BEGIN CERTIFICATE-----
MIIG0DCCBbigAwIBAgIMGNoar9s9QTCfF9MLMA0GCSqGSIb3DQEBCwUAMGYxCzAJ这里省略一堆类似的符号Qht29ZyGrAAdgJfW/9iFD+Kg5jsj0KyGxxzB3i4QHOjkftpQZrCYAvLWQuZu4vTX8daTPwJTcfR/R6MAweYUJUcuS98=
-----END CERTIFICATE-----
```

另外，感兴趣的话，你可以直接将baidu.com.cer直接base64编码，可以看到编码出来的内容除了没有PEM的头尾标志，其它内容是一致的。附带几个base64命令：

```
openssl base64 -d -in <infile> -out <outfile>
openssl base64 -in <infile> -out <outfile>
openssl enc -base64 <<< <sting to encode>
openssl enc -base64 -d <<< <string to decode>
```

## 获取证书

chrome打开[百度](https://www.baidu.com/)，MAC下command+option+j呼出调试工具，找到security栏目，点击“View certificate”可以看到证书

![75fce5ccc67dacbeac4588a686708e43.png-32.2kB](http://static.zybuluo.com/blueGhost/f4nolc1uo2mtvptyp6yissy3/75fce5ccc67dacbeac4588a686708e43.png)

依次点击三个证书，直接将证书图标拖出来即可保存成.cer格式   

![ec89a97f91492b34a588ac5cb0a2913b.png-52.7kB](http://static.zybuluo.com/blueGhost/uaa6nvn9o2xj4ejesuexi9h4/ec89a97f91492b34a588ac5cb0a2913b.png)

保存在文件夹中：为了方便操作，我将其重命名了：   
"baidu.cer"->"bd.cer"，"GlobalSign Organization Validation CA - SHA256 - G2.cer"->"g2.cer"，"GlobalSign Root CA.cer"->"groot.cer"   

![c7b5eabd4ce09d40deeae65c02699ac9.png-15.1kB](http://static.zybuluo.com/blueGhost/4boajwjkacnidr4i5ixczl40/c7b5eabd4ce09d40deeae65c02699ac9.png)   

重命名后如下：   

![8ffca03bd008caef188f818283b3538a.png-5.8kB](http://static.zybuluo.com/blueGhost/5r3t9816zqi46bcq82l8bcui/8ffca03bd008caef188f818283b3538a.png)

1. 初步判断是什么格式，CER or PEM

    打开bd.cer可以看到内容，一眼就知道不是PEM编码（没有头尾信息说明），所以应该是DER编码了：

        3082 06d0 3082 05b8 a003 0201 0202 0c18
        da1a afdb 3d41 309f 17d3 0b30 0d06 092a
        8648 86f7 0d01 010b 0500 3066 310b 3009
        0603 5504 0613 0242 4531 1930 1706 0355
        040a 1310 476c 6f62 616c 5369 676e 206e
        762d 7361 313c 303a 0603 5504 0313 3347
        此处省略多行类似的符号
        e2a0 e63b 23d0 ac86 c71c c1de 2e10 1ce8
        e47e da50 66b0 9802 f2d6 42e6 6ee2 f4d7
        f1d6 933f 0253 71f4 7f47 a300 c1e6 1425
        472e 4bdf 

2. 把DER转化成给人看的信息

    使用以下命令将der格式的证书信息提取出来

        //-inform der告诉openssl，要转换的文件格式为der，如果是pem则无需指明
        //-noout，不要同时生成该证书的pem内容，如果没有这个选项，会同时在输出文件的末尾附带上证书的pem，你可以去掉试一下
        openssl x509 -in bd.cer -inform der -text -noout >> bd.cer.noout.txt

    执行后，打开bd.cer.noout.txt，可以看到内容如下（建议先看RSA的加密算法[RSA算法原理](http://www.ruanyifeng.com/blog/2013/07/rsa_algorithm_part_two.html)）

        Public Key Algorithm: rsaEncryption，表明证书公钥是RSA公钥
        Modulus (2048 bit):指出RSA的模(即RSA算法一开始选的两个质数的乘积)
        Exponent: 65537 (0x10001)，指出RSA的指数
        Signature Algorithm: sha256WithRSAEncryption，指出证书的签名，以及其签名算法，先用sha256做信息摘要，再对摘要内容做RSA加密。

        Certificate:
        Data:
            Version: 3 (0x2)
            Serial Number:
                18:da:1a:af:db:3d:41:30:9f:17:d3:0b
            Signature Algorithm: sha256WithRSAEncryption
            Issuer: C=BE, O=GlobalSign nv-sa, CN=GlobalSign Organization Validation CA - SHA256 - G2
            Validity
                Not Before: Nov 25 03:33:19 2016 GMT
                Not After : Nov 26 03:33:19 2017 GMT
            Subject: C=CN, ST=beijing, L=beijing, OU=service operation department., O=BeiJing Baidu Netcom Science Technology Co., Ltd, CN=baidu.com
            Subject Public Key Info:
                Public Key Algorithm: rsaEncryption
                RSA Public Key: (2048 bit)
                    Modulus (2048 bit):
                        00:c8:99:0f:0b:42:de:bf:a2:f4:b2:13:58:dc:e4:
                        ce:e4:9c:0e:f2:0c:73:9b:65:40:3c:3a:01:bc:72:
                        29:a5:dd:a3:ca:0d:bb:95:43:42:4b:72:e1:64:44:
                        16:fb:e2:75:71:7b:d1:00:c2:03:7b:34:ca:d2:2f:
                        47:52:4e:5d:a9:62:89:cc:7e:49:63:ef:29:9f:af:
                        e2:ca:52:28:28:3b:c4:a8:d5:72:94:b2:7b:6a:e8:
                        a5:3b:fe:a5:d1:23:84:e9:77:dc:e8:5a:84:d7:51:
                        23:20:33:70:6f:8c:df:6d:ca:8c:2c:f4:64:a6:bf:
                        67:e8:31:44:6c:9c:ed:34:6b:3e:18:21:39:cc:d9:
                        b5:6e:92:5b:a2:ea:3e:13:7e:44:6e:03:fb:b2:a5:
                        c2:cf:46:b6:4c:e9:79:f1:46:f1:eb:ce:7b:0c:09:
                        9e:4d:c2:aa:4e:41:e0:d0:b9:00:86:68:5a:a4:28:
                        f1:65:6e:2f:11:6f:e2:cf:14:02:02:52:69:aa:16:
                        99:62:b7:a6:9c:ee:0b:d0:78:b0:4d:dc:17:89:c7:
                        53:ee:e0:99:a0:a1:24:cf:29:4d:0e:b5:1b:50:b6:
                        e5:da:63:af:a8:aa:91:86:3f:d8:2a:bc:4e:5e:59:
                        8c:b6:60:f0:36:01:ea:23:9a:23:6c:48:fa:f3:7f:
                        c6:c3
                    Exponent: 65537 (0x10001)
            X509v3 extensions:
                X509v3 Key Usage: critical
                    Digital Signature, Key Encipherment
                Authority Information Access: 
                    CA Issuers - URI:http://secure.globalsign.com/cacert/gsorganizationvalsha2g2r1.crt
                    OCSP - URI:http://ocsp2.globalsign.com/gsorganizationvalsha2g2
                X509v3 Certificate Policies: 
                    Policy: 1.3.6.1.4.1.4146.1.20
                      CPS: https://www.globalsign.com/repository/
                    Policy: 2.23.140.1.2.2
                X509v3 Basic Constraints: 
                    CA:FALSE
                X509v3 CRL Distribution Points: 
                    URI:http://crl.globalsign.com/gs/gsorganizationvalsha2g2.crl
                X509v3 Subject Alternative Name: 
                    DNS:baidu.com, DNS:baifubao.com, DNS:www.baidu.cn, DNS:www.baidu.com.cn, DNS:click.hm.baidu.com, DNS:log.hm.baidu.com, DNS:cm.pos.baidu.com, DNS:wn.pos.baidu.com, DNS:update.pan.baidu.com, DNS:mct.y.nuomi.com, DNS:*.baidu.com, DNS:*.baifubao.com, DNS:*.baidustatic.com, DNS:*.bdstatic.com, DNS:*.bdimg.com, DNS:*.hao123.com, DNS:*.nuomi.com, DNS:*.chuanke.com, DNS:*.trustgo.com, DNS:*.bce.baidu.com, DNS:*.eyun.baidu.com, DNS:*.map.baidu.com
                X509v3 Extended Key Usage: 
                    TLS Web Server Authentication, TLS Web Client Authentication
                X509v3 Subject Key Identifier: 
                    39:D9:85:D3:0A:F4:B6:F5:2D:96:19:B7:E3:E8:A4:50:E3:6F:8F:5C
                X509v3 Authority Key Identifier: 
                    keyid:96:DE:61:F1:BD:1C:16:29:53:1C:C0:CC:7D:3B:83:00:40:E6:1A:7C
        Signature Algorithm: sha256WithRSAEncryption
            4b:73:ec:2d:d7:ec:ca:08:f3:9d:bd:95:54:b1:00:22:59:48:
            29:92:48:10:8d:31:cb:c6:6a:22:d8:19:44:d0:25:76:51:1d:
            c1:8d:88:3f:de:60:50:9c:a8:5a:16:96:1e:8a:c5:8f:59:77:
            8d:97:03:82:6f:3a:b7:f1:48:90:c5:21:bc:84:7a:af:2a:56:
            3c:05:0a:70:76:55:00:07:69:2d:44:22:8f:32:4b:34:05:9c:
            8c:21:de:40:18:8f:63:c2:71:cc:db:c3:8e:52:28:3a:fe:26:
            75:0d:69:15:66:c8:7a:b4:49:6a:ef:dc:08:9a:32:bf:5b:7b:
            21:57:11:0c:f3:eb:94:02:7c:6d:af:81:54:59:4e:ab:8a:11:
            ec:82:70:75:75:92:88:a6:1f:2c:5c:30:a1:f3:31:81:8c:52:
            86:93:1d:4a:8f:6a:ef:25:f1:6f:ea:1e:96:92:13:ca:05:0c:
            19:8e:13:12:6d:6e:79:9f:42:1b:76:f5:9c:86:ac:00:1d:80:
            97:d6:ff:d8:85:0f:e2:a0:e6:3b:23:d0:ac:86:c7:1c:c1:de:
            2e:10:1c:e8:e4:7e:da:50:66:b0:98:02:f2:d6:42:e6:6e:e2:
            f4:d7:f1:d6:93:3f:02:53:71:f4:7f:47:a3:00:c1:e6:14:25:
            47:2e:4b:df

## 校验证书(trust chain)

### 校验方法概述

校验方法基于证书信任链的结构，可以自行回顾一下证书的[trust chain知识](https://www.zybuluo.com/blueGhost/note/805491)

> 1.  取上级证书的公钥，对下级证书的签名进行解密得出下级证书的摘要digest1
> 2.  对下级证书进行信息摘要digest2
> 3.  判断digest1是否等于digest2，相等则说明下级证书校验通过
> 4.  依次对各个相邻级别证书实施1～3步骤，直到根证书（或者可信任锚点[trusted anchor]）

![Chain_of_trust.svg-32.7kB](http://static.zybuluo.com/blueGhost/1odcvxkgk7j77d79t37vd334/Chain_of_trust.svg)

### 以bd.cer与g2.cer校验为例

首先取出下级证书的签名，即取出“bd.cer”证书的“Signature Algorithm”字段的内容，我们把数字中间的冒号去掉后得到： 

Signature：（可以看到这是一个十六进制数，即HEX）

```
4b73ec2dd7ecca08f39dbd9554b100225948299248108d31cbc66a22d81944d02576511dc18d883fde60509ca85a16961e8ac58f59778d9703826f3ab7f14890c521bc847aaf2a563c050a7076550007692d44228f324b34059c8c21de40188f63c271ccdbc38e52283afe26750d691566c87ab4496aefdc089a32bf5b7b2157110cf3eb94027c6daf8154594eab8a11ec827075759288a61f2c5c30a1f331818c5286931d4a8f6aef25f16fea1e969213ca050c198e13126d6e799f421b76f59c86ac001d8097d6ffd8850fe2a0e63b23d0ac86c71cc1de2e101ce8e47eda5066b09802f2d642e66ee2f4d7f1d6933f025371f47f47a300c1e61425472e4bdf
```

取出上级证书的公钥，具体来讲，即取出g2.cer的公钥的模“Modulus”和指数“Exponent”（当然，要先把g2.cer转化成“给人看的信息”）

Modulus:(可以看到这是一个十六进制数，即HEX)

```
00c70e6c3f23937fcc70a59d20c30e533f7ec04ec29849ca47d523ef03348574c8a3022e465c0b7dc9889d4f8bf0f89c6c8c5535dbbff2b3eafbe356e74a46d91322ca36d59bc1a8e3964393f20cbce6f9e6e899c86348787f5736691a191d5ad1d47dc29cd47fe18012ae7aea88ea57d8ca0a0a3a1249a262197a0d24f737ebb473927b05239b12b5ceeb29dfa41402b901a5d4a69c436488def87efee3f51ee5fedca3a8e46631d94c25e918b9895909aee99d1c6d370f4a1e352028e2afd4218b01c445ad6e2b63ab926b610a4d20ed73ba7ccefe16b5db9f80f0d68b6cd908794a4f7865da92bcbe35f9b3c4f927804eff9652e60220e10773e95d2bbdb2f1
```

Exponent:（十进制数）65537

使用上级证书的公钥解密下级证书的签名

具体来讲，就是取g2.cer的公钥解密bd.cer的签名，使用公式：   
<font color="green">M表示明文，C表示密文，E表示Exponent，N表示Modulus</font>  

![](https://i.loli.net/2018/08/27/5b83917c73579.jpg)

我们使用python的pow(x,y,z)方法进行计算，直接算出明文M，注意这里 ![](https://i.loli.net/2018/08/27/5b8391a90db47.jpg)

```
>>> Modulus = 0x00c70e6c3f23937fcc70a59d20c30e533f7ec04ec29849ca47d523ef03348574c8a3022e465c0b7dc9889d4f8bf0f89c6c8c5535dbbff2b3eafbe356e74a46d91322ca36d59bc1a8e3964393f20cbce6f9e6e899c86348787f5736691a191d5ad1d47dc29cd47fe18012ae7aea88ea57d8ca0a0a3a1249a262197a0d24f737ebb473927b05239b12b5ceeb29dfa41402b901a5d4a69c436488def87efee3f51ee5fedca3a8e46631d94c25e918b9895909aee99d1c6d370f4a1e352028e2afd4218b01c445ad6e2b63ab926b610a4d20ed73ba7ccefe16b5db9f80f0d68b6cd908794a4f7865da92bcbe35f9b3c4f927804eff9652e60220e10773e95d2bbdb2f1
>>> Signature = 0x4b73ec2dd7ecca08f39dbd9554b100225948299248108d31cbc66a22d81944d02576511dc18d883fde60509ca85a16961e8ac58f59778d9703826f3ab7f14890c521bc847aaf2a563c050a7076550007692d44228f324b34059c8c21de40188f63c271ccdbc38e52283afe26750d691566c87ab4496aefdc089a32bf5b7b2157110cf3eb94027c6daf8154594eab8a11ec827075759288a61f2c5c30a1f331818c5286931d4a8f6aef25f16fea1e969213ca050c198e13126d6e799f421b76f59c86ac001d8097d6ffd8850fe2a0e63b23d0ac86c71cc1de2e101ce8e47eda5066b09802f2d642e66ee2f4d7f1d6933f025371f47f47a300c1e61425472e4bdf
>>> print "%x" % pow(Signature, 65537, Modulus)
1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff003031300d0609608648016503040201050004202aca8fbdefe8056d66a6dbd4da61453884c929a62d209f46b00d43896fddcd80
```

所以，解密出来的串是如下（十六进制表示），该串就是证书bd.cer的摘要，能够顺利解密，说明bd.cer的签名确实是使用中级机构g2.cer的私钥加密的。

```
1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff003031300d0609608648016503040201050004202aca8fbdefe8056d66a6dbd4da61453884c929a62d209f46b00d43896fddcd80
```

对下级证书做信息摘要

在第一节，“证书及相关概念简介”中，X.509规范规定了，tbsCertificate的数据段被拿来做信息摘要，并且用上级证书的私钥加密后形成签名置入https证书中，所以我们需要取出bd.cer证书中的tbsCertificate数据做信息摘要。

- 第一步，先取出bd.cer的asn1描述信息

        //这个命令将bd.cer证书的asn1信息输出到bd.cer.ans1文件中
        openssl asn1parse -inform der -in bd.cer > bd.cer.ans1

    使用文本编辑器打开bd.cer.ans1，可以看到如下信息：

        0:d=0  hl=4 l=1744 cons: SEQUENCE          
        4:d=1  hl=4 l=1464 cons: SEQUENCE          
        8:d=2  hl=2 l=   3 cons: cont [ 0 ]        
        10:d=3  hl=2 l=   1 prim: INTEGER           :02
        13:d=2  hl=2 l=  12 prim: INTEGER           :18DA1AAFDB3D41309F17D30B
        27:d=2  hl=2 l=  13 cons: SEQUENCE          
        29:d=3  hl=2 l=   9 prim: OBJECT            :sha256WithRSAEncryption
        后面的内容省略

    按照[rfc5280规范](https://www.ietf.org/rfc/rfc5280.txt)，可以知道bd.cer.ans1第二行描述的就是tbsCertificate存在bd.cer文件中的位置。

        Certificate  ::=  SEQUENCE  {
        tbsCertificate       TBSCertificate,
        signatureAlgorithm   AlgorithmIdentifier,
        signatureValue       BIT STRING  }

    第二行取出来就是下面这个，4:d=1中的4表示偏移量为4byte，hl=4表示头信息长度为4byte，l=1464表示内容长度1464byte，所以我们就可以使用dd命令从bd.cer中取出tbsCertificate的内容了，其总长度为1464+4=1468

        4:d=1  hl=4 l=1464 cons: SEQUENCE

- 第二步，取出tbsCertificate

        //if表示源文件，of表示输出文件，skip表示跳过多少单位，bs表示单位数量（即多少byte），count表示截取多少单位数据
        dd if=bd.cer of=bd.cer.tbsCertificate skip=4 bs=1 count=1468

- 第三步，计算tbsCertificate的摘要

        openssl dgst -sha256 bd.cer.tbsCertificate 
        SHA256(bd.cer.tbsCertificate)= 2aca8fbdefe8056d66a6dbd4da61453884c929a62d209f46b00d43896fddcd80


### 对比两个摘要

好了，终于到最后一步了，将第3)步得到bd.cer的摘要与4)得到的摘要进行对比。 
即，将从bd.cer中的签名进行解密得到的摘要，与我们从bd.cer中取出的tbsCertificate数据进行摘要得到的结果，进行比较。如果相同，则证书校验通过，否则表示bd.cer证书被攥改了。

解密signature得到的：

    //1f~003031300d060960864801650304020105000420这一串是RSA解密时填充上去的，需要忽略掉
    1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff003031300d0609608648016503040201050004202aca8fbdefe8056d66a6dbd4da61453884c929a62d209f46b00d43896fddcd80

对tbsCertificate进行摘要得到的：

    SHA256(bd.cer.tbsCertificate)= 2aca8fbdefe8056d66a6dbd4da61453884c929a62d209f46b00d43896fddcd80

## X.509 证书规范

一般的，一个数字证书内容可能包括基本数据（版本、序列号）、所签名对象信息（签名算法类型、签发者信息、有效期、被签发人、**签发的公开密钥**）、CA 的数字签名等等。

目前使用最广泛的标准为 ITU 和 ISO 联合制定的 X.509 的 v3 版本规范（RFC 5280），其中定义了如下证书信息域：

* 版本号（Version Number）：规范的版本号，目前为版本 3，值为 0x2；
* 序列号（Serial Number）：由 CA 维护的为它所颁发的每个证书分配的唯一的序列号，用来追踪和撤销证书。当证书被取消时，实际上是将此证书序列号放入由CA签发的CRL（Certificate Revocation List证书作废表，或证书黑名单表）中。最大不能超过 20 个字节；
* 签名算法（Signature Algorithm）：数字签名所采用的算法，如 sha256WithRSAEncryption 或 ecdsa-with-SHA256；
* 颁发者（Issuer）：颁发证书单位的标识信息，如 “C=CN, ST=Beijing, L=Beijing, O=org.example.com, CN=ca.org.example.com”；
* 有效期（Validity）：证书的有效期限，包括起止时间；
* 主体（Subject）：证书拥有者的标识信息（Distinguished Name），如 “C=CN, ST=Beijing, L=Beijing, CN=person.org.example.com”；
* 主体的公钥信息（Subject Public Key Info）：所保护的公钥相关的信息；
    * 公钥算法（Public Key Algorithm）：公钥采用的算法；
    * 主体公钥（Subject Public Key）：公钥的内容；
* 颁发者唯一号（Issuer Unique Identifier）：代表颁发者的唯一信息，仅 2、3 版本支持，可选；
* 主体唯一号（Subject Unique Identifier）：代表拥有证书实体的唯一信息，仅 2、3 版本支持，可选；
* 扩展（Extensions，可选）：可选的一些扩展。v3 中可能包括：
    * Subject Key Identifier：实体的密钥标识符，区分实体的多对密钥；
    * Basic Constraints：一般指明是否属于 CA；
    * Authority Key Identifier：颁发这个证书的颁发者的公钥标识符；
    * CRL Distribution Points：撤销文件的发布地址；
    * Key Usage: 证书的用途或功能信息。

此外，证书的颁发者还需要对证书内容利用自己的私钥进行签名，以防止他人篡改证书内容。

下面是截取了github的ssl证书的截图：

![2](https://blog.cnbluebox.com/images/shuzizhengshu_2.png)

![3](https://blog.cnbluebox.com/images/shuzizhengshu_3.png)

![4](https://blog.cnbluebox.com/images/shuzizhengshu_4.png)

## 证书格式

X.509 规范中一般推荐使用 PEM（Privacy Enhanced Mail）格式来存储证书相关的文件。证书文件的文件名后缀一般为 `.crt` 或 `.cer`，对应私钥文件的文件名后缀一般为 `.key`，证书请求文件的文件名后缀为 `.csr`。有时候也统一用 `.pem` 作为文件名后缀。

PEM 格式采用文本方式进行存储，一般包括首尾标记和内容块，内容块采用 base64 编码。

例如，一个示例证书文件的 PEM 格式如下所示。

```
-----BEGIN CERTIFICATE-----
MIICMzCCAdmgAwIBAgIQIhMiRzqkCljq3ZXnsl6EijAKBggqhkjOPQQDAjBmMQsw
CQYDVQQGEwJVUzETMBEGA1UECBMKQ2FsaWZvcm5pYTEWMBQGA1UEBxMNU2FuIEZy
YW5jaXNjbzEUMBIGA1UEChMLZXhhbXBsZS5jb20xFDASBgNVBAMTC2V4YW1wbGUu
Y29tMB4XDTE3MDQyNTAzMzAzN1oXDTI3MDQyMzAzMzAzN1owZjELMAkGA1UEBhMC
VVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNVBAcTDVNhbiBGcmFuY2lzY28x
FDASBgNVBAoTC2V4YW1wbGUuY29tMRQwEgYDVQQDEwtleGFtcGxlLmNvbTBZMBMG
ByqGSM49AgEGCCqGSM49AwEHA0IABCkIHZ3mJCEPbIbUdh/Kz3zWW1C9wxnZOwfy
yrhr6aHwWREW3ZpMWKUcbsYup5kbouBc2dvMFUgoPBoaFYJ9D0SjaTBnMA4GA1Ud
DwEB/wQEAwIBpjAZBgNVHSUEEjAQBgRVHSUABggrBgEFBQcDATAPBgNVHRMBAf8E
BTADAQH/MCkGA1UdDgQiBCBIA/DmemwTGibbGe8uWjt5hnlE63SUsXuNKO9iGEhV
qDAKBggqhkjOPQQDAgNIADBFAiEAyoMO2BAQ3c9gBJOk1oSyXP70XRk4dTwXMF7q
R72ijLECIFKLANpgWFoMoo3W91uzJeUmnbJJt8Jlr00ByjurfAvv
-----END CERTIFICATE-----
```

可以通过 openssl 工具来查看其内容。

```bash
# openssl x509 -in example.com-cert.pem -noout -text
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number:
            22:13:22:47:3a:a4:0a:58:ea:dd:95:e7:b2:5e:84:8a
    Signature Algorithm: ecdsa-with-SHA256
        Issuer: C=US, ST=California, L=San Francisco, O=example.com, CN=example.com
        Validity
            Not Before: Apr 25 03:30:37 2017 GMT
            Not After : Apr 23 03:30:37 2027 GMT
        Subject: C=US, ST=California, L=San Francisco, O=example.com, CN=example.com
        Subject Public Key Info:
            Public Key Algorithm: id-ecPublicKey
                Public-Key: (256 bit)
                pub:
                    04:29:08:1d:9d:e6:24:21:0f:6c:86:d4:76:1f:ca:
                    cf:7c:d6:5b:50:bd:c3:19:d9:3b:07:f2:ca:b8:6b:
                    e9:a1:f0:59:11:16:dd:9a:4c:58:a5:1c:6e:c6:2e:
                    a7:99:1b:a2:e0:5c:d9:db:cc:15:48:28:3c:1a:1a:
                    15:82:7d:0f:44
                ASN1 OID: prime256v1
        X509v3 extensions:
            X509v3 Key Usage: critical
                Digital Signature, Key Encipherment, Certificate Sign, CRL Sign
            X509v3 Extended Key Usage:
                Any Extended Key Usage, TLS Web Server Authentication
            X509v3 Basic Constraints: critical
                CA:TRUE
            X509v3 Subject Key Identifier:
                48:03:F0:E6:7A:6C:13:1A:26:DB:19:EF:2E:5A:3B:79:86:79:44:EB:74:94:B1:7B:8D:28:EF:62:18:48:55:A8
    Signature Algorithm: ecdsa-with-SHA256
         30:45:02:21:00:ca:83:0e:d8:10:10:dd:cf:60:04:93:a4:d6:
         84:b2:5c:fe:f4:5d:19:38:75:3c:17:30:5e:ea:47:bd:a2:8c:
         b1:02:20:52:8b:00:da:60:58:5a:0c:a2:8d:d6:f7:5b:b3:25:
         e5:26:9d:b2:49:b7:c2:65:af:4d:01:ca:3b:ab:7c:0b:ef
```

此外，还有 DER（Distinguished Encoding Rules）格式，是采用二进制对证书进行保存，可以与 PEM 格式互相转换。

## 证书信任链

证书中记录了大量信息，其中最重要的包括 `签发的公开密钥` 和 `CA 数字签名` 两个信息。因此，只要使用 CA 的公钥再次对这个证书进行签名比对，就能证明某个实体的公钥是否是合法的。

读者可能会想到，怎么证明用来验证对实体证书进行签名的 CA 公钥自身是否合法呢？毕竟在获取 CA 公钥的过程中，它也可能被篡改掉。

实际上，CA 的公钥是否合法，一方面可以通过更上层的 CA 颁发的证书来进行认证；另一方面某些根 CA（Root CA）可以通过预先分发证书来实现信任基础。例如，主流操作系统和浏览器里面，往往会提前预置一些权威 CA 的证书（通过自身的私钥签名，系统承认这些是合法的证书）。之后所有基于这些 CA 认证过的中间层 CA（Intermediate CA）和后继 CA 都会被验证合法。这样就从预先信任的根证书，经过中间层证书，到最底下的实体证书，构成一条完整的证书信任链。

某些时候用户在使用浏览器访问某些网站时，可能会被提示是否信任对方的证书。这说明该网站证书无法被当前系统中的证书信任链进行验证，需要进行额外检查。另外，当信任链上任一证书不可靠时，则依赖它的所有后继证书都将失去保障。

可见，证书作为公钥信任的基础，对其生命周期进行安全管理十分关键。后面章节将介绍的 PKI 体系提供了一套完整的证书管理的框架，包括生成、颁发、撤销过程等。

## 数字证书的颁发过程

![5](https://blog.cnbluebox.com/images/shuzizhengshu_5.png)

图中给出了基本的证书申请流程，这个流程一般体现的场景如：网页服务器从CA请求SSL证书用于https加密; 像苹果服务器请求开发者证书。

## CA与系统根证书

数字证书认证机构（英语：`Certificate Authority`，缩写为`CA`），也称为电子商务认证中心、电子商务认证授权机构，是负责发放和管理数字证书的权威机构，并作为电子商务交易中受信任的第三方，承担公钥体系中公钥的合法性检验的责任。**`CA`中心为每个使用公开密钥的用户发放一个数字证书，数字证书的作用是证明证书中列出的用户合法拥有证书中列出的公开密钥。`CA`机构的数字签名使得攻击者不能伪造和篡改证书。**

CA证书可以具有**层级结构**，CA建立自上而下的信任链，下级CA信任上级CA，下级CA由上级CA颁发证书并认证。

CA认证中心之间的关系如下图所示(图1-0)：  

![](https://upload-images.jianshu.io/upload_images/1192353-2b88e8164499c22d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/644/format/webp)


`CA认证中心`之间是一个树状结构，`根CA认证中心`可以授权多个`二级的CA认证中心`，`二级CA认证中心`也可以授权多个`三级的CA认证中心`...如果你是`数字证书申请人`，你可以`向根CA认证中心`，或者`二级，三级的CA认证中心`申请数字证书，这是没有限制的，当你成功申请后，你就称为了`数字证书所有人`。**值得注意的是，`根CA认证`中心是有多个的，也就是说会有多棵这样的结构树。**

如：

![6](https://blog.cnbluebox.com/images/shuzizhengshu_6.png)

如果说CA保证互联网交易安全的根本保证，那么系统根证书就是个人PC安全的根本保证。系统根证书里保存了受信任的CA证书的根证书，用户验证一个数字证书的正确性都是从系统根证书开始的。

如上图中： [google.com](http://google.com/).hk的ssl证书由 Google Internet Authority G2这个CA来验证。而Google Internet Authority G2由 GeoTrust Global CA来验证； GeoTrust Global CA由系统根证书Equifax Secure Certificate Authority来验证。

**_如何查看系统根证书_**

在mac系统的keychain中直接就可以查看了，在windows系统中在开始的搜索中直接键入：certmgr.msc，就可以打开证书查看器
**如果系统根证书被篡改，系统的安全性就受到威胁**

**所以，不要轻易的信任根证书，除非你是开发者，了解自己的所作所为**

## 信息摘要、数字签名

现在我们可以继续我们的场景：

假设有一天，Alice收到了一份署名为Bob的文件。Alice希望能够确认这份文件一定是来自Bob；另外Alice希望能够确信，这份文件在传输过程中并没有被它人篡改。那么基于非对称密钥算法我们应该怎么做？

确认文件一定来自于Bob，其实就是Bob无法否认自己发送过这份文件。信息安全中称作不可抵赖性；另一方面，确信文件并没有中途被篡改，则称作不可篡改性。

在非对称密钥算法中提到，公钥加密的内容使用私钥可以解密。同样的，基于私钥加密的内容使用公钥也可以解密，两者一一对应。因此我们可以很容易想到。如果Bob利用自己手里的私钥对文件进行加密后，传输给Alice。Alice再通过公钥库中Bob的公钥进行解密，则可以证明文件一定是由Bob发出（由于只有Bob持有私钥）。另外，因为传输的是密文，如果能够使用公钥解密，同时也证明了文件并没有中途被篡改。这样的做法其实已经同时满足了不可抵赖性和不可篡改性。

然而，由于传输的文件可能很大，为了证明文件的不可抵赖性和不可篡改性，需要对整个文件进行加密，由于非对称算法效率较低，这样做的代价太大。因此常规的做法是用到信息摘要和数字签名的方式。

所谓信息摘要，其实就是某种HASH算法。将信息明文转化为固定长度的字符，它具有如下特点：

1. 无论输入的消息有多长，计算出来的消息摘要的长度总是固定的；
1. 用相同的摘要算法对相同的消息求两次摘要，其结果必然相同；
1. 一般地，只要输入的消息不同，对其进行摘要以后产生的摘要消息也几乎不可能相同；
1. 消息摘要函数是单向函数，即只能进行正向的信息摘要，而无法从摘要中恢复出任何的消息；
1. 好的摘要算法，没有人能从中找到“碰撞”，虽然“碰撞”是肯定存在的。即对于给定的一个摘要，不可能找到一条信息使其摘要正好是给定的。 或者说，无法找到两条消息，是它们的摘要相同。

一般的，我们将信息的摘要也称作信息的指纹。如同指纹的含义，相同的信息一定会得相同的指纹，而仅通过指纹又无法还原出原始信息。目前主要的摘要算法有MD5和SHA1。

当有了信息摘要技术以后，基于Bob向Alice发送文件的场景，我们可以进行如下的操作：

![](http://static.oschina.net/uploads/space/2015/0522/163536_Befj_1469576.png)

第一步：

1. Bob将原始的信息进行一次信息摘要算法，得到原始信息的摘要值；
1. Bob使用自己的私钥，对该摘要值进行加密。得到信息摘要的密文；
1. Bob将原始文件和摘要值的密文一起发送给Alice。
1. 一般的，我们将原始文件和摘要密文称作Bob对原始文件的签名结果。

![](http://static.oschina.net/uploads/space/2015/0522/163622_AGHM_1469576.png)

第二步：

1. 当Alice接收到Bob传输的信息（原始文件，信息摘要密文）后，使用Bob的公钥将摘要密文解密，得到信息摘要明文；
1. 使用信息摘要算法，取原文的摘要信息，获取原始文件摘要信息；
1. Alice比较解密后的摘要信息和取得的摘要信息。如果相同，则可以证明文件一定由Bob发送，并且中途并没有经过任何篡改。一般将这个过程称作_**验签**_。

所谓数字签名，就是对原始文件的“指纹”进行了私钥加密。这样，即可保证文件的特征（摘要值）一定经过了私钥的加密。同时由于信息摘要的长度普遍不长（MD5为128位，SHA1主要为256位），也并没有带来太大的开销。

如同对称密钥算法，在大部分开发语言中，基于非对称算法的数字签名，数字加密算法。也都进行了一定的封装。如下链接就比较详细的描述了基于JCE如何实现数字签名、加密、验证等：http://blog.csdn.net/centralperk/article/details/8538697

## 数字证书

前两篇文章，分别介绍了非对称加密算法和数字签名技术：

http://blog.csdn.net/u014419512/article/details/26290821

http://blog.csdn.net/u014419512/article/details/26408029

基于非对称密钥算法，Bob生成了一对公私钥。Bob将公钥发布在公开的密钥库中。而Alice在向Bob发送加密文件或者验证Bob签名的文件时，均要从公钥库取到Bob的公钥。我们已经知道，一般来说公钥就是一段固定长度的字符串，并没有特定的含义。

为了让Alice能够方便的辨别公钥，我们可以考虑对给公钥附加一些信息，例如该公钥使用的算法，该公钥的所有者（主题），该公钥的有效期等一系列属性。这样的数据结构我们称作PKCS10数据包

![](http://static.oschina.net/uploads/space/2015/0522/164256_KzDU_1469576.png)

公钥的主题我们采用唯一标示符(或称DN-distinguished name)，以尽量唯一的标示公钥所有者。以下是基于抽象语法表示法所定义的PKCS10数据结构：

```cpp
CertificationRequestInfo ::= SEQUENCE {  
        version          INTEGER { v1(0) } (v1,...), 
        subject          Name,  
        subjectPKInfo  SubjectPublicKeyInfo{{ PKInfoAlgorithms }},  
        attributes       [0] Attributes{{ CRIAttributes }}  
        }  
    SubjectPublicKeyInfo { ALGORITHM : IOSet} ::= SEQUENCE {  
        algorithm     AlgorithmIdentifier {{IOSet}}, 
        subjectPublicKey  BIT STRING  
        }  

    PKInfoAlgorithms ALGORITHM ::= {   
        ...  -- add any locally defined algorithms here -- }  

    Attributes { ATTRIBUTE:IOSet } ::= SET OF Attribute{{ IOSet }}   

    CRIAttributes  ATTRIBUTE  ::= {  
        ... -- add any locally defined attributes here -- }  

    Attribute { ATTRIBUTE:IOSet } ::= SEQUENCE {  
        type    ATTRIBUTE.&id({IOSet}),  
        values  SET SIZE(1..MAX) OF ATTRIBUTE.&Type({IOSet}{@type}) 
}
```

我们已经有了PKCS10数据包，除了公钥信息外，还有公钥的持有者，公钥的版本号等信息。然而这样的数据结构其实并没有任何权威性。例如有一天一个叫做Richard的人想冒充Bob，也生成一对公私钥，并且使用了相同的公钥主题封装为P10数据结构。Alice其实并没有办法分辨哪个是真实Bob的公钥。

为了解决这个问题，就需要一个权威的第三方机构，对P10结构的数据进行认证。就如同对P10文件盖上一个权威的章，防止仿照。这样的权威机构，我们称作CA(Certificate Authority)数字证书认证中心。而CA如何为P10数据盖章呢？非常简单，就是我们前文已经提到的数字签名技术：

![](http://static.oschina.net/uploads/space/2015/0522/164756_WxXs_1469576.png)

1. 如上图所示，CA机构其实也持有一张私钥。一般来说，CA会对这份私钥进行特别的保护，严禁泄漏和盗用。
1. Bob将自己的公钥附加上一系列信息后，形成了P10数据包（请求包），并发送给CA。
1. CA机构通过其他一些手段，例如查看Bob的身份信息等方式，认可了Bob的身份。于是使用自己的私钥对P10请求进行签名。（也可能会先对数据进行一些简单修改，如修改有效期或主题等）
1. 这样的签名结果，我们就称作数字证书。

数字证书同样遵循一个格式标准，我们称作X509标准，我们一般提到的X509证书就是如此。以下是X509的格式：

```cpp
[Certificate ::= SEQUENCE {
    tbsCertificate TBSCertificate,
    signatureAlgorithm AlgorithmIdentifier,
    signature BIT STRING
}

TBSCertificate ::= SEQUENCE {
    version [0] EXPLICIT Version DEFAULT v1,
    serialNumber CertificateSerialNumber,
    signature AlgorithmIdentifier,
    issuer Name,
    validity Validity,
    subject Name,
    subjectPublicKeyInfo SubjectPublicKeyInfo,
    issuerUniqueID [1] IMPLICIT UniqueIdentifier OPTIONAL,
    -- If present, version must be v2or v3
    subjectUniqueID [2] IMPLICIT UniqueIdentifier OPTIONAL,
    -- If present, version must be v2or v3
    extensions [3] EXPLICIT Extensions OPTIONAL
    -- If present, version must be v3
    }
Version ::= INTEGER {
    v1(0), v2(1), v3(2)
}

CertificateSerialNumber ::= INTEGER
    Validity ::= SEQUENCE {
    notBefore CertificateValidityDate,
    notAfter CertificateValidityDate
}

CertificateValidityDate ::= CHOICE {
    utcTime UTCTime,
    generalTime GeneralizedTime
}

UniqueIdentifier ::= BIT STRING
    SubjectPublicKeyInfo ::= SEQUENCE {
    algorithm AlgorithmIdentifier,
    subjectPublicKey BIT STRING
}

Extensions ::= SEQUENCE OF Extension
Extension ::= SEQUENCE {
    extnID OBJECT IDENTIFIER,
    critical BOOLEAN DEFAULT FALSE,
    extnValue OCTET STRING
}
```

基于数字证书，我们可以再来看看Bob如何给Alice发送一份不可否认、不可篡改的文件：

![](http://static.oschina.net/uploads/space/2015/0522/165003_ZCWj_1469576.png)

第一步：Bob除了对文件进行签名操作外，同时附加了自己的数字证书。一同发给Alice。

![](http://static.oschina.net/uploads/space/2015/0522/165033_A1cB_1469576.png)

第二步：Alice首先使用CA的公钥，对证书进行验证。如果验证成功，提取证书中的公钥，对Bob发来的文件进行验签。如果验证成功，则证明文件的不可否认和不可篡改。

可以看到，基于数字证书后，Alice不在需要一个公钥库维护Bob（或其他人）的公钥证书，只要持有CA的公钥即可。数字证书在电子商务，电子认证等方面使用非常广泛，就如同计算机世界的身份证，可以证明企业、个人、网站等实体的身份。同时基于数字证书，加密算法的技术也可以支持一些安全交互协议（如SSL）。下一篇文章，将为大家介绍SSL协议的原理。