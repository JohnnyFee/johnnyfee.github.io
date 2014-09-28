$downloadPath = 'd:/project/johnnyfee.github.io/resources/images'
$relateUrl = 'http://johnnyimages.qiniudn.com/'

function Download-Picture($url, $fileName) {
    echo "downloading $url to $fileName"
    $fullPath = Join-Path $downloadPath $fileName
    Invoke-WebRequest -Uri $url -OutFile $fullPath
    return $?
}

function Get-Picture($file) {
    $index = 1
    $fileBaseName = ([System.IO.FileInfo]$file).BaseName
    [System.Collections.Generic.Dictionary[[string],[string]]] $dict = New-Object 'System.Collections.Generic.Dictionary[[string], [string]]'

    cat $file -Encoding UTF8 -Raw | % {
        $regex = [regex] '!\[(?<desc>.*?)\]\((?<url>.*?)\)'
        $matches = $regex.Matches($_)
        
        if ($matches.Count) {
            $matches.ForEach({
                $fullMatch = $_.Value
                $desc = $_.Groups['desc'].Value
                $url = $_.Groups['url'].Value
                if ($url -like 'http*') {
                    $extension = [System.IO.Path]::GetExtension($url)
                    $targetPath = "$fileBaseName-{0:d3}$extension" -f $index++
                    $result = Download-Picture $url $targetPath
                    if ($result) {
                        $dict.Add($url, $targetPath)
                    }
                }
            })
        }
    }

    $newContent = cat $file -Encoding UTF8 -Raw | % {
        $line = $_
        $dict.Keys | % {
            $url = $_
            $newPath = $relateUrl + $dict[$url]
            $line = [string]$line.Replace($url, $newPath)
        }
        $line
    }

    $bytes = [System.Text.Encoding]::UTF8.GetBytes($newContent)
    sc $file $bytes -Encoding Byte
    #[IO.File]::WriteAllText($file, $newContent, [System.Text.Encoding]::UTF8)
}

dir d:/project/johnnyfee.github.io/source/_posts/*.md | % {
    Get-Picture $_
}