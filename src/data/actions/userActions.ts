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

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

// export const fetchEventCards = (refresher: HTMLIonRefresherElement)
//    : AppThunk => async dispatch => {
//    fetch(discoverEventCardURL)
//    .then(response => response.json())
//    .then(cards => {
//       if (refresher !== null) {
//          refresher.complete();
//       }
//       return (dispatch({
//          type: FETCH_EVENTS_CARDS,
//          payload: (cards as resp_event_card_details[]).map(convertResToEventCard)
//       })
//    )})
// }

const saveUserData = (data: AuthResponse, login: boolean) => {
   Storage.set({key: IS_LOGGED_IN, value:JSON.stringify(login)});
   Storage.set({key: USER_TOKEN, value:JSON.stringify(data.body.token)});
   Storage.set({key: PROFILE, value:JSON.stringify(data.body.profile)});
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
 
 export const setData = (data: Partial<UserState>) => ({
   type: LOAD_USER_DATA,
   data
 } as const);



 export const getUserData = async () => {
   const response = await Promise.all([
     Storage.get({ key: IS_LOGGED_IN }),
     Storage.get({ key: USER_TOKEN }),
     Storage.get({ key: PROFILE })]);
   const isLoggedin = await response[0].value === 'true';
   const userToken = await response[1].value || undefined;
   const profile = await response[2].value || undefined;
   const data = {
      isLoggedIn: isLoggedin,
      userToken: userToken,
      profile: profile
   }
   return data;
 }