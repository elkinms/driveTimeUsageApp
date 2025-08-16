export type User = {
  id: string;
  name?: string;
};

export type UserRequest = {
  email: string;
  password: string;
  name?: string;
};
