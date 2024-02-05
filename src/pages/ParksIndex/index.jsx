import { useState } from "react";
import { useParks } from "../../hooks/useParks";
import { usePagination } from "../../hooks/usePagination";
import { ParksIndex as Screen } from "./screen";

export const ParksIndex = () => {
  const { parks, loading } = useParks();
  const [stateInput, setStateInput] = useState("");
  const [keywordInput, setKeywordInput] = useState("");

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
};
