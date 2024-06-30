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
