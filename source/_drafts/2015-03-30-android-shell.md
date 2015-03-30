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

------------代码页表-----------

代码页 简称 全称&nbsp;&nbsp;
   
37&nbsp; IBM037&nbsp; IBM EBCDIC (US-Canada)&nbsp; 
437&nbsp; IBM437&nbsp; OEM United States&nbsp; 
500&nbsp; IBM500&nbsp; IBM EBCDIC (International)&nbsp; 
708&nbsp; ASMO-708&nbsp; Arabic (ASMO 708)&nbsp; 
720&nbsp; DOS-720&nbsp; Arabic (DOS)&nbsp; 
737&nbsp; ibm737&nbsp; Greek (DOS)&nbsp; 
775&nbsp; ibm775&nbsp; Baltic (DOS)&nbsp; 
850&nbsp; ibm850&nbsp; Western European (DOS)&nbsp; 
852&nbsp; ibm852&nbsp; Central European (DOS)&nbsp; 
855&nbsp; IBM855&nbsp; OEM Cyrillic&nbsp; 
857&nbsp; ibm857&nbsp; Turkish (DOS)&nbsp; 
858&nbsp; IBM00858&nbsp; OEM Multilingual Latin I&nbsp; 
860&nbsp; IBM860&nbsp; Portuguese (DOS)&nbsp; 
861&nbsp; ibm861&nbsp; Icelandic (DOS)&nbsp; 
862&nbsp; DOS-862&nbsp; Hebrew (DOS)&nbsp; 
863&nbsp; IBM863&nbsp; French Canadian (DOS)&nbsp; 
864&nbsp; IBM864&nbsp; Arabic (864)&nbsp; 
865&nbsp; IBM865&nbsp; Nordic (DOS)&nbsp; 
866&nbsp; cp866&nbsp; Cyrillic (DOS)&nbsp; 
869&nbsp; ibm869&nbsp; Greek, Modern (DOS)&nbsp; 
870&nbsp; IBM870&nbsp; IBM EBCDIC (Multilingual Latin-2)&nbsp; 
874&nbsp; windows-874&nbsp; Thai (Windows)&nbsp; 
875&nbsp; cp875&nbsp; IBM EBCDIC (Greek Modern)&nbsp; 
932&nbsp; shift_jis&nbsp; Japanese (Shift-JIS)&nbsp; 
**<span style="color: #ff0000;">936&nbsp; gb2312&nbsp; Chinese Simplified (GB2312)&nbsp; *&nbsp; </span>**  
949&nbsp; ks_c_5601-1987&nbsp; Korean&nbsp; 
950&nbsp; big5&nbsp; Chinese Traditional (Big5)&nbsp; 
1026&nbsp; IBM1026&nbsp; IBM EBCDIC (Turkish Latin-5)&nbsp; 
1047&nbsp; IBM01047&nbsp; IBM Latin-1&nbsp; 
1140&nbsp; IBM01140&nbsp; IBM EBCDIC (US-Canada-Euro)&nbsp; 
1141&nbsp; IBM01141&nbsp; IBM EBCDIC (Germany-Euro)&nbsp; 
1142&nbsp; IBM01142&nbsp; IBM EBCDIC (Denmark-Norway-Euro)&nbsp; 
1143&nbsp; IBM01143&nbsp; IBM EBCDIC (Finland-Sweden-Euro)&nbsp; 
1144&nbsp; IBM01144&nbsp; IBM EBCDIC (Italy-Euro)&nbsp; 
1145&nbsp; IBM01145&nbsp; IBM EBCDIC (Spain-Euro)&nbsp; 
1146&nbsp; IBM01146&nbsp; IBM EBCDIC (UK-Euro)&nbsp; 
1147&nbsp; IBM01147&nbsp; IBM EBCDIC (France-Euro)&nbsp; 
1148&nbsp; IBM01148&nbsp; IBM EBCDIC (International-Euro)&nbsp;  
1149&nbsp; IBM01149&nbsp; IBM EBCDIC (Icelandic-Euro)&nbsp; 
1200&nbsp; utf-16&nbsp; Unicode&nbsp; *&nbsp;   
1201&nbsp; unicodeFFFE&nbsp; Unicode (Big-Endian)&nbsp; *&nbsp;   
1250&nbsp; windows-1250&nbsp; Central European (Windows)&nbsp; 
1251&nbsp; windows-1251&nbsp; Cyrillic (Windows)&nbsp; 
1252&nbsp; Windows-1252&nbsp; Western European (Windows)&nbsp; *&nbsp;   
1253&nbsp; windows-1253&nbsp; Greek (Windows)&nbsp; 
1254&nbsp; windows-1254&nbsp; Turkish (Windows)&nbsp; 
1255&nbsp; windows-1255&nbsp; Hebrew (Windows)&nbsp; 
1256&nbsp; windows-1256&nbsp; Arabic (Windows)&nbsp; 
1257&nbsp; windows-1257&nbsp; Baltic (Windows)&nbsp; 
1258&nbsp; windows-1258&nbsp; Vietnamese (Windows)&nbsp; 
1361&nbsp; Johab&nbsp; Korean (Johab)&nbsp; 
10000&nbsp; macintosh&nbsp; Western European (Mac)&nbsp; 
10001&nbsp; x-mac-japanese&nbsp; Japanese (Mac)&nbsp; 
10002&nbsp; x-mac-chinesetrad&nbsp; Chinese Traditional (Mac)&nbsp; 
10003&nbsp; x-mac-korean&nbsp; Korean (Mac)&nbsp; *&nbsp;   
10004&nbsp; x-mac-arabic&nbsp; Arabic (Mac)&nbsp; 
10005&nbsp; x-mac-hebrew&nbsp; Hebrew (Mac)&nbsp; 
10006&nbsp; x-mac-greek&nbsp; Greek (Mac)&nbsp; 
10007&nbsp; x-mac-cyrillic&nbsp; Cyrillic (Mac)&nbsp; 
10008&nbsp; x-mac-chinesesimp&nbsp; Chinese Simplified (Mac)&nbsp; *&nbsp;   
10010&nbsp; x-mac-romanian&nbsp; Romanian (Mac)&nbsp; 
10017&nbsp; x-mac-ukrainian&nbsp; Ukrainian (Mac)&nbsp; 
10021&nbsp; x-mac-thai&nbsp; Thai (Mac)&nbsp; 
10029&nbsp; x-mac-ce&nbsp; Central European (Mac)&nbsp; 
10079&nbsp; x-mac-icelandic&nbsp; Icelandic (Mac)&nbsp; 
10081&nbsp; x-mac-turkish&nbsp; Turkish (Mac)&nbsp; 
10082&nbsp; x-mac-croatian&nbsp; Croatian (Mac)&nbsp; 
20000&nbsp; x-Chinese-CNS&nbsp; Chinese Traditional (CNS)&nbsp; 
20001&nbsp; x-cp20001&nbsp; TCA Taiwan&nbsp; 
20002&nbsp; x-Chinese-Eten&nbsp; Chinese Traditional (Eten)&nbsp; 
20003&nbsp; x-cp20003&nbsp; IBM5550 Taiwan&nbsp; 
20004&nbsp; x-cp20004&nbsp; TeleText Taiwan&nbsp; 
20005&nbsp; x-cp20005&nbsp; Wang Taiwan&nbsp; 
20105&nbsp; x-IA5&nbsp; Western European (IA5)&nbsp; 
20106&nbsp; x-IA5-German&nbsp; German (IA5)&nbsp; 
20107&nbsp; x-IA5-Swedish&nbsp; Swedish (IA5)&nbsp; 
20108&nbsp; x-IA5-Norwegian&nbsp; Norwegian (IA5)&nbsp; 
20127&nbsp; us-ascii&nbsp; US-ASCII&nbsp; *&nbsp;   
20261&nbsp; x-cp20261&nbsp; T.61&nbsp; 
20269&nbsp; x-cp20269&nbsp; ISO-6937&nbsp; 
20273&nbsp; IBM273&nbsp; IBM EBCDIC (Germany)&nbsp; 
20277&nbsp; IBM277&nbsp; IBM EBCDIC (Denmark-Norway)&nbsp; 
20278&nbsp; IBM278&nbsp; IBM EBCDIC (Finland-Sweden)&nbsp; 
20280&nbsp; IBM280&nbsp; IBM EBCDIC (Italy)&nbsp; 
20284&nbsp; IBM284&nbsp; IBM EBCDIC (Spain)&nbsp; 
20285&nbsp; IBM285&nbsp; IBM EBCDIC (UK)&nbsp; 
20290&nbsp; IBM290&nbsp; IBM EBCDIC (Japanese katakana)&nbsp; 
20297&nbsp; IBM297&nbsp; IBM EBCDIC (France)&nbsp; 
20420&nbsp; IBM420&nbsp; IBM EBCDIC (Arabic)&nbsp; 
20423&nbsp; IBM423&nbsp; IBM EBCDIC (Greek)&nbsp; 
20424&nbsp; IBM424&nbsp; IBM EBCDIC (Hebrew)&nbsp; 
20833&nbsp; x-EBCDIC-KoreanExtended&nbsp; IBM EBCDIC (Korean Extended)&nbsp; 
20838&nbsp; IBM-Thai&nbsp; IBM EBCDIC (Thai)&nbsp; 
20866&nbsp; koi8-r&nbsp; Cyrillic (KOI8-R)&nbsp; 
20871&nbsp; IBM871&nbsp; IBM EBCDIC (Icelandic)&nbsp; 
20880&nbsp; IBM880&nbsp; IBM EBCDIC (Cyrillic Russian)&nbsp; 
20905&nbsp; IBM905&nbsp; IBM EBCDIC (Turkish)&nbsp; 
20924&nbsp; IBM00924&nbsp; IBM Latin-1&nbsp; 
20932&nbsp; EUC-JP&nbsp; Japanese (JIS 0208-1990 and 0212-1990)&nbsp; 
20936&nbsp; x-cp20936&nbsp; Chinese Simplified (GB2312-80)&nbsp; *&nbsp;   
20949&nbsp; x-cp20949&nbsp; Korean Wansung&nbsp; *&nbsp;   
21025&nbsp; cp1025&nbsp; IBM EBCDIC (Cyrillic Serbian-Bulgarian)&nbsp; 
21866&nbsp; koi8-u&nbsp; Cyrillic (KOI8-U)&nbsp; 
28591&nbsp; iso-8859-1&nbsp; Western European (ISO)&nbsp; *&nbsp;   
28592&nbsp; iso-8859-2&nbsp; Central European (ISO)&nbsp; 
28593&nbsp; iso-8859-3&nbsp; Latin 3 (ISO)&nbsp; 
28594&nbsp; iso-8859-4&nbsp; Baltic (ISO)&nbsp; 
28595&nbsp; iso-8859-5&nbsp; Cyrillic (ISO)&nbsp; 
28596&nbsp; iso-8859-6&nbsp; Arabic (ISO)&nbsp; 
28597&nbsp; iso-8859-7&nbsp; Greek (ISO)&nbsp; 
28598&nbsp; iso-8859-8&nbsp; Hebrew (ISO-Visual)&nbsp; *&nbsp;   
28599&nbsp; iso-8859-9&nbsp; Turkish (ISO)&nbsp; 
28603&nbsp; iso-8859-13&nbsp; Estonian (ISO)&nbsp; 
28605&nbsp; iso-8859-15&nbsp; Latin 9 (ISO)&nbsp; 
29001&nbsp; x-Europa&nbsp; Europa&nbsp; 
38598&nbsp; iso-8859-8-i&nbsp; Hebrew (ISO-Logical)&nbsp; *&nbsp;   
50220&nbsp; iso-2022-jp&nbsp; Japanese (JIS)&nbsp; *&nbsp;   
50221&nbsp; csISO2022JP&nbsp; Japanese (JIS-Allow 1 byte Kana)&nbsp; *&nbsp;   
50222&nbsp; iso-2022-jp&nbsp; Japanese (JIS-Allow 1 byte Kana - SO/SI)&nbsp; *&nbsp;   
50225&nbsp; iso-2022-kr&nbsp; Korean (ISO)&nbsp; *&nbsp;   
50227&nbsp; x-cp50227&nbsp; Chinese Simplified (ISO-2022)&nbsp; *&nbsp;   
51932&nbsp; euc-jp&nbsp; Japanese (EUC)&nbsp; *&nbsp;   
51936&nbsp; EUC-CN&nbsp; Chinese Simplified (EUC)&nbsp; *&nbsp;   
51949&nbsp; euc-kr&nbsp; Korean (EUC)&nbsp; *&nbsp;   
52936&nbsp; hz-gb-2312&nbsp; Chinese Simplified (HZ)&nbsp; *&nbsp;   
54936&nbsp; GB18030&nbsp; Chinese Simplified (GB18030)&nbsp; *&nbsp;   
57002&nbsp; x-iscii-de&nbsp; ISCII Devanagari&nbsp; *&nbsp;   
57003&nbsp; x-iscii-be&nbsp; ISCII Bengali&nbsp; *&nbsp;   
57004&nbsp; x-iscii-ta&nbsp; ISCII Tamil&nbsp; *&nbsp;   
57005&nbsp; x-iscii-te&nbsp; ISCII Telugu&nbsp; *&nbsp;   
57006&nbsp; x-iscii-as&nbsp; ISCII Assamese&nbsp; *&nbsp;   
57007&nbsp; x-iscii-or&nbsp; ISCII Oriya&nbsp; *&nbsp;   
57008&nbsp; x-iscii-ka&nbsp; ISCII Kannada&nbsp; *&nbsp;   
57009&nbsp; x-iscii-ma&nbsp; ISCII Malayalam&nbsp; *&nbsp;   
57010&nbsp; x-iscii-gu&nbsp; ISCII Gujarati&nbsp; *&nbsp;   
57011&nbsp; x-iscii-pa&nbsp; ISCII Punjabi&nbsp; *&nbsp;   
65000&nbsp; utf-7&nbsp; Unicode (UTF-7)&nbsp; *&nbsp;   
65001&nbsp; utf-8&nbsp; Unicode (UTF-8)&nbsp; *&nbsp;   
65005&nbsp; utf-32&nbsp; Unicode (UTF-32)&nbsp; *&nbsp;   
65006&nbsp; utf-32BE&nbsp; Unicode (UTF-32 Big-Endian)&nbsp; *   
代码页 简称 全称&nbsp;&nbsp;   
37&nbsp; IBM037&nbsp; IBM EBCDIC (US-Canada)&nbsp; 
437&nbsp; IBM437&nbsp; OEM United States&nbsp; 
500&nbsp; IBM500&nbsp; IBM EBCDIC (International)&nbsp; 
708&nbsp; ASMO-708&nbsp; Arabic (ASMO 708)&nbsp; 
720&nbsp; DOS-720&nbsp; Arabic (DOS)&nbsp; 
737&nbsp; ibm737&nbsp; Greek (DOS)&nbsp; 
775&nbsp; ibm775&nbsp; Baltic (DOS)&nbsp; 
850&nbsp; ibm850&nbsp; Western European (DOS)&nbsp; 
852&nbsp; ibm852&nbsp; Central European (DOS)&nbsp; 
855&nbsp; IBM855&nbsp; OEM Cyrillic&nbsp; 
857&nbsp; ibm857&nbsp; Turkish (DOS)&nbsp; 
858&nbsp; IBM00858&nbsp; OEM Multilingual Latin I&nbsp; 
860&nbsp; IBM860&nbsp; Portuguese (DOS)&nbsp; 
861&nbsp; ibm861&nbsp; Icelandic (DOS)&nbsp; 
862&nbsp; DOS-862&nbsp; Hebrew (DOS)&nbsp; 
863&nbsp; IBM863&nbsp; French Canadian (DOS)&nbsp; 
864&nbsp; IBM864&nbsp; Arabic (864)&nbsp; 
865&nbsp; IBM865&nbsp; Nordic (DOS)&nbsp; 
866&nbsp; cp866&nbsp; Cyrillic (DOS)&nbsp; 
869&nbsp; ibm869&nbsp; Greek, Modern (DOS)&nbsp; 
870&nbsp; IBM870&nbsp; IBM EBCDIC (Multilingual Latin-2)&nbsp; 
874&nbsp; windows-874&nbsp; Thai (Windows)&nbsp; 
875&nbsp; cp875&nbsp; IBM EBCDIC (Greek Modern)&nbsp; 
932&nbsp; shift_jis&nbsp; Japanese (Shift-JIS)&nbsp; 
936&nbsp; gb2312&nbsp; Chinese Simplified (GB2312)&nbsp; *&nbsp;   
949&nbsp; ks_c_5601-1987&nbsp; Korean&nbsp; 
950&nbsp; big5&nbsp; Chinese Traditional (Big5)&nbsp; 
1026&nbsp; IBM1026&nbsp; IBM EBCDIC (Turkish Latin-5)&nbsp; 
1047&nbsp; IBM01047&nbsp; IBM Latin-1&nbsp; 
1140&nbsp; IBM01140&nbsp; IBM EBCDIC (US-Canada-Euro)&nbsp; 
1141&nbsp; IBM01141&nbsp; IBM EBCDIC (Germany-Euro)&nbsp; 
1142&nbsp; IBM01142&nbsp; IBM EBCDIC (Denmark-Norway-Euro)&nbsp;  
1143&nbsp; IBM01143&nbsp; IBM EBCDIC (Finland-Sweden-Euro)&nbsp; 
1144&nbsp; IBM01144&nbsp; IBM EBCDIC (Italy-Euro)&nbsp; 
1145&nbsp; IBM01145&nbsp; IBM EBCDIC (Spain-Euro)&nbsp; 
1146&nbsp; IBM01146&nbsp; IBM EBCDIC (UK-Euro)&nbsp; 
1147&nbsp; IBM01147&nbsp; IBM EBCDIC (France-Euro)&nbsp; 
1148&nbsp; IBM01148&nbsp; IBM EBCDIC (International-Euro)&nbsp; 
1149&nbsp; IBM01149&nbsp; IBM EBCDIC (Icelandic-Euro)&nbsp; 
1200&nbsp; utf-16&nbsp; Unicode&nbsp; *&nbsp;   
1201&nbsp; unicodeFFFE&nbsp; Unicode (Big-Endian)&nbsp; *&nbsp;   
1250&nbsp; windows-1250&nbsp; Central European (Windows)&nbsp; 
1251&nbsp; windows-1251&nbsp; Cyrillic (Windows)&nbsp; 
1252&nbsp; Windows-1252&nbsp; Western European (Windows)&nbsp; *&nbsp;   
1253&nbsp; windows-1253&nbsp; Greek (Windows)&nbsp; 
1254&nbsp; windows-1254&nbsp; Turkish (Windows)&nbsp; 
1255&nbsp; windows-1255&nbsp; Hebrew (Windows)&nbsp; 
1256&nbsp; windows-1256&nbsp; Arabic (Windows)&nbsp; 
1257&nbsp; windows-1257&nbsp; Baltic (Windows)&nbsp; 
1258&nbsp; windows-1258&nbsp; Vietnamese (Windows)&nbsp; 
1361&nbsp; Johab&nbsp; Korean (Johab)&nbsp; 
10000&nbsp; macintosh&nbsp; Western European (Mac)&nbsp; 
10001&nbsp; x-mac-japanese&nbsp; Japanese (Mac)&nbsp; 
10002&nbsp; x-mac-chinesetrad&nbsp; Chinese Traditional (Mac)&nbsp; 
10003&nbsp; x-mac-korean&nbsp; Korean (Mac)&nbsp; *&nbsp;   
10004&nbsp; x-mac-arabic&nbsp; Arabic (Mac)&nbsp; 
10005&nbsp; x-mac-hebrew&nbsp; Hebrew (Mac)&nbsp; 
10006&nbsp; x-mac-greek&nbsp; Greek (Mac)&nbsp; 
10007&nbsp; x-mac-cyrillic&nbsp; Cyrillic (Mac)&nbsp; 
10008&nbsp; x-mac-chinesesimp&nbsp; Chinese Simplified (Mac)&nbsp; *&nbsp;   
10010&nbsp; x-mac-romanian&nbsp; Romanian (Mac)&nbsp; 
10017&nbsp; x-mac-ukrainian&nbsp; Ukrainian (Mac)&nbsp; 
10021&nbsp; x-mac-thai&nbsp; Thai (Mac)&nbsp; 
10029&nbsp; x-mac-ce&nbsp; Central European (Mac)&nbsp; 
10079&nbsp; x-mac-icelandic&nbsp; Icelandic (Mac)&nbsp; 
10081&nbsp; x-mac-turkish&nbsp; Turkish (Mac)&nbsp; 
10082&nbsp; x-mac-croatian&nbsp; Croatian (Mac)&nbsp; 
20000&nbsp; x-Chinese-CNS&nbsp; Chinese Traditional (CNS)&nbsp; 
20001&nbsp; x-cp20001&nbsp; TCA Taiwan&nbsp; 
20002&nbsp; x-Chinese-Eten&nbsp; Chinese Traditional (Eten)&nbsp; 
20003&nbsp; x-cp20003&nbsp; IBM5550 Taiwan&nbsp; 
20004&nbsp; x-cp20004&nbsp; TeleText Taiwan&nbsp; 
20005&nbsp; x-cp20005&nbsp; Wang Taiwan&nbsp; 
20105&nbsp; x-IA5&nbsp; Western European (IA5)&nbsp; 
20106&nbsp; x-IA5-German&nbsp; German (IA5)&nbsp; 
20107&nbsp; x-IA5-Swedish&nbsp; Swedish (IA5)&nbsp; 
20108&nbsp; x-IA5-Norwegian&nbsp; Norwegian (IA5)&nbsp; 
20127&nbsp; us-ascii&nbsp; US-ASCII&nbsp; *&nbsp;   
20261&nbsp; x-cp20261&nbsp; T.61&nbsp; 
20269&nbsp; x-cp20269&nbsp; ISO-6937&nbsp; 
20273&nbsp; IBM273&nbsp; IBM EBCDIC (Germany)&nbsp; 
20277&nbsp; IBM277&nbsp; IBM EBCDIC (Denmark-Norway)&nbsp; 
20278&nbsp; IBM278&nbsp; IBM EBCDIC (Finland-Sweden)&nbsp; 
20280&nbsp; IBM280&nbsp; IBM EBCDIC (Italy)&nbsp; 
20284&nbsp; IBM284&nbsp; IBM EBCDIC (Spain)&nbsp; 
20285&nbsp; IBM285&nbsp; IBM EBCDIC (UK)&nbsp; 
20290&nbsp; IBM290&nbsp; IBM EBCDIC (Japanese katakana)&nbsp; 
20297&nbsp; IBM297&nbsp; IBM EBCDIC (France)&nbsp; 
20420&nbsp; IBM420&nbsp; IBM EBCDIC (Arabic)&nbsp; 
20423&nbsp; IBM423&nbsp; IBM EBCDIC (Greek)&nbsp; 
20424&nbsp; IBM424&nbsp; IBM EBCDIC (Hebrew)&nbsp; 
20833&nbsp; x-EBCDIC-KoreanExtended&nbsp; IBM EBCDIC (Korean Extended)&nbsp; 
20838&nbsp; IBM-Thai&nbsp; IBM EBCDIC (Thai)&nbsp; 
20866&nbsp; koi8-r&nbsp; Cyrillic (KOI8-R)&nbsp; 
20871&nbsp; IBM871&nbsp; IBM EBCDIC (Icelandic)&nbsp; 
20880&nbsp; IBM880&nbsp; IBM EBCDIC (Cyrillic Russian)&nbsp; 
20905&nbsp; IBM905&nbsp; IBM EBCDIC (Turkish)&nbsp; 
20924&nbsp; IBM00924&nbsp; IBM Latin-1&nbsp; 
20932&nbsp; EUC-JP&nbsp; Japanese (JIS 0208-1990 and 0212-1990)&nbsp; 
20936&nbsp; x-cp20936&nbsp; Chinese Simplified (GB2312-80)&nbsp; *&nbsp;   
20949&nbsp; x-cp20949&nbsp; Korean Wansung&nbsp; *&nbsp;   
21025&nbsp; cp1025&nbsp; IBM EBCDIC (Cyrillic Serbian-Bulgarian)&nbsp; 
21866&nbsp; koi8-u&nbsp; Cyrillic (KOI8-U)&nbsp; 
28591&nbsp; iso-8859-1&nbsp; Western European (ISO)&nbsp; *&nbsp;   
28592&nbsp; iso-8859-2&nbsp; Central European (ISO)&nbsp; 
28593&nbsp; iso-8859-3&nbsp; Latin 3 (ISO)&nbsp; 
28594&nbsp; iso-8859-4&nbsp; Baltic (ISO)&nbsp; 
28595&nbsp; iso-8859-5&nbsp; Cyrillic (ISO)&nbsp; 
28596&nbsp; iso-8859-6&nbsp; Arabic (ISO)&nbsp; 
28597&nbsp; iso-8859-7&nbsp; Greek (ISO)&nbsp; 
28598&nbsp; iso-8859-8&nbsp; Hebrew (ISO-Visual)&nbsp; *&nbsp;   
28599&nbsp; iso-8859-9&nbsp; Turkish (ISO)&nbsp; 
28603&nbsp; iso-8859-13&nbsp; Estonian (ISO)&nbsp; 
28605&nbsp; iso-8859-15&nbsp; Latin 9 (ISO)&nbsp; 
29001&nbsp; x-Europa&nbsp; Europa&nbsp; 
38598&nbsp; iso-8859-8-i&nbsp; Hebrew (ISO-Logical)&nbsp; *&nbsp;   
50220&nbsp; iso-2022-jp&nbsp; Japanese (JIS)&nbsp; *&nbsp;   
50221&nbsp; csISO2022JP&nbsp; Japanese (JIS-Allow 1 byte Kana)&nbsp; *&nbsp;   
50222&nbsp; iso-2022-jp&nbsp; Japanese (JIS-Allow 1 byte Kana - SO/SI)&nbsp; *&nbsp;   
50225&nbsp; iso-2022-kr&nbsp; Korean (ISO)&nbsp; *&nbsp;   
50227&nbsp; x-cp50227&nbsp; Chinese Simplified (ISO-2022)&nbsp; *&nbsp;   
51932&nbsp; euc-jp&nbsp; Japanese (EUC)&nbsp; *&nbsp;   
51936&nbsp; EUC-CN&nbsp; Chinese Simplified (EUC)&nbsp; *&nbsp;   
51949&nbsp; euc-kr&nbsp; Korean (EUC)&nbsp; *&nbsp;   
52936&nbsp; hz-gb-2312&nbsp; Chinese Simplified (HZ)&nbsp; *&nbsp;   
54936&nbsp; GB18030&nbsp; Chinese Simplified (GB18030)&nbsp; *&nbsp;   
57002&nbsp; x-iscii-de&nbsp; ISCII Devanagari&nbsp; *&nbsp;   
57003&nbsp; x-iscii-be&nbsp; ISCII Bengali&nbsp; *&nbsp;   
57004&nbsp; x-iscii-ta&nbsp; ISCII Tamil&nbsp; *&nbsp;   
57005&nbsp; x-iscii-te&nbsp; ISCII Telugu&nbsp; *&nbsp;   
57006&nbsp; x-iscii-as&nbsp; ISCII Assamese&nbsp; *&nbsp;   
57007&nbsp; x-iscii-or&nbsp; ISCII Oriya&nbsp; *&nbsp;   
57008&nbsp; x-iscii-ka&nbsp; ISCII Kannada&nbsp; *&nbsp;   
57009&nbsp; x-iscii-ma&nbsp; ISCII Malayalam&nbsp; *&nbsp;   
57010&nbsp; x-iscii-gu&nbsp; ISCII Gujarati&nbsp; *&nbsp;   
57011&nbsp; x-iscii-pa&nbsp; ISCII Punjabi&nbsp; *&nbsp;   
65000&nbsp; utf-7&nbsp; Unicode (UTF-7)&nbsp; *&nbsp;   
**<span style="color: #ff0000;">65001&nbsp; utf-8&nbsp; Unicode (UTF-8)&nbsp; *&nbsp;</span>**   
65005&nbsp; utf-32&nbsp; Unicode (UTF-32)&nbsp; *&nbsp;   
65006&nbsp; utf-32BE&nbsp; Unicode (UTF-32 Big-Endian)&nbsp; * 

3.更改代码集:

chcp 65001 

//更改代码集为UTF-8.

[![image](http://images.cnitblog.com/blog/374803/201303/15145742-166bee72384e4004b381fd591aa0c85a.png "image")](http://images.cnitblog.com/blog/374803/201303/15145741-acc83a78d174440d8c509d7ca8e53bd1.png)

4.进入adb,查看是否为乱码:

[![image](http://images.cnitblog.com/blog/374803/201303/15145743-68e4b4f4b77c48358169ceeb6a2dc316.png "image")](http://images.cnitblog.com/blog/374803/201303/15145742-8bb4363488494975b3bee5167709d4ab.png)

5.仍为乱码,但乱码已经不同了.查看字体设置:

[![image](http://images.cnitblog.com/blog/374803/201303/15145745-c6cc3e48929d44abbed847d91381a04a.png "image")](http://images.cnitblog.com/blog/374803/201303/15145744-d4be03904d58435db8f7beeaa24af0d7.png)

6.更改字体为"Lucida Console"

[![image](http://images.cnitblog.com/blog/374803/201303/15145746-6cce7e2a38944ba2b0af579e2f9a0a1e.png "image")](http://images.cnitblog.com/blog/374803/201303/15145745-71a04a18c997440382a7028d71269192.png)

7.重新ls,查看效果:

[![image](http://images.cnitblog.com/blog/374803/201303/15145748-6dea16e7f0f2439a8655fcb23bede015.png "image")](http://images.cnitblog.com/blog/374803/201303/15145747-2589788b5de64e6791b22913c0210d0c.png)

至此,问题解决.

参考资料:

http://android.tgbus.com/Android/tutorial/201104/348715.shtml