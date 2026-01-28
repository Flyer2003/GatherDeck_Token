"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import StatusBadge from "../StatusBadge";
import BookingModel from "../BookingModel";
import UserDetailsModal from "../UserDetailsModal";
import { formatDateTime } from "@/lib/utils";
import { Managers } from "@/constants";
import { Booking } from "@/types/appwrite.types";

const getManagerByValue = (value?: string) => {
  if (!value || value === "none") return null;
  return Managers.find((m) => m.value === value) ?? null;
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

  {
    accessorKey: "eventManager",
    header: "Event Manager",
    cell: ({ row }) => {
      const manager = getManagerByValue(row.original.eventManager);
      return (
        <div className="flex items-center gap-2">
          {manager?.image ? (
            <Image
              src={manager.image}
              alt={manager.name}
              width={28}
              height={28}
              className="rounded-full"
            />
          ) : (
            <div className="size-7 rounded-full bg-gray-600" />
          )}
          <span>{manager?.name ?? "Not selected"}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "catering",
    header: "Catering",
    cell: ({ row }) => {
      const manager = getManagerByValue(row.original.catering);
      return <span>{manager?.name ?? "Not selected"}</span>;
    },
  },

  {
    accessorKey: "venue",
    header: "Venue",
    cell: ({ row }) => {
      const manager = getManagerByValue(row.original.venue);
      return <span>{manager?.name ?? "Not selected"}</span>;
    },
  },

  /* 🟢 USER DETAILS BUTTON */
  {
    id: "userDetails",
    header: "User",
    cell: ({ row }) => {
      const booking = row.original as any;

      return (
        <UserDetailsModal
          email={booking?.user?.email}
          phone={booking?.user?.phone}
        />
      );
    },
  },

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
