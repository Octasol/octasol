import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function openInNewTab(url: string) {
  const win = window.open(url, "_blank");
  if (win) win.focus();
}

export function openInNewWindow(url: string) {
  window.open(
    url,
    "_blank",
    "toolbar=yes,scrollbars=yes,resizable=yes,width=1000,height=1000, left=500, top=500"
  );
}

export function bigintToString(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === "bigint") {
    return obj.toString();
  } else if (Array.isArray(obj)) {
    return obj.map(bigintToString);
  } else if (typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, bigintToString(value)])
    );
  }
  return obj;
}
