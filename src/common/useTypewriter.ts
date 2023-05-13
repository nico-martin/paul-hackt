import React from 'react';

const defaultSpeed = 20;

const useTypewriter = (
  messages: Array<string>,
  speed: number = null
): { messages: Array<string>; done: boolean } => {
  const [newMessages, setNewMessages] = React.useState<Array<string>>(
    new Array(messages.length).fill('')
  );
  const [done, setDone] = React.useState<boolean>(false);


  React.useEffect(() => {

    const i = window.setInterval(
      () =>
        setNewMessages((currentNewMessages) => {
          const lineToProcess = currentNewMessages.findIndex((message, i) => {
            return message.length !== messages[i].length;
          });

          if (lineToProcess === -1) {
            clearInterval(i);
            return currentNewMessages;
          }

          const carToAdd = messages[lineToProcess].slice(
            currentNewMessages[lineToProcess].length
          )[0];

          currentNewMessages[lineToProcess] =
            currentNewMessages[lineToProcess] + carToAdd;

          return [...currentNewMessages];
        }),
      speed || defaultSpeed
    );

    return () => {
      try {
        clearInterval(i);
      } catch (e) {}
    };
  }, []);

  React.useEffect(() => {
    if (JSON.stringify(newMessages) === JSON.stringify(messages)) {
      setDone(true);
    }
  }, [newMessages, messages]);

  return { messages: newMessages, done };
};

export default useTypewriter;
