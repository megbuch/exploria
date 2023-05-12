import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchParksData } from "../../api/api";
import "./ParksIndexPage.scss";

export default function ParksIndexPage() {
  const [parksData, setParksData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const parksPerPage = 20;

  useEffect(() => {
    const fetchAllParks = async (searchQuery) => {
      const data = await fetchParksData(searchQuery);
      setParksData((prevData) => {
        const newData = [...prevData, ...data];
        const uniqueData = Array.from(
          new Set(newData.map((park) => park.id))
        ).map((id) => newData.find((park) => park.id === id));
        return uniqueData;
        //this avoids duplicate keys due to multiple API calls
      });
    };

    fetchAllParks(searchQuery);
  }, [searchQuery]);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredParks = parksData.filter(
    (park) =>
      park.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      park.states.toLowerCase().includes(searchQuery.toLowerCase()) ||
      park.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      park.activities.some((activity) =>
        activity.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const indexOfLastPark = currentPage * parksPerPage;
  const indexOfFirstPark = indexOfLastPark - parksPerPage;
  const currentParks = filteredParks.slice(indexOfFirstPark, indexOfLastPark);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="ParksIndexPage">
      <h1>Explore Parks</h1>

      <div className="search-instructions">
        <h2>Search by state code, park name, activity, or keyword</h2>
        <p>
          Examples: CA, OR, AK, Yellowstone, horseback riding, stargazing,
          glacier, desert..
        </p>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="Search"
        />
      </div>
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => paginate(currentPage - 1)}>Prev</button>
        )}
        {currentPage < Math.ceil(filteredParks.length / parksPerPage) && (
          <button onClick={() => paginate(currentPage + 1)}>Next</button>
        )}
      </div>
      <div className="parks-list">
        {currentParks.map((park) => (
          <Link to={`/parks/${park.parkCode}`} key={park.id}>
            <div
              className="park-element"
              key={park.id}
              style={{
                backgroundImage: `linear-gradient(transparent, #000000ca), url(${park.images[0].url})`,
              }}
            >
              <p className="name">{park.fullName}</p>
              <p className="state">{park.states.split(",").join(" ")}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
