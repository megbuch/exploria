import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getParks } from "../../global/api";
import "./ParksIndexPage.scss";

export default function ParksIndexPage() {
  const [loading, setLoading] = useState([]);
  const [parks, setParks] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [stateInput, setStateInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const parksPerPage = 20;

  useEffect(() => {
    setLoading(true);
    // TODO: Add loading spinner while loading is true
    const fetchParks = async () => {
      const data = await getParks();
      setParks(data);
      console.log(parks);
    };
    fetchParks();
    setLoading(false);
  }, []);

  const handleStateFilter = (event) => {
    setStateInput(event.target.value);
    setCurrentPage(1);
  };

  const handleKeywordFilter = (event) => {
    setKeywordInput(event.target.value);
    setCurrentPage(1);
  };

  const filteredParks = parks.filter((park) => {
    const matchesState = park.states
      .toLowerCase()
      .includes(stateInput.toLowerCase());
    const matchesSearch =
      park.fullName.toLowerCase().includes(keywordInput.toLowerCase()) ||
      park.description.toLowerCase().includes(keywordInput.toLowerCase()) ||
      park.activities.some((activity) =>
        activity.name.toLowerCase().includes(keywordInput.toLowerCase())
      );
    return matchesState && matchesSearch;
  });

  const indexOfLastPark = currentPage * parksPerPage;
  const indexOfFirstPark = indexOfLastPark - parksPerPage;
  const currentParks = filteredParks.slice(indexOfFirstPark, indexOfLastPark);

  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <section className="ParksIndexPage">
      <h1>Explore Parks</h1>
      <div className="search-instructions">
        <h2>Search by state and keyword.</h2>
        <div className="inputs">
          <div>
            <input
              type="text"
              value={stateInput}
              onChange={handleStateFilter}
              placeholder="ca, wy, ak"
              name="stateInput"
            />
            <label htmlFor="stateInput">State</label>
          </div>
          <div>
            <input
              type="text"
              value={keywordInput}
              onChange={handleKeywordFilter}
              placeholder="desert, beach, horseback riding, etc."
              name="keywordInput"
            />
            <label htmlFor="searchInput">Keyword</label>
          </div>
        </div>
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
            <div className="park-element" key={park.id}>
              <img
                src={park.images[0].url}
                alt={park.fullName}
                loading="lazy"
              />
              <div className="content">
                <p className="name">{park.fullName}</p>
                <p className="state">{park.states.split(",").join(" ")}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
