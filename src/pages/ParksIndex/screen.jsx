import { Link } from "react-router-dom";
import "./styles.scss";

export const ParksIndex = (props) => {
  const {
    loading,
    stateInput,
    keywordInput,
    onInputChange,
    displayedParks,
    currentPage,
    totalPages,
    onPreviousPage,
    onNextPage,
  } = props;

  if (loading) {
    return <p>Loading...</p>; // TODO: Use loading spinner.
  }

  return (
    <div id="ParksIndex">
      <h1>Explore Parks</h1>
      <div className="search-instructions">
        <h2>Search by state and keyword.</h2>
        <div className="inputs">
          <div>
            <input
              type="text"
              name="state"
              value={stateInput}
              onChange={onInputChange}
              placeholder="ca, wy, ak"
            />
            <label htmlFor="stateInput">State</label>
          </div>
          <div>
            <input
              type="text"
              name="keyword"
              value={keywordInput}
              onChange={onInputChange}
              placeholder="desert, beach, horseback riding, etc."
            />
            <label htmlFor="searchInput">Keyword</label>
          </div>
        </div>
      </div>
      <div className="pagination">
        {currentPage > 1 && <button onClick={onPreviousPage}>Prev</button>}
        {currentPage < totalPages && <button onClick={onNextPage}>Next</button>}
      </div>
      <div className="parks-list">
        {displayedParks.map((park) => (
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
    </div>
  );
};
