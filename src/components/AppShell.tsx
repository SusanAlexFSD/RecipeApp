import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="hidden w-64 flex-col border-r bg-white px-4 py-6 md:flex">
        <Link href="/dashboard" className="mb-10 text-xl font-bold">
          CoachFlow AI
        </Link>

        <nav className="space-y-2">
          <Link
            href="/dashboard"
            className="block rounded-xl bg-violet-50 px-4 py-3 text-sm font-medium text-violet-700"
          >
            Dashboard
          </Link>

          <Link
            href="/clients"
            className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Clients
          </Link>

          <Link
            href="/clients/new"
            className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Add Client
          </Link>
        </nav>

        <div className="mt-auto flex items-center gap-3 rounded-xl bg-slate-50 p-3">
          <UserButton />
          <div>
            <p className="text-sm font-semibold">Account</p>
            <p className="text-xs text-slate-500">Workspace</p>
          </div>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b bg-white px-6 py-4 md:hidden">
          <Link href="/dashboard" className="font-bold">
            CoachFlow AI
          </Link>
          <UserButton />
        </header>

        <main className="px-6 py-8">{children}</main>
      </div>
    </div>
  );
}