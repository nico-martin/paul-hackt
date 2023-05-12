const sdk = require('microsoft-cognitiveservices-speech-sdk');
const { Buffer } = require('buffer');
const { PassThrough } = require('stream');
const fs = require('fs');

export default async (text) => {
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
      (result) => {
        const { audioData } = result;

        synthesizer.close();

        const bufferStream = new PassThrough();
        bufferStream.end(Buffer.from(audioData));
        resolve(bufferStream);
      },
      (error) => {
        synthesizer.close();
        reject(error);
      }
    );
  });
};
