import React from "react";
import { Loader } from "@theme";

const LoadingScreen: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen">
      <Loader size="large" className="text-[#004E5F]" />
    </div>
  );
};
export default LoadingScreen;
