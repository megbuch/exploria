// import { useState } from "react";
import "./styles.scss";

export default function ParkDetails(props) {
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

  // const [showAllActivities, setShowAllActivities] = useState(false);
  // function toggleShowActivities() {
  //   setShowAllActivities(!showAllActivities);
  // }

  if (loading) {
    return <p>Loading...</p>; // TODO: Use loading spinner.
  }

  return (
    <div className="ParkDetails">
      <section>
        <h1>{park.fullName}</h1>
        <p className="location">{park.states.split(",").join(", ")}</p>
        {/* TODO Add images. (park.images) */}
        <div className="about">
          <h3>About {park.name}</h3>
          <p>{park.description}</p>
        </div>
        <div>
          <h3>Things To Do</h3>
          {displayedActivities.length > 0 ? (
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
          ) : (
            <p>None listed</p>
          )}
        </div>
        <div>
          <h3>Activities</h3>
          <ul className="activities-list">
            {park.activities.map((activity) => {
              return <li key={activity.id}>{activity.name}</li>;
            })}
            {/* {showAllActivities
              ? park.activities.map((activity) => {
                  return <li key={activity.id}>{activity.name}</li>;
                })
              : park.activities.slice(0, 5).map((activity) => {
                  return <li key={activity.id}>{activity.name}</li>;
                })} */}
          </ul>
          {/* <a onClick={toggleShowActivities}>
            {showAllActivities ? "Show Less" : "Show More"}
          </a> */}
        </div>
        <div>
          <h3>Weather</h3>
          <p>{park.weatherInfo}</p>
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
}
