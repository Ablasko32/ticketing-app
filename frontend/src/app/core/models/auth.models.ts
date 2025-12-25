export interface IRegisterData {
  email: string;
  password: string;
  organizationName: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IAuthResponse {
  message: string;
}
