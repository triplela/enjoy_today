# 享受今天 (Enjoy Today)

A mobile-first Vue 3 app that randomly generates activity suggestions based on user preferences with a two-stage dice roll animation.

## Tech Stack

Vue 3, TypeScript, Vite, Pinia, Vue Router, TailwindCSS v4, Lucide Vue Next

## Development

```bash
pnpm install   # Install dependencies
pnpm dev       # Start dev server at http://localhost:5173/
pnpm build     # Type check and build for production
pnpm preview   # Preview production build
```

## How It Works

1. Select group size (solo/small/group) and location (indoor/outdoor/both)
2. Preview 6 randomized categories → Roll dice to select one
3. Preview 6 activities from that category → Roll dice to get your suggestion

## License

Apache 2.0