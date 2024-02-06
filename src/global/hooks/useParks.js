import { useContext } from "react";
import { ParksContext } from "../contexts/parksContext";

export const useParks = () => {
  return useContext(ParksContext);
};
