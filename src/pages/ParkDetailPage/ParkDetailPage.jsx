import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchParkData, fetchThingsToDoData } from "../../api/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ParkDetailPage.scss";

export default function ParkDetailPage() {
  const { parkCode } = useParams();
  const [parkData, setParkData] = useState(null);
  const [thingsToDoData, setThingsToDoData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showAllActivities, setShowAllActivities] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchParkPromise = fetchParkData(parkCode);
      const fetchThingsToDoPromise = fetchThingsToDoData(parkCode);

      const [parkData, thingsToDoData] = await Promise.all([
        fetchParkPromise,
        fetchThingsToDoPromise,
      ]);

      setParkData(parkData);
      setThingsToDoData(thingsToDoData);
      console.log(thingsToDoData);
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
  const currentThingsToDo = thingsToDoData
    ? thingsToDoData.slice(startIndex, endIndex)
    : [];

  return (
    <div className="ParkDetailPage">
      {parkData ? (
        <section>
          <h1>{parkData.fullName}</h1>
          <p className="location">{parkData.states.split(",").join(", ")}</p>

          {parkData.images.length > 1 ? (
            <Slider
              className="carousel"
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
            >
              {parkData.images.map((image, index) => {
                return <img src={image.url} key={index} alt={image.altText} />;
              })}
            </Slider>
          ) : (
            <img src={parkData.images[0].url} />
          )}

          <div className="about">
            <h3>About {parkData.name}</h3>
            <p>{parkData.description}</p>
          </div>
          <div>
            <h3>Things To Do</h3>
            {currentThingsToDo.length > 0 ? (
              <div>
                <div className="things-to-do-list">
                  {currentThingsToDo.map((thingToDo) => (
                    <div className="things-to-do-element" key={thingToDo.id}>
                      <a href={thingToDo.url} target="_blank">
                        <h4>{thingToDo.title}</h4>
                      </a>
                      <p>{thingToDo.shortDescription}</p>
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
                    disabled={endIndex >= thingsToDoData.length}
                    className={
                      endIndex >= thingsToDoData.length ? "disabled" : ""
                    }
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
                ? parkData.activities.map((activity) => {
                    return <li key={activity.id}>{activity.name}</li>;
                  })
                : parkData.activities.slice(0, 5).map((activity) => {
                    return <li key={activity.id}>{activity.name}</li>;
                  })}
            </ul>
            <a onClick={toggleShowActivities}>
              {showAllActivities ? "Show Less" : "Show More"}
            </a>
          </div>
          <div>
            <h3>Weather</h3>
            <p>{parkData.weatherInfo}</p>
          </div>
          <div>
            <h3>Directions</h3>
            <p>{parkData.directionsInfo}</p>
            <a href={parkData.directionsUrl} target="_blank">
              More directions information
            </a>
          </div>
          <button className="plan-your-visit">
            <a
              href={`https://www.nps.gov/${parkCode}/planyourvisit/index.htm`}
              target="_blank"
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
