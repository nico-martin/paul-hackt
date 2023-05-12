import React from 'react';
import { usePerson } from '@/store/PersonContext';

const StepOne = () => {
  const [person, setPerson] = usePerson();


  return (
    <div>
     more here
    </div>
  );
};

export default StepOne;
