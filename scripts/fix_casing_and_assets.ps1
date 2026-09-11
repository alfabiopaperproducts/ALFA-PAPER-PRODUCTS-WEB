# 1. Fix casing of Public -> public and Assets -> assets
$root = "d:\ALFA PAPER PRODUCTS"
$pubTemp = Join-Path $root "public_temp"
$pubFinal = Join-Path $root "public"

# If Public has capital P, rename via temp
if (Test-Path -LiteralPath (Join-Path $root "Public")) {
    Rename-Item -LiteralPath (Join-Path $root "Public") -NewName "public_temp"
    Rename-Item -LiteralPath (Join-Path $root "public_temp") -NewName "public"
}

# Now fix public\Assets -> public\assets
if (Test-Path -LiteralPath (Join-Path $pubFinal "Assets")) {
    Rename-Item -LiteralPath (Join-Path $pubFinal "Assets") -NewName "assets_temp"
    Rename-Item -LiteralPath (Join-Path $pubFinal "assets_temp") -NewName "assets"
}

# 2. Ensure src\assets\products exists and has all images
$srcAssets = Join-Path $root "src\assets"
$srcProducts = Join-Path $srcAssets "products"
if (!(Test-Path $srcProducts)) {
    New-Item -ItemType Directory -Force -Path $srcProducts | Out-Null
}

$pubAssets = Join-Path $pubFinal "assets"
$pubProducts = Join-Path $pubAssets "products"

# Copy all images to src\assets\products
Copy-Item "$pubProducts\*.jpg" -Destination $srcProducts -Force
Copy-Item "$pubAssets\*.jpg" -Destination $srcAssets -Force
Copy-Item "$pubAssets\logo.png" -Destination $srcAssets -Force

Write-Host "Casing and src/assets updated successfully."
