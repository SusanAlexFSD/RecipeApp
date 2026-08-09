"use client";

import { SignIn } from "@clerk/nextjs";
import { useSignIn } from "@clerk/nextjs/legacy";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleDemoLogin = async () => {
  if (!isLoaded) {
    console.log("Clerk is not loaded yet");
    return;
  }

  setLoading(true);

  try {
    console.log("Starting demo login...");

    const result = await signIn.create({
      identifier: "demo@susanalexander.dev",
      password: "DemoAcct",
      strategy: "password",
    });

    console.log("Clerk sign-in result:", result);
    console.log("Sign-in status:", result.status);

    if (result.status === "complete") {
      console.log("Demo login complete!");

      await setActive({
        session: result.createdSessionId,
      });

      console.log("Session activated!");

      router.push("/dashboard");
    } else {
      console.log("Demo login did not complete:", result.status);

      alert(
        `Demo login did not complete. Clerk status: ${result.status}`
      );
    }
  } catch (error) {
    console.error("DEMO LOGIN ERROR:", error);

    alert(
      `Demo login failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  } finally {
    setLoading(false);
  }
};

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
          onClick={handleDemoLogin}
          disabled={loading}
          className="w-full max-w-sm rounded-xl bg-gradient-to-r from-fuchsia-600 via-violet-600 to-blue-600 py-3 font-semibold text-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-violet-500/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Starting Demo..."
            : "🚀 Continue as Demo User"}
        </button>

        <p className="max-w-sm text-center text-sm text-slate-400">
          Explore the application without creating an account.
        </p>

      </div>
    </div>
  );
}