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
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">

      <section className="remove-scrollbar container flex-1 flex-col overflow-y-auto w-full">

        <div className="h-fit w-full max-w-[860px] mx-auto py-10 mt-8 mb-16 bg-[#131619]/60 backdrop-blur-sm border border-dark-400 p-8 md:p-12 rounded-3xl shadow-2xl">

          <div className="mb-10">
            <h1 className="header text-3xl font-bold text-white mb-2">Create Booking</h1>
            <p className="text-dark-600">Fill out the details for your new event booking.</p>
          </div>

          <BookingForm
            userId={user.$id}
            eventId={event.$id}
          />

          <p className="copyright mt-12 text-sm text-dark-600">
            © 2025 GatherDeck
          </p>

        </div>

      </section>

      <div className="relative hidden lg:block max-w-[450px] w-full flex-none">
        <Image
          src="/assets/images/register-img.png"
          height={1000}
          width={1000}
          alt="booking image"
          className="side-img h-full object-cover rounded-tl-3xl border-l border-t border-dark-400 opacity-90 transition-opacity hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-200 via-transparent to-transparent pointer-events-none rounded-tl-3xl"></div>
      </div>

    </div>
  )
}