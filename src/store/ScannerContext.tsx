import React from "react";

export enum SCANNER_TYPES {
  NFC = "nfc",
  NONE = "none",
}

interface Scanner {
  type: SCANNER_TYPES;
  setType: (type: SCANNER_TYPES) => void;
  setUpScanner: () => Promise<void>;
  nfcReader: NDEFReader;
}

const defaultValues: Scanner = {
  type: null,
  setType: () => {},
  setUpScanner: async () => {},
  nfcReader: null,
};

const Context = React.createContext<Scanner>(defaultValues);

export const Provider = ({ children }: { children: any }) => {
  const [type, setType] = React.useState<SCANNER_TYPES>(null);
  const [nfcReader, setNfcReader] = React.useState<NDEFReader>(null);

  React.useEffect(() => {
    if ("NDEFReader" in window) {
      setType(SCANNER_TYPES.NFC);
    } else {
      setType(SCANNER_TYPES.NONE);
    }
  }, []);

  const setUpScanner = async () => {
    if (type === SCANNER_TYPES.NONE) {
      return;
    } else {
      const nfc = new NDEFReader();
      await nfc.scan();
      setNfcReader(nfc);
    }
  };

  return (
    <Context.Provider value={{ type, setType, setUpScanner, nfcReader }}>
      {children}
    </Context.Provider>
  );
};

export const useScanner = (): {
  type: SCANNER_TYPES;
  setType: (type: SCANNER_TYPES) => void;
  setUpScanner: () => Promise<void>;
  nfcReader: NDEFReader;
} => {
  const context = React.useContext(Context);
  return {
    type: context.type,
    setUpScanner: context.setUpScanner,
    nfcReader: context.nfcReader,
    setType: context.setType,
  };
};
