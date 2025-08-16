"use client";
import { useState, useTransition } from "react";

export function CopyPromptButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm font-medium transition-colors"
      onClick={() => startTransition(handleCopy)}
      disabled={isPending}
    >
      {copied ? "Copied!" : isPending ? "Copying..." : "Copy Prompt"}
    </button>
  );
}
