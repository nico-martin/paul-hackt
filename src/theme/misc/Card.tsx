import React from 'react';
import cn from '@common/classnames';
import styles from './Card.module.css';

const Card: React.FC<{
  className?: string;
  children: JSX.Element | Array<JSX.Element>;
}> = ({ className = '', children }) => {
  return <div className={cn(className, styles.card)}>{children}</div>;
};

export default Card;
