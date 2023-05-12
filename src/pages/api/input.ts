import fetch from 'node-fetch';
import { NextApiRequest, NextApiResponse } from 'next';
import Typesense from 'typesense';
import { MultiSearchRequestsSchema } from 'typesense/lib/Typesense/MultiSearch';

const { TYPESENSE_ADMIN_KEY, OPENAI_KEY } = process.env;

let typesense = new Typesense.Client({
  nodes: [
    {
      host: 'typesense.signalwerk.ch',
      port: 443,
      protocol: 'https',
    },
  ],
  apiKey: TYPESENSE_ADMIN_KEY!,
  connectionTimeoutSeconds: 20,
});

const getVector = async (text: string): Promise<number[]> => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify({
      input: text,
      model: 'text-embedding-ada-002',
    }),
  };

  return fetch('https://api.openai.com/v1/embeddings', requestOptions)
    .then((response: any) => response.json())
    .then((data: any) => {
      return data.data[0].embedding;
    })
    .catch((error: any) => console.error(error));
};

const search = async (vectors: number[]) => {
  let searchRequests: any = {
    searches: [
      {
        collection: 'docs',
        q: '*',
        vector_query: `vec:([${vectors.join(', ')}], k:1)`,
      },
    ],
  };
  let commonSearchParams = {};
  const output = await typesense.multiSearch.perform(
    searchRequests as MultiSearchRequestsSchema,
    commonSearchParams
  );
  return output.results;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const textAsVector = await getVector(req.body);
  const results = await search(textAsVector);

  res.status(200).json({ text: (results?.[0].hits?.[0].document as any).text });
}
