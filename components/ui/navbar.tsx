"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

type NavItem = { label: string; href: string; active?: boolean }

function Navbar({
  brand = "Craft",
  items = [],
  action,
  className,
}: {
  brand?: string
  items?: NavItem[]
  action?: React.ReactNode
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  return (
    <header className={cn("sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm", className)}>
      <div className="mx-auto flex max-w-[1280px] items-stretch justify-between gap-4 px-6 md:px-10">
        <a href="#" className="flex h-12 items-center gap-2 font-display text-lg font-medium tracking-tight">
          <span className="size-2.5 bg-foreground" aria-hidden="true" />
          {brand}
        </a>
        <nav aria-label="Main" className="hidden items-stretch lg:flex">
          {items.map((it) => (
            <a
              key={it.href}
              href={it.href}
              aria-current={it.active ? "page" : undefined}
              className={cn(
                "flex h-12 items-center border-x border-transparent px-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                it.active && "border-border text-foreground"
              )}
            >
              {it.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {action}
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Toggle menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-5">
              <path d={open ? "M18 6 6 18M6 6l12 12" : "M4 5h16M4 12h16M4 19h16"} />
            </svg>
          </Button>
        </div>
      </div>
      {open ? (
        <nav aria-label="Mobile" className="flex flex-col border-t border-border lg:hidden">
          {items.map((it) => (
            <a key={it.href} href={it.href} className="border-b border-border px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground">
              {it.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  )
}

function Footer({
  brand = "Craft",
  note,
  columns = [],
}: {
  brand?: string
  note?: string
  columns?: { title: string; links: { label: string; href: string }[] }[]
}) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1280px] border-x border-border">
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col gap-3 bg-background p-6 md:p-8">
              <Label className="text-foreground">{col.title}</Label>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-6 md:px-10">
          <Label className="text-muted-foreground">{brand} © 2026</Label>
          {note ? <p className="text-sm text-muted-foreground">{note}</p> : null}
        </div>
      </div>
    </footer>
  )
}

export { Navbar, Footer }
export type { NavItem }