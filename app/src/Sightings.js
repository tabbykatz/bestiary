import * as React from "react";

import * as apiClient from "./apiClient";

const Sightings = () => {
  const [sightings, setSightings] = React.useState([]);

  const getSightings = () => apiClient.getSightings().then(setSightings);
  React.useEffect(() => {
    getSightings();
  }, []);

  return (
    <ul>
      {sightings.map(
        ({
          sighting_id,
          time_sighted,
          specimen_id,
          healthy,
          email,
          location,
        }) => (
          <li key={sighting_id}>
            {time_sighted} : {location}
          </li>
        ),
      )}
    </ul>
  );
};

export default Sightings;
