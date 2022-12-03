import React, { FC } from 'react';

import style from './styles.module.css';

type ButtonProps = {
  textChildren: string;
  onClick?: () => void;
  backgroundColor: string;
};

export const Button: FC<ButtonProps> = props => {
  const { textChildren, onClick, backgroundColor } = props;

  return (
    <button
      onClick={onClick}
      type="button"
      className={style.btn}
      style={{ backgroundColor }}
    >
      {textChildren}
    </button>
  );
};
