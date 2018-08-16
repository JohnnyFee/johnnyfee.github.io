layout: "post"
title: "Java Cryptography Guide"
categories: [Cryptography, Java, Android]
---

## Java与密码学

Java安全体系结构总共分为4个部分：

* JCA（ Java Cryptography Architecture， Java加密体系结构）：JCA提供基本的加密框架， 如证书、 数字签名、消息摘要和密钥对产生器。
* JCE（ Java Cryptography Extension， Java加密扩展包）：JCE在JCA的基础上作了扩展， 提供了各种加密算法、 消息摘要算法和密钥管理等功能。JCE的实现主要在javax.crypto包（ 及其子包） 中
* JSSE（ Java Secure Sockets Extension， Java安全套接字扩展包）：JSSE提供了基于SSL（ Secure Sockets Layer，安全套接字层） 的加密功能。 在网络的传输过程中， 信息会经过多个主机（很有可能其中一台就被窃听） ， 最终传送给接收者， 这是不安全的。这种确保网络通信安全的服务就是由JSSE来提供的。
* JAAS（ Java Authentication and Authentication Service， Java鉴别与安全服务）：JAAS提供了在Java平台上进行用户身份鉴别的功能。

![](https://images2015.cnblogs.com/blog/741560/201704/741560-20170409082229050-386019464.png)

JCA和JCE是Java平台提供的用于安全和加密服务的两组API。它们并不执行任何算法，它们只是连接应用和实际算法实现程序的一组接口。 软件开发商可以根据JCE接口（ 又称安全提供者接口） 将各种算法实现后，打包成一个Provider（ 安全提供者） ， 动态地加载到Java运行环境中。 根据美国出口限制规定， JCA可出口， 但JCE对部分国家是限制出口的。 因此， 要实现一个完整的安全结构， 就需要一个或多个第三方厂商提供的JCE产品， 称为安全提供者。 BouncyCastle JCE就是其中的一个安全提供 者。

安全提供者是承担特定安全机制实现的第三方。 有些提供者是完全免费的， 而另一些提供者则需要付费。 提供安全提供者的公司有Sun、 Bouncy Castle等， Sun（Oracle）提供了如何开发安全提供者的细节。 Bouncy Castle提供了可以在J2ME/J2EE/J2SE平台得到支持的API， 而且Bouncy Castle的API是免费的。JDK 1.4版本及其后续版本中包含了上述扩展包，无须进行配置。

## 体验加解密---凯撒密码

密码学是在战争中发家的，即使最简单的凯撒密码也不例外。凯撒密码是罗马扩张时期朱利斯•凯撒（Julius Caesar）创造的，用于加密通过信使传递的作战命令。它将字母表中的字母移动一定位置而实现加密。

在密码学中存在着各种各样的置换方式，但所有不同的置换方式都包含2个相同的元素。密钥和协议(算法)。凯撒密码的密钥是3，算法是将普通字母表中的字母用密钥对应的字母替换。置换加密的优点就在于它易于实施却难于破解. 发送方和接收方很容易事先商量好一个密钥，然后通过密钥从明文中生成密文，即是敌人若获取密文，通过密文直接猜测其代表的意义，在实践中是不可能的。

凯撒密码的加密算法极其简单。其加密过程如下：

在这里，我们做此约定：明文记为m，密文记为c，加密变换记为E(k1,m)（其中k1为密钥），解密变换记为D(k2,m)（k2为解密密钥）（在这里k1=k2,不妨记为k）。凯撒密码的加密过程可记为如下一个变换：

c≡m+k mod n （其中n为基本字符个数）

同样，解密过程可表示为：m≡c+k mod n （其中n为基本字符个数）

```java
public static void main(String args[]) throws Exception{
    String s=args[0];
    int key=Integer.parseInt(args[1]);
    String es="";
    for(int i=0;i<s.length( );i++){  char c=s.charAt(i);
        if(c>='a' && c<='z'){ // 是小写字母
            c+=key%26;  //移动key%26位
            if(c<'a') c+=26;  //向左超界
            if(c>'z') c-=26;  //向右超界
        }
        else if(c>='A' && c<='Z'){ // 是大写字母
            c+=key%26;
            if(c<'A') c+=26;
            if(c>'Z') c-=26;
        }
       
       es+=c;
    }
    
    System.out.println(es);
}
```

该程序既可用于加密又可用于解密：

    java Caesar 明文（要加密的字符串） 密钥（移动的位数）

在密钥前面加上负号即可解密

    java Caesar 明文（要加密的字符串） -密钥（移动的位数）



如为了加密字符串“Hello World!”，可随意取一个密钥如 4，运行：

    java Caesar "Hello World!" 4

将输出“Lipps Asvph!”。这里“Hello World!”是明文，“Lipps Asvph!”是密文。

如果密钥大于26，程序中移位前会和26取模而将其调整到26以下。因此运行：

    java Caesar "Hello World!" 30

同样将输出“Lipps Asvph!”。

为了将密文“Lipps Asvph!”解密，需要知道加密该密文所用的密钥4，这样，执行：

    java Caesar "Lipps Asvph!" -4

将得到明文“Hello World!”。

如果密钥和加密时所用的不同，则解密时将得到无意义的输出，如运行

    java Caesar "Lipps Asvph!" –3

程序将输出“Ifmmp Xpsme!”。这样，只有知道密钥才能得到原来的密文。

一般人见到"Lipps Asvph!"，能否猜出是“Hello World!”？我们可以通过暴力破解把0-25都试一遍，也可以通过统计手段进行破解。

## Java对称加密-DES算法

本实例给出Java中创建对称密钥的步骤，并通过对象序列化方式保存在文件中。

### 获取密钥生成器  

    KeyGenerator kg=KeyGenerator.getInstance("DESede");  

分析：Java中 `KeyGenerator` 类中提供了创建对称密钥的方法。Java中的类一般使用new操作符通过构造器创建对象，但KeyGenerator类不是这样，它预定义了一个静态方法 ``getInstance()``，通过它获得KeyGenerator类型的对象。这种类成为工厂类或工厂。  

方法 `getInstance()`的参数为字符串类型，指定加密算法的名称。可以是

- `Blowfish`
- `DES`
- `DESede`
- `HmacMD5`
- `HmacSHA1`
- ...

这些算法都可以实现加密，这里我们不关心这些算法的细节，只要知道其使用上的特点即可。其中`DES` 是目前最常用的对称加密算法，但安全性较差。针对DES安全性的改进产生了能满足当前安全需要的 `TripleDES` 算法，即 `DESede`。`Blowfish` 的密钥长度可达448位，安全性很好。`AES`是一种替代DES算法的新算法，可提供很好的安全性。

### 初始化密钥生成器  

    kg.init(168);  

分析：该步骤一般指定密钥的长度。如果该步骤省略的话，会根据算法自动使用默认的密钥长度。

- `DES`，则密钥长度必须是56位
- `DESede`，则可以是112或168位，其中112位有效；
- `AES`，可以是128, 192或256位；
- `Blowfish`，则可以是32至448之间可以被8整除的数；
- `HmacMD5` 和`HmacSHA1`默认的密钥长度都是64个字节。

### 生成密钥  

    SecretKey k=kg.generateKey( );  

分析：使用第一步获得的KeyGenerator类型的对象中`generateKey()`方法可以获得密钥。其类型为SecretKey类型，可用于以后的加密和解密。

### 通过对象序列化方式将密钥保存在文件中  

```
FileOutputStream f=new FileOutputStream("key1.dat");  
ObjectOutputStream b=new ObjectOutputStream(f);  
b.writeObject(k);  
```

分析：ObjectOutputStream类中提供的writeObject方法可以将对象序列化，以流的方式进行处理。这里将文件输出流作为参数传递给ObjectOutputStream类的构造器，这样创建好的密钥将保存在文件key1.data中。

```java
import java.io.*;
import javax.crypto.*;
public class Skey_DES{ 
    public static void main(String args[]) throws Exception{
        KeyGenerator kg=KeyGenerator.getInstance("DESede");
        kg.init(168); 
        SecretKey k=kg.generateKey( );
        FileOutputStream  f=new FileOutputStream("key1.dat");
        ObjectOutputStream b=new  ObjectOutputStream(f);
        b.writeObject(k);
    }
}
```

运行java Skey_DES，在当前目录下将生成文件 `key1.dat`，其中包含的密钥可以用于使用Triple-DES算法的加密和解密。

上面的示例将密钥通过对象序列化方式保存在文件中，在文件中保存的是对象，本实例以另一种方式保存在文件中，即以字节保存在文件中。

Java中所有的密钥类都有一个 `getEncoded()`方法，通过它可以从密钥对象中获取主要编码格式，其返回值是字节数组。其主要步骤为：

__读取密钥__

```java
FileInputStream f=new FileInputStream("key1.dat");
ObjectInputStream b=new ObjectInputStream(f);
Key k=(Key)b.readObject( );
```

分析：首先创建文件输入流，然后将其作为参数传递给对象输入流，最后执行对象输入流的 `readObject()` 方法读取密钥对象。由于 `readObject()`返回的是Object类型，因此需要强制转换成Key类型。

__获取主要编码格式__

    byte[] kb=k.getEncoded( );

分析：执行SecretKey类型的对象k的getEncoded( )方法，返回的编码放在byte类型的数组中。

__保存密钥编码格式__

```java
FileOutputStream f2=new FileOutputStream("keykb1.dat");  
f2.write(kb);
```

分析：先创建文件输出流对象，在其参数中指定文件名，如keykb1.dat。然后执行文件输出流的write( )方法将第2步中得到的字节数组中的内容写入文件。

```java
import java.io.*;
import java.security.*;
public class Skey_kb{
    public static void main(String args[]) throws Exception{
        FileInputStream f=new FileInputStream("key1.dat");
        ObjectInputStream b=new ObjectInputStream(f);
        Key k=(Key)b.readObject( );
        byte[ ] kb=k.getEncoded( );
        FileOutputStream  f2=new FileOutputStream("keykb1.dat");
       f2.write(kb);
        // 打印密钥编码中的内容
        for(int i=0;i<kb.length;i++){
                 System.out.print(kb[i]+",");
        }
   }
}
```

程序中在保存了密钥编码后，又使用循环语句将字节数组中的内容打印出来。这样可以较为直观地看到密钥编码的内容。

运行程序

输入java Skey_kb 运行程序，在程序的当前目录中将产生文件名为keykb1.dat的文件，屏幕输出如下：

> 11,-105,-119,50,4,-105,16,38,-14,-111,21,-95,70,-15,76,-74,67,-88,59,-71,55,-125,104,42,

此即程序中创建的密钥的编码内容，如果用文本编辑器打开keykb1.dat，看到的不是上面的数字而是类似下面的字符：

> 棄2 ?&驊 馤禖??僪*

这是因为keykb1.dat是一个二进制文件，存放的是任意二进制数。

读者运行时肯定结果和上面会有所不同,每次运行时生成的密钥都不会相同，这就保证了密钥的唯一性。作为对称密钥，只要保证若加密某段文字用的是某个密钥，则解密这段密文时用同样的密钥即可。

### 使用对称密钥进行加密和解密

本实例的输入是面生成并以对象方式保存在文件key1.dat中的密钥，以及需要加密的一段最简单的字符串"Hello World!"，使用密钥对"Hello World!"进行加密，加密后的信息保存在文件中。

首先要从文件中获取已经生成的密钥，然后考虑如何使用密钥进行加密。这涉及到各种算法。Java中已经提供了常用的加密算法，我们执行Java中Cipher类的各个方法就可以完成加密过程，其主要步骤为：

#### 从文件中获取密钥

```java
FileInputStream f=new FileInputStream("key1.dat");  
ObjectInputStream b=new ObjectInputStream(f);  
Key k=(Key)b.readObject( );
```

#### 创建密码器（Cipher对象）  

    Cipher cp=Cipher.getInstance("DESede");

分析：和KeyGenerator类一样，Cipher类是一个工厂类，它不是通过new方法创建对象，而是通过其中预定义的一个静态方法 `getInstance()`获取Cipher对象。

`getInstance()` 方法的参数是一个字符串，该字符串给出Cipher对象应该执行哪些操作，因此把传入的字符串称为转换（transformation）。通常通过它指定加密算法或解密所用的算法的名字，如本例的"DESede"。此外还可以同时指定反馈模式及填充方案等，如 "DESede/ECB/PKCS5Padding"。

#### 初始化密码器  

    cp.init(Cipher.ENCRYPT_MODE, k);  

分析：该步骤执行Cipher对象的`init()`方法对Cipher对象进行初始化。该方法包括两个参数，第一个参数指定密码器准备进行加密还是解密，若传入 `Cipher.ENCRYPT_MODE` 则进入加密模式。第二个参数则传入加密或解密所使用的密钥，即第1步从文件中读取的密钥对象k。

#### 获取等待加密的明文

```java
String s="Hello World!";
byte ptext[]=s.getBytes("UTF8");
```
分析：Cipher对象所作的操作是针对字节数组的，因此需要将要加密的内容转换成字节数组。本例中要加密的是一个字符串s，可以使用字符串的 `getBytes()` 方法获得对应的字节数组。`getBytes()` 方法中必须使用参数"UTF8"指定。

（5） 执行加密

```hljs
byte ctext[]=cp.doFinal(ptext);
```

分析：执行Cipher对象的doFinal( )方法，该方法的参数中传入待加密的明文，从而按照前面几步设置的算法及各种模式对所传入的明文进行加密操作，该方法返回加密的结果。

（6） 处理加密结果

```hljs
FileOutputStream f2=new FileOutputStream("SEnc.dat");
f2.write(ctext);
```

分析：第5步得到的加密结果是字节数组，对其可作各种处理，如在网上传递、保存在文件中等。这里将其保存在文件Senc.dat中。

```hljs
import java.io.*;
import java.security.*;
import javax.crypto.*;
public class SEnc{
   public static void main(String args[]) throws Exception{
     String s="Hello World!";
    FileInputStream f=new FileInputStream("key1.dat");
    ObjectInputStream b=new ObjectInputStream(f);
    Key k=(Key)b.readObject( );
        Cipher cp=Cipher.getInstance("DESede");
        cp.init(Cipher.ENCRYPT_MODE, k);
        byte ptext[]=s.getBytes("UTF8");
        for(int i=0;i<ptext.length;i++){
            System.out.print(ptext[i]+",");
        }
        System.out.println("");
        byte ctext[]=cp.doFinal(ptext);
        for(int i=0;i<ctext.length;i++){
             System.out.print(ctext[i] +",");
        }
        FileOutputStream f2=new FileOutputStream("SEnc.dat");
        f2.write(ctext);
   }
}
```

程序中使用两个循环语句将字节数组加密前后加密后的内容打印出来，可作为对比。

当前目录下必须有前面生成的密钥文件key1.dat，

输入java SEnc运行程序，在程序的当前目录中将产生文件名为SEnc.dat的文件，屏幕输出如下：

```hljs
72,101,108,108,111,32,87,111,114,108,100,33,
-57,119,0,-45,-9,23,37,-56,-60,-34,-99,105,99,113,-17,76,
```

其中第一行为字符串"Hello World!"的字节数组编码方式，第二行为加密后的内容，第二行的内容会随着密钥的不同而不同。

第一行的内容没有加过密，任何人若得到第一行数据，只要将其用二进制方式写入文本文件，用文本编辑器打开文件就可以看到对应的字符串“Hello World!”。而第二行的内容由于是加密过的，没有密钥的人即使得到第二行的内容也无法知道其内容。

密文同时保存在SEnc.dat文件中，将其提供给需要的人时，需要同时提供加密时使用的密钥（key1.dat，或keykb1.dat），这样收到SEnc.dat中密文的人才能够解密文件中的内容。

前面加密后的密文SEnc.dat，以及加密时所使用的密钥key1.dat或keykb1.dat，本实例对SEnc.dat中的密文进行解密，得到明文。

首先要从文件中获取加密时使用的密钥，然后考虑如何使用密钥进行解密。其主要步骤为：

（1） 获取密文

```hljs
FileInputStream f=new FileInputStream("SEnc.dat");
        int num=f.available();
        byte[ ] ctext=new byte[num];          
        f.read(ctext);
```

分析：密文存放在文件SEnc.dat中，由于解密是针对字节数组进行操作的，因此要先将密文从文件中读入字节数组。首先创建文件输入流，然后使用文件输入流的available( )方法判断密文将占用多少字节，从而创建相应大小的字节数组ctext，最后使用文件输入流的read( )方法一次性读入数组ctext。

（2） 获取密钥

```hljs
FileInputStream  f2=new FileInputStream("keykb1.dat");
int num2=f2.available();
byte[ ] keykb=new byte[num2];          
f2.read(keykb);
SecretKeySpec k=new  SecretKeySpec(keykb,"DESede");
```

SecretKeySpec类的构造器中第2个参数则指定加密算法。由于keykb1.dat中的密钥原来使用的是DESede算法，因此这里仍旧使用字符串“DESede”作为参数。

（3） 创建密码器（Cipher对象）

Cipher cp=Cipher.getInstance("DESede");

（4） 初始化密码器  
cp.init(Cipher.DECRYPT_MODE, k);

（5） 执行解密

byte []ptext=cp.doFinal(ctext);

```hljs
import java.io.*;
import java.security.*;
import javax.crypto.*;
import javax.crypto.spec.*;
public class SDec{
   public static void main(String args[]) throws Exception{
        // 获取密文
        FileInputStream f=new FileInputStream("SEnc.dat");
        int num=f.available();
        byte[ ] ctext=new byte[num];          
        f.read(ctext);
        // 获取密钥
        FileInputStream  f2=new FileInputStream("keykb1.dat");
        int num2=f2.available();
        byte[ ] keykb=new byte[num2];          
        f2.read(keykb);
        SecretKeySpec k=new  SecretKeySpec(keykb,"DESede");
        // 解密
        Cipher cp=Cipher.getInstance("DESede");
        cp.init(Cipher.DECRYPT_MODE, k);
        byte []ptext=cp.doFinal(ctext);
         // 显示明文
        String p=new String(ptext,"UTF8");
        System.out.println(p);
   }
}
```

程序中最后将明文生成字符串加以显示。

运行程序

当前目录下必须有前面生成的密钥文件keykb1.dat，以及密文文件SEnc.dat。

输入java SDec运行程序，将输出明文字符串“Hello World!”。

## Java非对称加密-RSA算法

下面演示如何使用Java中定义好的类创建RSA公钥和私钥。

Java的KeyPairGenerator类提供了一些方法来创建密钥对以便用于非对称加密，密钥对创建好后封装在KeyPair类型的对象中，在KeyPair类中提供了获取公钥和私钥的方法。具体步骤如下：

（1） 创建密钥对生成器  
KeyPairGenerator kpg=KeyPairGenerator.getInstance("RSA");  
分析：密钥对生成器即KeyPairGenerator类型的对象，和2.2.1小节的第1步中介绍的KeyGenerator类一样，KeyPairGenerator类是一个工厂类，它通过其中预定义的一个静态方法`getInstance()`获取KeyPairGenerator类型的对象。`getInstance()`方法的参数是一个字符串，指定非对称加密所使用的算法，常用的有RSA，DSA等。

（2） 初始化密钥生成器  
kpg.initialize(1024);  
分析：对于密钥长度。对于RSA算法，这里指定的其实是RSA算法中所用的模的位数。可以在512到2048之间。

（3） 生成密钥对  
KeyPair kp=kpg.genKeyPair( );  
分析：使用KeyPairGenerator类的genKeyPair( )方法生成密钥对，其中包含了一对公钥和私钥的信息。

（4） 获取公钥和私钥  
PublicKey pbkey=kp.getPublic( );  
PrivateKey prkey=kp.getPrivate( );  
分析：使用KeyPair类的getPublic( )和getPrivate( )方法获得公钥和私钥对象。

```hljs
import java.io.*;
import java.security.*;
import javax.crypto.*;
import javax.crypto.spec.*;

public class Skey_RSA{
   public static void main(String args[]) throws Exception{
        KeyPairGenerator kpg=KeyPairGenerator.getInstance("RSA");
        kpg.initialize(1024);
        KeyPair kp=kpg.genKeyPair();
        PublicKey pbkey=kp.getPublic();
        PrivateKey prkey=kp.getPrivate();
        //  保存公钥        
        FileOutputStream  f1=new FileOutputStream("Skey_RSA_pub.dat");
        ObjectOutputStream b1=new  ObjectOutputStream(f1);
b1.writeObject(pbkey);
        //  保存私钥
        FileOutputStream  f2=new FileOutputStream("Skey_RSA_priv.dat");
        ObjectOutputStream b2=new  ObjectOutputStream(f2);
b2.writeObject(prkey);
   }
}
```

分析：使用对象流将密钥保存在文件中，加密所用的公钥和解密所用的私钥分开保存。将公钥对外公布，供其他人加密使用，而把私钥秘密保存，在需要解密时使用。

运行程序

输入java Skey_RSA运行程序，当前目录下将生成两个文件：Skey_RSA_pub.dat和Skey_RSA_priv.dat，前者保存着公钥，后者保存着私钥。将文件Skey_RSA_pub.dat对外公布（如放在Web服务器上给大家下载，或者直接拷贝给所有需要的人），而Skey_RSA_priv.dat秘密保存。

以加密一串最简单的字符串“Hello World!”为例，演示了如何使用上面生成的RSA公钥文件Skey_RSA_pub.dat进行加密。

编程思路：

使用RSA公钥进行加密的代码和使用DESede进行加密其实没什么大的区别，只是Cipher类的getInstance( )方法的参数中应该指定使用RSA。但由于J2SDK1.4中只实现了RSA密钥的创建，没有实现RSA算法，因此需要安装其他加密提供者软件才能直接使用Cipher类执行加密解密。其实有了RSA公钥和私钥后，自己编写程序从底层实现RSA算法也并不复杂。本实例给出简单的例子实现了RSA加密，使读者只使用J2SDK1.4便能直观地了解非对称加密算法。

RSA算法是使用整数进行加密运算的，在RSA公钥中包含了两个信息：公钥对应的整数e和用于取模的整数n。对于明文数字m，计算密文的公式是：me mod n。因此，编程步骤如下：

（1） 获取公钥

```hljs
FileInputStream f=new FileInputStream("Skey_RSA_pub.dat");
      ObjectInputStream b=new ObjectInputStream(f);
      RSAPublicKey  pbk=(RSAPublicKey)b.readObject( );
```

分析： 从公钥文件Skey_RSA_pub.dat中读取公钥，由于生成使用的是RSA算法，因此从文件读取公钥对象后强制转换为RSAPublicKey类型，以便后面读取RSA算法所需要的参数。

（2） 获取公钥的参数(e, n)  
BigInteger e=pbk.getPublicExponent();  
BigInteger n=pbk.getModulus();  
分析：使用RSAPublicKey类的getPublicExponent( )和getModulus( )方法可以分别获得公始中e和n的值。由于密钥很长，因此对应的整数值非常大，无法使用一般的整型来存储，Java中定义了BigInteger类来存储这类很大的整数并可进行各种运算。

（3） 获取明文整数(m)  
String s="Hello World!";  
byte ptext[]=s.getBytes("UTF8");  
BigInteger m=new BigInteger(ptext);

分析：明文是一个字符串，为了用整数表达这个字符串，先使用字符串的getBytes( )方法将其转换为byte类型数组，它其实是字符串中各个字符的二进制表达方式，这一串二进制数转换为一个整数将非常大，因此仍旧使用BigInteger类将这个二进制串转换为整型。  
本实例中出于简化，将整个字符串转换为一个整数。实际使用中，应该对明文进行分组，因为RSA算法要求整型数m的值必须小于n。

（4） 执行计算  
BigInteger c=m.modPow(e,n);  
分析：计算前面的公式：me mod n。BigInteger类中已经提供了方法modPow( )来执行这个计算。底数m执行这个方法，方法modPow( )的第一个参数即指数e，第二个参数即模n。方法返回的结果即公式me mod n的计算结果，即密文。

```hljs
import java.security.*;
import java.security.spec.*;
import javax.crypto.*;
import javax.crypto.spec.*;
import javax.crypto.interfaces.*;
import java.security.interfaces.*;
import java.math.*;
import java.io.*;
public class Enc_RSA{
   public static void main(String args[]) throws Exception{
        String s="Hello World!";
        // 获取公钥及参数e,n
        FileInputStream f=new FileInputStream("Skey_RSA_pub.dat");
        ObjectInputStream b=new ObjectInputStream(f);
        RSAPublicKey  pbk=(RSAPublicKey)b.readObject( );
        BigInteger e=pbk.getPublicExponent();
        BigInteger n=pbk.getModulus();
        System.out.println("e= "+e);
        System.out.println("n= "+n);
        // 明文 m
        byte ptext[]=s.getBytes("UTF8");
        BigInteger m=new BigInteger(ptext);
        // 计算密文c,打印
        BigInteger c=m.modPow(e,n);
        System.out.println("c= "+c);
       // 保存密文
        String cs=c.toString( );
        BufferedWriter out= 
             new BufferedWriter(new OutputStreamWriter(
                new FileOutputStream("Enc_RSA.dat")));
        out.write(cs,0,cs.length( ));
        out.close( );

   }
}
```

程序最后将密文c打印出来，并以字符串形式保存在文件中。

运行程序

输入java Enc_RSA运行程序，得到如下结果：

其中显示了公钥中的参数以及加密的结果c，这些都是很大的整数，n和c多达上百位。程序运行后密文c以字符串形式保存在文件Enc_RSA.dat中。

下面实例使用私钥文件Skey_RSA_priv.dat，对密文文件Enc_RSA.dat进行解密。

* 编程思路：

使用RSA私钥进行解密的代码也可以在Cipher类的getInstance( )方法的参数中指定使用RSA，使用解密模式进行解密。但需要安装其他加密提供者软件才能直接使用Cipher类执行加密解密。本实例给出简单的例子从底层实现RSA解密，以便只使用J2SDK1.4便能直观地了解非对称加密算法。  
RSA算法的解密和加密类似，在RSA私钥中包含了两个信息：私钥对应的整数d和用于取模的整数n。其中的n和加密时的n完全相同。对于密文数字c，计算明文的公式是：cd mod n，之所以加密时由公式me mod n得到的密文c通过这个公式计算一下就可以反过来得到原来的明文m，有其本身的数学规律决定。从编程角度只需要知道这个结果就行了。编程步骤如下：

（1） 读取密文

```hljs
BufferedReader in= 
          new BufferedReader(new InputStreamReader(
new FileInputStream("Enc_RSA.dat")));
String ctext=in.readLine();
BigInteger c=new BigInteger(ctext);
```

分析： 从密文文件Enc_RSA.dat中读取密文，由于保存的只是一行字符串，因此只要一条readLine( )语句即可。由于这一行字符串表示的是一个很大的整型数，因此使用BigInteger类来表示这个整型数。

（2） 获取私钥

```hljs
FileInputStream f=new FileInputStream("Skey_RSA_priv.dat");
ObjectInputStream b=new ObjectInputStream(f);
RSAPrivateKey prk=(RSAPrivateKey)b.readObject( );
```

分析： 从私钥文件Skey_RSA_priv.dat中读取公钥，由于使用的是RSA算法，因此从文件读取公钥对象后强制转换为RSAPrivateKey类型，以便后面读取RSA算法所需要的参数。

（3） 获取私钥的参数(d, n)

```hljs
BigInteger d=prk.getPrivateExponent( );
BigInteger n=prk.getModulus( );
```

分析：使用RSAPrivateKey类的getPrivateExponent( )和getModulus( )方法可以分别获得公始中d和n的值。

（4） 执行计算

BigInteger m=c.modPow(d,n);

分析：使用BigInteger的modPow( )方法计算前面的公式：cd mod n。方法返回的结果即公式cd mod n的计算结果，即明文对应的整型数m。

（5） 计算明文整型数对应的字符串

```hljs
byte[] mt=m.toByteArray();
for(int i=0;i<mt.length;i++){
       System.out.print((char) mt[i]);
}
```

分析：RSA算法解密的结果m是一个很大的整数，为了计算出其对应的字符串的值，先使用BigInteger类的toByteArray( )方法得到代表该整型数的字节数组，然后将数组中每个元素转换为字符，组成字符串。

```hljs
import java.security.*;
import java.security.spec.*;
import javax.crypto.*;
import javax.crypto.spec.*;
import javax.crypto.interfaces.*;
import java.security.interfaces.*;
import java.math.*;
import java.io.*;
public class Dec_RSA{
   public static void main(String args[]) throws Exception{
       //读取密文
        BufferedReader in= 
                new BufferedReader(new InputStreamReader(
new FileInputStream("Enc_RSA.dat")));
        String ctext=in.readLine();
        BigInteger c=new BigInteger(ctext);
       //读取私钥
        FileInputStream f=new FileInputStream("Skey_RSA_priv.dat");
        ObjectInputStream b=new ObjectInputStream(f);
        RSAPrivateKey prk=(RSAPrivateKey)b.readObject( );
        BigInteger d=prk.getPrivateExponent();
       //获取私钥参数及解密 
        BigInteger n=prk.getModulus();
        System.out.println("d= "+d);
        System.out.println("n= "+n);
        BigInteger m=c.modPow(d,n);
       //显示解密结果
        System.out.println("m= "+m);
        byte[] mt=m.toByteArray();
        System.out.println("PlainText is ");
        for(int i=0;i<mt.length;i++){
             System.out.print((char) mt[i]);
       }
    }
}
```

运行程序输入java Dec_RSA运行程序，得到如下结果：

其中显示了私钥中的参数以及解密的结果，其中整型的明文转换后显示出字符串“Hello World!”。

## 使用密钥协定创建共享密钥

非对称加密解决了密钥分发的难题，但其计算量比对称密钥大，因此一般并不使用非对称加密加密大量数据。常见的做法是：主要数据通过对称密钥加密，而使用非对称加密来分发对称密钥，这样就将两者的优势结合了起来。

例如若A和B之间想秘密传送大量数据，一方（如A）先创建公私钥对，公钥对外公布，另一方（如B）创建对称密钥，然后使用A的公钥加密对称密钥，传递给A，A收到后用自己的私钥解密，得到对称密钥，以后A和B之间就可以使用对称密钥加密通信了。

除了这种方式以外，还可以使用密钥协定来交换对称密钥。执行密钥协定的标准算法是DH算法（Diffie-Hellman算法），本节介绍在Java中如何使用DH算法来交换共享密钥。

* 创建DH公钥和私钥

DH算法是建立在DH公钥和私钥的基础上的， A需要和B共享密钥时，A和B各自生成DH公钥和私钥，公钥对外公布而私钥各自秘密保存。本实例将介绍Java中如何创建并部署DH公钥和私钥，以便后面一小节利用它创建共享密钥。

程思路：

和上面使用KeyPairGenerator类创建RSA公钥和私钥类似，只是其参数中指定“DH”，此外在初始化时需要为DH指定特定的参数。

代码与分析：

```hljs
import java.io.*;
import java.math.*;
import java.security.*;
import java.security.spec.*;
import javax.crypto.*;
import javax.crypto.spec.*;
import javax.crypto.interfaces.*;

public class Key_DH{
       //三个静态变量的定义从
// C:\j2sdk-1_4_0-doc\docs\guide\security\jce\JCERefGuide.html
// 拷贝而来
// The 1024 bit Diffie-Hellman modulus values used by SKIP
    private static final byte skip1024ModulusBytes[] = {
        (byte)0xF4, (byte)0x88, (byte)0xFD, (byte)0x58,
        (byte)0x4E, (byte)0x49, (byte)0xDB, (byte)0xCD,
        (byte)0x20, (byte)0xB4, (byte)0x9D, (byte)0xE4,
        (byte)0x91, (byte)0x07, (byte)0x36, (byte)0x6B,
        (byte)0x33, (byte)0x6C, (byte)0x38, (byte)0x0D,
        (byte)0x45, (byte)0x1D, (byte)0x0F, (byte)0x7C,
        (byte)0x88, (byte)0xB3, (byte)0x1C, (byte)0x7C,
        (byte)0x5B, (byte)0x2D, (byte)0x8E, (byte)0xF6,
        (byte)0xF3, (byte)0xC9, (byte)0x23, (byte)0xC0,
        (byte)0x43, (byte)0xF0, (byte)0xA5, (byte)0x5B,
        (byte)0x18, (byte)0x8D, (byte)0x8E, (byte)0xBB,
        (byte)0x55, (byte)0x8C, (byte)0xB8, (byte)0x5D,
        (byte)0x38, (byte)0xD3, (byte)0x34, (byte)0xFD,
        (byte)0x7C, (byte)0x17, (byte)0x57, (byte)0x43,
        (byte)0xA3, (byte)0x1D, (byte)0x18, (byte)0x6C,
        (byte)0xDE, (byte)0x33, (byte)0x21, (byte)0x2C,
        (byte)0xB5, (byte)0x2A, (byte)0xFF, (byte)0x3C,
        (byte)0xE1, (byte)0xB1, (byte)0x29, (byte)0x40,
        (byte)0x18, (byte)0x11, (byte)0x8D, (byte)0x7C,
        (byte)0x84, (byte)0xA7, (byte)0x0A, (byte)0x72,
        (byte)0xD6, (byte)0x86, (byte)0xC4, (byte)0x03,
        (byte)0x19, (byte)0xC8, (byte)0x07, (byte)0x29,
        (byte)0x7A, (byte)0xCA, (byte)0x95, (byte)0x0C,
        (byte)0xD9, (byte)0x96, (byte)0x9F, (byte)0xAB,
        (byte)0xD0, (byte)0x0A, (byte)0x50, (byte)0x9B,
        (byte)0x02, (byte)0x46, (byte)0xD3, (byte)0x08,
        (byte)0x3D, (byte)0x66, (byte)0xA4, (byte)0x5D,
        (byte)0x41, (byte)0x9F, (byte)0x9C, (byte)0x7C,
        (byte)0xBD, (byte)0x89, (byte)0x4B, (byte)0x22,
        (byte)0x19, (byte)0x26, (byte)0xBA, (byte)0xAB,
        (byte)0xA2, (byte)0x5E, (byte)0xC3, (byte)0x55,
        (byte)0xE9, (byte)0x2F, (byte)0x78, (byte)0xC7
    };
    // The SKIP 1024 bit modulus
    private static final BigInteger skip1024Modulus
              = new BigInteger(1, skip1024ModulusBytes);
    // The base used with the SKIP 1024 bit modulus
    private static final BigInteger skip1024Base = BigInteger.valueOf(2);
public static void main(String args[ ]) throws Exception{
    DHParameterSpec DHP=
new DHParameterSpec(skip1024Modulus,skip1024Base);

     KeyPairGenerator kpg= KeyPairGenerator.getInstance("DH");
     kpg.initialize(DHP);
     KeyPair kp=kpg.genKeyPair();

     PublicKey pbk=kp.getPublic();
     PrivateKey prk=kp.getPrivate();
     // 保存公钥
     FileOutputStream  f1=new FileOutputStream(args[0]);
     ObjectOutputStream b1=new  ObjectOutputStream(f1);
     b1.writeObject(pbk);
     // 保存私钥
     FileOutputStream  f2=new FileOutputStream(args[1]);
     ObjectOutputStream b2=new  ObjectOutputStream(f2);
     b2.writeObject(prk);
   }      
}
```

程序最后将公钥和私钥以对象流的形式保存在文件中，文件名通过命令行参数指定，第一个命令行参数对应的文件保存公钥，第二个命令行参数对应的文件保存私钥。

运行程序:

建立两个目录A和B，模拟需要秘密通信的A、B双方，由于DH算法需要A和B各自生成DH公钥和私钥，因此在这两个目录下都拷贝编译后文件Key_DH。

首先由A创建自己的公钥和私钥，即在A目录下输入“java Key_DH Apub.dat Apri.dat”运行程序，这时在目录A下将产生文件Apub.dat和Apri.dat，前者保存着A的公钥，后者保存着A的私钥。  
然后由B创建自己的公钥和私钥，即在B目录下输入“java Key_DH Bpub.dat Bpri.dat”运行程序，这时在目录B下将产生文件Bpub.dat和Bpri.dat，前者保存着B的公钥，后者保存着B的私钥。  
最后发布公钥，A将Apub.dat拷贝到B目录，B将Bpub.dat拷贝到A的目录。  
这样，A、B双方的DH公钥和私钥已经创建并部署完毕。

* 创建共享密钥

DH算法中，A可以用自己的密钥和B的公钥按照一定方法生成一个密钥，B也可以用自己的密钥和A的公钥按照一定方法生成一个密钥，由于一些数学规律，这两个密钥完全相同。这样，A和B间就有了一个共同的密钥可以用于各种加密。本实例介绍Java中在上一小节的基础上如何利用DH公钥和私钥各自创建共享密钥。

编程思路：

Java中KeyAgreement类实现了密钥协定，它使用init( )方法传入自己的私钥，使用doPhase（ ）方法传入对方的公钥，进而可以使用generateSecret( )方法生成共享的信息具体步骤如下：

（1） 读取自己的DH私钥和对方的DH公钥

```hljs
FileInputStream f1=new FileInputStream(args[0]);
ObjectInputStream b1=new ObjectInputStream(f1);
PublicKey  pbk=(PublicKey)b1.readObject( );
FileInputStream f2=new FileInputStream(args[1]);
ObjectInputStream b2=new ObjectInputStream(f2);
PrivateKey  prk=(PrivateKey)b2.readObject( );
```

分析：从文件中获取密钥。只是分为公钥和私钥两个文件，通过命令行参数传入公钥和私钥文件名，第一个命令行参数为对方的公钥文件名，第二个命令行参数为自己的私钥文件名。

（2） 创建密钥协定对象

```hljs
KeyAgreement ka=KeyAgreement.getInstance("DH");
```

分析：密钥协定对象即KeyAgreement类型的对象，和KeyPairGenerator类类似，KeyAgreement类是一个工厂类，通过其中预定义的一个静态方法`getInstance()`获取KeyAgreement类型的对象。`getInstance()`方法的参数指定为“DH”。

（3） 初始化密钥协定对象

```hljs
ka.init(prk);
```

分析：执行密钥协定对象的init()方法，传入第1步获得的自己的私钥，它在第1步中通过第2个命令行参数提供。

（4） 执行密钥协定

```hljs
ka.doPhase(pbk,true);
```

分析：执行密钥协定对象的doPhase()方法，其第一个参数中传入对方的公钥。在本实例中，只有A、B两方需要共享密钥，因此对方只有一个，因此第二个参数设置为true。如果有A、B、C三方需要共享密钥，则对方有两个，doPhase（）方法要写两次，每次在第1个参数中传入一个公钥，第2个参数最初设置为false，最后一次设置为true。例如C方应该执行ka.doPhase(pbk_of_A,false); ka.doPhase(pbk_of_B,true);。一次类推，可以用密钥协定实现多方共享一个密钥。

（5） 生成共享信息

```hljs
byte[ ] sb=ka.generateSecret();
```

分析：执行密钥协定对象的generateSecret()方法，返回字节类型的数组。A、B双方得到的该数组的内容完全相同，用它创建密钥也各方完全相同。如可使用SecretKeySpec k=new SecretKeySpec(sb,"DESede");创建密钥。

代码与分析：

```hljs
import java.io.*;
import java.math.*;
import java.security.*;
import java.security.spec.*;
import javax.crypto.*;
import javax.crypto.spec.*;
import javax.crypto.interfaces.*;

public class KeyAgree{
   public static void main(String args[ ]) throws Exception{
      // 读取对方的DH公钥
      FileInputStream f1=new FileInputStream(args[0]);
      ObjectInputStream b1=new ObjectInputStream(f1);
      PublicKey  pbk=(PublicKey)b1.readObject( );
//读取自己的DH私钥
      FileInputStream f2=new FileInputStream(args[1]);
      ObjectInputStream b2=new ObjectInputStream(f2);
      PrivateKey  prk=(PrivateKey)b2.readObject( );
      // 执行密钥协定
     KeyAgreement ka=KeyAgreement.getInstance("DH");
     ka.init(prk);
     ka.doPhase(pbk,true);
     //生成共享信息
     byte[ ] sb=ka.generateSecret();
     for(int i=0;i<sb.length;i++){
        System.out.print(sb[i]+",");
     }
    SecretKeySpec k=new  SecretKeySpec(sb,"DESede")；
  }
}
```

程序最后将共享信息打印了出来，以便直观地对比A和B得到的信息是否相同。

将程序KeyAgree编译后分别拷贝在A和B两个目录，首先在A目录输入“java KeyAgree Bpub.dat Apri.dat”运行程序，它使用文件Bpub.dat中对方的公钥和文件Apri.dat中自己的私钥创建了一段共享的字节数组。

## Java摘要算法- MD5

使用Java计算指定字符串的消息摘要。  
java.security包中的MessageDigest类提供了计算消息摘要的方法，

首先生成对象，执行其update()方法可以将原始数据传递给该对象，然后执行其digest( )方法即可得到消息摘要。具体步骤如下：

（1） 生成MessageDigest对象  
MessageDigest m=MessageDigest.getInstance("MD5");  
分析：和2.2.1小节的KeyGenerator类一样。MessageDigest类也是一个工厂类，其构造器是受保护的，不允许直接使用new MessageDigist( )来创建对象，而必须通过其静态方法getInstance( )生成MessageDigest对象。其中传入的参数指定计算消息摘要所使用的算法，常用的有"MD5"，"SHA"等。若对MD5算法的细节感兴趣可参考http://www.ietf.org/rfc/rfc1321.txt。

（2） 传入需要计算的字符串  
m.update(x.getBytes("UTF8" ));  
分析：x为需要计算的字符串，update传入的参数是字节类型或字节类型数组，对于字符串，需要先使用getBytes( )方法生成字符串数组。

（3） 计算消息摘要  
byte s[ ]=m.digest( );  
分析：执行MessageDigest对象的digest( )方法完成计算，计算的结果通过字节类型的数组返回。

（4） 处理计算结果  
必要的话可以使用如下代码将计算结果s转换为字符串。

```hljs
String result="";
for (int i=0; i<s.length; i++){
       result+=Integer.toHexString((0x000000ff & s[i]) | 0xffffff00).substring(6);
  }
```

代码如下：

```hljs
import java.security.*;
public class DigestPass{
     public static void main(String args[ ]) throws Exception{
         String x=args[0];
         MessageDigest m=MessageDigest.getInstance("MD5");
         m.update(x.getBytes("UTF8"));
         byte s[ ]=m.digest( );
         String result="";
         for (int i=0; i<s.length; i++){
            result+=Integer.toHexString((0x000000ff & s[i]) | 
0xffffff00).substring(6);
         }
         System.out.println(result);
      }   
}
```

运行程序

输入java DigestCalc abc来运行程序，其中命令行参数abc是原始数据，屏幕输出计算后的消息摘要：900150983cd24fb0d6963f7d28e17f72。