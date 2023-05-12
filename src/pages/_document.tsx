import React from "react";
// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/*
          <link rel="shortcut icon" href="/fav/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/fav/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/fav/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/fav/favicon-16x16.png"
          />*/}
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <div id="shadowbox" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
