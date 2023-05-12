import React from "react";
import type { NextPage } from "next";
import { Card, Icon, InputSelect } from "@theme";
import { usePerson } from "@/store/PersonContext";
import { useRouter } from "next/router";

import styles from "./scanning.module.css";
import { CREATIONS } from "@common/constants";
const Scanning: NextPage = () => {
  const [supported, setSupported] = React.useState<boolean>(false);
  const [scanning, setScanning] = React.useState<boolean>(false);
  const router = useRouter();

  React.useEffect(() => {
    if (!("NDEFReader" in window)) {
      return;
    }
    setSupported(true);
  }, []);

  return (
    <div className={styles.root}>
      {!supported ? (
        <div className={styles.notSupported}>
          <p>
            Der NFC Reader wird auf diesem Gerät nicht unterstützt. Bitte Wähle
            ein Werk aus der Liste aus:
          </p>
          <InputSelect
            name="creation"
            options={CREATIONS}
            onChange={(e) => {
              alert(JSON.stringify(e));
              router.push(`creation/${e.target.value}`);
            }}
          />
        </div>
      ) : scanning ? (
        <React.Fragment>
          <Icon icon="nfc" className={styles.icon} />
          <div className={styles.loader}>
            <div className={styles.circle} />
            <div className={styles.circle} />
            <div className={styles.circle} />
          </div>
        </React.Fragment>
      ) : (
        <button
          onClick={() => {
            console.log("SCAN");
            setScanning(true);
            const nfc = new NDEFReader();
            nfc.scan().then((result) => console.log(result));
          }}
        >
          scan
        </button>
      )}
    </div>
  );
};

export default Scanning;
