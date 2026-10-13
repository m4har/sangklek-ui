import { Frame, Eyebrow, SectionHeading, Lead } from "@/components/ui/section"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ButtonDemo, BadgeDemo, InputDemo, CardDemo, TableDemo,
  SectionDemo, NavbarDemo, StatDemo, BarDemo, LabelDemo,
} from "@/components/docs/demos"

type Block = {
  title: string
  desc?: string
  props?: { name: string; type: string; note?: string }[]
  code: string
  demo: React.ReactNode
}

const BLOCKS: Block[] = [
  {
    title: "Button",
    desc: "cva-based, 6 variant, 4 size. asChild merender children sebagai element.",
    props: [
      { name: "variant", type: 'default | "outline" | "secondary" | "ghost" | "destructive" | "link"' },
      { name: "size", type: 'default | "sm" | "lg" | "icon"' },
      { name: "asChild", type: "boolean", note: "Slot Radix untuk wrap link" },
    ],
    code: `import { Button } from "@/components/ui/button"

<Button variant="outline" size="sm">Edit</Button>
<Button asChild>
  <a href="/login">Sign in</a>
</Button>`,
    demo: <ButtonDemo />,
  },
  {
    title: "Badge",
    desc: "Pill monospace 10px uppercase. Default ke outline.",
    props: [
      { name: "variant", type: '"default" | "outline" | "accent"' },
    ],
    code: `import { Badge } from "@/components/ui/badge"

<Badge>Stable</Badge>
<Badge variant="accent">Early alpha</Badge>`,
    demo: <BadgeDemo />,
  },
  {
    title: "Input / Textarea",
    desc: "Ring 2px saat fokus. Textarea min-h 32.",
    props: [
      { name: "className", type: "string", note: "override via cn()" },
    ],
    code: `import { Input, Textarea } from "@/components/ui/input"

<Input placeholder="Search…" />
<Textarea rows={4} />`,
    demo: <InputDemo />,
  },
  {
    title: "Label / Field",
    desc: "Label = HUD mikro. Field menyatukan label, hint, dan error.",
    props: [
      { name: "Field.label", type: "string" },
      { name: "Field.hint", type: "ReactNode" },
      { name: "Field.error", type: "string", note: "merender role=alert" },
      { name: "Field.htmlFor", type: "string" },
    ],
    code: `import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

<Field label="Email" htmlFor="email" error="Enter a valid email">
  <Input id="email" type="email" />
</Field>`,
    demo: <LabelDemo />,
  },
  {
    title: "Card",
    desc: "Komponen komposisi bebas. Garis 1px, radius 0.",
    props: [
      { name: "Card", type: "container" },
      { name: "CardHeader / Title / Description", type: "blok" },
      { name: "CardContent", type: "blok bebas" },
      { name: "CardFooter", type: "baris aksi" },
    ],
    code: `import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

<Card>
  <CardHeader><CardTitle>Title</CardTitle></CardHeader>
  <CardContent>Body</CardContent>
</Card>`,
    demo: <CardDemo />,
  },
  {
    title: "Table",
    desc: "Primitif table, dipakaikan lewat DataTable di lapisan CMS.",
    props: [
      { name: "TableHeader / TableBody / TableRow", type: "struktur" },
      { name: "TableHead / TableCell", type: "sel" },
    ],
    code: `import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"

<Table>
  <TableHeader>…</TableHeader>
  <TableBody>…</TableBody>
</Table>`,
    demo: <TableDemo />,
  },
  {
    title: "Section kit (Frame, Eyebrow, SectionHeading, Lead)",
    desc: "Frame = kolom border + crop mark. Eyebrow = HUD strip sticky.",
    props: [
      { name: "Frame.ticks", type: "boolean", note: "tampilkan crop mark" },
      { name: "Eyebrow.index", type: "string" },
      { name: "Eyebrow.label", type: "string" },
      { name: "Eyebrow.meta", type: "ReactNode" },
    ],
    code: `import { Frame, Eyebrow, SectionHeading, Lead } from "@/components/ui/section"

<Frame>
  <Eyebrow index="01" label="Overview" meta="Open source" />
  <SectionHeading>Heading</SectionHeading>
</Frame>`,
    demo: <SectionDemo />,
  },
  {
    title: "Navbar / Footer",
    desc: "Navbar sticky top, mobile menu toggle. Footer grid 4 kolom.",
    props: [
      { name: "Navbar.brand", type: "string" },
      { name: "Navbar.items", type: "NavItem[]" },
      { name: "Navbar.action", type: "ReactNode" },
      { name: "Footer.columns", type: "{title, links}[]" },
    ],
    code: `import { Navbar } from "@/components/ui/navbar"

<Navbar brand="Craft" items={[{ label: "Apps", href: "/apps" }]} />`,
    demo: <NavbarDemo />,
  },
  {
    title: "StatCard / BarSeries",
    desc: "KPI + grafik batang tanpa dependensi.",
    props: [
      { name: "StatCard.value", type: "string | number" },
      { name: "StatCard.delta", type: "number", note: "persen, tanda +/−" },
      { name: "BarSeries.data", type: "SeriesPoint[]" },
      { name: "BarSeries.height", type: "number" },
    ],
    code: `import { StatCard, BarSeries } from "@/components/dashboard/stat-card"

<StatCard label="MRR" value="$12.4k" delta={8} />
<BarSeries data={[{ label: "Jan", value: 40 }]} />`,
    demo: <StatDemo />,
  },
  {
    title: "AdminShell",
    desc: "Drawer mobile hamburger + sidebar sticky desktop.",
    props: [
      { name: "items", type: "SidebarItem[]" },
      { name: "title", type: "string" },
      { name: "actions", type: "ReactNode" },
    ],
    code: `import { AdminShell } from "@/components/dashboard/admin-shell"

<AdminShell brand="Console" items={items} title="Content">
  {children}
</AdminShell>`,
    demo: (
      <Card className="max-w-md">
        <CardHeader><CardTitle>Sticky layout</CardTitle></CardHeader>
        <CardContent>Di layar di bawah 1024px, sidebar jadi off-canvas drawer dengan tombol hamburger. Di desktop ia sticky full-height.</CardContent>
      </Card>
    ),
  },
]

export default function DocsPage() {
  return (
    <div className="flex min-w-0 flex-col gap-8">
      <Frame>
        <Eyebrow index="00" label="ArtCraft UI" meta="Reference" />
        <div className="px-6 py-12 md:px-10 md:py-16">
          <SectionHeading>Kit komponen, pakai langsung.</SectionHeading>
          <Lead className="mt-4">
            Ekstrak dari getartcraft.com. Radius 0, crop mark, HUD monospace. Semua komponen menerima
            className via cn() dan aman untuk Tailwind utility.
          </Lead>
        </div>
      </Frame>

      {BLOCKS.map((b) => (
        <section key={b.title} data-doc={b.title.toLowerCase()} aria-label={b.title}>
          <div className="flex items-center gap-3">
            <h3 className="font-display text-2xl font-medium tracking-[-0.02em]">{b.title}</h3>
            <Badge variant="outline">{b.props?.length ?? 0} props</Badge>
          </div>
          {b.desc ? <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{b.desc}</p> : null}

          <div className="mt-5 grid gap-px bg-border lg:grid-cols-2">
            <div className="bg-background p-6">
              {b.demo}
            </div>
            <pre className="overflow-x-auto bg-[#0b0b0e] p-5 text-[12px] leading-relaxed text-[#c8c8d0]">
              <code>{b.code}</code>
            </pre>
          </div>

          {b.props?.length ? (
            <div className="mt-5 border border-border">
              <TableSimple props={b.props} />
            </div>
          ) : null}
        </section>
      ))}
    </div>
  )
}

function TableSimple({ props }: { props: Block["props"] }) {
  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="border-b border-border text-left">
          <th className="px-4 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Name</th>
          <th className="px-4 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Type</th>
          <th className="px-4 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Note</th>
        </tr>
      </thead>
      <tbody>
        {props!.map((p) => (
          <tr key={p.name} className="border-b border-border/60">
            <td className="px-4 py-2 font-mono text-[12px] text-foreground">{p.name}</td>
            <td className="px-4 py-2 font-mono text-[12px] text-muted-foreground">{p.type}</td>
            <td className="px-4 py-2 text-muted-foreground">{p.note ?? "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
