import { useState, useEffect } from "react";
import { getParks } from "../../global/api";
import Screen from "./screen";

export default function ParksIndex() {
  const [loading, setLoading] = useState(true);
  const [parks, setParks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [stateInput, setStateInput] = useState("");
  const [keywordInput, setKeywordInput] = useState("");

  useEffect(() => {
    const fetchParks = async () => {
      const data = await getParks();
      setParks(data);
      setLoading(false);
    };

    fetchParks();
  }, []);

  const filteredParks = parks.filter((park) => {
    const matchesState = park.states
      .toLowerCase()
      .includes(stateInput.toLowerCase());
    const matchesSearch =
      park.fullName.toLowerCase().includes(keywordInput.toLowerCase()) ||
      park.description.toLowerCase().includes(keywordInput.toLowerCase()) ||
      park.activities.some((activity) =>
        activity.name.toLowerCase().includes(keywordInput.toLowerCase())
      );
    return matchesState && matchesSearch;
  });

  const parksPerPage = 20;
  const indexOfLastPark = currentPage * parksPerPage;
  const indexOfFirstPark = indexOfLastPark - parksPerPage;
  const displayedParks = filteredParks.slice(indexOfFirstPark, indexOfLastPark);

  const handlePagination = (pageNumber) => setCurrentPage(pageNumber);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "state") setStateInput(value);
    if (name === "keyword") setKeywordInput(value);
    setCurrentPage(1);
  };

  return (
    <Screen
      loading={loading}
      currentPage={currentPage}
      parksPerPage={parksPerPage}
      filteredParks={filteredParks}
      displayedParks={displayedParks}
      onPaginate={handlePagination}
      stateInput={stateInput}
      keywordInput={keywordInput}
      onInputChange={handleInputChange}
    />
  );
}
