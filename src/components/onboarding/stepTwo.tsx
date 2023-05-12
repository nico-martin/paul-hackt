import React, { useEffect, useState } from "react";
import { usePerson } from "@/store/PersonContext";
import Toggle from "@/theme/form/InputToggle";
import useTypewriter from "@common/useTypewriter";
import { Button } from "@theme";
import styles from "./StepTwo.module.css";
const StepTwo: React.FC<{
  greetingsText: string;
  setIsChild: (idChild: boolean) => void;
  loading: boolean;
}> = ({ greetingsText, setIsChild, loading }) => {
  const [person, setPerson] = usePerson();

  const { messages, done } = useTypewriter([
    greetingsText,
    "Meine letzte Frage, bevor wir in die Ausstellung gehen. Wer bist du?",
  ]);

  return (
    <div>
      <div className={styles.text}>
        {messages.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>
      {done && (
        <div className={styles.buttons}>
          <Button
            className={styles.button}
            onClick={() => setIsChild(true)}
            disabled={loading}
            loading={loading && person.isChild}
          >
            Ich bin ein Kind
          </Button>
          <Button
            className={styles.button}
            onClick={() => setIsChild(false)}
            disabled={loading}
            loading={loading && !person.isChild}
          >
            Ich bin Erwachsen
          </Button>
        </div>
      )}
    </div>
  );
};

export default StepTwo;
