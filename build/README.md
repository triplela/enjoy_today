# Build Icons

This directory contains application icons for Electron packaging.

## Required Icons

| Platform | File | Size | Notes |
|----------|------|------|-------|
| Windows | `icon.ico` | 256x256 | Multi-resolution ICO recommended |
| macOS | `icon.icns` | 512x512 | Multi-resolution ICNS recommended |
| Linux | `icon.png` | 512x512 | PNG with transparency |

## Generating Icons

### From a single PNG (512x512 recommended):

**Using electron-icon-builder:**
```bash
npx electron-icon-builder --input=./logo.png --output=./build
```

**Manual approach:**

1. **Windows (.ico)**
   - Use online tools like [icoconvert.com](https://icoconvert.com/)
   - Or use ImageMagick: `convert icon.png -define icon:auto-resize=256,128,64,48,32,16 icon.ico`

2. **macOS (.icns)**
   - Use `iconutil` on macOS:
     ```bash
     mkdir icon.iconset
     sips -z 16 16 icon.png --out icon.iconset/icon_16x16.png
     sips -z 32 32 icon.png --out icon.iconset/icon_16x16@2x.png
     sips -z 32 32 icon.png --out icon.iconset/icon_32x32.png
     sips -z 64 64 icon.png --out icon.iconset/icon_32x32@2x.png
     sips -z 128 128 icon.png --out icon.iconset/icon_128x128.png
     sips -z 256 256 icon.png --out icon.iconset/icon_128x128@2x.png
     sips -z 256 256 icon.png --out icon.iconset/icon_256x256.png
     sips -z 512 512 icon.png --out icon.iconset/icon_256x256@2x.png
     sips -z 512 512 icon.png --out icon.iconset/icon_512x512.png
     sips -z 1024 1024 icon.png --out icon.iconset/icon_512x512@2x.png
     iconutil -c icns icon.iconset -o icon.icns
     ```

3. **Linux (.png)**
   - Use the 512x512 PNG directly

## Placeholder Icons

If icons are missing, electron-builder will use default Electron icons.
Replace these before production release.