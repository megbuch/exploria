import { useState, useEffect } from "react";
import "./ParksIndexPage.scss";
import axios from "axios";

export default function ParksIndexPage() {
  const [parksData, setParksData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const parksPerPage = 50;

  const currentParks = parksData.slice(
    currentPage * parksPerPage,
    (currentPage + 1) * parksPerPage
  );

  useEffect(() => {
    axios
      .get("https://developer.nps.gov/api/v1/parks/", {
        headers: {
          "X-Api-Key": import.meta.env.VITE_NPS_API_KEY,
          "Content-Type": "application/json",
        },
        params: {
          limit: parksPerPage,
          start: currentPage * parksPerPage,
        },
      })
      .then((response) => {
        setParksData((prevParksData) => [
          ...prevParksData,
          ...response.data.data,
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const lastPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <div>
        {currentParks.map((park) => (
          <div key={park.id}>{park.fullName}</div>
        ))}
      </div>
      <div>
        <button onClick={lastPage} disabled={currentPage === 0}>
          Prev
        </button>
        <button
          onClick={nextPage}
          disabled={currentParks.length < parksPerPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
