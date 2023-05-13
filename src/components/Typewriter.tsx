import React, { useRef, useState } from 'react';
import useTypewriter from '@common/useTypewriter';

const Typewriter: React.FC<{
  messages: Array<string>;
  setDone?: (done: boolean) => void;
  speed?: number;
}> = ({ messages: orgMessages, setDone = () => {}, speed = null }) => {
  const { messages, done } = useTypewriter(orgMessages, speed);
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<HTMLDivElement>();
  const [height, setHeight] = useState(0);

  React.useEffect(() => {
    if (isMounted) {
      setDone(done);
    } else {
      setIsMounted(true);
    }
  }, [done]);

  React.useLayoutEffect(() => {
    if (ref.current && ref.current.clientHeight > 0) {
      console.log(ref.current.clientHeight, ref.current.offsetHeight, ref.current.scrollHeight)
      setHeight(ref.current.clientHeight);
    }
  });

  return (
    <React.Fragment>
      {height === 0 && (
        <div ref={ref} className="invisible">
          {orgMessages.map((m, i) => (
            <p key={i}>{m}</p>
          ))}
        </div>
      )}
      <div style={{ height: height + 'px' }}>
        {messages.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Typewriter;
