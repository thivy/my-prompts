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
          "relative h-[65px] md:h-[80px] rounded-full  outline-none overflow-hidden select-none focus:outline-none ",
          " text-stone-600/70 backdrop-blur-xs shadow-md shadow-pink-200 bg-pink-400/25"
        )}
        onClick={() => startTransition(handleCopy)}
        style={{
          pointerEvents: "auto",
        }}
        disabled={isPending}
      >
        <img src={"/glass.png"} alt="Glass" className="w-full h-full" />
        <span className="pointer-events-none z-10 absolute inset-0 flex items-center justify-center shadow-sm font-medium">
          {copied ? "Copied!" : isPending ? "Copying..." : "Copy prompt"}
        </span>
      </button>
    </div>
  );
}
