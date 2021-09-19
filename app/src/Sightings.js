import * as React from "react";

import * as apiClient from "./apiClient";

const Sightings = ({ sightings, getSightings, specimens }) => {
  const addSighting = (sighting) =>
    apiClient.addSighting(sighting).then(getSightings);

  const deleteSighting = (id) => {
    apiClient.deleteSighting(id).then(getSightings);
  };

  React.useEffect(() => {
    getSightings();
  }, []);

  const AddSightingForm = ({ addSighting }) => {
    const onSubmit = (event) => {
      const form = event.currentTarget;
      const time_sighted = new Date().toISOString().slice(0, 10);
      const {
        specimen_id: { value: specimen_id },
        healthy: { value: healthy },
        email: { value: email },
        location: { value: location },
      } = form.elements;

      event.preventDefault();
      console.log(time_sighted, specimen_id, healthy, email, location);
      addSighting({ time_sighted, specimen_id, healthy, email, location });
      form.reset();
    };

    return (
      <form {...{ onSubmit }}>
        <label>
          Specimen
          <select name="specimen_id" required>
            {specimens.map((specimen) => (
              <option key={specimen.specimen_id} value={specimen.specimen_id}>
                {specimen.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Healthy?
          <select name="healthy" required>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </label>
        <label>
          Sighter's Email
          <input name="email" type="email" required />
        </label>
        <label>
          Location
          <input name="location" required />
        </label>
        <button>Add new sighting</button>
      </form>
    );
  };

  return (
    <>
      <table>
        {sightings.map(
          ({
            sighting_id,
            time_sighted,
            specimen_id,
            healthy,
            email,
            location,
          }) => (
            <tr key={sighting_id}>
              <td>{specimen_id}</td>
              <td>{location}</td>
              <td>{healthy ? "healthy" : "unhealthy"}</td>
              <td>{time_sighted}</td>
              <td>
                <button onClick={deleteSighting}>Delete</button>
              </td>
            </tr>
          ),
        )}
      </table>
      <AddSightingForm addSighting={addSighting} />
    </>
  );
};

export default Sightings;
