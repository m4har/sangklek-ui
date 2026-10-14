import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-mono text-[11px] font-bold uppercase tracking-[0.12em]",
    "transition-[background-color,border-color,color,opacity,transform] duration-150",
    // Press feedback: visible on both mouse and touch.
    "active:translate-y-px active:scale-[0.98]",
    "motion-reduce:active:translate-y-0 motion-reduce:active:scale-100",
    "disabled:pointer-events-none disabled:opacity-50",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:opacity-80",
        outline: "border border-input bg-background text-foreground hover:border-transparent hover:bg-primary hover:text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground",
        ghost: "text-muted-foreground hover:bg-primary hover:text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:opacity-80",
        link: "text-foreground underline decoration-border underline-offset-4 hover:decoration-current active:translate-y-0",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-9 px-3",
        lg: "h-14 px-8 text-xs",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      data-slot="button-spinner"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={cn("size-4 shrink-0 animate-spin", className)}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  iconLeft,
  iconRight,
  children,
  disabled,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    /** Show a spinner and block interaction. */
    loading?: boolean
    /** Icon rendered before the label. */
    iconLeft?: React.ReactNode
    /** Icon rendered after the label. */
    iconRight?: React.ReactNode
  }) {
  const Comp = asChild ? Slot : "button"

  // Slot requires a single child; pass through untouched for asChild.
  if (asChild) {
    return (
      <Comp
        data-slot="button"
        aria-busy={loading || undefined}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </Comp>
    )
  }

  return (
    <Comp
      data-slot="button"
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {loading ? <Spinner /> : iconLeft ? <span data-slot="button-icon" className="contents">{iconLeft}</span> : null}
      {children}
      {iconRight && !loading ? <span data-slot="button-icon" className="contents">{iconRight}</span> : null}
    </Comp>
  )
}

export { Button, buttonVariants, Spinner }
