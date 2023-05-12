import React, { useState } from "react";
import { usePerson } from "@/store/PersonContext";
import StepOne from "@/pages/steps/stepOne";
import StepTwo from "@/pages/steps/stepTwo";
import StepThree from "./steps/stepThree";

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
      handleNextStep()
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {currentStep === 1 && <StepOne />}
      {currentStep === 2 && <StepTwo />}
      {currentStep === 3 && <StepThree />}
      <button onClick={handleNextStep}>Next Step</button>
    </div>
  );
};

export default Home;
