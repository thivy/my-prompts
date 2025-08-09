import React from "react";

export type CalloutProps = {
  type?: "note" | "info" | "success" | "warning" | "error";
  title?: string;
  children?: React.ReactNode;
};

const styles: Record<NonNullable<CalloutProps["type"]>, string> = {
  note: "border-blue-200/60 bg-blue-50 text-blue-900",
  info: "border-sky-200/60 bg-sky-50 text-sky-900",
  success: "border-emerald-200/60 bg-emerald-50 text-emerald-900",
  warning: "border-amber-200/60 bg-amber-50 text-amber-900",
  error: "border-rose-200/60 bg-rose-50 text-rose-900",
};

export function Callout({ type = "note", title, children }: CalloutProps) {
  const klass = styles[type];
  return (
    <div className={`my-4 rounded-lg border p-4 ${klass}`}>
      {title && <div className="mb-1 font-semibold">{title}</div>}
      <div className="prose max-w-none prose-invert-0">{children}</div>
    </div>
  );
}

export default Callout;
