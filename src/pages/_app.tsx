import "@/styles/globals.css";
import React from "react";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { store } from "@/reducer/store";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}
