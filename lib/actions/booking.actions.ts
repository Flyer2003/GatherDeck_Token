"use server"

import { ID } from "node-appwrite"
import { databases, storage } from "@/lib/appwrite.config"
import { parseStringify } from "../utils"
import { InputFile } from "node-appwrite/file"
import DOMPurify from "isomorphic-dompurify"
import { getEvent } from "./event.actions"
const DATABASE_ID = process.env.DATABASE_ID!
const BOOKINGS_COLLECTION_ID = process.env.BOOKINGS_COLLECTION_ID!
const BUCKET_ID = process.env.NEXT_PUBLIC_BUCKET_ID!
const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT!
const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID!

export const createBooking = async ({
  eventImages,
  ...booking
}: CreateBookingParams) => {


  try {

    // Sanitize string inputs in booking
    const sanitizedBooking = Object.fromEntries(
      Object.entries(booking).map(([key, value]) => [
        key,
        typeof value === "string" ? DOMPurify.sanitize(value) : value,
      ])
    );

    let fileData = {}

    if (eventImages) {

      const inputFile = InputFile.fromBuffer(
        eventImages.get("blobFile") as Blob,
        eventImages.get("fileName") as string
      )

      const file = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        inputFile
      )

      fileData = {
        eventImagesId: file.$id,
        eventImagesUrl:
          `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`,
      }
    }

    const newBooking = await databases.createDocument(
      DATABASE_ID,
      BOOKINGS_COLLECTION_ID,
      ID.unique(),
      {
        ...sanitizedBooking,
        ...fileData,
      }
    )

    // Attempt to send a Telegram Notification
    try {
      const tgToken = process.env.TELEGRAM_TOKEN;
      const tgChatId = process.env.ADMIN_CHAT_ID;

      if (tgToken && tgChatId) {
        // Fetch user information using getEvent which contains name, phone, email
        const eventDoc = await getEvent(booking.userId);

        const name = eventDoc?.name || "Unknown";
        const phone = eventDoc?.phone || "Unknown";
        const email = eventDoc?.email || "Unknown";
        const eventType = booking.eventType || "Event";

        const message = `🚨 *New Booking Created* 🚨\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email}\n*Type:* ${eventType}`;

        await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: tgChatId,
            text: message,
            parse_mode: "Markdown",
          }),
        });
      }
    } catch (tgError) {
      console.error("Telegram notification failed:", tgError);
      // We don't throw here to ensure the booking itself still succeeds
    }

    return parseStringify(newBooking)

  } catch (error) {

    console.log("createBooking error:", error)

    return null
  }
}

export const getBooking = async (bookingId: string) => {


  try {

    return parseStringify(
      await databases.getDocument(
        DATABASE_ID,
        BOOKINGS_COLLECTION_ID,
        bookingId
      )
    )

  } catch {

    return null
  }
}