import { API_KEY, API_BASE_URL } from "./constants";

const parksUrl = `${API_BASE_URL}/parks/`;
const activitiesUrl = `${API_BASE_URL}/thingstodo`;

const getParks = async () => {
  const response = await request(parksUrl, { limit: 1000 });
  return response.data;
};

const getPark = async (parkCode) => {
  const response = await request(parksUrl, { parkCode });
  return response.data;
};

const getActivities = async (parkCode) => {
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

    if (!response.ok) {
      // TODO: Return an error/display toast.
      throw new Error();
    }

    return response.json();
  } catch (error) {
    console.error(error);
    // TODO: Return an error/display toast.
    return null;
  }
};

export { getParks, getPark, getActivities };
