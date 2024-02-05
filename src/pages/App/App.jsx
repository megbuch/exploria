import "../../global/index.scss";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "../../components/Navigation/index";
import { LandingPage } from "../LandingPage/LandingPage";
import { ParksIndex } from "../ParksIndex/index";
import { ParkDetails } from "../ParkDetails/index";

export const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/parks" element={<ParksIndex />} />
        <Route path="/parks/:parkCode" element={<ParkDetails />} />
      </Routes>
    </>
  );
};
