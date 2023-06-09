import React, { useState } from "react";
import { usePerson } from "@/store/PersonContext";
import StepZero from "@/components/onboarding/stepZero";
import StepOne from "@/components/onboarding/stepOne";
import StepTwo from "@/components/onboarding/stepTwo";
import StepThree from "../components/onboarding/stepThree";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import LoadingScreen from "@/components/LoadingScreen";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [person, setPerson] = usePerson();
  const [currentStep, setCurrentStep] = useState(0);
  const [introText, setIntroText] = useState<string>("");
  const router = useRouter();
  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  React.useEffect(() => {
    console.log("person.isReady", person.isReady);
    if (person.isReady) {
      router.push("scanning");
    }
  }, [person.isReady]);

  const setName = (name: string) => {
    setPerson({ name });
    handleNextStep();
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
    <div className="h-screen max-w-2xl mx-auto main bg-olive p-7 overflow-x-hidden">
      <img src="logo.svg" className={styles.logo + " " + "hidden"} />
      {currentStep === 0 && <StepZero setLanguage={handleNextStep} />}
      {currentStep === 1 && <StepOne setName={setName} loading={loading} />}
      {currentStep === 2 && (
        <StepTwo setIsChild={setIsChild} loading={loading} />
      )}
      {currentStep === 3 && <StepThree introText={introText} />}
    </div>
  );
};

export default Home;
