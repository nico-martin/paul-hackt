import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import styles from "./_app.module.css";
import { Provider as PersonContextProvider } from "@/store/PersonContext";
import { Provider as ScannerContextProvider } from "@/store/ScannerContext";
import { Quicksand, PT_Serif } from "next/font/google";

const quicksand = Quicksand({ subsets: ["latin"] });
const ptSerif = PT_Serif({ weight: ["400", "700"], subsets: ["latin"] });

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
        <style>{`
          html {
            --font-family-heading: ${quicksand.style.fontFamily};
            --font-family-body: ${ptSerif.style.fontFamily}; 
          }
        `}</style>
      </Head>
      <PersonContextProvider>
        <ScannerContextProvider>
          <main className={styles.main}>
            <Component {...pageProps} />
          </main>
        </ScannerContextProvider>
      </PersonContextProvider>
    </React.Fragment>
  );
}

export default MyApp;
