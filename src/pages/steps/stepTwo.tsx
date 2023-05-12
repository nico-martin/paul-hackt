import React, { useEffect, useState } from "react";
import { usePerson } from "@/store/PersonContext";
import Toggle from "@/theme/form/InputToggle";
import useTypewriter from "@common/useTypewriter";

const StepTwo: React.FC<{ greetingsText: string }> = ({ greetingsText }) => {
  const [person, setPerson] = usePerson();
  console.log(greetingsText);
  const {
    messages: [text],
    done,
  } = useTypewriter([greetingsText]);

  const handleCheckboxChange = (checked: boolean) => {
    setPerson({
      ...person,
      isGrownUp: checked,
    });
  };

  return (
    <div>
      <div>{text}</div>
      <br />
      {done && (
        <div>
          <p>Are you a grown-up?</p>
          <Toggle
            checked={person.isGrownUp || false}
            onChange={handleCheckboxChange}
            label="Toggle"
          />
        </div>
      )}
    </div>
  );
};

export default StepTwo;
