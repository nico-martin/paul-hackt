import React from 'react';
import cn from '@common/classnames';
import styles from './InputCheckbox.module.css';

const InputCheckbox: React.FC<{
  name: string;
  value?: string;
  className?: string;
  classNameInput?: string;
  onChange?: (value: boolean) => void;
}> = ({
  name,
  value = '',
  className = '',
  classNameInput = '',
  onChange = () => ({}),
}) => {
  const checkboxRef = React.useRef<HTMLInputElement>(null);

  const handleCheckboxChange = () => {
    const checked = checkboxRef.current?.checked ?? false;
    onChange(checked);
  };

  return (
    <React.Fragment>
      <input
        value="checked"
        id={name}
        name={name}
        className={cn(styles.input)}
        type="checkbox"
        checked={Boolean(value)}
        onChange={handleCheckboxChange}
        tabIndex={-1}
        ref={checkboxRef}
      />
      <span
        role="checkbox"
        aria-checked={Boolean(value)}
        aria-labelledby={`label-${name}`}
        tabIndex={0}
        onClick={handleCheckboxChange}
        onKeyUp={(e) => {
          e.keyCode === 32 && handleCheckboxChange();
        }}
        className={cn(className, styles.spanInput, classNameInput, {
          [styles.isActive]: Boolean(value),
        })}
      />
    </React.Fragment>
  );
};

InputCheckbox.displayName = 'InputCheckbox';

export default InputCheckbox;
