import React, { useState } from "react";
import { Button } from "@theme";
import { usePerson } from "@/store/PersonContext";

const StepOne: React.FC<{
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
  return (
    <div>
      <p className="font-bold text-heading text-teal">
        Paul Klee Rundgang mit LiLi
      </p>

      <div className="w-full h-1 my-12 bg-teal"></div>

      {languageIsSet ? (
        <p className="text-teal text-heading h2">
          Danke vielmals, auf zur nächsten Frage!
        </p>
      ) : (
        <div>
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
      )}
    </div>
  );
};

export default StepOne;
