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
    languageIsSet ?
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
    </div>

  );
};

export default StepOne;
