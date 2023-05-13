import React, { useEffect, useState } from "react";
import { usePerson } from "@/store/PersonContext";
import Toggle from "@/theme/form/InputToggle";
import useTypewriter from "@common/useTypewriter";
import { Button } from "@theme";
import styles from "./StepTwo.module.css";
import useAudio from "@common/useAudio";
const StepTwo: React.FC<{
  greetingsText: string;
  setIsChild: (idChild: boolean) => void;
  loading: boolean;
}> = ({ greetingsText, setIsChild, loading }) => {
  const [person, setPerson] = usePerson();

  const texts = [
    greetingsText,
    "Meine letzte Frage, bevor wir in die Ausstellung gehen. Wer bist du?",
  ];

  const { messages, done } = useTypewriter(texts);
  const audio = useAudio(texts.join(" "), true);

  return (
    <div>
      {audio.element}
      <p className="font-bold text-heading text-teal">
        Paul Klee Rundgang mit LiLi
      </p>

      <div className="w-full h-1 my-12 bg-teal"></div>
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
