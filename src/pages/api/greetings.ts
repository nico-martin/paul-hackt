import { NextApiRequest, NextApiResponse } from 'next';
import prompt from '../../openai';

const promptText =
  'Gib mir ein Willkommenstext für einen Audioguide für das Museum «Zentrum Paul Klee». Der Willkommenstext ist für {name}. Beschränke dich auf 2 Sätze. Der Text wird vom Audioguide «Lily» gesprochen. Sprich als «Lily». Beginne die Antwort mit «Herzlich willkommen, {name}, im Zentrum Paul Klee! Ich bin Lily, ...»';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const name = req.query['name'] as string;
  const output = await prompt(
    promptText.replaceAll('{name}', name),
    { name: name },
    false
  );

  return res.status(200).json({ message: output });
}
