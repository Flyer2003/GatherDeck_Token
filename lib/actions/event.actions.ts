"use server"

import { ID, Query } from "node-appwrite"
import { databases } from "@/lib/appwrite.config"
import { parseStringify } from "../utils"
import DOMPurify from "isomorphic-dompurify"

const DATABASE_ID = process.env.DATABASE_ID!
const EVENT_COLLECTION_ID = process.env.EVENT_COLLECTION_ID!


export const getEvent = async (userId: string) => {

  try {

    const events = await databases.listDocuments(
      DATABASE_ID,
      EVENT_COLLECTION_ID,
      [Query.equal("userId", [userId])]
    )

    return parseStringify(events.documents[0])

  } catch {

    return null
  }
}

export const registerEvent = async (event: RegisterUserParams) => {

  try {
    const sanitizedEvent = Object.fromEntries(
      Object.entries(event).map(([key, value]) => [
        key,
        typeof value === "string" ? DOMPurify.sanitize(value) : value,
      ])
    );

    return parseStringify(
      await databases.createDocument(
        DATABASE_ID,
        EVENT_COLLECTION_ID,
        ID.unique(),
        sanitizedEvent
      )
    )

  } catch {

    return null
  }
}