/* eslint-disable @next/next/no-img-element */
import React from "react";

export function P({ children }: { children?: React.ReactNode }) {
  return <p className="my-6">{children}</p>;
}

export function List({
  ordered,
  start,
  children,
}: {
  ordered?: boolean;
  start?: number;
  children?: React.ReactNode;
}) {
  if (ordered) return <ol start={start}>{children}</ol>;
  return <ul>{children}</ul>;
}

export function Li({ children }: { children?: React.ReactNode }) {
  return <li>{children}</li>;
}

export function Blockquote({ children }: { children?: React.ReactNode }) {
  return <blockquote>{children}</blockquote>;
}

export function Heading({
  level,
  children,
}: {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children?: React.ReactNode;
}) {
  const tag = `h${level}` as keyof HTMLElementTagNameMap;
  const classes: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
    1: "mt-10 mb-6 text-3xl md:text-4xl font-bold tracking-tight",
    2: "mt-8 mb-4 text-2xl md:text-3xl font-semibold",
    3: "mt-6 mb-3 text-xl md:text-2xl font-semibold",
    4: "mt-5 mb-2 text-lg md:text-xl font-semibold",
    5: "mt-4 mb-2 text-base md:text-lg font-semibold",
    6: "mt-3 mb-2 text-sm md:text-base font-semibold uppercase tracking-wide ",
  };
  return React.createElement(tag, { className: classes[level] }, children);
}

export function InlineCode({ content }: { content: string }) {
  return <code>{content}</code>;
}

export function Fence({
  content,
  language,
}: {
  content: string;
  language?: string;
}) {
  return (
    <pre>
      <code className={language ? `language-${language}` : undefined}>
        {content}
      </code>
    </pre>
  );
}

export function A({
  href,
  title,
  children,
}: {
  href?: string;
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={href}
      title={title}
      target={href?.startsWith("/") ? undefined : "_blank"}
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

export function Img({
  src,
  alt,
  title,
}: {
  src?: string;
  alt?: string;
  title?: string;
}) {
  if (!src) return null;
  return <img src={src} alt={alt} title={title} loading="lazy" />;
}

export function Hr() {
  return <hr />;
}

export function Strong({ children }: { children?: React.ReactNode }) {
  return <strong>{children}</strong>;
}

export function Em({ children }: { children?: React.ReactNode }) {
  return <em>{children}</em>;
}

export function Table({ children }: { children?: React.ReactNode }) {
  return (
    <div className="not-prose overflow-x-auto">
      <table className="w-full border-collapse">{children}</table>
    </div>
  );
}

export function Thead({ children }: { children?: React.ReactNode }) {
  return <thead>{children}</thead>;
}

export function Tbody({ children }: { children?: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function Tr({ children }: { children?: React.ReactNode }) {
  return <tr>{children}</tr>;
}

export function Th({ children }: { children?: React.ReactNode }) {
  return <th>{children}</th>;
}

export function Td({ children }: { children?: React.ReactNode }) {
  return <td>{children}</td>;
}

export const mdComponentsDefault = {
  P,
  List,
  Li,
  Blockquote,
  Heading,
  InlineCode,
  Fence,
  A,
  Img,
  Hr,
  Strong,
  Em,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
};

export type MdComponentMap = typeof mdComponentsDefault;
