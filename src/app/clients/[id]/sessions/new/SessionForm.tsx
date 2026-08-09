"use client";

import { useActionState } from "react";
import { createSession } from "../actions";

interface SessionFormProps {
  clientId: string;
}

type SessionResult = {
  success?: boolean;
  demo?: boolean;
  summary?: string;
  actions?: string;
  followUp?: string;
};

const initialState: SessionResult = {};

export default function SessionForm({
  clientId,
}: SessionFormProps) {
  const [state, formAction, pending] = useActionState(
    createSession,
    initialState
  );

  return (
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

        <form action={formAction} className="space-y-5">
          <input
            type="hidden"
            name="clientId"
            value={clientId}
          />

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
            disabled={pending}
            className="w-full rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending
              ? "Generating AI Summary..."
              : "Generate AI Summary →"}
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
              Your AI-generated results will appear here.
            </p>
          </div>
        </div>

        {state.summary ? (
          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-950">
                Summary
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {state.summary}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-950">
                Action Points
              </h3>

              <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
                {state.actions}
              </p>
            </div>

            <div className="rounded-2xl bg-violet-50 p-5">
              <h3 className="font-semibold text-violet-950">
                Follow-Up Message
              </h3>

              <p className="mt-2 text-sm leading-6 text-violet-800">
                {state.followUp}
              </p>
            </div>

            {state.demo && (
              <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4 text-sm text-violet-800">
                🚀 <strong>Demo Mode:</strong> This AI result is
                for demonstration purposes and has not been saved.
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-950">
                Summary
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                A clean, concise summary of the session will appear here.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-950">
                Action Points
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Clear next steps and client priorities will appear here.
              </p>
            </div>

            <div className="rounded-2xl bg-violet-50 p-5">
              <h3 className="font-semibold text-violet-950">
                Follow-Up Message
              </h3>

              <p className="mt-2 text-sm text-violet-800">
                A personalised client message will appear here.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}