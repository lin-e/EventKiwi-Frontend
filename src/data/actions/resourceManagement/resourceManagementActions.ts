import { AppThunk } from "../../types/dataInterfaces"
import { GET_SOC_RESOURCES } from "./resourceManagementTypes"
import { resp_resource } from "../../../constants/RequestInterfaces"
import { socResourcesEndpoint } from "../../../constants/endpoints"

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
