Add-Type -AssemblyName System.Drawing

$p4 = "C:/Users/user/.gemini/antigravity/brain/d81ec12d-873f-4d46-bf07-691b14b8096d/.user_uploaded/media_1788776925935.png"
$src = [System.Drawing.Bitmap]::FromFile($p4)

# Create output dir
$outDir = "d:/ALFA PAPER PRODUCTS/public/assets/products"
if (!(Test-Path $outDir)) {
    New-Item -ItemType Directory -Force -Path $outDir | Out-Null
}

# The image has 7 cards across 1024 width
# Let's inspect where cards start and end.
# Total width 1024, height 246.
# Each card is roughly in a grid.
$names = @(
    "paper-plates",
    "paper-cups",
    "paper-trays",
    "burger-boxes",
    "bakery-boxes",
    "food-packaging",
    "custom-paper-products"
)

# Each column is approximately 1024 / 7 = 146.28 px
# In Screenshot 4, the top ~160px is the product photo itself, bottom ~80px is the text label.
for ($i = 0; $i -lt 7; $i++) {
    $x = [int](15 + ($i * 142))
    $y = 12
    $w = 126
    $h = 150
    if ($x + $w -gt $src.Width) { $w = $src.Width - $x }

    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $crop = $src.Clone($rect, $src.PixelFormat)
    $destFile = Join-Path $outDir "$($names[$i]).png"
    $crop.Save($destFile, [System.Drawing.Imaging.ImageFormat]::Png)
    $crop.Dispose()
    Write-Host "Saved $($names[$i]).png ($w x $h)"
}

$src.Dispose()
