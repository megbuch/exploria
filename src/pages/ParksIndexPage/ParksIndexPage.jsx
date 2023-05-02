import { useState, useEffect } from "react";
import "./ParksIndexPage.scss";
import axios from "axios";

export default function ParksIndexPage() {
  const [parksData, setParksData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const parksPerPage = 16;

  const currentParks = parksData.slice(
    currentPage * parksPerPage,
    (currentPage + 1) * parksPerPage
  );

  const fetchParksData = async () => {
    try {
      const response = await axios.get(
        "https://developer.nps.gov/api/v1/parks/",
        {
          headers: {
            "X-Api-Key": import.meta.env.VITE_NPS_API_KEY,
            "Content-Type": "application/json",
          },
          params: {
            limit: parksPerPage,
            start: currentPage * parksPerPage,
          },
        }
      );

      setParksData((prevParksData) => [
        ...prevParksData,
        ...response.data.data,
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchParksData();
  }, [currentPage]);

  const nextPage = async () => {
    const nextPageStart = (currentPage + 1) * parksPerPage;

    if (nextPageStart >= parksData.length) {
      await fetchParksData();
    }

    setCurrentPage(currentPage + 1);
  };

  const lastPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <section className="ParksIndexPage">
      <h1>All Parks</h1>
      <div className="pagination-buttons">
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
      <div className="parks-list">
        {currentParks.map((park) => (
          <div
            className="park-element"
            key={park.id}
            style={{
              backgroundImage: `linear-gradient(transparent, #000000ca), url(${park.images[0].url})`,
            }}
          >
            <p className="name">{park.fullName}</p>
            <p className="state">{park.states.slice(0, 2)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
