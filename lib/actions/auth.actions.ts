"use server"

import { currentUser } from "@clerk/nextjs/server"

/**
 * Returns the currently authenticated Clerk user's data.
 *
 * Pure Clerk lookup — zero Appwrite calls on every request.
 * Appwrite user creation happens only once, via the Clerk webhook
 * (user.created → POST /api/webhooks/clerk → syncUserWithAppwrite).
 */
export const getCurrentUser = async () => {
  try {
    const user = await currentUser()

    if (!user) return null

    return {
      $id: user.id,
      name: [user.firstName, user.lastName].filter(Boolean).join(" "),
      email: user.emailAddresses[0]?.emailAddress,
    }
  } catch (error) {
    console.error("getCurrentUser error:", error)
    return null
  }
}