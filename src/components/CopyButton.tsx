"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-full bg-white px-3 py-1 text-xs font-medium text-violet-700 hover:bg-violet-100"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}