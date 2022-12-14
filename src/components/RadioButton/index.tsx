import React, { FC } from 'react';

import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { PRIORITY } from '../../constants';
import { useRadioButtonHandle } from '../../hooks/useRadioButtonHandle';
import { memo } from '../../utils/memo';

import style from './styles.module.css';

import { FormValues } from 'components/Form';

type RadioItemProps = {
  value: string;
  isActive: boolean;
  onClick: () => void;
  register: UseFormRegister<FormValues>;
};

type RadioButtonProps = {
  register: UseFormRegister<FormValues>;
  error: FieldErrors<FormValues>;
};

export const RadioButton: FC<RadioButtonProps> = memo(props => {
  const { register, error } = props;

  const {
    isActiveLow,
    isActiveMedium,
    isActiveHigh,
    onLowPress,
    onMediumPress,
    onHighPress,
  } = useRadioButtonHandle();

  return (
    <>
      <div className={style.radioContainer}>
        <RadioItem
          value={PRIORITY.LOW}
          isActive={isActiveLow}
          onClick={onLowPress}
          register={register}
        />
        <RadioItem
          value={PRIORITY.MEDIUM}
          isActive={isActiveMedium}
          onClick={onMediumPress}
          register={register}
        />
        <RadioItem
          value={PRIORITY.HIGH}
          isActive={isActiveHigh}
          onClick={onHighPress}
          register={register}
        />
      </div>
      <p className={style.error}>{error.priority?.message}</p>
    </>
  );
});

const RadioItem: FC<RadioItemProps> = memo(props => {
  const { value, isActive, onClick, register } = props;

  const styleHigh = isActive ? style.radioActive : style.radio;

  return (
    <label htmlFor={value}>
      <input
        hidden
        id={value}
        type="radio"
        {...register('priority')}
        value={value}
        onClick={onClick}
      />
      <p className={styleHigh}>{value}</p>
    </label>
  );
});
