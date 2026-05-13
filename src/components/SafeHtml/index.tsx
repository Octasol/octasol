"use client";

import { useMemo } from "react";

const ALLOWED_TAGS = new Set([
  "a",
  "blockquote",
  "br",
  "code",
  "em",
  "h1",
  "h2",
  "h3",
  "i",
  "img",
  "li",
  "mark",
  "ol",
  "p",
  "pre",
  "s",
  "span",
  "strong",
  "u",
  "ul",
]);

const ALLOWED_ATTRIBUTES: Record<string, Set<string>> = {
  a: new Set(["href", "rel", "target", "title"]),
  img: new Set(["alt", "src", "title"]),
};

const URL_ATTRIBUTES = new Set(["href", "src"]);

function isSafeUrl(value: string, attribute: string) {
  try {
    const parsed = new URL(value, window.location.origin);
    if (attribute === "src") {
      return ["http:", "https:"].includes(parsed.protocol);
    }
    return ["http:", "https:", "mailto:", "tel:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}

function sanitizeElement(element: Element) {
  for (const child of Array.from(element.children)) {
    sanitizeElement(child);
  }

  const tagName = element.tagName.toLowerCase();
  if (!ALLOWED_TAGS.has(tagName)) {
    element.replaceWith(...Array.from(element.childNodes));
    return;
  }

  const allowedAttributes = ALLOWED_ATTRIBUTES[tagName] ?? new Set<string>();
  for (const attribute of Array.from(element.attributes)) {
    const attributeName = attribute.name.toLowerCase();
    const shouldKeep =
      allowedAttributes.has(attributeName) &&
      (!URL_ATTRIBUTES.has(attributeName) ||
        isSafeUrl(attribute.value, attributeName));

    if (!shouldKeep) {
      element.removeAttribute(attribute.name);
    }
  }

  if (tagName === "a" && element.getAttribute("href")) {
    element.setAttribute("rel", "noopener noreferrer");
    element.setAttribute("target", "_blank");
  }
}

function sanitizeHtml(html: string) {
  if (typeof window === "undefined") {
    return "";
  }

  const document = new DOMParser().parseFromString(html, "text/html");
  for (const child of Array.from(document.body.children)) {
    sanitizeElement(child);
  }

  return document.body.innerHTML;
}

export default function SafeHtml({
  className,
  html,
}: {
  className?: string;
  html?: string | null;
}) {
  const sanitizedHtml = useMemo(() => sanitizeHtml(html ?? ""), [html]);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
