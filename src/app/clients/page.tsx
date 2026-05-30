import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import AppShell from "@/components/AppShell";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const clients = await prisma.client.findMany({
    where: {
      userId,
    },
    include: {
      sessions: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <AppShell>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold text-violet-600">Clients</p>
          <h1 className="mt-2 text-4xl font-bold text-slate-950">
            Client Workspace
          </h1>
          <p className="mt-2 text-slate-600">
            Manage clients, session notes, AI summaries, and follow-ups.
          </p>
        </div>

        <Link
          href="/clients/new"
          className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-violet-700"
        >
          Add New Client
        </Link>
      </div>

      {clients.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">No clients yet</h2>
          <p className="mt-2 text-slate-600">
            Add your first client to start generating AI session summaries.
          </p>

          <Link
            href="/clients/new"
            className="mt-6 inline-block rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700"
          >
            Add Client
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {clients.map((client: any) => (
            <Link
              key={client.id}
              href={`/clients/${client.id}`}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-950 group-hover:text-violet-700">
                    {client.name}
                  </h2>

                  {client.email ? (
                    <p className="mt-2 text-sm text-slate-500">
                      {client.email}
                    </p>
                  ) : null}

                  {client.phone ? (
                    <p className="mt-1 text-sm text-slate-500">
                      {client.phone}
                    </p>
                  ) : null}
                </div>

                <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
                  {client.sessions.length} sessions
                </span>
              </div>

              {client.notes ? (
                <p className="line-clamp-3 text-sm leading-6 text-slate-600">
                  {client.notes}
                </p>
              ) : (
                <p className="text-sm text-slate-400">
                  No client notes added yet.
                </p>
              )}

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-sm font-medium text-slate-500">
                  View profile
                </span>

                <span className="text-sm font-semibold text-violet-600">
                  Open →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </AppShell>
  );
}