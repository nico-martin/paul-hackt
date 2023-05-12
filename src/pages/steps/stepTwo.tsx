import React, { useEffect, useState } from 'react';
import { usePerson } from '@/store/PersonContext';
import Toggle from '@/theme/form/InputToggle';

const StepTwo = () => {
  const [person, setPerson] = usePerson();
  const [greetingsText, setGreetingsText] = useState();

  const handleCheckboxChange = (checked: boolean) => {
    setPerson({
      ...person,
      isGrownUp: checked,
    });
  };

  useEffect(() => {
    fetch(`/api/greetings?name=${person.name}`).then(async (response) => {
      const json = await response.json();
      setGreetingsText(json.message);
    });
  }, []);

  return (
    <div>
      <div>{greetingsText}</div>
      <br />
      <div>
        <p>Are you a grown-up?</p>
        <Toggle
          checked={person.isGrownUp || false}
          onChange={handleCheckboxChange}
          label="Toggle"
        />
      </div>
    </div>
  );
};

export default StepTwo;
