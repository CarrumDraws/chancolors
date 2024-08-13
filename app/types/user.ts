import { User } from "firebase/auth";

export interface UserData {
  name: string | null;
  email: string | null;
  photo: string | null;
  providerId: string | null;
  uid: string | null;
}

export interface AuthState {
  user: UserData | null;
}

export interface RawUserData {
  user: User | null;
}
