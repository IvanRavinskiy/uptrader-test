import React from 'react';

import { Form } from '../Form';

import style from './styles.module.css';

type ModalType = {
  onClose: () => void;
};

export const Modal: React.FC<ModalType> = props => {
  const { onClose } = props;

  return (
    <div className={style.body}>
      <div role="presentation" onClick={onClose} className={style.veil} />
      <div className={style.modal}>
        <Form />
      </div>
    </div>
  );
};
