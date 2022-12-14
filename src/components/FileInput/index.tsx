import React, { ChangeEvent, FC } from 'react';

import { FieldErrors, Path, UseFormRegister } from 'react-hook-form';

import { memo } from '../../utils/memo';

import style from './styles.module.css';

import { FormValues } from 'components/Form';

type PhotoInputProps = {
  label: Path<FormValues>;
  title: string;
  register: UseFormRegister<FormValues>;
  error: FieldErrors<FormValues>;
  avatarPreview: string;
  addPhoto: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const FileInput: FC<PhotoInputProps> = memo(props => {
  const { label, title, register, error, addPhoto, avatarPreview } = props;

  return (
    <>
      <label htmlFor={label} className={style.label}>
        {title}
      </label>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className={style.inputPhotoContainer} htmlFor={label}>
        <img className={style.photo} alt="file" src={avatarPreview} />
      </label>
      <input hidden type="file" {...register(label)} id={label} onChange={addPhoto} />
      <p className={style.error}>{error[label]?.message}</p>
    </>
  );
});
