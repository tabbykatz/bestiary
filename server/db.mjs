import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

// do some joining because Good Girl
export const getJoined = async () =>
  await db.any(
    "SELECT DISTINCT ON (specimens.name) specimens.name AS nickname, specimens.url AS url, species.name AS species, sightings.location AS recent_sightings FROM specimens INNER JOIN species ON specimens.species_id = species.species_id INNER JOIN sightings ON sightings.specimen_id = specimens.specimen_id",
  );
///SPECIES
//get all species
export const getSpecies = async () => await db.any("SELECT * FROM species");
// get species by ID
// export const getSpeciesById = (id) => {
//   const sql = "SELECT * from species WHERE species_id = ${id}";
//   return db.one(sql, { id });
//};
// add a new species
export const addSpecies = async ({ name, scientific_name, code, added }) =>
  await db.none(
    "INSERT INTO species(name, scientific_name, code, added) VALUES($1, $2, $3, $4)",
    [name, scientific_name, code, added],
  );
// delete species when i understand cascade
// export const deleteSpecies = (speciesId) =>
//   db.none("DELETE FROM species WHERE species_id = ${speciesId}", { speciesId });

///SPECIMENS
//get all specimens
export const getSpecimens = async () => await db.any("SELECT * FROM specimens");
// get specimen by ID because everyone loves remembering randomly assigned IDs
// export const getSpecimenById = (id) => {
//   const sql = `SELECT * from specimens WHERE specimen_id = $<id>
//   `;
//   return db.one(sql, { id });
// };
// add a new specimen
export const addSpecimen = async ({ name, species_id, added, url }) =>
  (
    await db.any(
      "INSERT INTO specimens(name, species_id, added, url) VALUES($1, $2, $3, $4)",
      [name, species_id, added, url],
    )
  )[0];
// delete specimen not possible without cascade?
// export const deleteSpecimen = (specimenId) =>
//   db.none("DELETE FROM specimens WHERE specimen_id = ${specimenId}", {
//     specimenId
//   });
///SIGHTINGS
//get all sightings
export const getSightings = async () => await db.any("SELECT * FROM sightings");
// get sighting by ID why would I ever do this
// export const getSightingById = (id) => {
//   const sql = `SELECT * from sightings WHERE sighting_id = $<id>
//   `;
//   return db.one(sql, { id });
// };
// add a new sighting
export const addSighting = async ({
  time_sighted,
  specimen_id,
  healthy,
  email,
  location,
}) =>
  await db.any(
    "INSERT INTO sightings(time_sighted, specimen_id, healthy, email, location) VALUES($1, $2, $3, $4, $5)",
    [time_sighted, specimen_id, healthy, email, location],
  );
// delete sighting
export const deleteSighting = (sightingId) =>
  db.none("DELETE FROM sightings WHERE sighting_id = ${sightingId}", {
    sightingId,
  });

// db stuff
function initDb() {
  let connection;

  if (process.env.DATABASE_URL === undefined) {
    dotenv.config({ path: "../.env" });
    connection = {
      user: "postgres",
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: 5442,
    };
  } else {
    connection = {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };
  }

  return pgp()(connection);
}
