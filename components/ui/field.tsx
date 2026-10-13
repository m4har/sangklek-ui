import * as React from "react"

// hud-label styling lives in components/ui/label.tsx — re-exported here.
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

function FieldLabel({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="field-label"
      className={cn("flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground", className)}
      {...props}
    />
  )
}

function Field({
  label,
  hint,
  error,
  htmlFor,
  children,
  className,
}: {
  label: string
  hint?: React.ReactNode
  error?: string
  htmlFor?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div data-slot="field" className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <FieldLabel htmlFor={htmlFor}>{label}</FieldLabel>
        {hint ? <span className="font-mono text-[10px] text-muted-foreground/60">{hint}</span> : null}
      </div>
      {children}
      {error ? (
        <p role="alert" className="font-mono text-[10px] uppercase tracking-[0.1em] text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export { Label, FieldLabel, Field }