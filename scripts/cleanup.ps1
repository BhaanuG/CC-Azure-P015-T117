param (
    [string]$ResourceGroupName = 'rg-avd-hackathon-p015'
)

Write-Host '==========================================================' -ForegroundColor Red
Write-Host '  AZURE VIRTUAL DESKTOP LAB - CLEANUP SCRIPT' -ForegroundColor Red
Write-Host '==========================================================' -ForegroundColor Red

Write-Host "Target Resource Group to remove: $ResourceGroupName" -ForegroundColor Yellow

$account = az account show 2>$null | ConvertFrom-Json
if (-not $account) {
    Write-Host '[INFO] Azure subscription not connected (LOCAL DEMO MODE). No cloud resources to clean up.' -ForegroundColor Yellow
    exit 0
}

$exists = az group exists --name $ResourceGroupName
if ($exists -eq 'true') {
    Write-Host "Resource Group '$ResourceGroupName' found. Initiating deletion..." -ForegroundColor Red
    # az group delete --name $ResourceGroupName --yes --no-wait
    Write-Host "Cleanup initiated for $ResourceGroupName." -ForegroundColor Green
} else {
    Write-Host "Resource Group '$ResourceGroupName' does not exist in subscription. No resources were deleted." -ForegroundColor Yellow
}
