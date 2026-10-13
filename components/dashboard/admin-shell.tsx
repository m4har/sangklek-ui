"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

export type SidebarItem = { label: string; href: string; icon?: React.ReactNode; active?: boolean }

/** Admin shell: fixed sidebar on lg, top bar with page title on mobile. */
function AdminShell({
  brand = "Console",
  items,
  title,
  actions,
  children,
  className,
}: {
  brand?: string
  items: SidebarItem[]
  title: string
  actions?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <div data-slot="admin-shell" className={cn("grid min-h-screen bg-background lg:grid-cols-[232px_1fr] lg:items-start", className)}>
      <aside className="flex flex-col border-b border-border bg-card lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:border-b-0 lg:border-r">
        <div className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-5 font-display text-lg font-medium">
          <span className="size-2.5 bg-foreground" aria-hidden="true" />
          {brand}
        </div>
        <nav aria-label="Admin" className="flex flex-col py-2">
          {items.map((it) => (
            <a
              key={`${it.href}-${it.label}`}
              href={it.href}
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
        <header className="sticky top-0 z-40 flex h-12 items-center justify-between gap-4 border-b border-border bg-background/95 px-6 backdrop-blur-sm">
          <h1 className="font-display text-lg font-medium tracking-tight">{title}</h1>
          <div className="flex items-center gap-2">{actions}</div>
        </header>
        <main className="flex-1 p-6">{children}</main>
        <Label className="border-t border-border px-6 py-3 text-muted-foreground/60">{brand} · admin</Label>
      </div>
    </div>
  )
}

export { AdminShell }