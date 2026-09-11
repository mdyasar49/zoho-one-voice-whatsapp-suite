$scriptDir = $PSScriptRoot
$projectRoot = Split-Path $scriptDir -Parent
$clientDir = Join-Path $projectRoot "client"
$distPath = Join-Path $clientDir "dist"
$manifestPath = Join-Path $scriptDir "plugin-manifest.json"
$zipOutput = Join-Path $scriptDir "zoho-extension.zip"

Write-Output "🔨 Building Zoho CRM Widget bundle in: $clientDir"
Set-Location -Path $clientDir
npm run build

Write-Output "📦 Packaging extension for Zoho Sigma Marketplace..."

if (Test-Path $zipOutput) {
    Remove-Item -Path $zipOutput -Force
}

$tempPkg = Join-Path $scriptDir "temp_pkg"
if (Test-Path $tempPkg) {
    Remove-Item -Path $tempPkg -Recurse -Force
}
New-Item -ItemType Directory -Path "$tempPkg\app" -Force

Copy-Item -Path "$distPath\*" -Destination "$tempPkg\app" -Recurse
Copy-Item -Path $manifestPath -Destination "$tempPkg\plugin-manifest.json"

Compress-Archive -Path "$tempPkg\*" -DestinationPath $zipOutput -Force
Remove-Item -Path $tempPkg -Recurse -Force

Write-Output "✅ Zoho Sigma Extension Package ready at: $zipOutput"
