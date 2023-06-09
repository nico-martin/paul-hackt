import React from "react";

enum MOOD {
  CASUAL = "casual",
  PROFESSIONAL = "professional",
}

interface Person {
  name: string;
  isChild: boolean;
  visited: Array<number>;
  mood: MOOD;
  lang: string;
  isReady: boolean;
  isTalking: boolean; // Add this
}

const defaultValues: Person = {
  name: "",
  isChild: null,
  visited: [],
  mood: null,
  lang: "",
  isReady: false,
  isTalking: false, // And this
};

interface ContextInterface {
  person: Person;
  setPerson: React.Dispatch<React.SetStateAction<Person>>;
}

const Context = React.createContext<ContextInterface>({
  person: defaultValues,
  setPerson: () => {},
});

export const Provider = ({ children }: { children: any }) => {
  const [person, setPerson] = React.useState<Person>(defaultValues);
  return (
    <Context.Provider value={{ person, setPerson }}>
      {children}
    </Context.Provider>
  );
};

export const usePerson = (): [
  state: Person,
  setState: (person: Partial<Person>) => void
] => {
  const { person, setPerson } = React.useContext<ContextInterface>(Context);

  const set = (person: Partial<Person>) => {
    setPerson((oldPerson) => ({ ...oldPerson, ...person }));
  };

  return [person, set];
};
