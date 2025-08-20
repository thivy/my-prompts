"use client";

import { cn } from "@/lib/cn";
import Image from "next/image";
import { useState } from "react";

interface PIXELPromptProps {
  className?: string;
}

const letterMapping = {
  P: "/header/P_Baloon.png",
  I: "/header/I_Baloon.png", 
  X: "/header/X_Baloon.png",
  E: "/header/E_Baloon.png",
  L: "/header/L_Baloon.png",
} as const;

interface LetterProps {
  letter: keyof typeof letterMapping;
  className?: string;
}

const HoverLetter = ({ letter, className }: LetterProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={cn("relative inline-block transition-all duration-300 cursor-pointer", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setIsHovered(!isHovered);
        }
      }}
      aria-label={`Letter ${letter} - ${isHovered ? 'showing balloon' : 'showing text'}`}
    >
      {/* Text letter */}
      <span
        className={cn(
          "transition-opacity duration-300 inline-block select-none",
          isHovered ? "opacity-0" : "opacity-100"
        )}
      >
        {letter}
      </span>
      
      {/* Balloon image */}
      <span className={cn(
        "absolute top-0 left-0 w-full h-full transition-opacity duration-300 pointer-events-none",
        isHovered ? "opacity-100" : "opacity-0"
      )}>
        <Image
          src={letterMapping[letter]}
          alt={`${letter} balloon`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={false}
        />
      </span>
    </span>
  );
};

export const PIXELPrompt = ({ className }: PIXELPromptProps) => {
  return (
    <span className={cn("font-bold", className)}>
      <HoverLetter letter="P" />
      <HoverLetter letter="I" />
      <HoverLetter letter="X" />
      <HoverLetter letter="E" />
      <HoverLetter letter="L" />
      <span>Prompt</span>
    </span>
  );
};