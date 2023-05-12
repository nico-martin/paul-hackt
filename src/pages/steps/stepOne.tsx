import React from "react";
import { usePerson } from "@/store/PersonContext";
import useTypewriter from "@common/useTypewriter";

const StepOne = () => {
  const [person, setPerson] = usePerson();
  const intros = useTypewriter([
    "Hallo, ich bin Lilly",
    "Verrätst du mir deinen Namen?",
  ]);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setPerson({ [name]: value });
  };

  return (
    <div>
      {intros.messages.map((e, i) => (
        <p className="mb-4 text-lg font-bold" key={i}>
          {e}
        </p>
      ))}
      {intros.done && (
        <label className="mb-4">
          <input
            type="text"
            name="name"
            value={person.name || ""}
            onChange={handleInputChange}
            className="px-2 py-1 mt-1 border border-gray-300 rounded-md"
          />
        </label>
      )}
    </div>
  );
};

export default StepOne;
