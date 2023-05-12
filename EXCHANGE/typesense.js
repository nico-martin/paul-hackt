import Typesense from "typesense";
import { getVector } from "./getVector.js";

const { TYPESENSE_ADMIN_KEY, OPENAI_API_KEY, SBERT_API_KEY, TYPESENSE_URL } =
  process.env;

let typesense = new Typesense.Client({
  nodes: [
    {
      host: TYPESENSE_URL || "typesense.signalwerk.ch",
      port: "443",
      protocol: "https",
    },
  ],
  apiKey: TYPESENSE_ADMIN_KEY,
  connectionTimeoutSeconds: 20,
});

const data = [
  { id: "1", title: "Banana", text: "Banana" },
  { id: "2", title: "Bonobo", text: "Bonobo" },
  { id: "3", title: "Chimpanzee", text: "Chimpanzee" },
  { id: "4", title: "Gorilla", text: "Gorilla" },
  { id: "5", title: "Monkey", text: "Monkey" },
  { id: "6", title: "Watermelon", text: "Watermelon" },
];

async function populateIndex({ indexName, API_URL, API_KEY, API_MODEL }) {
  const documents = [];

  const promises = data.map(async (item) => {
    const vector = await getVector({
      API_URL,
      API_KEY,
      API_MODEL,
      text: item.text,
    });
    return vector;
  });

  const vectors = await Promise.all(promises);

  data.forEach((item, index) => {
    documents.push({ ...item, vector: vectors[index] });
  });

  let results = await typesense
    .collections(indexName)
    .documents()
    .import(documents);
  console.log(results);
}

// OpenAI Embeddings API
populateIndex({
  indexName: "test",
  API_KEY: OPENAI_API_KEY,
});
