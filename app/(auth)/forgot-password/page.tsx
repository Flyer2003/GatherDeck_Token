"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { AuthCard } from "@/components/AuthCard";
import { Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Send the password reset code to the user's email
  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });

      setSuccessfulCreation(true);
    } catch (err: any) {
      console.error("error submitting password reset request:", err);
      setError(err.errors?.[0]?.longMessage || "Failed to send reset code. Please check your email address.");
    } finally {
      setLoading(false);
    }
  };

  // Reset the password with the code and the new password
  const reset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        console.log(result);
        setError("Password reset incomplete.");
      }
    } catch (err: any) {
      console.error("error resetting password:", err);
      setError(err.errors?.[0]?.longMessage || "Invalid code or password.");
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    if (password.length === 0) return 0;
    if (password.length < 6) return 1;
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return 3;
    if (password.length >= 6) return 2;
    return 0;
  };

  if (successfulCreation) {
    return (
      <AuthCard
        title="Reset Password"
        subtitle={`We sent a verification code to ${emailAddress}`}
      >
        <form onSubmit={reset} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-medium text-dark-600 block">Verification Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              disabled={loading}
              className="w-full bg-[#131619] border border-[#363A3D] rounded-xl px-4 py-3 text-white text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:opacity-50"
              placeholder="123456"
            />
          </div>

          <div className="space-y-1 relative">
            <label className="text-sm font-medium text-dark-600 block">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full bg-[#131619] border border-[#363A3D] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:opacity-50"
              placeholder="••••••••"
            />
            {password && (
              <div className="flex gap-1 mt-1.5 h-1">
                {[1, 2, 3].map((level) => (
                  <div key={level} className={`h-full flex-1 rounded-full ${getPasswordStrength() >= level ? (getPasswordStrength() === 1 ? 'bg-red-500' : getPasswordStrength() === 2 ? 'bg-yellow-500' : 'bg-green-500') : 'bg-dark-400'}`}></div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !isLoaded}
            className="w-full flex items-center justify-center bg-green-500 hover:bg-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] text-black font-semibold rounded-xl py-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Reset Password"}
          </button>
        </form>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Forgot Password"
      subtitle="Enter your email to receive a reset code"
    >
      <form onSubmit={create} className="space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label className="text-sm font-medium text-dark-600 block">Email Address</label>
          <input
            type="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            required
            disabled={loading}
            className="w-full bg-[#131619] border border-[#363A3D] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:opacity-50"
            placeholder="you@example.com"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !isLoaded}
          className="w-full flex items-center justify-center bg-green-500 hover:bg-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] text-black font-semibold rounded-xl py-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Reset Code"}
        </button>

        <p className="mt-8 text-center text-sm text-dark-600">
          Remember your password?{" "}
          <Link href="/sign-in" className="text-white hover:text-green-500 font-medium transition-colors">
            Sign In
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
