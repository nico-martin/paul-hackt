import React from 'react';
import cn from '@common/classnames';
import styles from './Loader.module.css';

const Loader: React.FC<{ className?: string; size?: 'large' | 'normal' }> = ({
  className = '',
  size = 'normal',
}) => (
  <svg
    className={cn(styles.root, className, {
      [styles.isLarge]: size === 'large',
    })}
    viewBox="0 0 40 40"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20" cy="20" r="15" />
  </svg>
);

export default Loader;
