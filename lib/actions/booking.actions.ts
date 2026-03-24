"use server"

import { ID } from "node-appwrite"
import { databases, storage } from "@/lib/appwrite.config"
import { parseStringify } from "../utils"
import { InputFile } from "node-appwrite/file"

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
        DATABASE_ID,
        BOOKINGS_COLLECTION_ID,
        bookingId
      )
    )

  } catch {

    return null
  }
}