import React from "react";
import { Loader } from "@theme";
import styles from "./LoadingScreen.module.css";

const LoadingScreen: React.FC<{ text?: string }> = ({ text = "" }) => {
  return (
    <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-screen h-screen">
      <Loader size="large" className="text-[#004E5F]" />
      {Boolean(text) && <p className={styles.text}>{text}</p>}
    </div>
  );
};
export default LoadingScreen;
