const stagingURL = "https://staging.drp.social";
const productionURL = "https://endpoint.drp.social";

export const endpointURL = stagingURL;

export const discoverEventCardURL = `${endpointURL}/events/cards/all`

export const eventDetailsURL = `${endpointURL}/events/details/`
export const eventResourcesURL = `${endpointURL}/events/resources/`
export const resourceDownloadURL = `${productionURL}/file/get/`

export const authEndpoint = `${endpointURL}/auth/new/`;
export const deAuthEndpoint = `${endpointURL}/auth/end/`;

export const goingToEventEndpoint = `${endpointURL}/events/going/`;
export const interestedInEventEndpoint = `${endpointURL}/events/interested/`;
export const notGoingToEventEndpoint = `${endpointURL}/events/none/`;