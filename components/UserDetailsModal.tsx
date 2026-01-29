"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Event } from "@/types/appwrite.types";

interface UserDetailsModalProps {
  user?: {
    name?: string;
    email?: string;
    phone?: string;
  } | null;
  event?: Event;
}

const Row = ({
  label,
  value,
}: {
  label: string;
  value?: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs uppercase tracking-wide text-white/50">
      {label}
    </span>
    <span className="text-sm text-white">
      {value ?? "Not provided"}
    </span>
  </div>
);

const UserDetailsModal = ({ user, event }: UserDetailsModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="rounded-lg border-white/20 bg-dark-100/30 text-white hover:bg-white/10"
        >
          View User
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-gradient-to-br from-dark-200/80 to-dark-300/70 p-6 shadow-2xl backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-white">
            👤 Application Details
          </DialogTitle>
        </DialogHeader>

        {/* USER INFO */}
        <section className="mt-4 rounded-xl border border-white/10 bg-dark-100/40 p-4">
          <h3 className="mb-3 text-sm font-semibold text-white">
            User Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Row label="Name" value={user?.name} />
            <Row label="Email" value={user?.email} />
            <Row label="Phone" value={user?.phone} />
          </div>
        </section>

        {/* PERSONAL INFO */}
        <section className="mt-4 rounded-xl border border-white/10 bg-dark-100/40 p-4">
          <h3 className="mb-3 text-sm font-semibold text-white">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Row label="Gender" value={event?.gender} />
            <Row
              label="Date of Birth"
              value={
                event?.birthDate
                  ? new Date(event.birthDate).toLocaleDateString()
                  : undefined
              }
            />
            <Row label="Nationality" value={event?.nationality} />
            <Row label="Address" value={event?.address} />
          </div>
        </section>

        {/* EVENT DETAILS */}
        <section className="mt-4 rounded-xl border border-white/10 bg-dark-100/40 p-4">
          <h3 className="mb-3 text-sm font-semibold text-white">
            Event Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Row label="Event Type" value={event?.eventType} />
            <Row label="Requirements" value={event?.requirements} />
            <Row label="Preferences" value={event?.preferences} />
            <Row label="Avoidances" value={event?.avoidances} />
          </div>
        </section>

        {/* EVENT MEDIA (ALWAYS SHOWN) */}
        <section className="mt-4 rounded-xl border border-white/10 bg-dark-100/40 p-4">
          <h3 className="mb-3 text-sm font-semibold text-white">
            Event Reference
          </h3>

          {event?.eventImagesUrl ? (
            <div className="relative h-48 w-full overflow-hidden rounded-lg border border-white/10">
              <Image
                src={event.eventImagesUrl}
                alt="Event reference"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-white/20 text-sm text-white/50">
              No image provided
            </div>
          )}
        </section>

        {/* CONSENT */}
        <section className="mt-4 rounded-xl border border-white/10 bg-dark-100/40 p-4">
          <Row
            label="Privacy Consent"
            value={event?.privacyConsent ? "✅ Accepted" : "❌ Not accepted"}
          />
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsModal;
