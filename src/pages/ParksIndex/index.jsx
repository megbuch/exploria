import { useState } from "react";
import { useParks } from "../../global/hooks/useParks";
import { usePagination } from "../../global/hooks/usePagination";
import { mapStateCodeToName } from "../../data/stateMap";
import { ParksIndex as Screen } from "./screen";

export const ParksIndex = () => {
  const { parks, loading } = useParks();
  const [stateInput, setStateInput] = useState("");
  const [keywordInput, setKeywordInput] = useState("");

  // TODO: Need to store the current page and filter, and if someone returns from details, go to the page with the filter..

  // Check if inputs match a park.
  const isStateMatch = (park, stateInputLower) => {
    return park.states.split(",").some((code) => {
      const fullNameLower = mapStateCodeToName(code.trim()).toLowerCase();
      return (
        fullNameLower.includes(stateInputLower) ||
        code.trim().toLowerCase() === stateInputLower
      );
    });
  };

  const isKeywordMatch = (park, keywordInputLower) => {
    return (
      park.fullName.toLowerCase().includes(keywordInputLower) ||
      park.description.toLowerCase().includes(keywordInputLower) ||
      park.activities.some((activity) =>
        activity.name.toLowerCase().includes(keywordInputLower)
      )
    );
  };

  // Filter parks based on inputs.
  const filteredParks = parks.filter((park) => {
    const stateInputLower = stateInput.toLowerCase();
    const keywordInputLower = keywordInput.toLowerCase();
    const matchesState = isStateMatch(park, stateInputLower);
    const matchesSearch = isKeywordMatch(park, keywordInputLower);
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
      mapStateCodeToName={mapStateCodeToName}
    />
  );
};
