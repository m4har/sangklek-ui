import * as React from "react"

import { cn } from "@/lib/utils"
import { StatusPill } from "@/components/cms/data-table"

/** Two-pane content list: records on the left, editor on the right. Composed by the CMS page. */
function EditorLayout({
  list,
  children,
  className,
}: {
  list: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <div data-slot="editor-layout" className={cn("grid gap-px bg-border lg:grid-cols-[320px_1fr]", className)}>
      <aside className="bg-background p-4 lg:max-h-[calc(100vh-12rem)] lg:overflow-y-auto">{list}</aside>
      <div className="min-w-0 bg-background p-6 md:p-8">{children}</div>
    </div>
  )
}

/** One row in the editor's left list. */
function ContentRow({
  title,
  meta,
  status,
  active,
  onClick,
}: {
  title: string
  meta?: string
  status?: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      className={cn(
        "flex w-full flex-col gap-1.5 border-l-2 px-3 py-2.5 text-left transition-colors",
        active ? "border-foreground bg-secondary" : "border-transparent hover:bg-secondary/60"
      )}
    >
      <span className="flex items-center justify-between gap-2">
        <span className="truncate text-sm font-medium">{title}</span>
        {status ? <StatusPill status={status} /> : null}
      </span>
      {meta ? <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{meta}</span> : null}
    </button>
  )
}

/** Right rail of the editor: publish state, schedule, metadata. */
function EditorSidebar({ children, className }: React.ComponentProps<"aside">) {
  return (
    <aside data-slot="editor-sidebar" className={cn("flex flex-col gap-4 border border-border bg-card p-5", className)}>
      {children}
    </aside>
  )
}

export { EditorLayout, ContentRow, EditorSidebar }