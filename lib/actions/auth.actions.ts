"use server"

import { currentUser } from "@clerk/nextjs/server"
import { users } from "@/lib/appwrite.config"
import { ID } from "node-appwrite"

/**
 * Syncs a Clerk user into Appwrite Auth (create if not exists).
 * Called ONLY from the Clerk webhook (user.created event) — NOT on every request.
 */
export const syncUserWithAppwrite = async (user: {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  emailAddresses?: { emailAddress: string }[];
  phoneNumbers?: { phoneNumber: string }[];
}) => {
  try {
    // Check if already synced — no-op if user exists
    await users.get(user.id)
  } catch (error: any) {
    if (error.code === 404) {
      try {
        const email = user.emailAddresses?.length ? user.emailAddresses[0].emailAddress : undefined
        const phone = user.phoneNumbers?.length ? user.phoneNumbers[0].phoneNumber : undefined
        const name = (user.firstName ?? "") + (user.lastName ? ` ${user.lastName}` : "")

        await users.create(
          user.id,    // Use Clerk ID as Appwrite ID to keep DB references intact
          email,
          phone,
          ID.unique(), // random strong password (auth via Clerk, not Appwrite)
          name
        )

        console.log(`[webhook] Appwrite user created for Clerk ID: ${user.id}`)
      } catch (createError) {
        console.error("[webhook] Error creating Appwrite sync user:", createError)
      }
    } else {
      console.error("[webhook] Unexpected error checking Appwrite user:", error)
    }
  }
}

/**
 * Returns the currently authenticated Clerk user's data.
 * Pure Clerk lookup — zero Appwrite calls on every request.
 */
export const getCurrentUser = async () => {
  try {
    const user = await currentUser()

    if (!user) return null

    return {
      $id: user.id,
      name: (user.firstName ?? "") + (user.lastName ? ` ${user.lastName}` : ""),
      email: user.emailAddresses[0]?.emailAddress,
    }
  } catch (error) {
    console.error("getCurrentUser error:", error)
    return null
  }
}