"use server";

import { ID, Query, Models } from "node-appwrite";
import {
  BOOKINGS_COLLECTION_ID,
  DATABASE_ID,
  EVENT_COLLECTION_ID,
  databases,
  messaging,
  users,
} from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";
import { Booking, Event } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

/* ============================================================
   RAW TYPES
============================================================ */

type BookingDocument = Models.Document & {
  event: string;
  schedule: string;
  status: Status;
  eventManager: string;
  catering: string;
  venue: string;
  description: string;
  note: string;
  userId: string;
  cancellationReason?: string | null;
};

type RawEvent = Models.Document & {
  birthDate: string;
};

/* ============================================================
   ADMIN MODEL
============================================================ */

export type AdminBooking = Booking & {
  user: {
    email: string;
    phone: string;
    name: string;
  };
};

/* ============================================================
   NORMALIZERS
============================================================ */

const normalizeEvent = (doc: RawEvent): Event => {
  return {
    ...(doc as unknown as Event),
    birthDate: new Date(doc.birthDate),
  };
};

/**
 * STRICT RULE:
 * - If EVENT is deleted → booking ignored
 * - If USER is deleted → booking ignored
 */
const normalizeBooking = async (
  doc: BookingDocument
): Promise<AdminBooking | null> => {
  // Event must exist
  let event: Event;
  try {
    const rawEvent = (await databases.getDocument(
      DATABASE_ID!,
      EVENT_COLLECTION_ID!,
      doc.event
    )) as RawEvent;

    event = normalizeEvent(rawEvent);
  } catch {
    return null;
  }

  // User must exist
  try {
    const userDoc = await users.get(doc.userId);

    return {
      ...doc,
      schedule: new Date(doc.schedule),
      event,
      user: {
        email: userDoc.email,
        phone: userDoc.phone,
        name: userDoc.name,
      },
      cancellationReason: doc.cancellationReason ?? null,
    };
  } catch {
    return null;
  }
};

/* ============================================================
   ACTIONS
============================================================ */

export const createBooking = async (booking: CreateBookingParams) => {
  try {
    const newBooking = await databases.createDocument(
      DATABASE_ID!,
      BOOKINGS_COLLECTION_ID!,
      ID.unique(),
      booking
    );

    revalidatePath("/admin");
    return parseStringify(newBooking);
  } catch (error) {
    console.log("❌ createBooking error:", error);
    throw error;
  }
};

export const getBooking = async (bookingId: string) => {
  try {
    const booking = await databases.getDocument(
      DATABASE_ID!,
      BOOKINGS_COLLECTION_ID!,
      bookingId
    );

    return parseStringify(booking);
  } catch {
    return null;
  }
};

/**
 * ADMIN LIST (table + stats)
 * Stats are calculated ONLY from visible bookings
 */
export const getRecentBookingList = async () => {
  try {
    const result = await databases.listDocuments(
      DATABASE_ID!,
      BOOKINGS_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const documents = result.documents as unknown as BookingDocument[];

    // Normalize + hard filter
    const normalized = await Promise.all(
      documents.map(normalizeBooking)
    );

    const adminBookings: AdminBooking[] = normalized.filter(
      (b): b is AdminBooking => b !== null
    );

    // Calculate stats from visible bookings ONLY
    const counts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    adminBookings.forEach((b) => {
      if (b.status === "scheduled") counts.scheduledCount++;
      else if (b.status === "pending") counts.pendingCount++;
      else if (b.status === "cancelled") counts.cancelledCount++;
    });

    return parseStringify({
      totalCount: adminBookings.length,
      ...counts,
      documents: adminBookings,
    });
  } catch (error) {
    console.log("❌ getRecentBookingList error:", error);
    return {
      totalCount: 0,
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
      documents: [],
    };
  }
};

/**
 * STRICT UPDATE:
 * - If booking does not exist → DO NOTHING
 * - NEVER throw
 */
export const updateBooking = async ({
  bookingId,
  userId,
  booking,
  type,
}: UpdateBookingParams) => {
  try {
    // Booking must exist
    try {
      await databases.getDocument(
        DATABASE_ID!,
        BOOKINGS_COLLECTION_ID!,
        bookingId
      );
    } catch {
      return null;
    }

    const updatedBooking = await databases.updateDocument(
      DATABASE_ID!,
      BOOKINGS_COLLECTION_ID!,
      bookingId,
      booking
    );

    // SMS must never break admin
    try {
      const smsMessage = `
Hi, it's regarding your booking with GatherDeck.

${
  type === "schedule"
    ? `Your booking has been scheduled for ${formatDateTime(
        booking.schedule!
      ).dateTime}.`
    : `Your booking has been cancelled.`
}
      `;

      await messaging.createSMS(
        ID.unique(),
        smsMessage,
        [],
        [userId]
      );
    } catch {
      // ignore SMS failure
    }

    revalidatePath("/admin");
    return parseStringify(updatedBooking);
  } catch {
    return null;
  }
};
