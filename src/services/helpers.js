export const phoneMask = '+7 999 999-99-99';

/**
 * 'success' -> 'text-success'
 * 'red' -> 'text-custom'
 * @param {string} colorString - строка в формате baseColor, HEX, colorName
 * @returns {string}
 */
export const getColor = colorString => {
  if (!colorString || typeof colorString !== 'string') {
    return '';
  }

  const baseColors = [
    'base',
    'secondary',
    'muted',
    'primary',
    'info',
    'success',
    'warning',
    'error',
    'priority',
    'gold',
    'pink',
    'white',
    'border',
    'bg',
  ];

  if (baseColors.includes(colorString)) {
    return `text-${colorString}`;
  }

  return 'text-custom';
};
