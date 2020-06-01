import { UserType, USER_LOGIN, LOAD_USER_DATA } from "./types";
import { AuthResponse } from "../types/dataInterfaces";
import { UserState } from "../types/stateTypes";
import { Plugins } from '@capacitor/core';
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducers";
import { Action } from "redux";
const { Storage } = Plugins;

const IS_LOGGED_IN = 'isLoggedIn';
const USER_TOKEN = 'userToken';
const PROFILE = 'profile';

export type AppThunk<ReturnType = void> =
   ThunkAction<
      ReturnType,
      RootState,
      unknown,
      Action<string>
   >



const saveUserData = async (data: AuthResponse, login: boolean) => {
   await Storage.set({ key: IS_LOGGED_IN, value: JSON.stringify(login) });
   await Storage.set({ key: USER_TOKEN, value: JSON.stringify(data.body.token) });
   await Storage.set({ key: PROFILE, value: JSON.stringify(data.body.profile) });
}


export const logIn = (user: AuthResponse): AppThunk => async dispatch => {
   await saveUserData(user, true)
   dispatch({
      type: USER_LOGIN,
      payload: user
   })
}


export const loadUserData = (): AppThunk => async dispatch => {
   const data = await getUserData();
   dispatch({
      type: LOAD_USER_DATA,
      payload: data
   });
}

export const getUserData = async () => {
   const response = await Promise.all([
      Storage.get({ key: IS_LOGGED_IN }),
      Storage.get({ key: USER_TOKEN }),
      Storage.get({ key: PROFILE })]);

   const isLoggedin = await response[0].value === 'true';
   const userToken = await response[1].value || undefined;
   const profileString = await response[2].value;
   let profile = profileString ? JSON.parse(profileString) : undefined;

   return {
      isLoggedIn: isLoggedin,
      userToken: userToken,
      profile: profile,
      loading: false
   }
}