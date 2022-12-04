import React, { ChangeEvent, FC, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';

import photoForm from '../../assets/photo.svg';
import { FileInput } from '../FileInput';
import { RadioButton } from '../RadioButton';
import { TextInput } from '../TextInput';

import style from './styles.module.css';

export type FormValues = {
  title: string;
  description: string;
  expiry: string;
  file: null;
  priority: string;
};

const formSchema = Yup.object({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  expiry: Yup.string().required('Required'),
  file: Yup.mixed().required('Required'),
  priority: Yup.mixed().required('Required'),
});

export const Form: FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
  });

  const [avatarPreview, setAvatarPreview] = useState(photoForm);

  const addPhoto = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      setAvatarPreview(URL.createObjectURL(event.target.files?.[0]));
      // @ts-ignore
      setValue('file', event.target.files?.[0]);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log('data', data);
    setAvatarPreview(photoForm);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.formContainer}>
      <TextInput label="title" title="Title" register={register} error={errors} />
      <TextInput
        label="description"
        title="Description"
        register={register}
        error={errors}
      />
      <label htmlFor="expiry">
        <p className={style.label}>Expiry</p>
        <input type="date" {...register('expiry')} className={style.textInput} />
        <p className={style.error}>{errors.expiry?.message}</p>
      </label>
      <FileInput
        label="file"
        title="File"
        register={register}
        avatarPreview={avatarPreview}
        addPhoto={addPhoto}
        error={errors}
      />
      <RadioButton register={register} error={errors} />
      <div className={style.buttonContainer}>
        <button type="submit" className={style.button}>
          Ok
        </button>
      </div>
    </form>
  );
};
