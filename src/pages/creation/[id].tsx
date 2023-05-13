import type { NextPage } from "next";
import Typewriter from "@/components/Typewriter";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePerson } from "@/store/PersonContext";
import styles from "./id.module.css";
import { Button, CloseButton, Divider, Icon } from "@theme";
import useAudio from "@common/useAudio";

const Home: NextPage = () => {
  const router = useRouter();
  const [person, _] = usePerson();
  const [workInformation, setWorkInformation] = useState<{
    message: string;
    question: { text: string; options: Array<{ value: string; text: string }> };
    metadata: { name: string; date: number; image: string; text: string };
  }>();
  const [questionValue, setQuestionValue] = useState<string>();
  const [questionAnswer, setQuestionAnswer] = useState<{
    additionalText: string;
    message: string;
  }>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!router.query.id) {
      return;
    }
    fetch(
      `/api/work?name=${person.name}&isChild=${person.isChild}&id=${router.query.id}`
    ).then(async (response) => {
      const json = await response.json();
      setWorkInformation(json);
    });
  }, [router.query.id]);

  useEffect(() => {
    if (!questionValue) {
      return;
    }
    setLoading(true);
    fetch(
      `/api/work?name=${person.name}&isChild=${person.isChild}&id=${router.query.id}&questionValue=${questionValue}`
    ).then(async (response) => {
      const json = await response.json();
      setQuestionAnswer(json);
      setLoading(false);
    });
  }, [questionValue]);

  const audio = useAudio(workInformation?.message || "");
  const audioTwo = useAudio(
    (questionAnswer?.additionalText || "") +
      " " +
      (questionAnswer?.message || "")
  );

  useEffect(() => {
    questionAnswer && audioTwo.play();
  }, [questionAnswer]);

  useEffect(() => {
    workInformation?.message && audio.play();
  }, [workInformation?.message]);

  const heading = () => (
    <div className={styles.heading + " px-10 pt-7 text-heading"}>
      <CloseButton
        onClick={() => router.push("/scanning")}
        className={styles.close}
      />
      <span>{workInformation.metadata.name}</span>
      <span>{workInformation.metadata.text}</span>
      <span>{workInformation.metadata.date}</span>
    </div>
  );

  if (!questionAnswer) {
    return (
      workInformation && (
        <div className="h-screen max-w-2xl mx-auto main bg-olive text-[#004E5F] relative">
          {heading()}
          {audio.element}
          <div className="bg-[#004E5F] px-10 py-16 is--dark relative">
            <div className="w-[60px] h-[60px] absolute right-[40px] top-[-30px]">
              <img
                className="rounded-full aspect-square"
                src={workInformation.metadata.image}
              />
            </div>
            {workInformation && workInformation.message && (
              <Typewriter messages={[workInformation.message]} />
            )}
          </div>

          <div className="relative">
            <img src="/logo.svg" className={styles.logo} />
          </div>

          <div className="py-7 px-10 mt-[60px] text-heading">
            {workInformation && workInformation.question && (
              <div>{workInformation.question.text}</div>
            )}
          </div>

          {workInformation && (
            <div className={styles.buttons + " py-7 px-10 bg-olive"}>
              <Button
                className={styles.button}
                onClick={() => {
                  setQuestionValue(workInformation.question.options[0].value);
                }}
                disabled={loading}
                loading={loading}
              >
                {workInformation.question.options[0].text}
              </Button>
              <Button
                className={styles.button}
                onClick={() => {
                  setQuestionValue(workInformation.question.options[1].value);
                }}
                disabled={loading}
                loading={loading}
              >
                {workInformation.question.options[1].text}
              </Button>
            </div>
          )}
        </div>
      )
    );
  } else {
    return (
      <div className="h-screen max-w-2xl mx-auto main bg-olive text-[#004E5F]">
        {heading()}
        {audioTwo.element}
        <div className="px-10 py-7">
          <div className="bg-[#004E5F] px-10 py-16 is--dark relative">
            <div className="w-[60px] h-[60px] absolute right-[40px] top-[-30px]">
              <img
                className="rounded-full aspect-square"
                src={workInformation.metadata.image}
              />
            </div>
            {questionAnswer && (
              <Typewriter
                messages={[
                  questionAnswer.additionalText,
                  questionAnswer.message,
                ]}
              />
            )}
          </div>

          <div className="relative">
            <img src="/logo.svg" className={styles.logo} />
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
