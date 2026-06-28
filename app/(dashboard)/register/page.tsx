import Image from "next/image"
import ApplicationForm from "@/components/forms/ApplicationForm"
import { getCurrentUser } from "@/lib/actions/auth.actions"
import { getEvent } from "@/lib/actions/event.actions"
import { redirect } from "next/navigation"
import * as Sentry from "@sentry/nextjs"

export default async function Register() {

  // Auth already enforced by dashboard layout — getCurrentUser() is safe to use directly
  const user = await getCurrentUser()

  if (!user) {
    redirect("/sign-in")
  }

  // If a profile already exists, skip registration — user goes straight to booking
  const existingProfile = await getEvent(user.$id)

  if (existingProfile) {
    redirect("/bookings/new")
  }

  Sentry.metrics.count("user_view_registration", 1)

  const mappedUser = {
    $id: user.$id,
    name: user.name || "",
    email: user.email || "",
    phone: "",
  }

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">

      <section className="remove-scrollbar container flex-1 flex-col overflow-y-auto">

        <div className="h-fit w-full max-w-[860px] mx-auto py-10 mt-8 mb-16 bg-[#131619]/60 backdrop-blur-sm border border-dark-400 p-8 rounded-3xl shadow-2xl">

          <div className="mb-8">
            <h1 className="header text-3xl font-bold text-white mb-2">Welcome!</h1>
            <p className="text-dark-600">Please provide your details to get started.</p>
          </div>

          <ApplicationForm user={mappedUser} />

          <p className="copyright mt-12 text-sm text-dark-600">
            © 2025 gatherdeck
          </p>

        </div>

      </section>

      <div className="relative hidden lg:block max-w-[450px] w-full flex-none">
        <Image
          src="/assets/images/event3.png"
          height={1000}
          width={1000}
          alt="register image"
          className="side-img h-full object-cover rounded-tl-3xl border-l border-t border-dark-400 opacity-90 transition-opacity hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-200 via-transparent to-transparent pointer-events-none rounded-tl-3xl"></div>
      </div>

    </div>
  )
}
