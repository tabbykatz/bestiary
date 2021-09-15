import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

//get all species
export const getSpecies = async () => await db.any("SELECT * FROM species");
// get species by ID
export const getSpeciesById = (id) => {
  const sql = `SELECT * from species WHERE species_id = $<id> 
  `;
  return db.one(sql, { id });
};
// add a new species
export const addSpecies = async ({ name, sci_name, code, added }) =>
  (
    await db.any(
      "INSERT INTO species(name, scientific_name, code, added) VALUES($1) RETURNING species_id, name",
      [name, sci_name, code, added],
    )
  )[0];
// delete species
export const deleteSpecies = (speciesId) =>
  db.none("DELETE FROM species WHERE species_id = ${speciesId}", { speciesId });

//get all specimens
export const getSpecimens = async () => await db.any("SELECT * FROM specimens");
// get specimen by ID
export const getSpecimenById = (id) => {
  const sql = `SELECT * from specimens WHERE specimen_id = $<id> 
  `;
  return db.one(sql, { id });
};
// add a new specimen
export const addSpecimen = async ({ name, species_id, added }) =>
  (
    await db.any(
      "INSERT INTO specimens(name, species_id, added) VALUES($1) RETURNING specimen_id, name",
      [name, species_id, added],
    )
  )[0];
// delete specimen
export const deleteSpecimen = (specimenId) =>
  db.none("DELETE FROM specimens WHERE specimen_id = ${specimenId}", {
    specimenId,
  });

//get all sightings
export const getSightings = async () => await db.any("SELECT * FROM sightings");
// get sighting by ID
export const getSightingById = (id) => {
  const sql = `SELECT * from sightings WHERE sighting_id = $<id> 
  `;
  return db.one(sql, { id });
};
// add a new sighting
export const addSighting = async ({
  date,
  specimen_id,
  healthy,
  email,
  location,
}) =>
  (
    await db.any(
      "INSERT INTO sightings(date, specimen_id, healthy, email, location) VALUES($1) RETURNING sighting_id",
      [date, specimen_id, healthy, email, location],
    )
  )[0];
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
