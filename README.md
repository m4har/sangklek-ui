# artcraft-ui

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
cp -r artcraft-ui/components/ui        src/components/ui
cp -r artcraft-ui/components/landing   src/components/landing
cp -r artcraft-ui/components/cms       src/components/cms
cp -r artcraft-ui/components/dashboard src/components/dashboard
cp    artcraft-ui/lib/utils.ts         src/lib/utils.ts
```

### 5. Done

```ts
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/cms/data-table"
import { AdminShell } from "@/components/dashboard/admin-shell"
```

## Registry config (optional)

`components.json` is already set up so the shadcn CLI recognizes this structure if the kit is later published as a registry:

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
`Button` · `Badge` · `Card` · `Input` / `Textarea` · `Label` · `Field` / `FieldLabel` · `Table` · `Navbar` / `Footer` · `Frame` / `Tick` / `Eyebrow` / `SectionHeading` / `Lead`

`components/landing` — public page blocks
`Hero` · `AppGrid` / `AppCard` · `Features` / `CtaBand`

`components/cms` — authoring tools
`DataTable` / `StatusPill` · `EditorLayout` / `ContentRow` / `EditorSidebar`

`components/dashboard` — admin console
`AdminShell` · `StatCard` / `BarSeries` · `ActivityFeed`

Full per-component usage, with examples and props tables, lives in `docs/DocsPage.tsx`.

## Verification

```bash
npm run typecheck
```

## Notes

- `"use client"` appears only in components that genuinely need state (`Navbar`, `DataTable`, `AdminShell`). Everything else is server-renderable.
- `BarSeries` deliberately ships with no chart dependency. Swap in a library when you need axes and zoom.
- Every component accepts `className` and merges it through `cn()` (clsx + tailwind-merge), so Tailwind utility overrides always win in the right order.

## License

MIT.
