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
        </div>
      )}
    </div>
  );
};

export default StepTwo;
