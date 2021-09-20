import * as React from "react";

import * as apiClient from "./apiClient";

const Specimens = ({ specimens, getSpecimens, speciesInfo }) => {
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
        url: { value: url },
      } = form.elements;

      event.preventDefault();
      addSpecimen({ name, species_id, added, url });
      form.reset();
    };

    return (
      <form {...{ onSubmit }}>
        <label>
          Nickname
          <input name="name" required />
        </label>
        <label>
          Species?
          <select name="species_id">
            {speciesInfo.map((species) => (
              <option key={species.species_id} value={species.species_id}>
                {species.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Image URL
          <input name="url" type="url" required />
        </label>
        <button>Add new specimen</button>
      </form>
    );
  };

  return (
    <>
      <table>
        <tbody>
          {specimens.map(({ specimen_id, name, species_id, added, url }) => (
            <tr key={specimen_id}>
              <td>{name}</td>
              <td>{species_id}</td>
              <td>{added}</td>
              <td>{url ? <a href={url}>image</a> : "n/a"}</td>
              <td>{added}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddSpecimenForm addSpecimen={addSpecimen} />
    </>
  );
};

export default Specimens;
