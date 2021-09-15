import * as React from "react";

import * as apiClient from "./apiClient";

const Species = () => {
  const [species, setSpecies] = React.useState([]);

  const getSpecies = () => apiClient.getSpecies().then(setSpecies);
  React.useEffect(() => {
    getSpecies();
  }, []);

  const addSpecies = (species) =>
    apiClient.addSpecies(species).then(getSpecies);

  const AddSpeciesForm = ({ addSpecies }) => {
    const onSubmit = (event) => {
      const form = event.currentTarget;
      const added = new Date().toISOString().slice(0, 10);
      const {
        name: { value: name },
        scientific_name: { value: scientific_name },
        code: { value: code },
      } = form.elements;

      event.preventDefault();
      console.log(name, scientific_name, code, added);
      addSpecies({ name, scientific_name, code, added });
      form.reset();
    };

    return (
      <form {...{ onSubmit }}>
        <label>
          Common name
          <input name="name" required />
        </label>
        <label>
          Scientific name
          <input name="scientific_name" required />
        </label>
        <label>
          Code
          <input name="code" required />
        </label>
        <button>Add new species</button>
      </form>
    );
  };

  return (
    <>
      <ul>
        {species.map(({ species_id, name, scientific_name }) => (
          <li key={species_id}>
            {name}: {scientific_name}{" "}
          </li>
        ))}
      </ul>
      <AddSpeciesForm addSpecies={addSpecies} />
    </>
  );
};

export default Species;
