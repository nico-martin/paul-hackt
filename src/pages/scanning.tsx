import React from "react";
import type { NextPage } from "next";
import { Button, Icon, InputSelect } from "@theme";
import { useRouter } from "next/router";

import styles from "./scanning.module.css";
import { CREATIONS, NFC_PREFIX } from "@common/constants";
import { SCANNER_TYPES, useScanner } from "@/store/ScannerContext";

const Scanning: NextPage = () => {
  const { type, nfcReader, setType } = useScanner();
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
          <p>Bitte Wähle ein Werk aus der Liste aus:</p>
          <InputSelect
            name="creation"
            options={{ "": "Select...", ...CREATIONS }}
            onChange={(e) => {
              e.target.value && router.push(`creation/${e.target.value}`);
            }}
          />
          {nfcReader && (
            <p>
              Oder nutze den Scanner:
              <br />
              <Button
                appearance="none"
                full
                onClick={() => setType(SCANNER_TYPES.NFC)}
              >
                NFC-Scanner
              </Button>
            </p>
          )}
        </div>
      ) : type == SCANNER_TYPES.NFC ? (
        <React.Fragment>
          <Icon icon="nfc" className={styles.icon} />
          <div className={styles.loader}>
            <div className={styles.circle} />
            <div className={styles.circle} />
            <div className={styles.circle} />
          </div>
          <div className={styles.description}>
            <p className={styles.descTop}>
              Du kannst dich jetzt im Museum bewegen und wenn du mehr über ein
              Werk erfahren möchtest, halte dein Gerät an den Lili-Tag.
            </p>
            <p className={styles.descBottom}>
              Möchtest du statdessen das Kunstwerk aus der Liste auswählen?
              <br />
              <br />
              <Button
                appearance="light"
                full
                onClick={() => setType(SCANNER_TYPES.NONE)}
              >
                Liste
              </Button>
            </p>
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default Scanning;
