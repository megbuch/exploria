import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchParkData } from "../../api/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ParkDetailPage.scss";

export default function ParkDetailPage() {
  const [parkData, setParkData] = useState(null);
  const { parkCode } = useParams();

  useEffect(() => {
    const fetchSinglePark = async (parkCode) => {
      const data = await fetchParkData(parkCode);
      setParkData(data);
    };

    fetchSinglePark(parkCode);
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
          <p>Location: {parkData.states.split(",").join(", ")}</p>
          <p>{parkData.description}</p>
          <ul>
            {parkData.activities.map((activity) => {
              return <li key={activity.id}>{activity.name}</li>;
            })}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
}
