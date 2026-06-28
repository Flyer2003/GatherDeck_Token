"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { AuthCard } from "@/components/AuthCard";
import { Loader2 } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

export default function SignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleOAuth = (strategy: "oauth_google") => {
    if (!isLoaded) return;
    signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/dashboard",
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        // Handle other states (like MFA)
        console.log("Sign-in result:", result);
      }
    } catch (err: any) {
      console.error("error submitting sign-in:", err);
      setError(err.errors?.[0]?.longMessage || "Sign in failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Sign in to your gatherdeck account"
    >
      <form onSubmit={submit} className="space-y-4">
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

        <div className="space-y-1">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-dark-600 block">Password</label>
            <Link href="/forgot-password" className="text-sm text-green-500 hover:text-green-400">
              Forgot?
            </Link>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            className="w-full bg-[#131619] border border-[#363A3D] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:opacity-50"
            placeholder="••••••••"
          />
        </div>

        <div className="flex items-center space-x-2 pb-2">
          <input type="checkbox" id="remember" className="rounded bg-[#1A1D21] border-[#363A3D] text-green-500 focus:ring-green-500 w-4 h-4 cursor-pointer" />
          <label htmlFor="remember" className="text-sm text-dark-600 cursor-pointer">Remember Me</label>
        </div>

        <button
          type="submit"
          disabled={loading || !isLoaded}
          className="w-full flex items-center justify-center bg-green-500 hover:bg-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] text-black font-semibold rounded-xl py-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
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
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-white hover:text-green-500 font-medium transition-colors">
          Sign Up
        </Link>
      </p>
    </AuthCard>
  );
}
