import React from "react";
import useTypewriter from "@common/useTypewriter";
import { Button } from "@theme";

const StepOne: React.FC<{
  setName: (name: string) => void;
  loading: boolean;
}> = ({ setName: passName, loading }) => {
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
        <React.Fragment>
          <label className="mb-4">
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              className="w-full p-4 px-2 mt-1 mb-6 border border-gray-300 rounded-md"
            />
          </label>{" "}
        </React.Fragment>
      )}
      <Button full onClick={() => passName(name)} loading={loading}>
        Next Step
      </Button>
    </div>
  );
};

export default StepOne;
