"use client";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { ReactNode } from "react";
import { PersistGate } from "redux-persist/integration/react";

type Props = { children: ReactNode };

export function Providers({ children }: Props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
