import * as React from "react";

import * as apiClient from "./apiClient";

const Specimens = () => {
  const [specimens, setSpecimens] = React.useState([]);

  const getSpecimens = () => apiClient.getSpecimens().then(setSpecimens);
  React.useEffect(() => {
    getSpecimens();
  }, []);

  const addSpecimen = (specimen) =>
    apiClient.addSpecimen(specimen).then(getSpecimens);

  const AddSpecimenForm = ({ addSpecimen }) => {
    const onSubmit = (event) => {
      const form = event.currentTarget;
      const added = new Date().toISOString().slice(0, 10);
      const {
        name: { value: name },
        species_id: { value: species_id },
      } = form.elements;

      event.preventDefault();
      console.log(name, species_id, added);
      addSpecimen({ name, species_id, added });
      form.reset();
    };

    return (
      <form {...{ onSubmit }}>
        <label>
          Nickname
          <input name="name" required />
        </label>
        <label>
          Species ID
          <input name="species_id" required />
        </label>
        <button>Add new specimen</button>
      </form>
    );
  };

  return (
    <>
      <ul>
        {specimens.map(({ specimen_id, name, species_id }) => (
          <li key={specimen_id}>
            ID: {specimen_id} Nickname: {name} Species: {species_id}
          </li>
        ))}
      </ul>
      <AddSpecimenForm addSpecimen={addSpecimen} />
    </>
  );
};

export default Specimens;
