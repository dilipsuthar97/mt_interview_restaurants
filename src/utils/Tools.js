import {colors} from '_theme';

export const getHitSlop = (hitSlop = 5) => {
  return {
    top: hitSlop,
    bottom: hitSlop,
    right: hitSlop,
    left: hitSlop,
  };
};

export const getLocalCurrency = (
  amount,
  {locales, currency} = {locales: 'en-in', currency: 'inr'},
) => {
  return new Intl.NumberFormat(locales, {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Method to calculate scroll clamp value
 * @param value
 * @param lowerBound
 * @param upperBound
 * @returns
 */
export const clamp = (value, lowerBound, upperBound) => {
  'worklet';
  return Math.min(Math.max(lowerBound, value), upperBound);
};

/**
 *
 */
export const getShadow = () => {
  return {
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  };
};
