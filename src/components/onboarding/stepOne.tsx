import React from "react";
import useTypewriter from "@common/useTypewriter";
import { Button, Divider } from "@theme";
import useAudio from "@common/useAudio";
import styles from "@/components/onboarding/StepZero.module.css";
import cn from "@common/classnames";

const messages = ["Hallo, ich bin Lilly.", "Verrätst du mir deinen Namen?"];

const StepOne: React.FC<{
  setName: (name: string) => void;
  loading: boolean;
}> = ({ setName: passName, loading }) => {
  const [name, setName] = React.useState<string>("");
  const intros = useTypewriter(messages);

  const audio = useAudio(messages.join(" "), true);

  const handleInputChange = (event: any) => {
    const { value } = event.target;
    setName(value);
  };

  return (
    <div>
      {audio.element}
      <p className="font-bold text-heading text-teal">
        Paul Klee Rundgang mit LiLi
      </p>

      <Divider className="!my-12" />
      <div className="mb-10">
        {intros.messages.map((e, i) => (
          <p className="mb-2 text-lg font-bold text-heading text-teal" key={i}>
            {e}
          </p>
        ))}
      </div>
      {intros.done && (
        <React.Fragment>
          <label className="mb-4  relative">
            <img
              src="/logo.svg"
              className={cn("absolute w-[60px] right-0 top-[-55px]")}
            />
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              className="w-full p-4 px-2  mb-6 border border-gray-300 rounded-md text-heading text-teal font-bold text-2xl"
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
