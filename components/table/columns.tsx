"use client";

import { ColumnDef } from "@tanstack/react-table";

import StatusBadge from "../StatusBadge";
import BookingModel from "../BookingModel";
import UserDetailsModal from "../UserDetailsModal";
import { formatDateTime } from "@/lib/utils";
import { Booking } from "@/types/appwrite.types";

/* ✅ YES / NO helper */
const getYesNoLabel = (value?: string) => {
  if (!value || value === "none") return "No";
  return "Yes";
};

export const columns: ColumnDef<Booking>[] = [
  {
    header: "Id",
    cell: ({ row }) => <p>{row.index + 1}</p>,
  },

  {
    accessorKey: "event",
    header: "Event",
    cell: ({ row }) => {
      const booking = row.original as any;
      return <p>{booking?.event?.name ?? "No Event"}</p>;
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge status={row.original.status} />
    ),
  },

  {
    accessorKey: "schedule",
    header: "Booking Date",
    cell: ({ row }) => (
      <p>{formatDateTime(row.original.schedule).dateTime}</p>
    ),
  },

  /* ✅ EVENT MANAGER → YES / NO */
  {
    accessorKey: "eventManager",
    header: "Event Manager",
    cell: ({ row }) => (
      <span>{getYesNoLabel(row.original.eventManager)}</span>
    ),
  },

  /* ✅ CATERING → YES / NO */
  {
    accessorKey: "catering",
    header: "Catering",
    cell: ({ row }) => (
      <span>{getYesNoLabel(row.original.catering)}</span>
    ),
  },

  /* ✅ VENUE → YES / NO */
  {
    accessorKey: "venue",
    header: "Venue",
    cell: ({ row }) => (
      <span>{getYesNoLabel(row.original.venue)}</span>
    ),
  },

  /* 🟢 USER DETAILS */
  {
    id: "userDetails",
    header: "User",
    cell: ({ row }) => {
      const booking = row.original as any;

      return (
        <UserDetailsModal
          user={booking.user}
          event={
            typeof booking.event === "string"
              ? undefined
              : booking.event
          }
        />
      );
    },
  },

  /* 🟢 ACTIONS */
  {
    id: "actions",
    header: "Actions",
    cell: ({ row: { original } }) => (
      <div className="flex gap-1">
        <BookingModel
          type="schedule"
          eventId={
            typeof original.event === "string"
              ? original.event
              : original.event.$id
          }
          userId={original.userId}
          booking={original}
        />

        <BookingModel
          type="cancel"
          eventId={
            typeof original.event === "string"
              ? original.event
              : original.event.$id
          }
          userId={original.userId}
          booking={original}
        />
      </div>
    ),
  },
];
