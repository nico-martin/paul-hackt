import React from 'react';
import cn from '@common/classnames';
import { Icon, type IconNamesT } from '../index';
import styles from './Message.module.css';

export enum MESSAGE_TYPES {
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  INFO = 'INFO',
}

const Message: React.FC<{
  type: MESSAGE_TYPES;
  className?: string;
  children: JSX.Element | string;
  icon?: IconNamesT | 'none';
}> = ({
  type = MESSAGE_TYPES.WARNING,
  className = '',
  children,
  icon: iconProp = null,
}) => {
  const icon: IconNamesT =
    iconProp === 'none'
      ? null
      : iconProp !== null
      ? iconProp
      : type === MESSAGE_TYPES.ERROR
      ? 'x'
      : type === MESSAGE_TYPES.SUCCESS
      ? 'check'
      : type === MESSAGE_TYPES.INFO
      ? 'info'
      : 'exclamation';

  return (
    <div
      className={cn(className, styles.message, {
        [styles.messageSuccess]: type === MESSAGE_TYPES.SUCCESS,
        [styles.messageWarning]: type === MESSAGE_TYPES.WARNING,
        [styles.messageError]: type === MESSAGE_TYPES.ERROR,
      })}
    >
      {icon && (
        <div className={styles.iconWrapper}>
          <Icon icon={icon} className={styles.icon} />
        </div>
      )}
      <div className={styles.content}>
        {typeof children === 'string' ? <p>{children}</p> : children}
      </div>
    </div>
  );
};
export default Message;
