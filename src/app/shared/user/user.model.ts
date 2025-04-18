export interface IUser {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  status: string;
  createdAt: Date;
  lastAccess?: Date;
  languages: string[];
  preferredContact: string;
  accessProfile: string;
}