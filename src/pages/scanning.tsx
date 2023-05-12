import React from "react";
import type { NextPage } from "next";
import { Card, Icon, InputSelect } from "@theme";
import { usePerson } from "@/store/PersonContext";
import { useRouter } from "next/router";

import styles from "./scanning.module.css";
import { CREATIONS, URL } from "@common/constants";
import { read } from "fs";
const Scanning: NextPage = () => {
  const [supported, setSupported] = React.useState<boolean>(false);
  const [reader, setReader] = React.useState<NDEFReader>(null);
  const router = useRouter();

  React.useEffect(() => {
    if (!("NDEFReader" in window)) {
      return;
    }
    setSupported(true);
  }, []);

  const read = (e: NDEFReadingEvent) => {
    console.log(e.serialNumber);
    e.message.records.map((record) => {
      console.log(record);
      try {
        const textDecoder = new TextDecoder();
        const message = textDecoder.decode(record.data);
        console.log(message);
        if (record.recordType === "text" && message.startsWith(URL)) {
          router.push(`creation/${message.replace(URL, "")}`);
        }
      } catch (e) {
        console.log(e);
      }
    });
    /*
    for (const record of e.message.records) {
      if()
      console.log(record);
      /*
      switch (record.recordType) {
        case "text":
          const textDecoder = new TextDecoder(record.encoding);
          setMessage(textDecoder.decode(record.data));
          break;
        case "url":
          // TODO: Read URL record with record data.
          break;
        default:
        // TODO: Handle other records with record data.
      }
    }*/
  };

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
      ) : reader ? (
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
          className={styles.scanButton}
          onClick={async () => {
            const nfc = new NDEFReader();
            await nfc.scan();
            setReader(nfc);
            nfc.onreadingerror = (e) => alert(JSON.stringify(e));
            nfc.onreading = (e) => read(e);
          }}
        >
          scan
        </button>
      )}
    </div>
  );
};

export default Scanning;
