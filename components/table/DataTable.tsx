"use client";

import React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      columnFilters,
      globalFilter,
    },

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,

    // ✅ core + features
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    // ✅ 5 bookings per page
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },

    // ✅ IMPORTANT: Search nested values like booking.event.name
    globalFilterFn: (row, _columnId, filterValue) => {
      const search = String(filterValue).toLowerCase().trim();
      if (!search) return true;

      const booking = row.original as any;

      const eventName =
        typeof booking.event === "string"
          ? booking.event
          : booking.event?.name ?? "";

      const status = booking.status ?? "";
      const eventManager = booking.eventManager ?? "";
      const catering = booking.catering ?? "";
      const venue = booking.venue ?? "";
      const description = booking.description ?? "";

      return (
        eventName.toLowerCase().includes(search) ||
        status.toLowerCase().includes(search) ||
        eventManager.toLowerCase().includes(search) ||
        catering.toLowerCase().includes(search) ||
        venue.toLowerCase().includes(search) ||
        description.toLowerCase().includes(search)
      );
    },
  });

  return (
    <div className="w-full space-y-4">
      {/* ✅ Top Search Bar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-dark-200/60 to-dark-300/40 p-4 shadow-lg sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
            🔎
          </span>

          <Input
            placeholder="Search bookings (event / status / manager / venue)..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="h-11 rounded-xl border-white/10 bg-dark-100/40 pl-10 text-white placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-green-500/40"
          />
        </div>

        {/* Optional: showing count */}
        <div className="text-xs text-white/50">
          Results:{" "}
          <span className="font-semibold text-white">
            {table.getFilteredRowModel().rows.length}
          </span>
        </div>
      </div>

      {/* ✅ Table Container */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-dark-200/40 shadow-xl">
        <Table className="w-full">
          <TableHeader className="bg-dark-300/40 backdrop-blur">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-white/10">
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortState = header.column.getIsSorted();

                  return (
                    <TableHead
                      key={header.id}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                      className={`py-4 text-white/80 ${
                        canSort ? "cursor-pointer select-none hover:text-white" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}

                        {/* ✅ Sort indicator */}
                        {sortState === "asc" && (
                          <span className="rounded-full bg-green-500/15 px-2 py-0.5 text-xs font-semibold text-green-400">
                            ▲
                          </span>
                        )}
                        {sortState === "desc" && (
                          <span className="rounded-full bg-blue-500/15 px-2 py-0.5 text-xs font-semibold text-blue-400">
                            ▼
                          </span>
                        )}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, idx) => (
                <TableRow
                  key={row.id}
                  className={`border-white/10 transition hover:bg-white/5 ${
                    idx % 2 === 0 ? "bg-dark-100/10" : "bg-transparent"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4 text-white/80">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="border-white/10">
                <TableCell colSpan={columns.length} className="h-32 text-center">
                  <div className="flex flex-col items-center gap-2 text-white/60">
                    <span className="text-3xl">📭</span>
                    <p className="text-sm font-medium">No results found</p>
                    <p className="text-xs text-white/40">
                      Try searching with another keyword.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ✅ Bottom Pagination (page number only in middle) */}
      <div className="relative flex items-center justify-between rounded-2xl border border-white/10 bg-dark-200/30 p-3 shadow-lg">
        {/* Prev */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="h-10 rounded-xl border-white/10 bg-dark-100/30 text-white hover:bg-white/10 disabled:opacity-40"
        >
          <Image src="/assets/icons/arrow.svg" width={20} height={20} alt="prev" />
          <span className="ml-1 hidden sm:inline">Prev</span>
        </Button>

        {/* ✅ Page Number Center */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <div className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow">
            {table.getState().pagination.pageIndex + 1}
          </div>
        </div>

        {/* Next */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="h-10 rounded-xl border-white/10 bg-dark-100/30 text-white hover:bg-white/10 disabled:opacity-40"
        >
          <span className="mr-1 hidden sm:inline">Next</span>
          <Image
            src="/assets/icons/arrow.svg"
            width={20}
            height={20}
            alt="next"
            className="rotate-180"
          />
        </Button>
      </div>
    </div>
  );
}
