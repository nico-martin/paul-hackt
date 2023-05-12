"use client";
import Image from "next/image";
import {
  Provider as PersonContextProvider,
  usePerson,
} from "./store/PersonContext";
import { Card } from "@theme";
import { inspect } from "util";
import styles from "./page.module.css";
import "../styles/globals.css";

export default function Home() {
  return (
    <PersonContextProvider>
      <main className={styles.root}>
        <Card>
          <p>Test</p>
        </Card>
      </main>
    </PersonContextProvider>
  );
}
