import type { NextPage } from "next";
import { Card } from "@theme";
import { usePerson } from "@/store/PersonContext";

const Scanning: NextPage = () => {
  const [person, setPerson] = usePerson();
  return (
    <div>
      {person.name} / {person.age}{" "}
      <button onClick={() => setPerson({ age: 10 })}>change age</button>
    </div>
  );
};

export default Scanning;
