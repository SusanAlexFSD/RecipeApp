import Link from "next/link";
import AppShell from "@/components/AppShell";
import SessionForm from "./SessionForm";

interface NewSessionPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NewSessionPage({
  params,
}: NewSessionPageProps) {
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

        <SessionForm clientId={id} />
      </div>
    </AppShell>
  );
}