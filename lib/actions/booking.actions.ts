"use server";

import { ID, Query } from "node-appwrite";
import {
  BOOKINGS_COLLECTION_ID,
  DATABASE_ID,
  EVENT_COLLECTION_ID,
  databases,
  messaging,
} from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";
import { Booking } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

export const createBooking = async (booking: CreateBookingParams) => {
  try {
    const newBooking = await databases.createDocument(
      DATABASE_ID!,
      BOOKINGS_COLLECTION_ID!,
      ID.unique(),
      booking
    );

    revalidatePath("/admin"); // ✅ ADD THIS LINE

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
    const bookings = await databases.listDocuments(
      DATABASE_ID!,
      BOOKINGS_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (bookings.documents as unknown as Booking[]).reduce(
      (acc, booking) => {
        if (booking.status === "scheduled") acc.scheduledCount += 1;
        else if (booking.status === "pending") acc.pendingCount += 1;
        else if (booking.status === "cancelled") acc.cancelledCount += 1;
        return acc;
      },
      initialCounts
    );

    // ✅ Populate event document (so event.name works in table)
    const populatedDocuments = await Promise.all(
      bookings.documents.map(async (booking: any) => {
        const eventDoc = await databases.getDocument(
          DATABASE_ID!,
          EVENT_COLLECTION_ID!,
          booking.event
        );

        return {
          ...booking,
          event: eventDoc,
        };
      })
    );

    const data = {
      totalCount: bookings.total,
      ...counts,
      documents: populatedDocuments,
    };

    return parseStringify(data);
  } catch (error) {
    console.log("❌ getRecentBookingList error:", error);
    throw error;
  }
};

export const updateBooking = async ({ bookingId, userId, booking, type }: UpdateBookingParams) => {
  try {
    const updatedBooking = await databases.updateDocument(
      DATABASE_ID!,
      BOOKINGS_COLLECTION_ID!,
      bookingId,
      booking
    )

    if(!updatedBooking){
      throw new Error('Booking not found');
    }

    const smsMessage = `
    Hi, It's regarding your booking with GatherDeck. 
    ${type === 'schedule' ? `Your booking has been scheduled for ${formatDateTime(booking.schedule!).dateTime} with 
      Event Manager - ${booking.eventManager} 
      Catering - ${booking.catering} 
      Venue - ${booking.venue}.`: `We regret to inform you that your booking has been cancelled. Reason: ${booking.cancellationReason || 'Not specified'}.`}
    `

    await sendSMSNotification(userId, smsMessage);
    
    revalidatePath('/admin');
    return parseStringify(updatedBooking);
  } catch (error) {
    console.log(error)
  }
}

export const sendSMSNotification = async (userId: string, content:string) => {
  try {
    const message = await messaging.createSMS(
      ID.unique(),
      content,
      [],
      [userId],   
    )

    return parseStringify(message);
  } catch (error) {
    console.log(error)
  }
}