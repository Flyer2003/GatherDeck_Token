import { Button } from "@/components/ui/button";
import { getBooking } from "@/lib/actions/booking.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";
import { getUser } from "@/lib/actions/event.actions";

const Success = async ({
  params,
  searchParams,
}: {
  params: { userId: string };
  searchParams?: { bookingId?: string };
}) => {
  const { userId } = params;
  const bookingId = searchParams?.bookingId ?? "";

  const booking = await getBooking(bookingId);

  if (!booking) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Booking not found.</p>
      </div>
    );
  }

  const user = await getUser(userId);

  /* ✅ YES / NO flags */
  const wantsEventManager = booking.eventManager === "yes";
  const wantsCatering = booking.catering === "yes";
  const wantsVenue = booking.venue === "yes";

  Sentry.metrics.count("user_view_booking-success", 1);

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
          <h2 className="header mb-6 max-w-[640px] text-center">
            Your{" "}
            <span className="text-green-500">booking request</span>{" "}
            has been successfully submitted!
          </h2>
          <p>We will contact you shortly.</p>
        </section>

        {/* ✅ REQUEST DETAILS */}
        <section className="request-details space-y-3">
          <p>Requested Booking Details:</p>

          <div className="flex items-center gap-3">
            <Image
              src={
                wantsEventManager
                  ? "/assets/icons/check.svg"
                  : "/assets/icons/cancelled.svg"
              }
              width={20}
              height={20}
              alt="event-manager"
            />
            <p>
              Event Manager:{" "}
              <strong>{wantsEventManager ? "Yes" : "No"}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Image
              src={
                wantsCatering
                  ? "/assets/icons/check.svg"
                  : "/assets/icons/cancelled.svg"
              }
              width={20}
              height={20}
              alt="catering"
            />
            <p>
              Catering: <strong>{wantsCatering ? "Yes" : "No"}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Image
              src={
                wantsVenue
                  ? "/assets/icons/check.svg"
                  : "/assets/icons/cancelled.svg"
              }
              width={20}
              height={20}
              alt="venue"
            />
            <p>
              Venue: <strong>{wantsVenue ? "Yes" : "No"}</strong>
            </p>
          </div>

          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              width={24}
              height={24}
              alt="calendar"
            />
            <p>{formatDateTime(booking.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/events/${userId}/new-booking`}>
            New Bookings
          </Link>
        </Button>

        <p className="copyright">© 2025 GatherDeck</p>
      </div>
    </div>
  );
};

export default Success;
