import { RootState } from "../store";
import { UserData } from "../../app/types/user";

export const selectUser = (state: RootState): UserData | null =>
  state.user.user;
