import { API_KEY, API_BASE_URL } from "./constants";

const parksUrl = `${API_BASE_URL}/parks/`;
const activitiesUrl = `${API_BASE_URL}/thingstodo`;

export const getParks = async () => {
  const response = await request(parksUrl, { limit: 1000 });
  return response.data;
};

export const getPark = async (parkCode) => {
  const response = await request(parksUrl, { parkCode });
  return response.data;
};

export const getActivities = async (parkCode) => {
  const response = await request(activitiesUrl, { parkCode });
  return response.data;
};

const request = async (url, params = {}) => {
  try {
    const queryParams = new URLSearchParams(params).toString();
    const fullUrl = queryParams ? `${url}?${queryParams}` : url;

    const headers = {
      "X-Api-Key": API_KEY,
      "Content-Type": "application/json",
    };

    const response = await fetch(fullUrl, { headers });
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
