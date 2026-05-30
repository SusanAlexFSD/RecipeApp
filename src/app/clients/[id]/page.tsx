export const dynamic = "force-dynamic";

import Link from "next/link";

import AppShell from "@/components/AppShell";
import CopyButton from "@/components/CopyButton";
import { prisma } from "@/lib/prisma";
import { deleteClient } from "../actions";
import { deleteSession } from "./sessions/actions";

interface ClientPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ClientPage({ params }: ClientPageProps) {
  const { id } = await params;

  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      sessions: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!client) {
    return (
      <AppShell>
        <div className="p-10">
          <h1 className="text-2xl font-bold">Client not found</h1>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl">
        <Link
          href="/clients"
          className="mb-6 inline-block text-sm text-slate-600 hover:text-slate-950"
        >
          ← Back to clients
        </Link>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div>
              <p className="text-sm font-semibold text-violet-600">
                Client Profile
              </p>

              <h1 className="mt-2 text-4xl font-bold text-slate-950">
                {client.name}
              </h1>

              <div className="mt-4 space-y-1 text-slate-600">
                {client.email ? <p>{client.email}</p> : null}
                {client.phone ? <p>{client.phone}</p> : null}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href={`/clients/${client.id}/sessions/new`}
                className="rounded-xl bg-violet-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-violet-700"
              >
                Add Session Note
              </Link>

              <form action={deleteClient}>
                <input type="hidden" name="clientId" value={client.id} />

                <button
                  type="submit"
                  className="w-full rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Delete Client
                </button>
              </form>
            </div>
          </div>

          {client.notes ? (
            <div className="mt-8 rounded-2xl bg-slate-50 p-5">
              <h2 className="font-semibold text-slate-950">Client Notes</h2>
              <p className="mt-2 text-slate-700">{client.notes}</p>
            </div>
          ) : null}
        </section>

        <section className="mt-8">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-slate-950">
              Session History
            </h2>
            <p className="text-sm text-slate-500">
              Review original notes, AI summaries, action points, and follow-ups.
            </p>
          </div>

          {client.sessions.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
              <h3 className="text-xl font-bold text-slate-950">
                No sessions yet
              </h3>
              <p className="mt-2 text-slate-600">
                Add your first session note to generate AI summaries and
                follow-ups.
              </p>

              <Link
                href={`/clients/${client.id}/sessions/new`}
                className="mt-5 inline-block rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700"
              >
                Add Session Note
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {client.sessions.map((session: any) => (
                <article
                  key={session.id}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-950">
                        Client Session
                      </p>
                      <p className="text-sm text-slate-500">
                        {new Date(session.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <form action={deleteSession}>
                      <input
                        type="hidden"
                        name="sessionId"
                        value={session.id}
                      />
                      <input
                        type="hidden"
                        name="clientId"
                        value={client.id}
                      />

                      <button
                        type="submit"
                        className="rounded-xl border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </form>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-5">
                      <h3 className="font-semibold text-slate-950">
                        Original Notes
                      </h3>
                      <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                        {session.content}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {session.summary ? (
                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                          <h3 className="font-semibold text-slate-950">
                            AI Summary
                          </h3>
                          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                            {session.summary}
                          </p>
                        </div>
                      ) : null}

                      {session.actions ? (
                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                          <h3 className="font-semibold text-slate-950">
                            Action Points
                          </h3>
                          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                            {session.actions}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {session.followUp ? (
                    <div className="mt-4 rounded-2xl bg-violet-50 p-5">
                      <div className="mb-3 flex items-center justify-between gap-4">
                        <h3 className="font-semibold text-violet-950">
                          Follow-Up Preview
                        </h3>

                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-violet-700">
                            Ready to send
                          </span>

                          <CopyButton text={session.followUp} />
                        </div>
                      </div>

                      <p className="whitespace-pre-wrap text-sm leading-6 text-violet-900">
                        {session.followUp}
                      </p>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}