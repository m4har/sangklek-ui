"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Rule } from "@/components/ui/rule"

export type SidebarItem = { label: string; href: string; icon?: React.ReactNode; active?: boolean }

/**
 * Admin shell: off-canvas drawer with a hamburger on mobile, sticky full-height
 * sidebar from lg up. Header is sticky on every breakpoint.
 */
function AdminShell({
  brand = "Console",
  items,
  title,
  actions,
  children,
  className,
  ruleUnit,
}: {
  brand?: string
  items: SidebarItem[]
  title: string
  actions?: React.ReactNode
  children: React.ReactNode
  className?: string
  /** Optional measurement rule under the header. Omit for no ruler. */
  ruleUnit?: import("@/components/ui/rule").RuleUnit
}) {
  const [open, setOpen] = React.useState(false)
  const panelId = "admin-shell-nav"

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <div data-slot="admin-shell" className={cn("grid min-h-screen bg-background lg:grid-cols-[232px_1fr] lg:items-start", className)}>
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-foreground/25 transition-opacity duration-200 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      <aside
        id={panelId}
        data-state={open ? "open" : "closed"}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[232px] flex-col overflow-y-auto border-r border-border bg-card transition-transform duration-200 ease-out",
          "lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-5 font-display text-lg font-medium">
          <span className="size-2.5 bg-foreground" aria-hidden="true" />
          {brand}
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="ml-auto flex size-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground lg:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-4" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav aria-label="Admin" className="flex flex-col py-2">
          {items.map((it) => (
            <a
              key={`${it.href}-${it.label}`}
              href={it.href}
              onClick={() => setOpen(false)}
              aria-current={it.active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 border-l-2 px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
                it.active ? "border-foreground bg-secondary text-foreground" : "border-transparent"
              )}
            >
              {it.icon ? <span className="size-4 [&_svg]:size-4">{it.icon}</span> : null}
              {it.label}
            </a>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-30 flex h-12 items-center justify-between gap-4 border-b border-border bg-background/95 px-6 backdrop-blur-sm">
          <div className="flex min-w-0 items-center">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls={panelId}
              aria-label="Open menu"
              className="-ml-3 mr-1 flex size-9 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-foreground lg:hidden"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-5" aria-hidden="true">
                <path d="M4 5h16M4 12h16M4 19h16" />
              </svg>
            </button>
            <h1 className="truncate font-display text-lg font-medium tracking-tight">{title}</h1>
          </div>
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        </header>
        {ruleUnit ? (
          <div className="sticky top-12 z-20 border-b border-border bg-background/95 backdrop-blur-sm">
            <Rule unit={ruleUnit} trackCursor className="mx-auto w-full max-w-[1280px] border-x border-border" />
          </div>
        ) : null}
        <main className="flex-1 p-6">{children}</main>
        <Label className="border-t border-border px-6 py-3 text-muted-foreground/60">{brand} · admin</Label>
      </div>
    </div>
  )
}

export { AdminShell }