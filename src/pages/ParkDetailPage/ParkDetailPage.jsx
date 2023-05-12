import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchParkData, fetchThingsToDoData } from "../../api/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ParkDetailPage.scss";

export default function ParkDetailPage() {
  const [parkData, setParkData] = useState(null);
  const [thingsToDoData, setThingsToDoData] = useState([]);
  const { parkCode } = useParams();

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

  return (
    <section className="ParkDetailPage">
      {parkData ? (
        <div>
          <h1>{parkData.fullName}</h1>
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
          <div>
            <h3>About {parkData.name}</h3>
            <p>{parkData.description}</p>
          </div>
          <div>
            <h3>Location</h3>
            <p>{parkData.states.split(",").join(", ")}</p>
          </div>
          <div>
            <h3>Things To Do</h3>
            {thingsToDoData ? (
              thingsToDoData.map((thingToDo) => {
                return (
                  <div key={thingToDo.id}>
                    <h4>{thingToDo.title}</h4>
                    <p>{thingToDo.shortDescription}</p>
                  </div>
                );
              })
            ) : (
              <p>None listed</p>
            )}
          </div>
          <div>
            <h3>Activities</h3>
            <ul>
              {parkData.activities.map((activity) => {
                return <li key={activity.id}>{activity.name}</li>;
              })}
            </ul>
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
          <button>
            <a
              href={`https://www.nps.gov/${parkCode}/planyourvisit/index.htm`}
              target="_blank"
            >
              Plan your visit
            </a>
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
}
