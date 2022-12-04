import React, { FC } from 'react';

import { FieldErrors, Path, UseFormRegister } from 'react-hook-form';

import style from './styles.module.css';

import { FormValues } from 'components/Form';

type TextInputProps = {
  label: Path<FormValues>;
  title: string;
  register: UseFormRegister<FormValues>;
  error: FieldErrors<FormValues>;
};

export const TextInput: FC<TextInputProps> = props => {
  const { label, title, register, error } = props;

  return (
    <>
      <label htmlFor={label} className={style.label}>
        {title}
      </label>
      <input {...register(label)} className={style.textInput} />
      <p className={style.error}>{error[label]?.message}</p>
    </>
  );
};
