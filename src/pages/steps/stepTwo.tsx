import React from 'react';
import { usePerson } from '@/store/PersonContext';

const StepTwo = () => {
  const [person, setPerson] = usePerson();

  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    setPerson({
      ...person,
      isGrownUp: checked,
    });
  };

  return (
    <div>
      <p>Are you a grown-up?</p>
      <label className="switch">
        <input
          type="checkbox"
          checked={person.isGrownUp || false}
          onChange={handleCheckboxChange}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default StepTwo;
