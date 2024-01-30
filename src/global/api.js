import { request } from "./utilities";
import { API_BASE_URL } from "./constants";

const parksUrl = `${API_BASE_URL}/parks/`;
const activitiesUrl = `${API_BASE_URL}/thingstodo`;

const getParks = async () => {
  const response = await request(parksUrl, { limit: 1000 });
  return response.data;
};

const getPark = async (parkCode) => {
  const parks = await request(parksUrl, { parkCode });
  return parks?.find((park) => park.parkCode === parkCode);
};

const getActivities = async (parkCode) => {
  const response = await request(activitiesUrl, { parkCode });
  return response.data;
};

export { getParks, getPark, getActivities };
