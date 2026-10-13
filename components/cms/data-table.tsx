"use client"

import * as React from "react"
import { ChevronDown, ChevronUp, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export type Column<T> = {
  key: string
  header: string
  render?: (row: T) => React.ReactNode
  sortable?: boolean
  className?: string
}

type SortState = { key: string; dir: "asc" | "desc" } | null

/** Sortable, filterable CMS table shell. Row actions render in the last column. */
function DataTable<T extends { id: string | number }>({
  rows,
  columns,
  searchKeys,
  empty = "No records yet.",
  actions,
  onRowClick,
  className,
}: {
  rows: T[]
  columns: Column<T>[]
  searchKeys?: (keyof T)[]
  empty?: string
  actions?: (row: T) => React.ReactNode
  onRowClick?: (row: T) => void
  className?: string
}) {
  const [q, setQ] = React.useState("")
  const [sort, setSort] = React.useState<SortState>(null)

  const filtered = React.useMemo(() => {
    if (!q.trim() || !searchKeys?.length) return rows
    const needle = q.trim().toLowerCase()
    return rows.filter((r) =>
      searchKeys.some((k) => String(r[k] ?? "").toLowerCase().includes(needle))
    )
  }, [rows, q, searchKeys])

  const sorted = React.useMemo(() => {
    if (!sort) return filtered
    const { key, dir } = sort
    return [...filtered].sort((a, b) => {
      const av = (a as Record<string, unknown>)[key]
      const bv = (b as Record<string, unknown>)[key]
      const r = String(av ?? "").localeCompare(String(bv ?? ""), undefined, { numeric: true })
      return dir === "asc" ? r : -r
    })
  }, [filtered, sort])

  function toggleSort(key: string) {
    setSort((s) => (s?.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }))
  }

  return (
    <div data-slot="data-table" className={cn("flex flex-col gap-3", className)}>
      {searchKeys?.length ? (
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter…"
            aria-label="Filter records"
            className="h-9 pl-9"
          />
        </div>
      ) : null}

      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((c) => (
              <TableHead key={c.key} className={c.className}>
                {c.sortable ? (
                  <button
                    type="button"
                    onClick={() => toggleSort(c.key)}
                    className="inline-flex items-center gap-1 hover:text-foreground"
                    aria-label={`Sort by ${c.header}`}
                  >
                    {c.header}
                    {sort?.key === c.key ? (
                      sort.dir === "asc" ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />
                    ) : (
                      <ChevronDown className="size-3 opacity-40" />
                    )}
                  </button>
                ) : (
                  c.header
                )}
              </TableHead>
            ))}
            {actions ? <TableHead className="w-px text-right">Actions</TableHead> : null}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="py-10 text-center font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                {empty}
              </TableCell>
            </TableRow>
          ) : (
            sorted.map((row) => (
              <TableRow
                key={row.id}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(onRowClick && "cursor-pointer")}
              >
                {columns.map((c) => (
                  <TableCell key={c.key} className={c.className}>
                    {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key] ?? "")}
                  </TableCell>
                ))}
                {actions ? (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1.5">{actions(row)}</div>
                  </TableCell>
                ) : null}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

/** Inline status pill used by CMS tables. `tone` maps to review workflow states. */
const STATUS_VARIANT: Record<string, "default" | "outline" | "accent"> = {
  published: "default",
  review: "accent",
  draft: "outline",
  archived: "outline",
}

function StatusPill({ status }: { status: string }) {
  const key = status.toLowerCase()
  return (
    <Badge variant={STATUS_VARIANT[key] ?? "outline"} className={key === "archived" ? "opacity-60" : undefined}>
      {status}
    </Badge>
  )
}

export { DataTable, StatusPill }