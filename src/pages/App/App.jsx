import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import LandingPage from "../LandingPage/LandingPage";
import ParksIndexPage from "../ParksIndexPage/ParksIndexPage";

export default function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/parks" element={<ParksIndexPage />} />
      </Routes>
    </>
  );
}
