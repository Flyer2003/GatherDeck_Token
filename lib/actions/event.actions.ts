"use server"

import { ID, Query } from "node-appwrite"
import {
  DATABASE_ID,
  EVENT_COLLECTION_ID,
  databases,
  users,
} from "../appwrite.config"
import { parseStringify } from "../utils"

export const createUser = async ({
  name,
  email,
  phone,
}: CreateUserParams) => {
  try {
    return parseStringify(
      await users.create(ID.unique(), email, phone, undefined, name)
    )
  } catch (error: any) {
    if (error?.code === 409) {
      const usersList = await users.list([
        Query.equal("email", [email]),
      ])
      return parseStringify(usersList.users[0])
    }
    return null
  }
}

export const getUser = async (userId: string) => {
  try {
    return parseStringify(await users.get(userId))
  } catch {
    return null
  }
}

export const getEvent = async (userId: string) => {
  try {
    const events = await databases.listDocuments(
      DATABASE_ID!,
      EVENT_COLLECTION_ID!,
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
        DATABASE_ID!,
        EVENT_COLLECTION_ID!,
        ID.unique(),
        {
          ...event,
        }
      )
    )
  } catch {
    return null
  }
}
