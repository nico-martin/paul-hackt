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
        setLogo(counter % 2 === 0 ? "/logo.svg" : "/logo1.svg");
        counter++;
      }, 400);
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
