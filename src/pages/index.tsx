import React, { useState } from "react";
import { usePerson } from "@/store/PersonContext";
import StepOne from "@/pages/steps/stepOne";
import StepTwo from "@/pages/steps/stepTwo";
import StepThree from "./steps/stepThree";
import { Card } from "@/theme";
import cardStyles from "@/theme/misc/card.module.css";
import buttonStyles from "@/theme/button/Button.module.css";

const Home = () => {
  const [person, setPerson] = usePerson();
  const [currentStep, setCurrentStep] = useState(1);

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
      <Card className={cardStyles.cardOlive +" "+ "mt-10"}>
        <div className="mb-8">
          {currentStep === 1 && <StepOne />}
          {currentStep === 2 && <StepTwo />}
          {currentStep === 3 && <StepThree />}
        </div>
        <button className={buttonStyles.button} onClick={handleNextStep}>Next Step</button>
      </Card>
    </div>
  );
};

export default Home;
