"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type RuleRailUnit = "pct" | "cm" | "in"

export interface RuleRailProps extends React.ComponentProps<"div"> {
  /** Edge the rail is pinned to. */
  side?: "left" | "right"
  /** "pct" scales the whole document 0-100; "cm"/"in" map it with ppi. */
  unit?: RuleRailUnit
  /** Pixels per unit, used by cm/in. */
  ppi?: number
  /** Labelled tick every N ticks. */
  labelEvery?: number
  /** Space reserved at the top (navbar + sticky rule). */
  topOffset?: number
  /** Live cursor readout while hovering the rail. */
  trackCursor?: boolean
  /** Cap on rendered ticks. */
  maxTicks?: number
}

const PHYSICAL: Record<"cm" | "in", { perPx: (ppi: number) => number }> = {
  cm: { perPx: (ppi) => ppi / 2.54 },
  in: { perPx: (ppi) => ppi },
}

/**
 * Fixed document-position ruler, gridcraft-style: 1px ticks scaled over the whole
 * page, an accent needle at the current scroll position, click-to-jump and a live
 * cursor readout. Percentage by default; pass unit="cm" | "in" for physical marks.
 * CSS-only, no chart dependency.
 */
function RuleRail({
  side = "right",
  unit = "pct",
  ppi = 96,
  labelEvery = 5,
  topOffset = 0,
  trackCursor = false,
  maxTicks = 4000,
  className,
  ...props
}: RuleRailProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [doc, setDoc] = React.useState({ docH: 0, vh: 0 })
  const [scrollY, setScrollY] = React.useState(0)
  const [cursorY, setCursorY] = React.useState<number | null>(null)

  React.useEffect(() => {
    const read = () =>
      setDoc({ docH: document.documentElement.scrollHeight, vh: window.innerHeight })
    read()
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(read) : null
    ro?.observe(document.body)
    window.addEventListener("resize", read)
    document.fonts?.ready.then(read).catch(() => {})
    return () => {
      ro?.disconnect()
      window.removeEventListener("resize", read)
    }
  }, [])

  // Hide the native page scrollbar only while the rail is actually visible (md+).
  React.useEffect(() => {
    const root = document.documentElement
    const mq = window.matchMedia("(min-width: 768px)")
    const sync = () => (mq.matches ? root.setAttribute("data-rule-rail", "") : root.removeAttribute("data-rule-rail"))
    sync()
    mq.addEventListener("change", sync)
    return () => {
      mq.removeEventListener("change", sync)
      root.removeAttribute("data-rule-rail")
    }
  }, [])

  React.useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const span = Math.max(1, doc.docH - doc.vh)
  const pct = Math.min(1, scrollY / span)

  // Tick ladder: one entry per mark, `y` in document pixels.
  const ticks = React.useMemo(() => {
    if (!doc.docH) return [] as { y: number; major: boolean; label?: number }[]
    if (unit === "pct") {
      const out: { y: number; major: boolean; label?: number }[] = []
      for (let p = 0; p <= 100 + 1e-6; p += 1) {
        const r = Math.round(p * 100) / 100
        const major = Math.abs(r % labelEvery) < 1e-6
        out.push({ y: (r / 100) * doc.docH, major, label: major ? r : undefined })
      }
      return out.slice(0, maxTicks)
    }
    const perPx = PHYSICAL[unit].perPx(ppi)
    const count = Math.min(maxTicks, Math.ceil((doc.docH - topOffset) / perPx) + 1)
    const out: { y: number; major: boolean; label?: number }[] = []
    for (let i = 0; i < count; i++) {
      const major = i % labelEvery === 0
      out.push({ y: topOffset + i * perPx, major, label: major ? i : undefined })
    }
    return out
  }, [doc.docH, unit, ppi, labelEvery, maxTicks, topOffset])

  const jump = (clientY: number) => {
    const el = ref.current
    if (!el || !span) return
    const r = el.getBoundingClientRect()
    const f = Math.min(1, Math.max(0, (clientY - r.top) / r.height))
    window.scrollTo({ top: f * span, behavior: "smooth" })
  }

  const edge = side === "right" ? { right: 0 } : { left: 0 }
  const grow = side === "right" ? "right" : "left"

  return (
    <div
      ref={ref}
      role="scrollbar"
      aria-controls="main"
      aria-orientation="vertical"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct * 100)}
      aria-label="Page position"
      data-slot="rule-rail"
      data-side={side}
      data-unit={unit}
      onClick={(e) => jump(e.clientY)}
      onMouseMove={trackCursor ? (e) => setCursorY(e.clientY) : undefined}
      onMouseLeave={trackCursor ? () => setCursorY(null) : undefined}
      style={{ ...edge, width: 60 }}
      className={cn("fixed inset-y-0 z-30 hidden cursor-crosshair select-none overflow-hidden md:block", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backdropFilter: "blur(9px)",
          WebkitBackdropFilter: "blur(9px)",
          backgroundColor: "color-mix(in srgb, var(--background) 55%, transparent)",
          maskImage:
            side === "right"
              ? "linear-gradient(to left, black 40%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.22) 70%, rgba(0,0,0,0.05) 85%, transparent 100%)"
              : "linear-gradient(to right, black 40%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.22) 70%, rgba(0,0,0,0.05) 85%, transparent 100%)",
          WebkitMaskImage:
            side === "right"
              ? "linear-gradient(to left, black 40%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.22) 70%, rgba(0,0,0,0.05) 85%, transparent 100%)"
              : "linear-gradient(to right, black 40%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.22) 70%, rgba(0,0,0,0.05) 85%, transparent 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0"
        style={{ height: doc.docH, transform: `translate3d(0, ${-scrollY}px, 0)` }}
      >
        {ticks.map((t, i) => (
          <div key={i} className="absolute inset-x-0" style={{ top: t.y, height: 0 }}>
            <span
              className="absolute block bg-foreground"
              style={{
                [grow]: 0,
                top: 0,
                width: t.major ? 20 : 10,
                height: 1,
                opacity: t.major ? 0.8 : 0.4,
              }}
            />
            {t.major && t.label !== undefined ? (
              <span
                className="absolute -translate-y-1/2 font-mono text-foreground"
                style={{ [grow]: 24, top: 0, fontSize: 9, letterSpacing: "0.08em", opacity: 0.5 }}
              >
                {t.label}
              </span>
            ) : null}
          </div>
        ))}
      </div>

      {/* Needle: current scroll position */}
      <div aria-hidden="true" className="absolute inset-x-0" style={{ top: topOffset + pct * (doc.vh - topOffset), height: 0 }}>
        <span
          className="absolute inset-x-0 block bg-accent"
          style={{ top: 0, height: 1, boxShadow: "0 0 6px var(--accent)" }}
        />
        <span className="hud-label absolute -translate-y-1/2 bg-accent px-1 py-0.5 font-mono text-[9px] font-bold text-background" style={{ [grow]: 22, top: 0 }}>
          {String(Math.round(pct * 100)).padStart(3, "0")}
        </span>
      </div>

      {trackCursor && cursorY !== null ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0" style={{ top: cursorY - (ref.current?.getBoundingClientRect().top ?? 0), height: 0 }}>
          <span className="absolute inset-x-0 block bg-accent" style={{ top: 0, height: 1, boxShadow: "0 0 6px var(--accent)" }} />
          <span className="absolute -translate-y-1/2 font-mono text-[9px] font-bold text-accent" style={{ [grow]: 22, top: 0, letterSpacing: "0.08em" }}>
            {String(Math.round(((cursorY - (ref.current?.getBoundingClientRect().top ?? 0)) / Math.max(1, doc.vh)) * 100)).padStart(3, "0")}
          </span>
        </div>
      ) : null}
    </div>
  )
}

export { RuleRail }