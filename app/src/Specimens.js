import * as React from "react";

import * as apiClient from "./apiClient";

const Specimens = () => {
  const [specimens, setSpecimens] = React.useState([]);

  const getSpecimens = () => apiClient.getSpecimens().then(setSpecimens);
  React.useEffect(() => {
    getSpecimens();
  }, []);

  return (
    <ul>
      {specimens.map(({ specimen_id, name, species_id }) => (
        <li key={specimen_id}>
          {name} | {species_id}
        </li>
      ))}
    </ul>
  );
};

export default Specimens;
