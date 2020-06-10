import { AppThunk } from "../../types/dataInterfaces"
import { GET_SOC_RESOURCES } from "./resourceManagementTypes"
import { resp_resource } from "../../../constants/RequestInterfaces"
import { socResourcesEndpoint, socResourceUploadEndpoint, socResourceDeleteEndpoint, socAttachResourcesToEventEndpoint } from "../../../constants/endpoints"

export const loadSocResources = (userToken: string): AppThunk => async dispatch => {
   fetch(socResourcesEndpoint, {
      method: "get",
      headers: { 'Authorization': `Bearer ${userToken}` }
   })
      .then(res => res.json())
      .then(data => data as resp_resource[])
      .then(resources => (dispatch({
         type: GET_SOC_RESOURCES,
         payload: resources
      })))
}


export const uploadFile = (file: File, userToken: string): AppThunk => async dispatch => {
   const form = new FormData();
   form.append("upload", file)

   fetch(socResourceUploadEndpoint, {
      method: 'post',
      body: form,
      headers: { 'Authorization': `Bearer ${userToken}` }
   })
      .then(res => console.log(res))
      .then(() => dispatch(loadSocResources(userToken)))
}

export const deleteFile = (id: string, userToken: string): AppThunk => async dispatch => {
   fetch(socResourceDeleteEndpoint(id), {
      method: 'get',
      headers: { 'Authorization': `Bearer ${userToken}` }
   })
      .then(res => console.log(res))
      .then(() => dispatch(loadSocResources(userToken)))
}

export const attachResourcesToEvent = (eventId: string, resources: string[], userToken: string): AppThunk => async dispatch => {
   fetch(socAttachResourcesToEventEndpoint(eventId), {
      method: 'post',
      body: JSON.stringify({ files: resources }),
      headers: { 'Authorization': `Bearer ${userToken}`, 'Content-Type': 'application/json'  }
   })
      .then(res => res.json())
      .then(data => console.log(data))
}