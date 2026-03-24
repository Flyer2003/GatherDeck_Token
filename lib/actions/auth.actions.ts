"use server"

import { currentUser } from "@clerk/nextjs/server"
import { users } from "@/lib/appwrite.config"
import { ID } from "node-appwrite"

export const syncUserWithAppwrite = async (user: any) => {
  try {
    // Check if user exists in Appwrite Auth
    await users.get(user.id)
  } catch (error: any) {
    // If user doesn't exist, create it to sync with Clerk
    if (error.code === 404) {
      try {
        const email = user.emailAddresses?.length > 0 ? user.emailAddresses[0].emailAddress : undefined;
        const phone = user.phoneNumbers?.length > 0 ? user.phoneNumbers[0].phoneNumber : undefined;
        const name = user.firstName + (user.lastName ? ` ${user.lastName}` : "");

        await users.create(
          user.id, // match clerk id
          email,
          phone,
          ID.unique(), // random strong password
          name
        )
      } catch (createError) {
        console.error("Error creating Appwrite sync user:", createError)
      }
    }
  }
}

export const getCurrentUser = async () => {
  try {
    const user = await currentUser()

    if (!user) return null

    // Ensure they exist in Appwrite Auth
    await syncUserWithAppwrite(user)

    return {
      $id: user.id,
      name: user.firstName + (user.lastName ? ` ${user.lastName}` : ""),
      email: user.emailAddresses[0]?.emailAddress,
    }
  } catch (error) {
    console.error("getCurrentUser error:", error)
    return null
  }
}