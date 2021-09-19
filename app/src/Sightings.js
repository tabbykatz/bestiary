import * as React from "react";

import * as apiClient from "./apiClient";

const Sightings = ({ sightings, getSightings }) => {
  const addSighting = (sighting) =>
    apiClient.addSighting(sighting).then(getSightings);

  const deleteSighting = (id) => {
    console.log(id);
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
          Specimen ID
          <input name="specimen_id" required />
        </label>
        <label>
          Healthy?
          <input name="healthy" required />
        </label>
        <label>
          Email
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
              {time_sighted}: {location}
              <button onClick={() => deleteSighting(sighting_id)}>
                Delete
              </button>
            </li>
          ),
        )}
      </ul>
      <AddSightingForm addSighting={addSighting} />
    </>
  );
};

export default Sightings;
