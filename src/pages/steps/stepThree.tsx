import React, { useEffect, useState } from 'react';
import { usePerson } from '@/store/PersonContext';

const StepThree = () => {
  const [person, setPerson] = usePerson();
  const [introductionText, setIntroductionText] = useState();

  useEffect(() => {
    fetch(`/api/introduction?name=${person.name}&isChild=${!person.isGrownUp}`).then(async (response) => {
      const json = await response.json();
      setIntroductionText(json.message);
    });
  }, []);

  return (
    <div>
      <div>{introductionText}</div>
    </div>
  );
};

export default StepThree;
