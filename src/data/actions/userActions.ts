import { UserType, USER_LOGIN } from "./types";
import { AuthResponse } from "../types/dataInterfaces";

export const logIn = (user: AuthResponse): UserType => ({
   type: USER_LOGIN,
   payload: user
})
