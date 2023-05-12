import React from 'react';
import cn from '@common/classnames';
import styles from './CopyCode.module.css';

const CopyCode = ({
  className = '',
  children = '',
}: {
  className?: string;
  children?: any;
}) => {
  const [copyText, setCopyText] = React.useState('copy');

  const doCopy = () => {
    navigator.clipboard.writeText(children);
    setCopyText('copied!');
    window.setTimeout(() => setCopyText('copy'), 1000);
  };

  return (
    <code className={cn(className, styles.root)} onClick={doCopy}>
      {children}{' '}
      <button
        className={styles.button}
        style={{ color: copyText === 'copy' ? '#000' : 'green' }}
        onClick={doCopy}
        type="button"
      >
        {copyText}
      </button>
    </code>
  );
};

export default CopyCode;
