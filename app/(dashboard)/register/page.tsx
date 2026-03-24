"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import ApplicationForm from "@/components/forms/ApplicationForm"
import { useUser } from "@clerk/nextjs"
import * as Sentry from "@sentry/nextjs"

export default function Register() {

  const router = useRouter()
  const { user, isLoaded } = useUser()

  useEffect(() => {

    if (isLoaded && !user) {
      router.push("/sign-in")
    } else if (isLoaded && user) {
      Sentry.metrics.count("user_view_registration", 1)
    }

  }, [user, isLoaded, router])

  if (!isLoaded || !user) return null

  const mappedUser = {
    $id: user.id,
    name: user.fullName || "",
    email: user.primaryEmailAddress?.emailAddress || "",
    phone: user.primaryPhoneNumber?.phoneNumber || "",
  }

  return (
    <div className="flex h-screen max-h-screen">

      <section className="remove-scrollbar container">

        <div className="sub-container max-w-[860px] py-10">

          <Image
            src="/assets/icons/GatherDeck.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-10 w-fit"
          />

          <ApplicationForm user={mappedUser} />

          <p className="copyright py-12">
            © 2025 GatherDeck
          </p>

        </div>

      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="register image"
        className="side-img max-w-[390px]"
      />

    </div>
  )
}