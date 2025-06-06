export const formatPhoneNumber = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  let formatted = '';

  if (numbers.length > 0) {
    formatted += numbers.substring(0, 3);
  }
  if (numbers.length > 3) {
    formatted += ` ${numbers.substring(3, 6)}`;
  }
  if (numbers.length > 6) {
    formatted += ` ${numbers.substring(6, 8)}`;
  }
  if (numbers.length > 8) {
    formatted += ` ${numbers.substring(8, 10)}`;
  }

  return formatted;
};
