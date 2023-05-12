import React from "react";
import { usePerson } from "@/store/PersonContext";
import useTypewriter from "@common/useTypewriter";
import buttonStyles from "@/theme/button/Button.module.css";

const StepOne: React.FC<{ setName: (name: string) => void }> = ({
  setName: passName,
}) => {
  const [name, setName] = React.useState<string>("");
  const intros = useTypewriter([
    "Hallo, ich bin Lilly",
    "Verrätst du mir deinen Namen?",
  ]);

  const handleInputChange = (event: any) => {
    const { value } = event.target;
    setName(value);
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
            value=""
            onChange={handleInputChange}
            className="px-2 py-1 mt-1 border border-gray-300 rounded-md"
          />
        </label>
      )}
      <button className={buttonStyles.button} onClick={() => passName(name)}>Next Step</button>
    </div>
  );
};

export default StepOne;
