const stagingURL = "https://staging.drp.social";
const productionURL = "https://endpoint.drp.social";

export const endpointURL = stagingURL;

export const discoverEventCardURL = `${endpointURL}/events/cards/all`
export const discoverSeachEventCardURL = `${endpointURL}/events/search`

export const eventDetailsURL = `${endpointURL}/events/details/`
export const eventResourcesURL = `${stagingURL}/events/resources/`
export const resourceDownloadURL = `${productionURL}/file/get/`

export const profileDetailsURL = `${endpointURL}/profile/all`
export const profileInterestAddURL = `${endpointURL}/profile/interests/add`
export const profileInterestDeleteURL = `${endpointURL}/profile/interests/delete`

export const authEndpoint = "https://staging.drp.social/auth/new/";
export const deAuthEndpoint = "https://staging.drp.social/auth/end/";