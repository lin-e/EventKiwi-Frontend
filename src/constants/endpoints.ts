const stagingURL = "https://staging.drp.social";
const productionURL = "https://endpoint.drp.social";

export const endpointURL = stagingURL;

export const discoverEventCardURL = `${endpointURL}/events/cards/all`

export const eventDetailsURL = (id: string) => `${endpointURL}/events/details/${id}`
export const eventResourcesURL = `${endpointURL}/events/resources/`
export const resourceDownloadURL = (id: string) => `${productionURL}/file/get/${id}`

export const authEndpoint = `${endpointURL}/auth/new/`;
export const deAuthEndpoint = `${endpointURL}/auth/end/`;

export const goingToEventEndpoint = (id: string) =>  `${endpointURL}/events/going/${id}`;
export const interestedInEventEndpoint = (id: string) =>  `${endpointURL}/events/interested/${id}`;
export const notGoingToEventEndpoint = (id: string) =>  `${endpointURL}/events/none/${id}`;

export const eventPostsEndpoint = (eventId: string, lastPostId: string) => {
 return `${endpointURL}/${eventId}/${lastPostId}/`
}