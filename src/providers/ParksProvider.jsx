import { useState, useEffect } from "react";
import { getParks } from "../global/api";
import { ParksContext } from "../contexts/ParksContext";

export const ParksProvider = ({ children }) => {
  const [parks, setParks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const data = await getParks();
        setParks(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        // TODO: Handle error toast.
      }
    };

    fetchParks();
  }, []);

  const value = { parks, loading };
  return (
    <ParksContext.Provider value={value}>{children}</ParksContext.Provider>
  );
};
