import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ParkDetailPage.scss";

export default function ParkDetailPage() {
  const [parkData, setParkData] = useState(null);
  const { parkCode } = useParams();

  const fetchParkData = async () => {
    try {
      const response = await axios.get(
        `https://developer.nps.gov/api/v1/parks/?parkCode=${parkCode}`,
        {
          headers: {
            "X-Api-Key": import.meta.env.VITE_NPS_API_KEY,
            "Content-Type": "application/json",
          },
          params: {
            parkCode: parkCode,
          },
        }
      );
      const parks = response.data.data;
      const selectedPark = parks.find((park) => park.parkCode === parkCode);
      setParkData(selectedPark);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchParkData();
  }, [parkCode]);

  console.log(parkData);

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
              {parkData.images.map((image) => {
                return <img src={image.url} />;
              })}
            </Slider>
          ) : (
            <img src={parkData.images[0].url} />
          )}
          <p>Location: {parkData.states.split(",").join(", ")}</p>
          <h2>{parkData.description}</h2>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
}
