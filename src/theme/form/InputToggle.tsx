import React, { ChangeEvent } from 'react';
import inputToggleStyles from './InputToggle.module.css';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked  = event.target.checked;
    onChange(checked);
  };

  return (
    <label className={inputToggleStyles.switch}>
      <input type="checkbox" checked={checked} onChange={handleInputChange} />
      <span className={inputToggleStyles.slider +" "+ inputToggleStyles.round}></span>
      {label}
    </label>
  );
};

export default Toggle;
