"use server"

import { ID, Query } from "node-appwrite"
import { databases } from "@/lib/appwrite.config"
import { parseStringify } from "../utils"

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

    return parseStringify(
      await databases.createDocument(
        DATABASE_ID,
        EVENT_COLLECTION_ID,
        ID.unique(),
        event
      )
    )

  } catch {

    return null
  }
}