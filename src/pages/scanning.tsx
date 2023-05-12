import type { NextPage } from "next";
import { Card } from "@theme";
import { usePerson } from "@/store/PersonContext";

const Scanning: NextPage = () => {
  const [person] = usePerson();

  return (
    <Card>
      <p>Scanning {person.name}</p>
    </Card>
  );
};

export default Scanning;
