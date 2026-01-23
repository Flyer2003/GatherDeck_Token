import Image from "next/image";
import RegistrationForm from "@/components/forms/RegistrationForm";
import ImageGrid from "@/components/imagegrid";
import Link from "next/link";
import BookingForm from "@/components/forms/BookingForm";
import { getEvent } from "@/lib/actions/event.actions";
import * as Sentry from "@sentry/nextjs";

export default async function NewBooking({ params: { userId }}: SearchParamProps) {
    const event = await getEvent(userId);

    Sentry.metrics.count('user_view_new-booking', event.name);
  

  return (
    <div className="flex h-screen max-h-screen">
      
      {/* LEFT — Scrollable */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          
          <Image
            src="/assets/icons/GatherDeck.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="-mt-4 mb-8 h-10 w-fit"
          />

          <BookingForm 
            type="create"
            userId={userId}
            eventId={event.$id}
          />

          
        <p className="copyright mt-10 py-12">
            © 2025 GatherDeck
        </p>
            

        </div>
      </section>

      {/* RIGHT — Fixed */}
      <ImageGrid
        className="hidden md:flex side-img max-w-[390px] bg-bottom"
        image1="/assets/images/p1.png"
        image2="/assets/images/p2.png"
        image3="/assets/images/p3.png"
      />

    </div>
  );
}
