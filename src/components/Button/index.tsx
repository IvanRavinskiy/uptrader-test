import React, { FC, MouseEvent } from 'react';

import style from './styles.module.css';

type ButtonProps = {
  textChildren: string;
  onClick: () => void;
  backgroundColor: string;
};

export const Button: FC<ButtonProps> = props => {
  const { textChildren, onClick, backgroundColor } = props;

  const onButtonPress = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    onClick();
  };

  return (
    <button
      onClick={onButtonPress}
      type="button"
      className={style.btn}
      style={{ backgroundColor }}
    >
      {textChildren}
    </button>
  );
};
