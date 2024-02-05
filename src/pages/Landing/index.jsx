import { useParks } from "../../hooks/useParks";
import { Landing as Screen } from "./screen";

export const Landing = () => {
  const { parks, loading } = useParks();

  const getRandomParks = (parksArray, numberOfParks) => {
    const shuffled = [...parksArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numberOfParks);
  };

  const featuredParks = getRandomParks(parks, 5);

  return <Screen loading={loading} featuredParks={featuredParks} />;
};
