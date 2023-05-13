import React from 'react';
import { Loader } from '@theme';

const LoadingScreen: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-gray-700 bg-opacity-30">
      <Loader size="large" />
    </div>
  );
};
export default LoadingScreen;
