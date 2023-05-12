const synth = window.speechSynthesis;
const voices = synth.getVoices();

const getSelectedVoice = (): SpeechSynthesisVoice => {
  return voices[0];
  const option = voiceSelect.selectedOptions[0];
  return voices.find(
    (voice) =>
      voice.name === option.dataset.name && voice.lang === option.dataset.lang
  );
};

export const textToSpeech = (text: string) => {
  const msg = new SpeechSynthesisUtterance();
  msg.text = text;
  msg.voice = getSelectedVoice();

  synth.speak(msg);
};

/*
function setVoices() {
  if (voices.length === 0) {
    alert("Sorry, it seems this browser does not support different voices.");
    voiceSelect.remove();
  }

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += " — DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }
}

function getSelectedVoice() {
  const option = voiceSelect.selectedOptions[0];
  return voices.find(
    (voice) =>
      voice.name === option.dataset.name && voice.lang === option.dataset.lang
  );
}
*/
