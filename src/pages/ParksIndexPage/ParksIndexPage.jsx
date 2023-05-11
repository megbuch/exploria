import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ParksIndexPage.scss";
import axios from "axios";

export default function ParksIndexPage() {
  const [parksData, setParksData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchParksData = async () => {
      try {
        const response = await axios.get(
          "https://developer.nps.gov/api/v1/parks/",
          {
            headers: {
              "X-Api-Key": import.meta.env.VITE_NPS_API_KEY,
              "Content-Type": "application/json",
            },
            params: {
              q: searchQuery,
            },
          }
        );

        setParksData(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchParksData();
  }, [searchQuery]);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredParks = parksData.filter(
    (park) =>
      park.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      park.states.toLowerCase().includes(searchQuery.toLowerCase()) ||
      park.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="ParksIndexPage">
      <h1>Explore Parks</h1>

      <div className="search-instructions">
        <h2>Search by state code, keyword, or park name</h2>
        <p>
          Examples: CA, OR, AK, bison, fishing, glacier, desert, Yosemite...
        </p>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="Search"
        />
      </div>

      <div className="parks-list">
        {filteredParks.map((park) => (
          <Link to={`/parks/${park.parkCode}`} key={park.id}>
            <div
              className="park-element"
              key={park.id}
              style={{
                backgroundImage: `linear-gradient(transparent, #000000ca), url(${park.images[0].url})`,
              }}
            >
              <p className="name">{park.fullName}</p>
              <p className="state">{park.states.split(",").join(" ")}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
