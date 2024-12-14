import React, { useState, useEffect } from "react";

const SeasonAndTimeComponent = () => {
  const [seasonId, setSeasonId] = useState("");

  useEffect(() => {
    const getSeasonAndTime = () => {
      const now = new Date();
      const month = now.getMonth() + 1; // Months are 0-indexed in JS
      const hour = now.getHours();

      // Determine the season
      const season =
        month === 12 || month === 1 || month === 2
          ? "w" // Winter
          : month >= 3 && month <= 5
          ? "sp" // Spring
          : month >= 6 && month <= 8
          ? "sd" // Summer
          : "f"; // Fall

      // Determine day or night
      const timeOfDay = hour >= 6 && hour < 18 ? "d" : "n";

      // Combine to form the ID
      return `${season}${timeOfDay}`;
    };

    // Update the state with the calculated ID
    setSeasonId(getSeasonAndTime());

    // Optional: Recalculate every minute to account for time changes
    const interval = setInterval(() => setSeasonId(getSeasonAndTime()), 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div id={seasonId}>
    </div>
  );
};

export default SeasonAndTimeComponent;
