import React from 'react';
import { usePerson } from '@/store/PersonContext';
import Toggle from '@/theme/form/InputToggle';


const StepTwo = () => {
  const [person, setPerson] = usePerson();

  const handleCheckboxChange = (checked:boolean) => {
    setPerson({
      ...person,
      isGrownUp: checked,
    });
  };

  return (
    <div>
      <p>Are you a grown-up?</p>
      <Toggle
        checked={person.isGrownUp || false}
        onChange={handleCheckboxChange}
        label="Toggle"
      />
    </div>
  );
};

export default StepTwo;
