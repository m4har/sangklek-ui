import { Frame, Eyebrow, SectionHeading, Lead } from "@/components/ui/section"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Rule } from "@/components/ui/rule"
import { Skeleton, SkeletonText } from "@/components/ui/skeleton"
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
      { name: "asChild", type: "boolean", note: "Radix Slot to wrap a link" },
      { name: "loading", type: "boolean", note: "spinner + blocked interaction" },
      { name: "iconLeft / iconRight", type: "ReactNode", note: "slot rendered before/after the label" },
    ],
    code: `import { Button } from "@/components/ui/button"

<Button variant="outline" size="sm">Edit</Button>
<Button asChild>
  <a href="/login">Sign in</a>
</Button>
<Button iconLeft={<PlusIcon />} loading>Save</Button>`,
    demo: <ButtonDemo />,
  },
  {
    title: "Badge",
    desc: "Pill monospace 10px uppercase. Defaults to outline.",
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
    desc: "Label = micro HUD text. Field groups label, hint, and error.",
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
    desc: "Free-composition component. 1px rules, radius 0.",
    props: [
      { name: "Card", type: "container" },
      { name: "CardHeader / Title / Description", type: "block" },
      { name: "CardContent", type: "free block" },
      { name: "CardFooter", type: "action row" },
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
    desc: "Primitive table, used through DataTable in the CMS layer.",
    props: [
      { name: "TableHeader / TableBody / TableRow", type: "structure" },
      { name: "TableHead / TableCell", type: "cell" },
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
    desc: "KPI tile + bar chart with no dependencies.",
    props: [
      { name: "StatCard.value", type: "string | number" },
      { name: "StatCard.delta", type: "number", note: "percent, +/− sign" },
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
        <CardContent>Below 1024px the sidebar becomes an off-canvas drawer opened with the hamburger button. On desktop it stays sticky at full height.</CardContent>
      </Card>
    ),
  },
  {
    title: "Rule",
    desc: "Industrial cm/inch measurement ruler. Tick gradient + HUD labels + cursor/scroll readout. No chart dep.",
    props: [
      { name: "unit", type: '"cm" | "in"', note: "default cm" },
      { name: "orientation", type: '"horizontal" | "vertical"', note: "default horizontal" },
      { name: "ppi", type: "number", note: "calibrate display; 96 = CSS default" },
      { name: "length", type: "number", note: "cap in units; omit to fill container" },
      { name: "offset", type: "number", note: "numbering offset for continuation" },
      { name: "flip", type: "boolean", note: "mirror the tick side" },
      { name: "hideLabels", type: "boolean" },
      { name: "trackCursor", type: "boolean", note: "live readout follows the pointer" },
      { name: "scrollTarget", type: '"self" | selector', note: "readout tracks scroll position of an ancestor" },
    ],
    code: `import { Rule } from "@/components/ui/rule"

// Sticky top rule on the main layout, inches
<Rule unit="in" trackCursor className="border-x border-border" />

// Vertical rail that mirrors the page scroll position
<Rule unit="cm" orientation="vertical" scrollTarget="self" />`,
    demo: (
      <div className="flex flex-col gap-6">
        <div>
          <Label className="mb-1 block">cm — cursor readout</Label>
          <Rule unit="cm" length={30} trackCursor className="border border-border" />
        </div>
        <div>
          <Label className="mb-1 block">in — cursor readout</Label>
          <Rule unit="in" length={12} trackCursor className="border border-border" />
        </div>
        <div className="flex items-start gap-4">
          <div className="h-[240px] overflow-y-auto border border-border p-2">
            <div className="h-[640px]" />
          </div>
          <Rule unit="cm" orientation="vertical" className="h-[240px] border border-border" scrollTarget="self" />
          <p className="max-w-xs text-sm text-muted-foreground">
            Vertical rule bound to <code className="font-mono text-xs">scrollTarget="self"</code>: the accent origin marker
            and cm readout ride along with the scroll position of the overflow ancestor.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Skeleton",
    desc: "Shimmer placeholder. Pure CSS band — no JS, no deps. Use for content with a known shape.",
    props: [
      { name: "className", type: "string" },
      { name: "lines", type: "number", note: "SkeletonText: how many bars, last one shorter" },
    ],
    code: `import { Skeleton, SkeletonText } from "@/components/ui/skeleton"

<Skeleton className="h-16 w-40" />
<SkeletonText lines={3} />`,
    demo: (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Skeleton className="size-10" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <SkeletonText lines={4} />
      </div>
    ),
  },
]

export default function DocsPage() {
  return (
    <div className="flex min-w-0 flex-col gap-8">
      <Frame>
        <Eyebrow index="00" label="ArtCraft UI" meta="Reference" />
        <div className="px-6 py-12 md:px-10 md:py-16">
          <SectionHeading>A component kit, ready to use.</SectionHeading>
          <Lead className="mt-4">
            Extracted from getartcraft.com. Radius 0, crop marks, HUD monospace. Every component accepts
            className via cn() and is safe to override with Tailwind utilities.
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
