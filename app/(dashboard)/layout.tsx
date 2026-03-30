import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/actions/auth.actions"
import Navbar from "@/components/Navbar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <>
      <Navbar />
      <div className="pt-[64px] min-h-screen bg-dark-200">
        {children}
      </div>
    </>
  )
}