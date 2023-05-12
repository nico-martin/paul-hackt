import React, { useEffect, useState } from "react";
import { usePerson } from "@/store/PersonContext";

const StepThree = () => {
  const [person, setPerson] = usePerson();
  const [introductionText, setIntroductionText] = useState();

  return (
    <div>
      <div>{introductionText}</div>
    </div>
  );
};

export default StepThree;
