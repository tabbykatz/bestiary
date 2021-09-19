import * as React from "react";

import "./global.module.scss";

import { Routes, Route, Link } from "react-router-dom";

import Focus from "./Focus";
import Sightings from "./Sightings";
import Species from "./Species";
import Specimens from "./Specimens";
import * as apiClient from "./apiClient";

const App = () => {
  return (
    <main>
      <nav>
        <Link to="/">Home</Link> | <Link to="Admin">Admin</Link>
      </nav>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
  );
};

const Admin = () => {
  const [sightings, setSightings] = React.useState([]);
  const [species, setSpecies] = React.useState([]);
  const [specimens, setSpecimens] = React.useState([]);

  const getSpecimens = () => apiClient.getSpecimens().then(setSpecimens);

  const getSpecies = () => apiClient.getSpecies().then(setSpecies);

  const getSightings = () => apiClient.getSightings().then(setSightings);

  return (
    <>
      <Species species={species} getSpecies={getSpecies} />
      <Specimens specimens={specimens} getSpecimens={getSpecimens} />
      <Sightings sightings={sightings} getSightings={getSightings} />
    </>
  );
};

const Home = () => (
  <>
    <h1>Stuff</h1>
    <Focus />
  </>
);

export default App;
