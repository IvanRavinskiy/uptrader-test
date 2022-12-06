import { useState } from 'react';

type UseRadioButtonHandleType = {
  isActiveLow: boolean;
  isActiveMedium: boolean;
  isActiveHigh: boolean;
  onLowPress: () => void;
  onMediumPress: () => void;
  onHighPress: () => void;
  resetAllButtons: () => void;
};

export const useRadioButtonHandle = (): UseRadioButtonHandleType => {
  const [isActiveLow, setIsActiveLow] = useState(false);
  const [isActiveMedium, setIsActiveMedium] = useState(false);
  const [isActiveHigh, setIsActiveHigh] = useState(false);

  const onLowPress = (): void => {
    setIsActiveLow(true);
    setIsActiveMedium(false);
    setIsActiveHigh(false);
  };
  const onMediumPress = (): void => {
    setIsActiveLow(false);
    setIsActiveMedium(true);
    setIsActiveHigh(false);
  };
  const onHighPress = (): void => {
    setIsActiveLow(false);
    setIsActiveMedium(false);
    setIsActiveHigh(true);
  };

  const resetAllButtons = (): void => {
    setIsActiveLow(false);
    setIsActiveMedium(false);
    setIsActiveHigh(false);
  };

  return {
    isActiveLow,
    isActiveMedium,
    isActiveHigh,
    onLowPress,
    onMediumPress,
    onHighPress,
    resetAllButtons,
  };
};
