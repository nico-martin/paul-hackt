import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import styles from "./_app.module.css";
import { Provider as PersonContextProvider } from "@/store/PersonContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <title>PaulHackt</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,user-scalable=yes"
          key="viewport"
        />
        <meta name="robots" content="all" key="robots" />
      </Head>
      <PersonContextProvider>
        <main className={styles.main}>
          <Component {...pageProps} />
        </main>
      </PersonContextProvider>
    </React.Fragment>
  );
}
export default MyApp;
