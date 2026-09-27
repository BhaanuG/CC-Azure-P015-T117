param(
    [int]$Students = 50,
    [double]$Concurrency = 0.70,
    [int]$SessionsPerHost = 10,
    [double]$Buffer = 0.20
)

if ($Students -le 0) { Write-Error 'Students must be greater than 0.'; exit 1 }
if ($Concurrency -le 0 -or $Concurrency -gt 1) { Write-Error 'Concurrency must be between 0 and 1.'; exit 1 }
if ($SessionsPerHost -le 0) { Write-Error 'SessionsPerHost must be greater than 0.'; exit 1 }
if ($Buffer -lt 0 -or $Buffer -gt 1) { Write-Error 'Buffer must be between 0 and 1.'; exit 1 }

$expectedUsers = [math]::Ceiling($Students * $Concurrency)
$baseHosts = [math]::Ceiling($expectedUsers / $SessionsPerHost)
$recommendedHosts = [math]::Ceiling($baseHosts * (1 + $Buffer))
$concPercent = [math]::Round($Concurrency * 100)
$bufPercent = [math]::Round($Buffer * 100)

Write-Host '==========================================================' -ForegroundColor Cyan
Write-Host '  AVD POOLED HOST POOL - CAPACITY AND SIZING CALCULATOR' -ForegroundColor Cyan
Write-Host '==========================================================' -ForegroundColor Cyan
Write-Host 'Execution Mode            : LOCAL DEMO MODE' -ForegroundColor Yellow
Write-Host ('Total Students            : ' + $Students)
Write-Host ('Concurrency               : ' + $concPercent + '%')
Write-Host ('Expected Concurrent Users : ' + $expectedUsers) -ForegroundColor Green
Write-Host ('Sessions Per Host         : ' + $SessionsPerHost)
Write-Host ('Base Hosts                : ' + $baseHosts)
Write-Host ('Safety Buffer             : ' + $bufPercent + '%')
Write-Host ('Recommended Hosts         : ' + $recommendedHosts) -ForegroundColor Green
Write-Host '==========================================================' -ForegroundColor Cyan
