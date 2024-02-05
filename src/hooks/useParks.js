import { useContext } from "react";
import { ParksContext } from "../contexts/ParksContext";

export const useParks = () => {
  return useContext(ParksContext);
};
