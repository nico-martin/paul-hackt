import type { NextPage } from "next";
import { Card } from "@theme";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  console.log(router.query);
  return (
    <Card>
      <p>Home {JSON.stringify(router.query)}</p>
    </Card>
  );
};

export default Home;
