import { Routes, Route } from "react-router-dom";
import { Navigation } from "../../components/Navigation/index";
import { Landing } from "../Landing/index";
import { ParksIndex } from "../ParksIndex/index";
import { ParkDetails } from "../ParkDetails/index";
import "../../global/styles.scss";

export const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/parks" element={<ParksIndex />} />
        <Route path="/parks/:parkCode" element={<ParkDetails />} />
      </Routes>
    </>
  );
};
