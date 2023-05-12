import React from "react";

interface TextToSpeech {
  readText: (text: string) => void;
}

const defaultValues: TextToSpeech = {
  readText: () => {},
};

const Context = React.createContext<TextToSpeech>(defaultValues);

export const Provider = ({ children }: { children: any }) => {
  const [synth, setSynth] = React.useState<SpeechSynthesis>(null);
  const [voices, setVoices] = React.useState<Array<SpeechSynthesisVoice>>([]);

  const getSelectedVoice = (): SpeechSynthesisVoice => {
    return voices.filter((v) => v.lang === "de-CH")[0];
  };

  const readText = (text: string): void => {
    if (!synth) {
      return;
    }

    synth.cancel();

    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.voice = getSelectedVoice();

    synth.speak(msg);
  };

  React.useEffect(() => {
    setSynth(window.speechSynthesis);
    setVoices(window.speechSynthesis.getVoices());
  }, []);

  return <Context.Provider value={{ readText }}>{children}</Context.Provider>;
};

export const useTextToSpeech = (): TextToSpeech => React.useContext(Context);
