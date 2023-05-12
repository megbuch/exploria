import axios from "axios";

const fetchParksData = async (searchQuery) => {
  try {
    const response = await axios.get(
      "https://developer.nps.gov/api/v1/parks/",
      {
        headers: {
          "X-Api-Key": import.meta.env.VITE_NPS_API_KEY,
          "Content-Type": "application/json",
        },
        params: {
          q: searchQuery,
        },
      }
    );

    return response.data.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const fetchParkData = async (parkCode) => {
  try {
    const response = await axios.get(
      `https://developer.nps.gov/api/v1/parks/`,
      {
        headers: {
          "X-Api-Key": import.meta.env.VITE_NPS_API_KEY,
          "Content-Type": "application/json",
        },
        params: {
          parkCode: parkCode,
        },
      }
    );

    const parks = response.data.data;
    const selectedPark = parks.find((park) => park.parkCode === parkCode);
    return selectedPark;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export { fetchParksData, fetchParkData };
