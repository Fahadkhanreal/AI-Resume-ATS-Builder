import { ReactNode } from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center gap-3">
          <div className="flex min-w-0 flex-1 items-center justify-between gap-4 sm:justify-start sm:gap-8">
            <Link href="/" className="min-w-0 text-lg sm:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent truncate">
              AI Resume Builder
            </Link>
            <nav className="flex shrink-0 items-center rounded-full border border-slate-700 bg-slate-900/60 p-1 text-xs shadow-lg shadow-black/10 sm:text-sm">
              <Link href="/" className="rounded-full px-3 py-1.5 text-slate-300 transition hover:bg-slate-800 hover:text-emerald-400 sm:px-4">
                Home
              </Link>
              <Link href="/dashboard" className="rounded-full bg-emerald-600 px-3 py-1.5 font-medium text-white shadow-sm shadow-emerald-500/20 transition hover:bg-emerald-500 sm:px-4">
                Dashboard
              </Link>
            </nav>
          </div>
          <div className="shrink-0">
            <UserButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
        {children}
      </main>
    </div>
  );
}
