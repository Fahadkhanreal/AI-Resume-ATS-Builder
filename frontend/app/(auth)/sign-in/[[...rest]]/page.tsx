"use client";

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="border-b border-slate-700/50 bg-slate-900/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent sm:text-2xl">
            AI Resume Builder
          </Link>
          <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 p-1 text-xs sm:text-sm">
            <Link href="/" className="rounded-full px-3 py-1.5 text-slate-300 transition hover:bg-slate-700 hover:text-emerald-400 sm:px-4">
              Home
            </Link>
            <Link href="/sign-up" className="rounded-full bg-emerald-600 px-3 py-1.5 font-medium text-white transition hover:bg-emerald-500 sm:px-4">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex min-h-[calc(100vh-65px)] items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <SignIn fallbackRedirectUrl="/dashboard" signUpUrl="/sign-up" />
        </div>
      </div>
    </div>
  );
}
