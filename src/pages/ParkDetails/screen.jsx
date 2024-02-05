import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  if (loading) {
    return <p>Loading...</p>; // TODO: Use loading spinner.
  }

  return (
    <div className="ParkDetails">
      <section>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
        <h1>{park.fullName}</h1>
        <p className="location">{park.states.split(",").join(", ")}</p>
        {/* <p className="location">{`${park.addresses[0].city}, ${park.addresses[0].stateCode}`}</p> */}
        {/* TODO Add images. (park.images) */}
        <div className="about">
          {/* <h3>About {park.name}</h3> */}
          <p>{park.description}</p>
        </div>
        {displayedActivities.length > 0 && (
          <div>
            <h3>Things To Do</h3>
            <div>
              <div className="things-to-do-list">
                {displayedActivities.map((activity) => (
                  <div className="things-to-do-element" key={activity.id}>
                    <a href={activity.url} target="_blank" rel="noreferrer">
                      <h4>{activity.title}</h4>
                    </a>
                    <p>{activity.shortDescription}</p>
                  </div>
                ))}
              </div>
              <div className="pagination">
                {currentPage > 1 && (
                  <button onClick={onPreviousPage}>Prev</button>
                )}
                {currentPage < totalPages && (
                  <button onClick={onNextPage}>Next</button>
                )}
              </div>
            </div>
          </div>
        )}
        <div>
          <h3>Activities</h3>
          <ul className="activities-list">
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
          <h3>Weather</h3>
          <p>{park.weatherInfo}</p>
        </div>
        <div>
          <h3>Address</h3>
          <p>{park.addresses[0].line1}</p>
          <p>{`${park.addresses[0].city}, ${park.addresses[0].stateCode} ${park.addresses[0].postalCode}`}</p>
        </div>
        <div>
          <h3>Directions</h3>
          <p>{park.directionsInfo}</p>
          <a href={park.directionsUrl} target="_blank" rel="noreferrer">
            More directions information
          </a>
        </div>
        <button className="plan-your-visit">
          <a
            href={`https://www.nps.gov/${parkCode}/planyourvisit/index.htm`}
            target="_blank"
            rel="noreferrer"
          >
            Plan Your Visit
          </a>
        </button>
      </section>
    </div>
  );
};
