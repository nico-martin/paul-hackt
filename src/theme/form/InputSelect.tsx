import React, { ChangeEventHandler } from 'react';
import cn from '@common/classnames';
import inputStyles from './Input.module.css';

const InputSelect = ({
  name,
  value = '',
  className = '',
  options,
  optionProps = () => ({}),
  emptyOption = false,
  onChange,
  ...props
}: {
  name: string;
  value?: string;
  className?: string;
  options: Record<string, string>;
  optionProps?: (value: string, label: string) => Record<string, any>;
  emptyOption?: boolean;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}) => {
  return (
    <div className={cn(className, inputStyles.inputWrapper)}>
      <select
        value={value}
        id={name}
        name={name}
        className={cn(className, inputStyles.input)}
        onChange={onChange}
        {...props}
      >
        {emptyOption && <option value="" {...optionProps('', '')} />}
        {Object.entries(options || {}).map(([value, label]) => (
          <option
            value={value}
            key={value}
            {...optionProps(value, String(label))}
          >
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSelect;
