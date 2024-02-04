import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import LandingPage from "../LandingPage/LandingPage";
import ParksIndex from "../ParksIndex/index";
import ParkDetailPage from "../ParkDetailPage/ParkDetailPage";

export default function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/parks" element={<ParksIndex />} />
        <Route path="/parks/:parkCode" element={<ParkDetailPage />} />
      </Routes>
    </>
  );
}
