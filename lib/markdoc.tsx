import {
  A,
  Blockquote,
  Em,
  Fence,
  Heading,
  Hr,
  Img,
  InlineCode,
  Li,
  List,
  P,
  Strong,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@/components/markdoc-components";
import * as Markdoc from "@markdoc/markdoc";
import React from "react";

// Markdoc schema for a custom Callout tag
// Usage in content:
// {% callout type="warning" title="Heads up" %}
// Your message here
// {% /callout %}

export const calloutTag: {
  render: string;
  attributes: {
    type: { type: typeof String; default: string; matches: string[] };
    title: { type: typeof String; required?: boolean };
  };
} = {
  render: "Callout",
  attributes: {
    type: {
      type: String,
      default: "note",
      matches: ["note", "info", "success", "warning", "error"],
    },
    title: { type: String, required: false },
  },
};

const baseConfig = {
  nodes: {
    paragraph: { render: "P" },
    hardbreak: { render: "br" },
    softbreak: { render: "br" },
    blockquote: { render: "Blockquote" },
    list: {
      render: "List",
      attributes: { ordered: { type: Boolean }, start: { type: Number } },
    },
    item: { render: "Li" },
    code: {
      render: "InlineCode",
      attributes: { content: { type: String } },
    },
    fence: {
      render: "Fence",
      attributes: { content: { type: String }, language: { type: String } },
    },
    heading: {
      render: "Heading",
      attributes: { level: { type: Number, required: true } },
    },
    hr: { render: "Hr" },
    link: {
      render: "A",
      attributes: { href: { type: String }, title: { type: String } },
    },
    image: {
      render: "Img",
      attributes: {
        src: { type: String },
        alt: { type: String },
        title: { type: String },
      },
    },
    strong: { render: "Strong" },
    emphasis: { render: "Em" },
    table: { render: "Table" },
    thead: { render: "Thead" },
    tbody: { render: "Tbody" },
    tr: { render: "Tr" },
    th: { render: "Th" },
    td: { render: "Td" },
  },
  tags: {
    callout: calloutTag,
  },
};

type AnyProps = Record<string, unknown>;
export type MarkdocComponents = Record<string, React.ComponentType<AnyProps>>;

export function renderMarkdoc(
  source: string,
  components: MarkdocComponents
): React.ReactNode {
  const ast = Markdoc.parse(source);
  const content = Markdoc.transform(
    ast,
    baseConfig as unknown as Markdoc.Config
  );
  return Markdoc.renderers.react(content, React, {
    components: {
      // defaults for common nodes
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
      // user overrides (e.g., Callout)
      ...components,
    } as unknown as Record<
      string,
      React.ComponentType<Record<string, unknown>>
    >,
  });
}
