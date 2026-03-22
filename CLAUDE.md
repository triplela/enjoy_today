# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**享受今天 (Enjoy Today)** - A mobile-first Vue 3 application that randomly generates activity suggestions based on user preferences (number of people and location). Features a two-stage dice roll: first selects a category, then selects a specific activity.

## Commands

- **Development**: `pnpm dev` (starts Vite dev server on http://localhost:5173/)
- **Build**: `pnpm build` (runs `vue-tsc --noEmit && vite build`)
- **Preview**: `pnpm preview` (preview production build)
- **Install**: `pnpm install`

## Architecture

### Tech Stack
- Vue 3 with Composition API (`<script setup lang="ts">`)
- Vite for build tooling
- TypeScript with strict checking
- Pinia for state management (`src/store/game.ts`)
- Vue Router (`src/router/index.ts`)
- TailwindCSS v4 for styling (`@import "tailwindcss"` in main.css)
- Lucide Vue Next for icons

### Application Flow
1. **Home** (`/`) - Landing page with CTA to start
2. **Options** (`/options`) - User selects people count (solo/small/group) and location (outdoor/indoor/both)
3. **Preview** (`/preview`) - Shows 6 candidate categories (stage 1) or 6 candidate activities (stage 2)
4. **Rolling** (`/rolling`) - Animated 3D dice roll with loading text
5. **Result** (`/result`) - Displays selected category and activity

### Core Data Model

**Location**: `'indoor' | 'outdoor' | 'both'`
**People**: `'solo' | 'small' | 'group'`

**Activity filtering** (`src/store/game.ts:refreshCandidateActivities()`):
- Tier 1: Strict match on location and people
- Tier 2: Relaxed location (allows 'both')
- Tier 3: Relaxed people
- Tier 4: All activities in category (guarantees 6+ options)

**Categories** (`src/data/activities.ts`):
- food (舌尖出走) - dining activities
- game (全城撒欢) - games and entertainment
- rest (灵魂马杀鸡) - relaxation activities
- shopping (钱包快乐屋) - shopping activities
- adventure (奇遇地图) - outdoor exploration
- learning (思维漫游) - self-improvement
- creativity (脑洞手作) - DIY and crafts
- sport (多巴胺工厂) - sports and fitness

### Category Filtering Logic
Categories are filtered based on location preference (`src/store/game.ts:refreshCandidateCategories()`):
- Outdoor: food, game, adventure, creativity, sport, shopping
- Indoor: food, game, rest, learning, creativity, shopping
- Both: all categories

### State Management

**Game Store** (`src/store/game.ts`):
- `peopleCount`, `goOut` - User selections
- `rollStage` - 'idle' | 'category' | 'activity'
- `currentCategory`, `currentActivity` - Selected results
- `candidateCategories`, `candidateActivities` - 6 randomized options for preview
- `rollCount` - Tracks re-rolls for easter egg messages
- `history` - Past selections

### Styling Architecture

**Design System** (`src/assets/styles/main.css`):
- Minimalist monochrome aesthetic with Starlight (warm silver-champagne) accents
- CSS custom properties for theming
- Mobile-first: main container max-width 448px
- Custom utility classes: `.clay-card`, `.btn-primary`, `.btn-secondary`, `.btn-select`, `.btn-accent`

**Color Palette** (Starlight theme):
- Background: `#FFFFFF` (pure white)
- Surface: `#F5F5F5` (light gray)
- Primary: `#000000` (black)
- Accent Primary: `#E6DCD1` (Starlight)
- Accent Light: `#F2EDE8` (Starlight light)
- Accent Dark: `#C9B8A8` (Starlight dark)
- Text: `#111827` (near black), `#6B7280` (gray)

### Dice Component (`src/components/Dice.vue`)
- CSS-only 3D cube with 6 faces
- Uses `transform-style: preserve-3d` and `perspective: 1000px`
- Rolling animation: 1.5s duration

### Path Aliases
Vite config sets `@/` to `/src/` for imports.

## Design Context

### Brand Personality
**Playful, friendly, refined** - Light & enjoyable, make choosing an activity feel effortless and delightful.

### Aesthetic Direction
Minimalist monochrome with playful touches. Clean whitespace, strong typography, intentional color pops.

**References**: Apple.com, Linear, Notion

**Anti-references** (avoid): Excessive decoration, dark moody aesthetics, corporate stiffness.

### Design Principles
1. **Radical simplicity** — Every element earns its place
2. **Typography as hero** — Strong type hierarchy
3. **Whitespace is content** — Generous breathing room
4. **Subtle playfulness** — Friendly without being cartoonish
5. **Monochrome foundation** — Black, white, grays with strategic Starlight accents