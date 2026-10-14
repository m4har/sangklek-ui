import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Shimmer skeleton placeholder. Uses a moving highlight band (no JS, no deps).
 * Prefer this over a spinner for content that has a known shape.
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden bg-muted",
        "after:absolute after:inset-0 after:-translate-x-full after:animate-shimmer",
        "after:bg-gradient-to-r after:from-transparent after:via-foreground/10 after:to-transparent",
        "motion-reduce:after:animate-none",
        className
      )}
      {...props}
    />
  )
}

/** Text-line skeleton: renders `lines` bars, last one shorter. */
function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div data-slot="skeleton-text" className={cn("flex flex-col gap-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={cn("h-4", i === lines - 1 ? "w-2/3" : "w-full")} />
      ))}
    </div>
  )
}

export { Skeleton, SkeletonText }
