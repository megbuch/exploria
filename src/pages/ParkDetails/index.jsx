import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPark, getActivities } from "../../global/api";
import { usePagination } from "../../hooks/usePagination";
import { ParkDetails as Screen } from "./screen";

export const ParkDetails = () => {
  const [loading, setLoading] = useState(true);
  const { parkCode } = useParams();
  const [park, setPark] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchPark = async () => {
      try {
        const [parkData, activitiesData] = await Promise.all([
          getPark(parkCode),
          getActivities(parkCode),
        ]);
        setPark(parkData[0]);
        setActivities(activitiesData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        // TODO: Handle error toast.
      }
    };
    fetchPark();
  }, [parkCode]);

  // Pagination setup.
  const activitiesPerPage = 4;
  const {
    currentPageData: displayedActivities,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
  } = usePagination(activities, activitiesPerPage);

  return (
    <Screen
      loading={loading}
      park={park}
      parkCode={parkCode}
      activities={activities}
      displayedActivities={displayedActivities}
      currentPage={currentPage}
      totalPages={totalPages}
      onPreviousPage={goToPreviousPage}
      onNextPage={goToNextPage}
    />
  );
};
