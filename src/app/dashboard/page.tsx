import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

import AppShell from "@/components/AppShell";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const { userId } = await auth();

   if (!userId) redirect("/sign-in");

  const clients = await prisma.client.findMany({
    where: { userId },
    include: { sessions: true },
    orderBy: { createdAt: "desc" },
  });

  const totalClients = clients.length;

  const totalSessions = clients.reduce(
    (total: number, client: any) => total + client.sessions.length,
    0
  );

  const recentSessions = clients
    .flatMap((client: any) =>
      client.sessions.map((session: any) => ({
        ...session,
        clientName: client.name,
        clientId: client.id,
      }))
    )
    .sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4);

  return (
    <AppShell>
      <div className="mb-8">
        <p className="text-sm font-medium text-violet-600">Dashboard</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
          AI Client Notes & Follow-Ups
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Save time, stay organised, and turn rough client notes into polished
          summaries, actions, and follow-up messages.
        </p>

        <div className="mt-6 flex gap-3">
          <Link
            href="/clients"
            className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700"
          >
            View Clients
          </Link>

          <Link
            href="/clients/new"
            className="rounded-xl border bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Add Client
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Clients</p>
          <p className="mt-3 text-3xl font-bold text-slate-950">
            {totalClients}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Sessions</p>
          <p className="mt-3 text-3xl font-bold text-slate-950">
            {totalSessions}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">AI Follow-Ups</p>
          <p className="mt-3 text-3xl font-bold text-slate-950">
            {totalSessions}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-950">
              Recent Session Notes
            </h2>

            <Link
              href="/clients"
              className="text-sm font-medium text-violet-600 hover:text-violet-700"
            >
              View all
            </Link>
          </div>

          {recentSessions.length === 0 ? (
            <p className="text-slate-500">No sessions yet.</p>
          ) : (
            <div className="space-y-3">
              {recentSessions.map((session: any) => (
                <Link
                  key={session.id}
                  href={`/clients/${session.clientId}`}
                  className="block rounded-xl border p-4 hover:bg-slate-50"
                >
                  <p className="font-semibold text-slate-900">
                    {session.clientName}
                  </p>
                  <p className="mt-1 line-clamp-1 text-sm text-slate-500">
                    {session.content}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">
            Suggested Next Steps
          </h2>

          <div className="mt-5 space-y-3">
            <Link
              href="/clients/new"
              className="block rounded-xl border p-4 hover:bg-slate-50"
            >
              Add your next client
            </Link>

            <Link
              href="/clients"
              className="block rounded-xl border p-4 hover:bg-slate-50"
            >
              Review client session history
            </Link>

            <div className="rounded-xl border p-4 text-slate-600">
              Copy follow-up messages into email or WhatsApp
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}