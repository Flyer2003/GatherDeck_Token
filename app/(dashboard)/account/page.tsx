"use client";

import { useUser, useClerk, useSessionList, useSession } from "@clerk/nextjs";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Loader2,
  Mail,
  Shield,
  Smartphone,
  Trash2,
  AlertTriangle,
  Laptop,
  CheckCircle2,
  XCircle,
  FileImage
} from "lucide-react";
import ProfileSidebar from "@/components/ProfileSidebar";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { OAuthStrategy } from "@clerk/types";

export default function AccountSettingsPage() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const { isLoaded: isSessionsLoaded, sessions } = useSessionList();
  const { session: currentSession } = useSession();

  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }
  }, [user]);

  if (!isLoaded || !isSessionsLoaded || !user) {
    return (
      <div className="flex justify-center items-center h-[60vh] w-full">
        <Loader2 className="w-10 h-10 animate-spin text-green-500" />
      </div>
    );
  }

  const primaryEmail = user.primaryEmailAddress?.emailAddress;
  const externalAccounts = user.externalAccounts || [];

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 5000);
  };

  const handleProfilePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoadingAction("photo");
    try {
      await user.setProfileImage({ file });
      showStatus("success", "Profile photo updated successfully");
    } catch (err: any) {
      console.error(err);
      showStatus("error", err.errors?.[0]?.longMessage || "Failed to update profile photo");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleUpdateProfile = async () => {
    setLoadingAction("profile");
    try {
      await user.update({
        firstName,
        lastName,
      });
      showStatus("success", "Profile information updated successfully");
    } catch (err: any) {
      console.error(err);
      showStatus("error", err.errors?.[0]?.longMessage || "Failed to update profile");
    } finally {
      setLoadingAction(null);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showStatus("error", "Please fill in all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      showStatus("error", "New password and confirmation do not match");
      return;
    }

    setLoadingAction("password");
    try {
      await user.updatePassword({
        currentPassword,
        newPassword,
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      showStatus("success", "Password updated successfully");
    } catch (err: any) {
      console.error(err);
      showStatus("error", err.errors?.[0]?.longMessage || "Failed to update password");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleDeleteAccount = async () => {
    setLoadingAction("delete");
    try {
      await user.delete();
      window.location.href = "/";
    } catch (err: any) {
      console.error(err);
      showStatus("error", err.errors?.[0]?.longMessage || "Failed to delete account");
      setShowDeleteModal(false);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleSignOutOtherSessions = async () => {
    if (!currentSession) return;
    setLoadingAction("signoutAll");
    try {
      if (!sessions) return;
      const otherSessions = sessions.filter(s => s.id !== currentSession.id);
      await Promise.all(otherSessions.map(s => s.end()));
      showStatus("success", "Successfully signed out of all other devices");
    } catch (err: any) {
      console.error(err);
      showStatus("error", "Failed to sign out of other devices");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleOAuthConnect = async (provider: string) => {
    try {
      const res = await user.createExternalAccount({
        strategy: provider as OAuthStrategy,
        redirectUrl: `${window.location.origin}/sso-callback`,
      });
      if (res.verification?.status === "unverified" && res.verification.externalVerificationRedirectURL) {
        window.location.href = res.verification.externalVerificationRedirectURL.href;
      }
    } catch (err: any) {
      console.error(err);
      showStatus("error", err.errors?.[0]?.longMessage || `Failed to connect ${provider}`);
    }
  };

  const isOauthConnected = (providerName: string) => {
    return externalAccounts.some(acc => acc.provider === providerName);
  };

  const hasProfileChanges = firstName !== (user.firstName || "") || lastName !== (user.lastName || "");

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 w-full max-w-7xl relative">
      <div className="flex flex-col lg:flex-row gap-8 w-full">

        <ProfileSidebar />

        <div className="flex-1 w-full max-w-4xl flex flex-col space-y-8">

          <div className="mb-2">
            <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
            <p className="text-dark-600">Manage your GatherDeck profile, security, and preferences.</p>
          </div>

          {statusMessage && (
            <div className={`p-4 rounded-xl border flex items-center gap-3 ${statusMessage.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-red-500/10 border-red-500/30 text-red-500'}`}>
              {statusMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
              <span className="font-medium">{statusMessage.text}</span>
            </div>
          )}

          <div className="flex flex-col space-y-8">

            {/* 1. Profile Information */}
            <section className="bg-[#131619] border border-[#363A3D] rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-[#363A3D]">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Mail className="w-5 h-5 text-green-500" />
                  Profile Information
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-6">
                  <div className="relative w-24 h-24 rounded-full border-2 border-[#363A3D] overflow-hidden shrink-0 group">
                    <Image src={user.imageUrl} alt="Profile" fill className="object-cover" />
                    {loadingAction === "photo" && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Loader2 className="w-6 h-6 animate-spin text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleProfilePhotoUpload}
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={loadingAction === "photo"}
                      className="px-4 py-2 bg-[#1A1D21] hover:bg-[#23272C] border border-[#363A3D] rounded-xl text-sm font-medium text-white transition-colors flex items-center gap-2"
                    >
                      <FileImage className="w-4 h-4" />
                      Change Photo
                    </button>
                    <p className="text-xs text-dark-600 mt-2">JPG, GIF or PNG. 5MB max.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-300">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-[#1A1D21] border border-[#363A3D] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-300">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-[#1A1D21] border border-[#363A3D] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-medium text-gray-300">Email Address (Primary)</label>
                    <input
                      type="email"
                      value={primaryEmail || ""}
                      readOnly
                      className="w-full bg-[#1A1D21] border border-[#363A3D] rounded-xl px-4 py-2.5 text-gray-400 opacity-90 cursor-not-allowed"
                    />
                  </div>
                </div>

                {hasProfileChanges && (
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleUpdateProfile}
                      disabled={loadingAction === "profile"}
                      className="px-6 py-2.5 bg-green-500 hover:bg-green-600 border border-transparent rounded-xl text-sm font-semibold text-black transition-colors flex items-center gap-2"
                    >
                      {loadingAction === "profile" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* 2. Security */}
            <section className="bg-[#131619] border border-[#363A3D] rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-[#363A3D]">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  Security & Sessions
                </h2>
              </div>
              <div className="p-6 space-y-8">

                {/* Password Box */}
                <div>
                  <h3 className="font-medium text-white mb-1">Update Password</h3>
                  <p className="text-sm text-dark-600 mb-4">Ensure your account is using a long, random password to stay secure.</p>

                  <div className="space-y-4 max-w-lg">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-300">Current Password</label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full bg-[#1A1D21] border border-[#363A3D] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-300">New Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-[#1A1D21] border border-[#363A3D] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-300">Confirm New Password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-[#1A1D21] border border-[#363A3D] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                      />
                    </div>
                    <div>
                      <button
                        onClick={handlePasswordUpdate}
                        disabled={loadingAction === "password" || (!currentPassword && !newPassword)}
                        className="px-5 py-2.5 bg-[#1A1D21] hover:bg-[#23272C] disabled:opacity-50 disabled:cursor-not-allowed border border-[#363A3D] rounded-xl text-sm font-medium text-white transition-colors flex items-center gap-2"
                      >
                        {loadingAction === "password" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update Password"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-[#363A3D]"></div>

                {/* Sessions */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-medium text-white">Active Sessions</h3>
                      <p className="text-sm text-dark-600 mt-1">Devices currently logged into your account.</p>
                    </div>
                    {sessions && sessions.length > 1 && (
                      <button
                        onClick={handleSignOutOtherSessions}
                        disabled={loadingAction === "signoutAll"}
                        className="px-5 py-2.5 bg-red-500/10 hover:bg-red-500 border border-red-500/30 hover:border-red-500 text-red-500 hover:text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shrink-0"
                      >
                        {loadingAction === "signoutAll" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign out all other devices"}
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    {sessions?.map((session) => {
                      const isCurrent = currentSession && session.id === currentSession.id;
                      return (
                        <div key={session.id} className={`flex items-center gap-4 p-4 border rounded-xl ${isCurrent ? 'border-green-500/30 bg-green-500/5' : 'border-[#363A3D] bg-[#1A1D21]/30'}`}>
                          <div className="w-10 h-10 rounded-full bg-[#1A1D21] flex items-center justify-center shrink-0 border border-[#363A3D]">
                            <Laptop className={`w-5 h-5 ${isCurrent ? 'text-green-500' : 'text-gray-400'}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-white text-sm truncate">
                              Active Session
                            </p>
                            <p className="text-xs text-dark-600 truncate mt-0.5">
                              Last Active: {session.lastActiveAt ? new Date(session.lastActiveAt).toLocaleString() : 'Unknown'}
                            </p>
                          </div>
                          {isCurrent ? (
                            <span className="text-xs font-semibold text-green-500 bg-green-500/10 px-2 py-1 rounded-md border border-green-500/20">Current Device</span>
                          ) : null}
                        </div>
                      )
                    })}
                  </div>
                </div>

              </div>
            </section>


            {/* Verification */}
            <section className="bg-[#131619] border border-[#363A3D] rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-[#363A3D]">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  Verification
                </h2>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-white">Email Verification</h3>
                    <p className="text-sm text-dark-600 mt-1">Status of your primary email.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {user.primaryEmailAddress?.verification?.status === "verified" ? (
                      <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-lg text-sm font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Verified
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-lg text-sm font-medium flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" />
                        {user.primaryEmailAddress?.verification?.status === "unverified" ? "Unverified" : "Pending"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Account Management */}
            <section className="bg-[#131619] border border-red-500/20 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-red-500/20 bg-red-500/5">
                <h2 className="text-lg font-semibold text-red-500 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Danger Zone
                </h2>
              </div>
              <div className="p-6 bg-[#131619]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-white">Delete Account</h3>
                    <p className="text-sm text-dark-600 mt-1 max-w-md">Once you delete your account, there is no going back. Please be certain.</p>
                  </div>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="px-6 py-2.5 bg-red-500/10 hover:bg-red-500 border border-red-500/50 hover:border-red-500 text-red-500 hover:text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete your account
                  </button>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#131619] border border-[#363A3D] rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              Delete Account
            </h3>
            <p className="text-gray-300 text-sm mb-6">
              Are you absolutely sure you want to delete your GatherDeck account? This action cannot be undone and all your data will be permanently lost.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={loadingAction === "delete"}
                className="px-4 py-2 border border-[#363A3D] text-white hover:bg-[#1A1D21] rounded-xl text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={loadingAction === "delete"}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
              >
                {loadingAction === "delete" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Yes, Delete Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
