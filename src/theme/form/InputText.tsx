import React from 'react';
import cn from '@common/classnames';
import inputStyles from './Input.module.css';

const InputText: React.FC<{
  name: string;
  value?: string;
  className?: string;
  prepend?: string;
  append?: string;
  type?:
    | 'text'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'hidden'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'time'
    | 'url'
    | 'week';
  [key: string]: any;
}> = ({
  name,
  value = '',
  className = '',
  type = 'text',
  prepend = '',
  append = '',
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <div className={cn(className, inputStyles.inputWrapper)}>
      {prepend !== '' && (
        <span
          className={inputStyles.prepend}
          onClick={() => inputRef.current && inputRef.current.focus()}
        >
          {prepend}
        </span>
      )}
      <input
        name={name}
        className={cn(inputStyles.input)}
        id={name}
        value={value}
        type={type}
        ref={inputRef}
        {...props}
      />
      {append !== '' && (
        <span
          className={inputStyles.append}
          onClick={() => inputRef.current && inputRef.current.focus()}
        >
          {append}
        </span>
      )}
    </div>
  );
};

export default InputText;
