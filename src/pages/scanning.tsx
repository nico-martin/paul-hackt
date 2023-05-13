import React from "react";
import type { NextPage } from "next";
import { Icon, InputSelect } from "@theme";
import { useRouter } from "next/router";

import styles from "./scanning.module.css";
import { CREATIONS, NFC_PREFIX } from "@common/constants";
import { SCANNER_TYPES, useScanner } from "@/store/ScannerContext";
import LoadingScreen from "@/components/LoadingScreen";

const Scanning: NextPage = () => {
  const { type, nfcReader } = useScanner();
  const router = useRouter();

  React.useEffect(() => {
    if (nfcReader) {
      nfcReader.onreadingerror = (e) => console.log(e);
      nfcReader.onreading = read;
    }
  }, [nfcReader]);

  const read = (e: NDEFReadingEvent) => {
    e.message.records.map((record) => {
      try {
        const textDecoder = new TextDecoder();
        const message = textDecoder.decode(record.data);
        console.log(message, `creation/${message.replace(NFC_PREFIX, "")}`);
        if (record.recordType === "text" && message.startsWith(NFC_PREFIX)) {
          router.push(`creation/${message.replace(NFC_PREFIX, "")}`);
        }
      } catch (e) {
        console.log(e);
      }
    });
  };

  return (
    <div className={styles.root}>
      {type === SCANNER_TYPES.NONE ? (
        <div className={styles.notSupported}>
          <p>
            Der NFC Reader wird auf diesem Gerät nicht unterstützt. Bitte Wähle
            ein Werk aus der Liste aus:
          </p>
          <InputSelect
            name="creation"
            options={{ "": "Select...", ...CREATIONS }}
            onChange={(e) => {
              e.target.value && router.push(`creation/${e.target.value}`);
            }}
          />
        </div>
      ) : type == SCANNER_TYPES.NFT ? (
        <React.Fragment>
          <Icon icon="nfc" className={styles.icon} />
          <div className={styles.loader}>
            <div className={styles.circle} />
            <div className={styles.circle} />
            <div className={styles.circle} />
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default Scanning;
