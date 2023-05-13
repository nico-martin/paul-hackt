const sdk = require('microsoft-cognitiveservices-speech-sdk');
const { Buffer } = require('buffer');

export default async (text: string): Promise<Buffer> => {
  // convert callback function to promise
  return new Promise((resolve, reject) => {
    const speechConfig = sdk.SpeechConfig.fromSubscription(
      process.env.AZURE_KEY,
      'switzerlandnorth'
    );
    speechConfig.speechSynthesisOutputFormat = 5; // mp3
    speechConfig.speechSynthesisVoiceName = 'de-CH-LeniNeural';

    let audioConfig = null;

    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

    synthesizer.speakTextAsync(
      text,
      (result: any) => {
        const { audioData } = result;

        synthesizer.close();

        resolve(Buffer.from(audioData));
      },
      (error: any) => {
        synthesizer.close();
        reject(error);
      }
    );
  });
};
