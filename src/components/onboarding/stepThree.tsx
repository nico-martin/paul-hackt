import React, { useEffect, useState } from "react";
import { usePerson } from "@/store/PersonContext";
import useTypewriter from "@common/useTypewriter";
import { Button } from "@theme";
import { useScanner } from "@/store/ScannerContext";
import { useRouter } from "next/router";
import useAudio from "@common/useAudio";
import cn from "@common/classnames";
import Typewriter from "@/components/Typewriter";

const StepThree: React.FC<{ introText: string }> = ({ introText }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [done, setDone] = React.useState<boolean>(false);

  const texts = [introText, "Jetzt gehts in die Ausstellung!"];
  const [, setPerson] = usePerson();
  const audio = useAudio(texts.join(" "));

  const { setUpScanner } = useScanner();

  return (
    <div>
      {audio.element}
      <p className="font-bold text-heading text-teal mb-8">
        Paul Klee Rundgang mit LiLi
      </p>

      <div className="bg-[#004E5F] px-10 py-10 is--dark relative">
        <Typewriter messages={texts} setDone={() => setDone(true)} />
      </div>
      <div className="text-right mt-2">
        <img
          src="/logo.svg"
          className="w-[60px] inline-block mt-[-35px] z-10 relative"
        />
      </div>
      {done && (
        <div className="mt-12">
          <Button
            className="mt-4"
            onClick={async () => {
              setLoading(true);
              await setUpScanner();
              setPerson({ isReady: true });
            }}
            loading={loading}
            full
          >
            LOS!
          </Button>
        </div>
      )}
    </div>
  );
};

export default StepThree;
