import { Link } from "react-router-dom";
import { IoCaretForward } from "react-icons/io5";
import { IoCaretBack } from "react-icons/io5";
import "./styles.scss";

export const ParksIndex = (props) => {
  const {
    loading,
    resultsSize,
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
        <p>{`${resultsSize} results`}</p>
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
        {displayedParks.map((park) => {
          const statesList = park.states
            .split(",")
            .map((code) => mapStateCodeToName(code));
          const displayedStatesCount = 6;
          const displayedStates =
            statesList.length > displayedStatesCount
              ? statesList.slice(0, 6)
              : statesList;
          const remainingStateCount =
            statesList.length > displayedStatesCount
              ? statesList.length - displayedStatesCount
              : 0;
          console.log(statesList.length, displayedStatesCount);
          return (
            <Link
              to={`/parks/${park.parkCode}?state=${encodeURIComponent(
                stateInput
              )}&keyword=${encodeURIComponent(
                keywordInput
              )}&page=${currentPage}`}
              key={park.id}
            >
              <div className="park-card">
                <img
                  key={park.id}
                  src={park.images[0].url}
                  alt={park.fullName}
                  loading="lazy"
                />
                <div className="content">
                  <p className="name">{park.fullName}</p>
                  <p className="subtitle">{displayedStates.join(", ")}</p>
                  {statesList.length > displayedStatesCount && (
                    <p className="subtitle">{` + ${remainingStateCount} more`}</p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
