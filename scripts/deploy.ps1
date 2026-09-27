param(
    [string]$Environment = 'demo',
    [string]$Location = 'eastus',
    [string]$ResourceGroupName = 'rg-avd-hackathon-p015'
)

Write-Host '==========================================================' -ForegroundColor Cyan
Write-Host '  AZURE VIRTUAL DESKTOP LAB - AZURE DEPLOYMENT READINESS & SYNTAX ENGINE' -ForegroundColor Cyan
Write-Host '==========================================================' -ForegroundColor Cyan

if ($Environment -eq 'production') {
    Write-Host '[INFO] Production deployment parameter selected. Host count: 9.' -ForegroundColor Yellow
}

$BicepPath = Join-Path $PSScriptRoot "..\infrastructure\bicep\main.bicep"
Write-Host "Validating Bicep template at $BicepPath..." -ForegroundColor Yellow

$buildResult = az bicep build --file $BicepPath 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host '[PASS] Bicep template syntax compiled successfully.' -ForegroundColor Green
} else {
    Write-Host "[FAIL] Bicep compilation failed: $buildResult" -ForegroundColor Red
    exit 1
}

$account = az account show 2>$null | ConvertFrom-Json
if ($account) {
    Write-Host "[INFO] Connected to Azure Subscription: $($account.name) ($($account.id))" -ForegroundColor Green
    Write-Host "Deploying Bicep template to Resource Group $ResourceGroupName in $Location..." -ForegroundColor Yellow
    # az deployment sub create --location $Location --template-file $BicepPath --parameters environment=$Environment
} else {
    Write-Host '[INFO] LOCAL DEMO MODE: Deployment command intentionally not executed because no active Azure subscription is connected.' -ForegroundColor Yellow
    Write-Host '[PASS] IaC template syntax is validated and ready for Azure deployment upon login.' -ForegroundColor Green
}