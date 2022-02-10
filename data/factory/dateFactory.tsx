export const DateToddmmyyyyFormat = (date: Date, _type: string = '') => {
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  } else {
    return '';
  }
};

export const stringToDate = (date: string) => {
  const dateParts = date.split('/');
  const result = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);

  return result;
};

export const stringHourToDate = (date: string) => {
  const dateParts = date.split(':');
  const result = new Date();
  result.setHours(+dateParts[0], +dateParts[1], 0);
  return result;
};

export const thousandSeparator = (value: string, separator: string) => {
  value = '' + value;
  separator = separator || ' ';
  var result = '',
    temp = 0;
  while (value.match(/^0[0-9]/)) {
    value = value.substr(1);
  }
  for (var i = value.length - 1; i >= 0; i--) {
    result =
      temp !== 0 && temp % 3 === 0
        ? value[i] + separator + result
        : value[i] + result;
    temp++;
  }
  return result;
};
