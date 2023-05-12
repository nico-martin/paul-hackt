import type { NextPage } from 'next';
import { Card } from '@theme';
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

  if (!questionAnswer) {
    return (
      <div className="h-screen max-w-2xl mx-auto main bg-olive p-7 text-[#004E5F]">
        <div className={styles.heading}>{router.query.id}</div>
        <hr className={styles.spacer} />
        {workInformation && workInformation.message && (
          <div>{workInformation.message}</div>
        )}

        {workInformation && (
          <div className={styles.question}>{workInformation.question.text}</div>
        )}

        {workInformation && (
          <div className={styles.buttons}>
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
          <div>{questionAnswer.additionalText}</div>
        )}

        {questionAnswer && questionAnswer.message && (
          <div className={styles.question}>{questionAnswer.message}</div>
        )}
      </div>
    );
  }
};

export default Home;
