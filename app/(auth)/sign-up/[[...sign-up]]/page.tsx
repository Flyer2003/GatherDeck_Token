"use client";

import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { AuthCard } from "@/components/AuthCard";
import { Loader2 } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleOAuth = (strategy: "oauth_google") => {
    if (!isLoaded) return;
    signUp.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/dashboard",
    });
  };

  const getPasswordStrength = () => {
     if (password.length === 0) return 0;
     if (password.length < 6) return 1;
     if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return 3;
     if (password.length >= 6) return 2;
     return 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // Send the email verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      console.error("error submitting sign-up:", err);
      setError(err.errors?.[0]?.longMessage || "Sign up failed.");
    } finally {
      setLoading(false);
    }
  };

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/dashboard");
      } else {
        console.log("Verification result:", completeSignUp);
        setError("Verification incomplete. Please check your code.");
      }
    } catch (err: any) {
      console.error("error verifying email:", err);
      setError(err.errors?.[0]?.longMessage || "Invalid verification code.");
    } finally {
      setLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <AuthCard title="Check your email" subtitle={`We sent a verification code to ${emailAddress}`}>
        <form onSubmit={verify} className="space-y-4">
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

          <button
            type="submit"
            disabled={loading || !code}
            className="w-full flex items-center justify-center bg-green-500 hover:bg-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] text-black font-semibold rounded-xl py-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify Identity"}
          </button>
          
          <div className="text-center mt-4">
             <button type="button" onClick={() => setPendingVerification(false)} className="text-sm text-dark-600 hover:text-white transition-colors">Entered wrong email?</button>
          </div>
        </form>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Create Account"
      subtitle="Join GatherDeck and start planning"
    >
      <form onSubmit={submit} className="space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
               <label className="text-sm font-medium text-dark-600 block">First Name</label>
               <input
                 type="text"
                 value={firstName}
                 onChange={(e) => setFirstName(e.target.value)}
                 required
                 disabled={loading}
                 className="w-full bg-[#131619] border border-[#363A3D] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:opacity-50"
                 placeholder="John"
               />
            </div>
            <div className="space-y-1">
               <label className="text-sm font-medium text-dark-600 block">Last Name</label>
               <input
                 type="text"
                 value={lastName}
                 onChange={(e) => setLastName(e.target.value)}
                 required
                 disabled={loading}
                 className="w-full bg-[#131619] border border-[#363A3D] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:opacity-50"
                 placeholder="Doe"
               />
            </div>
        </div>

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

        <div className="space-y-1 relative">
          <label className="text-sm font-medium text-dark-600 block">Password</label>
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
              {[1,2,3].map((level) => (
                <div key={level} className={`h-full flex-1 rounded-full ${getPasswordStrength() >= level ? (getPasswordStrength() === 1 ? 'bg-red-500' : getPasswordStrength() === 2 ? 'bg-yellow-500' : 'bg-green-500') : 'bg-dark-400'}`}></div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-dark-600 block">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
            className={`w-full bg-[#131619] border ${confirmPassword && confirmPassword !== password ? 'border-red-500 focus:ring-red-500' : 'border-[#363A3D] focus:ring-green-500'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all disabled:opacity-50`}
            placeholder="••••••••"
          />
        </div>
        
        <div className="flex items-start space-x-2 pb-2 mt-2">
           <input type="checkbox" required id="terms" className="mt-1 rounded bg-[#1A1D21] border-[#363A3D] text-green-500 focus:ring-green-500 w-4 h-4 cursor-pointer" />
           <label htmlFor="terms" className="text-sm text-dark-600 cursor-pointer leading-tight">By continuing, I agree to the GatherDeck Terms of Service and Privacy Policy.</label>
        </div>

        <button
          type="submit"
          disabled={loading || !isLoaded}
          className="w-full flex items-center justify-center bg-green-500 hover:bg-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] text-black font-semibold rounded-xl py-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
        </button>
      </form>

      <div className="mt-6 flex items-center justify-between">
        <div className="border-t border-[#363A3D] w-full"></div>
        <span className="text-xs text-dark-600 px-4 uppercase tracking-wider">OR</span>
        <div className="border-t border-[#363A3D] w-full"></div>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={() => handleOAuth("oauth_google")}
          className="flex items-center justify-center gap-2 w-full bg-[#131619] border border-[#363A3D] hover:bg-[#1A1D21] text-white rounded-xl py-3 transition-all"
        >
          <FaGoogle className="w-4 h-4" />
          <span>Continue with Google</span>
        </button>
      </div>

      <p className="mt-8 text-center text-sm text-dark-600">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-white hover:text-green-500 font-medium transition-colors">
          Sign In
        </Link>
      </p>
    </AuthCard>
  );
}
