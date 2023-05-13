import React, { useEffect, useState } from "react";
import { usePerson } from "@/store/PersonContext";
import cn from "@common/classnames";

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  const [person] = usePerson();
  const [logo, setLogo] = useState("/logo.svg");

  useEffect(() => {
    let logoInterval: NodeJS.Timeout;
    if (person.isTalking) {
      let counter = 0;
      logoInterval = setInterval(() => {
        switch (counter % 3) {
          case 0:
            setLogo("/logo.svg");
            break;
          case 1:
            setLogo("/logo1.svg");
            break;
          case 2:
            setLogo("/logo2.svg");
            break;
          default:
            setLogo("/logo.svg");
            break;
        }
        counter++;
      }, 300);
    } else {
      setLogo("/logo.svg");
    }

    return () => {
      clearInterval(logoInterval);
    };
  }, [person.isTalking]);

  return <img src={logo} className={cn(className)} alt="Logo" />;
};

export default Logo;
