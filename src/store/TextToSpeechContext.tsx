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
    return voices[0];
    /*
    const option = voiceSelect.selectedOptions[0];
    return voices.find(
      (voice) =>
        voice.name === option.dataset.name && voice.lang === option.dataset.lang
    );*/
  };

  const readText = (text: string): void => {
    if (!synth) {
      return;
    }

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
