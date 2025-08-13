import { cn } from "@/lib/cn";
import { ComponentProps } from "react";

export const ContentContainer = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div className={cn("mx-auto max-w-6xl px-4 xl:px-0", className)} {...props}>
      {children}
    </div>
  );
};
