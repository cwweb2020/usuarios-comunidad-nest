import { Profession } from '../entities';

export interface UserWithoutPassword {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  languages: string[];
  phone: string;
  isActive: boolean;
  location: string;
  credentialNum: number;
  roles: string[];
  professions: Profession[];
}
