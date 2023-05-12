import React from 'react';
import cn from '@common/classnames';
import styles from './FormError.module.css';

const FormError = ({
  className = '',
  children,
}: {
  className?: string;
  children: JSX.Element | string;
}) => <p className={cn(className, styles.root)}>{children}</p>;

export default FormError;
