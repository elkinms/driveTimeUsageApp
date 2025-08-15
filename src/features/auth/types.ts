export type User = {
  id: string;
  name?: string;
};

export type UserRequest = {
  login: string;
  password: string;
  name?: string;
};
