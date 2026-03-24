import Image from "next/image"
import BookingForm from "@/components/forms/BookingForm"
import { getEvent } from "@/lib/actions/event.actions"
import { getCurrentUser } from "@/lib/actions/auth.actions"
import * as Sentry from "@sentry/nextjs"

export default async function NewBooking() {

  const user = await getCurrentUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const event = await getEvent(user.$id)

  if (!event) {
    return <p>No event found</p>
  }

  Sentry.metrics.count("user_view_booking_form", 1)

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

          <BookingForm
            userId={user.$id}
            eventId={event.$id}
          />

          <p className="copyright py-12">
            © 2025 GatherDeck
          </p>

        </div>

      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="booking image"
        className="side-img max-w-[390px]"
      />

    </div>
  )
}