import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/actions/auth.actions"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/sign-in")
  }

  return <>{children}</>
}