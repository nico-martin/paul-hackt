import React, { useEffect, useState } from "react";
import { usePerson } from "@/store/PersonContext";
import useTypewriter from "@common/useTypewriter";
import { Button } from "@theme";
import { useScanner } from "@/store/ScannerContext";
import { useRouter } from "next/router";

const StepThree: React.FC<{ introText: string }> = ({ introText }) => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const {
    messages: [text],
    done,
  } = useTypewriter([introText]);

  const { setUpScanner } = useScanner();
  const router = useRouter();
  return (
    <div>
      <p>{text}</p>
      {done && (
        <div className="mt-4">
          <p>Jetzt gehts in die Ausstellung!</p>
          <br />
          <br />
          <Button
            className="mt-4"
            onClick={async () => {
              setLoading(true);
              await setUpScanner();
              await router.push("scanning");
            }}
            loading={loading}
          >
            Starten
          </Button>
        </div>
      )}
    </div>
  );
};

export default StepThree;
