import { createContext, useState, useEffect } from "react";
import { getParks } from "../api";

export const ParksContext = createContext({ parks: [], loading: true });

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

  const contextStore = { parks, loading };

  return (
    <ParksContext.Provider value={contextStore}>
      {children}
    </ParksContext.Provider>
  );
};
