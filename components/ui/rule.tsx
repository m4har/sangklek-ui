"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type RuleUnit = "cm" | "in"
export type RuleOrientation = "horizontal" | "vertical"

const SPEC: Record<RuleUnit, { perPx: (ppi: number) => number; major: number; mid: number; minor: number; label: (v: number) => string }> = {
  cm: {
    perPx: (ppi) => ppi / 2.54,
    major: 1,
    mid: 0.5,
    minor: 0.1,
    label: (v) => (Number.isInteger(v) ? String(v) : v.toFixed(1).replace(/\.0$/, "")),
  },
  in: {
    perPx: (ppi) => ppi,
    major: 1,
    mid: 0.5,
    minor: 0.125,
    label: (v) => (Number.isInteger(v) ? String(v) : v.toFixed(3).replace(/0+$/, "").replace(/\.$/, "")),
  },
}

export interface RuleProps extends React.ComponentProps<"div"> {
  /** Measurement unit. "cm" uses 96dpi CSS cm; "in" uses 96px/in. */
  unit?: RuleUnit
  /** Which axis the ruler lies on. */
  orientation?: RuleOrientation
  /** Displayed pixels per unit, defaults to 96. Set lower (e.g. 60) to show more units. */
  ppi?: number
  /** Cap on rendered units; undefined = fill the container. */
  length?: number
  /** Offset the numbering to continue from an adjacent rule. */
  offset?: number
  /** Mirror the ticks (grow upward / rightward). */
  flip?: boolean
  /** Hide the numeric labels. */
  hideLabels?: boolean
  /** Show a live cursor readout in the corner. */
  trackCursor?: boolean
}

/**
 * Industrial measurement rule: repeating tick gradient + numeric labels + origin mark.
 * No chart dependencies. Uses CSS `cm`/`in` semantics via ppi so values read as physical
 * (with the classic 96dpi browser reference); pass `ppi` to calibrate for real displays.
 */
function Rule({
  unit = "cm",
  orientation = "horizontal",
  ppi = 96,
  length,
  offset = 0,
  flip = false,
  hideLabels = false,
  trackCursor = false,
  className,
  style,
  ...props
}: RuleProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [px, setPx] = React.useState<number>(orientation === "horizontal" ? 1280 : 900)
  const [cursor, setCursor] = React.useState<number | null>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el || typeof ResizeObserver === "undefined") return
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        setPx(orientation === "horizontal" ? e.contentRect.width : e.contentRect.height)
      }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [orientation])

  const spec = SPEC[unit]
  const pxPerUnit = spec.perPx(ppi)
  const pxPerMinor = pxPerUnit * spec.minor
  const count = Math.max(1, length ? Math.round((length * pxPerUnit) / pxPerMinor) : Math.round(px / pxPerMinor))

  const majorCount = Math.round(spec.major / spec.minor)
  const midCount = Math.round(spec.mid / spec.minor)

  const minorCss: React.CSSProperties =
    orientation === "horizontal"
      ? {
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, currentColor 40%, transparent) 0 1px, transparent 1px)",
          backgroundSize: `${pxPerMinor}px 6px`,
          backgroundRepeat: "repeat-x",
          backgroundPosition: flip ? "0 0" : "0 100%",
        }
      : {
          backgroundImage:
            "linear-gradient(to bottom, color-mix(in srgb, currentColor 40%, transparent) 0 1px, transparent 1px)",
          backgroundSize: `6px ${pxPerMinor}px`,
          backgroundRepeat: "repeat-y",
          backgroundPosition: flip ? "100% 0" : "0 0",
        }

  // Explicit mid + major ticks over the minor gradient.
  const majors: { n: number; v: number }[] = []
  const mids: { n: number; v: number }[] = []
  for (let i = 0; i <= count; i++) {
    const v = offset + i * spec.minor
    const vR = Math.round(v * 1000) / 1000
    if (i % majorCount === 0) majors.push({ n: i, v: vR })
    else if (i % midCount === 0) mids.push({ n: i, v: vR })
  }

  const label = spec.label
  const onMove = trackCursor
    ? (e: React.MouseEvent) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const d = orientation === "horizontal" ? e.clientX - rect.left : e.clientY - rect.top
        setCursor(Math.max(0, (d / pxPerUnit) - offset))
      }
    : undefined
  const onLeave = trackCursor ? () => setCursor(null) : undefined

  return (
    <div
      ref={ref}
      role="presentation"
      data-slot="rule"
      data-unit={unit}
      data-orientation={orientation}
      data-cursor={cursor !== null ? Math.round(cursor * 100) / 100 : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ ...style, ...minorCss, color: "var(--foreground)" } as React.CSSProperties}
      className={cn(
        "text-muted-foreground/50 select-none",
        orientation === "horizontal" ? "relative h-[18px] overflow-hidden" : "relative w-[18px] overflow-hidden",
        className
      )}
      {...props}
    >
      {majors.map(({ n, v }) => (
        <span
          key={`m${n}`}
          aria-hidden="true"
          className={cn(
            "absolute block",
            orientation === "horizontal"
              ? cn("w-px bg-foreground/60", flip ? "top-0 h-[14px]" : "bottom-0 h-[14px]")
              : cn("h-px bg-foreground/60", flip ? "right-0 w-[14px]" : "left-0 w-[14px]"),
            orientation === "horizontal" ? "top-0" : "left-0"
          )}
          style={{ [orientation === "horizontal" ? "left" : "top"]: n * pxPerMinor }}
        >
          {!hideLabels ? (
            <span
              className={cn(
                "font-mono text-[9px] font-medium tracking-[0.06em] text-foreground/70",
                orientation === "horizontal"
                  ? cn("absolute -translate-x-1/2 whitespace-nowrap", flip ? "top-[14px]" : "bottom-[14px] hidden")
                  : cn("absolute -translate-y-1/2 whitespace-nowrap [writing-mode:vertical-rl]", flip ? "right-[14px]" : "left-[14px] hidden")
              )}
            >
              {n % majorCount === 0 ? label(v) : ""}
            </span>
          ) : null}
        </span>
      ))}
      {mids.map(({ n, v }) => (
        <span
          key={`d${n}`}
          aria-hidden="true"
          className={cn(
            "absolute block bg-foreground/40",
            orientation === "horizontal" ? cn("w-px", flip ? "top-0 h-[8px]" : "bottom-0 h-[8px]") : cn("h-px", flip ? "right-0 w-[8px]" : "left-0 w-[8px]"),
            orientation === "horizontal" ? "top-0" : "left-0"
          )}
          style={{ [orientation === "horizontal" ? "left" : "top"]: n * pxPerMinor }}
        />
      ))}
      {/* Origin marker */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute bg-accent",
          orientation === "horizontal"
            ? cn("w-[2px]", flip ? "top-0 h-[18px]" : "bottom-0 h-[18px]")
            : cn("h-[2px]", flip ? "right-0 w-[18px]" : "left-0 w-[18px]"),
          orientation === "horizontal" ? "top-0" : "left-0"
        )}
        style={{ [orientation === "horizontal" ? "left" : "top"]: offset * pxPerUnit }}
      />
      {trackCursor ? (
        <span
          className={cn(
            "hud-label pointer-events-none absolute z-10 px-1.5 py-0.5 bg-background/85 border border-border backdrop-blur",
            orientation === "horizontal" ? cn("right-2", flip ? "bottom-0.5" : "top-0.5") : cn("bottom-2", flip ? "right-0.5" : "left-0.5")
          )}
        >
          {cursor !== null ? `${Math.round(cursor * 100) / 100} ${unit}` : `0 ${unit}`}
        </span>
      ) : null}
    </div>
  )
}

export { Rule, SPEC }
