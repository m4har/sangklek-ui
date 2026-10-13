import * as React from "react"

import { cn } from "@/lib/utils"

/** L-shaped crop marks used at section corners on getartcraft.com. */
function Tick({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("pointer-events-none absolute size-[9px] border border-border bg-background", className)}
    />
  )
}

/** Full-bleed bordered column that every section body sits inside. */
function Frame({
  className,
  children,
  ticks = true,
  ...props
}: React.ComponentProps<"section"> & { ticks?: boolean }) {
  return (
    <section className={cn("relative", className)} {...props}>
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px origin-left bg-border" />
      <div className="relative mx-auto max-w-[1280px] border-x border-border">
        {ticks && (
          <>
            <Tick className="-left-[5px] -top-[5px]" />
            <Tick className="-right-[5px] -top-[5px]" />
          </>
        )}
        {children}
      </div>
    </section>
  )
}

/** Sticky HUD strip: "01 / Crafting Apps" + right-hand meta. */
function Eyebrow({
  index,
  label,
  meta,
  className,
}: {
  index: string
  label: string
  meta?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("sticky top-12 z-30 border-y border-border bg-background/60 backdrop-blur-md", className)}>
      <div className="flex items-center justify-between gap-4 px-6 py-3 md:px-10">
        <p className="hud-label text-muted-foreground">
          <span className="text-muted-foreground/60">{index}</span>
          <span aria-hidden="true" className="mx-2 text-muted-foreground/60">
            /
          </span>
          {label}
        </p>
        {meta ? <p className="hud-label hidden text-muted-foreground/60 sm:block">{meta}</p> : null}
      </div>
    </div>
  )
}

function SectionHeading({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "max-w-3xl font-display text-3xl font-medium leading-[1.05] tracking-[-0.03em] text-foreground sm:text-4xl md:text-5xl",
        className
      )}
      {...props}
    />
  )
}

function Lead({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("max-w-xl text-lg leading-relaxed text-muted-foreground", className)} {...props} />
}

export { Frame, Tick, Eyebrow, SectionHeading, Lead }