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

    const allParks = response.data.data;
    return allParks;
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

    const allParks = response.data.data;
    const selectedPark = allParks.find((park) => park.parkCode === parkCode);
    return selectedPark;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const fetchThingsToDoData = async (parkCode) => {
  try {
    const response = await axios.get(
      "https://developer.nps.gov/api/v1/thingstodo",
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

    const thingsToDo = response.data.data;
    return thingsToDo;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export { fetchParksData, fetchParkData, fetchThingsToDoData };
