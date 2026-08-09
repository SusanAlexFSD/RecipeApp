"use client";

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="flex flex-col items-center gap-6">

        <SignIn />

        <div className="flex w-full max-w-sm items-center gap-4">
          <div className="h-px flex-1 bg-slate-700" />
          <span className="text-sm text-slate-400">OR</span>
          <div className="h-px flex-1 bg-slate-700" />
        </div>

        <button
          className="w-full max-w-sm rounded-xl bg-gradient-to-r from-fuchsia-600 via-violet-600 to-blue-600 py-3 font-semibold text-white shadow-lg"
        >
          🚀 Continue as Demo User
        </button>

        <p className="max-w-sm text-center text-sm text-slate-400">
          Explore the application without creating an account.
        </p>

      </div>
    </div>
  );
}