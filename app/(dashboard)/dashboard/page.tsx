import { getUserBookings } from "@/lib/actions/booking.actions"
import { getCurrentUser } from "@/lib/actions/auth.actions"
import { formatDateTime } from "@/lib/utils"
import Link from "next/link"
import { Calendar, PlusCircle } from "lucide-react"

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    return <div className="text-white p-10 flex w-full justify-center">User not authenticated</div>
  }

  const bookings = await getUserBookings(user.$id)

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] p-4 md:p-12 relative overflow-y-auto overflow-x-hidden text-white w-full">
      {/* Background flair */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-green-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto w-full z-10 flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 bg-[#1A1D21] border border-[#363A3D] rounded-3xl p-5 md:p-8 mb-6 md:mb-8 shadow-lg">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Your Bookings</h1>
            <p className="text-dark-600 mt-2">Manage and track your event bookings.</p>
          </div>
          <Link
            href="/bookings/new"
            className="flex items-center justify-center w-full md:w-auto gap-2 rounded-xl bg-green-500 px-6 py-3 text-sm font-bold text-black hover:bg-green-400 transition-all shadow-[0_0_15px_rgba(34,197,94,0.2)]"
          >
            <PlusCircle className="w-5 h-5" />
            New Booking
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 md:p-12 bg-[#1A1D21] border border-[#363A3D] rounded-3xl text-center">
            <div className="bg-[#131619] p-4 rounded-full mb-4 border border-dark-400">
               <Calendar className="w-10 h-10 text-dark-600" />
            </div>
            <h2 className="text-xl font-bold mb-2">No Bookings Yet</h2>
            <p className="text-dark-600 mb-6 max-w-md">You haven't made any event bookings yet. Start planning your special occasion today!</p>
            <Link
              href="/bookings/new"
              className="rounded-xl bg-green-500 px-8 py-3 text-base font-bold text-black hover:bg-green-400 transition-all shadow-[0_0_15px_rgba(34,197,94,0.2)]"
            >
              Make a Booking
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking: any) => (
              <div key={booking.$id} className="bg-[#131619]/60 border border-dark-400 rounded-3xl p-6 hover:border-green-500/30 transition-all shadow-md group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-green-500/50 group-hover:bg-green-400 transition-colors"></div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col">
                    <span className="text-dark-600 text-sm font-medium mb-1 border-b border-dark-400/50 pb-1">Date</span>
                    <span className="text-white font-semibold text-lg">{formatDateTime(booking.schedule).dateTime}</span>
                  </div>
                  <div className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-semibold border border-green-500/20">
                     Tracked
                  </div>
                </div>
                
                <div className="mb-4">
                   <span className="text-dark-600 text-sm font-medium block mb-1">Description</span>
                   <p className="text-white break-words line-clamp-3">{booking.description}</p>
                </div>

                {booking.note && (
                  <div className="bg-[#1A1D21] p-3 rounded-xl border border-[#363A3D]">
                    <span className="text-dark-600 text-xs font-medium block mb-1">Note</span>
                    <p className="text-sm text-gray-300 italic break-words line-clamp-2">"{booking.note}"</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
