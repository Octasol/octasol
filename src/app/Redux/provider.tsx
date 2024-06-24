"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { ReactNode } from "react";
type Props = { children: ReactNode };

export function Providers({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}
