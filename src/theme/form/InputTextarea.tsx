import React from 'react';
import cn from '@common/classnames';
import inputStyles from './Input.module.css';

const InputTextarea: React.FC<{
  name: string;
  value?: string;
  className?: string;
  rows?: number;
  [key: string]: any;
}> = ({
  name,
  value = '',
  className = '',
  classNameInput = '',
  rows = 4,
  ...props
}) => (
  <div className={cn(className, inputStyles.inputWrapper)}>
    <textarea
      name={name}
      className={cn(
        className,
        classNameInput,
        inputStyles.input,
        inputStyles.textarea
      )}
      id={name}
      value={value}
      rows={rows}
      {...props}
    />
  </div>
);

export default InputTextarea;
