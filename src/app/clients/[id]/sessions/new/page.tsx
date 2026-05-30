import Link from "next/link";
import AppShell from "@/components/AppShell";
import { createSession } from "../actions";

interface NewSessionPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NewSessionPage({ params }: NewSessionPageProps) {
  const { id } = await params;

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl">
        <Link
          href={`/clients/${id}`}
          className="mb-6 inline-block text-sm text-slate-600 hover:text-slate-950"
        >
          ← Back to client
        </Link>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">
                1
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-950">
                  Enter Session Details
                </h1>
                <p className="text-sm text-slate-500">
                  Write rough notes in your own words.
                </p>
              </div>
            </div>

            <form action={createSession} className="space-y-5">
              <input type="hidden" name="clientId" value={id} />

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Session Notes
                </label>

                <textarea
                  name="content"
                  required
                  placeholder="Example: Client struggled with consistency, discussed simpler weekly plan, agreed to post 3 times this week..."
                  className="min-h-[360px] w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-violet-700"
              >
                Generate AI Summary →
              </button>
            </form>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">
                2
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-950">
                  AI Generated Output
                </h2>
                <p className="text-sm text-slate-500">
                  After saving, your client page will show:
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="font-semibold text-slate-950">Summary</h3>
                <p className="mt-2 text-sm text-slate-600">
                  A clean, concise summary of the session.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="font-semibold text-slate-950">Action Points</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                  <li>Clear next steps</li>
                  <li>Follow-up tasks</li>
                  <li>Client priorities</li>
                </ul>
              </div>

              <div className="rounded-2xl bg-violet-50 p-5">
                <h3 className="font-semibold text-violet-950">
                  Follow-Up Message
                </h3>
                <p className="mt-2 text-sm text-violet-800">
                  A friendly message you can copy and send to the client.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}