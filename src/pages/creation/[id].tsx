import type { NextPage } from 'next';
import Typewriter from '@/components/Typewriter';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { usePerson } from '@/store/PersonContext';
import styles from './id.module.css';
import { Button } from '@theme';

const Home: NextPage = () => {
  const router = useRouter();
  const [person, _] = usePerson();
  const [workInformation, setWorkInformation] = useState<{
    message: string;
    question: { text: string; options: Array<{ value: string; text: string }> };
    metadata: { name: string; date: number; image: string; text: string }
  }>();
  const [questionValue, setQuestionValue] = useState<string>();
  const [questionAnswer, setQuestionAnswer] = useState<{
    additionalText: string;
    message: string;
  }>();
  const [loading, setLoading] = useState(false);
  const [typewriterDone, setTypewriterDone] = useState(false);

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

  if (!questionAnswer) {
    return workInformation && (
      <div className="h-screen max-w-2xl mx-auto main bg-olive text-[#004E5F] relative">
        <div className={styles.heading + ' px-10 pt-7 text-heading'}>
          <span>{workInformation.metadata.name}</span>
          <span>{workInformation.metadata.text}</span>
          <span>{workInformation.metadata.date}</span>
        </div>

        <div className="bg-[#004E5F] px-10 py-16 is--dark relative">
          <div className="w-[60px] h-[60px] absolute right-[40px] top-[-30px]">
            <img className="rounded-full aspect-square" src={workInformation.metadata.image} />
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
            <div>
              {workInformation.question.text}
            </div>
          )}
        </div>

        {workInformation && (
          <div className={styles.buttons + ' py-7 px-10 bg-olive'}>
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
    );
  } else {
    return (
      <div className="h-screen max-w-2xl mx-auto main bg-olive p-7 text-[#004E5F]">
        <div className={styles.heading}>{router.query.id}</div>
        <hr className={styles.spacer} />
        {questionAnswer && questionAnswer.additionalText && (
          <Typewriter messages={[questionAnswer.additionalText]} />
        )}

        {questionAnswer && questionAnswer.message && (
          <Typewriter messages={[questionAnswer.message]} />
        )}
      </div>
    );
  }
};

export default Home;
