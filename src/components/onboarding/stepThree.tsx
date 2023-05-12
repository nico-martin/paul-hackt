import React, { useEffect, useState } from "react";
import { usePerson } from "@/store/PersonContext";
import useTypewriter from "@common/useTypewriter";
import { Button } from "@theme";

const StepThree: React.FC<{ introText: string }> = ({ introText }) => {
  const [person, setPerson] = usePerson();
  const {
    messages: [text],
    done,
  } = useTypewriter([introText]);

  return (
    <div>
      <p>{text}</p>
      {done && (
        <div className="mt-4">
          <p>Jetzt gehts in die Ausstellung!</p>
          <Button className="mt-4">Starten</Button>
        </div>
      )}
    </div>
  );
};

export default StepThree;
