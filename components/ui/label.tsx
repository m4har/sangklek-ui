import * as React from "react"

import { cn } from "@/lib/utils"

/** Monospace 10px uppercase micro-label — the site's HUD voice. */
function Label({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="hud-label"
      className={cn("font-mono text-[10px] font-medium uppercase leading-none tracking-[0.1em]", className)}
      {...props}
    />
  )
}

export { Label }