import { POST } from "@/config/axios/requests";
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

export const uploadImage = async (
  file: File,
  accessToken: string
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  // Send the file to the backend to handle S3 upload
  const { response, error } = await POST("/uploadImage", formData, {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${accessToken}`,
  });

  if (error || !response?.data?.url) {
    throw new Error("Failed to upload image");
  }

  return response.data.url;
};

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
