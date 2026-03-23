# Product Requirements Document (PRD)

## 今日可期 (Enjoy Today)

**Version:** 1.0.0
**Last Updated:** 2026-03-23
**Status:** Released

---

## 1. Executive Summary

**今日可期 (Enjoy Today)** is a mobile-first Vue 3 application that helps users overcome "decision paralysis" by randomly generating personalized activity suggestions. Through an engaging two-stage dice roll experience, the app transforms the often overwhelming task of choosing what to do into a delightful, gamified interaction.

### Key Value Propositions
- **Eliminates decision fatigue** - Random selection removes the burden of choice
- **Personalized recommendations** - Activities filtered by group size and location preference
- **Gamified experience** - Two-stage dice roll creates anticipation and fun
- **Beautiful, minimal design** - Clean interface that feels premium and intentional

---

## 2. Target Users

### Primary Personas

| Persona | Description | Key Needs |
|---------|-------------|-----------|
| **The Indecisive Individual** | Young professionals who struggle with choosing how to spend free time | Quick, no-overthinking activity suggestions |
| **Social Planners** | Friends/couples planning outings together | Group-appropriate activity ideas |
| **Spontaneous Explorers** | People seeking new experiences | Discovery of activities they wouldn't normally consider |

### User Demographics
- Age: 18-45
- Location: Chinese-speaking regions (UI in Chinese)
- Tech-savvy mobile users
- Urban/suburban dwellers with access to various activity options

---

## 3. User Stories

### Core User Journey

```
As a user who can't decide what to do today,
I want to get a random activity suggestion based on my situation,
So that I can spend less time deciding and more time enjoying.
```

### Detailed User Stories

| ID | User Story | Priority | Status |
|----|------------|----------|--------|
| US-001 | As a user, I want to specify how many people are participating so activities are appropriate for my group size | High | Implemented |
| US-002 | As a user, I want to specify if I prefer indoor or outdoor activities so suggestions match my mood/weather | High | Implemented |
| US-003 | As a user, I want to see a preview of possible categories before rolling so I understand my options | Medium | Implemented |
| US-004 | As a user, I want an animated dice roll experience so the selection feels exciting and random | High | Implemented |
| US-005 | As a user, I want to re-roll if I don't like the result so I'm not stuck with an unwanted suggestion | High | Implemented |
| US-006 | As a user, I want to see my selection history so I can track activities I've done | Low | Implemented |
| US-007 | As a user, I want the app to work offline so I can use it anywhere | Medium | Implemented (Electron desktop) |

---

## 4. Functional Requirements

### 4.1 Core Features

#### F-001: User Preference Selection
**Description:** Users select their activity constraints before rolling.

**Inputs:**
| Parameter | Options | Description |
|-----------|---------|-------------|
| People Count | Solo / Small Group / Large Group | Number of participants |
| Location | Indoor / Outdoor / Both | Preferred activity setting |

**Behavior:**
- Selection is required before proceeding to rolling
- Invalid inputs are gracefully handled with sensible defaults
- Selections persist during session but reset on app restart

#### F-002: Two-Stage Dice Roll
**Description:** Animated selection process with two distinct phases.

**Stage 1 - Category Selection:**
1. Display 6 candidate categories as preview cards
2. User initiates roll
3. 1.5-second animated 3D dice roll
4. Random category selected from candidates
5. Navigate to Stage 2

**Stage 2 - Activity Selection:**
1. Display 6 candidate activities within selected category
2. User initiates roll
3. 1.5-second animated 3D dice roll
4. Random activity selected
5. Navigate to result screen

**Animation Specifications:**
- Duration: 1500ms (defined by `DICE_ROLL_DURATION`)
- 3D CSS cube with 6 faces
- Uses `transform-style: preserve-3d` and `perspective: 1000px`
- Displays random loading text during animation

#### F-003: Category System
**Description:** Activities organized into 8 thematic categories.

| Category ID | Name | Subtitle | Icon | Primary Focus |
|-------------|------|----------|------|---------------|
| `food` | 舌尖出走 | 唯有美食与爱不可辜负 | utensils | Dining experiences |
| `game` | 全城撒欢 | 生活就是一场大型游戏 | gamepad-2 | Games & entertainment |
| `rest` | 灵魂马杀鸡 | 把时间浪费在美好事物上 | bath | Relaxation |
| `shopping` | 钱包快乐屋 | 遇见心动好物快乐带回家 | shopping-cart | Shopping |
| `adventure` | 奇遇地图 | 收集城市里的每一次惊喜 | map-pinned | Outdoor exploration |
| `learning` | 思维漫游 | 探索知识的无限可能 | book-open | Self-improvement |
| `creativity` | 脑洞手作 | 让奇思妙想在指尖跳舞 | palette | DIY & crafts |
| `sport` | 多巴胺工厂 | 给身体来场痛快的充电 | dumbbell | Sports & fitness |

**Category Filtering Logic:**
| Location Preference | Available Categories |
|---------------------|---------------------|
| Outdoor | food, game, adventure, creativity, sport, shopping |
| Indoor | food, game, rest, learning, creativity, shopping |
| Both | All 8 categories |

#### F-004: Activity Filtering Algorithm
**Description:** Tiered filtering ensures 6+ activities always available.

```
Tier 1: Strict match (exact location + people)
    ↓ If < 6 activities
Tier 2: Relaxed location (allow 'both' location)
    ↓ If < 6 activities
Tier 3: Relaxed people (allow any people)
    ↓ If < 6 activities
Tier 4: All activities in category (guaranteed fallback)
```

**Activity Data Structure:**
```typescript
interface Activity {
  name: string;           // Activity name (Chinese)
  location: Location;     // 'indoor' | 'outdoor' | 'both'
  people: People[];       // ['solo'] | ['small'] | ['group'] | combinations
  apps?: string[];        // Suggested companion apps
  icon?: string;          // Lucide icon identifier
}
```

#### F-005: Easter Eggs
**Description:** Hidden messages triggered by re-roll behavior.

| Roll Count | Message |
|------------|---------|
| 3 | 你似乎有点犹豫呢，要相信自己的直觉~ |
| 5 | 刚才那个其实也不错哦，有时候第一感觉最准 |
| 8 | 要不让朋友帮你选？或者...听从命运的安排 |
| 10 | 我真的尽力了...但好的选择值得等待，不是吗？ |
| 15 | 你发现了隐藏成就：选择困难症晚期 😄 |

---

## 5. Technical Requirements

### 5.1 Technology Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Vue 3 (Composition API) | ^3.5.30 |
| Build Tool | Vite | ^8.0.1 |
| Language | TypeScript | ^5.8.2 |
| State Management | Pinia | ^3.0.4 |
| Routing | Vue Router | ^5.0.4 |
| Styling | TailwindCSS | ^4.2.2 |
| Icons | Lucide Vue Next | ^0.577.0 |
| Desktop | Electron | ^35.1.2 |
| Testing | Vitest | ^4.1.0 |

### 5.2 Architecture Overview

```
src/
├── main.ts                 # App entry point
├── App.vue                 # Root component
├── router/
│   └── index.ts           # Vue Router configuration
├── store/
│   └── game.ts            # Pinia store (state management)
├── data/
│   └── activities.ts      # Categories & activities data
├── components/
│   └── Dice.vue           # 3D animated dice component
├── pages/
│   ├── Home.vue           # Landing page
│   ├── Options.vue        # Preference selection
│   ├── Preview.vue        # Candidate preview
│   ├── Rolling.vue        # Dice roll animation
│   ├── Result.vue         # Final result display
│   └── NotFound.vue       # 404 page
└── assets/
    └── styles/
        └── main.css       # TailwindCSS + custom styles
```

### 5.3 State Management

**Game Store (`src/store/game.ts`)**
```typescript
interface GameState {
  // User selections
  peopleCount: '' | 'solo' | 'small' | 'group';
  goOut: '' | 'indoor' | 'outdoor' | 'both';

  // Rolling state
  rolling: boolean;
  rollStage: 'idle' | 'category' | 'activity';
  rollCount: number;
  currentDiceFace: number;

  // Results
  currentCategory: Category | null;
  currentActivity: Activity | null;
  candidateCategories: Category[];
  candidateActivities: Activity[];

  // History (max 50 entries)
  history: { category: Category; activity: Activity }[];
}
```

### 5.4 Routing Structure

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Home | Landing page with CTA |
| `/options` | Options | Preference selection |
| `/preview` | Preview | Show 6 candidates before roll |
| `/rolling` | Rolling | Animated dice roll |
| `/result` | Result | Display selected category & activity |
| `/:pathMatch(.*)*` | NotFound | 404 fallback |

### 5.5 Platform Support

**Desktop Application (Electron):**
- Windows (x64, ia32) - NSIS installer
- macOS (x64, arm64) - DMG
- Linux (x64) - AppImage

**Build Commands:**
```bash
pnpm electron:dev    # Development with hot reload
pnpm dist            # Build all platforms
pnpm dist:win        # Windows only
pnpm dist:mac        # macOS only
pnpm dist:linux      # Linux only
```

---

## 6. Design Requirements

### 6.1 Design System

**Color Palette (Starlight Theme):**
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | #FFFFFF | Main background |
| `--bg-secondary` | #F5F5F5 | Card backgrounds |
| `--accent-primary` | #E6DCD1 | Starlight accent |
| `--accent-light` | #F2EDE8 | Light accent |
| `--accent-dark` | #C9B8A8 | Dark accent |
| `--text-primary` | #111827 | Primary text |
| `--text-secondary` | #6B7280 | Secondary text |

**Typography:**
- Font Family: Inter
- Weights: 300, 400, 500, 600, 700
- Display: 600 weight, -0.02em letter-spacing

**Spacing & Radius:**
| Token | Value |
|-------|-------|
| `--radius-sm` | 8px |
| `--radius-md` | 12px |
| `--radius-lg` | 16px |
| `--radius-xl` | 24px |

### 6.2 Design Principles

1. **Radical Simplicity** - Every element earns its place
2. **Typography as Hero** - Strong type hierarchy
3. **Whitespace is Content** - Generous breathing room
4. **Subtle Playfulness** - Friendly without being cartoonish
5. **Monochrome Foundation** - Black, white, grays with strategic Starlight accents

### 6.3 Brand Personality

**Keywords:** Playful, Friendly, Refined

**References:** Apple.com, Linear, Notion

**Anti-references (avoid):** Excessive decoration, dark moody aesthetics, corporate stiffness

### 6.4 Accessibility

- Focus-visible outlines for keyboard navigation
- Reduced motion support (`prefers-reduced-motion`)
- Minimum touch targets: 48x48px
- High contrast text (WCAG AA compliant)

---

## 7. Non-Functional Requirements

### 7.1 Performance
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Animation frame rate: 60fps
- Bundle size: Optimized via Vite

### 7.2 Reliability
- Graceful degradation for edge cases
- Input validation with sensible defaults
- History limited to 50 entries to prevent memory issues

### 7.3 Maintainability
- TypeScript strict mode enabled
- Component-based architecture
- Clear separation of concerns (data/store/views)

---

## 8. Data Specification

### 8.1 Activity Inventory

**Total Activities by Category:**
| Category | Activity Count |
|----------|---------------|
| food | 40 |
| game | 19 |
| rest | 33 |
| shopping | 23 |
| adventure | 26 |
| learning | 21 |
| creativity | 24 |
| sport | 20 |
| **Total** | **206** |

### 8.2 Loading Messages
10 randomized loading messages displayed during dice roll animation (see `src/data/activities.ts:loadingTexts`)

---

## 9. Future Considerations

### Potential Enhancements (Not in Current Scope)
- [ ] User accounts and preference persistence
- [ ] Location-based activity suggestions (GPS integration)
- [ ] Social sharing of selected activities
- [ ] Custom activity creation
- [ ] Weather API integration for smarter suggestions
- [ ] Multi-language support
- [ ] Activity favorites/bookmarks
- [ ] Time-based filtering (morning/afternoon/evening)
- [ ] Budget-based filtering

---

## 10. Glossary

| Term | Definition |
|------|------------|
| Stage 1 | First dice roll - selects category from candidates |
| Stage 2 | Second dice roll - selects activity within category |
| Candidate | One of 6 preview items shown before rolling |
| Fisher-Yates Shuffle | Algorithm used for randomizing candidates |
| Starlight | Warm silver-champagne accent color (#E6DCD1) |
| Tiered Filtering | Multi-level activity matching algorithm |

---

## 11. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-23 | triplela | Initial PRD creation |

---

## 12. Appendix

### A. Activity Data Examples

```typescript
// Solo indoor food activity
{ name: '中华小当家', location: 'indoor', people: ['solo'], icon: 'chef-hat', apps: ['菜谱app'] }

// Group outdoor sport activity
{ name: '打篮球', location: 'outdoor', people: ['group'], icon: 'circle', apps: ['app'] }

// Flexible activity (any people, both locations)
{ name: '汉堡薯条', location: 'both', people: ['solo', 'small', 'group'], icon: 'sandwich', apps: ['点评app', '外卖app'] }
```

### B. Component Hierarchy

```
App.vue
├── Router View
│   ├── Home.vue
│   ├── Options.vue
│   ├── Preview.vue
│   ├── Rolling.vue
│   │   └── Dice.vue
│   ├── Result.vue
│   └── NotFound.vue
└── (Pinia Store: game.ts)
```