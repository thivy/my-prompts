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
    <div
      className="fixed left-1/2 bottom-8 z-50 -translate-x-1/2 flex justify-center"
      style={{ pointerEvents: "none" }}
    >
      <button
        type="button"
        className="relative min-h-[64px] px-10 py-4 rounded-full text-xl font-medium tracking-tight border-none outline-none overflow-hidden transition-all duration-200 select-none focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 bg-gradient-to-br from-slate-50 via-blue-100 to-pink-100 shadow-[0_4px_32px_0_rgba(0,0,0,0.13),0_1.5px_8px_0_rgba(0,0,0,0.10),0_0_0_2px_white_inset,0_0_48px_0_rgba(120,180,255,0.22),0_0_0_16px_rgba(186,230,253,0.18)_inset,0_0_0_32px_rgba(255,200,255,0.10)_inset] text-neutral-900 hover:shadow-[0_12px_64px_0_rgba(0,0,0,0.18),0_4px_24px_0_rgba(0,0,0,0.13),0_0_0_3px_white_inset,0_0_64px_0_rgba(120,180,255,0.28),0_0_0_24px_rgba(186,230,253,0.22)_inset,0_0_0_48px_rgba(255,200,255,0.16)_inset] hover:bg-gradient-to-br hover:from-slate-100 hover:via-blue-200 hover:to-pink-200 hover:text-neutral-950 active:shadow-[0_2px_8px_0_rgba(0,0,0,0.1),0_0.5px_2px_0_rgba(0,0,0,0.08),0_0_0_1.5px_white_inset,0_0_16px_0_rgba(120,180,255,0.1),0_0_0_4px_rgba(255,255,255,0.1)_inset]"
        onClick={() => startTransition(handleCopy)}
        style={{
          pointerEvents: "auto",
        }}
        disabled={isPending}
      >
        <span className="pointer-events-none z-10 relative text-slate-600">
          {copied ? "Copied!" : isPending ? "Copying..." : "Copy Prompt"}
        </span>
        {/* Glow overlays */}
        <span className="absolute inset-0 rounded-full pointer-events-none opacity-90 bg-gradient-to-r from-white/90 via-blue-200/60 to-pink-200/40 blur-sm" />
        <span className="absolute inset-0 rounded-full pointer-events-none opacity-60 bg-gradient-to-br from-transparent via-blue-200/60 to-pink-200/40 blur-md" />
      </button>
    </div>
  );
}
