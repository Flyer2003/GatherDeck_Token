"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface UserDetailsModalProps {
  email?: string;
  phone?: string;
}

const UserDetailsModal = ({ email, phone }: UserDetailsModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="rounded-lg border-white/20 bg-dark-100/30 text-white hover:bg-white/10 hover:border-white/40 transition"
        >
          View User
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-2xl border border-white/10 bg-gradient-to-br from-dark-200/80 to-dark-300/70 p-6 shadow-2xl backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-white flex items-center gap-2">
            👤 User Details
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          {/* Email */}
          <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-dark-100/40 p-4">
            <div className="flex size-10 items-center justify-center rounded-full bg-blue-500/15 text-blue-400 text-lg">
              📧
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wide text-white/50">
                Email
              </span>
              <span className="text-sm font-medium text-white">
                {email ?? "Not available"}
              </span>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-dark-100/40 p-4">
            <div className="flex size-10 items-center justify-center rounded-full bg-green-500/15 text-green-400 text-lg">
              📞
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wide text-white/50">
                Phone
              </span>
              <span className="text-sm font-medium text-white">
                {phone ?? "Not available"}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsModal;
