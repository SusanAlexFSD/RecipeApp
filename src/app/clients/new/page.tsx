import Link from "next/link";
import AppShell from "@/components/AppShell";
import { createClient } from "../actions";

export default function NewClientPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl">
        <Link
          href="/clients"
          className="mb-6 inline-block text-sm text-slate-600 hover:text-slate-950"
        >
          ← Back to clients
        </Link>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-8">
            <p className="text-sm font-semibold text-violet-600">New Client</p>
            <h1 className="mt-2 text-4xl font-bold text-slate-950">
              Add New Client
            </h1>
            <p className="mt-2 text-slate-600">
              Create a client profile so you can start saving session notes and
              generating AI follow-ups.
            </p>
          </div>

          <form action={createClient} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Client Name
              </label>
              <input
                name="name"
                required
                placeholder="Sarah Mitchell"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="sarah@example.com"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Phone
                </label>
                <input
                  name="phone"
                  placeholder="+44 7700 900123"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Client Notes
              </label>
              <textarea
                name="notes"
                placeholder="Add useful background information, goals, preferences, or context..."
                className="min-h-36 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
              />
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                type="submit"
                className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-violet-700"
              >
                Save Client
              </button>

              <Link
                href="/clients"
                className="rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AppShell>
  );
}