import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParks } from "../../global/hooks/useParks";
import { usePagination } from "../../global/hooks/usePagination";
import { mapStateCodeToName } from "../../data/stateMap";
import { ParksIndex as Screen } from "./screen";

export const ParksIndex = () => {
  const location = useLocation();
  const { parks, loading } = useParks();
  const [stateInput, setStateInput] = useState("");
  const [keywordInput, setKeywordInput] = useState("");

  // Check if inputs match a park.
  const isStateMatch = (park, state) => {
    return park.states.split(",").some((code) => {
      const fullNameLower = mapStateCodeToName(code.trim()).toLowerCase();
      return (
        fullNameLower.includes(state) || code.trim().toLowerCase() === state
      );
    });
  };

  const isKeywordMatch = (park, keyword) => {
    return (
      park.fullName.toLowerCase().includes(keyword) ||
      park.description.toLowerCase().includes(keyword) ||
      park.activities.some((activity) =>
        activity.name.toLowerCase().includes(keyword)
      )
    );
  };

  // Filter parks based on inputs.
  const filteredParks = parks.filter((park) => {
    const matchesState = isStateMatch(park, stateInput.toLowerCase());
    const matchesSearch = isKeywordMatch(park, keywordInput.toLowerCase());
    return matchesState && matchesSearch;
  });

  // const filteredParks = parks;

  // Pagination setup.
  const parksPerPage = 12;
  const {
    currentPageData: displayedParks,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  } = usePagination(filteredParks, parksPerPage);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const state = queryParams.get("state");
    const keyword = queryParams.get("keyword");
    const page = parseInt(queryParams.get("page"), 10);
    page && goToPage(queryParams.get("page"));

    if (!state && !keyword) return;
    state && setStateInput(queryParams.get("state"));
    keyword && setKeywordInput(queryParams.get("keyword"));
  }, []);

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
      resultsSize={filteredParks.length}
      stateInput={stateInput}
      setStateInput={setStateInput}
      keywordInput={keywordInput}
      setKeywordInput={setKeywordInput}
      onInputChange={handleInputChange}
      displayedParks={displayedParks}
      currentPage={currentPage}
      totalPages={totalPages}
      onPreviousPage={goToPreviousPage}
      onNextPage={goToNextPage}
      goToPage={goToPage}
      mapStateCodeToName={mapStateCodeToName}
    />
  );
};
