layout: post
title: "Android Shell"
category : Android
tags : [android, adb, shell]
---

## 解决Window adb shell后中文显示乱码

See [adb 乱码显示解决方法 - 淅沥枫 - 博客园](http://www.cnblogs.com/xilifeng/archive/2013/03/15/2961456.html)


乱码原因:

> Android中使用的是UTF-8字符，而CMD默认字符集是ANSI，中文环境下即为GBK，

整体解决方法概括:

* 查看当前编码
* 更该编码,
* 更改字体.

### 乱码情况

[![乱码](http://images.cnitblog.com/blog/374803/201303/15145739-6dddfb8e567844289ebad9c27c1a9274.png "乱码")](http://images.cnitblog.com/blog/374803/201303/15145738-4f261c44a18a411ca529363aba6ad2d7.png)

### 对应的代码页

退出adb环境,输入chcp查看活动代码页,也就是查看当前的字符集:

[![image](http://images.cnitblog.com/blog/374803/201303/15145740-abdb9c93550d4a78b46f791a4b50e8d8.png "image")](http://images.cnitblog.com/blog/374803/201303/15145740-3f4110ce30344fc7876751fc52923f25.png)

输出为936

对比代码页表,可知936对应的字符编码集为简体中文(GB2312).

代码页|简称|全称
----|-------|-----------------------
37 | IBM037 | IBM EBCDIC (US-Canada) | 
437 | IBM437 | OEM United States | 
500 | IBM500 | IBM EBCDIC (International) | 
708 | ASMO-708 | Arabic (ASMO 708) | 
720 | DOS-720 | Arabic (DOS) | 
737 | ibm737 | Greek (DOS) | 
775 | ibm775 | Baltic (DOS) | 
850 | ibm850 | Western European (DOS) | 
852 | ibm852 | Central European (DOS) | 
855 | IBM855 | OEM Cyrillic | 
857 | ibm857 | Turkish (DOS) | 
858 | IBM00858 | OEM Multilingual Latin I | 
860 | IBM860 | Portuguese (DOS) | 
861 | ibm861 | Icelandic (DOS) | 
862 | DOS-862 | Hebrew (DOS) | 
863 | IBM863 | French Canadian (DOS) | 
864 | IBM864 | Arabic (864) | 
865 | IBM865 | Nordic (DOS) | 
866 | cp866 | Cyrillic (DOS) | 
869 | ibm869 | Greek, Modern (DOS) | 
870 | IBM870 | IBM EBCDIC (Multilingual Latin-2) | 
874 | windows-874 | Thai (Windows) | 
875 | cp875 | IBM EBCDIC (Greek Modern) | 
932 | shift_jis | Japanese (Shift-JIS) | 
**<span style="color: #ff0000;">936 | gb2312 | Chinese Simplified (GB2312) | * | </span>**  
949 | ks_c_5601-1987 | Korean | 
950 | big5 | Chinese Traditional (Big5) | 
1026 | IBM1026 | IBM EBCDIC (Turkish Latin-5) | 
1047 | IBM01047 | IBM Latin-1 | 
1140 | IBM01140 | IBM EBCDIC (US-Canada-Euro) | 
1141 | IBM01141 | IBM EBCDIC (Germany-Euro) | 
1142 | IBM01142 | IBM EBCDIC (Denmark-Norway-Euro) | 
1143 | IBM01143 | IBM EBCDIC (Finland-Sweden-Euro) | 
1144 | IBM01144 | IBM EBCDIC (Italy-Euro) | 
1145 | IBM01145 | IBM EBCDIC (Spain-Euro) | 
1146 | IBM01146 | IBM EBCDIC (UK-Euro) | 
1147 | IBM01147 | IBM EBCDIC (France-Euro) | 
1148 | IBM01148 | IBM EBCDIC (International-Euro) |  
1149 | IBM01149 | IBM EBCDIC (Icelandic-Euro) | 
1200 | utf-16 | Unicode | * |   
1201 | unicodeFFFE | Unicode (Big-Endian) | * |   
1250 | windows-1250 | Central European (Windows) | 
1251 | windows-1251 | Cyrillic (Windows) | 
1252 | Windows-1252 | Western European (Windows) | * |   
1253 | windows-1253 | Greek (Windows) | 
1254 | windows-1254 | Turkish (Windows) | 
1255 | windows-1255 | Hebrew (Windows) | 
1256 | windows-1256 | Arabic (Windows) | 
1257 | windows-1257 | Baltic (Windows) | 
1258 | windows-1258 | Vietnamese (Windows) | 
1361 | Johab | Korean (Johab) | 
10000 | macintosh | Western European (Mac) | 
10001 | x-mac-japanese | Japanese (Mac) | 
10002 | x-mac-chinesetrad | Chinese Traditional (Mac) | 
10003 | x-mac-korean | Korean (Mac) | * |   
10004 | x-mac-arabic | Arabic (Mac) | 
10005 | x-mac-hebrew | Hebrew (Mac) | 
10006 | x-mac-greek | Greek (Mac) | 
10007 | x-mac-cyrillic | Cyrillic (Mac) | 
10008 | x-mac-chinesesimp | Chinese Simplified (Mac) | * |   
10010 | x-mac-romanian | Romanian (Mac) | 
10017 | x-mac-ukrainian | Ukrainian (Mac) | 
10021 | x-mac-thai | Thai (Mac) | 
10029 | x-mac-ce | Central European (Mac) | 
10079 | x-mac-icelandic | Icelandic (Mac) | 
10081 | x-mac-turkish | Turkish (Mac) | 
10082 | x-mac-croatian | Croatian (Mac) | 
20000 | x-Chinese-CNS | Chinese Traditional (CNS) | 
20001 | x-cp20001 | TCA Taiwan | 
20002 | x-Chinese-Eten | Chinese Traditional (Eten) | 
20003 | x-cp20003 | IBM5550 Taiwan | 
20004 | x-cp20004 | TeleText Taiwan | 
20005 | x-cp20005 | Wang Taiwan | 
20105 | x-IA5 | Western European (IA5) | 
20106 | x-IA5-German | German (IA5) | 
20107 | x-IA5-Swedish | Swedish (IA5) | 
20108 | x-IA5-Norwegian | Norwegian (IA5) | 
20127 | us-ascii | US-ASCII | * |   
20261 | x-cp20261 | T.61 | 
20269 | x-cp20269 | ISO-6937 | 
20273 | IBM273 | IBM EBCDIC (Germany) | 
20277 | IBM277 | IBM EBCDIC (Denmark-Norway) | 
20278 | IBM278 | IBM EBCDIC (Finland-Sweden) | 
20280 | IBM280 | IBM EBCDIC (Italy) | 
20284 | IBM284 | IBM EBCDIC (Spain) | 
20285 | IBM285 | IBM EBCDIC (UK) | 
20290 | IBM290 | IBM EBCDIC (Japanese katakana) | 
20297 | IBM297 | IBM EBCDIC (France) | 
20420 | IBM420 | IBM EBCDIC (Arabic) | 
20423 | IBM423 | IBM EBCDIC (Greek) | 
20424 | IBM424 | IBM EBCDIC (Hebrew) | 
20833 | x-EBCDIC-KoreanExtended | IBM EBCDIC (Korean Extended) | 
20838 | IBM-Thai | IBM EBCDIC (Thai) | 
20866 | koi8-r | Cyrillic (KOI8-R) | 
20871 | IBM871 | IBM EBCDIC (Icelandic) | 
20880 | IBM880 | IBM EBCDIC (Cyrillic Russian) | 
20905 | IBM905 | IBM EBCDIC (Turkish) | 
20924 | IBM00924 | IBM Latin-1 | 
20932 | EUC-JP | Japanese (JIS 0208-1990 and 0212-1990) | 
20936 | x-cp20936 | Chinese Simplified (GB2312-80) | * |   
20949 | x-cp20949 | Korean Wansung | * |   
21025 | cp1025 | IBM EBCDIC (Cyrillic Serbian-Bulgarian) | 
21866 | koi8-u | Cyrillic (KOI8-U) | 
28591 | iso-8859-1 | Western European (ISO) | * |   
28592 | iso-8859-2 | Central European (ISO) | 
28593 | iso-8859-3 | Latin 3 (ISO) | 
28594 | iso-8859-4 | Baltic (ISO) | 
28595 | iso-8859-5 | Cyrillic (ISO) | 
28596 | iso-8859-6 | Arabic (ISO) | 
28597 | iso-8859-7 | Greek (ISO) | 
28598 | iso-8859-8 | Hebrew (ISO-Visual) | * |   
28599 | iso-8859-9 | Turkish (ISO) | 
28603 | iso-8859-13 | Estonian (ISO) | 
28605 | iso-8859-15 | Latin 9 (ISO) | 
29001 | x-Europa | Europa | 
38598 | iso-8859-8-i | Hebrew (ISO-Logical) | * |   
50220 | iso-2022-jp | Japanese (JIS) | * |   
50221 | csISO2022JP | Japanese (JIS-Allow 1 byte Kana) | * |   
50222 | iso-2022-jp | Japanese (JIS-Allow 1 byte Kana - SO/SI) | * |   
50225 | iso-2022-kr | Korean (ISO) | * |   
50227 | x-cp50227 | Chinese Simplified (ISO-2022) | * |   
51932 | euc-jp | Japanese (EUC) | * |   
51936 | EUC-CN | Chinese Simplified (EUC) | * |   
51949 | euc-kr | Korean (EUC) | * |   
52936 | hz-gb-2312 | Chinese Simplified (HZ) | * |   
54936 | GB18030 | Chinese Simplified (GB18030) | * |   
57002 | x-iscii-de | ISCII Devanagari | * |   
57003 | x-iscii-be | ISCII Bengali | * |   
57004 | x-iscii-ta | ISCII Tamil | * |   
57005 | x-iscii-te | ISCII Telugu | * |   
57006 | x-iscii-as | ISCII Assamese | * |   
57007 | x-iscii-or | ISCII Oriya | * |   
57008 | x-iscii-ka | ISCII Kannada | * |   
57009 | x-iscii-ma | ISCII Malayalam | * |   
57010 | x-iscii-gu | ISCII Gujarati | * |   
57011 | x-iscii-pa | ISCII Punjabi | * |   
65000 | utf-7 | Unicode (UTF-7) | * |   
65001 | utf-8 | Unicode (UTF-8) | * |   
65005 | utf-32 | Unicode (UTF-32) | * |   
65006 | utf-32BE | Unicode (UTF-32 Big-Endian) | *   

### 更改代码集

    chcp 65001 
    //更改代码集为UTF-8.

[![image](http://images.cnitblog.com/blog/374803/201303/15145742-166bee72384e4004b381fd591aa0c85a.png "image")](http://images.cnitblog.com/blog/374803/201303/15145741-acc83a78d174440d8c509d7ca8e53bd1.png)

### 查看乱码

进入adb,查看是否为乱码:

[![image](http://images.cnitblog.com/blog/374803/201303/15145743-68e4b4f4b77c48358169ceeb6a2dc316.png "image")](http://images.cnitblog.com/blog/374803/201303/15145742-8bb4363488494975b3bee5167709d4ab.png)

### 查看字体设置

仍为乱码,但乱码已经不同了.查看字体设置:

[![image](http://images.cnitblog.com/blog/374803/201303/15145745-c6cc3e48929d44abbed847d91381a04a.png "image")](http://images.cnitblog.com/blog/374803/201303/15145744-d4be03904d58435db8f7beeaa24af0d7.png)

### 更改字体

更改字体为"Lucida Console"

[![image](http://images.cnitblog.com/blog/374803/201303/15145746-6cce7e2a38944ba2b0af579e2f9a0a1e.png "image")](http://images.cnitblog.com/blog/374803/201303/15145745-71a04a18c997440382a7028d71269192.png)

重新ls,查看效果:

[![image](http://images.cnitblog.com/blog/374803/201303/15145748-6dea16e7f0f2439a8655fcb23bede015.png "image")](http://images.cnitblog.com/blog/374803/201303/15145747-2589788b5de64e6791b22913c0210d0c.png)

参考资料: <http://android.tgbus.com/Android/tutorial/201104/348715.shtml>