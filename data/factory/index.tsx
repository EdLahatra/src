export const DateToddmmyyyyFormat = (date: Date) => {
  /*if (!date) {
    console.log("DATEEEEEEE=======>>>>>>>>>>>>>>>>>", date)
    if(type='time'){
      return " test"
    }
       console.log("DATEEEEEEE=======>>>>>>>>>>>>>>>>>", date)
    return ''
  }*/
  const year = date.getFullYear();
  const month = (1 + date.getMonth()).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  // if (
  // day === _date.getDate().toString().padStart(2, '0') &&
  //   month === (1 + _date.getMonth()).toString().padStart(2, '0') &&
  //   year === _date.getFullYear();
  // ) {
  //   return '';
  // } else {
  return `${day}/${month}/${year}`;
  // }
};

const addZero = (i: number) => {
  return i < 10 ? '0' + i : i;
};

export const DateToHHmmFormat = (date: Date) => {
  const h = addZero(date.getHours());
  const m = addZero(date.getMinutes());

  return `${h}:${m}`;
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

export const dateDdMmYyToMmDdYy = (value: string, separator: string) => {
  var dateArray = value.split(separator);
  let result = '';
  if (dateArray[1]) {
    result = dateArray[1] + separator + dateArray[0] + separator + dateArray[2];
  }
  return result;
};

export const stringToDate = (date: string) => {
  const dateParts = date.split('/');
  const result = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);

  return result;
};
export const stringHourToDate = (date: string) => {
  console.log('hour', date);
  const dateParts = date.split(':');
  console.log('hour parts', dateParts);
  const result = new Date();
  //result.setDate(result.getDate() -1);
  result.setHours(+dateParts[0], +dateParts[1], 0);
  return result;
};

export const uniqByKeepFirst = (a, key) => {
  let seen = new Set();
  return a.filter(item => {
    let k = key(item);
    return seen.has(k) ? false : seen.add(k);
  });
};
