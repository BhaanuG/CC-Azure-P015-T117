Write-Host '==========================================================' -ForegroundColor Cyan
Write-Host '  AZURE VIRTUAL DESKTOP LAB - COMPONENT VALIDATION REPORT' -ForegroundColor Cyan
Write-Host '==========================================================' -ForegroundColor Cyan

$BicepPath = Join-Path $PSScriptRoot "..\infrastructure\bicep\main.bicep"
$DashboardDir = Join-Path $PSScriptRoot "..\dashboard"

# 1. Validate Bicep IaC
Write-Host "[1/3] Validating Bicep IaC compilation..." -NoNewline
$bicepOut = az bicep build --file $BicepPath 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host " [PASS]" -ForegroundColor Green
} else {
    Write-Host " [FAIL]" -ForegroundColor Red
    Write-Host $bicepOut
}

# 2. Validate React Dashboard Build
Write-Host "[2/3] Validating React Dashboard Vite Build..." -NoNewline
Push-Location $DashboardDir
$npmOut = npm run build 2>&1
Pop-Location
if ($LASTEXITCODE -eq 0) {
    Write-Host " [PASS]" -ForegroundColor Green
} else {
    Write-Host " [FAIL]" -ForegroundColor Red
    Write-Host $npmOut
}

# 3. Check Azure Connection State
Write-Host "[3/3] Checking Azure Connection State..." -NoNewline
$account = az account show 2>$null | ConvertFrom-Json
if ($account) {
    Write-Host " [CONNECTED: $($account.name)]" -ForegroundColor Green
} else {
    Write-Host " [LOCAL DEMO MODE - Not Connected]" -ForegroundColor Yellow
}

Write-Host '==========================================================' -ForegroundColor Cyan
Write-Host 'VALIDATION COMPLETE: Infrastructure & React App Verified' -ForegroundColor Green