import React from "react";
import { clearInterval } from "timers";
import message from "@/theme/message/Message";

const useTypewriter = (
  messages: Array<string>,
  speed: number = 50
): { messages: Array<string>; done: boolean } => {
  const [newMessages, setNewMessages] = React.useState<Array<string>>(
    new Array(messages.length).fill("")
  );
  const [done, setDone] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (JSON.stringify(newMessages) !== JSON.stringify(messages)) {
      const i = window.setInterval(
        () =>
          setNewMessages((currentNewMessages) => {
            const lineToProcess = currentNewMessages.findIndex((message, i) => {
              return message.length !== messages[i].length;
            });

            if (lineToProcess === -1) {
              setDone(true);
              return currentNewMessages;
            }

            const carToAdd = messages[lineToProcess].slice(
              currentNewMessages[lineToProcess].length
            )[0];

            currentNewMessages[lineToProcess] =
              currentNewMessages[lineToProcess] + carToAdd;

            return currentNewMessages.map((n) => n);
          }),
        speed
      );

      return () => {
        try {
          i && clearInterval(i);
        } catch (e) {}
      };
    }
  }, []);

  return { messages: newMessages, done };
};

export default useTypewriter;
