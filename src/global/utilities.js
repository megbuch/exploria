import { API_KEY } from "./constants";

export const request = async (url, params = {}) => {
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
