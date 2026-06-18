# Downloads product images into frontend/public/images
# Run from project root or this script's folder.

$images = @(
    @{ url = 'https://images.unsplash.com/photo-1601758123927-2b9a8f8d4b13?auto=format&fit=crop&w=800&q=60'; name='p1.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1524594154905-4b4f9d3a3f8f?auto=format&fit=crop&w=800&q=60'; name='p2.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad576?auto=format&fit=crop&w=800&q=60'; name='p3.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1599599810694-b5ac4dd26d1d?auto=format&fit=crop&w=800&q=60'; name='p4.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1500382017468-7049fae79eab?auto=format&fit=crop&w=800&q=60'; name='p5.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1557304763-fc32ddca14f0?auto=format&fit=crop&w=800&q=60'; name='p6.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1560160264-01deada54eae?auto=format&fit=crop&w=800&q=60'; name='p7.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=60'; name='p8.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1558981403-c5f9895adf64?auto=format&fit=crop&w=800&q=60'; name='p9.jpg' },

    @{ url = 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=60'; name='h1.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=800&q=60'; name='h2.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=60'; name='h3.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1496317556649-f930d733eea2?auto=format&fit=crop&w=800&q=60'; name='h4.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1509460913899-8a6c9b0c7b1c?auto=format&fit=crop&w=800&q=60'; name='h5.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1528150177507-9462d4f1f9bc?auto=format&fit=crop&w=800&q=60'; name='h6.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1504198458649-3128b932f49f?auto=format&fit=crop&w=800&q=60'; name='h7.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1495121605193-b116b5b09b1a?auto=format&fit=crop&w=800&q=60'; name='h8.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=60'; name='h9.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=60'; name='h10.jpg' },

    @{ url = 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=60'; name='f1.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=60'; name='f2.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=60'; name='f3.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=60'; name='f4.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=800&q=60'; name='f5.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1548092333-3d1b8f2a8b5d?auto=format&fit=crop&w=800&q=60'; name='f6.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=60'; name='f7.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=60'; name='f8.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1495433324511-bf8e92934d90?auto=format&fit=crop&w=800&q=60'; name='f9.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=60'; name='f10.jpg' }
)

$outDir = Join-Path -Path $PSScriptRoot -ChildPath 'public\images'
if (-not (Test-Path $outDir)) {
    New-Item -Path $outDir -ItemType Directory -Force | Out-Null
}

foreach ($item in $images) {
    $target = Join-Path $outDir $item.name
    Write-Host "Downloading $($item.url) -> $target"
    try {
        Invoke-WebRequest -Uri $item.url -OutFile $target -UseBasicParsing -ErrorAction Stop
    } catch {
        Write-Warning "Failed to download $($item.url): $_"
    }
}

Write-Host "Done. Images saved to $outDir"
