import { cn } from "@/lib/cn";
import Link from "next/link";
import { ReactNode } from "react";

export interface MasonryGridItem {
  id: string | number;
  content: ReactNode;
  href?: string;
  className?: string;
  linkClassName?: string;
}

interface MasonryGridProps {
  items: MasonryGridItem[];
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: string;
  className?: string;
}

export const MasonryGrid = ({ 
  items, 
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = "gap-6",
  className 
}: MasonryGridProps) => {
  const columnClasses = [
    columns.sm && `columns-${columns.sm}`,
    columns.md && `md:columns-${columns.md}`,
    columns.lg && `lg:columns-${columns.lg}`,
    columns.xl && `xl:columns-${columns.xl}`,
  ].filter(Boolean).join(" ");

  return (
    <div className={cn("masonry-grid", columnClasses, gap, className)}>
      {items.map((item) => {
        const itemContent = (
          <div 
            className={cn(
              "break-inside-avoid mb-6 inline-block w-full",
              item.className
            )}
          >
            {item.content}
          </div>
        );

        if (item.href) {
          const isExternal = item.href.startsWith('http');
          
          if (isExternal) {
            return (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn("block", item.linkClassName)}
              >
                {itemContent}
              </a>
            );
          } else {
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn("block", item.linkClassName)}
              >
                {itemContent}
              </Link>
            );
          }
        }

        return <div key={item.id}>{itemContent}</div>;
      })}
    </div>
  );
};