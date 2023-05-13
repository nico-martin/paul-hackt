import React from "react";
import useTypewriter from "@common/useTypewriter";

const Typewriter: React.FC<{
  messages: Array<string>;
  setDone?: (done: boolean) => void;
  speed?: number;
}> = ({ messages: orgMessages, setDone = () => {}, speed = null }) => {
  const { messages, done } = useTypewriter(orgMessages, speed);

  React.useEffect(() => {
    setDone(done);
  }, [done]);

  return (
    <React.Fragment>
      {messages.map((m, i) => (
        <p key={i}>{m}</p>
      ))}
    </React.Fragment>
  );
};

export default Typewriter;
