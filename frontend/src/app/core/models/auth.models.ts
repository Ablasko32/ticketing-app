import { TRoles } from './user.model';

export interface IRegisterData {
  email: string;
  password: string;
  organizationName: string;
}

export interface IRegisterUserData {
  email: string;
  password: string;
  role: TRoles;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IAuthStatus {
  userId: string;
  isAuthenticated: boolean;
  email: string;
  role: TRoles;
  organizationName: string;
}

export interface IAuthResponse {
  message: string;
}
