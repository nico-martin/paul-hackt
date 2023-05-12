import React from 'react';
import cn from '@common/classnames';
import { Icon } from '@theme';
import styles from './IconBubble.module.css';

export enum ICON_BUBBLE_TYPE {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

const IconBubble: React.FC<{ className?: string; type: ICON_BUBBLE_TYPE }> = ({
  className = '',
  type,
}) => {
  return (
    <div className={cn(className, styles.root)}>
      <span
        className={cn(styles.bubble, {
          [styles.bubbleLoading]: type === ICON_BUBBLE_TYPE.LOADING,
          [styles.bubbleError]: type === ICON_BUBBLE_TYPE.ERROR,
          [styles.bubbleSuccess]: type === ICON_BUBBLE_TYPE.SUCCESS,
        })}
      >
        <Icon
          className={styles.icon}
          icon={
            type === ICON_BUBBLE_TYPE.SUCCESS
              ? 'check'
              : type === ICON_BUBBLE_TYPE.ERROR
              ? 'x'
              : type === ICON_BUBBLE_TYPE.LOADING
              ? 'autoRenew'
              : 'timerSandComplete'
          }
          spinning={type === ICON_BUBBLE_TYPE.LOADING}
        />
      </span>
    </div>
  );
};

export default IconBubble;
