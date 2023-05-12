import React, { useEffect, useState } from 'react';
import { usePerson } from '@/store/PersonContext';

const StepTwo = () => {
  const [person, setPerson] = usePerson();
  const [greetingsText, setGreetingsText] = useState();

  const handleCheckboxChange = (event: any) => {
    const { checked } = event.target;
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
        <label className="switch">
          <input
            type="checkbox"
            checked={person.isGrownUp || false}
            onChange={handleCheckboxChange}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};

export default StepTwo;
