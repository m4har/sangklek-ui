import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

type ActivityItem = {
  id: string
  actor: string
  action: string
  target?: string
  at: string
}

/** Timestamped audit trail. Server-renderable; no client state. */
function ActivityFeed({
  items,
  title = "Activity",
  className,
}: {
  items: ActivityItem[]
  title?: string
  className?: string
}) {
  return (
    <div data-slot="activity-feed" className={cn("flex flex-col border border-border bg-card", className)}>
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <Label className="text-muted-foreground">{title}</Label>
        <Label className="text-muted-foreground/60">{items.length}</Label>
      </div>
      <ul className="flex flex-col divide-y divide-border">
        {items.length === 0 ? (
          <li className="px-5 py-8 text-center font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
            No activity
          </li>
        ) : (
          items.map((it) => (
            <li key={it.id} className="flex items-start gap-3 px-5 py-3">
              <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 bg-foreground/60" />
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-snug">
                  <span className="font-medium">{it.actor}</span>{" "}
                  <span className="text-muted-foreground">{it.action}</span>
                  {it.target ? <span className="text-muted-foreground"> · {it.target}</span> : null}
                </p>
              </div>
              <time className="shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground/60">{it.at}</time>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export { ActivityFeed }
export type { ActivityItem }