import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt:
        'Du bist ein Paul Klee Experte. Erzähl mir mehr über das Werk Burg und Sonne.',
      max_tokens: 500,
    });
    console.log(response.data.choices);
  } catch (e) {
    console.log(e.response.data);
  }
  res.status(200).json({});
}
