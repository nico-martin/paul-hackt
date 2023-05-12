import { NextApiRequest, NextApiResponse } from 'next';
import textToSpeech from '../../common/speech';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const text = req.body as string;
  const stream = await textToSpeech(text);

  https: return res
    .setHeader('Content-Type', 'audio/mpeg')
    .status(200)
    .send(stream);
}
