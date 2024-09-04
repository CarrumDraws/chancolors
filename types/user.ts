import { User } from "firebase/auth";

export interface UserData {
  name: string;
  email: string;
  photo: string;
  providerId: string;
  uid: string;
}

export interface AuthState {
  user: UserData | null;
}

export interface RawUserData {
  user: User | null;
}
