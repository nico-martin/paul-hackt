import React, { useState } from "react";
import { Button, Divider, Icon } from "@theme";
import { usePerson } from "@/store/PersonContext";
import styles from "./StepZero.module.css";

const StepZero: React.FC<{
  setLanguage: () => void;
}> = ({ setLanguage }) => {
  const [, setPerson] = usePerson();

  const waitASecondAndThenSwitch = (lang: string) => {
    setPerson({ lang });
    setLanguage();
  };

  // we either have the liist of language buttons or we have the hello screen
  return (
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
