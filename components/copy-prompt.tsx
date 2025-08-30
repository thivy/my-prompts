"use client";
import { cn } from "@/lib/cn";
import { copyToClipboard } from "@/lib/helper";
import { useState, useTransition } from "react";

export function CopyPrompt({ text, image }: { text: string; image: string }) {
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
      className="fixed left-1/2 bottom-2 md:bottom-4 z-50 -translate-x-1/2 flex justify-center"
      style={{ pointerEvents: "none" }}
    >
      <button
        type="button"
        className={cn(
          "relative h-[65px] md:h-[80px] w-auto rounded-full  outline-none select-none focus:outline-none ",
          " text-stone-600/70 hover:text-stone-600 backdrop-blur-xs",
          "transition-transform duration-150 ease-out",
          "active:scale-95"
        )}
        onClick={() => startTransition(handleCopy)}
        style={{
          pointerEvents: "auto",
        }}
        disabled={isPending}
      >
        <img
          src={image}
          alt="Glass"
          className="w-full h-full resize pointer-events-none"
        />
        <span className="pointer-events-none z-10 absolute inset-0 flex items-center justify-center shadow-sm font-medium">
          {copied ? "Copied" : isPending ? "Copying" : "Copy prompt"}
        </span>
      </button>
    </div>
  );
}
