import React from "react";
import { usePerson } from "@/store/PersonContext";

const useAudio = (
  msg: string,
  autoplay: boolean = false
): { play: () => Promise<boolean>; loading: boolean; element: JSX.Element } => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [audio, setAudio] = React.useState<string>(null);
  const ref = React.useRef<HTMLAudioElement>(null);
  const [person] = usePerson();

  const play = () =>
    new Promise<boolean>((resolve) => {
      setLoading(true);
      fetch(`/api/speech?lang=${person.lang}`, {
        method: "POST",
        body: msg,
      }).then(async (response) => {
        const json = await response.json();
        setLoading(true);
        setAudio(json.audio);
        resolve(true);
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

  const element = audio ? (
    <audio hidden autoPlay={true} ref={ref}>
      <source src={audio} />
    </audio>
  ) : null;

  return { play, loading, element };
};

export default useAudio;
