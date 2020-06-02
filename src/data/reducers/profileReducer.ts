import { ProfileInterestState, ProfileSocState, ProfileDetailsState } from '../types/stateTypes'
import { FetchProfileType, FETCH_PROFILE_INTERESTS, FETCH_PROFILE_SOCS, REMOVE_PROFILE_INTEREST, FETCH_PROFILE_DETAILS } from '../actions/types'
import { fetchProfileDetails } from '../actions/actions'

const initialProfileDetailsState: ProfileDetailsState = {
  profileDetails: {
    firstname: "",
    lastname: "",
    email: "",
    societies: [],
    interests: []
  }
};

export const profileReducer = (state = initialProfileDetailsState, action: FetchProfileType): ProfileDetailsState => {
  switch(action.type) {
    case FETCH_PROFILE_DETAILS:
      return {
        ...state,
        profileDetails: action.payload
      }
    default:
      return state;
  }
}

const initialInterestState: ProfileInterestState = {interests: []}

export const profileInterestReducer = (state = initialInterestState, action: FetchProfileType): ProfileInterestState => {
  switch(action.type) {
    case FETCH_PROFILE_INTERESTS:
      return {
        ...state,
        interests: action.payload
      };
    case REMOVE_PROFILE_INTEREST:
      return {
        ...state,
        interests: state.interests.filter((intr) => (intr !== action.payload))
      }
    default:
      return state;
  }
}

const initialSocState: ProfileSocState = {societies: []}

export const profileSocReducer = (state = initialSocState, action: FetchProfileType): ProfileSocState => {
  switch(action.type) {
    case FETCH_PROFILE_SOCS:
      return {
        ...state,
        societies: action.payload
      };
    default:
      return state;
  }
}
