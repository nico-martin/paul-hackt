import { NextApiRequest, NextApiResponse } from "next";
import textToSpeech from "../../common/speech";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const audioText = req.body as string;
  const lang = req.query["lang"] as string;
  const voices: Record<string, string> = {
    ch: "de-CH-LeniNeural",
    de: "de-DE-ElkeNeural",
  };

  const voice: string = lang in voices ? voices[lang] : voices.de;
  const stream = await textToSpeech(audioText, voice);
  const base64 = stream.toString("base64");

  return res.status(200).json({
    audio: `data:audio/mpeg;base64,${base64}`,
  });
}
