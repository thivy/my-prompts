import React from "react";

export type CalloutProps = {
  children?: React.ReactNode;
};

export function Callout({ children }: CalloutProps) {
  return (
    <span
      className={`rounded-lg border px-2 py-2 bg-orange-100/60 border-orange-100 text-orange-400`}
    >
      {children}
    </span>
  );
}

export default Callout;
