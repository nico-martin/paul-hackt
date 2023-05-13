import React from "react";
import { usePerson } from "@/store/PersonContext";

const useAudio = (
  msg: string,
  autoplay: boolean = false
): { play: () => Promise<boolean>; loading: boolean; element: JSX.Element } => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [audio, setAudio] = React.useState<string>(null);
  const ref = React.useRef<HTMLAudioElement>(null);
  const [person, setPerson] = usePerson();

  const play = () =>
    new Promise<boolean>((resolve) => {
      setLoading(true);
      setPerson({ isTalking: true }); // Start talking when the play starts
      fetch(`/api/speech?lang=${person.lang}`, {
        method: "POST",
        body: msg,
      }).then(async (response) => {
        const json = await response.json();
        setLoading(true);
        setAudio(json.audio);
        resolve(true);
      }).catch((error) => {
        console.error("Audio fetch error: ", error);
        setPerson({ isTalking: false }); // Stop talking when error occurs
        resolve(false);
      });
    });

  React.useEffect(() => {
    autoplay && play();
  }, []);

  React.useEffect(() => {
    if (ref?.current) {
      ref.current.playbackRate = 1.2;
    }
  }, [ref, audio]);

  const handleEnded = () => {
    setPerson({ isTalking: false }); // Stop talking when the play stops
  };

  const element = audio ? (
    <audio hidden autoPlay={true} ref={ref} onEnded={handleEnded} onError={handleEnded}>
      <source src={audio} />
    </audio>
  ) : null;

  return { play, loading, element };
};

export default useAudio;
