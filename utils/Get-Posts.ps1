clear
$urlTemplate = 'http://johnnyfee.github.io/{0}/{1}/{2}/{3}/'

#############################################################################
##
## Set-Clipboard
##
## From Windows PowerShell Cookbook (O'Reilly)
## by Lee Holmes (http://www.leeholmes.com/guide)
##
##############################################################################
 
<#
 
.SYNOPSIS
 
Sends the given input to the Windows clipboard.
 
.EXAMPLE
 
dir | Set-Clipboard
This example sends the view of a directory listing to the clipboard
 
.EXAMPLE
 
Set-Clipboard "Hello World"
This example sets the clipboard to the string, "Hello World".
 
#>

function Set-Clipboard {
    param(
        ## The input to send to the clipboard
        [Parameter(ValueFromPipeline = $true)]
        [object[]] $InputObject
    )
 
    begin
    {
        Set-StrictMode -Version Latest
        $objectsToProcess = @()
    }
 
    process
    {
        ## Collect everything sent to the script either through
        ## pipeline input, or direct input.
        $objectsToProcess += $inputObject
    }
 
    end
    {
        ## Launch a new instance of PowerShell in STA mode.
        ## This lets us interact with the Windows clipboard.
        $objectsToProcess | PowerShell -NoProfile -STA -Command {
            Add-Type -Assembly PresentationCore
 
            ## Convert the input objects to a string representation
            $clipText = ($input | Out-String -Stream) -join "`r`n"
 
            ## And finally set the clipboard text
            [Windows.Clipboard]::SetText($clipText)
        }
    }

}

dir ..\source\_posts\*.md | foreach {
    $fileName = $_.Name

    if ($fileName -cnotmatch '(?sm)(?<YEAR>\d{4})-(?<MONTH>\d{2})-(?<DAY>\d{2})-(?<NAME>\S*)\.md') {
        return
    }

    $year = $matches['YEAR']
    $month = $matches['MONTH']
    $day = $matches['DAY']
    $name = $matches['NAME']

    $url = $urlTemplate -f $year, $month, $day, $name

    cat $_ -Encoding UTF8 | foreach {
        if ($_ -cmatch '^title\s*:\s*"(?<TITLE>.*)"$') {
	        $title = $matches['TITLE']
        }

        if ($_ -cmatch '(?m)^tags\s*:\s*\[(?<TAGS>.*)\]$') {
	        $tags = $matches['TAGS'] -csplit ',' | foreach { $_.Trim() }
        }
    }

    echo $title.Trim()
    echo $url.Trim()
    echo ($tags -join ' ')
    echo ''
} | tee -Variable output

$output = $output | Out-String

Add-Type -AssemblyName PresentationCore
[Windows.Clipboard]::SetText($output)

#$OutputEncoding = [Console]::OutputEncoding
#$output | clip.exe