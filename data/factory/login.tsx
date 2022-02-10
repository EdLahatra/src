interface dtoInterface {
  email: string;
  password: string;
  token?: string;
}
interface loginInterface {
  identifiant: string;
  password: string;
  token?: string;
}

export const DtoToLoginFactory = (data: dtoInterface): loginInterface => {
  return {
    identifiant: data.email,
    password: data.password,
    token: data.token,
  };
};

export const LoginToDtoFactory = (data: loginInterface): dtoInterface => {
  return {
    email: data.identifiant,
    password: data.password,
    token: data.token,
  };
};
