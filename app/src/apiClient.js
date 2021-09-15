// species
export const getSpecies = () => _get("/api/species");

export const getSpeciesById = (id) => _get(`/api/species/${id}`);

export const addSpecies = (species) => _post("/api/species", species);

export const deleteSpecies = (speciesId) =>
  _delete(`/api/species/${speciesId}`);

// specimens
export const getSpecimens = () => _get("/api/specimens");

export const getSpecimenById = (id) => _get(`/api/specimens/${id}`);

export const addSpecimen = (specimen) => _post("/api/specimens", specimen);

export const deleteSpecimen = (specimenId) =>
  _delete(`/api/specimens/${specimenId}`);

// sightings
export const getSightings = () => _get("/api/sightings");

export const getSightingById = (id) => _get(`/api/sightings/${id}`);

export const addSighting = (sighting) => _post("/api/signtings", sighting);

export const deleteSighting = (sightingId) =>
  _delete(`/api/sightings/${sightingId}`);

// wrappers
const _get = async (url) => (await fetch(url)).json();
const _delete = (url) => fetch(url, { method: "DELETE" });
const _post = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let result;
  try {
    result = await response.json();
  } catch {}

  return result;
};
