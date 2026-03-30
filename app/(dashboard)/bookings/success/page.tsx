import { getBooking } from "@/lib/actions/booking.actions"
import { formatDateTime } from "@/lib/utils"
import Link from "next/link"
import * as Sentry from "@sentry/nextjs"
import { CheckCircle } from "lucide-react"

const Success = async ({
  searchParams,
}: {
  searchParams?: { bookingId?: string }
}) => {

  const bookingId = searchParams?.bookingId ?? ""
  const booking = await getBooking(bookingId)

  if (!booking) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <p>Booking not found.</p>
      </div>
    )
  }

  Sentry.metrics.count("user_view_booking_success", 1)

  return (
    <div className="flex h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] flex-col items-center justify-center px-6 py-10 relative overflow-hidden">
      
      {/* Background flair */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-green-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-lg bg-[#1A1D21] border border-[#363A3D] rounded-3xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-10 flex flex-col items-center animate-in fade-in zoom-in duration-500">
        
        <div className="mb-6 rounded-full bg-green-500/10 p-5 border border-green-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.15)]">
            <CheckCircle className="w-14 h-14 text-green-400 stroke-[1.5]" />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
          Request Submitted!
        </h2>
        
        <p className="text-dark-600 text-center mb-8">
          Your booking request has been successfully captured. Our team will contact you shortly to confirm details.
        </p>

        {/* Receipt Styled Box */}
        <div className="w-full bg-[#131619]/60 border border-dark-400 rounded-2xl p-6 mb-8 flex flex-col auto mx-auto">
          <div className="flex justify-between items-start border-b border-dark-400/50 pb-4 mb-4">
            <span className="text-dark-600 font-medium">Date</span>
            <span className="text-white font-semibold text-right">{formatDateTime(booking.schedule).dateTime}</span>
          </div>

          <div className="flex justify-between items-start border-b border-dark-400/50 pb-4 mb-4">
             <span className="text-dark-600 font-medium">Description</span>
             <span className="text-white font-semibold text-right max-w-[200px] break-words line-clamp-2">{booking.description}</span>
          </div>

          {booking.note && (
             <div className="flex justify-between items-start">
               <span className="text-dark-600 font-medium">Note</span>
               <span className="text-white font-semibold text-right max-w-[200px] break-words line-clamp-2">{booking.note}</span>
             </div>
          )}
        </div>

        <Link
          href="/bookings/new"
          className="w-full text-center rounded-xl bg-green-500 py-4 text-base font-bold text-black hover:bg-green-400 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:shadow-[0_0_25px_rgba(34,197,94,0.4)]"
        >
          Make Another Booking
        </Link>

        <p className="text-dark-600 text-sm mt-8">
          © 2025 GatherDeck
        </p>

      </div>
    </div>
  )
}

export default Success