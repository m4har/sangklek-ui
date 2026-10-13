import * as React from "react"

import { cn } from "@/lib/utils"
import { Frame, Eyebrow, SectionHeading, Lead } from "@/components/ui/section"

type Feature = { title: string; body: string; icon?: React.ReactNode }

/** Three-up principle / feature list separated by hairline grid. */
function Features({
  index = "03",
  label = "Principles",
  heading,
  lead,
  items,
  className,
}: {
  index?: string
  label?: string
  heading?: React.ReactNode
  lead?: string
  items: Feature[]
  className?: string
}) {
  return (
    <Frame className={className}>
      <Eyebrow index={index} label={label} />
      <div className="px-6 py-14 md:px-10 md:py-20">
        {heading ? <SectionHeading>{heading}</SectionHeading> : null}
        {lead ? <Lead className="mt-4">{lead}</Lead> : null}
        <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f) => (
            <div key={f.title} className="flex flex-col gap-3 bg-background p-6 md:p-8">
              {f.icon ? <span className="text-muted-foreground">{f.icon}</span> : null}
              <h3 className="font-display text-xl font-medium tracking-[-0.02em]">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  )
}

/** Closing call-to-action band, inverted colors. */
function CtaBand({
  label,
  heading,
  body,
  action,
  className,
}: {
  label?: string
  heading: React.ReactNode
  body?: string
  action: React.ReactNode
  className?: string
}) {
  return (
    <Frame className={cn("bg-secondary", className)}>
      <div className="flex flex-col items-start justify-between gap-8 px-6 py-14 md:flex-row md:items-center md:px-10 md:py-20">
        <div className="min-w-0">
          {label ? <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{label}</p> : null}
          <h2 className="mt-3 font-display text-3xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-4xl">{heading}</h2>
          {body ? <p className="mt-4 max-w-xl text-muted-foreground">{body}</p> : null}
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">{action}</div>
      </div>
    </Frame>
  )
}

export { Features, CtaBand }
export type { Feature }