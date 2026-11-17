$srcProducts = "src\assets\products"
$pubProducts = "Public\Assets\products"

# Ensure directories exist
if (!(Test-Path $srcProducts)) { New-Item -ItemType Directory -Force -Path $srcProducts | Out-Null }

# Copy all .jpeg files from Public/Assets/products to src/assets/products
Get-ChildItem -Path $pubProducts -Filter "*.jpeg" | ForEach-Object {
    Copy-Item -LiteralPath $_.FullName -Destination (Join-Path $srcProducts $_.Name) -Force
    Write-Host "Copied $($_.Name) to $srcProducts"
}

# Update standard .jpg files
Copy-Item -LiteralPath (Join-Path $pubProducts "Burger Boxes.jpeg") -Destination (Join-Path $srcProducts "burger-boxes.jpg") -Force
Copy-Item -LiteralPath (Join-Path $pubProducts "Burger Boxes.jpeg") -Destination (Join-Path $pubProducts "burger-boxes.jpg") -Force

Copy-Item -LiteralPath (Join-Path $pubProducts "Cake Box Main image.jpeg") -Destination (Join-Path $srcProducts "bakery-boxes.jpg") -Force
Copy-Item -LiteralPath (Join-Path $pubProducts "Cake Box Main image.jpeg") -Destination (Join-Path $pubProducts "bakery-boxes.jpg") -Force

Copy-Item -LiteralPath (Join-Path $pubProducts "Customized Paper Products.jpeg") -Destination (Join-Path $srcProducts "custom-paper-products.jpg") -Force
Copy-Item -LiteralPath (Join-Path $pubProducts "Customized Paper Products.jpeg") -Destination (Join-Path $pubProducts "custom-paper-products.jpg") -Force

Copy-Item -LiteralPath (Join-Path $pubProducts "Food Packaging Products.jpeg") -Destination (Join-Path $srcProducts "food-packaging.jpg") -Force
Copy-Item -LiteralPath (Join-Path $pubProducts "Food Packaging Products.jpeg") -Destination (Join-Path $pubProducts "food-packaging.jpg") -Force

Copy-Item -LiteralPath (Join-Path $pubProducts "Paper Cups Original.jpeg") -Destination (Join-Path $srcProducts "paper-cups.jpg") -Force
Copy-Item -LiteralPath (Join-Path $pubProducts "Paper Cups Original.jpeg") -Destination (Join-Path $pubProducts "paper-cups.jpg") -Force

Copy-Item -LiteralPath (Join-Path $pubProducts "Paper Trays.jpeg") -Destination (Join-Path $srcProducts "paper-trays.jpg") -Force
Copy-Item -LiteralPath (Join-Path $pubProducts "Paper Trays.jpeg") -Destination (Join-Path $pubProducts "paper-trays.jpg") -Force

Write-Host "All product images synced successfully."
