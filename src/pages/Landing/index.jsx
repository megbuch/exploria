import { Landing as Screen } from "./screen";
import { featuredParks } from "../../data/featuredParks";

export const Landing = () => {
  return <Screen featuredParks={featuredParks} />;
};
