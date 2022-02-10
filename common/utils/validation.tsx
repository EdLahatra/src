const MAIL_VALIDATION = /[A-Z0-9a-z._%+-]+@[a-zA-Z0-9-]+\.[A-Za-z]{2,3}$/;
const TELEPHONE_VALIDATION = /^(020|033|034|032)\d{7}$/;
const PASSWORD_VALIDATION = /^.{6,}$/;
const WHITESPACE_VALIDATION = /^\s*$/;

export const VALIDATION_REGEX = {
  mail: MAIL_VALIDATION,
  telephone: TELEPHONE_VALIDATION,
  password: PASSWORD_VALIDATION,
  whitespace: WHITESPACE_VALIDATION,
};

export const VALIDATION_MESSAGE = {
  mail: 'Email invalide',
  telephone: 'Numéro de téléphone invalide',
  password: 'Mot de passe invalide',
  whitespace: '',
};

export const separateurMillier = (nombre: number) => {
  return nombre.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
