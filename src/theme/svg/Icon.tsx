import React from 'react';
import cn from '@common/classnames';
import icons, { IconNamesT } from '../icons';
import styles from './Icon.module.css';

const Icon: React.FC<{
  icon: IconNamesT;
  className?: string;
  rotate?: 90 | 180 | 270 | false;
  spinning?: boolean;
  button?: boolean;
  round?: boolean;
  circle?: boolean;
  inline?: boolean;

  [key: string]: any;
}> = ({
  icon,
  className = '',
  spinning = false,
  rotate = false,
  button = false,
  round = false,
  circle = false,
  inline = false,
  ...props
}) => {
  const Icon = icon && icon in icons ? icons[icon] : null;

  return Icon ? (
    <span
      className={cn(styles.icon, className, {
        [styles.isInline]: inline,
        [styles[`rotate-${rotate}`]]: rotate !== false,
        [styles.animationSpin]: spinning,
        [styles.isRound]: round,
        [styles.circle]: circle,
      })}
      {...props}
    >
      <Icon />
    </span>
  ) : null;
};

export default Icon;
