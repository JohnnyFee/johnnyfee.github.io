---
layout: post
title: "Get a List of Software Installed on Your PC"
category: PowerShell
tags: [powershell]
--- 

原文：[Get a List of Software Installed on Your PC with a Single Line of PowerShell](http://www.howtogeek.com/165293/how-to-get-a-list-of-software-installed-on-your-pc-with-a-single-command/)

Getting a list of installed software is as simple as using this straightforward WMI query.

> Get-WmiObject -Class Win32_Product | Select-Object -Property Name

![image](http://cdn.howtogeek.com/wp-content/uploads/2013/06/image40.png "image")

You will probably want to export that to a file though, which is also easy enough — we’ll send the output using the > symbol and adding the path to a new text file that we want to create.

> Get-WmiObject -Class Win32_Product | Select-Object -Property Name > C:\Software\PCapps.txt

![image](http://cdn.howtogeek.com/wp-content/uploads/2013/06/image41.png "image")

What makes using PowerShell really neat is that if you do this on two different machines, you can easily compare the software installed on them.

> Compare-Object -ReferenceObject (Get-Content C:\Software\PCapps.txt) -DifferenceObject (Get-Content C:\Software\LAPTOPapps.txt)

![image](http://cdn.howtogeek.com/wp-content/uploads/2013/06/image42.png "image")

Any entries with a side indicator pointing to the right (=>) mean that the software is installed on my laptop but not on my PC, and any entries with a side indicator pointing to the left (<=) mean that the software is installed on my PC but not on my laptop.


