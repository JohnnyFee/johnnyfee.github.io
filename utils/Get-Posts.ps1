$urlTemplate = 'http://johnnyfee.github.io/{0}/{1}/{2}/{3}/'

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

    echo $title
    echo $url
    echo ($tags -join ' ')
    echo ''
} | tee -Variable output

$output | clip