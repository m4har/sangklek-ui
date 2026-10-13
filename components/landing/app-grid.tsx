import * as React from "react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Frame, Eyebrow } from "@/components/ui/section"

type AppItem = {
  index: string
  slug: string
  name: string
  kind: string
  tagline: string
  status?: string
  platforms?: string[]
  href?: string
  accent?: string
}

/** Numbered product card. Accent drives hover state via --app custom property. */
function AppCard({ app, className }: { app: AppItem; className?: string }) {
  const style = app.accent
    ? ({ "--app": app.accent, "--app-ink": app.accent } as React.CSSProperties)
    : undefined
  return (
    <article
      style={style}
      className={cn("group relative flex h-full flex-col gap-4 border border-border bg-background p-6 transition-transform duration-300 ease-out hover:-translate-y-1", className)}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground/60">{app.index}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{app.kind}</span>
      </div>
      <h3 className="font-display text-xl font-medium leading-tight tracking-[-0.02em] text-foreground group-hover:text-(--app-ink,var(--accent-foreground))">
        {app.name}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{app.tagline}</p>
      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-2">
        {app.status ? <Badge variant="accent">{app.status}</Badge> : null}
        {app.platforms?.map((p) => (
          <Badge key={p}>{p}</Badge>
        ))}
      </div>
      {app.href ? (
        <a href={app.href} className="absolute inset-0" aria-label={app.name}>
          <span className="sr-only">{app.name}</span>
        </a>
      ) : null}
    </article>
  )
}

/** Numbered grid of product cards under a bordered section frame. */
function AppGrid({
  index = "02",
  label = "The lineup",
  meta,
  heading,
  lead,
  apps,
  columns = 3,
  className,
}: {
  index?: string
  label?: string
  meta?: string
  heading?: React.ReactNode
  lead?: string
  apps: AppItem[]
  columns?: 2 | 3 | 4
  className?: string
}) {
  const cols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns]
  return (
    <Frame className={className} id="lineup">
      <Eyebrow index={index} label={label} meta={meta} />
      <div className="px-6 py-14 md:px-10 md:py-20">
        {heading ? (
          <h2 className="max-w-3xl font-display text-3xl font-medium leading-[1.05] tracking-[-0.03em] text-foreground sm:text-4xl">
            {heading}
          </h2>
        ) : null}
        {lead ? <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">{lead}</p> : null}
        <div className={cn("mt-10 grid gap-px bg-border", cols)}>
          {apps.map((app) => (
            <div key={app.slug} className="bg-background">
              <AppCard app={app} />
            </div>
          ))}
        </div>
      </div>
    </Frame>
  )
}

export { AppCard, AppGrid }
export type { AppItem }