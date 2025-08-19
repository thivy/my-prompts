import React from "react";

export type CalloutProps = {
  children?: React.ReactNode;
};

export function Callout({ children }: CalloutProps) {
  return <span className={`rounded-lg border p-4`}>{children}</span>;
}

export default Callout;
