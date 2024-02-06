import { useState, useMemo } from "react";

export const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentPageData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage, data]);

  const goToNextPage = () =>
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const goToPreviousPage = () =>
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  const goToPage = (pageNumber) => setCurrentPage(pageNumber);

  return {
    currentPage,
    totalPages,
    currentPageData,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  };
};
