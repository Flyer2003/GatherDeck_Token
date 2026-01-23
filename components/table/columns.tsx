"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import StatusBadge from "../StatusBadge";
import BookingModel from "../BookingModel";
import { formatDateTime } from "@/lib/utils";
import { Managers } from "@/constants";
import { Booking } from "@/types/appwrite.types";

export const columns: ColumnDef<Booking>[] = [
  {
    header: "Id",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },

  {
    accessorKey: "event",
    header: "Event",
    cell: ({ row }) => {
      const booking = row.original as any;
      return (
        <p className="text-14-medium">{booking?.event?.name ?? "No Event"}</p>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },

  {
    accessorKey: "schedule",
    header: "Booking",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[150px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },

  {
    accessorKey: "eventManager",
    header: "Event Manager",
    cell: ({ row }) => {
      const booking = row.original as any;
      const manager = Managers.find((man) => man.name === booking.eventManager);

      return (
        <div className="flex items-center gap-3">
          {manager?.image ? (
            <Image
              src={manager.image}
              alt={manager.name}
              width={32}
              height={32}
              className="size-8 rounded-full"
            />
          ) : (
            <div className="size-8 rounded-full bg-gray-600" />
          )}

          <p className="whitespace-nowrap">{manager?.name ?? "Not selected"}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "catering",
    header: "Catering",
    cell: ({ row }) => {
      const booking = row.original as any;
      const manager = Managers.find((man) => man.name === booking.catering);

      return (
        <div className="flex items-center gap-3">
          {manager?.image ? (
            <Image
              src={manager.image}
              alt={manager.name}
              width={32}
              height={32}
              className="size-8 rounded-full"
            />
          ) : (
            <div className="size-8 rounded-full bg-gray-600" />
          )}

          <p className="whitespace-nowrap">{manager?.name ?? "Not selected"}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "venue",
    header: "Venue",
    cell: ({ row }) => {
      const booking = row.original as any;
      const manager = Managers.find((man) => man.name === booking.venue);

      return (
        <div className="flex items-center gap-3">
          {manager?.image ? (
            <Image
              src={manager.image}
              alt={manager.name}
              width={32}
              height={32}
              className="size-8 rounded-full"
            />
          ) : (
            <div className="size-8 rounded-full bg-gray-600" />
          )}

          <p className="whitespace-nowrap">{manager?.name ?? "Not selected"}</p>
        </div>
      );
    },
  },

  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1">
          <BookingModel
            type="schedule"
            eventId={typeof data.event === "string" ? data.event : data.event.$id}
            userId={data.userId}
            booking={data}
          />

          <BookingModel
            type="cancel"
            eventId={typeof data.event === "string" ? data.event : data.event.$id}
            userId={data.userId}
            booking={data}
          />
        </div>
      );
    },
  },
];
