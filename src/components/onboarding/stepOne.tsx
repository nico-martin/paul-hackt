import React from "react";
import useTypewriter from "@common/useTypewriter";
import { Button, Divider } from "@theme";
import useAudio from "@common/useAudio";
import cn from "@common/classnames";
import Typewriter from "@/components/Typewriter";
import styles from "./StepOne.module.css";
import Logo from "@/components/Logo";
//const messages = ["Hallo, ich bin Lilly.", "Verrätst du mir deinen Namen?"];

const messagesOne = ["Hallo,", "ich bin LiLi!"];
const messagesTwo = ["...und du?"];

const StepOne: React.FC<{
  setName: (name: string) => void;
  loading: boolean;
}> = ({ setName: passName, loading }) => {
  const [name, setName] = React.useState<string>("");
  const [introDone, setIntroDone] = React.useState<boolean>(false);
  const [secondDone, setSecondDone] = React.useState<boolean>(false);

  const audio = useAudio([...messagesOne, ...messagesTwo].join(" "), true);

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
      <div className={cn("mb-10", styles.text)}>
        <Typewriter
          messages={messagesOne}
          setDone={() => setIntroDone(true)}
          speed={50}
        />
        <Logo className={cn(styles.logo)} />
        {introDone && (
          <Typewriter
            messages={messagesTwo}
            setDone={() => setSecondDone(true)}
            speed={50}
          />
        )}
      </div>
      {secondDone && (
        <React.Fragment>
          <label className="relative mb-4">
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              className="w-full p-4 px-2 mb-6 text-2xl font-bold border border-gray-300 rounded-md text-heading text-teal"
            />
          </label>{" "}
          <Button full onClick={() => passName(name)} loading={loading}>
            Weiter
          </Button>
        </React.Fragment>
      )}
    </div>
  );
};

export default StepOne;
