import React, { ChangeEvent } from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked  = event.target.value == "on" ? true : false;
    onChange(checked);
  };

  return (
    <label className="switch">
      <input type="checkbox" checked={checked} onChange={handleInputChange} />
      <span className="slider round"></span>
      {label}
    </label>
  );
};

export default Toggle;
