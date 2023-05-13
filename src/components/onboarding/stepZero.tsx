import React, { useState } from "react";
import { Button, Divider, Icon } from "@theme";
import { usePerson } from "@/store/PersonContext";
import styles from "./StepZero.module.css";

const StepZero: React.FC<{
  setLanguage: () => void;
}> = ({ setLanguage }) => {
  const [, setPerson] = usePerson();
  const [languageIsSet, setLanguageIsSet] = useState(false);

  const waitASecondAndThenSwitch = (lang: string) => {
    setLanguageIsSet(true);
    setPerson({ lang });
    setTimeout(() => {
      setLanguage();
    }, 1000);
  };

  // we either have the liist of language buttons or we have the hello screen
  return languageIsSet ? (
    <div>
      <p className="font-bold text-heading text-teal">
        Paul Klee Rundgang mit LiLi
        <br />
        Kennen lernen
      </p>
      <Divider className="mt-8" />
      <h1 className={styles.heading}>Hallo!</h1>
      <img src="/logo.svg" className={styles.logo} />
    </div>
  ) : (
    <div>
      <p className="font-bold text-heading text-teal">
        Paul Klee Rundgang mit LiLi
        <br />
        <Icon icon="translate" className={styles.icon} />
      </p>

      <Divider className="mt-1" />

      <div className="my-6">
        <Button
          className="!mb-4"
          full
          onClick={() => waitASecondAndThenSwitch("ch")}
        >
          Schweizerdeutsch
        </Button>
        <Button
          className="!mb-4"
          full
          onClick={() => waitASecondAndThenSwitch("de")}
        >
          Deutsch
        </Button>
        <Button className="!mb-4" full disabled>
          English
        </Button>
        <Button className="!mb-4" full disabled>
          Français
        </Button>
        <Button className="!mb-4" full disabled>
          Italiano
        </Button>
        <Button className="!mb-4" full disabled>
          Español
        </Button>
        <Button className="!mb-4" full disabled>
          Türkçe
        </Button>
        <Button className="!mb-4" full disabled>
          Polski
        </Button>
      </div>
    </div>
  );
};

export default StepZero;
