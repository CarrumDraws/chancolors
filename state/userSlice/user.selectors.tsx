import { RootState } from "../store";
import { UserData } from "../../types/user";

export const selectUser = (state: RootState): UserData | null =>
  state.user.user;
