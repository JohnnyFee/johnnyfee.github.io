layout: post
title: "QT Converter"
category: Qt
tags: [qt]
--- 

### QString和string的相互转换

	//------------------------
	// QString and string change
	//------------------------
	QString s2q(const string &s)
	{
		return QString(QString::fromLocal8Bit(s.c_str()));
	}
	string q2s(const QString &s)
	{
		return string((const char *)s.toLocal8Bit());
	}

<!--more-->

### QString to Char*

	QString data;
	data.toLatin1().data();

### char to number

	int char2num(char ch)
	{
		if(ch>='0'&&ch<='9')return ch-'0';
		else if(ch>='a'&&ch<='f')return ch-'a'+10;
		return -1;
	}

### number to QString

	QString::number(number,10);//10表示的是进制，如是16进制，则改为16

### uint8_t to QString

	uint8_t Message_Digest; 
	QString::number(Message_Digest,16);

### BYTE* to char[] to QString

	QString textshow = NULL;
	BYTE * output = new BYTE[1024];
	for(int i=0; i<16; i++)
	{
		char pBuff[2];
		sprintf(pBuff,"%02x",output[i]);
		textshow = textshow + pBuff;
	}

### string to BYTE []

	//其中#define unsigned char  BYTE

	////-------------------------------------------
	//// 将字符串类型转换为BYTE数组
	////-------------------------------------------
	void CryptClient::HexStrToByte(string str_arr, BYTE byte_arr[24])
	{
		unsigned char ch1;
		unsigned char ch2;
		int k = 0;
		for (int i=0; i<str_arr.length()-1; i = i+2)
		{
			ch1 = str_arr.at(i);
			ch2 = str_arr.at(i+1);
			if (ch1>=48 && ch1 <= 57)
			{
				ch1 &= 0x0F;
			}
			if (ch1>='A' && ch1 <='F')
			{
				ch1 &= 0x0F;
				ch1 += 0x09;
			}
			if (ch2 >= 48 && ch2 <= 57)
			{
				ch2 &= 0x0F;
			}
			if (ch2>='A' && ch2 <='F')
			{
				ch2 &= 0x0F;
				ch2 += 0x09;
			}
			ch1<<=4;
			byte_arr[k] = ch1 + ch2;//int类型转byte类型，有问题
			k++;
		}
	}

### BYTE[] to string

上个过程的逆过程

	////-------------------------------------------
	//// 将BYTE数组转换为字符串类型
	////-------------------------------------------
	string* byteToHexStr(BYTE byte_arr[], int arr_len)
	{
		string* hexstr = new string;
		for(int i=0; i<arr_len; i++)
		{
			char hex1;
			char hex2;
			int value = byte_arr[i];
			int v1 = value/16;
			int v2 = value % 16;
			//将商转换为字母
			if (v1>=0 && v1<=9)
			{
				hex1 = (char)(48 + v1);
			}
			else
			{
				hex1 = (char)(55 + v1);
			}
			//将余数转成字母
			if (v2>=0 && v2<=9)
			{
				hex2 = (char)(48 + v2);
			}
			else
			{
				hex2 = (char)(55 + v2);
			}
			//将字母连成一串
			*hexstr = *hexstr + hex1 + hex2;
		}
		return hexstr;
	}

### char* to QString

	QString keyall1;
	char keych1[MAX_NUM];
	keyall1 = QString(QLatin1String(keych1));

### 参考

- [总结一下刚刚写的程序中的C++各种类型的转换string，QString，char*， BYTE等等](http://blog.csdn.net/zmb2011/article/details/6293587)