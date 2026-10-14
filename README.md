# sengklek-ui

A React component design system extracted from [getartcraft.com](https://getartcraft.com/apps). Compatible with [shadcn/ui](https://ui.shadcn.com) conventions (`new-york`, RSC, TSX, `@/` alias, lucide).

Not an npm package. You use it by copying files, same as shadcn: you own the code.

## Visual character

The tokens come straight from the site's CSS bundle, not invented.

| Token | Light | Dark |
| --- | --- | --- |
| `--background` | `#f2f1ee` | `#121316` |
| `--foreground` / ink | `#101014` | `#f2f1ee` |
| `--border` | `#10101429` | — |
| `--accent` | `#2d81ff` | — |
| `--radius` | `0` | `0` |

- Radius is always `0`. There are no rounded corners anywhere in the kit.
- Section corners use crop marks (`Tick`); section bodies are enclosed by `Frame` with vertical rules.
- Micro text uses `Label` (monospace 10px, uppercase, `tracking-[0.1em]`). This is the site's HUD voice.
- Fonts: `Archivo` (display), `Inter` (body), `Instrument Serif` (accent serif), `Geist Mono` (monospace).
- The divider grid between cards uses the `gap-px bg-border` trick so lines read as 1px without doubled borders.

## Requirements

- React 19
- Next.js 15 (optional, components are RSC-safe) or Vite + react-router
- Tailwind CSS v4
- TypeScript

## Installation

### 1. Dependencies

```bash
npm install clsx tailwind-merge class-variance-authority lucide-react @radix-ui/react-slot
npm install -D tailwindcss @tailwindcss/vite tw-animate-css typescript @types/react
```

### 2. Color tokens and fonts

Copy `app/globals.css` into your project. It contains `@import "tailwindcss"`, the `@custom-variant dark` declaration, the `:root` / `.dark` blocks, and the `@theme inline` map that wires variables to Tailwind utilities (`bg-background`, `text-foreground`, `border-border`, `text-accent-foreground`, and so on).

For Vite, import it from your entry:

```ts
import "@/globals.css"
```

### 3. Path alias

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

For Vite, add the resolve alias:

```ts
resolve: { alias: { "@": path.resolve(__dirname, "./src") } }
```

### 4. Copy the components

```bash
cp -r sengklek-ui/components/ui        src/components/ui
cp -r sengklek-ui/components/landing   src/components/landing
cp -r sengklek-ui/components/cms       src/components/cms
cp -r sengklek-ui/components/dashboard src/components/dashboard
cp    sengklek-ui/lib/utils.ts         src/lib/utils.ts
```

### 5. Done

```ts
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/cms/data-table"
import { AdminShell } from "@/components/dashboard/admin-shell"
```

## Install via shadcn CLI (from GitHub)

The repo ships a root `registry.json`, so the shadcn CLI installs items straight from GitHub. No server, no npm publish, and no build step.

Address format: `m4har/sangklek-ui/<item>`

```bash
# List every item
npx shadcn@latest list m4har/sangklek-ui

# Preview before writing files
npx shadcn@latest add m4har/sangklek-ui/button --dry-run

# Install one item (dependencies such as utils come along automatically)
npx shadcn@latest add m4har/sangklek-ui/button

# Install several at once
npx shadcn@latest add m4har/sangklek-ui/rule m4har/sangklek-ui/rule-rail m4har/sangklek-ui/card
```

Items and their target paths (`@ui/`, `@lib/`, `@components/` resolve from your `components.json` aliases):

| Item | Type | Installs to |
| --- | --- | --- |
| `utils` | lib | `@lib/utils.ts` |
| `button`, `badge`, `card`, `input`, `label`, `field`, `table`, `skeleton`, `section`, `navbar` | ui | `@ui/<name>.tsx` |
| `rule`, `rule-rail` | ui | `@ui/rule.tsx`, `@ui/rule-rail.tsx` |
| `globals-css` | file | `app/globals.css` (tokens, fonts, shimmer keyframes) |

Requirements for CLI install: a `components.json` in the project (`npx shadcn@latest init` creates it), and the `@/` alias in `tsconfig`. Keep `globals-css` as the base stylesheet before adding components.

Local dev check of the registry:

```bash
npx shadcn@latest registry validate ./registry.json
npx shadcn@latest build registry.json --output public/r   # optional static JSON
```

## Registry config (optional)

`components.json` is already set up so the shadcn CLI recognizes this structure:

```json
{
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": { "css": "app/globals.css", "baseColor": "neutral", "cssVariables": true },
  "aliases": { "components": "@/components", "ui": "@/components/ui", "lib": "@/lib", "utils": "@/lib/utils", "hooks": "@/hooks" },
  "iconLibrary": "lucide"
}
```

## Component catalog

`components/ui` — primitives
`Button` · `Badge` · `Card` · `Input` / `Textarea` · `Label` · `Field` / `FieldLabel` · `Table` · `Navbar` / `Footer` · `Frame` / `Tick` / `Eyebrow` / `SectionHeading` / `Lead` · `Rule` (cm/inch industrial ruler, horizontal or vertical) · `RuleRail` (fixed right rail, gridcraft-style) · `Skeleton` / `SkeletonText` (shimmer)

`components/landing` — public page blocks
`Hero` · `AppGrid` / `AppCard` · `Features` / `CtaBand`

`components/cms` — authoring tools
`DataTable` / `StatusPill` · `EditorLayout` / `ContentRow` / `EditorSidebar`

`components/dashboard` — admin console
`AdminShell` · `StatCard` / `BarSeries` · `ActivityFeed`

Full per-component usage, with examples and props tables, lives in `docs/DocsPage.tsx`.

## Screenshots

Screenshots are in `docs/screenshots/` (landing page, components, rule rail, console).

## Verification

```bash
npm run typecheck
```

Install from GitHub was verified in an empty Vite + React + TS project: `shadcn add m4har/sangklek-ui/<items>` → `tsc -b` exit 0 → `vite build` exit 0.

## Notes

- `"use client"` appears only in components that genuinely need state (`Navbar`, `DataTable`, `AdminShell`). Everything else is server-renderable.
- `BarSeries` deliberately ships with no chart dependency. Swap in a library when you need axes and zoom.
- Every component accepts `className` and merges it through `cn()` (clsx + tailwind-merge), so Tailwind utility overrides always win in the right order.
- `Rule` renders a cm/inch ruler from a CSS tick gradient — no chart dependency. Accuracy is `ppi`-based (default 96dpi, CSS `cm`/`in`); pass `ppi` to calibrate. `AdminShell` exposes `ruleUnit` to render it under the console header.

## License

MIT.
