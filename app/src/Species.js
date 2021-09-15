import * as React from "react";

import * as apiClient from "./apiClient";

const Species = () => {
  const [species, setSpecies] = React.useState([]);

  const loadSpecies = async () => setSpecies(await apiClient.getSpecies());

  React.useEffect(() => {
    loadSpecies();
  }, []);
  return (
    <ul>
      {species.map(({ species_id, name, scientific_name }) => (
        <li key={species_id}>
          {name}: {scientific_name}{" "}
        </li>
      ))}
    </ul>
  );
};

export default Species;
