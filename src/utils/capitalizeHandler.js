/* eslint-disable import/prefer-default-export */
export const capitalizeHandler = word => {
  if (typeof word !== 'string') return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
};
