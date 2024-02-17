import { Link, useLocation } from "react-router-dom";
import { Carousel } from "../../components/Carousel/index";
import { mapStateCodeToName } from "../../data/stateMap";
import { IoCaretForward } from "react-icons/io5";
import { IoCaretBack } from "react-icons/io5";
import "./styles.scss";

export const ParkDetails = (props) => {
  const {
    loading,
    park,
    parkCode,
    displayedActivities,
    currentPage,
    totalPages,
    onPreviousPage,
    onNextPage,
  } = props;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const state = queryParams.get("state");
  const keyword = queryParams.get("keyword");
  const page = queryParams.get("page") || 1;

  const processParkImages = (park) => {
    return park.images.map((image) => ({ image: image.url }));
  };

  if (loading) {
    return <p>Loading...</p>; // TODO: Use loading spinner.
  }

  return (
    <>
      <Carousel items={processParkImages(park)} overlay={false} />
      <div className="page-content" id="ParkDetails">
        <Link to={`/parks?state=${state}&keyword=${keyword}&page=${page}`}>
          Back to your search
        </Link>
        <h1>{park.fullName}</h1>
        <p className="states">
          {park.states
            .split(",")
            .map((state) => mapStateCodeToName(state))
            .join(", ")}
        </p>
        <p>{park.description}</p>
        {displayedActivities.length > 0 && (
          <div className="surface-ctr">
            <div className="row">
              <h2>Things To Do</h2>
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
            {displayedActivities.map((activity) => (
              <div key={activity.id}>
                <a href={activity.url} target="_blank" rel="noreferrer">
                  <h4>{activity.title}</h4>
                </a>
                <p>{activity.shortDescription}</p>
              </div>
            ))}
          </div>
        )}
        <div className="activities">
          <h2>Activities</h2>
          <ul>
            {park.activities
              .sort((a, b) => {
                return a.name.localeCompare(b.name);
              })
              .map((activity) => {
                return <li key={activity.id}>{activity.name}</li>;
              })}
          </ul>
        </div>
        <div>
          <h2>Weather</h2>
          <p>{park.weatherInfo}</p>
        </div>
        <div>
          <h2>Address</h2>
          <p>{park.addresses[0].line1}</p>
          <p>{`${park.addresses[0].city}, ${park.addresses[0].stateCode} ${park.addresses[0].postalCode}`}</p>
        </div>
        <div>
          <h2>Directions</h2>
          <p>{park.directionsInfo}</p>
          <a href={park.directionsUrl} target="_blank" rel="noreferrer">
            More directions information
          </a>
        </div>
        <Link
          to={`https://www.nps.gov/${parkCode}/planyourvisit/index.htm`}
          key={park.id}
          target="_blank"
          className="button"
        >
          Plan Your Visit
        </Link>
      </div>
    </>
  );
};
