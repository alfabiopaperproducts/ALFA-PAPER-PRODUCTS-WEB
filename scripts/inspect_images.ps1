Add-Type -AssemblyName System.Drawing

$p4 = "C:/Users/user/.gemini/antigravity/brain/d81ec12d-873f-4d46-bf07-691b14b8096d/.user_uploaded/media_1788776925935.png"
$img4 = [System.Drawing.Image]::FromFile($p4)
Write-Host "Screenshot 4 dimensions: $($img4.Width) x $($img4.Height)"

$p1 = "C:/Users/user/.gemini/antigravity/brain/d81ec12d-873f-4d46-bf07-691b14b8096d/.user_uploaded/media_1788775022757.jpg"
$img1 = [System.Drawing.Image]::FromFile($p1)
Write-Host "Reference 1 dimensions: $($img1.Width) x $($img1.Height)"

$img4.Dispose()
$img1.Dispose()
