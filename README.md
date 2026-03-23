# 今日可期 (Enjoy Today)

A mobile-first Vue 3 app that randomly generates activity suggestions based on user preferences with a two-stage dice roll animation. Available as a web app and desktop application (Electron).

## Tech Stack

Vue 3, TypeScript, Vite, Pinia, Vue Router, TailwindCSS v4, Lucide Vue Next, Electron

## Development

```bash
pnpm install        # Install dependencies

# Web development
pnpm dev            # Start dev server at http://localhost:5173/
pnpm build          # Type check and build for production
pnpm preview        # Preview production build

# Electron development
pnpm electron:dev   # Start dev server + Electron with hot reload
pnpm electron:preview  # Build and launch Electron app locally

# Package for distribution
pnpm dist           # Build installers for current platform
pnpm dist:win       # Build Windows installer (.exe)
pnpm dist:mac       # Build macOS disk image (.dmg)
pnpm dist:linux     # Build Linux AppImage
```

## Launching the App

### Development Version
Run `pnpm electron:dev` to start the Vite dev server and launch Electron with hot module replacement. DevTools opens automatically.

### Production Build Locally
Run `pnpm electron:preview` to build the frontend and launch the app as it would run when packaged.

### Packaged Application
After running `pnpm dist`, find the executable in the `release/` folder:
- **Windows**: `release/今日可期 Setup 1.0.0.exe`
- **macOS**: `release/今日可期-1.0.0.dmg`
- **Linux**: `release/今日可期-1.0.0.AppImage`

Double-click the executable to launch. No Node.js or browser required.

## How It Works

1. Select group size (solo/small/group) and location (indoor/outdoor/both)
2. Preview 6 randomized categories → Roll dice to select one
3. Preview 6 activities from that category → Roll dice to get your suggestion

## License

Apache 2.0