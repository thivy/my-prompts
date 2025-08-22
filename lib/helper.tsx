"use client";

export const copyToClipboard = async (text: string) => {
  if (navigator.clipboard) {
    return await navigator.clipboard.writeText(text);
  } else {
    return Promise.reject("Clipboard API not available");
  }
};
