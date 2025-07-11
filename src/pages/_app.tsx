import "@/styles/globals.css";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/reducer/store";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

