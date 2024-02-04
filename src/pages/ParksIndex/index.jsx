import { useState, useEffect } from "react";
import { getParks } from "../../global/api";
import usePagination from "../../global/hooks/usePagination";
import Screen from "./screen";

export default function ParksIndex() {
  const [loading, setLoading] = useState(true);
  const [parks, setParks] = useState([]);
  const [stateInput, setStateInput] = useState("");
  const [keywordInput, setKeywordInput] = useState("");

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const data = await getParks();
        setParks(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        // TODO: Handle error toast.
      }
    };

    fetchParks();
  }, []);

  // Filter parks based on inputs.
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

  // Pagination setup.
  const parksPerPage = 20;
  const {
    currentPageData: displayedParks,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  } = usePagination(filteredParks, parksPerPage);

  // Handle input changes.
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "state") setStateInput(value);
    if (name === "keyword") setKeywordInput(value);
    goToPage(1);
  };

  return (
    <Screen
      loading={loading}
      stateInput={stateInput}
      keywordInput={keywordInput}
      onInputChange={handleInputChange}
      displayedParks={displayedParks}
      currentPage={currentPage}
      totalPages={totalPages}
      onPreviousPage={goToPreviousPage}
      onNextPage={goToNextPage}
    />
  );
}
