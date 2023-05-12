import React, { useState } from "react";
import { usePerson } from "@/store/PersonContext";
import StepOne from "@/pages/steps/stepOne";
import StepTwo from "@/pages/steps/stepTwo";
import StepThree from "./steps/stepThree";
import styles from "./index.module.css";
import cn from "@common/classnames";
import { Card } from "@/theme";
import cardStyles from "@/theme/misc/card.module.css";
import buttonStyles from "@/theme/button/Button.module.css";

const Home = () => {
  const [person, setPerson] = usePerson();
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = React.useState<string>();

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = () => {
    // Perform any validation or API calls here
    if (currentStep === 1) {
      handleNextStep();
    } else if (currentStep === 2) {
      handleNextStep();
    }
  };

  return (
    <div className="main">
      <img src="logo.svg" className={styles.logo} />
      {currentStep === 1 && <StepOne setName={(name) => {}} />}
      {currentStep === 2 && <StepTwo />}
      {currentStep === 3 && <StepThree />}
    </div>
  );
};

export default Home;
