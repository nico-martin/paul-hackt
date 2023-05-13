import React, { useEffect, useState } from "react";
import { usePerson } from "@/store/PersonContext";
import useTypewriter from "@common/useTypewriter";
import { Button } from "@theme";
import { useScanner } from "@/store/ScannerContext";
import { useRouter } from "next/router";
import { useTextToSpeech } from "@/store/TextToSpeechContext";
import Typewriter from "@/components/Typewriter";

const StepThree: React.FC<{ introText: string }> = ({ introText }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { readText } = useTextToSpeech();

  const { messages, done } = useTypewriter([
    introText,
    "Jetzt gehts in die Ausstellung!",
  ]);

  const { setUpScanner } = useScanner();
  const router = useRouter();
  return (
    <div>
      <p className="font-bold text-heading text-teal">
        Paul Klee Rundgang mit LiLi
      </p>

      <div className="w-full h-1 my-12 bg-teal"></div>
      {messages.map((message, i) => (
        <p className="mt-4" key={i}>
          {message}
        </p>
      ))}
      {done && (
        <div className="mt-4">
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
