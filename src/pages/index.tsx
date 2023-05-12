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
  const [introText, setIntroText] = useState<string>("");

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const setName = (name: string) => {
    setPerson({ name });
    setLoading(true);
    fetch(`/api/greetings?name=${name}`).then(async (response) => {
      const json = await response.json();
      setGreetingsText(json.message);
      setLoading(false);
      handleNextStep();
    });
  };

  const setIsChild = (isChild: boolean) => {
    setPerson({ isChild });
    setLoading(true);
    fetch(
      `/api/introduction?name=${person.name}&isChild=${
        isChild ? "true" : "false"
      }`
    ).then(async (response) => {
      const json = await response.json();
      setIntroText(json.message);
      setLoading(false);
      handleNextStep();
    });
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
    <div className="max-w-2xl mx-auto main bg-olive p-7">
      <img src="logo.svg" className={styles.logo} />
      {currentStep === 1 && <StepOne setName={setName} loading={loading} />}
      {currentStep === 2 && (
        <StepTwo
          greetingsText={greetingsText}
          setIsChild={setIsChild}
          loading={loading}
        />
      )}
      {currentStep === 3 && <StepThree />}
    </div>
  );
};

export default Home;
