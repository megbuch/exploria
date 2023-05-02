import { useState, useEffect } from "react";
import "./ParksIndexPage.scss";
import axios from "axios";

export default function ParksIndexPage() {
  const [parksData, setParksData] = useState([]);

  useEffect(() => {
    axios
      .get("https://developer.nps.gov/api/v1/parks/", {
        headers: {
          "X-Api-Key": import.meta.env.VITE_NPS_API_KEY,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setParksData(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {parksData.map((park) => (
        <div key={park.id}>{park.fullName}</div>
      ))}
    </div>
  );
}
