export const isBlank = (obj: any | undefined | null) => {
  if (obj === undefined) {
    return true;
  }
  if (obj === null) {
    return true;
  }
  if (typeof obj === 'string' && obj === '') {
    return true;
  }
  if (obj && typeof obj === 'string') {
    return !obj || /^\s*$/.test(obj.trim());
  }
  return false;
};
