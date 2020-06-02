import { USER_LOGIN, LOAD_USER_DATA, USER_LOGOUT } from "./types";
import { AuthResponse, blankProfile, AppThunk } from "../types/dataInterfaces";
import { Plugins } from '@capacitor/core';
import { authEndpoint, deAuthEndpoint } from "../../constants/endpoints";
const { Storage } = Plugins;

const IS_LOGGED_IN = 'isLoggedIn';
const USER_TOKEN = 'userToken';
const PROFILE = 'profile';


const saveUserData = async (data: AuthResponse, login: boolean) => {
   await Storage.set({ key: IS_LOGGED_IN, value: JSON.stringify(login) });
   await Storage.set({ key: USER_TOKEN, value: data.body.token });
   await Storage.set({ key: PROFILE, value: JSON.stringify(data.body.profile) });
}

export const logIn = (msToken: string): AppThunk => async dispatch => {
   fetch(authEndpoint, {
      method: 'post',
      body: JSON.stringify({ token: msToken }),
      headers: { 'Content-Type': 'application/json' }
   })
   .then(res => res.json())
   .then(data => {
      saveUserData(data, true)
      return data
   })
   .then(user => (
      dispatch({
         type: USER_LOGIN,
         payload: user
      })
   ))
}


export const loadUserData = (): AppThunk => async dispatch => {
   const data = await getUserData();
   dispatch({
      type: LOAD_USER_DATA,
      payload: data
   });
}

const getUserData = async () => {
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


export const logOut = (userToken: string): AppThunk => async dispatch => {
   fetch(deAuthEndpoint, {
      method: "get",
      headers: { 'Authorization': `Bearer ${userToken}` }
   })
      .then(res => console.log(res))
      .then(() => clearUserData())
      .then(() => (
         dispatch({
            type: USER_LOGOUT
         })
      ))
}

const clearUserData = async () => {
   await Storage.set({ key: IS_LOGGED_IN, value: JSON.stringify(false) });
   await Storage.set({ key: USER_TOKEN, value: "" });
   await Storage.set({ key: PROFILE, value: JSON.stringify(blankProfile) });
}