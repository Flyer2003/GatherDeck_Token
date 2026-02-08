import Link from "next/link";
import Image from "next/image";
import StatCard from "@/components/StatCard";
import { getRecentBookingList } from "@/lib/actions/booking.actions";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/table/columns";

export const dynamic = "force-dynamic";

const Admin = async () => {
  const bookings = await getRecentBookingList();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/GatherDeck.svg"
            alt="GatherDeck Logo"
            width={162}
            height={32}
            className="h-8 min-w-fit"
          />
        </Link>

        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">Look at the latest bookings.</p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="bookings"
            count={bookings.scheduledCount}
            label="Scheduled Bookings"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={bookings.pendingCount}
            label="Pending Bookings"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={bookings.cancelledCount}
            label="Cancelled Bookings"
            icon="/assets/icons/cancelled.svg"
          />
        </section>

        {bookings.documents.length === 0 ? (
          <p className="text-dark-700">No bookings found.</p>
        ) : (
          <DataTable
            columns={columns}
            data={bookings.documents}
          />
        )}
      </main>
    </div>
  );
};

export default Admin;
