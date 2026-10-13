import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input, Textarea } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Field } from "@/components/ui/field"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Frame, Eyebrow, SectionHeading, Lead, Tick } from "@/components/ui/section"
import { Navbar } from "@/components/ui/navbar"
import { StatCard, BarSeries } from "@/components/dashboard/stat-card"

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button>Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button disabled>Disabled</Button>
    </div>
  )
}

export function BadgeDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="accent">Accent</Badge>
    </div>
  )
}

export function InputDemo() {
  return (
    <div className="flex max-w-sm flex-col gap-4">
      <Field label="Name" htmlFor="demo-name">
        <Input id="demo-name" placeholder="Ada" />
      </Field>
      <Field label="Bio" htmlFor="demo-bio" hint="Markdown">
        <Textarea id="demo-bio" placeholder="Ceritakan." />
      </Field>
    </div>
  )
}

export function CardDemo() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Content block</CardTitle>
        <CardDescription>Composed from Card primitives.</CardDescription>
      </CardHeader>
      <CardContent>Body copy. Override padding via className.</CardContent>
      <CardFooter>
        <Button size="sm" variant="outline">Cancel</Button>
        <Button size="sm">Save</Button>
      </CardFooter>
    </Card>
  )
}

export function TableDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>App</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Platform</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>PhotoEditor</TableCell>
          <TableCell><Badge variant="accent">Early alpha</Badge></TableCell>
          <TableCell>Web · Desktop</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>GridSheet</TableCell>
          <TableCell><Badge>Stable</Badge></TableCell>
          <TableCell>Web</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export function SectionDemo() {
  return (
    <Frame>
      <Eyebrow index="01" label="Crafting Apps" meta="Open source" />
      <div className="px-6 py-10 md:px-10">
        <SectionHeading>Built the hard way.</SectionHeading>
        <Lead className="mt-4">Every app holds to the same rules.</Lead>
      </div>
    </Frame>
  )
}

export function NavbarDemo() {
  return <Navbar brand="Craft" items={[{ label: "Apps", href: "#" }, { label: "Docs", href: "#" }]} />
}

export function StatDemo() {
  return (
    <div className="grid max-w-md gap-3 sm:grid-cols-2">
      <StatCard label="Sessions" value="1.2k" delta={12} hint="vs last week" />
      <StatCard label="Errors" value="3" delta={-5} />
    </div>
  )
}

export function BarDemo() {
  return (
    <div className="max-w-md">
      <BarSeries data={[
        { label: "Mon", value: 12 },
        { label: "Tue", value: 24 },
        { label: "Wed", value: 9 },
        { label: "Thu", value: 31 },
      ]} />
    </div>
  )
}

export function LabelDemo() {
  return (
    <div className="flex flex-col gap-2">
      <Label>HUD label</Label>
      <Label className="text-foreground">Emphasized</Label>
    </div>
  )
}
