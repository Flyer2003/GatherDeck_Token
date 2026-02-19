"use server"

import { ID } from "node-appwrite"
import {
  BOOKINGS_COLLECTION_ID,
  DATABASE_ID,
  BUCKET_ID,
  ENDPOINT,
  PROJECT_ID,
  databases,
  storage,
} from "../appwrite.config"
import { parseStringify } from "../utils"
import { InputFile } from "node-appwrite/file"

export const createBooking = async ({
  eventImages,
  ...booking
}: CreateBookingParams) => {
  try {
    let fileData = {}

    if (eventImages) {
      const inputFile = InputFile.fromBuffer(
        eventImages.get("blobFile") as Blob,
        eventImages.get("fileName") as string
      )

      const file = await storage.createFile(
        BUCKET_ID!,
        ID.unique(),
        inputFile
      )

      fileData = {
        eventImagesId: file.$id,
        eventImagesUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`,
      }
    }

    const newBooking = await databases.createDocument(
      DATABASE_ID!,
      BOOKINGS_COLLECTION_ID!,
      ID.unique(),
      {
        ...booking,
        ...fileData,
      }
    )

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
        DATABASE_ID!,
        BOOKINGS_COLLECTION_ID!,
        bookingId
      )
    )
  } catch {
    return null
  }
}
