"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type Category = { slug: string; name: string; cover?: string };

export function HeroCategoryMenuClient({
  categories,
}: {
  categories: Category[];
}) {
  // Single icon image for all categories
  const ICON_SRC =
    "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/vision-pro-card-66-vision-pro-202401";
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Use only the real categories provided (no placeholders)

  // create random category items
  const createRandomCategories = (count: number): Category[] => {
    return Array.from({ length: count }, (_, i) => ({
      slug: `category-${i + 1}`,
      name: `category-${i + 1}`,
      cover: ICON_SRC,
    }));
  };

  const items: Category[] = useMemo(() => createRandomCategories(15), []);

  // Recompute scroll button visibility
  const recalc = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft < maxScroll - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    recalc();

    const onScroll = () => recalc();
    const onResize = () => recalc();

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // ResizeObserver for content size changes
    const ro = new ResizeObserver(() => recalc());
    ro.observe(el);

    // Also observe first/last child for dynamic content
    const list = el.querySelector("ul");
    if (list) ro.observe(list);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, []);

  const scrollByCard = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card instanceof HTMLElement ? card.offsetWidth + 12 : 240; // gap approx
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Browse categories"
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen [--edge:calc(max(1rem,(100vw-72rem)/2))]"
    >
      <div className="relative">
        {/* Scroll buttons - reusable component */}
        <ScrollArrow
          side="left"
          ariaLabel="Scroll categories left"
          onClick={() => scrollByCard(-1)}
          disabled={!canScrollLeft}
        >
          <ArrowLeftIcon />
        </ScrollArrow>

        <ScrollArrow
          side="right"
          ariaLabel="Scroll categories right"
          onClick={() => scrollByCard(1)}
          disabled={!canScrollRight}
        >
          <ArrowRightIcon />
        </ScrollArrow>

        {/* The scroller: keep first item aligned with content container start */}
        <div
          ref={scrollRef}
          className="
            overflow-x-auto scroll-smooth [scrollbar-gutter:stable] hide-scrollbar
            snap-x snap-mandatory
            scroll-pl-[var(--edge)] scroll-pr-4
            py-3
          "
          role="presentation"
        >
          <ul className="flex min-w-max gap-3 pl-[var(--edge)] pr-4">
            {items.map((c) => (
              <li
                key={c.slug}
                className="snap-start snap-always scroll-mx-2 md:scroll-mx-3"
              >
                <Link
                  href={`/categories/${c.slug}`}
                  className="group inline-flex flex-col items-stretch gap-3 rounded-xl pr-3 ring-0 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
                >
                  <span className="relative size-[130px] overflow-hidden rounded-lg bg-slate-100">
                    <Image
                      src={ICON_SRC}
                      alt={c.name}
                      fill
                      className="object-contain"
                    />
                  </span>
                  <span className="text-sm font-medium text-slate-800 text-center group-hover:text-slate-900">
                    {c.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

type ScrollArrowProps = {
  side: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
  children: React.ReactNode;
};

function ScrollArrow({
  side,
  onClick,
  disabled,
  ariaLabel,
  children,
}: ScrollArrowProps) {
  const sideClass = side === "left" ? "left-2" : "right-2";
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={!!disabled}
      className={`
        absolute ${sideClass} top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white/90 p-2 shadow-sm backdrop-blur transition
        hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60
        disabled:opacity-0 disabled:pointer-events-none
      `}
    >
      {children}
    </button>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
    >
      <path
        d="M12.5 4.5L7 10l5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
    >
      <path
        d="M7.5 4.5L13 10l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
