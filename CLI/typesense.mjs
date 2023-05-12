import Typesense from "typesense";
import { getVector } from "./getVector.mjs";
import * as dotenv from "dotenv";
import { data } from "./data.mjs";

dotenv.config();

const { TYPESENSE_ADMIN_KEY, OPENAI_API_KEY, TYPESENSE_URL } = process.env;

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

const args = process.argv.slice(2);

let importFlag = false;

args.forEach((val, index) => {
  switch (val) {
    case "--import":
      // OpenAI Embeddings API
      populateIndex({
        indexName: "paulhackt",
        API_KEY: OPENAI_API_KEY,
      });
      break;
    case "--purge":
      let results = typesense
        .collections("companies")
        .documents()
        .delete({ filter_by: "id:=1" })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.error(error));

      break;
    // Include other cases here
    default:
      console.log(`Sorry, I don't know what ${val} means.`);
  }
});
