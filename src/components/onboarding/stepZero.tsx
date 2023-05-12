import React, { useState } from "react";
import { Button } from "@theme";

const StepOne: React.FC<{
  setLanguage: () => void;
}> = ({ setLanguage }) => {

  const [languageIsSet, setLanguageIsSet] = useState(false);

  const waitASecondAndThenSwitch = () => {
    setLanguageIsSet(true);
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

      {languageIsSet ?
        <p>hello</p>
        :
        <div>
          <Button className="!mb-4" full onClick={() => waitASecondAndThenSwitch()}>
            Deutsch
          </Button>
          <Button className="!mb-4" full onClick={() => waitASecondAndThenSwitch()}>
            English
          </Button>
          <Button className="!mb-4" full onClick={() => waitASecondAndThenSwitch()}>
            Français
          </Button>
          <Button className="!mb-4" full onClick={() => waitASecondAndThenSwitch()}>
            Italiano
          </Button>
          <Button className="!mb-4" full onClick={() => waitASecondAndThenSwitch()}>
            Español
          </Button>
          <Button className="!mb-4" full onClick={() => waitASecondAndThenSwitch()}>
            Türkçe
          </Button>
          <Button className="!mb-4" full onClick={() => waitASecondAndThenSwitch()}>
            Polski
          </Button>
        </div>}
    </div>

  );
};

export default StepOne;
