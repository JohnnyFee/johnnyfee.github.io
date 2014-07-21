---
layout: post
title: "PowerShell: Running Executables"
category: PowerShell
tags: [powershell]
--- 

原文：<http://social.technet.microsoft.com/wiki/contents/articles/7703.powershell-running-executables.aspx>

Link to Parent: [PowerShell - Deep Dive and Best Practice](http://social.technet.microsoft.com/wiki/contents/articles/7803.powershell-deep-dive-and-best-practice.aspx "Click to view the page titled: PowerShell - Deep Dive and Best Practice") 

There are several different methods for running executables as well as invoking code. How do you know which one to use for the job? Here is an outline of the methods with examples and general use.  

## 1. Direct - Using the environment path or local folder

**Why:** Easy to use but is limited and not as stable.  
  
**Details:** If a cmd is used without the prefixed '.\'. it is only run if it is in the environment path. PowerShell does not execute from the current directory without it. This approach is not advised for using in scripts unless its for a system tool. Accepts args as if it were at a cmd prompt.   
 
<!--more-->

**Example:**  
  
    #Runs a ping, no .\ need since its in the sys 32 folder which is part of the environment path.
    ping 127.0.0.1

    #A test app that is run from the local folder but must be prefixed with the .\ because the current folder is no in the environment path.
    .\testapp.exe

## 2. Invoke-Expression (IEX)

[Technet ![](http://social.technet.microsoft.com/wiki/cfs-file.ashx/__key/communityserver-components-sitefiles/10_5F00_external.png "This link is external to TechNet Wiki. It will open in a new window.")](http://technet.microsoft.com/en-us/library/dd347550.aspx)  
**Why:** Easy to execute a string. This can be VERY dangerous if used with user input (unless that input has been carefully validated).  
  
**Details:** Accepts a string to be executed as code. This is NOT the method you want for running an executable. This is useful to run a users input or to run code from a website or text file. There is some interesting uses of this with web apps such as Chocolatey.  
  
**Example:**

    #Runs Get-Process
    $str = "get-process"
    Invoke-Expression $str

## 3. Invoke-Command (ICM)

[Technet ![](http://social.technet.microsoft.com/wiki/cfs-file.ashx/__key/communityserver-components-sitefiles/10_5F00_external.png "This link is external to TechNet Wiki. It will open in a new window.")](http://technet.microsoft.com/en-us/library/dd347578.aspx)  
**Why:** Great for executing code on multiple machines over WSMAN.  
  
**Details:** Uses WimRM to run commands on the local or remote systems. It is not async and will run in the order provided to -computername. The results are returned in the order in which finishes first. If -AsJob is used, the job object is returned, otherwise it returns the results of script/code.  
  
**Example:**

    #runs ping on multiple machines
    $scriptblock = {ping server3}
    Invoke-Command -scriptblock $scriptblock -computername "server1","server2"

## 4. Invoke-Item (II)

[Technet ![](http://social.technet.microsoft.com/wiki/cfs-file.ashx/__key/communityserver-components-sitefiles/10_5F00_external.png "This link is external to TechNet Wiki. It will open in a new window.")](http://technet.microsoft.com/en-us/library/dd347658.aspx)  
**Why:** Forces the default action to be run on the item.   
**Details:** Good when trying to open a file with an associated program. If for example you invoke-item with a PDF file, it opens it in whatever program is associated with PDF files. This can also be used to open multiple files at once. This is not good for executing a program.  
  
**Example:**

    #opens all PDFs in the current directory
    Invoke-Item *.pdf

## 5. The Call Operator &

[Technet ![](http://social.technet.microsoft.com/wiki/cfs-file.ashx/__key/communityserver-components-sitefiles/10_5F00_external.png "This link is external to TechNet Wiki. It will open in a new window.")](http://technet.microsoft.com/en-us/library/dd347588.aspx)  
**Why:** Used to treat a string as a SINGLE command. Useful for dealing with spaces.  
In PowerShell V2.0, if you are running 7z.exe (7-Zip.exe) or another command that starts with a number, you have to use the command invocation operator &.  
The PowerShell V3.0 parser do it now smarter, in this case you don’t need the & anymore .  
  
**Details:** Runs a command, script, or script block. The call operator, also known as the "invocation operator," lets you run commands that are stored in variables and represented by strings. Because the call operator does not parse the command, it cannot interpret command parameters.

__Example: __

    & 'C:\Program Files\Windows Media Player\wmplayer.exe' "c:\videos\my home video.avi" /fullscreen

Things can get tricky when an external command has a lot of parameters or there are spaces in the arguments or paths!
With spaces you have to nest Quotation marks and the result it is not always clear! 
In this case it is better to separate everything like so:

    $CMD = 'SuperApp.exe'
    $arg1 = 'filename1'
    $arg2 = '-someswitch'
    $arg3 = 'C:\documents and settings\user\desktop\some other file.txt'
    $arg4 = '-yetanotherswitch'
     
    & $CMD $arg1 $arg2 $arg3 $arg4
     
    # or same like that:
     
    $AllArgs = @('filename1', '-someswitch', 'C:\documents and settings\user\desktop\some other file.txt', '-yetanotherswitch')
     
    & 'SuperApp.exe' $AllArgs

## 6. cmd /c - Using the old cmd shell

**** This method should no longer be used with V3  
Why:** Bypasses PowerShell and runs the command from a cmd shell. Often times used with a DIR which runs faster in the cmd shell than in PowerShell (NOTE: This was an issue with PowerShell v2 and its use of .Net 2.0, this is not an issue with V3).  
  
**Details:** Opens a CMD prompt from within powershell and then executes the command and returns the text of that command. The /c tells CMD that it should terminate after the command has completed. There is little to no reason to use this with V3.  
  
**Example:**

    #runs DIR from a cmd shell, DIR in PowerShell is an alias to GCI. This will return the directory listing as a string but returns much faster than a GCI
    cmd /c dir c:\windows

## 7. Start-Process (start/saps)

[Technet ![](http://social.technet.microsoft.com/wiki/cfs-file.ashx/__key/communityserver-components-sitefiles/10_5F00_external.png "This link is external to TechNet Wiki. It will open in a new window.")](http://technet.microsoft.com/en-us/library/dd347667.aspx)  
**Why:** Starts a process and returns the [.Net process object ![](http://social.technet.microsoft.com/wiki/cfs-file.ashx/__key/communityserver-components-sitefiles/10_5F00_external.png "This link is external to TechNet Wiki. It will open in a new window.")](http://msdn.microsoft.com/en-us/library/system.diagnostics.process.aspx) if -PassThru is provided. It also allows you to control the environment in which the process is started (user profile, output redirection etc). You can also use the Verb parameter (right click on a file, that list of actions) so that you can, for example, play a wav file.  
  
**Details:** Executes a program returning the process object of the application. Allows you to control the action on a file (verb mentioned above) and control the environment in which the app is run. You also have the ability to wait on the process to end. You can also subscribe to the processes Exited event.  
  
**Example:**  

    #starts a process, waits for it to finish and then checks the exit code.
    $p = Start-Process ping -ArgumentList "invalidhost" -wait -NoNewWindow -PassThru
    $p.HasExited
    $p.ExitCode

    #to find available Verbs use the following code.
    $startExe = new-object System.Diagnostics.ProcessStartInfo -args PowerShell.exe
    $startExe.verbs 

## 8. [Diagnostics.Process] Start()

[MSDN ![](http://social.technet.microsoft.com/wiki/cfs-file.ashx/__key/communityserver-components-sitefiles/10_5F00_external.png "This link is external to TechNet Wiki. It will open in a new window.")](http://msdn.microsoft.com/en-us/library/system.diagnostics.process.start.aspx)  
**Why:** Allows a little more control over the process object vs Start-Process.  
**Details:** There is a static Start method and a Start method for the process object. There is little advantage that I know of to use this over Start-Process. (Update required as to what this offers over Start-Process)  
  
**Example:**

    #runs Notepad.exe using the Static Start method and opens a file test.txt
    [Diagnostics.Process]::Start("notepad.exe","test.txt")

    $ps = new-object System.Diagnostics.Process
    $ps.StartInfo.Filename = "ipconfig.exe"
    $ps.StartInfo.Arguments = " /all"
    $ps.StartInfo.RedirectStandardOutput = $True
    $ps.StartInfo.UseShellExecute = $false
    $ps.start()
    $ps.WaitForExit()
    [string] $Out = $ps.StandardOutput.ReadToEnd();

## 9. WMI Win32_Process Create() Method

[MSDN ![](http://social.technet.microsoft.com/wiki/cfs-file.ashx/__key/communityserver-components-sitefiles/10_5F00_external.png "This link is external to TechNet Wiki. It will open in a new window.")](http://msdn.microsoft.com/en-us/library/windows/desktop/aa389388%28v=vs.85%29.aspx)

**Why:**The Create() method for the Win32_Process class can be run locally or remotely over RPC rather than WSMAN (Invoke-Command), to spawn a process and returns a **_System.Management.ManagementBaseObject#\__PARAMETERS_**object that lists the process id and return code of the process start up.  
  
**Details:**

This is a method in the Win32_Process class that allows creation of a process on a local or remote computer. There are multiple ways to use the Create() method. You can also provide Process Startup configuration data using the [Win32_ProcessStartup ![](http://social.technet.microsoft.com/wiki/cfs-file.ashx/__key/communityserver-components-sitefiles/10_5F00_external.png "This link is external to TechNet Wiki. It will open in a new window.")](http://msdn.microsoft.com/en-us/library/windows/desktop/aa394375%28v=vs.85%29.aspx) class  
  
**Examples:**

    #Opens a notepad process using Invoke-WMIMethod
    Invoke-WMIMethod -Class Win32_Process -Name Create -ArgumentList Notepad.exe
    
    #Opens a batch file process on Remote Computer using Invoke-WMIMethod
    Invoke-WMIMethod -Class Win32_Process -Name Create -Computername RemoteServer -ArgumentList "cmd /c C:\test.bat"
    
    #Opens a notepad process using [wmiclass] accelerator
    ([wmiclass]"win32_Process").create('notepad.exe')
    
    #Opens a notepad process with process startup configuration to hide the window using [wmiclass] accelerator
    $startup=[wmiclass]"Win32_ProcessStartup"
    $startup.Properties['ShowWindow'].value=$False
    ([wmiclass]"win32_Process").create('notepad.exe','C:\',$Startup)

    #Opens a batch file process using [wmiclass] accelerator on remote system
    ([wmiclass]"\\remoteserver\root\cimv2:win32_Process").create('cmd /c C:\test.bat')
 
    #Typical Return object showing processid and returnvalue
     
    __GENUS : 2
    __CLASS : __PARAMETERS
    __SUPERCLASS :
    __DYNASTY : __PARAMETERS
    __RELPATH :
    __PROPERTY_COUNT : 2
    __DERIVATION : {}
    __SERVER :
    __NAMESPACE :
    __PATH :
    ProcessId : 2708
    ReturnValue : 0

 **Return Value Table**

 Return code  Description - **0**
Successful Completion

- **2**
Access Denied

- **3**
Insufficient Privilege

- **8**
Unknown failure

- **9**
Path Not Found

- **21**
Invalid Parameter

## 10. Stop-Parsing Symbol --%

[Technet ![](http://social.technet.microsoft.com/wiki/cfs-file.ashx/__key/communityserver-components-sitefiles/10_5F00_external.png "This link is external to TechNet Wiki. It will open in a new window.")](http://technet.microsoft.com/en-us/library/hh847892.aspx)  
**Why:** Its a quick way to handle program arguments that are not standard. Also its the new cool way to do it.  
**Details:** The stop-parsing symbol (--%), introduced in Windows PowerShell 3.0, directs Windows PowerShell to refrain from interpreting input as Windows PowerShell commands or expressions. When calling an executable program in Windows PowerShell, place the stop-parsing symbol before the program arguments.  
After the stop-parsing symbol --% , the arguments up to the end of the line (or pipe, if you are piping) are passed as is.  
  
**Examples:**

    # icacls in V2
    # You must  use escape characters to prevent PowerShell from misinterpreting the parentheses.
     
    icacls X:\VMS /grant Dom\HVAdmin:`(CI`)`(OI`)F
     
    # In V3 you can use the stop-parsing symbol.
     
    icacls X:\VMS --% /grant Dom\HVAdmin:(CI)(OI)F

Additional Resources

The problem with calling legacy/native apps from PowerShell (Joel 'Jaykul' Bennett MVP)
<http://huddledmasses.org/the-problem-with-calling-legacy-or-native-apps-from-powershell/> This link is external to TechNet Wiki. It will open in a new window. 

PowerShell V3 CTP2 Provides Better Argument Passing to EXEs (Keith Hill MVP)
<http://rkeithhill.wordpress.com/2012/01/02/powershell-v3-ctp2-provides-better-argument-passing-to-exes/> This link is external to TechNet Wiki. It will open in a new window. 

PowerShell and external commands done right
<http://edgylogic.com/blog/powershell-and-external-commands-done-right/> This link is external to TechNet Wiki. It will open in a new window. 

## Exit Code

[PowerShell, batch files, and exit codes. Recipes & Secrets](http://zduck.com/2012/powershell-batch-files-exit-codes/)

    PS C:\test> powershell -Command './foo.ps1; exit $LASTEXITCODE'
    PS C:\test> echo $lastexitcode

## See Also

* [PowerShell Portal](http://social.technet.microsoft.com/wiki/contents/articles/24187.powershell-portal.aspx)
* [Wiki: Portal of TechNet Wiki Portals](http://social.technet.microsoft.com/wiki/contents/articles/20459.wiki-portal-of-technet-wiki-portals.aspx)


