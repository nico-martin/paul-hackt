import React from "react";

enum SCANNER_TYPES {
  NFT = "nft",
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
    if (!("NDEFReader" in window)) {
      setType(SCANNER_TYPES.NFT);
    } else {
      setType(SCANNER_TYPES.NONE);
    }
  }, []);

  const setUpScanner = async () => {
    const nfc = new NDEFReader();
    await nfc.scan();
    setNfcReader(nfc);
  };

  return (
    <Context.Provider value={{ type, setType, setUpScanner, nfcReader }}>
      {children}
    </Context.Provider>
  );
};
