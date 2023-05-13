import React, { useEffect, useState } from "react";
import { usePerson } from "@/store/PersonContext";
import Toggle from "@/theme/form/InputToggle";
import useTypewriter from "@common/useTypewriter";
import { Button } from "@theme";
import styles from "./StepTwo.module.css";
import useAudio from "@common/useAudio";
import cn from "@common/classnames";
const StepTwo: React.FC<{
  setIsChild: (idChild: boolean) => void;
  loading: boolean;
}> = ({ setIsChild, loading }) => {
  const [person, setPerson] = usePerson();

  const texts = ["Bist du erwachsen?"];

  const { messages, done } = useTypewriter(texts, 50);
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
      <img src="/logo.svg" className={cn(styles.logo)} />
      {done && (
        <div className={styles.buttons}>
          <Button
            className={styles.button}
            onClick={() => setIsChild(true)}
            disabled={loading}
            loading={loading && person.isChild}
            full
            big
          >
            Jep
          </Button>
          <Button
            className={cn(styles.button)}
            full
            onClick={() => setIsChild(false)}
            disabled={loading}
            loading={loading && !person.isChild}
          >
            Nope
          </Button>
        </div>
      )}
    </div>
  );
};

export default StepTwo;
