export type FormState = 
  | 'personal'
  | 'account' 
  | 'preferences'
  | 'review'
  | 'success'
  | 'error';

export interface RegistrationData {
  personal: {
    firstName: string;
    lastName: string;
    email: string;
  };
  account: {
    username: string;
    password: string;
  };
  preferences: {
    notifications: boolean;
    theme: 'light' | 'dark';
  };
}