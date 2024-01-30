import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPark, getActivities } from "../../global/api";
import "./ParkDetailPage.scss";

export default function ParkDetailPage() {
  const { parkCode } = useParams();
  const [park, setPark] = useState(null);
  const [activities, setActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showAllActivities, setShowAllActivities] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [parkData, activitiesData] = await Promise.all([
          getPark(parkCode),
          getActivities(parkCode),
        ]);
        setPark(parkData);
        setActivities(activitiesData);
      } catch (error) {
        console.error(error);
        // TODO: Handle error with a toast
      }
    };
    fetchData();
  }, [parkCode]);

  function handlePrevPage() {
    setCurrentPage((prevPage) => prevPage - 1);
  }

  function handleNextPage() {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  function toggleShowActivities() {
    setShowAllActivities(!showAllActivities);
  }

  const itemsPerPage = 4;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentActivities = activities
    ? activities.slice(startIndex, endIndex)
    : [];

  return (
    <div className="ParkDetailPage">
      {park ? (
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
            {currentActivities.length > 0 ? (
              <div>
                <div className="things-to-do-list">
                  {currentActivities.map((activity) => (
                    <div className="things-to-do-element" key={activity.id}>
                      <a href={activity.url} target="_blank" rel="noreferrer">
                        <h4>{activity.title}</h4>
                      </a>
                      <p>{activity.shortDescription}</p>
                    </div>
                  ))}
                </div>
                <div className="pagination">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                    className={currentPage === 0 ? "disabled" : ""}
                  >
                    Prev
                  </button>
                  <button
                    onClick={handleNextPage}
                    disabled={endIndex >= activities.length}
                    className={endIndex >= activities.length ? "disabled" : ""}
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : (
              <p>None listed</p>
            )}
          </div>
          <div>
            <h3>Activities</h3>
            <ul className="activities-list">
              {showAllActivities
                ? park.activities.map((activity) => {
                    return <li key={activity.id}>{activity.name}</li>;
                  })
                : park.activities.slice(0, 5).map((activity) => {
                    return <li key={activity.id}>{activity.name}</li>;
                  })}
            </ul>
            <a onClick={toggleShowActivities}>
              {showAllActivities ? "Show Less" : "Show More"}
            </a>
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
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
