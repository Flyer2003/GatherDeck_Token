import { Button } from "@/components/ui/button"
import { getBooking } from "@/lib/actions/booking.actions"
import { formatDateTime } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import * as Sentry from "@sentry/nextjs"

const Success = async ({
  params,
  searchParams,
}: {
  params: { userId: string }
  searchParams?: { bookingId?: string }
}) => {
  const { userId } = params
  const bookingId = searchParams?.bookingId ?? ""

  const booking = await getBooking(bookingId)

  if (!booking) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Booking not found.</p>
      </div>
    )
  }

  Sentry.metrics.count("user_view_booking_success", 1)

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/GatherDeck.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-12 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
            unoptimized
          />
          <h2 className="header mb-6 text-center">
            Your booking request has been submitted!
          </h2>
          <p>We will contact you shortly.</p>
        </section>

        <section className="space-y-3">
          <p>
            <strong>Date:</strong>{" "}
            {formatDateTime(booking.schedule).dateTime}
          </p>

          <p>
            <strong>Description:</strong>{" "}
            {booking.description}
          </p>

          {booking.note && (
            <p>
              <strong>Note:</strong> {booking.note}
            </p>
          )}
        </section>

        <Button variant="outline" asChild>
          <Link href={`/events/${userId}/new-booking`}>
            New Booking
          </Link>
        </Button>

        <p className="copyright">
          © 2025 GatherDeck
        </p>
      </div>
    </div>
  )
}

export default Success
