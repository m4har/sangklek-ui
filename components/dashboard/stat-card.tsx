import * as React from "react"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

/** KPI tile: HUD label, big number, delta vs previous period. */
function StatCard({
  label,
  value,
  delta,
  hint,
  className,
}: {
  label: string
  value: string | number
  delta?: number
  hint?: string
  className?: string
}) {
  const up = (delta ?? 0) >= 0
  return (
    <div data-slot="stat-card" className={cn("flex flex-col gap-3 border border-border bg-card p-5", className)}>
      <Label className="text-muted-foreground">{label}</Label>
      <p className="font-display text-3xl font-medium leading-none tracking-[-0.03em]">{value}</p>
      <div className="mt-auto flex items-center gap-2">
        {delta !== undefined ? (
          <span className={cn("inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.1em]", up ? "text-emerald-600 dark:text-emerald-400" : "text-destructive")}>
            {up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
            {up ? "+" : ""}
            {delta}%
          </span>
        ) : null}
        {hint ? <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground/60">{hint}</span> : null}
      </div>
    </div>
  )
}

type SeriesPoint = { label: string; value: number }

/** Dependency-free bar series. Swap for a chart lib when axes/zoom are needed. */
function BarSeries({
  data,
  height = 160,
  formatValue = (v: number) => String(v),
  className,
}: {
  data: SeriesPoint[]
  height?: number
  formatValue?: (v: number) => string
  className?: string
}) {
  const max = Math.max(1, ...data.map((d) => d.value))
  return (
    <div data-slot="bar-series" className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-end gap-1" style={{ height }} role="img" aria-label="Series chart">
        {data.map((d) => (
          <div key={d.label} className="group flex h-full flex-1 flex-col justify-end">
            <div
              className="w-full bg-foreground/80 transition-colors group-hover:bg-(--accent,var(--accent))"
              style={{ height: `${(d.value / max) * 100}%`, minHeight: 2 }}
              title={`${d.label}: ${formatValue(d.value)}`}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between border-t border-border pt-2">
        <Label className="text-muted-foreground/60">{data[0]?.label}</Label>
        <Label className="text-muted-foreground/60">{data[data.length - 1]?.label}</Label>
      </div>
    </div>
  )
}

export { StatCard, BarSeries }
export type { SeriesPoint }