import React, { useEffect, useState } from "react";
import { usePerson } from "@/store/PersonContext";
import Toggle from "@/theme/form/InputToggle";
import useTypewriter from "@common/useTypewriter";
import { Button } from "@theme";

const StepTwo: React.FC<{
  greetingsText: string;
  setIsChild: (idChild: boolean) => void;
}> = ({ greetingsText, setIsChild }) => {
  const [person, setPerson] = usePerson();
  console.log(greetingsText);
  const {
    messages: [text],
    done,
  } = useTypewriter([greetingsText]);

  return (
    <div>
      <div>{text}</div>
      <br />
      {done && (
        <div>
          <p>
            Meine letzte Frage, bevor wir in die Ausstellung gehen. Wer bist du?
          </p>
          <Button onClick={() => setIsChild(true)}>Ich bin ein Kind</Button>
          <Button onClick={() => setIsChild(false)}>Ich bin Erwachsen</Button>
        </div>
      )}
    </div>
  );
};

export default StepTwo;
