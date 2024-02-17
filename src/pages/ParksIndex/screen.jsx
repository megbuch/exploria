import { Link } from "react-router-dom";
import { IoCaretForward } from "react-icons/io5";
import { IoCaretBack } from "react-icons/io5";
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
    mapStateCodeToName,
  } = props;

  if (loading) {
    return <p>Loading...</p>; // TODO: Use loading spinner.
  }

  return (
    <div className="page-content" id="ParksIndex">
      <div className="header">
        <h1>Explore Parks</h1>
        <h2>Search by state and keyword.</h2>
        <div className="inputs-nav-container">
          <div className="inputs">
            <div>
              <input
                type="text"
                name="state"
                value={stateInput}
                onChange={onInputChange}
                placeholder="ca, wy, ak, utah, north carolina"
              />
              <label htmlFor="stateInput">State Name or Code</label>
            </div>
            <div>
              <input
                type="text"
                name="keyword"
                value={keywordInput}
                onChange={onInputChange}
                placeholder="desert, volcano, horseback riding"
              />
              <label htmlFor="searchInput">Keyword</label>
            </div>
          </div>
          <div className="nav">
            {currentPage > 1 && (
              <button className="icon flat" onClick={onPreviousPage}>
                <IoCaretBack />
              </button>
            )}
            {currentPage < totalPages && (
              <button className="icon flat" onClick={onNextPage}>
                <IoCaretForward />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="parks-list">
        {displayedParks.map((park) => (
          <Link to={`/parks/${park.parkCode}`} key={park.id}>
            <div className="park-card">
              <img
                key={park.id}
                src={park.images[0].url}
                alt={park.fullName}
                loading="lazy"
              />
              <div className="content">
                <p className="name">{park.fullName}</p>
                <p className="state">
                  {park.states
                    .split(",")
                    .map((code) => mapStateCodeToName(code))
                    .join(", ")}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
