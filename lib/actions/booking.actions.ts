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
   RAW TRANSPORT TYPES
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
   ADMIN VIEW MODEL
============================================================ */

export type AdminBooking = Booking & {
  user: {
    email: string;
    phone: string;
    name: string;
  } | null;
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
 * Normalize booking safely
 * - Skips booking if event is missing
 * - Allows user to be null
 */
const normalizeBooking = async (
  doc: BookingDocument
): Promise<AdminBooking | null> => {
  // 1️⃣ Fetch event safely
  let event: Event;
  try {
    const rawEvent = (await databases.getDocument(
      DATABASE_ID!,
      EVENT_COLLECTION_ID!,
      doc.event
    )) as RawEvent;

    event = normalizeEvent(rawEvent);
  } catch {
    // Event deleted → booking invalid
    return null;
  }

  // 2️⃣ Fetch user safely
  let user: AdminBooking["user"] = null;
  try {
    const userDoc = await users.get(doc.userId);
    user = {
      email: userDoc.email,
      phone: userDoc.phone,
      name: userDoc.name,
    };
  } catch {
    user = null; // deleted user
  }

  return {
    ...doc,
    schedule: new Date(doc.schedule),
    event,
    user,
    cancellationReason: doc.cancellationReason ?? null,
  };
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
  } catch (error) {
    console.log("❌ getBooking error:", error);
    throw error;
  }
};

export const getRecentBookingList = async () => {
  try {
    const result = await databases.listDocuments(
      DATABASE_ID!,
      BOOKINGS_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const documents = result.documents as unknown as BookingDocument[];

    const counts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    documents.forEach((b) => {
      if (b.status === "scheduled") counts.scheduledCount++;
      else if (b.status === "pending") counts.pendingCount++;
      else if (b.status === "cancelled") counts.cancelledCount++;
    });

    // ✅ Safe normalization
    const normalized = await Promise.all(
      documents.map(normalizeBooking)
    );

    // ✅ Remove invalid bookings
    const adminBookings: AdminBooking[] = normalized.filter(
      (b): b is AdminBooking => b !== null
    );

    return parseStringify({
      totalCount: adminBookings.length,
      ...counts,
      documents: adminBookings,
    });
  } catch (error) {
    console.log("❌ getRecentBookingList error:", error);
    throw error;
  }
};

export const updateBooking = async ({
  bookingId,
  userId,
  booking,
  type,
}: UpdateBookingParams) => {
  try {
    const updatedBooking = await databases.updateDocument(
      DATABASE_ID!,
      BOOKINGS_COLLECTION_ID!,
      bookingId,
      booking
    );

    if (!updatedBooking) {
      throw new Error("Booking not found");
    }

    const smsMessage = `
Hi, it's regarding your booking with GatherDeck.

${
  type === "schedule"
    ? `Your booking has been scheduled for ${formatDateTime(
        booking.schedule!
      ).dateTime}.
Event Manager - ${booking.eventManager ?? "Not selected"}
Catering - ${booking.catering ?? "Not selected"}
Venue - ${booking.venue ?? "Not selected"}`
    : `Your booking has been cancelled.
Reason: ${booking.cancellationReason || "Not specified"}`
}
    `;

    // ✅ SMS guarded
    try {
      await sendSMSNotification(userId, smsMessage);
    } catch (err) {
      console.log("⚠️ SMS skipped (user missing)", err);
    }

    revalidatePath("/admin");
    return parseStringify(updatedBooking);
  } catch (error) {
    console.log("❌ updateBooking error:", error);
    throw error;
  }
};

export const sendSMSNotification = async (
  userId: string,
  content: string
) => {
  const message = await messaging.createSMS(
    ID.unique(),
    content,
    [],
    [userId]
  );

  return parseStringify(message);
};
