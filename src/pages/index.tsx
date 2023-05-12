import React, { useState } from "react";
import { usePerson } from "@/store/PersonContext";
import StepOne from "@/pages/steps/stepOne";
import StepTwo from "@/pages/steps/stepTwo";
import StepThree from "./steps/stepThree";
import styles from "./index.module.css";
import cn from "@common/classnames";
import { Card } from "@/theme";
import cardStyles from "@/theme/misc/card.module.css";
import { Loader } from "@theme";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [person, setPerson] = usePerson();
  const [currentStep, setCurrentStep] = useState(1);
  const [greetingsText, setGreetingsText] = useState<string>("");

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const setName = (name: string) => {
    setPerson({ name });
    handleNextStep();
    setLoading(true);
    fetch(`/api/greetings?name=${name}`).then(async (response) => {
      const json = await response.json();
      setGreetingsText(json.message);
      setLoading(false);
    });
  };

  const setIsChild = (isChild: boolean) => {};

  const handleSubmit = () => {
    // Perform any validation or API calls here
    if (currentStep === 1) {
      handleNextStep();
    } else if (currentStep === 2) {
      handleNextStep();
    }
  };

  return (
    <div className="main ">
      <img src="logo.svg" className={styles.logo} />
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          {currentStep === 1 && <StepOne setName={setName} />}
          {currentStep === 2 && (
            <StepTwo greetingsText={greetingsText} setIsChild={setIsChild} />
          )}
          {currentStep === 3 && <StepThree />}
        </React.Fragment>
      )}
    </div>
  );
};

export default Home;
