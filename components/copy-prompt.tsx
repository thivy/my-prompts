"use client";
import { cn } from "@/lib/cn";
import { copyToClipboard } from "@/lib/helper";
import { useState, useTransition } from "react";

export function CopyPrompt({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();
  async function handleCopy() {
    try {
      await copyToClipboard(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      className="fixed left-1/2 bottom-4 z-50 -translate-x-1/2 flex justify-center"
      style={{ pointerEvents: "none" }}
    >
      <button
        type="button"
        className={cn(
          "relative px-10 py-4 rounded-full tracking-tight outline-none overflow-hidden select-none focus:outline-none ",
          "bg-stone-200/50 text-stone-700 backdrop-blur-sm shadow-2xl border border-stone-400/30"
        )}
        onClick={() => startTransition(handleCopy)}
        style={{
          pointerEvents: "auto",
        }}
        disabled={isPending}
      >
        <span className="pointer-events-none z-10 relative">
          {copied ? "Copied!" : isPending ? "Copying..." : "Copy Prompt"}
        </span>
      </button>
    </div>
  );
}
