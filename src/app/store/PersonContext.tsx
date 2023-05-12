"use client";

import React from "react";

enum MOOD {
  CASUAL = "casual",
  PROFESSIONAL = "professional",
}

interface Person {
  name: string;
  age: number;
  visited: Array<number>;
  mood: MOOD;
}

const defaultValues: Person = {
  name: "Nico",
  age: null,
  visited: [],
  mood: null,
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
  setState: React.Dispatch<React.SetStateAction<Person>>
] => {
  const { person, setPerson } = React.useContext<ContextInterface>(Context);
  return [person, setPerson];
};
