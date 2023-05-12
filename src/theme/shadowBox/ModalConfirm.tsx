import React from 'react';
import cn from '@common/classnames';
import { Button, MESSAGE_TYPES, Message } from '../index';
import Modal, { ModalPropsI } from './Modal';
import styles from './ModalConfirm.module.css';

interface ModalConfirmPropsI<T> extends ModalPropsI {
  promise: () => Promise<T>;
  showCancelButton?: boolean;
  cancelText?: string;
  confirmText?: string;
  content: string;
  successText: string | ((resp: T) => string);
  errorText?: string;
  runOnMount?: boolean;
}

enum STATE {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

const ModalConfirm = <T extends unknown>({
  children,
  classNameContent,
  promise,
  showCancelButton = true,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  size = 'medium',
  content,
  successText,
  errorText = 'An unexpected error occured',
  runOnMount = false,
  ...props
}: ModalConfirmPropsI<T>) => {
  const [state, setState] = React.useState<STATE>(STATE.IDLE);
  const [closeButton, setCloseButton] = React.useState<HTMLButtonElement>(null);
  const [promiseResponse, setPromiseResponse] = React.useState<T>(null);

  const buttonRef = React.useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  React.useEffect(() => {
    setTimeout(() => buttonRef?.current?.focus(), 100);
  }, [buttonRef]);

  React.useEffect(() => {
    runOnMount && doPromise();
  }, []);

  const doPromise = () => {
    setState(STATE.LOADING);
    promise()
      .then((resp) => {
        setPromiseResponse(resp);
        setState(STATE.SUCCESS);
      })
      .catch(() => setState(STATE.ERROR));
  };

  return (
    <Modal
      {...props}
      classNameContent={cn(styles.modalContent, classNameContent)}
      setCloseButton={(button) => {
        setCloseButton(button);
        props.setCloseButton && props.setCloseButton(button);
      }}
      size={size}
    >
      <div className={styles.content}>{content}</div>
      {state === STATE.SUCCESS && (
        <Message className={styles.message} type={MESSAGE_TYPES.SUCCESS}>
          {typeof successText === 'function'
            ? successText(promiseResponse)
            : successText}
        </Message>
      )}
      {state === STATE.ERROR && (
        <Message className={styles.message} type={MESSAGE_TYPES.ERROR}>
          {errorText}
        </Message>
      )}
      {state !== STATE.SUCCESS && (
        <div className={cn(styles.buttonContainer)}>
          {showCancelButton && (
            <Button
              appearance="none"
              onClick={() =>
                closeButton ? closeButton?.click() : props.close()
              }
            >
              {cancelText}
            </Button>
          )}
          <Button
            loading={state === STATE.LOADING}
            autofocus
            onClick={doPromise}
            ref={buttonRef}
          >
            {confirmText}
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default ModalConfirm;
