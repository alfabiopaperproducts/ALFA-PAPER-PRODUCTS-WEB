$srcDir = 'C:\Users\user\.gemini\antigravity\brain\d81ec12d-873f-4d46-bf07-691b14b8096d'
$destDir = 'd:\ALFA PAPER PRODUCTS\public\assets'
$prodDir = 'd:\ALFA PAPER PRODUCTS\public\assets\products'
$srcAssetsDir = 'd:\ALFA PAPER PRODUCTS\src\assets'

if (!(Test-Path $prodDir)) { New-Item -ItemType Directory -Force -Path $prodDir | Out-Null }
if (!(Test-Path $srcAssetsDir)) { New-Item -ItemType Directory -Force -Path $srcAssetsDir | Out-Null }

# Copy exact company logo into src/assets as well so it can be directly imported in Header/Footer
Copy-Item 'd:\ALFA PAPER PRODUCTS\Public\Assets\ALFA PAPER PRODUCTS Logo.png' -Destination (Join-Path $srcAssetsDir 'logo.png') -Force
Copy-Item 'd:\ALFA PAPER PRODUCTS\Public\Assets\ALFA PAPER PRODUCTS Logo.png' -Destination (Join-Path $destDir 'logo.png') -Force

# Copy hero and factory images
$heroFile = (Get-ChildItem -Path $srcDir -Filter 'hero_sustainable_paper_*.jpg')[0].FullName
Copy-Item $heroFile -Destination (Join-Path $destDir 'hero-sustainable-paper.jpg') -Force
Copy-Item $heroFile -Destination (Join-Path $srcAssetsDir 'hero-sustainable-paper.jpg') -Force

$factoryFile = (Get-ChildItem -Path $srcDir -Filter 'factory_paper_production_*.jpg')[0].FullName
Copy-Item $factoryFile -Destination (Join-Path $destDir 'factory-paper-production.jpg') -Force
Copy-Item $factoryFile -Destination (Join-Path $srcAssetsDir 'factory-paper-production.jpg') -Force

# Copy product images
$plates = (Get-ChildItem -Path $srcDir -Filter 'prod_paper_plates_*.jpg')[0].FullName
Copy-Item $plates -Destination (Join-Path $prodDir 'paper-plates.jpg') -Force

$cups = (Get-ChildItem -Path $srcDir -Filter 'prod_paper_cups_*.jpg')[0].FullName
Copy-Item $cups -Destination (Join-Path $prodDir 'paper-cups.jpg') -Force

$trays = (Get-ChildItem -Path $srcDir -Filter 'prod_paper_trays_*.jpg')[0].FullName
Copy-Item $trays -Destination (Join-Path $prodDir 'paper-trays.jpg') -Force

$burgers = (Get-ChildItem -Path $srcDir -Filter 'prod_burger_boxes_*.jpg')[0].FullName
Copy-Item $burgers -Destination (Join-Path $prodDir 'burger-boxes.jpg') -Force

$bakeries = (Get-ChildItem -Path $srcDir -Filter 'prod_bakery_boxes_*.jpg')[0].FullName
Copy-Item $bakeries -Destination (Join-Path $prodDir 'bakery-boxes.jpg') -Force

$food = (Get-ChildItem -Path $srcDir -Filter 'prod_food_packaging_*.jpg')[0].FullName
Copy-Item $food -Destination (Join-Path $prodDir 'food-packaging.jpg') -Force

$custom = (Get-ChildItem -Path $srcDir -Filter 'prod_custom_paper_products_*.jpg')[0].FullName
Copy-Item $custom -Destination (Join-Path $prodDir 'custom-paper-products.jpg') -Force

Write-Host "All assets copied successfully."
