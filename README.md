# artcraft-ui

Design system komponen React yang diekstrak dari [getartcraft.com](https://getartcraft.com/apps). Kompatibel dengan konvensi [shadcn/ui](https://ui.shadcn.com) (`new-york`, RSC, TSX, `@/` alias, lucide).

Bukan paket npm. Cara pakainya menyalin file, sama seperti shadcn: kamu yang memiliki kodenya.

## Karakter visual

Tokennya diambil langsung dari CSS bundle situs aslinya, bukan dikarang.

| Token | Light | Dark |
| --- | --- | --- |
| `--background` | `#f2f1ee` | `#121316` |
| `--foreground` / ink | `#101014` | `#f2f1ee` |
| `--border` | `#10101429` | — |
| `--accent` | `#2d81ff` | — |
| `--radius` | `0` | `0` |

- Radius selalu `0`. Tidak ada sudut membulat di seluruh kit.
- Sudut section memakai crop mark (`Tick`), isi section dikurung `Frame` dengan garis vertikal.
- Teks mikro memakai `Label` (monospace 10px, uppercase, `tracking-[0.1em]`). Ini suara HUD situsnya.
- Font: `Archivo` (display), `Inter` (body), `Instrument Serif` (serif aksen), `Geist Mono` (monospace).
- Grid pemisah antar kartu memakai trik `gap-px bg-border` supaya garis jadi 1px tanpa border ganda.

## Prasyarat

- React 19
- Next.js 15 (opsional, komponen RSC-safe) atau Vite + react-router
- Tailwind CSS v4
- TypeScript

## Instalasi

### 1. Dependensi

```bash
npm install clsx tailwind-merge class-variance-authority lucide-react @radix-ui/react-slot
npm install -D tailwindcss @tailwindcss/vite tw-animate-css typescript @types/react
```

### 2. Token warna dan font

Salin `app/globals.css` ke project. Isinya `@import "tailwindcss"`, `@custom-variant dark`, blok `:root` / `.dark`, dan `@theme inline` yang memetakan variabel ke utility Tailwind (`bg-background`, `text-foreground`, `border-border`, `text-accent-foreground`, dan seterusnya).

Untuk Vite, import dari entry:

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

Vite menambahkan resolve alias:

```ts
resolve: { alias: { "@": path.resolve(__dirname, "./src") } }
```

### 4. Salin komponen

```bash
cp -r artcraft-ui/components/ui        src/components/ui
cp -r artcraft-ui/components/landing   src/components/landing
cp -r artcraft-ui/components/cms       src/components/cms
cp -r artcraft-ui/components/dashboard src/components/dashboard
cp    artcraft-ui/lib/utils.ts         src/lib/utils.ts
```

### 5. Selesai

```ts
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/cms/data-table"
import { AdminShell } from "@/components/dashboard/admin-shell"
```

## Konfigurasi registry (opsional)

`components.json` sudah disiapkan supaya CLI shadcn mengenali struktur ini kalau nanti kit dipublikasikan sebagai registry:

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

## Katalog komponen

`components/ui` — primitif
`Button` · `Badge` · `Card` · `Input` / `Textarea` · `Label` · `Field` / `FieldLabel` · `Table` · `Navbar` / `Footer` · `Frame` / `Tick` / `Eyebrow` / `SectionHeading` / `Lead`

`components/landing` — blok halaman publik
`Hero` · `AppGrid` / `AppCard` · `Features` / `CtaBand`

`components/cms` — alat authoring
`DataTable` / `StatusPill` · `EditorLayout` / `ContentRow` / `EditorSidebar`

`components/dashboard` — console admin
`AdminShell` · `StatCard` / `BarSeries` · `ActivityFeed`

Panduan pemakaian lengkap per komponen, dengan contoh dan tabel props, ada di `app/docs/page.tsx`.

## Verifikasi

```bash
npm run typecheck
```

## Catatan

- `"use client"` hanya ada di komponen yang benar-benar butuh state (`Navbar`, `DataTable`, `AdminShell`). Sisanya server-renderable.
- `BarSeries` sengaja tanpa dependensi chart. Ganti ke library kalau butuh sumbu dan zoom.
- Semua komponen menerima `className` dan di-merge lewat `cn()` (clsx + tailwind-merge), jadi override utility Tailwind tetap aman urutannya.

## Lisensi

MIT.