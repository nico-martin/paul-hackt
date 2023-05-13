import { NextApiRequest, NextApiResponse } from 'next';
import textToSpeech from '../../common/speech';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const audioText = req.body as string;

  const stream = await textToSpeech(audioText);

  const base64 = stream.toString('base64');

  return res.status(200).json({
    audio: `data:audio/mpeg;base64,${base64}`,
  });
}
